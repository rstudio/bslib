import type { HtmlDep } from "./_utils";
import type { Offcanvas as OffcanvasType } from "bootstrap";
import { shinyAddCustomMessageHandlers } from "./_shinyAddCustomMessageHandlers";
import { shinyRenderContent } from "./_utils";

const bsOffcanvas = (
  window.bootstrap ? window.bootstrap.Offcanvas : class {}
) as typeof OffcanvasType;

interface ShowOffcanvasMessage {
  html: string;
  deps?: HtmlDep[];
  id: string;
  temporary?: boolean;
}

async function showOffcanvas(message: ShowOffcanvasMessage): Promise<void> {
  const { html, deps, id, temporary } = message;

  let el = document.getElementById(id);

  if (!el) {
    await shinyRenderContent(document.body, { html, deps }, "beforeEnd");
    el = document.getElementById(id);
  }

  if (!el) return;
  const offcanvasEl = el;

  bsOffcanvas.getOrCreateInstance(offcanvasEl).show();

  if (temporary) {
    offcanvasEl.addEventListener(
      "hidden.bs.offcanvas",
      () => {
        window?.Shiny?.unbindAll?.(offcanvasEl);
        offcanvasEl.remove();
      },
      { once: true }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
shinyAddCustomMessageHandlers({ "bslib.show-offcanvas": showOffcanvas });

export type { ShowOffcanvasMessage };
