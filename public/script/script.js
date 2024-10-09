let slideIndex = 0;
let autoSlideTimeout;

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    console.log("slideIndex:", slideIndex, "total slides:", slides.length); // ตรวจสอบค่า

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }


    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(() => plusSlides(1), 5000);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function initializeSlides() {
    slideIndex = 1;
    showSlides(slideIndex);
}

window.onload = initializeSlides;

// script product-----------------------------------------------------------------------------------------------------------------------------

// ฟังก์ชันสำหรับเพิ่มสินค้า
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการโหลดหน้าใหม่

    let formData = new FormData(this); // สร้าง FormData object จากฟอร์ม
    fetch('add_product.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Product added successfully');
            fetchProducts(); // ดึงข้อมูลใหม่หลังจากเพิ่มสินค้า
        } else {
            alert('Error adding product');
        }
    })
    .catch(error => console.error('Error adding product:', error));
});

// ฟังก์ชันสำหรับลบสินค้า
function deleteProduct(id) {
    fetch('delete_product.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${id}`
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Product deleted successfully');
            fetchProducts(); // ดึงข้อมูลใหม่หลังจากลบสินค้า
        } else {
            alert('Error deleting product');
        }
    })
    .catch(error => console.error('Error deleting product:', error));
}

// เรียกฟังก์ชัน fetchProducts เมื่อโหลดหน้าเว็บ
window.onload = fetchProducts;


