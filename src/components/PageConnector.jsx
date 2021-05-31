import React from "react";
import {connect} from "react-redux";
import { Switch, Route, Redirect }
    from "react-router-dom"
import {MainPage} from "./MainPage";
import {getTasks, logout} from "../data/store/";
import NotFound from "./NotFound";
import {TaskForm} from "./TaskForm";
import {Login} from "./Login";

const mapStateToProps = dataStore => dataStore
const mapDispatchToProps = {getTasks, logout};

export const PageConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends React.Component{
        selectComponent = (routeProps) => {
            const wrap = (Component, Content) =>
                <Component { ...this.props}  { ...routeProps}>
                    { Content && wrap(Content)}
                </Component>
            switch (routeProps.location.pathname) {
                case "/":
                case "":
                    return wrap(MainPage);
                case "/create-task":
                    return wrap(TaskForm);
                case "/login":
                    return wrap(Login);
                case "/not-found":
                    return wrap(NotFound);
                default:
                    return <Redirect to="/not-found" />
            }
        }

        render() {
            return <Switch>
                <Route path="/" render={routeProps=>this.selectComponent(routeProps)}/>
            </Switch>
        }

        componentDidMount = () => this.props.getTasks();

    }
)


