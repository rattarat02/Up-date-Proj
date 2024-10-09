// script/product.js

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
function fetchProducts() {
    fetch('http://localhost:3000/api/products') // URL API ที่สร้างไว้ใน Node.js
        .then(response => response.json())
        .then(data => {
            let productList = document.getElementById('productList');
            productList.innerHTML = ''; // ล้างรายการสินค้าก่อนแสดงใหม่

            data.forEach(product => {
                let productCard = document.createElement('div');
                productCard.classList.add('card');
                productCard.innerHTML = `
                    <div class="pic">
                        <img src="${product.image_url}" alt="${product.name}">
                    </div>
                    <div class="text">
                        <p>${product.name}</p>
                        <p>${product.price} bath</p>
                    </div>
                    <div class="icon">
                        <i class='bx bx-heart'></i>
                        <i class='bx bx-cart'></i>
                    </div>
                    <div class="Price">
                        <p>ราคา</p>
                    </div>
                    <div class="detail">
                        <p>${product.description}</p>
                    </div>
                `;
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// เรียก fetchProducts เมื่อหน้าเว็บโหลดเสร็จ
window.onload = fetchProducts;
