window.TextTrack = jest.fn();

Object.defineProperty(HTMLElement.prototype, 'insertAdjacentElement', {
  configurable: true,
  value(_, element) {
    this.appendChild(element);
  },
});
