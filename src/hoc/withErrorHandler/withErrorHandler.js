import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount(){
            console.log('[withErrorHandler] - componentWillMount');
        }

        componentDidMount = () => {
            
            console.log('[withErrorHandler] - componentDidMounted');

            axios.interceptors.request.use(request => {
                this.setState({error: null});
                console.log(request);
                return request;
            });

            axios.interceptors.response.use(
                response => response, 
                error => {
                    console.log(error);
                    this.setState({error: error})
                }
            );
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render(){
            
            console.log('[withErrorHandler] - render', this.state.error);
            
            return (
                <Auxiliary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;