import axios from 'axios';
import * as actionTypes from './actionTypes';
import { API_KEY } from '../../utils/utility';

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

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime);
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

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;

        if (!isSignedUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('userId',response.data.localId);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',new Date(new Date().getMilliseconds + response.data.expiresIn));
                dispatch(authSuccess(response.data.localId, response.data.idToken));
                dispatch(checkAuthTimeout(parseInt(response.data.expiresIn)*1000))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
} 