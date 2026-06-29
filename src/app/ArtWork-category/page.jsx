"use client";

import React from 'react';
import CategoryCard from '@/Components/HomePage/CategoryCard';
import { motion } from 'framer-motion';

const categories = [
    {
        name: "Painting",
        image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=763&auto=format&fit=crop",
        link: `/artwork?category=Painting`
    },
    {
        name: "Digital Art",
        image: "https://plus.unsplash.com/premium_photo-1710865692399-6fe10f968711?q=80&w=870&auto=format&fit=crop",
        link: `/artwork?category=Digital Art`,
    },
    {
        name: "Illustration",
        image: "https://images.unsplash.com/photo-1579762593175-20226054cad0?w=500&auto=format&fit=crop",
        link: `/artwork?category=Illustration`,
    },
    {
        name: "Photography",
        image: "https://plus.unsplash.com/premium_photo-1669800144507-0a7b011990eb?q=80&w=1160&auto=format&fit=crop",
        link:   `/artwork?category=Photography`,
    },
    {
        name: "Abstract",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=870&auto=format&fit=crop",
        link: `/artwork?category=Abstract`,
    },
    {
        name: "Portrait",
        image: "https://images.unsplash.com/photo-1741336649556-8b78a2a33b9e?q=80&w=444&auto=format&fit=crop",
        link: `/artwork?category=Portrait`,
    },
    {
        name: "Landscape",
        image: "https://aggp.ca/wp-content/uploads/2017/11/4.jpg",
        link:  `/artwork?category=Landscape`,
    },
    {
        name: "Concept Art",
        image: "https://images.unsplash.com/photo-1719396923095-d9aa2ef3b974?q=80&w=774&auto=format&fit=crop",
        link: `/artwork?category=Concept Art`,
    },
    {
        name: "Sketch",
        image: "https://images.unsplash.com/photo-1643569941917-95185f728355?q=80&w=1050&auto=format&fit=crop",    
        link: `/artwork?category=Sketch`,
    },
    {
        name: "Calligraphy",
        image: "https://plus.unsplash.com/premium_photo-1675623429264-e6f60de79a4a?q=80&w=870&auto=format&fit=crop",
        link: `/artwork?category=Calligraphy`,
    },
];

const AllCategoryPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: "easeOut" } 
        },
    };

    return (
        <div className='container mx-auto py-10 px-6 overflow-hidden'>
            <div>
                <h1 className="text-center text-xl md:text-3xl  font-bold text-gray-900 mb-2">Artwork Categories</h1>
                <p className="text-center text-sm  text-gray-500 mb-8">
                    Browse artworks by category to find inspiration
                </p>
            </div>

            <motion.div 
                className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6'
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {
                    categories.map((category, index) => (
                        <CategoryCard 
                            key={index} 
                            category={category} 
                            variants={cardVariants} 
                        />
                    ))
                }
            </motion.div>
        </div>
    );
};

export default AllCategoryPage;