const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  const { inputEmail, inputPassword } = req.body;
  try {
    const user = await tables.user.getByMail(inputEmail);

    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(user.password, inputPassword);

    if (verified) {
      delete user.password;
      const token = await jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token, user });
    } else {
      res.status(422).send("incorrect email or password");
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  login,
};
