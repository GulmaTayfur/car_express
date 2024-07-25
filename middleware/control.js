const fs = require("fs");

// araba verilerini al
let cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/cars.json`, "utf-8")
);

module.exports = (req, res, next) => {
  // isteğe parametre olarak eklenen id'de bir araba var mı kontrol et
  const found = cars.find((car) => car.id === req.params.id);

  // eleman bulunmadıysa hata gönder
  if (!found) {
    return res
      .status(404)
      .json({ message: "Gönderilen id'ye sahip bir araç bulunamadı" });
  }
  // bir sonraki çalışacak kontroller fonksiyonunda bulunan araba verilerine erişebilmesi için request nesnesi içerisinde bu veriyi kaydet

  req.car = found;

  //eleman bulundysa sonraki adıma geç
  next();
};
