document.addEventListener("DOMContentLoaded", function () {
    // Lấy phần tử ảnh
    const slideImage = document.getElementById("slideImage");
    // Thiết lập transform để di chuyển ảnh từ trái sang phải
    slideImage.style.transform = "scale(1.1)";
    const zoomInImage = document.getElementById("zoomInImage");
    // Thiết lập opacity để ảnh hiện ra
    zoomInImage.style.transform = "scale(1.1)";

    const zoomtext = document.getElementById("zoomtext");
    // Thiết lập opacity để ảnh hiện ra
    zoomtext.style.transform = "scale(1.05)";

});