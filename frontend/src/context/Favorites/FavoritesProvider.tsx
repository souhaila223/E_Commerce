import { FC, PropsWithChildren, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { FavoriteItem } from "../../types/FavoriteItem";

const FavoritesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

  const addFavoriteItem = (product: FavoriteItem) => {
    setFavoriteItems((prev) => [...prev, product]);
  };

  const removeFavoriteItem = (productId: string) => {
    setFavoriteItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearFavorites = () => {
    setFavoriteItems([]);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteItems, addFavoriteItem, removeFavoriteItem, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
