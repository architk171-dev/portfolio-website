export class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];

  constructor(target: string | Element | (string | Element)[], vars?: any) {
    let elements: Element[] = [];

    if (typeof target === 'string') {
      elements = Array.from(document.querySelectorAll(target));
    } else if (Array.isArray(target)) {
      target.forEach(t => {
        if (typeof t === 'string') {
          elements.push(...Array.from(document.querySelectorAll(t)));
        } else {
          elements.push(t);
        }
      });
    } else if (target instanceof Element) {
      elements = [target];
    }

    elements.forEach(el => {
      const htmlEl = el as HTMLElement;
      const text = htmlEl.textContent || '';
      const type = vars?.type || 'chars';
      htmlEl.innerHTML = '';

      const words = text.split(/\s+/).filter(w => w.length > 0);
      words.forEach((word, wi) => {
        if (type.includes('chars')) {
          word.split('').forEach(char => {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.textContent = char;
            htmlEl.appendChild(span);
            this.chars.push(span);
          });
        }

        if (type.includes('words')) {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          if (!type.includes('chars')) {
            span.textContent = word;
            htmlEl.appendChild(span);
          }
          this.words.push(span);
        }

        if (wi < words.length - 1) {
          const space = document.createElement('span');
          space.style.display = 'inline-block';
          space.innerHTML = '&nbsp;';
          htmlEl.appendChild(space);
        }
      });

      this.lines.push(htmlEl);
    });

    if (this.words.length === 0) this.words = this.chars;
  }

  revert() {}
}
