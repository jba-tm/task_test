import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger"
import {authReducer} from "./auth/authReducer"
import {taskReducer} from "./task/taskReducer"
const middlewares = [thunk, logger]

const enhancedReducer = combineReducers(
    {
        authData: authReducer,
        taskData: taskReducer,
    }
)

export default createStore(enhancedReducer, applyMiddleware(...middlewares))

export {login, logout} from "./auth/actions"
export {createTask, getTasks} from './task/actions'
