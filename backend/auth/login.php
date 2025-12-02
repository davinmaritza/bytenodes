<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(['message' => 'Email and password are required']);
    exit();
}

$query = "SELECT id, name, email, password, role, balance FROM users WHERE email = :email";
$stmt = $db->prepare($query);
$stmt->bindParam(':email', $data->email);
$stmt->execute();

if ($stmt->rowCount() == 0) {
    http_response_code(401);
    echo json_encode(['message' => 'Invalid email or password']);
    exit();
}

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!password_verify($data->password, $user['password'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Invalid email or password']);
    exit();
}

// Generate JWT token
$secret_key = getenv('JWT_SECRET') ?: 'your-secret-key-change-this';
$issued_at = time();
$expiration_time = $issued_at + (60 * 60 * 24 * 7); // 7 days

$payload = [
    'iat' => $issued_at,
    'exp' => $expiration_time,
    'data' => [
        'id' => $user['id'],
        'email' => $user['email'],
        'role' => $user['role']
    ]
];

$token = JWT::encode($payload, $secret_key, 'HS256');

unset($user['password']);

http_response_code(200);
echo json_encode([
    'token' => $token,
    'user' => $user
]);
