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

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedData;
      next();
    }
  } catch (error) {
    //console.log(error.name);
    if (error.name === "TokenExpiredError") {
      req.headers.authorization = null;
      res.redirect("/login");
    }
  }
};
