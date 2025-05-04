import Navbar from "../../components/Navbar/Navbar";
import { useInfo } from "../../utils/hook/useAuth";
import { useDeleteNote, useSearchNote, usePinnedNote } from "../../utils/hook/useNote";
import { MdAdd } from 'react-icons/md';
import { NoteCard } from "../../components/Card/NoteCard";
import { Note } from "../../types/note";
import moment from 'moment';
import { EmptyCard } from "../../components/Card/EmptyCard";
import IconListEmpty from "../../assets/iconListEmpty.gif"
import { useEffect, useState } from "react";
import Modal from 'react-modal'
import { AddEditNote } from "./AddEditNote";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useGetPaginatedNotes } from "../../utils/hook/useNote";

const Home = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const { data: infoUser } = useInfo();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);  
    const { allNotes, totalPages, currentPage, isLoading, refetch } = useGetPaginatedNotes(page, limit);
    const { mutate: mutateSearch, data: dataSearch } = useSearchNote();
    const deleteNote = useDeleteNote();
    const pinnedNote = usePinnedNote();
    const notify = (message: string) => toast(message);

    const [openAddEditModal, setOpenAddEditModal] = useState<{
        isShown: boolean;
        type: "add" | "edit";
        data: Note | null;
    }>({
        isShown: false,
        type: "add",
        data: null
    });

    const handleSearchNote = async (query: string) => {
        await mutateSearch(query);
    }

    const handleClearSearch = () => {
        setNotes([]);
        refetch();
    }

    const handleEdit = (noteDetails: Note) => {
        setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails })
    }

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure you want to delete?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            var res = await deleteNote.mutateAsync(id)
            if (res && res.status === 200) {
                refetch();
                notify(res.data.message);
            }
        }
    }

    const handlePinned = async (id: string, isPinned: boolean) => {
        var res = await pinnedNote.mutateAsync({ id, isPinned: !isPinned })
        if (res && res.status === 200) {
            refetch();
        }
    }

    useEffect(() => {
        allNotes
        const updateLimitBasedOnWidth = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setLimit(4);
            } else if (width < 1024) {
                setLimit(6);
            } else {
                setLimit(9);
            }
        };

        updateLimitBasedOnWidth();  
        window.addEventListener('resize', updateLimitBasedOnWidth);

        return () => window.removeEventListener('resize', updateLimitBasedOnWidth);
    }, [dataSearch]);

    const displayNotes = notes.length > 0 ? notes : (allNotes ?? []);

    return (
        <div>
            <Navbar userInfo={infoUser} handleSearchNote={handleSearchNote} handleClearSearch={handleClearSearch} />

            <div className='container mx-auto'>
                <div className='lg:grid lg:grid-cols-3 gap-4 mt-8'>
                    {
                        displayNotes ? (
                            [...displayNotes]
                                .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
                                .map((item: Note, index: number) => (
                                    <NoteCard
                                        key={index}
                                        _id={item._id}
                                        title={item.title}
                                        createdAt={moment(item.createdAt).format('Do MMM YYYY')}
                                        content={item.content}
                                        pathImages={item.pathImages}
                                        tags={item.tags}
                                        isPinned={item.isPinned}
                                        onEdit={() => { handleEdit(item) }}
                                        onDelete={() => { handleDelete(item._id) }}
                                        onPinNote={() => { handlePinned(item._id, item.isPinned) }}
                                    />
                                ))
                        ) : (
                            <>
                                <EmptyCard srcImage={IconListEmpty} message="Bạn chưa có Note nào. Hãy bấm nút thêm để bắt đầu tạo Note đầu tiên của bạn." />
                            </>
                        )
                    }
                </div>

                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 join mt-4 z-50">
                    <button className="join-item btn" onClick={() => setPage(page - 1)} disabled={page === 1}>«</button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`join-item btn ${page === i + 1 ? 'btn-active' : ''}`}
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button className="join-item btn" onClick={() => setPage(page + 1)} disabled={page === totalPages}>»</button>
                </div>
            </div>

            <button className='w-16 h-16 fixed flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-2 bottom-20 lg:right-10 lg:bottom-10'
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: 'add', data: null })
                }} >
                <MdAdd />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }
                }}
                contentLabel=""
                className="lg:w-[50%] lg:max-h-[80vh] w-full h-full mx-auto lg:mt-10 p-2 lg:p-5 rounded-xl "
            >
                <AddEditNote
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: 'add', data: null })
                    }}
                    refetch={refetch}
                />
            </Modal>
        </div>
    )
}

export default Home;