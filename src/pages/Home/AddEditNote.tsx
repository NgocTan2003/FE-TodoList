import { useState } from 'react'
import { TagInput } from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import { FormCreateDataKeys, FormUpdateDataKeys } from '../../types/note';
import { useCreateNote, useUpdateNote } from '../../utils/hook/useNote';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateRequire } from '../../utils/helper';
import IconAddImage from "../../assets/iconAddImage.png"
import { Note } from '../../types/note';

export interface IData {
    type: string,
    noteData: Note | null,
    onClose: () => void
    refetch: () => void
}

export const AddEditNote = ({ type, noteData, onClose, refetch }: IData) => {
    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState<string[]>(noteData?.tags || []);
    const [previewUrls, setPreviewUrls] = useState<string[]>(noteData?.pathImages || []);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imageOld, setImageOld] = useState<string[]>(noteData?.pathImages || []);
    const notify = (message: string) => toast(message);
    const createNote = useCreateNote();
    const updateNote = useUpdateNote();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setImageFiles(prev => [...prev, ...files]);
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    };

    const handleRemoveImage = (index: number, url: string) => {
        if (type === "edit") {
            setImageOld(prev => prev.filter((item) => item !== url));
            setPreviewUrls(prev => prev.filter((_, i) => i !== index));
        } else {
            setPreviewUrls(prev => prev.filter((_, i) => i !== index));
            setImageFiles(prev => prev.filter((_, i) => i !== index));
        }
    };

    const addNewNote = async (e: any) => {
        const errors = [
            validateRequire(title, "Title", 6),
            validateRequire(content, "Content", 6),
        ];

        const firstError = errors.find(error => error !== null);
        if (firstError) {
            notify(firstError);
            return;
        }

        const formData = new FormData();
        formData.append(FormCreateDataKeys.title, title);
        formData.append(FormCreateDataKeys.content, content);
        formData.append(FormCreateDataKeys.isPinned, "false");
        formData.append(FormCreateDataKeys.tags, JSON.stringify(tags));
        imageFiles.forEach(file => {
            formData.append(FormCreateDataKeys.images, file);
        });

        const res = await createNote.mutateAsync(formData);
        if (res && res.data.statusCode === 201) {
            onClose();
            refetch();
            notify(res.data.message);
        } else {
            const messages = res.data.message;
            const combinedMessage = Array.isArray(messages)
                ? messages.join('\n')
                : messages;
            notify(combinedMessage);
        }
    };

    const editNote = async () => {
        if (!noteData?._id) {
            console.error("Invalid note ID");
            return;
        }

        const errors = [
            validateRequire(title, "Title", 6),
            validateRequire(content, "Content", 6),
        ];

        const firstError = errors.find(error => error !== null);
        if (firstError) {
            notify(firstError);
            return;
        }

        const formData = new FormData();
        formData.append(FormUpdateDataKeys.title, title);
        formData.append(FormUpdateDataKeys.content, content);
        formData.append(FormUpdateDataKeys.isPinned, noteData?.isPinned ? "true" : "false");
        formData.append(FormUpdateDataKeys.tags, JSON.stringify(tags));
        formData.append(FormUpdateDataKeys.imageOld, JSON.stringify(imageOld));
        imageFiles.forEach(file => {
            formData.append(FormUpdateDataKeys.images, file);
        });

        const res = await updateNote.mutateAsync({ id: noteData._id, formData });
        if (res && res.data.statusCode === 200) {
            onClose();
            refetch();
            notify(res.data.message);
        } else {
            const messages = res.data.message;
            const combinedMessage = Array.isArray(messages)
                ? messages.join('\n')
                : messages;
            notify(combinedMessage);
        }
    }

    const handleAddNote = () => {
        type === "add" ? addNewNote(null) : editNote();
    }

    return (
        <div className="relative bg-white rounded-xl p-8 mt-4 shadow-lg mx-auto z-999">
            <div className="absolute top-2 right-6 cursor-pointer hover:bg-slate-100 rounded-full p-2 transition" onClick={onClose}>
                <MdClose className="text-2xl text-slate-400" />
            </div>

            <div className='lg:grid lg:grid-cols-2 mt-6'>
                <div className="pr-3">
                    <div className="flex flex-col gap-1 mb-4">
                        <label className="text-sm font-medium text-slate-600">Title</label>
                        <input
                            type="text"
                            className="border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1 mb-4">
                        <label className="text-sm font-medium text-slate-600">Tags</label>
                        <TagInput tags={tags} setTags={setTags} />
                    </div>

                    <div className="flex flex-col gap-1 mb-4">
                        <label className="text-sm font-medium text-slate-600">Content</label>
                        <textarea
                            className="border border-slate-300 rounded-lg p-3 text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                            rows={8}
                            placeholder="Content..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col pl-3">
                    <label className="text-sm font-medium text-slate-600 block mb-1">Image</label>

                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200">
                        <img src={IconAddImage} className="w-10 h-10" alt="Add" />
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>

                    {previewUrls.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative">
                                    <button
                                        onClick={() => handleRemoveImage(index, url)}
                                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                                        title="Xóa ảnh"
                                    >
                                        <MdClose className="text-xl text-slate-400" />
                                    </button>

                                    <img
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-[100px] rounded-lg shadow-md object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            <button
                onClick={handleAddNote}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition cursor-pointer mt-2"
            >
                {type === "edit" ? "Update" : "Add"}
            </button>
        </div>
    );
}
