import axios from './customize-axios';

export const fetchListUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
};
