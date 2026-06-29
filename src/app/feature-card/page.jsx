'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { getFeaturedCard } from '@/lib/api/artwork';
import ArtCard from '@/Components/BrowesArts/ArtCard';
import { motion } from 'framer-motion';

const FeatureCard = () => {
    const [cardData, setCardData] = useState([]);
    const featureCard = cardData.slice(3, 9);
    
    useEffect(() => {
        const fetchFeatureCardData = async () => {
            const res = await getFeaturedCard();
            setCardData(res);
        }
        fetchFeatureCardData();
    }, [])

    return (
        <div className="container mx-auto px-6 py-20 overflow-hidden"> 
       
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-center text-xl md:text-3xl font-bold text-gray-900 mb-2">Our Featured Artworks</h1>
                <p className="text-center text-sm text-gray-500 mb-8">
                    Check out our featured artworks below
                </p>
            </motion.div>

           
            <motion.div
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }} 
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Swiper
                    slidesPerView={2}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                    spaceBetween={30}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="mySwiper !pb-10"
                >
                    {
                        featureCard.map((card) => (
                            <SwiperSlide key={card._id}>
                                <ArtCard art={card} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </motion.div>
        </div>
    );
};

export default FeatureCard;