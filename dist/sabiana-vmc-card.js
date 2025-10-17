/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, X = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), de = /* @__PURE__ */ new WeakMap();
let Ae = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (X && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = de.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && de.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ke = (i) => new Ae(typeof i == "string" ? i : i + "", void 0, ee), Me = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((r, s, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[o + 1], i[0]);
  return new Ae(t, i, ee);
}, ze = (i, e) => {
  if (X) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const r = document.createElement("style"), s = V.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = t.cssText, i.appendChild(r);
  }
}, he = X ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return ke(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Oe, defineProperty: Ne, getOwnPropertyDescriptor: Ue, getOwnPropertyNames: He, getOwnPropertySymbols: Te, getPrototypeOf: Re } = Object, y = globalThis, pe = y.trustedTypes, je = pe ? pe.emptyScript : "", Z = y.reactiveElementPolyfillSupport, H = (i, e) => i, q = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? je : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, te = (i, e) => !Oe(i, e), ue = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: te };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let M = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ue) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(e, r, t);
      s !== void 0 && Ne(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: s, set: o } = Ue(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: s, set(a) {
      const c = s == null ? void 0 : s.call(this);
      o == null || o.call(this, a), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const e = Re(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const t = this.properties, r = [...He(t), ...Te(t)];
      for (const s of r) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, s] of t) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const s = this._$Eu(t, r);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const s of r) t.unshift(he(s));
    } else e !== void 0 && t.push(he(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ze(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostConnected) == null ? void 0 : r.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var r;
      return (r = t.hostDisconnected) == null ? void 0 : r.call(t);
    });
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    var o;
    const r = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, r);
    if (s !== void 0 && r.reflect === !0) {
      const a = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : q).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, a;
    const r = this.constructor, s = r._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const c = r.getPropertyOptions(s), n = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : q;
      this._$Em = s;
      const d = n.fromAttribute(t, c.type);
      this[s] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, r) {
    var s;
    if (e !== void 0) {
      const o = this.constructor, a = this[e];
      if (r ?? (r = o.getPropertyOptions(e)), !((r.hasChanged ?? te)(a, t) || r.useDefault && r.reflect && a === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(o._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: s, wrapped: o }, a) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), o !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, a] of s) {
        const { wrapped: c } = a, n = this[o];
        c !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, a, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (r = this._$EO) == null || r.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var s;
      return (s = r.hostUpdated) == null ? void 0 : s.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[H("elementProperties")] = /* @__PURE__ */ new Map(), M[H("finalized")] = /* @__PURE__ */ new Map(), Z == null || Z({ ReactiveElement: M }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis, W = T.trustedTypes, me = W ? W.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Se = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ee = "?" + $, Be = `<${Ee}>`, k = document, j = () => k.createComment(""), B = (i) => i === null || typeof i != "object" && typeof i != "function", ie = Array.isArray, De = (i) => ie(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, _e = />/g, A = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, be = /"/g, Ce = /^(?:script|style|textarea|title)$/i, Fe = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), S = Fe(1), z = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), C = k.createTreeWalker(k, 129);
function Pe(i, e) {
  if (!ie(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return me !== void 0 ? me.createHTML(e) : e;
}
const Le = (i, e) => {
  const t = i.length - 1, r = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = U;
  for (let c = 0; c < t; c++) {
    const n = i[c];
    let d, p, l = -1, f = 0;
    for (; f < n.length && (a.lastIndex = f, p = a.exec(n), p !== null); ) f = a.lastIndex, a === U ? p[1] === "!--" ? a = fe : p[1] !== void 0 ? a = _e : p[2] !== void 0 ? (Ce.test(p[2]) && (s = RegExp("</" + p[2], "g")), a = A) : p[3] !== void 0 && (a = A) : a === A ? p[0] === ">" ? (a = s ?? U, l = -1) : p[1] === void 0 ? l = -2 : (l = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? A : p[3] === '"' ? be : ge) : a === be || a === ge ? a = A : a === fe || a === _e ? a = U : (a = A, s = void 0);
    const _ = a === A && i[c + 1].startsWith("/>") ? " " : "";
    o += a === U ? n + Be : l >= 0 ? (r.push(d), n.slice(0, l) + Se + n.slice(l) + $ + _) : n + $ + (l === -2 ? c : _);
  }
  return [Pe(i, o + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class D {
  constructor({ strings: e, _$litType$: t }, r) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const c = e.length - 1, n = this.parts, [d, p] = Le(e, t);
    if (this.el = D.createElement(d, r), C.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = C.nextNode()) !== null && n.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(Se)) {
          const f = p[a++], _ = s.getAttribute(l).split($), w = /([.?@])?(.*)/.exec(f);
          n.push({ type: 1, index: o, name: w[2], strings: _, ctor: w[1] === "." ? Ve : w[1] === "?" ? qe : w[1] === "@" ? We : K }), s.removeAttribute(l);
        } else l.startsWith($) && (n.push({ type: 6, index: o }), s.removeAttribute(l));
        if (Ce.test(s.tagName)) {
          const l = s.textContent.split($), f = l.length - 1;
          if (f > 0) {
            s.textContent = W ? W.emptyScript : "";
            for (let _ = 0; _ < f; _++) s.append(l[_], j()), C.nextNode(), n.push({ type: 2, index: ++o });
            s.append(l[f], j());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ee) n.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = s.data.indexOf($, l + 1)) !== -1; ) n.push({ type: 7, index: o }), l += $.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const r = k.createElement("template");
    return r.innerHTML = e, r;
  }
}
function O(i, e, t = i, r) {
  var a, c;
  if (e === z) return e;
  let s = r !== void 0 ? (a = t._$Co) == null ? void 0 : a[r] : t._$Cl;
  const o = B(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((c = s == null ? void 0 : s._$AO) == null || c.call(s, !1), o === void 0 ? s = void 0 : (s = new o(i), s._$AT(i, t, r)), r !== void 0 ? (t._$Co ?? (t._$Co = []))[r] = s : t._$Cl = s), s !== void 0 && (e = O(i, s._$AS(i, e.values), s, r)), e;
}
class Ie {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? k).importNode(t, !0);
    C.currentNode = s;
    let o = C.nextNode(), a = 0, c = 0, n = r[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let d;
        n.type === 2 ? d = new F(o, o.nextSibling, this, e) : n.type === 1 ? d = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (d = new Ke(o, this, e)), this._$AV.push(d), n = r[++c];
      }
      a !== (n == null ? void 0 : n.index) && (o = C.nextNode(), a++);
    }
    return C.currentNode = k, s;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
}
class F {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, r, s) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = O(this, e, t), B(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : De(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && B(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: r } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = D.createElement(Pe(r.h, r.h[0]), this.options)), r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const a = new Ie(s, this), c = a.u(this.options);
      a.p(t), this.T(c), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = ve.get(e.strings);
    return t === void 0 && ve.set(e.strings, t = new D(e)), t;
  }
  k(e) {
    ie(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, s = 0;
    for (const o of e) s === t.length ? t.push(r = new F(this.O(j()), this.O(j()), this, this.options)) : r = t[s], r._$AI(o), s++;
    s < t.length && (this._$AR(r && r._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class K {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = u;
  }
  _$AI(e, t = this, r, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = O(this, e, t, 0), a = !B(e) || e !== this._$AH && e !== z, a && (this._$AH = e);
    else {
      const c = e;
      let n, d;
      for (e = o[0], n = 0; n < o.length - 1; n++) d = O(this, c[r + n], t, n), d === z && (d = this._$AH[n]), a || (a = !B(d) || d !== this._$AH[n]), d === u ? e = u : e !== u && (e += (d ?? "") + o[n + 1]), this._$AH[n] = d;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ve extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class qe extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class We extends K {
  constructor(e, t, r, s, o) {
    super(e, t, r, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = O(this, e, t, 0) ?? u) === z) return;
    const r = this._$AH, s = e === u && r !== u || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== u && (r === u || s);
    s && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ke {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    O(this, e);
  }
}
const Y = T.litHtmlPolyfillSupport;
Y == null || Y(D, F), (T.litHtmlVersions ?? (T.litHtmlVersions = [])).push("3.3.1");
const Ze = (i, e, t) => {
  const r = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = r._$litPart$;
  if (s === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    r._$litPart$ = s = new F(e.insertBefore(j(), o), o, void 0, t ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class R extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ze(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return z;
  }
}
var we;
R._$litElement$ = !0, R.finalized = !0, (we = P.litElementHydrateSupport) == null || we.call(P, { LitElement: R });
const G = P.litElementPolyfillSupport;
G == null || G({ LitElement: R });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: te }, Ge = (i = Ye, e, t) => {
  const { kind: r, metadata: s } = t;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), r === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(t.name, i), r === "accessor") {
    const { name: a } = t;
    return { set(c) {
      const n = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, n, i);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, i, c), c;
    } };
  }
  if (r === "setter") {
    const { name: a } = t;
    return function(c) {
      const n = this[a];
      e.call(this, c), this.requestUpdate(a, n, i);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function L(i) {
  return (e, t) => typeof t == "object" ? Ge(i, e, t) : ((r, s, o) => {
    const a = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, r), a ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Qe(i) {
  return L({ ...i, state: !0, attribute: !1 });
}
const Xe = Me`
  ha-card {
    padding: 16px;
    background-color: var(--card-background-color);
    color: var(--wa-color-neutral-fill-loud);
    border-radius: 12px;
    width: 100%; /* Usa tutto lo spazio orizzontale */
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }

  .hidden-element {
    display: none !important;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  .header .name {
    font-size: var(--ha-card-header-font-size, var(--ha-font-size-2xl));
    letter-spacing: -0.012em;
    line-height: var(--ha-line-height-expanded);
    font-weight: var(--ha-font-weight-normal);
    color: var(--ha-card-header-color, var(--primary-text-color));
  }

  .main-row {
    display: flex;
    align-items: center;      /* allineamento verticale */
    // justify-content: start;   /* allinea gli elementi all'inizio */
    // gap: 24px;                /* distanza tra temperature e ventola */
    margin-bottom: 16px;
  }
  
  /* Stili per la sezione delle temperature */
  .temps {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 60px;          /* opzionale: larghezza minima delle temperature */
    font-size: 1.1em;
    white-space: nowrap;
    background: var(--card-background-color);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03);
    border: 1px solid var(--divider-color);  
    padding: 3px;
    flex: 1;
  }

  .temps div {
    display: flex;
    align-items: center;
    min-width: 60px;
    white-space: nowrap;
  }

  .temps .label {
    font-size: 0.75em;
    color: var(--secondary-text-color);
  }

  /* Stili per l'indicatore di stato */
  .status-indicator {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-left: auto;        /* spinge l'indicatore a destra */
    flex: 1;
    text-align: right;
  }

  .status-indicator ha-icon {
    font-size: 1.5em;
    cursor: pointer;
  }

  .status-indicator ha-icon.on {
    color: var(--primary-color);
  }

  .status-indicator ha-icon.off {
    color: var(--disabled-text-color);
  }

  /* Stili per il pulsante di accensione */
  .power-button {
    border: none;
    cursor: pointer;
    font-size: 1.1em;
    border-radius: 50%;
    color: var(--primary-text-color);
    transition: background-color 0.3s;
  }

  .power-button:hover {
    background-color: var(--ha-color-fill-neutral-loud-active);
  }

  .power-button-on {
    color: var(--error-color, #d32f2f);
  }

  .power-button-off {
    color: var(--disabled-text-color, #9e9e9e);
  }

  /* Stili per il selettore di modalità di funzionamento */
  .mode-selector {
    display: flex;
    margin-bottom: 16px;
    background: var(--card-background-color);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03);
    border: 1px solid var(--divider-color);  
  }

  .mode-button {
    flex: 1;
    padding: 10px 0;
    background: none;
    border: none;
    border-right: 1px solid #fff; /* Bordo bianco tra pulsanti */    
    color: var(--wa-color-neutral-fill-loud);
    cursor: pointer;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
    border-radius: 0;             /* Nessun arrotondamento di default */
    outline: none;
    padding: 4px;
    container-type: inline-size;
  }

  .mode-button:first-child {
    border-top-left-radius: 30px;    /* Estremo sinistro arrotondato a cerchio */
    border-bottom-left-radius: 30px;
  }

  .mode-button:last-child {
    border-top-right-radius: 30px;   /* Estremo destro arrotondato a cerchio */
    border-bottom-right-radius: 30px;
    border-right: none; /* Nessun bordo dopo l’ultimo */
  }

  .mode-button:hover {
    background: var(--wa-color-neutral-fill-normal);
  }

  .mode-button.selected {
    background: var(--ha-color-fill-primary-normal-resting);
    color: var(--ha-color-fill-primary-loud-active);
    font-weight: 600;
  }

  .mode-button:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  /* Stili per il selettore della velocità manuale */
  .speed-manual {
    display: flex;
    margin-bottom: 16px;
    background: var(--card-background-color);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03);
    border: 1px solid var(--divider-color);
  }

  .speed-button {
    flex: 1;
    padding: 10px 0;
    background: none;
    border: none;
    border-right: 1px solid #fff; /* Bordo bianco tra pulsanti */    
    color: var(--wa-color-neutral-fill-loud);
    cursor: pointer;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
    border-radius: 0;             /* Nessun arrotondamento di default */
    outline: none;
    padding: 4px;
  }

  .speed-button:first-child {
    border-top-left-radius: 30px;    /* Estremo sinistro arrotondato a cerchio */
    border-bottom-left-radius: 30px;
  }

  .speed-button:last-child {
    border-top-right-radius: 30px;   /* Estremo destro arrotondato a cerchio */
    border-bottom-right-radius: 30px;
    border-right: none; /* Nessun bordo dopo l’ultimo */
  }

  .speed-button:hover {
    background: var(--wa-color-neutral-fill-normal);
  }

  .speed-button.selected {
    background: var(--ha-color-fill-primary-normal-resting);
    color: var(--ha-color-fill-primary-loud-active);
    font-weight: 600;
  }

  .speed-button:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  /* Stili per il selettore del programma */
  .program-selection {
    display: flex;
    margin-bottom: 16px;
    background: var(--card-background-color);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03);
    border: 1px solid var(--divider-color);
  }

  .program-button {
    flex: 1;
    padding: 10px 0;
    background: none;
    border: none;
    border-right: 1px solid #fff; /* Bordo bianco tra pulsanti */    
    color: var(--wa-color-neutral-fill-loud);
    cursor: pointer;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
    border-radius: 0;             /* Nessun arrotondamento di default */
    outline: none;
    padding: 4px;
  }

  .program-button:first-child {
    border-top-left-radius: 30px;    /* Estremo sinistro arrotondato a cerchio */
    border-bottom-left-radius: 30px;
  }

  .program-button:last-child {
    border-top-right-radius: 30px;   /* Estremo destro arrotondato a cerchio */
    border-bottom-right-radius: 30px;
    border-right: none; /* Nessun bordo dopo l’ultimo */
  }

  .program-button:hover {
    background: var(--wa-color-neutral-fill-normal);
  }

  .program-button.selected {
    background: var(--ha-color-fill-primary-normal-resting);
    color: var(--ha-color-fill-primary-loud-active);
    font-weight: 600;
  }

  .program-button:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  /* Stili per la ventola centrale */
  .fan-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--wa-color-neutral-fill-loud);
    user-select: none;
    flex: 1;
  }

  .fan-anim {
    animation-name: spinFan;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    transform-origin: center center;
  }

  @keyframes spinFan {
    100% {
      transform: rotate(-360deg);
    }
  }

  /** Stili per la modale */
  .modal {
    display: block;
    position: fixed;
    z-index: 999;
    left: 0; top: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.4);
    color: #333;
  }
  .modal-content {
    background: #fff;
    margin: 15% auto;
    padding: 16px;
    border-radius: 8px;
    width: 300px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  }
  .close {
    float: right;
    cursor: pointer;
    font-size: 22px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }

  .version {
    font-size: 0.75em;
    color: var(--secondary-text-color);
    user-select: none;
  }
`, et = {
  card: {
    sabiana_vmc: {
      title: "Sabiana VMC",
      temperature: {
        internal: "Internal",
        external: "External",
        exhaust: "Exhaust",
        disposal: "Disposal",
        efficiency: "Heat recovery efficiency"
      },
      actions: {
        power: "Power",
        power_on: "Turn on",
        power_off: "Turn off",
        mode: "Mode",
        program: "Program",
        fan_speed: "Fan speed"
      },
      modes: {
        auto: "Auto",
        party: "Party",
        holiday: "Holiday",
        program: "Program",
        manual: "Manual"
      },
      programs: {
        p1: "Family with children, both parents work outside during the day",
        p2: "Family with constant presence at home during the day",
        p3: "Family that works and returns home for lunch",
        p4: "Office used from Monday to Friday",
        pN: "Custom {program}"
      },
      messages: {
        boost_on: "Boost mode is active",
        boost_off: "Boost mode is deactive",
        bypass_on: "Bypass mode is active",
        bypass_off: "Bypass mode is deactive"
      },
      errors: {
        missing_config: "Missing or invalid configuration: {key}",
        missing_entity: "Missing or invalid entity: {entity}"
      },
      version: "Version {version}"
    }
  }
}, tt = {
  ui: et
}, it = {
  card: {
    sabiana_vmc: {
      title: "Sabiana VMC",
      temperature: {
        internal: "Interna",
        external: "Esterna",
        exhaust: "Estratta",
        disposal: "Smaltimento",
        efficiency: "Efficienza scambiatore"
      },
      actions: {
        power: "Accensione/Spegnimento",
        power_on: "Accendi",
        power_off: "Spegni",
        mode: "Modalità",
        program: "Programma",
        fan_speed: "Velocità ventola"
      },
      modes: {
        auto: "Auto",
        party: "Festa",
        holiday: "Vacanza",
        program: "Programma",
        manual: "Manuale"
      },
      programs: {
        p1: "Famiglia con bambini, entrambi i genitori lavorano fuori casa durante il giorno.",
        p2: "Famiglia con presenza fissa in casa durante la giornata.",
        p3: "Famiglia che lavora con rientro per il pasto di mezzogiorno.",
        p4: "Ufficio con utilizzo dal lunedì al venerdì.",
        pN: "Personalizzato {program}."
      },
      messages: {
        boost_on: "La modalità Boost è attiva.",
        boost_off: "La modalità Boost è disattiva.",
        bypass_on: "La modalità Bypass è attiva.",
        bypass_off: "La modalità Bypass è disattiva."
      },
      errors: {
        missing_config: "Configurazione mancante o non valida: {key}.",
        missing_entity: "Entità mancante o non valida: {entity}."
      },
      version: "Versione {version}"
    }
  }
}, rt = {
  ui: it
}, $e = {
  en: tt,
  it: rt
};
function ye(i, e) {
  return e.split(".").reduce((t, r) => t == null ? void 0 : t[r], i);
}
function m(i, e, t) {
  let r = ye($e[i], e) ?? ye($e.en, e) ?? e;
  return t && Object.keys(t).forEach((s) => {
    r = r.replace(`{${s}}`, t[s]);
  }), r;
}
function E(i, e, t = void 0) {
  var r;
  return e ? (r = i.states[e]) == null ? void 0 : r.state : t;
}
function st(i, e = "en", t = 1) {
  return i === void 0 || isNaN(i) ? "n/a" : new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }).format(i);
}
function ot(i, e, t) {
  var s, o;
  if (!e || !t) return t ?? "n/a";
  const r = (o = (s = i.states[e]) == null ? void 0 : s.attributes) == null ? void 0 : o.unit_of_measurement;
  return r ? `${t} ${r}` : t;
}
function I(i, e, t = "en", r = 1) {
  const s = E(i, e), o = s !== void 0 ? parseFloat(s) : void 0, a = st(o, t, r);
  return ot(i, e, a);
}
function Q(i, e = 0) {
  if (i === void 0) return e;
  if (typeof i == "number") return i;
  const t = parseFloat(i);
  return isNaN(t) ? e : t;
}
const h = {
  ui: {
    card: {
      sabiana_vmc: {
        temperature: {
          internal: "ui.card.sabiana_vmc.temperature.internal",
          external: "ui.card.sabiana_vmc.temperature.external",
          exhaust: "ui.card.sabiana_vmc.temperature.exhaust",
          disposal: "ui.card.sabiana_vmc.temperature.disposal"
        },
        actions: {
          power_on: "ui.card.sabiana_vmc.actions.power_on",
          power_off: "ui.card.sabiana_vmc.actions.power_off"
        },
        modes: {
          auto: "ui.card.sabiana_vmc.modes.auto",
          party: "ui.card.sabiana_vmc.modes.party",
          holiday: "ui.card.sabiana_vmc.modes.holiday",
          program: "ui.card.sabiana_vmc.modes.program",
          manual: "ui.card.sabiana_vmc.modes.manual"
        },
        programs: {
          p1: "ui.card.sabiana_vmc.programs.p1",
          p2: "ui.card.sabiana_vmc.programs.p2",
          p3: "ui.card.sabiana_vmc.programs.p3",
          p4: "ui.card.sabiana_vmc.programs.p4",
          pN: "ui.card.sabiana_vmc.programs.pN"
        },
        messages: {
          boost_on: "ui.card.sabiana_vmc.messages.boost_on",
          bypass_on: "ui.card.sabiana_vmc.messages.bypass_on"
        },
        errors: {
          missing_config: "ui.card.sabiana_vmc.errors.missing_config",
          missing_entity: "ui.card.sabiana_vmc.errors.missing_entity"
        }
      }
    }
  }
};
var v = /* @__PURE__ */ ((i) => (i.Auto = "Auto", i.Program = "Program", i.Party = "Party", i.Holiday = "Holiday", i.Manual = "Manual", i))(v || {});
function re(i) {
  return Object.values(v).includes(i) ? i : void 0;
}
function at(i) {
  switch (typeof i == "string" ? re(i) : i) {
    case "Auto":
      return "mdi:fan-auto";
    case "Manual":
      return "mdi:hand-back-right";
    case "Party":
      return "mdi:party-popper";
    case "Program":
      return "mdi:fan-clock";
    case "Holiday":
      return "mdi:beach";
    default:
      return "mdi:help-circle";
  }
}
function nt(i) {
  switch (typeof i == "string" ? re(i) : i) {
    case "Auto":
      return h.ui.card.sabiana_vmc.modes.auto;
    case "Manual":
      return h.ui.card.sabiana_vmc.modes.manual;
    case "Party":
      return h.ui.card.sabiana_vmc.modes.party;
    case "Program":
      return h.ui.card.sabiana_vmc.modes.program;
    case "Holiday":
      return h.ui.card.sabiana_vmc.modes.holiday;
    default:
      return "mdi:help-circle";
  }
}
function ct() {
  var l, f, _, w, se, oe, ae, ne, ce, le;
  if (!this.hass || !this.config)
    return S`<div>Caricamento...</div>`;
  if (typeof this.error == "string" && this.error.length > 0)
    return S`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  const i = this.hass.language, e = "0.10.18.1760738450899", t = E(this.hass, (l = this.entities) == null ? void 0 : l.model, "n/a"), r = E(this.hass, (f = this.entities) == null ? void 0 : f.power, "off") === "on", s = m(i, h.ui.card.sabiana_vmc.messages.boost_on), o = m(i, h.ui.card.sabiana_vmc.messages.bypass_on), a = E(this.hass, (_ = this.entities) == null ? void 0 : _.mode) || "", c = Q(E(this.hass, (w = this.entities) == null ? void 0 : w.program)), n = Q(E(this.hass, (se = this.entities) == null ? void 0 : se.fan_speed)), d = lt(Q(E(this.hass, (oe = this.entities) == null ? void 0 : oe.duty_cycle_fan_1))), p = r && d > 0 ? "fan-anim" : "";
  return S`
<ha-card>
  <h1 class="header">
    <div class="name">
      Sabiana ${t}
    </div>
    <button class="power-button" 
      @click=${this.togglePower} 
      title=${r ? m(i, h.ui.card.sabiana_vmc.actions.power_off) : m(i, h.ui.card.sabiana_vmc.actions.power_on)}>
      <ha-icon class=${r ? "power-button-on" : "power-button-off"} icon="mdi:power"></ha-icon>
    </button>
  </h1>

  <div class="main-row">

    <div class="temps">
      <div>
        <div>${I(this.hass, (ae = this.entities) == null ? void 0 : ae.temp_in)}</div>
        <div class="label">${m(i, h.ui.card.sabiana_vmc.temperature.internal)}</div>
      </div>
      <div>
        <div>${I(this.hass, (ne = this.entities) == null ? void 0 : ne.temp_out)}</div>
        <div class="label">${m(i, h.ui.card.sabiana_vmc.temperature.external)}</div>
      </div>
      <div>
        <div>${I(this.hass, (ce = this.entities) == null ? void 0 : ce.temp_exhaust)}</div>
        <div class="label">${m(i, h.ui.card.sabiana_vmc.temperature.exhaust)}</div>
      </div>
      <div>
        <div>${I(this.hass, (le = this.entities) == null ? void 0 : le.temp_disposal)}</div>
        <div class="label">${m(i, h.ui.card.sabiana_vmc.temperature.disposal)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${p}"
        fill="currentColor"
        style="${d > 0 ? `animation-duration: ${dt(d)};` : ""}"
        viewBox="0 0 24 24"
        width="112" height="112">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-icon 
        class="${"on"}"
        title="${s}"
        icon="mdi:fan-plus"
        @click="${() => this.openModal(s)}">
      </ha-icon>

      <ha-icon 
        class="${"on"}"
        title="${o}"
        icon="mdi:debug-step-over"
        @click="${() => this.openModal(o)}">
      </ha-icon>

    </div>

  </div>  

  <div class="mode-selector">
    ${Object.keys(v).map((b) => S`
      <button
        aria-label="${b}"
        class="mode-button ${a === b ? "selected" : ""}"
        @click=${() => this.selectMode(re(b))}
        title="${m(i, nt(b))}"
        ?disabled="${!r}">
        <ha-icon icon="${at(b)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="speed-manual ${a !== v.Manual ? "hidden-element" : ""}">
    ${Array.from({ length: 4 }, (b, g) => S`
      <button 
        aria-label="${g}"
        class="speed-button ${n === g ? "selected" : ""}"
        @click="${() => this.setFanSpeed(g)}"
        ?disabled="${!r}">
        <ha-icon icon="${ht(g)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${a !== v.Program ? "hidden-element" : ""}">
    ${Array.from({ length: 7 }, (b, g) => S`
      <button 
        aria-label="${xe(i, g)}"
        title="${xe(i, g)}"
        class="program-button ${c === g ? "selected" : ""}"
        @click="${() => this.setProgram(g)}"
        ?disabled="${!r}">
        <ha-icon icon="mdi:numeric-${g + 1}"></ha-icon>
      </button>
      `)}
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${e}</div>
  </div>

  ${this.modalMessage.length > 0 ? S`
    <div class="modal" @click="${this.closeModal}">
      <div class="modal-content" @click="${(b) => b.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <p>${this.modalMessage}</p>
      </div>
    </div>` : ""}

</ha-card>
`;
}
function lt(i) {
  const e = [
    { speed: 0, percent: 0 },
    { speed: 1, percent: 40 },
    { speed: 2, percent: 55 },
    { speed: 3, percent: 70 },
    { speed: 4, percent: 85 }
  ];
  let t = e[0], r = Math.abs(i - e[0].percent);
  for (let s = 1; s < e.length; s++) {
    const o = Math.abs(i - e[s].percent);
    o < r && (t = e[s], r = o);
  }
  return t.speed;
}
function dt(i) {
  switch (i) {
    case 1:
      return "4s";
    case 2:
      return "2.5s";
    case 3:
      return "1.6s";
    case 4:
      return "0.8s";
    default:
      return "0s";
  }
}
function ht(i) {
  switch (i) {
    case 0:
      return "mdi:fan-speed-1";
    case 1:
      return "mdi:fan-speed-2";
    case 2:
      return "mdi:fan-speed-3";
    case 3:
      return "mdi:fan-plus";
    default:
      return "mdi:fan";
  }
}
function xe(i, e) {
  switch (e) {
    case 0:
      return m(i, h.ui.card.sabiana_vmc.programs.p1);
    case 1:
      return m(i, h.ui.card.sabiana_vmc.programs.p2);
    case 2:
      return m(i, h.ui.card.sabiana_vmc.programs.p3);
    case 3:
      return m(i, h.ui.card.sabiana_vmc.programs.p4);
    default:
      return m(i, h.ui.card.sabiana_vmc.programs.pN, { program: `${e + 1}` });
  }
}
const pt = {
  model: "sensor.@prefix@_blk0_controller_model",
  temp_out: "sensor.@prefix@_blk1_temperature_t1",
  temp_in: "sensor.@prefix@_blk1_temperature_t2",
  temp_exhaust: "sensor.@prefix@_blk1_temperature_t3",
  temp_disposal: "sensor.@prefix@_blk1_temperature_t4",
  power: "switch.@prefix@_vmc_power",
  mode: "sensor.@prefix@_blk3_mode_selection",
  mode_command_manual: "switch.@prefix@_mode_command_manual",
  mode_command_holiday: "switch.@prefix@_mode_command_holiday",
  mode_command_party: "switch.@prefix@_mode_command_party",
  mode_command_program: "switch.@prefix@_mode_command_program",
  mode_command_auto: "switch.@prefix@_mode_command_auto",
  fan_speed: "number.@prefix@_vmc_manual_speed",
  duty_cycle_fan_1: "sensor.@prefix@_blk1_duty_cycle_fan_1",
  program: "number.@prefix@_vmc_timer_progr_selection",
  boost: "binary_sensor.@prefix@_blk1_boost_active",
  bypass: "binary_sensor.@prefix@_blk1_bypass_active",
  bypass_mode: "sensor.@prefix@_blk1_free_cooling_free_heating"
};
function ut(i) {
  const e = Object.entries(pt).map(([t, r]) => [
    t,
    r.replace("@prefix@", i)
  ]);
  return Object.fromEntries(e);
}
var mt = Object.defineProperty, ft = Object.getOwnPropertyDescriptor, N = (i, e, t, r) => {
  for (var s = r > 1 ? void 0 : r ? ft(e, t) : e, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (s = (r ? a(e, t, s) : a(s)) || s);
  return r && s && mt(e, t, s), s;
};
let x = class extends R {
  constructor() {
    super(...arguments), this.modalMessage = "", this.render = ct;
  }
  setConfig(i) {
    var e;
    (!i.entity_prefix || typeof i.entity_prefix != "string" || i.entity_prefix.trim() === "") && (this.error = m(
      ((e = this.hass) == null ? void 0 : e.language) ?? "en",
      h.ui.card.sabiana_vmc.errors.missing_config,
      { key: "entity_prefix" }
    )), this.config = i;
  }
  updated(i) {
    var e, t, r;
    if (super.updated(i), i.has("config")) {
      if (!this.hass || !((e = this.config) != null && e.entity_prefix))
        return;
      this.entities = ut(this.config.entity_prefix);
      for (const [s, o] of Object.entries(this.entities))
        (t = this.hass) != null && t.states && (this.hass.states[o] || (this.error = m(
          ((r = this.hass) == null ? void 0 : r.language) ?? "en",
          h.ui.card.sabiana_vmc.errors.missing_entity,
          { entity: s }
        )));
    }
  }
  getCardSize() {
    return 3;
  }
  togglePower() {
    var i;
    (i = this.entities) != null && i.power && this.hass.callService("switch", "toggle", { entity_id: this.entities.power });
  }
  selectMode(i) {
    var t, r, s, o, a, c;
    if (!((t = this.entities) != null && t.mode) || !i) return;
    let e = "";
    switch (i) {
      case v.Manual:
        e = ((r = this.entities) == null ? void 0 : r.mode_command_manual) || "";
        break;
      case v.Holiday:
        e = ((s = this.entities) == null ? void 0 : s.mode_command_holiday) || "";
        break;
      case v.Party:
        e = ((o = this.entities) == null ? void 0 : o.mode_command_party) || "";
        break;
      case v.Program:
        e = ((a = this.entities) == null ? void 0 : a.mode_command_program) || "";
        break;
      default:
        e = ((c = this.entities) == null ? void 0 : c.mode_command_auto) || "";
        break;
    }
    e && this.hass.callService("switch", "toggle", { entity_id: e });
  }
  setFanSpeed(i) {
    var e, t;
    (e = this.entities) != null && e.fan_speed && this.hass.callService("number", "set_value", {
      entity_id: (t = this.entities) == null ? void 0 : t.fan_speed,
      value: i
    });
  }
  setProgram(i) {
    var e, t;
    (e = this.entities) != null && e.program && this.hass.callService("number", "set_value", {
      entity_id: (t = this.entities) == null ? void 0 : t.program,
      value: i
    });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  //#region  "Modale"
  openModal(i) {
    this.modalMessage = i;
  }
  closeModal() {
    this.modalMessage = "";
  }
  //#endregion
};
x.styles = Xe;
N([
  L({ attribute: !1 })
], x.prototype, "hass", 2);
N([
  L({ attribute: !1 })
], x.prototype, "config", 2);
N([
  L({ attribute: !1 })
], x.prototype, "entities", 2);
N([
  L({ attribute: !1 })
], x.prototype, "modalMessage", 2);
N([
  Qe()
], x.prototype, "error", 2);
x = N([
  Je("sabiana-vmc-card")
], x);
export {
  x as SabianaVmcCard
};
