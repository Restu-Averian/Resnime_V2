import { Client } from "@libsql/client/web";

export const checkDatabaseReadiness = async (client: Client): Promise<void> => {
  try {
    const result = await client.execute("SELECT 1 AS ok;");
    if (result.rows.length === 0 || result.rows[0].ok !== 1) {
      throw new Error("Invalid readiness result");
    }
  } catch (err) {
    throw new Error("Database readiness check failed");
  }
};
