import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  document.body.style.backgroundColor = "#0b080c";

  const selectors = [
    ".landing-intro h2",
    ".landing-intro h1",
    ".landing-info h3",
    ".landing-h2-info",
    ".landing-info-h2",
    ".header",
    ".icons-section",
    ".nav-fade",
  ];

  let delay = 100;
  selectors.forEach((sel) => {
    setTimeout(() => {
      document.querySelectorAll(sel).forEach((el) => {
        const h = el as HTMLElement;
        h.style.opacity = "1";
        h.style.transform = "translateY(0)";
        h.style.filter = "none";
        h.style.transition = "opacity 1s ease, transform 1s ease, filter 1s ease";
      });
    }, delay);
    delay += 150;
  });
}
