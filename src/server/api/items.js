const express = require('express');
const itemsRouter = express.Router();
const utils = require('./utils')

const {
  getAllItems,
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

//GET - /api/items/:id - get an item
itemsRouter.get('/:id', async(req, res, next) => {
  try {
    const item = await getItem(req.params.id);
    res.send(item)
  } catch (err) {
      next(err)
  }
})

//GET - /api/items/reviews/:id - get all reviews for an item  **WIP**
itemsRouter.get(':id/reviews', async(req, res, next) => {
  try {
    const reviews = await getAllItemReviews(req.params.id);
    res.send(reviews)
  } catch (err) {
      next(err)
  }
})

/* POST METHODS */

//POST - /api/items - create new item *needs admin auth functionality*
itemsRouter.post('/', async(req, res, next) => {
  const { name, description, imageUrl, price, alcoholContent, category } = req.body;

  const itemData = {};
  try {
    itemData.name = name;
    itemData.description = description;
    itemData.imageUrl = imageUrl;
    itemData.price = price;
    itemData.alcoholContent = alcoholContent;
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
itemsRouter.patch('/:id', async(req, res, next) => {
  const { id } = req.params;
  const { name, description, imageUrl, price, alcoholContent, category } = req.body;

  const updatedFields = {};

  if(name) {
    updatedFields.name = name;
  }
  if(description) {
    updatedFields.description = description;
  }
  if(imageUrl) {
    updatedFields.imageUrl = imageUrl;
  }
  if(price) {
    updatedFields.price = price;
  }
  if(alcoholContent) {
    updatedFields.alcoholContent = alcoholContent;
  }
  if(category) {
    updatedFields.category = category;
  }

  try {
    const originalItem = await getItem(id)

    if (id === originalItem.id ) {
    const updatedItem = await updateItem(id, updatedFields);
    res.send({ item: updatedItem })
    } else {
      next({
        name: 'ErrorUpdatingItem',
        message: 'Could not update item.'
      })
    }
    } catch({name, message}) {
      next({name, message})
  }
})

//DELETE - /api/items/:id *admin*
itemsRouter.delete('/:id', async(req, res, next) => {
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
})


module.exports = itemsRouter;