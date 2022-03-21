/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { Component, cloneElement, Fragment, Children } from 'react';

// ----------------------------------------------------------------------------
// navs_tab()/navs_pill() logic
// ----------------------------------------------------------------------------
class Navs extends Component {

  constructor(props) {
    super(props);

    this.firstNavValue = this.firstNavValue.bind(this);
    this.addChildProps = this.addChildProps.bind(this);
    this.getContent = this.getContent.bind(this);

    const tabsetId = this.newId();
    const selected = props.selected ? props.selected : this.firstNavValue(props.children);
    // false means that active classes shouldn't be added, no matter what (nav_insert() uses this)
    if (props.selected === false) selected = null;
    const children = this.addChildProps(props.children, {tabsetId, selected});
    const content = this.getContent(children);

    this.state = {tabsetId, selected, children, content};
  }

  render() {
    const props = this.props;
    const ulClass = `nav nav-${props.type}`;
    const {ulTag, divTag} = _buildTabset(props, this.state, ulClass)
    return <Fragment>
        {ulTag}
        {divTag}
    </Fragment>
  }

  firstNavValue(navs) {
    let x = Array.isArray(navs) ? navs[0] : navs;
    if (x.type.name === 'NavMenu') {
      x = x.props.children[0]
    }
    if (x.type.name !== 'Nav') {
      console.warn("Couldn't find the first nav")
    }
    return x.props.value
  }

  getContent(navs) {
    const result = [];
    Children.forEach(navs, x => {
      if (x.type.name === 'NavMenu') {
        result.push(this.getContent(x.props.children))
      }
      if (x.type.name === 'Nav') {
        const className = `tab-pane ${x.props.selected === x.props.value ? 'active' : ''}`;
        result.push(
          <div id={x.props.id} role='tabpanel' className={className} key={x.props.id}>
            {x.props.children}
          </div>
        );
      }
    })
    return result;
  }

  addChildProps(children, props) {
    var self = this;
    return Children.map(children, (x, idx) => {
      if (typeof x === "string") {
        return props.menu ? _textFilterMenu(x) : _textFilter(x);
      }
      if (x.type.name === 'NavMenu') {
        props.menu = true; // Let <Nav>'s within this component know that they're in a menu
        props.tabsetId = self.newId();
        const children_ = self.addChildProps(x.props.children, props);
        return cloneElement(x, props, children_);
      }
      props.id = `tab-${props.tabsetId}-${idx + 1}`;
      return cloneElement(x, props);
    });
  }

  newId() {
    return Math.floor(1000 + Math.random() * 9000);
  }
}

// ----------------------------------------------------------------------------
// navs_tab_card()/navs_pill_card() logic
// ----------------------------------------------------------------------------
class NavsCard extends Navs {
  render() {
    const props = this.props;
    const ulClass = `nav nav-${props.type} card-header-${props.type}`;
    const {ulTag, divTag} = _buildTabset(props, this.state, ulClass);

    const below = props.placement === "below";

    return <div className="card">
        { below ? null : <div className="card-header"> {ulTag} </div>}
        <div className="card-body"> {divTag} </div>
        { below ? <div className="card-footer"> {ulTag} </div> : null}
    </div>
  }
}

// ----------------------------------------------------------------------------
// navs_pill_list() logic
// ----------------------------------------------------------------------------
class NavsList extends Navs {
  render() {
    const props = this.props;
    const ulClass = `nav nav-pills nav-stacked`;
    const {ulTag, divTag} = _buildTabset(props, this.state, ulClass);
    const widthNav = props.widthNav || 4;
    const widthContent = props.widthContent || 8;
    return <div className="row">
      <div className={`col-sm-${widthNav} ${props.well ? 'well' : ''}`}>
        {ulTag}
      </div>
      <div className={`col-sm-${widthContent}`}>
        {divTag}
      </div>
    </div>
  }
}


