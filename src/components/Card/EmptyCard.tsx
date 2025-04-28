import React from 'react'

type EmptyCardProps = {
    message: string;
    srcImage?: string;
};

export const EmptyCard = (props: EmptyCardProps) => {
    return (
        <div className='flex flex-col items-center justify-center mt-20'>
            <img src={props.srcImage} className='w-60' />
            <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>
                {props.message}
            </p>
        </div>
    )
}
