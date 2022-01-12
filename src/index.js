import React from 'react';
import ReactDOM from 'react-dom';
import { hydrate, render } from "react-dom";
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

reportWebVitals();
