import { Link } from 'react-router-dom'
import { useState } from 'react';
import { validateEmail, validateRequire } from '../../utils/helper';
import { EmailIcon, LockIcon } from '../../components/icons/usericon';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { useLogin } from '../../utils/hook/useAuth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const { mutateAsync: login, isLoading, isSuccess } = useLogin();
    const notify = (message: string) => toast(message);

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const emailError = validateRequire(email, "Email");
        const passwordError = validateRequire(password, "Password");

        if (emailError) {
            notify(emailError);
            return;
        }

        if (!validateEmail(email)) {
            notify("Invalid email");
            return;
        }

        if (passwordError) {
            notify(passwordError);
            return;
        }

        login({
            email: email,
            password: password
        }).then((res) => {
            if (res && res.data.statuscode) {
                notify(res.data.message);
            }
        })
            .catch((err: any) => {
                if (err.response && err.response.data) {
                }
            })
    }

    return (
        <div className='w-full flex justify-center lg:pt-20 lg:pb-10 h-screen bg-cover bg-center' style={{ backgroundImage: "url('./src/assets/imageLogin.jpg')" }}>
            <div className='flex items-center justify-center text-2xl h-full pt-20 lg:pt-0 lg:w-1/4 lg:h-4/5 bg-white lg:rounded-lg'>
                <div className='w-full h-full pt-20 lg:pt-20 pl-12 pr-12'>
                    <form onSubmit={handleLogin}>
                        <h4 className='text-4xl mb-4 text-center font-bold pb-10'>Login</h4>
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
                                (<FaRegEye size={22} className="text-primary cursor-pointer" onClick={() => toggleShowPassword()} />) :
                                (<FaRegEyeSlash size={22} className="text-primary cursor-pointer" onClick={() => toggleShowPassword()} />)}
                        </div>

                        <button
                            className='w-full text-sm text-black p-3 rounded-lg my-1 mt-4 bg-center cursor-pointer hover:opacity-80'
                            style={{
                                backgroundImage: `url('./src/assets/imageLogin.jpg')`,
                            }}
                        >
                            LOGIN
                        </button>

                        <p className='text-base text-center mt-6 text-gray-600'>
                            You do not have an account yet?{" "}
                            <Link to="/signUp" className="text-primary font-semibold hover:underline hover:text-blue-600 transition-colors duration-200">
                                SIGN UP
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login;