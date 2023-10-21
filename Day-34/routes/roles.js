var express = require("express");
var router = express.Router();

const RoleController = require("../controllers/RoleController");

/* GET users listing. */
router.get("/", RoleController.index);
router.get("/add", RoleController.add);
router.post("/add", RoleController.handleAdd);

router.get("/edit/:id", RoleController.edit);
router.post("/edit/:id", RoleController.handleEdit);

router.post("/delete/:id", RoleController.delete);

module.exports = router;
