import {AuthActionTypes as ActionTypes} from "./types";

const initialState = {
    errors: {},
    status: '',
    message:'',
    loading: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_LOADING: {
            return {...state, loading: action.payload, errors: {}}
        }
        case ActionTypes.AUTH_LOGOUT:{
            return {...state, errors: {}, message: 'log out'}
        }
        case ActionTypes.AUTH_LOGIN: {
            return {...state, status: action.payload.status, errors: {}, message: 'logged in'}
        }
        case ActionTypes.AUTH_FAILURE: {
            return {...state,
                message: 'errors detected',
                errors: action.payload['message'],
                status: action.payload['status']
            }
        }
        default:
            return state
    }
}
