// import { Schema, model, Document } from 'mongoose';

// interface IUserSchema extends Document {
//   name: string;
//   email: string;
//   password: string;
//   date: Date;
// }

// const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default model<IUserSchema>('users', UserSchema);

import { createSchema, Type, typedModel } from 'ts-mongoose';

const UserSchema = createSchema({
  name: Type.string(),
  email: Type.string(),
  password: Type.string(),
  date: Type.optionalDate({ default: Date.now as any })
});

const UserModel = typedModel('users', UserSchema);

export default UserModel;
