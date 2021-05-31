import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import dataStore from './data/store'
import {Provider as ReduxProvider} from "react-redux"
import {PageConnector} from "./components/PageConnector";

class App extends Component {
  render() { 
    return (
        <ReduxProvider store={dataStore}>
            <PageConnector/>
        </ReduxProvider>
     );
  }
}
 
export default App;