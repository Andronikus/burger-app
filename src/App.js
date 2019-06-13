import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const app = (props) => {
  // same effect as componentDidMount
  useEffect(() => {
    props.onTryAutoSignin();
  }, [])

  let routers = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routers = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />

        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<div> <h1>Loading...</h1></div>}>
          {routers}
        </Suspense>
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
