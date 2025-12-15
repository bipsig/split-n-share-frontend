import React, { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next';
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
import Reports from './pages/Reports'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import UserSidebar from './components/common/UserSidebar/UserSidebar'
import { Toaster } from 'react-hot-toast'
import ActivityPage from './pages/Activity'
import AuthInitializer from './components/auth/AuthInitializer'
import ResetPassword from './pages/ResetPassword'
import AppWithHealthCheck from './AppWithHealthCheck'
import NotFound from './pages/NotFound'
import ErrorHandlingPage from './pages/ErrorHandlingPage'

const App = () => {
  const [position, setPosition] = useState("top-right");

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) {
        setPosition("bottom-center");
      } else {
        setPosition("top-right");
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorHandlingPage />,
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
              path: 'reset-password',
              element: <ResetPassword />
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
              element: <Dashboard />,
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
              element: <ActivityPage />
            },
            {
              path: 'reports',
              element: <Reports />
            },
          ]
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ])

  return (
    <AppWithHealthCheck>
      <AuthInitializer />
      <RouterProvider router={router} />
      <Toaster position={position} toastOptions={{ duration: 3000 }} />
      <Analytics />
    </AppWithHealthCheck>
  )
}

export default App