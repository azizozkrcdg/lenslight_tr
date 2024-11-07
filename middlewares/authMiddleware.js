import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if(token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if(err) {
          console.log(err.message);
          res.redirect("/login");
        }else {
          next();
        }
      });
    }else {
      console.log(err.message);
      res.redirect("/login");
    }
    
  } catch (error) {
    res.status(401).redirect("/login");
  }
};

export {authenticateToken};