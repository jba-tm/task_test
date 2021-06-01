import {TaskActionTypes as ActionTypes} from "./types";

const initialState = {
    tasks: [],
    loading: false,
    message: '',
    status: '',
    count: 0,
    errors: [],
    sortBy: 'username',
    page: 1,
}

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.TASKS_LOADING: {
            return {...state, loading: action.payload}
        }
        case ActionTypes.TASKS_GET: {
            return {
                ...state,
                loading: false,
                page: action.payload['page'],
                sortBy: action.payload['sort_field'],
                tasks: action.payload['tasks'],
                count: action.payload['total_task_count'],
                status: action.payload['status'],
                errors: [],
                message: ''
            }
        }

        case ActionTypes.TASK_CREATE:{
            return {
                ...state,
                status: action.payload.status,
                errors: [],
                message: 'Task created',
            }
        }
        case ActionTypes.TASK_UPDATE:{
            return {
                ...state,
                status: action.payload.status,
                errors: [],
                message: 'Task updated',
            }
        }
        case ActionTypes.TASKS_FAILURE:{
            return {
                ...state,
                message: 'Errors detected',
                errors: action.payload['message'],
                status: action.payload['status']
            }
        }
        default:
            return state
    }
}
