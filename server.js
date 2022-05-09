// importations
const { response } = require('express');
const express = require('express');
const app = express();

const router = express.Router();

const mongoose = require('mongoose');

const Thing = require('./models/thing');

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connect to the database
mongoose.connect('mongodb+srv://Octopus:KvIRFsLQ3lemWdrP@cluster0.hhvvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (error, done) => {
    if (error) {
        console.log(error);
    } else if (done) {
        console.log('MongoDB Connected...');
    }
});

// Post Method
app.post('/add_thing', async (request, response) => {
    try {
        let newThing = new Thing({
            title: request.body.title,
            description: request.body.description,
            imageUrl: request.body.imageUrl,
            userId: request.body.userId,
            price: request.body.price
        });
        await newThing.save()
        response.send("Saved Successfully");
    } 
    catch (error) {
        response.send(error);
    }
});

// Get Method
app.get('/get_things', async (request, response) => {
    try {
        await Thing.find({}).then(result => { response.send(result); });
    } catch (error) {
        console.log(error);
    }
});

// Delete Method
app.delete('/delete_thing/:id', async (request, response) => {
    try {
        await Thing.findOneAndDelete({id: request.params.id})
        response.send('Deleted Successflully');
    }
    catch(error){
        response.send(error)
    }
});

// Update Method
app.put('/update_thing/:id', async (request, response) => {
    try {
        await Thing.findOneAndUpdate({id: request.params.id}, {title: request.body.title, description: request.body.description, imageUrl: request.body.imageUrl, userId: request.body.userId, price: request.body.price})
        response.send('Updated Successfully');
    }
    catch(error){
        response.send(error)
    }
});

// Get Method
router.get('/irm', (request, response) => {
    response.send('IRM');
});

// Middleware
app.use('/', router)

// Middleware
app.use((request, response, next) => {
    response.status(404).send('404 Not Found');
    next();
});

// listen on port 3000 and log the server is running
app.listen(3000, (request, response) => {
    console.log('Server is running on port 3000');
    }
);