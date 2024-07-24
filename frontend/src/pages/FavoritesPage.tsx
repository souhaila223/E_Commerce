// FavoritesPage.tsx
import { Box, Container, Typography, Button, ButtonGroup, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../context/Favorites/FavoritesContext";
import { useCart } from "../context/Cart/CartContext";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favoriteItems, removeFavoriteItem, clearFavorites } = useFavorites();
  const { addItemToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (productId: string) => {
    addItemToCart(productId);
  };

  const handleRemoveFavorite = (productId: string) => {
    removeFavoriteItem(productId);
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const renderFavoriteItems = () => (
    <Box display="flex" flexDirection="column" gap={4}>
      {favoriteItems.map((item) => (
        <Box
          key={item.productId}
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
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1}
          >
            <img src={item.image} width={50} alt={item.title} />
            <Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>
                {item.price} $
              </Typography>
              <IconButton onClick={() => handleRemoveFavorite(item.productId)}>
                <FavoriteIcon sx={{ color: 'red' }} />
              </IconButton>
            </Box>
          </Box>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={() => handleAddToCart(item.productId)}>
              Add to Cart
            </Button>
          </ButtonGroup>
        </Box>
      ))}
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Button variant="contained" onClick={handleGoToCart}>Go To Cart</Button>
      </Box>
    </Box>
  );

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">My Favorites</Typography>
        <Button onClick={() => clearFavorites()}>Clear Favorites</Button>
      </Box>
      {favoriteItems.length ? (
        renderFavoriteItems()
      ) : (
        <Typography>
          No favorite items found. Please start adding favorites.
        </Typography>
      )}
    </Container>
  );
};

export default FavoritesPage;
