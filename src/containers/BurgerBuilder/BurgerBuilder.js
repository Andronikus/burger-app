import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    // helper function to manage the purchasable state
    updatedPurchaseState = (ingredients) => {

        const sumIngredients = Object.keys(ingredients)
                                     .map(key => {return ingredients[key]})
                                     .reduce((sum,el) => {return (sum + el)},0);

        this.setState({purchasable: sumIngredients > 0})
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continued!');
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatedPurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatedPurchaseState(updatedIngredients);
    }

    render(){
        
        const disableInfo = {...this.state.ingredients};

        for(let ingredient in disableInfo){
            disableInfo[ingredient] = disableInfo[ingredient] <= 0;
        }
        
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                                  cancelPurchase={this.purchaseCancelHandler} 
                                  continuePurchase={this.purchaseContinueHandler}
                                  burgerPrice={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls  ingredientAdded={this.addIngredientHandler} 
                                ingredientRemoved={this.removeIngredientHandler}
                                disabled={disableInfo}
                                price={this.state.totalPrice}
                                purchasable={this.state.purchasable}
                                order={this.purchaseHandler}
                                
                />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;