import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./services/productService";

const app = express(); // main app of express
const port = 3001; // determine the port

app.use(express.json())

mongoose
  .connect("mongodb://localhost:27017/e-commerce")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Failed to connect ", err));

// seed the products to db
seedInitialProducts();

// any route has to be determined in the index!
app.use('/user', userRoute)
app.use('/products', productRoute)


  app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`)
  })
