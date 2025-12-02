<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();
$auth->requireAdmin($decoded->data);

$database = new Database();
$db = $database->getConnection();

// Get post ID from URL if present
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
preg_match('/\/admin\/blog\/posts\/(\d+)/', $path, $matches);
$post_id = $matches[1] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Create new blog post
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->title) || !isset($data->content) || !isset($data->category)) {
        http_response_code(400);
        echo json_encode(['message' => 'Title, content and category are required']);
        exit();
    }
    
    $status = $data->status ?? 'draft';
    
    $query = "INSERT INTO blog_posts (title, content, category, status, created_at, updated_at) 
              VALUES (:title, :content, :category, :status, NOW(), NOW())";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':title', $data->title);
    $stmt->bindParam(':content', $data->content);
    $stmt->bindParam(':category', $data->category);
    $stmt->bindParam(':status', $status);
    
    if ($stmt->execute()) {
        $post_id = $db->lastInsertId();
        http_response_code(201);
        echo json_encode(['post' => ['id' => $post_id, 'title' => $data->title, 'status' => $status]]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Unable to create blog post']);
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT' && $post_id) {
    // Update blog post
    $data = json_decode(file_get_contents("php://input"));
    
    $query = "UPDATE blog_posts SET 
              title = COALESCE(:title, title),
              content = COALESCE(:content, content),
              category = COALESCE(:category, category),
              status = COALESCE(:status, status),
              updated_at = NOW()
              WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':title', $data->title);
    $stmt->bindParam(':content', $data->content);
    $stmt->bindParam(':category', $data->category);
    $stmt->bindParam(':status', $data->status);
    $stmt->bindParam(':id', $post_id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['message' => 'Blog post updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Unable to update blog post']);
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE' && $post_id) {
    // Delete blog post
    $query = "DELETE FROM blog_posts WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $post_id);
    
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(['message' => 'Blog post deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Unable to delete blog post']);
    }
}
