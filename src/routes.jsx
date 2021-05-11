import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Leaderboard from './components/leaderboard';
import Container from './components/game';
import Home from './components/home'

function RoutesManager() {
    return (
        <Router>
        <Switch>
            <Route path="/leaderboard"><Leaderboard />
            </Route>
            <Route path="/start-game"><Container />
            </Route>
            <Route path="/"><Home />
            </Route>
        </Switch>
    </Router>
    );
}

export default RoutesManager;