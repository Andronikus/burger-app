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
                ordersPushed.push({id: key, ...res.data[key]});
            }
            this.setState({orders: ordersPushed});
        })
        .catch(err => this.setState({loading: false}));
    }

    
    render(){
        
        let ordersToShow = null;

        if (this.state.orders !== null){
            ordersToShow = this.state.orders.map( order => (
                <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
            ));
        }
       
        return(
            <div>
                { ordersToShow }
            </div>
        );
    }

}

export default WithErrorHandler(Orders,axios);