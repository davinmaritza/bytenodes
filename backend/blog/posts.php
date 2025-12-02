<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get post ID from URL if present
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
preg_match('/\/blog\/posts\/(\d+)/', $path, $matches);
$post_id = $matches[1] ?? null;

if ($post_id) {
    // Get single post
    $query = "SELECT id, title, content, category, status, created_at, updated_at 
              FROM blog_posts 
              WHERE id = :id AND status = 'published'";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $post_id);
    $stmt->execute();
    
    if ($stmt->rowCount() == 0) {
        http_response_code(404);
        echo json_encode(['message' => 'Post not found']);
        exit();
    }
    
    $post = $stmt->fetch(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode(['post' => $post]);
} else {
    // Get all published posts
    $query = "SELECT id, title, content, category, created_at, updated_at 
              FROM blog_posts 
              WHERE status = 'published' 
              ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode(['posts' => $posts]);
}
