import { authClient } from "../auth-client";
import { serverFetch } from "../server/action";

export const  getAllUsers = async(role, page=1) => {
   const res = await serverFetch(`/api/admin/users?role=${role}&page=${page}`);
   return res;
}

export const UpdateUserRole = async(userId, role) => {
   const { data, error } = await authClient.admin.setRole({
    userId: userId,
    role: role, // required
});
return { data, error };
}