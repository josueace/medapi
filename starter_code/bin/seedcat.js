
const mongoose = require('mongoose');
const Category = require('../models/Category');

const dbName = 'project-bloggy';
mongoose.connect(`mongodb://heroku_jkg6vq0m:oqfnjus2a3d2q1kdru665gq4qg@ds329058.mlab.com:29058/heroku_jkg6vq0m`);



const categories = [
 
  {
    name : "IronHack",
  },
  {
    name : "Software",
  },
   {
    name : "Hardware",
  },
  {
    name : "Music",
  },
  {
    name : "Travel",
  },
  {
    name : "Food",
  },
  {
    name : "Clothing",
  },
];

Category.collection.drop();

Category.create(categories, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${categories.length} categories`)
  mongoose.connection.close();
});