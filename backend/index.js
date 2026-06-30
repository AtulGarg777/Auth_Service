const express = require('express');
const app = express();
require('./connect');
const bodyParser = require('body-parser');
const AuthRoute = require('./Routes/AuthRoute');
const ProductRoute=require('./Routes/ProductRoute');
const cors = require('cors');

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRoute);
app.use('/products',ProductRoute);

app.get('/home', (req, res) => {
    res.send('home page')
})

app.listen(process.env.PORT || 8000, () => {
    console.log('server started');
})

module.exports = app;