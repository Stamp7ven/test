import axios from 'axios';

const ipAddress = process.env.REACT_APP_STRAPI_IP_ADDRESS || 'localhost';
const port = process.env.REACT_APP_STRAPI_PORT || 1337;

export default axios.create({

    baseURL: "http://" + ipAddress + ":" + port + "/",
    headers: {
        "Content-type": "application/json"
    }
});
