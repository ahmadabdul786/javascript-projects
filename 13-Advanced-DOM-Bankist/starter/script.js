'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const silder = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(el => {
  el.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1cords = section1.getBoundingClientRect();
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    console.log('link');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
//here working with the tab component
//when user click on the button
tabsContainer.addEventListener('click', function (e) {
  //yani jahan click kya gya hai uska closest parent who's having this class 'className'
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  document;
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//here we are working with nav bar to implement some animation

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    //console.log(link);
    const logo = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
        logo.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener('mouseover', e => handleHover(e, 0.5));
nav.addEventListener('mouseout', e => handleHover(e, 1));
//implementing the stickiness of navbar after certain position of the screen that is scrolled

// const initialCords = section1.getBoundingClientRect();
// console.log(initialCords);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
//yahn oper hm ne scroll event k zrye sy stickiness of navbar ki implementatio ki
//yekin ye ziada moasar treqa nae hai ab hm deikhein gy
//sticky navigation: intersection Observer API
const navHeight = nav.getBoundingClientRect().height;
function stickyNav(entries) {
  const [entry] = entries;
  //  console.log(entry);
  if (entry.isIntersecting) {
    nav.classList.remove('sticky');
  } else {
    nav.classList.add('sticky');
  }
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);
//is working kuch yun hai k hm ye keh rhy k jb hamara target(header)
//  element view port k 0% sy intersect kry to callback chly to ye
//  2 sorto mn hi ho skta aik to inital position jis mn header
//  header pehly sy hi view port k zero sy start ho rha or baad mn
// jb view port sy out ho rha hota hai
//agy callback mn hmne condition lgai hai very simple
//margin hmne exactly wo wala dya hai jitni hamari nav hi height hai
//...................................................
//we are gonna implement the working in which every section will be shown smothely
function revealSection(entries, observer) {
  // const [entry] = entries;
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //yani 15% jb view port sy intersect kry to callback chly
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//we are going to impelement the feature in which we are showing images after loading

const allImgs = document.querySelectorAll('img[data-src]');
//console.log(allImgs);
function loading(entries, observer) {
  const [entry] = entries;
  console.log(entry);
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
});

allImgs.forEach(img => imgObserver.observe(img));
//=========================================================
//here we are gonna implement the functionality of sliders

function slider() {
  let curSlide = 0;
  let slideRang = slides.length;
  //console.log(slideRang);

  //silder.style.transform = 'scale(0.4) translateX(-800px)';
  //console.log(slides);

  function activeDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  }
  function createDot() {
    slides.forEach((_, i) => {
      console.log('0');
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }
  createDot();

  function createSlide() {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * i}%)`;
    });
  }
  createSlide();
  const nextSlide = function () {
    if (curSlide === slideRang - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    console.log(curSlide);
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
    activeDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = slideRang - 1;
    } else {
      curSlide--;
    }
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
    activeDot(curSlide);
  };

  rightBtn.addEventListener('click', nextSlide);
  leftBtn.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    //console.log(e);
    if (e.key == 'ArrowRight') {
      nextSlide();
    } else e.key === 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      console.log(e);
      const curSlide = Number(e.target.dataset.slide);
      console.log(curSlide);
      nextSlide(curSlide);
      activeDot(curSlide);
    }
  });
}
slider();
