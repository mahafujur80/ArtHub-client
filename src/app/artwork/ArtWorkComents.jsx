'use client';

import { FaComments } from "react-icons/fa";

import React from 'react';

const ArtWorkComments = ({art, user}) => {

    const handlePostComment = (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        
        const commentObj = {
            artworkId: art?._id,
            userId: user?.id,
            userName: user?.name,
            comment,
        }
        console.log(commentObj);
    };

    return (
        <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-2xl border border-orange-100 shadow-lg p-6 sm:p-8">

                {/* Section Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FaComments className="w-6 h-6 text-orange-500" />
                    Review & Comments
                    <span className="text-sm font-normal text-gray-500">({52 || 0})</span>
                </h2>

                {/* Comment Input */}
                <div className="mb-8">
                    <div className="flex gap-3">
                        {/* User Avatar (ছোট করে) */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {/* {user?.name?.charAt(0) || "U"} */}
                           user
                        </div>

                        {/* Input Field */}
                        <form onSubmit={handlePostComment} className="flex-1 relative">
                            <textarea
                                name="comment"
                                placeholder="Write your comment..."
                                className="w-full p-3 pr-24 rounded-xl border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none transition-all duration-300 min-h-[50px] max-h-[100px]"
                                rows={2}
                            />
                            <button type="submit" className="absolute top-1/2 right-2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300">
                                Post
                            </button>
                        </form>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">

                    {/* Single Comment */}
                    <div className="flex gap-3 group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                            JD
                        </div>
                        <div className="flex-1">
                            <div className="bg-gray-50 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-gray-900 text-sm">John Doe</h4>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-400">2 hours ago</span>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    Beautiful artwork! Love the details and color combination. 😍
                                </p>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>


    );
};

export default ArtWorkComments;