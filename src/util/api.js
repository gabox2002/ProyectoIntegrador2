import axios from "axios";

// Configuración para el servidor local
// const axiosInstance = axios.create({
  
//   baseURL: process.env.REACT_APP_BASE_URL_API
// });
// console.log(process.env.REACT_APP_BASE_URL_API)

// Configuración para la API de MockAPI
const axiosInstance = axios.create({
  baseURL: "https://65fa5bbf3909a9a65b1a4178.mockapi.io/"
});

export const getProducts = async () => {
  try {
    const resp = await axiosInstance.get("/products");
    //console.log("API response data:", resp.data); // Añadido para depuración

    return resp.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const postMessage = async body => {
  try {
    const resp = await axiosInstance.post("/messages", body);
    return resp.data;
  } catch (error) {
    throw new Error('Error al enviar el mensaje:', error);
  }
};

export const postProducts = async body => {
  try {
    const resp = await axiosInstance.post("/products", body);
    return resp.data;
  } catch (error) {
    throw new Error('Error al enviar el producto:', error);
  }
};
