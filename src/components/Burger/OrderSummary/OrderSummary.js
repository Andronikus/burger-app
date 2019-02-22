import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
                                     .map(ingredientKey => {
                                         return (
                                             <li key={ingredientKey}>
                                                 <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>: {props.ingredients[ingredientKey]}
                                             </li>
                                         );
                                     });

    return(

        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the follow ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Burger Price: {props.burgerPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancelPurchase} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.continuePurchase} btnType='Success'>CONTINUE</Button>
        </Auxiliary>
    );
}

export default orderSummary;