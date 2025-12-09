import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Package, Lock, Mail } from 'lucide-react';

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                navigate(from, { replace: true });
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="bg-blue-600 p-3 rounded-2xl">
                        <Package className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Slooze
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Commodities Management System
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email address"
                            type="email"
                            required
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            icon={<Mail className="h-5 w-5 text-gray-400" />}
                        />

                        <Input
                            label="Password"
                            type="password"
                            required
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            icon={<Lock className="h-5 w-5 text-gray-400" />}
                        />

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-3 text-sm text-red-600 dark:text-red-400">
                                {error}
                            </div>
                        )}

                        <div>
                            <Button
                                type="submit"
                                className="w-full flex justify-center"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                                    Demo Credentials
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className="text-xs text-center p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                                <p className="font-semibold text-gray-900 dark:text-white">Manager</p>
                                <p className="text-gray-600 dark:text-gray-400">manager@slooze.com</p>
                                <p className="text-gray-500 dark:text-gray-500">password123</p>
                            </div>
                            <div className="text-xs text-center p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                                <p className="font-semibold text-gray-900 dark:text-white">Store Keeper</p>
                                <p className="text-gray-600 dark:text-gray-400">keeper@slooze.com</p>
                                <p className="text-gray-500 dark:text-gray-500">password123</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
