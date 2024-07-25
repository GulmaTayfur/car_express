const fs = require("fs");

module.exports = (data) => {
  fs.writeFile(
    `${__dirname}/../data/cars.json`,
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.log("Dosyayı güncellerken bir sorun oluştu");
        console.log(err);
      }
      return;
    }
  );
};
