import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        console.log(this.props);
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch( error => {
                this.setState({error: true});
            });
    };

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
       const queryParams = [];
       for (let ingredient in this.state.ingredients){
          queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]))
       }
       queryParams.push('price=' + this.state.totalPrice);
       
       const queryString = queryParams.join('&');
       console.log(queryString);
       this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryString
        });
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

        let burger = this.state.error? <p>Ingredients can't be loaded! </p> : <Spinner />;
        let orderSummary = null; 

        if(this.state.ingredients){
            burger = <Auxiliary>
                        <Burger ingredients={this.state.ingredients}></Burger>
                        <BuildControls  ingredientAdded={this.addIngredientHandler} 
                                        ingredientRemoved={this.removeIngredientHandler}
                                        disabled={disableInfo}
                                        price={this.state.totalPrice}
                                        purchasable={this.state.purchasable}
                                        order={this.purchaseHandler}
                                        
                        />
                     </Auxiliary>
            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                                         cancelPurchase={this.purchaseCancelHandler} 
                                         continuePurchase={this.purchaseContinueHandler}
                                         burgerPrice={this.state.totalPrice}/>;
        }

        if(this.state.loading){
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);