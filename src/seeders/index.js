import ApiTokenSeeder from './ApiTokenSeeder';
import BusSeeder from './BusSeeder';
import BusScheduleSeeder from './BusScheduleSeeder';
import BusStopSeeder from './BusStopSeeder';

export default [
  ApiTokenSeeder,
  // Dev seeders only. Do not uncomment for prod
  BusSeeder,
  BusStopSeeder,
  BusScheduleSeeder
];