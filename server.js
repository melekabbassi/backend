const express = require('express');
const app = express();

const router = express.Router();

router.get('/irm', (req, res) => {
    res.send('IRM');
});

app.use('/', router)

app.listen(3000, (request, response) => {
    console.log('Server is running on port 3000');
    }
);