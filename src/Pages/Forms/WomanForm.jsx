import { useNavigate } from "react-router";
import BlackButton from "../../Components/Shared/Buttons/BlackButton";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import Loading from "../Loading/Loading";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { imageUpload } from "../../Utils/ImageUpload";
import React, { useState } from 'react';
import HeadingSubHead from "../../Components/TextAnimations/HeadingSubHead";
import Navbar from "../../Components/Shared/Navbar/Navbar";
import womanFormImg from '/images/woman_form.jpeg';

const WomanForm = () => {

    const { user, loading } = useAuth();
    const [logLoad, setLogLoad] = useState(false);


    const questions = [
        { name: "name", label: "নাম?", required: true },
        {
            name: "age",
            question: "আপনার বয়স কত?",
            class: "hidden",
            options: [
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
                38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
                48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
                58, 59, 60
            ]
        },
        { name: "current_location", label: "আপনার বর্তমান অবস্থান কোথায় ? (জেলা এবং দেশের নাম উল্লেখ করুন)।", required: true },
        {
            name: "parmanent_address",
            question: "আপনার স্থায়ী ঠিকানা",
            class: "hidden",
            options: [
                "ঢাকা",
                "গাজীপুর",
                "নারায়ণগঞ্জ",
                "টাঙ্গাইল",
                "কিশোরগঞ্জ",
                "মানিকগঞ্জ",
                "মুন্সিগঞ্জ",
                "রাজবাড়ী",
                "মাদারীপুর",
                "শরীয়তপুর",
                "গোপালগঞ্জ",
                "ফরিদপুর",
                "নরসিংদী",
                "চট্টগ্রাম",
                "কক্সবাজার",
                "বান্দরবান",
                "রাঙ্গামাটি",
                "খাগড়াছড়ি",
                "নোয়াখালী",
                "লক্ষ্মীপুর",
                "ফেনী",
                "চাঁদপুর",
                "ব্রাহ্মণবাড়িয়া",
                "কুমিল্লা",
                "ময়মনসিংহ",
                "জামালপুর",
                "নেত্রকোনা",
                "শেরপুর",
                "রাজশাহী",
                "নাটোর",
                "নওগাঁ",
                "চাঁপাইনবাবগঞ্জ",
                "জয়পুরহাট",
                "বগুড়া",
                "পাবনা",
                "সিরাজগঞ্জ",
                "খুলনা",
                "যশোর",
                "চুয়াডাঙ্গা",
                "মেহেরপুর",
                "নড়াইল",
                "বাগেরহাট",
                "ঝিনাইদহ",
                "কুষ্টিয়া",
                "সাতক্ষীরা",
                "বরিশাল",
                "ভোলা",
                "পটুয়াখালী",
                "ঝালকাঠি",
                "পিরোজপুর",
                "বরগুনা",
                "সিলেট",
                "মৌলভীবাজার",
                "হবিগঞ্জ",
                "সুনামগঞ্জ",
                "রংপুর",
                "দিনাজপুর",
                "ঠাকুরগাঁও",
                "পঞ্চগড়",
                "নীলফামারী",
                "কুড়িগ্রাম",
                "গাইবান্ধা",
                "লালমনিরহাট"
            ]
        },
        { name: "nid_or_birth_certificate", label: "NID/জন্মনিবন্ধন নং?", type: 'number', required: true },
        { name: "birth_date", label: "জন্ম তারিখ (NID/জন্মনিবন্ধনে যেটা উল্লেখ আছে)?", type: 'date', required: true },
        { name: "whatsapp", label: "হোয়াটসঅ্যাপ নম্বর/মোবাইল নম্বর দিন।", required: true },
        // { name: "whatsapp_number_owner", label: "হোয়াটসআ্যপ নাম্বারটি কার তা উল্লেখ করুন?", required: true },
        {
            name: "education_background",
            question: "আপনার শিক্ষাগত ব্যাকগ্রাউন্ড কী?",
            class: "hidden",
            options: [
                "কওমী মাদ্রাসা পড়ুুুয়া",
                "আলিয়া মাদ্রাসা পড়ুুয়া",
                "জেনারেল শিক্ষিতা",
                "লেখাপড়া করা হয়নি",
                "হুম স্কিুলিং"
            ]
        },
        {
            name: "education_level",
            question: "কতটুকু পড়াশুনার তাওফিক পেয়েছেন?",
            class: "hidden",
            options: [
                "আলেমা",
                "হাফেজা",
                "মাস্টার্স",
                "অষ্টম পাস",
                "এইচ এস সি",
                "এস এস সি",
                "অনার্স",
                "আত্নশিক্ষিত",
            ]
        },

        { name: "education_details", label: "আপনার পড়াশোনা সম্পর্কে বিস্তারিত লেখুন?", required: true },
        { name: "skills_or_experience", label: "আপনার বিশেষ কোনো অভিজ্ঞতা বা দক্ষতা থাকলে তা উর্লেখ করুন?" },
        { name: "current_occupation", label: "বর্তমানে কি করেন বিস্তারিত লেখুন?" },
        { name: "height", label: "আপনার উচ্চতা লিখুন?", required: true },

        {
            name: "physical_structure",
            question: "শারীরিক কাঠামো?",
            class: "hidden",
            options: [
                "হালকা পাতলা গড়ন এর",
                "মাঝারী স্বাস্থ্যধারী",
                "ভারীদেহী"
            ]
        },

        {
            name: "income_source",
            question: "আপনার আয় এর উৎস কী?",
            class: "hidden",
            options: [
                "চাকরি",
                "ব্যবসা",
                "ফ্রিল্যান্স",
                "টিউশনি",
                "সেলাই",
                "কৃষি",
                "আয় নেই",
            ]
        },


        // { name: "physical_condition", label: "শারীরিক কোন অঙ্গহানি থাকলে বা বড় ধরনের কোন রোগ থাকলে আমানতের সাথে উল্লেখ করুন?" },
        {
            name: "skin_color",
            question: "গায়ের রঙ?",
            class: "hidden",
            options: ["উজ্জ্বল ফর্সা", "ফর্সা", "উজ্জ্বল শ্যামলা", "শ্যামলা", "কালো"]
        },

        {
            name: "marital_status",
            question: "বৈবাহিক অবস্থা?",
            class: "hidden",
            options: [
                "অবিবাহিতা (বাকেরা)",
                "ডিভোর্স্ড (সন্তানসহ )",
                "ডিভোর্স্ড (সন্তান ছাড়া )",
                "বিধবা (সন্তানসহ)",
                "বিধবা (সন্তানছাড়া)",
                "খুনছা (মেয়ে হিজড়া)",
            ]
        },
        { name: "children_count", label: "সন্তান কয়টি? (বিবাহিতা হলে), অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন?" },
        // {
        //     name: "delivery_type",
        //     question: "বাচ্চা নরমালে হয়েছে না সিজারে? (যদি বাচ্চা থাকে)?",
        //     class: "hidden",
        //     options: ["নরমাল ডেলিভারি", "সিজার", "বাচ্চা হয়নি", "প্রযোজ্য নয়"]
        // },
        // {
        //     name: "child_count_plan",
        //     question: "আপনার কয়টি বাচ্চা নেওয়ার ইচ্ছা আছে?",
        //     class: "hidden",
        //     options: ["যতগুলো হয়, বন্ধ করবো না, ইনশাআল্লাহ", "বাচ্চা হবে না বন্ধ্যা"]
        // },
        // { name: "previous_husband_rights", label: "আগের স্বামীর শরয়ী হকগুলো আদায় করছেন কি না? (অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন)?" },
        { name: "divorce_reason", label: "ডিভোর্স্ কেনো হয়েছে সংক্ষেপে লিখুন? (অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন)" },

        { heading: 'পারিবারিক ও অর্থনৈতিক তথ্য', visibility: "hidden", },
        { name: "father_name_occupation", label: "পিতার নাম ও পেশা?", required: true },
        { name: "mother_name_occupation", label: "মাতার নাম ও পেশা?", required: true },
        { name: "siblings_and_position", label: "ভাইবোন কত জন? আপনার সিরিয়াল কত?", required: true },
        { name: "family_lineage", label: "নিজস্ব বংশের নাম ও মর্যাদা সম্পর্কে সংক্ষেপে লিখুন?", required: true },
        {
            name: "family_economy",
            question: "পারিবারিক অর্থনৈতিক অবস্থান?",
            class: "hidden",
            options: ["উচ্চবিত্ত", "উচ্চ-মধ্যবিত্ত", "মধ্যবিত্ত", "নিম্ন-মধ্যবিত্ত", "নিম্নবিত্ত"]
        },
        {
            name: "own_economy",
            question: "আপনার নিজস্ব অর্থনৈতিক অবস্থান?",
            class: "hidden",
            options: ["উচ্চবিত্ত", "উচ্চ-মধ্যবিত্ত", "মধ্যবিত্ত", "নিম্ন-মধ্যবিত্ত", "নিম্নবিত্ত"]
        },
        { name: "current_expense_by", label: "আপনার বর্তমান খরচ কে বহন করছেন?", required: true },
        { name: "own_property", label: "আপনার নিজস্ব কোনো স্থাবর-অস্থাবর, নগদ সম্পত্তি আছে কি না? থাকলে বিস্তারিত বিবরণ দিন?" },


        // favoured_husband
        // color_choice
        // height_choice
        // financial_status
        // district_choice
        // own_opinion
        {
            name: "favoured_husband",
            question: "কেমন পাত্র চান?",
            class: "hidden",
            options: ["দীনদার আলেম",
                "*দীনদার জেনারেল শিক্ষিত",
                "*জেনারেল শিক্ষিত",
                "*যে কোনো দীনদার"]
        },
        {
            name: "color_choice",
            question: "গায়ের রং কেমন চান?",
            class: "hidden",
            options: ["*ফর্সা", "*উজ্জ্বল ফর্সা", "*ফর্সা-শ্যামলা", "*শ্যামলা", "*কালো",
                "*যে কোনো গায়ের রং"]
        },
        { name: "height_choice", label: "উচ্চতা কেমন চান? (কত থেকে কত) *" },
        { name: "district_choice", label: "নির্দিষ্ট কোন জেলা/বিভাগের পাত্র চান? না যে কোনো? *" },
        { name: "own_opinion", label: "আপনার আরো কোন চাহিদা থাকলে স্বাধীনভাবে উল্লেখ করতে পারেন।" },
        {
            name: "financial_status",
            question: "আর্থিক অবস্থা কেমন চান? ",
            class: "hidden",
            options: [
                "*উচ্চবিত্ত",
                "*উচ্চ মধ্যবিত্ত",
                "*মধ্যবিত্ত",
                "*নিম্নবিত্ত",
                "*যে কোনো আর্থিক অবস্থা"]
        },



        { heading: 'শরয়ী অবস্থান এর তথ্যাবলিঃ', visibility: "hidden", },


        // {
        //     name: "haque_opinion",
        //     question: " পরিবার ও সমাজ বা অন‌্য কারো চাপে পরবর্তীতে স্বামীর   শরয়ী হকগুলো আদায় করা বন্ধ করবেন না তো?*",
        //     class: "hidden",
        //     options: ["যেকোনো পরিস্থিতি আসুক হক নষ্ট  করবো না, ইনশা-আল্লাহ"]
        // },
        {
            name: "polygamy_opinion",
            question: "আপনার স্বামী যদি একাদিক বিবাহে আগ্রহি হোন অথবা উনার যদি একাদিক বিবাহের প্রযোজন হয় ,আপনি বিষয়টাকে কেমন ভাবে দেখবেন ?   এবং পূর্ণ সাপোর্ট করবেন কি না? ",
            class: "hidden",
            options: ["জ্বি, নির্দ্ধিদায় মেনে নিবো ।", "আলোচনা সাপেক্ষ ", "মেনে নিবো না"]
        },

        {
            name: "agree_polygamous_wife",
            question: "আপনি  কারোর ২য়/৩য়/৪র্থ স্ত্রী (মাসনা, সুলাছা, রুবা'আ)  হতে রাজি  আছেন কি না? ",
            class: "hidden",
            options: [
                "জি, ইনশা-আল্লাহ রাজি আছি।",
                "আলোচনা সাপেক্ষ  ।",
                "না রাজি নয়।"
            ]
        },
        // {
        //     name: "agree_islamic_law",
        //     question: "আপনি ইসলামী শরীয়াতের সকল বিধান মন থেকে মানতে রাজি আছেন কি না? এবং সবগুলি পছন্দ করেন কি না?*",
        //     class: "hidden",
        //     options: [
        //         "জি, ইনশা-আল্লাহ রাজি আছি।",
        //     ]
        // },

        {
            name: "accept_tms_policy",
            question: "আপনি  Heaven Marriage Solutions (HMS) এর দাম্পত্য জীবন কেন্দ্রিক সকল আদর্শ তথা বিবাহ কেন্দ্রিক সকল শরয়ী বিধান মানতে রাজি আছেন কি না?",
            class: "hidden",
            options: ["জি, রাজি আছি।"]
        },
        // {
        //     name: "fulfill_husband_rights",
        //     question: "আপনি আপনার স্বামীর সকল শরয়ী হক্ব আদায় করতে রাজি আছেন কিনা? হক্বগুলো না জানা থাকলে  HMS  থেকে  জেনে নিয়ে তা মানতে রাজি আছেন কিনা?",
        //     class: "hidden",
        //     options: ["জি রাজি আছি, ইনশাআল্লাহ"]
        // },
        // {
        //     name: "accept_polygamy_for_daughter",
        //     question: "আপনার মেয়ে কারো মাসনা হলে বা আপনার জামাই মাসনা করলে মেনে নিতে পারবেন কি না?",
        //     class: "hidden",
        //     options: ["জি পারবো, ইনশাআল্লাহ"]
        // },
        {
            name: "obey_husband_fully",
            question: "আপনার স্বামীর সকল শরয়ী আদেশ-নিষেধ মানতে প্রস্তুত আছেন কি না?",
            class: "hidden",
            options: ["জি, ইনশাআল্লাহ প্রস্তুত আছি ।"]
        },
        // {
        //     name: "avoid_misbehavior",
        //     question: "স্বামীর উপর কর্তৃত্ব খাটানো, সম্পদের উপর নজরদারী করা বা খারাপ ব্যবহার করা থকে বিরত থাকবেন কি না?",
        //     class: "hidden",
        //     options: ["বিরত থাকবো ইনশাআল্লাহ ।"]
        // },
        {
            name: "care_step_children",
            question: "আপনার স্বামীর অন্য স্ত্রীর মা-হারা সন্তান থাকলে তাদেরকে লালন-পালন করতে প্রস্তুত আছেন কি না? ",
            class: "hidden",
            options: [
                "জি,  প্রস্তুত আছি।",
                "না, প্রস্তুত নাই",
                "শর্তসাপেক্ষ প্রস্তুত আছি।"
            ]
        },
        {
            name: "follow_shariah_completely",
            question: " শতভাগ  শরয়ী পর্দা ও সকল শরয়ী হুকুম-আহকাম পরপিূর্ণভাবে পালন করতে রাজি আছেন কি না?",
            class: "hidden",
            options: ["জি, রাজি আছি।", "চেষ্টা করবো"]
        },
        {
            name: "child_living_preference",
            question: "আপনার অন্য ঘরের সন্তান থাকলে কোথায় রাখতে চান, তার ব্যাপারে কী সিদ্ধান্ত আপনার? (বিবাহিতা ও সন্তানবিশিষ্টা হলে) । অবিবাহিতা হলে ”প্রোজোয্য না” লিখুন ।",
            class: "hidden",
            options: [
                "আমার সাথে",
                "তার বাবার কাছে",
                "আমার পরিবারের কারোর কাছে",
                "প্রোজোয্য না"
            ]
        },
        {
            name: "registration_preference",
            question: "বিশেষ শর্ত: আপনি কিভাবে রেজিস্ট্রেশন করতে আগ্রহী?",
            class: "hidden",
            options: [
                "HMS এর মাধ্যমে",
                "নিজে নিজে",
                "আলোচনা সাপেক্ষ"
            ]
        },

        { name: "current_full_address", label: "বর্তমান পূর্ণ ঠিকানা (প্রযোজ্য ক্ষেত্রে বাসা নাম্বার, ফ্ল্যাট নাম্বার ইত্যাদিসহ)?", required: true },
        // { name: "email", label: "আপনার ইমেইল অ্যাড্রেস দিন ?", required: true },
        { name: "alternate_number", label: "আপনার অন্য আরেকটি নাম্বার দিন (আবশ্যিক)" },
        // { name: "additional_info", label: "নিজের ব্যাপারে কিছু শেয়ার করতে চাইলে করতে পারেন।" }
    ];

    const questionName = [
        "name",
        "age",
        "current_location",
        "nid_or_birth_certificate",
        "birth_date",
        "whatsapp_number",
        "whatsapp_number_owner",
        "education_background",
        "education_level",
        "education_details",
        "skills_or_experience",
        "income_source",
        "current_occupation",
        "height",
        "physical_structure",
        "physical_condition",
        "skin_color",
        "marital_status",
        "children_count",
        "delivery_type",
        "child_count_plan",
        "previous_husband_rights",
        "divorce_reason",
        "father_name_occupation",
        "mother_name_occupation",
        "siblings_and_position",
        "family_lineage",
        "family_economy",
        "own_economy",
        "current_expense_by",
        "own_property",
        "haque_opinion",
        "polygamy_opinion",
        "agree_polygamous_wife",
        "agree_islamic_law",
        "accept_tms_policy",
        "fulfill_husband_rights",
        "accept_polygamy_for_daughter",
        "obey_husband_fully",
        "avoid_misbehavior",
        "care_step_children",
        "follow_shariah_completely",
        "child_living_preference",
        "additional_info",
        "favoured_husband",
        "color_choice",
        "height_choice",
        "financial_status",
        "district_choice",
        "own_opinion",
    ];


    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    // send the woman form
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (formData) => {
            const { data } = await axiosSecure.post(`/form/${user?.email}`, formData);
            return data;
        },
        onSuccess: () => {
            toast.success('Form submitted Succesfully !');
            setLogLoad(false);
            navigate('/girls_verified');
        }
    });


    // get the uuid
    const { data: uuidData = [] } = useQuery({
        queryKey: ['uuid'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/get_uuid');
            return data;
        }
    });
    const uuidNum = parseInt(uuidData?.uuid);
    // console.log(uuidNum);


    if (loading) return <Loading />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        //test
        const name = form.name.value;
        const age = form.age.value;
        // const ageInt = parseInt(age);
        const current_location = form.current_location.value;
        const parmanent_address = form.parmanent_address.value;
        const nid_or_birth_certificate = form.nid_or_birth_certificate.value;
        const birth_date = form.birth_date.value;
        const whatsapp = form.whatsapp.value;
        const whatsapp_number_owner = form.whatsapp_number_owner.value;
        const education_background = form.education_background.value;
        const education_level = form.education_level.value;
        const education_details = form.education_details.value;
        const skills_or_experience = form.skills_or_experience.value;
        const current_occupation = form.current_occupation.value;
        const height = form.height.value;
        const income_source = form.income_source.value;
        const physical_structure = form.physical_structure.value;
        const physical_condition = form.physical_condition.value;
        const skin_color = form.skin_color.value;
        const marital_status = form.marital_status.value;
        const children_count = form.children_count.value;
        const delivery_type = form.delivery_type.value;
        const child_count_plan = form.child_count_plan.value;
        const previous_husband_rights = form.previous_husband_rights.value;
        const divorce_reason = form.divorce_reason.value;
        const father_name_occupation = form.father_name_occupation.value;
        const mother_name_occupation = form.mother_name_occupation.value;
        const siblings_and_position = form.siblings_and_position.value;
        const family_lineage = form.family_lineage.value;
        const family_economy = form.family_economy.value;
        const own_economy = form.own_economy.value;
        // added
        const favoured_husband = form.favoured_husband.value;
        const color_choice = form.color_choice.value;
        const height_choice = form.height_choice.val;
        const financial_status = form.financial_status.value;
        const district_choice = form.district_choice.val;
        const own_opinion = form.own_opinion.val;
        // ended
        const current_expense_by = form.current_expense_by.value;
        const own_property = form.own_property.value;
        const haque_opinion = form.haque_opinion.value;
        const polygamy_opinion = form.polygamy_opinion.value;
        const agree_polygamous_wife = form.agree_polygamous_wife.value;
        const agree_islamic_law = form.agree_islamic_law.value;
        const accept_tms_policy = form.accept_tms_policy.value;
        const fulfill_husband_rights = form.fulfill_husband_rights.value;
        const accept_polygamy_for_daughter = form.accept_polygamy_for_daughter.value;
        const obey_husband_fully = form.obey_husband_fully.value;
        const avoid_misbehavior = form.avoid_misbehavior.value;
        const care_step_children = form.care_step_children.value;
        const email = form.email.value;
        const current_full_address = form.current_full_address.value;
        const registration_preference = form.registration_preference.value;
        const follow_shariah_completely = form.follow_shariah_completely.value;
        const child_living_preference = form.child_living_preference.value;
        const additional_info = form.additional_info.value;
        const form_uuId = crypto.randomUUID();

        const image = form.image.files[0];

        let imageUrl = '';

        if (image) {
            imageUrl = await imageUpload(image);
        }

        const womanForm = {
            name,
            age,
            current_location,
            parmanent_address,
            nid_or_birth_certificate,
            birth_date,
            whatsapp,
            whatsapp_number_owner,
            education_background,
            education_level,
            education_details,
            skills_or_experience,
            current_occupation,
            height,
            physical_structure,
            physical_condition,
            skin_color,
            marital_status,
            children_count,
            income_source,
            delivery_type,
            child_count_plan,
            previous_husband_rights,
            divorce_reason,
            father_name_occupation,
            mother_name_occupation,
            siblings_and_position,
            favoured_husband,
            color_choice,
            height_choice,
            financial_status,
            district_choice,
            own_opinion,
            family_lineage,
            family_economy,
            own_economy,
            current_expense_by,
            own_property,
            haque_opinion,
            polygamy_opinion,
            agree_polygamous_wife,
            agree_islamic_law,
            accept_tms_policy,
            fulfill_husband_rights,
            accept_polygamy_for_daughter,
            obey_husband_fully,
            avoid_misbehavior,
            care_step_children,
            follow_shariah_completely,
            child_living_preference,
            additional_info,
            email,
            current_full_address,
            registration_preference,
            image: imageUrl,
            member_email: user?.email,
            gender: 'female',
            role: 'member',
            status: 'verified',
            form_uuId,
            uuid: uuidNum + 1
        };

        setLogLoad(true);
        await mutateAsync(womanForm);
        form.reset();

    };

    if (loading || isPending) return <Loading />;

    return (
        <div className="px-2 py-2">
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />
            <div className="border-[5px] rounded-xl border-[#373B4D] max-w-[1000px] mx-auto  mt-16 mb-5">
                <img src={womanFormImg} className="px-0 mb-5" alt="" />
                <HeadingSubHead heading="মহিলাদের ফরম" />

                <form onSubmit={handleSubmit} className="gap-10 pt-5 px-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-5">
                            <label className="font-semibold ">
                                আপনার ছবি
                            </label>
                            <input type="file" name="image" id="" className="w-2/3 border file:rounded-full border-black rounded-2xl px-5 py-2" />
                        </div>

                        {
                            questions.map(({ heading, subHeading, visibility, name, question, class: clas, label, options, required }, idx) => (
                                <div key={idx}>
                                    {heading && <p className="text-3xl ">{heading}</p>}
                                    {subHeading && <p className="">{subHeading}</p>}

                                    {!clas && < div className="flex flex-col">
                                        <label className={`font-semibold  text-justify ${clas}`}>
                                            {label}
                                        </label>
                                        {!visibility && < input className={`bg-white ${clas} px-2 w-full border-2 border-gray-300   rounded py-2 `} type="text" name={name} required />}
                                    </div>}

                                    {clas && (
                                        <div className="mb-4">
                                            <label className="block font-semibold mb-1 text-justify">{question}</label>
                                            <select
                                                required
                                                name={name}
                                                className="px-5 cursor-pointer w-full md:w-3/4 mt-1 h-10 bg-[#F9F6EE] border-b appearance-none border-black rounded-sm outline-none"
                                            >
                                                <option disabled selected value="">Select</option>
                                                {options.map((option, idx) => (
                                                    <option key={idx} className="bg-[#F9F6EE]" value={option}>{option}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            ))
                        }



                    </div>

                    <div className="my-4 space-y-2 text-red-600">
                        <p className="text-justify font-galada">ফর্ম জমা দেওয়ার আগে নির্দেশনাগুলো পড়ুন ও সকল তথ্য যাচাই করুন। ফাঁকা ঘর থাকলে সাবমিশন হবে না।</p>
                        <p className="text-justify font-galada">মুহতারিমা, <br />
                            সঠিকভাবে জমা হলে স্ক্রিনে পরবর্তী নির্দেশনা প্রদর্শিত হবে।তা ধারাবাহিক ভাবে অনুসরণ করুন।
                            প্রয়োজনে হোয়াটসঅ্যাপে যোগাযোগ করুন অথবা ডিরেক্ট কল দিন।</p>
                    </div>

                    <div className="flex justify-center my-5">
                        <button
                            disabled={logLoad}
                            className="px-4 py-1 mx-5 w-[340px]
             bg-gradient-to-r from-[#faf0d3] to-[#e9deaf] 
             text-gray-800 font-semibold rounded shadow-md 
             hover:from-[#E6E0CC] hover:to-[#d1c38b] flex items-center justify-center
             transition duration-300">
                            {
                                logLoad ?
                                    <AiOutlineLoading className='text-2xl font-bold animate-spin' />
                                    :
                                    "Submit"
                            }
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default WomanForm;