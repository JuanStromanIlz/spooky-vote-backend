const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinaryUpload = async (req, res, next) => {
  try {
    let avatar = req.file;
    let avatarOnCloud = await cloudinary.uploader.upload(`data:${avatar.mimetype};base64,${avatar.buffer.toString('base64')}`, {folder: 'Proyectos/SpookyVote', format: 'webp'});
    res.locals.avatar = avatarOnCloud;
    next();
  }
  catch(err) {
    throw new Error(err);
  }
};