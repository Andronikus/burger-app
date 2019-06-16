import { useState, useEffect } from 'react'

export default httpClient => {
    const [error, setError] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    });

    const responseInterceptor = httpClient.interceptors.response.use(
        response => response,
        error => {
            setError(error);
        });

    useEffect(() => {
        // will executed after the Dom was painted (like componentDidMount)
        return () => {
            // the return function will execute when the function will disappear ( like componentWillUnmount)
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        }
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    }

    console.log('error: ', error);

    return [error, errorConfirmedHandler]
}