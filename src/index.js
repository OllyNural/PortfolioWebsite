import React from 'react';
import ReactDOM from 'react-dom';

import AppRoutes from './AppRoutes';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<AppRoutes/>, document.getElementById('root'));
registerServiceWorker();
