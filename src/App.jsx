import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import { Login } from './pages/Login/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Products } from './pages/Products/Products';
import { ProductForm } from './pages/Products/ProductForm';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute, RoleRedirect } from './routes/ProtectedRoutes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* Root redirect based on role */}
              <Route path="/" element={<RoleRedirect />} />

              <Route element={<DashboardLayout />}>
                {/* Manager Only Routes */}
                <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products/new" element={<ProductForm />} />
                  <Route path="/products/:id/edit" element={<ProductForm />} />
                </Route>

                {/* Shared Routes (Both Manager and StoreKeeper) */}
                <Route element={<ProtectedRoute allowedRoles={['Manager', 'StoreKeeper']} />}>
                  <Route path="/products" element={<Products />} />
                </Route>
              </Route>

              {/* Catch all - redirect to home which handles role logic */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
