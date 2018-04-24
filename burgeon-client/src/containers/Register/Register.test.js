import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Register from './Register.js';

describe('Register', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      );
    });
    
    it('Register should render', () => {
        expect(wrapper).to.have.length(1);
    });

    it('Register should render all form fields', () => {
        expect(wrapper.find('input')).to.have.length(3);
    });
});
