import { useMutation } from "@tanstack/react-query";
import BlackButton from "../../Components/Shared/Buttons/BlackButton";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../Utils/ImageUpload";
import React, { useState } from 'react';
import ProductReviewModal from "../../Components/Shared/ProductReviewModal/ProductReviewModal";

const AddProduct = () => {

    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);

    const [reviewProduct, setReviewProduct] = useState({});

    const { mutateAsync } = useMutation({
        mutationFn: async (product) => {
            const { data } = await axiosSecure.post('/add_product', product);
            return data;
        },
        onSuccess: () => {
            toast.success('Product Added Successfully');
            setIsOpen(false);
            setReviewProduct({});
        }
    });


    const handleReview = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const priceStr = form.price.value;
        const discount = form.discount.value;
        const discountedPrice = parseInt(priceStr) - (parseInt(priceStr) * parseInt(discount)) / 100;
        const category = form.category.value;
        const variant = form.variant.value;
        const description = form.description.value;
        const uuId = crypto.randomUUID();

        // ⬇️ Get all selected files
        const files = form.image.files;

        // ⬇️ Upload all images and collect URLs
        const imageUploadPromises = [...files].map(image => imageUpload(image));
        const imageUrls = await Promise.all(imageUploadPromises);

        const productDetails = {
            name,
            price: priceStr,
            discount,
            discountedPrice,
            category,
            variant,
            description,
            uuId,
            images: imageUrls,
        };

        setReviewProduct(productDetails);
        setIsOpen(true);
    };



    const handleSubmit = async () => {
        await mutateAsync(reviewProduct);
        setIsOpen(false);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-black text-white p-6 text-center">
                    <h1 className="text-3xl font-bold font-lexend">Add New Product</h1>
                </div>

                {/* Form */}
                <form onSubmit={handleReview} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">

                    {/* Product Name */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">Product Name</label>
                        <input name="name" type="text" placeholder="Enter product name" required
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 ring-black" />
                    </div>

                    {/* Product Image */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">Image</label>
                        <input name="image" type="file" accept="image/*" required multiple
                            className="p-2 border border-gray-300 rounded file:bg-black file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 hover:file:bg-gray-800" />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">Price (৳)</label>
                        <input name="price" type="number" min="0" placeholder="Enter price" required
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 ring-black" />
                    </div>

                    {/* Discount Percentage */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">Discount (%)</label>
                        <input name="discount" type="number" min="0" max="100" placeholder="e.g., 10"
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 ring-black" />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">Category</label>
                        <select name="category" required
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 ring-black">
                            <option disabled selected>Select a category</option>
                            <option value="Luxury">Luxury</option>
                            <option value="Smartwatches">Smartwatches</option>
                            <option value="Sports">Sports</option>
                            <option value="Casual">Casual</option>
                        </select>
                    </div>

                    {/* Variant */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">Variant</label>
                        <input name="variant" type="text" placeholder="e.g., Black/XL/32GB"
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 ring-black" />
                    </div>

                    {/* Description (Full Width) */}
                    <div className="col-span-1 md:col-span-2 flex flex-col">
                        <label className="mb-1 font-semibold text-gray-700">Description</label>
                        <textarea name="description" rows="4" required placeholder="Write product description..."
                            className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 ring-black resize-none" />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2 text-center">
                        <button type="submit"
                            className="bg-black hover:bg-gray-800 text-white px-10 py-3 rounded-full text-lg transition duration-300">
                            Review Product
                        </button>
                    </div>
                </form>

                {/* modal */}
                <div>
                    <ProductReviewModal handleSubmit={handleSubmit} data={reviewProduct} isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>


            </div>
        </div>


    );
};

export default AddProduct;