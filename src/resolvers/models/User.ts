import { model, Schema } from 'mongoose';

import * as TYPES from 'types';
import { validationConfig as VC, Regex } from 'src/helpers/const';

import { Image } from './components';

type UserDocument = TYPES.ItemDocument<TYPES.User>;
type UserModel = TYPES.ItemModel<UserDocument>;

const UserSchema = new Schema<UserDocument, UserModel>({
  name: {
    type: String,
    minLength: VC.user.name.min,
    maxLength: VC.user.name.max,
  },
  username: {
    type: String,
    unique: true,
    minLength: VC.user.username.min,
    maxLength: VC.user.username.max,
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
    minLength: VC.user.pass.min,
    maxLength: VC.user.pass.max,
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
