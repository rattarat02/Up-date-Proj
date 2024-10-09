<?php
    $conn = new mysqli('localhost', 'username', 'password', 'database');

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = $_POST['productName'];
    $price = $_POST['productPrice'];
    $promotion = $_POST['productPromotion'];
    $detail = $_POST['productDetail'];
    
    $image = $_FILES['productImage']['name'];
    $image_tmp = $_FILES['productImage']['tmp_name'];
    $image_folder = 'uploads/' . $image;
    move_uploaded_file($image_tmp, $image_folder);

    $sql = "INSERT INTO products (name, price, promotion, description, image_url) VALUES ('$name', '$price', '$promotion', '$detail', '$image_folder')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }

    $conn->close();
?>
