import mongoose from 'mongoose';

import BaseModel from './BaseModel';


/**
 * BusStop  Model
 */
class BusStop extends BaseModel {

  static getVisible() {
    return [
      'id',
      'name',
      'location',
      'position'
    ];
  }

  get position() {
    return {
      lat: this.location.coordinates[1],
      lng: this.location.coordinates[0]
    }
  }

  mockLocation(refPoint) {
    this.location.coordinates = [
      refPoint[0] + ((Math.random() * 0.01) * (Math.round(Math.random()) ? 1 : -1)),
      refPoint[1] + ((Math.random() * 0.01) * (Math.round(Math.random()) ? 1 : -1))
    ];
  }
}

const getSchema = () => {
  const Schema = mongoose.Schema;
  const locationSchema = new Schema({
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

  const schema = new Schema({
    name: {
      type: String,
      required: true
    },
    location: {
      type: locationSchema,
      index: '2dsphere',
      required: true
    }
  }, {
    timestamps: true
  });
  schema.loadClass(BusStop);

  return schema;
}

export default mongoose.models.BusStop || mongoose.model('BusStop', getSchema());