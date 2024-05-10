import axios from "axios";

// Configuración para el servidor local
const localAxiosInstance = axios.create({
  baseURL: "http://localhost:3000/"
});

// Configuración para la API de MockAPI
const mockApiAxiosInstance = axios.create({
  baseURL: "https://65fa5bbf3909a9a65b1a4178.mockapi.io/"
});

export const getProducts = async () => {
  const resp = await mockApiAxiosInstance.get("/products");
  return resp.data;
};

export const postMessage = async body => {
  try {
    const resp = await mockApiAxiosInstance.post("/messages", body);
    return resp.data;
  } catch (error) {
    throw new Error('Error al enviar el mensaje:', error);
  }
};

export const postProducts = async body => {
  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  const resp = await mockApiAxiosInstance.post("/products", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return resp.data;
};

export const getProductById = async id => {
  const resp = await mockApiAxiosInstance.get(`/products/${id}`);
  return resp.data;
};

export default localAxiosInstance; // Exporta la instancia de Axios para el servidor local
