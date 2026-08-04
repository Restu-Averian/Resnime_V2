import { env, createExecutionContext, waitOnExecutionContext } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src/index";

describe("API Worker Baseline", () => {
  it("GET / returns HTTP 200 and expected service information", async () => {
    const request = new Request("http://example.com/");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({
      success: true,
      data: {
        service: "resnime-api",
        version: "v1",
        status: "running"
      }
    });
  });

  it("GET /health returns HTTP 200 with valid ISO timestamp", async () => {
    const request = new Request("http://example.com/health");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    
    expect(response.status).toBe(200);
    const json = await response.json() as any;
    expect(json.success).toBe(true);
    expect(json.data.service).toBe("resnime-api");
    expect(json.data.status).toBe("ok");
    
    const timestamp = json.data.timestamp;
    expect(typeof timestamp).toBe("string");
    const date = new Date(timestamp);
    expect(date.toISOString()).toBe(timestamp);
  });

  it("Unknown route returns HTTP 404 and standardized error shape", async () => {
    const request = new Request("http://example.com/unknown");
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    
    expect(response.status).toBe(404);
    const json = await response.json();
    expect(json).toEqual({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Route not found"
      }
    });
  });

  it("Allowed CORS origin receives access-control headers on preflight OPTIONS", async () => {
    const request = new Request("http://example.com/", {
      method: "OPTIONS",
      headers: {
        Origin: "http://localhost:5173",
        "Access-Control-Request-Method": "GET"
      }
    });
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("http://localhost:5173");
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain("GET");
  });

  it("Disallowed browser origin does not receive an allowed-origin response", async () => {
    const request = new Request("http://example.com/", {
      method: "OPTIONS",
      headers: {
        Origin: "https://evil.com",
        "Access-Control-Request-Method": "GET"
      }
    });
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);
    
    expect(response.headers.get("Access-Control-Allow-Origin")).toBeNull();
  });
});
