import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard/Home/Dashboard'
import AddAlbums from '../pages/Dashboard/AddAlbums'
import MyAlbums from '../pages/Dashboard/MyAlbums'
import AddSongs from '../pages/Dashboard/AddSongs'
import MySongs from '../pages/Dashboard/MySongs'
import AllAlbums from '../pages/Dashboard/AllAlbums'

export const router = createBrowserRouter([
  { path: '/', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: '/dashboard/my-dashboard', element: <Dashboard /> },
      { path: '/dashboard/add-albums', element: <AddAlbums /> },
      { path: '/dashboard/my-albums', element: <MyAlbums /> },
      { path: '/dashboard/all-albums', element: <AllAlbums /> },
      { path: '/dashboard/add-songs', element: <AddSongs /> },
      { path: '/dashboard/my-songs', element: <MySongs /> },
    ],
  },
])
