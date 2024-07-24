// FavoritesContext.ts
import { createContext, useContext } from "react";
import { FavoriteItem } from "../../types/FavoriteItem";

interface FavoritesContextType {
  favoriteItems: FavoriteItem[];
  addFavoriteItem: (product: FavoriteItem) => void;
  removeFavoriteItem: (productId: string) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favoriteItems: [],
  addFavoriteItem: () => {},
  removeFavoriteItem: () => {},
  clearFavorites: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);
