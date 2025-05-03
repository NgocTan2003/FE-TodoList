import axiosInstance from '../utils/axiosInstance';


export const getAllNote = async () => {
    const response = axiosInstance.get("/note/getall",
        {
            withCredentials: true
        })
    return response;
}

export const createNote = async (formData: FormData) => {
    const response = axiosInstance.post("/note/create", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    })
    return response;
}

export const updateNote = async (id: string, formData: FormData) => {
    const response = axiosInstance.put(`/note/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    })
    return response;
}

export const deleteNote = async (id: string) => {
    const response = axiosInstance.delete(`/note/delete/${id}`, {
        withCredentials: true
    })
    return response;
}

export const updatePinned = async (id: string, isPinned: boolean) => {
    const response = axiosInstance.put(`/note/updatePinned/${id}`, isPinned, {
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