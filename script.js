(() => {
  "use strict";
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  if (!toggle || !nav) return;
  const close = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  window.addEventListener("resize", () => { if (window.innerWidth > 850) close(); });
})();