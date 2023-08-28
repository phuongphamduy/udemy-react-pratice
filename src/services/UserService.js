import axios from 'axios';

export const fetchListUser = () => {
    return axios.get('https://reqres.in/api/users?page=1');
};
