import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const username = useSelector(state => state.user.username)
  // const accessToken = useSelector(state => state.user.token);
  // const userData = useSelector(state => state.user.userData);

  // const handleGetDetails = async () => {
  //   try {
  //         const result = await dispatch(getUserDetails(accessToken)).unwrap();
  //         console.log('Success:', result);
  //         console.log (result.data);
  //       }
  //       catch (err) {
  //         console.error('Error:', err);
  //       }
  // }
  return (
    <div>
      Dashboard
      {/* DashBoard
      {username ? (
        <div>
          <p>{`User is logged in => ${username}`}</p>
          <button onClick={handleGetDetails}>Get Details</button>
          {userData && (
            <div>
              <p>Name: {userData.firstName} {userData.lastName}</p>
            </div>
          )}
        </div>
      ) : <p>No user logged in</p>}
      <button onClick={() => {navigate('/login'); dispatch(userActions.handleLogout())}}>Logout</button> */}
    </div>
  )
}

export default Dashboard;