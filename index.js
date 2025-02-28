const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const ItemList = require('./models/ItemList'); // Fixed typo in filename

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:NewYork4151@cluster0.mmhyyv3.mongodb.net/ToDoListDB_002?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("MONGO CONNECTION OPEN!!!"))
    .catch(err => console.error("OH NO MONGO CONNECTION ERROR!!!!", err));

// Set up view engine and static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Fetch all items
app.get('/itemList', async (req, res) => {
    try {
        const itemList = await ItemList.find({});
        res.render('itemList/index', { itemList });
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Error retrieving items");
    }
});

// Render "Add New Item" form
app.get('/itemList/new', (req, res) => {
    res.render('itemList/new');
});

// Create new item
app.post('/itemList', async (req, res) => {
    try {
        const newItem = new ItemList(req.body);
        await newItem.save();
        res.redirect('/itemList');
    } catch (err) {
        console.error("Error adding item:", err);
        res.status(500).send("Error adding item");
    }
});

// Show a specific item
app.get('/itemList/:id', async (req, res) => {
    try {
        const item = await ItemList.findById(req.params.id);
        if (!item) {
            return res.status(404).send("Item not found");
        }
        res.render('itemList/show', { item });
    } catch (err) {
        console.error("Error fetching item:", err);
        res.status(404).send("Item not found");
    }
});

// 🔹 Render the Edit Item form
app.get('/itemList/:id/edit', async (req, res) => {
    try {
        const item = await ItemList.findById(req.params.id);
        if (!item) {
            return res.status(404).send("Item not found");
        }
        res.render('itemList/edit', { item });
    } catch (err) {
        console.error("Error fetching item for edit:", err);
        res.status(500).send("Error loading edit page");
    }
});

// 🔹 Handle the Edit Form Submission (Update Item)
app.put('/itemList/:id', async (req, res) => {
    try {
        const { name, completed } = req.body;
        await ItemList.findByIdAndUpdate(req.params.id, { 
            name, 
            completed: completed === "on" // Convert checkbox "on" to true/false
        });
        res.redirect('/itemList');
    } catch (err) {
        console.error("Error updating item:", err);
        res.status(500).send("Error updating item");
    }
});

// Update item completion status
app.put('/itemList/:id/complete', async (req, res) => {
    try {
        await ItemList.findByIdAndUpdate(req.params.id, { completed: req.body.completed });
        res.status(200).send({ message: "Updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: "Error updating item", error: err });
    }
});

// Delete item
app.delete('/itemList/:id', async (req, res) => {
    try {
        await ItemList.findByIdAndDelete(req.params.id);
        res.redirect('/itemList');
    } catch (err) {
        console.error("Error deleting item:", err);
        res.status(500).send("Error deleting item");
    }
});

// Start the server
app.listen(3002, () => {
    console.log("APP IS LISTENING ON PORT 3001!"); // Fixed the wrong port message
});
