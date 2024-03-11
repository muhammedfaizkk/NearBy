const express = require("express");
const app = express();
const userRoutes = require('./routes/userRoutes');
const cors = require("cors")
const cookieParser = require("cookie-parser");
const resRoutes = require('./routes/resRoutes')


app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(userRoutes);
app.use(resRoutes);
app.use('/public', express.static('public'))

app.use((err, req, res, next) => {
    res.send(err.message)
})
module.exports = app;