import fetch from 'isomorphic-fetch';

import FetchError from './FetchError';
import {CREATE, GET_ALL, GET_ONE, EDIT, DELETE} from './methods';

const SERVER_URL = 'http://localhost:3000';
const DB_URL = `${SERVER_URL}/dynawiki`;

const callFetch = (url, method, data) => fetch(url, {
    method,
    body: data && JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
        dataType: 'json',
    },
});

const callFetchAndProcessReply = (url, method, data) =>
    callFetch(url, method, data).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new FetchError(response);
        }
    });

const callFetchAndThrow = (url, method, data) =>
    callFetch(url, method, data).then((response) => {
        if (!response.ok) {
            throw new FetchError(response);
        }
    });

const methodDefinitions = {};

methodDefinitions[CREATE] = (collection) => (data) =>
    callFetch(`${DB_URL}/${collection}`, 'POST', data).then((response) => {
        if (response.ok) {
            const location = response.headers.get('Location');
            return callFetchAndProcessReply(`${SERVER_URL}${location}`, 'GET');
        } else {
            throw new FetchError(response);
        }
    });

methodDefinitions[GET_ALL] = (collection) => (query = {}) => callFetchAndProcessReply(`${DB_URL}/${collection}?query=${JSON.stringify(query)}`, 'GET');

methodDefinitions[GET_ONE] = (collection) => (id) => callFetchAndProcessReply(`${DB_URL}/${collection}/${id}`, 'GET');

methodDefinitions[EDIT] = (collection) => (id) => callFetchAndThrow(`${DB_URL}/${collection}/${id}`, 'PUT');

methodDefinitions[DELETE] = (collection) => (id) => callFetchAndThrow(`${DB_URL}/${collection}/${id}`, 'DELETE');

export default (collection, methods) => methods.reduce((object, method) => Object.assign(object, {[method]: methodDefinitions[method](collection)}), {});
