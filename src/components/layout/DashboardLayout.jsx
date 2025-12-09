import { useRef, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
    LayoutDashboard,
    Package,
    LogOut,
    Moon,
    Sun,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        {
            to: '/dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            roles: ['Manager'],
        },
        {
            to: '/products',
            label: 'Products',
            icon: Package,
            roles: ['Manager', 'StoreKeeper'],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 lg:flex">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-500">
                    <Package className="h-6 w-6" />
                    <span>Slooze</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-20 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Package className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Slooze</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Inventory Manager</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4">
                    {navItems.map((item) => (
                        item.roles.includes(user?.role) && (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                                <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
                            </NavLink>
                        )
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={toggleTheme}
                            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-colors"
                        >
                            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                            {theme === 'light' ? 'Dark' : 'Light'}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-gray-600 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
