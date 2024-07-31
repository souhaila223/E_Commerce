import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Container, Grid } from "@mui/material";
import CustomCard from "../components/CustomCard";

const AdminDashboardPage = () => {
  const { allUsers, getAllUsers, getAllOrders, allOrders } = useAuth();

  useEffect(() => {
    getAllUsers();
    getAllOrders();
  }, []);

  return (
    <Container sx={{ mt: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <CustomCard
            title="Total Users"
            value={allUsers.length}
            link="/admin/users"
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
