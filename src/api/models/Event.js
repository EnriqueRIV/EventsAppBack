const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageEvent: { type: String, trim: true, required: true },
    asis: [{ type: mongoose.Types.ObjectId, required: false, ref: 'User' }]
  },
  {
    timestamps: true,
    collection: 'events'
  }
);

const Event = mongoose.model('events', eventSchema, 'events');

module.exports = Event;
