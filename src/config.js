/**
 * Configuration
 */
export default {
  app: {
    key: process.env.APP_KEY
  },
  database: {
    uri: process.env.DB_URI
  },
  maps: {
    nearDistanceInMeters: 1000,
    mockNearOnEmpty: process.env.MOCK_NEAR_ONEMPTY,
    busScheduleLimit: 8
  }
}