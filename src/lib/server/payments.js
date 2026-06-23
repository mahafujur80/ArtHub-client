import { serverMutation } from "./serverMutation";

export const createPayment = async (data) => {
    const res = await serverMutation("/api/payments", data);
    return res;
}

export const createSubscription = async (data) => {
    const res = await serverMutation("/api/subscriptions", data);
    return res;
}