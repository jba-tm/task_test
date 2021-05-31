import React from "react";

import {Link} from "react-router-dom";
import {TaskTable} from "./TaskTable";
import {TaskPageConnector} from "./TaskPageConnector";
import {PaginationControls} from "./PaginationControls";

const TaskPages = TaskPageConnector(PaginationControls);

export class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: localStorage.getItem('token') !== null
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.getTasks()
    }

    handleClick = () => {
        this.props.logout()
        this.setState({login: false})
    }

    render() {
        return (
            <>
                <div className="container d-flex justify-content-between">
                    <Link to="/create-task" className="btn btn-primary btn-large">Create Task</Link>
                    {this.state.login === true ?
                        <button className="btn btn-warning btn-large" onClick={this.handleClick}>Logout</button> :
                        <Link to="/login" className="btn btn-secondary btn-large">Login</Link>}
                </div>
                <div className="container">
                    <TaskTable tasks={this.props.taskData.tasks}/>
                </div>
                <div className="d-flex justify-content-around">
                    <TaskPages keys={["username", "status", "email", "text"]}/>
                </div>
            </>
        );
    }
}
