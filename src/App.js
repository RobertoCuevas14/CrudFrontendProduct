import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import productService from './services/productService';

function App() {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false); // Para forzar actualizaciones

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await productService.getAllProducts();
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        
        fetchProducts();
    }, [refresh]); // Cada vez que 'refresh' cambie, se vuelve a llamar a fetchProducts

    const handleProductAdded = () => {
        setRefresh(prev => !prev); // Forzar actualización de productos
    };

    const handleProductEdit = () => {
        setRefresh(prev => !prev); // Forzar actualización tras editar
    };

    const handleProductDelete = async (id) => {
        try {
            await productService.deleteProduct(id);
            setRefresh(prev => !prev); // Forzar actualización tras eliminar
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <ProductForm onProductAdded={handleProductAdded} />
            <ProductList products={products} onDelete={handleProductDelete} onEdit={handleProductEdit} />
        </div>
    );
}

export default App;
