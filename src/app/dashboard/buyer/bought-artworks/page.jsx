import { getMyPurchases } from '@/lib/api/purchase';
import { getServerSession } from '@/lib/server/getServerSession';
import React from 'react';
import ArtworkCard from './ArtWorkCard';
import { Pagination } from '@heroui/react';
import Link from 'next/link';
import EmptyMessage from '@/Components/EmptyMessage';

const BoughtArtworks = async ({searchParams}) => {
    const {page} = await searchParams;
    const user = await getServerSession()
    const artWorkData = await getMyPurchases(user?.id, page)
    const myArtworks = artWorkData?.data;

    const currentPage = artWorkData?.page;
    const totalPages = artWorkData?.totalPage;
    const pages = []
    for(let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    if(myArtworks.length === 0) {
      return  <EmptyMessage />
    }

    return (
        <div className="p-4">

            <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                {
                    myArtworks.map(artwork => <ArtworkCard artwork={artwork} key={artwork?._id} />)
                }
            </div>
            <div className="pt-5">
                <Pagination size="md">
                    <Pagination.Content className="w-full flex justify-center">
                        <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={currentPage === 1}
                                className="hover:!bg-orange-500 group"
                            >
                                <Link className='flex gap-2 group-hover:!text-white' href={`/dashboard/buyer/bought-artworks?page=${currentPage - 1}`}>
                                    <Pagination.PreviousIcon />
                                    Prev
                                </Link>
                            </Pagination.Previous>
                        </Pagination.Item>
                        {pages.map((p) => (
                            <Pagination.Item key={p}>
                                <Link href={`/dashboard/buyer/bought-artworks?page=${p}`}>
                                    <Pagination.Link isActive={p === currentPage} className={p === currentPage ? "!bg-orange-500 !text-white" : "!bg-white !text-orange-500" }>
                                        {p}
                                    </Pagination.Link>
                                </Link>
                            </Pagination.Item>
                        ))}
                        <Pagination.Item>
                            <Pagination.Next
                                isDisabled={currentPage === totalPages}
                                className="hover:!bg-orange-500 group"
                            >
                                <Link className='flex gap-2  group-hover:!text-white' href={`/dashboard/buyer/bought-artworks?page=${currentPage + 1}`}>
                                    Next
                                    <Pagination.NextIcon />
                                </Link>
                            </Pagination.Next>
                        </Pagination.Item>
                    </Pagination.Content>
                </Pagination>
            </div>
        </div>
    );
};

export default BoughtArtworks;