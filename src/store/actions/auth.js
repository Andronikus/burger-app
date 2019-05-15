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

export const authLogoutInit = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}

export const auth = (email, password, isSignedUp) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignedUp: isSignedUp
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}