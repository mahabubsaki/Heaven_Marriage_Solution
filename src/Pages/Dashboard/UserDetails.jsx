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

const UserDetails = () => {


    // for men
    const men_questions = [
        { name: "name", question: "নাম?", required: true },
        { name: "age", question: "বয়স ?", required: true },
        { name: "location", question: "আপনার বর্তমান অবস্থান কোথায় ?", required: true },
        { name: "nid_or_birth_certificate", question: "NID/জন্মনিবন্ধন নং ?", required: true },
        { name: "birthDate", question: "জন্ম তারিখ (NID/জন্মনিবন্ধনে যেটা উল্লেখ আছে)", required: true },
        {
            name: "education_background",
            question: "আপনার শিক্ষাগত ব্যাকগ্রাউন্ড কী?",
            class: "hidden",
            options: [
                "কওমী মাদ্রাসা পড়ুুুয়া",
                "আলিয়া মাদ্রাসা পড়ুুয়া",
                "জেনারেল শিক্ষিত",
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


        { name: "study_details", question: "আপনার পড়াশোনা সম্পর্কে বিস্তারিত লেখুন ?", required: true },

        {
            name: "income_source",
            question: "আয় এর উৎস কী?",
            class: "hidden",
            options: [
                "ব্যবসাহ",
                "চাকুরী",
                "কৃষি"
            ]
        },

        { name: "current_profession_details", question: "বর্তমান পেশা সম্পর্কে বিস্তারিত লেখুন ?", required: true },
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
        { name: "physical_disability", question: "শারীরিক কোন অঙ্গহানি থাকলে বা বড় ধরনের কোন রোগ থাকলে আমানতের সাথে উল্লেখ করুন:" },
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
        { name: "children_count", question: "সন্তান কয়টি? (বিবাহিত হলে),( অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন )", required: true },
        // { name: "previous_wife_rights", label: "আগের স্ত্রী বা স্ত্রীগণের শরয়ী হকগুলো আদায় করছেন কি না?" },
        { name: "divorce_reason", question: "ডিভোর্স্ড (স্ত্রী/স্ত্রীদের সাথে ছাড়াছাড়ি হয়েছে) ,কেনো হয়েছে বিস্তারিত লিখুন  ?", required: true },
        {
            name: "mohor_support",
            question: "নতুন যাকে বিয়ে করতে চাচ্ছেন তাঁর মোহর ও ভরনপোষণ কী মান এর দিতে পারবেন?",
            class: "hidden",
            options: [
                // "জি,  প্রস্তুত আছি।",
                // "না, প্রস্তুত নাই",
                // "শর্তসাপেক্ষ প্রস্তুত আছি।",
                "আলোচনা সাপেক্ষে"
            ]
        },
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
        // { heading: 'পারিবারিক ও অর্থনৈতিক তথ্য', visibility: "hidden", },
        { name: "father_name_job", question: "পিতার নাম ও পেশা?", required: true },
        { name: "mother_name_job", question: "মাতার নাম ও পেশা?", required: true },
        { name: "siblings_info", question: "ভাইবোন কত জন? আপনার সিরিয়াল কত?", required: true },
        { name: "family_lineage", question: "নিজস্ব বংশের নাম ও মর্যাদা সম্পর্কে সংক্ষেপে লিখুন ?", required: true },
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
        { name: "monthly_income", question: "আপনার বর্তমানে আনুমানিক মাসিক আয় কত?", required: true },
        { name: "assets_details", question: "স্থাবর-অস্থাবর সম্পত্তি আছে কি না? থাকলে বিস্তারিত বিবরণ দিন?", required: true },


        // { heading: 'শরয়ী অবস্থান এর তথ্যাবলিঃ', visibility: "hidden", },
        {
            name: "will_not_violate_rights",
            question: "পূর্বের স্ত্রী, পরিবার ও সমাজ বা অন‌্য কারো চাপে পরবর্তী স্ত্রীদের শরয়ী হকগুলো আদায় করা বন্ধ করবেন না তো?",
            class: "hidden",
            options: [
                "যেকোনো পরিস্থিতি আসুক হক নষ্ট  করবো না, ইনশা-আল্লাহ"
            ]
        },
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
                "জি, মানতে রাজি আছি এবং পছন্দ করি।"
            ]
        },
        {
            name: "accept_tms_rules",
            question: "আপনি Heaven Marriage Solutions (HMS) এর দাম্পত্য জীবন কেন্দ্রিক সকল আদর্শ তথা বিবাহ কেন্দ্রিক সকল শরয়ী বিধান মানতে রাজি আছেন কি না?",
            class: "hidden",
            options: [
                "জি, রাজি আছি।"
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
                "জি, অঙ্গিকার করছি।"
            ]
        },
        {
            name: "accept_other_children",
            question: "তার অন্য ঘরের সন্তান বা এতীম সন্তান থাকলে দায়িত্ব নিতে পারবেন কি না?",
            class: "hidden",
            options: [
                "জি,  প্রস্তুত আছি।",
                "না, প্রস্তুত নাই",
                "শর্তসাপেক্ষ প্রস্তুত আছি।"
            ]
        },
        // { heading: 'আপনার প্রত্যাশিত পাত্রীর বিবরণ', visibility: "hidden", },

        {
            name: "districts",
            question: "কোন জেলার মেয়ে হলে ভালো হয়?",
            // class: "hidden",
            // options: [
            //     "ঢাকা",
            //     "গাজীপুর",
            //     "নারায়ণগঞ্জ",
            //     "টাঙ্গাইল",
            //     "কিশোরগঞ্জ",
            //     "মানিকগঞ্জ",
            //     "মুন্সিগঞ্জ",
            //     "রাজবাড়ী",
            //     "মাদারীপুর",
            //     "শরীয়তপুর",
            //     "গোপালগঞ্জ",
            //     "ফরিদপুর",
            //     "নরসিংদী",
            //     "চট্টগ্রাম",
            //     "কক্সবাজার",
            //     "বান্দরবান",
            //     "রাঙ্গামাটি",
            //     "খাগড়াছড়ি",
            //     "নোয়াখালী",
            //     "লক্ষ্মীপুর",
            //     "ফেনী",
            //     "চাঁদপুর",
            //     "ব্রাহ্মণবাড়িয়া",
            //     "কুমিল্লা",
            //     "ময়মনসিংহ",
            //     "জামালপুর",
            //     "নেত্রকোনা",
            //     "শেরপুর",
            //     "রাজশাহী",
            //     "নাটোর",
            //     "নওগাঁ",
            //     "চাঁপাইনবাবগঞ্জ",
            //     "জয়পুরহাট",
            //     "বগুড়া",
            //     "পাবনা",
            //     "সিরাজগঞ্জ",
            //     "খুলনা",
            //     "যশোর",
            //     "চুয়াডাঙ্গা",
            //     "মেহেরপুর",
            //     "নড়াইল",
            //     "বাগেরহাট",
            //     "ঝিনাইদহ",
            //     "কুষ্টিয়া",
            //     "সাতক্ষীরা",
            //     "বরিশাল",
            //     "ভোলা",
            //     "পটুয়াখালী",
            //     "ঝালকাঠি",
            //     "পিরোজপুর",
            //     "বরগুনা",
            //     "সিলেট",
            //     "মৌলভীবাজার",
            //     "হবিগঞ্জ",
            //     "সুনামগঞ্জ",
            //     "রংপুর",
            //     "দিনাজপুর",
            //     "ঠাকুরগাঁও",
            //     "পঞ্চগড়",
            //     "নীলফামারী",
            //     "কুড়িগ্রাম",
            //     "গাইবান্ধা",
            //     "লালমনিরহাট"
            // ]
        },
        {
            name: "expected_bride_age",
            question: "কেমন বয়সের চান?",
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
            question: "উচ্চতা কেমন চান? (কত থেকে কত উচ্চতার)",
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
                "আলেমা",
                "হাফেজা",
                "মাদ্রাসায় পড়ুৃয়া",
                "জেনারেল শিক্ষিতা",
                "হোম স্কুলিং",
                "যেকোনো",
                "শিক্ষাগত ব্যাকগ্রাউন্ডের ব্যাপারে কোনো সমস্যা নেই।"
            ]
        },
        {
            name: "expected_bride_family_type",
            question: "কেমন ফ্যামিলির পাত্রী চান?",
            class: "hidden",
            options: [
                "আলেম দ্বীনদার",
                "জেনারের দ্বীনদার",
                "জেনারের",
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

        { name: "current_full_address", question: "বর্তমান পূর্ণ ঠিকানা (প্রযোজ্য ক্ষেত্রে বাসা নাম্বার, ফ্ল্যাট নাম্বার ইত্যাদিসহ)?", required: true },
    ];


    // female qustions
    const female_questions = [
        { name: "name", question: "নাম?", required: true },
        { name: "age", question: "বয়স?", type: 'number', required: true },
        { name: "current_location", question: "আপনার বর্তমান অবস্থান কোথায় ? (জেলা এবং দেশের নাম উল্লেখ করুন)।", required: true },
        { name: "nid_or_birth_certificate", question: "NID/জন্মনিবন্ধন নং?", type: 'number', required: true },
        { name: "birth_date", question: "জন্ম তারিখ (NID/জন্মনিবন্ধনে যেটা উল্লেখ আছে)?", type: 'date', required: true },
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
                "এইচ এস সি",
                "এস এস সি",
                "অষ্টম পাস",
                "আত্নশিক্ষিত"
            ]
        },

        { name: "education_details", question: "আপনার পড়াশোনা সম্পর্কে বিস্তারিত লেখুন?", required: true },
        { name: "skills_or_experience", question: "আপনার বিশেষ কোনো অভিজ্ঞতা বা দক্ষতা থাকলে তা উর্লেখ করুন?" },
        { name: "current_occupation", question: "বর্তমানে কি করেন বিস্তারিত লেখুন?" },
        { name: "height", question: "আপনার উচ্চতা লিখুন?", required: true },

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



        { name: "physical_condition", question: "শারীরিক কোন অঙ্গহানি থাকলে বা বড় ধরনের কোন রোগ থাকলে আমানতের সাথে উল্লেখ করুন?" },
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
                "বিধবা ( (সন্তানসহ )",
                "বিধবা ( (সন্তানছাড়া )",
                "খুনছা (মেয়ে হিজড়া)"
            ]
        },
        { name: "children_count", question: "সন্তান কয়টি? (বিবাহিতা হলে), অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন?" },
        {
            name: "delivery_type",
            question: "বাচ্চা নরমালে হয়েছে না সিজারে? (যদি বাচ্চা থাকে)?",
            class: "hidden",
            options: ["নরমাল ডেলিভারি", "সিজার", "বাচ্চা হয়নি", "প্রযোজ্য নয়"]
        },
        {
            name: "child_count_plan",
            question: "আপনার কয়টি বাচ্চা নেওয়ার ইচ্ছা আছে?",
            class: "hidden",
            options: ["যতগুলো হয়, বন্ধ করবো না, ইনশাআল্লাহ", "বাচ্চা হবে না বন্ধ্যা"]
        },
        { name: "previous_husband_rights", question: "আগের স্বামীর শরয়ী হকগুলো আদায় করছেন কি না? (অবিবাহিত হলে “প্রোজোয্য নয়” লিখুন)?" },
        { name: "divorce_reason", question: "ডিভোর্স্ড (পূর্বের স্বামীর সাথে ছাড়াছাড়ি হয়েছে), কেনো হয়েছে সংক্ষেপে লিখুন?" },

        // { heading: 'পারিবারিক ও অর্থনৈতিক তথ্য', visibility: "hidden", },
        { name: "father_name_occupation", question: "পিতার নাম ও পেশা?", required: true },
        { name: "mother_name_occupation", question: "মাতার নাম ও পেশা?", required: true },
        { name: "siblings_and_position", question: "ভাইবোন কত জন? আপনার সিরিয়াল কত?", required: true },
        { name: "family_lineage", question: "নিজস্ব বংশের নাম ও মর্যাদা সম্পর্কে সংক্ষেপে লিখুন?", required: true },
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
        { name: "current_expense_by", question: "আপনার বর্তমান খরচ কে বহন করছেন?", required: true },
        { name: "own_property", question: "আপনার নিজস্ব কোনো স্থাবর-অস্থাবর, নগদ সম্পত্তি আছে কি না? থাকলে বিস্তারিত বিবরণ দিন?" },


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
        { name: "height_choice", question: "উচ্চতা কেমন চান? (কত থেকে কত) *" },
        { name: "district_choice", question: "নির্দিষ্ট কোন জেলা/বিভাগের পাত্র চান? না যে কোনো? *" },
        { name: "own_opinion", question: "আপনার আরো কোন চাহিদা থাকলে স্বাধীনভাবে উল্লেখ করতে পারেন।" },
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



        // { heading: 'শরয়ী অবস্থান এর তথ্যাবলিঃ', visibility: "hidden", },


        {
            name: "haque_opinion",
            question: " পরিবার ও সমাজ বা অন‌্য কারো চাপে পরবর্তীতে স্বামীর   শরয়ী হকগুলো আদায় করা বন্ধ করবেন না তো?*",
            class: "hidden",
            options: ["যেকোনো পরিস্থিতি আসুক হক নষ্ট  করবো না, ইনশা-আল্লাহ"]
        },
        {
            name: "polygamy_opinion",
            question: "আপনার স্বামী যদি একাদিক বিবাহে আগ্রহি হোন অথবা উনার যদি একাদিক বিবাহের প্রযোজন হয় ,আপনি বিষয়টাকে কেমন ভাবে দেখবেন ?   এবং পূর্ণ সাপোর্ট করবেন কি না? ",
            class: "hidden",
            options: ["জ্বি, নির্দ্ধিদায় মেনে নিবো ।", "আলোচনা সাপেক্ষ মেনে নিবো ।"]
        },

        {
            name: "agree_polygamous_wife",
            question: "আপনি  কারোর ২য়/৩য়/৪র্থ স্ত্রী (মাসনা, সুলাছা, রুবা'আ)  হতে রাজি  আছেন কি না? ",
            class: "hidden",
            options: [
                "জি, ইনশা-আল্লাহ রাজি আছি।",
                "আলোচনা সাপেক্ষ মানতে রাজি আছি ।"
            ]
        },
        {
            name: "agree_islamic_law",
            question: "আপনি ইসলামী শরীয়াতের সকল বিধান মন থেকে মানতে রাজি আছেন কি না? এবং সবগুলি পছন্দ করেন কি না?*",
            class: "hidden",
            options: [
                "জি, ইনশা-আল্লাহ রাজি আছি।",
            ]
        },

        {
            name: "accept_tms_policy",
            question: "আপনি  Heaven Marriage Solutions (HMS) এর দাম্পত্য জীবন কেন্দ্রিক সকল আদর্শ তথা বিবাহ কেন্দ্রিক সকল শরয়ী বিধান মানতে রাজি আছেন কি না?",
            class: "hidden",
            options: ["জি, রাজি আছি।"]
        },
        {
            name: "fulfill_husband_rights",
            question: "আপনি আপনার স্বামীর সকল শরয়ী হক্ব আদায় করতে রাজি আছেন কিনা? হক্বগুলো না জানা থাকলে  HMS  থেকে  জেনে নিয়ে তা মানতে রাজি আছেন কিনা?",
            class: "hidden",
            options: ["জি রাজি আছি, ইনশাআল্লাহ"]
        },
        {
            name: "accept_polygamy_for_daughter",
            question: "আপনার মেয়ে কারো মাসনা হলে বা আপনার জামাই মাসনা করলে মেনে নিতে পারবেন কি না?",
            class: "hidden",
            options: ["জি পারবো, ইনশাআল্লাহ"]
        },
        {
            name: "obey_husband_fully",
            question: "আপনার স্বামীর সকল শরয়ী আদেশ-নিষেধ মানতে প্রস্তুত আছেন কি না?",
            class: "hidden",
            options: ["জি, ইনশাআল্লাহ প্রস্তুত আছি ।"]
        },
        {
            name: "avoid_misbehavior",
            question: "স্বামীর উপর কর্তৃত্ব খাটানো, সম্পদের উপর নজরদারী করা বা খারাপ ব্যবহার করা থকে বিরত থাকবেন কি না?",
            class: "hidden",
            options: ["বিরত থাকবো ইনশাআল্লাহ ।"]
        },
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
            options: ["জি, রাজি আছি।"]
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

        { name: "current_full_address", question: "বর্তমান পূর্ণ ঠিকানা (প্রযোজ্য ক্ষেত্রে বাসা নাম্বার, ফ্ল্যাট নাম্বার ইত্যাদিসহ)?", required: true },
        { name: "additional_info", question: "নিজের ব্যাপারে কিছু শেয়ার করতে চাইলে করতে পারেন।" }
    ];

    const { user, loading } = useAuth();
    const { user_email } = useParams();
    const axiosSecure = useAxiosSecure();
    const { role, isLoading: roleLoading } = useRole();
    const { gender, isLoading: userLoading } = useUser();
    const [edit, setEdit] = useState(false);

    // get the user data
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['userFormDetails', user_email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user_details/${user_email}`);
            return data;
        }
    });

    // user data from usersCollection
    const { status, isLoading: userDataLoading, name, image, age, profession } = useUser();


    // taking the data form edit 
    const [editedData, setEditedData] = useState({});
    const { mutateAsync } = useMutation({
        mutationFn: async (email) => {
            const { data } = await axiosSecure.put(`/admin_edit/${email}`, editedData);
            return data;
        },
        onSuccess: () => {
            toast.success('Edited Successfully');
            setEdit(false);
            setEditedData({});
            refetch();
        }
    });

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


    // handle edit button click
    const handleEdit = async (email) => {
        setEdit(true);
        await mutateAsync(email);
    };


    if (loading || roleLoading || isLoading || userLoading || userDataLoading) return <Loading />;

    return (
        <div className="max-w-5xl mx-auto pb-2 w-full md:my-32 shadow-xl rounded-2xl">
            <div>
                <h1 className="text-2xl font-bold text-[#C3937C] p-2">Heaven Marriage</h1>
            </div>
            <Navbar />

            <img src={minar_top} alt="" className="px-2 pt-14" />

            <div className="px-5 border-x-4 border-b-4 rounded border-[#93733F] -mt-[81px] mx-2 pt-[50px]">
                <div className="flex w-full pb-5 flex-col justify-between items-center mt-10">
                    <h1 className="text-3xl md:text-4xl border-b py-5 text-[#C3937C] font-anek">ব্যক্তিগত তথ্য</h1>
                    <img src={underline_img2} alt="" />
                </div>

                <div className="flex flex-col md:flex-row justify-between border-b space-y-4">
                    <div className="flex justify-between">
                        {
                            data?.image &&
                            <img src={data?.image} className=" size-[180px] md:size-[250px] object-cover" alt="" />
                        }

                        {
                            !data?.image && data?.gender === 'male' &&
                            <img src={male_default} className=" size-[180px] md:size-[250px] object-cover" alt="" />
                        }

                        {
                            !data?.image && data?.gender === 'female' &&
                            <img src={female_default} className=" size-[180px] md:size-[250px] object-cover" alt="" />
                        }
                        {role === 'admin' ?
                            <button onClick={() => handleEdit(data?.member_email)} className="h-[50px] px-5 border-b">Edit</button>
                            :
                            <Link to={`/images/${data?.member_email}`} className="font-mina underline">আরো ছবি</Link>
                        }
                    </div>
                    <p className="text-[clamp(20px,4vw,30px)]  md:text-center font-mina">{data?.name}</p>
                </div>


                <div>

                    {/* for men form data */}
                    <div className="md:grid space-y-3 md:grid-cols-4 grid-rows-5 w-full gap-5 py-5">
                        {
                            data?.gender === 'male' &&
                            men_questions.map((got, idx) => (
                                <div key={idx} className="col-span-2 row-span-1 space-y-1">
                                    <p className="col-span-2 row-span-5 text-2xl font-bold font-anek">{got?.p}</p>
                                    <p className="font-bold text-[15px] text-justify">{got?.question} </p>
                                    {
                                        edit ?
                                            <input
                                                type="text"
                                                value={editedData?.[got?.name]}
                                                disabled
                                                onChange={(e) =>
                                                    setEditedData({ ...editedData, [got.name]: e.target.value })
                                                }
                                                className={`bg-white placeholder:pl-3 placeholder:text-black w-full border-2 border-gray-300  font-alkatra rounded py-2 ${got?.hidden} `}
                                                placeholder={data?.[got?.name]}
                                            />
                                            :
                                            <p className="bg-white text-xs p-2 text-justify border">{data?.[got?.name]}</p>
                                    }
                                </div>
                            ))
                        }

                        {/* for female form data */}

                        {
                            data?.gender === 'female' &&
                            female_questions.map((got, idx) => (
                                <div key={idx} className="col-span-2 row-span-1 space-y-1">
                                    <p className="col-span-2 row-span-5 text-2xl font-kaushan text-[#C3937C]">{got?.p}</p>
                                    <p className="font-bold text-[15px] text-justify">{got?.question} </p>
                                    {
                                        edit ?
                                            <input
                                                type="text"
                                                value={editedData?.[got?.name]}
                                                disabled
                                                onChange={(e) =>
                                                    setEditedData({ ...editedData, [got.name]: e.target.value })
                                                }
                                                className={`bg-white placeholder:pl-3 placeholder:text-black w-full border-2 border-gray-300  font-alkatra rounded py-2 ${got?.hidden} `}
                                                placeholder={data?.[got?.name]}
                                            />
                                            :
                                            <p className="bg-white text-xs p-2 text-justify border">{data?.[got?.name]}</p>
                                    }
                                </div>
                            ))
                        }

                    </div>

                    <button onClick={() => sentProposal(data)}
                        className="text-xs font-semibold  border-b px-4 py-2 my-4 flex items-center gap-2 w-[300px]
             bg-gradient-to-r from-[#faf0d3] to-[#e9deaf] 
             text-gray-800 rounded shadow-md 
             hover:from-[#E6E0CC] hover:to-[#d1c38b] 
             transition duration-300 flex-col">
                        প্রস্তাব পাঠান
                    </button>

                </div>
            </div>



        </div>
    );
};

export default UserDetails;