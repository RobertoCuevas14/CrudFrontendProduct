import axios from 'axios';

const baseUrl = 'https://localhost:44386/api/Product'; // Asegúrate de que la URL coincida con tu API backend

const getAllProducts = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const addProduct = async (product) => {
    const response = await axios.post(baseUrl, product);
    return response.data;
};

const updateProduct = async (id, product) => {
    const response = await axios.put(`${baseUrl}/${id}`, product);
    return response.data;
};

const deleteProduct = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
};

const productService = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};

export default productService;
