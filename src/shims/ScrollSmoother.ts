import { gsap } from 'gsap';

export class ScrollSmoother {
  static create(vars?: any): ScrollSmoother {
    return new ScrollSmoother();
  }
  static refresh(hard?: boolean) {}
  static get(): ScrollSmoother { return new ScrollSmoother(); }

  scrollTop(val?: number) { if (val !== undefined) window.scrollTo(0, val); return window.scrollY; }
  scrollTo(target: any, smooth?: boolean, position?: string) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  }
  paused(val?: boolean) {}
}

gsap.registerPlugin(ScrollSmoother);
