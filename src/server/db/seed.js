const db = require('./client');
const { seedDatabase } = require('./seedData');

seedDatabase()
  .catch(console.error)
  .finally(() => db.end());