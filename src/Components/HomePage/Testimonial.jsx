import React from 'react';

const Testimonial = () => {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Contemporary Artist',
      content: 'ArtHub completely transformed my career. Within months of joining, I connected with collectors globally and sold more pieces than I ever thought possible.',
      image: 'https://i.pravatar.cc/150?img=47',
    },
    {
      name: 'David Chen',
      role: 'Art Collector',
      content: 'The curation on ArtHub is unmatched. I have found incredibly unique pieces for my gallery with a seamless and secure purchasing process.',
      image: 'https://i.pravatar.cc/150?img=11',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Digital Creator',
      content: 'A fantastic platform for emerging artists. The community is supportive, and the tools provided make showcasing my digital art a breeze.',
      image: 'https://i.pravatar.cc/150?img=32',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            What Our Community Says
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 relative">
              <div className="text-indigo-500 text-4xl absolute top-4 left-4 opacity-20">"</div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 mt-4">
                {test.content}
              </p>
              <div className="flex items-center">
                <img src={test.image} alt={test.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{test.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
