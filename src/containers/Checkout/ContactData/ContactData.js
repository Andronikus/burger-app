import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        orderForm: {
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
                    require: true
                },
                errorMessage: 'Enter a valid email!',
                isValid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options : [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                isValid: true,
                value: 'fastest',
                validation: {}
            },
        },
        isFormValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({loading: true});

        const customerOrder = {};
        for(let elementInputIdentifier in this.state.orderForm){
            // key: value
            customerOrder[elementInputIdentifier] = this.state.orderForm[elementInputIdentifier].value;
        }


        const order = {
            ingredients : this.props.ingredients,
            price: this.props.price,
            orderData: customerOrder,
        }

        
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading: false})
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false})
        });
    }

    checkValidity(value, rules){

        let isValid = true;

        if(rules.require){
            isValid = isValid && value.trim() !== '';
        }

        if(rules.minLength){
            isValid = isValid && value.length >= rules.minLength;
        }

        if(rules.maxLength){
            isValid = isValid && value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangedHandler = (event, elementType) => {
        // copy the orderForm object
        const orderFormUpdated = {
            ...this.state.orderForm
        }
        // copy the elementInput object
        const elementInputUpdated = {
            ...orderFormUpdated[elementType]
        }
        // bind value with the input element value
        elementInputUpdated.value = event.target.value;
        elementInputUpdated.isValid = this.checkValidity(elementInputUpdated.value, elementInputUpdated.validation);
        elementInputUpdated.touched = true;
        orderFormUpdated[elementType] = elementInputUpdated;

        let validForm = true;

        for (let elementIdentifier in orderFormUpdated){
            validForm = validForm && orderFormUpdated[elementIdentifier].isValid;
        }
        console.log(validForm);
        this.setState({orderForm: orderFormUpdated, isFormValid: validForm});
    }

    render(){
        
        const inputFormArray = [];

        for (let key in this.state.orderForm){
            inputFormArray.push({id: key, elementInfo: this.state.orderForm[key]});
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {inputFormArray.map((inputForm) => (
                    <Input 
                           key={inputForm.id}
                           elementType={inputForm.elementInfo.elementType} 
                           elementConfig={inputForm.elementInfo.elementConfig}
                           value={inputForm.elementInfo.value}
                           isInvalid={!inputForm.elementInfo.isValid}
                           shouldValidate={inputForm.elementInfo.validation && inputForm.elementInfo.touched}
                           errorMessage={inputForm.elementInfo.errorMessage}
                           changed={(event) => this.inputChangedHandler(event,inputForm.id)}/>
                ))}
                <Button btnType="Success"  disabled={!this.state.isFormValid}> ORDER </Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner/>;
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;