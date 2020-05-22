function toogleMenu() { 
  let interactionElement = document.querySelector("[data-main-navigation]");
  let menuElement = document.querySelector("[data-menu-nav]")
  
  interactionElement.addEventListener('click', function () { 
    interactionElement.classList.toggle("hamburger-button--is-open");
    menuElement.classList.toggle("main-header__menu-bar-nav--is-open");
  });

}
toogleMenu();