const express = require('express');
const PORT = 3000;
const index = require('./routes/index');
const app = express();
const cors = require('cors');

app.use(cors({ origin: 'https://servicebox35.ru' }));
app.use(express.json());
app.use('/', index);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();