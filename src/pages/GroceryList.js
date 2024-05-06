import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/GroceryList.css";
import NewItemModal from "../components/NewItemModal";
import { API_URL } from "../constants/AppConstants";
import { useAuth } from "../utils/AuthContext";
import GroceryGroupedView from "../components/GroceryGroupedView ";
import { Box, Button } from "@mui/material";
function GroceryList() {
  const [groceryItems, setGroceryItems] = useState([]);
  const { deleteProduct, updateIsDone } = useAuth();
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormContext();

  const groceries = async () => {
    try {
      const encodedEmail = encodeURIComponent(email);

      const url = `${API_URL}/Items/GetProducts?email=${encodedEmail}`;

      const response = await axios.get(url);
      // console.log(response.data);
      setGroceryItems(response.data);
    } catch (error) {
      console.error("Grocery list failed:", error.message);
    }
  };

  const handleDelete = async (productName) => {
    try {
      const response = await deleteProduct(email, productName);
      setGroceryItems(response);
    } catch (error) {
      console.error("Grocery list failed:", error.message);
    }
  };

  const handleUpdate = async (productName) => {
    try {
      const response = await updateIsDone(email, productName);
      setGroceryItems(response);
    } catch (error) {
      console.error("Grocery list failed:", error.message);
    }
  };

  const handleLogOut = async () => {
    localStorage.removeItem("email", email);
    reset();
    navigate("/");
  };
  useEffect(() => {
    groceries();
  }, []);

  return (
    <div className="grocery-list-container">
      <div className="grocery-list">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogOut}
          >
            Log Out
          </Button>
          <NewItemModal
            email={email}
            groceries={groceries}
            className="addButton"
          />
        </Box>

        <GroceryGroupedView
          groceryItems={groceryItems}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}

export default GroceryList;
