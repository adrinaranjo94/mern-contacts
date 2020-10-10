const express = require("express");
const router = express.Router();

// GET ALL CONTACTS
router.get("/", (req, res) => {
  // TODO
});

// GET SINGLE CONTACT
router.get("/:contactId", (req, res) => {
  // TODO
});

// POST CONTACT
router.post("/", (req, res) => {
  // TODO
});

// UPDATE CONTACT
router.put("/:contactId", (req, res) => {
  // TODO
});

// DELETE CONTACT
router.delete("/:contactId", (req, res) => {
  // TODO
});

module.exports = router;
