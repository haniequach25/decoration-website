import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import History from './pages/History/History';
import Information from './pages/Information/Information';
import MyAccount from './pages/MyAccount/MyAccount';

function Account() {

    const match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${match.url}`}>
                <MyAccount />
            </Route>

            <Route path={`${match.url}/information`}>
                <Information />
            </Route>

            <Route path={`${match.url}/history`}>
                <History />
            </Route>
        </Switch>
    );
}

export default Account;