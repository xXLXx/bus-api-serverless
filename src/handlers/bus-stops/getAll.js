import json from '../../utils/json';
import authorize from '../../middlewares/authorize';

import config from '../../config';
import connectDatabase from '../../database';
import Exception from '../../models/Exception';
import BusStop from '../../models/BusStop';

/**
 * Gets all bus stops near the user's current location
 */
export async function handle(event, context) {
  try {
    await authorize(event, context);
    await connectDatabase(context);

    const filters = ['near'];
    const { queryStringParameters: qs = {} } = event;
    const busStopQuery = BusStop.find();

    // Build up filters as requested to limit results
    filters.map((filterKey) => {
      console.log(qs);
      const filterValue = qs[filterKey];

      if (filterValue) {
        switch (filterKey) {
          // When mocked, just queries everything
          case 'near': !qs.mock && addNearFilter(busStopQuery, filterValue)
        }
      }
    });

    const busStops = await busStopQuery.limit(qs.limit || 20).exec();

    /*
     * If empty, Send a mocked response setting the location close to the current location
     */
    if (busStops.length <= 0 && config.maps.mockNearOnEmpty && qs.near && !qs.mock) {
      // Retry the request
      return handle({
        ...event,
        queryStringParameters: {
          ...qs,
          mock: 1
        }
      }, handle);
    }

    // Update the mocked locations to be close to near
    const data = qs.near && qs.mock ? mockBusStops(busStops, qs.near) : busStops;

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

function mockBusStops(busStops, filterValue) {
  const near = filterValue.split(',');

  if (!Array.isArray(near) || near.length !== 2) {
    throw new Error('near filter must in in a lat,lng format');
  }

  /**
   * Mutate the object to keep the instance
   */
  const refPoint = [Number(near[1]) || 0, Number(near[0]) || 0];
  busStops.forEach((busStop) => {
    busStop.mockLocation(refPoint);
  });

  return busStops;
}

function addNearFilter(query, filterValue) {
  const near = filterValue.split(',');

  if (!Array.isArray(near) || near.length !== 2) {
    throw new Error('near filter must in in a lat,lng format');
  }

  // @todo fix and remove existinf filter
  query.where('name').eq('Leo');
  // query.where('location').near({
  //   center: [Number(near[1]) || 0, Number(near[0]) || 0], // Format to lng, lat for mongo
  //   maxDistance: config.nearDistanceInMeters
  // });
}