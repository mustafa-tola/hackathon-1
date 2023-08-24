import { cartContext } from "@/global/Context";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

const CartState = () => {
    let { cartArray } = useContext(cartContext);
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        if (cartArray.length != 0) {
            setQuantity(cartArray.length)
        }
    },[cartArray])
    let { state } = useContext(cartContext);
    return (
        <Link href="/cart" className="flex-shrink-0 relative w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 absolute top-1 right-1 bg-red-400 rounded-full text-xs font-light flex justify-center items-center">{quantity}</div>
            <ShoppingCart size={25} />
        </Link>
    )
}
export default CartState;