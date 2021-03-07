import { Seeder } from 'mongoose-data-seed';
import faker from 'faker';

import BusSchedule from '../models/BusSchedule';
import Bus from '../models/Bus';
import BusStop from '../models/BusStop';

const getDocuments = async () => {
  const busStops = await BusStop.find().exec();
  const buses = await Bus.find().exec();
  const documents = [];

  /**
   * Replicate how a bus runs by adding 1 hour
   * by looping through all buses to each bus stop.
   * The start time is random.
   * 
   * That schedule is repeated for all the days
   */
  buses.map((bus) => {
    const randomDate = faker.date.future();
    randomDate.setDate(0);

    busStops.map((busStop) => {
      const randomDateHour = randomDate.getUTCHours(),
            randomDateMinutes = randomDate.getUTCMinutes();

      [...Array(7).keys()].map((day) => {
        randomDate.setDate(day);

        documents.push({
          day: randomDate.getUTCDay(),
          time: `${randomDateHour < 10 ? '0' : ''}${randomDateHour}:${randomDateMinutes < 10 ? '0' : ''}${randomDateMinutes}`,
          bus: bus._id,
          busStop: busStop._id
        });
      });

      randomDate.setHours(randomDateHour + 1);
    });
  });

  return documents;
}
 
class BusScheduleSeeder extends Seeder {
  async shouldRun() {
    return await BusSchedule.countDocuments().exec() <= 0;
  }
 
  async run() {
    const documents = await getDocuments();
    console.log(documents);
    return await Promise.all(documents.map((data) => {
      const doc = new BusSchedule(data);
      return doc.save();
    }));
  }
}
 
export default BusScheduleSeeder;