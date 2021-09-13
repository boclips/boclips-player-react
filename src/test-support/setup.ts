import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

beforeEach(() => {
  // Can you believe JEST doesn't automatically clean up?
  document.body.innerHTML = '';

  Enzyme.configure({ adapter: new Adapter() });
});
