import React, { useState } from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Button, Table } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { FaSearch } from 'react-icons/fa';


const ManageTransactions = () => {

    const { loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    // all transactions data fetching
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['transactions-all', search, sort],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-transactions?search=${search}&transaction_status=${sort}`);
            return data;
        }
    });

    console.log(data);


    // verify transictions
    const { mutateAsync } = useMutation({
        mutationFn: async (sentRequest) => {
            const { data } = await axiosSecure.put('/verify-transactions', sentRequest);
            if (data.result && data.result2) {
                return data;
            } else {
                throw new Error('Transaction verification failed');
            }

        },
        onSuccess: () => {
            toast.success('Transaction Verified');
            refetch();
        },
        onError: (error) => {
            console.error('Error verifying transaction:', error);
        }
    });


    // delete transactions
    const { mutateAsync: deleteTransactions } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/delete_transactions/${id}`);
            return data;
        },
        onSuccess: () => {
            toast.success('Transaction Deleted');
            refetch();
        },
        onError: (error) => {
            console.error('Error Delete Data:', error);
        }
    });

    // delete extra transactions
    const handleDelete = async (id) => {
        // console.log(id);
        await deleteTransactions(id);
    };

    // search and sorting
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const search = form.search.value;
        setSort('');
        setSearch(search);
    };

    const handleVerify = (item) => mutateAsync(item);

    if (loading || isLoading) return <Loading />;
    return (


        <PhotoProvider>
            <div className='min-h-[100dvh] bg-white'>
                <div className='max-w-[1000px] mx-auto flex flex-col p-4 space-y-3'>


                    <p className='text-2xl font-semibold '>All Transactions</p>

                    <div className='flex justify-between'>
                        {/* for user search by gmail */}
                        <form onSubmit={handleSubmit}>
                            <div className='flex items-center gap-5'>
                                <input name='search' type="text" placeholder='Enter Email' className='border px-2 py-1 border-black rounded-full' />
                                <button>
                                    <FaSearch />
                                </button>
                            </div>
                        </form>

                        {/* sort */}
                        <div>
                            <select onChange={(e) => setSort(e.target.value)} className='outline-none'>
                                <option disabled selected>Transaction status</option>
                                <option value="">All</option>
                                <option value="in process">Not Verified</option>
                            </select>
                        </div>

                    </div>

                    <div className=''>
                        <Table.ScrollArea borderWidth="1px" maxW="full" >
                            <Table.Root size="lg">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                                        <Table.ColumnHeader>Transaction Number</Table.ColumnHeader>
                                        <Table.ColumnHeader>Transaction Status</Table.ColumnHeader>
                                        <Table.ColumnHeader>Screenshot</Table.ColumnHeader>
                                        <Table.ColumnHeader textAlign="end">Action</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {data.map((item) => (
                                        <Table.Row key={item.id} >
                                            <Table.Cell>
                                                <div className='flex flex-col'>
                                                    <p className='font-semibold'>{item.name}</p>
                                                    <p className='text-sm'>{item.transaction_sentBy_user}</p>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>{item.transaction_number}</Table.Cell>
                                            <Table.Cell color={item.transaction_status === 'verified' ? 'green.500' : 'blue.500'}>{item.transaction_status}</Table.Cell>
                                            <Table.Cell>



                                                <PhotoView src={item.screenshotUrl}>
                                                    <img src={item.screenshotUrl} width={60} alt="Transaction Screenshot" />
                                                </PhotoView>

                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className='flex'>
                                                    {
                                                        item.transaction_status === 'verified' ?
                                                            <Table.Cell >

                                                            </Table.Cell>
                                                            :
                                                            <Table.Cell textAlign="end">
                                                                <Button onClick={() => handleVerify(item)} variant={'outline'}
                                                                    px={'4'}
                                                                    py='1'
                                                                    className='text-blue-600'
                                                                // bg={'blue.500'}
                                                                >
                                                                    <TiTick />
                                                                </Button>
                                                            </Table.Cell>
                                                    }
                                                    <button onClick={() => handleDelete(item?._id)}>
                                                        <RxCross2 className='text-black text-2xl' />
                                                    </button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Table.ScrollArea>
                    </div>
                </div>
            </div>
        </PhotoProvider>
    );
};

export default ManageTransactions;