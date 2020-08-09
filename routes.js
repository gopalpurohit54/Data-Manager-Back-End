const express = require("express");
const fs = require("fs");
const { json } = require("body-parser");

const saveData = (req, res, next) => {
  // console.log(req.body);
  let existingData = fs.readFileSync("data.txt", {
    encoding: "utf8",
    flag: "r",
  });
  existingData = existingData === "" ? [] : JSON.parse(existingData);
  const newData = existingData.concat(req.body);

  fs.writeFileSync("data.txt", JSON.stringify(newData), function (err) {
    if (err) {
      console.log("error", err);
    }
  });
  const message = { saved: true };
  res.json(message);
};

const updateData = (req, res, next) => {
  let existingData = fs.readFileSync("data.txt", {
    encoding: "utf8",
    flag: "r",
  });
  existingData = existingData === "" ? [] : JSON.parse(existingData);
  console.log(req.body);
  let newData = existingData.filter((student) => student.id !== req.body.id);
  newData = newData.concat(req.body);
  fs.writeFileSync("data.txt", JSON.stringify(newData), function (err) {
    if (err) {
      console.log("error", err);
    }
  });
  const message = { updated: true };
  res.json(message);
};

const deleteData = (req, res, next) => {
  let existingData = fs.readFileSync("data.txt", {
    encoding: "utf8",
    flag: "r",
  });
  existingData = existingData === "" ? [] : JSON.parse(existingData);
  let newData = existingData.filter((student) => student.id !== req.body.id);
  fs.writeFileSync("data.txt", JSON.stringify(newData), function (err) {
    if (err) {
      console.log("error", err);
    }
  });
  const message = { Deleted: true };
  res.json(newData);
};

const router = express.Router();

router.get("/", (req, res, next) => {
  let existingData = fs.readFileSync("data.txt", {
    encoding: "utf8",
    flag: "r",
  });
  existingData = existingData === "" ? [] : JSON.parse(existingData);
  console.log(existingData);
  res.json(existingData);
});

router.post("/create", saveData);

router.post("/update", updateData);

router.post("/delete", deleteData);

module.exports = router;
