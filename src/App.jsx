
import './App.css'
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import MainLayout from './components/layout/MainLayout';
import OrdersPage from './pages/OrdersPage';
import ThankYouPage from './pages/ThankYouPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './pages/auth/ProtectedRoute';

function App() {

  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          <Route path="checkout" element={<CheckoutPage/>}/>
        </Route>

        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </>
  )
}

export default App
