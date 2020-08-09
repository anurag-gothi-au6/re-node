import '@babel/polyfill';
import dotenv from 'dotenv';
import express from "express";
import morgan from "morgan";

dotenv.config({
  path: '.env'
});

//Connect to database
import db from './config/db';
db.connect()

//import routes
import userRoutes from "./routes/userRoutes"
import friendRoutes from "./routes/friendRoutes"
import postRoutes from './routes/postRoutes'
import commentRoutes from './routes/commentRoutes'

//Create an instance of express app
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", userRoutes);
app.use("/api", friendRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

const port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log(`CONNECTED TO : ${port}`);
})