const express = require('express');
const tourController = require('../Controllers/tourController.js');
const fileUpload = require('../Controllers/multer.js');
const router = express.Router();

// router.param('id', (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   next();
// });

// router.route('/').get(tourController.getAllTours).post(
//   fileUpload.single('imageCover'),

//   tourController.checkBody,
//   tourController.addNewTours
// );
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    fileUpload.single('imageCover'),
    (req, res, next) => {
      // Handle errors during file upload
      if (!req.file) {
        return res.status(200).json({
          message: 'file not uploaded successfully',
          // imageCover: req.file.path,
        });
      }
      // Continue processing the uploaded file
      else {
        next();
      }
    },
    tourController.checkBody,
    tourController.addNewTours
  );

// app.get('/api/tours', getAllTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.delAllTours);

module.exports = router;
