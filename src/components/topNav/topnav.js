import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import person from "../../assets/profile.png";
import logo from "../../assets/logo.png";
import Modal from "react-modal";

const Topnav = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogout = () => {
    closeModal(); // Close the modal before logout
    navigate("/");
  };

  return (
    <div>
      <nav
        className="navbar navbar-light "
        style={{ backgroundColor: "#662671" }}
      >
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            width="170"
            height="45"
            className="d-inline-block align-top"
            alt="Profile"
          />
        </a>
    
        <img
          src={person}
          width="50"
          height="40"
          className="d-inline-block align-top"
          alt="Profile"
          onClick={openModal}
          style={{ cursor: "pointer" }}
        />
        
        <button className="btn btn-outline-danger" onClick={openModal}>
          Logout
        </button>
      </nav>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "400px",
            margin: "auto",
            marginTop: "100px",
            border: "1px solid #ccc",
            background: "#fff",
            borderRadius: "12px",
            outline: "none",
            padding: "20px",
            height: "200px",
          },
        }}
      >
        <h2 style={{fontSize:"20px"}}>Are you sure you want to log out?</h2>
        <div style={{ textAlign: "center", marginTop:"30px" }}>
          <button className="btn btn-secondary mr-2" onClick={closeModal}>
            Cancel
          </button>{" "}
          <button className="btn btn-danger" onClick={handleLogout} style={{backgroundColor:"#662671"}}>
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Topnav;
