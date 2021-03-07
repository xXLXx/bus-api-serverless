import pick from 'lodash/pick';
import startCase from 'lodash/startCase';
import mongoose from 'mongoose';

import encryptId from '../utils/encryptId';

/**
 * BaseModel
 * 
 * All classes extend from here
 */

export default class BaseModel {

  static getVisible() {
    return [];
  }

  static getPopulate() {
    return [];
  }

  get id() {
    return encryptId(this._id.toString());
  }

  /**
   * Only output fields that are decalred in @getVisible
   */
  toJSON() {
    const obj = this.toObject({ virtuals: true });
    const populate = this.constructor.getPopulate();
    const json = pick(obj, [...this.constructor.getVisible(), ...populate]);
    
    // Mutate. This is an object, and it's faster to loop through only the fields to change

    populate.map((relatedKey) => {
      const visible = mongoose.model(startCase(relatedKey)).getVisible();
      json[relatedKey] = pick(json[relatedKey], visible);
    });

    return json;
  }
}