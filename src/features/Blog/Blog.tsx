import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import BlogList from './pages/BlogList/BlogList';

function Blog() {

    const match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${match.url}`}>
                <BlogList />
            </Route>

            <Route exact path={`${match.url}/:slug`}>
                <BlogDetail />
            </Route>
        </Switch>
    );
}

export default Blog;