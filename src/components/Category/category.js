import React, { useState, useEffect } from "react";
import { Form, Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topnav from "../topNav/topnav";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch categories data from the API
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories"); // Corrected endpoint for categories
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddNew = () => {
    navigate("/addcategory");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categories.filter((category) => {
    return (
      category.categoryName &&
      category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleEdit = async (categoryId) => {
    try {
      // Find the category by ID
      const categoryToEdit = categories.find(
        (category) => category._id === categoryId
      );

      // Check if the category exists
      if (!categoryToEdit) {
        console.error("Category not found");
        return;
      }

      // Update the status to "Active" if it's currently "Inactive", otherwise keep it unchanged
      const newStatus =
        categoryToEdit.status === "Inactive" ? "Active" : categoryToEdit.status;

      // Make the API call to update the category status
      const response = await fetch(
        `http://localhost:5000/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      // Check if the update was successful
      if (!response.ok) {
        throw new Error("Failed to update category status");
      }

      // Update the category in the local state
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId
            ? { ...category, status: newStatus }
            : category
        )
      );
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      // Find the category by ID
      const categoryToDelete = categories.find(
        (category) => category._id === categoryId
      );

      // Check if the category exists
      if (!categoryToDelete) {
        console.error("Category not found");
        return;
      }

      // Update the status to "Inactive" if it's currently "Active", otherwise keep it unchanged
      const newStatus =
        categoryToDelete.status === "Active"
          ? "Inactive"
          : categoryToDelete.status;

      // Make the API call to update the category status
      const response = await fetch(
        `http://localhost:5000/categories/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      // Check if the update was successful
      if (!response.ok) {
        throw new Error("Failed to update category status");
      }

      // Update the category in the local state
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId
            ? { ...category, status: newStatus }
            : category
        )
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <Topnav />

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div className="container-fluid mt-4" style={{ flex: 1 }}>
          <div className="d-flex justify-content-between align-items-center">
            <h1>All categories</h1>
            <Button variant="primary" onClick={handleAddNew} style={{backgroundColor:"#662671"}}>
                  Add New
                </Button>
                </div>

                <Form.Control
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="mt-3"

                />
          
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id}>
                    <td>
                      {category && category.categoryName
                        ? category.categoryName.toLowerCase()
                        : ""}
                    </td>
                    <td>
                      {category && category.description
                        ? category.description
                        : ""}
                    </td>
                    <td
                      style={{
                        color:
                          category.status === "Active" ? "#2DA323" : "#B13129",
                      }}
                    >
                      {category && category.status ? category.status : ""}
                    </td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="mr-2"
                        onClick={() => handleEdit(category._id)}
                      >
                        <BsPencilSquare /> {/* Edit icon */}
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(category._id)}
                        disabled={category.status === "Inactive"}
                      >
                        <BsTrash /> {/* Delete icon */}
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

export default Category;
