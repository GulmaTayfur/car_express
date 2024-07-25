const express = require("express");

const {
  createCar,
  getAllCars,
  updateCar,
  getCar,
  deleteCar,
} = require("./controllers/carControllers");
const logger = require("./middleware/logger");
const control = require("./middleware/control");

// kurulum
const app = express();
const PORT = 3000;

// middleware (arayazılım)
// isteğin gelmesiyle cevabın gönderilemsi arasında çalışan fonksiyonlara denir

app.use(logger);

// isteklerib body bölümünda n gönderilen json verilerini işler
app.use(express.json());

// 1.yol route/endpoint tanımlama
// app.get(`/api/v1/cars`, getAllCars);

// app.post(`/api/v1/cars`, createCar);

// app.get(`/api/v1/cars/:id`, getCar);
// app.patch(`/api/v1/cars/:id`, updateCar);
// app.delete(`/api/v1/cars/:id`, deleteCar);

// 2.yol

app.route(`/api/v1/cars`).get(getAllCars).post(createCar);

app
  .route(`/api/v1/cars/:id`)
  .get(control, getCar)
  .patch(control, updateCar)
  .delete(control, deleteCar);

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunu dinlemeye başladı.`);
});
