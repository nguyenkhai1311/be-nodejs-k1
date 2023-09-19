var express = require("express");
var router = express.Router();

const CustomerController = require("../controllers/CustomerController");
const CustomerValidate = require("../middlewares/CustomerValidate");
const UpdateCustomer = require("../middlewares/UpdateCustomer");

/* GET users listing. */
router.get("/", CustomerController.index);
router.get("/create", CustomerController.create);
router.post("/create", CustomerValidate(), CustomerController.store);
router.get("/update/*", CustomerController.update);
router.post("/update/*", UpdateCustomer(), CustomerController.handleUpdate);
router.get("/delete/*", CustomerController.delete);
module.exports = router;
