import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Exercise the installed SDK that AOI will ship, rather than another checkout.
const require = createRequire(import.meta.url);
function createAnalysis() {
  const source = readFileSync(
    require.resolve("@yrpri/webapp/allOurIdeas/survey/aoi-streaming-analysis.js"),
    "utf8",
  );
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2021,
      experimentalDecorators: true,
      useDefineForClassFields: false,
    },
  }).outputText;
  const imports: Record<string, unknown> = {
    lit: { html() {}, css() {} },
    "lit/decorators.js": {
      customElement: () => (value: unknown) => value,
      property: () => () => {},
    },
    "./AoiServerApi.js": { AoiServerApi: class {} },
    "../../common/litMarkdown/litMarkdown.js": { resolveMarkdown() {} },
    "../../common/languages/ypLanguages.js": {
      YpLanguages: { getEnglishName: () => "English" },
    },
    "../../yp-chatbots/yp-streaming-llm-scrolling.js": {
      YpStreamingLlmScrolling: class extends EventTarget {
        connectedCallback() {}
        disconnectedCallback() {}
        scrollDown() {}
      },
    },
  };
  const module = { exports: {} as any };
  const mockedRequire = (name: string) => {
    if (name.startsWith("@material/")) return {};
    if (name in imports) return imports[name];
    throw new Error(`Unexpected component import: ${name}`);
  };
  vm.runInNewContext(
    `(function(require, module, exports) { ${output}\n })`,
    { console: { warn() {} }, crypto: { randomUUID },
      WebSocket: { OPEN: 1, CONNECTING: 0, CLOSING: 2, CLOSED: 3 } },
  )(mockedRequire, module, module.exports);
  const element = new module.exports.AoiStreamingAnalysis();
  element.ws = { readyState: 1 };
  element.wsClientId = "socket";
  const streamAnalysis = element.streamAnalysis;
  element.streamAnalysis = async () => {};
  element.connectedCallback();
  element.dispatchEvent(new Event("yp-ws-opened"));
  element.streamAnalysis = streamAnalysis;
  return element;
}

test("an HTTP failure is handled and a retry can load cached analysis", async () => {
  const element = createAnalysis();
  element.serverApi.getSurveyAnalysis = async () => null;
  element.isStreaming = true;
  await assert.doesNotReject(() => element.streamAnalysis());
  assert.equal(element.analysisError, true);
  assert.equal(element.isStreaming, false);
  assert.equal(element.haveStartedStreaming, false);

  const choices = [{ id: 7, data: { content: "An answer" } }];
  element.serverApi.getSurveyAnalysis = async () => ({
    cachedAnalysis: "Cached analysis", selectedChoices: choices,
  });
  await element.streamAnalysis();
  assert.equal(element.analysisError, false);
  assert.equal(element.analysis, "Cached analysis");
  assert.equal(element.selectedChoices, choices);
  assert.equal(element.haveStartedStreaming, true);
});

test("a rejected network request is handled without an unhandled rejection", async () => {
  const element = createAnalysis();
  element.serverApi.getSurveyAnalysis = async () => { throw new TypeError("Failed to fetch"); };
  await assert.doesNotReject(() => element.streamAnalysis());
  assert.equal(element.analysisError, true);
  assert.equal(element.haveStartedStreaming, false);
});

test("repeated socket-open events do not start duplicate analysis requests", async () => {
  const element = createAnalysis();
  let requests = 0;
  let complete!: (value: unknown) => void;
  element.serverApi.getSurveyAnalysis = () => {
    requests++;
    return new Promise((resolve) => { complete = resolve; });
  };
  const firstRequest = element.streamAnalysis();
  await element.streamAnalysis();
  assert.equal(requests, 1);
  complete({ selectedChoices: [] });
  await firstRequest;
  assert.equal(element.analysisError, false);
});

test("a failed stream can retry without appending to its partial response", async () => {
  const element = createAnalysis();
  element.analysis = "Partial response";
  element.isStreaming = true;
  element.haveStartedStreaming = true;
  await element.addChatBotElement({ type: "error" });
  assert.equal(element.analysisError, true);
  assert.equal(element.isStreaming, false);
  element.serverApi.getSurveyAnalysis = async () => ({ selectedChoices: [] });
  await element.streamAnalysis();
  await element.addChatBotElement({ type: "start" });
  await element.addChatBotElement({ type: "stream", message: "New response" });
  assert.equal(element.analysis, "New response");
  assert.equal(element.analysisError, false);
});


test("both English locales retain the model-neutral AI labels", () => {
  for (const locale of ["en", "en_gb"]) {
    const translation = JSON.parse(readFileSync(
      new URL(`../locales/${locale}/translation.json`, import.meta.url), "utf8",
    ));
    assert.match(translation.aiAnalysisInfo, /by AI$/);
    assert.equal(translation["Written by GPT-4"], "Written by AI");
    assert.equal(translation["Generating analysis with GPT-4"], "Generating analysis with AI");
  }
});


test("user scrolling does not produce console errors", () => {
  const source = readFileSync(require.resolve(
    "@yrpri/webapp/yp-chatbots/yp-streaming-llm-scrolling.js",
  ), "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021 },
  }).outputText;
  const errors: unknown[] = [];
  const module = { exports: {} as any };
  const mockedRequire = (name: string) => {
    if (name.startsWith("@material/") || name === "../common/yp-image.js" ||
        name === "./yp-chatbot-item-base.js") return {};
    if (name === "lit/decorators.js") return {
      customElement: () => (value: unknown) => value,
      property: () => () => {},
    };
    if (name === "./yp-streaming-llm-base.js") return {
      YpStreamingLlmBase: class { $$() { return undefined; } },
    };
    throw new Error(`Unexpected scrolling import: ${name}`);
  };
  vm.runInNewContext(
    `(function(require, module, exports) { ${output}\n })`,
    { console: { error: (...args: unknown[]) => errors.push(args) } },
  )(mockedRequire, module, module.exports);
  const element = new module.exports.YpStreamingLlmScrolling();
  element.userScrolled = true;
  element.scrollDown();
  assert.deepEqual(errors, []);
});
