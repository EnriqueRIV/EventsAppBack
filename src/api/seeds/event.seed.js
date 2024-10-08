require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../../config/db');
const Event = require('../models/Event');

const events = [
  {
    author: 'admin',
    title: 'GENTE DE ZONA CRAZY TOUR',
    location: 'Arena Stadium',
    date: '2024-10-26T00:00:00.000+00:00',
    description: 'The most crazy concert of GENTE DE ZOOONA!!!',
    imageEvent:
      'https://res.cloudinary.com/dkwfauuct/image/upload/v1726176651/folders/gentedezona_nnaau2.jpg',
    asis: []
  },
  {
    author: 'admin',
    title: 'ALL ALL STYLE PARTY',
    location: 'Party Road 21',
    date: '2027-02-01T23:00:00.000+00:00',
    description:
      'The best "All Styles" party of the year with DJ STACK, DJ FRIEND, DJ L…The best "All Styles" party of the year with DJ STACK, DJ FRIEND, DJ LATINO, DJ MUS, DJ AXON, DJ ROCKER, DJ PLAT and DJ SYNCLAIR, 7 dance floor, exotic drinks.',
    imageEvent:
      'https://res.cloudinary.com/dkwfauuct/image/upload/v1727304729/folders/cartel-fiesta_swyxjb.jpg',
    asis: []
  },
  {
    author: 'admin',
    title: 'ABRAHAM MATEO en Concierto',
    location: 'Parque Finca Liana',
    date: '2039-09-14T00:00:00.000+00:00',
    description:
      'Describir la magia de este monumental concierto será posible solo estando presente. ABRAHAM MATEO ',
    imageEvent:
      'https://res.cloudinary.com/dkwfauuct/image/upload/v1727304769/folders/CARTEL-CONCIERTO-ABRAHAM-MATEO_wsjwl2.webp',
    asis: []
  },
  {
    author: 'admin',
    title: 'Rock & Roll of The Broken Hearted',
    location: 'Dead Street',
    date: '2025-01-06T00:00:00.000+00:00',
    description:
      'The R&R party of the year!!!! Rock, rock rock & Rooooollll!!! Exclusive performance of THE HEADLINE, THE LINEUP & THE YOUR BAND',
    imageEvent:
      'https://res.cloudinary.com/dkwfauuct/image/upload/v1726177537/folders/rock-roll-poster_lkwjup.webp',
    asis: []
  },
  {
    author: 'admin',
    title: 'RETRO PARTY "The Best of The 80s"',
    location: '80 Avenue, 80',
    date: '2042-05-17T00:00:00.000+00:00',
    description:
      'If you love The 80s... This party is for you!!! Amazing music! Live Music!!! And the best DJs, DJ PARTY, DJ NIGHT and DJ DANCE',
    imageEvent:
      'https://res.cloudinary.com/dkwfauuct/image/upload/v1726177984/folders/retro-party_j3uo9k.jpg',
    asis: []
  },
  {
    author: 'admin',
    title: 'Fiesta de CARNAVAL',
    location: 'Portal del Rey, 26',
    date: '2026-02-09T00:00:00.000+00:00',
    description:
      'Ven a disfrutar de la mejor, mayor y más divertida Fiesta de Carnaval jamás antes vista, tendrás música en vivo, DJs del momento para tener un ambiente fenomenal, bebidas espirituosas a precios invatibles, disfraces, espuma y ....muchas ....muchas mas sorpresas',
    imageEvent:
      'https://res.cloudinary.com/dkwfauuct/image/upload/v1727304852/folders/carnaval-party_t1ax5q.jpg',
    asis: []
  }
];

const eventDocuments = events.map((event) => new Event(event));

connectDB()
  .then(async () => {
    const allEvents = await Event.find();

    if (allEvents.length) {
      await Event.collection.drop();
    }
  })
  .catch((error) => console.log(`Error deleting event data: ${error}`))
  .then(async () => {
    await Event.insertMany(eventDocuments);
  })
  .catch((error) => console.log(`Error creating event data: ${error}`))
  .finally(() => mongoose.disconnect());
