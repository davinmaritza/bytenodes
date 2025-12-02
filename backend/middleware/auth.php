<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    private $secret_key;
    
    public function __construct() {
        $this->secret_key = getenv('JWT_SECRET') ?: 'your-secret-key-change-this';
    }

    public function authenticate() {
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? '';

        if (!preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            http_response_code(401);
            echo json_encode(['message' => 'No token provided']);
            exit();
        }

        $token = $matches[1];

        try {
            $decoded = JWT::decode($token, new Key($this->secret_key, 'HS256'));
            return $decoded;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['message' => 'Invalid token']);
            exit();
        }
    }

    public function requireAdmin($user) {
        if ($user->role !== 'admin') {
            http_response_code(403);
            echo json_encode(['message' => 'Admin access required']);
            exit();
        }
    }
}
