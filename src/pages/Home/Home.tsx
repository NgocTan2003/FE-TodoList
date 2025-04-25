import Navbar from "../../components/Navbar/Navbar";
import { useInfo } from "../../utils/hook/useAuth";
import { useGetAllNote } from "../../utils/hook/useNote";
import { MdAdd } from 'react-icons/md';
import { NoteCard } from "../../Card/NoteCard";
import { Note } from "../../types/note";
import moment from 'moment';
import { EmptyCard } from "../../Card/EmptyCard";
import Icon from "../../assets/iconListEmpty.gif"


const Home = () => {
    const { data: infoUser } = useInfo();
    const { data: allNotes } = useGetAllNote();

    return (
        <div>
            {/* <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/> */}
            <h1 className='text-2xl text-center mt-10 text-green-500'>Home Page</h1>

            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    {
                        allNotes ? (
                            allNotes.map((item: Note, index: number) => (
                                <NoteCard
                                    key={index}
                                    _id={item._id}
                                    title={item.title}
                                    createdAt={moment(item.createdAt).format('Do MMM YYYY')}
                                    content={item.content}
                                    pathImages={item.pathImages}
                                    tags={item.tags}
                                    isPinned={item.isPinned}
                                    onEdit={() => { }}
                                    onDelete={() => { }}
                                    onPinNote={() => { }}
                                />
                            ))
                        ) : (
                            <>
                                <EmptyCard srcImage={Icon} message="Bạn chưa có Note nào. Hãy bấm nút thêm để bắt đầu tạo Note đầu tiên của bạn." />
                            </>
                        )
                    }
                </div>
            </div>

            <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
                onClick={() => {
                    //setOpenAddEditModal({ isShown: true, type: 'add', data: null })
                }} >
                <MdAdd />
            </button>

            {/* <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.2)'
                    }
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
            >
                <AddEditNote
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: 'add', data: null })
                    }}
                    getAllNotes={getAllNotes}
                    showToastMessage={showToastMessage}
                />
            </Modal> */}


        </div>
    )
}

export default Home;