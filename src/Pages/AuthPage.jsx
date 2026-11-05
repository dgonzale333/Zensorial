import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import heroCafe from "../assets/Img/hero-cafe.jpg";
import { authClient } from "../lib/auth.js";
import { useAuthSession } from "../lib/use-auth-session.js";

function AuthField({ id, label, value, onChange, type = "text", autoComplete, minLength }) {
  return (
    <label htmlFor={id} className="block text-sm font-medium text-stone-700">
      {label}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        minLength={minLength}
        required
        className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/15"
      />
    </label>
  );
}

export default function AuthPage({ mode = "sign-in" }) {
  const isSignUp = mode === "sign-up";
  const navigate = useNavigate();
  const { user, isLoading, refresh } = useAuthSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (isSignUp && password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = isSignUp
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password })
        : await authClient.signIn.email({ email: email.trim(), password });

      if (result.error) {
        setErrorMessage("No fue posible completar el acceso. Revisa tus datos e inténtalo de nuevo.");
        return;
      }

      await refresh();
      navigate("/", { replace: true });
    } catch {
      setErrorMessage("No fue posible completar el acceso. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-amber-50 px-4 pt-20" aria-busy="true">
        <p className="text-sm text-stone-600">Comprobando sesión…</p>
      </main>
    );
  }

  if (user) return <Navigate to="/" replace />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4efe5] px-4 pb-12 pt-28 md:px-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-amber-100 bg-[#fcfaf6] shadow-[0_24px_80px_rgba(54,35,21,0.14)] lg:grid-cols-[1.05fr_0.95fr]">
        <aside className="relative hidden min-h-[650px] overflow-hidden bg-stone-900 text-white lg:block">
          <img src={heroCafe} alt="Paisaje cafetero colombiano al amanecer" className="absolute inset-0 size-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-stone-950/10" />
          <div className="absolute inset-x-0 bottom-0 p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">Zensorial · Café de origen</p>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight">Una buena taza empieza con una buena historia.</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-stone-200">Guarda tus preferencias y descubre cafés colombianos con identidad propia.</p>
          </div>
        </aside>

        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">Zensorial Café</p>
            <h1 className="mt-3 font-serif text-3xl text-stone-950 sm:text-4xl">
              {isSignUp ? "Crea tu cuenta" : "Bienvenido de nuevo"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {isSignUp ? "Únete a nuestra comunidad de café de origen." : "Inicia sesión para continuar con tu experiencia."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" aria-describedby={errorMessage ? "auth-error" : undefined}>
              {isSignUp && (
                <AuthField id="name" label="Nombre" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
              )}
              <AuthField id="email" label="Correo electrónico" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
              <AuthField id="password" label="Contraseña" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isSignUp ? "new-password" : "current-password"} minLength={8} />
              {isSignUp && (
                <AuthField id="confirm-password" label="Confirma tu contraseña" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength={8} />
              )}

              {errorMessage && (
                <p id="auth-error" role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {errorMessage}
                </p>
              )}

              <button type="submit" disabled={isSubmitting} className="mt-1 rounded-full bg-amber-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? "Procesando…" : isSignUp ? "Crear cuenta" : "Iniciar sesión"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-stone-600">
              {isSignUp ? "¿Ya tienes una cuenta?" : "¿Todavía no tienes una cuenta?"}{" "}
              <Link to={isSignUp ? "/iniciar-sesion" : "/crear-cuenta"} className="font-semibold text-amber-900 underline-offset-4 hover:underline">
                {isSignUp ? "Inicia sesión" : "Crear cuenta"}
              </Link>
            </p>
            <Link to="/" className="mt-8 inline-flex text-sm font-medium text-stone-500 transition hover:text-stone-900">Volver al sitio</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
