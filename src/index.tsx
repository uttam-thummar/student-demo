import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './app/_redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { setupAxios } from './helpers/AxiosHelper';
import axios from 'axios';

const container = document.getElementById('root')!;
const root = createRoot(container);
setupAxios(axios);

root.render(
  <>
    <Provider store={store}>
    <PersistGate loading={<h2>Loading...</h2>} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
