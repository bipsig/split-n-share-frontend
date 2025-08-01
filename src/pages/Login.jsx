import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error, message } = useSelector(state => state.auth)

  const username = useRef();
  const password = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username.current.value,
      password: password.current.value
    };

    try {
      const result = await dispatch(loginUser(credentials)).unwrap();

      console.log(result);
    }
    catch (err) {
      console.error('Error:', err);
    }
    // finally {
    //   navigate('/user/dashboard');
    // }
  }

  return (
    <div>
      <div>
        <h1>
          Login Page
        </h1>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username</label>
            <input
              type="text"
              ref={username}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              ref={password}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in" : "Login" }
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && isAuthenticated && <p style={{ color: 'green' }}>{message}</p>}
      </div>
    </div>
  )
}

export default Login;