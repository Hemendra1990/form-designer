import React from 'react';
import  ReactDOM from 'react-dom';
import App from './App';
import {createRoot} from "react-dom/client";

const renderAt: any = document.querySelector("#root");
let root = createRoot(renderAt);
root.render(<App />);
// ReactDOM.render(<App />, renderAt);
