import React, { useState, useEffect } from "react";
import axios from "axios";

const TrackedProductList = () => {
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [newTrackedProduct, setNewTrackedProduct] = useState("");

  useEffect(() => {
    fetchTrackedProducts();
  }, []);

  const fetchTrackedProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tracked-products");
      setTrackedProducts(response.data);
    } catch (error) {
      console.error("Error fetching tracked products:", error);
    }
  };

  const handleNewTrackedProductChange = (event) => {
    setNewTrackedProduct(event.target.value);
  };

  const handleAddTrackedProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/add-tracked-product", {
        name: newTrackedProduct,
      });
      const { id } = response.data;
      setTrackedProducts((prevProducts) => [
        ...prevProducts,
        { id, name: newTrackedProduct, tracked: true },
      ]);
      setNewTrackedProduct("");
    } catch (error) {
      console.error("Error adding tracked product:", error);
    }
  };

  const handleToggleTrackedProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:5000/tracked-product/${productId}`);
      setTrackedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, tracked: !product.tracked }
            : product
        )
      );
    } catch (error) {
      console.error("Error toggling tracked product:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Tracked Products</h2>
      <ul style={styles.list}>
        {trackedProducts.map((product) => (
          <li key={product.id} style={styles.listItem}>
            <span style={styles.productName}>{product.name}</span>
            <input
              type="checkbox"
              onChange={() => handleToggleTrackedProduct(product.id)}
              checked={product.tracked}
              style={styles.checkbox}
            />
          </li>
        ))}
      </ul>

      <div style={styles.addProductContainer}>
        <h3 style={styles.addProductHeading}>Add Tracked Product</h3>
        <div style={styles.addProductForm}>
          <input
            type="text"
            value={newTrackedProduct}
            onChange={handleNewTrackedProductChange}
            style={styles.input}
            placeholder="Enter product name"
          />
          <button onClick={handleAddTrackedProduct} style={styles.button}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// Internal styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333333",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  productName: {
    fontSize: "18px",
    color: "#333333",
  },
  checkbox: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
  },
  addProductContainer: {
    marginTop: "30px",
  },
  addProductHeading: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#333333",
    marginBottom: "15px",
  },
  addProductForm: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    padding: "8px 12px",
    width: "80%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    width: "19%",
  },
};

export default TrackedProductList;
