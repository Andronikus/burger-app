import React from 'react';
import Enzyme , { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

Enzyme.configure({
    adapter: new Adapter()
})

// using jest
describe('<NavigationItems />', () => {
    // run before each test
    let wrapper;
    
    beforeEach( () => {
        wrapper =  shallow(<NavigationItems />);
    });
    
    // write the test
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        // testing logic
        // expectation - expect to find two <NavigationItem /> elements
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // expectation - expect to find three <NavigationItem /> elements
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    // test the logout node when user is authenticated
    it('should render the Logout <NavigationItem /> element when authenticated', () => {
        wrapper.setProps({isAuthenticated:true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})