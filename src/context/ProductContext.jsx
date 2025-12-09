import { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/mockData';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        // Initialize from localStorage or fallback to mock data
        const saved = localStorage.getItem('slooze_products');
        return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    });

    // Sync to localStorage whenever products change
    useEffect(() => {
        localStorage.setItem('slooze_products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Math.random().toString(36).substr(2, 9), // Simple ID generation
            // Ensure numeric values are stored as numbers
            price: parseFloat(product.price),
            stock: parseInt(product.stock, 10)
        };
        setProducts(prev => [...prev, newProduct]);
    };

    const updateProduct = (id, updatedFields) => {
        setProducts(prev => prev.map(p => {
            if (p.id === id) {
                return {
                    ...p,
                    ...updatedFields,
                    // specific type casting if these fields are present
                    price: updatedFields.price ? parseFloat(updatedFields.price) : p.price,
                    stock: updatedFields.stock ? parseInt(updatedFields.stock, 10) : p.stock
                };
            }
            return p;
        }));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
