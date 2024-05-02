// Find an Element to use as the trigger (aka, reference) for the tooltip
//
// TODO: In the future, it'd be nice if the reference was a virtual element (defining)
// a rectangle around `this.childNodes` instead of just the last HTMLElement.
// As of today, bootstrap.Tooltip doesn't seem to support floating-ui's virtual elements,
// (but that should change in Bootstrap v6 https://github.com/twbs/bootstrap/pull/36683)
export function getOrCreateTriggerEl(el: Element): HTMLElement {
  // If we've already identified and marked the trigger, then use it
  // (this should be done when the custom element is connected)
  const tip = el.querySelector(":scope > [data-bs-toggle='tooltip']");
  if (tip) return tip as HTMLElement;
  const pop = el.querySelector(":scope > [data-bs-toggle='popover']");
  if (pop) return pop as HTMLElement;

  // The first child of the web component always contains the tooltip/popover content,
  // so ignore the 1st child
  if (el.children.length > 1) {
    const ref = el.children[el.children.length - 1];
    return ref as HTMLElement;
  }
  // If there are childNodes (i.e., a text node), then wrap the last one in a
  // span and use that as the reference
  if (el.childNodes.length > 1) {
    const ref = document.createElement("span");
    ref.append(el.childNodes[el.childNodes.length - 1]);
    el.appendChild(ref);
    return ref;
  }
  return el as HTMLElement;
}

interface UpdatableTooltip {
  tip?: HTMLElement;
  update: () => void;
  setContent: (x: { [key: string]: HTMLElement | string }) => void;
}

// Workaround for a bug with .setContent() where it inadverently removes a
// currently visible tooltip/popover. See:
// https://github.com/twbs/bootstrap/issues/37206#issuecomment-1259541205
export function setContentCarefully(x: {
  instance: UpdatableTooltip;
  trigger: HTMLElement;
  content: { [key: string]: HTMLElement | string };
  type: "popover" | "tooltip";
}): void {
  const { instance, trigger, content, type } = x;

  const { tip } = instance;
  // If we have access to the tooltip/popover's DOM element, and it's currently
  // visible, then update the content "carefully". Otherwise, use the official
  // API
  const tipIsVisible = tip && tip.offsetParent !== null;
  if (!tipIsVisible) {
    instance.setContent(content);
    return;
  }

  // Do the "careful" update
  for (const [selector, html] of Object.entries(content)) {
    let target = tip.querySelector(selector);
    if (!target && selector === ".popover-header") {
      // Make sure we can update the header even if there currently isn't one
      const header = document.createElement("div");
      header.classList.add("popover-header");
      tip.querySelector(".popover-body")?.before(header);
      target = header;
    }
    if (!target) {
      console.warn(`Could not find ${selector} in ${type} content`);
      continue;
    }
    // If the target is the content/header itself, then ignore it
    if (target === html) {
      continue;
    }
    if (target instanceof HTMLElement) {
      target.replaceChildren(html);
    } else {
      target.innerHTML = html as string;
    }
  }

  instance.update();

  // The next time the tip is hidden, officially replace the content (otherwise
  // the next time its shown, it will revert to the old content)
  trigger.addEventListener(
    `hidden.bs.${type}`,
    () => instance.setContent(content),
    { once: true }
  );
}

export function createWrapperElement(
  html: DocumentFragment | string,
  display: CSSStyleDeclaration["display"]
): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.style.display = display;
  if (html instanceof DocumentFragment) {
    wrapper.append(html);
  } else {
    wrapper.innerHTML = html;
  }
  return wrapper;
}
