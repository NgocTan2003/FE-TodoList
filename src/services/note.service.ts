import axiosInstance from '../utils/axiosInstance';


export const getAllNote = async () => {
    const response = axiosInstance.get("/note/getall",
        {
            withCredentials: true
        })
    return response;
}

export const searchNote = async (query: string) => {
    const response = axiosInstance.get("/note/search", {
        params: { query },
        withCredentials: true
    })
    return response;
}