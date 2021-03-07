import { Seeder } from 'mongoose-data-seed';
import faker from 'faker';

import BusStop from '../models/BusStop';

const documents = [...Array(20)].map(() => ({
  name: faker.address.streetName(),
  location: {
    type: 'Point',
    coordinates: [faker.address.longitude(), faker.address.latitude()]
  }
}));

class BusStopSeeder extends Seeder {
  async shouldRun() {
    return await BusStop.countDocuments().exec() <= 0;
  }
 
  async run() {
    return await Promise.all(documents.map((data) => {
      const doc = new BusStop(data);
      return doc.save();
    }));
  }
}
 
export default BusStopSeeder;