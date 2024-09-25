const express = require('express');
const usersRoutes = require('./user');
const eventsRoutes = require('./event');

const mainRouter = express.Router();

mainRouter.use('/auth', usersRoutes);
mainRouter.use('/', eventsRoutes);

module.exports = mainRouter;
