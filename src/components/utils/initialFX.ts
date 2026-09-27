import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0]?.classList.add("main-active");
  document.body.classList.add("site-ready");
}
