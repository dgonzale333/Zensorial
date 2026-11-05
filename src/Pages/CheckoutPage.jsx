import { useCallback, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { formatCopPrice, useStoreCart } from "../lib/store-cart.js";

const publishableKey = import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export default function CheckoutPage() {
  const { items, subtotal, canCheckout } = useStoreCart();
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const [isStarting, setIsStarting] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        idempotencyKey,
        items: items.map(({ productId, quantity }) => ({ productId, quantity })),
      }),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.clientSecret) {
      throw new Error(result?.error || "No fue posible preparar el pago.");
    }
    return result.clientSecret;
  }, [idempotencyKey, items]);

  const handleStartPayment = () => {
    setErrorMessage("");
    setIsStarting(true);
    setShowCheckout(true);
  };

  if (items.length === 0) return <Navigate to="/carrito" replace />;

  return (
    <main className="min-h-screen bg-[#f4efe5] px-4 pb-16 pt-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/carrito" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-900 hover:underline">
          <ArrowLeft aria-hidden="true" className="size-4" /> Volver al carrito
        </Link>

        <header className="mt-5 border-b border-amber-200/80 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Zensorial · Pago seguro</p>
          <h1 className="mt-2 font-serif text-4xl text-stone-950">Finaliza tu compra</h1>
          <p className="mt-2 text-sm text-stone-600">El cobro se calcula en el servidor con los precios vigentes del catálogo.</p>
        </header>

        {!publishableKey && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">Stripe no está configurado para este entorno.</p>}
        {errorMessage && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{errorMessage}</p>}

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="min-w-0 rounded-2xl border border-amber-100 bg-[#fcfaf6] p-4 sm:p-6">
            {showCheckout && stripePromise ? (
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{
                  fetchClientSecret: async () => {
                    try {
                      const secret = await fetchClientSecret();
                      setIsStarting(false);
                      return secret;
                    } catch (error) {
                      setErrorMessage(error.message || "No fue posible preparar el pago.");
                      setIsStarting(false);
                      throw error;
                    }
                  },
                }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                  <LockKeyhole aria-hidden="true" className="size-4 text-amber-800" /> Checkout protegido por Stripe
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-600">Al continuar, Stripe abrirá el formulario seguro de pago integrado.</p>
                <button type="button" onClick={handleStartPayment} disabled={!canCheckout || !stripePromise || isStarting} className="mt-6 w-full rounded-full bg-amber-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600 sm:w-auto">
                  {isStarting ? "Preparando pago…" : "Continuar a Stripe"}
                </button>
              </div>
            )}
          </section>

          <aside className="h-fit rounded-2xl border border-amber-100 bg-[#fcfaf6] p-5 sm:p-6">
            <h2 className="font-serif text-2xl text-stone-950">Tu pedido</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.productId} className="flex items-start justify-between gap-3 text-sm">
                  <span className="min-w-0 text-stone-700">{item.quantity} × {item.name}</span>
                  <span className="shrink-0 font-medium text-stone-900">{formatCopPrice(item.price)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-between border-t border-amber-100 pt-4 text-sm font-semibold text-stone-950">
              <span>Total</span>
              <span>{subtotal === null ? "Precio pendiente" : formatCopPrice(subtotal)}</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
