<?php
require_once __DIR__ . '/../config/cors.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../vendor/autoload.php';

$auth = new AuthMiddleware();
$decoded = $auth->authenticate();

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->amount)) {
    http_response_code(400);
    echo json_encode(['message' => 'Amount is required']);
    exit();
}

\Stripe\Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));

try {
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $data->amount * 100, // Convert to cents
        'currency' => 'usd',
        'metadata' => [
            'user_id' => $decoded->data->id,
            'order_id' => $data->order_id ?? null
        ]
    ]);

    http_response_code(200);
    echo json_encode([
        'clientSecret' => $paymentIntent->client_secret,
        'paymentIntentId' => $paymentIntent->id
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Payment intent creation failed: ' . $e->getMessage()]);
}
