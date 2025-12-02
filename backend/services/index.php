<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();

$database = new Database();
$db = $database->getConnection();

$query = "SELECT s.id, s.product_id, s.status, s.ip_address, s.expires_at, s.created_at,
          p.name, p.cpu, p.ram, p.storage, p.bandwidth
          FROM services s
          JOIN products p ON s.product_id = p.id
          WHERE s.user_id = :user_id
          ORDER BY s.created_at DESC";
$stmt = $db->prepare($query);
$stmt->bindParam(':user_id', $decoded->data->id);
$stmt->execute();

$services = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(['services' => $services]);
