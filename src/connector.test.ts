import { describe, expect, it } from "vitest";
import { isAllowedOrigin, normalizeAllowedOrigins } from "./connector";

describe("allowed origin helpers", () => {
  it("normalizes and sorts https origins", () => {
    expect(
      normalizeAllowedOrigins([
        "https://app.example.com/path",
        "http://localhost:3000",
        "https://app.example.com/other",
        "https://docs.example.com",
      ]),
    ).toEqual(["https://app.example.com", "https://docs.example.com"]);
  });

  it("rejects empty, malformed, and unlisted origins", () => {
    expect(isAllowedOrigin("https://app.example.com", [])).toBe(false);
    expect(isAllowedOrigin("not a url", ["https://app.example.com"])).toBe(false);
    expect(isAllowedOrigin("https://evil.example.com", ["https://app.example.com"])).toBe(false);
  });

  it("allows exact normalized origins only", () => {
    expect(isAllowedOrigin("https://app.example.com/settings", ["https://app.example.com"])).toBe(
      true,
    );
    expect(isAllowedOrigin("https://app.example.com.evil.test", ["https://app.example.com"])).toBe(
      false,
    );
  });
});
