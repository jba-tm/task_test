import React from "react";
import {withFormik} from 'formik'
import {ValidationError} from "../forms/ValidationError";
import {connect} from 'react-redux'
import {login} from "../data/store";

const BasicForm = (props)=>{
    const {
        errors,
        handleSubmit,
        values,
        handleChange,
        setFieldTouched} = props

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <ValidationError error={errors['username']}/>

                    <ValidationError error={props.authData.errors['username']}/>
                    <input name="username"
                           onChange={handleChange}
                           onBlur={setFieldTouched} type="text" className="form-control" id="exampleInputEmail1"
                           placeholder="Enter login" value={values.username}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email or username with anyone
                        else.</small>
                </div>
                <div className="form-group row">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <ValidationError error={errors['password']}/>
                    <ValidationError error={props.authData.errors['password']}/>

                    <input name="password"
                           onChange={handleChange}
                           onBlur={setFieldTouched} value={values.password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>

                <button className="btn btn-secondary m-1"
                        onClick={e=>props.history.push('/')}> Cancel</button>
                <button type="submit"
                        className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = dataStore=>dataStore

const mapDispatchToProps = {
    login
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(withFormik({
    validate(values) {
        const errors = {}
        if (!values.username) {
            errors.username = 'Username required'
        }

        if(!values.password){
            errors.password = 'Password required'
        }
        return errors;
    },
    handleSubmit(values, { props, setSubmitting }) {
        // console.log(props)
        const {login} = props
        const payload = {username: values.username, password: values.password}

        login(payload).then(() => setSubmitting(false))
    },
    // handleChange(values){
    //
    // }
})(BasicForm))






// import React from 'react';
// import {login} from "../data/store";
// import {connect} from "react-redux";
// import {ValidatedForm} from "../forms/ValidatedForm";
// import {useHistory} from 'react-router-dom';
//
// const mapStateToProps = state => ({
//     status: state.authData.status,
//     message: state.authData.message,
//     errors: state.authData.errors || {},
// })
//
// const mapDispatchToProps = ({
//     login,
// })
//
// export const Login = connect(mapStateToProps, mapDispatchToProps)(
//     (props)=> {
//         let history = useHistory()
//
//         if( localStorage.getItem('token')!==null){
//             history.push('/')
//         }
//
//         const defaultAttrs = {type: 'text', required: true}
//         const formModel = [
//                     {'label': "Username"},
//                     {'label': "Password", attrs:{type:'password'}}
//                 ]
//
//         const handleSubmit = (data) => {
//             props.login(data)
//
//             if(localStorage.getItem('token')!==null || localStorage.getItem('token')!==''){
//                 setTimeout(()=>{},2000)
//                 history.push('/')
//             }
//         }
//
//         const handleCancel = ()=>{
//             history.push('/')
//         }
//
//         return (
//             <div className="container">
//                 <h1>Login</h1>
//
//                 <ValidatedForm formModel={ formModel }
//                                defaultAttrs={ defaultAttrs }
//                                submitCallback={ handleSubmit }
//                                cancelCallback={ handleCancel }
//                                errors={props.errors}/>
//             </div>
//         );
//     }
// )
