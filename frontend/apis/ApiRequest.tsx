import React from "react";
import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL from your environment variables
  withCredentials: true, // Send cookies with requests if needed
  headers: {
    "Content-Type": "application/json",
  },
});
const getApi = async (endpoint: string, config?: AxiosRequestConfig) => {
  try {
    const response = await apiClient.get(endpoint, config);
    return response;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export { getApi };
