import { a as createTemplate } from "../../index-MBlAXvVu.js";
const template = createTemplate(
  '<div style=display:flex;align-items:flex-start;justify-content:flex-end><button type=button dir=ltr style=display:none class=pce-copy aria-label=Copy><svg width=1.2em viewbox="0 0 48 48" overflow=visible stroke-width=4 stroke-linecap=round fill=none stroke=currentColor><rect x=16 y=16 width=30 height=30 rx=3 /><path d="M32 9V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h4"/>'
);
const clipboard = navigator.clipboard;
const copyButton = () => (editor) => {
  const container = template(), btn = container.firstChild;
  btn.addEventListener("click", () => {
    btn.setAttribute("aria-label", "Copied!");
    if (clipboard) clipboard.writeText(editor.extensions.codeFold?.fullCode ?? editor.value);
    else {
      editor.textarea.select();
      document.execCommand("copy");
      editor.setSelection(0);
    }
  });
  btn.addEventListener("pointerenter", () => btn.setAttribute("aria-label", "Copy"));
  editor.overlays.append(container);
};
export {
  copyButton
};
//# sourceMappingURL=index.js.map
