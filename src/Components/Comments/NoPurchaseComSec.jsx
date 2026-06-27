import Link from 'next/link';
import React from 'react';
import { FaComments } from 'react-icons/fa';

const NoPurchaseComSec = () => {
    return (
       
<div className="max-w-7xl mx-auto mt-12">
  <div className="bg-white rounded-2xl border border-orange-100 shadow-lg p-6 sm:p-8">
    
    {/* Section Title */}
    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <FaComments className="w-6 h-6 text-orange-500" />
        Review & Comments
    </h2>

    {/* Comment Input */}
    <div className="mb-8">
      <div className="h-10 w-full rounded-xl border border-orange-500 p-4 flex items-center justify-center text-orange-500 font-semibold">
          <p>Please Purchase Artwork to leave a review  <Link className='text-blue-500' href='/login' >Login</Link> to Purchase</p>
      </div>
    </div>
  </div>
</div>

    );
};

export default NoPurchaseComSec;