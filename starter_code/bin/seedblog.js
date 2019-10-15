
const mongoose = require('mongoose');
const Blog = require('../models/Blog');

const dbName = 'project-bloggy';
mongoose.connect(`mongodb://heroku_jkg6vq0m:oqfnjus2a3d2q1kdru665gq4qg@ds329058.mlab.com:29058/heroku_jkg6vq0m`);



const blogs = [
  {
    "text": "interneEnter text here...",
    "name": "Josue Acevedo",
    "user":"admin",
    "title": "Music blog 1",
    "picture": "slider-3.jpg",
    "category": "Music"
  },
  {
    "text": "interneEnter text here...",
    "name": "Josue Acevedo",
    "user":"admin",
    "title": "Software blog 1",
    "picture": "slider-1.jpg",
    "category": "Software"
  },
  {
    "text": "interneEnter text here...",
    "name": "Josue Acevedo",
    "user":"admin",
    "title": "IronHack Blog 2 ",
    "picture": "slider-2.jpg",
    "category": "IronHack"
  },
  {
    "text": "interneEnter text here...",
    "name": "john Smith",
    "user":"john",
    "title": "Software Blog 2",
    "picture": "beach-1.jpg",
    "category": "Software"
  },
  {
    "text": "interneEnter john text here...",
    "name": "john Smith",
    "user":"john",
    "title": "Music Blog 2",
    "picture": "slider-2.jpg",
    "category": "Music"
  },
  

];

Blog.collection.drop();

Blog.create(blogs, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${blogs.length} blogs`)
  mongoose.connection.close();
});