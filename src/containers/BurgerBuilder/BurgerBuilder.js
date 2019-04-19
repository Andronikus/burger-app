import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount = () => {
        this.props.onInitIngredients();
    };

    // helper function to manage the purchasable state
    updatedPurchaseState = (ingredients) => {

        const sumIngredients = Object.keys(ingredients)
                                     .map(key => {return ingredients[key]})
                                     .reduce((sum,el) => {return (sum + el)},0);

        return sumIngredients > 0;
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('checkout');
    }

    render(){
        
        const disableInfo = {...this.props.ings};

        for(let ingredient in disableInfo){
            disableInfo[ingredient] = disableInfo[ingredient] <= 0;
        }

        let burger = this.props.error? <p>Ingredients can't be loaded! </p> : <Spinner />;
        let orderSummary = null; 

        if(this.props.ings){
            burger = <Auxiliary>
                        <Burger ingredients={this.props.ings}></Burger>
                        <BuildControls  ingredientAdded={this.props.onIngredientAdded} 
                                        ingredientRemoved={this.props.onIngredientRemoved}
                                        disabled={disableInfo}
                                        price={this.props.totalPrice}
                                        purchasable={this.updatedPurchaseState(this.props.ings)}
                                        order={this.purchaseHandler}
                                        
                        />
                     </Auxiliary>
            orderSummary = <OrderSummary ingredients={this.props.ings} 
                                         cancelPurchase={this.purchaseCancelHandler} 
                                         continuePurchase={this.purchaseContinueHandler}
                                         burgerPrice={this.props.totalPrice}/>;
        }

        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));