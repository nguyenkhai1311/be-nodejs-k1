module.exports = async (req, res, next) => {
    // if (!req.user) {
    //     res.status(200).json({
    //         status: "success",
    //         message: "Bạn phải cần đăng nhập",
    //     });
    // }
    next();
};
