// similar to htmltools::tag()
// name: String
// attrs: {}
// children: any?
function tag(name, attrs, ...children) {
  let el = document.createElement(name);
  Object.entries(attrs || {}).forEach(([nm, val]) => {
    (nm.startsWith('on') && nm.toLowerCase() in window) 
    ? el.addEventListener(nm.toLowerCase().substr(2), val)
    : el.setAttribute(nm, val.toString());
  });
  if (!children) {
    return el;
  }
  children.forEach(x => appendChild(el, x))
  return el;
}

// similar to htmltools::tagList()
function tagList(...children) {
  return tag("template", {}, children).children;
}

// similar to htmltools::HTML()
// x: String
function HTML(x) {
  let template = document.createElement("template");
  template.innerHTML = x;
  return template.content;
}

// similar to htmltools::tagAppendChildren()
// x: https://developer.mozilla.org/en-US/docs/Web/API/Node
// y: any?
function appendChild(x, y) {
  if (y instanceof HTMLCollection) {
    
    while (y.length > 0) {
      x.appendChild(y[0]); // x.appendChild(y) modifies y
    }

  } else if (Array.isArray(y)) {

    y.forEach(z => appendChild(x, z));

  } else {

    x.appendChild(y.nodeType ? y : document.createTextNode(y));

  }
}

export {tag, tagList, HTML, appendChild}