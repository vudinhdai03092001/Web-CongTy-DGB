document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector('.header-scroll');
    
    const content = document.querySelector('.main');

    function adjustContentMargin() {
        const headerHeight = header.offsetHeight;
        console.log(headerHeight)
        content.style.paddingTop = headerHeight + 'px';
    }

    // Gọi hàm để thiết lập margin ban đầu
    adjustContentMargin();

    // Thêm sự kiện scroll để cập nhật margin khi cuộn trang
    window.addEventListener('scroll', adjustContentMargin);
});