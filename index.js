const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()
const cors = require('cors')
const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

//Conexión a la BD
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ye9ghq9.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

//Rutas
const authRoute = require('./routes/auth'); 
const listarRoute = require('./routes/listar');
const validateToken = require('./middlewares/validate-token')

// route middlewares
app.use('/api/user', authRoute);
app.use('/api/user', validateToken, listarRoute);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})