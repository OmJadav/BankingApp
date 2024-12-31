import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

const getApi = async (url: string) => {
  try {
    const response = await axios.get(`${baseUrl}/${url}`, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
const postApi = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${baseUrl}/${url}`, data, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export { getApi, postApi };
