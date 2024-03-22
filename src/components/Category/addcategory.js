import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import Topnav from "../topNav/topnav";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Addcategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const cancleCategory = () => {
        navigate("/category");
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = {};
        if (!categoryName) {
            errors.categoryName = 'Category Name is required';
        }

        if (!description) {
            errors.description = 'Description is required';
        }
        if (!status) {
            errors.status = 'Status is required';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // Prepare the data to be sent to the backend
        const formData = {
            categoryName,
            description,
            status
        };

        try {
            // Send a POST request to the backend API
            const response = await fetch('http://localhost:5000/addcategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add category');
            }else{
                alert("category added successfully");
                navigate("/category");

            }

            // Reset form fields after successful submission
            setCategoryName('');
            setDescription('');
            setStatus('');

            // Optionally, you can navigate to another page after adding the category
            // Replace '/categories' with the appropriate route
            // history.push('/categories');
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    return (
        <div  style={{flex : 1}}>
            
             <Topnav />
             <div style={{ display: "flex", flex: 1 }}>

            <Sidebar />
            <div className="container-fluid mt-4" style={{ flex: 1 }}>

            <h2>Add Category</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="categoryName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        isInvalid={!!errors.categoryName}

                    />
                     <Form.Control.Feedback type="invalid">
                                {errors.categoryName}
                            </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        isInvalid={!!errors.description}

                    />
                    <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        isInvalid={!!errors.status}

                    >
                        <option value="">Select status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                                {errors.status}
                            </Form.Control.Feedback>
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

      <Button variant="secondary" size="lg" active   style={{
    backgroundColor: "#FFFFFF",
    width: "130px",
    height: "50px",
    borderRadius: "100px",
    color:"#676767",
  }}   onClick={cancleCategory}  
  >
        Cancle
      </Button>
      </div>
            </Form>
            </div>
            </div>

        </div>
    );
}

export default Addcategory;
