import React from 'react'
import { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

type PasswordInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
};

export const PasswordInput = (props: PasswordInputProps) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    return (
        <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
            <input value={props.value}
                onChange={props.onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={props.placeholder || "Password"}
                className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'>
            </input>

            {isShowPassword ?
                (<FaRegEye size={22} className="text-primary cursor-pointer" onClick={() => toggleShowPassword()} />) :
                (<FaRegEyeSlash size={22} className="text-primary cursor-pointer" onClick={() => toggleShowPassword()} />)}
        </div >
    )
}

export default PasswordInput;