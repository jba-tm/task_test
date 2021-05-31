import React from "react";
import {ValidationError} from "../forms/ValidationError";
import {connect} from "react-redux";
import {createTask, login} from "../data/store";
import {withFormik} from "formik";

const BasicForm = (props)=>{
    const {
        errors,
        handleSubmit,
        values,
        handleChange,
        setFieldTouched} = props

    return (
        <div className="container">
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group row m-2">
                    <label htmlFor="staticUsername" className="col-sm-2 col-form-label">Username</label>
                    <ValidationError error={errors['username']}/>

                    <ValidationError error={props.authData.errors['username']}/>

                    <div className="col-sm-10">
                        <input type="text" name="username"
                               onBlur={setFieldTouched}
                               onChange={handleChange} className="form-control" id="staticUsername"
                               value={values.username}/>
                    </div>
                </div>
                <div className="form-group row m-2">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                    <ValidationError error={errors['email']}/>

                    <ValidationError error={props.authData.errors['email']}/>

                    <div className="col-sm-10">
                        <input type="text" name="email"
                               onBlur={setFieldTouched}
                               onChange={handleChange} className="form-control" id="staticEmail"
                               value={values.email}/>
                    </div>
                </div>
                <div className="form-group row m-2">
                    <div className="col-sm-2">Completed</div>
                    <ValidationError error={errors['completed']}/>

                    <ValidationError error={props.authData.errors['completed']}/>

                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" checked={values.completed} name="completed"
                                   onBlur={setFieldTouched}
                                   onChange={handleChange} type="checkbox" id="gridCheck1"/>
                        </div>
                    </div>
                </div>
                <div className="form-group row m-2">
                    <label htmlFor="textArea my-2">Edit the Text</label>
                    <ValidationError error={errors['text']}/>

                    <ValidationError error={props.authData.errors['text']}/>

                    <textarea className="form-control" id="textArea"
                              onBlur={setFieldTouched}
                              onChange={handleChange} name="text" rows="5"/>
                </div>
                <div className="form-group align-content-around">
                    <button type='submit' className="btn btn-primary btn-large my-3">Save</button>
                </div>
            </form>
        </div>)
}

const mapStateToProps = dataStore=>dataStore

const mapDispatchToProps = {
    createTask
}
export const TaskForm = connect(mapStateToProps, mapDispatchToProps)(withFormik({
    validate(values) {
        const errors = {}
        if (!values.username) {
            errors.username = 'Username required'
        }

        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        return errors;
    },
    handleSubmit(values, { props, setSubmitting }) {
        // console.log(props)
        const {createTask} = props
        const payload = {username: values.username, email: values.email, text: values.text}

        createTask(payload).then(() => setSubmitting(false))
    },
})(BasicForm))

// import {ValidatedForm} from "../forms/ValidatedForm";
// import {createTask} from "../data/store";
// import {connect} from 'react-redux'
// import {useHistory} from 'react-router-dom';
//
// const mapStateToProps = state => ({
//     message: state.taskData.message,
//     errors: state.taskData.errors || {},
// })
//
// const mapDispatchToProps = {
//     createTask
// }
//
// export const TaskForm = connect(mapStateToProps, mapDispatchToProps)(
//     (props)=>{
//         let history = useHistory()
//         const defaultAttrs = {type: 'text', required: false}
//         const formModel = [
//             // {'label': 'Id': attrs: {}}
//             {'label': "Username",},
//             {'label': 'Email', attrs: {type: 'text'}},
//             {'label': "Completed", attrs: {type: 'checkbox'}},
//             {'label': "Text", attrs: {type: 'textarea'}}
//         ]
//
//         const handleSubmit = (data) =>{
//             props.createTask(data)
//         }
//
//         const handleCancel = ()=>{
//             history.push('/')
//         }
//         return (<>
//             <div className="container">
//                 <h1>Create Task</h1>
//
//                 <div className="row">
//                     <div className="col m-2">
//                         <ValidatedForm formModel={ formModel }
//                                        defaultAttrs={ defaultAttrs }
//                                        submitCallback={ handleSubmit }
//                                        cancelCallback={ handleCancel }
//                                        errors={props.errors}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>)
//     }
// )