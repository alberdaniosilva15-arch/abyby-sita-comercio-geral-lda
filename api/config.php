<?php
/**
 * Configurações Centrais da API PHP — ABYBY SITA
 * Compatível com Apache / cPanel / XAMPP / PHP 8.x
 */

// Headers de CORS seguros e JSON
header('Content-Type: application/json; charset=utf-8');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'https://abybysita.com',
    'https://www.abybysita.com'
];

if (in_array($origin, $allowedOrigins) || empty($origin)) {
    header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
    if (!empty($origin)) {
        header('Access-Control-Allow-Credentials: true');
    }
} else {
    header('Access-Control-Allow-Origin: ' . $allowedOrigins[0]);
}

header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ── Carregamento Dinâmico de Variáveis de Ambiente (.env) ──
function load_env_file($filePath) {
    if (!file_exists($filePath)) return [];
    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $env = [];
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || str_starts_with($line, '#')) continue;
        if (strpos($line, '=') !== false) {
            list($key, $val) = explode('=', $line, 2);
            $key = trim($key);
            $val = trim(trim($val), "\"'");
            $env[$key] = $val;
            if (!getenv($key)) {
                putenv("{$key}={$val}");
            }
        }
    }
    return $env;
}

$envFile = dirname(__DIR__) . '/.env';
$loadedEnv = load_env_file($envFile);

function get_config($key, $default = '') {
    global $loadedEnv;
    $val = getenv($key);
    if ($val !== false && $val !== '') return $val;
    return $loadedEnv[$key] ?? $default;
}

// ── Credenciais de Ambiente (Seguras e Dinâmicas) ──
define('NVIDIA_API_KEY', get_config('NVIDIA_API_KEY', ''));

define('CLOUDINARY_CLOUD_NAME', get_config('CLOUDINARY_CLOUD_NAME', ''));
define('CLOUDINARY_API_KEY', get_config('CLOUDINARY_API_KEY', ''));
define('CLOUDINARY_API_SECRET', get_config('CLOUDINARY_API_SECRET', ''));

define('SUPABASE_URL', get_config('SUPABASE_URL', ''));
define('SUPABASE_KEY', get_config('SUPABASE_KEY', ''));

define('ADMIN_PASSWORD_HASH', get_config('ADMIN_PASSWORD_HASH', ''));
define('ADMIN_TOTP_SECRET', get_config('ADMIN_TOTP_SECRET', ''));
define('JWT_SECRET', get_config('JWT_SECRET', ''));

define('RECRUITMENT_EMAIL', get_config('RECRUITMENT_EMAIL', 'recrutamento@abybysita.com'));

/**
 * Helper para realizar pedidos HTTP à API REST do Supabase
 */
function supabase_request($endpoint, $method = 'GET', $data = null, $headers = []) {
    $url = rtrim(SUPABASE_URL, '/') . '/rest/v1/' . ltrim($endpoint, '/');
    $ch = curl_init($url);

    $defaultHeaders = [
        'Content-Type: application/json',
        'apikey: ' . SUPABASE_KEY,
        'Authorization: Bearer ' . SUPABASE_KEY,
    ];

    $allHeaders = array_merge($defaultHeaders, $headers);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $allHeaders);

    if ($data !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, is_string($data) ? $data : json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    return [
        'status' => $httpCode,
        'data' => json_decode($response, true),
        'raw' => $response,
        'error' => $curlError
    ];
}

/**
 * Helper para realizar upload de ficheiros para o Cloudinary (modo raw/seguro)
 */
function cloudinary_upload_raw($tmpFilePath, $originalName, $folder = 'recrutamento/cvs') {
    $timestamp = time();
    $ext = pathinfo($originalName, PATHINFO_EXTENSION);
    $baseName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($originalName, PATHINFO_FILENAME));
    $publicId = substr($baseName, 0, 40) . '_' . $timestamp . ($ext ? '.' . $ext : '');

    $paramsToSign = "folder={$folder}&public_id={$publicId}&timestamp={$timestamp}&use_filename=true" . CLOUDINARY_API_SECRET;
    $signature = sha1($paramsToSign);

    $mime = mime_content_type($tmpFilePath) ?: 'application/octet-stream';
    $cfile = new CURLFile($tmpFilePath, $mime, $originalName);

    $postFields = [
        'file' => $cfile,
        'api_key' => CLOUDINARY_API_KEY,
        'timestamp' => $timestamp,
        'folder' => $folder,
        'public_id' => $publicId,
        'use_filename' => 'true',
        'signature' => $signature
    ];

    $url = 'https://api.cloudinary.com/v1_1/' . CLOUDINARY_CLOUD_NAME . '/raw/upload';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        $json = json_decode($result, true);
        return $json['secure_url'] ?? null;
    }
    return null;
}

/**
 * Rate Limiter Central em PHP: Limita cada endereço IP a um máximo de 20 pedidos a cada 15 minutos.
 */
function enforce_rate_limit($maxRequests = 20, $windowSeconds = 900) {
    $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    $ipHash = md5($ip);
    $tempDir = sys_get_temp_dir() . '/abyby_rate_limits';
    if (!is_dir($tempDir)) {
        @mkdir($tempDir, 0777, true);
    }
    $file = $tempDir . '/ip_' . $ipHash . '.json';
    $now = time();
    $data = ['count' => 0, 'start' => $now];

    if (file_exists($file)) {
        $content = @file_get_contents($file);
        $decoded = json_decode($content, true);
        if ($decoded && isset($decoded['start']) && ($now - $decoded['start']) < $windowSeconds) {
            $data = $decoded;
        }
    }

    $data['count']++;
    if ($data['count'] > $maxRequests) {
        http_response_code(429);
        $retryAfter = $windowSeconds - ($now - $data['start']);
        header('Retry-After: ' . max(1, $retryAfter));
        echo json_encode([
            'error' => 'Demasiados pedidos a partir deste endereço IP. Limite de 20 pedidos a cada 15 minutos atingido. Por favor, tente novamente mais tarde.'
        ]);
        exit();
    }

    @file_put_contents($file, json_encode($data));
}
