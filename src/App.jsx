import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import {MainPage} from './components/MainPage';
import {TaskForm} from "./components/TaskForm";
import {Login} from './components/Login';
import NotFound from "./components/NotFound";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import dataStore from './data/store'
import {Provider as ReduxProvider} from "react-redux"

class App extends Component {
  state = {  }
  render() { 
    return (
        <ReduxProvider store={dataStore}>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path='/create-task' component={TaskForm}/>
                <Route path="/not-found" component={NotFound}/>
                <Route path="/" exact component={MainPage}/>
                <Redirect to="not-found"/>
            </Switch>
        </ReduxProvider>
     );
  }
}
 
export default App;