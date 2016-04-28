import React from 'react';
jest.unmock('../editor');

import Editor from '../editor';
import { shallow } from 'enzyme';
describe('Editor', () => {
  it('should be able to pass a smoke test', () => expect(true).toBe(true));
  it('should be able to render', () => {
    const wrapper = shallow(<Editor />);
    expect(wrapper.find('[contentEditable]').length).toBe(1);
  });
});
