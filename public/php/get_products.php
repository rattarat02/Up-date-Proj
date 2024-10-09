<?php
// เชื่อมต่อฐานข้อมูล
$conn = new mysqli('localhost', 'username', 'password', 'database');

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ดึงข้อมูลสินค้า
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

// สร้าง Array สำหรับสินค้า
$products = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

// ส่งข้อมูลเป็น JSON
echo json_encode($products);

$conn->close();
?>
