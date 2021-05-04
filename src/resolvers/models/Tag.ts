import { model, Schema } from 'mongoose';
import * as TYPES from 'types';

type TTag = TYPES.ItemDocument<TYPES.Tag>;

const TagSchema = new Schema<TTag>({
  name: { type: String, required: true, minLength: 2, maxLength: 14 },
});

const TagModel = model<TTag>('Tag', TagSchema);

export default TagModel;
