import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const addViewportMetaTag = () => {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0';
  document.head.appendChild(meta);
};

addViewportMetaTag();

ReactDOM.render(
  <BrowserRouter>
  <div style={{userSelect: 'none'}}>
    <App />
  </div>
  </BrowserRouter>,
  document.getElementById('root')
);
