const express = require('express');
const {
  getEvents,
  getEventById,
  postEvent,
  deleteEvent,
  putEvent,
  removeUserEvent
} = require('../controllers/event');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/isadmin');
const { uploadFileEvent } = require('../../middlewares/uploadfile');

const eventsRoutes = express.Router();

eventsRoutes.get('/events', getEvents);
eventsRoutes.get('/events/:id', [isAuth], getEventById);
eventsRoutes.post(
  '/user/events',
  [isAuth],
  uploadFileEvent.single('imageEvent'),
  postEvent
);
eventsRoutes.delete('/user/events/:id', [isAdmin], deleteEvent);
eventsRoutes.put(
  '/user/attendees/:id',
  [isAuth],
  uploadFileEvent.single('imageEvent'),
  putEvent
);
eventsRoutes.put('/user/:id', [isAuth], removeUserEvent);

module.exports = eventsRoutes;
