import { useMutation } from "@tanstack/react-query";
import BlackButton from "../../Components/Shared/Buttons/BlackButton";
import useAuth from "../../Hooks/Auth/useAuth";
import Loading from "../Loading/Loading";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { imageUpload } from "../../Utils/ImageUpload";
import React, { useState } from 'react';
import Navbar from "../../Components/Shared/Navbar/Navbar";
import HeadingSubHead from "../../Components/TextAnimations/HeadingSubHead";
import menFormImage from '/images/men_form.jpeg';
import { AiOutlineLoading } from "react-icons/ai";

const MenForm = () => {

    const { user, loading } = useAuth();
    const [logLoad, setLogLoad] = useState(false);

    const questions = [
        { name: "name", label: "আপনার নাম?", required: true },
        {
            name: "age",
            question: "আপনার বয়স কত?",
            class: "hidden",
            options: [
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
                38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
                48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
                58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
                68, 69, 70
            ]
        },
        { name: "location", label: "আপনার বর্তমান অবস্থান কোথায় ?", required: true },
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
        { name: "nid_or_birth_certificate", label: "NID/জন্মনিবন্ধন নং ?", required: true },
        { name: "birthDate", label: "জন্ম তারিখ (NID/জন্মনিবন্ধনে যেটা উল্লেখ আছে)", required: true },
        { name: "whatsapp", label: "হোয়াটসঅ্যাপ নম্বর/মোবাইল নম্বর দিন।", required: true },
        {
            name: "education_background",
            question: "আপনার শিক্ষাগত ব্যাকগ্রাউন্ড কী?",
            class: "hidden",
            options: [
                "কওমী মাদ্রাসা পড়ুুুয়া",
                "আলিয়া মাদ্রাসা পড়ুুয়া",
                "জেনারেল শিক্ষিত",
                'জেনারেল + মাদ্রাসা পড়ুয়া',
                "লেখাপড়া করা হয়নি"
            ]
        },
        {
            name: "study_level",
            question: "পড়াশুনা?",
            class: "hidden",
            options: [
                "মুফতি",
                "মুফাসসির",
                "শায়খুল হাদিস",
                "আলেম",
                "হাফেজ",
                "মাস্টার্স",
                "অনার্স",
                "এইচ এস সি",
                "এস এস সি",
                "অষ্টম পাস",
                "আত্নশিক্ষিত"]
        },


        { name: "study_details", label: "আপনার পড়াশোনা সম্পর্কে বিস্তারিত লেখুন ?", required: true },

        {
            name: "income_source",
            question: "আয় এর উৎস কী?",
            class: "hidden",
            options: [
                "ব্যবসা",
                "চাকরি",
                "কৃষি",
                "প্রবাস",
                "ফ্রিল্যান্স",
                "শিক্ষক",
                "কারিগরি",
                "আয় নেই",
            ]
        },
        { name: "current_profession_details", label: "বর্তমান পেশা সম্পর্কে বিস্তারিত লেখুন ?", required: true },
        {
            name: "height",
            question: "উচ্চতা?",
            class: "hidden",
            options: [
                "৪ ফুট ৮ ইঞ্চি",
                "৪ ফুট ৯ ইঞ্চি",
                "৪ ফুট ১০ ইঞ্চি",
                "৪ ফুট ১১ ইঞ্চি",
                "৫ ফুট",
                "৫ ফুট ১ ইঞ্চি",
                "৫ ফুট ২ ইঞ্চি",
                "৫ ফুট ৩ ইঞ্চি",
                "৫ ফুট ৪ ইঞ্চি",
                "৫ ফুট ৫ ইঞ্চি",
                "৫ ফুট ৬ ইঞ্চি",
                "৫ ফুট ৭ ইঞ্চি",
                "৫ ফুট ৮ ইঞ্চি",
                "৫ ফুট ৯ ইঞ্চি",
                "৫ ফুট ১০ ইঞ্চি",
                "৫ ফুট ১১ ইঞ্চি",
                "৬ ফুট",
                "৬ ফুট ১ ইঞ্চি",
                "৬ ফুট ২ ইঞ্চি",
                "৬ ফুট ৩ ইঞ্চি",
                "৬ ফুট ৪ ইঞ্চি",
                "৬ ফুট ৫ ইঞ্চি",
                "৬ ফুট ৬ ইঞ্চি"
            ]
        },
        {
            name: "body_structure",
            question: "শারীরিক কাঠামো?",
            class: "hidden",
            options: [
                "হালকা পাতলা গড়ন এর",
                "মাঝারী স্বাস্থ্যধারী",
                "ভারীদেহী"
            ]
        },
        { name: "physical_disability", label: "শারীরিক কোন অঙ্গহানি থাকলে বা বড় ধরনের কোন রোগ থাকলে আমানতের সাথে উল্লেখ করুন:" },
        {
            name: "skin_color",
            question: "গায়ের রঙ?",
            class: "hidden",
            options: [
                "উজ্জ্বল ফর্সা",
                "ফর্সা",
                "উজ্জ্বল শ্যামলা",
                "শ্যামলা",
                "কালো"
            ]
        },
        {
            name: "marital_status",
            question: "বৈবাহিক অবস্থা?",
            class: "hidden",
            options: [
                "অবিবাহিত",
                "ডিভোর্স্ড",
                "বিপত্নীক ",
                "বিবাহিত",
                "বিবাহিত ( দুইজন স্ত্রী রয়েছে)",
                "বিবাহিত ( তিনজন স্ত্রী রয়েছে)"
            ]
        },
        { name: "children_count", label: "সন্তান কয়টি? (বিবাহিত হলে),( অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন )", required: true },
        // { name: "previous_wife_rights", label: "আগের স্ত্রী বা স্ত্রীগণের শরয়ী হকগুলো আদায় করছেন কি না?" },
        { name: "divorce_reason", label: "ডিভোর্স কেনো হয়েছে বিস্তারিত লিখুন  ( অবিবাহিত/বিপত্নীক হলে “প্রযোজ্য নয়” লেখুন ) ।", required: true },
        // {
        //     name: "mohor_support",
        //     question: "নতুন যাকে বিয়ে করতে চাচ্ছেন তাঁর মোহর ও ভরনপোষণ কী মান এর দিতে পারবেন?",
        //     class: "hidden",
        //     options: [
        //         // "জি,  প্রস্তুত আছি।",
        //         // "না, প্রস্তুত নাই",
        //         // "শর্তসাপেক্ষ প্রস্তুত আছি।",
        //         "আলোচনা সাপেক্ষে"
        //     ]
        // },
        {
            name: "post_marriage_living",
            question: "যাকে বিয়ে করবেন তাকে বিয়ের পর কোথায় রাখবেন ?",
            class: "hidden",
            options: [
                "নিজের কাছে",
                "পূর্বের স্ত্রী/স্ত্রীদের সাথে",
                "তিনি যেখানে থাকতে চাই",
                "যৌথভাবে পিতামাতার সাথে",
                "আলোচনা সাপেক্ষে"
            ]
        },
        {
            name: "wives_intention",
            question: "আপনার কতজন স্ত্রী রাখার নিয়ত আছে?",
            class: "hidden",
            options: [
                "৪ জন",
                "৩জন",
                "২জন",
                "১ জন",
                "আল্লাহ যা তাওফীক দেন।"
            ]
        },
        { heading: 'পারিবারিক ও অর্থনৈতিক তথ্য', visibility: "hidden", },
        { name: "father_name_job", label: "পিতার নাম ও পেশা?", required: true },
        { name: "mother_name_job", label: "মাতার নাম ও পেশা?", required: true },
        { name: "siblings_info", label: "ভাইবোন কত জন? আপনার সিরিয়াল কত?", required: true },
        { name: "family_lineage", label: "নিজস্ব বংশের নাম ও মর্যাদা সম্পর্কে সংক্ষেপে লিখুন ?", required: true },
        {
            name: "family_economy",
            question: "পারিবারিক অর্থনৈতিক অবস্থান",
            class: "hidden",
            options: [
                "উচ্চবিত্ত",
                "উচ্চ-মধ্যবিত্ত",
                "মধ্যবিত্ত",
                "নিম্ন-মধ্যবিত্ত",
                "নিম্নবিত্ত"
            ]
        },

        {
            name: "own_economy",
            question: "আপনার নিজস্ব অর্থনৈতিক অবস্থান",
            class: "hidden",
            options: [
                "উচ্চবিত্ত",
                "উচ্চ-মধ্যবিত্ত",
                "মধ্যবিত্ত",
                "নিম্ন-মধ্যবিত্ত",
                "নিম্নবিত্ত"
            ]
        },
        { name: "monthly_income", label: "আপনার বর্তমানে আনুমানিক মাসিক আয় কত?", required: true },
        { name: "assets_details", label: "স্থাবর-অস্থাবর সম্পত্তি আছে কি না? থাকলে বিস্তারিত বিবরণ দিন?", required: true },


        { heading: 'শরয়ী অবস্থান এর তথ্যাবলিঃ', visibility: "hidden", },
        // {
        //     name: "will_not_violate_rights",
        //     question: "পূর্বের স্ত্রী, পরিবার ও সমাজ বা অন‌্য কারো চাপে পরবর্তী স্ত্রীদের শরয়ী হকগুলো আদায় করা বন্ধ করবেন না তো?",
        //     class: "hidden",
        //     options: [
        //         "যেকোনো পরিস্থিতি আসুক হক নষ্ট  করবো না, ইনশা-আল্লাহ"
        //     ]
        // },
        // {
        //     name: "justice_among_wives",
        //     question: "স্ত্রীদের মাঝে শরয়ী হক আদায় এর ক্ষেত্রে সম্পূর্ণ আদালত বজায় রাখবেন কি না?",
        //     class: "hidden",
        //     options: [
        //         "জি, ইনশাআল্লাহ"
        //     ]
        // },
        // {
        //     name: "accept_all_guidelines",
        //     question: "বৈবাহিক জীবনে স্ত্রীর/স্ত্রীদের শরয়ী অধিকারগুলো ও একাধিক  স্ত্রীদের মাঝে আদালত সংক্রান্ত যে শরয়ী নির্দেশনা রয়েছে, সবগুলি মানতে প্রস্তুত আছেন কি না?",
        //     class: "hidden",
        //     options: [
        //         "জি, রাজি আছি"
        //     ]
        // },
        {
            name: "follow_shariah",
            question: "আপনি ইসলামী শরীয়াতের সকল বিধান মন থেকে মানতে রাজি আছেন কি না? এবং সবগুলি পছন্দ করেন কি না?",
            class: "hidden",
            options: [
                "জ্বি মানতে রাজি আছি এবং পছন্দও করি ।",
                "জ্বি, মানার চেষ্টা করবো , ইনশাআল্লাহ ।"
            ]
        },
        {
            name: "accept_tms_rules",
            question: "আপনি Heaven Marriage Solutions (HMS) এর দাম্পত্য জীবন কেন্দ্রিক সকল আদর্শ তথা বিবাহ কেন্দ্রিক সকল শরয়ী বিধান মানতে রাজি আছেন কি না?",
            class: "hidden",
            options: [
                "জ্বি মানতে রাজি আছি",
                "জ্বি, মানার চেষ্টা করবো , ইনশাআল্লাহ ।"
            ]
        },
        // {
        //     name: "support_others_polygyny",
        //     question: "আপনার বাবা, দুলাভাই, ছেলে বা অন্য কেউ মাসনা, সুলাছা, রুবা'আ করতে চাইলে পূর্ণ সাপোর্ট ও সহযোগিতা করবেন কি না?",
        //     class: "hidden",
        //     options: [
        //         "জি করবো, ইনশাআল্লাহ"
        //     ]
        // },
        // {
        //     name: "accept_daughters_polygyny",
        //     question: "আপনার মেয়ে কারো মাসনা হলে বা আপনার জামাই মাসনা করলে মেনে নিতে পারবেন কি না?",
        //     class: "hidden",
        //     options: [
        //         "জি পারবো, ইনশাআল্লাহ"
        //     ]
        // },
        {
            name: "wife_earning",
            question: "বিয়ের পর স্ত্রীদেরকে টিউশনি, শিক্ষকতা বা অন্য কোনো কর্মের মাধ্যমে অর্থ উপার্জন  করবেন কি না ?",
            class: "hidden",
            options: [
                "ইনশাআল্লাহ  করাবো না।",
                "আলো্চনা সাপেক্ষ করাবো ।"
            ]
        },
        {
            name: "sunna_beard_and_purdah",
            question: "আপনি নিজে সুন্নাতী দাড়ী এবং স্ত্রীদেরকে খাস পর্দায় রাখতে অঙ্গিকারবদ্ধ হতে রাজি আছেন কি না?",
            class: "hidden",
            options: [
                "জি, অঙ্গিকার করছি।",
                "জি, চেষ্টা করবো"
            ]
        },
        {
            name: "accept_other_children",
            question: "যদি মেয়ে বিধবা বা ডিভোর্সী হয় তাহলে তার অন্য ঘরের সন্তান বা এতীম সন্তান থাকলে দায়িত্ব নিতে পারবেন কি না?",
            class: "hidden",
            options: [
                "জি,  প্রস্তুত আছি।",
                "না, প্রস্তুত নাই",
                "শর্তসাপেক্ষ প্রস্তুত আছি।"
            ]
        },
        { heading: 'আপনার প্রত্যাশিত পাত্রীর বিবরণ', visibility: "hidden", },

        {
            name: "districts",
            label: "কোন জেলার মেয়ে হলে ভালো হয়?",

        },
        {
            name: "expected_bride_age",
            label: "কেমন বয়সের চান?",
            // options: [
            //     "১৮",
            //     "১৯",
            //     "২০",
            //     "২১",
            //     "২২",
            //     "২৩",
            //     "২৪",
            //     "২৫",
            //     "২৬",
            //     "২৭",
            //     "২৮",
            //     "২৯",
            //     "৩০",
            //     "৩১",
            //     "৩২",
            //     "৩৩",
            //     "৩৪",
            //     "৩৫",
            //     "৩৬",
            //     "৩৭",
            //     "৩৮",
            //     "৩৯",
            //     "৪০"
            // ]
        },
        {
            name: "expected_bride_height",
            label: "উচ্চতা কেমন চান? (কত থেকে কত উচ্চতার)",
            // options: [
            //     "৪ ফুট ৮ ইঞ্চি",
            //     "৪ ফুট ৯ ইঞ্চি",
            //     "৪ ফুট ১০ ইঞ্চি",
            //     "৪ ফুট ১১ ইঞ্চি",
            //     "৫ ফুট",
            //     "৫ ফুট ১ ইঞ্চি",
            //     "৫ ফুট ২ ইঞ্চি",
            //     "৫ ফুট ৩ ইঞ্চি",
            //     "৫ ফুট ৪ ইঞ্চি",
            //     "৫ ফুট ৫ ইঞ্চি",
            //     "৫ ফুট ৬ ইঞ্চি",
            //     "৫ ফুট ৭ ইঞ্চি",
            //     "৫ ফুট ৮ ইঞ্চি",
            //     "৫ ফুট ৯ ইঞ্চি",
            //     "৫ ফুট ১০ ইঞ্চি",
            //     "৫ ফুট ১১ ইঞ্চি",
            //     "৬ ফুট",
            //     "৬ ফুট ১ ইঞ্চি",
            //     "৬ ফুট ২ ইঞ্চি",
            //     "৬ ফুট ৩ ইঞ্চি",
            //     "৬ ফুট ৪ ইঞ্চি",
            //     "৬ ফুট ৫ ইঞ্চি",
            //     "৬ ফুট ৬ ইঞ্চি"
            // ]
        },
        {
            name: "expected_bride_color",
            question: "গায়ের রঙ  কেমন চান ?",
            class: "hidden",
            options: [
                "উজ্জ্বল ফর্সা",
                "ফর্সা",
                "উজ্জ্বল শ্যামলা",
                "শ্যামলা",
                "কালো",
                "যদি পছন্দ হয়, যেকোনো রঙ।"
            ]
        },
        {
            name: "expected_bride_education",
            question: "শিক্ষাগত ব্যাকগ্রাউন্ড কেমন চান ?",
            class: "hidden",
            options: [
                "আলেমা + হাফেজা",
                "আলেমা",
                "হাফেজা",
                "মাদ্রাসা পড়ুয়া",
                "দ্বীনদার জেনারেল শিক্ষিতা",
                "জেনারেল শিক্ষিতা",
                "হোম স্কুলিং",
                "যেকোনো",
                "শিক্ষাগত ব্যাকগ্রাউন্ডের ব্যাপারে কোনো সমস্যা নেই ।",
            ]
        },
        {
            name: "expected_bride_family_type",
            question: "কেমন ফ্যামিলির পাত্রী চান?",
            class: "hidden",
            options: [
                "আলেম দ্বীনদার",
                "জেনারেল দ্বীনদার",
                "জেনারেল",
                "যেকোনো",
            ]
        },
        {
            name: "expected_bride_class",
            question: "আপনি কোন শ্রেণির পারিবারিক ব্যাকগ্রাউন্ডের পাত্রী চান ?",
            class: "hidden",
            options: [
                "উচ্চবিত্ত",
                "উচ্চ-মধ্যবিত্ত",
                "মধ্যবিত্ত",
                "নিম্ন-মধ্যবিত্ত",
                "গরিব/বিত্তহীন",
                "যেকোনো",
            ]
        },
        {
            name: "bride_type",
            question: "কেমন পাত্রী চান?",
            class: "hidden",
            options: [
                "বাকেরা (অবিবাহিতা)",
                "ছাইয়েবা (ডিভর্সী,বিধবা) সন্তানসহ",
                "ছাইয়েবা (ডিভর্সী,বিধবা) সন্তান ছাড়া",
                "বন্ধ্যা (অবিবাহিতা,ডিভর্সী,বিধবা)",
                "যেকোনো"
            ]
        },
        { name: "specific_dream", label: "প্রত্যেকটি মানুষই তার জীবনসঙ্গীর ব্যাপারে কিছু স্বপ্ন দেখে... দয়া করে আপনারটা উল্লেখ করুন?" },

        {
            name: "agree_on_false_info_consequence",
            question: "আশা করি আপনি কোনো ভুল তথ্য দেন নি, তারপরও আপনি যদি ইচ্ছাকৃতভাবে কোনো ভ্রান্ত বা মিথ্যা তথ্য প্রদান করেন, কিংবা ভবিষ্যতে আপনার দেওয়া প্রতিশ্রুতি পালন না করেন, সে ক্ষেত্রে হ্যাভেন ম্যারিজ সলিউশন (HMS)  আপনার সদস্যপদ বাতিলের অধিকার সংরক্ষণ করে। পাশাপাশি, যদি এমন পরিস্থিতিতে আপনার স্ত্রী সংসার চালিয়ে যেতে অনিচ্ছুক হন এবং HMS-এর সংশ্লিষ্ট কর্মকর্তাদের সঙ্গে পরামর্শক্রমে বিষয়টি যৌক্তিক বিবেচিত হয়, তাহলে আপনি  স্ত্রীর অনুরোধ ও ন্যায্য প্রয়োজনে তালাক প্রদানের বিষয়ে সম্মত থাকবেন কি না?",
            class: "hidden",
            options: [
                "জি, ইনশাআল্লাহ"
            ]
        },
        {
            name: "agree_on_statement",
            question: "আপনার যে শরয়ী নীতি ও স্ত্রীর হক্ব আদায়ের মনোভাব আমরা এখানে দেখতে পাচ্ছি, ইন শা আল্লাহ তা শুধু কথায় নয়, বাস্তব জীবনেও আপনি অটুট রাখবেন—এবং একে দায়িত্ব, ইবাদত ও আমানত মনে করে পালন করবেন—আপনি কি সেই ওয়াদা আজ এখানেই করছেন?",
            class: "hidden",
            options: [
                "জি, ইনশাআল্লাহ"
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
        { name: "email", label: "আপনার ইমেইল অ্যাড্রেস দিন ?", required: true },
        { name: "alternate_number", label: "আপনার অন্য আরেকটি নাম্বার দিন (আবশ্যিক)" },
    ];

    const questionName = [
        "name",
        "age",
        "location",
        "parmanent_address",
        "nid_or_birth_certificate",
        "birthDate",
        "whatsapp",
        "education_background",
        "study_level",
        "study_details",
        "income_source",
        "current_profession_details",
        "height",
        "body_structure",
        "physical_disability",
        "skin_color",
        "marital_status",
        "children_count",
        "divorce_reason",
        "post_marriage_living",
        "wives_intention",
        "father_name_job",
        "mother_name_job",
        "siblings_info",
        "family_lineage",
        "family_economy",
        "own_economy",
        "monthly_income",
        "assets_details",
        "follow_shariah",
        "accept_tms_rules",
        "wife_earning",
        "sunna_beard_and_purdah",
        "accept_other_children",
        "districts",
        "expected_bride_age",
        "expected_bride_height",
        "expected_bride_color",
        "expected_bride_education",
        "expected_bride_family_type",
        "expected_bride_class",
        "bride_type",
        "specific_dream",
        "agree_on_false_info_consequence",
        "agree_on_statement",
        "registration_preference",
        "current_full_address",
        "email",
        "alternate_number",
    ];


    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (formData) => {
            const { data } = await axiosSecure.post(`/form/${user?.email}`, formData);
            return data;
        },
        onSuccess: () => {
            toast.success('Form submitted Succesfully !');
            navigate('/sent_transaction');
            setLogLoad(false);
        }
    });




    if (loading || isPending) return <Loading />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const image = form.image.files[0];

        let imageUrl = '';

        if (image) {
            imageUrl = await imageUpload(image);
        }

        // start
        const name = form.name.value;
        const age = form.age.value;
        const location = form.location.value;
        const parmanent_address = form.parmanent_address.value;
        const nid_or_birth_certificate = form.nid_or_birth_certificate.value;
        const birthDate = form.birthDate.value;
        const whatsapp = form.whatsapp.value;
        const education_background = form.education_background.value;
        const study_level = form.study_level.value;
        const study_details = form.study_details.value;
        const income_source = form.income_source.value;
        const current_profession_details = form.current_profession_details.value;
        const height = form.height.value;
        const body_structure = form.body_structure.value;
        const physical_disability = form.physical_disability.value;
        const skin_color = form.skin_color.value;
        const marital_status = form.marital_status.value;
        const children_count = form.children_count.value;
        const divorce_reason = form.divorce_reason.value;
        const post_marriage_living = form.post_marriage_living.value;
        const wives_intention = form.wives_intention.value;
        const father_name_job = form.father_name_job.value;
        const mother_name_job = form.mother_name_job.value;
        const siblings_info = form.siblings_info.value;
        const family_lineage = form.family_lineage.value;
        const family_economy = form.family_economy.value;
        const own_economy = form.own_economy.value;
        const monthly_income = form.monthly_income.value;
        const assets_details = form.assets_details.value;
        const follow_shariah = form.follow_shariah.value;
        const accept_tms_rules = form.accept_tms_rules.value;
        const wife_earning = form.wife_earning.value;
        const sunna_beard_and_purdah = form.sunna_beard_and_purdah.value;
        const accept_other_children = form.accept_other_children.value;
        const districts = form.districts.value;
        const expected_bride_age = form.expected_bride_age.value;
        const expected_bride_height = form.expected_bride_height.value;
        const expected_bride_color = form.expected_bride_color.value;
        const expected_bride_education = form.expected_bride_education.value;
        const expected_bride_family_type = form.expected_bride_family_type.value;
        const expected_bride_class = form.expected_bride_class.value;
        const bride_type = form.bride_type.value;
        const specific_dream = form.specific_dream.value;
        const agree_on_false_info_consequence = form.agree_on_false_info_consequence.value;
        const agree_on_statement = form.agree_on_statement.value;
        const registration_preference = form.registration_preference.value;
        const current_full_address = form.current_full_address.value;
        const email = form.email.value;
        const alternate_number = form.alternate_number.value;

        const form_uuId = crypto.randomUUID();
        // end

        const formData = {
            name,
            age,
            location,
            nid_or_birth_certificate,
            birthDate,
            parmanent_address,
            whatsapp,
            education_background,
            study_level,
            study_details,
            income_source,
            current_profession_details,
            height,
            body_structure,
            physical_disability,
            skin_color,
            marital_status,
            children_count,
            // previous_wife_rights,
            divorce_reason,
            post_marriage_living,
            wives_intention,
            father_name_job,
            mother_name_job,
            siblings_info,
            family_lineage,
            family_economy,
            own_economy,
            monthly_income,
            assets_details,
            // justice_among_wives,
            // accept_all_guidelines,
            follow_shariah,
            accept_tms_rules,
            // support_others_polygyny,
            // accept_daughters_polygyny,
            wife_earning,
            sunna_beard_and_purdah,
            accept_other_children,
            districts,
            expected_bride_age,
            expected_bride_height,
            expected_bride_color,
            expected_bride_education,
            expected_bride_family_type,
            expected_bride_class,
            bride_type,
            specific_dream,
            agree_on_false_info_consequence,
            agree_on_statement,
            registration_preference,
            current_full_address,
            email,
            alternate_number,
            image: imageUrl || null,
            member_email: user?.email,
            gender: 'male',
            role: 'guest',
            status: 'in process',
            form_uuId,
        };

        // console.table(formData);

        setLogLoad(true);
        await mutateAsync(formData);
        form.reset();

    };

    return (
        <div className="px-2 py-2">
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />
            <div className="border-[5px] rounded-xl border-[#373B4D] max-w-[1000px] mx-auto  mt-16 mb-5">
                <img src={menFormImage} className="px-0 mb-5" alt="" />
                <HeadingSubHead heading="পুরুষদের আবেদন ফরম" />

                <form onSubmit={handleSubmit} className=" gap-10 pt-5 px-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col space-y-5">
                            <label className="font-semibold">
                                আপনার ছবিটি দিন (ঐচ্ছিক)
                            </label>
                            <input type="file" name="image" id="" className="w-full border file:rounded-full border-black rounded-2xl px-5 py-2" />
                        </div>

                        {
                            questions.map(({ heading, subHeading, visibility, name, question, class: clas, label, options, }, idx) => (
                                <div key={idx}>
                                    {heading && <p className="text-3xl font-bold">{heading}</p>}
                                    {subHeading && <p className="">{subHeading}</p>}

                                    {!clas && < div className="flex flex-col">
                                        <label className={`font-semibold mb-3 ${clas} text-justify`}>
                                            {label}
                                        </label>
                                        {!visibility && < input className={`bg-white ${clas} w-full border-2 border-gray-300  rounded py-2 `} type="text" name={name} required />}
                                    </div>}

                                    {clas && (
                                        <div className="mb-4">
                                            <label className="block font-semibold mb-2 text-justify">{question}</label>
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

                        <div className="my-4 space-y-2 text-red-600">
                            <p className="text-justify">ফর্ম জমা দেওয়ার আগে নির্দেশনাগুলো পড়ুন ও সকল তথ্য যাচাই করুন। ফাঁকা ঘর থাকলে সাবমিশন হবে না।</p>
                            <p className="text-justify">মুহতারাম, <br />
                                সঠিকভাবে জমা হলে স্ক্রিনে পরবর্তী নির্দেশনা প্রদর্শিত হবে।তা ধারাবাহিক ভাবে অনুসরণ করুন।
                                হোয়াটসঅ্যাপে আলাদা কোনো মেসেজ পাঠানো হবে না, স্ক্রিনশট সংরক্ষণ করুন।</p>
                            <p className="text-justify"> ভেরিফিকেশন ফি পাঠিয়ে রেজিস্ট্রেশন নিশ্চিত করুন।</p>
                        </div>


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
            </div >

        </div >
    );
};

export default MenForm;