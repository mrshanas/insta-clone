import jwt from "jsonwebtoken";

export const checkAuthorization = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({
        message: "Not Authorized",
      });
      res.redirect("/login");
    } else {
      const token = req.headers.authorization.split(" ")[1];
      // checking for jwt expire manually
      //   const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      //   req.user = decodedData;
      //   next();
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
        if (err.name === "TokenExpiredError") {
          req.headers.authorization = null;
          res.status(403).json({ message: "Token expired please login" });
        } else {
          req.user = decodedData;
          next();
        }
      });
    }
  } catch (error) {
    console.log(error.name);
    // checking jwt expire manually
    // if (error.name === "TokenExpiredError") {
    //   req.headers.authorization = null;
    //   res.redirect("/login");
    // }
  }
};
