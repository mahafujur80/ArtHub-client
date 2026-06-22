
import { serverDelete, serverMutation } from "./serverMutation";

export const createArtwork = async (data) => {
 const res = await serverMutation("/api/artists", data);
 return res;
};

export const deleteArtwork = async (id) => {
 const res = await serverDelete("/api/artwork/", id);
 return res;
};

export const updateArtwork = async (id, data) => {
    const res = await serverMutation(`/api/artwork/${id}`, data, 'PATCH');
    return res;
}

