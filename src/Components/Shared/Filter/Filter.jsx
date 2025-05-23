import React from 'react';

const Filter = () => {

    const selectQuestions = [
        {
            name: "expected_bride_color",
            question: "গায়ের রঙ  কেমন চান ?",
            options: [
                "উজ্জ্বল ফর্সা",
                "ফর্সা",
                "উজ্জ্বল শ্যামলা",
                "শ্যামলা",
                "কালো",
            ]
        },
        {
            name: "marital_status",
            question: "বৈবাহিক অবস্থা?",
            options: [
                "অবিবাহিত",
                "ডিভোর্স্ড",
                "বিপত্নীক ",
                "বিবাহিত"
            ]
        },
        {
            name: "body_structure",
            question: "শারীরিক কাঠামো?",
            options: [
                "হালকা পাতলা গড়ন এর",
                "মাঝারী স্বাস্থ্যধারী",
                "ভারীদেহী"
            ]
        },
        {
            name: "education_background",
            question: "আপনার শিক্ষাগত ব্যাকগ্রাউন্ড কী?",
            options: [
                "জেনারেল শিক্ষিত",
                "লেখাপড়া করা হয়নি",
                "কওমী মাদ্রাসা পড়ুুুয়া",
                "আলিয়া মাদ্রাসা পড়ুুয়া",
                "জেনারেল শিক্ষিতা",
                "হুম স্কিুলিং"
            ]
        }
    ];


    return (
        <div className="fixed bg-[#E6E2D6] w-full">

            <form>
                <div className="grid grid-cols-4">
                    {selectQuestions.map(({ name, question, options }) => (
                        <div key={name} className="mb-6">
                            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                                {question}
                            </label>
                            <div className="relative w-full md:w-3/4">
                                <select
                                    required
                                    name={name}
                                    id={name}
                                    defaultValue=""
                                    className="block w-full appearance-none rounded-md bg-gray-100 border border-gray-300 py-3 px-4 pr-10 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option disabled value="">Select</option>
                                    {options.map((option, idx) => (
                                        <option key={idx} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>

                                {/* Custom dropdown arrow */}
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                                    <svg
                                        className="h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </form>


        </div>
    );
};

export default Filter;