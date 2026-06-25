import { AdminDeleteArtwork } from '@/Components/Dashboard/Admin/DeleterArtWorkAdmin';
import { getAllArtworksAdmin } from '@/lib/api/admin';
import { getServerSession } from '@/lib/server/getServerSession';
import { Pagination, Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const ManageArt = async ({searchParams}) => {
    const {page} = await searchParams;
    const user = await getServerSession();
    const artworkData = await getAllArtworksAdmin(user?.role, page);
    const allArtworks = artworkData.data;
    const currentPage = artworkData.page;
    const totalPages = artworkData.totalPage;
    const pages = [];
    for(let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className='p-5'>
            <Table className="bg-orange-500">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header className="bg-orange-500 text-white">
                            <Table.Column className="text-white" isRowHeader>Title</Table.Column>
                            <Table.Column className="text-white" >Artist</Table.Column>
                            <Table.Column className="text-white" >Price</Table.Column>
                            <Table.Column className="text-white" >Action</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                allArtworks.map(art =>
                                    <Table.Row key={art?._id} className="hover:bg-orange-50 transition-colors">
                                        <Table.Cell className="font-medium">{art?.title}</Table.Cell>
                                        <Table.Cell >{art?.artist}</Table.Cell>
                                        <Table.Cell className="font-medium text-orange-500">${art?.price}</Table.Cell>
                                        <Table.Cell>
                                           <AdminDeleteArtwork artwork={art} />
                                        </Table.Cell>
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
                                    <Link className='flex gap-2 text-white group-hover:!text-orange-500' href={`/dashboard/admin/manage-artworks?page=${currentPage - 1}`}>
                                        <Pagination.PreviousIcon />
                                        Prev
                                    </Link>
                                </Pagination.Previous>
                            </Pagination.Item>
                            {pages.map((p) => (
                                <Pagination.Item key={p}>
                                    <Link href={`/dashboard/admin/manage-artworks?page=${p}`}>
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
                                    <Link className='flex gap-2 text-white group-hover:!text-orange-500' href={`/dashboard/admin/manage-artworks?page=${currentPage + 1}`}>
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