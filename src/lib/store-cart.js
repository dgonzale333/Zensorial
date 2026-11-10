import useSWR from "swr";

export const STORE_CART_KEY = "zensorial-store-cart";
const MAX_CART_QUANTITY = 30;
const MAX_PRODUCT_QUANTITY = 10;
const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function parseCopPrice(value) {
  const normalized = String(value ?? "").trim();
  if (!/^\d+$/.test(normalized)) return null;

  const amount = Number(normalized);
  if (!Number.isSafeInteger(amount) || amount < 1 || amount > 99_999_999) return null;
  return amount;
}

export function formatCopPrice(value) {
  const amount = typeof value === "number" ? value : parseCopPrice(value);
  return Number.isSafeInteger(amount) && amount > 0 ? copFormatter.format(amount) : "Precio por definir";
}

export function useStoreCart() {
  const { data, mutate } = useSWR(STORE_CART_KEY, null, {
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const items = Array.isArray(data) ? data : [];

  const updateCart = (updater) =>
    mutate(
      (current) => {
        const currentItems = Array.isArray(current) ? current : items;
        return updater(currentItems);
      },
      { revalidate: false },
    );

  const addItem = async (product) => {
    let added = false;
    await updateCart((current) => {
      const totalQuantity = current.reduce((sum, item) => sum + item.quantity, 0);
      const existing = current.find((item) => item.productId === product.id);
      if (totalQuantity >= MAX_CART_QUANTITY || existing?.quantity >= MAX_PRODUCT_QUANTITY) return current;

      added = true;
      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1, price: String(product.price ?? "") }
            : item,
        );
      }

      return [
        ...current,
        {
          productId: product.id,
          name: product.name,
          origin: product.origin,
          imageUrl: product.imageUrl || product.image || "",
          price: String(product.price ?? ""),
          quantity: 1,
        },
      ];
    });
    return added;
  };

  const updateQuantity = async (productId, quantity) => {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_PRODUCT_QUANTITY) return false;

    let updated = false;
    await updateCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (!existing) return current;
      const otherQuantity = current.reduce(
        (sum, item) => sum + (item.productId === productId ? 0 : item.quantity),
        0,
      );
      if (otherQuantity + quantity > MAX_CART_QUANTITY) return current;

      updated = true;
      return current.map((item) => (item.productId === productId ? { ...item, quantity } : item));
    });
    return updated;
  };

  const removeItem = (productId) =>
    updateCart((current) => current.filter((item) => item.productId !== productId));

  const clearCart = () => updateCart(() => []);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasUnpricedItems = items.some((item) => parseCopPrice(item.price) === null);
  const subtotal = hasUnpricedItems
    ? null
    : items.reduce((sum, item) => sum + parseCopPrice(item.price) * item.quantity, 0);
  const canCheckout = items.length > 0 && !hasUnpricedItems && Number.isSafeInteger(subtotal);

  return {
    items,
    totalQuantity,
    hasUnpricedItems,
    subtotal,
    canCheckout,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
}
