import { Link } from 'react-router-dom'
import { useState } from 'react';
import { validateEmail } from '../../utils/helper';
import { EmailIcon, LockIcon, UserIcon } from '../../components/icons/usericon';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { validateRequire } from '../../utils/helper';
import { useSignUp } from '../../utils/hook/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { mutateAsync: signUp, isLoading, isSuccess } = useSignUp();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const notify = (message: string) => toast(message);


    const toggleShowPassword = (type: string) => {
        if (type === "password") {
            setIsShowPassword(!isShowPassword);
        } else {
            setIsShowConfirmPassword(!isShowConfirmPassword);
        }
    };

    const handleSignUp = async (e: any) => {
        e.preventDefault();
        const errors = [
            validateRequire(fullName, "FullName", 6),
            validateRequire(email, "Email"),
            !validateEmail(email) ? "Invalid email" : null,
            validateRequire(password, "Password", 6),
            validateRequire(confirmPassword, "Confirm Password"),
            password !== confirmPassword ? "Passwords do not match" : null
        ];

        const firstError = errors.find(error => error !== null);
        if (firstError) {
            notify(firstError);
            return;
        }

        signUp({
            fullName: fullName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }).then((res) => {
            if (res && res.data.statuscode == 200) {
                setFullName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                const messages = res.data.message;
                const combinedMessage = Array.isArray(messages)
                    ? messages.join('/n')
                    : messages;
                notify(combinedMessage);
            }
        })
            .catch((err: any) => {
                if (err.response && err.response.data) {
                    console.log("Error response", err);
                }
            })
    }

    return (
        <div className='w-full flex justify-center lg:pt-12 lg:pb-8 h-screen bg-cover bg-center' style={{ backgroundImage: "url('./src/assets/imageLogin.jpg')" }}>
            <div className='flex items-center justify-center text-2xl w-full lg:w-1/4 h-full bg-white rounded-lg'>
                <div className='w-full h-full pt-25 lg:pt-10 pl-12 pr-12'>
                    <form className='text-black' onSubmit={handleSignUp}>
                        <h4 className='text-4xl mb-6 text-center font-bold pb-10'>SignUp</h4>
                        <h4 className='text-base'>FullName</h4>
                        <div className='flex items-center py-2 mb-3 mt-3 border-b border-gray-400'>
                            {UserIcon(20, 15)}
                            <input
                                type='text'
                                placeholder='Type your fullname'
                                className='w-full text-sm bg-transparent outline-none ml-2'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <h4 className='text-base'>Email</h4>
                        <div className='flex items-center py-2 mb-3 mt-3 border-b border-gray-400'>
                            {EmailIcon(20, 15)}
                            <input
                                type='text'
                                placeholder='Type your email'
                                className='w-full text-sm bg-transparent outline-none ml-2'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <h4 className='text-base'>Password</h4>
                        <div className='flex items-center py-2 mb-3 mt-3 border-b border-gray-400'>
                            {LockIcon(20, 15)}
                            <input
                                type={isShowPassword ? "text" : "password"}
                                placeholder='Type your password'
                                className='w-full text-sm bg-transparent outline-none ml-2'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {isShowPassword ?
                                (<FaRegEye size={22} className="text-primary cursor-pointer" onClick={() => toggleShowPassword("password")} />) :
                                (<FaRegEyeSlash size={22} className="text-primary cursor-pointer" onClick={() => toggleShowPassword("password")} />)}
                        </div>

                        <h4 className='text-base'>Confirm Password</h4>
                        <div className='flex items-center py-2 mb-3 mt-3 border-b border-gray-400'>
                            {LockIcon(20, 15)}
                            <input
                                type={isShowConfirmPassword ? "text" : "password"}
                                placeholder='Type your password'
                                className='w-full text-sm bg-transparent outline-none ml-2'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {isShowConfirmPassword ?
                                (<FaRegEye size={22} className="text-primary cursor-pointer" onClick={() => toggleShowPassword("rePassword")} />) :
                                (<FaRegEyeSlash size={22} className="text-primary cursor-pointer" onClick={() => toggleShowPassword("rePassword")} />)}
                        </div>


                        <button
                            className='w-full text-sm text-black p-3 rounded-lg my-1 mt-4 bg-center cursor-pointer hover:opacity-80'
                            style={{
                                backgroundImage: `url('./src/assets/imageLogin.jpg')`,
                            }}
                        >
                            SIGN UP
                        </button>

                        <p className='text-base text-center mt-4 text-gray-600'>
                            You already have an account?{" "}
                            <Link to="/login" className="text-primary font-semibold hover:underline hover:text-blue-600 transition-colors duration-200">
                                LOGIN
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default signUp;