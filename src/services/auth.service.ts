import axiosInstance from '../utils/axiosInstance';
import { LoginRequest, SignUpRequest } from '../types/auth';


export const login = async (req: LoginRequest) => {
    const response = axiosInstance.post("/auth/login",
        {
            email: req.email,
            password: req.password
        },
        {
            withCredentials: true
        })

    return response;
}

export const register = async (req: SignUpRequest) => {
    const response = axiosInstance.post("/auth/register",
        {
            fullName: req.fullName,
            email: req.email,
            password: req.password,
            confirmPassword: req.confirmPassword
        })

    return response;
}

export const logout = async () => {
    const response = axiosInstance.post("/auth/logout", {}, { withCredentials: true })
    return response;
}

export const getUserInfo = async () => {
    const response = axiosInstance.get("/auth/infoUser", { withCredentials: true })
    return response;
}

