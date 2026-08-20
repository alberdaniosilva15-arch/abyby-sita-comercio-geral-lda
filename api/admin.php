<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
if (empty($pathInfo)) {
    $uri = $_SERVER['REQUEST_URI'];
    $parsed = parse_url($uri, PHP_URL_PATH);
    $pathInfo = str_replace('/api/admin', '', $parsed);
}
$pathInfo = '/' . ltrim($pathInfo, '/');

/**
 * Função de validação RFC 6238 TOTP em PHP (Base32 + HMAC-SHA1)
 */
function verify_php_totp($secret, $code, $discrepancy = 1) {
    if (empty($secret) || empty($code)) return false;
    $base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    $secret = strtoupper(preg_replace('/[^A-Z2-7]/', '', $secret));
    $binarySecret = '';
    for ($i = 0; $i < strlen($secret); $i += 8) {
        $x = '';
        for ($j = 0; $j < 8; $j++) {
            $char = $secret[$i + $j] ?? '';
            $pos = strpos($base32chars, $char);
            if ($pos === false) $pos = 0;
            $x .= str_pad(decbin($pos), 5, '0', STR_PAD_LEFT);
        }
        $eightBits = str_split($x, 8);
        for ($z = 0; $z < count($eightBits); $z++) {
            $binarySecret .= chr(bindec($eightBits[$z]));
        }
    }
    $timeSlice = floor(time() / 30);
    for ($i = -$discrepancy; $i <= $discrepancy; $i++) {
        $time = pack('N*', 0) . pack('N*', $timeSlice + $i);
        $hmac = hash_hmac('sha1', $time, $binarySecret, true);
        $offset = ord(substr($hmac, -1)) & 0x0F;
        $hashPart = substr($hmac, $offset, 4);
        $value = unpack('N', $hashPart);
        $value = $value[1] & 0x7FFFFFFF;
        $calculated = str_pad($value % 1000000, 6, '0', STR_PAD_LEFT);
        if (hash_equals($calculated, trim((string)$code))) {
            return true;
        }
    }
    return false;
}

// ── 1. POST /api/admin/login ──
if ($method === 'POST' && ($pathInfo === '/login' || $pathInfo === '/login/')) {
    // Proteção Anti-Brute-Force: Limite de 5 tentativas por 15 minutos
    enforce_rate_limit(5, 900);

    $input = json_decode(file_get_contents('php://input'), true);
    $password = $input['password'] ?? '';
    $totpCode = $input['totpCode'] ?? '';

    if (empty($password)) {
        http_response_code(401);
        echo json_encode(['error' => 'Credenciais inválidas']);
        exit();
    }

    if (!password_verify($password, ADMIN_PASSWORD_HASH)) {
        http_response_code(401);
        echo json_encode(['error' => 'Credenciais inválidas']);
        exit();
    }

    // Validação Obrigatória 2FA (TOTP)
    if (defined('ADMIN_TOTP_SECRET') && !empty(ADMIN_TOTP_SECRET)) {
        if (empty($totpCode) || !verify_php_totp(ADMIN_TOTP_SECRET, $totpCode)) {
            http_response_code(401);
            echo json_encode(['error' => 'Código de autenticação 2FA inválido ou expirado.']);
            exit();
        }
    }

    // Gerar token assinado com tempo de expiração estrito (8 horas)
    $tokenData = [
        'role' => 'admin',
        'exp' => time() + (8 * 3600),
        'iat' => time()
    ];
    $payload = base64_encode(json_encode($tokenData));
    $signature = hash_hmac('sha256', $payload, JWT_SECRET);
    $token = $payload . '.' . $signature;

    setcookie('admin_token', $token, [
        'expires' => time() + (8 * 3600),
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax'
    ]);

    echo json_encode(['success' => true]);
    exit();
}

