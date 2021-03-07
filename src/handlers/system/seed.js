import seedersList from '../../seeders';
import connectDatabase from '../../database';

/**
 * Seeds initial data to database.
 * This is invoked version of seed in case we setup a VPC
 */
export async function handle(event, context) {
  const db = await connectDatabase(context);
  let error = null;
  
  try {
    for (const key in seedersList) {
      const seederClass = seedersList[key];
      const seeder = new seederClass();
      if (await seeder.shouldRun()) {
        const results = await seeder.run();
        console.log(`Executed ${seederClass.name} %O`, results);
      } else {
        console.log(`Skipped ${seederClass.name}`);
      }
    }
  } catch (e) {
    error = e;
  } finally {
    // One time connection
    db.connection.close();
  }


  if (error) {
    throw error;
  } else {
    console.log('Done!');
  }
}