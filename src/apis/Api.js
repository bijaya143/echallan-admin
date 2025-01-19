import axios from "axios";

// Create an axios instance
const Api = axios.create({
  baseURL:
    process.env["REACT_APP_BACKEND_BASE_URL"] || "http://localhost:3001/",
  withCredentials: true,
});

// Function to get headers, including authorization if available
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };
};

// Add a response interceptor to handle errors globally
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors (e.g., show toast notifications, redirect on 401, etc.)
    return Promise.reject(error);
  }
);

// ** ==================== Authentication API ======================== ** //
export const loginUserApi = (data) => Api.post("/auth/login", data);
export const registerUserApi = (data) => Api.post("/auth/register", data);
export const oauthApi = (data) => Api.post("/auth/oauth", data);

// ** ==================== Tickets API ======================== ** //
export const getTopArtistsApi = () => Api.get("/artist", getHeaders());
export const getArtistsApi = () => Api.get("/artist", getHeaders());
export const getArtistApi = (id) => Api.get(`/artist/${id}`, getHeaders());
export const increaseArtistStreamCountApi = (id, keyword) =>
  Api.patch(
    `/artist/stream-count/${id}?keyword=${keyword}`,
    undefined,
    getHeaders()
  );


  
// ** ==================== Admins API ======================== ** //
export const getCustomersApi = () => Api.get(`/user`, getHeaders());

// Tickets
export const getTicketsApi = () =>
  Api.get(`/ticket`, getHeaders());