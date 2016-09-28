import FetchError from './FetchError';

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

const DB_URL = 'http://localhost:3000/dynawiki';

const getUrl = (collection, id) => `${DB_URL}/${collection}/${id}`;

export const create = (collection) => (data) =>
    callFetch(`${DB_URL}/${collection}`, 'POST', data).then((response) => {
        if (response.ok) {
            const location = response.headers.get('Location');
            return callFetchAndProcessReply(location, 'GET');
        } else {
            throw new FetchError(response);
        }
    });

export const getAll = (collection) => (query) => callFetchAndProcessReply(`${DB_URL}/${collection}?query=${JSON.stringify(query)}`, 'GET');

export const getOne = (collection) => (id) => callFetchAndProcessReply(getUrl(collection, id), 'GET');

export const edit = (collection) => (id) => callFetchAndThrow(getUrl(collection, id), 'PUT');

export const remove = (collection) => (id) => callFetchAndThrow(getUrl(collection, id), 'DELETE');
