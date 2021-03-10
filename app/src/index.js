import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './views/app/App';
import LandingPage from './views/landing-page/LandingPage';
import reportWebVitals from './reportWebVitals';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"


function Main() {
    return (
        <Router>
            <Switch>
            <Route path="/app">
                <App />
            </Route>
            <Route path="/">
                <LandingPage />
            </Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
