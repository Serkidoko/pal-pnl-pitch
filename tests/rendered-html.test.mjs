import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/index.html", import.meta.url);
const cssFile = new URL("../app/globals.css", import.meta.url);
const publicDir = new URL("../public/", import.meta.url);

async function renderedHtml() {
  return readFile(output, "utf8");
}

test("renders the English PAL P&L landing page", async () => {
  const html = await renderedHtml();

  assert.match(html, /<html lang="en"/i);
  assert.match(html, /<title>PAL for the P&amp;L \| Vin Smart Future<\/title>/i);
  assert.match(html, /Put one business workflow on a/i);
  assert.match(html, /Presented by Vin Smart Future/i);
  assert.match(html, /PAL—MindPal in this proposal/i);
  assert.match(html, /THE P&amp;L MODEL/i);
  assert.match(html, /CANDIDATE WORKFLOWS/i);
  assert.match(html, /VALUE WITHOUT FICTION/i);
  assert.match(html, /MEASURED PILOT/i);
  assert.match(html, /THE DECISION REQUEST/i);
  assert.match(html, /index, follow/i);
});

test("links every platform claim to primary MindPal sources", async () => {
  const html = await renderedHtml();
  const sources = [
    "https://docs.mindpal.space/",
    "https://docs.mindpal.space/agent/knowledge-sources",
    "https://docs.mindpal.space/guides/embedding",
    "https://docs.mindpal.space/guides/audience-memory",
    "https://docs.mindpal.space/agent/brand-voice",
    "https://mindpal.space/privacy-policy",
    "https://mindpal.space/terms-of-service",
  ];

  for (const source of sources) assert.ok(html.includes(source), `missing source: ${source}`);
  assert.match(html, /Every platform statement can be checked at the source/i);
  assert.match(html, /not documented customer outcomes/i);
});

test("does not ship fictional customer proof, economics or the previous mockup", async () => {
  const html = await renderedHtml();
  const prohibited = [
    "$50M",
    "180 billable",
    "$180",
    "$800K",
    "$2.60M",
    "$1.82M",
    "Acme",
    "Pursuit Architect",
    "Delivery Copilot",
    "Expertise Portal",
    "$150K",
    "$200K",
    "50K+",
    "3K+",
    "500K ARR",
  ];

  for (const phrase of prohibited) {
    assert.ok(!html.includes(phrase), `prohibited claim remains: ${phrase}`);
  }

  assert.doesNotMatch(html, /<img\b/i);
  assert.match(html, /not customer results or guaranteed outcomes/i);
  assert.match(html, /not case studies, deployed customer solutions or promises of impact/i);
  assert.match(html, /No headline number until Finance approves the inputs/i);
});

test("ships only the validated social card as a public image asset", async () => {
  const html = await renderedHtml();
  const publicFiles = (await readdir(publicDir)).sort();

  assert.deepEqual(publicFiles, [".nojekyll", "og.png"]);
  await access(new URL("../public/og.png", import.meta.url));
  assert.match(html, /property="og:image"/i);
  assert.match(html, /PAL for the P&amp;L — presented by Vin Smart Future/i);
});

test("includes section transitions with a reduced-motion fallback", async () => {
  const [html, css] = await Promise.all([renderedHtml(), readFile(cssFile, "utf8")]);

  assert.match(html, /data-reveal="true"/i);
  assert.match(html, /class="scroll-progress"/i);
  assert.match(css, /\[data-reveal\]\.is-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /scroll-behavior:\s*smooth/);
});
