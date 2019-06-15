import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = (props) => {

    console.log('Orders function')
    
    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    }, []);

    let ordersToShow = <Spinner />;

    if (!props.loading) {
        ordersToShow = null;
        if (props.orders !== null) {
            ordersToShow = props.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
            ));
        }
    }

    return (
        <div>
            {ordersToShow}
        </div>
    );

}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userID
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WithErrorHandler(orders, axios)));