import mongoose from 'mongoose';
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions
} from 'passport-jwt';
import { PassportStatic } from 'passport';

import { secretOrKey } from './keys';

const User = mongoose.model('users');

const options: StrategyOptions = {
  secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const config = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findOne({ id: jwt_payload.sub })
        .then(user => done(null, user || false))
        .catch(console.error);
    })
  );
};

export default config;