// ----------------------------------------------------------------------------
// navs_bar()/page_navbar() logic
// ----------------------------------------------------------------------------
class NavsBar extends Navs {
  render() {
    const props = this.props;

    const collapseId = `#navbar-collapse-${this.newId()}`;
    const collapseBtn =
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-bs-toggle="collapse" data-target={collapseId} data-bs-target={collapseId}>
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>

    const navbarHeader =
      <div className="navbar-header">
        { props.collapse ? collapseBtn : null }
        <span className="navbar-brand">{props.title}</span>
      </div>

    const {ulTag, divTag} = _buildTabset(props, this.state, 'nav navbar-nav');

    const containerDiv =
      <div className={`container${props.fluid ? '-fluid' : ''}`}>
        {navbarHeader}
        {collapseId ? <div className="collapse navbar-collapse" id={collapseId}>{ulTag}</div> : ulTag}
      </div>;

    if (props.inverse === "auto") {
      if (props.bg && _isLightColor(props.bg)) {
        props.inverse = false;
      } else {
        props.inverse = true;
      }
    }

    const navbarClass = `navbar navbar-default ${props.inverse ? 'navbar-inverse' : ''} ${props.position ? ('navbar-' + props.position) : ''}`;

    // TODO: re-implement https://github.com/rstudio/bslib/blob/d77f5ce61003307e7a6dc3c211e7ac6ee6896582/R/navs-legacy.R#L225
    return <Fragment>
      <nav className={navbarClass} role="navigation" ref={(el) => el && props.bg && el.style.setProperty("background-color", props.bg, "important")}>
        {containerDiv}
      </nav>
      {divTag}
    </Fragment>
  }
}


//-----------------------------------------------------------------------------
// Rendering logic for different nav items
//-----------------------------------------------------------------------------

function Nav(props) {
  let aClass = props.menu ? 'dropdown-item' : 'nav-link';
  if (props.selected === props.value) {
    aClass += ' active';
  }

  return (
    <li key={props.id} className={props.menu ? '' : 'nav-item'}>
      <a href={'#' + props.id} className={aClass} data-toggle='tab' data-value={props.value} role='tab'>
       {props.title}
      </a>
    </li>
  )
}

function NavSpacer(props) {
  return <div className="bslib-nav-spacer"></div>
}

function NavItem(props) {
  return <li className="form-inline" key={props.id}>{props.children}</li>
}

function NavMenu(props) {
  const vals = props.children.map(function(x) { return x.props.value });
  const active = vals.indexOf(props.selected) > -1;
  const liClass = `dropdown nav-item${active ? ' active' : ''}`
  const ulClass = `dropdown-menu${props.align === "right" ? ' dropdown-menu-right' : ''}`;
  return (
    <li className={liClass} key={props.tabsetId}>
      <a className="dropdown-toggle nav-link" data-value={props.value} data-toggle="dropdown" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
        {props.title}
      </a>
      <ul className={ulClass} data-tabsetid={props.tabsetId}>
        {props.children}
      </ul>
    </li>
  )
}


//-----------------------------------------------------------------------------
// Public API
//-----------------------------------------------------------------------------

export { Navs, NavsCard, NavsBar, NavsList, Nav, NavSpacer, NavItem, NavMenu }


//-----------------------------------------------------------------------------
// Utility functions
//-----------------------------------------------------------------------------

function _buildTabset(props, state, ulClass) {
  ulClass += props.id ? ' shiny-tab-input' : ''
  return {
    ulTag: <ul id={props.id} className={ulClass} role='tablist' data-tabsetid={state.tabsetId}>
      {state.children}
    </ul>,
    divTag: <div className='tab-content' data-tabsetid={state.tabsetId}>
      {props.header}
      {state.content}
      {props.footer}
    </div>
  }
}

function _textFilterMenu(x) {
  if (/^-+$/.test(x)) {
    return <div className="dropdown-divider"/>
  } else {
    return <div className="dropdown-header">{x}</div>
  }
}

function _textFilter(x) {
  return <li className="navbar-brand">{x}</li>
}


// If a bg color is specified for the navbar and inverse="auto", use
// this to determine whether to use inverse styling.
function _isLightColor(color) {
  const pcolor = _parseColor(color)
  const L = 0.2126 * _getColorWeight(pcolor.red) +
    0.7152 * _getColorWeight(pcolor.blue) +
    0.0722 * _getColorWeight(pcolor.green);

  // The recommendation I found suggested 0.179 for the threshold,
  // but that seems too low for my liking.
  return L > 0.2 ? true : false;
}

