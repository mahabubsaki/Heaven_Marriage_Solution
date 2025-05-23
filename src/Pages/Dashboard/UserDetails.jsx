import { useParams } from "react-router";
import useAuth from "../../Hooks/Auth/useAuth";
import Loading from "../Loading/Loading";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import React from 'react';
import useRole from "../../Hooks/Role/useRole";
import useUser from "../../Hooks/User/useUser";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Shared/Navbar/Navbar";


const UserDetails = () => {


    // for men
    const men_questions = [
        // 1. Personal Identity
        { p: 'Personal Identity', hidden: 'hidden' },
        { name: "name", question: "নাম?" },
        { name: "age", question: "বয়স ?" },
        { name: "birthDate", question: "জন্ম তারিখ" },
        { name: "nid_or_birth_certificate", question: "NID/জন্মনিবন্ধন নং " },
        { name: "marital_status", question: "বৈবাহিক অবস্থা " },

        // 2. Family Background
        { p: 'Family Background', hidden: 'hidden' },
        { name: "father_name_job", question: "পিতার নাম " },
        { name: "mother_name_job", question: "মাতার নাম " },
        { name: "siblings_info", question: "ভাইবোন কত জন? নিজের সিরিয়াল কত?" },
        { name: "family_lineage", question: "নিজস্ব বংশের নাম ও মর্যাদা সম্পর্কে সংক্ষেপ " },
        { name: "family_economy", question: "পারিবারিক অর্থনৈতিক অবস্থান" },

        // 3. Education & Career
        { p: 'Education & Career', hidden: 'hidden' },
        { name: "study_level", question: "পড়াশুনা " },
        { name: "study_details", question: "বিস্তারিত পড়াশোনা ?" },
        { name: "education_background", question: "নিজের শিক্ষাগত ব্যাকগ্রাউন্ড " },
        { name: "current_profession_details", question: "বর্তমান পেশা" },
        { name: "income_source", question: "আয় এর উৎস " },
        { name: "monthly_income", question: "আপনার বর্তমানে আনুমানিক মাসিক আয় " },
        { name: "own_economy", question: "আপনার নিজস্ব অর্থনৈতিক অবস্থান" },

        // 4. Location & Contact
        { p: 'Location & Contact', hidden: 'hidden' },
        { name: "location", question: "বর্তমান অবস্থান" },
        { name: "current_full_address", question: "বর্তমান পূর্ণ ঠিকানা (প্রযোজ্য ক্ষেত্রে বাসা নাম্বার, ফ্ল্যাট নাম্বার ইত্যাদিসহ)" },
        { name: "email", question: "ইমেইল অ্যাড্রেস দিন" },
        { name: "whatsapp", question: "হোয়াটসআ্যপ নাম্বার" },
        { name: "alternate_number", question: "অন্য আরেকটি নাম্বার দিন " },

        // 5. Physical Info
        { p: 'Physical Info', hidden: 'hidden' },
        { name: "height", question: "উচ্চতা" },
        { name: "body_structure", question: "শারীরিক কাঠামো " },
        { name: "skin_color", question: "গায়ের রঙ " },
        { name: "physical_disability", question: "শারীরিক কোন অঙ্গহানি" },

        // 6. Property & Assets
        { p: 'Property & Assets', hidden: 'hidden' },
        { name: "assets_details", question: "স্থাবর-অস্থাবর সম্পত্তি আছে কি না? থাকলে বিস্তারিত বিবরণ" },

        // 7. Marital History
        { p: 'Marital History', hidden: 'hidden' },
        { name: "previous_wife_rights", question: "আগের স্ত্রী বা স্ত্রীগণের শরয়ী হকগুলো ( থাকলে !) আদায় করা হয়েছে কি না?" },
        { name: "children_count", question: "মোট সন্তান" },
        { name: "divorce_reason", question: "ডিভোর্স্ড কিনা ? ,হলে কেনো হয়েছে বিস্তারিত" },

        // 8. Preferences in Spouse
        { p: 'Preferences in Spouse', hidden: 'hidden' },
        { name: "preferred_bride_area", question: "কোন এলাকা অথবা দেশের পাত্রী হলে ভালো হয় ?" },
        { name: "preferred_bride_age", question: "কেমন বয়সের চান ?" },
        { name: "preferred_bride_height", question: "উচ্চতা কেমন চান ? " },
        { name: "expected_bride_color", question: "গায়ের রঙ  কেমন চান ?" },
        { name: "expected_bride_education", question: "শিক্ষাগত ব্যাকগ্রাউন্ড কেমন চান ?" },
        { name: "expected_bride_family_type", question: "কেমন ফ্যামিলির পাত্রী চান?" },
        { name: "expected_bride_class", question: "আপনি কোন শ্রেণির পারিবারিক ব্যাকগ্রাউন্ডের পাত্রী চান ?" },
        { name: "bride_type", question: "কেমন পাত্রী চান?" },
        { name: "specific_dream", question: "প্রত্যেকটি মানুষই তার জীবনসঙ্গীর ব্যাপারে কিছু স্বপ্ন দেখে... তা হলো " },

        // 9. Post-Marriage Intentions
        { p: 'Post-Marriage Intentions', hidden: 'hidden' },
        { name: "post_marriage_living", question: "যাকে বিয়ে করবেন তাকে বিয়ের পর কোথায় রাখবেন ?" },
        { name: "mohor_support", question: "নতুন যাকে বিয়ে করতে চাচ্ছেন তাঁর মোহর ও ভরনপোষণ কী মান এর দিতে পারবেন?" },
        { name: "wife_earning", question: "বিয়ের পর স্ত্রীদেরকে টিউশনি, শিক্ষকতা বা অন্য কোনো কর্মের মাধ্যমে অর্থ উপার্জন  করবেন কি না ?" },
        { name: "wives_intention", question: "আপনার কতজন স্ত্রী রাখার নিয়ত আছে?" },
        { name: "justice_among_wives", question: "স্ত্রীদের মাঝে শরয়ী হক আদায় এর ক্ষেত্রে সম্পূর্ণ আদালত বজায় রাখবেন কি না?" },
        { name: "will_not_violate_rights", question: "পূর্বের স্ত্রী, পরিবার ও সমাজ বা অন‌্য কারো চাপে পরবর্তী স্ত্রীদের শরয়ী হকগুলো আদায় করা বন্ধ করবেন না তো?" },
        { name: "accept_other_children", question: "তার অন্য ঘরের সন্তান বা এতীম সন্তান থাকলে দায়িত্ব নিতে পারবেন কি না?" },

        // 10. Belief & Commitment
        { p: 'Belief & Commitment', hidden: 'hidden' },
        { name: "follow_shariah", question: "আপনি ইসলামী শরীয়াতের সকল বিধান মন থেকে মানতে রাজি আছেন কি না? এবং সবগুলি পছন্দ করেন কি না?" },
        { name: "sunna_beard_and_purdah", question: "আপনি নিজে সুন্নাতী দাড়ী এবং স্ত্রীদেরকে খাস পর্দায় রাখতে অঙ্গিকারবদ্ধ হতে রাজি আছেন কি না?" },
        { name: "accept_all_guidelines", question: "বৈবাহিক জীবনে স্ত্রীর/স্ত্রীদের শরয়ী অধিকারগুলো ও একাধিক  স্ত্রীদের মাঝে আদালত সংক্রান্ত যে শরয়ী নির্দেশনা রয়েছে, সবগুলি মানতে প্রস্তুত আছেন কি না?" },
        { name: "accept_tms_rules", question: "আপনি Taqwa Marriage Solutions (TMS) এর দাম্পত্য জীবন কেন্দ্রিক সকল আদর্শ তথা বিবাহ কেন্দ্রিক সকল শরয়ী বিধান মানতে রাজি আছেন কি না?" },
        { name: "support_others_polygyny", question: "আপনার বাবা, দুলাভাই, ছেলে বা অন্য কেউ মাসনা, সুলাছা, রুবা'আ করতে চাইলে পূর্ণ সাপোর্ট ও সহযোগিতা করবেন কি না?" },
        { name: "accept_daughters_polygyny", question: "আপনার মেয়ে কারো মাসনা হলে বা আপনার জামাই মাসনা করলে মেনে নিতে পারবেন কি না?" },
        { name: "agreement_false_info_consequence", question: "ভুল বা মিথ্যা তথ্য দিলে সদস্যপদ বাতিল ও তালাক বিষয়ক সম্মতির শর্ত মেনে নেবেন কি না?" },
        { name: "agree_on_false_info_consequence", question: "ভুল বা মিথ্যা তথ্য দিলে সদস্যপদ বাতিল ও তালাক বিষয়ক সম্মতির শর্ত মেনে নেবেন কি না?" },
        { name: "final_commitment", question: "আপনার যে শরয়ী নীতি ও স্ত্রীর হক্ব আদায়ের মনোভাব আমরা এখানে দেখতে পাচ্ছি, ইন শা আল্লাহ তা শুধু কথায় নয়, বাস্তব জীবনেও আপনি অটুট রাখবেন—এবং একে দায়িত্ব, ইবাদত ও আমানত মনে করে পালন করবেন—আপনি কি সেই ওয়াদা আজ এখানেই করছেন?" },
        { name: "registration_preference", question: "বিশেষ শর্ত: আপনি কিভাবে রেজিস্ট্রেশন করতে আগ্রহী?" }
    ];



    // female qustions
    const female_questions = [
        // Basic Identity
        { p: 'Basic Identity', hidden: 'hidden' },
        { name: "name", question: "নাম?" },
        { name: "age", question: "বয়স?" },
        { name: "birth_date", question: "জন্ম তারিখ (NID/জন্মনিবন্ধনে যেটা উল্লেখ আছে)?" },
        { name: "nid_or_birth_certificate", question: "NID/জন্মনিবন্ধন নং?" },
        { name: "current_location", question: "আপনার বর্তমান অবস্থান কোথায় ? (জেলা এবং দেশের নাম উল্লেখ করুন)।" },

        // Contact
        { p: 'Contact', hidden: 'hidden' },
        { name: "whatsapp_number", question: "হোয়াটসআ্যপ নাম্বার লিখুন (হোয়াটসঅ্যাপ নাম্বার ছাড়া অন্য নাম্বার প্রযোজ্য নয়। যদি হোয়াটসঅ্যাপ না থাকে, হোয়াটসঅ্যাপ অ্যাপটি এক্টিভ করে নিন)" },
        { name: "whatsapp_number_owner", question: "হোয়াটসআ্যপ নাম্বারটি কার তা উল্লেখ করুন?" },

        // Family
        { p: 'Family', hidden: 'hidden' },
        { name: "father_name_occupation", question: "পিতার নাম ও পেশা?" },
        { name: "mother_name_occupation", question: "মাতার নাম ও পেশা?" },
        { name: "siblings_and_position", question: "ভাইবোন কত জন? আপনার সিরিয়াল কত?" },
        { name: "family_lineage", question: "নিজস্ব বংশের নাম ও মর্যাদা সম্পর্কে সংক্ষেপে লিখুন?" },

        // Physical Info
        { p: 'Physical Info', hidden: 'hidden' },
        { name: "height", question: "আপনার উচ্চতা লিখুন?" },
        { name: "physical_structure", question: "শারীরিক কাঠামো?" },
        { name: "skin_color", question: "গায়ের রঙ?" },
        { name: "physical_condition", question: "শারীরিক কোন অঙ্গহানি থাকলে বা বড় ধরনের কোন রোগ থাকলে আমানতের সাথে উল্লেখ করুন?" },

        // Education & Skills
        { p: 'Education & Skills', hidden: 'hidden' },
        { name: "education_level", question: "কতটুকু পড়াশুনার তাওফিক পেয়েছেন?" },
        { name: "education_background", question: "আপনার শিক্ষাগত ব্যাকগ্রাউন্ড কী?" },
        { name: "education_details", question: "আপনার পড়াশোনা সম্পর্কে বিস্তারিত লেখুন?" },
        { name: "skills_or_experience", question: "আপনার বিশেষ কোনো অভিজ্ঞতা বা দক্ষতা থাকলে তা উর্লেখ করুন?" },

        // Employment & Economy
        { p: 'Employment & Economy', hidden: 'hidden' },
        { name: "current_occupation", question: "বর্তমানে কি করেন বিস্তারিত লেখুন?" },
        { name: "current_expense_by", question: "আপনার বর্তমান খরচ কে বহন করছেন?" },
        { name: "own_property", question: "আপনার নিজস্ব কোনো স্থাবর-অস্থাবর, নগদ সম্পত্তি আছে কি না? থাকলে বিস্তারিত বিবরণ দিন?" },
        { name: "own_economy", question: "আপনার নিজস্ব অর্থনৈতিক অবস্থান?" },
        { name: "family_economy", question: "পারিবারিক অর্থনৈতিক অবস্থান?" },

        // Marital Info
        { p: 'Marital Info', hidden: 'hidden' },
        { name: "marital_status", question: "বৈবাহিক অবস্থা?" },
        { name: "children_count", question: "সন্তান কয়টি? (বিবাহিতা হলে), অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন?" },
        { name: "delivery_type", question: "বাচ্চা নরমালে হয়েছে না সিজারে? (যদি বাচ্চা থাকে)?" },
        { name: "child_living_preference", question: "আপনার সন্তান থাকলে কোথায় থাকবে?" },
        { name: "previous_husband_rights", question: "আগের স্বামীর শরয়ী হকগুলো আদায় করছেন কি না? (অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন)?" },
        { name: "divorce_reason", question: "ডিভোর্স্ড (পূর্বের স্বামীর সাথে ছাড়াছাড়ি হয়েছে), কেনো হয়েছে সংক্ষেপে লিখুন?" },

        // Preferences
        { p: 'Preferences', hidden: 'hidden' },
        { name: "child_count_plan", question: "আপনার কয়টি বাচ্চা নেওয়ার ইচ্ছা আছে?" },
        { name: "polygamy_opinion", question: "স্বামী যদি একাধিক বিবাহে আগ্রহী হন, আপনি বিষয়টাকে কেমনভাবে দেখবেন?" },
        { name: "agree_polygamous_wife", question: "২য়/৩য়/৪র্থ স্ত্রী হতে রাজি আছেন কি না?" },

        // Commitment & Values
        { p: 'Commitment & Values', hidden: 'hidden' },
        { name: "no_rights_blocking", question: "স্বামীর হক আদায় বন্ধ করবেন না তো?" },
        { name: "obey_husband_fully", question: "স্বামীর আদেশ-নিষেধ মানবেন?" },
        { name: "avoid_misbehavior", question: "কর্তৃত্ব, সম্পদ বা ব্যবহার নিয়ে বিরত থাকবেন?" },
        { name: "fulfill_husband_rights", question: "স্বামীর সকল হক আদায় করতে রাজি?" },
        { name: "care_step_children", question: "স্বামীর অন্য স্ত্রীর সন্তান লালন-পালন করবেন?" },
        { name: "accept_shariah", question: "ইসলামী শরীয়াত মানেন?" },
        { name: "follow_shariah_completely", question: "শতভাগ শরয়ী পর্দা ও হুকুম পালন করবেন?" },
        { name: "accept_tms_policy", question: "TMS-এর সকল শরয়ী বিধান মানেন?" },
        { name: "accept_polygamy_for_daughter", question: "মেয়ে বা জামাই মাসনা করলে মেনে নেবেন?" },

        // Additional Info
        { p: 'Additional Info', hidden: 'hidden' },
        { name: "additional_info", question: "নিজের ব্যাপারে কিছু শেয়ার করতে চাইলে করতে পারেন।" }
    ];



    const { user, loading } = useAuth();
    const { user_email } = useParams();
    const axiosSecure = useAxiosSecure();
    const { role, isLoading: roleLoading } = useRole();
    const { gender, isLoading: userLoading } = useUser();


    // get the user data
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['userFormDetails', user_email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user_details/${user_email}`);
            return data;
        }
    });

    // taking the data form edit 
    const [editedData, setEditedData] = useState({});
    const { mutateAsync } = useMutation({
        mutationFn: async (email) => {
            const { data } = await axiosSecure.put(`/admin_edit/${email}`, editedData);
            return data;
        },
        onSuccess: () => {
            toast.success('Edited Successfully');
            refetch();
        }
    });


    const handleEdit = async (email) => {
        await mutateAsync(email);
    };


    if (loading || roleLoading || isLoading, userLoading) return <Loading />;

    return (
        <div className="max-w-5xl mx-auto pb-2 w-full md:my-32 px-5 shadow-xl rounded-2xl">
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />

            <div className="flex w-full justify-between items-center mt-10">
                <h1 className="text-3xl md:text-4xl border-b py-5 text-[#C3937C] font-anek">ব্যক্তিগত তথ্য</h1>
                {role === 'admin' ?
                    <button onClick={() => handleEdit(data?.member_email)} className="h-[50px] px-5 border-b">Edit</button>
                    :
                    <Link to={`/images/${data?.member_email}`} className="font-mina underline">আরো ছবি</Link>
                }
            </div>

            <div className="flex flex-col md:flex-row justify-between border-b space-y-4">
                <p className="text-[clamp(20px,4vw,30px)]  md:text-center font-mina">{data?.name}</p>
                <img src={data?.image} className=" size-[180px] md:size-[250px] object-cover" alt="" />
            </div>


            <div>

                {/* for men */}
                <div className="md:grid my-5 space-y-5 md:grid-cols-4 grid-rows-5 w-full gap-5 py-10">
                    {
                        data?.gender === 'male' &&
                        men_questions.map((got, idx) => (
                            <div key={idx} className="col-span-2 row-span-1 space-y-1">
                                <p className="col-span-2 row-span-5 text-2xl font-bold font-anek">{got?.p}</p>
                                <p className="font-bold text-[18px]">{got?.question} </p>
                                <input
                                    type="text"
                                    value={editedData?.[got?.name]}
                                    disabled
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, [got.name]: e.target.value })
                                    }
                                    className={`border px-4 py-2 placeholder:text-black rounded w-full outline-none ${got?.hidden} `}
                                    placeholder={data?.[got?.name]}
                                />
                            </div>
                        ))
                    }

                    {/* for female */}

                    {
                        data?.gender === 'female' &&
                        female_questions.map((got, idx) => (
                            <div key={idx} className="col-span-2 row-span-1 space-y-1">
                                <p className="col-span-2 row-span-5 text-2xl font-kaushan text-[#C3937C]">{got?.p}</p>
                                <p className="font-bold text-[18px] font-alkatra">{got?.question} </p>
                                <input
                                    type="text"
                                    value={editedData?.[got?.name]}
                                    disabled
                                    onChange={(e) =>
                                        setEditedData({ ...editedData, [got.name]: e.target.value })
                                    }
                                    className={`border px-4 py-2 placeholder:text-black rounded w-full outline-none ${got?.hidden} `}
                                    placeholder={data?.[got?.name]}
                                />
                            </div>
                        ))
                    }

                </div>





            </div>



        </div>
    );
};

export default UserDetails;