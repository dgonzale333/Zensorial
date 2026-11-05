import { createAuthClient } from "@neon/neon-js/auth";

export const authClient = createAuthClient(import.meta.env.VITE_NEON_AUTH_URL);
export const AUTH_SESSION_KEY = "neon-auth-session";

export async function readAuthSession() {
  const { data, error } = await authClient.getSession();
  if (error) throw new Error("No se pudo consultar la sesión.");
  return data ?? { session: null, user: null };
}
