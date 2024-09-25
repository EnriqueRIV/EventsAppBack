require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const { configCloudinary } = require('./src/config/cloudinary');
const mainRouter = require('./src/api/routes/main');
const cors = require('cors');

const PORT = 3000;
const server = express();

server.use(cors());
server.use(express.json());

connectDB();
configCloudinary();

server.use('/api', mainRouter);

server.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

server.listen(PORT, () => {
  console.log(`Server connected in: http://localhost:${PORT}`);
});
