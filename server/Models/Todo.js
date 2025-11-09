const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    }
})

const ToDoModel = mongoose.model('todoDB', ToDoSchema)

module.exports = ToDoModel;