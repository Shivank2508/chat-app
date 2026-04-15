import { Routes, Route } from "react-router-dom"

import Register from "../../../../frontend-ecom/src/pages/register"
import PrivateRoute from "./privateRoute"
import DashBoard from "../pages/dashboard"
import { Login } from "../pages/login"

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <DashBoard />
                    </PrivateRoute>
                } />


            </Routes>
        </>
    )
}

export default AppRoutes