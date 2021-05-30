import React from "react";
import {ValidationError} from "./ValidationError";
import {GetMessages} from "./ValidationMessages";

export class ValidatedForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {validationErrors: {}}
        this.formElements = {}
    }

    componentDidMount() {
        if(Object.keys(this.props.errors).length > 0){
            this.setState({validationErrors: {...this.props.errors}})
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !==this.props){
            this.setState({validationErrors: this.props.errors})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
            const newState = {...this.state, validationErrors: {}}
            Object.values(this.formElements).forEach(elem => {
                if (!elem.checkValidity()) {
                    newState.validationErrors[elem.name] = GetMessages(elem)
                }
            })
        this.setState(
            {...newState}, () => {
            if (Object.keys(this.state.validationErrors).length === 0) {
                const data = Object.assign(...Object.entries(this.formElements).map(e => ({[e[0]]: e[1].value})))
                this.props.submitCallback(data)
            }
        })
    }

    registerRef = (element) => {
        if (element !== null) {
            this.formElements[element.name] = element
        }
    }

    renderElement = (modelItem) => {
        const name = modelItem.name || modelItem.label.toLowerCase()
        if ('attrs' in modelItem){
            if ('type' in modelItem.attrs){
                if (modelItem.attrs.type === 'textarea') {
                    return (
                        <div key={modelItem.label} className="form-group row">
                            <label htmlFor={name}>{modelItem.label}</label>
                            <ValidationError errors={this.state.validationErrors[name]}/>
                            <textarea id={name} name={name} ref={this.registerRef}
                                      className="form-control" {...this.props.defaultAttrs} {...modelItem.attrs}/>
                        </div>
                    )
                }
                if (modelItem.attrs.type === 'checkbox') {
                    return (
                        <div key={modelItem.label} className="form-group row">
                            <label htmlFor={name}>{modelItem.label}</label>
                            <ValidationError errors={this.state.validationErrors[name]}/>
                            <input id={name} name={name} ref={this.registerRef}
                                  className="form-check-input" {...this.props.defaultAttrs} {...modelItem.attrs}/>
                        </div>
                    )
                }
            }
        }
        return (
            <div key={modelItem.label} className="form-group row">
                <label htmlFor={name}>{modelItem.label}</label>
                <ValidationError error={this.state.validationErrors[name]}/>
                <input id={name} name={name} ref={this.registerRef}
                       className="form-control" {...this.props.defaultAttrs} {...modelItem.attrs}/>
            </div>
        )
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    {this.props.formModel.map(m => this.renderElement(m))}
                    <div className="text-center">
                        <button className="btn btn-secondary m-1"
                                onClick={this.props.cancelCallback}>{this.props.cancelText || 'Cancel'}</button>
                        <button className="btn btn-primary m-1"
                                type="submit">{this.props.submittext || 'Submit'}</button>
                    </div>
                </form>
            </>
        );
    }
}