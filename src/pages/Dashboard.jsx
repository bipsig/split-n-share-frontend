import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const username = useSelector(state => state.auth.user)
  return (
    <div>
      DashBoard
      {username ? <p>{`User is logged in => ${username}`}</p> : <p>No user logged in</p>}
    </div>
  )
}

export default Dashboard;