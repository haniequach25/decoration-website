import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'swiper/css';
import { Provider } from 'react-redux';
import store from './store';
import MoonLoader from "react-spinners/MoonLoader";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense
        fallback={
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
              backgroundColor: "#000"
            }}
          >
            <MoonLoader color={"#000"} size={150} />
          </div>
        }
      >
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
