var express = require("express");
var router = express.Router();

const UserController = require("../controllers/UserController");
const AuthorizationMiddleware = require("../middlewares/AuthorizationMiddleware");

/* GET users listing. */
router.get("/:id/files", AuthorizationMiddleware, UserController.index);

module.exports = router;
