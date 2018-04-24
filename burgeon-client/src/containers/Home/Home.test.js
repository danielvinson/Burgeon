import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Home from './Home';

describe('Home', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Home />);
    });
    
    it('Home should render', () => {
        expect(wrapper).to.have.length(1);
    });

    it('Home should have a TrackList as child', () => {
        expect(wrapper.children()).to.have.length(1);
    });
});
