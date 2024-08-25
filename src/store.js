import create from 'zustand';

const useStore = create((set) => ({
    countOfItems: 0,  // Ensure this is initialized
    cart: {},         // Initialize cart as an empty object

    addItemsInCart: (itemID) => set((state) => {
        const currentCount = state.cart[itemID] || 0;
        return {
            countOfItems: state.countOfItems + 1,
            cart: {
                ...state.cart,
                [itemID]: currentCount + 1
            }
        };
    }),

    removeItemFromCart: (itemID) => set((state) => {
        console.log(state)
        const currentCount = state.cart[itemID] || 0;

        if (currentCount > 0) {
            const updatedCart = { ...state.cart };
            if (currentCount - 1 === 0) {
                delete updatedCart[itemID];
            } else {
                updatedCart[itemID] = currentCount - 1;
            }

            return {
                countOfItems: state.countOfItems - 1,
                cart: updatedCart
            };
        }
    }),

    clearCart: () =>  set({
        countOfItems: 0, 
        cart: {},
    })
}));

export default useStore;
