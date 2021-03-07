import connectDatabase from '../database';
import Exception from '../models/Exception';
import ApiToken from '../models/ApiToken';

/**
 * Authorize middlware
 * AWS custom authorizers causes cold boots of lambda
 */
export default async function authorize(event, context) {
  await connectDatabase(context);

  const token = event.headers?.['X-Api-Key'];

  if (token) {
    if (!await ApiToken.countDocuments({ token }).limit(1).exec()) {
      throw new Exception('Unauthorized', 401);
    }
  } else {
    throw new Exception('X-Api-Key is missing', 401);
  }
}