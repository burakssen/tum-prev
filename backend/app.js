const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const dotenv = require("dotenv");
const xss = require("xss-clean");
const cookieparser = require("cookie-parser");

const errorHandler = require("./utils/errorHandler");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");

dotenv.config();

//Starts application
const app = express();

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    exposedHeaders: ['Authorization' ]
}));

app.use(cookieparser());

// Mount to routers
app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);

app.use(errorHandler);

module.exports = app;