import { createNote, updateNote, deleteNote, getNotesPaginated, searchNote, updatePinned } from "../../services/note.service";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetPaginatedNotes = (page: number, limit = 5) => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['paginatedNotes', page, limit],
        queryFn: () => getNotesPaginated(page, limit),
        keepPreviousData: true,  
    });

    return {
        allNotes: data?.data.notes.docs || [],
        totalPages: data?.data.notes.totalPages || 1,
        currentPage: data?.data.notes.page || page,
        isLoading,
        refetch,
    };
};

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

export const usePinnedNote = () => {
    return useMutation<any, any, { id: string, isPinned: boolean }>({
        mutationFn: ({ id, isPinned }) => updatePinned(id, isPinned),
        onSuccess: (res) => {
        },
        onError: (error) => {
            console.log("Error usePinnedNote ----------------", error);
        }
    });
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

