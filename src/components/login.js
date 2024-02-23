import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        },
      );

      const parseRes = await response.json();
       //console.log(parseRes);
       if(parseRes.token){
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("logged in succesfully!");
       }else{
        setAuth(false);
        toast.error(parseRes);
       }
        
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="m-5 text-center ">Welcome to the application <br />Login to access the content</h1>
      <form onSubmit={onSubmitForm} >
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => onChange(e)}
          className="form-control my-3"
        />
        <button class="btn btn-success btn-block">Submit</button>
      </form>
      <div  className="mt-5 text-center">
        <Link to="/register"> New User then ...?? then Register</Link>
      </div>
    </Fragment>
  );
};

export default Login;