import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { Route, Link, MemoryRouter } from 'react-router-dom';

import Login from './Login.js';

describe('Login', () => {
    let wrapper;
    
    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
    });
    
    it('Login should render', () => {
        expect(wrapper).to.have.length(1);
    });

    it('Login should render all form fields', () => {
        expect(wrapper.find('input')).to.have.length(3);
    });
});
