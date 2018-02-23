import React from 'react';
import ReactDOM from 'react-dom';
import '../styling/index.css';
import App from '../components/containers/App';
import registerServiceWorker from '../registerServiceWorker';


ReactDOM.hydrate(<App/>, document.getElementById('root'));