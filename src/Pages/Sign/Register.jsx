import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaLock, FaLockOpen } from 'react-icons/fa';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import img_1 from '/images/sign_img.jpeg';
import useAuth from '../../Hooks/Auth/useAuth';
import React from 'react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { imageUpload } from '../../Utils/ImageUpload';
import { AiOutlineLoading } from 'react-icons/ai';

const Register = () => {

    const [logLoad, setLogLoad] = useState(false);
    const [passText, setPassText] = useState(true);
    const [confirmPassText, setConfirmPassText] = useState(true);
    const { createUser, signInWithGoogle, user, setLoading } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();
    const { mutateAsync } = useMutation({
        mutationFn: async (userData) => {
            const { data } = await axiosSecure.put('/userData', userData);
            return data;
        },
    });



    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        setLogLoad(true);
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const name = form.name.value;
        const gender = form.gender.value;
        const phone = form.phone.value;
        const image = form.image.files[0];

        let imageUrl = '';

        if (image) {
            imageUrl = await imageUpload(image);
        }


        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailChecker = emailRegex.test(email);

        // email check
        if (!emailChecker) {
            setLogLoad(false);
            return toast.error('Provide a valid Email');
        }

        // pass checker
        if (password !== confirmPassword) {
            setLogLoad(false);
            return toast.error('Password is not matched !');
        }

        const userData = {
            name,
            email,
            gender,
            phone,
            status: "not verified",
            role: 'guest',
            image: imageUrl
        };
        await mutateAsync(userData);


        try {
            const signIn = await createUser(email, password);
            navigate('/');
            setLogLoad(false);
            toast.success('User Created Successfully');
        } catch (error) {
            console.log(error);
            setLogLoad(false);
            toast.error(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
        navigate('/');
    };




    if (user) return <Navigate to='/' />;


    return (
        <div
            className="relative min-h-screen w-full flex justify-center md:justify-start bg-cover bg-center"
            style={{ backgroundImage: `url('${img_1}')` }}
        >
            <div className=" absolute inset-0 bg-black/30"></div>

            <div className=' z-10 min-h-screen md:w-3/5 lg:w-2/5 md:glass flex flex-col justify-center items-center w-[500px]'>

                <form onSubmit={handleSignUp} className="text-left flex justify-center mt-2 flex-col items-center text-white ">

                    <div className='w-[280px] md:w-[400px] '>
            <Link to={'/'} className='text-3xl font-anek'>Heaven Marriage</Link>
                        <h1 className="mb-2 font-lexend">SignUp Now!</h1>
                        <div className='flex flex-col space-y-5'>
                            <input required className='glass-morphism py-4 placeholder:text-white pl-4 pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Your Name' type="text" name="name" />
                            <select
                                required
                                name="gender"
                                className="glass-morphism py-4 pl-4 pr-16 text-left outline-none rounded-sm font-raleway text-sm"
                            >
                                <option disabled selected value="">Gender</option>
                                <option className='text-black' value='male'>Male</option>
                                <option className='text-black' value='female'>Female</option>
                            </select>
                            <input type="file" name="image" className='glass-morphism py-4  placeholder:text-white pl-4 pr-16 text-left outline-none rounded-sm font-raleway text-sm file:glass-morphism file:border-none file:rounded-xl ' />
                            <input required className='glass-morphism py-4 placeholder:text-white pl-4 pr-16 text-left outline-none rounded-sm text-sm' placeholder='Phone Number' type="number" name="phone" />
                            <input required className='glass-morphism py-4  placeholder:text-white pl-4 pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Email' type="email" name="email" />
                            <div className='relative'>
                                <input required className='glass-morphism placeholder:text-white  py-4 pl-4  w-full pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Password' type={passText ? "password" : "text"} name="password" />
                                <span onClick={() => setPassText(!passText)} className='absolute right-5 top-4'> {passText ? <FaEye /> : <FaEyeSlash />} </span>
                            </div>
                            <div className='relative'>
                                <input required className='glass-morphism placeholder:text-white py-4 pl-4 w-full pr-16 text-left outline-none rounded-sm font-raleway text-sm' placeholder='Confirm Password' type={confirmPassText ? "password" : "text"} name="confirmPassword" />
                                <span onClick={() => setConfirmPassText(!confirmPassText)} className='absolute right-5 top-4'>{confirmPassText ? <FaEye /> : <FaEyeSlash />}</span>
                            </div>
                            <span className='flex justify-center'>
                                {
                                    logLoad ? <AiOutlineLoading className='text-2xl font-bold animate-spin' />
                                        :
                                        <button className='border-b text-white font-bold border-blue-500 px-2 py-1'>Sign up</button>
                                }
                            </span>
                        </div>
                    </div>

                </form>
                <div className='border-t-[1px] border-white my-2 border w-2/5' />

                {/* lower buttons */}
                <div>
                    <div className='text-white text-center'>
                        <h1 className='capitalize font-lexend'>or SignUp with</h1>
                        <div className='flex my-5 gap-5 justify-center'>
                            <button onClick={handleGoogleLogin} className='text-3xl'><FcGoogle /></button>
                        </div>
                    </div>

                    <h1 className='capitalize text-sm text-left text-white mb-5'>already have an account ? <Link to='/login' className='text-blue-500 underline transition-all'>login</Link> </h1>
                </div>



            </div>



        </div>



    );
};

export default Register;