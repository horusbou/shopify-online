import {  Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import ProductList from './ProductList'
import styled from 'styled-components'
import Product from './Product'
import CheckoutPage from './Checkout'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import Orders from './Orders'
import SellerPage from './SellerPage'
import ProductPage from './admin/ProductPage'
import AdminSellerPage from './admin/SellerPage'
import SellerDetailsPage from './admin/SellerDetailsPage'
import ProductsPage from './admin/Products'
import EditProductPage from './admin/EditProduct'
import AboutUsPage from './AboutUsPage'
import CategoriesPage from './admin/CategoriesPage'
import ProductsByCategoryPage from './admin/ProductsByCategoryPage'

const Home = () => {

    return (
        <PageWrapper>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/category/:cat_id" element={<ProductList />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/orders' element={ <Orders /> } />
            <Route path='/seller' element={ <SellerPage /> } />
            <Route path="/admin/add_product" element={ <ProductPage />} />
            <Route path="/admin/products" element={ <ProductsPage />} />
            <Route path="/admin/products/edit/:id" element={ <EditProductPage />} />
            <Route path="/admin/sellers" element={ <AdminSellerPage />} />
            <Route path="/admin/sellers/:id" element={<SellerDetailsPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/categories/:categoryId/products" element={<ProductsByCategoryPage />} />
            </Routes>
        </PageWrapper>
    )
  }
  
  const PageWrapper = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 4rem 0; /* Adjust padding as needed for your pages */
`;

  export default Home