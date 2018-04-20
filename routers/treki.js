const express = require('express');
const router = express.Router();

const { 
  findAll,
  create,
  findTrekiById,
  destroy,
  update,
  updateLocation,
  updateOtherTrekiLocation,
  getTrekiByUserId
} = require('../controllers/treki.controllers');

router.get('/', findAll);
router.post('/', create);

router.get('/:id', findTrekiById);
router.put('/:id', update);
router.delete('/:id', destroy);

router.put('/:id/location', updateLocation);

router.put('/device_id/:device_id', updateOtherTrekiLocation);

router.get('/user_id/:user_id', getTrekiByUserId);

module.exports = router;