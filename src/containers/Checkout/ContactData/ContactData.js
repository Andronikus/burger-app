import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import * as action from '../../../store/actions/orders';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../utils/utility';

const contactData = (props) => {

    useState()

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                require: true
            },
            errorMessage: 'Enter a valid name!',
            isValid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                require: true
            },
            errorMessage: 'Enter a valid street!',
            isValid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZipCode'
            },
            value: '',
            validation: {
                require: true,
                minLength: 5,
                maxLength: 5
            },
            errorMessage: 'Enter a valid ZipCode (lenght must the 5)!',
            isValid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                require: true
            },
            errorMessage: 'Country cannot be empty!',
            isValid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your email'
            },
            value: '',
            validation: {
                require: true,
                isEmail: true
            },
            errorMessage: 'Enter a valid email!',
            isValid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            isValid: true,
            value: 'fastest',
            validation: {}
        },
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const customerOrder = {};
        for (let elementInputIdentifier in orderForm) {
            // key: value
            customerOrder[elementInputIdentifier] = orderForm[elementInputIdentifier].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: customerOrder,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event, elementType) => {

        // copy the elementInput object
        const elementInputUpdated = updateObject(orderForm[elementType], {
            value: event.target.value,
            isValid: checkValidity(event.target.value, orderForm[elementType].validation),
            touched: true
        });

        // copy the orderForm object
        const orderFormUpdated = updateObject(orderForm, {
            [elementType]: elementInputUpdated
        })

        let validForm = true;

        for (let elementIdentifier in orderFormUpdated) {
            validForm = validForm && orderFormUpdated[elementIdentifier].isValid;
        }

        setOrderForm(orderFormUpdated);
        setIsFormValid(validForm);
    }


    const inputFormArray = [];

    for (let key in orderForm) {
        inputFormArray.push({ id: key, elementInfo: orderForm[key] });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {inputFormArray.map((inputForm) => (
                <Input
                    key={inputForm.id}
                    elementType={inputForm.elementInfo.elementType}
                    elementConfig={inputForm.elementInfo.elementConfig}
                    value={inputForm.elementInfo.value}
                    isInvalid={!inputForm.elementInfo.isValid}
                    shouldValidate={inputForm.elementInfo.validation && inputForm.elementInfo.touched}
                    errorMessage={inputForm.elementInfo.errorMessage}
                    changed={(event) => inputChangedHandler(event, inputForm.id)} />
            ))}
            <Button btnType="Success" disabled={!isFormValid}> ORDER </Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) => dispatch(action.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));