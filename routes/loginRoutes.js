const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController.js");

// Obtener todas
router.post("/", loginController.postLogin);


module.exports = router;