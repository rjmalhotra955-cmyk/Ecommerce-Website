import axios from "axios";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/homepage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/Order/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    let response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route
        path="orders"
        element={<OrdersPage cart={cart} loadCart={loadCart} />}
      />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
      <Route
        path="/search"
        element={<SearchPage cart={cart} loadCart={loadCart} />}
      />
    </Routes>
  );
}

export default App;
