import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/ProductList/ProductList';

const Product: React.FC = (props) => {

    const match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={match.url}>
                <ProductList />
            </Route>

            <Route path={`${match.url}/:slug`}>
                <ProductDetail />
            </Route>
        </Switch>
    );
}

export default Product;