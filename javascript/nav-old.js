// TODO: import Sass styles too and shadowDOM-ify?

// Nav containers (e.g., <navs-tab>, <navs-pill>, etc)
// expect content of the following structure:
// TODO: selected as top-level is ideal for using component directly, 
// but does it work for qmd usage?  
//
//<bslib-navs-tab selected='two'>
//  <bslib-nav-item title='Tab 1' value='one'>
//    Tab 1 content
//  </bslib-nav-item>
//  <bslib-nav-item title='Tab 2' value='two'>
//    Tab 2 content
//  </bslib-nav-item>
//  <bslib-nav-menu title='Menu' value='menu'>
//    <bslib-nav-item title='Tab 1' value='one'>
//      Tab 1 content
//    </bslib-nav-item>
//  </bslib-nav-menu>
//</bslib-navs-tab>

class NavsTab extends HTMLElement {
  constructor() {
    self = super();
    console.log(self);
    insertTabset(self, ["nav", "nav-tabs"]);
  }
}
customElements.define('bslib-navs-tab', NavsTab);

class NavsPill extends HTMLElement {
  constructor() {
    self = super();
    insertTabset(self, ["nav", "nav-pills"]);
  }
}
customElements.define('bslib-navs-pill', NavsPill);

//class NavsTabCard extends HTMLElement {
//  constructor() {
//    self = super();
//  }
//}
//customElements.define('navs-tab-card', NavsTabCard);
//
//class NavsPillCard extends HTMLElement {
//  constructor() {
//    self = super();
//  }
//}
//customElements.define('navs-pill-card', NavsPillCard);


function insertTabset(el, navClasses) {
  let nav = document.createElement('ul');
  navClasses.forEach(x => nav.classList.add(x));
  nav.setAttribute('id', el.getAttribute('id'));
  nav.setAttribute('role', 'tablist');

  let content = document.createElement('div');
  content.classList.add('tab-content');
  // TODO: do we need to randomize ids?
  content.setAttribute('id', el.getAttribute('id') + 'Content');


  debugger;
  let header = el.querySelector(".header").content.children;
  let footer = el.querySelector(".footer").content.children;
  if (header) content.appendChild(header);
  tabset.content.forEach(x => content.appendChild(x));
  if (footer) content.appendChild(footer);

  // TODO: throw if not all .custom-tab or .custom-tab-menu
  const tabs = el.children;
  let selected = el.getAttribute("selected");
  // TODO: I suppose this needs to be recursive (in theory)
  if (!selected) {
    selected = findFirstTab(tabs).getAttribute("data-value");
  }
  const tabset = buildTabset(tabs, selected);

  tabset.navList.forEach(x => nav.appendChild(x));

  

  el.appendChild(nav);
  el.appendChild(content);

  el.querySelectorAll("template").forEach(x => x.remove());
}

// tabs is HTMLCollection, which doesn't have a .map()
function buildTabset(tabs, selected) {
  let navList = [], content = [];
  for (var i = 0; i < tabs.length; i++) {
    let item = buildTabItem(tabs[i], selected);
    navList.push(item.liTag);
    content.push(item.divTag);
  }
  return {navList, content}
}

function buildTabItem(tab, selected) {
  const isTab = tab.classList.contains("custom-tab");
  if (isTab) {
    const node = tab.content.cloneNode(true);
    let liTag = node.querySelector(':scope > li');
    liTag.classList.add("nav-item");
    // TODO: add a child if there is none?
    let aTag = liTag.children[0];
    aTag.classList.add("nav-link");
    let divTag = node.querySelector(':scope > div');
    // If there's no divTag, then the liTag is likely an external hyperlink, search form, etc.
    if (!divTag) {
      return {liTag, divTag}
    }

    aTag.setAttribute("data-bs-toggle", "tab");
    aTag.setAttribute("role", "tab");
    divTag.classList.add("tab-pane");
    divTag.setAttribute("role", "tabpanel");

    if (selected === tab.getAttribute("data-value")) {
      // Calling tab.show() would be better, but probably has to be inserted into DOM to work?
      // const tabInstance = new Tab(liTag);
      // tabInstance.show();
      aTag.classList.add("active");
      divTag.classList.add("active");
    }

    return {liTag, divTag};
  }

  const isMenu = tab.classList.contains("custom-tab-menu");
  if (isMenu) {
    const menuTabs = tab.querySelector(":scope > template");
    const tabset = buildTabset(menuTabs, selected);
    return buildDropdown(tab, tabset);
  }

  throw new Error("Nav containers must contain a collection of <template>s with a custom-tab and/or custom-tab-menu class");
}


function buildDropdown(menu, tabset) {

  const dropdown = document.createElement("li");
  dropdown.classList.add("dropdown");
  dropdown.classList.add("nav-item");

  const dropdownToggle = document.createElement("a");
  dropdownToggle.setAttribute("href", "#");
  dropdownToggle.classList.add("dropdown-toggle");
  dropdownToggle.classList.add("nav-link");
  dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
  dropdownToggle.setAttribute("data-value", menu.getAttribute("data-value"));
  
  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu");

  const dropdownItems = tabset.navList.map(x => {
    const link = x.querySelector('.nav-link');
    link.classList.remove('nav-link').add('dropdown-item');
  });

  dropdownMenu.appendChild(dropdownItems);

  dropdown.appendChild(dropdownToggle);
  dropdown.appendChild(dropdownMenu);

  return {liTag: dropdown, divTag: tabset.content};
}


function findFirstTab(tabs) {
  if (tabs[0].classList.contains("custom-tab")) {
    return tabs[0];
  }
  findFirstTab(tabs[0]);
}