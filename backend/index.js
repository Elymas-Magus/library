const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Connection
const conn = require('./db/conn');

// Import Routes
const apiRoutes = require('./routes/api');

app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: process.env.CORS_ORIGIN
    }),
)

// Public path
app.use(express.static('public'));

// Routes
apiRoutes.init(app);

app.listen(process.env.PORT);


// conn.sync()
//     .then(() => {
//         app.listen(process.env.PORT);
//     })
//     .catch((error) => {
//         console.error(error);
//     })