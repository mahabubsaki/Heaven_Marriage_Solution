import { Table } from '@chakra-ui/react';
import React, { useState } from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SeeProductsModal from '../../Components/Shared/Modal/SeeProductsModal/SeeProductsModal';
import toast from 'react-hot-toast';

const ProductOrders = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [sort, setSort] = useState('');
    const [productData, setProductData] = useState('');
    const [productModal, setProductModal] = useState(false);

    const { data = [], refetch } = useQuery({
        queryKey: ['product_orders'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/product_orders');
            return data;
        }
    });



    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.patch(`/complete_order/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success('Congratulations !');
            refetch();
        }
    });
    const handleUpdate = async (id) => {
        await mutateAsync(id);

    };

    const handleSeeProduct = (data) => {
        setProductData(data);
        setProductModal(true);
    };

    const handleSubmit = () => {

    };

    return (
        <div className='min-h-screen bg-white'>



            <div className='max-w-[1000px] mx-auto flex flex-col p-4 space-y-3'>
                <h1 className='text-2xl font-semibold'>Product Orders</h1>


                <div className='flex justify-between'>
                    {/* for user search by gmail */}
                    <form onSubmit={handleSubmit}>
                        <div className='flex items-center gap-5'>
                            <input name='search' type="text" placeholder='Enter Name/Email' className='border px-2 py-1 border-black rounded-full' />
                            <button>
                                <FaSearch />
                            </button>
                        </div>
                    </form>

                    {/* sort */}
                    <div>
                        <select onChange={(e) => setSort(e.target.value)} className='outline-none'>
                            <option disabled selected>Sort</option>
                            <option value="all">All</option>
                            <option value="member">Member</option>
                            <option value="guest">Guest</option>
                        </select>
                    </div>

                </div>

                <Table.ScrollArea borderWidth="1px" maxW="full" >
                    <Table.Root size="lg">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Name</Table.ColumnHeader>
                                <Table.ColumnHeader>Mobile</Table.ColumnHeader>
                                <Table.ColumnHeader>Address</Table.ColumnHeader>
                                <Table.ColumnHeader>Price Ammount</Table.ColumnHeader>
                                <Table.ColumnHeader>Status</Table.ColumnHeader>
                                <Table.ColumnHeader>Product</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.map((item) => (
                                <Table.Row key={item.id} >
                                    <Table.Cell>
                                        <div className='flex gap-3'>
                                            <div className='flex flex-col'>
                                                <p className='font-semibold'>{item.name}</p>
                                                <p className='text-sm'>{item.buyer_email}</p>
                                            </div>
                                        </div>

                                    </Table.Cell>
                                    <Table.Cell color={'blue.600'}>{item?.mobile}</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex flex-col justify-center'>
                                            <p className='text-xl'>{item?.address}</p>
                                            <p className='text-red-500'>{item?.delivery}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>{item?.total} <span className='font-mina'>৳</span> </Table.Cell>
                                    <Table.Cell  >
                                        <div className='flex flex-col'>
                                            {
                                                item?.status === 'in process' && <button className='bg-blue-400 rounded-lg text-white font-semibold px-1'>Complete</button>
                                            }
                                            <p className={`${item?.status === 'order listed' ? 'text-red-500' : 'text-blue-400'}`}>{item?.status}</p>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className='flex gap-3'>
                                            <button
                                                onClick={() => handleSeeProduct(item)}
                                                className='bg-green-600 px-3 py-1 rounded-full text-white font-semibold'
                                            >
                                                View
                                            </button>
                                            {
                                                item?.status === 'order listed' && <button
                                                    className='bg-blue-600 px-3 py-1 rounded-full text-white font-semibold'
                                                    onClick={() => handleUpdate(item?._id)}
                                                >
                                                    Update
                                                </button>
                                            }
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>

                {/*see products modal  */}
                <SeeProductsModal isOpen={productModal} data={productData} setIsOpen={setProductModal} />

            </div>


        </div>
    );
};

export default ProductOrders;