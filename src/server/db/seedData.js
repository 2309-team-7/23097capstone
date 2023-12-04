const db = require('./client');

const { createUser,
        createReview,
        createComment,
        createItem,
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

const items = [
  {
    name: 'Elijah Craig 13 Year Old Barrel Proof Batch C923',
    description: 'Aged for 13 years and 7 months.  Only releases 3 times a year and is widely sought by collectors.',
    imageUrl: 'https://elijahcraig.com/images/bottles/ec_barrel-c923-proof-detail.png',
    price: '299.99',
    alcoholContent: '66.5',
    category: 'Bourbon',
  },
  {
    name: 'Woodford Reserve Double Oaked Barrel Select',
    description: 'Matured in separate, charred oak barrels. A full-bodied mix of vanilla, fruit, and spices.',
    imageUrl: 'https://www.woodfordreserve.com/wp-content/uploads/2019/12/1.png',
    price: '71.99',
    alcoholContent: '45.2',
    category: 'Bourbon',
  },
  {
    name: 'Don Julio 1942',
    description: 'A tequila only produced in small batches that have been aged a minimum of two and a half years. A tribute to Don Julio Gonzalez and handmade in the traditional way.',
    imageUrl: 'https://www.donjulio.com/images/tequilas/1942-card.jpg',
    price: '175.00',
    alcoholContent: '40',
    category: 'Tequila',
  },
  {
    name: 'Clase Azul Tequila Reposado',
    description: 'Premium reposado tequila aged eight months in American whiskey casks that gives an exceptionally smooth finish. Comes in their iconic decanter with a hand painted "feathered" design.',
    imageUrl: 'https://images.prismic.io/claseazul/54230971-073d-4a3f-a19e-5b33cf618281_Reposado-NBI.png?auto=compress,format&rect=12,0,507,1559&w=532&h=1636',
    price: '169.99',
    alcoholContent: '40',
    category: 'Tequila',
  },
  {
    name: 'Hibiki Japanese Harmony',
    description: 'Premium blended whisky from Suntory.  Made with more than ten malt and grain whiskies and aged in five different types of casks.  Complex fruit and spice flavor with a hint of smokiness.',
    imageUrl: 'https://d3omj40jjfp5tk.cloudfront.net/products/654bcd0e821c8a705179c7d8/large.png',
    price: '84.99',
    alcoholContent: '43',
    category: 'Whiskey',
  },
]

const reviews = [
  {
    item_id: '5',
    user_id: '1',
    content: 'If you are going to try a Japanese whiskey, you can do a lot worse than Hibiki Harmony.  It has the mellower flavors common of Japanese whiskey but brings a complex profile that even drinkers who prefer higher proofs will enjoy.',
    rating: '88'
  },
  {
    item_id: '4',
    user_id: '5',
    content: 'Way too sweet.  After spending a preimum, I expected a premium experience.  While it has a nice, smooth flavor at first, it is then ruined by an overly strong sweetness.  Would not recommend for the price.  At least the bottle is nice.',
    rating: '45'
  },
  {
    item_id: '4',
    user_id: '4',
    content: `'Months of searching finally at an end! This bottle won't last long when it is so easy to drink!  The strong vanilla flavor is the perfect way to treat yourself after a long day.'`,
    rating: '92'
  },
]

const comments = [
  {
    review_id: '1',
    user_id: '2',
    content: 'Was on the fence but now I think I will look for a bottle tomorrow.',
  },
  {
    review_id: '3',
    user_id: '3',
    content: 'Nice! Was looking for something for specical occasions.',
  },
  {
    review_id: '2',
    user_id: '2',
    content: 'Such a shame it did not live up to expectations.',
  }
]
        
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
  try{
    console.log('Creating tables...');

    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `, console.log('created users table'))

    await db.query(`
      CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        alcohol_content DECIMAL(3,1),
        category VARCHAR(255) NOT NULL
      );
    `, console.log('created items table'))
    
    await db.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        item_Id INTEGER REFERENCES items(id),
        user_Id INTEGER REFERENCES users(id),
        content TEXT NOT NULL,
        rating INTEGER NOT NULL,
        UNIQUE (item_Id, user_Id)
      );
    `,console.log('created reviews table'))

    await db.query(`
      CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        review_Id INTEGER REFERENCES reviews(id),
        user_Id INTEGER REFERENCES users(id),
        content TEXT NOT NULL
      );
    `, console.log('created comments table'))

    console.log("Finished building tables");
  } catch(err) {
      console.error("Error building tables");
      throw err;
    }
  }
        
const insertUsers = async () => {
  try {
    console.log('Inserting users...')
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
    } catch (error) {
        console.error('Error inserting user seed data:', error);
      }
};

const insertItems = async () => {
  try {
    console.log('Inserting items...')
    for ( const item of items) {
      await createItem({name: item.name, description: item.description, imageUrl: item.imageUrl,
      price: item.price, alcohol_content: item.alcohol_content, category: item.category});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
      console.error('Error inserting item seed data:', error);
  }
};

const insertReviews = async () => {
try {
  console.log('Inserting reviews...')
    for ( const review of reviews ) {
      await createReview({item_id: review.item_id, user_id: review.user_id, content: review.content, rating: review.rating});
    } 
    console.log('Seeded data inserted successfully.')
  } catch (error) {
      console.error('Error inserting review seed data:', error)
  }
};

const insertComments = async () => {
  try {
    console.log('Inserting comments...')
    for ( const comment of comments ) {
      await createComment({review_id: comment.review_id, user_id: comment.user_id, content: comment.content});
    }
    console.log('Seed data inserted successfully.')
  } catch (error) {
      console.error('Error inserting comment seed data:', error)
  }
}
        
const seedDatabase = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertItems();
    await insertReviews();
    await insertComments();
  }
    catch (err) {
      console.log('Error during seedDatabase')
      throw err;
    }
    finally {
      db.end()
    }
}
        
module.exports = {
  seedDatabase
};