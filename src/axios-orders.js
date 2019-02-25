import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-with-sauce.firebaseio.com'
})

export default instance;