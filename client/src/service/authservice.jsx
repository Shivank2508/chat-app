import axios from "axios"
const Api = "http://localhost:8001/api"



export const loginApi = async (data) => {
    const res = await axios.post(`${Api}/auth/login`, data)
    return res.data
}


export const usersApi = async (data) => {
    const res = await axios.get(`${Api}/users/allusers`)
    return res.data
}