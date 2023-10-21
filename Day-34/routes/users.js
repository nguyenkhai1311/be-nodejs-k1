var express = require("express");
var router = express.Router();

const UserController = require("../controllers/UserController");
const UserMiddleware = require("../middlewares/UserMiddleware");

/* GET users listing. */
router.get("/", UserMiddleware.read, UserController.index);

router.get("/add", UserMiddleware.add, async (req, res) => {
    res.send("Thêm người dùng");
});

router.get("/edit/:id", UserMiddleware.edit, async (req, res) => {
    res.send("Sửa thông tin người dùng");
});

router.get("/delete/:id", UserMiddleware.delete, async (req, res) => {
    res.send("Xóa thành công");
});

router.get("/permission/:id", UserMiddleware.read, UserController.permission);

router.post(
    "/permission/:id",
    UserMiddleware.read,
    UserController.handlePermission
);
module.exports = router;
