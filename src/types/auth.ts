export type LoginRequest = {
    email: string,
    password: string
}

export type SignUpRequest = {
    email: string,
    password: string,
    fullName: string,
    confirmPassword: string
}