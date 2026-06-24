"use client";

import { Button, Input } from "@heroui/react";

import {
    Select,
    Label,
    ListBox,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const categories = [
    "All",
    "Painting",
    "Digital Art",
    "Illustration",
    "Photography",
    "Abstract",
    "Portrait",
    "Landscape",
    "Concept Art",
    "Sketch",
    "Calligraphy",
];

const sortOption = ["Default", "Latest", "Oldest", "Price Low-High", "Price High-Low"];

export default function BrowseArtworkHeader() {
    const [search, setSearch] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const router = useRouter();

    const searchParams = useSearchParams();
    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (search) {
            params.set("search", search);
        } else {
            params.delete("search");
        }

        if (min) {
            params.set("minPrice", min);
        } else {
            params.delete("minPrice");
        }

        if (max) {
            params.set("maxPrice", max);
        } else {
            params.delete("maxPrice");
        }

        if (category) {
            params.set("category", category);
        } else {
            params.delete("category");
        }

        if (sort) {
            params.set("sort", sort);
        } else {
            params.delete("sort");
        }

        router.push(`/artwork?${params.toString()}`);
    }


    // useEffect(() => {
    //     const params = new URLSearchParams(searchParams.toString());

    //     if (search) {
    //         params.set("search", search);
    //     } else {
    //         params.delete("search");
    //     }

    //     if (min) {
    //         params.set("minPrice", min);
    //     } else {
    //         params.delete("minPrice");
    //     }

    //     if (max) {
    //         params.set("maxPrice", max);
    //     } else {
    //         params.delete("maxPrice");
    //     }

    //     if (category) {
    //         params.set("category", category);
    //     } else {    
    //         params.delete("category");
    //     }

    //     if (sort) {
    //         params.set("sort", sort);
    //     } else {
    //         params.delete("sort");
    //     }

    //     router.push(`/artwork?${params.toString()}`);
    // }, [search, min, max, category, sort]);

    return (
        <section className="bg-white border border-gray-100 rounded-2xl p-6 mb-10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4">

                {/* Search */}
                <div className="flex flex-col gap-1 w-full lg:w-[320px]">
                    <Input
                        onChange={(e) => setSearch(e.target.value)}
                        name="search"
                        placeholder="Search artworks"
                        type="text"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3 w-full lg:w-[320px]">
                    {/* Min Price */}
                    <div className="flex flex-col gap-1 w-full">
                        <Input
                            onChange={(e) => setMin(e.target.value)}
                            name="minPrice"
                            min={0}
                            placeholder="Min Price"
                            type="number"
                        />
                    </div>

                    {/* Max Price */}
                    <div className="flex flex-col gap-1 w-full">
                        <Input
                            onChange={(e) => setMax(e.target.value)}
                            name="maxPrice"
                            min={0}
                            placeholder="Max Price"
                            type="number"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full lg:w-[440px]">
                    {/* Category */}
                    <Select onChange={(value) => setCategory(value)} className="w-full" name="category" placeholder="Category">
                        <Select.Trigger className="border border-gray-200 focus-within:border-orange-500">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                            <ListBox>
                                {categories.map((category) => (
                                    <ListBox.Item key={category} id={category}>
                                        {category}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* Sort */}
                    <Select onChange={(value) => setSort(value)} className="w-full" name="sort" placeholder="Sort By">
                        <Select.Trigger className="border border-gray-200 focus-within:border-orange-500">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                            <ListBox>
                                {sortOption.map((sort) => (
                                    <ListBox.Item key={sort} id={sort}>
                                        {sort}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                <div>
                    <Button onClick={handleSearch} className="max-sm:w-full bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition shadow-md hover:shadow-lg text-center">Apply Filter</Button>
                </div>
            </div>
        </section>
    );
}