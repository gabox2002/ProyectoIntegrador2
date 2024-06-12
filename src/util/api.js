import axios from "axios";

//console.log(process.env.REACT_APP_BASE_URL_API)
// Configuración para el servidor local
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API
});

// Configuración para la API de MockAPI
// const axiosInstance = axios.create({
//     //baseURL: "https://65fa5bbf3909a9a65b1a4178.mockapi.io/"
//     baseURL: "http://localhost:3001/api/",
// });

export const getProducts = async () => {
    try {
        const resp = await axiosInstance.get("/products");
        if (resp.data && Array.isArray(resp.data.products)) {
            return resp.data.products;
        } else {
            throw new Error("La respuesta de la API no tiene el formato esperado.");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const postMessage = async (body) => {
    try {
        const resp = await axiosInstance.post("/messages", body);
        return resp.data;
    } catch (error) {
        throw new Error("Error al enviar el mensaje:", error);
    }
};

export const postProducts = async (body) => {
    try {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const resp = await axiosInstance.post("/products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return resp.data;
    } catch (error) {
        throw new Error("Error al enviar el producto:", error);
    }
};

// export const postProducts = async (body) => {
//     try {
//         const formData = new FormData();
//         Object.entries(body).forEach(([key, value]) => {
//             if (key.startsWith('img') && value instanceof File) {
//                 formData.append(key, value);
//             } else {
//                 formData.append(key, value);
//             }
//         });

//         const resp = await axiosInstance.post("/products", formData, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         });
//         return resp.data;
//     } catch (error) {
//         console.error(error); // Esto te dará más detalles del error en la consola del navegador
//         throw new Error("Error al enviar el producto:", error.message);
//     }
// };

// Función para crear un nuevo carrito
export const postCart = async (body) => {
    try {
        const resp = await axiosInstance.post("/cart", { items: body });
        return resp.data;
    } catch (error) {
        console.error("Error creating cart:", error);
        throw new Error("Error al crear el carrito.");
    }
};
// export const postCart = async (body) => {
//     const resp = await axiosInstance.post("/cart", { items: body });
//     return resp.data;
// };

// Función para editar un carrito existente
export const editCart = async (id, body) => {
    
    const resp = await axiosInstance.put(`/cart/edit/${id}`, { items: body });
    return resp.data;
};

// Función para obtener un carrito por ID
export const getCart = async (id) => {
    try {
        const resp = await axiosInstance.get(`/cart/get/${id}`);
        return resp.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw new Error("Error al obtener el carrito.");
    }
};

export const postPreferenceMP = async (body) => {
    const resp = await axiosInstance.post(`checkout`, body);
    return resp.data;
};
