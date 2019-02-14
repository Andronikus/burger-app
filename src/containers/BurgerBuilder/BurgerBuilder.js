import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 0,
            cheese: 3,
            meat: 0
        }
    }

    render(){
        return(
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}></Burger>
                <div>Burger Controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;