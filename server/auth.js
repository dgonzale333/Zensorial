import process from "node:process";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { getDb } from "./db.js";
import { neonAuthUsers } from "./schema.js";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
let remoteJwks;

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function getAuthVerificationConfig() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL?.replace(/\/+$/, "");
  if (!baseUrl) throw new ApiError(503, "La autenticación no está configurada.");

  const authUrl = new URL(baseUrl);
  remoteJwks ??= createRemoteJWKSet(new URL(`${baseUrl}/.well-known/jwks.json`));

  return { issuer: authUrl.origin, jwks: remoteJwks };
}

export async function requireAdmin(request) {
  const authorization = request.headers?.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    throw new ApiError(401, "Inicia sesión para continuar.");
  }

  const token = authorization.slice("Bearer ".length).trim();
  if (!token) throw new ApiError(401, "Inicia sesión para continuar.");

  let payload;
  try {
    const { issuer, jwks } = getAuthVerificationConfig();
    ({ payload } = await jwtVerify(token, jwks, { issuer }));
  } catch {
    throw new ApiError(401, "La sesión no es válida.");
  }

  if (typeof payload.sub !== "string" || !uuidPattern.test(payload.sub)) {
    throw new ApiError(401, "La sesión no es válida.");
  }

  const [user] = await getDb()
    .select({ role: neonAuthUsers.role })
    .from(neonAuthUsers)
    .where(eq(neonAuthUsers.id, payload.sub))
    .limit(1);

  if (!user) throw new ApiError(401, "La sesión no es válida.");
  if (user.role !== "admin") throw new ApiError(403, "No tienes permisos de administrador.");

  return { userId: payload.sub };
}
