import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderID});
    return updateObject(state, {orders: state.orders.concat(newOrder),loading: false,purchased: true});
}

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {loading: false});
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true});
}
const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false});
}

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const fectOrdersSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders,loading: false});
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {loading: false});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fectOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);  
        default: return state;
    }
}

export default reducer;