<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->product_id) || !isset($data->billing_cycle)) {
    http_response_code(400);
    echo json_encode(['message' => 'Product ID and billing cycle are required']);
    exit();
}

// Get product details
$query = "SELECT id, name, price_monthly, price_yearly FROM products WHERE id = :id AND status = 'active'";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $data->product_id);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    http_response_code(404);
    echo json_encode(['message' => 'Product not found']);
    exit();
}

$product = $stmt->fetch(PDO::FETCH_ASSOC);

// Calculate price based on billing cycle
$amount = ($data->billing_cycle === 'yearly') ? $product['price_yearly'] : $product['price_monthly'];

// Create order
$query = "INSERT INTO orders (user_id, product_id, amount, billing_cycle, status, created_at) 
          VALUES (:user_id, :product_id, :amount, :billing_cycle, 'pending', NOW())";
$stmt = $db->prepare($query);
$stmt->bindParam(':user_id', $decoded->data->id);
$stmt->bindParam(':product_id', $data->product_id);
$stmt->bindParam(':amount', $amount);
$stmt->bindParam(':billing_cycle', $data->billing_cycle);

if ($stmt->execute()) {
    $order_id = $db->lastInsertId();
    
    http_response_code(201);
    echo json_encode([
        'order' => [
            'id' => $order_id,
            'product_name' => $product['name'],
            'amount' => $amount,
            'billing_cycle' => $data->billing_cycle,
            'status' => 'pending'
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Unable to create order']);
}
