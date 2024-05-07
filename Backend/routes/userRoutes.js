const express = require('express');
const userController = require('../Controllers/userController.js');
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.addNewUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUsers);
module.exports = router;
