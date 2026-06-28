
import { serverFetch } from "../server/action";
import { serverDelete, serverMutation } from "../server/serverMutation";

//get all users
export const  getAllUsers = async(role, page=1) => {
   const res = await serverFetch(`/api/admin/users?role=${role}&page=${page}`);
   return res;
}


// admin update user role 
export const updateUserRole = async(userId, role)=>{
    const res = await serverMutation(`/api/admin/users?userId=${userId}`, role, 'PATCH');
    return res;
}

// get all transactions 
export const getAllTransactions = async(role, page=1) => {
    const res = await serverFetch(`/api/admin/transactions?role=${role}&page=${page}`);
    return res;
}

// admin get all artworks 
export const getAllArtworksAdmin = async(role, page=1) => {
    const res = await serverFetch(`/api/admin/artworks?role=${role}&page=${page}`);
    return res;
}

// admin delete artwork by id
export const deleteArtworkAdmin = async(id) => {
    const res = await serverDelete(`/api/admin/artwork/`, id);
    return res;
}

// admin get pie chart data
export const getPieChartData = async() => {
    const res = await serverFetch("/api/admin/pie");
    return res;
}

// admin get all sold artworks 
export const getAllSoldArtworks = async() => {
    const res = await serverFetch("/api/admin/sold");
    return res;
}

// admin get all revenue of payments 
export const getAllRevenue = async() => {
    const res = await serverFetch("/api/admin/payments");
    return res;
}