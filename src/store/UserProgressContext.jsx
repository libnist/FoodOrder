import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: "",
    showCart: () => {},
    hideCart: () => {},
    showCkeckout: () => {},
    hideCheckout: () => {}
})

export default UserProgressContext;

export function UserProgressContextProvider( {children }) {

    const [userProgress, setUserProgress] = useState("");

    const showCart = () => {
        setUserProgress("cart");
    }

    const hideCart = () => {
        setUserProgress("");
    }

    const showCheckout = () => {
        setUserProgress("checkout");
    }

    const hideCheckout = () => {
        hideCart();
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
    )
} 