/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, X = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ee = Symbol(), ue = /* @__PURE__ */ new WeakMap();
let Ce = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ee) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (X && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ue.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ue.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ne = (r) => new Ce(typeof r == "string" ? r : r + "", void 0, ee), ze = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new Ce(t, r, ee);
}, Ue = (r, e) => {
  if (X) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = L.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, me = X ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ne(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: He, defineProperty: Te, getOwnPropertyDescriptor: Re, getOwnPropertyNames: je, getOwnPropertySymbols: De, getPrototypeOf: Fe } = Object, y = globalThis, fe = y.trustedTypes, Be = fe ? fe.emptyScript : "", Z = y.reactiveElementPolyfillSupport, U = (r, e) => r, V = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Be : null;
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
} }, te = (r, e) => !He(r, e), _e = { attribute: !0, type: String, converter: V, reflect: !1, useDefault: !1, hasChanged: te };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let M = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = _e) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && Te(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = Re(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: s, set(n) {
      const c = s == null ? void 0 : s.call(this);
      o == null || o.call(this, n), this.requestUpdate(e, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? _e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const e = Fe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const t = this.properties, i = [...je(t), ...De(t)];
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
      for (const s of i) t.unshift(me(s));
    } else e !== void 0 && t.push(me(e));
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
    return Ue(e, this.constructor.elementStyles), e;
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
      const c = i.getPropertyOptions(s), a = typeof c.converter == "function" ? { fromAttribute: c.converter } : ((o = c.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? c.converter : V;
      this._$Em = s;
      const d = a.fromAttribute(t, c.type);
      this[s] = d ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i) {
    var s;
    if (e !== void 0) {
      const o = this.constructor, n = this[e];
      if (i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? te)(n, t) || i.useDefault && i.reflect && n === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
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
        const { wrapped: c } = n, a = this[o];
        c !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
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
const H = globalThis, q = H.trustedTypes, ge = q ? q.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Pe = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, ke = "?" + $, Ie = `<${ke}>`, C = document, R = () => C.createComment(""), j = (r) => r === null || typeof r != "object" && typeof r != "function", ie = Array.isArray, Le = (r) => ie(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, be = /-->/g, ve = />/g, A = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), $e = /'/g, ye = /"/g, Me = /^(?:script|style|textarea|title)$/i, Ve = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), k = Ve(1), O = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), xe = /* @__PURE__ */ new WeakMap(), S = C.createTreeWalker(C, 129);
function Oe(r, e) {
  if (!ie(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ge !== void 0 ? ge.createHTML(e) : e;
}
const qe = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = z;
  for (let c = 0; c < t; c++) {
    const a = r[c];
    let d, h, l = -1, f = 0;
    for (; f < a.length && (n.lastIndex = f, h = n.exec(a), h !== null); ) f = n.lastIndex, n === z ? h[1] === "!--" ? n = be : h[1] !== void 0 ? n = ve : h[2] !== void 0 ? (Me.test(h[2]) && (s = RegExp("</" + h[2], "g")), n = A) : h[3] !== void 0 && (n = A) : n === A ? h[0] === ">" ? (n = s ?? z, l = -1) : h[1] === void 0 ? l = -2 : (l = n.lastIndex - h[2].length, d = h[1], n = h[3] === void 0 ? A : h[3] === '"' ? ye : $e) : n === ye || n === $e ? n = A : n === be || n === ve ? n = z : (n = A, s = void 0);
    const _ = n === A && r[c + 1].startsWith("/>") ? " " : "";
    o += n === z ? a + Ie : l >= 0 ? (i.push(d), a.slice(0, l) + Pe + a.slice(l) + $ + _) : a + $ + (l === -2 ? c : _);
  }
  return [Oe(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class D {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const c = e.length - 1, a = this.parts, [d, h] = qe(e, t);
    if (this.el = D.createElement(d, i), S.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (s = S.nextNode()) !== null && a.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const l of s.getAttributeNames()) if (l.endsWith(Pe)) {
          const f = h[n++], _ = s.getAttribute(l).split($), x = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: o, name: x[2], strings: _, ctor: x[1] === "." ? Ke : x[1] === "?" ? Ze : x[1] === "@" ? Je : W }), s.removeAttribute(l);
        } else l.startsWith($) && (a.push({ type: 6, index: o }), s.removeAttribute(l));
        if (Me.test(s.tagName)) {
          const l = s.textContent.split($), f = l.length - 1;
          if (f > 0) {
            s.textContent = q ? q.emptyScript : "";
            for (let _ = 0; _ < f; _++) s.append(l[_], R()), S.nextNode(), a.push({ type: 2, index: ++o });
            s.append(l[f], R());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ke) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = s.data.indexOf($, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += $.length - 1;
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
  var n, c;
  if (e === O) return e;
  let s = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const o = j(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((c = s == null ? void 0 : s._$AO) == null || c.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = N(r, s._$AS(r, e.values), s, i)), e;
}
class We {
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
    let o = S.nextNode(), n = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let d;
        a.type === 2 ? d = new F(o, o.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (d = new Ye(o, this, e)), this._$AV.push(d), a = i[++c];
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
    e = N(this, e, t), j(e) ? e === p || e == null || e === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Le(e) ? this.k(e) : this._(e);
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
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = D.createElement(Oe(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const n = new We(s, this), c = n.u(this.options);
      n.p(t), this.T(c), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = xe.get(e.strings);
    return t === void 0 && xe.set(e.strings, t = new D(e)), t;
  }
  k(e) {
    ie(this._$AH) || (this._$AH = [], this._$AR());
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
      const c = e;
      let a, d;
      for (e = o[0], a = 0; a < o.length - 1; a++) d = N(this, c[i + a], t, a), d === O && (d = this._$AH[a]), n || (n = !j(d) || d !== this._$AH[a]), d === p ? e = p : e !== p && (e += (d ?? "") + o[a + 1]), this._$AH[a] = d;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ke extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === p ? void 0 : e;
  }
}
class Ze extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== p);
  }
}
class Je extends W {
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
class Ye {
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
const Ge = (r, e, t) => {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ge(t, this.renderRoot, this.renderOptions);
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
var Ee;
T._$litElement$ = !0, T.finalized = !0, (Ee = E.litElementHydrateSupport) == null || Ee.call(E, { LitElement: T });
const G = E.litElementPolyfillSupport;
G == null || G({ LitElement: T });
(E.litElementVersions ?? (E.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = (r) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, e);
  }) : customElements.define(r, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xe = { attribute: !0, type: String, converter: V, reflect: !1, hasChanged: te }, et = (r = Xe, e, t) => {
  const { kind: i, metadata: s } = t;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(t.name, r), i === "accessor") {
    const { name: n } = t;
    return { set(c) {
      const a = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(n, a, r);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, r, c), c;
    } };
  }
  if (i === "setter") {
    const { name: n } = t;
    return function(c) {
      const a = this[n];
      e.call(this, c), this.requestUpdate(n, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function K(r) {
  return (e, t) => typeof t == "object" ? et(r, e, t) : ((i, s, o) => {
    const n = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function tt(r) {
  return K({ ...r, state: !0, attribute: !1 });
}
const it = ze`
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
      errors: {
        missing_config: "Missing or invalid configuration: {key}",
        missing_entity: "Missing or invalid entity: {entity}"
      },
      version: "Version {version}"
    }
  }
}, st = {
  ui: rt
}, ot = {
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
}, nt = {
  ui: ot
}, we = {
  en: st,
  it: nt
};
function Ae(r, e) {
  return e.split(".").reduce((t, i) => t == null ? void 0 : t[i], r);
}
function m(r, e, t) {
  let i = Ae(we[r], e) ?? Ae(we.en, e) ?? e;
  return t && Object.keys(t).forEach((s) => {
    i = i.replace(`{${s}}`, t[s]);
  }), i;
}
function b(r, e, t = void 0) {
  var i;
  return e ? (i = r.states[e]) == null ? void 0 : i.state : t;
}
function at(r, e = "en", t = 1) {
  return r === void 0 || isNaN(r) ? "n/a" : new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }).format(r);
}
function ct(r, e, t) {
  var s, o;
  if (!e || !t) return t ?? "n/a";
  const i = (o = (s = r.states[e]) == null ? void 0 : s.attributes) == null ? void 0 : o.unit_of_measurement;
  return i ? `${t} ${i}` : t;
}
function I(r, e, t = "en", i = 1) {
  const s = b(r, e), o = s !== void 0 ? parseFloat(s) : void 0, n = at(o, t, i);
  return ct(r, e, n);
}
function Q(r, e = 0) {
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
function re(r) {
  return Object.values(v).includes(r) ? r : void 0;
}
function lt(r) {
  switch (typeof r == "string" ? re(r) : r) {
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
function dt(r) {
  switch (typeof r == "string" ? re(r) : r) {
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
function ht() {
  var l, f, _, x, se, oe, ne, ae, ce, le, de, he, pe;
  if (!this.hass || !this.config)
    return k`<div>Caricamento...</div>`;
  if (typeof this.error == "string" && this.error.length > 0)
    return k`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  const r = this.hass.language, e = "0.10.06.1759788596396", t = b(this.hass, (l = this.entities) == null ? void 0 : l.model, "n/a"), i = b(this.hass, (f = this.entities) == null ? void 0 : f.power, "off") === "on", s = b(this.hass, (_ = this.entities) == null ? void 0 : _.boost, "off") === "on", o = b(this.hass, (x = this.entities) == null ? void 0 : x.bypass, "off") === "on", n = b(this.hass, (se = this.entities) == null ? void 0 : se.mode) || "", c = Q(b(this.hass, (oe = this.entities) == null ? void 0 : oe.program)), a = Q(b(this.hass, (ne = this.entities) == null ? void 0 : ne.fan_speed)), d = pt(Q(b(this.hass, (ae = this.entities) == null ? void 0 : ae.duty_cycle_fan_1))), h = i && d > 0 ? "fan-anim" : "";
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
        <div>${I(this.hass, (ce = this.entities) == null ? void 0 : ce.temp_in)}</div>
        <div class="label">${m(r, u.ui.card.sabiana_vmc.temperature.internal)}</div>
      </div>
      <div>
        <div>${I(this.hass, (le = this.entities) == null ? void 0 : le.temp_out)}</div>
        <div class="label">${m(r, u.ui.card.sabiana_vmc.temperature.external)}</div>
      </div>
      <div>
        <div>${I(this.hass, (de = this.entities) == null ? void 0 : de.temp_exhaust)}</div>
        <div class="label">${m(r, u.ui.card.sabiana_vmc.temperature.exhaust)}</div>
      </div>
      <div>
        <div>${I(this.hass, (he = this.entities) == null ? void 0 : he.temp_disposal)}</div>
        <div class="label">${m(r, u.ui.card.sabiana_vmc.temperature.disposal)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${h}"
        fill="currentColor"
        style="${d > 0 ? `animation-duration: ${ut(d)};` : ""}"
        viewBox="0 0 24 24"
        width="112" height="112">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-icon 
        class="${s ? "" : "hidden-element"}"
        title="Boost"
        icon="mdi:fan-plus">
      </ha-icon>

      <ha-icon 
        class="${o ? "" : "hidden-element"}"
        icon="mdi:debug-step-over"
        title="${b(this.hass, (pe = this.entities) == null ? void 0 : pe.bypass_mode)}">
      </ha-icon>

    </div>

  </div>  

  <div class="mode-selector">
    ${Object.keys(v).map((w) => k`
      <button
        aria-label="${w}"
        class="mode-button ${n === w ? "selected" : ""}"
        @click=${() => this.selectMode(re(w))}
        title="${m(r, dt(w))}"
        ?disabled="${!i}">
        <ha-icon icon="${lt(w)}"></ha-icon>
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
        <ha-icon icon="${mt(g)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${n !== v.Program ? "hidden-element" : ""}">
    ${Array.from({ length: 7 }, (w, g) => k`
      <button 
        aria-label="${Se(r, g)}"
        title="${Se(r, g)}"
        class="program-button ${c === g ? "selected" : ""}"
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
function pt(r) {
  const e = [
    { speed: 0, percent: 0 },
    { speed: 1, percent: 40 },
    { speed: 2, percent: 55 },
    { speed: 3, percent: 70 },
    { speed: 4, percent: 85 }
  ];
  let t = e[0], i = Math.abs(r - e[0].percent);
  for (let s = 1; s < e.length; s++) {
    const o = Math.abs(r - e[s].percent);
    o < i && (t = e[s], i = o);
  }
  return t.speed;
}
function ut(r) {
  switch (r) {
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
function mt(r) {
  switch (r) {
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
function Se(r, e) {
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
const ft = {
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
function _t(r) {
  const e = Object.entries(ft).map(([t, i]) => [
    t,
    i.replace("@prefix@", r)
  ]);
  return Object.fromEntries(e);
}
var gt = Object.defineProperty, bt = Object.getOwnPropertyDescriptor, B = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? bt(e, t) : e, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && gt(e, t, s), s;
};
let P = class extends T {
  constructor() {
    super(...arguments), this.render = ht;
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
      this.entities = _t(this.config.entity_prefix);
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
    var t, i, s, o, n, c;
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
        e = ((c = this.entities) == null ? void 0 : c.mode_command_auto) || "";
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
P.styles = it;
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
  tt()
], P.prototype, "error", 2);
P = B([
  Qe("sabiana-vmc-card")
], P);
export {
  P as SabianaVmcCard
};
