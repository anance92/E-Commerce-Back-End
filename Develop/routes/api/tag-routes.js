const router = require('express').Router();
// const { json } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  Tag.findAll({
    include : [
      { 
        model : Product,
        attributes : ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(tags => {
    res.json(tags);
  })

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  Tag.findOne({
    include : [
      { 
        model : Product,
        attributes : ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ],
    where : {
      id : req.params.id
    }
  }).then(tag => {
    res.json(tag);
  })

});

router.post('/', (req, res) => {
  // create a new tag

  Tag.create(req.body).then(newTag => {
    res.json(newTag);
  })

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  Tag.update({
    where : {
      id : req.params.id
    }
  }).then(updatedTag => {
    if(!updatedTag) {
      res.status(404).json({ message: 'No tag found with this id'});
      return;
    }
    res.json(updatedTag);
  })

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  Tag.destroy({
    where : {
      id: req.params.id
    }
  }).then(deletedTag => {
    if(!deletedTag) {
      res.status(404).json({ message: 'No tag found with this id'});
      return;
    }
    res.json(deletedTag);
  })

});

module.exports = router;