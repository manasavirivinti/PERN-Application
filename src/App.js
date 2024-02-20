import React,{Fragment,useState,useEffect } from "react";
import './App.css';
import InputBook from "./components/InputBook";
import ListBooks from "./components/ListBooks";
import Pagenation from "./components/Pagenation";
import {Switch} from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Register from "./components/register";
import {ToastContainer} from "react-toastify";

// toast.configure();

function App() {
  const isAuth = async ()=>{
    try {
      const response=await fetch("http://localhost:5000/auth/is-verify",{
        method:"GET",
        headers:{token:localStorage.token}
      });

      const parseRes=await response.json()
      // console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true):
      setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(()=>{
    isAuth();
  },[]);

  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  
  return (
  <Fragment>

    <div className="container">
      {/* link the below web pages to the login and register pages */}
      {/* display of books */}
      {/* <InputBook /> */}
      {/* <ListBooks /> */}
      {/* <Pagenation /> */}

      {/* display of login and register page */}
      <Router> 
        <div className="container">
        <Switch>
        <Route exact path="/details" render ={props=><Pagenation />}></Route>
          <Route exact path="/dashboard" render={props =>isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />):(<Redirect to="/" />)}/>
          <Route exact path="/" render={props =>!isAuthenticated ? (<Login {...props} setAuth={setAuth} />):(<Redirect to="/dashboard" />)}/>
          <Route exact path="/register" render={props =>!isAuthenticated ? (<Register {...props} setAuth={setAuth}/>):(<Redirect to="/" />)}/>
          <ToastContainer />
        </Switch>
        </div>
      </Router>
    </div>
  </Fragment>
  );
}

export default App;
