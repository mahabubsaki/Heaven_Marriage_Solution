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
import minar_top from '/images/minar_top.png';
import default_img from '/images/default_img.jpg';
import male_default from '/images/male_default.png';
import female_default from '/images/female_default.png';
import underline_img2 from '/images/underline_img2.png';
import UserDetailsForm from "../../Components/UserDetails/UserDetailsForm";
import DownloadPdf from "../../Components/Shared/Pdf/DownloadPdf";

const UserDetails = () => {



    // for men
    const men_questions = [

        // category: "ব্যক্তিগত তথ্য", 0-5
        { name: "name", question: "নাম?", required: true },
        { name: "age", question: "বয়স ?", required: true },
        { name: "birthDate", question: "জন্ম তারিখ (NID/জন্মনিবন্ধনে যেটা উল্লেখ আছে)", required: true },
        { name: "location", question: "আপনার বর্তমান অবস্থান কোথায় ?", required: true },
        { name: "current_full_address", question: "বর্তমান পূর্ণ ঠিকানা (প্রযোজ্য ক্ষেত্রে বাসা নাম্বার, ফ্ল্যাট নাম্বার ইত্যাদিসহ)?", required: true },
        { name: "nid_or_birth_certificate", question: "NID/জন্মনিবন্ধন নং ?", required: true },

        // category: "শিক্ষাগত ও পেশাগত তথ্য", 5-13
        { name: "education_background", question: "আপনার শিক্ষাগত ব্যাকগ্রাউন্ড কী?", class: "hidden" },
        { name: "study_level", question: "পড়াশুনা?", class: "hidden" },
        { name: "study_details", question: "আপনার পড়াশোনা সম্পর্কে বিস্তারিত লেখুন ?", required: true },
        { name: "income_source", question: "আয় এর উৎস কী?", class: "hidden" },
        { name: "current_profession_details", question: "বর্তমান পেশা সম্পর্কে বিস্তারিত লেখুন ?", required: true },
        { name: "monthly_income", question: "আপনার বর্তমানে আনুমানিক মাসিক আয় কত?", required: true },
        { name: "assets_details", question: "স্থাবর-অস্থাবর সম্পত্তি আছে কি না? থাকলে বিস্তারিত বিবরণ দিন?", required: true },
        { name: "own_economy", question: "আপনার নিজস্ব অর্থনৈতিক অবস্থান", class: "hidden" },

        // category: "শারীরিক অবস্থা", 13-17
        { name: "height", question: "উচ্চতা?", class: "hidden" },
        { name: "body_structure", question: "শারীরিক কাঠামো?", class: "hidden" },
        { name: "skin_color", question: "গায়ের রঙ?", class: "hidden" },
        { name: "physical_disability", question: "শারীরিক কোন অঙ্গহানি থাকলে বা বড় ধরনের কোন রোগ থাকলে আমানতের সাথে উল্লেখ করুন:" },

        // category: "বৈবাহিক অবস্থা ও ইতিহাস", 17-23
        { name: "marital_status", question: "বৈবাহিক অবস্থা?", class: "hidden" },
        { name: "children_count", question: "সন্তান কয়টি? (বিবাহিত হলে),( অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন )", required: true },
        { name: "divorce_reason", question: "ডিভোর্স্ড (স্ত্রী/স্ত্রীদের সাথে ছাড়াছাড়ি হয়েছে) ,কেনো হয়েছে বিস্তারিত লিখুন  ?", required: true },
        { name: "wives_intention", question: "আপনার কতজন স্ত্রী রাখার নিয়ত আছে?", class: "hidden" },
        { name: "mohor_support", question: "নতুন যাকে বিয়ে করতে চাচ্ছেন তাঁর মোহর ও ভরনপোষণ কী মান এর দিতে পারবেন?", class: "hidden" },
        { name: "post_marriage_living", question: "যাকে বিয়ে করবেন তাকে বিয়ের পর কোথায় রাখবেন ?", class: "hidden" },

        // category: "পারিবারিক তথ্য", 23-28
        { name: "father_name_job", question: "পিতার নাম ও পেশা?", required: true },
        { name: "mother_name_job", question: "মাতার নাম ও পেশা?", required: true },
        { name: "siblings_info", question: "ভাইবোন কত জন? আপনার সিরিয়াল কত?", required: true },
        { name: "family_lineage", question: "নিজস্ব বংশের নাম ও মর্যাদা সম্পর্কে সংক্ষেপে লিখুন ?", required: true },
        {
            name: "family_economy",
            question: "পারিবারিক অর্থনৈতিক অবস্থান",
            class: "hidden",
        },

        // category: "আচার-আচরণ ও শরয়ী মানসিকতা", 28-36
        { name: "will_not_violate_rights", question: "পূর্বের স্ত্রী, পরিবার ও সমাজ বা অন‌্য কারো চাপে পরবর্তী স্ত্রীদের শরয়ী হকগুলো আদায় করা বন্ধ করবেন না তো?", class: "hidden" },
        { name: "follow_shariah", question: "আপনি ইসলামী শরীয়াতের সকল বিধান মন থেকে মানতে রাজি আছেন কি না? এবং সবগুলি পছন্দ করেন কি না?", class: "hidden" },
        { name: "accept_tms_rules", question: "আপনি Heaven Marriage Solutions (HMS) এর দাম্পত্য জীবন কেন্দ্রিক সকল আদর্শ তথা বিবাহ কেন্দ্রিক সকল শরয়ী বিধান মানতে রাজি আছেন কি না?", class: "hidden" },
        { name: "wife_earning", question: "বিয়ের পর স্ত্রীদেরকে টিউশনি, শিক্ষকতা বা অন্য কোনো কর্মের মাধ্যমে অর্থ উপার্জন  করবেন কি না ?", class: "hidden" },
        { name: "sunna_beard_and_purdah", question: "আপনি নিজে সুন্নাতী দাড়ী এবং স্ত্রীদেরকে খাস পর্দায় রাখতে অঙ্গিকারবদ্ধ হতে রাজি আছেন কি না?", class: "hidden" },
        { name: "accept_other_children", question: "তার অন্য ঘরের সন্তান বা এতীম সন্তান থাকলে দায়িত্ব নিতে পারবেন কি না?", class: "hidden" },
        { name: "agree_on_false_info_consequence", question: "ভুল তথ্য দিলে বা প্রতিশ্রুতি পালন না করলে HMS সিদ্ধান্ত নেয়ার অধিকার রাখে, আপনি সম্মত কি না?", class: "hidden" },
        { name: "agree_on_statement", question: "আপনি যে শরয়ী নীতি ও স্ত্রীর হক্ব আদায়ের মনোভাব দেখিয়েছেন তা বাস্তবেও পালন করবেন বলে ওয়াদা করছেন কি না?", class: "hidden" },

        // category: "প্রত্যাশিত পাত্রীর বৈশিষ্ট্য", 36-46
        { name: "districts", question: "কোন জেলার মেয়ে হলে ভালো হয়?" },
        { name: "expected_bride_age", question: "কেমন বয়সের চান?" },
        { name: "expected_bride_height", question: "উচ্চতা কেমন চান? (কত থেকে কত উচ্চতার)" },
        { name: "expected_bride_color", question: "গায়ের রঙ  কেমন চান ?", class: "hidden" },
        { name: "expected_bride_education", question: "শিক্ষাগত ব্যাকগ্রাউন্ড কেমন চান ?", class: "hidden" },
        { name: "expected_bride_family_type", question: "কেমন ফ্যামিলির পাত্রী চান?", class: "hidden" },
        { name: "expected_bride_class", question: "আপনি কোন শ্রেণির পারিবারিক ব্যাকগ্রাউন্ডের পাত্রী চান ?", class: "hidden" },
        { name: "bride_type", question: "কেমন পাত্রী চান?", class: "hidden" },
        { name: "specific_dream", label: "প্রত্যেকটি মানুষই তার জীবনসঙ্গীর ব্যাপারে কিছু স্বপ্ন দেখে... দয়া করে আপনারটা উল্লেখ করুন?" },
    ];


    // female qustions
    const female_questions = [

        // category: "ব্যক্তিগত তথ্য"
        { name: "name", question: "নাম?", required: true },
        { name: "age", question: "বয়স?", type: "number", required: true },
        { name: "current_location", question: "আপনার বর্তমান অবস্থান কোথায় ? (জেলা এবং দেশের নাম উল্লেখ করুন)।", required: true },
        { name: "nid_or_birth_certificate", question: "NID/জন্মনিবন্ধন নং?", type: "number", required: true },
        { name: "birth_date", question: "জন্ম তারিখ (NID/জন্মনিবন্ধনে যেটা উল্লেখ আছে)?", type: "date", required: true },
        { name: "current_full_address", question: "বর্তমান পূর্ণ ঠিকানা (প্রযোজ্য ক্ষেত্রে বাসা নাম্বার, ফ্ল্যাট নাম্বার ইত্যাদিসহ)?", required: true },

        // category: "শিক্ষাগত ও পেশাগত তথ্য"
        { name: "education_background", question: "আপনার শিক্ষাগত ব্যাকগ্রাউন্ড কী?", class: "hidden" },
        { name: "education_level", question: "কতটুকু পড়াশুনার তাওফিক পেয়েছেন?", class: "hidden" },
        { name: "education_details", question: "আপনার পড়াশোনা সম্পর্কে বিস্তারিত লেখুন?", required: true },
        { name: "skills_or_experience", question: "আপনার বিশেষ কোনো অভিজ্ঞতা বা দক্ষতা থাকলে তা উর্লেখ করুন?" },
        { name: "current_occupation", question: "বর্তমানে কি করেন বিস্তারিত লেখুন?" },

        // category: "শারীরিক অবস্থা"
        { name: "height", question: "আপনার উচ্চতা লিখুন?", required: true },
        { name: "physical_structure", question: "শারীরিক কাঠামো?", class: "hidden" },
        { name: "physical_condition", question: "শারীরিক কোন অঙ্গহানি থাকলে বা বড় ধরনের কোন রোগ থাকলে আমানতের সাথে উল্লেখ করুন?" },
        { name: "skin_color", question: "গায়ের রঙ?", class: "hidden" },

        // category: "বৈবাহিক অবস্থা ও ইতিহাস"
        { name: "marital_status", question: "বৈবাহিক অবস্থা?", class: "hidden" },
        { name: "children_count", question: "সন্তান কয়টি? (বিবাহিতা হলে), অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন?" },
        { name: "delivery_type", question: "বাচ্চা নরমালে হয়েছে না সিজারে? (যদি বাচ্চা থাকে)?", class: "hidden" },
        { name: "child_count_plan", question: "আপনার কয়টি বাচ্চা নেওয়ার ইচ্ছা আছে?", class: "hidden" },
        { name: "previous_husband_rights", question: "আগের স্বামীর শরয়ী হকগুলো আদায় করছেন কি না? (অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন)?" },
        { name: "divorce_reason", question: "ডিভোর্স্ড (পূর্বের স্বামীর সাথে ছাড়াছাড়ি হয়েছে), কেনো হয়েছে সংক্ষেপে লিখুন?" },

        // category: "পারিবারিক ও অর্থনৈতিক তথ্য"
        { name: "father_name_occupation", question: "পিতার নাম ও পেশা?", required: true },
        { name: "mother_name_occupation", question: "মাতার নাম ও পেশা?", required: true },
        { name: "siblings_and_position", question: "ভাইবোন কত জন? আপনার সিরিয়াল কত?", required: true },
        { name: "family_lineage", question: "নিজস্ব বংশের নাম ও মর্যাদা সম্পর্কে সংক্ষেপে লিখুন?", required: true },
        { name: "family_economy", question: "পারিবারিক অর্থনৈতিক অবস্থান?", class: "hidden" },
        { name: "own_economy", question: "আপনার নিজস্ব অর্থনৈতিক অবস্থান?", class: "hidden" },
        { name: "current_expense_by", question: "আপনার বর্তমান খরচ কে বহন করছেন?", required: true },
        { name: "own_property", question: "আপনার নিজস্ব কোনো স্থাবর-অস্থাবর, নগদ সম্পত্তি আছে কি না? থাকলে বিস্তারিত বিবরণ দিন?" },

        // category: "প্রত্যাশিত পাত্রের বৈশিষ্ট্য"
        { name: "favoured_husband", question: "কেমন পাত্র চান?", class: "hidden" },
        { name: "color_choice", question: "গায়ের রং কেমন চান?", class: "hidden" },
        { name: "height_choice", question: "উচ্চতা কেমন চান? (কত থেকে কত)", required: true },
        { name: "district_choice", question: "নির্দিষ্ট কোন জেলা/বিভাগের পাত্র চান? না যে কোনো?", required: true },
        { name: "financial_status", question: "আর্থিক অবস্থা কেমন চান?", class: "hidden" },
        { name: "own_opinion", question: "আপনার আরো কোন চাহিদা থাকলে স্বাধীনভাবে উল্লেখ করতে পারেন।" },

        // category: "শরয়ী অবস্থান ও মানসিকতা"
        { name: "haque_opinion", question: "পরিবার ও সমাজ বা অন‌্য কারো চাপে পরবর্তীতে স্বামীর শরয়ী হকগুলো আদায় করা বন্ধ করবেন না তো?", class: "hidden" },
        { name: "polygamy_opinion", question: "আপনার স্বামী যদি একাধিক বিবাহে আগ্রহী হন অথবা উনার যদি একাধিক বিবাহের প্রয়োজন হয়, আপনি বিষয়টাকে কেমনভাবে দেখবেন এবং পূর্ণ সাপোর্ট করবেন কি না?", class: "hidden" },
        { name: "agree_polygamous_wife", question: "আপনি কারোর ২য়/৩য়/৪র্থ স্ত্রী হতে রাজি আছেন কি না?", class: "hidden" },
        { name: "agree_islamic_law", question: "আপনি ইসলামী শরীয়াতের সকল বিধান মন থেকে মানতে রাজি আছেন কি না? এবং সবগুলি পছন্দ করেন কি না?", class: "hidden" },
        { name: "accept_tms_policy", question: "আপনি Heaven Marriage Solutions (HMS) এর দাম্পত্য জীবন কেন্দ্রিক সকল আদর্শ তথা বিবাহ কেন্দ্রিক সকল শরয়ী বিধান মানতে রাজি আছেন কি না?", class: "hidden" },
        { name: "fulfill_husband_rights", question: "আপনি আপনার স্বামীর সকল শরয়ী হক্ব আদায় করতে রাজি আছেন কিনা? হক্বগুলো না জানা থাকলে HMS থেকে জেনে নিয়ে তা মানতে রাজি আছেন কিনা?", class: "hidden" },
        { name: "accept_polygamy_for_daughter", question: "আপনার মেয়ে কারো মাসনা হলে বা আপনার জামাই মাসনা করলে মেনে নিতে পারবেন কি না?", class: "hidden" },
        { name: "obey_husband_fully", question: "আপনার স্বামীর সকল শরয়ী আদেশ-নিষেধ মানতে প্রস্তুত আছেন কি না?", class: "hidden" },
        { name: "avoid_misbehavior", question: "স্বামীর উপর কর্তৃত্ব খাটানো, সম্পদের উপর নজরদারী করা বা খারাপ ব্যবহার করা থেকে বিরত থাকবেন কি না?", class: "hidden" },
        { name: "care_step_children", question: "আপনার স্বামীর অন্য স্ত্রীর মা-হারা সন্তান থাকলে তাদেরকে লালন-পালন করতে প্রস্তুত আছেন কি না?", class: "hidden" },
        { name: "follow_shariah_completely", question: "শতভাগ শরয়ী পর্দা ও সকল শরয়ী হুকুম-আহকাম পরিপূর্ণভাবে পালন করতে রাজি আছেন কি না?", class: "hidden" },
        { name: "child_living_preference", question: "আপনার অন্য ঘরের সন্তান থাকলে কোথায় রাখতে চান, তার ব্যাপারে কী সিদ্ধান্ত আপনার? (বিবাহিতা ও সন্তানবিশিষ্টা হলে)। অবিবাহিতা হলে 'প্রযোজ্য না' লিখুন।", class: "hidden" },
        { name: "registration_preference", question: "বিশেষ শর্ত: আপনি কিভাবে রেজিস্ট্রেশন করতে আগ্রহী?", class: "hidden" },

        // category: "অন্যান্য"
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

    // console.log(data);


    // user data from usersCollection
    const { status, isLoading: userDataLoading, name, image, age, profession } = useUser();


    // console.log(data?.gender);


    // request a marrige offer
    const { mutateAsync: request } = useMutation({
        mutationFn: async (request) => {
            const { data } = await axiosSecure.post('/sent_request', request);
            return data;
        },
        onSuccess: () => {
            toast.success('Request Sent');
        }
    });


    // send proposal
    const sentProposal = async (to_data) => {
        if (to_data?.member_email === user?.email) {
            return toast.error('cant send request to yourself');
        }
        const requestData = {
            type: 'sent_proposal',
            to: to_data?.member_email,
            to_name: to_data?.name,
            to_image: to_data?.image,
            from: user?.email,
            from_name: name,
            from_image: image,
            request_status: 'requested'
        };
        // console.log(requestData);
        await request(requestData);
    };





    if (loading || roleLoading || isLoading || userLoading || userDataLoading) return <Loading />;

    return (
        <div className="max-w-5xl mx-auto pb-2 w-full md:my-32 shadow-xl rounded-2xl bg-[#c3cedf] min-h-[100dvh]">
            <div>
                <h1 className="text-2xl font-bold text-gray-600 p-2">Heaven Marriage</h1>
            </div>
            <Navbar text={'text-gray-600'} />

            {/* <img src={minar_top} alt="" className="px-2 pt-14" /> */}

            <div className="px-5 mx-2 pt-[50px]">
                <div className="flex w-full flex-col my-2">
                    <h1 className="text-2xl md:text-4xl text-gray-600 font-anek">ব্যক্তিগত তথ্য</h1>
                    {/* <img src={underline_img2} className="w-[200px] -mt-5 object-contain" alt="" /> */}
                </div>

                {/* image and name section */}
                <div className="flex shadow-[8px_8px_16px_#aab4c2,-8px_-8px_16px_#dce8f6]  p-4 rounded-3xl">
                    <div className="flex">
                        {
                            data?.image &&
                            <img src={data?.image} className=" size-[100px] rounded-full md:size-[250px] object-cover" alt="" />
                        }

                        {
                            !data?.image && data?.gender === 'male' &&
                            <img src={male_default} className=" size-[100px] rounded-full md:size-[250px] object-cover" alt="" />
                        }

                        {
                            !data?.image && data?.gender === 'female' &&
                            <img src={female_default} className=" size-[100px] rounded-full md:size-[250px] object-cover" alt="" />
                        }
                    </div>
                    <div className="rounded-2xl px-4 py-1">
                        <p className="text-[clamp(20px,4vw,30px)]  md:text-center font-anek">{data?.name}</p>
                        {/* <button onClick={() => handleEdit(data?.member_email)} className="h-[50px] px-5 border-b">Edit</button> */}
                        <Link to={`/images/${data?.member_email}`} className="font-anek text-sm underline">আরো ছবি</Link>
                    </div>
                </div>


                <div>

                    {/* for men form data */}
                    <div className=" space-y-3 grid-rows-5 w-full gap-5 py-5">

                        {/* for men */}
                        {
                            data?.gender === 'male' &&
                            <div className="flex flex-col space-y-4">
                                {/* ব্যক্তিগত তথ্য (0–5) */}
                                <UserDetailsForm data={data} got={men_questions.slice(0, 6)} heading="ব্যক্তিগত তথ্য" />

                                {/* শিক্ষাগত ও পেশাগত তথ্য (6–13) */}
                                <UserDetailsForm data={data} got={men_questions.slice(6, 14)} heading="শিক্ষাগত ও পেশাগত তথ্য" />

                                {/* শারীরিক অবস্থা (14–17) */}
                                <UserDetailsForm data={data} got={men_questions.slice(14, 18)} heading="শারীরিক অবস্থা" />

                                {/* বৈবাহিক অবস্থা ও ইতিহাস (18–23) */}
                                <UserDetailsForm data={data} got={men_questions.slice(18, 24)} heading="বৈবাহিক অবস্থা ও ইতিহাস" />

                                {/* পারিবারিক তথ্য (24–28) */}
                                <UserDetailsForm data={data} got={men_questions.slice(24, 29)} heading="পারিবারিক তথ্য" />

                                {/* আচার-আচরণ ও শরয়ী মানসিকতা (29–36) */}
                                <UserDetailsForm data={data} got={men_questions.slice(29, 37)} heading="আচার-আচরণ ও শরয়ী মানসিকতা" />

                                {/* প্রত্যাশিত পাত্রীর বৈশিষ্ট্য (37–46) */}
                                <UserDetailsForm data={data} got={men_questions.slice(37, 47)} heading="প্রত্যাশিত পাত্রীর বৈশিষ্ট্য" />
                            </div>
                        }



                        {/* for female form data */}
                        {
                            data?.gender === 'female' &&
                            <div className="flex flex-col space-y-4">
                                <UserDetailsForm data={data} got={female_questions.slice(0, 6)} heading="ব্যক্তিগত তথ্য" />

                                <UserDetailsForm data={data} got={female_questions.slice(6, 11)} heading="শিক্ষাগত ও পেশাগত তথ্য" />

                                <UserDetailsForm data={data} got={female_questions.slice(11, 15)} heading="শারীরিক অবস্থা" />

                                <UserDetailsForm data={data} got={female_questions.slice(15, 21)} heading="বৈবাহিক অবস্থা ও ইতিহাস" />

                                <UserDetailsForm data={data} got={female_questions.slice(21, 29)} heading="পারিবারিক ও অর্থনৈতিক তথ্য" />

                                <UserDetailsForm data={data} got={female_questions.slice(29, 35)} heading="প্রত্যাশিত পাত্রের বৈশিষ্ট্য" />

                                <UserDetailsForm data={data} got={female_questions.slice(35, 48)} heading="শরয়ী অবস্থান ও মানসিকতা" />

                                <UserDetailsForm data={data} got={female_questions.slice(48)} heading="অন্যান্য" />
                            </div>

                        }

                    </div>

                    <div className="flex justify-center">
                        <button onClick={() => sentProposal(data)}
                            className="text-xs font-semibold  border-b px-4 py-2 my-4 flex items-center gap-2 w-[300px]
             bg-gradient-to-r from-[#faf0d3] to-[#e9deaf] 
             text-gray-800 rounded shadow-md 
             hover:from-[#E6E0CC] hover:to-[#d1c38b] 
             transition duration-300 flex-col">
                            প্রস্তাব পাঠান
                        </button>
                    </div>

                    <div className="flex justify-center">
                        {Object.keys(data).length > 0 && <DownloadPdf key={data?._id} formData={data} men_questions={men_questions} female_questions={female_questions} />}
                    </div>

                </div>
            </div>



        </div>
    );
};

export default UserDetails;