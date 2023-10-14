var express = require("express");
var router = express.Router();

const RoleController = require("../controllers/RoleController");

/* GET users listing. */
router.get("/", RoleController.index);
router.post("/add", RoleController.create);

router.get("/edit/:id", RoleController.edit);
router.post("/edit/:id", RoleController.update);

router.post("/delete/:id", RoleController.destroy);

module.exports = router;
