import axios from './customize-axios';

export const fetchListUser = (page) => {
    return axios.get(`/api/users?page=${page}`);
};

export const postCreateUser = (name, job) => {
    return axios.post('/api/users', { name, job });
};
