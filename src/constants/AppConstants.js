export const API_URL = "https://proj.ruppin.ac.il/cgroup20/test2/tar1/api";

export const EMAIL_VALIDATION = {
  required: "נא למלא את הדוא'ל",
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "אימייל לא תקין",
  },
};

export const PASSWORD_VALIDATION = {
  required: "נא למלא את הסיסמא",
};

export const NEW_ITEM_VALIDATION = {
  required: "נא למלא את שם המוצר",
  // pattern: {
  //   value:
  //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  //   message: "המוצר כבר קיים ברשימה",
  // },
};

export const AMOUNT_OF_ITEMS_VALIDATION = {
  required: "נא למלא את הכמות",
  pattern: {
    value: /^[0-9]*$/,
    message: "נא להזין מספרים בלבד",
  },
};
