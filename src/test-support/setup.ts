beforeEach(() => {
  // Can you believe JEST doesn't automatically clean up?
  document.body.innerHTML = '';
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  get() {
    setTimeout(() => this.onloadeddata && this.onloadeddata());
    return () => {};
  },
});
