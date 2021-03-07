import mongoose from 'mongoose';

import config from './config';

let db;

/**
 * A method that is called everytime before making calls to any model
 */
export default async function connectDatabase(context) {
  if (!context) {
    throw new Error('Missing context param from the handler callback');
  }

  // Re-use db connection between function calls
  context.callbackWaitsForEmptyEventLoop = true;

  if (!db) {

    db = mongoose.connect(config.database.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    // To avoid mutliple connections, assign before await
    await db;
  }

  return db;
}