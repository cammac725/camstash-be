const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const saltRounds = 10;

  if (body.password = undefined) {
    return res.status(400).json({ error: 'password must be included in your post' });
  }

  if (body.password.length < 8) {
    return res.status(400).json({ error: 'password must be 8 characters or longer' });
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    email: body.email,
    passwordHash,
  });

  // create and sign a token:

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60*60,
  });

  try {
    await user.save()
    res
      .status(201)
      .send({ token, username: user.username, email: user.email })
  } catch (exception) {
      next(exception)
  }
});

module.exports = usersRouter;