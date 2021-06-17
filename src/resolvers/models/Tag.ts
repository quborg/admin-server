import { model, Schema } from 'mongoose';

import * as TYPES from 'types';
import { validationConfig as VC } from 'src/helpers/const';

type TagDocument = TYPES.ItemDocument<TYPES.Tag>;
type TagModel = TYPES.ItemModel<TagDocument>;

const TagSchema = new Schema<TagDocument, TagModel>({
  name: {
    type: String,
    required: true,
    minLength: VC.tag.name.min,
    maxLength: VC.tag.name.max,
  },
});

const TagModel = model<TagDocument, TagModel>('Tag', TagSchema);

export default TagModel;
