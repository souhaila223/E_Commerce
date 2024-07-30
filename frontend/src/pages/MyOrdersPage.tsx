import { Box, Container, Typography, Divider } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";
import { IOrderItem } from "../types/OrderItem";

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
      <Typography variant="h4" sx={{ mb: 4 }}>
        My Orders
      </Typography>
      {myOrders.map(({ address, orderItems, total, orderStatus }, index) => (
        <Box
          key={index}
          sx={{
            border: 1,
            borderColor: "gray",
            borderRadius: 2,
            padding: 2,
            width: "100%",
            maxWidth: 600,
            mb: 2,
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Order {index + 1}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Delivery Address:</strong> {address}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Total Items:</strong> {orderItems.length}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Order Status:</strong> {orderStatus}
          </Typography>
          {orderItems.map((item: IOrderItem, itemIndex: number) => (
            <Box
              key={itemIndex}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
                borderBottom: 1,
                borderColor: "#f2f2f2",
                pb: 1,
              }}
            >
              <img
                src={item.productImage}
                alt={item.productTitle}
                width={50}
                height={50}
                style={{ objectFit: "cover", borderRadius: 5 }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  ml: 2,
                }}
              >
                <Typography variant="body2">
                  <strong>{item.productTitle}</strong>
                </Typography>
                <Typography variant="body2">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body2">
                  Price: ${item.unitPrice.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ))}
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="h6" sx={{ textAlign: "right" }}>
            Total Amount: ${total.toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Container>
  );
};

export default MyOrderPage;
