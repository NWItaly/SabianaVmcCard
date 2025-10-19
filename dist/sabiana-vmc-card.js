/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const q = globalThis, ee = q.ShadowRoot && (q.ShadyCSS === void 0 || q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, te = Symbol(), ge = /* @__PURE__ */ new WeakMap();
let ze = class {
  constructor(e, t, a) {
    if (this._$cssResult$ = !0, a !== te) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ee && e === void 0) {
      const a = t !== void 0 && t.length === 1;
      a && (e = ge.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && ge.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const je = (r) => new ze(typeof r == "string" ? r : r + "", void 0, te), Fe = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((a, i, o) => a + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new ze(t, r, te);
}, Be = (r, e) => {
  if (ee) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const a = document.createElement("style"), i = q.litNonce;
    i !== void 0 && a.setAttribute("nonce", i), a.textContent = t.cssText, r.appendChild(a);
  }
}, ve = ee ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const a of e.cssRules) t += a.cssText;
  return je(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: De, defineProperty: Le, getOwnPropertyDescriptor: Ie, getOwnPropertyNames: Ve, getOwnPropertySymbols: qe, getPrototypeOf: Ge } = Object, S = globalThis, ye = S.trustedTypes, We = ye ? ye.emptyScript : "", Z = S.reactiveElementPolyfillSupport, R = (r, e) => r, G = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? We : null;
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
} }, re = (r, e) => !De(r, e), $e = { attribute: !0, type: String, converter: G, reflect: !1, useDefault: !1, hasChanged: re };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let z = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = $e) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const a = Symbol(), i = this.getPropertyDescriptor(e, a, t);
      i !== void 0 && Le(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, a) {
    const { get: i, set: o } = Ie(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: i, set(s) {
      const l = i == null ? void 0 : i.call(this);
      o == null || o.call(this, s), this.requestUpdate(e, l, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? $e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(R("elementProperties"))) return;
    const e = Ge(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(R("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(R("properties"))) {
      const t = this.properties, a = [...Ve(t), ...qe(t)];
      for (const i of a) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [a, i] of t) this.elementProperties.set(a, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, a] of this.elementProperties) {
      const i = this._$Eu(t, a);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const i of a) t.unshift(ve(i));
    } else e !== void 0 && t.push(ve(e));
    return t;
  }
  static _$Eu(e, t) {
    const a = t.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const a of t.keys()) this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Be(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var a;
      return (a = t.hostConnected) == null ? void 0 : a.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var a;
      return (a = t.hostDisconnected) == null ? void 0 : a.call(t);
    });
  }
  attributeChangedCallback(e, t, a) {
    this._$AK(e, a);
  }
  _$ET(e, t) {
    var o;
    const a = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, a);
    if (i !== void 0 && a.reflect === !0) {
      const s = (((o = a.converter) == null ? void 0 : o.toAttribute) !== void 0 ? a.converter : G).toAttribute(t, a.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, s;
    const a = this.constructor, i = a._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = a.getPropertyOptions(i), n = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : G;
      this._$Em = i;
      const u = n.fromAttribute(t, l.type);
      this[i] = u ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, t, a) {
    var i;
    if (e !== void 0) {
      const o = this.constructor, s = this[e];
      if (a ?? (a = o.getPropertyOptions(e)), !((a.hasChanged ?? re)(s, t) || a.useDefault && a.reflect && s === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(o._$Eu(e, a)))) return;
      this.C(e, t, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: a, reflect: i, wrapped: o }, s) {
    a && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var a;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, s] of i) {
        const { wrapped: l } = s, n = this[o];
        l !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, s, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (a = this._$EO) == null || a.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(t)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((a) => {
      var i;
      return (i = a.hostUpdated) == null ? void 0 : i.call(a);
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
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[R("elementProperties")] = /* @__PURE__ */ new Map(), z[R("finalized")] = /* @__PURE__ */ new Map(), Z == null || Z({ ReactiveElement: z }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, W = j.trustedTypes, xe = W ? W.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Oe = "$lit$", A = `lit$${Math.random().toFixed(9).slice(2)}$`, Ne = "?" + A, Ke = `<${Ne}>`, M = document, B = () => M.createComment(""), D = (r) => r === null || typeof r != "object" && typeof r != "function", ae = Array.isArray, Ze = (r) => ae(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", J = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, we = /-->/g, Ae = />/g, E = RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Se = /'/g, Ee = /"/g, Ue = /^(?:script|style|textarea|title)$/i, Je = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), k = Je(1), O = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), ke = /* @__PURE__ */ new WeakMap(), C = M.createTreeWalker(M, 129);
function He(r, e) {
  if (!ae(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return xe !== void 0 ? xe.createHTML(e) : e;
}
const Ye = (r, e) => {
  const t = r.length - 1, a = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = H;
  for (let l = 0; l < t; l++) {
    const n = r[l];
    let u, _, p = -1, b = 0;
    for (; b < n.length && (s.lastIndex = b, _ = s.exec(n), _ !== null); ) b = s.lastIndex, s === H ? _[1] === "!--" ? s = we : _[1] !== void 0 ? s = Ae : _[2] !== void 0 ? (Ue.test(_[2]) && (i = RegExp("</" + _[2], "g")), s = E) : _[3] !== void 0 && (s = E) : s === E ? _[0] === ">" ? (s = i ?? H, p = -1) : _[1] === void 0 ? p = -2 : (p = s.lastIndex - _[2].length, u = _[1], s = _[3] === void 0 ? E : _[3] === '"' ? Ee : Se) : s === Ee || s === Se ? s = E : s === we || s === Ae ? s = H : (s = E, i = void 0);
    const g = s === E && r[l + 1].startsWith("/>") ? " " : "";
    o += s === H ? n + Ke : p >= 0 ? (a.push(u), n.slice(0, p) + Oe + n.slice(p) + A + g) : n + A + (p === -2 ? l : g);
  }
  return [He(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class L {
  constructor({ strings: e, _$litType$: t }, a) {
    let i;
    this.parts = [];
    let o = 0, s = 0;
    const l = e.length - 1, n = this.parts, [u, _] = Ye(e, t);
    if (this.el = L.createElement(u, a), C.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = C.nextNode()) !== null && n.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Oe)) {
          const b = _[s++], g = i.getAttribute(p).split(A), w = /([.?@])?(.*)/.exec(b);
          n.push({ type: 1, index: o, name: w[2], strings: g, ctor: w[1] === "." ? Xe : w[1] === "?" ? et : w[1] === "@" ? tt : K }), i.removeAttribute(p);
        } else p.startsWith(A) && (n.push({ type: 6, index: o }), i.removeAttribute(p));
        if (Ue.test(i.tagName)) {
          const p = i.textContent.split(A), b = p.length - 1;
          if (b > 0) {
            i.textContent = W ? W.emptyScript : "";
            for (let g = 0; g < b; g++) i.append(p[g], B()), C.nextNode(), n.push({ type: 2, index: ++o });
            i.append(p[b], B());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ne) n.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(A, p + 1)) !== -1; ) n.push({ type: 7, index: o }), p += A.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const a = M.createElement("template");
    return a.innerHTML = e, a;
  }
}
function N(r, e, t = r, a) {
  var s, l;
  if (e === O) return e;
  let i = a !== void 0 ? (s = t._$Co) == null ? void 0 : s[a] : t._$Cl;
  const o = D(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, t, a)), a !== void 0 ? (t._$Co ?? (t._$Co = []))[a] = i : t._$Cl = i), i !== void 0 && (e = N(r, i._$AS(r, e.values), i, a)), e;
}
class Qe {
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
    const { el: { content: t }, parts: a } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? M).importNode(t, !0);
    C.currentNode = i;
    let o = C.nextNode(), s = 0, l = 0, n = a[0];
    for (; n !== void 0; ) {
      if (s === n.index) {
        let u;
        n.type === 2 ? u = new I(o, o.nextSibling, this, e) : n.type === 1 ? u = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (u = new rt(o, this, e)), this._$AV.push(u), n = a[++l];
      }
      s !== (n == null ? void 0 : n.index) && (o = C.nextNode(), s++);
    }
    return C.currentNode = M, i;
  }
  p(e) {
    let t = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, t), t += a.strings.length - 2) : a._$AI(e[t])), t++;
  }
}
class I {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, a, i) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = a, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = N(this, e, t), D(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== O && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ze(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(M.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: a } = e, i = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = L.createElement(He(a.h, a.h[0]), this.options)), a);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(t);
    else {
      const s = new Qe(i, this), l = s.u(this.options);
      s.p(t), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = ke.get(e.strings);
    return t === void 0 && ke.set(e.strings, t = new L(e)), t;
  }
  k(e) {
    ae(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let a, i = 0;
    for (const o of e) i === t.length ? t.push(a = new I(this.O(B()), this.O(B()), this, this.options)) : a = t[i], a._$AI(o), i++;
    i < t.length && (this._$AR(a && a._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var a;
    for ((a = this._$AP) == null ? void 0 : a.call(this, !1, !0, t); e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
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
  constructor(e, t, a, i, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = o, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = h;
  }
  _$AI(e, t = this, a, i) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = N(this, e, t, 0), s = !D(e) || e !== this._$AH && e !== O, s && (this._$AH = e);
    else {
      const l = e;
      let n, u;
      for (e = o[0], n = 0; n < o.length - 1; n++) u = N(this, l[a + n], t, n), u === O && (u = this._$AH[n]), s || (s = !D(u) || u !== this._$AH[n]), u === h ? e = h : e !== h && (e += (u ?? "") + o[n + 1]), this._$AH[n] = u;
    }
    s && !i && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xe extends K {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class et extends K {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class tt extends K {
  constructor(e, t, a, i, o) {
    super(e, t, a, i, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = N(this, e, t, 0) ?? h) === O) return;
    const a = this._$AH, i = e === h && a !== h || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, o = e !== h && (a === h || i);
    i && this.element.removeEventListener(this.name, this, a), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class rt {
  constructor(e, t, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    N(this, e);
  }
}
const Y = j.litHtmlPolyfillSupport;
Y == null || Y(L, I), (j.litHtmlVersions ?? (j.litHtmlVersions = [])).push("3.3.1");
const at = (r, e, t) => {
  const a = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = a._$litPart$;
  if (i === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    a._$litPart$ = i = new I(e.insertBefore(B(), o), o, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class F extends z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = at(t, this.renderRoot, this.renderOptions);
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
var Te;
F._$litElement$ = !0, F.finalized = !0, (Te = P.litElementHydrateSupport) == null || Te.call(P, { LitElement: F });
const Q = P.litElementPolyfillSupport;
Q == null || Q({ LitElement: F });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it = (r) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, e);
  }) : customElements.define(r, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = { attribute: !0, type: String, converter: G, reflect: !1, hasChanged: re }, st = (r = ot, e, t) => {
  const { kind: a, metadata: i } = t;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), a === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(t.name, r), a === "accessor") {
    const { name: s } = t;
    return { set(l) {
      const n = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(s, n, r);
    }, init(l) {
      return l !== void 0 && this.C(s, void 0, r, l), l;
    } };
  }
  if (a === "setter") {
    const { name: s } = t;
    return function(l) {
      const n = this[s];
      e.call(this, l), this.requestUpdate(s, n, r);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function nt(r) {
  return (e, t) => typeof t == "object" ? st(r, e, t) : ((a, i, o) => {
    const s = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, a), s ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(r) {
  return nt({ ...r, state: !0, attribute: !1 });
}
const lt = Fe`
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

  .status-indicator .alert {
    color: var(--error-color, #d32f2f);
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
`, ct = {
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
        bypass_off: "Bypass mode is deactive",
        defrost_on: "Defrost cycle is active",
        defrost_off: "Defrost cycle is deactive",
        t1_probe_failure: "T1 probe failure",
        t2_probe_failure: "T2 probe failure",
        t3_probe_failure: "T3 probe failure",
        t4_probe_failure: "T4 probe failure",
        timekeeper_failure: "Timekeeper failure",
        frost_alarm_t1_probe: "Frost alarm",
        frost_alarm_t2_probe: "Frost alarm (T2 probe)",
        fireplace_alarm: "Fireplace alarm",
        pressure_transducer_failure: "Pressure transducer failure",
        filter_alarm: "Filter alarm",
        fans_failure: "Fans failure",
        rh_or_co2_sensor_failure: "RH or CO2 sensor failure",
        fan_thermic_input_alarm: "Fan thermic input alarm",
        pre_heating_alarm: "Pre Heating alarm",
        pre_frost_alarm_t2: "Pre frost alarm (T2)"
      },
      errors: {
        missing_config: "Missing or invalid configuration: {key}",
        missing_entity: "Missing or invalid entity: {entity}"
      },
      version: "Version {version}"
    }
  }
}, dt = {
  ui: ct
}, pt = {
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
        bypass_off: "La modalità Bypass è disattiva.",
        defrost_on: "Ciclo di scongelamento attivo.",
        defrost_off: "Ciclo di scongelamento disattiva.",
        t1_probe_failure: "Guasto sonda T1",
        t2_probe_failure: "Guasto sonda T2",
        t3_probe_failure: "Guasto sonda T3",
        t4_probe_failure: "Guasto sonda T4",
        timekeeper_failure: "Guasto orologio interno",
        frost_alarm_t1_probe: "Allarme gelo",
        frost_alarm_t2_probe: "Allarme gelo (sonda T2)",
        fireplace_alarm: "Allarme camino",
        pressure_transducer_failure: "Guasto trasduttore di pressione",
        filter_alarm: "Allarme filtro",
        fans_failure: "Guasto ventilatori",
        rh_or_co2_sensor_failure: "Guasto sensore UR o CO₂",
        fan_thermic_input_alarm: "Allarme ingresso termico ventilatore",
        pre_heating_alarm: "Allarme preriscaldamento",
        pre_frost_alarm_t2: "Preallarme gelo (T2)"
      },
      errors: {
        missing_config: "Configurazione mancante o non valida: {key}.",
        missing_entity: "Entità mancante o non valida: {entity}."
      },
      version: "Versione {version}"
    }
  }
}, ut = {
  ui: pt
}, Ce = {
  en: dt,
  it: ut
};
function Pe(r, e) {
  return e.split(".").reduce((t, a) => t == null ? void 0 : t[a], r);
}
function d(r, e, t) {
  let a = Pe(Ce[r], e) ?? Pe(Ce.en, e) ?? e;
  return t && Object.keys(t).forEach((i) => {
    a = a.replace(`{${i}}`, t[i]);
  }), a;
}
function f(r, e, t = void 0) {
  var a;
  return !r || !e ? t : (a = r.states[e]) == null ? void 0 : a.state;
}
function _t(r, e = "en", t = 1) {
  return r === void 0 || isNaN(r) ? "n/a" : new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }).format(r);
}
function ht(r, e, t) {
  var i, o;
  if (!r || !e || !t) return t ?? "n/a";
  const a = (o = (i = r.states[e]) == null ? void 0 : i.attributes) == null ? void 0 : o.unit_of_measurement;
  return a ? `${t} ${a}` : t;
}
function m(r, e) {
  var a;
  if (!r || !e) return !1;
  const t = (a = r.states[e]) == null ? void 0 : a.state;
  return t === "on" || t === "true" || t === !0;
}
function V(r, e, t = "en", a = 1) {
  const i = f(r, e), o = i !== void 0 ? parseFloat(i) : void 0, s = _t(o, t, a);
  return ht(r, e, s);
}
function X(r, e = 0) {
  if (r === void 0) return e;
  if (typeof r == "number") return r;
  const t = parseFloat(r);
  return isNaN(t) ? e : t;
}
const c = {
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
          bypass_off: "ui.card.sabiana_vmc.messages.bypass_off",
          defrost_on: "ui.card.sabiana_vmc.messages.defrost_on",
          defrost_off: "ui.card.sabiana_vmc.messages.defrost_off"
        },
        alerts: {
          t1_probe_failure: "ui.card.sabiana_vmc.messages.t1_probe_failure",
          t2_probe_failure: "ui.card.sabiana_vmc.messages.t2_probe_failure",
          t3_probe_failure: "ui.card.sabiana_vmc.messages.t3_probe_failure",
          t4_probe_failure: "ui.card.sabiana_vmc.messages.t4_probe_failure",
          timekeeper_failure: "ui.card.sabiana_vmc.messages.timekeeper_failure",
          frost_alarm_t1_probe: "ui.card.sabiana_vmc.messages.frost_alarm_t1_probe",
          frost_alarm_t2_probe: "ui.card.sabiana_vmc.messages.frost_alarm_t2_probe",
          fireplace_alarm: "ui.card.sabiana_vmc.messages.fireplace_alarm",
          pressure_transducer_failure: "ui.card.sabiana_vmc.messages.pressure_transducer_failure",
          filter_alarm: "ui.card.sabiana_vmc.messages.filter_alarm",
          fans_failure: "ui.card.sabiana_vmc.messages.fans_failure",
          rh_or_co2_sensor_failure: "ui.card.sabiana_vmc.messages.rh_or_co2_sensor_failure",
          fan_thermic_input_alarm: "ui.card.sabiana_vmc.messages.fan_thermic_input_alarm",
          pre_heating_alarm: "ui.card.sabiana_vmc.messages.pre_heating_alarm",
          pre_frost_alarm_t2: "ui.card.sabiana_vmc.messages.pre_frost_alarm_t2"
        },
        errors: {
          missing_config: "ui.card.sabiana_vmc.errors.missing_config",
          missing_entity: "ui.card.sabiana_vmc.errors.missing_entity"
        }
      }
    }
  }
};
var $ = /* @__PURE__ */ ((r) => (r.Auto = "Auto", r.Program = "Program", r.Party = "Party", r.Holiday = "Holiday", r.Manual = "Manual", r))($ || {});
function ie(r) {
  return Object.values($).includes(r) ? r : void 0;
}
function mt(r) {
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
function ft(r) {
  switch (typeof r == "string" ? ie(r) : r) {
    case "Auto":
      return c.ui.card.sabiana_vmc.modes.auto;
    case "Manual":
      return c.ui.card.sabiana_vmc.modes.manual;
    case "Party":
      return c.ui.card.sabiana_vmc.modes.party;
    case "Program":
      return c.ui.card.sabiana_vmc.modes.program;
    case "Holiday":
      return c.ui.card.sabiana_vmc.modes.holiday;
    default:
      return "mdi:help-circle";
  }
}
function bt() {
  var oe, se, ne, le, ce, de, pe, ue, _e, he, me, fe, be;
  if (!this.hass || !this.config)
    return k`<div>Caricamento...</div>`;
  if (typeof this.error == "string" && this.error.length > 0)
    return k`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  const r = this.hass.language, e = "0.10.19.1760909744649", t = f(this.hass, (oe = this.entities) == null ? void 0 : oe.model, "n/a"), a = f(this.hass, (se = this.entities) == null ? void 0 : se.power, "off") === "on", i = $t(this.hass, this.entities), o = f(this.hass, (ne = this.entities) == null ? void 0 : ne.boost, "off") === "on", s = o ? d(r, c.ui.card.sabiana_vmc.messages.boost_on) : d(r, c.ui.card.sabiana_vmc.messages.boost_off), l = f(this.hass, (le = this.entities) == null ? void 0 : le.bypass, "off") === "on", n = l ? d(r, c.ui.card.sabiana_vmc.messages.bypass_on) : d(r, c.ui.card.sabiana_vmc.messages.bypass_off), u = f(this.hass, (ce = this.entities) == null ? void 0 : ce.defrost, "off") === "on", _ = u ? d(r, c.ui.card.sabiana_vmc.messages.defrost_on) : d(r, c.ui.card.sabiana_vmc.messages.defrost_off), p = f(this.hass, (de = this.entities) == null ? void 0 : de.mode) || "", b = X(f(this.hass, (pe = this.entities) == null ? void 0 : pe.program)), g = X(f(this.hass, (ue = this.entities) == null ? void 0 : ue.fan_speed)), w = gt(X(f(this.hass, (_e = this.entities) == null ? void 0 : _e.duty_cycle_fan_1))), Re = a && w > 0 ? "fan-anim" : "";
  return k`
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
      title=${a ? d(r, c.ui.card.sabiana_vmc.actions.power_off) : d(r, c.ui.card.sabiana_vmc.actions.power_on)}>
      <ha-icon class=${a ? "power-button-on" : "power-button-off"} icon="mdi:power"></ha-icon>
    </button>
  </h1>

  <div class="main-row">

    <div class="temps">
      <div>
        <div>${V(this.hass, (he = this.entities) == null ? void 0 : he.temp_in)}</div>
        <div class="label">${d(r, c.ui.card.sabiana_vmc.temperature.internal)}</div>
      </div>
      <div>
        <div>${V(this.hass, (me = this.entities) == null ? void 0 : me.temp_out)}</div>
        <div class="label">${d(r, c.ui.card.sabiana_vmc.temperature.external)}</div>
      </div>
      <div>
        <div>${V(this.hass, (fe = this.entities) == null ? void 0 : fe.temp_exhaust)}</div>
        <div class="label">${d(r, c.ui.card.sabiana_vmc.temperature.exhaust)}</div>
      </div>
      <div>
        <div>${V(this.hass, (be = this.entities) == null ? void 0 : be.temp_disposal)}</div>
        <div class="label">${d(r, c.ui.card.sabiana_vmc.temperature.disposal)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${Re}"
        fill="currentColor"
        style="${w > 0 ? `animation-duration: ${vt(w)};` : ""}"
        viewBox="0 0 24 24"
        width="112" height="112">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-icon 
        class="${i.length > 0 ? "alert" : "hidden-element"}"
        title="${i}"
        icon="mdi:alert"
        @click="${() => this.openModal(i)}">
      </ha-icon>

      <ha-icon 
        class="${o ? "on" : "off"}"
        title="${s}"
        icon="mdi:fan-plus"
        @click="${() => this.openModal(s)}">
      </ha-icon>

      <ha-icon 
        class="${l ? "on" : "off"}"
        title="${n}"
        icon="mdi:debug-step-over"
        @click="${() => this.openModal(n)}">
      </ha-icon>

      <ha-icon 
        class="${u ? "on" : "off"}"
        title="${_}"
        icon="mdi:car-defrost-front"
        @click="${() => this.openModal(_)}">
      </ha-icon>

    </div>

  </div>  

  <div class="mode-selector">
    ${Object.keys($).map((y) => k`
      <button
        aria-label="${y}"
        class="mode-button ${p === y ? "selected" : ""}"
        @click=${() => this.selectMode(ie(y))}
        title="${d(r, ft(y))}"
        ?disabled="${!a}">
        <ha-icon icon="${mt(y)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="speed-manual ${p !== $.Manual ? "hidden-element" : ""}">
    ${Array.from({ length: 4 }, (y, v) => k`
      <button 
        aria-label="${v}"
        class="speed-button ${g === v ? "selected" : ""}"
        @click="${() => this.setFanSpeed(v)}"
        ?disabled="${!a}">
        <ha-icon icon="${yt(v)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${p !== $.Program ? "hidden-element" : ""}">
    ${Array.from({ length: 7 }, (y, v) => k`
      <button 
        aria-label="${Me(r, v)}"
        title="${Me(r, v)}"
        class="program-button ${b === v ? "selected" : ""}"
        @click="${() => this.setProgram(v)}"
        ?disabled="${!a}">
        <ha-icon icon="mdi:numeric-${v + 1}"></ha-icon>
      </button>
      `)}
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${e}</div>
  </div>

  ${this.modalMessage.length > 0 ? k`
    <div class="modal" @click="${this.closeModal}">
      <div class="modal-content" @click="${(y) => y.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <p style="white-space: pre-line">${this.modalMessage}</p>
      </div>
    </div>` : ""}

</ha-card>
`;
}
function gt(r) {
  const e = [
    { speed: 0, percent: 0 },
    { speed: 1, percent: 40 },
    { speed: 2, percent: 55 },
    { speed: 3, percent: 70 },
    { speed: 4, percent: 85 }
  ];
  let t = e[0], a = Math.abs(r - e[0].percent);
  for (let i = 1; i < e.length; i++) {
    const o = Math.abs(r - e[i].percent);
    o < a && (t = e[i], a = o);
  }
  return t.speed;
}
function vt(r) {
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
function yt(r) {
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
function Me(r, e) {
  switch (e) {
    case 0:
      return d(r, c.ui.card.sabiana_vmc.programs.p1);
    case 1:
      return d(r, c.ui.card.sabiana_vmc.programs.p2);
    case 2:
      return d(r, c.ui.card.sabiana_vmc.programs.p3);
    case 3:
      return d(r, c.ui.card.sabiana_vmc.programs.p4);
    default:
      return d(r, c.ui.card.sabiana_vmc.programs.pN, { program: `${e + 1}` });
  }
}
function $t(r, e) {
  let t = "";
  return t += m(r, e == null ? void 0 : e.t1_probe_failure) ? d(r.language, c.ui.card.sabiana_vmc.alerts.t1_probe_failure) + `
` : "", t += m(r, e == null ? void 0 : e.t2_probe_failure) ? d(r.language, c.ui.card.sabiana_vmc.alerts.t2_probe_failure) + `
` : "", t += m(r, e == null ? void 0 : e.t3_probe_failure) ? d(r.language, c.ui.card.sabiana_vmc.alerts.t3_probe_failure) + `
` : "", t += m(r, e == null ? void 0 : e.t4_probe_failure) ? d(r.language, c.ui.card.sabiana_vmc.alerts.t4_probe_failure) + `
` : "", t += m(r, e == null ? void 0 : e.timekeeper_failure) ? d(r.language, c.ui.card.sabiana_vmc.alerts.timekeeper_failure) + `
` : "", t += m(r, e == null ? void 0 : e.frost_alarm_t1_probe) ? d(r.language, c.ui.card.sabiana_vmc.alerts.frost_alarm_t1_probe) + `
` : "", t += m(r, e == null ? void 0 : e.frost_alarm_t2_probe) ? d(r.language, c.ui.card.sabiana_vmc.alerts.frost_alarm_t2_probe) + `
` : "", t += m(r, e == null ? void 0 : e.fireplace_alarm) ? d(r.language, c.ui.card.sabiana_vmc.alerts.fireplace_alarm) + `
` : "", t += m(r, e == null ? void 0 : e.pressure_transducer_failure) ? d(r.language, c.ui.card.sabiana_vmc.alerts.pressure_transducer_failure) + `
` : "", t += m(r, e == null ? void 0 : e.filter_alarm) ? d(r.language, c.ui.card.sabiana_vmc.alerts.filter_alarm) + `
` : "", t += m(r, e == null ? void 0 : e.fans_failure) ? d(r.language, c.ui.card.sabiana_vmc.alerts.fans_failure) + `
` : "", t += m(r, e == null ? void 0 : e.rh_or_co2_sensor_failure) ? d(r.language, c.ui.card.sabiana_vmc.alerts.rh_or_co2_sensor_failure) + `
` : "", t += m(r, e == null ? void 0 : e.fan_thermic_input_alarm) ? d(r.language, c.ui.card.sabiana_vmc.alerts.fan_thermic_input_alarm) + `
` : "", t += m(r, e == null ? void 0 : e.pre_heating_alarm) ? d(r.language, c.ui.card.sabiana_vmc.alerts.pre_heating_alarm) + `
` : "", t += m(r, e == null ? void 0 : e.pre_frost_alarm_t2) ? d(r.language, c.ui.card.sabiana_vmc.alerts.pre_frost_alarm_t2) + `
` : "", t;
}
const xt = {
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
  bypass_mode: "sensor.@prefix@_blk1_free_cooling_free_heating",
  defrost: "binary_sensor.@prefix@_blk1_defrost_cycle_active",
  t1_probe_failure: "binary_sensor.@prefix@_blk1_t1_probe_failure",
  t2_probe_failure: "binary_sensor.@prefix@_blk1_t2_probe_failure",
  t3_probe_failure: "binary_sensor.@prefix@_blk1_t3_probe_failure",
  t4_probe_failure: "binary_sensor.@prefix@_blk1_t4_probe_failure",
  timekeeper_failure: "binary_sensor.@prefix@_blk1_timekeeper_failure",
  frost_alarm_t1_probe: "binary_sensor.@prefix@_blk1_frost_alarm",
  frost_alarm_t2_probe: "binary_sensor.@prefix@_blk1_frost_alarm_t2_probe",
  fireplace_alarm: "binary_sensor.@prefix@_blk1_fireplace_alarm",
  pressure_transducer_failure: "binary_sensor.@prefix@_blk1_pressure_transducer_failure",
  filter_alarm: "binary_sensor.@prefix@_blk1_filter_alarm",
  fans_failure: "binary_sensor.@prefix@_blk1_fans_failure",
  rh_or_co2_sensor_failure: "binary_sensor.@prefix@_blk1_rh_or_co2_sensor_failure",
  fan_thermic_input_alarm: "binary_sensor.@prefix@_blk1_fan_thermic_input_alarm",
  pre_heating_alarm: "binary_sensor.@prefix@_blk1_pre_heating_alarm",
  pre_frost_alarm_t2: "binary_sensor.@prefix@_blk1_pre_frost_alarm_t2"
};
function wt(r) {
  const e = Object.entries(xt).map(([t, a]) => [
    t,
    a.replace("@prefix@", r)
  ]);
  return Object.fromEntries(e);
}
var At = Object.defineProperty, St = Object.getOwnPropertyDescriptor, T = (r, e, t, a) => {
  for (var i = a > 1 ? void 0 : a ? St(e, t) : e, o = r.length - 1, s; o >= 0; o--)
    (s = r[o]) && (i = (a ? s(e, t, i) : s(i)) || i);
  return a && i && At(e, t, i), i;
};
let x = class extends F {
  constructor() {
    super(...arguments), this.modalMessage = "", this.spinner = !1, this.render = bt;
  }
  setConfig(r) {
    var e;
    (!r.entity_prefix || typeof r.entity_prefix != "string" || r.entity_prefix.trim() === "") && (this.error = d(
      ((e = this.hass) == null ? void 0 : e.language) ?? "en",
      c.ui.card.sabiana_vmc.errors.missing_config,
      { key: "entity_prefix" }
    )), this.config = r;
  }
  updated(r) {
    var e, t, a, i, o;
    if (super.updated(r), r.has("config")) {
      if (!this.hass || !((e = this.config) != null && e.entity_prefix))
        return;
      this.entities = wt(this.config.entity_prefix);
      for (const [s, l] of Object.entries(this.entities))
        (t = this.hass) != null && t.states && (this.hass.states[l] || (this.error = d(
          ((a = this.hass) == null ? void 0 : a.language) ?? "en",
          c.ui.card.sabiana_vmc.errors.missing_entity,
          { entity: s }
        )));
    } else if (this.spinner && r.has("hass")) {
      const s = r.get("hass"), l = f(s, (i = this.entities) == null ? void 0 : i.mode), n = f(this.hass, (o = this.entities) == null ? void 0 : o.mode);
      l !== n && (console.log("La modalità di funzionamento è cambiata:", n), this.spinner = !1);
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
    var r;
    (r = this.entities) != null && r.power && this.hass.callService("switch", "toggle", { entity_id: this.entities.power });
  }
  selectMode(r) {
    var t, a, i, o, s, l;
    if (!((t = this.entities) != null && t.mode) || !r) return;
    let e = "";
    switch (r) {
      case $.Manual:
        e = ((a = this.entities) == null ? void 0 : a.mode_command_manual) || "";
        break;
      case $.Holiday:
        e = ((i = this.entities) == null ? void 0 : i.mode_command_holiday) || "";
        break;
      case $.Party:
        e = ((o = this.entities) == null ? void 0 : o.mode_command_party) || "";
        break;
      case $.Program:
        e = ((s = this.entities) == null ? void 0 : s.mode_command_program) || "";
        break;
      default:
        e = ((l = this.entities) == null ? void 0 : l.mode_command_auto) || "";
        break;
    }
    e && (this.hass.callService("switch", "toggle", { entity_id: e }), this.spinner = !0);
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
  //#endregion
  //#region Modale
  openModal(r) {
    this.modalMessage = r;
  }
  closeModal() {
    this.modalMessage = "";
  }
  //#endregion
};
x.styles = lt;
T([
  U()
], x.prototype, "hass", 2);
T([
  U()
], x.prototype, "config", 2);
T([
  U()
], x.prototype, "entities", 2);
T([
  U()
], x.prototype, "modalMessage", 2);
T([
  U()
], x.prototype, "error", 2);
T([
  U()
], x.prototype, "spinner", 2);
x = T([
  it("sabiana-vmc-card")
], x);
export {
  x as SabianaVmcCard
};
