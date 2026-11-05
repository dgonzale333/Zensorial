import { useState } from "react";
import { ArrowRight, Coffee, MapPin, ShoppingBag, Star } from "lucide-react";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { COFFEE_PUBLIC_KEY, getPublicCoffees } from "../lib/coffee-api.js";
import { initialCoffeeProducts } from "../data/coffee-products.js";
import { formatCopPrice, parseCopPrice, useStoreCart } from "../lib/store-cart.js";

const fallbackProducts = initialCoffeeProducts.map((coffee) => ({
  ...coffee,
  image: coffee.imageUrl,
}));
const productIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function StorePage() {
  const { data: coffees = fallbackProducts, error, isLoading } = useSWR(
    COFFEE_PUBLIC_KEY,
    getPublicCoffees,
    { fallbackData: fallbackProducts },
  );
  const { addItem, items, totalQuantity } = useStoreCart();
  const [message, setMessage] = useState("");

  const handleAdd = async (coffee) => {
    const added = await addItem(coffee);
    setMessage(added ? `${coffee.name} se agregó al carrito.` : "Alcanzaste el límite de unidades del carrito.");
  };

  return (
    <main className="min-h-screen bg-[#f4efe5] px-4 pb-16 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-amber-200/80 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Zensorial · Tienda</p>
            <h1 className="mt-2 font-serif text-4xl text-stone-950 sm:text-5xl">Café de origen, en casa</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">Elige tu próximo café colombiano y agrégalo a la bolsa. Los precios se muestran en pesos colombianos.</p>
          </div>
          <Link to="/carrito" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-amber-900 px-5 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-900 hover:text-white">
            <ShoppingBag aria-hidden="true" className="size-4" />
            Ver carrito{totalQuantity ? ` (${totalQuantity})` : ""}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </header>

        {message && <p role="status" aria-live="polite" className="mt-5 rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm text-amber-950">{message}</p>}
        {error && <p role="status" className="mt-5 rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm text-amber-950">Mostramos el catálogo guardado mientras se restablece la conexión.</p>}

        {isLoading && coffees.length === 0 ? (
          <p className="mt-8 text-sm text-stone-600" aria-busy="true">Cargando cafés…</p>
        ) : coffees.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-amber-300 bg-white/70 p-10 text-center">
            <Coffee aria-hidden="true" className="mx-auto size-8 text-amber-800" />
            <h2 className="mt-3 font-serif text-2xl text-stone-900">Pronto tendremos más cafés</h2>
          </div>
        ) : (
          <section aria-label="Catálogo de cafés" className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {coffees.map((coffee) => {
              const inCart = items.find((item) => item.productId === coffee.id)?.quantity ?? 0;
              const hasPrice = parseCopPrice(coffee.price) !== null;
              const canAdd = productIdPattern.test(coffee.id) && !error && totalQuantity < 30 && inCart < 10;
              return (
                <article key={coffee.id} className="overflow-hidden rounded-2xl border border-amber-100 bg-[#fcfaf6] shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                    <img src={coffee.imageUrl || coffee.image || "/images/cafeb1.jpeg"} alt={`Café ${coffee.name}, de ${coffee.origin}`} className="size-full object-cover transition duration-500 hover:scale-[1.03]" />
                  </div>
                  <div className="flex flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="font-serif text-xl text-stone-950">{coffee.name}</h2>
                        <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
                          <MapPin aria-hidden="true" className="size-4 shrink-0" />
                          <span className="truncate">{coffee.origin}</span>
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
                        <Star aria-hidden="true" className="size-3 fill-current" /> {Number(coffee.rating).toFixed(1)}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-stone-600">{coffee.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(coffee.tastingNotes ?? []).slice(0, 3).map((note) => (
                        <span key={note} className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-900">{note}</span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-amber-100 pt-4">
                      <div>
                        <p className="text-xs text-stone-500">Precio</p>
                        <p className={`mt-0.5 text-lg font-semibold ${hasPrice ? "text-amber-950" : "text-stone-500"}`}>
                          {formatCopPrice(coffee.price)}
                        </p>
                      </div>
                      <button type="button" onClick={() => handleAdd(coffee)} disabled={!canAdd} className="inline-flex items-center gap-2 rounded-full bg-amber-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600">
                        <ShoppingBag aria-hidden="true" className="size-4" />
                        {!productIdPattern.test(coffee.id) || error ? "No disponible" : inCart ? `En carrito (${inCart})` : "Agregar"}
                      </button>
                    </div>
                    {!hasPrice && <p className="mt-3 text-xs text-stone-500">El pago se habilitará cuando se configure el precio en COP.</p>}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
