import { useForm } from "react-hook-form"
import { loginApi } from "../service/authservice"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { useNavigate } from 'react-router-dom'
import { connectSocket } from "../socket/socket"

export const Login = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const { login } = useContext(AuthContext)


    const onsubmit = async (values) => {
        const res = await loginApi(values)
        login(res)
        connectSocket(res.accessToken)
        navigate("/dashboard")
    }


    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "100vh",
                background: "linear-gradient(135deg, #667eea, #764ba2)"
            }}
        >
            <form
                onSubmit={handleSubmit(onsubmit)}
                className="bg-white p-4"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
            >
                <h2
                    className="text-center mb-4"
                    style={{ fontWeight: "600", color: "#333" }}
                >
                    Welcome Back 👋
                </h2>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-control"
                        style={{
                            borderRadius: "10px",
                            padding: "10px"
                        }}
                        {...register("email")}
                    />
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="form-control"
                        style={{
                            borderRadius: "10px",
                            padding: "10px"
                        }}
                        {...register("password")}
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="btn w-100"
                    style={{
                        background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px",
                        fontWeight: "600",
                        color: "#fff"
                    }}
                >
                    Login
                </button>

                {/* Footer */}
                <p
                    className="text-center mt-3"
                    style={{ fontSize: "14px", color: "#777" }}
                >
                    Don’t have an account? <span style={{ color: "#ff416c", cursor: "pointer" }}>Register</span>
                </p>
            </form>
        </div>


    )
}
