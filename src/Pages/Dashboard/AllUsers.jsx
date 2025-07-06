import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { Table } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import male_default from '/images/male_default.png';
import female_default from '/images/female_default.png';
import Loading from '../Loading/Loading';
import useAuth from '../../Hooks/Auth/useAuth';


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { loading } = useAuth();

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const { data: allUsers = [], refetch, isLoading } = useQuery({
        queryKey: ['all users', search, sort],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all_users?search=${search}&sort=${sort}`);
            return data;
        }
    });

    // delete a user profile data
    const { mutateAsync } = useMutation({
        mutationFn: async (email) => {
            const { data } = await axiosSecure.delete(`/delete_user/${email}`);
            return data;
        },
        onSuccess: () => {
            refetch();
            toast.success('User Deleted');
        }
    });


    const handleDelete = async (email) => {
        await mutateAsync(email);
    };

    // console.log(allUsers.slice(0, 10));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const search = form.search.value;
        setSort('');
        setSearch(search);
    };

    // console.log(search);
    // console.log(sort);

    if (isLoading || loading) return <Loading />;


    return (
        <div className='min-h-screen bg-white w-full'>
            <div className='max-w-[1000px] mx-auto flex flex-col p-4 space-y-3'>
                <h1 className='text-2xl font-semibold'>All Users</h1>

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
                            <option value="all">All</option>
                            <option value="member">Member</option>
                            <option value="guest">Guest</option>
                        </select>
                    </div>

                </div>



                {/* table data */}
                <Table.ScrollArea borderWidth="1px" maxW="full" >
                    <Table.Root size="lg">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Name</Table.ColumnHeader>
                                <Table.ColumnHeader>Type</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {allUsers.map((item) => (
                                <Table.Row key={item.id} >
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
                                    <Table.Cell color={item.role === 'member' ? 'green.600' : 'blue.600'}>{item?.role}</Table.Cell>
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

export default AllUsers;