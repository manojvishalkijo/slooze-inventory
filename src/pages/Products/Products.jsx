import { useState, useMemo } from 'react';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Card } from '../../components/common/Card';
import { useProducts } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
    const { user } = useAuth();
    const { products, deleteProduct } = useProducts();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.category.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === 'All' || p.category === filter;
            return matchesSearch && matchesFilter;
        });
    }, [products, search, filter]);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your inventory items</p>
                </div>

                {user?.role === 'Manager' && (
                    <Button
                        className="flex items-center gap-2"
                        onClick={() => navigate('/products/new')}
                    >
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Button>
                )}
            </div>

            <Card className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search products..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-gray-400" />
                        <select
                            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            {categories.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </Card>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Product Name</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                {user?.role === 'Manager' && (
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                                        ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                        {product.stock} units
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={product.status} />
                                    </td>
                                    {user?.role === 'Manager' && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-blue-600 transition-colors"
                                                    onClick={() => navigate(`/products/${product.id}/edit`)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 hover:text-red-600 transition-colors"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this product?')) {
                                                            deleteProduct(product.id);
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        No products found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        'In Stock': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        'Low Stock': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        'Out of Stock': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
            {status}
        </span>
    );
};
