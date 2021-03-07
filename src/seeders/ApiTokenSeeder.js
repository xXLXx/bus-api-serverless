import { Seeder } from 'mongoose-data-seed';
import ApiToken from '../models/ApiToken';

const documents = [
  {
    identifier: 'dev'
  }
];
 
class ApiTokenSeeder extends Seeder {
  async shouldRun() {
    return await ApiToken.countDocuments().exec() <= 0;
  }
 
  async run() {
    return await Promise.all(documents.map((data) => {
      const doc = new ApiToken(data);
      return doc.save();
    }));
  }
}
 
export default ApiTokenSeeder;