import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import React, { useState } from 'react';
import male_default from '/images/male_default.png';
import female_default from '/images/female_default.png';
import { Table } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import Loading from "../Loading/Loading";
import useAuth from "../../Hooks/Auth/useAuth";


const Users = () => {

    const { loading } = useAuth();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    console.log(sort);


    // get request data
    const axiosSecure = useAxiosSecure();
    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['adminUsers', search, sort],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users?search=${search}&sort=${sort}`);
            return data;
        }
    });
    // console.log(data.slice(0, 5));

    // verify users data
    const { mutateAsync } = useMutation({
        mutationFn: async (verifiedData) => {
            const { data } = await axiosSecure.put('/update_user', verifiedData);
            return data;
        },
        onSuccess: () => {
            toast.success('User Updated');
            refetch();
        }
    });
    // console.log(data);


    // get the uuid
    const { data: uuidData = [], refetch: uuidRefetch } = useQuery({
        queryKey: ['uuid'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/get_uuid');
            return data;
        }
    });
    const uuidNum = parseInt(uuidData?.uuid);
    // console.log(typeof (uuidNum));
    // console.log(uuidNum);

    // update uuid
    const { mutateAsync: updateUuid } = useMutation({
        mutationFn: async (newUuid) => {
            const { data } = await axiosSecure.put('/update_uuid', newUuid);
            return data;
        },
        onSuccess: () => {
            uuidRefetch();
        }
    });

    // update user
    const handleUpdate = async (email, transaction_status) => {
        // console.log(email, transaction_status);

        if (transaction_status === 'not verified') {
            return toast.error('User did not sent any transaction yet !');
        }

        if (transaction_status === 'in process') {
            return toast.error('User sent a Transaction, Please Verify !');
        }

        const updatedData = {
            status: 'verified',
            role: 'member',
            uuid: uuidNum + 1,
            form_submitted_by: email,
        };
        // console.log(updatedData);

        const updatedUuidData = {
            uuid: uuidNum + 1,
        };
        // console.log(updateUuid);

        await mutateAsync(updatedData);
        await updateUuid(updatedUuidData);
    };



    // form data for sorting and search
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const search = form.search.value;
        setSort('');
        setSearch(search);
    };

    // delete the Form
    const { mutateAsync: deleteForm } = useMutation({
        mutationFn: async (deleteFormEmail) => {
            const { data } = await axiosSecure.delete(`/deleteUserForm/${deleteFormEmail}`);
            return data;
        },
        onSuccess: () => {
            toast.success('Form Deleted Successfully');
            refetch();
        }
    });

    const handleFormDelete = async (deleteFormEmail) => {
        // console.log(deleteFormEmail);
        await deleteForm(deleteFormEmail);
    };


    if (loading || isLoading) return <Loading />;


    return (
        <div className=" bg-white min-h-[100dvh]">
            <div className="max-w-5xl mx-auto w-full py-5 px-3 space-y-4">
                <h1 className="text-2xl font-semibold">Users and request</h1>

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
                            <option disabled selected>Sort</option>
                            <option value="">All</option>
                            <option value="transaction">Transaction</option>
                            <option value="form">Form</option>
                        </select>
                    </div>
                </div>



                {/* table data */}
                <Table.ScrollArea borderWidth="1px" maxW="full" >
                    <Table.Root size="lg">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Name</Table.ColumnHeader>
                                <Table.ColumnHeader>status</Table.ColumnHeader>
                                <Table.ColumnHeader>transaction status</Table.ColumnHeader>
                                <Table.ColumnHeader>update</Table.ColumnHeader>
                                <Table.ColumnHeader>action</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.map((item) => (
                                <Table.Row key={item.id} >
                                    {/* Name and image email */}
                                    <Table.Cell>
                                        <div className='flex gap-3'>
                                            <div>
                                                {item?.image && < img src={item?.image} className='size-10 object-cover rounded-full' alt="" />}

                                                {
                                                    !item?.image && item?.gender === 'male' && <img src={male_default} className='size-10 object-cover rounded-full' alt="" />
                                                }

                                                {
                                                    !item?.image && item?.gender === 'female' && <img src={female_default} className='size-10 object-cover rounded-full' alt="" />
                                                }
                                            </div>
                                            <div className='flex flex-col'>
                                                <p className='font-semibold'>{item.name}</p>
                                                <p className='text-sm'>{item.email}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    {/* status */}
                                    <Table.Cell color={item?.status === 'verified' ? 'green.600' : 'red.600'}>{item?.status}</Table.Cell>

                                    {/* transaction status */}
                                    <Table.Cell color={item?.transaction_status === 'verified' ? 'green.600' : 'red.600'}>{item?.transaction_status}</Table.Cell>

                                    {/* Update */}
                                    <Table.Cell>
                                        <button
                                            onClick={() => handleUpdate(item?.email, item?.transaction_status)}
                                            className="text-blue-700 cursor-pointer">
                                            Verify
                                        </button>
                                    </Table.Cell>

                                    {/* form */}
                                    <Table.Cell>
                                        <div className="flex items-center justify-center gap-2">
                                            <Link to={`/admin_details/${item?.email}`} className="underline ">Form</Link>
                                            <button onClick={() => handleFormDelete(item?.email)} className="text-xl text-red-700 mt-1"><RxCross2 /> </button>
                                        </div>
                                    </Table.Cell>




                                    {/* <Table.Cell textAlign='center' >
                                    <Button onClick={() => handleDelete(item?.email)} variant={'outline'} px={'4'} py='1' bg={'blue.500'}>Delete</Button>
                                </Table.Cell> */}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>


            </div>




        </div>
    );
};

export default Users;;;;