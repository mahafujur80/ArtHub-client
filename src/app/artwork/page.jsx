import ArtCard from '@/Components/BrowesArts/ArtCard';
import BrowseArtworkHeader from '@/Components/BrowesArts/BrowesArtWorkHeader';
import { getAllArtworks } from '@/lib/api/artwork';
import { Pagination } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const AllArtPage = async ({ searchParams }) => {
    const { search, minPrice, maxPrice, category, sort, page } = await searchParams;
    const artsData = await getAllArtworks(search, minPrice, maxPrice, category, sort, page);
    const allArts = artsData.data;

    const currentPage = artsData.page;
    const totalPages = artsData.totalPage;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const prevParams= new URLSearchParams(searchParams.toString());
    prevParams.set('page', currentPage - 1);
    const nextParams= new URLSearchParams(searchParams.toString());
    nextParams.set('page', currentPage + 1);

    
    

    return (
        <div className=' min-h-screen  p-4 '>

            <BrowseArtworkHeader />
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">

                {
                    allArts.map(art => <ArtCard art={art} key={art._id} />)
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
                                <Link className='flex gap-2 group-hover:!text-white' href={`/artwork?${prevParams.toString()}`}>
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
                                <Link className='flex gap-2  group-hover:!text-white'  href={`/artwork?${nextParams.toString()}`}>
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

export default AllArtPage;