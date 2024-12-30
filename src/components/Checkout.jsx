import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

import { useContext } from "react";

const requestConfig = {
    method: "POST",
    headers: {
        "content-type": "application/json"
    }
}

export default function Checkout() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => { return totalPrice + (item.price * item.quantity) }, 0);

    const { data, isLoading: isSending, error, sendRequest } = useHttp("http://localhost:3000/orders", requestConfig)

    const handleClose = () => {
        userProgressCtx.hideCheckout();
    }

    const handleFinish = () => {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))

    }

    let actions = (
        <>
            <Button textOnly type="button" onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = <p>Sending order data...</p>
    }


    if (Object.prototype.toString.call(data) !== '[object Array]' && !error) {
        return <Modal open={userProgressCtx.progress==="checkout"} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>

            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return (
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="Email Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />

                <div className="control-row">
                    <Input label="Postal code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error}/>}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}