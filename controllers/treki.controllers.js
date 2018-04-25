'use strict';

const admin = require('firebase-admin');
const _ = require('lodash')

const FirebaseController = require('./firebase.controller') 
const logger = require('../logger');

const firebaseController = new FirebaseController();

const db = admin.database();

const gcm = require('node-gcm');

module.exports = {

  findAll: (req, res) => {
    logger.info('Get all treki devices data');
    firebaseController.get(`treki`)
      .then((data) => {
        res.status(200).json({
          message: 'Succeed getting all treki devices',
          data
        });
      })
      // .catch((err) => {
      //   logger.error('Cannot get all treki devices data')
      //   res.status(500).json({
      //     message: 'Error get all treki devices',
      //     err
      //   });
      // });
  },

  update: (req, res) => {
    logger.info(`Update treki device id ${req.params.id}`);
    let updatedAt = Date.now();
    // let { device_id, name, image_url, user_id, location } = req.body
    firebaseController.set(`treki/${req.params.id}`,{ ...req.body, updatedAt })
      .then((data) => {
        res.status(200).json({
          message: 'Succeed updating treki device'
        })
      })
      // .catch((err) => {
      //   logger.error(`Cannot update treki device id ${req.params.id}`);
      //   res.status(500).json({
      //     message: 'Error updating treki device',
      //     err
      //   });
      // });
  },

  destroy: (req, res) => {
    logger.info(`Remove treki device id ${req.params.id}`);
    firebaseController.remove(`treki/${req.params.id}`)
      .then(() => {
        res.status(200).json({
          message: 'Succeed removing treki device'
        });
      })
      // .catch((err) => {
      //   logger.error(`Cannot remove treki device id ${req.params.id}`);
      //   res.status(500).json({
      //     message: 'Error removing treki device',
      //     err
      //   });
      // });
  },

  create: (req, res) => {
    logger.info(`Create new treki device`);
    let createdAt = Date.now();
    let updatedAt = Date.now();
    let { device_id, name, image_url, user_id, location } = req.body;
    // location = JSON.parse(location);
    firebaseController.push('treki', 
    { 
      name,
      device_id,
      image_url,
      user_id,
      location,
      status: false,
      updatedAt,
      createdAt
    })
      .then(() => {
        res.status(201).json({
          message: 'Succeed adding new treki device'
        });
      })
      .catch((err) => {
        logger.error(`Cannot create new treki device`);
        res.status(500).json({
          message: 'Error adding new treki device',
          err
        });
      });
  },

  createv2: (req, res) => {
    logger.info(`Create new treki device 2`);
    
    let createdAt = Date.now();
    let updatedAt = Date.now();
    let location = JSON.parse(req.body.location);
    let { device_id, name, user_id } = req.body;
    
    firebaseController.push('treki', 
    { 
      name,
      device_id,
      image_url : req.file.cloudStoragePublicUrl,
      user_id,
      location,
      status: false,
      updatedAt,
      createdAt
    })
      .then(() => {
        res.status(201).json({
          message: 'Succeed adding new treki device'
        });
      })
      .catch((err) => {
        logger.error(`Cannot create new treki device`);
        res.status(500).json({
          message: 'Error adding new treki device',
          err
        });
      });
  },

  findTrekiById: (req, res) => {
    logger.info(`Get treki device id ${req.params.id}`);
    firebaseController.get(`treki/${req.params.id}`)
      .then((data) => {
        res.status(200).json({
          message: 'Succeed getting treki device by id',
          data
        });
      })
      // .catch((err) => {
      //   logger.error(`Cannot get treki device id ${req.params.id}`);
      //   res.status(500).json({
      //     message: 'Error getting treki device by id',
      //     err
      //   })
      // })
  },
  
  updateState: (req, res) => {
    logger.info(`Update state for treki device id ${req.params.id}`);
    firebaseController.update(`treki/${req.params.id}`, {status: req.body.status})
      .then(() => {
        res.status(200).json({
          message: 'Succeed updating treki state'
        })
      })
      .catch((err) => {
        logger.error(`Cannot update treki device id ${req.params.id}`);
        res.status(500).json({
          message: 'Error updating treki state',
          err
        })
      })
  },

  updateLocation: (req, res) => {
    logger.info(`Update location for treki device id ${req.params.id}`);
    let updatedAt = Date.now();
    firebaseController.update(`treki/${req.params.id}`, {location: req.body.location, updatedAt})
      .then(() => {
        res.status(200).json({
          message: 'Succeed updating treki location'
        })
      })
      .catch((err) => {
        logger.error(`Cannot update treki device id ${req.params.id}`);
        res.status(500).json({
          message: 'Error updating treki location',
          err
        })
      })
  },

  updateOtherTrekiLocation: (req, res) => {
    logger.info(`Verify device id ${req.params.device_id}`);
    firebaseController.getKeyByParameterValue('treki','device_id',req.params.device_id)
      .then((key) => {
        if(key !== null) {
          let updatedAt = Date.now();
          firebaseController.update(`treki/${key}`, {location: req.body.location, updatedAt})
            .then(() => {
              res.status(200).json({
                message: "Succeed updating location"
              })
            })
            .catch((err) => {
              res.status(500).json({
                message: "Error updating location",
                err
              })
            })
        } 
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error verifying device",
          err
        })
      })
  },

  getTrekiByUserId: (req, res) => {
    logger.info(`Get all treki devices for user ${req.params.user_id}`);
    firebaseController.getDataByParameterValue('treki', 'user_id', req.params.user_id)
      .then((data) => {
        res.status(200).json({
          message: "Succeed getting all treki devices by id",
          data
        })
      })
      // .catch((err) => {
      //   res.status(500).json({
      //     message: "Error verifying device",
      //     err
      //   })
      // })
  },

  pushNotificationTestTrigger: (req, res) => {
    var sender = new gcm.Sender('AAAAHqRJ4Cw:APA91bHFV-fHw1ST4tEggO2J_I35HEIlQSAicBSnUyK41ke78ypZ5Ol5HhzuWJbKb78MqvQQjy1gu7xboQq-e16Lr6mIGk-rDIyDHYY1dQBqfCJukiF8FGSfDy6c_VsVwSUc8crc7wjO');
    var message = new gcm.Message({
      priority: 'high',
      contentAvailable: true,
      notification: {
        title: "Pagi mz",
        icon: "ic_launcher",
        body: "Bagi duit dong !!!"
      },
      data: { 
        title: "Pagi mz",
        icon: "ic_launcher",
        body: "Bagi duit dong !!!",
        deviceFound: 'Your Device is tracked by someone near it !'
      }
    });
    
    var regTokens = ['enNnVCO0CQg:APA91bH-Rx7zOsLuRzsMO5daB0d1CMAtMEsl-gejBfGK1azEJVBUm1QtMQZIABCmfjgYDeSwylmrGhnZMVVa3zkLUYq_OePuvMLY_OAf5iSAAAjS8GjA-rw9cRmN4xs-jtYO66akGJEu'];
    
    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
      res.status(200).json({
        message: `Push Notification Success`,
        response
      })
    });
  }
}
