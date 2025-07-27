const DB_Model = require("../../models/db.models");

let Insert = async (req, res) => {
  try {
    let { username, email, phoneNumber, message } = req.body;
    // console.log(req.body);

    let data = new DB_Model({
      username,
      email,
      phoneNumber,
      message,
    });

    await data.save();
    res.json({ status: 1, msg: "Data Saved" });
  } catch (error) {
    console.log(error);
  }
};

let Showdata = async (req, res) => {
  try {
    let Dbdatalist = await DB_Model.find();

    res.json({ datalist: Dbdatalist });
  } catch (error) {
    console.log(error);
  }
};

let DeleteData = async (req, res) => {
  try {
    let delid = req.params.id;

    let delteddata = await DB_Model.deleteOne({ _id: delid });

    res.send({
      status: 1,
      mag: "data deleted successfully",
      id: delid,
      datas: delteddata,
    });
  } catch (error) {
    res.send({
      status: 0,
      mag: "data not deleted successfully",
      id: delid,
      datas: delteddata,
    });
  }
};
let UpdateData = async (req, res) => {
  try {
    let editId = req.params.id;

    // let { username, email, phoneNumber, message } = req.body;

    // let editObj={
    //   username,
    //   email,
    //   phoneNumber,
    //   message
    // }
    //   let Updatestu=await DB_Model.updateOne({_id:editId},editObj)

    let updatedData = await DB_Model.findOne({ _id: editId });
    res.send({ status: 1, updatedData });
  } catch (error) {
    console.log(error);
  }
};

const updateRow = async (req, res) => {
  let editId = req.params.id;

  let { username, email, phoneNumber, message } = req.body;

  let editObj = {
    username,
    email,
    phoneNumber,
    message,
  };
  let UpdateRow = await DB_Model.updateOne({ _id: editId }, editObj);
  res.send({ status: 1, UpdateRow });
};

module.exports = { Insert, Showdata, DeleteData, UpdateData, updateRow };
