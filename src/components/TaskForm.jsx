import React from "react";
import {ValidatedForm} from "../forms/ValidatedForm";
import {createTask} from "../data/store";
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom';

const mapStateToProps = state => ({
    message: state.taskData.message,
    errors: state.taskData.errors || {},
})

const mapDispatchToProps = {
    createTask
}

export const TaskForm = connect(mapStateToProps, mapDispatchToProps)(
    (props)=>{
        const [errors, setErrors] = React.useState({})
        let history = useHistory()
        const defaultAttrs = {type: 'text', required: false}
        const formModel = [
            // {'label': 'Id': attrs: {}}
            {'label': "Username",},
            {'label': 'Email', attrs: {type: 'text'}},
            {'label': "Completed", attrs: {type: 'checkbox'}},
            {'label': "Text", attrs: {type: 'textarea'}}
        ]

        const handleSubmit = (data) =>{
            props.createTask(data)
        }

        const handleCancel = ()=>{
            history.push('/')
        }
        return (<>
            <div className="container">
                <h1>Create Task</h1>

                <div className="row">
                    <div className="col m-2">
                        <ValidatedForm formModel={ formModel }
                                       defaultAttrs={ defaultAttrs }
                                       submitCallback={ handleSubmit }
                                       cancelCallback={ handleCancel }
                                       errors={props.errors}
                        />
                    </div>
                </div>
            </div>
        </>)
    }
)