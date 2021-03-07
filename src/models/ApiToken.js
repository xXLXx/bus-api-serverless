import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

import BaseModel from './BaseModel';


/**
 * ApiToken  Model
 */
class ApiToken extends BaseModel {
  // silence :D
}

const getSchema = () => {
  const Schema = mongoose.Schema;
  const schema = new Schema({
    identifier: { type: String, unique: true },
    token: { type: String, default: nanoid(64) }
  }, {
    timestamps: true
  });
  schema.loadClass(ApiToken);

  return schema;
}

export default mongoose.models.ApiToken || mongoose.model('ApiToken', getSchema());