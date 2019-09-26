import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

import { mongoURI } from './config/keys';
import users from './routes/api/users';
import passportConfig from './config/passport';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB succesfully connected'))
  .catch(err => console.error(err));

// Passport config and middleware
app.use(passport.initialize());
passportConfig(passport);

// Routes
app.use('/api/users', users);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
