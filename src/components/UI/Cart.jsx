import { useContext } from "react";
import Modal from "./Modal";

import Button from "./Button";
import CartContext from "../../store/CartContext";
import { currencyFormatter} from "../../util/formatting";
import UserProgressContext from "../../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => { return totalPrice + (item.price * item.quantity)}, 0);

    const handleCloseCart = () => {
        userProgressCtx.hideCart();
    }

    const handleGoToCheckout = () => {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress==="cart"} onClose={userProgressCtx.progress === "cart" ? handleCloseCart: null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => 
                    <CartItem key={item.id} name={item.name} price={item.price} quantity={item.quantity} onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)}/>
                )}
            </ul>

            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button> }
            </p>
        </Modal>
    )
}