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
  let activeSlide = 0;


  function showSlide(activeSlide) {
    slides[activeSlide].classList.add(slideClassVisible);
  }

  function hideSlide(activeSlide) {
    slides[activeSlide].classList.remove(slideClassVisible);
  }

  function changeSlide(direction) {
    hideSlide(activeSlide);

    if (direction === 'next') {
      if (activeSlide + 1 < slides.length) {
        activeSlide += 1;
      } else {
        activeSlide = 0;
      }
    } else if (activeSlide - 1 < 0) {
      activeSlide = slides.length - 1;
    } else {
      activeSlide -= 1;
    }

    showSlide(activeSlide);
  }

  showSlide(activeSlide);

  interactionElementNext.addEventListener('click', () => { changeSlide('next'); });
  interactionElementPrevious.addEventListener('click', () => { changeSlide('previous'); });
}


toogleMenu();
switchSlides();
