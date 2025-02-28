const mongoose = require('mongoose');
const ItemList = require('./models/ItemList.js'); 
mongoose.connect('mongodb+srv://root:NewYork4151@cluster0.mmhyyv3.mongodb.net/ToDoListDB_002?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!");
        console.log(err);
    });

const seedItems = [
    { name: 'Buy Groceries', completed: false },
    { name: 'Finish Homework', completed: false },
    { name: 'Go for a Run', completed: false },
    { name: 'Read a Book', completed: false },
    { name: 'Pay Bills', completed: false }
];

ItemList.insertMany(seedItems)
    .then(res => {
        console.log("SEEDING SUCCESSFUL!");
        console.log(res);
        mongoose.connection.close(); 
    })
    .catch(err => {
        console.log("ERROR SEEDING DATABASE!");
        console.log(err);
    });
