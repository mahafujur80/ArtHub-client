"use client";
import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I start selling my art?',
      answer: 'Simply create an artist account, complete your profile, and start uploading your artworks with descriptions and pricing.',
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No, we are transparent about our pricing. We only take a small commission on successful sales.',
    },
    {
      question: 'How does shipping work?',
      answer: 'Artists are responsible for packaging and shipping the artwork safely. We provide guidelines to ensure smooth delivery.',
    },
    {
      question: 'Can I return an artwork?',
      answer: 'Yes, we have a 14-day return policy for most artworks if they arrive damaged or not as described.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white">
              <button
                className="w-full text-left px-6 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none flex justify-between items-center transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-white text-gray-600 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
