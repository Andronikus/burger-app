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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options : [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            },
        },
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
        orderFormUpdated[elementType] = elementInputUpdated;
        this.setState({orderForm: orderFormUpdated});
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
                           changed={(event) => this.inputChangedHandler(event,inputForm.id)}/>
                ))}
                <Button btnType="Success" > ORDER </Button>
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