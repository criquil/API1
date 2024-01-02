const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

//connect mongodb as
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection();

db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const Todo = mongoose.model('Todo', {text: String});


app.use(bodyParser.json());

app.get('api/todos', async (req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error'});
    }
});
app.listen(PORT,() =>{
    console.log('Server is running on http://localhost:${PORT}');
})