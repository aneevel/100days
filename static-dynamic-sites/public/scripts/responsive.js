const drawerBtnElement = document.getElementById('drawer-btn');
const mobileDrawerElement = document.getElementById('mobile-drawer');

function toggleDrawer() {
  mobileDrawerElement.classList.toggle('open');
}

drawerBtnElement.addEventListener('click', toggleDrawer);