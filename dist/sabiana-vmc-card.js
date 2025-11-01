/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X = globalThis, ne = X.ShadowRoot && (X.ShadyCSS === void 0 || X.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, le = Symbol(), Ne = /* @__PURE__ */ new WeakMap();
let Ze = class {
  constructor(e, a, i) {
    if (this._$cssResult$ = !0, i !== le) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = a;
  }
  get styleSheet() {
    let e = this.o;
    const a = this.t;
    if (ne && e === void 0) {
      const i = a !== void 0 && a.length === 1;
      i && (e = Ne.get(a)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && Ne.set(a, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ct = (t) => new Ze(typeof t == "string" ? t : t + "", void 0, le), ce = (t, ...e) => {
  const a = t.length === 1 ? t[0] : e.reduce((i, r, o) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[o + 1], t[0]);
  return new Ze(a, t, le);
}, dt = (t, e) => {
  if (ne) t.adoptedStyleSheets = e.map((a) => a instanceof CSSStyleSheet ? a : a.styleSheet);
  else for (const a of e) {
    const i = document.createElement("style"), r = X.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = a.cssText, t.appendChild(i);
  }
}, He = ne ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let a = "";
  for (const i of e.cssRules) a += i.cssText;
  return ct(a);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pt, defineProperty: ut, getOwnPropertyDescriptor: _t, getOwnPropertyNames: mt, getOwnPropertySymbols: ht, getPrototypeOf: ft } = Object, M = globalThis, Ue = M.trustedTypes, gt = Ue ? Ue.emptyScript : "", ie = M.reactiveElementPolyfillSupport, I = (t, e) => t, Y = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? gt : null;
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
} }, de = (t, e) => !pt(t, e), Be = { attribute: !0, type: String, converter: Y, reflect: !1, useDefault: !1, hasChanged: de };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), M.litPropertyMetadata ?? (M.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let U = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, a = Be) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(e, a), !a.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(e, i, a);
      r !== void 0 && ut(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, a, i) {
    const { get: r, set: o } = _t(this.prototype, e) ?? { get() {
      return this[a];
    }, set(s) {
      this[a] = s;
    } };
    return { get: r, set(s) {
      const d = r == null ? void 0 : r.call(this);
      o == null || o.call(this, s), this.requestUpdate(e, d, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Be;
  }
  static _$Ei() {
    if (this.hasOwnProperty(I("elementProperties"))) return;
    const e = ft(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(I("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(I("properties"))) {
      const a = this.properties, i = [...mt(a), ...ht(a)];
      for (const r of i) this.createProperty(r, a[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const a = litPropertyMetadata.get(e);
      if (a !== void 0) for (const [i, r] of a) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [a, i] of this.elementProperties) {
      const r = this._$Eu(a, i);
      r !== void 0 && this._$Eh.set(r, a);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const a = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const r of i) a.unshift(He(r));
    } else e !== void 0 && a.push(He(e));
    return a;
  }
  static _$Eu(e, a) {
    const i = a.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const i of a.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return dt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((a) => {
      var i;
      return (i = a.hostConnected) == null ? void 0 : i.call(a);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((a) => {
      var i;
      return (i = a.hostDisconnected) == null ? void 0 : i.call(a);
    });
  }
  attributeChangedCallback(e, a, i) {
    this._$AK(e, i);
  }
  _$ET(e, a) {
    var o;
    const i = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, i);
    if (r !== void 0 && i.reflect === !0) {
      const s = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : Y).toAttribute(a, i.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, a) {
    var o, s;
    const i = this.constructor, r = i._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const d = i.getPropertyOptions(r), n = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : Y;
      this._$Em = r;
      const p = n.fromAttribute(a, d.type);
      this[r] = p ?? ((s = this._$Ej) == null ? void 0 : s.get(r)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(e, a, i) {
    var r;
    if (e !== void 0) {
      const o = this.constructor, s = this[e];
      if (i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? de)(s, a) || i.useDefault && i.reflect && s === ((r = this._$Ej) == null ? void 0 : r.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, a, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, a, { useDefault: i, reflect: r, wrapped: o }, s) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? a ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (a = void 0), this._$AL.set(e, a)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, s] of r) {
        const { wrapped: d } = s, n = this[o];
        d !== !0 || this._$AL.has(o) || n === void 0 || this.C(o, void 0, s, n);
      }
    }
    let e = !1;
    const a = this._$AL;
    try {
      e = this.shouldUpdate(a), e ? (this.willUpdate(a), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(a)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(a);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var a;
    (a = this._$EO) == null || a.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
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
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[I("elementProperties")] = /* @__PURE__ */ new Map(), U[I("finalized")] = /* @__PURE__ */ new Map(), ie == null || ie({ ReactiveElement: U }), (M.reactiveElementVersions ?? (M.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const V = globalThis, Q = V.trustedTypes, De = Q ? Q.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Je = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, Xe = "?" + C, bt = `<${Xe}>`, H = document, q = () => H.createComment(""), G = (t) => t === null || typeof t != "object" && typeof t != "function", pe = Array.isArray, vt = (t) => pe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", re = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Re = /-->/g, je = />/g, z = RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Le = /'/g, Ie = /"/g, Ye = /^(?:script|style|textarea|title)$/i, yt = (t) => (e, ...a) => ({ _$litType$: t, strings: e, values: a }), y = yt(1), B = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), Ve = /* @__PURE__ */ new WeakMap(), T = H.createTreeWalker(H, 129);
function Qe(t, e) {
  if (!pe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return De !== void 0 ? De.createHTML(e) : e;
}
const $t = (t, e) => {
  const a = t.length - 1, i = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = L;
  for (let d = 0; d < a; d++) {
    const n = t[d];
    let p, _, u = -1, x = 0;
    for (; x < n.length && (s.lastIndex = x, _ = s.exec(n), _ !== null); ) x = s.lastIndex, s === L ? _[1] === "!--" ? s = Re : _[1] !== void 0 ? s = je : _[2] !== void 0 ? (Ye.test(_[2]) && (r = RegExp("</" + _[2], "g")), s = z) : _[3] !== void 0 && (s = z) : s === z ? _[0] === ">" ? (s = r ?? L, u = -1) : _[1] === void 0 ? u = -2 : (u = s.lastIndex - _[2].length, p = _[1], s = _[3] === void 0 ? z : _[3] === '"' ? Ie : Le) : s === Ie || s === Le ? s = z : s === Re || s === je ? s = L : (s = z, r = void 0);
    const w = s === z && t[d + 1].startsWith("/>") ? " " : "";
    o += s === L ? n + bt : u >= 0 ? (i.push(p), n.slice(0, u) + Je + n.slice(u) + C + w) : n + C + (u === -2 ? d : w);
  }
  return [Qe(t, o + (t[a] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class W {
  constructor({ strings: e, _$litType$: a }, i) {
    let r;
    this.parts = [];
    let o = 0, s = 0;
    const d = e.length - 1, n = this.parts, [p, _] = $t(e, a);
    if (this.el = W.createElement(p, i), T.currentNode = this.el.content, a === 2 || a === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = T.nextNode()) !== null && n.length < d; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(Je)) {
          const x = _[s++], w = r.getAttribute(u).split(C), F = /([.?@])?(.*)/.exec(x);
          n.push({ type: 1, index: o, name: F[2], strings: w, ctor: F[1] === "." ? wt : F[1] === "?" ? At : F[1] === "@" ? kt : ee }), r.removeAttribute(u);
        } else u.startsWith(C) && (n.push({ type: 6, index: o }), r.removeAttribute(u));
        if (Ye.test(r.tagName)) {
          const u = r.textContent.split(C), x = u.length - 1;
          if (x > 0) {
            r.textContent = Q ? Q.emptyScript : "";
            for (let w = 0; w < x; w++) r.append(u[w], q()), T.nextNode(), n.push({ type: 2, index: ++o });
            r.append(u[x], q());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Xe) n.push({ type: 2, index: o });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(C, u + 1)) !== -1; ) n.push({ type: 7, index: o }), u += C.length - 1;
      }
      o++;
    }
  }
  static createElement(e, a) {
    const i = H.createElement("template");
    return i.innerHTML = e, i;
  }
}
function D(t, e, a = t, i) {
  var s, d;
  if (e === B) return e;
  let r = i !== void 0 ? (s = a._$Co) == null ? void 0 : s[i] : a._$Cl;
  const o = G(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((d = r == null ? void 0 : r._$AO) == null || d.call(r, !1), o === void 0 ? r = void 0 : (r = new o(t), r._$AT(t, a, i)), i !== void 0 ? (a._$Co ?? (a._$Co = []))[i] = r : a._$Cl = r), r !== void 0 && (e = D(t, r._$AS(t, e.values), r, i)), e;
}
class xt {
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
    const { el: { content: a }, parts: i } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? H).importNode(a, !0);
    T.currentNode = r;
    let o = T.nextNode(), s = 0, d = 0, n = i[0];
    for (; n !== void 0; ) {
      if (s === n.index) {
        let p;
        n.type === 2 ? p = new K(o, o.nextSibling, this, e) : n.type === 1 ? p = new n.ctor(o, n.name, n.strings, this, e) : n.type === 6 && (p = new St(o, this, e)), this._$AV.push(p), n = i[++d];
      }
      s !== (n == null ? void 0 : n.index) && (o = T.nextNode(), s++);
    }
    return T.currentNode = H, r;
  }
  p(e) {
    let a = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, a), a += i.strings.length - 2) : i._$AI(e[a])), a++;
  }
}
class K {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, a, i, r) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = a, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = D(this, e, a), G(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== B && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : vt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && G(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: a, _$litType$: i } = e, r = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = W.createElement(Qe(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(a);
    else {
      const s = new xt(r, this), d = s.u(this.options);
      s.p(a), this.T(d), this._$AH = s;
    }
  }
  _$AC(e) {
    let a = Ve.get(e.strings);
    return a === void 0 && Ve.set(e.strings, a = new W(e)), a;
  }
  k(e) {
    pe(this._$AH) || (this._$AH = [], this._$AR());
    const a = this._$AH;
    let i, r = 0;
    for (const o of e) r === a.length ? a.push(i = new K(this.O(q()), this.O(q()), this, this.options)) : i = a[r], i._$AI(o), r++;
    r < a.length && (this._$AR(i && i._$AB.nextSibling, r), a.length = r);
  }
  _$AR(e = this._$AA.nextSibling, a) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, a); e !== this._$AB; ) {
      const r = e.nextSibling;
      e.remove(), e = r;
    }
  }
  setConnected(e) {
    var a;
    this._$AM === void 0 && (this._$Cv = e, (a = this._$AP) == null || a.call(this, e));
  }
}
class ee {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, a, i, r, o) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = a, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = f;
  }
  _$AI(e, a = this, i, r) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = D(this, e, a, 0), s = !G(e) || e !== this._$AH && e !== B, s && (this._$AH = e);
    else {
      const d = e;
      let n, p;
      for (e = o[0], n = 0; n < o.length - 1; n++) p = D(this, d[i + n], a, n), p === B && (p = this._$AH[n]), s || (s = !G(p) || p !== this._$AH[n]), p === f ? e = f : e !== f && (e += (p ?? "") + o[n + 1]), this._$AH[n] = p;
    }
    s && !r && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class wt extends ee {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class At extends ee {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class kt extends ee {
  constructor(e, a, i, r, o) {
    super(e, a, i, r, o), this.type = 5;
  }
  _$AI(e, a = this) {
    if ((e = D(this, e, a, 0) ?? f) === B) return;
    const i = this._$AH, r = e === f && i !== f || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== f && (i === f || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var a;
    typeof this._$AH == "function" ? this._$AH.call(((a = this.options) == null ? void 0 : a.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class St {
  constructor(e, a, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = a, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    D(this, e);
  }
}
const se = V.litHtmlPolyfillSupport;
se == null || se(W, K), (V.litHtmlVersions ?? (V.litHtmlVersions = [])).push("3.3.1");
const Et = (t, e, a) => {
  const i = (a == null ? void 0 : a.renderBefore) ?? e;
  let r = i._$litPart$;
  if (r === void 0) {
    const o = (a == null ? void 0 : a.renderBefore) ?? null;
    i._$litPart$ = r = new K(e.insertBefore(q(), o), o, void 0, a ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis;
class N extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Et(a, this.renderRoot, this.renderOptions);
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
    return B;
  }
}
var Ke;
N._$litElement$ = !0, N.finalized = !0, (Ke = O.litElementHydrateSupport) == null || Ke.call(O, { LitElement: N });
const oe = O.litElementPolyfillSupport;
oe == null || oe({ LitElement: N });
(O.litElementVersions ?? (O.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = (t) => (e, a) => {
  a !== void 0 ? a.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = { attribute: !0, type: String, converter: Y, reflect: !1, hasChanged: de }, Mt = (t = Ct, e, a) => {
  const { kind: i, metadata: r } = a;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(a.name, t), i === "accessor") {
    const { name: s } = a;
    return { set(d) {
      const n = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(s, n, t);
    }, init(d) {
      return d !== void 0 && this.C(s, void 0, t, d), d;
    } };
  }
  if (i === "setter") {
    const { name: s } = a;
    return function(d) {
      const n = this[s];
      e.call(this, d), this.requestUpdate(s, n, t);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function E(t) {
  return (e, a) => typeof a == "object" ? Mt(t, e, a) : ((i, r, o) => {
    const s = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, i), s ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(t, e, a);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(t) {
  return E({ ...t, state: !0, attribute: !1 });
}
const Pt = ce`
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
`, Ft = {
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
        pN: "Custom {program}"
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
}, zt = {
  ui: Ft
}, Tt = {
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
        pN: "Personalizzato {program}."
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
}, Ot = {
  ui: Tt
}, qe = {
  en: zt,
  it: Ot
};
function Ge(t, e) {
  return e.split(".").reduce((a, i) => a == null ? void 0 : a[i], t);
}
function c(t, e, a) {
  let i = Ge(qe[t], e) ?? Ge(qe.en, e) ?? e;
  return a && Object.keys(a).forEach((r) => {
    i = i.replace(`{${r}}`, a[r]);
  }), i;
}
function m(t, e, a = void 0) {
  var i;
  return !t || !e ? a : (i = t.states[e]) == null ? void 0 : i.state;
}
function Nt(t, e = "en", a = 1) {
  return t === void 0 || isNaN(t) ? "n/a" : new Intl.NumberFormat(e, {
    minimumFractionDigits: a,
    maximumFractionDigits: a
  }).format(t);
}
function Ht(t, e, a) {
  var r, o;
  if (!t || !e || !a) return a ?? "n/a";
  const i = (o = (r = t.states[e]) == null ? void 0 : r.attributes) == null ? void 0 : o.unit_of_measurement;
  return i ? `${a} ${i}` : a;
}
function g(t, e) {
  var i;
  if (!t || !e) return !1;
  const a = (i = t.states[e]) == null ? void 0 : i.state;
  return a === "on" || a === "true" || a === !0;
}
function J(t, e, a = "en", i = 1) {
  const r = m(t, e), o = r !== void 0 ? parseFloat(r) : void 0, s = Nt(o, a, i);
  return Ht(t, e, s);
}
function b(t, e = 0) {
  if (t === void 0) return e;
  if (typeof t == "number") return t;
  const a = parseFloat(t);
  return isNaN(a) ? e : a;
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
          power_off: "ui.card.sabiana_vmc.actions.power_off",
          settings: "ui.card.sabiana_vmc.actions.settings"
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
var S = /* @__PURE__ */ ((t) => (t.Auto = "Auto", t.Program = "Program", t.Party = "Party", t.Holiday = "Holiday", t.Manual = "Manual", t))(S || {});
function _e(t) {
  return Object.values(S).includes(t) ? t : void 0;
}
function Ut(t) {
  switch (typeof t == "string" ? _e(t) : t) {
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
function Bt(t) {
  switch (typeof t == "string" ? _e(t) : t) {
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
var Dt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, j = (t, e, a, i) => {
  for (var r = i > 1 ? void 0 : i ? Rt(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (i ? s(e, a, r) : s(r)) || r);
  return i && r && Dt(e, a, r), r;
};
let P = class extends N {
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
    return y`
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
P.styles = ce`
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
  E({ type: Number })
], P.prototype, "value", 2);
j([
  E({ type: Number })
], P.prototype, "min", 2);
j([
  E({ type: Number })
], P.prototype, "max", 2);
j([
  E({ type: Number })
], P.prototype, "step", 2);
j([
  E({ type: String })
], P.prototype, "label", 2);
P = j([
  ue("range-slider")
], P);
var jt = Object.defineProperty, Lt = Object.getOwnPropertyDescriptor, te = (t, e, a, i) => {
  for (var r = i > 1 ? void 0 : i ? Lt(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (i ? s(e, a, r) : s(r)) || r);
  return i && r && jt(e, a, r), r;
};
let R = class extends N {
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
    return y`
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
R.styles = ce`
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
te([
  E({ type: Boolean })
], R.prototype, "checked", 2);
te([
  E({ type: String })
], R.prototype, "label", 2);
te([
  E({ type: Boolean })
], R.prototype, "disabled", 2);
R = te([
  ue("toggle-switch")
], R);
function It() {
  var fe, ge, be, ve, ye, $e, xe, we, Ae, ke, Se, Ee, Ce, Me, Pe, Fe, ze, Te, Oe;
  if (!this.hass || !this.config)
    return y`<div>Caricamento...</div>`;
  if (typeof this.error == "string" && this.error.length > 0)
    return y`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  const t = this.hass.language, e = "0.11.01.1762035267655", a = m(this.hass, (fe = this.entities) == null ? void 0 : fe.model, "n/a"), i = m(this.hass, (ge = this.entities) == null ? void 0 : ge.power, "off") === "on", r = Zt(this.hass, t, this.entities), o = Wt(this.hass, this.entities), s = o || c(this.hass.language, l.ui.card.sabiana_vmc.messages.no_alert), d = m(this.hass, (be = this.entities) == null ? void 0 : be.boost, "off") === "on", n = d ? c(t, l.ui.card.sabiana_vmc.messages.boost_on) : c(t, l.ui.card.sabiana_vmc.messages.boost_off), p = `

` + c(t, l.ui.card.sabiana_vmc.messages.boost_description), _ = m(this.hass, (ve = this.entities) == null ? void 0 : ve.flush, "off") === "on", u = _ ? c(t, l.ui.card.sabiana_vmc.messages.flush_on) : c(t, l.ui.card.sabiana_vmc.messages.flush_off), x = `

` + c(t, l.ui.card.sabiana_vmc.messages.flush_description), w = m(this.hass, (ye = this.entities) == null ? void 0 : ye.bypass, "off") === "on", F = w ? c(t, l.ui.card.sabiana_vmc.messages.bypass_on) : c(t, l.ui.card.sabiana_vmc.messages.bypass_off), et = `

` + c(t, l.ui.card.sabiana_vmc.messages.bypass_description), me = m(this.hass, ($e = this.entities) == null ? void 0 : $e.defrost, "off") === "on", he = me ? c(t, l.ui.card.sabiana_vmc.messages.defrost_on) : c(t, l.ui.card.sabiana_vmc.messages.defrost_off), Z = m(this.hass, (xe = this.entities) == null ? void 0 : xe.mode) || "", tt = b(m(this.hass, (we = this.entities) == null ? void 0 : we.program)), at = b(m(this.hass, (Ae = this.entities) == null ? void 0 : Ae.fan_speed)), ae = Vt(b(m(this.hass, (ke = this.entities) == null ? void 0 : ke.duty_cycle_fan_1))), it = i && ae > 0 ? "fan-anim" : "", rt = b(m(this.hass, (Se = this.entities) == null ? void 0 : Se.holiday_mode_days), 1), st = b(m(this.hass, (Ee = this.entities) == null ? void 0 : Ee.temp_for_free_cooling), 26), ot = b(m(this.hass, (Ce = this.entities) == null ? void 0 : Ce.temp_for_free_heating), 20), nt = b(m(this.hass, (Me = this.entities) == null ? void 0 : Me.boost_time), 180), lt = b(m(this.hass, (Pe = this.entities) == null ? void 0 : Pe.filter_life), 180);
  return y`
<ha-card>
  <div class="spinner ${this.spinner() ? "" : "hidden-element"}">
    <ha-icon icon="mdi:loading"></ha-icon>
  </div>

  <div class="header">
    <div class="name">
      Sabiana ${a}
    </div>
    <div class="group-selector" style="width: 120px; margin: 0;">     
      <button
        class="group-button ${i ? "selected" : ""}"
        @click=${() => this.togglePower()}
        title="${i ? c(t, l.ui.card.sabiana_vmc.actions.power_off) : c(t, l.ui.card.sabiana_vmc.actions.power_on)}">
        <ha-icon class=${i ? "power-button-on" : "power-button-off"} icon="mdi:power"></ha-icon>
      </button>
      <button
        class="group-button"
        @click=${() => alert("TODO")}
        title="${c(t, l.ui.card.sabiana_vmc.actions.settings)}">
        <ha-icon icon="mdi:dots-vertical"></ha-icon>
      </button>
    </div>
  </div>

  <div class="main-row">

    <div class="temps">
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.internal)}"
          icon="mdi:home-thermometer"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.temperature_in))}">
        </ha-icon>
        <div>${J(this.hass, (Fe = this.entities) == null ? void 0 : Fe.temp_in)}</div>
      </div>      
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.flow)}"
          icon="mdi:home-import-outline"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.temperature_flow))}">
        </ha-icon>
        <div>${J(this.hass, (ze = this.entities) == null ? void 0 : ze.temp_flow)}</div>
      </div>
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.efficiency)}"
          icon="mdi:swap-vertical"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.efficiency))}">
        </ha-icon>
        <div>${Kt(this.hass, this.entities)} %</div>
      </div>
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.disposal)}"
          icon="mdi:home-export-outline"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.temperature_disposal))}">
        </ha-icon>
        <div>${J(this.hass, (Te = this.entities) == null ? void 0 : Te.temp_disposal)}</div>
      </div>
      <div>
        <ha-icon 
          title="${c(t, l.ui.card.sabiana_vmc.temperature.external)}"
          icon="mdi:home-thermometer-outline"
          @click="${() => this.openModal(c(t, l.ui.card.sabiana_vmc.messages.temperature_out))}">
        </ha-icon>
        <div>${J(this.hass, (Oe = this.entities) == null ? void 0 : Oe.temp_external)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${it}"
        fill="currentColor"
        style="${ae > 0 ? `animation-duration: ${qt(ae)};` : ""}"
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
        class="${r.days <= 0 ? "alert" : r.days < 10 ? "warning" : "off"}"
        title="${r.title}"
        icon="mdi:air-filter"
        @click="${() => {
    this.modalFilterLife = !0, this.openModal(r.message);
  }}">
      </ha-icon>

      <ha-icon 
        class="${d ? "on" : "off"}"
        title="${n}"
        icon="mdi:fan-plus"
        @click="${() => {
    this.modalBoost = !0, this.openModal(n + p);
  }}">
      </ha-icon>

      <ha-icon 
        class="${w ? "on" : "off"}"
        title="${F}"
        icon="mdi:debug-step-over"
        @click="${() => {
    this.modalTemp4Bypass = !0, this.openModal(F + et);
  }}">
      </ha-icon>

      <ha-icon 
        class="${_ ? "on" : "off"}"
        title="${u}"
        icon="mdi:weather-windy"
        @click="${() => {
    this.modalFlush = !0, this.openModal(u + x);
  }}">
      </ha-icon>

      <ha-icon 
        class="${me ? "on" : "off"}"
        title="${he}"
        icon="mdi:car-defrost-front"
        @click="${() => this.openModal(he)}">
      </ha-icon>

    </div>

  </div>  

  <div class="group-selector">
    ${Object.keys(S).map((h) => y`
      <button
        aria-label="${h}"
        class="group-button ${Z === h ? "selected" : ""}"
        @click=${() => this.selectMode(_e(h))}
        title="${c(t, Bt(h))}"
        ?disabled="${!i}">
        <ha-icon icon="${Ut(h)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="group-manual ${Z !== S.Manual ? "hidden-element" : ""}">
    ${Array.from({ length: 4 }, (h, k) => y`
      <button 
        aria-label="${k}"
        class="group-button ${at === k ? "selected" : ""}"
        @click="${() => this.setFanSpeed(k)}"
        ?disabled="${!i}">
        <ha-icon icon="${Gt(k)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${Z !== S.Program ? "hidden-element" : ""}">
    ${Array.from({ length: 7 }, (h, k) => y`
      <button 
        aria-label="${We(t, k)}"
        title="${We(t, k)}"
        class="program-button ${tt === k ? "selected" : ""}"
        @click="${() => this.setProgram(k)}"
        ?disabled="${!i}">
        <ha-icon icon="mdi:numeric-${k + 1}"></ha-icon>
      </button>
      `)}
  </div>

  <div
    class="holiday-group-days ${Z !== S.Holiday ? "hidden-element" : ""} range-container">
    <range-slider 
      label="${c(t, l.ui.card.sabiana_vmc.messages.holiday_mode_days_set)}" 
      .min="${1}" 
      .max="${60}"
      .value="${rt}"
      @value-changed="${(h) => this.setHolidayModeModeDays(h.detail.value)}"
      ></range-slider>
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${e}</div>
  </div>

  ${this.modalMessage.length > 0 ? y`
    <div class="modal" @click="${this.closeModal}">
      <div class="modal-content" @click="${(h) => h.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <p style="white-space: pre-line">${this.modalMessage}</p>

        ${this.modalTemp4Bypass ? y`
          <range-slider 
            label="${c(t, l.ui.card.sabiana_vmc.messages.temp_for_free_cooling_set)}" 
            .min="${10}" 
            .max="${35}"
            .value="${st}"
            @value-changed="${(h) => this.setTempForFreeCooling(h.detail.value)}"
            ></range-slider>

          <range-slider 
            label="${c(t, l.ui.card.sabiana_vmc.messages.temp_for_free_heating_set)}" 
            .min="${10}" 
            .max="${30}"
            .value="${ot}"
            @value-changed="${(h) => this.setTempForFreeHeating(h.detail.value)}"
            ></range-slider>
        ` : ""}

        ${this.modalBoost ? y`
          <range-slider 
            label="${c(t, l.ui.card.sabiana_vmc.messages.boost_time_set)}" 
            .min="${15}" 
            .max="${240}"
            .value="${nt}"
            @value-changed="${(h) => this.setBoostTime(h.detail.value)}"
            ></range-slider>
        ` : ""}

        ${this.modalFilterLife ? y`
          <range-slider 
            label="${c(t, l.ui.card.sabiana_vmc.messages.filter_life)}" 
            .min="${30}" 
            .max="${400}"
            .value="${lt}"
            @value-changed="${(h) => this.setFilterLife(h.detail.value)}"
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

        ${this.modalFlush ? y`
          <toggle-switch
            label="${c(t, l.ui.card.sabiana_vmc.messages.flush_mode)}"
            .checked="${_}"
            @toggle-changed="${(h) => this.setFlush(h.detail.checked)}"
          ></toggle-switch>
          ` : ""}

      </div>
    </div>` : ""}

</ha-card>
`;
}
function Vt(t) {
  const e = [
    { speed: 0, percent: 0 },
    { speed: 1, percent: 40 },
    { speed: 2, percent: 55 },
    { speed: 3, percent: 70 },
    { speed: 4, percent: 85 }
  ];
  let a = e[0], i = Math.abs(t - e[0].percent);
  for (let r = 1; r < e.length; r++) {
    const o = Math.abs(t - e[r].percent);
    o < i && (a = e[r], i = o);
  }
  return a.speed;
}
function qt(t) {
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
function Gt(t) {
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
function We(t, e) {
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
function Wt(t, e) {
  let a = "";
  const i = (r) => {
    a.length > 0 && (a += `
`), a += r;
  };
  return g(t, e == null ? void 0 : e.t1_probe_failure) && i(c(t.language, l.ui.card.sabiana_vmc.messages.t1_probe_failure)), g(t, e == null ? void 0 : e.t2_probe_failure) && i(c(t.language, l.ui.card.sabiana_vmc.messages.t2_probe_failure)), g(t, e == null ? void 0 : e.t3_probe_failure) && i(c(t.language, l.ui.card.sabiana_vmc.messages.t3_probe_failure)), g(t, e == null ? void 0 : e.t4_probe_failure) && i(c(t.language, l.ui.card.sabiana_vmc.messages.t4_probe_failure)), g(t, e == null ? void 0 : e.timekeeper_failure) && i(c(t.language, l.ui.card.sabiana_vmc.messages.timekeeper_failure)), g(t, e == null ? void 0 : e.frost_alarm_t1_probe) && i(c(t.language, l.ui.card.sabiana_vmc.messages.frost_alarm_t1_probe)), g(t, e == null ? void 0 : e.frost_alarm_t2_probe) && i(c(t.language, l.ui.card.sabiana_vmc.messages.frost_alarm_t2_probe)), g(t, e == null ? void 0 : e.fireplace_alarm) && i(c(t.language, l.ui.card.sabiana_vmc.messages.fireplace_alarm)), g(t, e == null ? void 0 : e.pressure_transducer_failure) && i(c(t.language, l.ui.card.sabiana_vmc.messages.pressure_transducer_failure)), g(t, e == null ? void 0 : e.filter_alarm) && i(c(t.language, l.ui.card.sabiana_vmc.messages.filter_alarm)), g(t, e == null ? void 0 : e.fans_failure) && i(c(t.language, l.ui.card.sabiana_vmc.messages.fans_failure)), g(t, e == null ? void 0 : e.rh_or_co2_sensor_failure) && i(c(t.language, l.ui.card.sabiana_vmc.messages.rh_or_co2_sensor_failure)), g(t, e == null ? void 0 : e.fan_thermic_input_alarm) && i(c(t.language, l.ui.card.sabiana_vmc.messages.fan_thermic_input_alarm)), g(t, e == null ? void 0 : e.pre_heating_alarm) && i(c(t.language, l.ui.card.sabiana_vmc.messages.pre_heating_alarm)), g(t, e == null ? void 0 : e.pre_frost_alarm_t2) && i(c(t.language, l.ui.card.sabiana_vmc.messages.pre_frost_alarm_t2)), a;
}
function Kt(t, e) {
  const a = b(m(t, e == null ? void 0 : e.temp_in)), i = b(m(t, e == null ? void 0 : e.temp_external)), r = b(m(t, e == null ? void 0 : e.temp_flow)), o = b(m(t, e == null ? void 0 : e.temp_disposal)), s = r - i, d = a - o;
  let n = 0;
  return isFinite(s) && isFinite(d) && Math.abs(d) > 0.5 && (i < a ? n = s / d * 100 : i > a && (n = -s / -d * 100), Math.abs(r - i) < 0.5 && (n = 0), n !== void 0 && (n = Math.max(0, Math.min(100, n)), n = Math.round(n))), n;
}
function Zt(t, e, a) {
  let i = { days: 0, title: "N/A", message: "" };
  const r = b(m(t, a == null ? void 0 : a.filter_counter)), o = b(m(t, a == null ? void 0 : a.filter_life));
  let s = 0;
  return isFinite(r) && isFinite(o) && o > 0 && (s = r * 15, s = s / 60, s = Math.round(s / 24), i.days = o - s), i.days < 0 ? i.title = c(e, l.ui.card.sabiana_vmc.messages.filter_overdue) : i.title = c(e, l.ui.card.sabiana_vmc.messages.filter_2_replace, { days: "" + i.days }), s > 0 && (i.message = c(e, l.ui.card.sabiana_vmc.messages.filter_used, { days: "" + s }) + `
`, i.message += i.title), i;
}
const Jt = {
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
  flush: "switch.@prefix@_blk2_flush_mode_set",
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
function Xt(t) {
  const e = Object.entries(Jt).map(([a, i]) => [
    a,
    i.replace("@prefix@", t)
  ]);
  return Object.fromEntries(e);
}
var Yt = Object.defineProperty, Qt = Object.getOwnPropertyDescriptor, $ = (t, e, a, i) => {
  for (var r = i > 1 ? void 0 : i ? Qt(e, a) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (i ? s(e, a, r) : s(r)) || r);
  return i && r && Yt(e, a, r), r;
};
let v = class extends N {
  constructor() {
    super(...arguments), this.modalMessage = "", this.spinnerSelectMode = !1, this.spinnerFlush = !1, this.modalTemp4Bypass = !1, this.modalFlush = !1, this.modalBoost = !1, this.modalFilterLife = !1, this.render = It;
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
    var e, a, i, r, o, s, d;
    if (super.updated(t), t.has("config")) {
      if (!this.hass || !((e = this.config) != null && e.entity_prefix))
        return;
      this.entities = Xt(this.config.entity_prefix);
      for (const [n, p] of Object.entries(this.entities))
        (a = this.hass) != null && a.states && (this.hass.states[p] || (this.error = c(
          ((i = this.hass) == null ? void 0 : i.language) ?? "en",
          l.ui.card.sabiana_vmc.errors.missing_entity,
          { entity: n }
        )));
    } else if (this.spinnerSelectMode && t.has("hass")) {
      const n = t.get("hass"), p = m(n, (r = this.entities) == null ? void 0 : r.mode), _ = m(this.hass, (o = this.entities) == null ? void 0 : o.mode);
      p !== _ && (console.log("La modalità di funzionamento è cambiata:", _), this.spinnerSelectMode = !1);
    } else if (this.spinnerFlush && t.has("hass")) {
      const n = t.get("hass"), p = m(n, (s = this.entities) == null ? void 0 : s.flush), _ = m(this.hass, (d = this.entities) == null ? void 0 : d.flush);
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
    var a, i, r, o, s, d;
    if (!((a = this.entities) != null && a.mode) || !t) return;
    let e = "";
    switch (t) {
      case S.Manual:
        e = ((i = this.entities) == null ? void 0 : i.mode_command_manual) || "";
        break;
      case S.Holiday:
        e = ((r = this.entities) == null ? void 0 : r.mode_command_holiday) || "";
        break;
      case S.Party:
        e = ((o = this.entities) == null ? void 0 : o.mode_command_party) || "";
        break;
      case S.Program:
        e = ((s = this.entities) == null ? void 0 : s.mode_command_program) || "";
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
    this.modalMessage = "", this.modalTemp4Bypass = !1, this.modalFlush = !1, this.modalBoost = !1, this.modalFilterLife = !1;
  }
  //#endregion
};
v.styles = Pt;
$([
  A()
], v.prototype, "hass", 2);
$([
  A()
], v.prototype, "config", 2);
$([
  A()
], v.prototype, "entities", 2);
$([
  A()
], v.prototype, "modalMessage", 2);
$([
  A()
], v.prototype, "error", 2);
$([
  A()
], v.prototype, "spinnerSelectMode", 2);
$([
  A()
], v.prototype, "spinnerFlush", 2);
$([
  A()
], v.prototype, "modalTemp4Bypass", 2);
$([
  A()
], v.prototype, "modalFlush", 2);
$([
  A()
], v.prototype, "modalBoost", 2);
$([
  A()
], v.prototype, "modalFilterLife", 2);
v = $([
  ue("sabiana-vmc-card")
], v);
export {
  v as SabianaVmcCard
};
