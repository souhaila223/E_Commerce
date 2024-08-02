import ProductForm from "../components/ProductForm";
import { Container, Grid, Typography } from "@mui/material";
import ProductTable from "../components/ProductTable";

const AddProductPage = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="h4"
        gutterBottom
      >
        Add New Product
      </Typography>
      {/* <ProductForm /> */}
      <Grid container >
        <Grid item xs={12} sm={6}>
          <ProductForm />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProductTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddProductPage;
