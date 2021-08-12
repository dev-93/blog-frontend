import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { CommonStore } from './store/common';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api`;
const KMC_ROOT = `${process.env.REACT_APP_KMC_ROOT}`;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
        console.log(err);
    }

    return err;
};

const responseBody = res => res.body ?? res.text;

const tokenPlugin = req => {

    // console.log(req);
    
    // const CommonStore = useCommonStore();

    // if (CommonStore.token) {
    //     req.set('Authorization', `Bearer ${CommonStore.token}`);
    // }
};

const requests = {
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    kmc: params =>
        superagent
            .get(`${KMC_ROOT}?${params}`)
            .end(handleErrors)
            .then(responseBody),
};

const Auth = {
    current: () =>
        requests.get('/user'),
    emailCheck: (email) =>
        requests.get(`/login/email/${email}`),
    regist: (data) =>
        requests.post('/auth/register', data),
    login: (data) =>
        requests.post(`/auth/login`, data),
};

export default {
    Auth,
};