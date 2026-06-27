'use client';

import { updateComment } from '@/lib/api/comment';
import { Button, Input, Modal, Surface, TextField } from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdEdit, MdUpdate } from 'react-icons/md';

const CommentUpdate = ({id, comment, fetchComment}) => {

    const [inputValue, setInputValue] = useState(comment);
    const handleUpdate = async (e) => {
        e.preventDefault();
        const commentData = e.target.comment.value;
        const res = await updateComment({comment: commentData}, id)
        if (res.success) {
            toast.success(res.message)
            e.target.reset()
            await fetchComment()
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div>
            <Modal>
                <Button variant="ghost" className='text-orange-500 hover:text-orange-600 !px-2'>
                    <MdEdit className="size-5" />
                </Button>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger />
                            <Modal.Icon className="bg-orange-500 text-white">
                                <MdUpdate className="size-5" />
                            </Modal.Icon>
                            <Modal.Body className="p-6">
                                <Surface variant="default">
                                    <form onSubmit={handleUpdate} className="flex flex-col gap-4">

                                            <label htmlFor='comment' className='text-sm font-medium text-gray-700'>Update Your Comment</label>
                                            <input value={inputValue} 
                                            onChange={(e)=>setInputValue(e.target.value)}
                                            id='comment' 
                                            className='border border-orange-400 p-4 rounded-xl focus:outline-orange-500 '
                                            type='text' name="comment" 
                                            placeholder="Enter Your Update Comment" />

                                        <Modal.Footer>
                                            <Button slot="close" variant="danger-soft">
                                                Cancel
                                            </Button>
                                            <Button type='submit' slot="close" className="bg-orange-500 text-white font-medium" >Post</Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default CommentUpdate;