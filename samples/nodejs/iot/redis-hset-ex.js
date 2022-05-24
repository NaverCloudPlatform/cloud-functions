const redis = require('redis');

async function redisHsetExample(params) {
  const redisClient = redis.createClient({
    url: params.redisUrl,
  });

  await redisClient.connect();

  await redisClient.hSet(
    'deviceId',
    1,
    JSON.stringify({
      dateOfManufactoring: '11/27/2005',
      dateOfRegistration: '9/25/2019',
      manager: 'Yoon, M.S.',
    })
  );
  await redisClient.hSet(
    'deviceId',
    2,
    JSON.stringify({
      dateOfManufactoring: '5/24/2019',
      dateOfRegistration: '1/15/2021',
      manager: 'Hwang, B.S',
    })
  );
  await redisClient.hSet(
    'deviceId',
    3,
    JSON.stringify({
      dateOfManufactoring: '3/18/2012',
      dateOfRegistration: '4/1/2012',
      manager: 'Lee, S.H.',
    })
  );
}

exports.main = redisHsetExample;
