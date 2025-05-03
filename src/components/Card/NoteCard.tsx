import React from 'react'
import { MdCreate, MdOutlinePushPin, MdDelete } from 'react-icons/md'
import { Note } from '../../types/note';

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
        <div className="mt-2 lg:mt-0 border border-blue-100 rounded-xl p-4 bg-blue-50 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-lg font-semibold text-gray-800">{props.title}</h6>
                    <span className="text-sm text-gray-500">{props.createdAt}</span>
                </div>
    
                <MdOutlinePushPin 
                    className={`icon-btn ${props.isPinned ? 'text-blue-600' : 'text-gray-300'} cursor-pointer`} 
                    onClick={props.onPinNote} 
                />
            </div>
    
            <p className="text-sm text-gray-700 mt-2">{props.content?.slice(0, 60)}</p>
    
            <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-500">
                    {props.tags.map((item, index) => (
                        <span key={index} className="mr-2">#{item}</span>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <MdCreate className="icon-btn text-blue-600 hover:text-green-600 cursor-pointer" onClick={props.onEdit} />
                    <MdDelete className="icon-btn text-red-600 hover:text-red-800 cursor-pointer" onClick={props.onDelete} />
                </div>
            </div>
        </div>
    );
    
}
