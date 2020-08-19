import axios from "axios"

// functionality to attach token to any request when a user logs in
export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

/** 
* @param {string} method the http verb you want to userData
* @param {string} path the route path / endpoint 
* @param {object} data (optional) data in JSON format for POST request
*/
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](path, data)
        .then(res => {
            return resolve(res.data);
        })
        .catch(err => {
            return reject(err.response.data.error);
        });
    });
}
