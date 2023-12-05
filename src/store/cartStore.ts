/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Photo, Product } from "../interfaces/product/productInterface";

type ProductCart = {
  name: string;
  category: string;
  stock: number;
  unit: string;
  photos: Photo[];
  value: number;
  description: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  quantity: number;
};

export const useCartStore = create((set) => ({
  cart: [] as ProductCart[],
  addCart: (product: Product, quantity: number) => {
    set((state: any) => {
      const existingProduct = state.cart.find(
        (item: ProductCart) => item._id === product._id
      );

      console.log(existingProduct);

      if (existingProduct) {
        const newCart = state.cart.map((item: ProductCart) => {
          if (item._id === product._id) {
            const newQuantity = item.quantity + quantity;

            if (newQuantity <= product.stock) {
              return { ...item, quantity: newQuantity };
            } else {
              alert(
                "Não é possível adicionar mais produtos pois não temos estoque!"
              );
              return item;
            }
          }
          return item;
        });
        return { cart: newCart };
      } else {
        if (quantity > 0 && quantity <= product.stock) {
          return { cart: [...state.cart, { ...product, quantity }] };
        } else {
          alert("Quantidade inválida ou produto fora de estoque");
          return state;
        }
      }
    });
  },
  removeFromCart: (productId: string) => {
    set((state: any) => {
      const newCart = state.cart.filter(
        (item: ProductCart) => item._id !== productId
      );
      return { cart: newCart };
    });
  },
}));
