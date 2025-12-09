import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { ArrowLeft, Save } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { INITIAL_PRODUCTS } from '../../data/mockData';

export const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { products, addProduct, updateProduct } = useProducts();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        status: 'In Stock'
    });

    useEffect(() => {
        // Load data from context
        if (isEditMode) {
            const product = products.find(p => p.id === id);
            if (product) {
                setFormData({
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    status: product.status
                });
            }
        }
    }, [id, isEditMode, products]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditMode) {
                updateProduct(id, formData);
            } else {
                addProduct(formData);
            }
            navigate('/products');
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    if (user?.role !== 'Manager') {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Unauthorized Access</h2>
                <p className="mt-2 text-gray-500">You do not have permission to view this page.</p>
                <Button className="mt-4" onClick={() => navigate('/products')}>
                    Back to Products
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="p-2" onClick={() => navigate('/products')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isEditMode ? 'Edit Product' : 'Add New Product'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {isEditMode ? 'Update existing inventory item' : 'Create a new item in your inventory'}
                    </p>
                </div>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Product Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Premium Coffee Beans"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Category"
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g., Beverages"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Status
                                </label>
                                <select
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="In Stock">In Stock</option>
                                    <option value="Low Stock">Low Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Price (₹)"
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                            <Input
                                label="Stock Quantity"
                                type="number"
                                min="0"
                                required
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <Button type="button" variant="secondary" onClick={() => navigate('/products')}>
                                Cancel
                            </Button>
                            <Button type="submit" className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Save Product
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
