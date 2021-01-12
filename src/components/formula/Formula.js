import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log('onInput formula', event.target.textContent.trim())
  }

  onClick(event) {
    console.log('onClick formula', event.target.textContent.trim())
  }
}

Formula.className = 'excel__formula'