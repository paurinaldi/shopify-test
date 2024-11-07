document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("imageSlider");
  if (slider) {
    const slides = Array.from(slider.getElementsByClassName("slider-slide"));
    let currentSlide = 0;
    let startX;
    let currentX;
    let isDragging = false;
    let slideWidth = slider.offsetWidth;
    let autoSlideInterval;

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    function updateSlidePositions() {
      slides.forEach((slide, i) => {
        const offset = (i - currentSlide) * 100;
        slide.style.transform = `translateX(${offset}%)`;
        slide.style.transition = isDragging ? "none" : "transform 1s ease-out";
      });
    }

    function showSlide(n) {
      currentSlide = (n + slides.length) % slides.length;
      updateSlidePositions();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlidePositions();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlidePositions();
    }

    function startDrag(e) {
      if (e.target.tagName.toLowerCase() === "img") {
        e.preventDefault();
      }
      isDragging = true;
      startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
      currentX = startX;
      slider.style.cursor = "grabbing";
      resetAutoSlide();
    }

    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const diff = currentX - startX;
      const percentMove = (diff / slideWidth) * 100;

      slides.forEach((slide, i) => {
        const offset = (i - currentSlide) * 100 + percentMove;
        slide.style.transform = `translateX(${offset}%)`;
      });
    }

    function endDrag() {
      if (!isDragging) return;
      isDragging = false;
      const diff = currentX - startX;
      if (Math.abs(diff) > slideWidth * 0.2) {
        if (diff > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      } else {
        updateSlidePositions();
      }
      slider.style.cursor = "grab";
    }

    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("touchstart", startDrag, { passive: false });
    slider.addEventListener("mousemove", drag);
    slider.addEventListener("touchmove", drag, { passive: false });
    slider.addEventListener("mouseup", endDrag);
    slider.addEventListener("touchend", endDrag);
    slider.addEventListener("mouseleave", endDrag);

    // Prevent default dragging of images
    slider.querySelectorAll("img").forEach((img) => {
      img.addEventListener("dragstart", (e) => e.preventDefault());
    });

    window.addEventListener("resize", () => {
      slideWidth = slider.offsetWidth;
      updateSlidePositions();
    });

    // Start the auto slide functionality
    startAutoSlide();
    updateSlidePositions();
  }
});
