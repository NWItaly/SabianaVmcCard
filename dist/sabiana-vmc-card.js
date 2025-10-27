/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, ie = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, se = Symbol(), Ee = /* @__PURE__ */ new WeakMap();
let De = class {
  constructor(e, r, a) {
    if (this._$cssResult$ = !0, a !== se) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (ie && e === void 0) {
      const a = r !== void 0 && r.length === 1;
      a && (e = Ee.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && Ee.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const tt = (t) => new De(typeof t == "string" ? t : t + "", void 0, se), Le = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((a, i, o) => a + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[o + 1], t[0]);
  return new De(r, t, se);
}, rt = (t, e) => {
  if (ie) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const a = document.createElement("style"), i = Z.litNonce;
    i !== void 0 && a.setAttribute("nonce", i), a.textContent = r.cssText, t.appendChild(a);
  }
}, Ce = ie ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const a of e.cssRules) r += a.cssText;
  return tt(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: at, defineProperty: it, getOwnPropertyDescriptor: st, getOwnPropertyNames: ot, getOwnPropertySymbols: nt, getPrototypeOf: lt } = Object, C = globalThis, Me = C.trustedTypes, ct = Me ? Me.emptyScript : "", ee = C.reactiveElementPolyfillSupport, L = (t, e) => t, J = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ct : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, oe = (t, e) => !at(t, e), Pe = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: oe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), C.litPropertyMetadata ?? (C.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = Pe) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const a = Symbol(), i = this.getPropertyDescriptor(e, a, r);
      i !== void 0 && it(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, r, a) {
    const { get: i, set: o } = st(this.prototype, e) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: i, set(s) {
      const d = i == null ? void 0 : i.call(this);
      o == null || o.call(this, s), this.requestUpdate(e, d, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Pe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const e = lt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const r = this.properties, a = [...ot(r), ...nt(r)];
      for (const i of a) this.createProperty(i, r[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0) for (const [a, i] of r) this.elementProperties.set(a, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, a] of this.elementProperties) {
      const i = this._$Eu(r, a);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const a = new Set(e.flat(1 / 0).reverse());
      for (const i of a) r.unshift(Ce(i));
    } else e !== void 0 && r.push(Ce(e));
    return r;
  }
  static _$Eu(e, r) {
    const a = r.attribute;
    return a === !1 ? void 0 : typeof a == "string" ? a : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((r) => r(this));
  }
  addController(e) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((r = e.hostConnected) == null || r.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$EO) == null || r.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const a of r.keys()) this.hasOwnProperty(a) && (e.set(a, this[a]), delete this[a]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return rt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((r) => {
      var a;
      return (a = r.hostConnected) == null ? void 0 : a.call(r);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var a;
      return (a = r.hostDisconnected) == null ? void 0 : a.call(r);
    });
  }
  attributeChangedCallback(e, r, a) {
    this._$AK(e, a);
  }
  _$ET(e, r) {
    var o;
    const a = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, a);
    if (i !== void 0 && a.reflect === !0) {
      const s = (((o = a.converter) == null ? void 0 : o.toAttribute) !== void 0 ? a.converter : J).toAttribute(r, a.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, r) {
    var o, s;
    const a = this.constructor, i = a._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const d = a.getPropertyOptions(i), n = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : J;
      this._$Em = i;
      const u = n.fromAttribute(r, d.type);
      this[i] = u ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, r, a) {
    var i;
    if (e !== void 0) {
      const o = this.constructor, s = this[e];
      if (a ?? (a = o.getPropertyOptions(e)), !((a.hasChanged ?? oe)(s, r) || a.useDefault && a.reflect && s === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(o._$Eu(e, a)))) return;
      this.C(e, r, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: a, reflect: i, wrapped: o }, s) {
    a && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? r ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (r = void 0), this._$AL.set(e, r)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
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
        const { wrapped: d } = s, n = this[o];
        d !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, s, n);
      }
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (a = this._$EO) == null || a.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(r)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var r;
    (r = this._$EO) == null || r.forEach((a) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[L("elementProperties")] = /* @__PURE__ */ new Map(), O[L("finalized")] = /* @__PURE__ */ new Map(), ee == null || ee({ ReactiveElement: O }), (C.reactiveElementVersions ?? (C.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, Y = I.trustedTypes, Te = Y ? Y.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ie = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, Ve = "?" + E, dt = `<${Ve}>`, F = document, V = () => F.createComment(""), G = (t) => t === null || typeof t != "object" && typeof t != "function", ne = Array.isArray, pt = (t) => ne(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", te = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ze = /-->/g, Fe = />/g, P = RegExp(`>|${te}(?:([^\\s"'>=/]+)(${te}*=${te}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ne = /'/g, Oe = /"/g, Ge = /^(?:script|style|textarea|title)$/i, ut = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), x = ut(1), U = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), He = /* @__PURE__ */ new WeakMap(), T = F.createTreeWalker(F, 129);
function qe(t, e) {
  if (!ne(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Te !== void 0 ? Te.createHTML(e) : e;
}
const _t = (t, e) => {
  const r = t.length - 1, a = [];
  let i, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = D;
  for (let d = 0; d < r; d++) {
    const n = t[d];
    let u, m, p = -1, y = 0;
    for (; y < n.length && (s.lastIndex = y, m = s.exec(n), m !== null); ) y = s.lastIndex, s === D ? m[1] === "!--" ? s = ze : m[1] !== void 0 ? s = Fe : m[2] !== void 0 ? (Ge.test(m[2]) && (i = RegExp("</" + m[2], "g")), s = P) : m[3] !== void 0 && (s = P) : s === P ? m[0] === ">" ? (s = i ?? D, p = -1) : m[1] === void 0 ? p = -2 : (p = s.lastIndex - m[2].length, u = m[1], s = m[3] === void 0 ? P : m[3] === '"' ? Oe : Ne) : s === Oe || s === Ne ? s = P : s === ze || s === Fe ? s = D : (s = P, i = void 0);
    const v = s === P && t[d + 1].startsWith("/>") ? " " : "";
    o += s === D ? n + dt : p >= 0 ? (a.push(u), n.slice(0, p) + Ie + n.slice(p) + E + v) : n + E + (p === -2 ? d : v);
  }
  return [qe(t, o + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class q {
  constructor({ strings: e, _$litType$: r }, a) {
    let i;
    this.parts = [];
    let o = 0, s = 0;
    const d = e.length - 1, n = this.parts, [u, m] = _t(e, r);
    if (this.el = q.createElement(u, a), T.currentNode = this.el.content, r === 2 || r === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = T.nextNode()) !== null && n.length < d; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Ie)) {
          const y = m[s++], v = i.getAttribute(p).split(E), N = /([.?@])?(.*)/.exec(y);
          n.push({ type: 1, index: o, name: N[2], strings: v, ctor: N[1] === "." ? ft : N[1] === "?" ? ht : N[1] === "@" ? bt : Q }), i.removeAttribute(p);
        } else p.startsWith(E) && (n.push({ type: 6, index: o }), i.removeAttribute(p));
        if (Ge.test(i.tagName)) {
          const p = i.textContent.split(E), y = p.length - 1;
          if (y > 0) {
            i.textContent = Y ? Y.emptyScript : "";
            for (let v = 0; v < y; v++) i.append(p[v], V()), T.nextNode(), n.push({ type: 2, index: ++o });
            i.append(p[y], V());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ve) n.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(E, p + 1)) !== -1; ) n.push({ type: 7, index: o }), p += E.length - 1;
      }
      o++;
    }
  }
  static createElement(e, r) {
    const a = F.createElement("template");
    return a.innerHTML = e, a;
  }
}
function B(t, e, r = t, a) {
  var s, d;
  if (e === U) return e;
  let i = a !== void 0 ? (s = r._$Co) == null ? void 0 : s[a] : r._$Cl;
  const o = G(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((d = i == null ? void 0 : i._$AO) == null || d.call(i, !1), o === void 0 ? i = void 0 : (i = new o(t), i._$AT(t, r, a)), a !== void 0 ? (r._$Co ?? (r._$Co = []))[a] = i : r._$Cl = i), i !== void 0 && (e = B(t, i._$AS(t, e.values), i, a)), e;
}
class mt {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: r }, parts: a } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? F).importNode(r, !0);
    T.currentNode = i;
    let o = T.nextNode(), s = 0, d = 0, n = a[0];
    for (; n !== void 0; ) {
      if (s === n.index) {
        let u;
        n.type === 2 ? u = new W(o, o.nextSibling, this, e) : n.type === 1 ? u = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (u = new gt(o, this, e)), this._$AV.push(u), n = a[++d];
      }
      s !== (n == null ? void 0 : n.index) && (o = T.nextNode(), s++);
    }
    return T.currentNode = F, i;
  }
  p(e) {
    let r = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, r), r += a.strings.length - 2) : a._$AI(e[r])), r++;
  }
}
class W {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, r, a, i) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = a, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = B(this, e, r), G(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== U && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : pt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && G(this._$AH) ? this._$AA.nextSibling.data = e : this.T(F.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: r, _$litType$: a } = e, i = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = q.createElement(qe(a.h, a.h[0]), this.options)), a);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(r);
    else {
      const s = new mt(i, this), d = s.u(this.options);
      s.p(r), this.T(d), this._$AH = s;
    }
  }
  _$AC(e) {
    let r = He.get(e.strings);
    return r === void 0 && He.set(e.strings, r = new q(e)), r;
  }
  k(e) {
    ne(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let a, i = 0;
    for (const o of e) i === r.length ? r.push(a = new W(this.O(V()), this.O(V()), this, this.options)) : a = r[i], a._$AI(o), i++;
    i < r.length && (this._$AR(a && a._$AB.nextSibling, i), r.length = i);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var a;
    for ((a = this._$AP) == null ? void 0 : a.call(this, !1, !0, r); e !== this._$AB; ) {
      const i = e.nextSibling;
      e.remove(), e = i;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cv = e, (r = this._$AP) == null || r.call(this, e));
  }
}
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, a, i, o) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = r, this._$AM = i, this.options = o, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = h;
  }
  _$AI(e, r = this, a, i) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = B(this, e, r, 0), s = !G(e) || e !== this._$AH && e !== U, s && (this._$AH = e);
    else {
      const d = e;
      let n, u;
      for (e = o[0], n = 0; n < o.length - 1; n++) u = B(this, d[a + n], r, n), u === U && (u = this._$AH[n]), s || (s = !G(u) || u !== this._$AH[n]), u === h ? e = h : e !== h && (e += (u ?? "") + o[n + 1]), this._$AH[n] = u;
    }
    s && !i && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ft extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class ht extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class bt extends Q {
  constructor(e, r, a, i, o) {
    super(e, r, a, i, o), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = B(this, e, r, 0) ?? h) === U) return;
    const a = this._$AH, i = e === h && a !== h || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, o = e !== h && (a === h || i);
    i && this.element.removeEventListener(this.name, this, a), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class gt {
  constructor(e, r, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    B(this, e);
  }
}
const re = I.litHtmlPolyfillSupport;
re == null || re(q, W), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.3.1");
const vt = (t, e, r) => {
  const a = (r == null ? void 0 : r.renderBefore) ?? e;
  let i = a._$litPart$;
  if (i === void 0) {
    const o = (r == null ? void 0 : r.renderBefore) ?? null;
    a._$litPart$ = i = new W(e.insertBefore(V(), o), o, void 0, r ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = globalThis;
class H extends O {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const e = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = e.firstChild), e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = vt(r, this.renderRoot, this.renderOptions);
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
    return U;
  }
}
var je;
H._$litElement$ = !0, H.finalized = !0, (je = z.litElementHydrateSupport) == null || je.call(z, { LitElement: H });
const ae = z.litElementPolyfillSupport;
ae == null || ae({ LitElement: H });
(z.litElementVersions ?? (z.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = (t) => (e, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: oe }, $t = (t = yt, e, r) => {
  const { kind: a, metadata: i } = r;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), a === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(r.name, t), a === "accessor") {
    const { name: s } = r;
    return { set(d) {
      const n = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(s, n, t);
    }, init(d) {
      return d !== void 0 && this.C(s, void 0, t, d), d;
    } };
  }
  if (a === "setter") {
    const { name: s } = r;
    return function(d) {
      const n = this[s];
      e.call(this, d), this.requestUpdate(s, n, t);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function R(t) {
  return (e, r) => typeof r == "object" ? $t(t, e, r) : ((a, i, o) => {
    const s = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, a), s ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(t, e, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function k(t) {
  return R({ ...t, state: !0, attribute: !1 });
}
const xt = Le`
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
    gap: 4px;
    min-width: 60px;          /* opzionale: larghezza minima delle temperature */
    flex: 1;
  }

  .temps div {
    display: flex;
    align-items: center;
    min-width: 60px;
    white-space: nowrap;
  }

  .temps ha-icon {
    font-size: 1.5em;
    cursor: pointer;
    padding-right: 8px;
  }

  /* Stili per l'indicatore di stato */
  .status-indicator {
    display: flex;
    flex-direction: column;
    gap: 4px;
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

  .status-indicator .warning {
    color: var(--wa-color-warning-fill-loud, #ff9342);
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

  /* Stili per la selezione dei giorni della modalità vacanza */
  .holiday-mode-days {
    
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
    width: 320px;
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
`, wt = {
  card: {
    sabiana_vmc: {
      title: "Sabiana VMC",
      temperature: {
        internal: "Internal",
        external: "External",
        flow: "Flow",
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
        temperature_in: "Extracted (stale) air temperature",
        temperature_out: "External air temperature",
        temperature_flow: "Supply air temperature",
        temperature_disposal: "Disposal air temperature",
        efficiency: "Heat recovery efficiency",
        boost_on: "Boost mode is active",
        boost_off: "Boost mode is deactive",
        bypass_on: "Bypass mode is active",
        bypass_off: "Bypass mode is deactive",
        defrost_on: "Defrost cycle is active",
        defrost_off: "Defrost cycle is deactive",
        no_alert: "No alerts",
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
        pre_frost_alarm_t2: "Pre frost alarm (T2)",
        holiday_mode_days_set: "Holiday mode days:",
        temp_for_free_cooling_set: "Free Cooling Temperature Setpoint (°C):",
        temp_for_free_heating_set: "Free Heating Temperature Setpoint (°C):",
        boost_time_set: "Boost/Party time (min):",
        filter_used: "Filter has been used for {days} days",
        filter_2_replace: "Replace filter in {days} days",
        filter_overdue: "Filter replacement overdue by {days} days",
        filter_life: "Filter life (days):",
        filter_reset: "Reset filter counter"
      },
      errors: {
        missing_config: "Missing or invalid configuration: {key}",
        missing_entity: "Missing or invalid entity: {entity}"
      },
      version: "Version {version}"
    }
  }
}, At = {
  ui: wt
}, St = {
  card: {
    sabiana_vmc: {
      title: "Sabiana VMC",
      temperature: {
        internal: "Interna",
        external: "Esterna",
        flow: "Mandata",
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
        temperature_in: "Temperatura aria viziata estratta",
        temperature_out: "Temperatura aria esterna",
        temperature_flow: "Temperatura aria di mandata",
        temperature_disposal: "Temperatura aria di smaltimento",
        efficiency: "Efficienza recupero di calore",
        boost_on: "La modalità Festa/Boost è attiva.",
        boost_off: "La modalità Festa/Boost è disattiva",
        bypass_on: "La modalità Bypass è attiva",
        bypass_off: "La modalità Bypass è disattiva",
        defrost_on: "Ciclo di scongelamento attivo",
        defrost_off: "Ciclo di scongelamento disattivo",
        no_alert: "Nessun allarme",
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
        pre_frost_alarm_t2: "Preallarme gelo (T2)",
        holiday_mode_days_set: "Giorni di modalità vacanza:",
        temp_for_free_cooling_set: "Valore di riferimento per il raffrescamento (°C):",
        temp_for_free_heating_set: "Valore di riferimento per il riscaldamento (°C):",
        boost_time_set: "Durata della modalità Festa/Boost (min):",
        filter_used: "I filtri sono in uso da {days} giorni",
        filter_2_replace: "Sostituire il filtro tra {days} giorni",
        filter_overdue: "Sostituzione del filtro in ritardo di {days} giorni",
        filter_life: "Vita utile dei filtri (giorni):",
        filter_reset: "Azzera contatore filtri"
      },
      errors: {
        missing_config: "Configurazione mancante o non valida: {key}.",
        missing_entity: "Entità mancante o non valida: {entity}."
      },
      version: "Versione {version}"
    }
  }
}, kt = {
  ui: St
}, Ue = {
  en: At,
  it: kt
};
function Be(t, e) {
  return e.split(".").reduce((r, a) => r == null ? void 0 : r[a], t);
}
function c(t, e, r) {
  let a = Be(Ue[t], e) ?? Be(Ue.en, e) ?? e;
  return r && Object.keys(r).forEach((i) => {
    a = a.replace(`{${i}}`, r[i]);
  }), a;
}
function _(t, e, r = void 0) {
  var a;
  return !t || !e ? r : (a = t.states[e]) == null ? void 0 : a.state;
}
function Et(t, e = "en", r = 1) {
  return t === void 0 || isNaN(t) ? "n/a" : new Intl.NumberFormat(e, {
    minimumFractionDigits: r,
    maximumFractionDigits: r
  }).format(t);
}
function Ct(t, e, r) {
  var i, o;
  if (!t || !e || !r) return r ?? "n/a";
  const a = (o = (i = t.states[e]) == null ? void 0 : i.attributes) == null ? void 0 : o.unit_of_measurement;
  return a ? `${r} ${a}` : r;
}
function b(t, e) {
  var a;
  if (!t || !e) return !1;
  const r = (a = t.states[e]) == null ? void 0 : a.state;
  return r === "on" || r === "true" || r === !0;
}
function K(t, e, r = "en", a = 1) {
  const i = _(t, e), o = i !== void 0 ? parseFloat(i) : void 0, s = Et(o, r, a);
  return Ct(t, e, s);
}
function g(t, e = 0) {
  if (t === void 0) return e;
  if (typeof t == "number") return t;
  const r = parseFloat(t);
  return isNaN(r) ? e : r;
}
const l = {
  ui: {
    card: {
      sabiana_vmc: {
        temperature: {
          internal: "ui.card.sabiana_vmc.temperature.internal",
          external: "ui.card.sabiana_vmc.temperature.external",
          flow: "ui.card.sabiana_vmc.temperature.flow",
          disposal: "ui.card.sabiana_vmc.temperature.disposal",
          efficiency: "ui.card.sabiana_vmc.temperature.efficiency"
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
          temperature_in: "ui.card.sabiana_vmc.messages.temperature_in",
          temperature_out: "ui.card.sabiana_vmc.messages.temperature_out",
          temperature_flow: "ui.card.sabiana_vmc.messages.temperature_flow",
          temperature_disposal: "ui.card.sabiana_vmc.messages.temperature_disposal",
          efficiency: "ui.card.sabiana_vmc.messages.efficiency",
          boost_on: "ui.card.sabiana_vmc.messages.boost_on",
          boost_off: "ui.card.sabiana_vmc.messages.boost_off",
          bypass_on: "ui.card.sabiana_vmc.messages.bypass_on",
          bypass_off: "ui.card.sabiana_vmc.messages.bypass_off",
          defrost_on: "ui.card.sabiana_vmc.messages.defrost_on",
          defrost_off: "ui.card.sabiana_vmc.messages.defrost_off",
          no_alert: "ui.card.sabiana_vmc.messages.no_alert",
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
          pre_frost_alarm_t2: "ui.card.sabiana_vmc.messages.pre_frost_alarm_t2",
          holiday_mode_days_set: "ui.card.sabiana_vmc.messages.holiday_mode_days_set",
          temp_for_free_cooling_set: "ui.card.sabiana_vmc.messages.temp_for_free_cooling_set",
          temp_for_free_heating_set: "ui.card.sabiana_vmc.messages.temp_for_free_heating_set",
          boost_time_set: "ui.card.sabiana_vmc.messages.boost_time_set",
          filter_used: "ui.card.sabiana_vmc.messages.filter_used",
          filter_2_replace: "ui.card.sabiana_vmc.messages.filter_2_replace",
          filter_overdue: "ui.card.sabiana_vmc.messages.filter_overdue",
          filter_life: "ui.card.sabiana_vmc.messages.filter_life",
          filter_reset: "ui.card.sabiana_vmc.messages.filter_reset"
        },
        errors: {
          missing_config: "ui.card.sabiana_vmc.errors.missing_config",
          missing_entity: "ui.card.sabiana_vmc.errors.missing_entity"
        }
      }
    }
  }
};
var A = /* @__PURE__ */ ((t) => (t.Auto = "Auto", t.Program = "Program", t.Party = "Party", t.Holiday = "Holiday", t.Manual = "Manual", t))(A || {});
function le(t) {
  return Object.values(A).includes(t) ? t : void 0;
}
function Mt(t) {
  switch (typeof t == "string" ? le(t) : t) {
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
function Pt(t) {
  switch (typeof t == "string" ? le(t) : t) {
    case "Auto":
      return l.ui.card.sabiana_vmc.modes.auto;
    case "Manual":
      return l.ui.card.sabiana_vmc.modes.manual;
    case "Party":
      return l.ui.card.sabiana_vmc.modes.party;
    case "Program":
      return l.ui.card.sabiana_vmc.modes.program;
    case "Holiday":
      return l.ui.card.sabiana_vmc.modes.holiday;
    default:
      return "mdi:help-circle";
  }
}
var Tt = Object.defineProperty, zt = Object.getOwnPropertyDescriptor, j = (t, e, r, a) => {
  for (var i = a > 1 ? void 0 : a ? zt(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (a ? s(e, r, i) : s(i)) || i);
  return a && i && Tt(e, r, i), i;
};
let M = class extends H {
  constructor() {
    super(...arguments), this.value = 0, this.min = 0, this.max = 100, this.step = 1, this.label = "";
  }
  handleInput(t) {
    const e = Number(t.target.value);
    this.value = e, this.dispatchEvent(new CustomEvent("value-changed", {
      detail: { value: e },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const t = (this.value - this.min) / (this.max - this.min) * 100;
    return x`
      <div class="range-container">
        <div class="range-header">
          <span class="range-label">${this.label}</span>
          <span class="range-value">${this.value}</span>
        </div>
        <div class="range-wrapper">
          <div class="range-progress" style="width: ${t}%"></div>
          <input 
            type="range" 
            min="${this.min}" 
            max="${this.max}" 
            step="${this.step}"
            .value="${this.value}"
            @input="${this.handleInput}"
          >
        </div>
      </div>
    `;
  }
};
M.styles = Le`
    .range-container {
        display: flex;
        flex-direction: column;
    }

    .range-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .range-label {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color, #e1e1e1);
    }

    .range-value {
        font-size: 14px;
        color: var(--primary-color, #03a9f4);
        font-weight: 500;
    }
    
    .range-wrapper {
        position: relative;
    }

    .range-progress {
        position: absolute;
        height: 4px;
        background: var(--primary-color);
        border-radius: 2px 0 0 2px;
        pointer-events: none;
        top: 18px;
        left: 0;
        transition: width 0.1s ease;
    }

    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 40px;
        background: transparent;
        cursor: pointer;
        margin: 0;
    }

    /* Track */
    input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        background: var(--disabled-text-color, #6f6f6f);
        border-radius: 2px;
    }

    input[type="range"]::-moz-range-track {
        width: 100%;
        height: 4px;
        background: var(--disabled-text-color, #6f6f6f);
        border-radius: 2px;
    }

    /* Thumb */
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: var(--primary-color, #03a9f4);
        cursor: pointer;
        margin-top: -8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: transform 0.1s ease, box-shadow 0.1s ease;
    }

    input[type="range"]::-moz-range-thumb {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: var(--primary-color, #03a9f4);
        cursor: pointer;
        border: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: transform 0.1s ease, box-shadow 0.1s ease;
    }

    /* Hover e Active states */
    input[type="range"]:hover::-webkit-slider-thumb {
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }

    input[type="range"]:hover::-moz-range-thumb {
        transform: scale(1.1);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    }

    input[type="range"]:active::-webkit-slider-thumb {
        transform: scale(1.15);
    }

    input[type="range"]:active::-moz-range-thumb {
        transform: scale(1.15);
    } 
  `;
j([
  R({ type: Number })
], M.prototype, "value", 2);
j([
  R({ type: Number })
], M.prototype, "min", 2);
j([
  R({ type: Number })
], M.prototype, "max", 2);
j([
  R({ type: Number })
], M.prototype, "step", 2);
j([
  R({ type: String })
], M.prototype, "label", 2);
M = j([
  We("range-slider")
], M);
function Ft() {
  var ce, de, pe, ue, _e, me, fe, he, be, ge, ve, ye, $e, xe, we, Ae, Se, ke;
  if (!this.hass || !this.config)
    return x`<div>Caricamento...</div>`;
  if (typeof this.error == "string" && this.error.length > 0)
    return x`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  const t = this.hass.language, e = "0.10.23.1761545682033", r = _(this.hass, (ce = this.entities) == null ? void 0 : ce.model, "n/a"), a = _(this.hass, (de = this.entities) == null ? void 0 : de.power, "off") === "on", i = Rt(this.hass, t, this.entities), o = Ut(this.hass, this.entities), s = o || c(this.hass.language, l.ui.card.sabiana_vmc.messages.no_alert), d = _(this.hass, (pe = this.entities) == null ? void 0 : pe.boost, "off") === "on", n = d ? c(t, l.ui.card.sabiana_vmc.messages.boost_on) : c(t, l.ui.card.sabiana_vmc.messages.boost_off), u = _(this.hass, (ue = this.entities) == null ? void 0 : ue.bypass, "off") === "on", m = u ? c(t, l.ui.card.sabiana_vmc.messages.bypass_on) : c(t, l.ui.card.sabiana_vmc.messages.bypass_off), p = _(this.hass, (_e = this.entities) == null ? void 0 : _e.defrost, "off") === "on", y = p ? c(t, l.ui.card.sabiana_vmc.messages.defrost_on) : c(t, l.ui.card.sabiana_vmc.messages.defrost_off), v = _(this.hass, (me = this.entities) == null ? void 0 : me.mode) || "", N = g(_(this.hass, (fe = this.entities) == null ? void 0 : fe.program)), Ke = g(_(this.hass, (he = this.entities) == null ? void 0 : he.fan_speed)), X = Nt(g(_(this.hass, (be = this.entities) == null ? void 0 : be.duty_cycle_fan_1))), Ze = a && X > 0 ? "fan-anim" : "", Je = g(_(this.hass, (ge = this.entities) == null ? void 0 : ge.holiday_mode_days), 1), Ye = g(_(this.hass, (ve = this.entities) == null ? void 0 : ve.temp_for_free_cooling), 26), Qe = g(_(this.hass, (ye = this.entities) == null ? void 0 : ye.temp_for_free_heating), 20), Xe = g(_(this.hass, ($e = this.entities) == null ? void 0 : $e.boost_time), 180), et = g(_(this.hass, (xe = this.entities) == null ? void 0 : xe.filter_life), 180);
  return x`
<ha-card>
  <div class="spinner ${this.spinner ? "" : "hidden-element"}">
    <ha-icon icon="mdi:loading"></ha-icon>
  </div>

  <h1 class="header">
    <div class="name">
      Sabiana ${r}
    </div>
    <button class="power-button" 
      @click=${this.togglePower} 
      title=${a ? c(t, l.ui.card.sabiana_vmc.actions.power_off) : c(t, l.ui.card.sabiana_vmc.actions.power_on)}>
      <ha-icon class=${a ? "power-button-on" : "power-button-off"} icon="mdi:power"></ha-icon>
    </button>
  </h1>

  <div class="main-row">

    <div class="temps">
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.internal)}"
          icon="mdi:home-thermometer"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.temperature_in))}">
        </ha-icon>
        <div>${K(this.hass, (we = this.entities) == null ? void 0 : we.temp_in)}</div>
      </div>      
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.flow)}"
          icon="mdi:home-import-outline"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.temperature_flow))}">
        </ha-icon>
        <div>${K(this.hass, (Ae = this.entities) == null ? void 0 : Ae.temp_flow)}</div>
      </div>
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.efficiency)}"
          icon="mdi:swap-vertical"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.efficiency))}">
        </ha-icon>
        <div>${Bt(this.hass, this.entities)} %</div>
      </div>
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.disposal)}"
          icon="mdi:home-export-outline"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.temperature_disposal))}">
        </ha-icon>
        <div>${K(this.hass, (Se = this.entities) == null ? void 0 : Se.temp_disposal)}</div>
      </div>
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.external)}"
          icon="mdi:home-thermometer-outline"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.temperature_out))}">
        </ha-icon>
        <div>${K(this.hass, (ke = this.entities) == null ? void 0 : ke.temp_external)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${Ze}"
        fill="currentColor"
        style="${X > 0 ? `animation-duration: ${Ot(X)};` : ""}"
        viewBox="0 0 24 24"
        width="140" height="140">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-icon 
        class="${(o == null ? void 0 : o.length) > 0 ? "alert" : "off"}"
        title="${s}"
        icon="mdi:alert"
        @click="${() => this.openModal(s)}">
      </ha-icon>

      <ha-icon 
        class="${i.days <= 0 ? "alert" : i.days < 14 ? "warning" : "off"}"
        title="${i.title}"
        icon="mdi:air-filter"
        @click="${() => {
    this.modalFilterLife = !0, this.openModal(i.message);
  }}">
      </ha-icon>

      <ha-icon 
        class="${d ? "on" : "off"}"
        title="${n}"
        icon="mdi:fan-plus"
        @click="${() => {
    this.modalBoost = !0, this.openModal(n);
  }}">
      </ha-icon>

      <ha-icon 
        class="${u ? "on" : "off"}"
        title="${m}"
        icon="mdi:debug-step-over"
        @click="${() => {
    this.modalTemp4Bypass = !0, this.openModal(m);
  }}">
      </ha-icon>

      <ha-icon 
        class="${p ? "on" : "off"}"
        title="${y}"
        icon="mdi:car-defrost-front"
        @click="${() => this.openModal(y)}">
      </ha-icon>

    </div>

  </div>  

  <div class="mode-selector">
    ${Object.keys(A).map((f) => x`
      <button
        aria-label="${f}"
        class="mode-button ${v === f ? "selected" : ""}"
        @click=${() => this.selectMode(le(f))}
        title="${c(t, Pt(f))}"
        ?disabled="${!a}">
        <ha-icon icon="${Mt(f)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="speed-manual ${v !== A.Manual ? "hidden-element" : ""}">
    ${Array.from({ length: 4 }, (f, w) => x`
      <button 
        aria-label="${w}"
        class="speed-button ${Ke === w ? "selected" : ""}"
        @click="${() => this.setFanSpeed(w)}"
        ?disabled="${!a}">
        <ha-icon icon="${Ht(w)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${v !== A.Program ? "hidden-element" : ""}">
    ${Array.from({ length: 7 }, (f, w) => x`
      <button 
        aria-label="${Re(t, w)}"
        title="${Re(t, w)}"
        class="program-button ${N === w ? "selected" : ""}"
        @click="${() => this.setProgram(w)}"
        ?disabled="${!a}">
        <ha-icon icon="mdi:numeric-${w + 1}"></ha-icon>
      </button>
      `)}
  </div>

  <div
    class="holiday-mode-days ${v !== A.Holiday ? "hidden-element" : ""} range-container">
    <range-slider 
      label="${c(t, l.ui.card.sabiana_vmc.messages.holiday_mode_days_set)}" 
      .min="${1}" 
      .max="${60}"
      .value="${Je}"
      @value-changed="${(f) => this.setHolidayModeModeDays(f.detail.value)}"
      ></range-slider>
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${e}</div>
  </div>

  ${this.modalMessage.length > 0 ? x`
    <div class="modal" @click="${this.closeModal}">
      <div class="modal-content" @click="${(f) => f.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <p style="white-space: pre-line">${this.modalMessage}</p>

        ${this.modalTemp4Bypass ? x`
          <range-slider 
            label="${c(t, l.ui.card.sabiana_vmc.messages.temp_for_free_cooling_set)}" 
            .min="${10}" 
            .max="${35}"
            .value="${Ye}"
            @value-changed="${(f) => this.setTempForFreeCooling(f.detail.value)}"
            ></range-slider>

          <range-slider 
            label="${c(t, l.ui.card.sabiana_vmc.messages.temp_for_free_heating_set)}" 
            .min="${10}" 
            .max="${30}"
            .value="${Qe}"
            @value-changed="${(f) => this.setTempForFreeHeating(f.detail.value)}"
            ></range-slider>
        ` : ""}

        ${this.modalBoost ? x`
          <range-slider 
            label="${c(t, l.ui.card.sabiana_vmc.messages.boost_time_set)}" 
            .min="${15}" 
            .max="${240}"
            .value="${Xe}"
            @value-changed="${(f) => this.setBoostTime(f.detail.value)}"
            ></range-slider>
        ` : ""}

        ${this.modalFilterLife ? x`
          <range-slider 
            label="${c(t, l.ui.card.sabiana_vmc.messages.filter_life)}" 
            .min="${30}" 
            .max="${400}"
            .value="${et}"
            @value-changed="${(f) => this.setFilterLife(f.detail.value)}"
            ></range-slider>

          <div
            class="program-selection">
            <button 
              aria-label="${c(t, l.ui.card.sabiana_vmc.messages.filter_reset)}"
              title="${c(t, l.ui.card.sabiana_vmc.messages.filter_reset)}"
              class="program-button"
              @click="${() => this.resetFilterCounter()}">
              <ha-icon icon="mdi:filter-check"></ha-icon>
            </button>
          </div>
        ` : ""}

      </div>
    </div>` : ""}

</ha-card>
`;
}
function Nt(t) {
  const e = [
    { speed: 0, percent: 0 },
    { speed: 1, percent: 40 },
    { speed: 2, percent: 55 },
    { speed: 3, percent: 70 },
    { speed: 4, percent: 85 }
  ];
  let r = e[0], a = Math.abs(t - e[0].percent);
  for (let i = 1; i < e.length; i++) {
    const o = Math.abs(t - e[i].percent);
    o < a && (r = e[i], a = o);
  }
  return r.speed;
}
function Ot(t) {
  switch (t) {
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
function Ht(t) {
  switch (t) {
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
function Re(t, e) {
  switch (e) {
    case 0:
      return c(t, l.ui.card.sabiana_vmc.programs.p1);
    case 1:
      return c(t, l.ui.card.sabiana_vmc.programs.p2);
    case 2:
      return c(t, l.ui.card.sabiana_vmc.programs.p3);
    case 3:
      return c(t, l.ui.card.sabiana_vmc.programs.p4);
    default:
      return c(t, l.ui.card.sabiana_vmc.programs.pN, { program: `${e + 1}` });
  }
}
function Ut(t, e) {
  let r = "";
  const a = (i) => {
    r.length > 0 && (r += `
`), r += i;
  };
  return b(t, e == null ? void 0 : e.t1_probe_failure) && a(c(t.language, l.ui.card.sabiana_vmc.messages.t1_probe_failure)), b(t, e == null ? void 0 : e.t2_probe_failure) && a(c(t.language, l.ui.card.sabiana_vmc.messages.t2_probe_failure)), b(t, e == null ? void 0 : e.t3_probe_failure) && a(c(t.language, l.ui.card.sabiana_vmc.messages.t3_probe_failure)), b(t, e == null ? void 0 : e.t4_probe_failure) && a(c(t.language, l.ui.card.sabiana_vmc.messages.t4_probe_failure)), b(t, e == null ? void 0 : e.timekeeper_failure) && a(c(t.language, l.ui.card.sabiana_vmc.messages.timekeeper_failure)), b(t, e == null ? void 0 : e.frost_alarm_t1_probe) && a(c(t.language, l.ui.card.sabiana_vmc.messages.frost_alarm_t1_probe)), b(t, e == null ? void 0 : e.frost_alarm_t2_probe) && a(c(t.language, l.ui.card.sabiana_vmc.messages.frost_alarm_t2_probe)), b(t, e == null ? void 0 : e.fireplace_alarm) && a(c(t.language, l.ui.card.sabiana_vmc.messages.fireplace_alarm)), b(t, e == null ? void 0 : e.pressure_transducer_failure) && a(c(t.language, l.ui.card.sabiana_vmc.messages.pressure_transducer_failure)), b(t, e == null ? void 0 : e.filter_alarm) && a(c(t.language, l.ui.card.sabiana_vmc.messages.filter_alarm)), b(t, e == null ? void 0 : e.fans_failure) && a(c(t.language, l.ui.card.sabiana_vmc.messages.fans_failure)), b(t, e == null ? void 0 : e.rh_or_co2_sensor_failure) && a(c(t.language, l.ui.card.sabiana_vmc.messages.rh_or_co2_sensor_failure)), b(t, e == null ? void 0 : e.fan_thermic_input_alarm) && a(c(t.language, l.ui.card.sabiana_vmc.messages.fan_thermic_input_alarm)), b(t, e == null ? void 0 : e.pre_heating_alarm) && a(c(t.language, l.ui.card.sabiana_vmc.messages.pre_heating_alarm)), b(t, e == null ? void 0 : e.pre_frost_alarm_t2) && a(c(t.language, l.ui.card.sabiana_vmc.messages.pre_frost_alarm_t2)), r;
}
function Bt(t, e) {
  const r = g(_(t, e == null ? void 0 : e.temp_in)), a = g(_(t, e == null ? void 0 : e.temp_external)), i = g(_(t, e == null ? void 0 : e.temp_flow)), o = g(_(t, e == null ? void 0 : e.temp_disposal)), s = i - a, d = r - o;
  let n = 0;
  return isFinite(s) && isFinite(d) && Math.abs(d) > 0.5 && (a < r ? n = s / d * 100 : a > r && (n = -s / -d * 100), Math.abs(i - a) < 0.5 && (n = 0), n !== void 0 && (n = Math.max(0, Math.min(100, n)), n = Math.round(n))), n;
}
function Rt(t, e, r) {
  let a = { days: 0, title: "N/A", message: "" };
  const i = g(_(t, r == null ? void 0 : r.filter_counter)), o = g(_(t, r == null ? void 0 : r.filter_life));
  let s = 0;
  return isFinite(i) && isFinite(o) && o > 0 && (s = i * 15, s = s / 60, s = Math.round(s / 24), a.days = o - s), a.days < 0 ? a.title = c(e, l.ui.card.sabiana_vmc.messages.filter_overdue) : a.title = c(e, l.ui.card.sabiana_vmc.messages.filter_2_replace, { days: "" + a.days }), s > 0 && (a.message = c(e, l.ui.card.sabiana_vmc.messages.filter_used, { days: "" + s }) + `
`, a.message += a.title), a;
}
const jt = {
  model: "sensor.@prefix@_blk0_controller_model",
  temp_external: "sensor.@prefix@_blk1_temperature_t1",
  temp_in: "sensor.@prefix@_blk1_temperature_t3",
  temp_flow: "sensor.@prefix@_blk1_temperature_t2",
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
  pre_frost_alarm_t2: "binary_sensor.@prefix@_blk1_pre_frost_alarm_t2",
  holiday_mode_days: "number.@prefix@_vmc_holiday_mode_days",
  temp_for_free_cooling: "number.@prefix@_blk2_temp_for_free_cooling_set",
  temp_for_free_heating: "number.@prefix@_blk2_temp_for_free_heating_set",
  boost_time: "number.@prefix@_blk2_boost_time",
  filter_counter: "sensor.@prefix@_blk1_filter_counter_divided_by_15_minutes",
  filter_life: "number.@prefix@_blk2_filter_life",
  reset_filter_counter: "button.@prefix@_reset_filter_counter"
};
function Dt(t) {
  const e = Object.entries(jt).map(([r, a]) => [
    r,
    a.replace("@prefix@", t)
  ]);
  return Object.fromEntries(e);
}
var Lt = Object.defineProperty, It = Object.getOwnPropertyDescriptor, S = (t, e, r, a) => {
  for (var i = a > 1 ? void 0 : a ? It(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (i = (a ? s(e, r, i) : s(i)) || i);
  return a && i && Lt(e, r, i), i;
};
let $ = class extends H {
  constructor() {
    super(...arguments), this.modalMessage = "", this.spinner = !1, this.modalTemp4Bypass = !1, this.modalBoost = !1, this.modalFilterLife = !1, this.render = Ft;
  }
  setConfig(t) {
    var e;
    (!t.entity_prefix || typeof t.entity_prefix != "string" || t.entity_prefix.trim() === "") && (this.error = c(
      ((e = this.hass) == null ? void 0 : e.language) ?? "en",
      l.ui.card.sabiana_vmc.errors.missing_config,
      { key: "entity_prefix" }
    )), this.config = t;
  }
  updated(t) {
    var e, r, a, i, o;
    if (super.updated(t), t.has("config")) {
      if (!this.hass || !((e = this.config) != null && e.entity_prefix))
        return;
      this.entities = Dt(this.config.entity_prefix);
      for (const [s, d] of Object.entries(this.entities))
        (r = this.hass) != null && r.states && (this.hass.states[d] || (this.error = c(
          ((a = this.hass) == null ? void 0 : a.language) ?? "en",
          l.ui.card.sabiana_vmc.errors.missing_entity,
          { entity: s }
        )));
    } else if (this.spinner && t.has("hass")) {
      const s = t.get("hass"), d = _(s, (i = this.entities) == null ? void 0 : i.mode), n = _(this.hass, (o = this.entities) == null ? void 0 : o.mode);
      d !== n && (console.log("La modalità di funzionamento è cambiata:", n), this.spinner = !1);
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
    var t;
    (t = this.entities) != null && t.power && this.hass.callService("switch", "toggle", { entity_id: this.entities.power });
  }
  selectMode(t) {
    var r, a, i, o, s, d;
    if (!((r = this.entities) != null && r.mode) || !t) return;
    let e = "";
    switch (t) {
      case A.Manual:
        e = ((a = this.entities) == null ? void 0 : a.mode_command_manual) || "";
        break;
      case A.Holiday:
        e = ((i = this.entities) == null ? void 0 : i.mode_command_holiday) || "";
        break;
      case A.Party:
        e = ((o = this.entities) == null ? void 0 : o.mode_command_party) || "";
        break;
      case A.Program:
        e = ((s = this.entities) == null ? void 0 : s.mode_command_program) || "";
        break;
      default:
        e = ((d = this.entities) == null ? void 0 : d.mode_command_auto) || "";
        break;
    }
    e && (this.hass.callService("switch", "toggle", { entity_id: e }), this.spinner = !0);
  }
  setFanSpeed(t) {
    var e, r;
    (e = this.entities) != null && e.fan_speed && this.hass.callService("number", "set_value", {
      entity_id: (r = this.entities) == null ? void 0 : r.fan_speed,
      value: t
    });
  }
  setProgram(t) {
    var e, r;
    (e = this.entities) != null && e.program && this.hass.callService("number", "set_value", {
      entity_id: (r = this.entities) == null ? void 0 : r.program,
      value: t
    });
  }
  setHolidayModeModeDays(t) {
    var e, r;
    (e = this.entities) != null && e.holiday_mode_days && (t < 1 && (t = 1), t > 60 && (t = 60), this.hass.callService("number", "set_value", {
      entity_id: (r = this.entities) == null ? void 0 : r.holiday_mode_days,
      value: t
    }));
  }
  setTempForFreeCooling(t) {
    var e, r;
    (e = this.entities) != null && e.temp_for_free_cooling && (t < 10 && (t = 10), t > 35 && (t = 35), this.hass.callService("number", "set_value", {
      entity_id: (r = this.entities) == null ? void 0 : r.temp_for_free_cooling,
      value: t
    }));
  }
  setTempForFreeHeating(t) {
    var e, r;
    (e = this.entities) != null && e.temp_for_free_heating && (t < 10 && (t = 10), t > 30 && (t = 30), this.hass.callService("number", "set_value", {
      entity_id: (r = this.entities) == null ? void 0 : r.temp_for_free_heating,
      value: t
    }));
  }
  setBoostTime(t) {
    var e, r;
    (e = this.entities) != null && e.boost_time && (t < 15 && (t = 15), t > 240 && (t = 240), this.hass.callService("number", "set_value", {
      entity_id: (r = this.entities) == null ? void 0 : r.boost_time,
      value: t
    }));
  }
  setFilterLife(t) {
    var e, r;
    (e = this.entities) != null && e.filter_life && (t < 30 && (t = 30), t > 400 && (t = 400), this.hass.callService("number", "set_value", {
      entity_id: (r = this.entities) == null ? void 0 : r.filter_life,
      value: t
    }));
  }
  resetFilterCounter() {
    var t, e;
    (t = this.entities) != null && t.reset_filter_counter && this.hass.callService("button", "press", {
      entity_id: (e = this.entities) == null ? void 0 : e.reset_filter_counter
    });
  }
  //#endregion
  //#region Modale
  openModal(t) {
    this.modalMessage = t;
  }
  closeModal() {
    this.modalMessage = "", this.modalTemp4Bypass = !1, this.modalBoost = !1, this.modalFilterLife = !1;
  }
  //#endregion
};
$.styles = xt;
S([
  k()
], $.prototype, "hass", 2);
S([
  k()
], $.prototype, "config", 2);
S([
  k()
], $.prototype, "entities", 2);
S([
  k()
], $.prototype, "modalMessage", 2);
S([
  k()
], $.prototype, "error", 2);
S([
  k()
], $.prototype, "spinner", 2);
S([
  k()
], $.prototype, "modalTemp4Bypass", 2);
S([
  k()
], $.prototype, "modalBoost", 2);
S([
  k()
], $.prototype, "modalFilterLife", 2);
$ = S([
  We("sabiana-vmc-card")
], $);
export {
  $ as SabianaVmcCard
};
