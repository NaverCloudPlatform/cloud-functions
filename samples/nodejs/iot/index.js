const redis = require('redis');
const mongoose = require('mongoose');

let redisClient;

const iotDataSchema = mongoose.Schema({
  dateOfManufactoring: String,
  dateOfRegistration: String,
  manager: String,
  battery: Number,
  date: String,
  deviceId: String,
  deviceType: String,
  temp: Number,
  Time: String,
});

const iotData = mongoose.model('iotdata', iotDataSchema);

async function getDeviceInfo(deviceId) {
  const deviceInfo = await redisClient.hGet('deviceId', deviceId);
  return JSON.parse(deviceInfo);
}

/**
 * Action retrieves `deviceInfo` from Cloud DB for Redis using `deviceId` received from an IoT trigger,
 * supplement the information received from the IoT trigger, and store it in Cloud DB for MongoDB.
 *
 * You need to set Cloud IoT Core rules to send certain information through an IoT trigger.
 *
 * Input parameters that must be defined as action parameters
 * @params {string} redisUrl: the host IP of the Redis server that the action queries `deviceInfo` from
 * @params {string} mongoUrl: the host IP of the MongoDB server that the action saves the supplemented data to
 */
async function saveIotData(params) {
  console.log({...params});
  try {
    redisClient = redis.createClient({
      url: params.redisUrl,
    });

    await redisClient.connect();
    await mongoose.connect(params.mongoUrl);

    const deviceInfo = await getDeviceInfo(params.deviceId);
    const iotDataDoc = new iotData({ ...deviceInfo, ...params });

    await iotDataDoc.save();

    return { done: true, saved: iotDataDoc };
  } catch (error) {
    throw error;
  }
}

exports.main = saveIotData;
