const express = require("express");
const {
  createMusic,
  getAllMusic,
  getMusic,
  updateMusic,
  deleteMusic,
} = require("../controllers/musicController");

const router = express.Router();

router.route("/").get(getAllMusic).post(createMusic);

router.route("/:id").get(getMusic).patch(updateMusic).delete(deleteMusic);

module.exports = router;
