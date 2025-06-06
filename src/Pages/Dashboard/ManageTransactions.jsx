import React from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Button, Table } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";


const ManageTransactions = () => {

    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ['transactions-all'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/all-transactions');
            return data;
        }
    });


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

    if (loading || isLoading) return <Loading />;
    const handleVerify = (item) => mutateAsync(item);
    return (
        <PhotoProvider>
            <p className='text-center text-3xl my-5'>All Transactions</p>
            <div className=''>
                <Table.ScrollArea borderWidth="1px" maxW="full" >
                    <Table.Root size="lg">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Name</Table.ColumnHeader>
                                <Table.ColumnHeader>Transaction Number</Table.ColumnHeader>
                                <Table.ColumnHeader>Transaction Status</Table.ColumnHeader>
                                <Table.ColumnHeader>Screenshot</Table.ColumnHeader>
                                <Table.ColumnHeader>User Email</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Action</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.map((item) => (
                                <Table.Row key={item.id} >
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.transaction_number}</Table.Cell>
                                    <Table.Cell color={item.transaction_status === 'verified' ? 'green.500' : 'blue.500'}>{item.transaction_status}</Table.Cell>
                                    <Table.Cell>



                                        <PhotoView src={item.screenshotUrl}>
                                            <img src={item.screenshotUrl} width={60} alt="Transaction Screenshot" />
                                        </PhotoView>

                                    </Table.Cell>
                                    <Table.Cell >{item.transaction_sentBy_user}</Table.Cell>
                                    <Table.Cell>
                                        {
                                            item.transaction_status === 'verified' ?
                                                <Table.Cell >

                                                </Table.Cell>
                                                :
                                                <Table.Cell textAlign="end">
                                                    <Button onClick={() => handleVerify(item)} variant={'outline'} px={'4'} py='1' bg={'blue.500'}>Verify</Button>
                                                </Table.Cell>
                                        }
                                        <button onClick={() => handleDelete(item?._id)}>
                                            <RxCross2 className='text-black text-2xl' />
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            </div>
        </PhotoProvider>
    );
};

export default ManageTransactions;