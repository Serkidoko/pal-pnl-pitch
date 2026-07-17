import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/index.html", import.meta.url);

async function renderedHtml() {
  return readFile(output, "utf8");
}

test("renders the evidence-safe PAL landing page", async () => {
  const html = await renderedHtml();

  assert.match(html, /<title>PAL — Evidence-safe P&amp;L landing page draft<\/title>/i);
  assert.match(html, /Evaluate AI against one real workflow/i);
  assert.match(html, /Verified capabilities/i);
  assert.match(html, /Value measurement/i);
  assert.match(html, /Inputs required/i);
  assert.match(html, /Identity confirmation required/i);
  assert.match(html, /noindex/i);
});

test("includes primary sources for every product-capability section", async () => {
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
});

test("does not ship the previous fictional business case or mockup", async () => {
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
  ];

  for (const phrase of prohibited) {
    assert.ok(!html.includes(phrase), `prohibited claim remains: ${phrase}`);
  }

  assert.doesNotMatch(html, /<img\b/i);
  assert.doesNotMatch(html, /property=["']og:image["']/i);
  assert.doesNotMatch(html, /codex-preview/i);
  await assert.rejects(access(new URL("../public/og.png", import.meta.url)));
});
