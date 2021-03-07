import mongoose from 'mongoose';

import BaseModel from './BaseModel';
import Bus from './Bus';
import BusStop from './BusStop';


/**
 * BusSchedule  Model
 */
class BusSchedule extends BaseModel {

  static getPopulate() {
    return [
      'bus'
    ];
  }  

  static getVisible() {
    return [
      'day',
      'time'
    ];
  }
}

const getSchema = () => {
  const Schema = mongoose.Schema;
  const schema = new Schema({
    day: {
      type: Number,
      // Sunday being 0, basee from moment UTC, and new Date().getUTCDay()
      enum: [...Array(7).keys()],
      required: true
    },
    time: {
      type: String,
      validate: {
        validator: (value) => /\d{2}:\d{2}/.test(value),
        message: props => `${props.value} is not in UTC hh:mm 24-hours format!`
      },
      required: true
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: Bus,
      required: true
    },
    busStop: {
      type: Schema.Types.ObjectId,
      ref: BusStop,
      required: true
    }
  }, {
    timestamps: true
  });
  schema.loadClass(BusSchedule);

  schema.pre('find', function () {
    BusSchedule.getPopulate().map(() => this.populate('bus'));
  });

  return schema;
}

export default mongoose.models.BusSchedule || mongoose.model('BusSchedule', getSchema());