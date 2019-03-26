import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        this.setState({loading: true});
        const order = {
            ingredients : this.props.ingredients,
            customer: {
                address: {
                    country: 'Portugal',
                    street: 'Somewhere in the world',
                    zipCode: '123456',
                    price: this.props.price,
                },
                email: 'qwerty@gmail.com',
                name: 'Andronikus'
            },
            deliveryMethod: 'fastest'
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

    render(){
        
        let form = (
            <form>
                <Input inputtype="text" name="name" placeholder="Your Name"></Input>
                <Input inputtype="email" name="email" placeholder="Your Email"></Input>
                <Input inputtype="text" name="street" placeholder="Street "></Input>
                <Input inputtype="text" name="postal" placeholder="Postal Code"></Input>
                <Button btnType="Success" clicked={this.orderHandler}> ORDER </Button>
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