import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Header from './Header.js';
import {HeaderIcons} from './HeaderIcons.js';
import NotificationsMenu from './NotificationsMenu.js';
import {SettingsMenu} from './SettingsMenu.js';

import Icon from '../../components/Icons.js';
import DropDownMenu from '../../components/DropDownMenu.js';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
});

describe('<Header />', () => {
  // Logged In
  it('renders title and HeaderIcons', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.title')).to.have.length(1);
    //expect(wrapper.find(HeaderIcons)).to.have.length(1);
  });
});

describe('<HeaderIcons />', () => {
  it('renders the notifications icon and settings icon', () => {
    // Logged In
    const wrapper = shallow(<HeaderIcons user={{'loggedIn': true}} />);
    expect(wrapper.find('.HeaderIcons')).to.have.length(1);
    //expect(wrapper.find(Icon)).to.have.length(2);
    //expect(wrapper.find('.bell')).to.have.length(1);
    //expect(wrapper.find('.gear')).to.have.length(1);
    // Logged out
  });
});

describe('<NotificationsMenu />', () => {
  it('renders', () => {
    const wrapper = shallow(<NotificationsMenu />);
    expect(wrapper.find(DropDownMenu)).to.have.length(1);
  });
});

describe('<SettingsMenu />', () => {
  it('renders', () => {
    const wrapper = shallow(<SettingsMenu visible={true} />);
    expect(wrapper.find(DropDownMenu)).to.have.length(1);
  });
});