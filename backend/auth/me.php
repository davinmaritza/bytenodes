<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, name, email, role, balance FROM users WHERE id = :id";
$stmt = $db->prepare($query);
$stmt->bindParam(':id', $decoded->data->id);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    http_response_code(404);
    echo json_encode(['message' => 'User not found']);
    exit();
}

$user = $stmt->fetch(PDO::FETCH_ASSOC);

http_response_code(200);
echo json_encode(['user' => $user]);
