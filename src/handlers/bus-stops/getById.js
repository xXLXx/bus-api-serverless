import json from '../../utils/json';
import authorize from '../../middlewares/authorize';

import connectDatabase from '../../database';
import Exception from '../../models/Exception';
import BusSchedule from '../../models/BusSchedule';
import decryptId from '../../utils/decryptId';
import config from '../../config';


/**
 * Gets a bus stop info by id
 */
export async function handle(event, context) {
  try {
    await authorize(event, context);
    await connectDatabase(context);

    const { pathParameters: param = {} } = event;
    const id = decryptId(param.id);
    const now = new Date();
    const busScheduleQuery = BusSchedule.find().sort({ time: 1})
      .where('busStop').equals(id)
      .limit(config.maps.busScheduleLimit);

    /**
     * Query first all that are on the same day.
     * Much faster to requery on empty and get the first item for tomorrow
     * 
     * This assumes that the same bus can reach you twice in a day
     */
    const nextArrivals = await busScheduleQuery
      .where('day').equals(now.getUTCDay())
      .where('time').gte(`${now.getUTCHours()}:${now.getUTCMinutes()}`)
      .exec();

    const tomorrowArrivalsQuery = busScheduleQuery
      .where('day').equals((now.getUTCDay() + 1) % 7);

    const data = {
      nextArrivals: nextArrivals || await tomorrowArrivalsQuery.exec()
    };

    return json({
      body: {
        message: 'Successful',
        data
      }
    });
    
  } catch (exception) {
    return new Exception.catch(exception);
  }
}