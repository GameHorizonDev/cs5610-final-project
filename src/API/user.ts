import { SERVER_BASE_URL, APP_AXIOS } from "./apiConfig";

const getCurrUserId = async () => {
    try {
        const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/user/getCurrId`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user id:", error);
        return undefined;
    }
};

export { getCurrUserId };