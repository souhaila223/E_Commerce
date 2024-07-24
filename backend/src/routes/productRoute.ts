import express from "express";
import { getAllProducts } from "../services/productService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    //console.log("Products from DB:", products); // Log the products to verify
    res.status(200).send(products);
  } catch (err) {
    //console.error("Error fetching products:", err); 
    res.status(500).send("Something went wrong!");
  }
});

export default router;
