import React, { useState, useEffect } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return (props) => {

        const [error, setError] = useState(null);


        const requestInterceptor = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        });

        const responseInterceptor = axios.interceptors.response.use(
            response => response,
            error => {
                setError(error);
            });

        useEffect(() => {
            // will executed after the Dom was painted (like componentDidMount)
            return () => {
                // the return function will execute when the function will disappear ( like componentWillUnmount)
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            }
        }, [requestInterceptor,responseInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Auxiliary>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        );
    }
}

export default withErrorHandler;