import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import test from "node:test";
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const js = readFileSync(new URL("../script.js", import.meta.url), "utf8");
test("page has correct brand and core metadata", () => {
  assert.match(html, /ISO MEGA Multimedia Ltd/);
  assert.match(html, /<meta name="description"/);
  assert.match(html, /<html lang="en">/);
});
test("all sections required by the navigation exist", () => {
  for (const id of ["main","about","services","approach","team","experience","contact"]) {
    assert.ok(html.includes('id="' + id + '"'), "missing section: " + id);
  }
});
test("approved logo is referenced as a binary asset", () => {
  assert.ok(existsSync(new URL("../assets/iso-mega-logo.png", import.meta.url)));
  assert.match(html, /src="\.\/assets\/iso-mega-logo\.png"/);
  const header = readFileSync(new URL("../assets/iso-mega-logo.png", import.meta.url));
  assert.equal(header.subarray(1,4).toString(), "PNG");
});
test("mobile navigation has accessible state handling", () => {
  assert.match(html, /aria-expanded="false"/);
  assert.match(js, /aria-expanded/);
  assert.match(css, /@media\(max-width:570px\)/);
});
test("no speculative enquiry form or invented client logos", () => {
  assert.doesNotMatch(html, /<form[\s>]/);
  assert.match(html, /mailto:isomegamultimedialtd@gmail.com/);
});
