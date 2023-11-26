document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    const pager = document.querySelector('.pager');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    const images = document.querySelectorAll('.gallery img');
    const totalImages = images.length;
    const imagesPerPageDesktop = 3;
    const imagesPerPageMobile = 1;
    let currentIndex = 0;
    let imagesPerPage = window.innerWidth > 600 ? imagesPerPageDesktop : imagesPerPageMobile;
    const totalPages = Math.ceil(totalImages / imagesPerPage);

    function updatePager() {
        pager.textContent = `${currentIndex / imagesPerPage + 1} / ${totalPages}`;
    }

    function updateGallery() {
        const translateValue = -currentIndex * (100 / imagesPerPage);
        gallery.style.transform = `translateX(${translateValue}%)`;
    }

    function showPage(page) {
        currentIndex = page * imagesPerPage;
        updateGallery();
        updatePager();
    }

    function showNextPage() {
        if (currentIndex + imagesPerPage < totalImages) {
            currentIndex += imagesPerPage;
            updateGallery();
            updatePager();
        }
    }

    function showPrevPage() {
        if (currentIndex - imagesPerPage >= 0) {
            currentIndex -= imagesPerPage;
            updateGallery();
            updatePager();
        }
    }

    prevBtn.addEventListener('click', showPrevPage);
    nextBtn.addEventListener('click', showNextPage);

    // Initialize
    updatePager();

    // Update images per page on window resize
    window.addEventListener('resize', function () {
        imagesPerPage = window.innerWidth > 600 ? imagesPerPageDesktop : imagesPerPageMobile;
        updateGallery();
        updatePager();
    });

    // Optional: Implement touch/swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > 50) {
            showPrevPage();
        } else if (swipeDistance < -50) {
            showNextPage();
        }
    });
});

