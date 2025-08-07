import React from 'react'
import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'
import Expenses from './pages/Expenses'
import Groups from './pages/Groups'
import GroupPage from './pages/GroupPage'
import Activity from './pages/Activity'
import Reports from './pages/Reports'
import ProtectedRoute from './routes/ProtectedRoute'
import SideBar from './components/common/SideBar'
import PublicRoute from './routes/PublicRoute'
import UserSidebar from './components/common/UserSidebar/UserSidebar'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SideBar />,
      children: [
        {
          index: true,
          element: <LandingPage />
        },
        {
          element: <PublicRoute />,
          children: [
            {
              path: 'login',
              element: <Login />
            },
            {
              path: 'register',
              element: <Register />
            },
          ]
        },
        {
          path: 'user',
          element: <ProtectedRoute> <UserSidebar /> </ProtectedRoute>,
          children: [
            {
              index: true,
              element: <Navigate to="dashboard" replace />
            },
            {
              path: 'dashboard',
              element: <Dashboard />
            },
            {
              path: 'profile',
              element: <UserProfile />
            },
            {
              path: 'all',
              element: <Expenses />
            },
            {
              path: 'groups',
              children: [
                {
                  index: true,
                  element: <Groups />
                },
                {
                  path: ':id',
                  element: <GroupPage />
                }
              ]
            },
            {
              path: 'activity',
              element: <Activity />
            },
            {
              path: 'reports',
              element: <Reports />
            },
          ]
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position='top-right' toastOptions={{duration: 3000 }} />
    </>
  )
}

export default App
