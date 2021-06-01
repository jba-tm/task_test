import React from "react";
import {connect} from "react-redux";
import {Switch, Route, Redirect}
    from "react-router-dom"
import {MainPage} from "./MainPage";
import {getTasks, logout} from "../data/store/";
import NotFound from "./NotFound";
import {TaskForm} from "./TaskForm";
import {Login} from "./Login";

const mapStateToProps = dataStore => dataStore
const mapDispatchToProps = {getTasks, logout};

export const PageConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends React.Component {
        selectComponent = (routeProps) => {
            const wrap = (Component, Content) =>
                <Component {...this.props} {...routeProps}>
                    {Content && wrap(Content)}
                </Component>
            switch (routeProps.match.params.section) {
                case undefined:
                    return wrap(MainPage);
                case "create-task":
                    return wrap(TaskForm);
                case 'update-task':
                    const task = routeProps.match.params.task
                    // if (task !== undefined && this.props.taskData.tasks.find(e => e.id === task) && localStorage.getItem('token') !== null) {
                    if (task !== undefined && this.props.taskData.tasks.find(e => e.id !== task) ) {
                        return wrap(TaskForm)
                    }
                    return <Redirect to="/not-found"/>
                case "login":
                    return wrap(Login);
                case "not-found":
                    return wrap(NotFound);
                default:
                    return <Redirect to="/not-found"/>
            }
        }

        render() {
            return <Switch>
                <Route path={"/:section?/:task?"} render={routeProps => this.selectComponent(routeProps)}/>
            </Switch>
        }

        componentDidMount = () => this.props.getTasks();

    }
)


