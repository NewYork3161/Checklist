const mongoose = require('mongoose');

const itemListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: { 
        type: Boolean, 
        default: false // Default unchecked
    }
});

const ItemList = mongoose.model('ItemList', itemListSchema);

module.exports = ItemList;
