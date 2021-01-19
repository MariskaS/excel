import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, options) {
    if (!$root) {
      throw Error(`No $root provided for DomListener`);
    }

    // $root - the element on which we will hang various listeners.
    this.$root = $root;
    this.listeners = options.listeners || [];
    this.name = options.name || '';
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented
         in ${this.name} Component`)
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

