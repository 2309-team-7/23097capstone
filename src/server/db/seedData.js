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
      is_admin: 'TRUE'
    },
    {
      name: 'Liu Wei',
      email: 'liu@example.com',
      password: 'strongpass',
      is_admin: 'TRUE'
    },
    {
      name: 'Isabella García',
      email: 'bella@example.com',
      password: 'pass1234',
      is_admin: 'FALSE'
    },
    {
      name: 'Mohammed Ahmed',
      email: 'mohammed@example.com',
      password: 'mysecretpassword',
      is_admin: 'FALSE'
    },
    {
      name: 'John Smith',
      email: 'john@example.com',
      password: 'password123',
      is_admin: 'FALSE'
    },
    {
      name: 'Hello World',
      email: 'test@example.com',
      password: 'hunter2',
      is_admin: 'TRUE'
    }
    // Add more user objects as needed
];  

const items = [
  {
    name: 'Elijah Craig 13 Year Old Barrel Proof Batch C923',
    description: 'Aged for 13 years and 7 months.  Only releases 3 times a year and is widely sought by collectors.',
    imageUrl: 'https://elijahcraig.com/images/bottles/ec_barrel-c923-proof-detail.png',
    price: '299.99',
    alcohol_content: '66.5',
    category: 'Bourbon',
  },
  {
    name: 'Woodford Reserve Double Oaked Barrel Select',
    description: 'Matured in separate, charred oak barrels. A full-bodied mix of vanilla, fruit, and spices.',
    imageUrl: 'https://www.woodfordreserve.com/wp-content/uploads/2019/12/1.png',
    price: '71.99',
    alcohol_content: '45.2',
    category: 'Bourbon',
  },
  {
    name: 'Don Julio 1942',
    description: 'A tequila only produced in small batches that have been aged a minimum of two and a half years. A tribute to Don Julio Gonzalez and handmade in the traditional way.',
    imageUrl: 'https://www.donjulio.com/images/tequilas/1942-card.jpg',
    price: '175.00',
    alcohol_content: '40',
    category: 'Tequila',
  },
  {
    name: 'Clase Azul Tequila Reposado',
    description: 'Premium reposado tequila aged eight months in American whiskey casks that gives an exceptionally smooth finish. Comes in their iconic decanter with a hand painted "feathered" design.',
    imageUrl: 'https://images.prismic.io/claseazul/54230971-073d-4a3f-a19e-5b33cf618281_Reposado-NBI.png?auto=compress,format&rect=12,0,507,1559&w=532&h=1636',
    price: '169.99',
    alcohol_content: '40',
    category: 'Tequila',
  },
  {
    name: 'Hibiki Japanese Harmony',
    description: 'Premium blended whisky from Suntory.  Made with more than ten malt and grain whiskies and aged in five different types of casks.  Complex fruit and spice flavor with a hint of smokiness.',
    imageUrl: 'https://d3omj40jjfp5tk.cloudfront.net/products/654bcd0e821c8a705179c7d8/large.png',
    price: '84.99',
    alcohol_content: '43',
    category: 'Whiskey',
  },
  {
    name: 'Crown Royal Regal Apple',
    description: 'Bright apple balanced with signature Crown Royal and spice',
    imageUrl: 'https://www.abc.virginia.gov/library/product-images/march/crown-royal-regal-apple-whiskey.jpg',
    price: '22.99',
    alcoholContent: '35',
    category: 'Whiskey',
  },
  {
    name: 'Titos Handmade Vodka',
    description: 'Americas first craft vodka, Titos from Austin, Texas, has been the choice for trendy cocktailians since it hit the market in 1997. It is made from corn for a deep, rich flavor, and Abou-Ganim is a long-time fan.',
    imageUrl: 'https://www.floppysspirits.com/media/com_eshop/products/resized/BC7EA43E-525F-4984-9E2F-CE43238541B4-450x450.png',
    price: '19.99',
    alcoholContent: '40',
    category: 'Vodka',
  },
  {
    name: 'Barcardi Carta Blanca Rum',
    description: 'Pure and clean, with a pleasant citrus flavour. Very smooth; no alcohol burn with a clean and smooth finish.',
    imageUrl: 'https://d3r6kbofdnmd8.cloudfront.net/media/catalog/product/cache/image/390x390/a4e40ebdc3e371adff845072e1c73f37/1/0/102726_bacardi_carta_blanca_700.jpg',
    price: '19.95',
    alcoholContent: '37.5',
    category: 'Rum',
  },
  {
    name: 'Captain Morgan Black Spiced',
    description: 'A special dark spiced version of Captain Morgan, made with Caribbean rums, spices and natural flavourings, matured in oak and designed to be drunk on its own.',
    imageUrl: 'https://scene7.samsclub.com/is/image/samsclub/0008200075792_A?$DT_PDP_Image$',
    price: '37.95',
    alcoholContent: '40',
    category: 'Rum',
  },
  {
    name: 'Baileys Irish Cream Liqueur',
    description: 'Category-dominating Christmas best-seller blended from cream, cocoa and Irish whiskey. Instrumental in a variety of shooters.',
    imageUrl: 'https://scene7.samsclub.com/is/image/samsclub/0008676721002_A?$DT_PDP_Image$',
    price: '14.95',
    alcoholContent: '17',
    category: 'Liqueur'
  },
  {
    name: 'Jose Cuervo Especial Reposado Tequila',
    description: 'Jose Cuervo Especial® Gold is a golden blend of younger tequilas. The light gold spirit has a sweet aroma with pleasant agave notes. Along with its sweet, subtle agave flavor and hints of oak and vanilla, Especial Gold boasts a well-balanced, short, smooth finish.',
    imageUrl: 'https://drinkit.com.sv/wp-content/uploads/2020/01/TEQUILA-CUERVO-ESPECIAL-ORO-750-ML.jpg',
    price: '22.99',
    alcoholContent: '40',
    category: 'Tequila',
  },
  {
    name: 'Maestro Dobel Silver',
    description: 'Maestro Dobel Silver is a double-distilled Tequila which, unusually, is not rested and is bottled straight from the still with only water added to dilute it to drinking strength. A superb, complex, cocktail ingredient.',
    imageUrl: 'https://cdn11.bigcommerce.com/s-b0811/products/3688/images/21864/maestro-silver-tequila__55333.1658723615.480.480.jpg?c=2',
    price: '19.95',
    alcoholContent: '40',
    category: 'Tequila', 
  },
  {
    name: 'Jinro Plum Soju',
    description: 'Korea- Infused with fresh, sweet-tasting plums. Jinro Plum has become one of the most popular fruit infused Soju in Korea and represents a new twist on a Korean favorite. It is best served ice-cold, neat, or as a small pour in a chilled traditional cup.',
    imageUrl: 'https://www.raanthai.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/j/k/jkd042lg.jpg',
    price: '6.99',
    alcoholContent: '13',
    category: 'Soju',
  },
  {
    name: 'Corona Extra',
    description: 'Some sweet malt and a bit of that signature skunkiness come through on the nose, along with a hint of citrus and green apple.',
    imageUrl: 'https://mmv2api.s3.us-east-2.amazonaws.com/products/thumbs/IMG_4967.jpg',
    price: '32.99',
    alcoholContent: '4.6',
    category: 'Beer',
  },
  {
    name: 'Modelo Especial',
    description: 'Well-balanced taste and light hop character with a crisp, clean finish. Modelo Especial is characterized by an orange blossom honey aroma with a hint of herb. Modelo Especial contains Water, Barley Malt, Non-malted Cereals and Hops.',
    imageUrl: 'https://produits.bienmanger.com/35131-0w470h470_Modelo_Especial_Beer_From_Mexico.jpg',
    price: '33.99',
    alcoholContent: '4.4',
    category: 'Beer',
  },
  {
    name: 'Fireball Cinnamon Whisky',
    description: 'Canada- Nose is full of grated cinnamon which carries over to the body full of spice, sugar, and a long, lingering cinnamon burn. The balance is right and the tastes are authentic. Tastes like heaven; burns like hell.',
    imageUrl: 'https://cdn2.bigcommerce.com/server900/b0811/products/1475/images/1588/IMG_2108__91057.1329517376.480.480.JPG?c=2',
    price: '18.49',
    alcoholContent: '66',
    category: 'Liqueur',
  },
  {
    name: 'Angry Orchard Crisp Hard Apple Cider',
    description: 'New York- Fruit Cider- This crisp and refreshing cider mixes the sweetness of the apples with a subtle dryness for a balanced cider taste. The fresh apple aroma and slightly sweet, ripe apple flavor make this cider hard to resist.',
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_d4d2e75a-b7b0-4256-a64c-d7ae7716ae49?wid=488&hei=488&fmt=pjpeg',
    price: '11.49',
    alcoholContent: '5',
    category: 'Cider',
  },
  {
    name: 'Mikes Hard Lemonade',
    description: 'Lemonade- 5% ABV. A hard day calls for a hard lemonade. The ultimate refresher, mikes hard lemonade combines natural lemon flavors with a kiss of carbonation.',
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_3d809475-1511-4957-87fc-9336ba893561?wid=488&hei=488&fmt=pjpeg',
    price: '11.49',
    alcoholContent: '5',
    category: 'flavored Beverage',
  },
  {
    name: 'Antinori Badia a Passignano Chianti Classico Gran Selezione 2019',
    description: 'ruby red in color. Intense on the nose with notes of ripe red fruit, liqueur cherries, and sour cherries together with citrusy hints of red oranges and delicate floral sensations of lavender. Its complex bouquet is completed by sweet notes of vanilla and pleasant spicy aromas of cloves and leather. On the palate the mouth filling entry is sustained by silky, vibrant tannins than accompany a lengthy finish, persistent and sapid, with a pleasant aftertaste of bitter cocoa and citrus.',
    imageUrl: 'https://vinpiu.com/2457-medium_default/badia-a-passignano-chianti-classico-gran-selezione-2019.jpg',
    price: '63.99',
    alcoholContent: '14',
    category: "Red wine",
  },
  {
    name: 'Lloyd Chardonnay Carneros',
    description: 'firm, intense and concentrated, with flavors of ripe apple, juicy melon, honeysuckle, pineapple and vanilla. A rich mouthfeel balanced with just enough acidity.',
    imageUrl: 'https://www.tastings.com/Product-Images/Wine/2018/4_3_2018/223694_fr.jpg',
    price: '49.99',
    alcoholContent: '14.5',
    category: 'White Wine',
  },
  {
    name: 'King Maui Marlborough Sauvignon Blanc',
    description: 'A herbaceous and tropical Sauvignon Blanc featuring fresh green melon, citrus, and grapefruit flavors. It is refreshing on the palate and has a crisp, mouth-watering finish.',
    imageUrl: 'https://www.totalwine.com/dynamic/x1000,sq/media/sys_master/twmmedia/h6d/h9b/15197832249374.png',
    price: '12.49',
    alcoholContent: '12.5',
    category: 'White wine',
  },
  {
    name: 'White Claw Hard Seltzer Variety Pack',
    description: "White Claw Hard Seltzer is the nation's leading hard seltzer known for pure, crisp refreshment. This 24 pack will cater to any and all occasions and will please any crowd.",
    imageUrl: 'https://www.kroger.com/product/images/large/front/0063598510024',
    price: '30.99',
    alcoholContent: '5',
    category: 'Hard Seltzer',
  },
  {
    name: 'Hennessy VS Cognac',
    description: 'A blend of over 40 eaux de vies from the four premier growing regions of Cognac. Beautiful golden color with a fruity sweetness and a hint of vanilla in the finish. A classic.',
    imageUrl: 'https://greenhills.bluebottleonline.co.za/wp-content/uploads/2020/04/Hennessy_VS_Cognac_1x750ml.jpg',
    price: '35.99',
    alcoholContent: '40',
    category: 'Cognac',
  },
  {
    name: 'Wolcott Bottled In Bond Kentucky Straight Bourbon',
    description: 'From the famous Barton 1792 Distillery, a BiB that brings to life powerful, vanilla bean and leather aroma followed by a leathery finish.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0050/2395/7103/products/13805417660446_700x@2x.png?v=1626706136',
    price: '39.99',
    alcoholContent: '50',
    category: 'Bourbon',
  },
  {
    name: 'Charing Cross London Dry Gin',
  description: "A classic London dry gin that's juniper forward with a nice balance of botanicals. This gin features a botanical blend of juniper, coriander, orange, and angelica root. Perfect to enjoy with your favorite tonic.",
  imageUrl: 'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/heb/h93/15909943246878.png',
  price: '27.99',
  alcoholContent: '40',
  category: 'Gin',
  },
  {
    name: 'Rémy Martin 1738 Accord Royal VSOP Cogncac',
    description: 'Velvet blend of an oaky eaux-de-vie.  This cognac lives up to the name with a taste of opulence only royals have enjoyed.',
    imageUrl: 'https://static-prod.remymartin.com/app/uploads/2023/10/teaser-l2-remy-martin-1738-accord-royal-buy-online-231027-461x600.jpg',
    price: '80.00',
    alcohol_content: '40',
    category: 'Cognac'
  },
  {
    name: 'Johnnie Walker Blue Label',
    description: 'Only rare Scotch Whiskies with remarkable flavor get chosen for this spirit.  Only one in ten thousand barrels get chosen.  Best served neat.',
    imageUrl: 'https://d3omj40jjfp5tk.cloudfront.net/products/5bf9a9fc1859dd1605986510/large.png',
    price: '59.99',
    alcohol_content: '40',
    category: 'Whiskey'
  },
  {
    name: 'Buffalo Trace',
    description: 'Made from the corn, rye, and barely malt and distilled, aged, and bottle at the most award-winning distillery in the world.  This whiskey ages in new oak barrels until mature.',
    imageUrl: 'https://onestopbourbons.com/wp-content/uploads/2023/03/mi-buffalo-trace-bourbon-d25aeb4cf55b74d2.jpeg',
    price: '24.99',
    alcohol_content: '45',
    category: 'Bourbon'
  },
  {
    name: 'Grey Goose VX Vodka',
    description: 'Grey goose vodka mixed with a dash of cognac that adds just enough complexity.  Tastes of signature grey goose vodka with fruit and floral notes that is best enjoyed on the rocks.',
    imageUrl: 'https://images.liquorapps.com/jp/bg/72238-Grey-Goose-VX-Premium-Vodka.jpg',
    price: '79.99',
    alcohol_content: '40',
    category: 'Vodka'
  },
  {
    name: 'Glenfiddich Grande Couronne 26 Year Old',
    description: 'Matured for 26 years, with over 2 years in cognac casks that adds layers of sweet oak and brown sugar, this is the epitome of opulence.  A crown fit for the grandest of occasions.',
    imageUrl: 'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h9e/hda/14820013375518.png',
    price: '599.00',
    alcohol_content: '43.8',
    category: 'Scotch'
  },
  {
    name: `Maker's Mark`,
    description: `Made with soft red winter wheat that has been aged to taste,not by time.  Find the bottle with it's signature hand-dipped red wax.`,
    imageUrl: 'https://www.makersmark.com/sites/default/files/styles/c_20_product_hero/public/2023-07/makers_mark_0.png.webp?itok=3GyscobF',
    price: '27.99',
    alcohol_content: '45',
    category: 'Bourbon'
  },
  {
    name: `Jack Daniel's 10 Year Old Tennessee`,
    description: `Jack Daniel's whiskey barrels stored in different barrel houses through the ten years gives this whiskey an intense and unique character.  The tempature variation of the different storage location combined with time gives this whiskey a whole new flavor.`,
    imageUrl: 'https://www.reservebar.com/dw/image/v2/BJBF_PRD/on/demandware.static/-/Sites-reserveba[…]es/19954a63848c2aa58520454a7da96ed4f198d651.png?sh=630&q=80',
    price: '81.00',
    alcohol_content: '48.5',
    category: 'Whiskey'
  },
  {
    name: 'Eagle Rare Bourbon 10 Years Old',
    description: 'Complex aromas and a well-integrated taste that pervades the experience.  This masterfully crafted bourbon is the only bourbon that won double gold five times at the San Francisco World Spirits Competition.',
    imageUrl: 'https://eaglerare.com/sites/default/files/2017-06/eagle_rare_bottle_17yr_lg.png',
    price: '30.00',
    alcohol_content: '45',
    category: 'Bourbon'
  },
  {
    name: `Blanton's Gold Edition`,
    description: `Created for bourbon aficionados, This seeks to bring an exceptional smoothness and complexity to the already revered Blanton brand.  Marked by honey on it's aroma and palate, this bourbon has an extremely long, enjoyable finish.`,
    imageUrl: 'https://www.blantonsbourbon.com/cdn/shop/files/Product_Page_Gold_International_Domestic_38fea3fe-5609-4984-b9e3-f8e9aab4ec85_1080x.jpg?v=1613787518',
    price: '249.99',
    alcohol_content: '51.5',
    category: 'Bourbon'
  },
  {
    name: 'Don Julio Blanco',
    description: 'The base from which all other Don Julio variants are derived.  Crisp agave flavor makes for a great ingredient in mixing. Can also be enjoyed neat or on the rocks.',
    imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_10545e0a-90d3-4f51-b903-f08b6098dab1?wid=1200&hei=1200&qlt=80&fmt=webp',
    price: '49.99',
    alcohol_content: '40',
    category: 'Tequila'
  },
  {
    name: 'Colonel E.H. Taylor Small Batch',
    description: 'Handmade and aged inside century old warehouses constructed by E.H. Taylor, Jr.  Each barrel has been evaluated and selected to create a prefect blend of distinctive character.  A true sipping bourbon.',
    imageUrl: 'https://www.buffalotracedistillery.com/our-brands/e-h-taylor-jr/e-h-taylor-jr-small-batch/_j[…]631043068049/eh-taylor-small-batch-desktop-bottle.png',
    price: '185.00',
    alcohol_content: '50',
    category: 'Bourbon'
  },
  {
    name: 'Lagavulin 16 Year',
    description: 'Single Malt from Islay, Scotland.  This scotch has a rich peat character and smoke like no other.  Best enjoyed by sipping and pairs well with a cigar.',
    imageUrl: 'https://www.cavabplus.gr/images/stories/virtuemart/product/LAGAVULIN%2016.jpg',
    price: '104.99',
    alcohol_content: '43',
    category: 'Scotch'
  },
  {
    name: 'Glenlivet 25',
    description: 'Matured in traditional casks and finished in first fill Pedro Ximénez Sherry & Tronçais Oak Cognac casks, This scotch brings an indulgent richness to the iconic style of Glenlivet. ',
    imageUrl: 'https://www.theglenlivet.com/wp-content/uploads/2022/06/25-year-old-bottle-2.png',
    price: '500.00',
    alcohol_content: '43',
    category: 'Scotch'
  },
  {
    name: 'WhistlePig The Boss Hog X The Commandments',
    description: 'Taking a biblical moniker and inspired by our own land of milk and honey, this rye whiskey is aged in new American Oak before being being finished in two unorthodox barrels.  The first barrel is seasoned in an experimental spirit derived from frankincense and myrrh while the final finish is in craft mead casks.',
    imageUrl: 'https://assets-global.website-files.com/61f27a53fd39a15d7eed0e9c/65375485165a5bc992b12e31_TheBossHog_X_PDP-BottleImage-877x1400-p-800.png',
    price: '599.00',
    alcohol_content: '52.9',
    category: 'Whiskey'
  },
  {
    name: 'Louis XIII',
    description: 'The finest eaux-de-vie, made using grapes grown in Grande Champagne - the premier cru of the Cognac region.  The eaux-de-vie is aged for decades in old Limousin tierçons for decades before being bottle in hand-crafted unique decanters.',
    imageUrl: 'https://cdn.caskers.com/catalog/product/cache/ce56bc73870585a38310c58e499d2fd4/l/o/louis-xiii-1.png',
    price: '4000.00',
    alcohol_content: '40',
    category: 'Cognac'
  }
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
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE
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
      await createUser({name: user.name, email: user.email, password: user.password, is_admin: user.is_admin});
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