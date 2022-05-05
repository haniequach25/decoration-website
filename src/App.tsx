import React, { useEffect } from 'react';
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
import CheckOut from './features/CheckOut/CheckOut';
import { useSelector } from 'react-redux';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Contact from './features/Contact/Contact';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

const App: React.FC = () => {

  const token: any = useSelector((state: any) => state.user.token);

  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
  }, []);

  const handleNewUserMessage = (newMessage: any) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };

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
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title="My new awesome title"
        subtitle="And my cool subtitle"
      />
    </div>
  );
}

export default App;
