import ProductForm from "../components/ProductForm";
import { Container, Typography } from "@mui/material";

const AddProductPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="h4"
        gutterBottom
      >
        Add New Product
      </Typography>
      <ProductForm />
    </Container>
  );
};

export default AddProductPage;
