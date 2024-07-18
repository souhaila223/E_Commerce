import { Box, Container, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const CartPage = () => {
  const { cartItems, totalAmount, updateItemInCart } = useCart();

  const handleQuantity = (productId: string, quantity: number) => {
    if(quantity <= 0) {
        return;
    }
    updateItemInCart(productId, quantity)
    
  }


  return (
    <Container fixed sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      <Box display="flex" flexDirection="column" gap={4}>
        {cartItems.map((item) => (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              border: 1,
              borderColor: "#f2f2f2",
              borderRadius: 5,
              padding: 1,
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
              <img src={item.image} width={50} />
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>
                  {item.quantity} * {item.unitPrice} $
                </Typography>
                <Button>Remove Item</Button>
              </Box>
            </Box>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
              <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
            </ButtonGroup>
          </Box>
        ))}
        <Box>
          <Typography variant="h6">Total Amount: {totalAmount.toFixed(2)} $</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
