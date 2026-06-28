import ArtCard from '@/Components/BrowesArts/ArtCard';
import BrowseArtworkHeader from '@/Components/BrowesArts/BrowesArtWorkHeader';
import EmptyMessage from '@/Components/EmptyMessage';
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

    const createQueryString = (pageNumber) => {
        const params = new URLSearchParams();

        if (search) params.set("search", search);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (category) params.set("category", category);
        if (sort) params.set("sort", sort);

        params.set("page", pageNumber);

        return params.toString();
    };


    return (
        <div className='min-h-screen  p-4 '>

            <BrowseArtworkHeader />
            {
                search && <p className="ml-12 text-gray-500 pb-7" >Handpicked {allArts.length} artworks matching your taste</p>
            }

            {
                allArts.length === 0 && <EmptyMessage />
            }

            <div className="container mx-auto  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">

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
                                <Link className='flex gap-2 group-hover:!text-white' href={`/artwork?${createQueryString(currentPage - 1)}`}>
                                    <Pagination.PreviousIcon />
                                    Prev
                                </Link>
                            </Pagination.Previous>
                        </Pagination.Item>
                        {pages.map((p) => (
                            <Pagination.Item key={p}>
                                <Link href={`/artwork?${createQueryString(p)}`}>
                                    <Pagination.Link isActive={p === currentPage} className={p === currentPage ? "!bg-orange-500 !text-white" : "!bg-white !text-orange-500"}>
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
                                <Link className='flex gap-2  group-hover:!text-white' href={`/artwork?${createQueryString(currentPage + 1)}`}>
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