const db = require('./client');

const { createUser,
        getAllUsers,
        getAllItems,
        createReview,
        createComment,
        createItem,
         } = require('./index');

const users = [
    {
      id: '0',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      password: 'securepass',
    },
    {
      id: '1',
      name: 'Liu Wei',
      email: 'liu@example.com',
      password: 'strongpass',
    },
    {
      id: '2',
      name: 'Isabella García',
      email: 'bella@example.com',
      password: 'pass1234',
    },
    {
      id: '3',
      name: 'Mohammed Ahmed',
      email: 'mohammed@example.com',
      password: 'mysecretpassword',
    },
    {
      id: '4',
      name: 'John Smith',
      email: 'john@example.com',
      password: 'password123',
    },
    // Add more user objects as needed
];  

const items = [
  {
    id: '1',
    name: 'Elijah Craig 13 Year Old Barrel Proof Batch C923',
    description: 'Aged for 13 years and 7 months.  Only releases 3 times a year and is widely sought by collectors.',
    imageUrl: 'https://elijahcraig.com/images/bottles/ec_barrel-c923-proof-detail.png',
    price: '299.99',
    alcoholContent: '66.5',
    category: 'Bourbon',
  },
  {
    id: '2',
    name: 'Woodford Reserve Double Oaked Barrel Select',
    description: 'Matured in separate, charred oak barrels. A full-bodied mix of vanilla, fruit, and spices.',
    imageUrl: 'https://www.woodfordreserve.com/wp-content/uploads/2019/12/1.png',
    price: '71.99',
    alcoholContent: '45.2',
    category: 'Bourbon',
  },
  {
    id: '3',
    name: 'Don Julio 1942',
    description: 'A tequila only produced in small batches that have been aged a minimum of two and a half years. A tribute to Don Julio Gonzalez and handmade in the traditional way.',
    imageUrl: 'https://www.donjulio.com/images/tequilas/1942-card.jpg',
    price: '175.00',
    alcoholContent: '40',
    category: 'Tequila',
  },
  {
    id: '4',
    name: 'Clase Azul Tequila Reposado',
    description: 'Premium reposado tequila aged eight months in American whiskey casks that gives an exceptionally smooth finish. Comes in their iconic decanter with a hand painted "feathered" design.',
    imageUrl: 'https://images.prismic.io/claseazul/54230971-073d-4a3f-a19e-5b33cf618281_Reposado-NBI.png?auto=compress,format&rect=12,0,507,1559&w=532&h=1636',
    price: '169.99',
    alcoholContent: '40',
    category: 'Tequila',
  },
  {
    id: '5',
    name: 'Hibiki Japanese Harmony',
    description: 'Premium blended whisky from Suntory.  Made with more than ten malt and grain whiskies and aged in five different types of casks.  Complex fruit and spice flavor with a hint of smokiness.',
    imageUrl: 'https://d3omj40jjfp5tk.cloudfront.net/products/654bcd0e821c8a705179c7d8/large.png',
    price: '84.99',
    alcoholContent: '43',
    category: 'Whiskey',
  },
  {
    id: '6',
    name: 'Crown Royal Regal Apple',
    description: 'Bright apple balanced with signature Crown Royal and spice',
    imageUrl: 'https://www.abc.virginia.gov/library/product-images/march/crown-royal-regal-apple-whiskey.jpg',
    price: '22.99',
    alcoholContent: '35',
    category: 'Whiskey',
  },
  {
    id: '7',
    name: 'Titos Handmade Vodka',
    description: 'Americas first craft vodka, Titos from Austin, Texas, has been the choice for trendy cocktailians since it hit the market in 1997. It is made from corn for a deep, rich flavor, and Abou-Ganim is a long-time fan.',
    imageUrl: 'https://www.floppysspirits.com/media/com_eshop/products/resized/BC7EA43E-525F-4984-9E2F-CE43238541B4-450x450.png',
    price: '19.99',
    alcoholContent: '40',
    category: 'Vodka',
  },
  {
    id: '8',
    name: 'Barcardi Carta Blanca Rum',
    description: 'Pure and clean, with a pleasant citrus flavour. Very smooth; no alcohol burn with a clean and smooth finish.',
    imageUrl: 'https://d3r6kbofdnmd8.cloudfront.net/media/catalog/product/cache/image/390x390/a4e40ebdc3e371adff845072e1c73f37/1/0/102726_bacardi_carta_blanca_700.jpg',
    price: '19.95',
    alcoholContent: '37.5',
    category: 'Rum',
  }
  {
    id: '9',
    name: 'Captain Morgan Black Spiced',
    description: 'A special dark spiced version of Captain Morgan, made with Caribbean rums, spices and natural flavourings, matured in oak and designed to be drunk on its own.',
    imageUrl: 'https://scene7.samsclub.com/is/image/samsclub/0008200075792_A?$DT_PDP_Image$',
    price: '37.95',
    alcoholContent: '40',
    category: 'Rum',
  }
  {
    id: '10',
    name: 'Baileys Irish Cream Liqueur',
    description: 'Category-dominating Christmas best-seller blended from cream, cocoa and Irish whiskey. Instrumental in a variety of shooters.',
    imageUrl: 'https://scene7.samsclub.com/is/image/samsclub/0008676721002_A?$DT_PDP_Image$',
    price: '14.95',
    alcoholContent: '17',
    category: 'Liqueur'
  }
  {
    id: '11',
    name: 'Jose Cuervo Especial Reposado Tequila',
    description: 'Jose Cuervo Especial® Gold is a golden blend of younger tequilas. The light gold spirit has a sweet aroma with pleasant agave notes. Along with its sweet, subtle agave flavor and hints of oak and vanilla, Especial Gold boasts a well-balanced, short, smooth finish.',
    imageUrl: 'https://drinkit.com.sv/wp-content/uploads/2020/01/TEQUILA-CUERVO-ESPECIAL-ORO-750-ML.jpg',
    price: '22.99',
    alcoholContent: '40',
    category: 'Tequila',
  }
  {
    id: '12',
    name: 'Maestro Dobel Silver',
    description: 'Maestro Dobel Silver is a double-distilled Tequila which, unusually, is not rested and is bottled straight from the still with only water added to dilute it to drinking strength. A superb, complex, cocktail ingredient.',
    imageUrl: 'https://cdn11.bigcommerce.com/s-b0811/products/3688/images/21864/maestro-silver-tequila__55333.1658723615.480.480.jpg?c=2',
    price: '19.95',
    alcoholContent: '40',
    category: 'Tequila', 
  }
  {
    id: '13',
    name: 'Jinro Plum Soju',
    description: 'Korea- Infused with fresh, sweet-tasting plums. Jinro Plum has become one of the most popular fruit infused Soju in Korea and represents a new twist on a Korean favorite. It is best served ice-cold, neat, or as a small pour in a chilled traditional cup.',
    imageUrl: 'https://www.raanthai.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/j/k/jkd042lg.jpg',
    price: '6.99',
    alcoholContent: '13',
    category: 'Soju',
  }
  {
    id: '14',
    name: 'Corona Extra',
    description: 'Some sweet malt and a bit of that signature skunkiness come through on the nose, along with a hint of citrus and green apple.',
    imageUrl: 'https://mmv2api.s3.us-east-2.amazonaws.com/products/thumbs/IMG_4967.jpg',
    price: '32.99',
    alcoholContent: '4.6',
    category: 'Beer',
  }
  {
    id: '15',
    name: 'Modelo Especial',
    description: 'Well-balanced taste and light hop character with a crisp, clean finish. Modelo Especial is characterized by an orange blossom honey aroma with a hint of herb. Modelo Especial contains Water, Barley Malt, Non-malted Cereals and Hops.',
    imageUrl: 'https://produits.bienmanger.com/35131-0w470h470_Modelo_Especial_Beer_From_Mexico.jpg',
    price: '33.99',
    alcoholContent: '4.4',
    category: 'Beer',
  }
  {
    id: '16',
    name: 'Fireball Cinnamon Whisky',
    description: 'Canada- Nose is full of grated cinnamon which carries over to the body full of spice, sugar, and a long, lingering cinnamon burn. The balance is right and the tastes are authentic. Tastes like heaven; burns like hell.',
    imageUrl: 'https://cdn2.bigcommerce.com/server900/b0811/products/1475/images/1588/IMG_2108__91057.1329517376.480.480.JPG?c=2',
    price: '18.49',
    alcoholContent: '66',
    category: 'Liqueur',
  }
  {
    id: '17',
    name: 'Angry Orchard Crisp Hard Apple Cider',
    description: 'New York- Fruit Cider- This crisp and refreshing cider mixes the sweetness of the apples with a subtle dryness for a balanced cider taste. The fresh apple aroma and slightly sweet, ripe apple flavor make this cider hard to resist.',
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_d4d2e75a-b7b0-4256-a64c-d7ae7716ae49?wid=488&hei=488&fmt=pjpeg',
    price: '11.49',
    alcoholContent: '5',
    category: 'Cider',
  }
  {
    id: '18',
    name: 'Mikes Hard Lemonade',
    description: 'Lemonade- 5% ABV. A hard day calls for a hard lemonade. The ultimate refresher, mikes hard lemonade combines natural lemon flavors with a kiss of carbonation.',
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3d809475-1511-4957-87fc-9336ba893561?wid=488&hei=488&fmt=pjpeg',
    price: '11.49',
    alcoholContent: '5',
    category: 'flavored Beverage',
  }
  {
    id: '19',
    name: 'Antinori Badia a Passignano Chianti Classico Gran Selezione 2019',
    description: 'ruby red in color. Intense on the nose with notes of ripe red fruit, liqueur cherries, and sour cherries together with citrusy hints of red oranges and delicate floral sensations of lavender. Its complex bouquet is completed by sweet notes of vanilla and pleasant spicy aromas of cloves and leather. On the palate the mouth filling entry is sustained by silky, vibrant tannins than accompany a lengthy finish, persistent and sapid, with a pleasant aftertaste of bitter cocoa and citrus.',
    imageUrl: 'https://vinpiu.com/2457-medium_default/badia-a-passignano-chianti-classico-gran-selezione-2019.jpg',
    price: '63.99',
    alcoholContent: '14',
    category: "Red wine",
  }
  {
    id: '20',
    name: 'Lloyd Chardonnay Carneros',
    description: 'firm, intense and concentrated, with flavors of ripe apple, juicy melon, honeysuckle, pineapple and vanilla. A rich mouthfeel balanced with just enough acidity.',
    imageUrl: 'https://www.tastings.com/Product-Images/Wine/2018/4_3_2018/223694_fr.jpg',
    price: '49.99',
    alcoholContent: '14.5',
    category: 'White Wine',
  }
  {
    id: '21',
    name: 'King Maui Marlborough Sauvignon Blanc',
    description: 'A herbaceous and tropical Sauvignon Blanc featuring fresh green melon, citrus, and grapefruit flavors. It is refreshing on the palate and has a crisp, mouth-watering finish.',
    imageUrl: 'https://www.totalwine.com/dynamic/x1000,sq/media/sys_master/twmmedia/h6d/h9b/15197832249374.png',
    price: '12.49',
    alcoholContent: '12.5',
    category: 'White wine'
  }
  {
    id: '22',
    name: 'White Claw Hard Seltzer Variety Pack',
    description: "White Claw Hard Seltzer is the nation's leading hard seltzer known for pure, crisp refreshment. This 24 pack will cater to any and all occasions and will please any crowd.",
    imageUrl: 'https://www.kroger.com/product/images/large/front/0063598510024',
    price: '30.99',
    alcoholContent: '5',
    category: 'Hard Seltzer',
  }
  {
    id: '23',
    name: 'Hennessy VS Cognac',
    description: 'A blend of over 40 eaux de vies from the four premier growing regions of Cognac. Beautiful golden color with a fruity sweetness and a hint of vanilla in the finish. A classic.',
    imageUrl: 'https://greenhills.bluebottleonline.co.za/wp-content/uploads/2020/04/Hennessy_VS_Cognac_1x750ml.jpg',
    price: '35.99',
    alcoholContent: '40',
    category: 'Cognac',
  }
  {
    id: '24',
    name: 'Wolcott Bottled In Bond Kentucky Straight Bourbon',
    description: 'From the famous Barton 1792 Distillery, a BiB that brings to life powerful, vanilla bean and leather aroma followed by a leathery finish.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0050/2395/7103/products/13805417660446_700x@2x.png?v=1626706136',
    price: '39.99',
    alcoholContent: '50',
    category: 'Bourbon',
  }
  {
  id: '25',
  name: 'Charing Cross London Dry Gin',
  description: "A classic London dry gin that's juniper forward with a nice balance of botanicals. This gin features a botanical blend of juniper, coriander, orange, and angelica root. Perfect to enjoy with your favorite tonic.",
  imageUrl: 'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/heb/h93/15909943246878.png',
  price: '27.99',
  alcoholContent: '40',
  category: 'Gin',
  }

  
  
]

