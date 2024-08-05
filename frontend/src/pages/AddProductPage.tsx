import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

const AddProductPage = () => {
  return (
    <Container  sx={{ mt: 4}}>
      <Card>
        <CardContent>
          {/* <Typography variant="h6" component="div" gutterBottom>
            Add Product and Product List
          </Typography> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <ProductForm />
            </Grid>
            <Grid item xs={12} sm={8}>
              <ProductTable />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddProductPage;
