import React from 'react';
import {login} from "../data/store";
import {connect} from "react-redux";
import {ValidatedForm} from "../forms/ValidatedForm";
import {useHistory} from 'react-router-dom';

const mapStateToProps = state => ({
    status: state.authData.status,
    message: state.authData.message,
    _csrf: state._csrf,
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
            props.login(data)

            if(localStorage.getItem('token')!==null){
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
                <ValidatedForm formModel={ formModel } csrftoken={props._csrf}
                               defaultAttrs={ defaultAttrs }
                               submitCallback={ handleSubmit }
                               cancelCallback={ handleCancel }
                               errors={props.errors}/>
            </div>
        );
    }
)
