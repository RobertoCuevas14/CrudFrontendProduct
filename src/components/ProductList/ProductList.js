import React, { useState } from 'react';
// import productService from '../../services/productService';
import { useTable } from 'react-table';
import ProductListItem from './ProductListItem';
// import ProductForm from '../ProductForm/ProductForm';

const ProductList = ({ products, onDelete, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.carnet.toString().includes(searchTerm.toLowerCase()) ||
        (product.cargo[0]?.cargo || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = React.useMemo(
        () => [
            { Header: 'Name', accessor: 'name' },
            { Header: 'Last Name', accessor: 'lastName' },
            { Header: 'Carnet', accessor: 'carnet' },
            { Header: 'Cargo', accessor: row => row.cargo[0]?.cargo },
            { Header: 'Actions', accessor: 'actions' }
        ],
        []
    );

    const data = React.useMemo(() => filteredProducts, [filteredProducts]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    return (
        <div className="container">
            <h2 className="my-4">Product List</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <table {...getTableProps()} className="table table-striped">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <ProductListItem
                                key={row.original.id}
                                product={row.original}
                                onDelete={() => onDelete(row.original.id)}
                                onEdit={onEdit}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
