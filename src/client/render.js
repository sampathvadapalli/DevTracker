
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import App from './components/LandingPage.jsx';
ReactDOM.render(<IntlProvider><App /></IntlProvider> ,document.getElementById('trackermainpage'));
