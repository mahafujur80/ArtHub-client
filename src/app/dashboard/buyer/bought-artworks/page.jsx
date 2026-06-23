import { getMyPurchases } from '@/lib/api/purchase';
import { getServerSession } from '@/lib/server/getServerSession';
import React from 'react';
import ArtworkCard from './ArtWorkCard';
import { Pagination } from '@heroui/react';
import Link from 'next/link';

const BoughtArtworks = async () => {
    const user = await getServerSession()
    const myArtworks = await getMyPurchases(user?.id)

    const currentPage = 2;
    const pages = [1, 2, 3]
    const totalPages = Array.length;

    return (
        <div className="p-4">

            <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                {
                    myArtworks.map(artwork => <ArtworkCard artwork={artwork} key={artwork?._id} />)
                }
            </div>
            <div className="py-10">
                <Pagination size="sm" className="flex justify-center">
                    <Pagination.Content>
                        <Pagination.Item>
                            <Pagination.Previous
                                isDisabled={currentPage === 1}
                                className="hover:!bg-orange-500 group"
                            >
                                <Link className='flex gap-2 group-hover:!text-white' href={`/dashboard/buyer/purchase-history?page=${currentPage - 1}`}>
                                    <Pagination.PreviousIcon />
                                    Prev
                                </Link>
                            </Pagination.Previous>
                        </Pagination.Item>
                        {pages.map((p) => (
                            <Pagination.Item key={p}>
                                <Link href={`/dashboard/buyer/purchase-history?page=${p}`}>
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
                                <Link className='flex gap-2  group-hover:!text-white' href={`/dashboard/buyer/purchase-history?page=${currentPage + 1}`}>
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