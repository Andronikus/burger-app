import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../utils/utility';

const auth = (props) => {

    const [authForm, setAuthForm] = useState({
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
    });

    useEffect(() => {
        // if path to redirect stills to checkout but I am not coming from building a burger
        // then we need to adjust the redirect path to Burger Builder "page"
        if (!props.buildingBurger && props.authRedirectPath === '/checkout') {
            props.onSetAuthRedirectPath('/');
        }
    }, []);

    const inputChangedHandler = (event, controlName) => {
        // copy the orderForm object
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                isValid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updatedControls);
    }

    const submitHandler = (event, isSignedUp) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignedUp);
    }

    const signInHandler = (event) => {
        submitHandler(event, false);
    };

    const signUpHandler = (event) => {
        submitHandler(event, true);
    };

    const formElementArray = [];

    for (let key in authForm) {
        formElementArray.push({ id: key, elementInfo: authForm[key] })
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
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    )
    );

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = <p style={{ color: 'red' }}>{props.error.message}</p>;
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form>
                {form}
                <Button btnType="Success" clicked={signInHandler}>Sign in</Button>
                <Button btnType="Danger" clicked={signUpHandler}>Sign up</Button>
            </form>
        </div>
    );
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
        onAuth: (email, password, isSignedUp) => dispatch(actions.auth(email, password, isSignedUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);