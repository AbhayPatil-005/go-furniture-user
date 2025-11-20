import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")||"[]");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart, // { id, name, price, quantity, imageUrl }
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log(item.stock)
      const existing = state.items.find((p) => p.id === item.id);

      if (existing) {
        if (existing.cartQuantity < existing.stock) {
          existing.cartQuantity++;
        }   
      } else {
        state.items.push({ ...item, cartQuantity: 1,  maxQuantity: item.stock, });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((item)=>item.id === id);
      
      if(!existing) return;
      state.items = state.items.filter((item)=>item.id!=id)
      
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.cartQuantity < item.maxQuantity) {
        item.cartQuantity ++ ;
      }else{
        console.log("not working!")
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.cartQuantity > 1) {
        item.cartQuantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", "");
    }
  }
});

export const { addToCart, removeFromCart, clearCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;