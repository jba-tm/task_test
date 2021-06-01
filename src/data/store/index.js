import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger"
import {authReducer} from "./auth/authReducer"
import {taskReducer} from "./task/taskReducer"
import { default as reducer, actions } from 'redux-csrf';
import {getCookie} from "../../utils/helper";


const middlewares = [thunk, logger]


const enhancedReducer = combineReducers(
    {
        authData: authReducer,
        taskData: taskReducer,
        _csrf: reducer,
    }
)

const store =  createStore(enhancedReducer, applyMiddleware(...middlewares))
store.dispatch(actions.setCsrfToken(getCookie('csrftoken')))

export default store;

export {login, logout} from './auth/actions'
export {createTask, updateTask, getTasks} from './task/actions'

