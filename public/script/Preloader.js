document.addEventListener('DOMContentLoaded', function() {
    var preloader = document.getElementById('preloader');
    preloader.style.display = 'flex';
});

window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');


    setTimeout(function() {
        preloader.style.display = 'none';
    }, 500);
});