import express from "express";
import { addProduct, deleteProduct, getAllProducts } from "../services/productService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await addProduct(product);
    res.status(201).send(newProduct);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});


router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { statusCode, data } = await deleteProduct(productId);
    res.status(statusCode).send(data);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
});

export default router;
