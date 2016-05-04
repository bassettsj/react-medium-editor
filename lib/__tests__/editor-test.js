// @flow-weak
import React from 'react';
jest.unmock('../editor');

import Editor from '../editor';
import { shallow, mount } from 'enzyme';
describe('Editor', () => {
  it('should be able to pass a smoke test', () => expect(true).toBe(true));
  it('should be able to render', () => {
    const wrapper = shallow(<Editor />);
    expect(wrapper.find('[contentEditable]').length).toBe(1);
  });

  xit('should not have the placeholder after receiving new props', () => {
    const wrapper = mount(<Editor text="" />);
  });
});
