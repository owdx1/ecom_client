import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'; 

const addViewportMetaTag = () => {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0';
  document.head.appendChild(meta);
};

addViewportMetaTag();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); 
root.render(
  <BrowserRouter>
    <div>
      <App />
    </div>
  </BrowserRouter>
);
