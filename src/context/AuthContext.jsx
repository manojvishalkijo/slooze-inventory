import { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for existing session
        const storedUser = localStorage.getItem('slooze_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const foundUser = USERS.find(u => u.email === email && u.password === password);

        if (foundUser) {
            // Don't store password in session
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('slooze_user', JSON.stringify(userWithoutPassword));
            return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('slooze_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
