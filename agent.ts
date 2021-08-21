import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { Form } from './store/auth';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = `${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api`;

const handleErrors = (err: any) => {
    if (err && err.response && err.response.status === 401) {
        console.log(err);
    }

    return err;
};

const responseBody = (res: any) => res.body ?? res.text;

const tokenPlugin = (req: any) => {};

type Url = string;

const requests = {
    del: (url:Url) =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: (url:Url) =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url: Url, body: object) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url: Url, body?: any) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    patch: (url: Url, body?: any) =>
        superagent
            .patch(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
};

const Auth = {
    current: () =>
        requests.get('/user'),
    emailCheck: (email: string) =>
        requests.get(`/login/email/${email}`),
    regist: (data: Form) =>
        requests.post('/auth/register', data),
    login: (data: Form) =>
        requests.post(`/auth/login`, data),
    logout: () =>
        requests.post(`/auth/logout`),
};

const Blog = {
    createBlog: (data: object) =>
        requests.post('/posts', data),
    getBlogList: (data?: any) =>
        data ? (requests.get(`/posts?${data}`)) : (requests.get(`/posts`)) ,
    deletePost: (id: string) =>
        requests.del(`/posts/${id}`),
    updatePost: (id: string, data: any) => 
        requests.patch(`/posts/${id}`, data),
};

export default {
    Auth,
    Blog
};