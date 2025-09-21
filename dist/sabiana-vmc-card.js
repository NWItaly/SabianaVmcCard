/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, Q = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), de = /* @__PURE__ */ new WeakMap();
let Se = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Q && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = de.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && de.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Me = (r) => new Se(typeof r == "string" ? r : r + "", void 0, X), Oe = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new Se(t, r, X);
}, Ne = (r, e) => {
  if (Q) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = L.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, he = Q ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Me(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ze, defineProperty: Ue, getOwnPropertyDescriptor: He, getOwnPropertyNames: Te, getOwnPropertySymbols: Re, getPrototypeOf: je } = Object, y = globalThis, pe = y.trustedTypes, De = pe ? pe.emptyScript : "", Z = y.reactiveElementPolyfillSupport, U = (r, e) => r, V = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? De : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, ee = (r, e) => !ze(r, e), ue = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: ee };
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
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Ue(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = He(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: s, set(n) {
      const l = s == null ? void 0 : s.call(this);
      o == null || o.call(this, n), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = je(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const t = this.properties, i = [...Te(t), ...Re(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(he(s));
    } else e !== void 0 && t.push(he(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ne(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var o;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : V).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, n;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : V;
      this._$Em = s;
      const d = a.fromAttribute(t, l.type);
      this[s] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s;
    if (e !== void 0) {
      const o = this.constructor, n = this[e];
      if (i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? ee)(n, t) || i.useDefault && i.reflect && n === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, n] of s) {
        const { wrapped: l } = n, a = this[o];
        l !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((s) => {
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
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, M[U("elementProperties")] = /* @__PURE__ */ new Map(), M[U("finalized")] = /* @__PURE__ */ new Map(), Z == null || Z({ ReactiveElement: M }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = globalThis, q = H.trustedTypes, me = q ? q.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ee = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ce = "?" + $, Fe = `<${Ce}>`, C = document, R = () => C.createComment(""), j = (r) => r === null || typeof r != "object" && typeof r != "function", te = Array.isArray, Be = (r) => te(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fe = /-->/g, _e = />/g, A = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, be = /"/g, Pe = /^(?:script|style|textarea|title)$/i, Ie = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), k = Ie(1), O = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), S = C.createTreeWalker(C, 129);
function ke(r, e) {
  if (!te(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return me !== void 0 ? me.createHTML(e) : e;
}
const Le = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = z;
  for (let l = 0; l < t; l++) {
    const a = r[l];
    let d, h, c = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, h = n.exec(a), h !== null); ) f = n.lastIndex, n === z ? h[1] === "!--" ? n = fe : h[1] !== void 0 ? n = _e : h[2] !== void 0 ? (Pe.test(h[2]) && (s = RegExp("</" + h[2], "g")), n = A) : h[3] !== void 0 && (n = A) : n === A ? h[0] === ">" ? (n = s ?? z, c = -1) : h[1] === void 0 ? c = -2 : (c = n.lastIndex - h[2].length, d = h[1], n = h[3] === void 0 ? A : h[3] === '"' ? be : ge) : n === be || n === ge ? n = A : n === fe || n === _e ? n = z : (n = A, s = void 0);
    const _ = n === A && r[l + 1].startsWith("/>") ? " " : "";
    o += n === z ? a + Fe : c >= 0 ? (i.push(d), a.slice(0, c) + Ee + a.slice(c) + $ + _) : a + $ + (c === -2 ? l : _);
  }
  return [ke(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class D {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const l = e.length - 1, a = this.parts, [d, h] = Le(e, t);
    if (this.el = D.createElement(d, i), S.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (s = S.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const c of s.getAttributeNames()) if (c.endsWith(Ee)) {
          const f = h[n++], _ = s.getAttribute(c).split($), x = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: x[2], strings: _, ctor: x[1] === "." ? qe : x[1] === "?" ? We : x[1] === "@" ? Ke : W }), s.removeAttribute(c);
        } else c.startsWith($) && (a.push({ type: 6, index: o }), s.removeAttribute(c));
        if (Pe.test(s.tagName)) {
          const c = s.textContent.split($), f = c.length - 1;
          if (f > 0) {
            s.textContent = q ? q.emptyScript : "";
            for (let _ = 0; _ < f; _++) s.append(c[_], R()), S.nextNode(), a.push({ type: 2, index: ++o });
            s.append(c[f], R());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ce) a.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = s.data.indexOf($, c + 1)) !== -1; ) a.push({ type: 7, index: o }), c += $.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = C.createElement("template");
    return i.innerHTML = e, i;
  }
}
function N(r, e, t = r, i) {
  var n, l;
  if (e === O) return e;
  let s = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const o = j(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = N(r, s._$AS(r, e.values), s, i)), e;
}
class Ve {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? C).importNode(t, !0);
    S.currentNode = s;
    let o = S.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new F(o, o.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (d = new Ze(o, this, e)), this._$AV.push(d), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = S.nextNode(), n++);
    }
    return S.currentNode = C, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class F {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = N(this, e, t), j(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Be(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== p && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(C.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = D.createElement(ke(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const n = new Ve(s, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = ve.get(e.strings);
    return t === void 0 && ve.set(e.strings, t = new D(e)), t;
  }
  k(e) {
    te(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new F(this.O(R()), this.O(R()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = N(this, e, t, 0), n = !j(e) || e !== this._$AH && e !== O, n && (this._$AH = e);
    else {
      const l = e;
      let a, d;
      for (e = o[0], a = 0; a < o.length - 1; a++) d = N(this, l[i + a], t, a), d === O && (d = this._$AH[a]), n || (n = !j(d) || d !== this._$AH[a]), d === p ? e = p : e !== p && (e += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class qe extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class We extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Ke extends W {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = N(this, e, t, 0) ?? p) === O) return;
    const i = this._$AH, s = e === p && i !== p || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== p && (i === p || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ze {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    N(this, e);
  }
}
const Y = H.litHtmlPolyfillSupport;
Y == null || Y(D, F), (H.litHtmlVersions ?? (H.litHtmlVersions = [])).push("3.3.1");
const Je = (r, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new F(e.insertBefore(R(), o), o, void 0, t ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const E = globalThis;
class T extends M {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Je(t, this.renderRoot, this.renderOptions);
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
    return O;
  }
}
var Ae;
T._$litElement$ = !0, T.finalized = !0, (Ae = E.litElementHydrateSupport) == null || Ae.call(E, { LitElement: T });
const G = E.litElementPolyfillSupport;
G == null || G({ LitElement: T });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = (r) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, e);
  }) : customElements.define(r, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = { attribute: !0, type: String, converter: V, reflect: !1, hasChanged: ee }, Qe = (r = Ge, e, t) => {
  const { kind: i, metadata: s } = t;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(t.name, r), i === "accessor") {
    const { name: n } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, a, r);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, r, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = t;
    return function(l) {
      const a = this[n];
      e.call(this, l), this.requestUpdate(n, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function K(r) {
  return (e, t) => typeof t == "object" ? Qe(r, e, t) : ((i, s, o) => {
    const n = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Xe(r) {
  return K({ ...r, state: !0, attribute: !1 });
}
const et = Oe`
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

  .mode-label {
    margin-left: 4px;
    white-space: nowrap;
    display: inline;
  }

  @media (max-width: 600px) {
    .mode-label {
      display: none;
    }
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
`, tt = {
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
      errors: {
        missing_config: "Missing or invalid configuration: {key}",
        missing_entity: "Missing or invalid entity: {entity}"
      },
      version: "Version {version}"
    }
  }
}, it = {
  ui: tt
}, rt = {
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
        p1: "Famiglia con bambini, entrambi i genitori lavorano fuori casa durante il giorno",
        p2: "Famiglia con presenza fissa in casa durante la giornata",
        p3: "Famiglia che lavora con rientro per il pasto di mezzogiorno",
        p4: "Ufficio con utilizzo dal lunedì al venerdì",
        pN: "Personalizzato {program}"
      },
      errors: {
        missing_config: "Configurazione mancante o non valida: {key}",
        missing_entity: "Entità mancante o non valida: {entity}"
      },
      version: "Versione {version}"
    }
  }
}, st = {
  ui: rt
}, $e = {
  en: it,
  it: st
};
function ye(r, e) {
  return e.split(".").reduce((t, i) => t == null ? void 0 : t[i], r);
}
function m(r, e, t) {
  let i = ye($e[r], e) ?? ye($e.en, e) ?? e;
  return t && Object.keys(t).forEach((s) => {
    i = i.replace(`{${s}}`, t[s]);
  }), i;
}
function b(r, e, t = void 0) {
  var i;
  return e ? (i = r.states[e]) == null ? void 0 : i.state : t;
}
function ot(r, e = "en", t = 1) {
  return r === void 0 || isNaN(r) ? "n/a" : new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }).format(r);
}
function nt(r, e, t) {
  var s, o;
  if (!e || !t) return t ?? "n/a";
  const i = (o = (s = r.states[e]) == null ? void 0 : s.attributes) == null ? void 0 : o.unit_of_measurement;
  return i ? `${t} ${i}` : t;
}
function I(r, e, t = "en", i = 1) {
  const s = b(r, e), o = s !== void 0 ? parseFloat(s) : void 0, n = ot(o, t, i);
  return nt(r, e, n);
}
function xe(r, e = 0) {
  if (r === void 0) return e;
  if (typeof r == "number") return r;
  const t = parseFloat(r);
  return isNaN(t) ? e : t;
}
const u = {
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
        errors: {
          missing_config: "ui.card.sabiana_vmc.errors.missing_config",
          missing_entity: "ui.card.sabiana_vmc.errors.missing_entity"
        }
      }
    }
  }
};
var v = /* @__PURE__ */ ((r) => (r.Auto = "Auto", r.Program = "Program", r.Party = "Party", r.Holiday = "Holiday", r.Manual = "Manual", r))(v || {});
function ie(r) {
  return Object.values(v).includes(r) ? r : void 0;
}
function at(r) {
  switch (typeof r == "string" ? ie(r) : r) {
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
function lt(r) {
  switch (typeof r == "string" ? ie(r) : r) {
    case "Auto":
      return u.ui.card.sabiana_vmc.modes.auto;
    case "Manual":
      return u.ui.card.sabiana_vmc.modes.manual;
    case "Party":
      return u.ui.card.sabiana_vmc.modes.party;
    case "Program":
      return u.ui.card.sabiana_vmc.modes.program;
    case "Holiday":
      return u.ui.card.sabiana_vmc.modes.holiday;
    default:
      return "mdi:help-circle";
  }
}
function ct() {
  var h, c, f, _, x, re, se, oe, ne, ae, le, ce;
  if (!this.hass || !this.config)
    return k`<div>Caricamento...</div>`;
  if (typeof this.error == "string" && this.error.length > 0)
    return k`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  const r = this.hass.language, e = "0.9.16.1758319760506", t = b(this.hass, (h = this.entities) == null ? void 0 : h.model, "n/a"), i = b(this.hass, (c = this.entities) == null ? void 0 : c.power, "off") === "on", s = b(this.hass, (f = this.entities) == null ? void 0 : f.boost, "off") === "on", o = b(this.hass, (_ = this.entities) == null ? void 0 : _.bypass, "off") === "on", n = b(this.hass, (x = this.entities) == null ? void 0 : x.mode) || "", l = xe(b(this.hass, (re = this.entities) == null ? void 0 : re.program)), a = xe(b(this.hass, (se = this.entities) == null ? void 0 : se.fan_speed)), d = i && a > 0 ? "fan-anim" : "";
  return k`
<ha-card>
  <h1 class="header">
    <div class="name">
      Sabiana ${t}
    </div>
    <button class="power-button" 
      @click=${this.togglePower} 
      title=${i ? m(r, u.ui.card.sabiana_vmc.actions.power_off) : m(r, u.ui.card.sabiana_vmc.actions.power_on)}>
      <ha-icon class=${i ? "power-button-on" : "power-button-off"} icon="mdi:power"></ha-icon>
    </button>
  </h1>

  <div class="main-row">

    <div class="temps">
      <div>
        <div>${I(this.hass, (oe = this.entities) == null ? void 0 : oe.temp_in)}</div>
        <div class="label">${m(r, u.ui.card.sabiana_vmc.temperature.internal)}</div>
      </div>
      <div>
        <div>${I(this.hass, (ne = this.entities) == null ? void 0 : ne.temp_out)}</div>
        <div class="label">${m(r, u.ui.card.sabiana_vmc.temperature.external)}</div>
      </div>
      <div>
        <div>${I(this.hass, (ae = this.entities) == null ? void 0 : ae.temp_exhaust)}</div>
        <div class="label">${m(r, u.ui.card.sabiana_vmc.temperature.exhaust)}</div>
      </div>
      <div>
        <div>${I(this.hass, (le = this.entities) == null ? void 0 : le.temp_disposal)}</div>
        <div class="label">${m(r, u.ui.card.sabiana_vmc.temperature.disposal)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${d}"
        fill="currentColor"
        style="${a > 0 ? `animation-duration: ${dt(a)};` : ""}"
        viewBox="0 0 24 24"
        width="112" height="112">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-tooltip label="Boost">
        <ha-icon 
          class="${s ? "" : "hidden-element"}"
          icon="mdi:fan-plus">
        </ha-icon>
      </ha-tooltip>

      <ha-tooltip label="${b(this.hass, (ce = this.entities) == null ? void 0 : ce.bypass_mode)}">
        <ha-icon 
          class="${o ? "" : "hidden-element"}"
          icon="mdi:debug-step-over"
        </ha-icon>
      </ha-tooltip>

    </div>

  </div>  

  <div class="mode-selector">
    ${Object.keys(v).map((w) => k`
      <button
        aria-label="${w}"
        class="mode-button ${n === w ? "selected" : ""}"
        @click=${() => this.selectMode(ie(w))}
        ?disabled="${!i}">
        <ha-icon icon="${at(w)}"></ha-icon>
        <span class="mode-label">${m(r, lt(w))}</span>
      </button>
    `)}
  </div>

  <div
    class="speed-manual ${n !== v.Manual ? "hidden-element" : ""}">
    ${Array.from({ length: 4 }, (w, g) => k`
      <button 
        aria-label="${g}"
        class="speed-button ${a === g ? "selected" : ""}"
        @click=${() => this.setFanSpeed(g)}
        ?disabled="${!i}">
        <ha-icon icon="${ht(g)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${n !== v.Program ? "hidden-element" : ""}">
    ${Array.from({ length: 7 }, (w, g) => k`
      <button 
        aria-label="${we(r, g)}"
        title="${we(r, g)}"
        class="program-button ${l === g ? "selected" : ""}"
        @click=${() => this.setProgram(g)}
        ?disabled="${!i}">
        <ha-icon icon="mdi:numeric-${g + 1}"></ha-icon>
      </button>
      `)}
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${e}</div>
  </div>

</ha-card>
`;
}
function dt(r) {
  switch (r) {
    case 1:
      return "4s";
    case 2:
      return "2.8s";
    case 3:
      return "1.6s";
    case 4:
      return "1s";
    default:
      return "0s";
  }
}
function ht(r) {
  switch (r) {
    case 1:
      return "mdi:fan-speed-1";
    case 2:
      return "mdi:fan-speed-2";
    case 3:
      return "mdi:fan-speed-3";
    default:
      return "mdi:fan-off";
  }
}
function we(r, e) {
  switch (e) {
    case 0:
      return m(r, u.ui.card.sabiana_vmc.programs.p1);
    case 1:
      return m(r, u.ui.card.sabiana_vmc.programs.p2);
    case 2:
      return m(r, u.ui.card.sabiana_vmc.programs.p3);
    case 3:
      return m(r, u.ui.card.sabiana_vmc.programs.p4);
    default:
      return m(r, u.ui.card.sabiana_vmc.programs.pN, { program: `${e + 1}` });
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
  program: "number.@prefix@_vmc_timer_progr_selection",
  boost: "binary_sensor.@prefix@_blk1_boost_active",
  bypass: "binary_sensor.@prefix@_blk1_bypass_active",
  bypass_mode: "sensor.@prefix@_blk1_free_cooling_free_heating"
};
function ut(r) {
  const e = Object.entries(pt).map(([t, i]) => [
    t,
    i.replace("@prefix@", r)
  ]);
  return Object.fromEntries(e);
}
var mt = Object.defineProperty, ft = Object.getOwnPropertyDescriptor, B = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? ft(e, t) : e, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && mt(e, t, s), s;
};
let P = class extends T {
  constructor() {
    super(...arguments), this.render = ct;
  }
  setConfig(r) {
    var e;
    (!r.entity_prefix || typeof r.entity_prefix != "string" || r.entity_prefix.trim() === "") && (this.error = m(
      ((e = this.hass) == null ? void 0 : e.language) ?? "en",
      u.ui.card.sabiana_vmc.errors.missing_config,
      { key: "entity_prefix" }
    )), this.config = r;
  }
  updated(r) {
    var e, t, i;
    if (super.updated(r), r.has("config")) {
      if (!this.hass || !((e = this.config) != null && e.entity_prefix))
        return;
      this.entities = ut(this.config.entity_prefix);
      for (const [s, o] of Object.entries(this.entities))
        (t = this.hass) != null && t.states && (this.hass.states[o] || (this.error = m(
          ((i = this.hass) == null ? void 0 : i.language) ?? "en",
          u.ui.card.sabiana_vmc.errors.missing_entity,
          { entity: s }
        )));
    }
  }
  getCardSize() {
    return 3;
  }
  togglePower() {
    var r;
    (r = this.entities) != null && r.power && this.hass.callService("switch", "toggle", { entity_id: this.entities.power });
  }
  selectMode(r) {
    var t, i, s, o, n, l;
    if (!((t = this.entities) != null && t.mode) || !r) return;
    let e = "";
    switch (r) {
      case v.Manual:
        e = ((i = this.entities) == null ? void 0 : i.mode_command_manual) || "";
        break;
      case v.Holiday:
        e = ((s = this.entities) == null ? void 0 : s.mode_command_holiday) || "";
        break;
      case v.Party:
        e = ((o = this.entities) == null ? void 0 : o.mode_command_party) || "";
        break;
      case v.Program:
        e = ((n = this.entities) == null ? void 0 : n.mode_command_program) || "";
        break;
      default:
        e = ((l = this.entities) == null ? void 0 : l.mode_command_auto) || "";
        break;
    }
    e && this.hass.callService("switch", "toggle", { entity_id: e });
  }
  setFanSpeed(r) {
    var e, t;
    (e = this.entities) != null && e.fan_speed && this.hass.callService("number", "set_value", {
      entity_id: (t = this.entities) == null ? void 0 : t.fan_speed,
      value: r
    });
  }
  setProgram(r) {
    var e, t;
    (e = this.entities) != null && e.program && this.hass.callService("number", "set_value", {
      entity_id: (t = this.entities) == null ? void 0 : t.program,
      value: r
    });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
};
P.styles = et;
B([
  K({ attribute: !1 })
], P.prototype, "hass", 2);
B([
  K({ attribute: !1 })
], P.prototype, "config", 2);
B([
  K({ attribute: !1 })
], P.prototype, "entities", 2);
B([
  Xe()
], P.prototype, "error", 2);
P = B([
  Ye("sabiana-vmc-card")
], P);
export {
  P as SabianaVmcCard
};
