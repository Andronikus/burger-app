import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxilary from '../../hoc/Auxiliary/Auxiliary'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = (props) => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

   

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Auxilary>
            <Toolbar SideDrawerToggled={sideDrawerToggleHandler} isAuthenticated={props.isAuthenticated} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerCloseHandler} isAuthenticated={props.isAuthenticated} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxilary>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);