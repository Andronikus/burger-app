import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: null,
        loading: true
    }

    componentDidMount(){
        axios.get('orders.json')
        .then( res => {
            this.setState({loading: false});
            const ordersPushed = [];
            for (let key in res.data){
                // create an array of orders
                ordersPushed.push({key: key, ...res.data[key]});
            }
            this.setState({orders: ordersPushed});
        })
        .catch(err => this.setState({loading: false}));
    }

    
    render(){
        return(
            <div>
                <Order />
                <Order />
            </div>
        );
    }

}

export default WithErrorHandler(Orders,axios);