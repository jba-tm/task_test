import React from 'react';
import {login} from "../data/store";
import {connect} from "react-redux";
import {ValidatedForm} from "../forms/ValidatedForm";
import {useHistory} from 'react-router-dom';

const mapStateToProps = state => ({
    authLogin: state.authData.authLogin,
    message: state.authData.message,
    errors: state.authData.errors || {},
})

const mapDispatchToProps = ({
    login,
})

export const Login = connect(mapStateToProps, mapDispatchToProps)(
    (props)=> {
        let history = useHistory()

        if( localStorage.getItem('token')!==null){
            history.push('/')
        }

        const defaultAttrs = {type: 'text', required: true}
        const formModel = [
                    {'label': "Username"},
                    {'label': "Password"}
                ]

        const handleSubmit = (data) => {
            // e.preventDefault()
            props.login(data)

            if(localStorage.getItem('token')!==null){
            // if (props.authLogin===true){
                setTimeout(()=>{},2000)
                history.push('/')
            }
        }

        const handleCancel = ()=>{
            history.push('/')
        }

        return (
            <div className="container">
                <h1>Login</h1>
                <ValidatedForm formModel={ formModel }
                               defaultAttrs={ defaultAttrs }
                               submitCallback={ handleSubmit }
                               cancelCallback={ handleCancel }
                               errors={props.errors}/>
            </div>
        );
    }
)
