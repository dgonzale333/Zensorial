import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import CoffeeProductForm from "../Components/CoffeeProductForm.jsx";
import { useAuthSession } from "../lib/use-auth-session.js";
import {
  COFFEE_ADMIN_KEY,
  COFFEE_PUBLIC_KEY,
  createCoffee,
  deleteCoffee,
  getAdminCoffees,
  updateCoffee,
} from "../lib/coffee-api.js";

function LoadingState({ label }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-amber-50 px-4 pt-24" aria-busy="true">
      <p className="text-sm text-stone-600">{label}</p>
    </main>
  );
}

function RestrictedAccess() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-amber-50 px-4 pb-12 pt-28">
      <section className="w-full max-w-lg rounded-3xl border border-amber-100 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Zensorial · Administración</p>
        <h1 className="mt-3 font-serif text-3xl text-stone-950">Acceso restringido</h1>
        <p className="mt-3 text-sm leading-6 text-stone-600">Esta cuenta no tiene el rol de administrador. El rol se asigna de forma segura en Neon Auth y no se puede autoasignar desde el sitio.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full border border-stone-200 px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50">Volver al sitio</Link>
          <Link to="/iniciar-sesion" className="rounded-full bg-amber-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800">Cambiar cuenta</Link>
        </div>
      </section>
    </main>
  );
}

export default function AdminCoffeesPage() {
  const { user, isLoading: isSessionLoading } = useAuthSession();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const { mutate } = useSWRConfig();
  const {
    data: products = [],
    error: loadError,
    isLoading: isProductsLoading,
    mutate: refreshProducts,
  } = useSWR(user?.role === "admin" ? COFFEE_ADMIN_KEY : null, getAdminCoffees, {
    shouldRetryOnError: false,
  });

  if (isSessionLoading) return <LoadingState label="Verificando acceso…" />;
  if (!user) return <Navigate to="/iniciar-sesion" replace state={{ from: "/admin" }} />;
  if (user.role !== "admin") return <RestrictedAccess />;

  const activeCount = products.filter((product) => product.isActive).length;

  const refreshCatalog = async () => {
    await Promise.all([refreshProducts(), mutate(COFFEE_PUBLIC_KEY)]);
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
    setFeedback(null);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
    setFeedback(null);
  };

  const handleSave = async (product) => {
    setIsSaving(true);
    setFeedback(null);
    try {
      if (editingProduct) {
        await updateCoffee(editingProduct.id, product);
        setFeedback({ type: "success", message: "Los cambios del café quedaron guardados." });
      } else {
        await createCoffee(product);
        setFeedback({ type: "success", message: "El café se agregó al catálogo." });
      }
      setIsFormOpen(false);
      setEditingProduct(null);
      await refreshCatalog();
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "No fue posible guardar el café." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (product) => {
    setFeedback(null);
    try {
      await updateCoffee(product.id, { ...product, isActive: !product.isActive });
      setFeedback({ type: "success", message: product.isActive ? "El café se ocultó del catálogo público." : "El café volvió al catálogo público." });
      await refreshCatalog();
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "No fue posible actualizar el café." });
    }
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(`¿Eliminar “${product.name}” del catálogo? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    setDeletingId(product.id);
    setFeedback(null);
    try {
      await deleteCoffee(product.id);
      setFeedback({ type: "success", message: "El café se eliminó del catálogo." });
      await refreshCatalog();
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "No fue posible eliminar el café." });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4efe5] px-4 pb-16 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 border-b border-amber-200/80 pb-7 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Zensorial · Panel privado</p>
            <h1 className="mt-2 font-serif text-4xl text-stone-950 sm:text-5xl">Catálogo de cafés</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">Crea, actualiza, publica u oculta los cafés que aparecen en el sitio.</p>
          </div>
          <button type="button" onClick={openCreateForm} className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">
            <span aria-hidden="true">+</span> Nuevo café
          </button>
        </header>

        <section aria-label="Resumen del catálogo" className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-amber-100 bg-white p-5">
            <p className="text-sm text-stone-500">Total de cafés</p>
            <p className="mt-2 font-serif text-3xl text-stone-900">{products.length}</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white p-5">
            <p className="text-sm text-stone-500">Visibles en el sitio</p>
            <p className="mt-2 font-serif text-3xl text-stone-900">{activeCount}</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white p-5">
            <p className="text-sm text-stone-500">Administrador</p>
            <p className="mt-2 truncate text-sm font-semibold text-stone-900">{user.name || user.email}</p>
          </div>
        </section>

        {feedback && (
          <p role={feedback.type === "error" ? "alert" : "status"} className={`mt-5 rounded-xl border px-4 py-3 text-sm ${feedback.type === "error" ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>
            {feedback.message}
          </p>
        )}

        {loadError && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">No fue posible cargar el catálogo. Intenta actualizar la página.</p>}

        {isFormOpen && (
          <section id="coffee-form" className="mt-7">
            <CoffeeProductForm
              key={editingProduct?.id ?? "new-coffee"}
              initialValue={editingProduct}
              isSaving={isSaving}
              onCancel={() => { setIsFormOpen(false); setEditingProduct(null); }}
              onSubmit={handleSave}
            />
          </section>
        )}

        <section className="mt-8" aria-labelledby="coffee-list-heading">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 id="coffee-list-heading" className="font-serif text-2xl text-stone-900">Productos</h2>
            <Link to="/" className="text-sm font-semibold text-amber-900 underline-offset-4 hover:underline">Ver sitio público</Link>
          </div>

          {isProductsLoading ? (
            <p className="rounded-2xl border border-amber-100 bg-white p-8 text-center text-sm text-stone-600" aria-busy="true">Cargando cafés…</p>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-amber-300 bg-white/70 p-10 text-center">
              <h3 className="font-serif text-2xl text-stone-900">Aún no hay cafés</h3>
              <p className="mt-2 text-sm text-stone-600">Agrega el primer producto para empezar a administrar el catálogo.</p>
              <button type="button" onClick={openCreateForm} className="mt-5 rounded-full bg-amber-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800">Agregar un café</button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <article key={product.id} className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">
                  <div className="aspect-[16/10] bg-stone-100">
                    <img src={product.imageUrl || product.image || "/images/cafeb1.jpeg"} alt="" className="size-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-serif text-xl text-stone-900">{product.name}</h3>
                        <p className="mt-1 truncate text-sm text-stone-500">{product.origin}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${product.isActive ? "bg-emerald-50 text-emerald-800" : "bg-stone-100 text-stone-600"}`}>
                        {product.isActive ? "Visible" : "Oculto"}
                      </span>
                    </div>
                    <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-stone-600">{product.description || "Sin descripción."}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(product.tastingNotes ?? []).slice(0, 3).map((note) => (
                        <span key={note} className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-900">{note}</span>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-stone-100 pt-4">
                      <button type="button" onClick={() => openEditForm(product)} aria-label={`Editar ${product.name}`} className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50">Editar</button>
                      <button type="button" onClick={() => handleToggleActive(product)} className="rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50">{product.isActive ? "Ocultar" : "Publicar"}</button>
                      <button type="button" onClick={() => handleDelete(product)} disabled={deletingId === product.id} aria-label={`Eliminar ${product.name}`} className="ml-auto rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-50 disabled:opacity-50">{deletingId === product.id ? "Eliminando…" : "Eliminar"}</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
