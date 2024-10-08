const Event = require('../models/Event');
const { deleteImgCloudinary } = require('../../utils/dlt');
const { removeItem } = require('../../utils/removeItem');

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json('Error, no events');
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (event) {
      return res.status(200).json(event);
    } else {
      return res.status(404).json('No Event found by this id');
    }
  } catch (error) {
    return next(error);
  }
};

const postEvent = async (req, res, next) => {
  try {
    const newEvent = new Event({
      author: req.body.author,
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      description: req.body.description,
      imageEvent: req.file ? req.file.path : 'not image',
      asis: []
    });
    const eventCreated = await newEvent.save();
    return res.status(200).json(eventCreated);
  } catch (error) {
    return next(error);
  }
};

const putEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventActual = await Event.findById(id);
    const eventModify = new Event(req.body);
    eventModify._id = req.params.id;
    eventModify.author = req.params.author;
    eventModify.imageEvent = req.file ? req.file.path : req.params.imageEvent;
    if (req.body.asis == ![]) {
      eventModify.asis = [...eventActual.asis];
    } else {
      eventModify.asis = [...eventActual.asis, ...[req.body.asis]];
    }

    if (eventActual.imageEvent) deleteImgCloudinary(eventActual.imageEvent);
    const eventUpdated = await Event.findByIdAndUpdate(id, eventModify);
    await eventUpdated.save();

    return res.status(200).json(eventUpdated);
  } catch (error) {
    return next(error);
  }
};

const removeUserEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventActual = await Event.findById(id);
    const eventModify = new Event(req.body);
    eventModify._id = req.params.id;
    eventModify.title = req.params.title;
    eventModify.location = req.params.location;
    eventModify.date = req.params.date;
    eventModify.description = req.params.description;
    eventModify.imageEvent = req.params.imageEvent;
    eventModify.asis = removeItem(eventActual.asis, req.body.asis);

    const eventUpdated = await Event.findByIdAndUpdate(id, eventModify);
    await eventUpdated.save();

    return res.status(200).json(eventUpdated);
  } catch (error) {
    return next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventDeleted = await Event.findByIdAndDelete(id);
    if (eventDeleted.imageEvent) deleteImgCloudinary(eventDeleted.imageEvent);
    return res
      .status(200)
      .json({ mensaje: 'This event was deleted', eventDeleted });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getEvents,
  getEventById,
  postEvent,
  putEvent,
  removeUserEvent,
  deleteEvent
};
