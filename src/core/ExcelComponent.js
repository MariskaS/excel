import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options);
  }

  // It returns template of component.
  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  remove() {
    this.removeDOMListeners()
  }
}
