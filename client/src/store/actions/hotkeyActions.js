import * as actionTypes from './actionTypes';
const baseUrl = "http://localhost:5000";

export const getNormal = (ipaddress) => {
    return dispatch => {
        fetch(baseUrl+'/api/receive/normal/' + ipaddress)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: actionTypes.GOT_SINGLE_NORMAL, normals: res })
        })
    };
};

export const getExpert = (ipaddress) => {
    return dispatch => {
        fetch(baseUrl+'/api/receive/expert/' + ipaddress)
        .then(res => res.json())
        .then(res => {
            dispatch({ type: actionTypes.GOT_SINGLE_EXPERT, experts: res })
        })
    };
};

export const getAllClient = () => {
    return dispatch => {
        return fetch(baseUrl+'/api/receive/client')
        .then(res => res.json()) 
        .then(res => {
            localStorage.setItem('BasicMERNStackAppAllArticles', JSON.stringify(res));
            dispatch({ type: actionTypes.GOT_ALL_CLIENT, clients: res })
        })
        .catch(err=> console.log("Client error"))
    };
};

