import React from 'react'
import { MdCreate, MdOutlinePushPin, MdDelete } from 'react-icons/md'
import { Note } from '../types/note';

type NoteCardProps = {
       _id: string,
    title: string;
    content: string;
    isPinned: boolean;
    pathImages: [],
    tags: string[];
    createdAt: string;
    onEdit: () => void;
    onDelete: () => void;
    onPinNote: () => void;
}


export const NoteCard = (props: NoteCardProps) => {
    return (
        <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
            <div className='flex items-center justify-between'>
                <div>
                    <h6 className='text-sm font-medium'>{props.title}</h6>
                    <span className='text-sm text-slate-500'>{props.createdAt}</span>
                </div>

                <MdOutlinePushPin className={`icon-btn ${props.isPinned ? 'text-primary' : 'text-slate-300'}`} onClick={props.onPinNote} />
            </div>

            <p className='text-xs text-slate-600 mt-2'>{props.content?.slice(0, 60)}</p>

            <div className='flex items-center justify-between mt-2'>
                <div className='text-xs text-slate-500'>{props.tags.map((item) => `#${item}`)}</div>
                <div className='flex items-center gap-2'>
                    <MdCreate className='icon-btn hover:text-green-600' onClick={props.onEdit} />
                    <MdDelete className="icon-btn hover:text-red-500" onClick={props.onDelete} />
                </div>

            </div>
        </div>
    )
}
