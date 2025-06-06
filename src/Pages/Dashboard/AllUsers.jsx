import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { Button, Table } from '@chakra-ui/react';
import toast from 'react-hot-toast';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['all users'],
        queryFn: async () => {
            const { data } = await axiosSecure('/all_users');
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

    console.log(allUsers.slice(0, 10));



    return (
        <div>
            <Table.ScrollArea borderWidth="1px" maxW="full" >
                <Table.Root size="lg">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Name</Table.ColumnHeader>
                            <Table.ColumnHeader>Email</Table.ColumnHeader>
                            <Table.ColumnHeader>member</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="end">Action</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {allUsers.map((item) => (
                            <Table.Row key={item.id} >
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.email}</Table.Cell>
                                <Table.Cell color={item.role === 'member' ? 'green.500' : 'blue.500'}>{item.transaction_status}</Table.Cell>
                                <Table.Cell >
                                    <Button onClick={() => handleDelete(item?.email)} variant={'outline'} px={'4'} py='1' bg={'blue.500'}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Table.ScrollArea>
        </div>
    );
};

export default AllUsers;