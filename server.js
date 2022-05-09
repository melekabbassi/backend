const express = require('express');
const app = express();

const router = express.Router();

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<Octopus>:<KvIRFsLQ3lemWdrP>@cluster0.hhvvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (error, done) => {
    if (error) {
        console.log(error);
    } else if (done) {
        console.log('MongoDB Connected...');
    }
});

router.get('/irm', (request, response) => {
    response.send('IRM');
});

app.use('/', router)

app.use((request, response, next) => {
    response.status(404).send('404 Not Found');
    next();
});

app.listen(3000, (request, response) => {
    console.log('Server is running on port 3000');
    }
);