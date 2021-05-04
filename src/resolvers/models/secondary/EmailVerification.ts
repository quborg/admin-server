import { model, Schema } from 'mongoose';

import * as TYPES from 'types';

type EVDocument = TYPES.ItemDocument<TYPES.EmailVerification>;
type EVModel = TYPES.ItemModel<EVDocument>;

const EmailVerificationSchema = new Schema<EVDocument, EVModel>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
  hash: String,
});

const EmailVerificationModel = model<EVDocument, EVModel>(
  'EmailVerification',
  EmailVerificationSchema
);

export default EmailVerificationModel;
