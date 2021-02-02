const logger = require('log4js').getLogger('index');

const {
    NODE_ENV,
    MONGO_DB_NAME,
    MONGO_HOSTNAME,
    MONGO_USERNAME,
    MONGO_PASSWORD
} = process.env

const config = {
  PRODUCTION: {
    MONGO_URI: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:27017/${MONGO_DB_NAME}`,
  },
  TEST: {
    MONGO_URI: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:27017/${MONGO_DB_NAME}`,
  },
};

logger.info('NODE_ENV: ', NODE_ENV);
module.exports = config[NODE_ENV];