// ── 2. POST /api/admin/logout ──
if ($method === 'POST' && ($pathInfo === '/logout' || $pathInfo === '/logout/')) {
    setcookie('admin_token', '', time() - 3600, '/');
    echo json_encode(['success' => true]);
    exit();
}

// ── Middleware de Proteção de Sessão Admin ──
function checkAdminAuth() {
    $token = $_COOKIE['admin_token'] ?? null;
    if (!$token) {
        http_response_code(401);
        echo json_encode(['error' => 'Acesso não autorizado. Sessão em falta.']);
        exit();
    }
    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        http_response_code(401);
        echo json_encode(['error' => 'Sessão inválida.']);
        exit();
    }
    $payload = $parts[0];
    $expectedSign = hash_hmac('sha256', $payload, JWT_SECRET);
    if (!hash_equals($expectedSign, $parts[1])) {
        http_response_code(401);
        echo json_encode(['error' => 'Assinatura de segurança inválida.']);
        exit();
    }

    $tokenData = json_decode(base64_decode($payload), true);
    if (!$tokenData || !isset($tokenData['exp']) || $tokenData['exp'] < time()) {
        http_response_code(401);
        echo json_encode(['error' => 'Sessão expirada. Por favor autentique-se novamente.']);
        exit();
    }
}

checkAdminAuth();

// ── 3. GET /api/admin/vagas ──
if ($method === 'GET' && ($pathInfo === '/vagas' || $pathInfo === '/vagas/')) {
    $res = supabase_request('/recruitment_jobs?order=created_at.desc');
    echo json_encode(['vagas' => $res['data'] ?? []]);
    exit();
}

// ── 4. POST /api/admin/vagas ──
if ($method === 'POST' && ($pathInfo === '/vagas' || $pathInfo === '/vagas/')) {
    $input = json_decode(file_get_contents('php://input'), true);
    $input['is_active'] = true;
    $res = supabase_request('/recruitment_jobs', 'POST', [$input], ['Prefer: return=representation']);
    if ($res['status'] >= 200 && $res['status'] < 300) {
        http_response_code(201);
        echo json_encode(['success' => true, 'vaga' => $res['data'][0] ?? $input]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao criar vaga']);
    }
    exit();
}

// ── 5. PATCH /api/admin/vagas/:id/arquivar ou /reativar ou /:id ──
if ($method === 'PATCH' && preg_match('#^/vagas/([a-zA-Z0-9\-]+)(?:/(arquivar|reativar))?$#', $pathInfo, $matches)) {
    $id = $matches[1];
    $action = $matches[2] ?? null;

    if ($action === 'arquivar') {
        $res = supabase_request("/recruitment_jobs?id=eq.{$id}", 'PATCH', ['is_active' => false]);
    } elseif ($action === 'reativar') {
        $res = supabase_request("/recruitment_jobs?id=eq.{$id}", 'PATCH', ['is_active' => true]);
    } else {
        $input = json_decode(file_get_contents('php://input'), true);
        $res = supabase_request("/recruitment_jobs?id=eq.{$id}", 'PATCH', $input, ['Prefer: return=representation']);
    }

    echo json_encode(['success' => true]);
    exit();
}

// ── 6. GET /api/admin/candidaturas ──
if ($method === 'GET' && ($pathInfo === '/candidaturas' || $pathInfo === '/candidaturas/')) {
    $status = $_GET['status'] ?? null;
    $vagaId = $_GET['vagaId'] ?? null;

    $params = ['select=*,recruitment_jobs(title)', 'order=created_at.desc'];
    if ($vagaId) $params[] = 'job_id=eq.' . urlencode($vagaId);
    if ($status && $status !== 'todas') $params[] = 'status=eq.' . urlencode($status);

    $queryString = implode('&', $params);
    $res = supabase_request("/recruitment_applications?{$queryString}", 'GET', null, ['Prefer: count=exact']);

    echo json_encode(['candidaturas' => $res['data'] ?? []]);
    exit();
}

// ── 7. PATCH /api/admin/candidaturas/:id/status ──
if ($method === 'PATCH' && preg_match('#^/candidaturas/([a-zA-Z0-9\-]+)/status$#', $pathInfo, $matches)) {
    $id = $matches[1];
    $input = json_decode(file_get_contents('php://input'), true);
    $res = supabase_request("/recruitment_applications?id=eq.{$id}", 'PATCH', ['status' => $input['status'] ?? 'Novo']);
    echo json_encode(['success' => true]);
    exit();
}

// ── 8. GET /api/admin/candidaturas/:id/download-cv ──
if ($method === 'GET' && preg_match('#^/candidaturas/([a-zA-Z0-9\-]+)/download-cv$#', $pathInfo, $matches)) {
    $id = $matches[1];
    $res = supabase_request("/recruitment_applications?id=eq.{$id}&select=full_name,cv_url");
    if (empty($res['data'])) {
        http_response_code(404);
        echo json_encode(['error' => 'Candidatura não encontrada']);
        exit();
    }
    $cand = $res['data'][0];
    $cvUrl = $cand['cv_url'] ?? '';
    if (empty($cvUrl)) {
        http_response_code(404);
        echo json_encode(['error' => 'CV não encontrado']);
        exit();
    }

    // Proteção Anti-SSRF: apenas URLs Cloudinary
    if (strpos($cvUrl, 'https://res.cloudinary.com/') !== 0) {
        http_response_code(403);
        echo json_encode(['error' => 'Origem de ficheiro não autorizada']);
        exit();
    }

    $cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $cand['full_name'] ?? 'Candidato');
    $content = file_get_contents($cvUrl);
    if ($content === false) {
        http_response_code(502);
        echo json_encode(['error' => 'Erro ao obter ficheiro']);
        exit();
    }

    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="CV_' . $cleanName . '.pdf"');
    header('Content-Length: ' . strlen($content));
    echo $content;
    exit();
}

