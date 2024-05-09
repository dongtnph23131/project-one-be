const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(203).json({
        message: "Bạn cần đăng nhập !",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    const { userId: id } = await jwt.verify(token, "123456");
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(203).json({
        message: "Không tìm thấy người dùng",
      });
    }
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Bạn không có quyền thực hiện hành động này !" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
