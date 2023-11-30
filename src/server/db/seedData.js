const db = require('./client')

const { createUser,
        getAllItems,
        createReview,
        createComment,
         } = require('./index');


const users = [
    {
      name: 'Emily Johnson',
      email: 'emily@example.com',
      password: 'securepass',
    },
    {
      name: 'Liu Wei',
      email: 'liu@example.com',
      password: 'strongpass',
    },
    {
      name: 'Isabella García',
      email: 'bella@example.com',
      password: 'pass1234',
    },
    {
      name: 'Mohammed Ahmed',
      email: 'mohammed@example.com',
      password: 'mysecretpassword',
    },
    {
      name: 'John Smith',
      email: 'john@example.com',
      password: 'password123',
    },
    // Add more user objects as needed
];  
        
const dropTables = async () => {
  console.log('Dropping All Tables...')
  try {
      await db.query(`
      DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS items;
      DROP TABLE IF EXISTS users;
      `)
    }
      catch(err) {
        throw err;
    }
}
        
const createTables = async () => {
  console.log('Creating tables...')
  try{
    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        )`);

    await db.query(`
      CREATE TABLE items(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        alcoholContent DECIMAL(4,2),
        tags VARCHAR(255) NOT NULL
      )`);

    await db.query(`
      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "itemId" INTEGER REFERENCES items(id),
        "userId" INTEGER REFERENCES users(id),
        content TEXT NOT NULL,
        rating INTEGER(100) NOT NULL
      )`);

    await db.query(`
      CREATE TABLE comments(
        id SERIAL PRIMARY KEY,
        "reviewId" INTEGER REFERENCES reviews(id),
        "userId" INTEGER REFERENCES users(id),
        content TEXT NOT NULL
      )`);
    console.log("Finished building tables");
  }
    catch(err) {
      console.error("Error building tables");
      throw err;
    }
}
        
const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
    } catch (error) {
        console.error('Error inserting seed data:', error);
      }
};

const insertItems = async () => {
  try {
    
  }
}
        
const seedDatabase = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
  }
    catch (err) {
      throw err;
    }
    finally {
      db.end()
    }
}
        
module.exports = {
  seedDatabase
};