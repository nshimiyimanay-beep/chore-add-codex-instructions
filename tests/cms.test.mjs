import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync,existsSync} from "node:fs";
const file = path => new URL("../"+path,import.meta.url);
const read = path => readFileSync(file(path),"utf8");
const json = path => JSON.parse(read(path));
test("CMS data files have compatible structures", () => {
  const site=json("content/site.json");
  assert.equal(typeof site.hero.headingFirst,"string");
  assert.equal(typeof site.hero.headingSecond,"string");
  assert.ok(site.contact.email.includes("@"));
  for(const path of ["content/services.json","content/team.json","content/clients.json","content/projects.json"])assert.ok(Array.isArray(json(path)),path);
});
test("services have unique order and a usable display title", () => {
  const services=json("content/services.json");
  assert.equal(services.length,6);
  assert.equal(new Set(services.map(x=>x.number)).size,services.length);
  assert.ok(services.every(x=>typeof x.title==="string" && x.title.length>0));
});
test("no fictional portfolio items are published", () => {
  assert.ok(json("content/projects.json").every(x=>x.published!==true));
});
test("Pages CMS configuration declares necessary editor modules", () => {
  const config=read(".pages.yml");
  for(const key of ["Website settings & homepage","Services","Team profiles","Client references","Portfolio projects","content/projects.json","assets/uploads"])assert.ok(config.includes(key),key);
  assert.ok(!config.includes("password:"));
});
test("public website references real content adapter and portfolio section", () => {
  const html=read("index.html");
  const script=read("content.js");
  assert.match(html,/<script src="\.\/content\.js" defer>/);
  assert.match(html,/id="portfolio" hidden/);
  assert.match(script,/content\/services\.json/);
  assert.match(script,/content\/team\.json/);
  assert.match(script,/content\/clients\.json/);
  assert.match(script,/content\/projects\.json/);
  assert.match(script,/textContent/);
  assert.ok(!script.includes("innerHTML"));
});
test("administrator entry uses external GitHub-authenticated CMS, not in-browser credentials", () => {
  const page=read("admin/index.html");
  assert.match(page,/https:\/\/app\.pagescms\.org\//);
  assert.doesNotMatch(page,/<input[^>]+type=["']password/);
  assert.ok(existsSync(file("admin/admin.css")));
  assert.ok(existsSync(file("admin/admin.js")));
});
