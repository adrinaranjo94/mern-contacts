const express = require("express");
const router = express.Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  // TODO
});

// GET SINGLE USER
router.get("/:userId", async (req, res) => {
  // TODO
});

// POST USER
router.post("/", (req, res) => {
  // TODO
});

// UPDATE USER
router.put("/:userId", (req, res) => {
  // TODO
});

// DELETE USER
router.delete("/:userId", (req, res) => {
  // TODO
});

module.exports = router;
