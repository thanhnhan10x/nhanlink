<?php

header('Content-Type: application/json');

$link = $_POST['link'] ?? '';

echo json_encode([
    "success" => true,
    "affiliate_link" => $link
]);