module.exports = (req, res, next) => {
  console.log("***İSTEK GELDİ***", "Method:" + req.method + "Url:" + req.url);

  // arayazılından sonra çalışacak olan fonksiyonla devam et
  next();
};
