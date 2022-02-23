const femver = require("./index");

test("isValid", () => {
  expect(femver.isValid("1.0.0")).toEqual(true);
  expect(femver.isValid("1.0.1")).toEqual(true);
  expect(femver.isValid("0.1.0")).toEqual(true);
  expect(femver.isValid("0.0.1")).toEqual(true);
  expect(femver.isValid("3.0.5")).toEqual(true);
  expect(femver.isValid("3.2.0")).toEqual(true);
  expect(femver.isValid("0.7.0")).toEqual(true);
  expect(femver.isValid("15.6.3")).toEqual(true);
  expect(femver.isValid("7.2.1")).toEqual(true);
  expect(femver.isValid("17.0.0")).toEqual(true);

  expect(femver.isValid("not a version")).toEqual(false);
  expect(femver.isValid("1.0.0-3")).toEqual(false);
  expect(femver.isValid("15.7.98beta")).toEqual(false);
  expect(femver.isValid("^1.2.0")).toEqual(false);
  expect(femver.isValid(">= 1.x")).toEqual(false);
});

test("parse", () => {
  expect(femver.parse("1.0.0")).toEqual({ major: 1, minor: 0, patch: 0 });
  expect(femver.parse("1.0.1")).toEqual({ major: 1, minor: 0, patch: 1 });
  expect(femver.parse("0.1.0")).toEqual({ major: 0, minor: 1, patch: 0 });
  expect(femver.parse("0.0.1")).toEqual({ major: 0, minor: 0, patch: 1 });
  expect(femver.parse("3.0.5")).toEqual({ major: 3, minor: 0, patch: 5 });
  expect(femver.parse("3.2.0")).toEqual({ major: 3, minor: 2, patch: 0 });
  expect(femver.parse("0.7.0")).toEqual({ major: 0, minor: 7, patch: 0 });
  expect(femver.parse("15.6.3")).toEqual({ major: 15, minor: 6, patch: 3 });
  expect(femver.parse("7.2.1")).toEqual({ major: 7, minor: 2, patch: 1 });
  expect(femver.parse("17.0.0")).toEqual({ major: 17, minor: 0, patch: 0 });

  expect(() => {
  femver.parse("not a version");
}).toThrowErrorMatchingInlineSnapshot(`"Invalid semver version: not a version"`);

  expect(() => {
  femver.parse("1.0.0-3");
}).toThrowErrorMatchingInlineSnapshot(`"Invalid semver version: 1.0.0-3"`);

  expect(() => {
  femver.parse("15.7.98beta");
}).toThrowErrorMatchingInlineSnapshot(`"Invalid semver version: 15.7.98beta"`);

  expect(() => {
  femver.parse("^1.2.0");
}).toThrowErrorMatchingInlineSnapshot(`"Invalid semver version: ^1.2.0"`);

  expect(() => {
  femver.parse(">= 1.x");
}).toThrowErrorMatchingInlineSnapshot(`"Invalid semver version: >= 1.x"`);
});

test("less than", () => {
  expect(femver.lt("1.0.0", "1.0.0")).toBe(false);

  expect(femver.lt("1.0.0", "1.0.1")).toBe(true);
  expect(femver.lt("1.0.1", "1.0.0")).toBe(false);

  expect(femver.lt("0.1.0", "1.0.0")).toBe(true);
  expect(femver.lt("1.0.0", "0.1.0")).toBe(false);

  expect(femver.lt("0.0.1", "1.0.0")).toBe(true);
  expect(femver.lt("1.0.0", "0.0.1")).toBe(false);

  expect(femver.lt("3.0.5", "3.2.0")).toBe(true);
  expect(femver.lt("3.2.0", "3.0.5")).toBe(false);

  expect(femver.lt("0.7.0", "15.6.3")).toBe(true);
  expect(femver.lt("15.6.3", "0.7.0")).toBe(false);

  expect(femver.lt("7.2.1", "17.0.0")).toBe(true);
  expect(femver.lt("17.0.0", "7.2.1")).toBe(false);
});

test("less than or equal", () => {
  expect(femver.lte("1.0.0", "1.0.1")).toBe(true);
  expect(femver.lte("1.0.0", "1.0.0")).toBe(true);
  expect(femver.lte("1.2.0", "1.0.0")).toBe(false);
});

test("greater than", () => {
  expect(femver.gt("1.0.0", "1.0.0")).toBe(false);

  expect(femver.gt("1.0.0", "1.0.1")).toBe(false);
  expect(femver.gt("1.0.1", "1.0.0")).toBe(true);

  expect(femver.gt("0.1.0", "1.0.0")).toBe(false);
  expect(femver.gt("1.0.0", "0.1.0")).toBe(true);

  expect(femver.gt("0.0.1", "1.0.0")).toBe(false);
  expect(femver.gt("1.0.0", "0.0.1")).toBe(true);

  expect(femver.gt("3.0.5", "3.2.0")).toBe(false);
  expect(femver.gt("3.2.0", "3.0.5")).toBe(true);

  expect(femver.gt("0.7.0", "15.6.3")).toBe(false);
  expect(femver.gt("15.6.3", "0.7.0")).toBe(true);

  expect(femver.gt("7.2.1", "17.0.0")).toBe(false);
  expect(femver.gt("17.0.0", "7.2.1")).toBe(true);
});

test("greater than or equal", () => {
  expect(femver.gte("1.0.1", "1.0.0")).toBe(true);
  expect(femver.gte("1.0.0", "1.0.0")).toBe(true);
  expect(femver.gte("1.0.0", "1.2.0")).toBe(false);
});

test("equal to", () => {
  expect(femver.eq("1.0.0", "1.0.1")).toBe(false);
  expect(femver.eq("1.0.1", "1.0.0")).toBe(false);
  expect(femver.eq("1.0.0", "1.0.0")).toBe(true);
  expect(femver.eq("1.0.1", "1.0.1")).toBe(true);

  expect(femver.eq("0.1.0", "1.0.0")).toBe(false);
  expect(femver.eq("1.0.0", "0.1.0")).toBe(false);
  expect(femver.eq("0.1.0", "0.1.0")).toBe(true);

  expect(femver.eq("0.0.1", "1.0.0")).toBe(false);
  expect(femver.eq("1.0.0", "0.0.1")).toBe(false);
  expect(femver.eq("0.0.1", "0.0.1")).toBe(true);

  expect(femver.eq("3.0.5", "3.2.0")).toBe(false);
  expect(femver.eq("3.2.0", "3.0.5")).toBe(false);
  expect(femver.eq("3.0.5", "3.0.5")).toBe(true);
  expect(femver.eq("3.2.0", "3.2.0")).toBe(true);

  expect(femver.eq("0.7.0", "15.6.3")).toBe(false);
  expect(femver.eq("15.6.3", "0.7.0")).toBe(false);
  expect(femver.eq("0.7.0", "0.7.0")).toBe(true);
  expect(femver.eq("15.6.3", "15.6.3")).toBe(true);

  expect(femver.eq("7.2.1", "17.0.0")).toBe(false);
  expect(femver.eq("17.0.0", "7.2.1")).toBe(false);
  expect(femver.eq("7.2.1", "7.2.1")).toBe(true);
  expect(femver.eq("17.0.0", "17.0.0")).toBe(true);
});
