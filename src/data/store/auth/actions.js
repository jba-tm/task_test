import {AuthActionTypes as ActionTypes, AuthDataTypes as DataTypes} from "./types";
import axios from "axios";
import {RestUrls} from "../../urls";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const FormData = require('form-data');

export const logout = (data, callback=()=>{})=>{
    localStorage.removeItem('token')
    return dispatch=>{
        dispatch({type:ActionTypes.AUTH_LOGOUT, payload: false})
    }
}

export const login = (data, callback=()=>{})=>{
    const formData = new FormData();
    Object.keys(data).forEach(key =>{
        formData.append(key.toString(), data[key]);
    });

    return async dispatch => {
        await axios.post(RestUrls[DataTypes.AUTH], formData,
        ).then(
            response=>{
                localStorage.setItem('token', response.data.token)
                dispatch({type: ActionTypes.AUTH_LOGIN, payload: response.data})
            }
        ).catch(err=>{
            dispatch({type: ActionTypes.AUTH_FAILURE, payload: err.response.data})
        })
    }
}

