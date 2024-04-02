import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function DeleteUser() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/viewuser/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      setData({}); // Update local state to empty object after successful deletion
      Swal.fire({
        icon: "success",
        title: "Delete Successful",
        text: "Redirecting...",
      }).then(() => {
        navigate("/getuser");
      }); // Redirect to the home page or any other page after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Delete failed",
        
      });
    }
  };

  return (
    <div className="ctn">
      <div className="title">
        <h1>Delete User</h1>
      </div>

      {Object.keys(data).length ? (
        <div
          className="userctn"
          style={{
            border: "2px solid black",
            width: "300px",
            margin: "auto",
            padding: "10px",
          }}
        >
          <div style={{ borderBottom: "1px solid black", padding: "10px" }}>
            User-details
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <div>name: {data.name} </div>
            <div>email: {data.email}</div>
            <div>ph.number: {data.phonenumber}</div>
            <div>pincode: {data.pincode}</div>
            <div>Address: {data.Address}</div>
            <div>
              <button onClick={handleDelete}>delete user</button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
}

export default DeleteUser;
