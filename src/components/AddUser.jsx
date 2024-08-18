import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const usernameRef = useRef(null);
  const navigate = useNavigate();
  const[error,setError]=useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;

    try {
      const response = await fetch("https://leetcode-vxyr.onrender.com/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        usernameRef.current.value = "";
        navigate("/");
      } else {
        setError("ID is already taken");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="table-heading">Enter Username</h1>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Leetcode Username"
          ref={usernameRef}
        />
        <label htmlFor="floatingInput">Leetcode Username</label>
      </div>
      <button className="btn btn-primary w-100 py-2" type="submit">
        Add
      </button>
      {error && <h6 className="error-message">Username is already taken</h6>}
    </form>
  );
};

export default AddUser;
