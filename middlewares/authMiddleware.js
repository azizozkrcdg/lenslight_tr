import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticateToken = async (req, res, next) => {
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];

  try {
    const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];

    if(!token) {
        res.status(401).json({
            succeeded: false,
            error: "No token available"
        });
    }

    req.user = await User.findById(
        jwt.verify(token, process.env.JWT_SECRET).userId
    );
    next();
  } catch (error) {
    res.status(401).json({
        succeeded : false,
        error : "Not authorizate"
    })
  }
};

export {authenticateToken};