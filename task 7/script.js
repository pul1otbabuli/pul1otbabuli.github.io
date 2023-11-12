document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".gallery");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const pageNumber = document.querySelector(".page-number");

  let currentPage = 1;
  const itemsPerPage = 3;

  const totalItems = document.querySelectorAll(".slider img").length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  updatePager();

  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updateGallery();
      updatePager();
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      updateGallery();
      updatePager();
    }
  });

  function updateGallery() {
    const translateValue = -((currentPage - 1) * 100) + "%";
    gallery.style.transform = "translateX(" + translateValue + ")";
  }

  function updatePager() {
    pageNumber.textContent = currentPage + " / " + totalPages;
  }
});
