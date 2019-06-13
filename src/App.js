import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const app = (props) => {
  // same effect as componentDidMount
  useEffect(() => {
    console.log('onTryAutoSignin');
    props.onTryAutoSignin();
  }, [])

  let routers = (
    <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routers = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />

        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        {routers}
      </Layout>
    </div>
  );

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(app);
