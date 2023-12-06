import * as actionTypes from '../actions/actionTypes';

const initialState = {
    normals: {},
    experts: [],
    clients: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GOT_ALL_CLIENT:{
            return {
                ...state,
                clients: action.clients
            };
        }
        case actionTypes.GOT_SINGLE_NORMAL: {
            return {
                ...state,
                normals: action.normals
            }
        }
        case actionTypes.GOT_SINGLE_EXPERT:
            return {
                ...state,
                experts: action.experts
            };
        default:
            return state;
    }
};

export default reducer;
