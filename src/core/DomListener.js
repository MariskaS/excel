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
      this.$root.on(listener, this[method].bind(this));
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented
         in ${this.name} Component`)
      }
      console.log('aaaa', this[method])

      this.$root.off(listener, this[method].bind(this));
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

