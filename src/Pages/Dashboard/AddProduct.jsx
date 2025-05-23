import { useMutation } from "@tanstack/react-query";
import BlackButton from "../../Components/Shared/Buttons/BlackButton";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../Utils/ImageUpload";
import React from 'react';

const AddProduct = () => {

    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (product) => {
            const { data } = await axiosSecure.post('/add_product', product);
            return data;
        },
        onSuccess: () => {
            toast.success('Product Added Successfully');
        }
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const brand = form.brand.value;
        const warranty = form.warranty.value;
        const price = parseInt(form.price.value);
        const availability = form.availability.value;
        const material = form.material.value;
        const waterResistance = form.waterResistance.value;
        const color = form.color.value;
        const category = form.category.value;
        const details = form.details.value;
        const uuId = crypto.randomUUID();

        const image = form.image.files[0];
        const imageUrl = await imageUpload(image);
        console.log(imageUrl);

        const product = {
            name,
            brand,
            warranty,
            price,
            availability,
            material,
            waterResistance,
            color,
            category,
            details,
            uuId,
            image: imageUrl
        };

        await mutateAsync(product);
        form.reset();

    };


    return (
        <div className=" min-h-screen min-w-full">

            <div className="text-black">
                <div className="border-b border-black">
                    <h1 className="text-4xl my-10 font-lexend text-center">Submit Product</h1>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex  flex-col py-10 px-5 max-w-[1000px] mx-auto capitalize gap-10">


                    {/* 1stdiv */}
                    <div className="flex flex-col justify-between px-5 gap-5 md:gap-10">

                        <div className="">
                            <label className="block text-xs md:text-2xl font-lexend">Name</label>
                            <input required className=" w-3/4 my-5 outline-none placeholder:text-gray-500 border-b border-black" type="text" name="name" placeholder="name" />
                        </div>

                        <div className="  ">
                            <label className="block text-xs md:text-xl">Image</label>
                            <input required type="file" name="image" className="block w-full md:w-3/4 px-3 py-2 mt-2 text-sm text-gray-600 border border-gray-400 rounded-lg file:rounded-lg file:border-none file:text-gray-600  " />
                        </div>

                    </div>


                    {/* 2nd div */}
                    <div className="flex flex-col  justify-between px-5 gap-5 md:gap-10">
                        <div className=" ">
                            <label className="block text-xs md:text-2xl font-lexend">Brand</label>
                            <input className=" w-3/4 my-5 outline-none placeholder:text-gray-500 border-b border-black" type="text" name="brand" placeholder="brand" />
                        </div>

                        <div className=" ">
                            <label className="block text-xs md:text-2xl font-lexend">Warranty</label>
                            <input className=" w-3/4 my-5 outline-none placeholder:text-gray-500 border-b border-black" type="text" name="warranty" placeholder="warranty" />
                        </div>
                    </div>

                    {/* 3rd div */}
                    <div className="flex flex-col  justify-between px-5 gap-5 md:gap-10">
                        <div className=" ">
                            <label className="block text-xs md:text-2xl font-lexend">Price</label>
                            <input required min={0} className=" w-3/4 outline-none placeholder:text-gray-500 border-b border-black" type="number" name="price" placeholder="price" />
                        </div>

                        <div className=" ">
                            <label className="block text-xs md:text-2xl font-lexend">availability</label>
                            <input className=" w-3/4 outline-none placeholder:text-gray-500 border-b border-black" type="text" name="availability" placeholder="availability" />
                        </div>
                    </div>


                    {/* 4th div */}
                    <div className="flex  flex-col justify-between px-5 gap-5 md:gap-10">
                        <div className=" ">
                            <label className="block text-xs md:text-2xl font-lexend">material</label>
                            <input min={0} className=" w-3/4 outline-none placeholder:text-gray-500 border-b border-black" type="text" name="material" placeholder="material" />
                        </div>

                        <div className=" ">
                            <label className="block text-xs md:text-2xl font-lexend">Durability</label>
                            <input className=" w-3/4 outline-none placeholder:text-gray-500 border-b border-black" type="text" name="waterResistance" placeholder="Resistance" />
                        </div>
                    </div>


                    {/* 5th div */}
                    <div className="flex flex-col justify-between px-5 gap-5 md:gap-10">
                        <div className=" ">
                            <label className="block text-xs md:text-2xl font-lexend">Color</label>
                            <input className=" w-3/4 my-5 outline-none placeholder:text-gray-500 border-b border-black" type="text" name="color" placeholder="Product Color" />
                        </div>

                        <div className=" ">
                            <label className="block text-xs md:text-2xl font-lexend">Category</label>
                            <select required className="px-5 cursor-pointer w-28 md:w-3/4 mt-1 h-10 border-b appearance-none border-black rounded-sm outline-none" name="category" id="">
                                <option disabled selected>Select</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Smartwatches">Smartwatches</option>
                                <option value="Sports">Sports</option>
                                <option value="Casual">Casual</option>
                            </select>
                        </div>

                    </div>

                    {/* 6th div */}
                    <textarea required name="details" id="" rows='5' className="rounded outline-none border border-gray-400 placeholder:p-5" placeholder="Descriptions"></textarea>


                    <button>
                        <BlackButton size={325} text={'submit'} />
                    </button>

                </form>
            </div>

        </div>
    );
};

export default AddProduct;