/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, X = V.ShadowRoot && (V.ShadyCSS === void 0 || V.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), me = /* @__PURE__ */ new WeakMap();
let ke = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (X && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ne = (i) => new ke(typeof i == "string" ? i : i + "", void 0, ee), Ue = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((s, r, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new ke(t, i, ee);
}, He = (i, e) => {
  if (X) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), r = V.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = t.cssText, i.appendChild(s);
  }
}, fe = X ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Ne(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Te, defineProperty: Re, getOwnPropertyDescriptor: je, getOwnPropertyNames: Be, getOwnPropertySymbols: De, getPrototypeOf: Le } = Object, w = globalThis, _e = w.trustedTypes, Fe = _e ? _e.emptyScript : "", Z = w.reactiveElementPolyfillSupport, T = (i, e) => i, q = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? Fe : null;
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
} }, te = (i, e) => !Te(i, e), be = { attribute: !0, type: String, converter: q, reflect: !1, useDefault: !1, hasChanged: te };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = be) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(e, s, t);
      r !== void 0 && Re(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: r, set: o } = je(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: r, set(a) {
      const c = r == null ? void 0 : r.call(this);
      o == null || o.call(this, a), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? be;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties"))) return;
    const e = Le(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const t = this.properties, s = [...Be(t), ...De(t)];
      for (const r of s) this.createProperty(r, t[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, r] of t) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const r = this._$Eu(t, s);
      r !== void 0 && this._$Eh.set(r, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) t.unshift(fe(r));
    } else e !== void 0 && t.push(fe(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return He(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostConnected) == null ? void 0 : s.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var s;
      return (s = t.hostDisconnected) == null ? void 0 : s.call(t);
    });
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    var o;
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : q).toAttribute(t, s.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, a;
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const c = s.getPropertyOptions(r), n = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : q;
      this._$Em = r;
      const d = n.fromAttribute(t, c.type);
      this[r] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(r)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, s) {
    var r;
    if (e !== void 0) {
      const o = this.constructor, a = this[e];
      if (s ?? (s = o.getPropertyOptions(e)), !((s.hasChanged ?? te)(a, t) || s.useDefault && s.reflect && a === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: r, wrapped: o }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), o !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, a] of r) {
        const { wrapped: c } = a, n = this[o];
        c !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, a, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (s = this._$EO) == null || s.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((s) => {
      var r;
      return (r = s.hostUpdated) == null ? void 0 : r.call(s);
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
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[T("elementProperties")] = /* @__PURE__ */ new Map(), z[T("finalized")] = /* @__PURE__ */ new Map(), Z == null || Z({ ReactiveElement: z }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, W = R.trustedTypes, ge = W ? W.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Pe = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, Me = "?" + x, Ie = `<${Me}>`, P = document, B = () => P.createComment(""), D = (i) => i === null || typeof i != "object" && typeof i != "function", ie = Array.isArray, Ve = (i) => ie(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ve = /-->/g, $e = />/g, S = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ye = /'/g, xe = /"/g, ze = /^(?:script|style|textarea|title)$/i, qe = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), E = qe(1), O = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), we = /* @__PURE__ */ new WeakMap(), C = P.createTreeWalker(P, 129);
function Oe(i, e) {
  if (!ie(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ge !== void 0 ? ge.createHTML(e) : e;
}
const We = (i, e) => {
  const t = i.length - 1, s = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = H;
  for (let c = 0; c < t; c++) {
    const n = i[c];
    let d, p, l = -1, f = 0;
    for (; f < n.length && (a.lastIndex = f, p = a.exec(n), p !== null); ) f = a.lastIndex, a === H ? p[1] === "!--" ? a = ve : p[1] !== void 0 ? a = $e : p[2] !== void 0 ? (ze.test(p[2]) && (r = RegExp("</" + p[2], "g")), a = S) : p[3] !== void 0 && (a = S) : a === S ? p[0] === ">" ? (a = r ?? H, l = -1) : p[1] === void 0 ? l = -2 : (l = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? S : p[3] === '"' ? xe : ye) : a === xe || a === ye ? a = S : a === ve || a === $e ? a = H : (a = S, r = void 0);
    const _ = a === S && i[c + 1].startsWith("/>") ? " " : "";
    o += a === H ? n + Ie : l >= 0 ? (s.push(d), n.slice(0, l) + Pe + n.slice(l) + x + _) : n + x + (l === -2 ? c : _);
  }
  return [Oe(i, o + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class L {
  constructor({ strings: e, _$litType$: t }, s) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const c = e.length - 1, n = this.parts, [d, p] = We(e, t);
    if (this.el = L.createElement(d, s), C.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (r = C.nextNode()) !== null && n.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const l of r.getAttributeNames()) if (l.endsWith(Pe)) {
          const f = p[a++], _ = r.getAttribute(l).split(x), A = /([.?@])?(.*)/.exec(f);
          n.push({ type: 1, index: o, name: A[2], strings: _, ctor: A[1] === "." ? Ze : A[1] === "?" ? Je : A[1] === "@" ? Ye : K }), r.removeAttribute(l);
        } else l.startsWith(x) && (n.push({ type: 6, index: o }), r.removeAttribute(l));
        if (ze.test(r.tagName)) {
          const l = r.textContent.split(x), f = l.length - 1;
          if (f > 0) {
            r.textContent = W ? W.emptyScript : "";
            for (let _ = 0; _ < f; _++) r.append(l[_], B()), C.nextNode(), n.push({ type: 2, index: ++o });
            r.append(l[f], B());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Me) n.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = r.data.indexOf(x, l + 1)) !== -1; ) n.push({ type: 7, index: o }), l += x.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const s = P.createElement("template");
    return s.innerHTML = e, s;
  }
}
function N(i, e, t = i, s) {
  var a, c;
  if (e === O) return e;
  let r = s !== void 0 ? (a = t._$Co) == null ? void 0 : a[s] : t._$Cl;
  const o = D(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((c = r == null ? void 0 : r._$AO) == null || c.call(r, !1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, t, s)), s !== void 0 ? (t._$Co ?? (t._$Co = []))[s] = r : t._$Cl = r), r !== void 0 && (e = N(i, r._$AS(i, e.values), r, s)), e;
}
class Ke {
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
    const { el: { content: t }, parts: s } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? P).importNode(t, !0);
    C.currentNode = r;
    let o = C.nextNode(), a = 0, c = 0, n = s[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let d;
        n.type === 2 ? d = new F(o, o.nextSibling, this, e) : n.type === 1 ? d = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (d = new Ge(o, this, e)), this._$AV.push(d), n = s[++c];
      }
      a !== (n == null ? void 0 : n.index) && (o = C.nextNode(), a++);
    }
    return C.currentNode = P, r;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class F {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, s, r) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = N(this, e, t), D(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ve(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(P.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = L.createElement(Oe(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(t);
    else {
      const a = new Ke(r, this), c = a.u(this.options);
      a.p(t), this.T(c), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = we.get(e.strings);
    return t === void 0 && we.set(e.strings, t = new L(e)), t;
  }
  k(e) {
    ie(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, r = 0;
    for (const o of e) r === t.length ? t.push(s = new F(this.O(B()), this.O(B()), this, this.options)) : s = t[r], s._$AI(o), r++;
    r < t.length && (this._$AR(s && s._$AB.nextSibling, r), t.length = r);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, t); e !== this._$AB; ) {
      const r = e.nextSibling;
      e.remove(), e = r;
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
  constructor(e, t, s, r, o) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = m;
  }
  _$AI(e, t = this, s, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = N(this, e, t, 0), a = !D(e) || e !== this._$AH && e !== O, a && (this._$AH = e);
    else {
      const c = e;
      let n, d;
      for (e = o[0], n = 0; n < o.length - 1; n++) d = N(this, c[s + n], t, n), d === O && (d = this._$AH[n]), a || (a = !D(d) || d !== this._$AH[n]), d === m ? e = m : e !== m && (e += (d ?? "") + o[n + 1]), this._$AH[n] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ze extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class Je extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class Ye extends K {
  constructor(e, t, s, r, o) {
    super(e, t, s, r, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = N(this, e, t, 0) ?? m) === O) return;
    const s = this._$AH, r = e === m && s !== m || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, o = e !== m && (s === m || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ge {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    N(this, e);
  }
}
const Y = R.litHtmlPolyfillSupport;
Y == null || Y(L, F), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.1");
const Qe = (i, e, t) => {
  const s = (t == null ? void 0 : t.renderBefore) ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    s._$litPart$ = r = new F(e.insertBefore(B(), o), o, void 0, t ?? {});
  }
  return r._$AI(i), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis;
class j extends z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Qe(t, this.renderRoot, this.renderOptions);
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
var Ce;
j._$litElement$ = !0, j.finalized = !0, (Ce = k.litElementHydrateSupport) == null || Ce.call(k, { LitElement: j });
const G = k.litElementPolyfillSupport;
G == null || G({ LitElement: j });
(k.litElementVersions ?? (k.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xe = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const et = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: te }, tt = (i = et, e, t) => {
  const { kind: s, metadata: r } = t;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(t.name, i), s === "accessor") {
    const { name: a } = t;
    return { set(c) {
      const n = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, n, i);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, i, c), c;
    } };
  }
  if (s === "setter") {
    const { name: a } = t;
    return function(c) {
      const n = this[a];
      e.call(this, c), this.requestUpdate(a, n, i);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function it(i) {
  return (e, t) => typeof t == "object" ? tt(i, e, t) : ((s, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(i) {
  return it({ ...i, state: !0, attribute: !1 });
}
const st = Ue`
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

  /* Stili per la modale */
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

  /* Stili per lo Spinner */
  .spinner {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: 8px;
  }

  .spinner ha-icon {
    animation: spin 1s linear infinite;
    width: 48px;
    height: 48px;
    color: var(--primary-color);
  }

  @keyframes spin {
    0%   { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
  }
`, rt = {
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
}, ot = {
  ui: rt
}, at = {
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
}, nt = {
  ui: at
}, Ae = {
  en: ot,
  it: nt
};
function Se(i, e) {
  return e.split(".").reduce((t, s) => t == null ? void 0 : t[s], i);
}
function u(i, e, t) {
  let s = Se(Ae[i], e) ?? Se(Ae.en, e) ?? e;
  return t && Object.keys(t).forEach((r) => {
    s = s.replace(`{${r}}`, t[r]);
  }), s;
}
function b(i, e, t = void 0) {
  var s;
  return !i || !e ? t : (s = i.states[e]) == null ? void 0 : s.state;
}
function ct(i, e = "en", t = 1) {
  return i === void 0 || isNaN(i) ? "n/a" : new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }).format(i);
}
function lt(i, e, t) {
  var r, o;
  if (!i || !e || !t) return t ?? "n/a";
  const s = (o = (r = i.states[e]) == null ? void 0 : r.attributes) == null ? void 0 : o.unit_of_measurement;
  return s ? `${t} ${s}` : t;
}
function I(i, e, t = "en", s = 1) {
  const r = b(i, e), o = r !== void 0 ? parseFloat(r) : void 0, a = ct(o, t, s);
  return lt(i, e, a);
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
          boost_off: "ui.card.sabiana_vmc.messages.boost_off",
          bypass_on: "ui.card.sabiana_vmc.messages.bypass_on",
          bypass_off: "ui.card.sabiana_vmc.messages.bypass_off"
        },
        errors: {
          missing_config: "ui.card.sabiana_vmc.errors.missing_config",
          missing_entity: "ui.card.sabiana_vmc.errors.missing_entity"
        }
      }
    }
  }
};
var $ = /* @__PURE__ */ ((i) => (i.Auto = "Auto", i.Program = "Program", i.Party = "Party", i.Holiday = "Holiday", i.Manual = "Manual", i))($ || {});
function se(i) {
  return Object.values($).includes(i) ? i : void 0;
}
function dt(i) {
  switch (typeof i == "string" ? se(i) : i) {
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
function ht(i) {
  switch (typeof i == "string" ? se(i) : i) {
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
function pt() {
  var _, A, re, oe, ae, ne, ce, le, de, he, pe, ue;
  if (!this.hass || !this.config)
    return E`<div>Caricamento...</div>`;
  if (typeof this.error == "string" && this.error.length > 0)
    return E`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  const i = this.hass.language, e = "0.10.18.1760741307853", t = b(this.hass, (_ = this.entities) == null ? void 0 : _.model, "n/a"), s = b(this.hass, (A = this.entities) == null ? void 0 : A.power, "off") === "on", r = b(this.hass, (re = this.entities) == null ? void 0 : re.boost, "off") === "on", o = r ? u(i, h.ui.card.sabiana_vmc.messages.boost_on) : u(i, h.ui.card.sabiana_vmc.messages.boost_off), a = b(this.hass, (oe = this.entities) == null ? void 0 : oe.bypass, "off") === "on", c = a ? u(i, h.ui.card.sabiana_vmc.messages.bypass_on) : u(i, h.ui.card.sabiana_vmc.messages.bypass_off), n = b(this.hass, (ae = this.entities) == null ? void 0 : ae.mode) || "", d = Q(b(this.hass, (ne = this.entities) == null ? void 0 : ne.program)), p = Q(b(this.hass, (ce = this.entities) == null ? void 0 : ce.fan_speed)), l = ut(Q(b(this.hass, (le = this.entities) == null ? void 0 : le.duty_cycle_fan_1))), f = s && l > 0 ? "fan-anim" : "";
  return E`
<ha-card>
  <div class="spinner ${this.spinner ? "" : "hidden-element"}">
    <ha-icon icon="mdi:loading"></ha-icon>
  </div>

  <h1 class="header">
    <div class="name">
      Sabiana ${t}
    </div>
    <button class="power-button" 
      @click=${this.togglePower} 
      title=${s ? u(i, h.ui.card.sabiana_vmc.actions.power_off) : u(i, h.ui.card.sabiana_vmc.actions.power_on)}>
      <ha-icon class=${s ? "power-button-on" : "power-button-off"} icon="mdi:power"></ha-icon>
    </button>
  </h1>

  <div class="main-row">

    <div class="temps">
      <div>
        <div>${I(this.hass, (de = this.entities) == null ? void 0 : de.temp_in)}</div>
        <div class="label">${u(i, h.ui.card.sabiana_vmc.temperature.internal)}</div>
      </div>
      <div>
        <div>${I(this.hass, (he = this.entities) == null ? void 0 : he.temp_out)}</div>
        <div class="label">${u(i, h.ui.card.sabiana_vmc.temperature.external)}</div>
      </div>
      <div>
        <div>${I(this.hass, (pe = this.entities) == null ? void 0 : pe.temp_exhaust)}</div>
        <div class="label">${u(i, h.ui.card.sabiana_vmc.temperature.exhaust)}</div>
      </div>
      <div>
        <div>${I(this.hass, (ue = this.entities) == null ? void 0 : ue.temp_disposal)}</div>
        <div class="label">${u(i, h.ui.card.sabiana_vmc.temperature.disposal)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${f}"
        fill="currentColor"
        style="${l > 0 ? `animation-duration: ${mt(l)};` : ""}"
        viewBox="0 0 24 24"
        width="112" height="112">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-icon 
        class="${r ? "on" : "off"}"
        title="${o}"
        icon="mdi:fan-plus"
        @click="${() => this.openModal(o)}">
      </ha-icon>

      <ha-icon 
        class="${a ? "on" : "off"}"
        title="${c}"
        icon="mdi:debug-step-over"
        @click="${() => this.openModal(c)}">
      </ha-icon>

    </div>

  </div>  

  <div class="mode-selector">
    ${Object.keys($).map((v) => E`
      <button
        aria-label="${v}"
        class="mode-button ${n === v ? "selected" : ""}"
        @click=${() => this.selectMode(se(v))}
        title="${u(i, ht(v))}"
        ?disabled="${!s}">
        <ha-icon icon="${dt(v)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="speed-manual ${n !== $.Manual ? "hidden-element" : ""}">
    ${Array.from({ length: 4 }, (v, g) => E`
      <button 
        aria-label="${g}"
        class="speed-button ${p === g ? "selected" : ""}"
        @click="${() => this.setFanSpeed(g)}"
        ?disabled="${!s}">
        <ha-icon icon="${ft(g)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${n !== $.Program ? "hidden-element" : ""}">
    ${Array.from({ length: 7 }, (v, g) => E`
      <button 
        aria-label="${Ee(i, g)}"
        title="${Ee(i, g)}"
        class="program-button ${d === g ? "selected" : ""}"
        @click="${() => this.setProgram(g)}"
        ?disabled="${!s}">
        <ha-icon icon="mdi:numeric-${g + 1}"></ha-icon>
      </button>
      `)}
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${e}</div>
  </div>

  ${this.modalMessage.length > 0 ? E`
    <div class="modal" @click="${this.closeModal}">
      <div class="modal-content" @click="${(v) => v.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <p>${this.modalMessage}</p>
      </div>
    </div>` : ""}

</ha-card>
`;
}
function ut(i) {
  const e = [
    { speed: 0, percent: 0 },
    { speed: 1, percent: 40 },
    { speed: 2, percent: 55 },
    { speed: 3, percent: 70 },
    { speed: 4, percent: 85 }
  ];
  let t = e[0], s = Math.abs(i - e[0].percent);
  for (let r = 1; r < e.length; r++) {
    const o = Math.abs(i - e[r].percent);
    o < s && (t = e[r], s = o);
  }
  return t.speed;
}
function mt(i) {
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
function ft(i) {
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
function Ee(i, e) {
  switch (e) {
    case 0:
      return u(i, h.ui.card.sabiana_vmc.programs.p1);
    case 1:
      return u(i, h.ui.card.sabiana_vmc.programs.p2);
    case 2:
      return u(i, h.ui.card.sabiana_vmc.programs.p3);
    case 3:
      return u(i, h.ui.card.sabiana_vmc.programs.p4);
    default:
      return u(i, h.ui.card.sabiana_vmc.programs.pN, { program: `${e + 1}` });
  }
}
const _t = {
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
function bt(i) {
  const e = Object.entries(_t).map(([t, s]) => [
    t,
    s.replace("@prefix@", i)
  ]);
  return Object.fromEntries(e);
}
var gt = Object.defineProperty, vt = Object.getOwnPropertyDescriptor, M = (i, e, t, s) => {
  for (var r = s > 1 ? void 0 : s ? vt(e, t) : e, o = i.length - 1, a; o >= 0; o--)
    (a = i[o]) && (r = (s ? a(e, t, r) : a(r)) || r);
  return s && r && gt(e, t, r), r;
};
let y = class extends j {
  constructor() {
    super(...arguments), this.modalMessage = "", this.spinner = !1, this.render = pt;
  }
  setConfig(i) {
    var e;
    (!i.entity_prefix || typeof i.entity_prefix != "string" || i.entity_prefix.trim() === "") && (this.error = u(
      ((e = this.hass) == null ? void 0 : e.language) ?? "en",
      h.ui.card.sabiana_vmc.errors.missing_config,
      { key: "entity_prefix" }
    )), this.config = i;
  }
  updated(i) {
    var e, t, s, r, o;
    if (super.updated(i), i.has("config")) {
      if (!this.hass || !((e = this.config) != null && e.entity_prefix))
        return;
      this.entities = bt(this.config.entity_prefix);
      for (const [a, c] of Object.entries(this.entities))
        (t = this.hass) != null && t.states && (this.hass.states[c] || (this.error = u(
          ((s = this.hass) == null ? void 0 : s.language) ?? "en",
          h.ui.card.sabiana_vmc.errors.missing_entity,
          { entity: a }
        )));
    } else if (this.spinner && i.has("hass")) {
      const a = i.get("hass"), c = b(a, (r = this.entities) == null ? void 0 : r.mode), n = b(this.hass, (o = this.entities) == null ? void 0 : o.mode);
      c !== n && (console.log("La modalità di funzionamento è cambiata:", n), this.spinner = !1);
    }
  }
  getCardSize() {
    return 3;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  //#region User actions
  togglePower() {
    var i;
    (i = this.entities) != null && i.power && this.hass.callService("switch", "toggle", { entity_id: this.entities.power });
  }
  selectMode(i) {
    var t, s, r, o, a, c;
    if (!((t = this.entities) != null && t.mode) || !i) return;
    let e = "";
    switch (i) {
      case $.Manual:
        e = ((s = this.entities) == null ? void 0 : s.mode_command_manual) || "";
        break;
      case $.Holiday:
        e = ((r = this.entities) == null ? void 0 : r.mode_command_holiday) || "";
        break;
      case $.Party:
        e = ((o = this.entities) == null ? void 0 : o.mode_command_party) || "";
        break;
      case $.Program:
        e = ((a = this.entities) == null ? void 0 : a.mode_command_program) || "";
        break;
      default:
        e = ((c = this.entities) == null ? void 0 : c.mode_command_auto) || "";
        break;
    }
    e && (this.hass.callService("switch", "toggle", { entity_id: e }), this.spinner = !0);
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
  //#endregion
  //#region Modale
  openModal(i) {
    this.modalMessage = i;
  }
  closeModal() {
    this.modalMessage = "";
  }
  //#endregion
};
y.styles = st;
M([
  U()
], y.prototype, "hass", 2);
M([
  U()
], y.prototype, "config", 2);
M([
  U()
], y.prototype, "entities", 2);
M([
  U()
], y.prototype, "modalMessage", 2);
M([
  U()
], y.prototype, "error", 2);
M([
  U()
], y.prototype, "spinner", 2);
y = M([
  Xe("sabiana-vmc-card")
], y);
export {
  y as SabianaVmcCard
};
