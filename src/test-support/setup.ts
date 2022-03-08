import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import crypto from 'crypto';

beforeEach(() => {
  // Can you believe JEST doesn't automatically clean up?
  document.body.innerHTML = '';

  Enzyme.configure({ adapter: new Adapter() });
});

Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
});
