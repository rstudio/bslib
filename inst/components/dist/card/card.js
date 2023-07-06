/*! bslib 0.5.0.9000 | (c) 2012-2023 RStudio, PBC. | License: MIT + file LICENSE */
"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e4) {
          reject(e4);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e4) {
          reject(e4);
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
    constructor(t3, e4, n5) {
      if (this._$cssResult$ = true, n5 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = e4;
    }
    get styleSheet() {
      let t3 = this.o;
      const s5 = this.t;
      if (e && void 0 === t3) {
        const e4 = void 0 !== s5 && 1 === s5.length;
        e4 && (t3 = n.get(s5)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && n.set(s5, t3));
      }
      return t3;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t3) => new o("string" == typeof t3 ? t3 : t3 + "", void 0, s);
  var S = (s5, n5) => {
    e ? s5.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((e4) => {
      const n6 = document.createElement("style"), o5 = t.litNonce;
      void 0 !== o5 && n6.setAttribute("nonce", o5), n6.textContent = e4.cssText, s5.appendChild(n6);
    });
  };
  var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e4 = "";
    for (const s5 of t4.cssRules)
      e4 += s5.cssText;
    return r(e4);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t3, i3) {
    switch (i3) {
      case Boolean:
        t3 = t3 ? h : null;
        break;
      case Object:
      case Array:
        t3 = null == t3 ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, i3) {
    let s5 = t3;
    switch (i3) {
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
  var a = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = "finalized";
  var u = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t3) {
      var i3;
      this.finalize(), (null !== (i3 = this.h) && void 0 !== i3 ? i3 : this.h = []).push(t3);
    }
    static get observedAttributes() {
      this.finalize();
      const t3 = [];
      return this.elementProperties.forEach((i3, s5) => {
        const e4 = this._$Ep(s5, i3);
        void 0 !== e4 && (this._$Ev.set(e4, s5), t3.push(e4));
      }), t3;
    }
    static createProperty(t3, i3 = l) {
      if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
        const s5 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i3);
        void 0 !== e4 && Object.defineProperty(this.prototype, t3, e4);
      }
    }
    static getPropertyDescriptor(t3, i3, s5) {
      return { get() {
        return this[i3];
      }, set(e4) {
        const r4 = this[t3];
        this[i3] = e4, this.requestUpdate(t3, r4, s5);
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
        const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
        for (const s5 of i3)
          this.createProperty(s5, t4[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i3) {
      const s5 = [];
      if (Array.isArray(i3)) {
        const e4 = new Set(i3.flat(1 / 0).reverse());
        for (const i4 of e4)
          s5.unshift(c(i4));
      } else
        void 0 !== i3 && s5.push(c(i3));
      return s5;
    }
    static _$Ep(t3, i3) {
      const s5 = i3.attribute;
      return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
    }
    u() {
      var t3;
      this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach((t4) => t4(this));
    }
    addController(t3) {
      var i3, s5;
      (null !== (i3 = this._$ES) && void 0 !== i3 ? i3 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
    }
    removeController(t3) {
      var i3;
      null === (i3 = this._$ES) || void 0 === i3 || i3.splice(this._$ES.indexOf(t3) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t3, i3) => {
        this.hasOwnProperty(i3) && (this._$Ei.set(i3, this[i3]), delete this[i3]);
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
        var i3;
        return null === (i3 = t4.hostConnected) || void 0 === i3 ? void 0 : i3.call(t4);
      });
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      var t3;
      null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i3;
        return null === (i3 = t4.hostDisconnected) || void 0 === i3 ? void 0 : i3.call(t4);
      });
    }
    attributeChangedCallback(t3, i3, s5) {
      this._$AK(t3, s5);
    }
    _$EO(t3, i3, s5 = l) {
      var e4;
      const r4 = this.constructor._$Ep(t3, s5);
      if (void 0 !== r4 && true === s5.reflect) {
        const h3 = (void 0 !== (null === (e4 = s5.converter) || void 0 === e4 ? void 0 : e4.toAttribute) ? s5.converter : n2).toAttribute(i3, s5.type);
        this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
      }
    }
    _$AK(t3, i3) {
      var s5;
      const e4 = this.constructor, r4 = e4._$Ev.get(t3);
      if (void 0 !== r4 && this._$El !== r4) {
        const t4 = e4.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s5 = t4.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t4.converter : n2;
        this._$El = r4, this[r4] = h3.fromAttribute(i3, t4.type), this._$El = null;
      }
    }
    requestUpdate(t3, i3, s5) {
      let e4 = true;
      void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$E_ = this._$Ej());
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
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i4) => this[i4] = t4), this._$Ei = void 0);
      let i3 = false;
      const s5 = this._$AL;
      try {
        i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
          var i4;
          return null === (i4 = t4.hostUpdate) || void 0 === i4 ? void 0 : i4.call(t4);
        }), this.update(s5)) : this._$Ek();
      } catch (t4) {
        throw i3 = false, this._$Ek(), t4;
      }
      i3 && this._$AE(s5);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      var i3;
      null === (i3 = this._$ES) || void 0 === i3 || i3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostUpdated) || void 0 === i4 ? void 0 : i4.call(t4);
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
      void 0 !== this._$EC && (this._$EC.forEach((t4, i3) => this._$EO(i3, this[i3], t4)), this._$EC = void 0), this._$Ek();
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
  var d2 = () => r3.createComment("");
  var u2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
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
  var w = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
  var x = w(1);
  var b = w(2);
  var T = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var E = /* @__PURE__ */ new WeakMap();
  var C = r3.createTreeWalker(r3, 129, null, false);
  var P = (t3, i3) => {
    const s5 = t3.length - 1, l4 = [];
    let r4, d3 = 2 === i3 ? "<svg>" : "", u3 = f;
    for (let i4 = 0; i4 < s5; i4++) {
      const s6 = t3[i4];
      let e4, c4, v2 = -1, a3 = 0;
      for (; a3 < s6.length && (u3.lastIndex = a3, c4 = u3.exec(s6), null !== c4); )
        a3 = u3.lastIndex, u3 === f ? "!--" === c4[1] ? u3 = _ : void 0 !== c4[1] ? u3 = m : void 0 !== c4[2] ? (y.test(c4[2]) && (r4 = RegExp("</" + c4[2], "g")), u3 = p) : void 0 !== c4[3] && (u3 = p) : u3 === p ? ">" === c4[0] ? (u3 = null != r4 ? r4 : f, v2 = -1) : void 0 === c4[1] ? v2 = -2 : (v2 = u3.lastIndex - c4[2].length, e4 = c4[1], u3 = void 0 === c4[3] ? p : '"' === c4[3] ? $2 : g) : u3 === $2 || u3 === g ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, r4 = void 0);
      const w2 = u3 === p && t3[i4 + 1].startsWith("/>") ? " " : "";
      d3 += u3 === f ? s6 + h2 : v2 >= 0 ? (l4.push(e4), s6.slice(0, v2) + o3 + s6.slice(v2) + n3 + w2) : s6 + n3 + (-2 === v2 ? (l4.push(void 0), i4) : w2);
    }
    const c3 = d3 + (t3[s5] || "<?>") + (2 === i3 ? "</svg>" : "");
    if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== e3 ? e3.createHTML(c3) : c3, l4];
  };
  var V = class {
    constructor({ strings: t3, _$litType$: i3 }, e4) {
      let h3;
      this.parts = [];
      let r4 = 0, u3 = 0;
      const c3 = t3.length - 1, v2 = this.parts, [a3, f2] = P(t3, i3);
      if (this.el = V.createElement(a3, e4), C.currentNode = this.el.content, 2 === i3) {
        const t4 = this.el.content, i4 = t4.firstChild;
        i4.remove(), t4.append(...i4.childNodes);
      }
      for (; null !== (h3 = C.nextNode()) && v2.length < c3; ) {
        if (1 === h3.nodeType) {
          if (h3.hasAttributes()) {
            const t4 = [];
            for (const i4 of h3.getAttributeNames())
              if (i4.endsWith(o3) || i4.startsWith(n3)) {
                const s5 = f2[u3++];
                if (t4.push(i4), void 0 !== s5) {
                  const t5 = h3.getAttribute(s5.toLowerCase() + o3).split(n3), i5 = /([.?@])?(.*)/.exec(s5);
                  v2.push({ type: 1, index: r4, name: i5[2], strings: t5, ctor: "." === i5[1] ? k : "?" === i5[1] ? I : "@" === i5[1] ? L : R });
                } else
                  v2.push({ type: 6, index: r4 });
              }
            for (const i4 of t4)
              h3.removeAttribute(i4);
          }
          if (y.test(h3.tagName)) {
            const t4 = h3.textContent.split(n3), i4 = t4.length - 1;
            if (i4 > 0) {
              h3.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i4; s5++)
                h3.append(t4[s5], d2()), C.nextNode(), v2.push({ type: 2, index: ++r4 });
              h3.append(t4[i4], d2());
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
    static createElement(t3, i3) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t3, s5;
    }
  };
  function N(t3, i3, s5 = t3, e4) {
    var o5, n5, l4, h3;
    if (i3 === T)
      return i3;
    let r4 = void 0 !== e4 ? null === (o5 = s5._$Co) || void 0 === o5 ? void 0 : o5[e4] : s5._$Cl;
    const d3 = u2(i3) ? void 0 : i3._$litDirective$;
    return (null == r4 ? void 0 : r4.constructor) !== d3 && (null === (n5 = null == r4 ? void 0 : r4._$AO) || void 0 === n5 || n5.call(r4, false), void 0 === d3 ? r4 = void 0 : (r4 = new d3(t3), r4._$AT(t3, s5, e4)), void 0 !== e4 ? (null !== (l4 = (h3 = s5)._$Co) && void 0 !== l4 ? l4 : h3._$Co = [])[e4] = r4 : s5._$Cl = r4), void 0 !== r4 && (i3 = N(t3, r4._$AS(t3, i3.values), r4, e4)), i3;
  }
  var S2 = class {
    constructor(t3, i3) {
      this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t3) {
      var i3;
      const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = (null !== (i3 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i3 ? i3 : r3).importNode(s5, true);
      C.currentNode = o5;
      let n5 = C.nextNode(), l4 = 0, h3 = 0, d3 = e4[0];
      for (; void 0 !== d3; ) {
        if (l4 === d3.index) {
          let i4;
          2 === d3.type ? i4 = new M(n5, n5.nextSibling, this, t3) : 1 === d3.type ? i4 = new d3.ctor(n5, d3.name, d3.strings, this, t3) : 6 === d3.type && (i4 = new z(n5, this, t3)), this._$AV.push(i4), d3 = e4[++h3];
        }
        l4 !== (null == d3 ? void 0 : d3.index) && (n5 = C.nextNode(), l4++);
      }
      return C.currentNode = r3, o5;
    }
    v(t3) {
      let i3 = 0;
      for (const s5 of this._$AV)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
    }
  };
  var M = class {
    constructor(t3, i3, s5, e4) {
      var o5;
      this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cp = null === (o5 = null == e4 ? void 0 : e4.isConnected) || void 0 === o5 || o5;
    }
    get _$AU() {
      var t3, i3;
      return null !== (i3 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i3 ? i3 : this._$Cp;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i3 = this._$AM;
      return void 0 !== i3 && 11 === (null == t3 ? void 0 : t3.nodeType) && (t3 = i3.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i3 = this) {
      t3 = N(this, t3, i3), u2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== T && this._(t3) : void 0 !== t3._$litType$ ? this.g(t3) : void 0 !== t3.nodeType ? this.$(t3) : v(t3) ? this.T(t3) : this._(t3);
    }
    k(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    $(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.k(t3));
    }
    _(t3) {
      this._$AH !== A && u2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.$(r3.createTextNode(t3)), this._$AH = t3;
    }
    g(t3) {
      var i3;
      const { values: s5, _$litType$: e4 } = t3, o5 = "number" == typeof e4 ? this._$AC(t3) : (void 0 === e4.el && (e4.el = V.createElement(e4.h, this.options)), e4);
      if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o5)
        this._$AH.v(s5);
      else {
        const t4 = new S2(o5, this), i4 = t4.u(this.options);
        t4.v(s5), this.$(i4), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i3 = E.get(t3.strings);
      return void 0 === i3 && E.set(t3.strings, i3 = new V(t3)), i3;
    }
    T(t3) {
      c2(this._$AH) || (this._$AH = [], this._$AR());
      const i3 = this._$AH;
      let s5, e4 = 0;
      for (const o5 of t3)
        e4 === i3.length ? i3.push(s5 = new M(this.k(d2()), this.k(d2()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
      e4 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i3.length = e4);
    }
    _$AR(t3 = this._$AA.nextSibling, i3) {
      var s5;
      for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
        const i4 = t3.nextSibling;
        t3.remove(), t3 = i4;
      }
    }
    setConnected(t3) {
      var i3;
      void 0 === this._$AM && (this._$Cp = t3, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t3));
    }
  };
  var R = class {
    constructor(t3, i3, s5, e4, o5) {
      this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3, i3 = this, s5, e4) {
      const o5 = this.strings;
      let n5 = false;
      if (void 0 === o5)
        t3 = N(this, t3, i3, 0), n5 = !u2(t3) || t3 !== this._$AH && t3 !== T, n5 && (this._$AH = t3);
      else {
        const e5 = t3;
        let l4, h3;
        for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
          h3 = N(this, e5[s5 + l4], i3, l4), h3 === T && (h3 = this._$AH[l4]), n5 || (n5 = !u2(h3) || h3 !== this._$AH[l4]), h3 === A ? t3 = A : t3 !== A && (t3 += (null != h3 ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
      }
      n5 && !e4 && this.j(t3);
    }
    j(t3) {
      t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === A ? void 0 : t3;
    }
  };
  var H = s3 ? s3.emptyScript : "";
  var I = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      t3 && t3 !== A ? this.element.setAttribute(this.name, H) : this.element.removeAttribute(this.name);
    }
  };
  var L = class extends R {
    constructor(t3, i3, s5, e4, o5) {
      super(t3, i3, s5, e4, o5), this.type = 5;
    }
    _$AI(t3, i3 = this) {
      var s5;
      if ((t3 = null !== (s5 = N(this, t3, i3, 0)) && void 0 !== s5 ? s5 : A) === T)
        return;
      const e4 = this._$AH, o5 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== A && (e4 === A || o5);
      o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      var i3, s5;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var z = class {
    constructor(t3, i3, s5) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      N(this, t3);
    }
  };
  var j = i2.litHtmlPolyfillSupport;
  null == j || j(V, M), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.7.4");
  var B = (t3, i3, s5) => {
    var e4, o5;
    const n5 = null !== (e4 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e4 ? e4 : i3;
    let l4 = n5._$litPart$;
    if (void 0 === l4) {
      const t4 = null !== (o5 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o5 ? o5 : null;
      n5._$litPart$ = l4 = new M(i3.insertBefore(d2(), t4), t4, void 0, null != s5 ? s5 : {});
    }
    return l4._$AI(t3), l4;
  };

  // node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends u {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t3, e4;
      const i3 = super.createRenderRoot();
      return null !== (t3 = (e4 = this.renderOptions).renderBefore) && void 0 !== t3 || (e4.renderBefore = i3.firstChild), i3;
    }
    update(t3) {
      const i3 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = B(i3, this.renderRoot, this.renderOptions);
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

  // srcts/src/components/_utils.ts
  var InputBinding = window.Shiny ? Shiny.InputBinding : class {
  };
  function getAllFocusableChildren(el) {
    const base = [
      "a[href]",
      "area[href]",
      "button",
      "details summary",
      "input",
      "iframe",
      "select",
      "textarea",
      '[contentEditable=""]',
      '[contentEditable="true"]',
      '[contentEditable="TRUE"]',
      "[tabindex]"
    ];
    const modifiers = [':not([tabindex="-1"])', ":not([disabled])"];
    const selectors = base.map((b2) => b2 + modifiers.join(""));
    const focusable = el.querySelectorAll(selectors.join(", "));
    return Array.from(focusable);
  }
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

  // srcts/src/components/_shinyResizeObserver.ts
  var ShinyResizeObserver = class {
    /**
     * Watch containers for size changes and ensure that Shiny outputs and
     * htmlwidgets within resize appropriately.
     *
     * @details
     * The ShinyResizeObserver is used to watch the containers, such as Sidebars
     * and Cards for size changes, in particular when the sidebar state is toggled
     * or the card body is expanded full screen. It performs two primary tasks:
     *
     * 1. Dispatches a `resize` event on the window object. This is necessary to
     *    ensure that Shiny outputs resize appropriately. In general, the window
     *    resizing is throttled and the output update occurs when the transition
     *    is complete.
     * 2. If an output with a resize method on the output binding is detected, we
     *    directly call the `.onResize()` method of the binding. This ensures that
     *    htmlwidgets transition smoothly. In static mode, htmlwidgets does this
     *    already.
     *
     * @note
     * This resize observer also handles race conditions in some complex
     * fill-based layouts with multiple outputs (e.g., plotly), where shiny
     * initializes with the correct sizing, but in-between the 1st and last
     * renderValue(), the size of the output containers can change, meaning every
     * output but the 1st gets initialized with the wrong size during their
     * renderValue(). Then, after the render phase, shiny won't know to trigger a
     * resize since all the widgets will return to their original size (and thus,
     * Shiny thinks there isn't any resizing to do). The resize observer works
     * around this by ensuring that the output is resized whenever its container
     * size changes.
     * @constructor
     */
    constructor() {
      this.resizeObserverEntries = [];
      this.resizeObserver = new ResizeObserver((entries) => {
        const resizeEvent = new Event("resize");
        window.dispatchEvent(resizeEvent);
        if (!window.Shiny)
          return;
        const resized = [];
        for (const entry of entries) {
          if (!(entry.target instanceof HTMLElement))
            continue;
          if (!entry.target.querySelector(".shiny-bound-output"))
            continue;
          entry.target.querySelectorAll(".shiny-bound-output").forEach((el) => {
            if (resized.includes(el))
              return;
            const { binding, onResize } = $(el).data("shinyOutputBinding");
            if (!binding || !binding.resize)
              return;
            const owner = el.shinyResizeObserver;
            if (owner && owner !== this)
              return;
            if (!owner)
              el.shinyResizeObserver = this;
            onResize(el);
            resized.push(el);
            if (!el.classList.contains("shiny-plot-output"))
              return;
            const img = el.querySelector(
              'img:not([width="100%"])'
            );
            if (img)
              img.setAttribute("width", "100%");
          });
        }
      });
    }
    /**
     * Observe an element for size changes.
     * @param {HTMLElement} el - The element to observe.
     */
    observe(el) {
      this.resizeObserver.observe(el);
      this.resizeObserverEntries.push(el);
    }
    /**
     * Stop observing an element for size changes.
     * @param {HTMLElement} el - The element to stop observing.
     */
    unobserve(el) {
      const idxEl = this.resizeObserverEntries.indexOf(el);
      if (idxEl < 0)
        return;
      this.resizeObserver.unobserve(el);
      this.resizeObserverEntries.splice(idxEl, 1);
    }
    /**
     * This method checks that we're not continuing to watch elements that no
     * longer exist in the DOM. If any are found, we stop observing them and
     * remove them from our array of observed elements.
     *
     * @private
     * @static
     */
    flush() {
      this.resizeObserverEntries.forEach((el) => {
        if (!document.body.contains(el))
          this.unobserve(el);
      });
    }
  };

  // srcts/src/components/card.ts
  var _Card = class {
    /**
     * Creates an instance of a bslib Card component.
     *
     * @constructor
     * @param {HTMLElement} card
     */
    constructor(card) {
      var _a;
      card.removeAttribute(_Card.attr.ATTR_INIT);
      (_a = card.querySelector(`script[${_Card.attr.ATTR_INIT}]`)) == null ? void 0 : _a.remove();
      this.card = card;
      _Card.instanceMap.set(card, this);
      _Card.shinyResizeObserver.observe(this.card);
      this._addEventListeners();
      this.overlay = this._createOverlay();
      this._exitFullScreenOnEscape = this._exitFullScreenOnEscape.bind(this);
      this._trapFocusExit = this._trapFocusExit.bind(this);
    }
    /**
     * Enter the card's full screen mode, either programmatically or via an event
     * handler. Full screen mode is activated by adding a class to the card that
     * positions it absolutely and expands it to fill the viewport. In addition,
     * we add a full screen overlay element behind the card and we trap focus in
     * the expanded card while in full screen mode.
     *
     * @param {?Event} [event]
     */
    enterFullScreen(event) {
      if (event)
        event.preventDefault();
      document.addEventListener("keydown", this._exitFullScreenOnEscape, false);
      document.addEventListener("keydown", this._trapFocusExit, true);
      if (!this.card.contains(document.activeElement)) {
        this.card.setAttribute("tabindex", "-1");
        this.card.focus();
      }
      this.card.classList.add(_Card.attr.CLASS_FULL_SCREEN);
      document.body.classList.add(_Card.attr.CLASS_HAS_FULL_SCREEN);
      this.card.insertAdjacentElement("beforebegin", this.overlay.container);
    }
    /**
     * Exit full screen mode. This removes the full screen overlay element,
     * removes the full screen class from the card, and removes the keyboard event
     * listeners that were added when entering full screen mode.
     */
    exitFullScreen() {
      document.removeEventListener(
        "keydown",
        this._exitFullScreenOnEscape,
        false
      );
      document.removeEventListener("keydown", this._trapFocusExit, true);
      this.overlay.container.remove();
      this.card.classList.remove(_Card.attr.CLASS_FULL_SCREEN);
      this.card.removeAttribute("tabindex");
      document.body.classList.remove(_Card.attr.CLASS_HAS_FULL_SCREEN);
    }
    /**
     * Adds general card-specific event listeners.
     * @private
     */
    _addEventListeners() {
      const btnFullScreen = this.card.querySelector(
        `:scope > .${_Card.attr.CLASS_FULL_SCREEN_ENTER}`
      );
      if (!btnFullScreen)
        return;
      btnFullScreen.addEventListener("click", (ev) => this.enterFullScreen(ev));
    }
    /**
     * An event handler to exit full screen mode when the Escape key is pressed.
     * @private
     * @param {KeyboardEvent} event
     */
    _exitFullScreenOnEscape(event) {
      if (!(event.target instanceof HTMLElement))
        return;
      const selOpenSelectInput = ["select[open]", "input[aria-expanded='true']"];
      if (event.target.matches(selOpenSelectInput.join(", ")))
        return;
      if (event.key === "Escape") {
        this.exitFullScreen();
      }
    }
    /**
     * An event handler to trap focus within the card when in full screen mode.
     *
     * @description
     * This keyboard event handler ensures that tab focus stays within the card
     * when in full screen mode. When the card is first expanded,
     * we move focus to the card element itself. If focus somehow leaves the card,
     * we returns focus to the card container.
     *
     * Within the card, we handle only tabbing from the close anchor or the last
     * focusable element and only when tab focus would have otherwise left the
     * card. In those cases, we cycle focus to the last focusable element or back
     * to the anchor. If the card doesn't have any focusable elements, we move
     * focus to the close anchor.
     *
     * @note
     * Because the card contents may change, we check for focusable elements
     * every time the handler is called.
     *
     * @private
     * @param {KeyboardEvent} event
     */
    _trapFocusExit(event) {
      if (!(event instanceof KeyboardEvent))
        return;
      if (event.key !== "Tab")
        return;
      const isFocusedContainer = event.target === this.card;
      const isFocusedAnchor = event.target === this.overlay.anchor;
      const isFocusedWithin = this.card.contains(event.target);
      const stopEvent = () => {
        event.preventDefault();
        event.stopImmediatePropagation();
      };
      if (!(isFocusedWithin || isFocusedContainer || isFocusedAnchor)) {
        stopEvent();
        this.card.focus();
        return;
      }
      const focusableElements = getAllFocusableChildren(this.card);
      const hasFocusableElements = focusableElements.length > 0;
      if (!hasFocusableElements) {
        stopEvent();
        this.overlay.anchor.focus();
        return;
      }
      if (isFocusedContainer)
        return;
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const isFocusedLast = event.target === lastFocusable;
      if (isFocusedAnchor && event.shiftKey) {
        stopEvent();
        lastFocusable.focus();
        return;
      }
      if (isFocusedLast && !event.shiftKey) {
        stopEvent();
        this.overlay.anchor.focus();
        return;
      }
    }
    /**
     * Creates the full screen overlay.
     * @private
     * @returns {CardFullScreenOverlay}
     */
    _createOverlay() {
      const container = document.createElement("div");
      container.id = _Card.attr.ID_FULL_SCREEN_OVERLAY;
      container.onclick = this.exitFullScreen.bind(this);
      const anchor = this._createOverlayCloseAnchor();
      container.appendChild(anchor);
      return { container, anchor };
    }
    /**
     * Creates the anchor element used to exit the full screen mode.
     * @private
     * @returns {HTMLAnchorElement}
     */
    _createOverlayCloseAnchor() {
      const anchor = document.createElement("a");
      anchor.classList.add(_Card.attr.CLASS_FULL_SCREEN_EXIT);
      anchor.tabIndex = 0;
      anchor.onclick = () => this.exitFullScreen();
      anchor.onkeydown = (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          this.exitFullScreen();
        }
      };
      anchor.innerHTML = this._overlayCloseHtml();
      return anchor;
    }
    /**
     * Returns the HTML for the close icon.
     * @private
     * @returns {string}
     */
    _overlayCloseHtml() {
      return "Close <svg width='20' height='20' fill='currentColor' class='bi bi-x-lg' viewBox='0 0 16 16'><path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z'/></svg>";
    }
    /**
     * Returns the card instance associated with the given element, if any.
     * @public
     * @static
     * @param {HTMLElement} el
     * @returns {(Card | undefined)}
     */
    static getInstance(el) {
      return _Card.instanceMap.get(el);
    }
    /**
     * Initializes all cards that require initialization on the page, or schedules
     * initialization if the DOM is not yet ready.
     * @public
     * @static
     * @param {boolean} [flushResizeObserver=true]
     */
    static initializeAllCards(flushResizeObserver = true) {
      if (document.readyState === "loading") {
        if (!_Card.onReadyScheduled) {
          _Card.onReadyScheduled = true;
          document.addEventListener("DOMContentLoaded", () => {
            _Card.initializeAllCards(false);
          });
        }
        return;
      }
      if (flushResizeObserver) {
        _Card.shinyResizeObserver.flush();
      }
      const initSelector = `.${_Card.attr.CLASS_CARD}[${_Card.attr.ATTR_INIT}]`;
      if (!document.querySelector(initSelector)) {
        return;
      }
      const cards = document.querySelectorAll(initSelector);
      cards.forEach((card) => new _Card(card));
    }
  };
  var Card = _Card;
  /**
   * Key bslib-specific classes and attributes used by the card component.
   * @private
   * @static
   * @type {{ ATTR_INIT: string; CLASS_CARD: string; CLASS_FULL_SCREEN: string; CLASS_HAS_FULL_SCREEN: string; CLASS_FULL_SCREEN_ENTER: string; CLASS_FULL_SCREEN_EXIT: string; ID_FULL_SCREEN_OVERLAY: string; }}
   */
  Card.attr = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ATTR_INIT: "data-bslib-card-init",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_CARD: "bslib-card",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_FULL_SCREEN: "bslib-full-screen",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_HAS_FULL_SCREEN: "bslib-has-full-screen",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_FULL_SCREEN_ENTER: "bslib-full-screen-enter",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLASS_FULL_SCREEN_EXIT: "bslib-full-screen-exit",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ID_FULL_SCREEN_OVERLAY: "bslib-full-screen-overlay"
  };
  /**
   * A Shiny-specific resize observer that ensures Shiny outputs in within the
   * card resize appropriately.
   * @private
   * @type {ShinyResizeObserver}
   * @static
   */
  Card.shinyResizeObserver = new ShinyResizeObserver();
  /**
   * The registry of card instances and their associated DOM elements.
   * @private
   * @static
   * @type {WeakMap<HTMLElement, Card>}
   */
  Card.instanceMap = /* @__PURE__ */ new WeakMap();
  /**
   * If cards are initialized before the DOM is ready, we re-schedule the
   * initialization to occur on DOMContentLoaded.
   * @private
   * @static
   * @type {boolean}
   */
  Card.onReadyScheduled = false;
  window.bslib = window.bslib || {};
  window.bslib.Card = Card;
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
*/
//# sourceMappingURL=card.js.map
