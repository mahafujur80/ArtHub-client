import { serverFetch } from "../server/action";
import { serverMutation } from "../server/serverMutation";

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