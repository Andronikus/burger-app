import React, { useState, useEffect } from 'react';
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


const burgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    // helper function to manage the purchasable state
    const updatedPurchaseState = (ingredients) => {

        const sumIngredients = Object.keys(ingredients)
            .map(key => { return ingredients[key] })
            .reduce((sum, el) => { return (sum + el) }, 0);

        return sumIngredients > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onPurchaseInit();
        props.history.push('checkout');
    }

    const disableInfo = { ...props.ings };

    for (let ingredient in disableInfo) {
        disableInfo[ingredient] = disableInfo[ingredient] <= 0;
    }

    let burger = props.error ? <p>Ingredients can't be loaded! </p> : <Spinner />;
    let orderSummary = null;

    if (props.ings) {
        burger = <Auxiliary>
            <Burger ingredients={props.ings}></Burger>
            <BuildControls ingredientAdded={props.onIngredientAdded}
                ingredientRemoved={props.onIngredientRemoved}
                disabled={disableInfo}
                price={props.totalPrice}
                purchasable={updatedPurchaseState(props.ings)}
                order={purchaseHandler}
                isAuthenticated={props.isAuthenticated}

            />
        </Auxiliary>
        orderSummary = <OrderSummary ingredients={props.ings}
            cancelPurchase={purchaseCancelHandler}
            continuePurchase={purchaseContinueHandler}
            burgerPrice={props.totalPrice} />;
    }

    return (
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}

        </Auxiliary>
    );
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));