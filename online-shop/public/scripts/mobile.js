const mobileMenuButtonElement = document.getElementById('mobile-menu-button');
const mobileMenuElement = document.getElementById('mobile-menu');

const toggleMobileMenu = () => {
    mobileMenuElement.classList.toggle('open');
}

mobileMenuButtonElement.addEventListener('click', toggleMobileMenu);