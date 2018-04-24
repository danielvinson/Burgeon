import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';

import { UserSettings } from './UserSettings.js';

const mockUser = {
    "email": "test@test.com", 
    "first_name": null, 
    "last_name": null, 
    "points": 0, 
    "profile_picture": null, 
    "registered_on": "Thu, 22 Mar 2018 23:04:44 GMT", 
    "staff": false, 
    "user_id": 1, 
    "username": null
};

async function refreshUser() {
    return new Promise((resolve) => {
       resolve(mockUser) ;
    });
}

describe('UserSettings', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = mount(<UserSettings user={{}} refreshUser={refreshUser} />);
    });
    
    it('UserSettings should render', () => {
        expect(wrapper).to.have.length(1);
    });

    it('UserSettings should render all form fields', () => {
        expect(wrapper.find('input')).to.have.length(5);
    });
});
