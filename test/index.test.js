import assert from "node:assert/strict";
import { it } from "node:test";
import { guessDistTagWithLatest } from "../src/index.js";

it("latest version is null: latest", () => {
  assert.equal(guessDistTagWithLatest("1.0.0", null), "latest");
});
it("increment patch: latest", () => {
  assert.equal(guessDistTagWithLatest("1.0.1", "1.0.0"), "latest");
});
it("increment minor: latest", () => {
  assert.equal(guessDistTagWithLatest("1.1.0", "1.0.0"), "latest");
});
it("increment major: latest", () => {
  assert.equal(guessDistTagWithLatest("2.0.0", "1.0.0"), "latest");
});
it("next prerelease: next", () => {
  assert.equal(guessDistTagWithLatest("2.0.0-0", "1.0.0"), "next");
});
it("old prerelease: next", () => {
  assert.equal(guessDistTagWithLatest("2.3.0-0", "3.0.0"), "next-2");
});
it("same version: throws an error", () => {
  assert.throws(() => {
    guessDistTagWithLatest("1.0.0", "1.0.0");
  });
});
it("same major, lower minor: throws an error", () => {
  assert.throws(() => {
    guessDistTagWithLatest("1.0.1", "1.2.3");
  });
});
it("same major, lower patch: throws an error", () => {
  assert.throws(() => {
    guessDistTagWithLatest("1.2.1", "1.2.3");
  });
});
it("lower major: latest-3", () => {
  assert.equal(guessDistTagWithLatest("2.0.0", "3.0.0"), "latest-2");
});
