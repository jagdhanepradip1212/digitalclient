import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Topnav from "../topNav/topnav";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [packSize, setPackSize] = useState("");
  const [categories, setCategories] = useState();
  const [categoriesList, setCategoriesList] = useState([]);

  const [mrp, setMRP] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const cancleProduct = () => {
    navigate("/product");
  };

  useEffect(() => {
    // Fetch categories data from the API
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategoriesList(data); // Make sure 'data' is an array
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // console.log(categories);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(); // Create FormData object
      formData.append("productName", productName);
      formData.append("packSize", packSize);
      formData.append("category", categories);
      formData.append("mrp", mrp);
      formData.append("image", image); // Append the image file
      formData.append("status", status);

      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData, // Send FormData instead of JSON
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      } else {
        alert("product added successfully");
      }
      // Reset form fields after successful submission
      setProductName("");
      setPackSize("");
      setCategories("");
      setMRP("");
      setImage(null); // Reset image state
      setStatus("");
      console.log("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };
  // console.log("catttttttttttttttt", categoriesList);
  return (
    <div style={{ flex: 1 }}>
      <Topnav />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div className="container-fluid mt-4" style={{ flex: 1 }}>
          <h2>Add Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </Form.Group>
            <Form.Group controlId="packSize">
              <Form.Label>Pack Size</Form.Label>
              <Form.Control
                type="text"
                value={packSize}
                onChange={(e) => setPackSize(e.target.value)}
                placeholder="Enter pack size"
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
              >
                <option value="">Select category</option>
                {categoriesList?.map((cat) => (
                  <option key={cat._id} value={cat.categoryName}>
                    {cat?.categoryName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="mrp">
              <Form.Label>MRP</Form.Label>
              <Form.Control
                type="text"
                value={mrp}
                onChange={(e) => setMRP(e.target.value)}
                placeholder="Enter MRP"
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Form.Group>

            <div>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                active
                style={{
                  backgroundColor: "#662671",
                  width: "130px",
                  height: "50px",
                  borderRadius: "100px",
                }}
              >
                Save
              </Button>{" "}
              <Button
                variant="secondary"
                size="lg"
                active
                style={{
                  backgroundColor: "#FFFFFF",
                  width: "130px",
                  height: "50px",
                  borderRadius: "100px",
                  color: "#676767",
                }}
                onClick={cancleProduct}
              >
                Cancle
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
