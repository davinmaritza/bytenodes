<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->name) || !isset($data->email) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(['message' => 'Name, email and password are required']);
    exit();
}

// Validate email
if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid email format']);
    exit();
}

// Check if email already exists
$query = "SELECT id FROM users WHERE email = :email";
$stmt = $db->prepare($query);
$stmt->bindParam(':email', $data->email);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    http_response_code(400);
    echo json_encode(['message' => 'Email already exists']);
    exit();
}

// Hash password
$password_hash = password_hash($data->password, PASSWORD_BCRYPT);

// Insert user
$query = "INSERT INTO users (name, email, password, role, balance, created_at) 
          VALUES (:name, :email, :password, 'user', 0, NOW())";
$stmt = $db->prepare($query);
$stmt->bindParam(':name', $data->name);
$stmt->bindParam(':email', $data->email);
$stmt->bindParam(':password', $password_hash);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(['message' => 'User registered successfully']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Unable to register user']);
}
