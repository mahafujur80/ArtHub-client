"use client";
import React from 'react';
import { FaGlobe, FaLock, FaPalette, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Global Reach',
      description: 'Connect with art collectors and enthusiasts from all around the world, expanding your audience.',
      icon: <FaGlobe className="text-orange-500" />,
    },
    {
      title: 'Secure Transactions',
      description: 'Our platform ensures that every purchase is safe, secure, and hassle-free for both artists and buyers.',
      icon: <FaLock className="text-orange-500" />,
    },
    {
      title: 'Curated Collections',
      description: 'Discover hand-picked artworks curated by industry experts, ensuring high quality and uniqueness.',
      icon: <FaPalette className="text-orange-500" />,
    },
    {
      title: 'Community Driven',
      description: 'Join a vibrant community of creators, participate in discussions, and grow together.',
      icon: <FaHandshake className="text-orange-500" />,
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Why Choose ArtHub?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            We provide the best platform for artists to showcase their work and for collectors to discover masterpieces.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
