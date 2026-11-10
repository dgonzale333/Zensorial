import { useState } from "react";

const emptyProduct = {
  name: "",
  origin: "",
  imageUrl: "",
  price: "",
  rating: "4.5",
  altitude: "",
  process: "",
  variety: "",
  roastLevel: "Medio",
  description: "",
  cupping: { aroma: 8, flavor: 8, acidity: 8, body: 8, balance: 8 },
  tastingNotes: "",
  brewingTips: "",
  certifications: "",
  isActive: true,
};

const inputClass = "mt-1 w-full rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15";

function splitList(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function formatProduct(product) {
  if (!product) return emptyProduct;
  return {
    ...emptyProduct,
    ...product,
    rating: String(product.rating ?? 4.5),
    cupping: { ...emptyProduct.cupping, ...product.cupping },
    tastingNotes: (product.tastingNotes ?? []).join(", "),
    brewingTips: (product.brewingTips ?? []).join(", "),
    certifications: (product.certifications ?? []).join(", "),
  };
}

function TextField({ id, label, value, onChange, type = "text", ...props }) {
  return (
    <label htmlFor={id} className="block text-sm font-medium text-stone-700">
      {label}
      <input id={id} className={inputClass} type={type} value={value} onChange={onChange} {...props} />
    </label>
  );
}

export default function CoffeeProductForm({ initialValue, isSaving, onCancel, onSubmit }) {
  const [form, setForm] = useState(() => formatProduct(initialValue));
  const editing = Boolean(initialValue);

  const updateField = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateCupping = (field) => (event) => {
    setForm((current) => ({
      ...current,
      cupping: { ...current.cupping, [field]: event.target.value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      rating: Number(form.rating),
      cupping: Object.fromEntries(Object.entries(form.cupping).map(([key, value]) => [key, Number(value)])),
      tastingNotes: splitList(form.tastingNotes),
      brewingTips: splitList(form.brewingTips),
      certifications: splitList(form.certifications),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm md:p-7">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">Catálogo</p>
          <h2 className="mt-1 font-serif text-2xl text-stone-900">{editing ? "Editar café" : "Agregar café"}</h2>
        </div>
        <button type="button" onClick={onCancel} className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50">
          Cancelar
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="coffee-name" label="Nombre del café" value={form.name} onChange={updateField("name")} required maxLength={120} />
        <TextField id="coffee-origin" label="Origen" value={form.origin} onChange={updateField("origin")} required maxLength={120} />
        <TextField id="coffee-image" label="URL de imagen" value={form.imageUrl} onChange={updateField("imageUrl")} maxLength={2048} placeholder="/images/cafeb1.jpeg o https://…" />
        <TextField id="coffee-price" label="Precio en COP (pesos enteros)" type="number" value={form.price} onChange={updateField("price")} min="1" max="99999999" step="1" placeholder="30000" />
        <TextField id="coffee-rating" label="Calificación (0–5)" type="number" value={form.rating} onChange={updateField("rating")} min="0" max="5" step="0.1" required />
        <TextField id="coffee-altitude" label="Altitud" value={form.altitude} onChange={updateField("altitude")} maxLength={120} />
        <TextField id="coffee-process" label="Proceso" value={form.process} onChange={updateField("process")} maxLength={80} />
        <TextField id="coffee-variety" label="Variedad" value={form.variety} onChange={updateField("variety")} maxLength={80} />
        <TextField id="coffee-roast" label="Tueste" value={form.roastLevel} onChange={updateField("roastLevel")} maxLength={80} />
      </div>

      <label htmlFor="coffee-description" className="mt-4 block text-sm font-medium text-stone-700">
        Descripción
        <textarea id="coffee-description" className={inputClass} rows={4} value={form.description} onChange={updateField("description")} maxLength={2400} />
      </label>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <TextField id="coffee-notes" label="Notas de cata (separadas por comas)" value={form.tastingNotes} onChange={updateField("tastingNotes")} placeholder="Cacao, panela, cítricos" />
        <TextField id="coffee-tips" label="Consejos de preparación (separados por comas)" value={form.brewingTips} onChange={updateField("brewingTips")} placeholder="Agua a 92°C, molienda media" />
        <TextField id="coffee-certifications" label="Certificaciones (separadas por comas)" value={form.certifications} onChange={updateField("certifications")} placeholder="Comercio justo, orgánico" />
      </div>

      <fieldset className="mt-6 rounded-xl border border-amber-100 p-4">
        <legend className="px-2 text-sm font-semibold text-stone-800">Perfil de cata (0–10)</legend>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {Object.entries(form.cupping).map(([field, value]) => (
            <TextField key={field} id={`cupping-${field}`} label={field.charAt(0).toUpperCase() + field.slice(1)} type="number" value={value} onChange={updateCupping(field)} min="0" max="10" step="0.1" required />
          ))}
        </div>
      </fieldset>

      <label className="mt-5 inline-flex items-center gap-3 text-sm font-medium text-stone-700">
        <input type="checkbox" checked={form.isActive} onChange={updateField("isActive")} className="size-4 accent-amber-800" />
        Mostrar en el catálogo público
      </label>

      <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-stone-100 pt-5">
        <button type="button" onClick={onCancel} className="rounded-full px-5 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-100">
          Cancelar
        </button>
        <button type="submit" disabled={isSaving} className="rounded-full bg-amber-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60">
          {isSaving ? "Guardando…" : editing ? "Guardar cambios" : "Crear café"}
        </button>
      </div>
    </form>
  );
}
