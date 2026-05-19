const express = require("express");
const router = express.Router();

const loginController = require("../controllers/loginController.js");

// Obtener todas
router.get("/", loginController.getLogin);


module.exports = router;