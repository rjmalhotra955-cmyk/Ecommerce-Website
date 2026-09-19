import { useSearchParams, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProductGrid } from "../home/ProductsGrid";
import "./SearchPage.css";

export function SearchPage({ loadCart }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    fetchProductData();
  }, []);

  const searchLower = query.toLowerCase();
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchLower),
      )
    );
  });

  return (
    <div className="search-page">
      <div className="search-page-header">
        <h2>
          {filteredProducts.length} results for "{query}"
        </h2>
        <Link to="/" className="back-to-home-link">
          &larr; Back to home
        </Link>
      </div>

      <ProductGrid products={filteredProducts} loadCart={loadCart} />

      {filteredProducts.length === 0 && <p>No products matched your search.</p>}
    </div>
  );
}
