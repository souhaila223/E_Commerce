import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
  const { allUsers, getAllUsers, getAllOrders, allOrders } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
    getAllOrders();
  }, []);

  return (
    <Container sx={{ mt: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }} onClick={() => navigate("/admin/users")}>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{allUsers.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }} onClick={() => navigate("/admin/orders")}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{allOrders.length}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
