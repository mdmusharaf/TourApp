const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path'); // Import the path module

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
app.use('/uploads', express.static('uploads'));

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.json({ message: 'heloo', status: 'ok' });
// });

// app.post('/', (req, res) => {
//   res.send('you can post url here');
// });

//custom middleware

// app.use((req, res, next) => {
//   console.log('middlewre executed');

//   next(); this is used for execution of next route handle get function
// });

// app.use('/', (req, res) => {
//   res.send('hellow from server');
// });
// console.log(process.argv[1]);
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// console.log(tours);

// app.delete('/api/tours/:id', delAllTours);

// app.get('/api/tours/:id', getTour);
app.use('/api/tours', tourRouter);

app.use('/api/users', userRouter);

module.exports = app;
