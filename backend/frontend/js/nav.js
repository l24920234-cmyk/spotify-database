document.addEventListener("DOMContentLoaded", () => {
  const frame = document.getElementById("contentFrame");
  const navItems = document.querySelectorAll(".nav-item[data-src]");

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const nuevoSrc = item.getAttribute("data-src");

      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      frame.src = nuevoSrc;
    });
  });
});