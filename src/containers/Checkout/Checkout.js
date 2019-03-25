import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component{

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let el of query.entries()){
            if(el[0] === 'price'){
                price = el[1];
            }else{
                ingredients[el[0]] = +el[1];
            }
        }

        this.setState({ingredients: ingredients, totalPrice: price});
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
                <Route path={this.props.match.path + '/contact-data'} 
                       render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }

}

export default Checkout;