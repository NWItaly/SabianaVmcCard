/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Q = globalThis, pe = Q.ShadowRoot && (Q.ShadyCSS === void 0 || Q.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ue = Symbol(), De = /* @__PURE__ */ new WeakMap();
let Ye = class {
  constructor(e, a, r) {
    if (this._$cssResult$ = !0, r !== ue) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (pe && e === void 0) {
      const r = a !== void 0 && a.length === 1;
      r && (e = De.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && De.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ut = (t) => new Ye(typeof t == "string" ? t : t + "", void 0, ue), ae = (t, ...e) => {
  const a = t.length === 1 ? t[0] : e.reduce((r, s, i) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[i + 1], t[0]);
  return new Ye(a, t, ue);
}, ht = (t, e) => {
  if (pe) t.adoptedStyleSheets = e.map((a) => a instanceof CSSStyleSheet ? a : a.styleSheet);
  else for (const a of e) {
    const r = document.createElement("style"), s = Q.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = a.cssText, t.appendChild(r);
  }
}, Be = pe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const r of e.cssRules) a += r.cssText;
  return ut(a);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _t, defineProperty: mt, getOwnPropertyDescriptor: ft, getOwnPropertyNames: gt, getOwnPropertySymbols: bt, getPrototypeOf: vt } = Object, P = globalThis, Le = P.trustedTypes, yt = Le ? Le.emptyScript : "", ne = P.reactiveElementPolyfillSupport, q = (t, e) => t, ee = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? yt : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let a = t;
  switch (e) {
    case Boolean:
      a = t !== null;
      break;
    case Number:
      a = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        a = JSON.parse(t);
      } catch {
        a = null;
      }
  }
  return a;
} }, he = (t, e) => !_t(t, e), je = { attribute: !0, type: String, converter: ee, reflect: !1, useDefault: !1, hasChanged: he };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), P.litPropertyMetadata ?? (P.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = je) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(e, r, a);
      s !== void 0 && mt(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, a, r) {
    const { get: s, set: i } = ft(this.prototype, e) ?? { get() {
      return this[a];
    }, set(o) {
      this[a] = o;
    } };
    return { get: s, set(o) {
      const d = s == null ? void 0 : s.call(this);
      i == null || i.call(this, o), this.requestUpdate(e, d, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? je;
  }
  static _$Ei() {
    if (this.hasOwnProperty(q("elementProperties"))) return;
    const e = vt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(q("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(q("properties"))) {
      const a = this.properties, r = [...gt(a), ...bt(a)];
      for (const s of r) this.createProperty(s, a[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const a = litPropertyMetadata.get(e);
      if (a !== void 0) for (const [r, s] of a) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [a, r] of this.elementProperties) {
      const s = this._$Eu(a, r);
      s !== void 0 && this._$Eh.set(s, a);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const a = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const s of r) a.unshift(Be(s));
    } else e !== void 0 && a.push(Be(e));
    return a;
  }
  static _$Eu(e, a) {
    const r = a.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((a) => this.enableUpdating = a), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((a) => a(this));
  }
  addController(e) {
    var a;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((a = e.hostConnected) == null || a.call(e));
  }
  removeController(e) {
    var a;
    (a = this._$EO) == null || a.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), a = this.constructor.elementProperties;
    for (const r of a.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ht(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((a) => {
      var r;
      return (r = a.hostConnected) == null ? void 0 : r.call(a);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((a) => {
      var r;
      return (r = a.hostDisconnected) == null ? void 0 : r.call(a);
    });
  }
  attributeChangedCallback(e, a, r) {
    this._$AK(e, r);
  }
  _$ET(e, a) {
    var i;
    const r = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, r);
    if (s !== void 0 && r.reflect === !0) {
      const o = (((i = r.converter) == null ? void 0 : i.toAttribute) !== void 0 ? r.converter : ee).toAttribute(a, r.type);
      this._$Em = e, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(e, a) {
    var i, o;
    const r = this.constructor, s = r._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const d = r.getPropertyOptions(s), l = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((i = d.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? d.converter : ee;
      this._$Em = s;
      const p = l.fromAttribute(a, d.type);
      this[s] = p ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, a, r) {
    var s;
    if (e !== void 0) {
      const i = this.constructor, o = this[e];
      if (r ?? (r = i.getPropertyOptions(e)), !((r.hasChanged ?? he)(o, a) || r.useDefault && r.reflect && o === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(i._$Eu(e, r)))) return;
      this.C(e, a, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, a, { useDefault: r, reflect: s, wrapped: i }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? a ?? this[e]), i !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (a = void 0), this._$AL.set(e, a)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (a) {
      Promise.reject(a);
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
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, o] of s) {
        const { wrapped: d } = o, l = this[i];
        d !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, o, l);
      }
    }
    let e = !1;
    const a = this._$AL;
    try {
      e = this.shouldUpdate(a), e ? (this.willUpdate(a), (r = this._$EO) == null || r.forEach((s) => {
        var i;
        return (i = s.hostUpdate) == null ? void 0 : i.call(s);
      }), this.update(a)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(a);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var a;
    (a = this._$EO) == null || a.forEach((r) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((a) => this._$ET(a, this[a]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[q("elementProperties")] = /* @__PURE__ */ new Map(), L[q("finalized")] = /* @__PURE__ */ new Map(), ne == null || ne({ ReactiveElement: L }), (P.reactiveElementVersions ?? (P.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, te = G.trustedTypes, Re = te ? te.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Qe = "$lit$", F = `lit$${Math.random().toFixed(9).slice(2)}$`, et = "?" + F, $t = `<${et}>`, B = document, J = () => B.createComment(""), K = (t) => t === null || typeof t != "object" && typeof t != "function", _e = Array.isArray, xt = (t) => _e(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", le = `[ 	
\f\r]`, V = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ie = /-->/g, We = />/g, N = RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ve = /'/g, qe = /"/g, tt = /^(?:script|style|textarea|title)$/i, wt = (t) => (e, ...a) => ({ _$litType$: t, strings: e, values: a }), f = wt(1), j = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Ge = /* @__PURE__ */ new WeakMap(), U = B.createTreeWalker(B, 129);
function at(t, e) {
  if (!_e(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Re !== void 0 ? Re.createHTML(e) : e;
}
const kt = (t, e) => {
  const a = t.length - 1, r = [];
  let s, i = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = V;
  for (let d = 0; d < a; d++) {
    const l = t[d];
    let p, _, h = -1, S = 0;
    for (; S < l.length && (o.lastIndex = S, _ = o.exec(l), _ !== null); ) S = o.lastIndex, o === V ? _[1] === "!--" ? o = Ie : _[1] !== void 0 ? o = We : _[2] !== void 0 ? (tt.test(_[2]) && (s = RegExp("</" + _[2], "g")), o = N) : _[3] !== void 0 && (o = N) : o === N ? _[0] === ">" ? (o = s ?? V, h = -1) : _[1] === void 0 ? h = -2 : (h = o.lastIndex - _[2].length, p = _[1], o = _[3] === void 0 ? N : _[3] === '"' ? qe : Ve) : o === qe || o === Ve ? o = N : o === Ie || o === We ? o = V : (o = N, s = void 0);
    const A = o === N && t[d + 1].startsWith("/>") ? " " : "";
    i += o === V ? l + $t : h >= 0 ? (r.push(p), l.slice(0, h) + Qe + l.slice(h) + F + A) : l + F + (h === -2 ? d : A);
  }
  return [at(t, i + (t[a] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Z {
  constructor({ strings: e, _$litType$: a }, r) {
    let s;
    this.parts = [];
    let i = 0, o = 0;
    const d = e.length - 1, l = this.parts, [p, _] = kt(e, a);
    if (this.el = Z.createElement(p, r), U.currentNode = this.el.content, a === 2 || a === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = U.nextNode()) !== null && l.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Qe)) {
          const S = _[o++], A = s.getAttribute(h).split(F), O = /([.?@])?(.*)/.exec(S);
          l.push({ type: 1, index: i, name: O[2], strings: A, ctor: O[1] === "." ? At : O[1] === "?" ? Ct : O[1] === "@" ? Et : re }), s.removeAttribute(h);
        } else h.startsWith(F) && (l.push({ type: 6, index: i }), s.removeAttribute(h));
        if (tt.test(s.tagName)) {
          const h = s.textContent.split(F), S = h.length - 1;
          if (S > 0) {
            s.textContent = te ? te.emptyScript : "";
            for (let A = 0; A < S; A++) s.append(h[A], J()), U.nextNode(), l.push({ type: 2, index: ++i });
            s.append(h[S], J());
          }
        }
      } else if (s.nodeType === 8) if (s.data === et) l.push({ type: 2, index: i });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(F, h + 1)) !== -1; ) l.push({ type: 7, index: i }), h += F.length - 1;
      }
      i++;
    }
  }
  static createElement(e, a) {
    const r = B.createElement("template");
    return r.innerHTML = e, r;
  }
}
function R(t, e, a = t, r) {
  var o, d;
  if (e === j) return e;
  let s = r !== void 0 ? (o = a._$Co) == null ? void 0 : o[r] : a._$Cl;
  const i = K(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== i && ((d = s == null ? void 0 : s._$AO) == null || d.call(s, !1), i === void 0 ? s = void 0 : (s = new i(t), s._$AT(t, a, r)), r !== void 0 ? (a._$Co ?? (a._$Co = []))[r] = s : a._$Cl = s), s !== void 0 && (e = R(t, s._$AS(t, e.values), s, r)), e;
}
class St {
  constructor(e, a) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = a;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: a }, parts: r } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? B).importNode(a, !0);
    U.currentNode = s;
    let i = U.nextNode(), o = 0, d = 0, l = r[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let p;
        l.type === 2 ? p = new X(i, i.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(i, l.name, l.strings, this, e) : l.type === 6 && (p = new Mt(i, this, e)), this._$AV.push(p), l = r[++d];
      }
      o !== (l == null ? void 0 : l.index) && (i = U.nextNode(), o++);
    }
    return U.currentNode = B, s;
  }
  p(e) {
    let a = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, a), a += r.strings.length - 2) : r._$AI(e[a])), a++;
  }
}
class X {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, a, r, s) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = a, this._$AM = r, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const a = this._$AM;
    return a !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = a.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, a = this) {
    e = R(this, e, a), K(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== j && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : xt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && K(this._$AH) ? this._$AA.nextSibling.data = e : this.T(B.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var i;
    const { values: a, _$litType$: r } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Z.createElement(at(r.h, r.h[0]), this.options)), r);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === s) this._$AH.p(a);
    else {
      const o = new St(s, this), d = o.u(this.options);
      o.p(a), this.T(d), this._$AH = o;
    }
  }
  _$AC(e) {
    let a = Ge.get(e.strings);
    return a === void 0 && Ge.set(e.strings, a = new Z(e)), a;
  }
  k(e) {
    _e(this._$AH) || (this._$AH = [], this._$AR());
    const a = this._$AH;
    let r, s = 0;
    for (const i of e) s === a.length ? a.push(r = new X(this.O(J()), this.O(J()), this, this.options)) : r = a[s], r._$AI(i), s++;
    s < a.length && (this._$AR(r && r._$AB.nextSibling, s), a.length = s);
  }
  _$AR(e = this._$AA.nextSibling, a) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, a); e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    var a;
    this._$AM === void 0 && (this._$Cv = e, (a = this._$AP) == null || a.call(this, e));
  }
}
class re {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, a, r, s, i) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = a, this._$AM = s, this.options = i, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = g;
  }
  _$AI(e, a = this, r, s) {
    const i = this.strings;
    let o = !1;
    if (i === void 0) e = R(this, e, a, 0), o = !K(e) || e !== this._$AH && e !== j, o && (this._$AH = e);
    else {
      const d = e;
      let l, p;
      for (e = i[0], l = 0; l < i.length - 1; l++) p = R(this, d[r + l], a, l), p === j && (p = this._$AH[l]), o || (o = !K(p) || p !== this._$AH[l]), p === g ? e = g : e !== g && (e += (p ?? "") + i[l + 1]), this._$AH[l] = p;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class At extends re {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Ct extends re {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class Et extends re {
  constructor(e, a, r, s, i) {
    super(e, a, r, s, i), this.type = 5;
  }
  _$AI(e, a = this) {
    if ((e = R(this, e, a, 0) ?? g) === j) return;
    const r = this._$AH, s = e === g && r !== g || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, i = e !== g && (r === g || s);
    s && this.element.removeEventListener(this.name, this, r), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var a;
    typeof this._$AH == "function" ? this._$AH.call(((a = this.options) == null ? void 0 : a.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Mt {
  constructor(e, a, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = a, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    R(this, e);
  }
}
const ce = G.litHtmlPolyfillSupport;
ce == null || ce(Z, X), (G.litHtmlVersions ?? (G.litHtmlVersions = [])).push("3.3.1");
const Ft = (t, e, a) => {
  const r = (a == null ? void 0 : a.renderBefore) ?? e;
  let s = r._$litPart$;
  if (s === void 0) {
    const i = (a == null ? void 0 : a.renderBefore) ?? null;
    r._$litPart$ = s = new X(e.insertBefore(J(), i), i, void 0, a ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis;
class T extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var a;
    const e = super.createRenderRoot();
    return (a = this.renderOptions).renderBefore ?? (a.renderBefore = e.firstChild), e;
  }
  update(e) {
    const a = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ft(a, this.renderRoot, this.renderOptions);
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
    return j;
  }
}
var Xe;
T._$litElement$ = !0, T.finalized = !0, (Xe = D.litElementHydrateSupport) == null || Xe.call(D, { LitElement: T });
const de = D.litElementPolyfillSupport;
de == null || de({ LitElement: T });
(D.litElementVersions ?? (D.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = { attribute: !0, type: String, converter: ee, reflect: !1, hasChanged: he }, Tt = (t = Pt, e, a) => {
  const { kind: r, metadata: s } = a;
  let i = globalThis.litPropertyMetadata.get(s);
  if (i === void 0 && globalThis.litPropertyMetadata.set(s, i = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), i.set(a.name, t), r === "accessor") {
    const { name: o } = a;
    return { set(d) {
      const l = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(o, l, t);
    }, init(d) {
      return d !== void 0 && this.C(o, void 0, t, d), d;
    } };
  }
  if (r === "setter") {
    const { name: o } = a;
    return function(d) {
      const l = this[o];
      e.call(this, d), this.requestUpdate(o, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function x(t) {
  return (e, a) => typeof a == "object" ? Tt(t, e, a) : ((r, s, i) => {
    const o = s.hasOwnProperty(i);
    return s.constructor.createProperty(i, r), o ? Object.getOwnPropertyDescriptor(s, i) : void 0;
  })(t, e, a);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(t) {
  return x({ ...t, state: !0, attribute: !1 });
}
const zt = ae`
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
    display: grid;
    grid-template-columns: repeat(2, auto); /* 2 colonne di icone */
    gap: 6px 12px;                           /* row-gap col-gap */
    margin-left: auto;                       /* spinge l'indicatore a destra */
    flex: 1;
    justify-content: end;                    /* allinea la griglia a destra */
    align-items: center;
    text-align: right;
  }

  /* piccolo adattamento responsive: 1 colonna su schermi stretti */
  @media (max-width: 420px) {
    .status-indicator {
      grid-template-columns: repeat(1, auto);
      gap: 6px;
    }
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

  /* Stili per pulsanti raggruppati */
  .group-selector {
    display: flex;
    margin-bottom: 16px;
    background: var(--card-background-color);
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.03);
    border: 1px solid var(--divider-color);  
  }

  .group-button {
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

  .group-button:first-child {
    border-top-left-radius: 30px;    /* Estremo sinistro arrotondato a cerchio */
    border-bottom-left-radius: 30px;
  }

  .group-button:last-child {
    border-top-right-radius: 30px;   /* Estremo destro arrotondato a cerchio */
    border-bottom-right-radius: 30px;
    border-right: none; /* Nessun bordo dopo l’ultimo */
  }

  .group-button:hover {
    background: var(--wa-color-neutral-fill-normal);
  }

  .group-button.selected {
    background: var(--ha-color-fill-primary-normal-resting);
    color: var(--ha-color-fill-primary-loud-active);
    font-weight: 600;
  }

  .group-button:disabled {
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
    z-index: 50;
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
    width: 500px;
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
    z-index: 60;
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
`, Ot = {
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
        settings: "Settings",
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
        pN: "Custom {program}",
        settings: {
          title: "Weekly Program Settings",
          days: {
            monday: "monday",
            tuesday: "thursday",
            wednesday: "wednesday",
            thursday: "thursday",
            friday: "friday",
            saturday: "saturday",
            sunday: "sunday"
          },
          hours: "Hours",
          speeds: "Speeds",
          save: "Save",
          cancel: "Cancel",
          reset: "Reset",
          copyAllDays: "Copy the current day to all days",
          copyWeekdays: "Copy to Mon-Fri (weekdays)",
          copyWeekends: "Copy to Sat-Sun (weekends)"
        }
      },
      messages: {
        temperature_in: "Extracted (stale) air temperature",
        temperature_out: "External air temperature",
        temperature_flow: "Supply air temperature",
        temperature_disposal: "Disposal air temperature",
        efficiency: "Heat recovery efficiency",
        boost_on: "Booster mode is active",
        boost_off: "Booster mode is deactive",
        boost_description: '"Party Mode" and "Booster Mode" temporarily increase the fan speed above nominal.',
        flush_mode: "Flush Mode",
        flush_on: "Flush mode is active",
        flush_off: "Flush mode is deactive",
        flush_description: "An intensive air exchange of the living space can be activated four times a day for 15 minutes, except when the outdoor temperature could lead to excessive heat loss.",
        bypass_on: "Bypass mode is active",
        bypass_off: "Bypass mode is deactive",
        bypass_description: `Under certain climatic conditions, heat recovery is not efficient.
In such cases, the system can switch to free-cooling or free-heating mode, using outdoor air directly to cool or warm the indoor space without passing through the heat recovery unit.`,
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
}, Nt = {
  ui: Ot
}, Ut = {
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
        settings: "Impostazioni",
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
        pN: "Personalizzato {program}.",
        settings: {
          title: "Impostazioni Programma Settimanale",
          days: {
            monday: "lunedì",
            tuesday: "martedì",
            wednesday: "mercoledì",
            thursday: "giovedì",
            friday: "venerdì",
            saturday: "sabato",
            sunday: "domenica"
          },
          hours: "Ore",
          speeds: "Velocità",
          save: "Salva",
          cancel: "Annulla",
          reset: "Reimposta",
          copyAllDays: "Copy the current day to all days",
          copyWeekdays: "Copia a Lun-Ven",
          copyWeekends: "Copia a Sab-Dom"
        }
      },
      messages: {
        temperature_in: "Temperatura aria viziata estratta",
        temperature_out: "Temperatura aria esterna",
        temperature_flow: "Temperatura aria di mandata",
        temperature_disposal: "Temperatura aria di smaltimento",
        efficiency: "Efficienza recupero di calore",
        boost_on: "La modalità Festa/Boost è attiva",
        boost_off: "La modalità Festa/Boost è disattiva",
        boost_description: "Le modalità Festa e Booster determinano l'aumento della velocità rispetto a quella nominale.",
        flush_mode: "Funzione ricambio forzato estivo (Flush)",
        flush_on: "La modalità Flush è attiva",
        flush_off: "La modalità Flush è disattiva",
        flush_description: `E' possibile usufruire di un ricambio d'aria intensivo dello spazio abitato.
La modalità si attiva 4 volte al giorno per 15 minuti, ad eccezione delle ore in cui la temperatura esterna non comporti eccessive dissipazioni di calore.`,
        bypass_on: "La modalità Bypass è attiva",
        bypass_off: "La modalità Bypass è disattiva",
        bypass_description: "Nel corso dell'anno sussistono alcune condizioni climatiche per cui non sia conveniente il recupero termico dell'aria estratta, al fine di trattare l'aria di rinnovo proveniente dall'esterno.In alcuni casi è opportuno adottare la strategia del free-cooling, ovvero conviene utilizzare direttamentel'aria esterna per climatizzare gratuitamente, by-passando l'unità di recupero termico. Analogamente possono verificarsi situazioni di cambio di stagione in cui convenga utilizzare direttamente l'aria esterna per riscaldare l'ambiente occupato, in questo caso si parla di free-heating.",
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
}, Ht = {
  ui: Ut
}, Je = {
  en: Nt,
  it: Ht
};
function Ke(t, e) {
  return e.split(".").reduce((a, r) => a == null ? void 0 : a[r], t);
}
function c(t, e, a) {
  let r = Ke(Je[t], e) ?? Ke(Je.en, e) ?? e;
  return a && Object.keys(a).forEach((s) => {
    r = r.replace(`{${s}}`, a[s]);
  }), r;
}
function u(t, e, a = void 0) {
  var r;
  return !t || !e ? a : (r = t.states[e]) == null ? void 0 : r.state;
}
function Dt(t, e = "en", a = 1) {
  return t === void 0 || isNaN(t) ? "n/a" : new Intl.NumberFormat(e, {
    minimumFractionDigits: a,
    maximumFractionDigits: a
  }).format(t);
}
function Bt(t, e, a) {
  var s, i;
  if (!t || !e || !a) return a ?? "n/a";
  const r = (i = (s = t.states[e]) == null ? void 0 : s.attributes) == null ? void 0 : i.unit_of_measurement;
  return r ? `${a} ${r}` : a;
}
function v(t, e) {
  var r;
  if (!t || !e) return !1;
  const a = (r = t.states[e]) == null ? void 0 : r.state;
  return a === "on" || a === "true" || a === !0;
}
function H(t, e, a = "en", r = 1) {
  const s = u(t, e), i = s !== void 0 ? parseFloat(s) : void 0, o = Dt(i, a, r);
  return Bt(t, e, o);
}
function y(t, e = 0) {
  if (t === void 0) return e;
  if (typeof t == "number") return t;
  const a = parseFloat(t);
  return isNaN(a) ? e : a;
}
function rt(t) {
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
const n = {
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
          pN: "ui.card.sabiana_vmc.programs.pN",
          settings: {
            title: "ui.card.sabiana_vmc.programs.settings.title",
            days: {
              monday: "ui.card.sabiana_vmc.programs.settings.days.monday",
              tuesday: "ui.card.sabiana_vmc.programs.settings.days.tuesday",
              wednesday: "ui.card.sabiana_vmc.programs.settings.days.wednesday",
              thursday: "ui.card.sabiana_vmc.programs.settings.days.thursday",
              friday: "ui.card.sabiana_vmc.programs.settings.days.friday",
              saturday: "ui.card.sabiana_vmc.programs.settings.days.saturday",
              sunday: "ui.card.sabiana_vmc.programs.settings.days.sunday"
            },
            save: "ui.card.sabiana_vmc.programs.settings.save",
            cancel: "ui.card.sabiana_vmc.programs.settings.cancel",
            reset: "ui.card.sabiana_vmc.programs.settings.reset"
          }
        },
        messages: {
          temperature_in: "ui.card.sabiana_vmc.messages.temperature_in",
          temperature_out: "ui.card.sabiana_vmc.messages.temperature_out",
          temperature_flow: "ui.card.sabiana_vmc.messages.temperature_flow",
          temperature_disposal: "ui.card.sabiana_vmc.messages.temperature_disposal",
          efficiency: "ui.card.sabiana_vmc.messages.efficiency",
          boost_on: "ui.card.sabiana_vmc.messages.boost_on",
          boost_off: "ui.card.sabiana_vmc.messages.boost_off",
          boost_description: "ui.card.sabiana_vmc.messages.boost_description",
          flush_mode: "ui.card.sabiana_vmc.messages.flush_mode",
          flush_on: "ui.card.sabiana_vmc.messages.flush_on",
          flush_off: "ui.card.sabiana_vmc.messages.flush_off",
          flush_description: "ui.card.sabiana_vmc.messages.flush_description",
          bypass_on: "ui.card.sabiana_vmc.messages.bypass_on",
          bypass_off: "ui.card.sabiana_vmc.messages.bypass_off",
          bypass_description: "ui.card.sabiana_vmc.messages.bypass_description",
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
var E = /* @__PURE__ */ ((t) => (t.Auto = "Auto", t.Program = "Program", t.Party = "Party", t.Holiday = "Holiday", t.Manual = "Manual", t))(E || {});
function me(t) {
  return Object.values(E).includes(t) ? t : void 0;
}
function Lt(t) {
  switch (typeof t == "string" ? me(t) : t) {
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
function jt(t) {
  switch (typeof t == "string" ? me(t) : t) {
    case "Auto":
      return n.ui.card.sabiana_vmc.modes.auto;
    case "Manual":
      return n.ui.card.sabiana_vmc.modes.manual;
    case "Party":
      return n.ui.card.sabiana_vmc.modes.party;
    case "Program":
      return n.ui.card.sabiana_vmc.modes.program;
    case "Holiday":
      return n.ui.card.sabiana_vmc.modes.holiday;
    default:
      return "mdi:help-circle";
  }
}
var Rt = Object.defineProperty, It = Object.getOwnPropertyDescriptor, W = (t, e, a, r) => {
  for (var s = r > 1 ? void 0 : r ? It(e, a) : e, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (s = (r ? o(e, a, s) : o(s)) || s);
  return r && s && Rt(e, a, s), s;
};
let z = class extends T {
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
    return f`
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
z.styles = ae`
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
W([
  x({ type: Number })
], z.prototype, "value", 2);
W([
  x({ type: Number })
], z.prototype, "min", 2);
W([
  x({ type: Number })
], z.prototype, "max", 2);
W([
  x({ type: Number })
], z.prototype, "step", 2);
W([
  x({ type: String })
], z.prototype, "label", 2);
z = W([
  se("range-slider")
], z);
var Wt = Object.defineProperty, Vt = Object.getOwnPropertyDescriptor, ie = (t, e, a, r) => {
  for (var s = r > 1 ? void 0 : r ? Vt(e, a) : e, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (s = (r ? o(e, a, s) : o(s)) || s);
  return r && s && Wt(e, a, s), s;
};
let I = class extends T {
  constructor() {
    super(...arguments), this.checked = !1, this.label = "", this.disabled = !1;
  }
  handleClick() {
    this.disabled || (this.checked = !this.checked, this.dispatchEvent(new CustomEvent("toggle-changed", {
      detail: { checked: this.checked },
      bubbles: !0,
      composed: !0
    })));
  }
  render() {
    return f`
      <div 
        class="toggle-container ${this.disabled ? "disabled" : ""}"
        @click="${this.handleClick}"
      >
        <span class="toggle-label">${this.label}</span>
        <div class="toggle-wrapper">
          <div class="toggle-track ${this.checked ? "checked" : ""}"></div>
          <div class="toggle-thumb ${this.checked ? "checked" : ""}"></div>
          <input 
            type="checkbox" 
            .checked="${this.checked}"
            ?disabled="${this.disabled}"
            aria-label="${this.label}"
          >
        </div>
      </div>
    `;
  }
};
I.styles = ae`
    :host {
      display: block;
    }

    .toggle-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      cursor: pointer;
      user-select: none;
    }

    .toggle-container.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .toggle-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      flex: 1;
    }

    .toggle-wrapper {
      position: relative;
      width: 40px;
      height: 20px;
    }

    .toggle-track {
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--disabled-text-color);
      border-radius: 10px;
      transition: background-color 0.2s ease;
    }

    .toggle-track.checked {
      background: var(--primary-color);
    }

    .toggle-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background: var(--card-background-color, #fff);
      border-radius: 50%;
      transition: transform 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .toggle-thumb.checked {
      transform: translateX(20px);
    }

    .toggle-container:not(.disabled):hover .toggle-track {
      filter: brightness(1.1);
    }

    .toggle-container:not(.disabled):active .toggle-thumb {
      width: 20px;
    }

    .toggle-container:not(.disabled):active .toggle-thumb.checked {
      transform: translateX(16px);
    }

    /* Nasconde l'input reale ma lo mantiene accessibile */
    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
  `;
ie([
  x({ type: Boolean })
], I.prototype, "checked", 2);
ie([
  x({ type: String })
], I.prototype, "label", 2);
ie([
  x({ type: Boolean })
], I.prototype, "disabled", 2);
I = ie([
  se("toggle-switch")
], I);
var qt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, M = (t, e, a, r) => {
  for (var s = r > 1 ? void 0 : r ? Gt(e, a) : e, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (s = (r ? o(e, a, s) : o(s)) || s);
  return r && s && qt(e, a, s), s;
};
let k = class extends T {
  constructor() {
    super(), this.lang = "en", this.schedule = {}, this.label = "", this.selectedSpeed = 1, this.isDragging = !1, this.workingSchedule = {}, this.hasChanges = !1, this.userTimerProgram = void 0, this.dayNames = [
      n.ui.card.sabiana_vmc.programs.settings.days.monday,
      n.ui.card.sabiana_vmc.programs.settings.days.tuesday,
      n.ui.card.sabiana_vmc.programs.settings.days.wednesday,
      n.ui.card.sabiana_vmc.programs.settings.days.thursday,
      n.ui.card.sabiana_vmc.programs.settings.days.friday,
      n.ui.card.sabiana_vmc.programs.settings.days.saturday,
      n.ui.card.sabiana_vmc.programs.settings.days.sunday
    ], this.schedule = {};
    for (let t = 0; t < 7; t++)
      this.schedule[t] = Array.from({ length: 24 }, (e, a) => ({
        hour: a,
        speed: 0
        // Default speed
      }));
    this.workingSchedule = this.deepCloneSchedule(this.schedule), this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  deepCloneSchedule(t) {
    const e = {};
    for (let a = 0; a < 7; a++)
      e[a] = t[a].map((r) => ({ ...r }));
    return e;
  }
  firstUpdated() {
    this.label = this.label || c(this.lang, n.ui.card.sabiana_vmc.programs.settings.title), this.dayNames = this.dayNames.map((e) => this.capitalizeFirstLetter(c(this.lang, e))), this.userTimerProgram = y(u(this.hass, this.entities.program));
    const t = [];
    for (let e = 1; e <= 7; e++) {
      const a = `utp${this.userTimerProgram - 4 + 1}_d${e}`, r = this.entities[a], s = u(this.hass, r);
      s && s.length > 0 && s !== "undefined" && t.push(JSON.parse(s));
    }
    this.setWeekSchedule(t), this.workingSchedule = this.deepCloneSchedule(this.schedule), this.hasChanges = !1;
  }
  updated(t) {
    super.updated(t), t.has("schedule") && (this.workingSchedule = this.deepCloneSchedule(this.schedule), this.hasChanges = !1);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("mouseup", this.handleMouseUp);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("mouseup", this.handleMouseUp);
  }
  handleMouseUp() {
    this.isDragging = !1;
  }
  selectSpeed(t) {
    this.selectedSpeed = t;
  }
  setHourSpeed(t, e, a = !1) {
    a && (this.isDragging = !0), this.workingSchedule[t] = this.workingSchedule[t].map(
      (r) => r.hour === e ? { ...r, speed: this.selectedSpeed } : r
    ), this.hasChanges = !0, this.requestUpdate();
  }
  onMouseEnterCell(t, e) {
    this.isDragging && this.setHourSpeed(t, e, !1);
  }
  setAllSpeed(t) {
    for (let e = 0; e < 7; e++)
      this.workingSchedule[e] = this.workingSchedule[e].map((a) => ({ ...a, speed: t }));
    this.hasChanges = !0, this.requestUpdate();
  }
  copyToWeekdays() {
    const t = [...this.workingSchedule[0]];
    for (let e = 1; e < 5; e++)
      this.workingSchedule[e] = t.map((a) => ({ ...a }));
    this.hasChanges = !0, this.requestUpdate();
  }
  copyToWeekend() {
    const t = [...this.workingSchedule[5]];
    this.workingSchedule[6] = t.map((e) => ({ ...e })), this.hasChanges = !0, this.requestUpdate();
  }
  saveChanges() {
    this.dispatchEvent(new CustomEvent("schedule-changed", {
      detail: { schedule: this.deepCloneSchedule(this.workingSchedule) },
      bubbles: !0,
      composed: !0
    })), this.hasChanges = !1;
  }
  cancelChanges() {
    this.workingSchedule = this.deepCloneSchedule(this.schedule), this.hasChanges = !1, this.requestUpdate();
  }
  render() {
    return f`
      <div class="schedule-container">
        <div class="schedule-header">${this.label} ${(this.userTimerProgram || 0) + 1}</div>
        
        <div class="speed-selector">
          ${[0, 1, 2, 3].map((t) => f`
            <div
              title="${this.getSpeedName(t)}"
              class="speed-option speed-${t} ${this.selectedSpeed === t ? "active" : ""}"
              @click="${() => this.selectSpeed(t)}"
            >
              <ha-icon icon="${rt(t)}"></ha-icon>
            </div>
          `)}
            
          <button 
            title="${c(this.lang, n.ui.card.sabiana_vmc.programs.settings.reset)}"
            class="action-button" 
            @click="${() => this.setAllSpeed(0)}">
            <ha-icon icon="mdi:trash-can-outline"></ha-icon>
          </button>
        </div>

        <div class="schedule-grid">
          <div class="hours-header">
            <div></div>
            ${Array.from({ length: 24 }, (t, e) => f`
              <div class="hour-number">${e}</div>
            `)}
          </div>

          ${this.dayNames.map((t, e) => f`
            <div class="day-row">
              <div class="day-label ${e >= 5 ? "weekend" : ""}">${t.substring(0, 3)}</div>
              ${this.workingSchedule[e].map((a) => f`
                <div
                  class="hour-cell speed-${a.speed}"
                  @mousedown="${() => this.setHourSpeed(e, a.hour, !0)}"
                  @mouseenter="${() => this.onMouseEnterCell(e, a.hour)}"
                  title="${t} ${a.hour}:00 - V${a.speed}"
                ></div>
              `)}
            </div>
          `)}
        </div>

        <div class="quick-actions">
          <button class="action-button secondary" @click="${() => this.copyToWeekdays()}">
            <ha-icon icon="mdi:content-copy"></ha-icon>
            ${this.dayNames[0]} = ${this.dayNames[1]}-${this.dayNames[4]}
            </button>
            <button class="action-button secondary" @click="${() => this.copyToWeekend()}">
            <ha-icon icon="mdi:content-copy"></ha-icon>
            ${this.dayNames[5]} = ${this.dayNames[6]}
          </button>
        </div>
        
        <div class="save-actions">
          <button 
            class="action-button save" 
            @click="${() => this.saveChanges()}"
            ?disabled="${!this.hasChanges}"
          >
            <ha-icon icon="mdi:content-save"></ha-icon> ${c(this.lang, n.ui.card.sabiana_vmc.programs.settings.save)}
          </button>
          <button 
            class="action-button cancel" 
            @click="${() => this.cancelChanges()}"
            ?disabled="${!this.hasChanges}"
          >
            <ha-icon icon="mdi:content-save-off-outline"></ha-icon> ${c(this.lang, n.ui.card.sabiana_vmc.programs.settings.cancel)}
          </button>
        </div>
      </div>
    `;
  }
  getSpeedName(t) {
    switch (t) {
      case 2:
        return H(this.hass, this.entities.speed_2, this.lang, 0);
      case 3:
        return H(this.hass, this.entities.speed_3, this.lang, 0);
      case 4:
        return H(this.hass, this.entities.speed_4, this.lang, 0);
      default:
        return "";
    }
  }
  capitalizeFirstLetter(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  setWeekSchedule(t) {
    t.forEach((e) => {
      const a = e.i.filter((r) => r.t !== "23:59").map((r) => ({ hour: parseInt(r.t.split(":")[0], 10), speed: r.s }));
      a.unshift({
        hour: 0,
        speed: e.sb
      }), this.schedule[e.d - 1].forEach((r) => {
        let s = 0;
        for (let i = 0; i < a.length && a[i].hour <= r.hour; i++)
          s = a[i].speed;
        r.speed = s;
      });
    });
  }
};
k.styles = ae`
    :host {
      display: block;
    }

    .schedule-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .schedule-header {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .speed-selector {
      display: flex;
      gap: 8px;
      background: var(--card-background-color);
    }

    .speed-option {
      flex: 1;
      padding: 12px;
      border: 2px solid var(--divider-color);
      background: var(--card-background-color);
      border-radius: 8px;
      cursor: pointer;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .speed-option:hover {
      opacity: 0.8;
    }

    .speed-option.active {
      border-width: 3px;
      transform: scale(1.02);
    }

    .speed-option.speed-0 {
      background: #008CFF;
      color: white;
    }

    .speed-option.speed-0.active {
      border-color: #0042BD;
    }

    .speed-option.speed-1 {
      background: #4CAF50;
      color: white;
    }

    .speed-option.speed-1.active {
      border-color: #2E7D32;
    }

    .speed-option.speed-2 {
      background: #FF9800;
      color: white;
    }

    .speed-option.speed-2.active {
      border-color: #E65100;
    }

    .speed-option.speed-3 {
      background: #F44336;
      color: white;
    }

    .speed-option.speed-3.active {
      border-color: #C62828;
    }

    .schedule-grid {
      display: flex;
      flex-direction: column;
      gap: 0;
      background: var(--card-background-color);
      overflow: hidden;
    }

    .hours-header {
      display: grid;
      grid-template-columns: 35px repeat(24, 1fr);
      border-bottom: 1px solid var(--divider-color);
      padding: 8px 4px;
      font-size: 10px;
      color: var(--secondary-text-color);
      text-align: center;
    }

    .hour-number {
      font-weight: 500;
    }

    .day-row {
      display: grid;
      grid-template-columns: 35px repeat(24, 1fr);
      border-bottom: 1px solid var(--divider-color);
      min-height: 30px;
    }

    .day-row:last-child {
      border-bottom: none;
    }

    .day-label {
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
      border-right: 1px solid var(--divider-color);
    }

    .day-label.weekend {
      color: var(--secondary-text-color);
    }

    .hour-cell {
      cursor: pointer;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      transition: opacity 0.1s ease;
      position: relative;
      user-select: none;
    }

    .hour-cell:hover {
      opacity: 0.8;
    }

    .hour-cell.speed-0 {
      background: #008CFF;
    }

    .hour-cell.speed-1 {
      background: #4CAF50;
    }

    .hour-cell.speed-2 {
      background: #FF9800;
    }

    .hour-cell.speed-3 {
      background: #F44336;
    }

    .quick-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .action-button {
      padding: 4px 12px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: opacity 0.2s ease;
    }

    .action-button:hover {
      opacity: 0.8;
    }

    .action-button.secondary {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
    }

    .save-actions {
      display: flex;
      gap: 8px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }

    .action-button.save {
      flex: 1;
    }

    .action-button.cancel {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
      flex: 1;
    }

    .action-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
M([
  x({ attribute: !1 })
], k.prototype, "hass", 2);
M([
  x({ attribute: !1 })
], k.prototype, "entities", 2);
M([
  x({ type: String })
], k.prototype, "lang", 2);
M([
  x({ type: Object })
], k.prototype, "schedule", 2);
M([
  x({ type: String })
], k.prototype, "label", 2);
M([
  b()
], k.prototype, "selectedSpeed", 2);
M([
  b()
], k.prototype, "isDragging", 2);
M([
  b()
], k.prototype, "workingSchedule", 2);
M([
  b()
], k.prototype, "hasChanges", 2);
k = M([
  se("schedule-editor")
], k);
function Jt() {
  var ve, ye, $e, xe, we, ke, Se, Ae, Ce, Ee, Me, Fe, Pe, Te, ze, Oe, Ne, Ue, He;
  if (!this.hass || !this.config)
    return f`<div>Caricamento...</div>`;
  if (typeof this.error == "string" && this.error.length > 0)
    return f`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  const t = this.hass.language, e = "0.11.14.1763162165447", a = u(this.hass, (ve = this.entities) == null ? void 0 : ve.model, "n/a"), r = u(this.hass, (ye = this.entities) == null ? void 0 : ye.power, "off") === "on", s = Qt(this.hass, t, this.entities), i = Xt(this.hass, this.entities), o = i || c(this.hass.language, n.ui.card.sabiana_vmc.messages.no_alert), d = u(this.hass, ($e = this.entities) == null ? void 0 : $e.boost, "off") === "on", l = d ? c(t, n.ui.card.sabiana_vmc.messages.boost_on) : c(t, n.ui.card.sabiana_vmc.messages.boost_off), p = `

` + c(t, n.ui.card.sabiana_vmc.messages.boost_description), _ = u(this.hass, (xe = this.entities) == null ? void 0 : xe.flush, "off") === "on", h = _ ? c(t, n.ui.card.sabiana_vmc.messages.flush_on) : c(t, n.ui.card.sabiana_vmc.messages.flush_off), S = `

` + c(t, n.ui.card.sabiana_vmc.messages.flush_description), A = u(this.hass, (we = this.entities) == null ? void 0 : we.bypass, "off") === "on", O = A ? c(t, n.ui.card.sabiana_vmc.messages.bypass_on) : c(t, n.ui.card.sabiana_vmc.messages.bypass_off), st = `

` + c(t, n.ui.card.sabiana_vmc.messages.bypass_description), fe = u(this.hass, (ke = this.entities) == null ? void 0 : ke.defrost, "off") === "on", ge = fe ? c(t, n.ui.card.sabiana_vmc.messages.defrost_on) : c(t, n.ui.card.sabiana_vmc.messages.defrost_off), Y = u(this.hass, (Se = this.entities) == null ? void 0 : Se.mode) || "", be = y(u(this.hass, (Ae = this.entities) == null ? void 0 : Ae.program)), it = y(u(this.hass, (Ce = this.entities) == null ? void 0 : Ce.fan_speed)), oe = Kt(y(u(this.hass, (Ee = this.entities) == null ? void 0 : Ee.duty_cycle_fan_1))), ot = r && oe > 0 ? "fan-anim" : "", nt = y(u(this.hass, (Me = this.entities) == null ? void 0 : Me.holiday_mode_days), 1), lt = y(u(this.hass, (Fe = this.entities) == null ? void 0 : Fe.temp_for_free_cooling), 26), ct = y(u(this.hass, (Pe = this.entities) == null ? void 0 : Pe.temp_for_free_heating), 20), dt = y(u(this.hass, (Te = this.entities) == null ? void 0 : Te.boost_time), 180), pt = y(u(this.hass, (ze = this.entities) == null ? void 0 : ze.filter_life), 180);
  return f`
<ha-card>
  <div class="spinner ${this.spinner() ? "" : "hidden-element"}">
    <ha-icon icon="mdi:loading"></ha-icon>
  </div>

  <div class="header">
    <div class="name">
      Sabiana ${a}
    </div>
    <toggle-switch
      .checked="${r}"
      @toggle-changed="${(m) => this.togglePower()}"
    ></toggle-switch>
  </div>

  <div class="main-row">

    <div class="temps">
      <div>
        <ha-icon 
          title="${c(t, n.ui.card.sabiana_vmc.temperature.internal)}"
          icon="mdi:home-thermometer"
          @click="${() => this.openModal(c(t, n.ui.card.sabiana_vmc.messages.temperature_in))}">
        </ha-icon>
        <div>${H(this.hass, (Oe = this.entities) == null ? void 0 : Oe.temp_in)}</div>
      </div>      
      <div>
        <ha-icon 
          title="${c(t, n.ui.card.sabiana_vmc.temperature.flow)}"
          icon="mdi:home-import-outline"
          @click="${() => this.openModal(c(t, n.ui.card.sabiana_vmc.messages.temperature_flow))}">
        </ha-icon>
        <div>${H(this.hass, (Ne = this.entities) == null ? void 0 : Ne.temp_flow)}</div>
      </div>
      <div>
        <ha-icon 
          title="${c(t, n.ui.card.sabiana_vmc.temperature.efficiency)}"
          icon="mdi:swap-vertical"
          @click="${() => this.openModal(c(t, n.ui.card.sabiana_vmc.messages.efficiency))}">
        </ha-icon>
        <div>${Yt(this.hass, this.entities)} %</div>
      </div>
      <div>
        <ha-icon 
          title="${c(t, n.ui.card.sabiana_vmc.temperature.disposal)}"
          icon="mdi:home-export-outline"
          @click="${() => this.openModal(c(t, n.ui.card.sabiana_vmc.messages.temperature_disposal))}">
        </ha-icon>
        <div>${H(this.hass, (Ue = this.entities) == null ? void 0 : Ue.temp_disposal)}</div>
      </div>
      <div>
        <ha-icon 
          title="${c(t, n.ui.card.sabiana_vmc.temperature.external)}"
          icon="mdi:home-thermometer-outline"
          @click="${() => this.openModal(c(t, n.ui.card.sabiana_vmc.messages.temperature_out))}">
        </ha-icon>
        <div>${H(this.hass, (He = this.entities) == null ? void 0 : He.temp_external)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${ot}"
        fill="currentColor"
        style="${oe > 0 ? `animation-duration: ${Zt(oe)};` : ""}"
        viewBox="0 0 24 24"
        width="140" height="140">
        <path d="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z" />
      </svg>
    </div>

    <div class="status-indicator">

      <ha-icon 
        class="${(i == null ? void 0 : i.length) > 0 ? "alert" : "off"}"
        title="${o}"
        icon="mdi:alert"
        @click="${() => this.openModal(o)}">
      </ha-icon>

      <ha-icon 
        class="${s.days <= 0 ? "alert" : s.days < 10 ? "warning" : "off"}"
        title="${s.title}"
        icon="mdi:air-filter"
        @click="${() => {
    this.modalFilterLife = !0, this.openModal(s.message);
  }}">
      </ha-icon>

      <ha-icon 
        class="${d ? "on" : "off"}"
        title="${l}"
        icon="mdi:fan-plus"
        @click="${() => {
    this.modalBoost = !0, this.openModal(l + p);
  }}">
      </ha-icon>

      <ha-icon 
        class="${A ? "on" : "off"}"
        title="${O}"
        icon="mdi:debug-step-over"
        @click="${() => {
    this.modalTemp4Bypass = !0, this.openModal(O + st);
  }}">
      </ha-icon>

      <ha-icon 
        class="${_ ? "on" : "off"}"
        title="${h}"
        icon="mdi:weather-windy"
        @click="${() => {
    this.modalFlush = !0, this.openModal(h + S);
  }}">
      </ha-icon>

      <ha-icon 
        class="${fe ? "on" : "off"}"
        title="${ge}"
        icon="mdi:car-defrost-front"
        @click="${() => this.openModal(ge)}">
      </ha-icon>

    </div>

  </div>  

  <div class="group-selector">
    ${Object.keys(E).map((m) => f`
      <button
        aria-label="${m}"
        class="group-button ${Y === m ? "selected" : ""}"
        @click=${() => this.selectMode(me(m))}
        title="${c(t, jt(m))}"
        ?disabled="${!r}">
        <ha-icon icon="${Lt(m)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="group-selector ${Y !== E.Manual ? "hidden-element" : ""}">
    ${Array.from({ length: 4 }, (m, C) => f`
      <button 
        aria-label="${C}"
        class="group-button ${it === C ? "selected" : ""}"
        @click="${() => this.setFanSpeed(C)}"
        ?disabled="${!r}">
        <ha-icon icon="${rt(C)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${Y !== E.Program ? "hidden-element" : ""}">
    ${Array.from({ length: 8 }, (m, C) => f`
      <button 
        aria-label="${Ze(t, C)}"
        title="${Ze(t, C)}"
        class="program-button ${be === C ? "selected" : ""}"
        @click="${() => this.setProgram(C)}"
        ?disabled="${!r}">
        <ha-icon icon="mdi:numeric-${C + 1}"></ha-icon>
      </button>
      `)}
      <button 
        aria-label="${c(t, n.ui.card.sabiana_vmc.programs.settings.title)}"
        title="${c(t, n.ui.card.sabiana_vmc.programs.settings.title)}"
        class="program-button ${be >= 4 ? "" : "hidden-element"}"
        @click="${() => this.programSettings()}"
        ?disabled="${!r}">
        <ha-icon icon="mdi:cog"></ha-icon>
      </button>
  </div>

  <div
    class="holiday-group-days ${Y !== E.Holiday ? "hidden-element" : ""} range-container">
    <range-slider 
      label="${c(t, n.ui.card.sabiana_vmc.messages.holiday_mode_days_set)}" 
      .min="${1}" 
      .max="${60}"
      .value="${nt}"
      @value-changed="${(m) => this.setHolidayModeModeDays(m.detail.value)}"
      ></range-slider>
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${e}</div>
  </div>

  ${this.modalShouldBeOpen() ? f`
    <div class="modal" @click="${this.closeModal}">
      <div class="modal-content" @click="${(m) => m.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <p style="white-space: pre-line">${this.modalMessage}</p>

        ${this.modalTemp4Bypass ? f`
          <range-slider 
            label="${c(t, n.ui.card.sabiana_vmc.messages.temp_for_free_cooling_set)}" 
            .min="${10}" 
            .max="${35}"
            .value="${lt}"
            @value-changed="${(m) => this.setTempForFreeCooling(m.detail.value)}"
            ></range-slider>

          <range-slider 
            label="${c(t, n.ui.card.sabiana_vmc.messages.temp_for_free_heating_set)}" 
            .min="${10}" 
            .max="${30}"
            .value="${ct}"
            @value-changed="${(m) => this.setTempForFreeHeating(m.detail.value)}"
            ></range-slider>
        ` : ""}

        ${this.modalBoost ? f`
          <range-slider 
            label="${c(t, n.ui.card.sabiana_vmc.messages.boost_time_set)}" 
            .min="${15}" 
            .max="${240}"
            .value="${dt}"
            @value-changed="${(m) => this.setBoostTime(m.detail.value)}"
            ></range-slider>
        ` : ""}

        ${this.modalFilterLife ? f`
          <range-slider 
            label="${c(t, n.ui.card.sabiana_vmc.messages.filter_life)}" 
            .min="${30}" 
            .max="${400}"
            .value="${pt}"
            @value-changed="${(m) => this.setFilterLife(m.detail.value)}"
            ></range-slider>

          <div
            class="program-selection">
            <button 
              aria-label="${c(t, n.ui.card.sabiana_vmc.messages.filter_reset)}"
              title="${c(t, n.ui.card.sabiana_vmc.messages.filter_reset)}"
              class="program-button"
              @click="${() => this.resetFilterCounter()}">
              <ha-icon icon="mdi:filter-check"></ha-icon>
            </button>
          </div>
        ` : ""}

        ${this.modalFlush ? f`
          <toggle-switch
            label="${c(t, n.ui.card.sabiana_vmc.messages.flush_mode)}"
            .checked="${_}"
            @toggle-changed="${(m) => this.setFlush(m.detail.checked)}"
          ></toggle-switch>
          ` : ""}

        ${this.modalScheduleSettings ? f`
          <schedule-editor
            .hass="${this.hass}"
            .entities="${this.entities}"
            .lang="${t}"
            @schedule-changed="${(m) => this.saveSchedule(m.detail.schedule)}"
          ></schedule-editor>
          ` : ""}

      </div>
    </div>` : ""}

</ha-card>
`;
}
function Kt(t) {
  const e = [
    { speed: 0, percent: 0 },
    { speed: 1, percent: 40 },
    { speed: 2, percent: 55 },
    { speed: 3, percent: 70 },
    { speed: 4, percent: 85 }
  ];
  let a = e[0], r = Math.abs(t - e[0].percent);
  for (let s = 1; s < e.length; s++) {
    const i = Math.abs(t - e[s].percent);
    i < r && (a = e[s], r = i);
  }
  return a.speed;
}
function Zt(t) {
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
function Ze(t, e) {
  switch (e) {
    case 0:
      return c(t, n.ui.card.sabiana_vmc.programs.p1);
    case 1:
      return c(t, n.ui.card.sabiana_vmc.programs.p2);
    case 2:
      return c(t, n.ui.card.sabiana_vmc.programs.p3);
    case 3:
      return c(t, n.ui.card.sabiana_vmc.programs.p4);
    default:
      return c(t, n.ui.card.sabiana_vmc.programs.pN, { program: `${e + 1}` });
  }
}
function Xt(t, e) {
  let a = "";
  const r = (s) => {
    a.length > 0 && (a += `
`), a += s;
  };
  return v(t, e == null ? void 0 : e.t1_probe_failure) && r(c(t.language, n.ui.card.sabiana_vmc.messages.t1_probe_failure)), v(t, e == null ? void 0 : e.t2_probe_failure) && r(c(t.language, n.ui.card.sabiana_vmc.messages.t2_probe_failure)), v(t, e == null ? void 0 : e.t3_probe_failure) && r(c(t.language, n.ui.card.sabiana_vmc.messages.t3_probe_failure)), v(t, e == null ? void 0 : e.t4_probe_failure) && r(c(t.language, n.ui.card.sabiana_vmc.messages.t4_probe_failure)), v(t, e == null ? void 0 : e.timekeeper_failure) && r(c(t.language, n.ui.card.sabiana_vmc.messages.timekeeper_failure)), v(t, e == null ? void 0 : e.frost_alarm_t1_probe) && r(c(t.language, n.ui.card.sabiana_vmc.messages.frost_alarm_t1_probe)), v(t, e == null ? void 0 : e.frost_alarm_t2_probe) && r(c(t.language, n.ui.card.sabiana_vmc.messages.frost_alarm_t2_probe)), v(t, e == null ? void 0 : e.fireplace_alarm) && r(c(t.language, n.ui.card.sabiana_vmc.messages.fireplace_alarm)), v(t, e == null ? void 0 : e.pressure_transducer_failure) && r(c(t.language, n.ui.card.sabiana_vmc.messages.pressure_transducer_failure)), v(t, e == null ? void 0 : e.filter_alarm) && r(c(t.language, n.ui.card.sabiana_vmc.messages.filter_alarm)), v(t, e == null ? void 0 : e.fans_failure) && r(c(t.language, n.ui.card.sabiana_vmc.messages.fans_failure)), v(t, e == null ? void 0 : e.rh_or_co2_sensor_failure) && r(c(t.language, n.ui.card.sabiana_vmc.messages.rh_or_co2_sensor_failure)), v(t, e == null ? void 0 : e.fan_thermic_input_alarm) && r(c(t.language, n.ui.card.sabiana_vmc.messages.fan_thermic_input_alarm)), v(t, e == null ? void 0 : e.pre_heating_alarm) && r(c(t.language, n.ui.card.sabiana_vmc.messages.pre_heating_alarm)), v(t, e == null ? void 0 : e.pre_frost_alarm_t2) && r(c(t.language, n.ui.card.sabiana_vmc.messages.pre_frost_alarm_t2)), a;
}
function Yt(t, e) {
  const a = y(u(t, e == null ? void 0 : e.temp_in)), r = y(u(t, e == null ? void 0 : e.temp_external)), s = y(u(t, e == null ? void 0 : e.temp_flow)), i = y(u(t, e == null ? void 0 : e.temp_disposal)), o = s - r, d = a - i;
  let l = 0;
  return isFinite(o) && isFinite(d) && Math.abs(d) > 0.5 && (r < a ? l = o / d * 100 : r > a && (l = -o / -d * 100), Math.abs(s - r) < 0.5 && (l = 0), l !== void 0 && (l = Math.max(0, Math.min(100, l)), l = Math.round(l))), l;
}
function Qt(t, e, a) {
  let r = { days: 0, title: "N/A", message: "" };
  const s = y(u(t, a == null ? void 0 : a.filter_counter)), i = y(u(t, a == null ? void 0 : a.filter_life));
  let o = 0;
  return isFinite(s) && isFinite(i) && i > 0 && (o = s * 15, o = o / 60, o = Math.round(o / 24), r.days = i - o), r.days < 0 ? r.title = c(e, n.ui.card.sabiana_vmc.messages.filter_overdue) : r.title = c(e, n.ui.card.sabiana_vmc.messages.filter_2_replace, { days: "" + r.days }), o > 0 && (r.message = c(e, n.ui.card.sabiana_vmc.messages.filter_used, { days: "" + o }) + `
`, r.message += r.title), r;
}
const ea = {
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
  speed_1: "sensor.@prefix@_blk2_speed_1",
  speed_2: "sensor.@prefix@_blk2_speed_2",
  speed_3: "sensor.@prefix@_blk2_speed_3",
  speed_4: "sensor.@prefix@_blk2_speed_4",
  duty_cycle_fan_1: "sensor.@prefix@_blk1_duty_cycle_fan_1",
  program: "number.@prefix@_vmc_timer_progr_selection",
  boost: "binary_sensor.@prefix@_blk1_boost_active",
  flush: "switch.@prefix@_blk2_flush_mode",
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
  reset_filter_counter: "button.@prefix@_reset_filter_counter",
  service_utp_refresh: "@prefix@_blk4_user_timer_program_refresh",
  utp1_d1: "sensor.@prefix@_blk4_user_timer_program_1_day_1",
  utp1_d2: "sensor.@prefix@_blk4_user_timer_program_1_day_2",
  utp1_d3: "sensor.@prefix@_blk4_user_timer_program_1_day_3",
  utp1_d4: "sensor.@prefix@_blk4_user_timer_program_1_day_4",
  utp1_d5: "sensor.@prefix@_blk4_user_timer_program_1_day_5",
  utp1_d6: "sensor.@prefix@_blk4_user_timer_program_1_day_6",
  utp1_d7: "sensor.@prefix@_blk4_user_timer_program_1_day_7",
  utp2_d1: "sensor.@prefix@_blk4_user_timer_program_2_day_1",
  utp2_d2: "sensor.@prefix@_blk4_user_timer_program_2_day_2",
  utp2_d3: "sensor.@prefix@_blk4_user_timer_program_2_day_3",
  utp2_d4: "sensor.@prefix@_blk4_user_timer_program_2_day_4",
  utp2_d5: "sensor.@prefix@_blk4_user_timer_program_2_day_5",
  utp2_d6: "sensor.@prefix@_blk4_user_timer_program_2_day_6",
  utp2_d7: "sensor.@prefix@_blk4_user_timer_program_2_day_7",
  utp3_d1: "sensor.@prefix@_blk4_user_timer_program_3_day_1",
  utp3_d2: "sensor.@prefix@_blk4_user_timer_program_3_day_2",
  utp3_d3: "sensor.@prefix@_blk4_user_timer_program_3_day_3",
  utp3_d4: "sensor.@prefix@_blk4_user_timer_program_3_day_4",
  utp3_d5: "sensor.@prefix@_blk4_user_timer_program_3_day_5",
  utp3_d6: "sensor.@prefix@_blk4_user_timer_program_3_day_6",
  utp3_d7: "sensor.@prefix@_blk4_user_timer_program_3_day_7",
  utp4_d1: "sensor.@prefix@_blk4_user_timer_program_4_day_1",
  utp4_d2: "sensor.@prefix@_blk4_user_timer_program_4_day_2",
  utp4_d3: "sensor.@prefix@_blk4_user_timer_program_4_day_3",
  utp4_d4: "sensor.@prefix@_blk4_user_timer_program_4_day_4",
  utp4_d5: "sensor.@prefix@_blk4_user_timer_program_4_day_5",
  utp4_d6: "sensor.@prefix@_blk4_user_timer_program_4_day_6",
  utp4_d7: "sensor.@prefix@_blk4_user_timer_program_4_day_7"
};
function ta(t) {
  const e = Object.entries(ea).map(([a, r]) => [
    a,
    r.replace("@prefix@", t)
  ]);
  return Object.fromEntries(e);
}
var aa = Object.defineProperty, ra = Object.getOwnPropertyDescriptor, w = (t, e, a, r) => {
  for (var s = r > 1 ? void 0 : r ? ra(e, a) : e, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (s = (r ? o(e, a, s) : o(s)) || s);
  return r && s && aa(e, a, s), s;
};
let $ = class extends T {
  constructor() {
    super(...arguments), this.modalMessage = "", this.spinnerSelectMode = !1, this.spinnerFlush = !1, this.modalTemp4Bypass = !1, this.modalFlush = !1, this.modalBoost = !1, this.modalFilterLife = !1, this.modalScheduleSettings = !1, this.render = Jt;
  }
  setConfig(t) {
    var e;
    (!t.entity_prefix || typeof t.entity_prefix != "string" || t.entity_prefix.trim() === "") && (this.error = c(
      ((e = this.hass) == null ? void 0 : e.language) ?? "en",
      n.ui.card.sabiana_vmc.errors.missing_config,
      { key: "entity_prefix" }
    )), this.config = t;
  }
  updated(t) {
    var e, a, r, s, i, o, d;
    if (super.updated(t), t.has("config")) {
      if (!this.hass || !((e = this.config) != null && e.entity_prefix))
        return;
      if (this.entities = ta(this.config.entity_prefix), (a = this.hass) != null && a.states)
        for (const [l, p] of Object.entries(this.entities))
          !l.startsWith("service") && !this.hass.states[p] && (this.error = c(
            ((r = this.hass) == null ? void 0 : r.language) ?? "en",
            n.ui.card.sabiana_vmc.errors.missing_entity,
            { entity: l }
          ));
    } else if (this.spinnerSelectMode && t.has("hass")) {
      const l = t.get("hass"), p = u(l, (s = this.entities) == null ? void 0 : s.mode), _ = u(this.hass, (i = this.entities) == null ? void 0 : i.mode);
      p !== _ && (console.log("La modalità di funzionamento è cambiata:", _), this.spinnerSelectMode = !1);
    } else if (this.spinnerFlush && t.has("hass")) {
      const l = t.get("hass"), p = u(l, (o = this.entities) == null ? void 0 : o.flush), _ = u(this.hass, (d = this.entities) == null ? void 0 : d.flush);
      p !== _ && (console.log("La modalità Flush è cambiata:", _), this.spinnerFlush = !1);
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
  spinner() {
    return this.spinnerSelectMode || this.spinnerFlush;
  }
  //#region User actions
  togglePower() {
    var t;
    (t = this.entities) != null && t.power && this.hass.callService("switch", "toggle", { entity_id: this.entities.power });
  }
  selectMode(t) {
    var a, r, s, i, o, d;
    if (!((a = this.entities) != null && a.mode) || !t) return;
    let e = "";
    switch (t) {
      case E.Manual:
        e = ((r = this.entities) == null ? void 0 : r.mode_command_manual) || "";
        break;
      case E.Holiday:
        e = ((s = this.entities) == null ? void 0 : s.mode_command_holiday) || "";
        break;
      case E.Party:
        e = ((i = this.entities) == null ? void 0 : i.mode_command_party) || "";
        break;
      case E.Program:
        e = ((o = this.entities) == null ? void 0 : o.mode_command_program) || "";
        break;
      default:
        e = ((d = this.entities) == null ? void 0 : d.mode_command_auto) || "";
        break;
    }
    e && (this.hass.callService("switch", "toggle", { entity_id: e }), this.spinnerSelectMode = !0);
  }
  setFanSpeed(t) {
    var e, a;
    (e = this.entities) != null && e.fan_speed && this.hass.callService("number", "set_value", {
      entity_id: (a = this.entities) == null ? void 0 : a.fan_speed,
      value: t
    });
  }
  setProgram(t) {
    var e, a;
    (e = this.entities) != null && e.program && this.hass.callService("number", "set_value", {
      entity_id: (a = this.entities) == null ? void 0 : a.program,
      value: t
    });
  }
  async programSettings() {
    var t;
    if ((t = this.entities) != null && t.service_utp_refresh)
      await this.hass.callService("esphome", this.entities.service_utp_refresh), this.modalScheduleSettings = !0;
    else {
      alert("Error");
      return;
    }
  }
  saveSchedule(t) {
    console.log("Schedule saved:", t), alert("TODO");
  }
  setHolidayModeModeDays(t) {
    var e, a;
    (e = this.entities) != null && e.holiday_mode_days && (t < 1 && (t = 1), t > 60 && (t = 60), this.hass.callService("number", "set_value", {
      entity_id: (a = this.entities) == null ? void 0 : a.holiday_mode_days,
      value: t
    }));
  }
  setTempForFreeCooling(t) {
    var e, a;
    (e = this.entities) != null && e.temp_for_free_cooling && (t < 10 && (t = 10), t > 35 && (t = 35), this.hass.callService("number", "set_value", {
      entity_id: (a = this.entities) == null ? void 0 : a.temp_for_free_cooling,
      value: t
    }));
  }
  setTempForFreeHeating(t) {
    var e, a;
    (e = this.entities) != null && e.temp_for_free_heating && (t < 10 && (t = 10), t > 30 && (t = 30), this.hass.callService("number", "set_value", {
      entity_id: (a = this.entities) == null ? void 0 : a.temp_for_free_heating,
      value: t
    }));
  }
  setFlush(t) {
    var e, a;
    (e = this.entities) != null && e.flush && (this.hass.callService("switch", t ? "turn_on" : "turn_off", {
      entity_id: (a = this.entities) == null ? void 0 : a.flush
    }), this.spinnerFlush = !0, this.closeModal());
  }
  setBoostTime(t) {
    var e, a;
    (e = this.entities) != null && e.boost_time && (t < 15 && (t = 15), t > 240 && (t = 240), this.hass.callService("number", "set_value", {
      entity_id: (a = this.entities) == null ? void 0 : a.boost_time,
      value: t
    }));
  }
  setFilterLife(t) {
    var e, a;
    (e = this.entities) != null && e.filter_life && (t < 30 && (t = 30), t > 400 && (t = 400), this.hass.callService("number", "set_value", {
      entity_id: (a = this.entities) == null ? void 0 : a.filter_life,
      value: t
    }));
  }
  resetFilterCounter() {
    var t, e;
    (t = this.entities) != null && t.reset_filter_counter && (this.hass.callService("button", "press", {
      entity_id: (e = this.entities) == null ? void 0 : e.reset_filter_counter
    }), this.closeModal());
  }
  //#endregion
  //#region Modale
  modalShouldBeOpen() {
    return this.modalMessage !== "" || this.modalTemp4Bypass || this.modalFlush || this.modalBoost || this.modalFilterLife || this.modalScheduleSettings;
  }
  openModal(t) {
    this.modalMessage = t;
  }
  closeModal() {
    this.modalMessage = "", this.modalTemp4Bypass = !1, this.modalFlush = !1, this.modalBoost = !1, this.modalFilterLife = !1, this.modalScheduleSettings = !1;
  }
  //#endregion
};
$.styles = zt;
w([
  b()
], $.prototype, "hass", 2);
w([
  b()
], $.prototype, "config", 2);
w([
  b()
], $.prototype, "entities", 2);
w([
  b()
], $.prototype, "modalMessage", 2);
w([
  b()
], $.prototype, "error", 2);
w([
  b()
], $.prototype, "spinnerSelectMode", 2);
w([
  b()
], $.prototype, "spinnerFlush", 2);
w([
  b()
], $.prototype, "modalTemp4Bypass", 2);
w([
  b()
], $.prototype, "modalFlush", 2);
w([
  b()
], $.prototype, "modalBoost", 2);
w([
  b()
], $.prototype, "modalFilterLife", 2);
w([
  b()
], $.prototype, "modalScheduleSettings", 2);
$ = w([
  se("sabiana-vmc-card")
], $);
export {
  $ as SabianaVmcCard
};
