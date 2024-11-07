document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("imageSlider");
  if (slider) {
    const slides = slider.getElementsByClassName("slider-slide");
    let currentSlide = 0;

    function showSlide(n) {
      slides[currentSlide].classList.remove("active");
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    if (slides.length > 1) {
      setInterval(nextSlide, 3000);
    }
  }
});
