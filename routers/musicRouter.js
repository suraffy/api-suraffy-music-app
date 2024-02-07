const express = require("express");
const {
  getAllMusic,
  getMusic,
  updateMusic,
  deleteMusic,
} = require("../controllers/musicController");

const router = express.Router();

router.get("/", getAllMusic);

router.route("/:id").get(getMusic).patch(updateMusic).delete(deleteMusic);

module.exports = router;
