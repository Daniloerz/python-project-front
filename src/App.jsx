// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProductsList from './pages/Products/ProductsList';
import CatalogView from './pages/Catalog/CatalogView';
import SalesReport from './pages/Sales/SalesReport';
import ReservationsList from './pages/Reservations/ReservationsList';
import ReportsView from './pages/Reports/SalesReport';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CreditAccountForm from './pages/CreditAccounts/CreditAccountForm'
import CreditAccountsList from './pages/CreditAccounts/CreditAccountsList'
import CreditPurchaseForm from './pages/CreditAccounts/CreditPurchaseForm'

// Componente ProtectedRoute para verificar autenticación
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      {/* Ruta de Login, no requiere autenticación */}
      <Route path="/login" element={<Login />} />

      {/* Ruta protegida envuelta en ProtectedRoute */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Rutas principales dentro de MainLayout */}
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="catalog" element={<CatalogView />} />
        <Route path="sales" element={<SalesReport />} />
        <Route path="credit" element={<CreditAccountForm />} />
        <Route path="credit/accounts" element={<CreditAccountsList />} />
        <Route path="credit/purchase" element={<CreditPurchaseForm />} />
        <Route path="reservations" element={<ReservationsList />} />
        <Route path="reports" element={<ReportsView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
