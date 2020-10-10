const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// GET ALL USERS
router.get("/", userController.getAllUsers);

// GET SINGLE USER
router.get("/:userId", userController.getUserById);

// POST USER
router.post("/", userController.addUser);

// UPDATE USER
router.put("/:userId", userController.updateUserById);

// DELETE USER
router.delete("/:userId", userController.deleteUserById);

module.exports = router;
