import { createNote, updateNote, deleteNote, getAllNote, searchNote } from "../../services/note.service";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAllNote = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allNotes'],
        queryFn: getAllNote,
    })
    return { data: data?.data.notes, isLoading, refetch }
}

export const useCreateNote = () => {
    return useMutation<any, any, FormData>({
        mutationFn: createNote,
        onSuccess: (res) => {
        },
        onError: (error) => {
            console.log("Error useCreateNote ----------------", error);
        }
    });
}

export const useUpdateNote = () => {
    return useMutation<any, any, { id: string, formData: FormData }>({
        mutationFn: ({ id, formData }) => updateNote(id, formData),
        onSuccess: (res) => {
        },
        onError: (error) => {
            console.log("Error useUpdateNote ----------------", error);
        }
    });
}

export const useDeleteNote = () => {
    return useMutation<any, any, string>({
        mutationFn: deleteNote,
        onSuccess: (res) => {
        },
        onError: (error) => {
            console.log("Error useDeleteNote ----------------", error);
        }
    })
}

export const useSearchNote = () => {
    const { mutate, data, isLoading, isSuccess, error } = useMutation<any, any, string>({
        mutationFn: searchNote,
        onSuccess: (res) => {
        },
        onError: (error) => {
            console.log("Error useSearchNote ----------------", error);
        }
    });

    return { mutate, data: data?.data.notes, isLoading, isSuccess, error };
};

