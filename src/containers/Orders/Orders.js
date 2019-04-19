import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders();
    }

    render(){
        let ordersToShow = <Spinner/>;

        if(!this.props.loading){
            ordersToShow = null;
            if (this.props.orders !== null){
                ordersToShow = this.props.orders.map( order => (
                    <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
                ));
            }
        }

        return(
            <div>
                { ordersToShow }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
       onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));