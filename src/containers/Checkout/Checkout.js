import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Checkout extends Component{
    
    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }

    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/"/>;

        if (this.props.ingredients){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <Auxiliary>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        cancelCheckout={this.cancelCheckoutHandler} 
                        continueCheckout={this.continueCheckoutHandler} 
                        ingredients={this.props.ingredients} 
                    />
                    <Route path={this.props.match.path + '/contact-data'} 
                        component={ContactData}/>
                </Auxiliary>
            );
        }
        return summary
    }

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);