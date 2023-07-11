/*! bslib 0.5.0.9000 | (c) 2012-2023 RStudio, PBC. | License: MIT + file LICENSE */
"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a3, b2) => {
    for (var prop in b2 || (b2 = {}))
      if (__hasOwnProp.call(b2, prop))
        __defNormalProp(a3, prop, b2[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b2)) {
        if (__propIsEnum.call(b2, prop))
          __defNormalProp(a3, prop, b2[prop]);
      }
    return a3;
  };
  var __spreadProps = (a3, b2) => __defProps(a3, __getOwnPropDescs(b2));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
      if (decorator = decorators[i4])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e6) {
          reject(e6);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e6) {
          reject(e6);
        }
      };
      var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t3, e6, n7) {
      if (this._$cssResult$ = true, n7 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = e6;
    }
    get styleSheet() {
      let t3 = this.o;
      const s5 = this.t;
      if (e && void 0 === t3) {
        const e6 = void 0 !== s5 && 1 === s5.length;
        e6 && (t3 = n.get(s5)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && n.set(s5, t3));
      }
      return t3;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t3) => new o("string" == typeof t3 ? t3 : t3 + "", void 0, s);
  var S = (s5, n7) => {
    e ? s5.adoptedStyleSheets = n7.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n7.forEach((e6) => {
      const n8 = document.createElement("style"), o6 = t.litNonce;
      void 0 !== o6 && n8.setAttribute("nonce", o6), n8.textContent = e6.cssText, s5.appendChild(n8);
    });
  };
  var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e6 = "";
    for (const s5 of t4.cssRules)
      e6 += s5.cssText;
    return r(e6);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t3, i4) {
    switch (i4) {
      case Boolean:
        t3 = t3 ? h : null;
        break;
      case Object:
      case Array:
        t3 = null == t3 ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, i4) {
    let s5 = t3;
    switch (i4) {
      case Boolean:
        s5 = null !== t3;
        break;
      case Number:
        s5 = null === t3 ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t3);
        } catch (t4) {
          s5 = null;
        }
    }
    return s5;
  } };
  var a = (t3, i4) => i4 !== t3 && (i4 == i4 || t3 == t3);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = "finalized";
  var u = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t3) {
      var i4;
      this.finalize(), (null !== (i4 = this.h) && void 0 !== i4 ? i4 : this.h = []).push(t3);
    }
    static get observedAttributes() {
      this.finalize();
      const t3 = [];
      return this.elementProperties.forEach((i4, s5) => {
        const e6 = this._$Ep(s5, i4);
        void 0 !== e6 && (this._$Ev.set(e6, s5), t3.push(e6));
      }), t3;
    }
    static createProperty(t3, i4 = l) {
      if (i4.state && (i4.attribute = false), this.finalize(), this.elementProperties.set(t3, i4), !i4.noAccessor && !this.prototype.hasOwnProperty(t3)) {
        const s5 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e6 = this.getPropertyDescriptor(t3, s5, i4);
        void 0 !== e6 && Object.defineProperty(this.prototype, t3, e6);
      }
    }
    static getPropertyDescriptor(t3, i4, s5) {
      return { get() {
        return this[i4];
      }, set(e6) {
        const r4 = this[t3];
        this[i4] = e6, this.requestUpdate(t3, r4, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) || l;
    }
    static finalize() {
      if (this.hasOwnProperty(d))
        return false;
      this[d] = true;
      const t3 = Object.getPrototypeOf(this);
      if (t3.finalize(), void 0 !== t3.h && (this.h = [...t3.h]), this.elementProperties = new Map(t3.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t4 = this.properties, i4 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
        for (const s5 of i4)
          this.createProperty(s5, t4[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i4) {
      const s5 = [];
      if (Array.isArray(i4)) {
        const e6 = new Set(i4.flat(1 / 0).reverse());
        for (const i5 of e6)
          s5.unshift(c(i5));
      } else
        void 0 !== i4 && s5.push(c(i4));
      return s5;
    }
    static _$Ep(t3, i4) {
      const s5 = i4.attribute;
      return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
    }
    u() {
      var t3;
      this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach((t4) => t4(this));
    }
    addController(t3) {
      var i4, s5;
      (null !== (i4 = this._$ES) && void 0 !== i4 ? i4 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
    }
    removeController(t3) {
      var i4;
      null === (i4 = this._$ES) || void 0 === i4 || i4.splice(this._$ES.indexOf(t3) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t3, i4) => {
        this.hasOwnProperty(i4) && (this._$Ei.set(i4, this[i4]), delete this[i4]);
      });
    }
    createRenderRoot() {
      var t3;
      const s5 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t3;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostConnected) || void 0 === i4 ? void 0 : i4.call(t4);
      });
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      var t3;
      null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostDisconnected) || void 0 === i4 ? void 0 : i4.call(t4);
      });
    }
    attributeChangedCallback(t3, i4, s5) {
      this._$AK(t3, s5);
    }
    _$EO(t3, i4, s5 = l) {
      var e6;
      const r4 = this.constructor._$Ep(t3, s5);
      if (void 0 !== r4 && true === s5.reflect) {
        const h3 = (void 0 !== (null === (e6 = s5.converter) || void 0 === e6 ? void 0 : e6.toAttribute) ? s5.converter : n2).toAttribute(i4, s5.type);
        this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
      }
    }
    _$AK(t3, i4) {
      var s5;
      const e6 = this.constructor, r4 = e6._$Ev.get(t3);
      if (void 0 !== r4 && this._$El !== r4) {
        const t4 = e6.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s5 = t4.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t4.converter : n2;
        this._$El = r4, this[r4] = h3.fromAttribute(i4, t4.type), this._$El = null;
      }
    }
    requestUpdate(t3, i4, s5) {
      let e6 = true;
      void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a)(this[t3], i4) ? (this._$AL.has(t3) || this._$AL.set(t3, i4), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e6 = false), !this.isUpdatePending && e6 && (this._$E_ = this._$Ej());
    }
    _$Ej() {
      return __async(this, null, function* () {
        this.isUpdatePending = true;
        try {
          yield this._$E_;
        } catch (t4) {
          Promise.reject(t4);
        }
        const t3 = this.scheduleUpdate();
        return null != t3 && (yield t3), !this.isUpdatePending;
      });
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t3;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i5) => this[i5] = t4), this._$Ei = void 0);
      let i4 = false;
      const s5 = this._$AL;
      try {
        i4 = this.shouldUpdate(s5), i4 ? (this.willUpdate(s5), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
          var i5;
          return null === (i5 = t4.hostUpdate) || void 0 === i5 ? void 0 : i5.call(t4);
        }), this.update(s5)) : this._$Ek();
      } catch (t4) {
        throw i4 = false, this._$Ek(), t4;
      }
      i4 && this._$AE(s5);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      var i4;
      null === (i4 = this._$ES) || void 0 === i4 || i4.forEach((t4) => {
        var i5;
        return null === (i5 = t4.hostUpdated) || void 0 === i5 ? void 0 : i5.call(t4);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      void 0 !== this._$EC && (this._$EC.forEach((t4, i4) => this._$EO(i4, this[i4], t4)), this._$EC = void 0), this._$Ek();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  u[d] = true, u.elementProperties = /* @__PURE__ */ new Map(), u.elementStyles = [], u.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: u }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.2");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var o3 = "$lit$";
  var n3 = `lit$${(Math.random() + "").slice(9)}$`;
  var l2 = "?" + n3;
  var h2 = `<${l2}>`;
  var r3 = document;
  var u2 = () => r3.createComment("");
  var d2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
  var c2 = Array.isArray;
  var v = (t3) => c2(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
  var a2 = "[ 	\n\f\r]";
  var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p = RegExp(`>|${a2}(?:([^\\s"'>=/]+)(${a2}*=${a2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var g = /'/g;
  var $2 = /"/g;
  var y = /^(?:script|style|textarea|title)$/i;
  var w = (t3) => (i4, ...s5) => ({ _$litType$: t3, strings: i4, values: s5 });
  var x = w(1);
  var b = w(2);
  var T = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var E = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129, null, false);
  function P(t3, i4) {
    if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== e3 ? e3.createHTML(i4) : i4;
  }
  var V = (t3, i4) => {
    const s5 = t3.length - 1, e6 = [];
    let l5, r4 = 2 === i4 ? "<svg>" : "", u3 = f;
    for (let i5 = 0; i5 < s5; i5++) {
      const s6 = t3[i5];
      let d3, c3, v2 = -1, a3 = 0;
      for (; a3 < s6.length && (u3.lastIndex = a3, c3 = u3.exec(s6), null !== c3); )
        a3 = u3.lastIndex, u3 === f ? "!--" === c3[1] ? u3 = _ : void 0 !== c3[1] ? u3 = m : void 0 !== c3[2] ? (y.test(c3[2]) && (l5 = RegExp("</" + c3[2], "g")), u3 = p) : void 0 !== c3[3] && (u3 = p) : u3 === p ? ">" === c3[0] ? (u3 = null != l5 ? l5 : f, v2 = -1) : void 0 === c3[1] ? v2 = -2 : (v2 = u3.lastIndex - c3[2].length, d3 = c3[1], u3 = void 0 === c3[3] ? p : '"' === c3[3] ? $2 : g) : u3 === $2 || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, l5 = void 0);
      const w2 = u3 === p && t3[i5 + 1].startsWith("/>") ? " " : "";
      r4 += u3 === f ? s6 + h2 : v2 >= 0 ? (e6.push(d3), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (-2 === v2 ? (e6.push(void 0), i5) : w2);
    }
    return [P(t3, r4 + (t3[s5] || "<?>") + (2 === i4 ? "</svg>" : "")), e6];
  };
  var N = class {
    constructor({ strings: t3, _$litType$: i4 }, e6) {
      let h3;
      this.parts = [];
      let r4 = 0, d3 = 0;
      const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = V(t3, i4);
      if (this.el = N.createElement(a3, e6), C.currentNode = this.el.content, 2 === i4) {
        const t4 = this.el.content, i5 = t4.firstChild;
        i5.remove(), t4.append(...i5.childNodes);
      }
      for (; null !== (h3 = C.nextNode()) && v2.length < c3; ) {
        if (1 === h3.nodeType) {
          if (h3.hasAttributes()) {
            const t4 = [];
            for (const i5 of h3.getAttributeNames())
              if (i5.endsWith(o3) || i5.startsWith(n3)) {
                const s5 = f2[d3++];
                if (t4.push(i5), void 0 !== s5) {
                  const t5 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i6 = /([.?@])?(.*)/.exec(s5);
                  v2.push({ type: 1, index: r4, name: i6[2], strings: t5, ctor: "." === i6[1] ? H : "?" === i6[1] ? L : "@" === i6[1] ? z : k });
                } else
                  v2.push({ type: 6, index: r4 });
              }
            for (const i5 of t4)
              h3.removeAttribute(i5);
          }
          if (y.test(h3.tagName)) {
            const t4 = h3.textContent.split(n3), i5 = t4.length - 1;
            if (i5 > 0) {
              h3.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i5; s5++)
                h3.append(t4[s5], u2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
              h3.append(t4[i5], u2());
            }
          }
        } else if (8 === h3.nodeType)
          if (h3.data === l2)
            v2.push({ type: 2, index: r4 });
          else {
            let t4 = -1;
            for (; -1 !== (t4 = h3.data.indexOf(n3, t4 + 1)); )
              v2.push({ type: 7, index: r4 }), t4 += n3.length - 1;
          }
        r4++;
      }
    }
    static createElement(t3, i4) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t3, s5;
    }
  };
  function S2(t3, i4, s5 = t3, e6) {
    var o6, n7, l5, h3;
    if (i4 === T)
      return i4;
    let r4 = void 0 !== e6 ? null === (o6 = s5._$Co) || void 0 === o6 ? void 0 : o6[e6] : s5._$Cl;
    const u3 = d2(i4) ? void 0 : i4._$litDirective$;
    return (null == r4 ? void 0 : r4.constructor) !== u3 && (null === (n7 = null == r4 ? void 0 : r4._$AO) || void 0 === n7 || n7.call(r4, false), void 0 === u3 ? r4 = void 0 : (r4 = new u3(t3), r4._$AT(t3, s5, e6)), void 0 !== e6 ? (null !== (l5 = (h3 = s5)._$Co) && void 0 !== l5 ? l5 : h3._$Co = [])[e6] = r4 : s5._$Cl = r4), void 0 !== r4 && (i4 = S2(t3, r4._$AS(t3, i4.values), r4, e6)), i4;
  }
  var M = class {
    constructor(t3, i4) {
      this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i4;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t3) {
      var i4;
      const { el: { content: s5 }, parts: e6 } = this._$AD, o6 = (null !== (i4 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i4 ? i4 : r3).importNode(s5, true);
      C.currentNode = o6;
      let n7 = C.nextNode(), l5 = 0, h3 = 0, u3 = e6[0];
      for (; void 0 !== u3; ) {
        if (l5 === u3.index) {
          let i5;
          2 === u3.type ? i5 = new R(n7, n7.nextSibling, this, t3) : 1 === u3.type ? i5 = new u3.ctor(n7, u3.name, u3.strings, this, t3) : 6 === u3.type && (i5 = new Z(n7, this, t3)), this._$AV.push(i5), u3 = e6[++h3];
        }
        l5 !== (null == u3 ? void 0 : u3.index) && (n7 = C.nextNode(), l5++);
      }
      return C.currentNode = r3, o6;
    }
    v(t3) {
      let i4 = 0;
      for (const s5 of this._$AV)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i4), i4 += s5.strings.length - 2) : s5._$AI(t3[i4])), i4++;
    }
  };
  var R = class {
    constructor(t3, i4, s5, e6) {
      var o6;
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i4, this._$AM = s5, this.options = e6, this._$Cp = null === (o6 = null == e6 ? void 0 : e6.isConnected) || void 0 === o6 || o6;
    }
    get _$AU() {
      var t3, i4;
      return null !== (i4 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i4 ? i4 : this._$Cp;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i4 = this._$AM;
      return void 0 !== i4 && 11 === (null == t3 ? void 0 : t3.nodeType) && (t3 = i4.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i4 = this) {
      t3 = S2(this, t3, i4), d2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : void 0 !== t3._$litType$ ? this.g(t3) : void 0 !== t3.nodeType ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
    }
    k(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    $(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
    }
    _(t3) {
      this._$AH !== A && d2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
    }
    g(t3) {
      var i4;
      const { values: s5, _$litType$: e6 } = t3, o6 = "number" == typeof e6 ? this._$AC(t3) : (void 0 === e6.el && (e6.el = N.createElement(P(e6.h, e6.h[0]), this.options)), e6);
      if ((null === (i4 = this._$AH) || void 0 === i4 ? void 0 : i4._$AD) === o6)
        this._$AH.v(s5);
      else {
        const t4 = new M(o6, this), i5 = t4.u(this.options);
        t4.v(s5), this.$(i5), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i4 = E.get(t3.strings);
      return void 0 === i4 && E.set(t3.strings, i4 = new N(t3)), i4;
    }
    T(t3) {
      c2(this._$AH) || (this._$AH = [], this._$AR());
      const i4 = this._$AH;
      let s5, e6 = 0;
      for (const o6 of t3)
        e6 === i4.length ? i4.push(s5 = new R(this.k(u2()), this.k(u2()), this, this.options)) : s5 = i4[e6], s5._$AI(o6), e6++;
      e6 < i4.length && (this._$AR(s5 && s5._$AB.nextSibling, e6), i4.length = e6);
    }
    _$AR(t3 = this._$AA.nextSibling, i4) {
      var s5;
      for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i4); t3 && t3 !== this._$AB; ) {
        const i5 = t3.nextSibling;
        t3.remove(), t3 = i5;
      }
    }
    setConnected(t3) {
      var i4;
      void 0 === this._$AM && (this._$Cp = t3, null === (i4 = this._$AP) || void 0 === i4 || i4.call(this, t3));
    }
  };
  var k = class {
    constructor(t3, i4, s5, e6, o6) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i4, this._$AM = e6, this.options = o6, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3, i4 = this, s5, e6) {
      const o6 = this.strings;
      let n7 = false;
      if (void 0 === o6)
        t3 = S2(this, t3, i4, 0), n7 = !d2(t3) || t3 !== this._$AH && t3 !== T, n7 && (this._$AH = t3);
      else {
        const e7 = t3;
        let l5, h3;
        for (t3 = o6[0], l5 = 0; l5 < o6.length - 1; l5++)
          h3 = S2(this, e7[s5 + l5], i4, l5), h3 === T && (h3 = this._$AH[l5]), n7 || (n7 = !d2(h3) || h3 !== this._$AH[l5]), h3 === A ? t3 = A : t3 !== A && (t3 += (null != h3 ? h3 : "") + o6[l5 + 1]), this._$AH[l5] = h3;
      }
      n7 && !e6 && this.j(t3);
    }
    j(t3) {
      t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
    }
  };
  var H = class extends k {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === A ? void 0 : t3;
    }
  };
  var I = s3 ? s3.emptyScript : "";
  var L = class extends k {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      t3 && t3 !== A ? this.element.setAttribute(this.name, I) : this.element.removeAttribute(this.name);
    }
  };
  var z = class extends k {
    constructor(t3, i4, s5, e6, o6) {
      super(t3, i4, s5, e6, o6), this.type = 5;
    }
    _$AI(t3, i4 = this) {
      var s5;
      if ((t3 = null !== (s5 = S2(this, t3, i4, 0)) && void 0 !== s5 ? s5 : A) === T)
        return;
      const e6 = this._$AH, o6 = t3 === A && e6 !== A || t3.capture !== e6.capture || t3.once !== e6.once || t3.passive !== e6.passive, n7 = t3 !== A && (e6 === A || o6);
      o6 && this.element.removeEventListener(this.name, this, e6), n7 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      var i4, s5;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i4 = this.options) || void 0 === i4 ? void 0 : i4.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var Z = class {
    constructor(t3, i4, s5) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      S2(this, t3);
    }
  };
  var B = i2.litHtmlPolyfillSupport;
  null == B || B(N, R), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.7.5");
  var D = (t3, i4, s5) => {
    var e6, o6;
    const n7 = null !== (e6 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e6 ? e6 : i4;
    let l5 = n7._$litPart$;
    if (void 0 === l5) {
      const t4 = null !== (o6 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o6 ? o6 : null;
      n7._$litPart$ = l5 = new R(i4.insertBefore(u2(), t4), t4, void 0, null != s5 ? s5 : {});
    }
    return l5._$AI(t3), l5;
  };

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends u {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t3, e6;
      const i4 = super.createRenderRoot();
      return null !== (t3 = (e6 = this.renderOptions).renderBefore) && void 0 !== t3 || (e6.renderBefore = i4.firstChild), i4;
    }
    update(t3) {
      const i4 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(i4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t3;
      super.connectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(true);
    }
    disconnectedCallback() {
      var t3;
      super.disconnectedCallback(), null === (t3 = this._$Do) || void 0 === t3 || t3.setConnected(false);
    }
    render() {
      return T;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  null == n4 || n4({ LitElement: s4 });
  (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.3.2");

  // node_modules/@lit/reactive-element/decorators/property.js
  var i3 = (i4, e6) => "method" === e6.kind && e6.descriptor && !("value" in e6.descriptor) ? __spreadProps(__spreadValues({}, e6), { finisher(n7) {
    n7.createProperty(e6.key, i4);
  } }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e6.key, initializer() {
    "function" == typeof e6.initializer && (this[e6.key] = e6.initializer.call(this));
  }, finisher(n7) {
    n7.createProperty(e6.key, i4);
  } };
  var e4 = (i4, e6, n7) => {
    e6.constructor.createProperty(n7, i4);
  };
  function n5(n7) {
    return (t3, o6) => void 0 !== o6 ? e4(n7, t3, o6) : i3(n7, t3);
  }

  // node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n6;
  var e5 = null != (null === (n6 = window.HTMLSlotElement) || void 0 === n6 ? void 0 : n6.prototype.assignedElements) ? (o6, n7) => o6.assignedElements(n7) : (o6, n7) => o6.assignedNodes(n7).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);

  // srcts/src/components/webcomponents/_lightElement.ts
  var LightElement = class extends s4 {
    constructor() {
      super(...arguments);
      this.elementChildren = [];
    }
    connectedCallback() {
      this.elementChildren = Array.from(this.childNodes);
      this.maybeCarryFill();
      super.connectedCallback();
    }
    get slotElements() {
      return this.elementChildren;
    }
    createRenderRoot() {
      return this;
    }
    maybeCarryFill() {
      if (this.isFillCarrier) {
        this.classList.add("html-fill-container");
        this.classList.add("html-fill-item");
      } else {
        this.classList.remove("html-fill-container");
        this.classList.remove("html-fill-item");
      }
    }
    get isFillCarrier() {
      if (!this.parentElement) {
        return false;
      }
      const inContainer = this.parentElement.classList.contains(
        "html-fill-container"
      );
      const hasFillItem = Array.from(this.children).some(
        (x2) => x2.classList.contains("html-fill-item")
      );
      return inContainer && hasFillItem;
    }
  };
  LightElement.isShinyInput = false;

  // srcts/src/components/tooltip.ts
  var Tooltip = window.bootstrap ? window.bootstrap.Tooltip : class {
  };
  var BslibTooltip = class extends LightElement {
    constructor() {
      super();
      this.placement = "auto";
      this.html = false;
      this.sanitize = false;
      // Visibility state management
      this.visible = false;
      // This is a placeholder function that will be overwritten by the Shiny input
      // binding. When the input value changes, it invokes this function to notify
      // Shiny that it has changed.
      // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
      this.onChangeCallback = (x2) => {
      };
      this._onShown = this._onShown.bind(this);
      this._onHidden = this._onHidden.bind(this);
      this.style.display = "contents";
    }
    get options() {
      const opts = {
        title: this.title,
        placement: this.placement,
        html: this.html,
        sanitize: this.sanitize
      };
      for (const attr of this.attributes) {
        if (attr.name.startsWith("data-bs-")) {
          const key = attr.name.replace("data-bs-", "");
          opts[key] = attr.value;
        }
      }
      return opts;
    }
    get title() {
      return this.children[0].innerHTML;
    }
    connectedCallback() {
      super.connectedCallback();
      this.reference.setAttribute("data-bs-toggle", "tooltip");
      this._tooltip = new Tooltip(this.reference, this.options);
      this.reference.addEventListener("shown.bs.tooltip", this._onShown);
      this.reference.addEventListener("hidden.bs.tooltip", this._onHidden);
    }
    disconnectedCallback() {
      this.reference.removeEventListener("shown.bs.tooltip", this._onShown);
      this.reference.removeEventListener("hidden.bs.tooltip", this._onHidden);
      super.disconnectedCallback();
    }
    render() {
      return A;
    }
    // Find an Element to use as the reference for the tooltip
    //
    // TODO: In the future, it'd be nice if the reference was a virtual element (defining)
    // a rectangle around `this.childNodes` instead of just the last HTMLElement.
    // As of today, bootstrap.Tooltip doesn't seem to support floating-ui's virtual elements,
    // (but that should change in Bootstrap v6 https://github.com/twbs/bootstrap/pull/36683)
    get reference() {
      if (this.children.length > 1) {
        return this.children[this.children.length - 1];
      }
      if (this.childNodes.length > 1) {
        const ref = document.createElement("span");
        ref.append(this.childNodes[this.childNodes.length - 1]);
        this.appendChild(ref);
        return ref;
      }
      return this;
    }
    getValue() {
      return this.visible;
    }
    _onShown() {
      this.visible = true;
      this.onChangeCallback(true);
    }
    _onHidden() {
      this.visible = false;
      this.onChangeCallback(true);
    }
    receiveMessage(el, data) {
      const method = data.method;
      if (method === "toggle") {
        this._tooltip[data.value]();
      } else if (method === "update") {
        if (data.title) {
          this._tooltip.setContent({ ".tooltip-inner": data.title.html });
        }
      } else {
        throw new Error(`Unknown method ${method}`);
      }
    }
  };
  BslibTooltip.tagName = "bslib-tooltip";
  // Shiny-specific stuff
  BslibTooltip.isShinyInput = true;
  __decorateClass([
    n5({ type: String })
  ], BslibTooltip.prototype, "placement", 2);
  __decorateClass([
    n5({ type: Boolean })
  ], BslibTooltip.prototype, "html", 2);
  __decorateClass([
    n5({ type: Boolean })
  ], BslibTooltip.prototype, "sanitize", 2);

  // srcts/src/components/webcomponents/_makeInputBinding.ts
  function makeInputBinding(tagName, { type = null } = {}) {
    if (!window.Shiny) {
      return;
    }
    class NewCustomBinding extends Shiny["InputBinding"] {
      constructor() {
        super();
      }
      find(scope) {
        return $(scope).find(tagName);
      }
      getValue(el) {
        if ("getValue" in el) {
          return el.getValue();
        } else {
          return el.value;
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getType(el) {
        return type;
      }
      subscribe(el, callback) {
        el.onChangeCallback = callback;
      }
      unsubscribe(el) {
        el.onChangeCallback = (x2) => {
        };
      }
      receiveMessage(el, data) {
        el.receiveMessage(el, data);
      }
    }
    Shiny.inputBindings.register(new NewCustomBinding(), `${tagName}-Binding`);
  }

  // srcts/src/components/webComponents.ts
  [BslibTooltip].forEach((cls) => {
    customElements.define(cls.tagName, cls);
    if (cls.isShinyInput)
      makeInputBinding(cls.tagName);
  });
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=webComponents.js.map
