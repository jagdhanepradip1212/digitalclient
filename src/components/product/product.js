import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topnav from "../topNav/topnav";
import "../product/product.css";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const serverUrl = "http://localhost:5000";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products"); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered products with all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProduct = () => {
    navigate("/addproduct");
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredProducts = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filteredProducts);
  };

  const handleDelete = async (productId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      const response = await fetch(
        `http://localhost:5000/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      // Remove the deleted product from the state
      setProducts(products.filter((product) => product._id !== productId));
      setFilteredProducts(
        filteredProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  

  return (
    <div style={{ flex: 1 }}>
      <Topnav />

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <div className="container-fluid mt-4" style={{ flex: 1 }}>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Products</h1>
            <Button variant="primary" onClick={handleProduct} style={{backgroundColor:"#662671"}}>
              Add Product
            </Button>
          </div>

          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mt-3"
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Pack Size</th>
                <th>Category</th>
                <th>MRP</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  <td>{product.packSize}</td>
                  <td>{product.category}</td>
                  <td>{product.mrp}</td>
                  <td>
                    <img
                      src={`${serverUrl}/${product.image}`}
                      alt={product.productName}
                      style={{ maxWidth: "100px" }}
                    />
                  </td>
                  <td>{product.status}</td>
                  <td>
                    <Button variant="info" size="sm" className="mr-2">
                      <BsPencilSquare />
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Product;
