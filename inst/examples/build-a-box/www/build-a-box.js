/* globals Shiny,$ */

document.getElementById("preview").addEventListener("click", function (ev) {
  const vb = ev.target.closest(".bslib-value-box");
  if (!vb) return;
  Shiny.setInputValue("clicked_value_box", vb.parentElement.id);
});

Shiny.addCustomMessageHandler("active-value-box", function (id) {
  document
    .querySelectorAll(".active-preview")
    .forEach((el) => el.classList.remove("active-preview"));

  const vb = document.getElementById(id);
  if (!vb) return;
  vb.parentElement.classList.add("active-preview");
});

function reportValueBoxForegroundColor(id) {
  const vb = document.getElementById(id).querySelector(".value-box-title");
  if (!vb) {
    console.warn(id, "no value box found");
    return;
  }

  const styles = window.getComputedStyle(vb);
  const fg = styles.getPropertyValue("color");
  const inputId = id + "_fg_color";

  Shiny.setInputValue(inputId, fg, { priority: "event" });
}

["one", "two", "three"].forEach(function (id) {
  id = `${id}-value_box`;
  $(document).on("shiny:value", `#${id}`, () => {
    Shiny.shinyapp.taskQueue.enqueue(() => reportValueBoxForegroundColor(id));
  });
});

// Watch for the themer to be added to the DOM
window.watchForThemer = function () {
  const hideThemer = () => {
    const themer = document.getElementById("bsthemerContainer");
    themer.style.top = null;
    themer.style.bottom = "1rem";
    window.bootstrap.Collapse.getOrCreateInstance(
      themer.querySelector(".accordion")
    );
  };

  const observer = new MutationObserver(function (mutationsList, observer) {
    // Check if the target element has been added
    for (let mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        if (!document.getElementById("bsthemerContainer")) continue;

        hideThemer();
        observer.disconnect();
        break;
      }
    }
  });

  // Start observing the changes in the parent element of the target element
  observer.observe(document.body, { childList: true });
};

function checkCopyPermissions() {
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    const allowed = result.state == "granted" || result.state == "prompt";
    if (!allowed) {
      // clipboard isn't supported, hide the copy button
      document
        .getElementById("copy-code-to-clipboard")
        .classList.add("d-none");
      // fall back to manual copy/paste with a little help
      showValueBoxCodeHelp();
      selectValueBoxCode();
    }
  });
}

function showValueBoxCodeHelp() {
  document.getElementById("copy-clipboard-not-supported").classList.remove("d-none");
}

function selectValueBoxCode() {
  const textElement = document.getElementById("value-box-code");

  // Create a range and select all of the text within the element
  const range = document.createRange();
  range.selectNodeContents(textElement);

  // Create a selection and add the range to it
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

let copyButtonUpdateTimer = null;

function resetCopyButtonText() {
  const btn = document.getElementById("copy-code-to-clipboard");
  if (!btn) return;
  btn.innerText = "Copy to clipboard";
}

window.copyValueBoxCode = function () {
  const code = document.getElementById("value-box-code").innerText;
  const btn = document.getElementById("copy-code-to-clipboard");

  clearTimeout(copyButtonUpdateTimer);

  navigator.clipboard
    .writeText(code)
    .then(() => {
      btn.innerText = "Copied!";
      copyButtonUpdateTimer = setTimeout(resetCopyButtonText, 2000);
    })
    .catch(() => {
      btn.innerText = "Copy failed";
      copyButtonUpdateTimer = setTimeout(resetCopyButtonText, 2000);

      showValueBoxCodeHelp();
      selectValueBoxCode();
    });
};
