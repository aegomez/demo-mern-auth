import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { secretOrKey } from '../../config/keys';
import { User } from '../../models/user';
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

const router = express.Router();

/**
 * @route POST api/users/register
 * @description Register user
 * @access Public
 */
router.post('/register', async (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    // Find if user is already registered
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        email: 'Email already exists'
      });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const result = await newUser.save();

    return res.json(result);
  } catch (e) {
    console.error('Error on /register', e);
  }
});

/**
 * @route POST api/users/login
 * @description Login user and return JWT
 * @access Public
 */
router.post('/login', async (req, res) => {
  // Form validation
  const { errors, isEmail, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { nameOrEmail, password } = req.body;
  const key = isEmail ? 'email' : 'name';

  try {
    // Find user by email or name
    const user = await User.findOne({ [key]: nameOrEmail });

    if (!user) {
      return res.status(404).json({
        usernotfound: 'User not found'
      });
    }

    // If user exists, check password
    const isMatch = await bcrypt.compare(password, user.password);

    // Return if password doesn't match
    if (!isMatch) {
      return res.status(400).json({
        passwordincorrect: 'Password incorrect'
      });
    }
    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name
    };

    // Sign token
    jwt.sign(
      payload,
      secretOrKey,
      {
        expiresIn: '7d'
      },
      (_, token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token
        });
      }
    );
  } catch (e) {
    console.error('Error on /login', e);
  }
});

export default router;
