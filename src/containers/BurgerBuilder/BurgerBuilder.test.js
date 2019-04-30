import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from  '../../components/Burger/BuildControls/BuildControls';


Enzyme.configure({
    adapter: new Adapter()
})

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>);
    })

    it('should render <BuidlControls /> when receiving ingredients', () => {
        wrapper.setProps({ings: true});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})