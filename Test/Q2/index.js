const express = require("express");
const { connectToDb, db } = require("./db");
const app = express();
const port = process.env.PORT || 3000;

// Connect to the MongoDB
connectToDb();

// Get all products
app.get('/api/inventory/products', async (req, res) => {
    try {
        // Check database connection
        if (!db.inventories) {
            return res.status(500).json({ message: 'Database connection error' });
        }
        
        // Get the parameter threshold (less than 100 products)
        const threshold = parseInt(req.query.threshold) || 100;

        // Query for products with quantity less than the threshold
        const products = await db.inventories.find({ quantity: { $lt: threshold } }).toArray();

        // Send products as JSON
        res.json(products);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});