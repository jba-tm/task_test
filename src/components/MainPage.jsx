import React  from 'react';
// import Pagination from './Pagination';
import {Link} from "react-router-dom";
import {getTasks, logout, updateTask} from "../data/store";
import {TaskTable} from "./TaskTable";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    tasks: state.taskData.tasks
})

const mapDispatchToProps = ({
    getTasks, logout, updateTask
})

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                login:localStorage.getItem('token')!==null
            }
            this.handleClick = this.handleClick.bind(this)
        }

        componentDidMount() {
            this.props.getTasks()
        }

        handleClick = ()=>{
            logout()
            this.setState({login: false})
        }

        render () {
            return (
                <>
                    <div className="container d-flex justify-content-between">
                        <Link to="/create-task" className="btn btn-primary btn-large">Create Task</Link>
                        {this.state.login===true?<button className="btn btn-warning btn-large" onClick={this.handleClick}>Logout</button>:<Link to="/login" className="btn btn-secondary btn-large">Login</Link>}
                    </div>
                    <div className="container">
                        <TaskTable tasks={this.props.tasks} actionHandler={this.props.updateTask}/>
                    </div>
                    <div className="d-flex justify-content-around"/>
                </>
            );
        }
    }
)
