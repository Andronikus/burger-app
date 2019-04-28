import React, { Component } from 'react';

const asyncComponent = (importFunction) => {

    return class extends Component {
        state = {
            component : null
        }

        componentDidMount(){
            importFunction()
            .then( cmp => this.setState({component: cmp.default}))
        }

        render(){
            
            const Comp = this.state.component;
            
            return Comp ? <Comp {...this.props}/> : null;
        }
    }
}

export default asyncComponent;