<?php
require_once __DIR__ . '/config.php';
enforce_rate_limit(20, 900); // 20 pedidos a cada 15 minutos por IP

$method = $_SERVER['REQUEST_METHOD'];
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
if (empty($pathInfo)) {
    $uri = $_SERVER['REQUEST_URI'];
    $parsed = parse_url($uri, PHP_URL_PATH);
    $pathInfo = str_replace('/api/recrutamento', '', $parsed);
}
$pathInfo = '/' . ltrim($pathInfo, '/');

// 1. GET /api/recrutamento/jobs
if ($method === 'GET' && ($pathInfo === '/jobs' || $pathInfo === '/jobs/')) {
    $type = $_GET['type'] ?? null;
    $area = $_GET['area'] ?? null;
    $experience = $_GET['experience'] ?? null;
    $q = $_GET['q'] ?? null;

    $params = ['is_active=eq.true', 'order=created_at.desc'];
    if ($type) $params[] = 'type=eq.' . urlencode($type);
    if ($area) $params[] = 'area=eq.' . urlencode($area);
    if ($experience) $params[] = 'experience_level=eq.' . urlencode($experience);
    if ($q) {
        $safeQ = urlencode($q);
        $params[] = "or=(title.ilike.*{$safeQ}*,short_description.ilike.*{$safeQ}*)";
    }

    $queryString = implode('&', $params);
    $res = supabase_request("/recruitment_jobs?{$queryString}");
    
    echo json_encode(['jobs' => $res['data'] ?? []]);
    exit();
}

// 2. GET /api/recrutamento/jobs/:id
if ($method === 'GET' && preg_match('#^/jobs/([a-zA-Z0-9\-]+)$#', $pathInfo, $matches)) {
    $jobId = $matches[1];
    $res = supabase_request("/recruitment_jobs?id=eq.{$jobId}&select=*");

    if (!empty($res['data'])) {
        echo json_encode($res['data'][0]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Vaga não encontrada']);
    }
    exit();
}

// 3. POST /api/recrutamento/applications
if ($method === 'POST' && ($pathInfo === '/applications' || $pathInfo === '/applications/')) {
    if (!isset($_FILES['cv']) || $_FILES['cv']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'O upload do CV é obrigatório.']);
        exit();
    }

    $cvFile = $_FILES['cv'];
    $allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    // Verificação de extensão e MIME type contra malware
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $realMime = finfo_file($finfo, $cvFile['tmp_name']);
    finfo_close($finfo);

    if (!in_array($realMime, $allowedTypes)) {
        http_response_code(400);
        echo json_encode(['error' => 'Apenas ficheiros PDF ou DOC(X) são permitidos.']);
        exit();
    }

    // Upload seguro para o Cloudinary (armazenamento estático)
    $cvUrl = cloudinary_upload_raw($cvFile['tmp_name'], $cvFile['name'], 'recrutamento/cvs');
    if (!$cvUrl) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao processar ficheiro no servidor seguro de armazenamento.']);
        exit();
    }

    $certsUrl = null;
    if (isset($_FILES['certificates']) && $_FILES['certificates']['error'] === UPLOAD_ERR_OK) {
        $certFile = $_FILES['certificates'];
        $certsUrl = cloudinary_upload_raw($certFile['tmp_name'], $certFile['name'], 'recrutamento/certs');
    }

    // Calcular pontuação (Score)
    $yearsExp = (int)($_POST['years_experience'] ?? 0);
    $hasOffshore = (($_POST['has_offshore_experience'] ?? '') === 'true');
    
    $score = 0;
    if ($hasOffshore) $score += 30;
    if ($yearsExp >= 5) $score += 15;
    if ($certsUrl) $score += 20;

    $classification = 'Em análise';
    if ($score >= 60) {
        $classification = 'Prioritário';
    }

    $appData = [
        'job_id' => $_POST['job_id'] ?? '',
        'full_name' => htmlspecialchars($_POST['full_name'] ?? '', ENT_QUOTES, 'UTF-8'),
        'email' => filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL),
        'phone' => htmlspecialchars($_POST['phone'] ?? '', ENT_QUOTES, 'UTF-8'),
        'nationality' => htmlspecialchars($_POST['nationality'] ?? '', ENT_QUOTES, 'UTF-8'),
        'years_experience' => $yearsExp,
        'has_offshore_experience' => $hasOffshore,
        'message' => htmlspecialchars($_POST['message'] ?? '', ENT_QUOTES, 'UTF-8'),
        'cv_url' => $cvUrl,
        'certificates_url' => $certsUrl,
        'score' => $score,
        'classification' => $classification,
        'status' => 'Novo'
    ];

    $res = supabase_request('/recruitment_applications', 'POST', [$appData], ['Prefer: return=minimal']);

    if ($res['status'] >= 200 && $res['status'] < 300) {
        // Registo de notificação
        error_log("[RECRUTAMENTO] Nova candidatura para " . RECRUITMENT_EMAIL . ": " . $appData['full_name'] . " - CV: " . $cvUrl);
        http_response_code(201);
        echo json_encode(['message' => 'Candidatura enviada com sucesso!']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao guardar candidatura na base de dados.']);
    }
    exit();
}

http_response_code(404);
echo json_encode(['error' => 'Rota de recrutamento não encontrada']);
