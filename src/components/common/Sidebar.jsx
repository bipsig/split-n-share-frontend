import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const SideBar = () => {
  return (
    <div>
      <header>
        <ul>
          <li><Link to='/'> Landing page </Link></li>
          <li><Link to='/login'> Login </Link></li>
          <li><Link to='/register'> Register </Link></li>
          <li><Link to='/user/dashboard'> Dashboard </Link></li>
          <li><Link to='/user/profile'> Profile </Link></li>
          <li><Link to='/user/reports'> Reports </Link></li>
          <li><Link to='/user/groups'> Groups </Link></li>
        </ul>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default SideBar;
