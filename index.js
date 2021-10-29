require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({extended: false, limit: '20mb'}));

/* CORS setUp */
const corsOptions = {
  origin: [process.env.FRONTEND_HOST, process.env.DEV_HOST],
  methods: ['GET', 'POST'],
  allowedHeaders:  ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

/* Mongoose setUp */
const mongoose = require('mongoose');

mongoose.connect(process.env.DB)
.then(() => {
  console.log('Connected to the database!');
})
.catch(err => {
  console.log('Cannot connect to the database!', err);
  process.exit();
});

/* Routes */
const characterRoutes = require('./app/routes/character.js');
app.use('/character', characterRoutes);

app.get('/', (req, res) => {
  res.send('API up and running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server runnig on port ${PORT}`);
})