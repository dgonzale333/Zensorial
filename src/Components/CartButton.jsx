import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useStoreCart } from "../lib/store-cart.js";

export default function CartButton({ onNavigate }) {
  const { totalQuantity } = useStoreCart();

  return (
    <Link
      to="/carrito"
      onClick={onNavigate}
      aria-label={`Carrito de compras, ${totalQuantity} productos`}
      className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full text-amber-900 transition hover:bg-amber-100"
    >
      <ShoppingCart aria-hidden="true" className="size-5" />
      {totalQuantity > 0 && (
        <span aria-hidden="true" className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-amber-900 px-1 text-[10px] font-bold leading-5 text-white">
          {totalQuantity > 99 ? "99+" : totalQuantity}
        </span>
      )}
    </Link>
  );
}
