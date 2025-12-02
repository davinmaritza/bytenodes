<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get user's tickets
    $query = "SELECT id, subject, priority, status, created_at, updated_at 
              FROM tickets 
              WHERE user_id = :user_id 
              ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $decoded->data->id);
    $stmt->execute();
    
    $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    http_response_code(200);
    echo json_encode(['tickets' => $tickets]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Create new ticket
    $data = json_decode(file_get_contents("php://input"));
    
    if (!isset($data->subject) || !isset($data->priority) || !isset($data->message)) {
        http_response_code(400);
        echo json_encode(['message' => 'Subject, priority and message are required']);
        exit();
    }
    
    $db->beginTransaction();
    
    try {
        // Create ticket
        $query = "INSERT INTO tickets (user_id, subject, priority, status, created_at, updated_at) 
                  VALUES (:user_id, :subject, :priority, 'open', NOW(), NOW())";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $decoded->data->id);
        $stmt->bindParam(':subject', $data->subject);
        $stmt->bindParam(':priority', $data->priority);
        $stmt->execute();
        
        $ticket_id = $db->lastInsertId();
        
        // Add initial message as reply
        $query = "INSERT INTO ticket_replies (ticket_id, user_id, message, created_at) 
                  VALUES (:ticket_id, :user_id, :message, NOW())";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':ticket_id', $ticket_id);
        $stmt->bindParam(':user_id', $decoded->data->id);
        $stmt->bindParam(':message', $data->message);
        $stmt->execute();
        
        $db->commit();
        
        http_response_code(201);
        echo json_encode([
            'ticket' => [
                'id' => $ticket_id,
                'subject' => $data->subject,
                'priority' => $data->priority,
                'status' => 'open'
            ]
        ]);
    } catch (Exception $e) {
        $db->rollBack();
        http_response_code(500);
        echo json_encode(['message' => 'Unable to create ticket']);
    }
}
