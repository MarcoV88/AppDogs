const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController.js");

// Obtener todas
router.post("/", registerController.postRegister);


module.exports = router;