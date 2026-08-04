import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      title: 'Create an Account',
      description: 'Sign up in seconds and set up your personalized artist or collector profile.',
    },
    {
      num: '02',
      title: 'Upload or Browse',
      description: 'Artists can upload their portfolio, while collectors can explore diverse categories.',
    },
    {
      num: '03',
      title: 'Connect & Transact',
      description: 'Engage directly, negotiate, and securely purchase or sell stunning artworks.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">
            Your journey to the art world in three simple steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 z-10 shadow-lg">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
