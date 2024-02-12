"use strict";

/////////////////////////////////////////
///Declaration Section

const mainNav = document.querySelector(".main-nav");
const footer = document.querySelector(".grid-footer");
const heroSection = document.querySelector(".section-hero");
const slides = document.querySelectorAll(".meals-slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const nav = document.querySelector(".nav");
const mainBtn = document.querySelector(".btn--main");

//Implementing the mobile nav bar

nav.addEventListener("click", function (e) {
  const clicked = e.target.closest(".btn-mobile-nav");
  if (!clicked) return;
  nav.classList.toggle("nav-open");
});

////////Implementing Smooth Scrolling

mainNav.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains("main-nav-link") &&
    e.target.closest(".nav-open")
  ) {
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    nav.classList.remove("nav-open");
  }
  if (e.target.classList.contains("main-nav-link")) {
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
});

mainBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector("#section--3").scrollIntoView({ behavior: "smooth" });
});

footer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("footer-link")) {
    heroSection.scrollIntoView({ behavior: "smooth" });
  }
});

///Implementing Sliders

let curSlide = 0;

const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

//Implementing sticky nav

//not functioning properly

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) document.body.classList.add("sticky");
  else document.body.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(heroSection);

//Implementing the copyright year dynamically

const year = document.querySelector(".year");
let currentYear = new Date().getFullYear();
year.textContent = currentYear;
