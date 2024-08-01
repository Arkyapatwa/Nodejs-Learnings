const mongoose = require('mongoose');

async function connectDB(mongoUrl, dbName) {
    const url = `${mongoUrl}/${dbName}`
    return await mongoose.connect(url);
}

module.exports = { connectDB }