/** @jsx React.createElement */
/** @jsxFrag React.Fragment */
import { Component, cloneElement, Fragment, Children } from 'react';

class Navs extends Component {

  constructor(props) {
    super(props);

    this.firstNavValue = this.firstNavValue.bind(this);
    this.addChildProps = this.addChildProps.bind(this);
    this.getContent = this.getContent.bind(this);

    const tabsetId = this.newId();
    const selected = props.selected ? props.selected : this.firstNavValue(props.children);
    const children = this.addChildProps(props.children, tabsetId, selected);
    const content = this.getContent(children);

    this.state = {tabsetId, selected, children, content};
  }

  render() {
    const props = this.props;
    const ulClass = `nav nav-${props.type} ${props.id ? 'shiny-tab-input' : ''}`;
    return <Fragment>
        <ul id={props.id} className={ulClass} role='tablist' data-tabsetid={this.state.tabsetId}>
          {this.state.children}
        </ul>
        <div className='tab-content' data-tabsetid={this.state.tabsetId}>
          {props.header}
          {this.state.content}
          {props.footer}
        </div>
    </Fragment>
  }

  firstNavValue(navs) {
    let x = navs[0];
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

  addChildProps(children, tabsetId, selected) {
    var self = this;
    return Children.map(children, (x, idx) => {
      if (x.type.name === 'NavMenu') {
        const tabsetId = self.newId();
        const children_ = self.addChildProps(x.props.children, tabsetId, selected);
        return cloneElement(x, {tabsetId, selected}, children_);
      }
      const id = `tab-${tabsetId}-${idx + 1}`;
      return cloneElement(x, {id, selected});
    });
  }

  newId() {
    return Math.floor(1000 + Math.random() * 9000);
  }
}

class NavsCard extends Navs {
  render() {
    const props = this.props;
    const ulClass = `nav nav-${props.type} card-header-${props.type} ${props.id ? 'shiny-tab-input' : ''}`;

    const ulTag =
      <ul id={props.id} className={ulClass} role='tablist' data-tabsetid={this.state.tabsetId}>
        {this.state.children}
      </ul>

    const divTag =
      <div className='tab-content' data-tabsetid={this.state.tabsetId}>
        {props.header}
        {this.state.content}
        {props.footer}
      </div>

    const below = props.placement === "below";

    return <div className="card">
        { below ? null : <div className="card-header"> {ulTag} </div>}
        <div className="card-body"> {divTag} </div>
        { below ? <div className="card-footer"> {ulTag} </div> : null}
    </div>
  }
}

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

    const ulTag =
      <ul id={props.id} className={`nav navbar-nav ${props.id ? 'shiny-tab-input' : ''}`} role='tablist' data-tabsetid={this.state.tabsetId}>
      {this.state.children}
    </ul>

    const containerDiv =
      <div className={`container${props.fluid ? '-fluid' : ''}`}>
        {navbarHeader}
        {collapseId ? <div className="collapse navbar-collapse" id={collapseId}>{ulTag}</div> : ulTag}
      </div>;

    const navbarClass = `navbar navbar-default ${props.inverse ? 'navbar-inverse' : ''} ${props.position ? ('navbar-' + props.position) : '' }`;

    // TODO:
    // 1. re-implement https://github.com/rstudio/bslib/blob/d77f5ce61003307e7a6dc3c211e7ac6ee6896582/R/navs-legacy.R#L225
    // 2. auto color contrasting
    return <Fragment>
      <nav className={navbarClass} role="navigation" ref={(el) => el && props.bg && el.style.setProperty("background-color", props.bg, "important")}>
          {containerDiv}
        </nav>
        <div className='tab-content' data-tabsetid={this.state.tabsetId}>
          {props.header}
          {this.state.content}
          {props.footer}
        </div>
      </Fragment>
  }
}


function Nav(props) {
  return (
    <li key={props.id} className={props.selected === props.value ? 'active' : ''}>
      <a href={'#'+props.id} role='tab' data-toggle='tab' data-value={props.value}>
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
  const liClass = `dropdown${active ? ' active' : ''}`
  const ulClass = `dropdown-menu${props.align === "right" ? ' dropdown-menu-right' : ''}`;
  return (
    <li className={liClass} key={props.tabsetId}>
      <a className="dropdown-toggle" data-toggle="dropdown" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
        {props.title}
      </a>
      <ul className={ulClass} data-tabsetid={props.tabsetId}>
        {props.children}
      </ul>
    </li>
  )
}

export { Navs, NavsCard, NavsBar, Nav, NavSpacer, NavItem, NavMenu }
