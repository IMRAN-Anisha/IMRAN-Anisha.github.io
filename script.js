  const menuToggle = document.querySelector(".menu-toggle");
  const sideNav = document.getElementById("sideNav");
  const navOverlay = document.getElementById("navOverlay");
  const closeNav = document.querySelector(".close-nav");

  function openNav() {
    sideNav.classList.add("open");
    navOverlay.classList.add("active");
  }

  function closeNavMenu() {
    sideNav.classList.remove("open");
    navOverlay.classList.remove("active");
  }

  menuToggle.addEventListener("click", openNav);
  closeNav.addEventListener("click", closeNavMenu);
  navOverlay.addEventListener("click", closeNavMenu);

  document.querySelectorAll(".side-nav-link").forEach(link => {
    link.addEventListener("click", closeNavMenu);
  });
