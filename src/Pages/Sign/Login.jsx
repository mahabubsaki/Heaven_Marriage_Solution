import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaFacebook, FaLock, FaLockOpen } from 'react-icons/fa';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import img_1 from'/images/sign_img.jpeg';
import Loading from '../Loading/Loading';
import useAuth from '../../Hooks/Auth/useAuth';
import React from 'react';

const Login = () => {

    const [passText, setPassText] = useState(true);
    const navigate = useNavigate();


    const location = useLocation();
    const from = location?.state || '/';

    const { login, signInWithGoogle, loading, user, setLoading } = useAuth();
    // console.log({ loading });

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
        const emailChecker = emailRegex.test(email);
        const passChecker = passRegex.test(password);

        if (!emailChecker) {
            return toast.error('Provide a valid Email');
        }



        try {

            const signIn = await login(email, password);
            navigate(from);
            toast.success('Login Successful !');

        } catch (error) {
            console.log(error);
            if (error.code === 'auth/invalid-credential') {
                toast.error('Password or Email not matched');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password. Please check and try again.');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email format.');
            } else if (error.code === 'auth/user-disabled') {
                toast.error('This account has been disabled.');
            } else if (error.code === 'auth/user-not-found') {
                toast.error('User not found. Please check your email.');
            } else if (error.code === 'auth/too-many-requests') {
                toast.error('Too many unsuccessful login attempts. Try again later.');
            } else {
                // General error message for unexpected errors
                toast.error(error.message || 'An unknown error occurred.');
            }
        }

    };

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
        setLoading(false);
        navigate('/');
    };

    if (loading) return <Loading />;
    if (user) return <Navigate to='/' />;

    return (
        <div
            className="relative min-h-screen w-full flex justify-center md:justify-start bg-cover bg-center"
            style={{ backgroundImage: `url("${img_1}")` }}
        >
            {/* Black Overlay */}
            <div className=" absolute inset-0 bg-black/30"></div>

            {/* Centered Content Box with Shadow */}
            <div className=' relative z-10 min-h-screen md:w-3/5 lg:w-2/5 md:glass flex flex-col justify-center items-center w-[500px] h-[600px]'>

                <form onSubmit={handleLogin} className="text-left flex justify-center  flex-col items-center text-white ">
 <Link to={'/'} className='text-3xl font-anek'>Heaven Marriage</Link>
                        <h1 className="mb-2 font-lexend">Login Now!</h1>
                    <div className='w-[350px] md:w-[400px] '>
                        <div className='flex flex-col space-y-5'>
                            <input required className='glass-morphism  placeholder:text-white py-4 w-full pl-4 pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Email' type="email" name="email" />
                            <div className='relative'>
                                <input required className=' w-full placeholder:text-white  py-4 pl-4 glass-morphism pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Password' type={passText ? "password" : "text"} name="password" />
                                <span onClick={() => setPassText(!passText)} className='absolute right-5 top-4'> {passText ? <FaEye /> : <FaEyeSlash />} </span>
                            </div>
                            <span className='flex justify-center'>
                                <button className='px-4 border-b border-blue-500 font-bold '>Login</button>
                            </span>
                        </div>
                    </div>

                </form>

                <div className='border-t border-white my-2 border w-2/5' />

                <div>
                    <div className='text-white text-center'>
                        <h1 className='capitalize font-lexend'>or login with</h1>
                        <div className='flex justify-center my-5 gap-5'>
                            <button onClick={handleGoogleLogin} className='text-3xl'><FcGoogle /></button>
                        </div>
                    </div>

                    <div className='capitalize flex justify-center gap-2 text-sm text-left text-white'>Dont have an account ? <Link to='/register' className='hover:text-blue-500 transition-all underline'>SignUp</Link> </div>
                </div>


            </div>



        </div>



    );
};

export default Login;