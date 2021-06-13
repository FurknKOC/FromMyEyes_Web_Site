import React from 'react';
import './app.scss';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Login from '/views/Login';
import CreateUser from '/views/CreateUser';


function App() {

    return (
        <div className="App">
            <Router>
                <Switch>

                    <Route path="/" exact>
                        <Login />
                    </Route>

                    <Route path="/views/CreateUser" exact>
                        <CreateUser />
                    </Route>

                </Switch>
            </Router>
        </div>
    );
}

export default App;

