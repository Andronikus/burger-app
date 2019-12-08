import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {

    return (
        <div className={classes.CheckoutSummary}>
            <div>
                <h1>We hope it tastes well!</h1>
            </div>
            <div style={{width: '100%', margin: 'auto', height: '80%'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.cancelCheckout}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueCheckout}>CONTINUE </Button>
        </div>
    );
}

export default checkoutSummary;