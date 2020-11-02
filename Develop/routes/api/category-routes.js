const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  Category.findAll({
    include : [
      { 
        model : Product,
        attributes : ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(categories => {
    res.json(categories);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    where : {
      id : req.params.id
    },
    include : [
      { 
        model : Product,
        attributes : ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(category => {
    res.json(category);
  })
});

router.post('/', (req, res) => {
  // create a new category

  Category.create({
    category_name: req.body.category_name 
  }).then(newCategory => {
    res.json(newCategory);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  
  Category.update(
    {
      category_name : req.body.category_name
    },
    { 
      where : {
      id : req.params.id
    }
  }).then(updatedCategory => {
    if (!updatedCategory) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(updatedCategory);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

  Category.destroy({
    where : {
      id: req.params.id
    }
  }).then(deletedCategory => {
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(deletedCategory);
  })
});

module.exports = router;