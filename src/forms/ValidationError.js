import React from "react";

export class ValidationError extends React.Component{
    render() {
        if (this.props.error){
            return (
                <h6 className="text-danger">
                    {this.props.error}
                </h6>
            )
        }
        return null
    }
}