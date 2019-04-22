import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (userID, tokenID) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenID: tokenID,
        userID: userID
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignedUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyClQjnfXbiBsVlSRY9D1J5yjKRFor4yvaY';

        if(!isSignedUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyClQjnfXbiBsVlSRY9D1J5yjKRFor4yvaY';
        }

        axios.post(url,authData)
        .then(response => {
            console.log(response.data);
            dispatch(authSuccess(response.data.localId, response.data.idToken));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });
    }
}