import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Container, Grid } from "@mui/material";
import CustomCard from "../components/CustomCard";
import { Base_URL } from "../constants/baseUrl";

const AdminDashboardPage = () => {
  const { allUsers, getAllUsers, getAllOrders, allOrders } = useAuth();
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    getAllUsers();
    getAllOrders();

    const fetchProducts = async () => {
      const response = await fetch(`${Base_URL}/product`);
      const data = await response.json();
      setTotalProducts(data.length);
    };

    fetchProducts();
    
  }, []);
  

  return (
    <Container sx={{ mt: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
        <CustomCard
            title="Total Users"
            value={allUsers.length}
            link="/admin/users"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomCard
            title="Total Products"
            value={totalProducts}
            link="/admin/add-product"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomCard
            title="Total Orders"
            value={allOrders.length}
            link="/admin/orders"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
