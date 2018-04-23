'use strict';

const _ = require('lodash');
const admin = require('firebase-admin');
const logger = require('../logger');

class FirebaseController {
  constructor() {
    this.db = admin.database();
    this.storage = admin.storage();
  }

  get(key) {
    logger.info(`Get value for key ${key} from firebase database`)
    return new Promise((resolve, reject) => {
      this.db.ref(key).once('value', (snapshot) => {
          let tempObj = snapshot.val();
          tempObj.id = snapshot.key
          resolve(snapshot.val());
      }, (err) => {
        logger.error("Cannot get key value from firebase database");
        reject(err);
      });
    });
  }

  set(key, value) {
    logger.info(`Set key ${key} to ${JSON.stringify(value)} on firebase database`);
    return new Promise((resolve, reject) => {
      this.db.ref(key).set(value)
        .then(() => {
          console.log('masuk')
          resolve()
        })
        .catch((err) => {
          logger.error("Cannot set key value to firebase database");
          reject(err);
        });
    });
  }

  update(key, value) {
    logger.info(`Update key ${key} to ${JSON.stringify(value)} on firebase database`);
    return new Promise((resolve, reject) => {
      this.db.ref(key).update(value)
        .then(() => {
          console.log('masuk')
          resolve()
        })
        .catch((err) => {
          logger.error("Cannot update key value to firebase database");
          reject(err);
        });
    });
  }

  push(key, value) {
    logger.info(`Push new value ${JSON.stringify(value)} for key ${key} on firebase database`);
    return new Promise((resolve, reject) => {
      let newKey = this.db.ref(key).push().key
      this.set(`${key}/${newKey}`, value)
        .then(() => {
          resolve(newKey);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  remove(key) {
    logger.info(`Delete key ${key} from firebase database`);
    return new Promise((resolve, reject) => {
      this.set(key, null)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  getKeyByParameterValue(key, parameter, value) {
    logger.info(`Get key for ${parameter} with value ${value}`);
    return new Promise((resolve, reject) => {
      this.db.ref(key).once('value', (snapshot) => {
        let resultKey = null;
        snapshot.forEach((childSnapshot) => {
          if(childSnapshot.val()[parameter] === value) {
            resultKey = childSnapshot.key;
          };
        });
        // console.log(resultKey)
        resolve(resultKey)
      }, (err) => {
        reject(err);
      })
    })
  }

  getDataByParameterValue(key, parameter, value) {
    logger.info(`Get all data that has ${parameter} equal to ${value} `);
    return new Promise((resolve, reject) => {
      this.db.ref(key).once('value', (snapshot) => {
        let resultArray = new Array();
        snapshot.forEach((childSnapshot) => {
          if(childSnapshot.val()[parameter] === value) {
            let tempObj = childSnapshot.val();
            tempObj.id = childSnapshot.key
            resultArray.push(tempObj);
          };
        });
        resolve(resultArray);
      }, (err) => {
        reject(err);
      })
    })
  }
  
}

module.exports = FirebaseController;