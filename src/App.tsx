import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToTop />
      <ScrollToTop smooth />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/test'>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
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
        <Redirect to={"/"} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
