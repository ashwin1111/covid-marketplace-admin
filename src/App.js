
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import home from "./pages/home";
import list from "./pages/list";
import details from "./pages/details"

function App() {
  return (<Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={home} />
            <Route path="/sign-in" component={home} />
            <Route path="/list" component={list} />
            <Route path="/details" component={details} />
          </Switch>
        </div>
      </div>
    
    </div></Router>
  );
}

export default App;





