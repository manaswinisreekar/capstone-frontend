import React, { Component } from 'react'

//Router import for redirection.
import { Route, Switch } from "react-router-dom";

//Imports of different pages in the application
import Home from './screens/home/Home';

class Controller extends Component {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:8080/api/'
    }
    render() {
        return (
            <Switch>
                <Route exact path='/' render={(props) => <Home {...props} />} />
            </Switch>
        )
    }
}

export default Controller;
