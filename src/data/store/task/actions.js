import {TaskActionTypes as ActionTypes, TaskDataTypes as DataTypes} from "./types";
import axios from "axios";
import {RestUrls} from "../../urls";
const FormData = require('form-data');

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const getTasks = (data={}) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.TASKS_LOADING, payload: true
        })

        axios.get(`${RestUrls[DataTypes.TASKS]}/`, {params: {...data}})
            .then(response => {
                dispatch({type: ActionTypes.TASKS_GET, payload: response.data})
            })
            .catch(err => {
                    console.log(err)
                    dispatch({type: ActionTypes.TASKS_LOADING, payload: false})
                }
            )
    }
}

export const createTask = (data, callback = () => {}) => {
    const formData = new FormData();
    Object.keys(data).forEach(key =>{
        formData.append(key.toString(), data[key]);
    });
    return async dispatch => {
        await axios.post(RestUrls[DataTypes.TASK_CREATE], formData)
            .then(response => {
                dispatch({type: ActionTypes.TASK_CREATE, payload: response.data})
            })
            .catch(err => {
                dispatch({type: ActionTypes.TASKS_FAILURE, payload: err.response.data})
            })
    }
}


export const updateTask = (data, callback=()=>{})=>{
    const formData = new FormData();
    const id = data.id
    data.id = undefined
    Object.keys(data).forEach(key =>{
        formData.append(key.toString(), data[key]);
    });

    return async dispatch => {
        return await axios.post(`${RestUrls[DataTypes.TASK_UPDATE]}/${id}/`, formData)
            .then(response => {
                dispatch({type: ActionTypes.TASK_UPDATE, payload: response.data})
            })
            .catch(err => {
                dispatch({type: ActionTypes.TASKS_FAILURE, payload: err.response.data})
            })
    }
}
