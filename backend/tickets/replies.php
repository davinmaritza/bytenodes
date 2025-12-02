<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();

$database = new Database();
$db = $database->getConnection();

// Get ticket ID from URL path
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
preg_match('/\/tickets\/(\d+)\/replies/', $path, $matches);
$ticket_id = $matches[1] ?? null;

if (!$ticket_id) {
    http_response_code(400);
    echo json_encode(['message' => 'Ticket ID is required']);
    exit();
}

// Verify ticket belongs to user
$query = "SELECT user_id FROM tickets WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $ticket_id);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    http_response_code(404);
    echo json_encode(['message' => 'Ticket not found']);
    exit();
}

$ticket = $stmt->fetch(PDO::FETCH_ASSOC);
if ($ticket['user_id'] != $decoded->data->id && $decoded->data->role !== 'admin') {
    http_response_code(403);
    echo json_encode(['message' => 'Access denied']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get ticket replies
    $query = "SELECT r.id, r.message, r.created_at, u.name as user_name, u.role as user_role
              FROM ticket_replies r
              JOIN users u ON r.user_id = u.id
              WHERE r.ticket_id = :ticket_id
              ORDER BY r.created_at ASC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':ticket_id', $ticket_id);
    $stmt->execute();
    
    $replies = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode(['replies' => $replies]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Add reply to ticket
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->message)) {
        http_response_code(400);
        echo json_encode(['message' => 'Message is required']);
        exit();
    }
    
    $query = "INSERT INTO ticket_replies (ticket_id, user_id, message, created_at) 
              VALUES (:ticket_id, :user_id, :message, NOW())";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':ticket_id', $ticket_id);
    $stmt->bindParam(':user_id', $decoded->data->id);
    $stmt->bindParam(':message', $data->message);
    
    if ($stmt->execute()) {
        // Update ticket updated_at
        $query = "UPDATE tickets SET updated_at = NOW() WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $ticket_id);
        $stmt->execute();
        
        http_response_code(201);
        echo json_encode(['message' => 'Reply added successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Unable to add reply']);
    }
}
