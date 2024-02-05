import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../layout'
import Home from '../pages/Home'
import Signin from '../pages/Signin'
import User from '../pages/User'
import ProtectedRoute from '../layout/ProtectedRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/signin', element: <Signin /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: '/user', element: <User /> }
                ]
            }
        ]
    }
])


const Root = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Root