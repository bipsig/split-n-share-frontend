import React from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    alert ('here');
    dispatch(authActions.login());
     navigate('/user/dashboard');
  }

  return (
    <div>
      Login Page
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login;