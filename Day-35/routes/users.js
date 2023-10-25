var express = require("express");
var router = express.Router();

const UserController = require("../controllers/UserController");

/* GET users listing. */
router.get("/", UserController.index);
router.get("/:id", UserController.view);

router.post("/", UserController.store);

router.put("/:id", UserController.edit);

router.patch("/:id", UserController.update);

router.delete("/:id", UserController.destroy);

module.exports = router;