// https://www.w3.org/TR/WCAG20/#relativeluminancedef
function _getColorWeight(x) {
  const cc = x / 255;
  return cc > 0.03928 ? Math.pow((cc + 0.055) / 1.055, 2.4) : cc / 12.92;
}

// Taken from rstudio/bslib/inst/themer/themer.js
function _parseColor(color) {
  // Drop whitespace:
  color = color
    .replace(/\s*,\s*/g, ",") // around commas
    .replace(/\(\s+/g, "(")   // after open-parens
    .replace(/\s+\)/, ")")    // before close-parens
    .replace(/^\s+/, "")      // at the start
    .replace(/\s+$/, "");     // at the end

  var keywords = {
    "aliceblue": "#F0F8FF", "antiquewhite": "#FAEBD7", "aqua": "#00FFFF", "aquamarine": "#7FFFD4", "azure": "#F0FFFF", "beige": "#F5F5DC", "bisque": "#FFE4C4", "black": "#000000", "blanchedalmond": "#FFEBCD", "blue": "#0000FF", "blueviolet": "#8A2BE2", "brown": "#A52A2A", "burlywood": "#DEB887", "cadetblue": "#5F9EA0", "chartreuse": "#7FFF00", "chocolate": "#D2691E", "coral": "#FF7F50", "cornflowerblue": "#6495ED", "cornsilk": "#FFF8DC", "crimson": "#DC143C", "cyan": "#00FFFF", "darkblue": "#00008B", "darkcyan": "#008B8B", "darkgoldenrod": "#B8860B", "darkgray": "#A9A9A9", "darkgreen": "#006400", "darkgrey": "#A9A9A9", "darkkhaki": "#BDB76B", "darkmagenta": "#8B008B", "darkolivegreen": "#556B2F", "darkorange": "#FF8C00", "darkorchid": "#9932CC", "darkred": "#8B0000", "darksalmon": "#E9967A", "darkseagreen": "#8FBC8F", "darkslateblue": "#483D8B", "darkslategray": "#2F4F4F", "darkslategrey": "#2F4F4F", "darkturquoise": "#00CED1", "darkviolet": "#9400D3", "deeppink": "#FF1493", "deepskyblue": "#00BFFF", "dimgray": "#696969", "dimgrey": "#696969", "dodgerblue": "#1E90FF", "firebrick": "#B22222", "floralwhite": "#FFFAF0", "forestgreen": "#228B22", "fuchsia": "#FF00FF", "gainsboro": "#DCDCDC", "ghostwhite": "#F8F8FF", "gold": "#FFD700", "goldenrod": "#DAA520", "gray": "#808080", "green": "#008000", "greenyellow": "#ADFF2F", "grey": "#808080", "honeydew": "#F0FFF0", "hotpink": "#FF69B4", "indianred": "#CD5C5C", "indigo": "#4B0082", "ivory": "#FFFFF0", "khaki": "#F0E68C", "lavender": "#E6E6FA", "lavenderblush": "#FFF0F5", "lawngreen": "#7CFC00", "lemonchiffon": "#FFFACD", "lightblue": "#ADD8E6", "lightcoral": "#F08080", "lightcyan": "#E0FFFF", "lightgoldenrodyellow": "#FAFAD2", "lightgray": "#D3D3D3", "lightgreen": "#90EE90", "lightgrey": "#D3D3D3", "lightpink": "#FFB6C1", "lightsalmon": "#FFA07A", "lightseagreen": "#20B2AA", "lightskyblue": "#87CEFA", "lightslategray": "#778899", "lightslategrey": "#778899", "lightsteelblue": "#B0C4DE", "lightyellow": "#FFFFE0", "lime": "#00FF00", "limegreen": "#32CD32", "linen": "#FAF0E6", "magenta": "#FF00FF", "maroon": "#800000", "mediumaquamarine": "#66CDAA", "mediumblue": "#0000CD", "mediumorchid": "#BA55D3", "mediumpurple": "#9370DB", "mediumseagreen": "#3CB371", "mediumslateblue": "#7B68EE", "mediumspringgreen": "#00FA9A", "mediumturquoise": "#48D1CC", "mediumvioletred": "#C71585", "midnightblue": "#191970", "mintcream": "#F5FFFA", "mistyrose": "#FFE4E1", "moccasin": "#FFE4B5", "navajowhite": "#FFDEAD", "navy": "#000080", "oldlace": "#FDF5E6", "olive": "#808000", "olivedrab": "#6B8E23", "orange": "#FFA500", "orangered": "#FF4500", "orchid": "#DA70D6", "palegoldenrod": "#EEE8AA", "palegreen": "#98FB98", "paleturquoise": "#AFEEEE", "palevioletred": "#DB7093", "papayawhip": "#FFEFD5", "peachpuff": "#FFDAB9", "peru": "#CD853F", "pink": "#FFC0CB", "plum": "#DDA0DD", "powderblue": "#B0E0E6", "purple": "#800080", "rebeccapurple": "#663399", "red": "#FF0000", "rosybrown": "#BC8F8F", "royalblue": "#4169E1", "saddlebrown": "#8B4513", "salmon": "#FA8072", "sandybrown": "#F4A460", "seagreen": "#2E8B57", "seashell": "#FFF5EE", "sienna": "#A0522D", "silver": "#C0C0C0", "skyblue": "#87CEEB", "slateblue": "#6A5ACD", "slategray": "#708090", "slategrey": "#708090", "snow": "#FFFAFA", "springgreen": "#00FF7F", "steelblue": "#4682B4", "tan": "#D2B48C", "teal": "#008080", "thistle": "#D8BFD8", "tomato": "#FF6347", "turquoise": "#40E0D0", "violet": "#EE82EE", "wheat": "#F5DEB3", "white": "#FFFFFF", "whitesmoke": "#F5F5F5", "yellow": "#FFFF00", "yellowgreen": "#9ACD32"
  };
  if (keywords[color]) {
    color = keywords[color];
  }

  var m;
  m = /^#([A-Za-z0-9]{2})([A-Za-z0-9]{2})([A-Za-z0-9]{2})$/.exec(color);
  if (m) {
    return {
      red: parseInt(m[1], 16),
      green: parseInt(m[2], 16),
      blue: parseInt(m[3], 16)
    };
  }
  m = /^#([A-Za-z0-9]{2})([A-Za-z0-9]{2})([A-Za-z0-9]{2})([A-Za-z0-9]{2})$/.exec(color);
  if (m) {
    return {
      red: parseInt(m[1], 16),
      green: parseInt(m[2], 16),
      blue: parseInt(m[3], 16),
      alpha: parseInt(m[4], 16) / 255
    };
  }
  m = /^#([A-Za-z0-9])([A-Za-z0-9])([A-Za-z0-9])$/.exec(color);
  if (m) {
    return {
      red: parseInt(m[1], 16) * 0x11,
      green: parseInt(m[2], 16) * 0x11,
      blue: parseInt(m[3], 16) * 0x11
    };
  }
  m = /^#([A-Za-z0-9])([A-Za-z0-9])([A-Za-z0-9])([A-Za-z0-9])$/.exec(color);
  if (m) {
    return {
      red: parseInt(m[1], 16) * 0x11,
      green: parseInt(m[2], 16) * 0x11,
      blue: parseInt(m[3], 16) * 0x11,
      alpha: parseInt(m[4], 16) * 0x11 / 255
    };
  }
  m = /^rgba?\((\d+),(\d+),(\d+)\)$/.exec(color);
  if (m) {
    return {
      red: parseInt(m[1]),
      green: parseInt(m[2]),
      blue: parseInt(m[3])
    };
  }
  m = /^rgba?\((\d+),(\d+),(\d+),(\d*\.?\d*)\)$/.exec(color);
  if (m) {
    if (!isNaN(parseFloat(m[4]))) {
      return {
        red: parseInt(m[1]),
        green: parseInt(m[2]),
        blue: parseInt(m[3]),
        alpha: parseFloat(m[4])
      };
    } else {
      return {
        red: parseInt(m[1]),
        green: parseInt(m[2]),
        blue: parseInt(m[3])
      };
    }
  }

  return null;
}
