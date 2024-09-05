import React, { useState } from 'react';
import productService from '../../services/productService';


const ProductListItem = ({ product, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedLastName, setEditedLastName] = useState(product.lastName);
    const [editedCarnet, setEditedCarnet] = useState(product.carnet);
    const [editedCargo, setEditedCargo] = useState(product.cargo[0]?.cargo || '');

    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = async () => {
        const editedProduct = {
            ...product,
            name: editedName,
            lastName: editedLastName,
            carnet: parseFloat(editedCarnet),
            cargo: [{ id: product.cargo[0]?.id || 0, cargo: editedCargo, productId: product.id }]
        };

        try {
            await productService.updateProduct(product.id, editedProduct);
            setIsEditing(false);
            onEdit(); // Llama a la función onEdit para actualizar la lista
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedName(product.name);
        setEditedLastName(product.lastName);
        setEditedCarnet(product.carnet);
        setEditedCargo(product.cargo[0]?.cargo || '');
    };

    return (
        <tr>
            {isEditing ? (
                <>
                    <td><input type="text" className="form-control" value={editedName} onChange={(e) => setEditedName(e.target.value)} required /></td>
                    <td><input type="text" className="form-control" value={editedLastName} onChange={(e) => setEditedLastName(e.target.value)} required /></td>
                    <td><input type="number" className="form-control" value={editedCarnet} onChange={(e) => setEditedCarnet(e.target.value)} required /></td>
                    <td><input type="text" className="form-control" value={editedCargo} onChange={(e) => setEditedCargo(e.target.value)} required /></td>
                    <td>
                        <button className="btn btn-success me-2" onClick={handleSaveClick}>Save</button>
                        <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                    </td>
                </>
            ) : (
                <>
                    <td>{product.name}</td>
                    <td>{product.lastName}</td>
                    <td>{product.carnet}</td>
                    <td>{product.cargo[0]?.cargo}</td>
                    <td>
                        <button className="btn btn-primary me-2" onClick={handleEditClick}>Edit</button>
                        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
                    </td>
                </>
            )}
        </tr>
    );
};

export default ProductListItem;
