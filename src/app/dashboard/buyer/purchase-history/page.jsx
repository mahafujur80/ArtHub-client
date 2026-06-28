import EmptyMessage from '@/Components/EmptyMessage';
import { getPurchaseHistory } from '@/lib/api/buyer';
import { getServerSession } from '@/lib/server/getServerSession';
import { Pagination, Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const PurchaseHistory = async ({ searchParams }) => {
    const { page } = await searchParams
    const user = await getServerSession()
    const purchaseData = await getPurchaseHistory(user?.id, page)
    const availableHistory = purchaseData.data;
    const totalPages = purchaseData.totalPage;
    const currentPage = purchaseData.page;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
   
    if(availableHistory.length === 0) {
      return <EmptyMessage />
    }

    return (
        <div className='p-4'>
            {/* Header */}
            <div className='pb-4'>
                <h1 className="text-3xl font-bold text-gray-900">
                    Payment History
                </h1>

                <p className="text-gray-500 mt-1">
                    View all purchased history of your ArtHub
                </p>
            </div>

            <div>
                <Table className="bg-orange-500">
                    <Table.ScrollContainer>
                        <Table.Content
                            aria-label="Purchase History"
                            className="min-w-[600px]"
                        >
                            <Table.Header className="bg-orange-500 text-white">
                                <Table.Column isRowHeader className="text-white">Artwork Name</Table.Column>
                                <Table.Column className="text-white">Artist</Table.Column>
                                <Table.Column className="text-white">Price</Table.Column>
                                <Table.Column className="text-white">Date</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {availableHistory.map((purchase) => (
                                    <Table.Row
                                        key={purchase._id}
                                        className="hover:bg-orange-50 transition-colors"
                                    >
                                        <Table.Cell className="font-medium">
                                            {purchase.artworkName}
                                        </Table.Cell>

                                        <Table.Cell>
                                            {purchase.artistName}
                                        </Table.Cell>

                                        <Table.Cell className="text-orange-500 font-semibold">
                                            ${purchase.amount}
                                        </Table.Cell>

                                        <Table.Cell className="text-gray-500">
                                            {new Date(purchase.createAt).toDateString()}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
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
                                        <Link className='flex gap-2 text-white group-hover:!text-orange-500' href={`/dashboard/buyer/purchase-history?page=${currentPage - 1}`}>
                                        <Pagination.PreviousIcon />
                                        Prev
                                        </Link>
                                    </Pagination.Previous>
                                </Pagination.Item>
                                {pages.map((p) => (
                                    <Pagination.Item key={p}>
                                        <Link href={`/dashboard/buyer/purchase-history?page=${p}`}>
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
                                       <Link className='flex gap-2 text-white group-hover:!text-orange-500' href={`/dashboard/buyer/purchase-history?page=${currentPage + 1}`}>
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
        </div>
    );
};

export default PurchaseHistory;