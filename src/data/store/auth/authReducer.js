import {AuthActionTypes as ActionTypes} from "./types";

const initialState = {
    authLogin: false,
    errors: [],
    status: '',
    message:'',
    loading: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_LOADING: {
            return {...state, loading: action.payload, errors: []}
        }
        case ActionTypes.AUTH_LOGOUT:{
            return {...state, errors: [], message: 'log out'}
        }
        case ActionTypes.AUTH_LOGIN: {
            return {...state, authLogin: true, errors: [], message: 'logged in'}
        }
        case ActionTypes.AUTH_FAILURE: {
            console.log(action.payload['message'])
            return {...state,
                authLogin: false,
                message: 'errors detected',
                errors: action.payload['message'],
                status: action.payload['status']
            }
        }
        default:
            return state
    }
}
