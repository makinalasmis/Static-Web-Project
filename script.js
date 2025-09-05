/* ====== Navbar Blur ====== */
const navLinks = document.querySelectorAll("nav a");
const heroPan = document.querySelector(".hero-pan");
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    heroPan.classList.add("blurred");
  });
  link.addEventListener("mouseleave", () => {
    heroPan.classList.remove("blurred");
  });
});

/* ====== Parallax ====== 
const sections = document.querySelectorAll(".section-left, .section-right ");
let scrollY = window.scrollY;
let easedScroll = scrollY;

function animate() {
  // her frame'de scroll değerine yaklaş
  easedScroll += (scrollY - easedScroll) * 0.04;

  sections.forEach((section, i) => {
    const speed = 0.4; // parallax katsayısı
    section.style.transform = `translateY(${-(easedScroll * speed)}px)`;
  });

  requestAnimationFrame(animate);
}

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

animate();
*/

/* ====== Video Bilgilerini Güncelle ====== */
function updateVideoInfo() {
    const video = videos[currentVideo];
    document.getElementById('videoTitle').textContent = video.title;
    document.getElementById('videoDescription').textContent = video.description;
    document.getElementById('videoDuration').textContent = `Süre: ${video.duration}`;
    document.getElementById('currentVideoNumber').textContent = `${currentVideo + 1} / ${totalVideos}`;
    document.getElementById('currentVideoTitle').textContent = `Şu an oynatılan: ${video.title}`;
}

/* ====== Video Oynatma Fonksiyonu ====== */
var swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  allowTouchMove: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Tüm videoları pause et
function pauseAllVideos() {
  swiper.slides.forEach(slide => {
    const video = slide.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0; // videoyu başa sar
    }
  });
}

/* Icons */


// Aktif slide videosunu başlat
function playCurrentVideo() {
  const video = swiper.slides[swiper.activeIndex].querySelector('video');
  if (!video) return;
  video.muted = true;        // autoplay için gerekli
  video.play().catch(() => {}); // hata engelle
}

// Slide değiştiğinde çalışsın
swiper.on('slideChange', () => {
  pauseAllVideos();
  playCurrentVideo();
});

// Başlangıçta ilk video oynasın
playCurrentVideo();

// Her video üzerine tıklayınca dur/oynat toggle
swiper.slides.forEach(slide => {
  const video = slide.querySelector('video');
  if (!video) return;

  slide.addEventListener('click', () => {
    if (video.paused) video.play();
    else video.pause();
  });

  // Video bittiğinde bir sonraki slide
  video.addEventListener('ended', () => {
    swiper.slideNext();
  });
});