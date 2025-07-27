let express = require("express");
const {
  Insert,
  Showdata,
  DeleteData,
  UpdateData,
  updateRow,
} = require("../../controllers/web/userControllers");

let userrouter = express.Router();

userrouter.post("/insert", Insert);
userrouter.get("/view", Showdata);
userrouter.delete("/delete/:id", DeleteData);
userrouter.get("/edit/:id", UpdateData);
userrouter.put("/editrow/:id", updateRow);

module.exports = userrouter;
