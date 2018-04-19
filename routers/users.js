const express = require('express');
const router = express.Router();

const { 
  findAll,
  findUserById,
  destroy,
  create,
  update
} = require('../controllers/users.controller');

router.get('/', findAll);
router.post('/', create);

router.get('/:id', findUserById);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;