'use strict';

const admin = require('firebase-admin');

const FirebaseController = require('./firebase.controller') 

const firebaseController = new FirebaseController();

const db = admin.database();

module.exports = {

  findAll: (req, res) => {
    firebaseController.get(`users`)
      .then((data) => {
        res.status(200).json({
          message: 'Succeed getting all users',
          data
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error get all users',
          err
        });
      });
  },

  update: (req, res) => {
    // let { name, email } = req.body
    let updatedAt = Date.now();
    firebaseController.set(`users/${req.params.id}`,{ ...req.body, updatedAt })
      .then((data) => {
        res.status(200).json({
          message: 'Succeed updating user'
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error updating user',
          err
        });
      });
  },

  destroy: (req, res) => {
    firebaseController.remove(`users/${req.params.id}`)
      .then(() => {
        res.status(200).json({
          message: 'Succeed removing user'
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error removing user',
          err
        });
      });
  },

  create: (req, res) => {
    let { name, email } = req.body;
    updatedAt = Date.now();
    createdAt = Date.now();
    firebaseController.push('users', { name, email, updatedAt, createdAt })
      .then(() => {
        res.status(201).json({
          message: 'Succeed adding new user'
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error adding new user',
          err
        });
      });
  },

  findUserById: (req, res) => {
    firebaseController.get(`users/${req.params.id}`)
      .then((data) => {
        res.status(200).json({
          message: 'Succeed getting user by id',
          data
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Error getting user by id',
          err
        })
      })
  }
}