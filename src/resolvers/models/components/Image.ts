import { Schema } from 'mongoose';

import * as TYPES from 'types';
import { Regex } from 'src/helpers/const';

type ImageType = TYPES.ItemDocument<TYPES.Image>;

const ImageSchema = new Schema<ImageType>({
  path: {
    type: String,
    maxLength: 2048,
    match: Regex.url,
  },
  svg: String,
  filename: String,
  mimetype: String,
});

export default ImageSchema;
