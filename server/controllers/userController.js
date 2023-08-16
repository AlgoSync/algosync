import db from "../config/dbConnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserController = {
  createUser: async (req, res, next) => {
    try {
      const { password, email } = req.body;
      const isValid = email.match(/[\w\d\.]+@[a-z]+\.[\w]+$/gim);
      if (isValid === null) {
        res.json("Invalid Email");
      } else {
        const hashed = await bcrypt.hash(password, 10);
        const query =
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
        const values = [email, hashed];
        const newUser = await db.query(query, values);

        const accessToken = jwt.sign(newUser.rows[0], process.env.SECRET, {
          expiresIn: "1h",
        });
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
        });

        // log the sign up
        res.locals.newUser = newUser.rows[0];
      }
      return next();
    } catch (error) {
      console.error("Error during user signup:", error);
      return next({
        log: "Express error in createUser Middleware",
        status: 503,
        message: { err: "An error occurred during sign-up" },
      });
    }
  },

  userLogin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const query = `SELECT * FROM users WHERE email = '${email}'`;
      const data = await db.query(query);
      console.log("response from login db request", data.rows);
      const userInfo = data.rows[0];
      const hashedPass = data.rows[0].password;
      const passOk = await bcrypt.compare(password, hashedPass);
      if (passOk) {
        const accessToken = await jwt.sign(userInfo, process.env.SECRET, {
          expiresIn: "1h",
        });
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
        });
        res.locals.user = userInfo;
        return next();
      } else {
        return next({
          log: "Failed credentials",
          status: 401,
          message: { err: "Failed matching user credentials" },
        });
      }
    } catch (error) {
      console.error("Error during user login:", error);
      return next({
        log: "Express error in userLogin Middleware",
        status: 500,
        message: { err: "An error occurred during login" },
      });
    }
  },

  verifyToken: async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    try {
      const user = await jwt.verify(accessToken, process.env.SECRET);
      res.locals.user = user;
      next();
    } catch {
      return next({
        log: "Express error in verifyToken Middleware",
        status: 500,
        message: { err: "An error occurred during token verification" },
      });
    }
  },
};

export default UserController;
