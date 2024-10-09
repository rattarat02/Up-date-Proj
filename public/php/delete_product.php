<?php
    // เชื่อมต่อฐานข้อมูล
    $conn = new mysqli('localhost', 'username', 'password', 'database');

    // ตรวจสอบการเชื่อมต่อ
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // รับค่าจาก POST สำหรับ id ของสินค้า
    $id = $_POST['id'];

    // SQL สำหรับการลบข้อมูล
    $sql = "DELETE FROM products WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }

    $conn->close();
?>
