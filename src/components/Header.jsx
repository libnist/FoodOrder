import logo from "../assets/logo.jpg";
import Button from "./UI/Button";

import CartContext from "../store/CartContext";
import { useContext } from "react";

export default function Header() {

    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => { return totalNumberOfItems + item.quantity }, 0);

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="A resturant" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button textOnly>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}