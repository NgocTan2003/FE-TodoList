import { getAllNote } from "../../services/note.service";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAllNote = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['allNotes'],
        queryFn: getAllNote,
    })
    return { data: data?.data.notes, isLoading }
}
