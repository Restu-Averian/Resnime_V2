import { env, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import worker from "../src/index";
import * as readiness from "../src/db/readiness";
import * as client from "../src/db/client";

vi.mock("../src/db/readiness", () => ({
  checkDatabaseReadiness: vi.fn(),
}));

vi.mock("../src/db/client", () => ({
  createDatabaseClient: vi.fn(),
}));

describe("GET /ready endpoint", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("GET /health returns HTTP 200 and does not invoke database readiness function", async () => {
    const request = new Request("http://example.com/health");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(200);
    expect(readiness.checkDatabaseReadiness).not.toHaveBeenCalled();
    expect(client.createDatabaseClient).not.toHaveBeenCalled();
  });

  it("GET /ready returns HTTP 200 when database check succeeds", async () => {
    vi.mocked(readiness.checkDatabaseReadiness).mockResolvedValue(undefined);
    
    const mockEnv = {
      ...env,
      TURSO_DATABASE_URL: "libsql://test",
      TURSO_AUTH_TOKEN: "test-token"
    };

    const request = new Request("http://example.com/ready");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, mockEnv, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    
    const json = await response.json() as any;
    expect(json.success).toBe(true);
    expect(json.data.status).toBe("ready");
    expect(json.data.database).toBe("connected");
    
    const timestamp = json.data.timestamp;
    expect(typeof timestamp).toBe("string");
    const date = new Date(timestamp);
    expect(date.toISOString()).toBe(timestamp);
  });

  it("GET /ready returns HTTP 503 when database check fails", async () => {
    vi.mocked(readiness.checkDatabaseReadiness).mockRejectedValue(new Error("Fake connection error with real password: secretpassword"));
    
    const mockEnv = {
      ...env,
      TURSO_DATABASE_URL: "libsql://test",
      TURSO_AUTH_TOKEN: "test-token"
    };

    const request = new Request("http://example.com/ready");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, mockEnv, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(503);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    
    const json = await response.json() as any;
    expect(json.success).toBe(false);
    expect(json.error.code).toBe("DATABASE_UNAVAILABLE");
    
    // Ensure raw error is not exposed
    const responseText = JSON.stringify(json);
    expect(responseText).not.toContain("Fake connection error");
    expect(responseText).not.toContain("secretpassword");
    expect(responseText).not.toContain("libsql://test");
    expect(responseText).not.toContain("test-token");
  });
});
