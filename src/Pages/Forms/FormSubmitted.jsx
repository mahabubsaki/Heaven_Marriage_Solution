import React, { useState } from 'react';
import HeadingSubHead from '../../Components/TextAnimations/HeadingSubHead';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BlackButton from '../../Components/Shared/Buttons/BlackButton';
import useRole from '../../Hooks/Role/useRole';
import Loading from '../Loading/Loading';
import GenInfoModal from '../../Components/Shared/Modal/GenInfoModal';
import useAuth from '../../Hooks/Auth/useAuth';

const FormSubmitted = () => {

    const { loading } = useAuth();
    const { status, isLoading } = useRole();
    const [isOpen, setIsOpen] = useState(false);

    if (loading, isLoading) return <Loading />;

    return (
        <div className='pt-24 pb-16'>
            <div className='mx-5 bg-[#EFEBD9]'>
                {
                    status === 'in process' &&
                    <motion.div
                        initial={{
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            transition: {
                                ease: 'easeIn',
                                duration: 2,
                                delay: 1
                            }
                        }}
                        viewport={{ once: true }}
                        className="mt-10 space-y-5 font-galada">

                        <HeadingSubHead heading='Thank You, মুহতারাম!' subHeading='আপনার ফর্মটি সফলভাবে HMS অফিসে জমা হয়েছে, আলহামদুলিল্লাহ।' />

                        <div>
                            <p className="font-alkatra text-xl font-semibold">পরবর্তী ধাপ:</p>
                            <p className="font-alkatra">ভেরিফিকেশন ও জয়েনিং প্রসেস সম্পন্ন করার জন্য ৫১০ টাকা পাঠাতে অনুরোধ করছি
                                (ঈদুল আজহার আগ পর্যন্ত ৫০% ডিসকাউন্ট: ১০২০ টাকার পরিবর্তে মাত্র ৫১০ টাকা)
                            </p>
                        </div>

                        <div>
                            <p className='font-mina font-semibold text-xl'>পেমেন্ট পাঠানোর বিকল্প মাধ্যমসমূহ:</p>
                            <p className='font-mina font-semibold'>Send Money (Nagad/Bkash – Personal):</p>
                            <p className='font-mina font-semibold text-red-400'>01748919251</p>
                        </div>


                        <div>
                            <p className='font-semibold text-2xl'>Bank Transfer (Islami Bank)</p>
                            <p><strong>Account Name:</strong> MD. RAHED HUSSAIN MAHED</p>
                            <p><strong>Account Number:</strong> 20507770208518332</p>
                            <p><strong>Branch:</strong> Pirer Bazar, Bishwanath, Sylhet</p>
                        </div>

                        <div>
                            <p className='font-alkatra text-2xl text-red-500'>গুরুত্বপূর্ণ নির্দেশনা:</p>
                            <p> টাকা পাঠানোর পর অবশ্যই রসিদ/স্ক্রিনশট সংরক্ষণ করুন।</p>
                            <p>নিচের পেমেন্ট ভেরিফিকেশন ফর্মে “ডকুমেন্ট আপলোড” সেকশনে এটি আপলোড করুন,
                                অথবা অফিসিয়াল হোয়াটসঅ্যাপ নম্বরে পাঠিয়ে দিন: <strong>01610371038</strong> </p>
                        </div>



                        <p><strong className='text-xl'>অনুরোধ:</strong><br />
                            শুধুমাত্র উপরোক্ত নির্দিষ্ট নাম্বারে টাকা পাঠাবেন।<br />
                            অন্য কোনো নাম্বারে পেমেন্ট করলে HMS আপনার রেজিস্ট্রেশন নিশ্চিত করতে পারবে না।
                        </p>

                        <p><strong className='text-xl'>সবশেষে:</strong><br />
                            অবশ্যই পেমেন্ট ভেরিফিকেশন ফর্মটি পূরণ করুন,
                            নচেৎ আপনার রেজিস্ট্রেশন প্রক্রিয়া সম্পূর্ণ হবে না।
                        </p>

                        <p>
                            মাআস্সালাম,<br />
                            Heaven Marriage Solutions (HMS) টিম
                        </p>



                        <div onClick={() => setIsOpen(!isOpen)} className='flex flex-col justify-center'>
                            <p className="text-2xl ">পেমেন্ট ভেরিফাই করুন</p>
                            <BlackButton text={'ভেরিফাই পেমেন্ট'} />
                        </div>

                    </motion.div>
                }


                {
                    status === 'verified' &&
                    <motion.div
                        initial={{
                            opacity: 0
                        }}
                        whileInView={{
                            opacity: 1,
                            transition: {
                                ease: 'easeIn',
                                duration: 2,
                                delay: 1
                            }
                        }}
                        viewport={{ once: true }}
                        className="mt-10 space-y-5">

                        <p className="font-alkatra font-semibold my-10">বর্তমানে আপনার তথ্য যাচাই-বাছাই প্রক্রিয়াধীন রয়েছে।</p>
                        <p className='font-mina'>ইনশাআল্লাহ, আমাদের টিম ১ থেকে ৭২ ঘণ্টার মধ্যে আপনাকে রিপ্লাই প্রদান করবে।
                            এই সময়ের মধ্যে সাড়া না পেলেও অনুগ্রহ করে উদ্বিগ্ন হবেন না — আমরা যথাসময়ে আপনাকে আপডেট জানাবো।</p>
                        <p className='font-mina'>একবার ভেরিফিকেশন সম্পন্ন হয়ে গেলে, আপনি HMS-এর পরবর্তী কার্যক্রমে সম্পূর্ণভাবে অংশগ্রহণ করতে পারবেন।
                            আপনি প্রোফাইল ব্রাউজ করতে পারবেন, পছন্দের মোহতারাম/মোহতারামাকে প্রস্তাব পাঠাতে পারবেন এবং আপনার জন্য আগত প্রস্তাবগুলোও দেখতে পারবেন।</p>
                        <p className='font-mina'>যেকোনো জিজ্ঞাসা বা সহযোগিতার জন্য আমাদের অফিসিয়াল নম্বরসমূহে যোগাযোগ করতে দ্বিধা করবেন না।</p>
                        <p className='font-mina font-semibold'>Heaven Marriage Solutions টিম।</p>

                        <p className='font-alkatra'>যেকোনো সহযোগিতা বা পরামর্শের জন্য যোগাযোগ করুন:</p>
                        <ul className='space-y-4'>
                            <div>
                                <p className='font-mina font-semibold'>মোহাম্মদ রাহেদ হোসেন মাহেদ (ফাউন্ডার and সিইও Heaven Group)</p>
                                <li className='list-disc font-galada text-red-800 ml-10'>+8801748919251</li>
                            </div>
                            <div>
                                <p className='font-mina font-semibold'>হাফিজুর রহমান হাফিজ (ফাউন্ডার and চেয়ারম্যান Heaven Group)</p>
                                <li className='list-disc font-galada text-red-800 ml-10'> +8801925222525</li>
                            </div>
                            <div>
                                <p className='font-mina font-semibold'>অফিসিয়াল হোয়াটসঅ্যাপ সাপোর্ট (ডকুমেন্ট ও প্রস্তাব সংক্রান্ত)</p>
                                <li className='list-disc font-galada text-red-800 ml-10'>+8801610371038</li>
                            </div>
                        </ul>

                        <div className='flex justify-center'>
                            <Link to='/'>
                                <BlackButton text='Home' />
                            </Link>
                        </div>

                    </motion.div>
                }


                <GenInfoModal isOpen={isOpen} setIsOpen={setIsOpen} />



            </div>
        </div>
    );
};

export default FormSubmitted;;