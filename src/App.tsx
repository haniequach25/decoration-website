import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './assets/css/style.css';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Home from './features/Home/Home';
import Header from './components/Header/Header';
import { Switch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Product from './features/Product/Product';
import Blog from './features/Blog/Blog';
import ToTop from './ToTop';
import ScrollToTop from 'react-scroll-to-top';
import Account from './features/Account/Account';
import CheckOut from './features/CheckOut/CheckOut';
import { useSelector } from 'react-redux';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Contact from './features/Contact/Contact';
import 'react-chat-widget/lib/styles.css';

const App: React.FC = () => {

  const token: any = useSelector((state: any) => state.user.token);

  return (
    <div>
      <BrowserRouter>
        <ReactNotifications />
        <Header />
        <ToTop />
        <ScrollToTop smooth />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path="/product">
            <Product />
          </Route>

          <Route path="/blog">
            <Blog />
          </Route>

          <Route path="/account">
            <Account />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>

          {token ? (<Route path="/checkout">
            <CheckOut />
          </Route>) : ""}
          <Redirect to={"/"} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
