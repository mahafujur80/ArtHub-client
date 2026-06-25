import { getAllTransactions } from '@/lib/api/admin';
import { getServerSession } from '@/lib/server/getServerSession';
import { Pagination, Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const AllTransactionPage = async ({ searchParams }) => {
    const { page } = await searchParams;
    const user = await getServerSession();
    const transactionData = await getAllTransactions(user?.role, page);
    const allTransactions = transactionData.data;
    const currentPage = transactionData.page;
    const totalPages = transactionData.totalPage;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    };

    return (
        <div className='p-5'>
            <Table className="bg-orange-500">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header className="bg-orange-500 text-white">
                            <Table.Column className="text-white" isRowHeader>Transaction ID</Table.Column>
                            <Table.Column className="text-white" >Type</Table.Column>
                            <Table.Column className="text-white" >User Email</Table.Column>
                            <Table.Column className="text-white" >Amount</Table.Column>
                            <Table.Column className="text-white" >Date</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                allTransactions.map(sale =>
                                    <Table.Row key={sale._id} className="hover:bg-orange-50 transition-colors">
                                        <Table.Cell >
                                        {sale?.sessionId?.slice(0, 15)}...{sale?.sessionId?.slice(-15)}
                                        </Table.Cell>
                                        <Table.Cell >{sale?.type}</Table.Cell>
                                        <Table.Cell >{sale?.customerEmail}</Table.Cell>
                                        <Table.Cell >{sale?.amount}</Table.Cell>
                                        <Table.Cell >{new Date(sale?.createAt).toLocaleDateString()}</Table.Cell>
                                    </Table.Row>)
                            }
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>

                <Table.Footer >
                    <Pagination size="sm" >
                        <Pagination.Content className="w-full flex justify-center">
                            <Pagination.Item>
                                <Pagination.Previous
                                    isDisabled={currentPage === 1}
                                    className="hover:!bg-white group"
                                >
                                    <Link className='flex gap-2 text-white group-hover:!text-orange-500' href={`/dashboard/admin/transactions?page=${currentPage - 1}`}>
                                        <Pagination.PreviousIcon />
                                        Prev
                                    </Link>
                                </Pagination.Previous>
                            </Pagination.Item>
                            {pages.map((p) => (
                                <Pagination.Item key={p}>
                                    <Link href={`/dashboard/admin/transactions?page=${p}`}>
                                        <Pagination.Link isActive={p === currentPage} className={p === currentPage ? "!bg-white !text-orange-500" : "!bg-orange-500 !text-white"}>
                                            {p}
                                        </Pagination.Link>
                                    </Link>
                                </Pagination.Item>
                            ))}
                            <Pagination.Item>
                                <Pagination.Next
                                    isDisabled={currentPage === totalPages}
                                    className="hover:!bg-white group"
                                >
                                    <Link className='flex gap-2 text-white group-hover:!text-orange-500' href={`/dashboard/admin/transactions?page=${currentPage + 1}`}>
                                        Next
                                        <Pagination.NextIcon />
                                    </Link>
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
                </Table.Footer>
            </Table>
        </div>
    );
};

export default AllTransactionPage;