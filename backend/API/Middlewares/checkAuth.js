const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const userToken = req.body.headers["Authorization"].split(" ")[1];
    const decodedToken = jwt.verify(userToken, "secretKey");
    const userData = {
      email: decodedToken?.email,
      userId: decodedToken.userId,
    };
    console.log("userData==>>", userData);
    res.locals.userData = userData;
    req.userData = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
