const htmlCodeEl = document.querySelector("[data-html]");
const cssCodeEl = document.querySelector("[data-css]");
const jsCodeEl = document.querySelector("[data-js]");
const codeEl = document.querySelector("[data-code]").contentWindow.document;
const runButtonEl = document.querySelector("#run");
const clearButtonEl = document.querySelector("#clear");

const defaultEditorSettings = {
  styleActiveLine: true,
  lineNumbers: true,
  matchBrackets: true,
  tabSize: 2,
  indentUnit: 2,
  theme: "monokai",
  lineWrapping: true,
};

const jsEditor = CodeMirror.fromTextArea(jsCodeEl, {
  ...defaultEditorSettings,
  mode: "javascript",
});

const cssEditor = CodeMirror.fromTextArea(cssCodeEl, {
  ...defaultEditorSettings,
  mode: "css",
});

const htmlEditor = CodeMirror.fromTextArea(htmlCodeEl, {
  ...defaultEditorSettings,
  mode: "xml",
  tags: {
    style: [
      ["type", /^text\/(x-)?scss$/, "text/x-scss"],
      [null, null, "css"],
    ],
    custom: [[null, null, "customMode"]],
  },
});

for (const editor of [jsEditor, cssEditor, htmlEditor]) {
  editor.on("blur", (codeMirror) => {
    codeMirror.save();
  });
}

runButtonEl.addEventListener("click", () => {
  const htmlCode = htmlCodeEl.value;
  const cssCode = cssCodeEl.value;
  const jsCode = jsCodeEl.value;

  codeEl.open();
  codeEl.write(`<style>${cssCode}</style>`);
  codeEl.write(htmlCode);
  codeEl.write(`<script>${jsCode}</script>`);
  codeEl.close();
});

clearButtonEl.addEventListener("click", () => {
  htmlEditor.setValue("");
  cssEditor.setValue("");
  jsEditor.setValue("");
});
