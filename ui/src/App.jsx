import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MenuPage } from './pages/MenuPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { AdminFoodsPage } from './pages/AdminFoodsPage';
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/menu" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/menu" element={<MenuPage />} />

            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />

            <Route path="/admin/foods" element={<ProtectedRoute requiredRole="admin"><AdminFoodsPage /></ProtectedRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
export default App; 
