const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
const { error } = require('console');
// const Tour = require('../starter/Models/TourModels');

dotEnv.config({ path: './config.env' });
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// const db=mongodb+srv://mdmusharaf474:<password>@cluster0.xbglrh3.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('db connections success');
  });
// const deleteAll = async () => {
//   await Tour.deleteMany();
//   console.log('data deleted successfully');
// };

// // console.log(process.argv[1]);
// // if (process.argv[2] === '--import') {
// //   importAll();
// // } else if (process.argv[2] === '--delete') {
// }
// deleteAll();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
