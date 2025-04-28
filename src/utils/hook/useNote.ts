import { getAllNote, searchNote } from "../../services/note.service";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAllNote = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allNotes'],
        queryFn: getAllNote,
    })
    return { data: data?.data.notes, isLoading, refetch }
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