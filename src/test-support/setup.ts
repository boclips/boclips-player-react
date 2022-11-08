beforeEach(() => {
  // Can you believe JEST doesn't automatically clean up?
  document.body.innerHTML = '';
});

// @ts-expect-error using crypto for mocking uuid
crypto = require('@trust/webcrypto');

// @ts-expect-error need to define global to remove the player error, jsdom cant play the video
Object.defineProperty(global.window.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  get() {
    setTimeout(() => this.onloadeddata && this.onloadeddata());
    return () => {};
  },
});
