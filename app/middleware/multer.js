const multer = require("multer");

/* Multer setUp */
const storage = multer.memoryStorage();
module.exports = multerUpload = multer({ storage });