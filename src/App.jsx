import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchCart } from "./api/api";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCart()
      .then((res) => {
        console.log(res);
        setCart(res);
      })
      .catch((err) => {
        setError(
          err.message || err.response.data.message || "Something went wrong"
        );
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.log(err);
        setError(
          err.message || err.response?.data?.message || "Something Went Wrong"
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div>
        <Navbar cart={cart?.length} />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              error={productError}
              loading={productLoading}
            />
          }
        />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              error={productError}
              loading={productLoading}
            />
          }
        />
        <Route
          path="/products/:id"
          element={<ProductDetail setCart={setCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              loading={loading}
              error={error}
              setCart={setCart}
            />
          }
        />
        <Route path="/contact" element={
          <Contact/>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
