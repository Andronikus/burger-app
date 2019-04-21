import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    require: true,
                    minLength: 6
                },
                errorMessage: 'Password min length: 6',
                isValid: false,
                touched: false
            }
        }
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

        if(rules.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        // copy the orderForm object
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                isValid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    render(){

        const formElementArray = [];

        for (let key in this.state.controls){
            formElementArray.push({id: key, elementInfo: this.state.controls[key]})
        }

        const form = formElementArray.map(formElement => (
                        <Input 
                           key={formElement.id}
                           elementType={formElement.elementInfo.elementType} 
                           elementConfig={formElement.elementInfo.elementConfig}
                           value={formElement.elementInfo.value}
                           isInvalid={!formElement.elementInfo.isValid}
                           shouldValidate={formElement.elementInfo.validation && formElement.elementInfo.touched}
                           errorMessage={formElement.elementInfo.errorMessage}
                           changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
                        )
                    );

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password) => dispatch(actions.auth(email,password))
    }
}

export default connect(null,mapDispatchToProps)(Auth);