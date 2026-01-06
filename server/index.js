require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ToDoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" MongoDB connection error:", err));


app.get('/get', (req, res) => {
    ToDoModel.find()
    .then(result =>res.json(result))    
    .catch( err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    ToDoModel.findByIdAndUpdate({_id: id}, { done: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    ToDoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err));
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    ToDoModel.create({ 
        task: task
     }).then(
        result => res.json(result)
     ).catch(
        err => res.json(err)
     );
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
