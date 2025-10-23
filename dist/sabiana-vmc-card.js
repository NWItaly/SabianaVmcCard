/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, ae = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ie = Symbol(), Se = /* @__PURE__ */ new WeakMap();
let Re = class {
  constructor(e, t, a) {
    if (this._$cssResult$ = !0, a !== ie) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ae && e === void 0) {
      const a = t !== void 0 && t.length === 1;
      a && (e = Se.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), a && Se.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ye = (r) => new Re(typeof r == "string" ? r : r + "", void 0, ie), je = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((a, i, s) => a + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[s + 1], r[0]);
  return new Re(t, r, ie);
}, Qe = (r, e) => {
  if (ae) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const a = document.createElement("style"), i = Z.litNonce;
    i !== void 0 && a.setAttribute("nonce", i), a.textContent = t.cssText, r.appendChild(a);
  }
}, ke = ae ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const a of e.cssRules) t += a.cssText;
  return Ye(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Xe, defineProperty: et, getOwnPropertyDescriptor: tt, getOwnPropertyNames: rt, getOwnPropertySymbols: at, getPrototypeOf: it } = Object, E = globalThis, Ee = E.trustedTypes, st = Ee ? Ee.emptyScript : "", X = E.reactiveElementPolyfillSupport, L = (r, e) => r, J = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? st : null;
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
} }, se = (r, e) => !Xe(r, e), Ce = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: se };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let H = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ce) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const a = Symbol(), i = this.getPropertyDescriptor(e, a, t);
      i !== void 0 && et(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, a) {
    const { get: i, set: s } = tt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const l = i == null ? void 0 : i.call(this);
      s == null || s.call(this, o), this.requestUpdate(e, l, a);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ce;
  }
  static _$Ei() {
    if (this.hasOwnProperty(L("elementProperties"))) return;
    const e = it(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(L("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(L("properties"))) {
      const t = this.properties, a = [...rt(t), ...at(t)];
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
      for (const i of a) t.unshift(ke(i));
    } else e !== void 0 && t.push(ke(e));
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
    return Qe(e, this.constructor.elementStyles), e;
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
    var s;
    const a = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, a);
    if (i !== void 0 && a.reflect === !0) {
      const o = (((s = a.converter) == null ? void 0 : s.toAttribute) !== void 0 ? a.converter : J).toAttribute(t, a.type);
      this._$Em = e, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, o;
    const a = this.constructor, i = a._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const l = a.getPropertyOptions(i), n = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((s = l.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? l.converter : J;
      this._$Em = i;
      const u = n.fromAttribute(t, l.type);
      this[i] = u ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, t, a) {
    var i;
    if (e !== void 0) {
      const s = this.constructor, o = this[e];
      if (a ?? (a = s.getPropertyOptions(e)), !((a.hasChanged ?? se)(o, t) || a.useDefault && a.reflect && o === ((i = this._$Ej) == null ? void 0 : i.get(e)) && !this.hasAttribute(s._$Eu(e, a)))) return;
      this.C(e, t, a);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: a, reflect: i, wrapped: s }, o) {
    a && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || a || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: l } = o, n = this[s];
        l !== !0 || this._$AL.has(s) || n === void 0 || this.C(s, void 0, o, n);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (a = this._$EO) == null || a.forEach((i) => {
        var s;
        return (s = i.hostUpdate) == null ? void 0 : s.call(i);
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
H.elementStyles = [], H.shadowRootOptions = { mode: "open" }, H[L("elementProperties")] = /* @__PURE__ */ new Map(), H[L("finalized")] = /* @__PURE__ */ new Map(), X == null || X({ ReactiveElement: H }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, Y = I.trustedTypes, Pe = Y ? Y.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, De = "$lit$", k = `lit$${Math.random().toFixed(9).slice(2)}$`, Le = "?" + k, ot = `<${Le}>`, N = document, V = () => N.createComment(""), G = (r) => r === null || typeof r != "object" && typeof r != "function", oe = Array.isArray, nt = (r) => oe(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", ee = `[ 	
\f\r]`, D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Me = /-->/g, Te = />/g, M = RegExp(`>|${ee}(?:([^\\s"'>=/]+)(${ee}*=${ee}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ze = /'/g, Oe = /"/g, Ie = /^(?:script|style|textarea|title)$/i, lt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), x = lt(1), F = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Ne = /* @__PURE__ */ new WeakMap(), z = N.createTreeWalker(N, 129);
function Ve(r, e) {
  if (!oe(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pe !== void 0 ? Pe.createHTML(e) : e;
}
const ct = (r, e) => {
  const t = r.length - 1, a = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = D;
  for (let l = 0; l < t; l++) {
    const n = r[l];
    let u, _, p = -1, g = 0;
    for (; g < n.length && (o.lastIndex = g, _ = o.exec(n), _ !== null); ) g = o.lastIndex, o === D ? _[1] === "!--" ? o = Me : _[1] !== void 0 ? o = Te : _[2] !== void 0 ? (Ie.test(_[2]) && (i = RegExp("</" + _[2], "g")), o = M) : _[3] !== void 0 && (o = M) : o === M ? _[0] === ">" ? (o = i ?? D, p = -1) : _[1] === void 0 ? p = -2 : (p = o.lastIndex - _[2].length, u = _[1], o = _[3] === void 0 ? M : _[3] === '"' ? Oe : ze) : o === Oe || o === ze ? o = M : o === Me || o === Te ? o = D : (o = M, i = void 0);
    const y = o === M && r[l + 1].startsWith("/>") ? " " : "";
    s += o === D ? n + ot : p >= 0 ? (a.push(u), n.slice(0, p) + De + n.slice(p) + k + y) : n + k + (p === -2 ? l : y);
  }
  return [Ve(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), a];
};
class q {
  constructor({ strings: e, _$litType$: t }, a) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, n = this.parts, [u, _] = ct(e, t);
    if (this.el = q.createElement(u, a), z.currentNode = this.el.content, t === 2 || t === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = z.nextNode()) !== null && n.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(De)) {
          const g = _[o++], y = i.getAttribute(p).split(k), S = /([.?@])?(.*)/.exec(g);
          n.push({ type: 1, index: s, name: S[2], strings: y, ctor: S[1] === "." ? pt : S[1] === "?" ? ut : S[1] === "@" ? _t : Q }), i.removeAttribute(p);
        } else p.startsWith(k) && (n.push({ type: 6, index: s }), i.removeAttribute(p));
        if (Ie.test(i.tagName)) {
          const p = i.textContent.split(k), g = p.length - 1;
          if (g > 0) {
            i.textContent = Y ? Y.emptyScript : "";
            for (let y = 0; y < g; y++) i.append(p[y], V()), z.nextNode(), n.push({ type: 2, index: ++s });
            i.append(p[g], V());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Le) n.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(k, p + 1)) !== -1; ) n.push({ type: 7, index: s }), p += k.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const a = N.createElement("template");
    return a.innerHTML = e, a;
  }
}
function B(r, e, t = r, a) {
  var o, l;
  if (e === F) return e;
  let i = a !== void 0 ? (o = t._$Co) == null ? void 0 : o[a] : t._$Cl;
  const s = G(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), s === void 0 ? i = void 0 : (i = new s(r), i._$AT(r, t, a)), a !== void 0 ? (t._$Co ?? (t._$Co = []))[a] = i : t._$Cl = i), i !== void 0 && (e = B(r, i._$AS(r, e.values), i, a)), e;
}
class dt {
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
    const { el: { content: t }, parts: a } = this._$AD, i = ((e == null ? void 0 : e.creationScope) ?? N).importNode(t, !0);
    z.currentNode = i;
    let s = z.nextNode(), o = 0, l = 0, n = a[0];
    for (; n !== void 0; ) {
      if (o === n.index) {
        let u;
        n.type === 2 ? u = new W(s, s.nextSibling, this, e) : n.type === 1 ? u = new n.ctor(s, n.name, n.strings, this, e) : n.type === 6 && (u = new mt(s, this, e)), this._$AV.push(u), n = a[++l];
      }
      o !== (n == null ? void 0 : n.index) && (s = z.nextNode(), o++);
    }
    return z.currentNode = N, i;
  }
  p(e) {
    let t = 0;
    for (const a of this._$AV) a !== void 0 && (a.strings !== void 0 ? (a._$AI(e, a, t), t += a.strings.length - 2) : a._$AI(e[t])), t++;
  }
}
class W {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, a, i) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = a, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    e = B(this, e, t), G(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== F && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : nt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && G(this._$AH) ? this._$AA.nextSibling.data = e : this.T(N.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: a } = e, i = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = q.createElement(Ve(a.h, a.h[0]), this.options)), a);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(t);
    else {
      const o = new dt(i, this), l = o.u(this.options);
      o.p(t), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Ne.get(e.strings);
    return t === void 0 && Ne.set(e.strings, t = new q(e)), t;
  }
  k(e) {
    oe(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let a, i = 0;
    for (const s of e) i === t.length ? t.push(a = new W(this.O(V()), this.O(V()), this, this.options)) : a = t[i], a._$AI(s), i++;
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
class Q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, a, i, s) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, a.length > 2 || a[0] !== "" || a[1] !== "" ? (this._$AH = Array(a.length - 1).fill(new String()), this.strings = a) : this._$AH = m;
  }
  _$AI(e, t = this, a, i) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = B(this, e, t, 0), o = !G(e) || e !== this._$AH && e !== F, o && (this._$AH = e);
    else {
      const l = e;
      let n, u;
      for (e = s[0], n = 0; n < s.length - 1; n++) u = B(this, l[a + n], t, n), u === F && (u = this._$AH[n]), o || (o = !G(u) || u !== this._$AH[n]), u === m ? e = m : e !== m && (e += (u ?? "") + s[n + 1]), this._$AH[n] = u;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class pt extends Q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class ut extends Q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class _t extends Q {
  constructor(e, t, a, i, s) {
    super(e, t, a, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = B(this, e, t, 0) ?? m) === F) return;
    const a = this._$AH, i = e === m && a !== m || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, s = e !== m && (a === m || i);
    i && this.element.removeEventListener(this.name, this, a), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class mt {
  constructor(e, t, a) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = a;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    B(this, e);
  }
}
const te = I.litHtmlPolyfillSupport;
te == null || te(q, W), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.3.1");
const ht = (r, e, t) => {
  const a = (t == null ? void 0 : t.renderBefore) ?? e;
  let i = a._$litPart$;
  if (i === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    a._$litPart$ = i = new W(e.insertBefore(V(), s), s, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis;
class U extends H {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ht(t, this.renderRoot, this.renderOptions);
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
    return F;
  }
}
var Be;
U._$litElement$ = !0, U.finalized = !0, (Be = O.litElementHydrateSupport) == null || Be.call(O, { LitElement: U });
const re = O.litElementPolyfillSupport;
re == null || re({ LitElement: U });
(O.litElementVersions ?? (O.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = (r) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, e);
  }) : customElements.define(r, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: se }, bt = (r = ft, e, t) => {
  const { kind: a, metadata: i } = t;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), a === "setter" && ((r = Object.create(r)).wrapped = !0), s.set(t.name, r), a === "accessor") {
    const { name: o } = t;
    return { set(l) {
      const n = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, n, r);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, r, l), l;
    } };
  }
  if (a === "setter") {
    const { name: o } = t;
    return function(l) {
      const n = this[o];
      e.call(this, l), this.requestUpdate(o, n, r);
    };
  }
  throw Error("Unsupported decorator location: " + a);
};
function R(r) {
  return (e, t) => typeof t == "object" ? bt(r, e, t) : ((a, i, s) => {
    const o = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, a), o ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(r) {
  return R({ ...r, state: !0, attribute: !1 });
}
const gt = je`
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
`, vt = {
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
        pre_frost_alarm_t2: "Pre frost alarm (T2)",
        holiday_mode_days_set: "Holiday mode days:",
        temp_for_free_cooling_set: "Free Cooling Temperature Setpoint (°C):",
        temp_for_free_heating_set: "Free Heating Temperature Setpoint (°C):",
        boost_time_set: "Boost/Party time (min):"
      },
      errors: {
        missing_config: "Missing or invalid configuration: {key}",
        missing_entity: "Missing or invalid entity: {entity}"
      },
      version: "Version {version}"
    }
  }
}, yt = {
  ui: vt
}, $t = {
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
        boost_on: "La modalità Festa/Boost è attiva.",
        boost_off: "La modalità Festa/Boost è disattiva.",
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
        pre_frost_alarm_t2: "Preallarme gelo (T2)",
        holiday_mode_days_set: "Giorni di modalità vacanza:",
        temp_for_free_cooling_set: "Valore di riferimento per il raffrescamento (°C):",
        temp_for_free_heating_set: "Valore di riferimento per il riscaldamento (°C):",
        boost_time_set: "Durata della modalità Festa/Boost (°C):"
      },
      errors: {
        missing_config: "Configurazione mancante o non valida: {key}.",
        missing_entity: "Entità mancante o non valida: {entity}."
      },
      version: "Versione {version}"
    }
  }
}, xt = {
  ui: $t
}, He = {
  en: yt,
  it: xt
};
function Ue(r, e) {
  return e.split(".").reduce((t, a) => t == null ? void 0 : t[a], r);
}
function d(r, e, t) {
  let a = Ue(He[r], e) ?? Ue(He.en, e) ?? e;
  return t && Object.keys(t).forEach((i) => {
    a = a.replace(`{${i}}`, t[i]);
  }), a;
}
function f(r, e, t = void 0) {
  var a;
  return !r || !e ? t : (a = r.states[e]) == null ? void 0 : a.state;
}
function wt(r, e = "en", t = 1) {
  return r === void 0 || isNaN(r) ? "n/a" : new Intl.NumberFormat(e, {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  }).format(r);
}
function At(r, e, t) {
  var i, s;
  if (!r || !e || !t) return t ?? "n/a";
  const a = (s = (i = r.states[e]) == null ? void 0 : i.attributes) == null ? void 0 : s.unit_of_measurement;
  return a ? `${t} ${a}` : t;
}
function b(r, e) {
  var a;
  if (!r || !e) return !1;
  const t = (a = r.states[e]) == null ? void 0 : a.state;
  return t === "on" || t === "true" || t === !0;
}
function K(r, e, t = "en", a = 1) {
  const i = f(r, e), s = i !== void 0 ? parseFloat(i) : void 0, o = wt(s, t, a);
  return At(r, e, o);
}
function T(r, e = 0) {
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
          defrost_off: "ui.card.sabiana_vmc.messages.defrost_off",
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
          boost_time_set: "ui.card.sabiana_vmc.messages.boost_time_set"
        },
        errors: {
          missing_config: "ui.card.sabiana_vmc.errors.missing_config",
          missing_entity: "ui.card.sabiana_vmc.errors.missing_entity"
        }
      }
    }
  }
};
var w = /* @__PURE__ */ ((r) => (r.Auto = "Auto", r.Program = "Program", r.Party = "Party", r.Holiday = "Holiday", r.Manual = "Manual", r))(w || {});
function ne(r) {
  return Object.values(w).includes(r) ? r : void 0;
}
function St(r) {
  switch (typeof r == "string" ? ne(r) : r) {
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
function kt(r) {
  switch (typeof r == "string" ? ne(r) : r) {
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
var Et = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, j = (r, e, t, a) => {
  for (var i = a > 1 ? void 0 : a ? Ct(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (i = (a ? o(e, t, i) : o(i)) || i);
  return a && i && Et(e, t, i), i;
};
let C = class extends U {
  constructor() {
    super(...arguments), this.value = 0, this.min = 0, this.max = 100, this.step = 1, this.label = "";
  }
  handleInput(r) {
    const e = Number(r.target.value);
    this.value = e, this.dispatchEvent(new CustomEvent("value-changed", {
      detail: { value: e },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    const r = (this.value - this.min) / (this.max - this.min) * 100;
    return x`
      <div class="range-container">
        <div class="range-header">
          <span class="range-label">${this.label}</span>
          <span class="range-value">${this.value}</span>
        </div>
        <div class="range-wrapper">
          <div class="range-progress" style="width: ${r}%"></div>
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
C.styles = je`
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
], C.prototype, "value", 2);
j([
  R({ type: Number })
], C.prototype, "min", 2);
j([
  R({ type: Number })
], C.prototype, "max", 2);
j([
  R({ type: Number })
], C.prototype, "step", 2);
j([
  R({ type: String })
], C.prototype, "label", 2);
C = j([
  Ge("range-slider")
], C);
function Pt() {
  var le, ce, de, pe, ue, _e, me, he, fe, be, ge, ve, ye, $e, xe, we, Ae;
  if (!this.hass || !this.config)
    return x`<div>Caricamento...</div>`;
  if (typeof this.error == "string" && this.error.length > 0)
    return x`<ha-alert alert-type="error">${this.error}</ha-alert>`;
  const r = this.hass.language, e = "0.10.23.1761257659917", t = f(this.hass, (le = this.entities) == null ? void 0 : le.model, "n/a"), a = f(this.hass, (ce = this.entities) == null ? void 0 : ce.power, "off") === "on", i = Ot(this.hass, this.entities), s = f(this.hass, (de = this.entities) == null ? void 0 : de.boost, "off") === "on", o = s ? d(r, c.ui.card.sabiana_vmc.messages.boost_on) : d(r, c.ui.card.sabiana_vmc.messages.boost_off), l = f(this.hass, (pe = this.entities) == null ? void 0 : pe.bypass, "off") === "on", n = l ? d(r, c.ui.card.sabiana_vmc.messages.bypass_on) : d(r, c.ui.card.sabiana_vmc.messages.bypass_off), u = f(this.hass, (ue = this.entities) == null ? void 0 : ue.defrost, "off") === "on", _ = u ? d(r, c.ui.card.sabiana_vmc.messages.defrost_on) : d(r, c.ui.card.sabiana_vmc.messages.defrost_off), p = f(this.hass, (_e = this.entities) == null ? void 0 : _e.mode) || "", g = T(f(this.hass, (me = this.entities) == null ? void 0 : me.program)), y = T(f(this.hass, (he = this.entities) == null ? void 0 : he.fan_speed)), S = Mt(T(f(this.hass, (fe = this.entities) == null ? void 0 : fe.duty_cycle_fan_1))), qe = a && S > 0 ? "fan-anim" : "", We = T(f(this.hass, (be = this.entities) == null ? void 0 : be.holiday_mode_days), 1), Ke = T(f(this.hass, (ge = this.entities) == null ? void 0 : ge.temp_for_free_cooling), 26), Ze = T(f(this.hass, (ve = this.entities) == null ? void 0 : ve.temp_for_free_heating), 20), Je = T(f(this.hass, (ye = this.entities) == null ? void 0 : ye.boost_time), 180);
  return x`
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
        <div>${K(this.hass, ($e = this.entities) == null ? void 0 : $e.temp_in)}</div>
        <div class="label">${d(r, c.ui.card.sabiana_vmc.temperature.internal)}</div>
      </div>
      <div>
        <div>${K(this.hass, (xe = this.entities) == null ? void 0 : xe.temp_out)}</div>
        <div class="label">${d(r, c.ui.card.sabiana_vmc.temperature.external)}</div>
      </div>
      <div>
        <div>${K(this.hass, (we = this.entities) == null ? void 0 : we.temp_exhaust)}</div>
        <div class="label">${d(r, c.ui.card.sabiana_vmc.temperature.exhaust)}</div>
      </div>
      <div>
        <div>${K(this.hass, (Ae = this.entities) == null ? void 0 : Ae.temp_disposal)}</div>
        <div class="label">${d(r, c.ui.card.sabiana_vmc.temperature.disposal)}</div>
      </div>
    </div>

    <div
      class="fan-icon"
      aria-label="Fan speed indicator">
      <svg xmlns="http://www.w3.org/2000/svg" 
        class="${qe}"
        fill="currentColor"
        style="${S > 0 ? `animation-duration: ${Tt(S)};` : ""}"
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
        class="${s ? "on" : "off"}"
        title="${o}"
        icon="mdi:fan-plus"
        @click="${() => {
    this.modalBoost = !0, this.openModal(o);
  }}">
      </ha-icon>

      <ha-icon 
        class="${l ? "on" : "off"}"
        title="${n}"
        icon="mdi:debug-step-over"
        @click="${() => {
    this.modalTemp4Bypass = !0, this.openModal(n);
  }}">
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
    ${Object.keys(w).map((h) => x`
      <button
        aria-label="${h}"
        class="mode-button ${p === h ? "selected" : ""}"
        @click=${() => this.selectMode(ne(h))}
        title="${d(r, kt(h))}"
        ?disabled="${!a}">
        <ha-icon icon="${St(h)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="speed-manual ${p !== w.Manual ? "hidden-element" : ""}">
    ${Array.from({ length: 4 }, (h, $) => x`
      <button 
        aria-label="${$}"
        class="speed-button ${y === $ ? "selected" : ""}"
        @click="${() => this.setFanSpeed($)}"
        ?disabled="${!a}">
        <ha-icon icon="${zt($)}"></ha-icon>
      </button>
    `)}
  </div>

  <div
    class="program-selection ${p !== w.Program ? "hidden-element" : ""}">
    ${Array.from({ length: 7 }, (h, $) => x`
      <button 
        aria-label="${Fe(r, $)}"
        title="${Fe(r, $)}"
        class="program-button ${g === $ ? "selected" : ""}"
        @click="${() => this.setProgram($)}"
        ?disabled="${!a}">
        <ha-icon icon="mdi:numeric-${$ + 1}"></ha-icon>
      </button>
      `)}
  </div>

  <div
    class="holiday-mode-days ${p !== w.Holiday ? "hidden-element" : ""} range-container">
    <range-slider 
      label="${d(r, c.ui.card.sabiana_vmc.messages.holiday_mode_days_set)}" 
      .min="${1}" 
      .max="${60}"
      .value="${We}"
      @value-changed="${(h) => this.setHolidayModeModeDays(h.detail.value)}"
      ></range-slider>
  </div>

  <div class="footer">
    <div></div>
    <div class="version">v${e}</div>
  </div>

  ${this.modalMessage.length > 0 ? x`
    <div class="modal" @click="${this.closeModal}">
      <div class="modal-content" @click="${(h) => h.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <p style="white-space: pre-line">${this.modalMessage}</p>

        ${this.modalTemp4Bypass ? x`
          <range-slider 
            label="${d(r, c.ui.card.sabiana_vmc.messages.temp_for_free_cooling_set)}" 
            .min="${10}" 
            .max="${35}"
            .value="${Ke}"
            @value-changed="${(h) => this.setTempForFreeCooling(h.detail.value)}"
            ></range-slider>

          <range-slider 
            label="${d(r, c.ui.card.sabiana_vmc.messages.temp_for_free_heating_set)}" 
            .min="${10}" 
            .max="${30}"
            .value="${Ze}"
            @value-changed="${(h) => this.setTempForFreeHeating(h.detail.value)}"
            ></range-slider>
        ` : ""}

        ${this.modalBoost ? x`
          <range-slider 
            label="${d(r, c.ui.card.sabiana_vmc.messages.boost_time_set)}" 
            .min="${15}" 
            .max="${240}"
            .value="${Je}"
            @value-changed="${(h) => this.setBoostTime(h.detail.value)}"
            ></range-slider>
        ` : ""}

      </div>
    </div>` : ""}

</ha-card>
`;
}
function Mt(r) {
  const e = [
    { speed: 0, percent: 0 },
    { speed: 1, percent: 40 },
    { speed: 2, percent: 55 },
    { speed: 3, percent: 70 },
    { speed: 4, percent: 85 }
  ];
  let t = e[0], a = Math.abs(r - e[0].percent);
  for (let i = 1; i < e.length; i++) {
    const s = Math.abs(r - e[i].percent);
    s < a && (t = e[i], a = s);
  }
  return t.speed;
}
function Tt(r) {
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
function zt(r) {
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
function Fe(r, e) {
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
function Ot(r, e) {
  let t = "";
  const a = (i) => {
    t.length > 0 && (t += `
`), t += i;
  };
  return b(r, e == null ? void 0 : e.t1_probe_failure) && a(d(r.language, c.ui.card.sabiana_vmc.messages.t1_probe_failure)), b(r, e == null ? void 0 : e.t2_probe_failure) && a(d(r.language, c.ui.card.sabiana_vmc.messages.t2_probe_failure)), b(r, e == null ? void 0 : e.t3_probe_failure) && a(d(r.language, c.ui.card.sabiana_vmc.messages.t3_probe_failure)), b(r, e == null ? void 0 : e.t4_probe_failure) && a(d(r.language, c.ui.card.sabiana_vmc.messages.t4_probe_failure)), b(r, e == null ? void 0 : e.timekeeper_failure) && a(d(r.language, c.ui.card.sabiana_vmc.messages.timekeeper_failure)), b(r, e == null ? void 0 : e.frost_alarm_t1_probe) && a(d(r.language, c.ui.card.sabiana_vmc.messages.frost_alarm_t1_probe)), b(r, e == null ? void 0 : e.frost_alarm_t2_probe) && a(d(r.language, c.ui.card.sabiana_vmc.messages.frost_alarm_t2_probe)), b(r, e == null ? void 0 : e.fireplace_alarm) && a(d(r.language, c.ui.card.sabiana_vmc.messages.fireplace_alarm)), b(r, e == null ? void 0 : e.pressure_transducer_failure) && a(d(r.language, c.ui.card.sabiana_vmc.messages.pressure_transducer_failure)), b(r, e == null ? void 0 : e.filter_alarm) && a(d(r.language, c.ui.card.sabiana_vmc.messages.filter_alarm)), b(r, e == null ? void 0 : e.fans_failure) && a(d(r.language, c.ui.card.sabiana_vmc.messages.fans_failure)), b(r, e == null ? void 0 : e.rh_or_co2_sensor_failure) && a(d(r.language, c.ui.card.sabiana_vmc.messages.rh_or_co2_sensor_failure)), b(r, e == null ? void 0 : e.fan_thermic_input_alarm) && a(d(r.language, c.ui.card.sabiana_vmc.messages.fan_thermic_input_alarm)), b(r, e == null ? void 0 : e.pre_heating_alarm) && a(d(r.language, c.ui.card.sabiana_vmc.messages.pre_heating_alarm)), b(r, e == null ? void 0 : e.pre_frost_alarm_t2) && a(d(r.language, c.ui.card.sabiana_vmc.messages.pre_frost_alarm_t2)), t;
}
const Nt = {
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
  pre_frost_alarm_t2: "binary_sensor.@prefix@_blk1_pre_frost_alarm_t2",
  holiday_mode_days: "number.@prefix@_vmc_holiday_mode_days",
  temp_for_free_cooling: "number.@prefix@_blk2_temp_for_free_cooling_set",
  temp_for_free_heating: "number.@prefix@_blk2_temp_for_free_heating_set",
  boost_time: "number.@prefix@_blk2_boost_time"
};
function Ht(r) {
  const e = Object.entries(Nt).map(([t, a]) => [
    t,
    a.replace("@prefix@", r)
  ]);
  return Object.fromEntries(e);
}
var Ut = Object.defineProperty, Ft = Object.getOwnPropertyDescriptor, A = (r, e, t, a) => {
  for (var i = a > 1 ? void 0 : a ? Ft(e, t) : e, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (i = (a ? o(e, t, i) : o(i)) || i);
  return a && i && Ut(e, t, i), i;
};
let v = class extends U {
  constructor() {
    super(...arguments), this.modalMessage = "", this.spinner = !1, this.modalTemp4Bypass = !1, this.modalBoost = !1, this.render = Pt;
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
    var e, t, a, i, s;
    if (super.updated(r), r.has("config")) {
      if (!this.hass || !((e = this.config) != null && e.entity_prefix))
        return;
      this.entities = Ht(this.config.entity_prefix);
      for (const [o, l] of Object.entries(this.entities))
        (t = this.hass) != null && t.states && (this.hass.states[l] || (this.error = d(
          ((a = this.hass) == null ? void 0 : a.language) ?? "en",
          c.ui.card.sabiana_vmc.errors.missing_entity,
          { entity: o }
        )));
    } else if (this.spinner && r.has("hass")) {
      const o = r.get("hass"), l = f(o, (i = this.entities) == null ? void 0 : i.mode), n = f(this.hass, (s = this.entities) == null ? void 0 : s.mode);
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
    var t, a, i, s, o, l;
    if (!((t = this.entities) != null && t.mode) || !r) return;
    let e = "";
    switch (r) {
      case w.Manual:
        e = ((a = this.entities) == null ? void 0 : a.mode_command_manual) || "";
        break;
      case w.Holiday:
        e = ((i = this.entities) == null ? void 0 : i.mode_command_holiday) || "";
        break;
      case w.Party:
        e = ((s = this.entities) == null ? void 0 : s.mode_command_party) || "";
        break;
      case w.Program:
        e = ((o = this.entities) == null ? void 0 : o.mode_command_program) || "";
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
  setHolidayModeModeDays(r) {
    var e, t;
    (e = this.entities) != null && e.holiday_mode_days && (r < 1 && (r = 1), r > 60 && (r = 60), this.hass.callService("number", "set_value", {
      entity_id: (t = this.entities) == null ? void 0 : t.holiday_mode_days,
      value: r
    }));
  }
  setTempForFreeCooling(r) {
    var e, t;
    (e = this.entities) != null && e.temp_for_free_cooling && (r < 10 && (r = 10), r > 35 && (r = 35), this.hass.callService("number", "set_value", {
      entity_id: (t = this.entities) == null ? void 0 : t.temp_for_free_cooling,
      value: r
    }));
  }
  setTempForFreeHeating(r) {
    var e, t;
    (e = this.entities) != null && e.temp_for_free_heating && (r < 10 && (r = 10), r > 30 && (r = 30), this.hass.callService("number", "set_value", {
      entity_id: (t = this.entities) == null ? void 0 : t.temp_for_free_heating,
      value: r
    }));
  }
  setBoostTime(r) {
    var e, t;
    (e = this.entities) != null && e.boost_time && (r < 15 && (r = 15), r > 240 && (r = 240), this.hass.callService("number", "set_value", {
      entity_id: (t = this.entities) == null ? void 0 : t.boost_time,
      value: r
    }));
  }
  //#endregion
  //#region Modale
  openModal(r) {
    this.modalMessage = r;
  }
  closeModal() {
    this.modalMessage = "", this.modalTemp4Bypass = !1, this.modalBoost = !1;
  }
  //#endregion
};
v.styles = gt;
A([
  P()
], v.prototype, "hass", 2);
A([
  P()
], v.prototype, "config", 2);
A([
  P()
], v.prototype, "entities", 2);
A([
  P()
], v.prototype, "modalMessage", 2);
A([
  P()
], v.prototype, "error", 2);
A([
  P()
], v.prototype, "spinner", 2);
A([
  P()
], v.prototype, "modalTemp4Bypass", 2);
A([
  P()
], v.prototype, "modalBoost", 2);
v = A([
  Ge("sabiana-vmc-card")
], v);
export {
  v as SabianaVmcCard
};
