'use client';

import { FaComments } from "react-icons/fa";

import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { createComment, getAllComments, getArtworkBuyProved } from "@/lib/api/comment";
import CommentDelete from "./CommentDelete";
import CommentUpdate from "./CommentUpdate";


const ArtWorkComments = ({ art, user }) => {

    const [comments, setComments] = useState([]);
    const [buyProved, setBuyProved] = useState({});

    // for after comment revalidate 
    const fetchComment = async () => {
        const res = await getAllComments(art?._id)
        setComments(res)
    }


    useEffect(() => {
        const loadData = async () => {
            const [comments, buyProved] = await Promise.all([
                getAllComments(art?._id),
                getArtworkBuyProved(art?._id, user?.id)
            ])
            setComments(comments),
                setBuyProved(buyProved)
        };
        loadData()
    }, [art?._id, user?.id])


    const handlePostComment = async (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;

        const commentObj = {
            artworkId: art?._id,
            userId: user?.id,
            userName: user?.name,
            comment,
        }
        const res = await createComment(commentObj, art?._id)
        if (res.success) {
            toast.success(res.message)
            e.target.reset()
            await fetchComment()
        } else {
            toast.error(res.message)
        }

    };

    return (
        <div className="max-w-7xl mx-auto mt-12">
            <div className="bg-white rounded-2xl border border-orange-100 shadow-lg p-6 sm:p-8">

                {/* Section Title */}
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FaComments className="w-6 h-6 text-orange-500" />
                    Review & Comments
                    <span className="text-sm font-normal text-gray-500">
                        ({comments?.length || 0})
                    </span>
                </h2>

                {/* Comment Input */}
                <div className="mb-8">
                    {buyProved?.buyerId === user?.id ? (
                        <div className="flex gap-3">
                            {/* User Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                {user?.name?.charAt(0) || "U"}
                            </div>

                            {/* Input Field */}
                            <form onSubmit={handlePostComment} className="flex-1 relative">
                                <textarea
                                    name="comment"
                                    placeholder="Write your comment..."
                                    className="w-full p-3 pr-24 rounded-xl border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none transition-all duration-300 min-h-[50px] max-h-[100px]"
                                    rows={2}
                                />
                                <button
                                    type="submit"
                                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300"
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                    ) : (
                        <p className="border border-orange-500 border-dotted rounded-lg p-3 text-orange-500 font-medium text-center mt-3">
                            Purchase this artwork to unlock reviews and comments from verified buyers.
                        </p>
                    )}
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map((comment) => {
                        return (
                            <div key={comment?._id} className="flex gap-3 group">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                                    {comment?.userName?.charAt(0) || "U"}
                                </div>

                                <div className="flex-1">
                                    <div className="bg-gray-50 rounded-2xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-gray-700 text-sm">
                                                    {comment?.userName}
                                                </h4>

                                                <span className="text-sm text-gray-400">
                                                    •
                                                </span>

                                                <span className="text-xs text-gray-400">
                                                    {new Date(comment?.createAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <div>
                                              {
                                                comment?.userId === user?.id && 
                                                <div className="flex items-center">
                                                    <CommentUpdate id={comment?._id} comment={comment?.comment} fetchComment={fetchComment}/>
                                                    <CommentDelete id={comment?._id} fetchComment={fetchComment}/>
                                                </div>
                                              }
                                            </div>
                                        </div>

                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {comment?.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    )
};

export default ArtWorkComments;