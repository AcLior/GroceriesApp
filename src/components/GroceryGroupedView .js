import React from "react";
import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@mui/material";
import "../css/GroceryList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

const GroceryGroupedView = ({ groceryItems, handleDelete, handleUpdate }) => {
  // Function to group items by category
  const groupItemsByCategory = (items) => {
    const groupedItems = {};
    items.forEach((item) => {
      const { category } = item;
      if (!groupedItems[category]) {
        groupedItems[category] = [];
      }
      groupedItems[category].push(item);
    });
    return groupedItems;
  };

  // Get grouped items by category
  const groupedItems = groupItemsByCategory(groceryItems);

  return (
    <List dense>
      {Object.entries(groupedItems).map(([category, items], index) => (
        <React.Fragment key={index}>
          {/* Display category title */}
          <ListItemText primary={category} className={"categoryHeader"} />
          {/* Display items under the current category */}
          {items.map((item, idx) => (
            <ListItem key={idx} style={{ justifyContent: "flex-end" }}>
              <Typography component="div" className="txtAndPic">
                <Avatar alt="item" src={item.photo} />
                <ListItemText
                  primary={item.productName}
                  className={item.isDone ? "doneItem" : "pendingText"}
                />
              </Typography>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item.productName)}
                >
                  <DeleteIcon className="garbage" />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="update"
                  onClick={() => handleUpdate(item.productName)}
                >
                  <DoneIcon className="done" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </React.Fragment>
      ))}
    </List>
  );
};

export default GroceryGroupedView;
