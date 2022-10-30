const express = require('express');
const cors = require('cors');

const { PORT } = require('./config/config');
const routes = require('./routes');
const db = require('./data/db');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);

db.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`App is running on port ${PORT} with HTTP protocol`));
    })
    .catch((error) => {
        console.log(`Unsuccessful initialization: ${error}`);
    });
