/**
* toogleMenu
*
* Blendet das Menü aus oder ein.
*
*/

function toogleMenu() {
  const interactionElementClass = '.js-navigation-interaction-element';
  const interactionElementAdditionalClass = 'hamburger-button--is-open';
  const menuElementClass = 'main-header__menu-bar-nav--is-open';

  const interactionElement = document.querySelector(interactionElementClass);
  const interactionTarget = interactionElement.dataset.jsInteractionTarget;
  const menuElement = document.querySelector(interactionTarget);

  interactionElement.addEventListener('click', () => {
    interactionElement.classList.toggle(interactionElementAdditionalClass);
    menuElement.classList.toggle(menuElementClass);
  });
}


/**
* switchSlides
*
* Blättert in der Slideshow ein Bild vor oder zurück
*
*/
function switchSlides() {
  const slides = document.querySelectorAll('[data-js-slide]');
  const interactionElementNext = document.querySelector('[data-js-nav-next-slide]');
  const interactionElementPrevious = document.querySelector('[data-js-nav-previous-slide]');
  const slideClassVisible = 'slide-show__slide--visible';
  const slideShowElement = document.querySelector('[data-js-slide-show]');
  const configJSON = slideShowElement.getAttribute('data-js-slide-show');
  const dotActiveClass = 'dot-navigation__dot--active';
  let wrapAround = false;
  let activeSlide = 0;
  const dots = [];

  function showSlide(activeSlideIndex) {
    slides[activeSlideIndex].classList.add(slideClassVisible);
    dots[activeSlideIndex].classList.add(dotActiveClass);
  }

  function hideSlide(activeSlideIndex) {
    slides[activeSlideIndex].classList.remove(slideClassVisible);
    dots[activeSlideIndex].classList.remove(dotActiveClass);
  }

  function changeSlide(direction) {
    hideSlide(activeSlide);

    if (direction === 'next') {
      if (activeSlide + 1 < slides.length) {
        activeSlide += 1;
      } else if (wrapAround === true) {
        activeSlide = 0;
      }
    } else if (activeSlide - 1 < 0) {
      if (wrapAround === true) {
        activeSlide = slides.length - 1;
      }
    } else {
      activeSlide -= 1;
    }
    showSlide(activeSlide);
  }

  function toggleFullScreen(e) {
    const target = e.currentTarget;
    if (!document.fullscreenElement) {
      target.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function onClickDot(e) {
    const target = e.currentTarget;
    const index = parseInt(target.getAttribute('data-slide-index'), 10);

    if (activeSlide === index) {
      return;
    }

    hideSlide(activeSlide);
    showSlide(index);
    activeSlide = index;
  }

  const config = JSON.parse(configJSON);
  wrapAround = config.wrapAround;

  // Container für Dots erzeugen
  const dotNavigationElement = document.createElement('ol');
  dotNavigationElement.classList.add('dot-navigation');
  slideShowElement.appendChild(dotNavigationElement);


  slides.forEach((slide, index) => {
    const dotElement = document.createElement('li');
    dotElement.classList.add('dot-navigation__dot');
    dotElement.setAttribute('data-slide-index', index);
    dotElement.addEventListener('click', onClickDot);
    dots.push(dotElement);
    dotNavigationElement.appendChild(dotElement);
    slide.addEventListener('click', toggleFullScreen);
  });

  // für jeden Slide Dot erzeugen und dem Container hinzufügen
  // für jeden Dot ClickEventlistener hinzüfügen
  interactionElementNext.addEventListener('click', () => { changeSlide('next'); });
  interactionElementPrevious.addEventListener('click', () => { changeSlide('previous'); });

  showSlide(activeSlide);
}

toogleMenu();
switchSlides();
