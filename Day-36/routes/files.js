var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");

const FileController = require("../controllers/FileController");
const AuthorizationMiddleware = require("../middlewares/AuthorizationMiddleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(
            null,
            file.fieldname +
                "_" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

/* GET home page. */
router.get("/:id", FileController.getFile);
router.post(
    "/upload",
    AuthorizationMiddleware,
    upload.any(),
    FileController.upload
);

module.exports = router;
