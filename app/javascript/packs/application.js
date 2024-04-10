// Entry point for the build script in your package.json
// import "@hotwired/turbo-rails"
// import "./controllers"


// import './react/src/index.js'

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});
