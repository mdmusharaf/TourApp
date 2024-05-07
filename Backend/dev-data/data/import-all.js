const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
dotEnv.config({ path: './config.env' });
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABSE_PASSWORD
// );
const Tour = require('../../Models/TourModels');
// console.log(Tour);
mongoose.connect(process.env.DATABASE, {}).then((con) => {
  // console.log(con.connections);
  console.log('db connections success');
});
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
// // console.log(tour);
const importAll = async () => {
  await Tour.create(tour);
  console.log('data imported successfully');
  process.exit();
};
const deleteAll = async () => {
  await Tour.deleteMany();
  console.log('data deleted successfully');
};

console.log(process.argv[1]);
if (process.argv[2] === '--import') {
  importAll();
} else if (process.argv[2] === '--delete') {
  deleteAll();
}
