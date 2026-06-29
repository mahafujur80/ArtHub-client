"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoIosColorPalette } from "react-icons/io";

export default function HeroSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="flex items-center py-5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.span 
              variants={fadeInUp}
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium shadow-sm bg-white text-slate-800 border border-slate-100"
            > 
            <IoIosColorPalette className="text-orange-500 h-7 w-7 mr-2" />
            Original Artworks
            </motion.span>

            {/* Title */}
            <motion.h1 
              variants={fadeInUp}
              className="mt-6 text-3xl md:text-5xl font-bold leading-tight text-slate-900"
            >
              Discover & Buy <br />
              <span className="text-orange-500">Original</span> Art
            </motion.h1>

            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="mt-6 max-w-xl text-lg text-slate-600"
            >
              Explore unique, authentic artworks from talented artists
              around the world. Find paintings, illustrations and digital masterpieces.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link href="/artwork">
                <button className="mt-8 rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20">
                  Browse Artworks
                </button>
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div 
              variants={fadeInUp}
              className="mt-14 flex flex-wrap gap-8"
            >
              <div>
                <h4 className="font-semibold text-slate-800">100% Original</h4>
                <p className="text-sm text-slate-500">Authentic artworks</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800">Support Artists</h4>
                <p className="text-sm text-slate-500">Empower creativity</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800">Secure Payment</h4>
                <p className="text-sm text-slate-500">Safe & protected</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute h-64 w-64 rounded-full bg-orange-200 blur-3xl opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            
            <motion.div 
              className="relative z-10 w-full max-w-md aspect-square"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1729945969392-5817d48a861a?q=80&w=888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Colorful abstract artwork"
                fill
                className="rounded-3xl object-cover shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}