import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

describe('Test of authentication reducer', () => {
    it('should return initial state when no state and action available', () =>{
        expect(reducer(undefined,{})).toEqual( {
            token: null,
            userID: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it('should have a token and userId value when auth success', () => {
        expect(reducer(initialState, {type: actionTypes.AUTH_SUCCESS, 
                                      tokenID: 'some-token', 
                                      userID: 'some-user-id'})).toEqual({...initialState, token: 'some-token', userID: 'some-user-id'});
    })
})