import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

const MyOrderPage = () => {
    const { getMyOrders, myOrders } = useAuth();

    useEffect(() => {
        getMyOrders();
    }, []);

      
  return (
    <Container
      fixed
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
        <Typography>My Orders</Typography>
    {myOrders.map(({ address, orderItems, total }) => (
        <Box sx={{ border: 1, borderColor: "gray", borderRadius:2 , padding: 1}}>
            <Typography>Address: {address}</Typography>
            <Typography>Items: {orderItems.length}</Typography>
            <Typography>Total: {total}</Typography>
        </Box>

    ))}</Container>
  );
};

export default MyOrderPage;
