require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rotas = require('./rotas');
const app = express();
const PORTA = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(rotas);

//lembrar de tirar esse console.log no ultimo commit
app.listen(PORTA);
