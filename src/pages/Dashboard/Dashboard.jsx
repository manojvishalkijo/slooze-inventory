import { useMemo } from 'react';
import {
    TrendingUp,
    AlertTriangle,
    Package,
    Tags,
    ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { cn } from '../../utils/cn';
import { useProducts } from '../../context/ProductContext';

export const Dashboard = () => {
    const { products } = useProducts();

    const stats = useMemo(() => {
        const totalProducts = products.length;
        const categories = new Set(products.map(p => p.category)).size;
        const lowStock = products.filter(p => p.stock < 20 && p.stock > 0).length;
        const outOfStock = products.filter(p => p.stock === 0).length;
        const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);

        return { totalProducts, categories, lowStock, outOfStock, totalValue };
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={Package}
                    trend="+12%"
                    color="blue"
                />
                <StatsCard
                    title="Total Categories"
                    value={stats.categories}
                    icon={Tags}
                    trend="Active"
                    color="purple"
                />
                <StatsCard
                    title="Low Stock Alerts"
                    value={stats.lowStock}
                    icon={AlertTriangle}
                    trend="Action Needed"
                    color="yellow"
                />
                <StatsCard
                    title="Portfolio Value"
                    value={`₹${stats.totalValue.toLocaleString('en-IN')}`}
                    icon={TrendingUp}
                    trend="+5.4%"
                    color="green"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="h-96">
                    <CardHeader>
                        <CardTitle>Inventory Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse" />
                            <p>Chart Component Placeholder</p>
                            <p className="text-sm opacity-60">Visualizations disabled in lightweight mode</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="h-96">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Stock updated for "Coffee Beans"</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const StatsCard = ({ title, value, icon: Icon, trend, color }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
        purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
        yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
        green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className={cn("p-3 rounded-lg", colors[color])}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <span className={cn(
                        "text-xs font-medium px-2.5 py-0.5 rounded-full",
                        color === 'red' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    )}>
                        {trend}
                    </span>
                </div>
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
                </div>
            </CardContent>
        </Card>
    );
};
