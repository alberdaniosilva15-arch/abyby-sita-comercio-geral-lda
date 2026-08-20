<?php
require_once __DIR__ . '/config.php';
enforce_rate_limit(20, 900); // 20 pedidos a cada 15 minutos por IP

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$message = isset($input['message']) ? trim($input['message']) : '';
$history = isset($input['history']) && is_array($input['history']) ? $input['history'] : [];

if (empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Por favor, forneça uma mensagem válida.']);
    exit();
}

if (mb_strlen($message) > 1000) {
    http_response_code(400);
    echo json_encode(['error' => 'A mensagem excede o limite de 1000 caracteres.']);
    exit();
}

$systemPrompt = "És a Assistente Virtual da ABYBY SITA COMÉRCIO GERAL, LDA (Luanda, Angola). Respondes com simpatia, profissionalismo e clareza sobre serviços de Oil & Gas, Rope Access, Rent-a-Car, Logística e Fornecimento Industrial.";

$messages = [
    ['role' => 'system', 'content' => $systemPrompt]
];

// Adiciona até 10 turnos de histórico recente
$safeHistory = array_slice($history, -10);
foreach ($safeHistory as $item) {
    if (isset($item['role'], $item['content']) && is_string($item['content'])) {
        $role = $item['role'] === 'user' ? 'user' : 'assistant';
        $messages[] = [
            'role' => $role,
            'content' => mb_substr(trim($item['content']), 0, 2000)
        ];
    }
}

$messages[] = [
    'role' => 'user',
    'content' => htmlspecialchars($message, ENT_QUOTES, 'UTF-8')
];

$payload = [
    'model' => 'meta/llama-3.1-8b-instruct',
    'messages' => $messages,
    'temperature' => 0.7,
    'max_tokens' => 1000
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
    $reply = $resData['choices'][0]['message']['content'] ?? 'Desculpe, não foi possível gerar uma resposta.';
    echo json_encode(['reply' => $reply]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Ocorreu um erro ao comunicar com a Assistente de IA.']);
}
