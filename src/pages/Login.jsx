import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
// import { loginUser } from '../redux/slices/auth/authThunks';
// import useAuth from '../hooks/useAuth';
import { useLoginMutation } from '../redux/slices/api/authApi';

const Login = () => {
  const navigate = useNavigate();

  // const { authLogin, authIsAuthenticated, authLoading, authError, authMessage } = useAuth();
  const [login, { isLoading, isError, error, isSuccess, data }  ] = useLoginMutation();

  const username = useRef();
  const password = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      username: username.current.value,
      password: password.current.value
    };

    try {
      const result = await login(credentials).unwrap();

      console.log(result);
      if (result.success) {
        navigate('/user/dashboard')
      }
    } 
    catch (err) {
      console.error('Error:', err);
    }
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
            disabled={isLoading}
          >
            {isLoading ? "Logging in" : "Login" }
          </button>
        </form>
        {isError && <p style={{ color: 'red' }}>{error?.data?.message || error?.message}</p>}
        {isSuccess && <p style={{ color: 'green' }}>Login successful</p>}
      </div>
    </div>
  )
}

export default Login;