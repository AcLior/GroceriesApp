import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import SelectCategory from "../components/SelectCategory";
import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useAuth } from "../utils/AuthContext";
import {
  NEW_ITEM_VALIDATION,
  AMOUNT_OF_ITEMS_VALIDATION,
} from "../constants/AppConstants";
import Alert from "@mui/material/Alert";
import "../css/NewItemModal.css";
import FileUpload from "./FileUpload";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NewItemModal = ({ groceries }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { sendDataToDB } = useAuth();
  const email = localStorage.getItem("email");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormContext();

  const onSubmit = async (data) => {
    if (!data.photo) {
      data.photo = "";
    }
    const formDataWithEmail = {
      ...data,
      email: email,
    };
    try {
      const response = await sendDataToDB(formDataWithEmail);
      console.log(response);
      if (!response) {
        alert("המוצר כבר קיים במערכת");
      }
      reset();
      groceries();
      handleClose();
    } catch (error) {
      console.error("Add item failed:", error.message);
    }
  };

  return (
    <div>
      <Fab onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" component="div" className={"headerText"}>
              מוצר חדש
            </Typography>
            <Typography variant="h6" component="div">
              שם המוצר
            </Typography>
            <TextField
              size="small"
              label="נא הכנס מוצר"
              {...register("productName", NEW_ITEM_VALIDATION)}
              id="standard-basic"
              variant="standard"
              dir="rtl"
              fullWidth
            />
            {errors.productName && (
              <Alert severity="error">{errors.productName.message}</Alert>
            )}
            <Typography variant="h6" component="div">
              כמות
            </Typography>
            <TextField
              size="small"
              label="נא הכנס כמות"
              {...register("quantity", AMOUNT_OF_ITEMS_VALIDATION)}
              id="standard-basic"
              variant="standard"
              fullWidth
            />
            {errors.quantity && (
              <Alert severity="error">{errors.quantity.message}</Alert>
            )}
            <Typography variant="h6" component="div">
              קטגוריה
            </Typography>
            <SelectCategory />
            <FileUpload />
            <Button variant="contained" type="submit">
              הוסף
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default NewItemModal;
