<?php
require_once __DIR__ . '/config.php';
enforce_rate_limit(20, 900); // 20 pedidos a cada 15 minutos por IP

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$servico = isset($input['servico']) ? trim($input['servico']) : 'Serviço Geral';
$mensagem = isset($input['mensagem']) ? trim($input['mensagem']) : '';

if (mb_strlen($mensagem) < 2) {
    http_response_code(400);
    echo json_encode(['error' => 'Mensagem demasiado curta para ser melhorada.']);
    exit();
}

$systemPrompt = "És o redator executivo de documentos de solicitação de proposta da ABYBY SITA COMÉRCIO GERAL, LDA (Luanda, Angola). Transforma a nota do cliente num documento profissional e estruturado em JSON puro:
{
  \"titulo\": \"subtítulo curto\",
  \"resumo\": \"parágrafo profissional de 3 a 5 linhas\",
  \"objectivos\": [\"objectivo 1\", \"objectivo 2\"],
  \"requisitos\": [\"requisito 1\", \"requisito 2\"],
  \"detalhes\": \"informações adicionais\"
}";

$payload = [
    'model' => 'meta/llama-3.1-8b-instruct',
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user', 'content' => "Serviço: {$servico}\n\nNota:\n{$mensagem}"]
    ],
    'temperature' => 0.4,
    'max_tokens' => 1200
];

$ch = curl_init('https://integrate.api.nvidia.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . NVIDIA_API_KEY
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 200) {
    $resData = json_decode($response, true);
    $content = trim($resData['choices'][0]['message']['content'] ?? '');
    
    // Extrai JSON seguro
    $start = strpos($content, '{');
    $end = strrpos($content, '}');
    $doc = null;
    if ($start !== false && $end !== false && $end > $start) {
        $jsonStr = substr($content, $start, $end - $start + 1);
        $doc = json_decode($jsonStr, true);
    }
    
    $titulo = $doc['titulo'] ?? "Pedido de Orçamento — {$servico}";
    $resumo = $doc['resumo'] ?? "Solicitação formal de proposta para {$servico}.";
    $objectivos = isset($doc['objectivos']) && is_array($doc['objectivos']) ? $doc['objectivos'] : [];
    $requisitos = isset($doc['requisitos']) && is_array($doc['requisitos']) ? $doc['requisitos'] : [];
    $detalhes = $doc['detalhes'] ?? '';

    $documento = [
        'titulo' => $titulo,
        'resumo' => $resumo,
        'objectivos' => $objectivos,
        'requisitos' => $requisitos,
        'detalhes' => $detalhes
    ];

    $textoPlano = implode("\n\n", array_filter([
        $titulo,
        $resumo,
        !empty($objectivos) ? "Objectivos:\n- " . implode("\n- ", $objectivos) : "",
        !empty($requisitos) ? "Requisitos:\n- " . implode("\n- ", $requisitos) : "",
        $detalhes
    ]));

    echo json_encode(['documento' => $documento, 'textoPlano' => $textoPlano]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao processar especificação de proposta.']);
}
