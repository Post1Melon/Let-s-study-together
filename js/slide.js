var slider = document.querySelector('.slider');
var slides = document.querySelectorAll('.slide');
var prevButton = document.querySelector('.prev-button');
var nextButton = document.querySelector('.next-button');
var indicators = document.querySelectorAll('.indicator');
var currentIndex = 0;
var slideWidth = slides[0].clientWidth;
var touchStartX = 0;
var touchEndX = 0;

function goToSlide(index) {
  slider.style.transform = 'translateX(' + (-slideWidth * index) + 'px)';
  currentIndex = index;
  updateIndicators();
}

function updateIndicators() {
  indicators.forEach(function(indicator, index) {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

function goToPrevSlide() {
  if (currentIndex === 0) {
    goToSlide(slides.length - 1);
  } else {
    goToSlide(currentIndex - 1);
  }
}

function goToNextSlide() {
  if (currentIndex === slides.length - 1) {
    goToSlide(0);
  } else {
    goToSlide(currentIndex + 1);
  }
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
  if (touchStartX - touchEndX > 50) {
    goToNextSlide();
  } else if (touchEndX - touchStartX > 50) {
    goToPrevSlide();
  }
}

function autoPlay() {
  goToNextSlide();
}

function handleResize() {
  slideWidth = slides[0].clientWidth;
  slider.style.transform = 'translateX(' + (-slideWidth * currentIndex) + 'px)';
}

window.addEventListener('resize', handleResize);

prevButton.addEventListener('click', goToPrevSlide);
nextButton.addEventListener('click', goToNextSlide);

indicators.forEach(function(indicator, index) {
  indicator.addEventListener('click', function() {
    goToSlide(index);
  });
});

slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove);
slider.addEventListener('touchend', handleTouchEnd);

setInterval(autoPlay, 5000);

goToSlide(currentIndex);