import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://65fa5bbf3909a9a65b1a4178.mockapi.io/api/"
})

export const getProducts = async () => {
    const resp = await axiosInstance.get("/products")
    return resp.data;
}

export const postMessage = async body => {
    const resp = await axiosInstance.post("/messages", body)
    return resp.data;
} 
export const postFormData = async formData => {
    const resp = await axiosInstance.post("/products", formData); 
    return resp.data;
}
export default axiosInstance; 
