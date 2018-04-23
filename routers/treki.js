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
  getTrekiByUserId,
  createv2,
  updateState
} = require('../controllers/treki.controllers');
const { pushNotification } = require('../middlewares/notification')
const {sendUploadToGCS} = require('../middlewares/uploadGCS') 
const multer = require('multer')
const upload = multer({
  storage  : multer.memoryStorage(),
  limits   : {
    fileSize: 10*1024*1024
 } 
})

router.post('/createv2',upload.single('image'), sendUploadToGCS ,createv2);
router.get('/', findAll);
router.post('/', create);


router.get('/:id', findTrekiById);
router.put('/:id', update);
router.delete('/:id', destroy);

router.put('/:id/location', updateLocation);
router.put('/:id/status', updateState);

router.put('/device_id/:device_id', pushNotification, updateOtherTrekiLocation);

router.get('/user_id/:user_id', getTrekiByUserId);


module.exports = router;