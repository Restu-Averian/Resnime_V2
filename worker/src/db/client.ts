import { createClient, Client } from "@libsql/client/web";
import { Bindings } from "../types/bindings";

export const createDatabaseClient = (bindings: Bindings): Client => {
  return createClient({
    url: bindings.TURSO_DATABASE_URL,
    authToken: bindings.TURSO_AUTH_TOKEN,
  });
};
