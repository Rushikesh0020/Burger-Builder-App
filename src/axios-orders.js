import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-92b99-default-rtdb.firebaseio.com/'
});

export default instance;