import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatCopPrice, useStoreCart } from "../lib/store-cart.js";

export default function CartPage() {
  const { items, totalQuantity, hasUnpricedItems, subtotal, canCheckout, updateQuantity, removeItem } = useStoreCart();

  const changeQuantity = async (item, quantity) => {
    await updateQuantity(item.productId, quantity);
  };

  return (
    <main className="min-h-screen bg-[#f4efe5] px-4 pb-16 pt-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-amber-200/80 pb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Zensorial · Tu pedido</p>
            <h1 className="mt-2 font-serif text-4xl text-stone-950">Carrito de compras</h1>
            <p className="mt-2 text-sm text-stone-600">{totalQuantity} {totalQuantity === 1 ? "producto" : "productos"}</p>
          </div>
          <Link to="/tienda" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-900 hover:underline">
            <ArrowLeft aria-hidden="true" className="size-4" /> Seguir comprando
          </Link>
        </header>

        {items.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-amber-100 bg-[#fcfaf6] p-8 text-center sm:p-12">
            <ShoppingBag aria-hidden="true" className="mx-auto size-9 text-amber-800" />
            <h2 className="mt-4 font-serif text-2xl text-stone-900">Tu carrito está vacío</h2>
            <p className="mt-2 text-sm text-stone-600">Explora el catálogo y agrega tus cafés favoritos.</p>
            <Link to="/tienda" className="mt-6 inline-flex rounded-full bg-amber-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">Ver cafés</Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section aria-label="Productos en el carrito" className="flex flex-col gap-4">
              {items.map((item) => (
                <article key={item.productId} className="grid gap-4 rounded-2xl border border-amber-100 bg-[#fcfaf6] p-4 sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center sm:p-5">
                  <img src={item.imageUrl || "/images/cafeb1.jpeg"} alt="" className="aspect-square size-24 rounded-xl object-cover sm:size-28" />
                  <div className="min-w-0">
                    <h2 className="font-serif text-xl text-stone-950">{item.name}</h2>
                    <p className="mt-1 text-sm text-stone-500">{item.origin}</p>
                    <p className="mt-3 text-sm font-semibold text-amber-950">{formatCopPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="inline-flex items-center gap-3 rounded-full border border-amber-200 px-2 py-1">
                      <button type="button" onClick={() => changeQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1} aria-label={`Quitar una unidad de ${item.name}`} className="inline-flex size-8 items-center justify-center rounded-full text-stone-700 hover:bg-amber-50 disabled:opacity-40">
                        <Minus aria-hidden="true" className="size-4" />
                      </button>
                      <span className="min-w-5 text-center text-sm font-semibold text-stone-900" aria-live="polite">{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item, item.quantity + 1)} disabled={item.quantity >= 10 || totalQuantity >= 30} aria-label={`Agregar una unidad de ${item.name}`} className="inline-flex size-8 items-center justify-center rounded-full text-stone-700 hover:bg-amber-50 disabled:opacity-40">
                        <Plus aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.productId)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-red-800">
                      <Trash2 aria-hidden="true" className="size-4" /> Quitar
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="h-fit rounded-2xl border border-amber-100 bg-[#fcfaf6] p-5 sm:p-6 lg:sticky lg:top-28">
              <h2 className="font-serif text-2xl text-stone-950">Resumen</h2>
              <div className="mt-5 flex items-center justify-between border-t border-amber-100 pt-4 text-sm">
                <span className="text-stone-600">Subtotal</span>
                <span className="font-semibold text-stone-950">{subtotal === null ? "—" : formatCopPrice(subtotal)}</span>
              </div>
              {hasUnpricedItems && (
                <p role="status" className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-xs leading-5 text-amber-950">
                  Algunos cafés aún no tienen precio. El checkout se habilitará cuando el administrador registre sus precios en COP.
                </p>
              )}
              {canCheckout ? (
                <Link to="/checkout" className="mt-5 flex w-full items-center justify-center rounded-full bg-amber-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">
                  Continuar al pago seguro
                </Link>
              ) : (
                <button type="button" disabled className="mt-5 w-full rounded-full bg-stone-300 px-5 py-3 text-sm font-semibold text-stone-600">
                  Precio pendiente
                </button>
              )}
              <p className="mt-3 text-center text-xs leading-5 text-stone-500">El pago se procesa de forma segura con Stripe. Los productos se validan nuevamente en el servidor.</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
