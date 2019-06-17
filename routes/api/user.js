const User = require("../../models/User");
const gravatar = require("gravatar");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const registerValidator = require("../../validators/register");
const loginValidator = require("../../validators/login");

module.exports = app => {
  // app.get('/api/users', (req, res, next) => {});

  app.post("/auth/register", async (req, res, next) => {
    const { errors, isValid } = registerValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { name, email, password } = req.body;

    try {
      const userFromRepo = await User.findOne({
        email
      });

      if (userFromRepo) {
        return res.status(400).json({
          message: "User with the email exists"
        });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const userToCreate = new User({
        name,
        email,
        avatar,
        password
      });

      bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          userToCreate.password = hash;
          const createdUser = await userToCreate.save();
          res.status(200).json(createdUser);
        });
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.post("/auth/login", async (req, res, next) => {
    const { errors, isValid } = loginValidator(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    try {
      const userFromDb = await User.findOne({
        email
      });
      if (!userFromDb) {
        return res.status(401).json({
          message: "Invalid Username or Password"
        });
      }
      bcryptjs.compare(password, userFromDb.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) {
          return res.status(401).json({
            message: "Invalid Username or Password"
          });
        }
        const payload = {
          id: userFromDb._id,
          name: userFromDb.name,
          avatar: userFromDb.avatar
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: "1h"
          },
          (err, token) => {
            return res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.get(
    "/api/user/current",
    passport.authenticate("jwt", {
      session: false
    }),
    (req, res) => {
      res.json({
        msg: "Success"
      });
    }
  );
};
