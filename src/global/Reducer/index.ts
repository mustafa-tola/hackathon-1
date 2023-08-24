const checkerAndReturner = (originalData: any, newData: any) => {
    for (let index = 0; index < originalData.length; index++) {
        const element = originalData[index];
        if (element.productId == newData.productId) {
            return element
        }
    }
}

export const cartReducer = (state: any, action: any) => {
    if (action.payload === "addToCart") {
        let response = checkerAndReturner(state.cart, action.data)
        if (!response) {
            return {
                cart: [...state.cart, action.data]
            }
        }
        else {
            let dataToStoreAgain = state.cart.filter((item: any) => item.productId != response.productId)
            return {
                cart: [...dataToStoreAgain, action.data]
            }
        }
    }
    else if (action.payload === "removeFromCart") {
        return " ";
    }
    else if (action.payload === "updateCart") {
        return state;
    }
}