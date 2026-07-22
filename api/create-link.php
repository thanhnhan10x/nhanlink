<?php

header("Content-Type: application/json; charset=UTF-8");

$link = trim($_POST["link"] ?? "");

if ($link == "") {

    echo json_encode([
        "status" => "error",
        "message" => "Vui lòng nhập link."
    ]);

    exit;
}

if (
    !str_contains($link, "shopee.vn") &&
    !str_contains($link, "s.shopee.vn")
) {

    echo json_encode([
        "status" => "error",
        "message" => "Đây không phải link Shopee."
    ]);

    exit;
}

/*
|--------------------------------------------------------------------------
| Sau này chỉ sửa phần này
|--------------------------------------------------------------------------
| Khi có API Shopee:
|
| $affiliate = callShopeeAPI($link);
|
| echo json_encode([
|    "status"=>"success",
|    "affiliateLink"=>$affiliate
| ]);
|
|--------------------------------------------------------------------------
*/

echo json_encode([
    "status" => "success",
    "affiliateLink" => $link
]);