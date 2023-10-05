import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //allowing redux store to access App
    <Provider store={Store}>
    <App />
    </Provider>

);

