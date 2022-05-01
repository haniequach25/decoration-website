import { isBuffer } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import History from './pages/History/History';
import Information from './pages/Information/Information';
import Login from './pages/Login/Login';
import MyAccount from './pages/MyAccount/MyAccount';
import Register from './pages/Register/Register';

function Account() {

    const match = useRouteMatch();

    const token = useSelector((state: any) => state.user.token);

    if (token) {
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

                <Redirect to={"/"} />
            </Switch>
        );
    }
    else {
        return (
            <Switch>
                <Route path={`${match.url}/login`}>
                    <Login />
                </Route>

                <Route path={`${match.url}/register`}>
                    <Register />
                </Route>

                <Redirect to={`${match.url}/login`} />
            </Switch>
        );
    }
}

export default Account;