import { useState } from "react";
import { Link } from "react-router-dom";
import { useSWRConfig } from "swr";
import { AUTH_SESSION_KEY, authClient } from "../lib/auth.js";
import { useAuthSession } from "../lib/use-auth-session.js";

const linkClass = "rounded-full px-3 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100";

export default function AccountActions({ onNavigate }) {
  const { user, isLoading } = useAuthSession();
  const { mutate } = useSWRConfig();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setErrorMessage("");
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error("Sign out failed");
      await mutate(AUTH_SESSION_KEY, { session: null, user: null }, { revalidate: false });
      onNavigate?.();
    } catch {
      setErrorMessage("No se pudo cerrar sesión.");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isLoading) return <span className="sr-only">Verificando sesión</span>;

  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-1">
        <Link to="/iniciar-sesion" onClick={onNavigate} className={linkClass}>Ingresar</Link>
        <Link to="/crear-cuenta" onClick={onNavigate} className="hidden rounded-full bg-amber-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800 sm:inline-flex">
          Crear cuenta
        </Link>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      {user.role === "admin" && (
        <Link to="/admin" onClick={onNavigate} className={linkClass}>Panel</Link>
      )}
      <span className="hidden max-w-36 truncate px-2 text-xs font-medium text-stone-600 xl:block" title={user.email}>
        {user.name || user.email}
      </span>
      <button type="button" onClick={handleSignOut} disabled={isSigningOut} className={linkClass}>
        {isSigningOut ? "Saliendo…" : "Salir"}
      </button>
      {errorMessage && <span role="alert" className="sr-only">{errorMessage}</span>}
    </div>
  );
}
