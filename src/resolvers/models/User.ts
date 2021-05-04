import { model, Schema } from 'mongoose';

import * as TYPES from 'types';
import { validationConfig as VC, Regex } from 'src/helpers/const';

import { Image } from './components';

type UserDocument = TYPES.ItemDocument<TYPES.User>;
type UserModel = TYPES.ItemModel<UserDocument>;

const UserSchema = new Schema<UserDocument, UserModel>({
  name: {
    type: String,
    minLength: VC.user.name.minLength,
    maxLength: VC.user.name.maxLength,
  },
  username: {
    type: String,
    unique: true,
    minLength: VC.user.username.minLength,
    maxLength: VC.user.username.maxLength,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: Regex.email,
  },
  password: {
    type: String,
    required: true,
    minLength: VC.user.password.minLength,
    maxLength: VC.user.password.maxLength,
  },
  avatar: Image,
  role: {
    type: String,
    enum: Object.values(TYPES.Role),
    default: TYPES.Role.ANONYM,
  },
  public: Boolean,
  active: Boolean,
  verified: Boolean,
});

const UserModel = model<UserDocument, UserModel>('User', UserSchema);

export default UserModel;
