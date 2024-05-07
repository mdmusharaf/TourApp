const fs = require('fs');
const Tour = require('../Models/TourModels');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.addNewTours = async (req, res) => {
  //   const newId = tours[tours.length - 1].id + 1;

  //   const newTour = { id: newId, ...req.body };

  //   tours.push(newTour);
  //   const formattedData = JSON.stringify(tours, null, 2);

  //   // fs.writeFile(
  //   //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   //   JSON.stringify(tours),
  //   //   res.status(201).json({
  //   //     status: 'sucess',
  //   //     data: {
  //   //       tour: newTour,
  //   //     },
  //   //   })
  //   // );
  //   fs.writeFile(
  //     `${__dirname}/../dev-data/data/tours-simple.json`,
  //     formattedData,
  //     (err) => {
  //       if (err) {
  //         console.error('Error writing file:', err);
  //         res.status(500).json({
  //           status: 'error',
  //           message: 'Failed to save the new tour',
  //         });
  //       } else {
  try {
    const fileTour = new Tour(req.body);
    fileTour.imageCover = req.file.path;
    const newTour = await Tour.create(fileTour);
    console.log(newTour);
    res.status(201).json({
      status: 'success',
      createdAt: req.requestTime,
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid data sent',
    });
  }
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'failed',
      message: 'Price or name is missing',
    });
  }
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    // console.log(req.requestTime);
    // console.log(req.query);
    // const tours = await Tour.find({
    //   difficulty: 'easy',
    //   duration: 5,
    // });
    const tours = await Tour.find();

    res.json({
      status: 'success',
      requestedAt: req.requestTime,
      tours: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid data sent',
    });
  }
};
exports.updateTour = async (req, res) => {
  // console.log(req.params);
  const { imageCover } = req.body;
  // const id = parseInt(req.params.id);
  const tour = await Tour.findByIdAndUpdate(req.params.id, imageCover, {
    new: true,
    runValidators: true,
  });
  // console.log(id);
  // const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).send({
      status: 'failed',
      message: 'invalid id',
    });
  }
  res.json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.delAllTours = async (req, res) => {
  // console.log(req.params.id);

  // const id = parseInt(req.params.id);
  // console.log(id);
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    // console.log(id);
    // const tour = tours.find((el) => el.id === id);
    return res.status(404).send({
      status: 'failed',
      message: 'invalid id',
    });
  }
};
exports.getTour = async (req, res) => {
  // const id = parseInt(req.params.id);
  // console.log(id);
  try {
    const tour = await Tour.findById(req.params.id);
    res.json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.send({
      status: 'failed',
      message: 'invalid id',
    });
  }
};
