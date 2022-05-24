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
  const deviceInfo = await redisClient.hget('devcieId', deviceId);

  return JSON.parse(deviceInfo);
}

async function saveIotData(params) {
  try {
    redisClient = redis.createClient({
      url: params.redisUrl,
    });

    await redisClient.connect();
    await mongoose.connect(params.mongoUrl);

    const deviceInfo = getDeviceInfo(params.deviceId);
    const iotDataDoc = new iotData({ ...deviceInfo, ...params });

    await iotDataDoc.save();

    return { done: true, saved: iotDataDoc };
  } catch (error) {
    throw error;
  }
}

exports.main = saveIotData;
