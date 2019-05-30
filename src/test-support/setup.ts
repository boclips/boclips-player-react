import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

beforeEach(() => {
  // Can you believe JEST doesn't automatically clean up?
  document.body.innerHTML = '';

  Enzyme.configure({ adapter: new Adapter() });
});