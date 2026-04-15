import { useState } from "react"
import { useNavigate } from "react-router-dom"
import React from 'react'

export const AuthContext = React.createContext()

const AuthdataContext = ({ children }) => {
    const navigate = useNavigate()
    const [authData, setAuthData] = useState()

    const login = (data) => {
        localStorage.setItem("tokken", data.accessToken)
        setAuthData(data.loginUser)

    }

    const logout = () => {
        localStorage.removeItem("tokken")
        setAuthData(null)
        navigate("/login")
    }
    console.log(authData)
    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthdataContext