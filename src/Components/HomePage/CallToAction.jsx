"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-50 dark:bg-gray-800">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-10 md:p-16 shadow-xl border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Ready to Start Your <span className="text-orange-500">Art Journey?</span>
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of artists and collectors. Discover unique masterpieces or start showcasing your own creativity to the world today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/artwork">
              <button className="w-full sm:w-auto rounded-xl bg-orange-500 hover:bg-orange-600 px-8 py-4 text-md font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30 active:scale-95 shadow-md">
                Explore Artworks
              </button>
            </Link>
            
            <Link href="/signup">
              <button className="w-full sm:w-auto rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-8 py-4 text-md font-semibold text-gray-800 text-white transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
                Join as an Artist
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
