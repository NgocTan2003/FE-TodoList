import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

type SearchBarProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
    onClearSearch: () => void;
}
const SearchBar = (props: SearchBarProps) => {
    return (
        <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
            <input
                type='text'
                value={props.value}
                placeholder='Nhập nội dung tìm kiếm...'
                className='w-full text-xs bg-transparent py-[11px] outline-none'
                onChange={props.onChange}
            />
            {props.value && (
                <IoMdClose className="text-xl text-slate-500 cursor-pointer mr-1 hover:text-black" onClick={props.onClearSearch} />
            )}

            <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black" onClick={props.handleSearch} />

        </div>
    )
}

export default SearchBar