// ── 9. GESTÃO DE FEED & NOTÍCIAS (ADMIN PHP) ──
$dataFile = dirname(__DIR__) . '/data/news.json';

function php_read_news($file) {
    if (!file_exists($file)) return [];
    $data = json_decode(file_get_contents($file), true);
    return is_array($data) ? $data : [];
}

function php_save_news($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// 9.1 GET /api/admin/news (Todas as notícias)
if ($method === 'GET' && ($pathInfo === '/news' || $pathInfo === '/news/')) {
    $posts = php_read_news($dataFile);
    usort($posts, function($a, $b) {
        return strtotime($b['published_at'] ?? '0') - strtotime($a['published_at'] ?? '0');
    });
    echo json_encode(['news' => $posts, 'total' => count($posts)]);
    exit();
}

// 9.2 POST /api/admin/news (Criar notícia)
if ($method === 'POST' && ($pathInfo === '/news' || $pathInfo === '/news/')) {
    $input = json_decode(file_get_contents('php://input'), true);
    $title = trim($input['title'] ?? '');
    $excerpt = trim($input['excerpt'] ?? '');
    $body = trim($input['body'] ?? '');
    $category = trim($input['category'] ?? 'Institucional');
    $imageUrl = trim($input['image_url'] ?? 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80');
    $isFeatured = !empty($input['is_featured']);
    $author = trim($input['author'] ?? 'Comunicação Institucional');

    if (empty($title) || empty($excerpt) || empty($body)) {
        http_response_code(400);
        echo json_encode(['error' => 'Título, resumo e conteúdo são obrigatórios.']);
        exit();
    }

    $posts = php_read_news($dataFile);
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', iconv('UTF-8', 'ASCII//TRANSLIT', $title)), '-'));
    $now = date('c');

    if ($isFeatured) {
        foreach ($posts as &$p) {
            $p['is_featured'] = false;
        }
    }

    $newPost = [
        'id' => 'post-' . uniqid(),
        'title' => $title,
        'slug' => $slug . '-' . time(),
        'excerpt' => $excerpt,
        'body' => $body,
        'category' => $category,
        'image_url' => $imageUrl,
        'is_featured' => $isFeatured,
        'is_active' => true,
        'author' => $author,
        'read_time' => max(1, ceil(str_word_count($body) / 180)) . ' min',
        'published_at' => $now,
        'created_at' => $now,
        'updated_at' => $now
    ];

    array_unshift($posts, $newPost);
    php_save_news($dataFile, $posts);

    http_response_code(201);
    echo json_encode(['success' => true, 'post' => $newPost]);
    exit();
}

// 9.3 PATCH /api/admin/news/:id ou /:id/arquivar ou /:id/reativar
if ($method === 'PATCH' && preg_match('#^/news/([a-zA-Z0-9\-]+)(?:/(arquivar|reativar))?$#', $pathInfo, $matches)) {
    $id = $matches[1];
    $action = $matches[2] ?? null;
    $posts = php_read_news($dataFile);
    $foundIndex = -1;

    foreach ($posts as $idx => $p) {
        if ($p['id'] === $id) {
            $foundIndex = $idx;
            break;
        }
    }

    if ($foundIndex === -1) {
        http_response_code(404);
        echo json_encode(['error' => 'Notícia não encontrada']);
        exit();
    }

    $now = date('c');
    if ($action === 'arquivar') {
        $posts[$foundIndex]['is_active'] = false;
        $posts[$foundIndex]['updated_at'] = $now;
    } elseif ($action === 'reativar') {
        $posts[$foundIndex]['is_active'] = true;
        $posts[$foundIndex]['updated_at'] = $now;
    } else {
        $input = json_decode(file_get_contents('php://input'), true);
        if (!empty($input['is_featured'])) {
            foreach ($posts as &$p) {
                if ($p['id'] !== $id) $p['is_featured'] = false;
            }
        }
        foreach ($input as $k => $v) {
            if ($k !== 'id' && $k !== 'created_at') {
                $posts[$foundIndex][$k] = $v;
            }
        }
        $posts[$foundIndex]['updated_at'] = $now;
    }

    php_save_news($dataFile, $posts);
    echo json_encode(['success' => true, 'post' => $posts[$foundIndex]]);
    exit();
}

// 9.4 Eliminar definitivamente notícia (POST /news/:id/eliminar ou DELETE)
if (($method === 'POST' || $method === 'DELETE') && preg_match('#^/news/([a-zA-Z0-9\-]+)(?:/eliminar)?$#', $pathInfo, $matches) && $pathInfo !== '/news/upload-image') {
    $id = $matches[1];
    $posts = php_read_news($dataFile);
    $filtered = array_values(array_filter($posts, function($p) use ($id) {
        return $p['id'] !== $id;
    }));

    if (count($filtered) === count($posts)) {
        http_response_code(404);
        echo json_encode(['error' => 'Notícia não encontrada']);
        exit();
    }

    php_save_news($dataFile, $filtered);
    echo json_encode(['success' => true, 'message' => 'Notícia eliminada com sucesso']);
    exit();
}

// 9.5 POST /api/admin/news/upload-image
if ($method === 'POST' && ($pathInfo === '/news/upload-image' || $pathInfo === '/news/upload-image/')) {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'Nenhum ficheiro de imagem válido foi enviado']);
        exit();
    }

    $file = $_FILES['image'];
    $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!in_array($file['type'], $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Formato não suportado. Use JPG, PNG ou WebP.']);
        exit();
    }

    $fileContent = file_get_contents($file['tmp_name']);
    $url = upload_to_cloudinary($fileContent, 'abyby-sita/news', $file['name'], 'image');

    if ($url) {
        echo json_encode(['success' => true, 'image_url' => $url]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao processar upload para a nuvem']);
    }
    exit();
}

http_response_code(404);
echo json_encode(['error' => 'Rota administrativa não encontrada']);

