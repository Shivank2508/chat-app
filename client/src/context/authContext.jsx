import { useState } from "react"
import { useNavigate } from "react-router-dom"
import React from 'react'
import { useEffect } from "react"

export const AuthContext = React.createContext()

const AuthdataContext = ({ children }) => {
    const navigate = useNavigate()
    const [authData, setAuthData] = useState()
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        setAuthData(user.loginUser)
    }, [])

    const login = (data) => {
        localStorage.setItem("tokken", data.accessToken)
        localStorage.setItem("user", JSON.stringify(data))
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