import EmptyMessage from '@/Components/EmptyMessage';
import { getArtistSales } from '@/lib/api/artist';
import { getServerSession } from '@/lib/server/getServerSession';
import {Pagination, Table } from '@heroui/react';
import Link from 'next/link';

const ManageArt = async ({searchParams}) => {
    const {page} = await searchParams;
    const user = await getServerSession();
    const salesData = await getArtistSales(user?.id, page);
    const salesHistory = salesData.data;
    const currentPage = salesData.page;
    const totalPages = salesData.totalPage;

    const pages = [];
    for(let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    if(salesHistory.length === 0) {
        return <EmptyMessage />
    }

    return (
        <div className='p-5'>
            <Table className="bg-orange-500">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header className="bg-orange-500 text-white">
                            <Table.Column className="text-white"  isRowHeader>Artwork Title</Table.Column>
                            <Table.Column className="text-white" >Buyer Name</Table.Column>
                            <Table.Column className="text-white" >Date</Table.Column>
                            <Table.Column className="text-white" >Price</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                salesHistory.map(art =>
                                    <Table.Row key={art._id}  className="hover:bg-orange-50 transition-colors">
                                        <Table.Cell className="font-medium">{art?.artworkName}</Table.Cell>
                                        <Table.Cell >{art?.buyerName}</Table.Cell>
                                        <Table.Cell>{new Date(art.createAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell className="text-orange-500 font-semibold">${art?.amount}</Table.Cell>
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
                                    <Link className='flex gap-2 text-white group-hover:!text-orange-500' href={`/dashboard/artist/sales?page=${currentPage - 1}`}>
                                        <Pagination.PreviousIcon />
                                        Prev
                                    </Link>
                                </Pagination.Previous>
                            </Pagination.Item>
                            {pages.map((p) => (
                                <Pagination.Item key={p}>
                                    <Link href={`/dashboard/artist/sales?page=${p}`}>
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
                                    <Link className='flex gap-2 text-white group-hover:!text-orange-500' href={`/dashboard/artist/sales?page=${currentPage + 1}`}>
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

export default ManageArt;