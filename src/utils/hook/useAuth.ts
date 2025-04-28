import { useMutation, useQuery } from "@tanstack/react-query"
import { login, register, getUserInfo, logout } from "../../services/auth.service"
import { useNavigate } from "react-router-dom"
import { LoginRequest, SignUpRequest } from './../../types/auth';

export const useLogin = () => {
    const navigate = useNavigate()
    return useMutation<any, any, LoginRequest>({
        mutationFn: login,
        onSuccess: (res) => {
            if (res && res.data.statusCode == 200) {
                navigate("/")
            }
        },
        onError: (error) => {
            console.log("Error ----------------", error)
        }
    })
}

export const useSignUp = () => {
    return useMutation<any, any, SignUpRequest>({
        mutationFn: register,
        onSuccess: (res) => {
        },
        onError: (error) => {
            console.log("Error ----------------", error)
        }
    })
}

export const useInfo = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['userInfo'],
        queryFn: getUserInfo,
    })

    return { data: data?.data.user, isLoading }
}

export const useLogout = () => {
    const navigate = useNavigate()
    return useMutation<any, any, any>({
        mutationFn: logout,
        onSuccess: (res) => {
            if (res && res.data.statusCode == 200) {
                navigate("/login")
            }
        },
        onError: (error) => {
            console.log("Error ----------------", error)
        }
    })
}