const reviews = [
  {
    itemId: '5',
    userId: '1',
    content: 'If you are going to try a Japanese whiskey, you can do a lot worse than Hibiki Harmony.  It has the mellower flavors common of Japanese whiskey but brings a complex profile that even drinkers who prefer higher proofs will enjoy.',
    rating: '88'
  },
  {
    itemId: '4',
    userId: '5',
    content: 'Way too sweet.  After spending a preimum, I expected a premium experience.  While it has a nice, smooth flavor at first, it is then ruined by an overly strong sweetness.  Would not recommend for the price.  At least the bottle is nice.',
    rating: '45'
  },
  {
    itemId: '4',
    userId: '4',
    content: `'Months of searching finally at an end! This bottle won't last long when it is so easy to drink!  The strong vanilla flavor is the perfect way to treat yourself after a long day.'`,
    rating: '92'
  },
]

const comments = [
  {
    reviewId: '1',
    userId: '2',
    content: 'Was on the fence but now I think I will look for a bottle tomorrow.',
  },
  {
    reviewId: '3',
    userId: '3',
    content: 'Nice! Was looking for something for specical occasions.',
  },
  {
    reviewId: '2',
    userId: '2',
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
        alcoholContent DECIMAL(3,1),
        category VARCHAR(255) NOT NULL
      );
    `, console.log('created items table'))
    
    await db.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "itemId" INTEGER REFERENCES items(id),
        "userId" INTEGER REFERENCES users(id),
        content TEXT NOT NULL,
        rating INTEGER NOT NULL,
        UNIQUE ("itemId", "userId")
      );
    `,console.log('created reviews table'))

    await db.query(`
      CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        "reviewId" INTEGER REFERENCES reviews(id),
        "userId" INTEGER REFERENCES users(id),
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
      price: item.price, alcoholContent: item.alcoholContent, category: item.category});
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
      await createReview({itemId: review.itemId, userId: review.userId, content: review.content, rating: review.rating});
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
      await createComment({reviewId: comment.reviewId, userId: comment.userId, content: comment.content});
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