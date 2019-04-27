import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../utils/utility';

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

    componentDidMount(){
        // if path to redirect stills to checkout but I am not coming from building a burger
        // then we need to adjust the redirect path to Burger Builder "page"
        if(!this.props.buildingBurger && this.props.authRedirectPath==='/checkout'){
            this.props.onSetAuthRedirectPath('/');
        }
    }

    inputChangedHandler = (event, controlName) => {
        // copy the orderForm object
        const updatedControls = updateObject(this.state.controls,{
            [controlName]: updateObject(this.state.controls[controlName],{
                value: event.target.value,
                isValid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({controls: updatedControls});
    }

    submitHandler = (event,isSignedUp) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, isSignedUp);
    }

    signInHandler = (event) => {
        this.submitHandler(event,false);
    };

    signUpHandler = (event) => {
        this.submitHandler(event,true);
    };

    

    render(){
        const formElementArray = [];

        for (let key in this.state.controls){
            formElementArray.push({id: key, elementInfo: this.state.controls[key]})
        }

        let form = formElementArray.map(formElement => (
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
        if (this.props.loading){
            form = <Spinner/>;
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = <p style={{color: 'red'}}>{this.props.error.message}</p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form>
                    {form}
                    <Button btnType="Success" clicked={this.signInHandler}>Sign in</Button>
                    <Button btnType="Danger" clicked={this.signUpHandler}>Sign up</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        buildingBurger: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password, isSignedUp) => dispatch(actions.auth(email,password,isSignedUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);