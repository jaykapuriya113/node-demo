const AppError = require("../errorHandler/AppError");
const jwt = require("jsonwebtoken");
exports.protect = async (req, res, next) => {
  try {
    let token;
    console.log(req.headers);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new AppError("you are not login", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);
    req.user = freshUser;
    next();
  } catch (err) {
    return next(new AppError(err));
  }
};
