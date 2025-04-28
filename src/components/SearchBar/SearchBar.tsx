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
        <div className="w-80 flex items-center px-4 bg-white rounded-md shadow-md border border-gray-300 hover:shadow-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300">
            <input
                type="text"
                value={props.value}
                placeholder="Nhập nội dung tìm kiếm..."
                className="w-full text-sm text-gray-700 bg-transparent py-[10px]  outline-none placeholder:text-gray-400"
                onChange={props.onChange}
            />
            {props.value && (
                <IoMdClose
                    className="text-xl text-gray-500 cursor-pointer mr-2 hover:text-black transition-all"
                    onClick={props.onClearSearch}
                />
            )}

            <FaMagnifyingGlass
                className="text-gray-400 cursor-pointer hover:text-teal-500 transition-all"
                onClick={props.handleSearch}
            />
        </div>
    );

}

export default SearchBar