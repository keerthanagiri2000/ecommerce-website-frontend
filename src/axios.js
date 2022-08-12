import axios from 'axios';

const instance = axios.create({
    baseURL: "https://mernshop-ecommerce.herokuapp.com",
});

export default instance;