import { deleteComment } from '@/lib/api/comment';
import { AlertDialog, Button } from '@heroui/react';
import React from 'react';
import toast from 'react-hot-toast';
import { IoTrashOutline } from 'react-icons/io5';

const CommentDelete = ({id, fetchComment}) => {

    const handleDelete = async (commentId) =>{
        const res = await deleteComment(commentId)
        if(res.success){
            toast.success(res.message);
            await fetchComment()
        }
        else{
            toast.error(res.message)
        }
    }

    return (
        <AlertDialog>
            <Button variant="ghost" className="text-red-400" >
                <IoTrashOutline />
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete your Comment permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This comment will be deleted permanently. This action cannot be undone.
                                 Are you sure you want to continue?
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Keep
                            </Button>
                            <Button onClick={()=>handleDelete(id)} slot="close" variant="danger" >
                                Delete Comment
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default CommentDelete;