const express = require('express');
const { connectDB } = require("./connection");

require('dotenv').config();

const { logRequestResponse } = require("./middlewares");

const app = express();
const userRouter = require("./routes/user");

const PORT = process.env.PORT;
const dbName = process.env.DATABASE_NAME;
const mongoUrl = process.env.MONGODB_URL;


// connection
connectDB(mongoUrl, dbName);

// making the server understant that json data is coming - MiddleWares
app.use(express.json());
app.use(logRequestResponse("log.txt"))

// Router
app.use("/users", userRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));