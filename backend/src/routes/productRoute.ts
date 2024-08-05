import express from "express";
import { addProduct, deleteProduct, getAllProducts, updateProductStock } from "../services/productService";

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

router.put("/:productId/stock", async (req, res) => {
  try {
    const { productId } = req.params;
    const { stock } = req.body;
    const updatedProduct = await updateProductStock(productId, stock);
    res.status(200).send(updatedProduct);
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
