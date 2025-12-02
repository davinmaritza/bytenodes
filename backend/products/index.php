<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, name, description, price_monthly, price_yearly, cpu, ram, storage, bandwidth, status 
          FROM products WHERE status = 'active' ORDER BY price_monthly ASC";
$stmt = $db->prepare($query);
$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(['products' => $products]);
