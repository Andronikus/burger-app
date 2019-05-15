import { delay } from "redux-saga/effects";
import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';
import { API_KEY } from '../../utils/utility';

export function* logoutSaga(action) {
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');

    yield put(actions.authLogout());
};

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime);
    yield put(actions.authLogoutInit());
};

export function* authUserSaga(action){

    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + API_KEY;

    if (!action.isSignedUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + API_KEY;
    }

    try{
        const response = yield axios.post(url, authData);

        const expirationDate = yield new Date(new Date().getTime() + 3600*1000);
        yield localStorage.setItem('userId',response.data.localId);
        yield localStorage.setItem('token',response.data.idToken);
        yield localStorage.setItem('expirationDate',expirationDate);
        yield put(actions.authSuccess(response.data.localId, response.data.idToken));
        yield console.log(response.data.expiresIn);
        yield put(actions.checkAuthTimeout(parseInt(response.data.expiresIn)*1000))
    }catch(error){
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga (action){
    const token = yield localStorage.getItem('token');
    
    if(!token){
        yield put (actions.authLogoutInit());
    }else{
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            
        if(expirationDate > new Date()){
            yield put(actions.authSuccess(localStorage.getItem('userId'), token));
            // diference of expirationDate calculated while logged in and now in miliseconds
            const expiresIn = yield (expirationDate.getTime() - new Date().getTime());
            yield put(actions.checkAuthTimeout(expiresIn));
        }else{
            yield put(actions.authLogoutInit());
        }
    }
}