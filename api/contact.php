<?php
require_once __DIR__ . '/config.php';
enforce_rate_limit(20, 900); // 20 pedidos a cada 15 minutos por IP

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

$nome = isset($input['nome']) ? trim($input['nome']) : '';
$empresa = isset($input['empresa']) ? trim($input['empresa']) : '';
$email = isset($input['email']) ? filter_var(trim($input['email']), FILTER_VALIDATE_EMAIL) : '';
$telefone = isset($input['telefone']) ? trim($input['telefone']) : '';
$servico = isset($input['servico']) ? trim($input['servico']) : '';
$mensagem = isset($input['mensagem']) ? trim($input['mensagem']) : '';

if (empty($nome) || empty($email) || empty($mensagem)) {
    http_response_code(400);
    echo json_encode(['error' => 'Os campos Nome, Email e Mensagem são obrigatórios.']);
    exit();
}

$lead = [
    'nome' => htmlspecialchars($nome, ENT_QUOTES, 'UTF-8'),
    'empresa' => htmlspecialchars($empresa, ENT_QUOTES, 'UTF-8'),
    'email' => $email,
    'telefone' => htmlspecialchars($telefone, ENT_QUOTES, 'UTF-8'),
    'servico' => htmlspecialchars($servico, ENT_QUOTES, 'UTF-8'),
    'mensagem' => htmlspecialchars($mensagem, ENT_QUOTES, 'UTF-8'),
    'status' => 'Novo'
];

$res = supabase_request('/leads', 'POST', [$lead], ['Prefer: return=minimal']);

if ($res['status'] >= 200 && $res['status'] < 300) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao processar pedido de contacto.']);
}
