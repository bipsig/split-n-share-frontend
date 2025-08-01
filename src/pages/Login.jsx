import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser, userActions } from '../redux/slices/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log('Success:', result);
      console.log(result.data.user.username);
      dispatch(userActions.setUsername(result.data.user.username));
      dispatch(userActions.setToken(result.data.accessToken));
    }
    catch (err) {
      console.error('Error:', err);
    }
    finally {
      navigate('/user/dashboard');
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div style={{ marginBottom: "1rem", fontSize: "1.5rem", fontWeight: "bold" }}>
        Login Page
      </div>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "250px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Username</label>
          <input
            type="text"
            ref={username}
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Password</label>
          <input
            type="password"
            ref={password}
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            required
          />
        </div>
        <button
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>

  )
}

export default Login;