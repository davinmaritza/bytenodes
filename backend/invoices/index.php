<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();

$database = new Database();
$db = $database->getConnection();

$query = "SELECT i.id, i.amount, i.status, i.due_date, i.paid_at, i.created_at,
          o.id as order_id, p.name as product_name
          FROM invoices i
          LEFT JOIN orders o ON i.order_id = o.id
          LEFT JOIN products p ON o.product_id = p.id
          WHERE i.user_id = :user_id
          ORDER BY i.created_at DESC";
$stmt = $db->prepare($query);
$stmt->bindParam(':user_id', $decoded->data->id);
$stmt->execute();

$invoices = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(['invoices' => $invoices]);
