import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
        console.log('[Checkout]', this.props.location.search);
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for(let el of query.entries()){
            ingredients[el[0]] = +el[1];
        }

        this.setState({ingredients: ingredients});
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    cancelCheckout={this.cancelCheckoutHandler} 
                    continueCheckout={this.continueCheckoutHandler} 
                    ingredients={this.state.ingredients} 
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }

}

export default Checkout;