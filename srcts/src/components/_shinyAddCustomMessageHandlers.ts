import type { Handler as ShinyCustomMessageHandler } from "rstudio-shiny/srcts/types/src/shiny/shinyapp";

export function shinyAddCustomMessageHandlers(handlers: {
  [key: string]: ShinyCustomMessageHandler;
}): void {
  if (!window.Shiny) {
    return;
  }

  for (const [name, handler] of Object.entries(handlers)) {
    Shiny.addCustomMessageHandler(name, handler);
  }
}
