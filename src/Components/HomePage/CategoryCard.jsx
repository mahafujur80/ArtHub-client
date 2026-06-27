"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const CategoryCard = ({ category, variants }) => {
  return (
    <motion.div variants={variants}>
      <Link href={category.link}>
        <div className="relative h-40 md:h-52 rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300">
          
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${category?.image})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 transition-all duration-300" />
          </div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
            <h3 className="text-white text-lg md:text-xl font-bold tracking-wide">
              {category.name}
            </h3>
            <p className="text-white/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Explore Now →
            </p>
          </div>
          
          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300" />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;