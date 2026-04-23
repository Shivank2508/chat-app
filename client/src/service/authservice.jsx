import axios from "axios"
const Api = "http://localhost:8001/api"

const api = axios.create({
    baseURL: Api,
    headers: {
        "Content-Type": "application/json"
    }
})


api.interceptors.request.use((config) => {
    let token = localStorage.getItem("tokken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (err) => {
        const orignalRequest = err.config
        if (err.response.status === 402 && !orignalRequest._retry) {
            orignalRequest._retry = true
            try {
                const res = await axios.post(`${Api}/auth/refresh`, {}, {
                    withCredentials: true
                })
                const newAcsessToken = res.data.accessToken
                localStorage.setItem("token", newAcsessToken)
                orignalRequest.headers.Authorization = `Bearer ${newAcsessToken}`
                return api(orignalRequest)

            } catch (err) {
                console.log(err)
            }
        }
    }
)

export const loginApi = async (data) => {
    const res = await axios.post(`${Api}/auth/login`, data, {
        withCredentials: true
    })
    return res.data
}


export const usersApi = async () => {
    const res = await api.get(`/users/allusers`)
    return res.data
}