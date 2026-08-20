<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$pathInfo = $_SERVER['PATH_INFO'] ?? '';
if (empty($pathInfo)) {
    $uri = $_SERVER['REQUEST_URI'];
    $parsed = parse_url($uri, PHP_URL_PATH);
    $pathInfo = str_replace('/api/news', '', $parsed);
}
$pathInfo = '/' . ltrim($pathInfo, '/');

// Rate limiting: 20 pedidos por 15 min
enforce_rate_limit(20, 900);

$dataFile = dirname(__DIR__) . '/data/news.json';

function get_all_news_from_file($dataFile) {
    if (!file_exists($dataFile)) {
        return [];
    }
    $content = file_get_contents($dataFile);
    $json = json_decode($content, true);
    return is_array($json) ? $json : [];
}

$allPosts = get_all_news_from_file($dataFile);

// ── 1. GET /api/news/slug/:slug ──
if ($method === 'GET' && preg_match('#^/(?:slug/)?([a-zA-Z0-9\-]+)$#', $pathInfo, $matches) && $matches[1] !== 'categories') {
    $slug = $matches[1];
    $found = null;
    foreach ($allPosts as $post) {
        if (($post['slug'] === $slug || $post['id'] === $slug) && !empty($post['is_active'])) {
            $found = $post;
            break;
        }
    }

    if (!$found) {
        http_response_code(404);
        echo json_encode(['error' => 'Notícia não encontrada ou inativa.']);
        exit();
    }

    // Related posts
    $related = [];
    foreach ($allPosts as $p) {
        if ($p['id'] !== $found['id'] && !empty($p['is_active'])) {
            if (strtolower($p['category'] ?? '') === strtolower($found['category'] ?? '')) {
                $related[] = $p;
            }
            if (count($related) >= 3) break;
        }
    }

    echo json_encode([
        'post' => $found,
        'related' => $related
    ]);
    exit();
}

// ── 2. GET /api/news (Listagem com filtros) ──
if ($method === 'GET') {
    $category = $_GET['category'] ?? null;
    $search = $_GET['q'] ?? null;
    $page = max(1, intval($_GET['page'] ?? 1));
    $limit = max(1, min(50, intval($_GET['limit'] ?? 12)));

    $filtered = [];
    foreach ($allPosts as $p) {
        if (empty($p['is_active'])) continue;

        if ($category && $category !== 'Todas') {
            if (strtolower($p['category'] ?? '') !== strtolower($category)) {
                continue;
            }
        }

        if ($search && trim($search) !== '') {
            $q = mb_strtolower(trim($search), 'UTF-8');
            $t = mb_strtolower($p['title'] ?? '', 'UTF-8');
            $e = mb_strtolower($p['excerpt'] ?? '', 'UTF-8');
            $b = mb_strtolower($p['body'] ?? '', 'UTF-8');
            if (strpos($t, $q) === false && strpos($e, $q) === false && strpos($b, $q) === false) {
                continue;
            }
        }

        $filtered[] = $p;
    }

    // Ordenar por published_at desc
    usort($filtered, function($a, $b) {
        return strtotime($b['published_at'] ?? '0') - strtotime($a['published_at'] ?? '0');
    });

    $total = count($filtered);
    $offset = ($page - 1) * $limit;
    $sliced = array_slice($filtered, $offset, $limit);

    $featured = null;
    foreach ($allPosts as $p) {
        if (!empty($p['is_active']) && !empty($p['is_featured'])) {
            $featured = $p;
            break;
        }
    }
    if (!$featured && !empty($filtered)) {
        $featured = $filtered[0];
    }

    echo json_encode([
        'news' => $sliced,
        'total' => $total,
        'page' => $page,
        'limit' => $limit,
        'totalPages' => ceil($total / $limit),
        'featured' => $featured,
        'categories' => ['Todas', 'Operações', 'Indústria', 'Institucional', 'Comunidade']
    ]);
    exit();
}

http_response_code(405);
echo json_encode(['error' => 'Método não permitido']);
