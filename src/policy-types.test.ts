import { describe, expect, it } from "vitest";
import { validatePolicyDefinition } from "./policy-types";

describe("validatePolicyDefinition", () => {
  it("accepts a minimal valid policy", () => {
    expect(
      validatePolicyDefinition({
        version: "1",
        type: "spending-limit",
        owners: ["GABC"],
        threshold: 1,
        spendingLimits: { dailyXlm: "10.5", perTxXlm: "1" },
      }),
    ).toEqual({ valid: true, errors: [] });
  });

  it("rejects malformed owners and thresholds", () => {
    const result = validatePolicyDefinition({
      version: "1",
      type: "multisig",
      owners: ["GABC"],
      threshold: 2,
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("threshold must be an integer between 1 and owners.length");
  });

  it("rejects invalid spending limit strings", () => {
    const result = validatePolicyDefinition({
      version: "1",
      type: "spending-limit",
      owners: ["GABC"],
      spendingLimits: { dailyXlm: "1.12345678" },
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "dailyXlm must be a positive decimal string with at most 7 fractional digits",
    );
  });
});
