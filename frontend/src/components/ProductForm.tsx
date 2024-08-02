import React, { useState } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import { Base_URL } from "../constants/baseUrl";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    image: false,
    price: false,
    stock: false,
  });

  const validateForm = () => {
    const newErrors = {
      title: title === "",
      image: image === "",
      price: price === "",
      stock: stock === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const product = {
      title,
      image,
      price: parseFloat(price),
      stock: parseInt(stock),
    };

    try {
      await fetch(`${Base_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      // Reset form
      setTitle("");
      setImage("");
      setPrice("");
      setStock("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Box
        component="form"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 2, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="outlined-title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          helperText={errors.title ? "Title is required" : ""}
        />
        <TextField
          required
          id="outlined-image"
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          error={errors.image}
          helperText={errors.image ? "Image URL is required" : ""}
        />
        <TextField
          required
          id="outlined-price"
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={errors.price}
          helperText={errors.price ? "Price is required" : ""}
        />
        <TextField
          required
          id="outlined-stock"
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          error={errors.stock}
          helperText={errors.stock ? "Stock is required" : ""}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ m: 2 }}>
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default ProductForm;
