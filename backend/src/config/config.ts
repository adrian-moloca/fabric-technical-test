import dotenv from 'dotenv';

dotenv.config();

// ------------ MongoDB -----------
const MONGO_USERNAME = String(process.env.MONGO_USERNAME);
const MONGO_PASSWORD = String(process.env.MONGO_PASSWORD);
const MONGO_CLUSTER = String(process.env.MONGO_CLUSTER);
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;
const SERVER_PORT = Number(process.env.SERVER_PORT);

const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};

export default config;
