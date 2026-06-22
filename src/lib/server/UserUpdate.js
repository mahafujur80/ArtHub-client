import { authClient } from "../auth-client"

export const updateUser = async (data) => {
    const res = await authClient.updateUser({
    image: data.image,
    name: data.name,
})
return res
}


// update user password
export const updatePassword = async (passwordData) => {
    const { data, error } = await authClient.changePassword({
    newPassword: passwordData?.newPassword, // required
    currentPassword: passwordData?.currentPassword, // required
    revokeOtherSessions: true,
});

return { data, error };
}