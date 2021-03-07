import { Seeder } from 'mongoose-data-seed';
import faker from 'faker';

import Bus from '../models/Bus';

const documents = [...Array(20)].map(() => ({
  name: `${faker.random.number({ min: 1, max: 999})}${faker.random.arrayElement(['', 'A', 'B'])}`
}));
 
class BusSeeder extends Seeder {
  async shouldRun() {
    return await Bus.countDocuments().exec() <= 0;
  }
 
  async run() {
    return await Promise.all(documents.map((data) => {
      const doc = new Bus(data);
      return doc.save();
    }));
  }
}
 
export default BusSeeder;