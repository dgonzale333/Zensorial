import useSWR from "swr";
import { AUTH_SESSION_KEY, readAuthSession } from "./auth.js";

export function useAuthSession() {
  const { data, error, isLoading, mutate } = useSWR(AUTH_SESSION_KEY, readAuthSession, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: false,
  });

  return {
    session: data?.session ?? null,
    user: data?.user ?? null,
    error,
    isLoading,
    refresh: () => mutate(),
  };
}
