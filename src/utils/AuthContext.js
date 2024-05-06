import { createContext, useState, useContext } from "react";
import { API_URL } from "../constants/AppConstants";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // Function to log in a user using provided email and password
  const loginUser = async (data) => {
    // console.log(data);
    setLoading(true);

    try {
      const encodedEmail = encodeURIComponent(data.email);
      const encodedPassword = encodeURIComponent(data.password);

      const url = `${API_URL}/Users/CheckAccount?email=${encodedEmail}&password=${encodedPassword}`;

      const response = await axios.post(`${url}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // console.log(response.data);
      setAuthenticated(response.data);
    } catch (error) {
      console.error("Login failed:", error.message);
    }

    setLoading(false);
  };

  // Function to register a new user with provided email and password
  const registerUser = async (data) => {
    console.log(data);
    try {
      const encodedEmail = encodeURIComponent(data.registeredEmail);
      const encodedPassword = encodeURIComponent(data.registeredPassword);

      const url = `${API_URL}/Users/Register?email=${encodedEmail}&password=${encodedPassword}`;

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("register failed:", error.message);
    }
  };

  const sendDataToDB = async (data) => {
    try {
      const dataToSend = {
        ...data,
        isDone: false,
      };

      console.log(dataToSend);

      const url = `${API_URL}/Items/AddProduct`;

      const response = await axios.post(url, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Add Product failed:", error.message);
    }
  };

  const deleteProduct = async (email, productName) => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const encodedProductName = encodeURIComponent(productName);
      const url = `${API_URL}/Items/DeleteProduct?productName=${encodedProductName}&email=${encodedEmail}`;
      const response = await axios.delete(url);
      return response.data; // You can return data or handle as needed
    } catch (error) {
      console.error("Delete operation failed:", error.message);
      throw error; // Optionally re-throw the error
    }
  };

  const updateIsDone = async (email, productName) => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const encodedProductName = encodeURIComponent(productName);
      const url = `${API_URL}/Items/ChangeIsDone?productName=${encodedProductName}&email=${encodedEmail}`;
      const response = await axios.put(url);
      return response.data; // You can return data or handle as needed
    } catch (error) {
      console.error("Update operation failed:", error.message);
      throw error; // Optionally re-throw the error
    }
  };

  const contextData = {
    loginUser,
    registerUser,
    sendDataToDB,
    deleteProduct,
    updateIsDone,
    authenticated,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
