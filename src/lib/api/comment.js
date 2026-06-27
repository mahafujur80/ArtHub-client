import { serverFetch } from "../server/action";
import { serverDelete, serverMutation } from "../server/serverMutation";

export const getAllComments = async(artworkId)=>{
    const res = await serverFetch(`/api/user/comment?artworkId=${artworkId}`)
    return res;
};

// create a new comment 
export const createComment = async(data, artWorkId)=>{
    const res = await serverMutation(`/api/user/comment?artWorkId=${artWorkId}`, data)
    return res;
};

// get buyer artwork buy proved
export const getArtworkBuyProved = async(artworkId, userId)=>{
    const res = await serverFetch(`/api/user/purchaseProved?artworkId=${artworkId}&userId=${userId}`)
    return res;
}
// delete user own comment
export const deleteComment = async(commentId)=>{
    const res = await serverDelete(`/api/user/comment/`, commentId)
    return res;
}
// update user own comment
export const updateComment = async(data, commentId)=>{
    const res = await serverMutation(`/api/user/comment/${commentId}`, data, "PATCH")
    return res;
}