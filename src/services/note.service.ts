import axiosInstance from '../utils/axiosInstance';


export const getAllNote = async () => {
    const response = axiosInstance.get("/note/getall",
        {
            withCredentials: true
        })
    return response;
}