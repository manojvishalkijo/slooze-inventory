import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If role is not allowed, redirect to their home page or unauthorized
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export const RoleRedirect = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === 'Manager') {
        return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/products" replace />;
};
