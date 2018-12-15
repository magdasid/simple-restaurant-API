const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
require('./models/Restaurant');
const restaurantsRoutes = require('./routes/restaurantsRoutes');
require('./models/User');
const userRoutes = require('./routes/userRoutes');
require('./services/passport');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

authRoutes(app);
restaurantsRoutes(app);
userRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
