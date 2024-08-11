import * as dotenv from 'dotenv';

dotenv.config();
export const config = () => ({
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  googleGeocodingApi: process.env.GOOGLE_GEOCODING_API
});
