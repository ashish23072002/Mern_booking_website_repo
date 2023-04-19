import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";



//register Function
export const register = async (req, res, next) => {
    try {

        //bcrypt.js (npm imported) for hashing our password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);


        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(201).send("User has been created.")

    } catch (err) {
        next(err)
    }
};
//login Function
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200).json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

//for ----createError
// you have to install  --- npm install http-errors / yarn add http-errors
// and then we can use it ,if not then it will not shows the error on the output page

//yarn add jsonwebtoken  -- is also added for using cookikies inside
