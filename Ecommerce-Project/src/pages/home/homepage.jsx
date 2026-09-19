import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";

import { Header } from "../../components/Header";
import { ProductGrid } from "./ProductsGrid";

export function HomePage({ cart, loadCart }) {
  // fetch("http://localhost:3000/api/products")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      let response = await axios.get("/api/products");
      setProducts(response.data);
    };

    fetchProductData();
  }, []);

  return (
    <>
      <Header cart={cart} />

      <div className="home-page">
        {<ProductGrid products={products} loadCart={loadCart} />}
      </div>
    </>
  );
}
