'use client';
import { Authentication, Product, RootReducerProps } from '@/types/types';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { deleteFavorites, getFavorites, getProducts, updateFavorites } from '@/helpers/api';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { FavoritesData } from '@/helpers/constant';

interface IProfileUserContext {
  favoritesProducts: Product[];
  updateUserFavorites: (productID: string) => void;
  deleteUserFavorites: (productID: string) => void;
  favoritesData: FavoritesData | null | undefined;
  favoritesLoading: boolean;
}

export const useMyFavoritesContext = () => useContext(FavoritesContext);

export const FavoritesContext = createContext<IProfileUserContext>({
  favoritesProducts: [],
  updateUserFavorites: () => null,
  deleteUserFavorites: () => null,
  favoritesData: null,
  favoritesLoading: false,
});

export const FavoritesContextProvider = ({ children }: { children: ReactNode }) => {
  const [favoritesProducts, setFavoritesProducts] = useState<Product[]>([]);
  const authState = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { idUser } = authState;
  const updateUserMutation = useMutation((productID: string) => updateFavorites(idUser!, productID));
  const deleteUserMutation = useMutation((productID: string) => deleteFavorites(idUser!, productID));
  const {
    data: favoritesData,
    isLoading: favoritesLoading,
    refetch,
  } = useQuery(['favorites', idUser], () => getFavorites(idUser!), {
    enabled: !!idUser,
    // onError: () => logOut(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    async function getAllProducts() {
      const productsFromServer = await getProducts();
      if (favoritesData?.favorites && productsFromServer) {
        const favoritesProducts = productsFromServer.filter(({ id }) => favoritesData.favorites.includes(id));
        setFavoritesProducts(favoritesProducts);
      }
    }
    getAllProducts();
  }, [favoritesData]);

  const updateUserFavorites = async (productID: string) => {
    try {
      await updateUserMutation.mutateAsync(productID);
      await refetch();
    } catch (error) {
      console.error(updateUserMutation, error);
    }
  };

  const deleteUserFavorites = async (productID: string) => {
    try {
      await deleteUserMutation.mutateAsync(productID);
      await refetch();
    } catch (error) {
      console.error(updateUserMutation, error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoritesProducts,
        favoritesData,
        updateUserFavorites,
        deleteUserFavorites,
        favoritesLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
