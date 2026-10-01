import { createContext, useContext, useState } from "react"; 
  const CartContext = createContext(null);

  export function CartProvider({ children }) { 
    const [cartItems, setCartItems] = useState([]);

   const addToCart = (product, quantity = 1, size = "M") => { 
   setCartItems((currentItems) => [ 
   ...currentItems,
     {
        ...product,
        quantity, 
        size,
      }, 
   ]); 
}; 


return ( 
  <CartContext.Provider 
  value={{ 
   cartItems, 
   addToCart, 
    }}
 >

 {children} 
</CartContext.Provider> 
    ); 
} 

   export function useCart() {
   const context = useContext(CartContext); 

       if (!context) {
           throw new Error( 
           "useCart must be used inside CartProvider" 
        ); 
   } 
   return context; 
}