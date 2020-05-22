import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const emptyCredentials = {
  username: '',
  password: '',
};

const Login = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState(emptyCredentials);

  const handleChange = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        history.push('/protected');
      })
      .catch(err => console.log(err.response));
  };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={handleSubmit}>  
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;