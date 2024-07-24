import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import { useState } from "react";
import { useCart } from "../context/Cart/CartContext";
import { useFavorites } from "../context/Favorites/FavoritesContext";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: string;
}

export default function ProductCard({ _id, title, image, price }: Props) {
  const { addItemToCart } = useCart();

  const { addFavoriteItem, removeFavoriteItem, favoriteItems } = useFavorites();

  const isFavorited = favoriteItems.some((item) => item.productId === _id);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavoriteItem(_id);
    } else {
      addFavoriteItem({ productId: _id, title, image, price });
    }
  };

  return (
    <Card>
      <CardMedia sx={{ height: 200 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price} $
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => addItemToCart(_id)}
        >
          Add to Cart
        </Button>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          sx={{ color: isFavorited ? "red" : "default" }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
