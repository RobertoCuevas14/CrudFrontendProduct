import React, {  useState } from 'react';
import productService from '../../services/productService';

const ProductForm = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [cargo, setCargo] = useState('');
    const [carnet, setCarnet] = useState('');
    
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newProduct = {
            name,
            lastname,
            carnet: parseFloat(carnet),
            cargo: [
                {
                    cargo: cargo
                }
            ]
        };

        try {
            await productService.addProduct(newProduct);
            onProductAdded(); // Trigger refresh
            setName('');
            setLastname('')
            setCargo('');
            setCarnet('');
           
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
   
    
    return (
        <div className="container">
            <h2 className="my-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="productName" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">lastname:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="productName" 
                        value={lastname} 
                        onChange={e => setLastname(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Carnet:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="productPrice" 
                        value={carnet} 
                        onChange={e => setCarnet(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">Cargo:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="productDescription" 
                        value={cargo} 
                        onChange={e => setCargo(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
                
            </form>
        </div>
    );
};

export default ProductForm;
