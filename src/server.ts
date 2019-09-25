import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { mongoURI } from './config/keys';

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
    useNewUrlParser: true
  })
  .then(() => console.log('DB succesfully connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}.`);
});
