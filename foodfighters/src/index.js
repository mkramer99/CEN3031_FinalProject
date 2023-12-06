import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { RegisterBusiness } from './Pages/Authorization/RegisterBusiness';
import { Login } from './Pages/Authorization/Login';
import { Register } from './Pages/Authorization/Register';
import { Map } from './Pages/Map';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {path:'/', element: <App /> ,},
  {path:'/Login', element: <Login />,},
  {path:'/Register', element: <Register />,},
  {path:'/RegisterBusiness', element: <RegisterBusiness />,},
  {path:'/Map', element: <Map />,},
]);
root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
