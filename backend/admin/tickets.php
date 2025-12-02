<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();
$auth->requireAdmin($decoded->data);

$database = new Database();
$db = $database->getConnection();

$query = "SELECT t.id, t.subject, t.priority, t.status, t.created_at, t.updated_at,
          u.name as user_name, u.email as user_email
          FROM tickets t
          JOIN users u ON t.user_id = u.id
          ORDER BY t.created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();

$tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(['tickets' => $tickets]);
