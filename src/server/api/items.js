const express = require('express');
const itemsRouter = express.Router();
const utils = require('./utils')
const { JWT_SECRET } = process.env;

const {
  getAllItems,
  getReviewedItems,
  getItem,
  getAllItemReviews,
  createItem,
  updateItem,
  deleteItem
} = require('../db')

/* GET METHODS */

//GET - /api/items - get all items
itemsRouter.get('/', async (req, res, next) => {
  try {
    const allItems = await getAllItems();
    res.send(allItems)
  } catch (err) {
      next(err)
  }
})

//GET - /api/items/reviewed - get reviewed items
itemsRouter.get('/reviewed', utils.isAdmin, async(req, res, next) => {
  try {
    const reviewedItems = await getReviewedItems();
    res.send(reviewedItems)
  } catch(err) {
      next(err)
  }
})

//GET - /api/items/:id - get an item
itemsRouter.get('/:id', async(req, res, next) => {
  try {
    const item = await getItem(req.params.id);
    res.send(item)
  } catch (err) {
      next(err)
  }
})

//GET - /api/items/reviews/:id - get all reviews for an item 
itemsRouter.get('/reviews/:id', async(req, res, next) => {
  try {
    const reviews = await getAllItemReviews(req.params.id);
    res.send(reviews)
  } catch (err) {
      next(err)
  }
})

/* POST METHODS */

//POST - /api/items - create new item 
itemsRouter.post('/', utils.isAdmin, async(req, res, next) => {
  const { name, description, imageUrl, price, alcohol_content, category } = req.body;

  const itemData = {};
  try {
    itemData.name = name;
    itemData.description = description;
    itemData.imageUrl = imageUrl;
    itemData.price = price;
    itemData.alcohol_content = alcohol_content;
    itemData.category = category;

    const item = await createItem(itemData);

    if(item) {
      res.send(item);
    } else {
      next({
        name: 'ItemCreationError',
        message: 'There was an error creating an item.'
      })
    }
  } catch ({name, message}) {
      next({ name, message });
  }
});

//PATCH - /api/items/:id - update item 
itemsRouter.patch('/:id', utils.isAdmin, async(req, res, next) => {
  try {
    const { id } = req.params;
    const currentItem = await getItem(id);
    if(!currentItem) {
      next({
        name: "ItemNotFound",
        message: "There are no items with that id."
      })
    } else {
      const { name, description, imageUrl, price, alcohol_content, category } = req.body;
      const updatedItem = await updateItem({id: id, name, description, imageUrl, price, alcohol_content, category})
      if(updatedItem) {
        res.send(updatedItem);
      } else {
        next({
          name: 'FailedToUpdate',
          message: 'There was an error updating the item.'
        })
        }
      }
    } catch({name, message}) {
      next({name, message})
  }
});

//DELETE - /api/items/:id 
itemsRouter.delete('/:id', utils.isAdmin, async(req, res, next) => {
  try {
    const { id } = req.params;
    const itemToDelete = await getItem(id);
    if(!itemToDelete) {
      next({
        name: 'Not Found',
        message: `No item wth ID: ${id}`
      })
    } else {
      const deletedItem = await deleteItem(id);
      res.send({success: true, ...deleteItem});
    }
  } catch (err) {
      next(err)
  }
});

module.exports = itemsRouter;