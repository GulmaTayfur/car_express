const fs = require("fs");
const crypto = require("crypto");
const write = require("../utils/write");

// araba verilerini al
let cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/cars.json`, "utf-8")
);

// Bütün arabaları alan fonskiyon
exports.getAllCars = (req, res) => {
  res.status(200).json({
    message: "Arabalar alındı",
    res: cars.length,
    cars,
  });
};

// Yeni araç ekleyen fonksiyon
exports.createCar = (req, res) => {
  // araç verisine Id ekle
  const newCar = { ...req.body, id: crypto.randomUUID() };

  // diziye kaydet
  cars.push(newCar);
  //json dosyasını güncelle
  write(cars);

  res.status(200).json({
    message: "Arabalar oluşturuldu",
    car: newCar,
  });
};

// Id'sine göre araç alan fonksiyon
exports.getCar = (req, res) => {
  res.status(200).json({
    message: "Araba alındı",
    car: req.car,
  });
};

// Id'sine göre aracı güncelleyen fonksiyon
exports.updateCar = (req, res) => {
  //isteğin body kısmındaki güncellenecek değerlerini al
  const updatedData = req.body;

  // aracın güncel değerlerini sahip yeni bir nesne oluştur
  const updatedCar = { ...req.car, ...updatedData };

  // güncellenecek elemanın dizideki sırasını bul
  const index = cars.findIndex((car) => car.id === req.params.id);

  // dizideki eski aracın yerine yeni aracın bilgilerini koy
  cars.splice(index, 1, updatedCar);

  // json dosyasını güncelle
  write(cars);
  // clienta cevap gönder
  res.status(200).json({
    message: "Araba güncellendi",
    car: updatedCar,
  });
};

// Id'sine göre araç silen fonksiyon
exports.deleteCar = (req, res) => {
  //ID'si gelen aracı diziden kaldır
  cars = cars.filter((car) => car.id !== req.params.id);

  // json dosyasını güncelle
  write(cars);

  res.status(204).json({
    message: "Araba silindi",
  });
};
