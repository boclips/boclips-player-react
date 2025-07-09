import generated from '@trust/webcrypto';

beforeEach(() => {
  // Can you believe JEST doesn't automatically clean up?
  document.body.innerHTML = '';
});

crypto = generated;

// @ts-expect-error need to define global to remove the player error, jsdom cant play the video
Object.defineProperty(global.window.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  get() {
    setTimeout(() => this.onloadeddata && this.onloadeddata());
    return () => {};
  },
});
