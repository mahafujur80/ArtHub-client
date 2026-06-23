import { serverMutation } from "./serverMutation";

export const createPayment = async (data) => {
    const res = await serverMutation("/api/payments", data);
    return res;
}