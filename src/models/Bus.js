import mongoose from 'mongoose';

import BaseModel from './BaseModel';


/**
 * Bus  Model
 */
class Bus extends BaseModel {

  static getVisible() {
    return [
      'id',
      'name'
    ];
  }
}

const getSchema = () => {
  const Schema = mongoose.Schema;
  const schema = new Schema({
    name: {
      type: String,
      required: true
    },
  }, {
    timestamps: true
  });
  schema.loadClass(Bus);

  return schema;
}

export default mongoose.models.Bus || mongoose.model('Bus', getSchema());