<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();
$auth->requireAdmin($decoded->data);

$database = new Database();
$db = $database->getConnection();

$query = "SELECT o.id, o.amount, o.billing_cycle, o.status, o.created_at,
          u.name as user_name, u.email as user_email,
          p.name as product_name
          FROM orders o
          JOIN users u ON o.user_id = u.id
          JOIN products p ON o.product_id = p.id
          ORDER BY o.created_at DESC";
$stmt = $db->prepare($query);
$stmt->execute();

$orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(['orders' => $orders]);
