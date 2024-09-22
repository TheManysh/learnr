import { User } from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { generateAccessToken } from "../../../middlewares/auth.middleware.js";
export async function signupuser(req, res, next) {
  try {
    if (req.body.email === undefined) {
      return res.status(400).send({
        message: "Email Required!",
      });
    }

    let isUserExist = await User.findOne({ email: req.body.email });

    if (isUserExist) {
      return res.status(400).send({
        message: "Email already registered!",
      });
    }

    const salt = bcryptjs.genSaltSync(10);
    req.body.password = bcryptjs.hashSync(req.body.password, salt);

    const userSchema = new User(req.body);

    userSchema
      .save()
      .then((response) => {
        return res.status(200).send(response);
      })
      .catch((error) => {
        return res.status(400).send({
          message: error,
        });
      });
  } catch (e) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: e,
    });
  }
}

export async function loginuser(req, res, next) {
  try {
    const userModel = await User.findOne({ email: req.body.email });

    if (userModel != null) {
      if (bcryptjs.compareSync(req.body.password, userModel.password)) {
        const token = generateAccessToken(userModel.toJSON());
        return res.status(200).send({
          message: "Success",
          data: {
            token: token,
          },
        });
      } else {
        return res.status(401).send({
          message: "Incorrect Password",
          error: "Wrong Credential",
        });
      }
    } else {
      return res.status(403).send({
        message: "User Not Registered",
        error: "Wrong Credential",
      });
    }
  } catch (e) {
    return res.status(500).send({
      error: e,
      message: "Internal Server Error",
    });
  }
}
