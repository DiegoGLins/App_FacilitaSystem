import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/cadastro',
        element: <Cadastro />
    },
    {
        path: '/home',
        element: <Home />
    },
])

const RoutesApp: React.FC = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default RoutesApp