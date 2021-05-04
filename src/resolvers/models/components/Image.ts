import { Schema } from 'mongoose';

import * as TYPES from 'types';
import { Regex } from 'src/helpers/const';

type TImage = TYPES.ItemDocument<TYPES.Image>;

const ImageSchema = new Schema<TImage>({
  path: {
    type: String,
    maxLength: 2048,
    match: Regex.url,
  },
  filename: String,
  mimetype: String,
});

export default ImageSchema;
