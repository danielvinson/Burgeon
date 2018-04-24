import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import { Alerts } from './Alerts';

describe('Alerts', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Alerts alerts={{alerts: []}} />);
    });
    
    it('Alerts should render', () => {
        expect(wrapper).to.have.length(1);
    });

    it('Alerts should have a CSSTransitionGroup as child', () => {
        expect(wrapper.children()).to.have.length(1);
    });
});
