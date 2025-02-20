import { createComponent as Kt, Dynamic as n_, mergeProps as ii, insert as Ne, effect as ze, style as lr, className as Ih, template as pe, spread as pi, use as Ha, memo as Dn, setAttribute as Ft } from "solid-js/web";
import { createMemo as zn, untrack as Mn, createContext as Os, useContext as Ki, createUniqueId as Pr, createSignal as Ve, createRoot as mw, createEffect as or, onCleanup as Eh, For as ta, Switch as yw, Match as Ho, onMount as i_, mergeProps as Li, createRenderEffect as r_, Show as aa, on as ww, splitProps as Ms } from "solid-js";
import { createStore as oa, produce as cn } from "solid-js/store";
const ih = (u, e) => {
  const r = [];
  let o = u[e];
  if (o === void 0)
    throw new Error(`node ${e} doesn't exist`);
  for (; o.parent !== null; )
    r.push(o.parent), o = u[o.parent];
  return r.reverse();
}, xw = (u, e, r) => {
  const o = ih(u, e), l = ih(u, r), h = [];
  for (let c = 0; c < Math.min(o.length, l.length) && o[c] === l[c]; c++)
    h.push(o[c]);
  return [o.slice(h.length), l.slice(h.length)];
}, Xi = (u, e) => u !== void 0 && e !== void 0 ? u + e : void 0, Ws = (...u) => {
  if (u.every((e) => e !== void 0)) {
    let e = 0;
    for (const r of u)
      e += r;
    return e;
  } else
    return;
}, nn = (u, e) => u !== void 0 && e !== void 0 ? u - e : void 0, ld = (u, e) => u !== void 0 && e !== void 0 ? u / e : void 0, Gr = (u) => u.every((e) => e !== void 0) ? Math.max(...u) : void 0, ou = (u) => u.every((e) => e === void 0) ? void 0 : Math.max(...u.filter((e) => e !== void 0)), ua = (u) => u.every((e) => e !== void 0) ? Math.min(...u) : void 0, uu = (u) => u.every((e) => e === void 0) ? void 0 : Math.min(...u.filter((e) => e !== void 0)), bw = {
  left: "x",
  centerX: "x",
  right: "x",
  top: "y",
  centerY: "y",
  bottom: "y",
  width: "x",
  height: "y"
}, rh = (u) => {
  if (u.length === 0)
    return {
      centerX: 0,
      centerY: 0,
      width: 0,
      height: 0
    };
  const e = {
    left: u.map((S) => S.left),
    top: u.map((S) => S.top),
    width: u.map((S) => S.width),
    height: u.map((S) => S.height)
  }, r = ua(e.left), o = Gr(
    e.left.map(
      (S, A) => Xi(S, e.width[A])
    )
  ), l = ua(e.top), h = Gr(
    e.top.map(
      (S, A) => Xi(S, e.height[A])
    )
  ), c = nn(o, r), g = nn(h, l), b = Xi(r, ld(c, 2)), x = Xi(l, ld(g, 2));
  return {
    // left,
    // top,
    // right,
    // bottom,
    centerX: b,
    centerY: x,
    width: c,
    height: g
  };
}, Yn = {
  x: {
    left: [1, -0.5],
    right: [1, 0.5],
    centerX: [1, 0],
    width: [0, 1]
  },
  y: {
    top: [1, -0.5],
    bottom: [1, 0.5],
    centerY: [1, 0],
    height: [0, 1]
  }
}, hd = (u, e) => {
  const r = u[0][0], o = u[0][1], l = u[1], h = e[0][0], c = e[0][1], g = e[1], b = r * c - o * h;
  if (b === 0)
    throw new Error("system is not solvable");
  const x = (c * l - o * g) / b, S = (r * g - l * h) / b;
  return [x, S];
}, fd = (u, e, r = 1e-6) => {
  const [o, l] = u[0], h = u[1];
  return Math.abs(o * e[0] + l * e[1] - h) < r;
}, Ur = (u, e) => u[0] * e[0] + u[1] * e[1], Sw = () => {
  const [u, e] = oa({
    x: {},
    y: {}
  }), [r, o] = oa({
    x: {},
    y: {}
  }), l = zn(() => {
    const c = Object.values(u.x);
    if (!(c.length < 2)) {
      const [g, b] = hd(c[0], c[1]);
      if (c.length > 2) {
        for (const x of c.slice(2))
          if (!fd(x, [g, b]))
            throw new Error(
              `System is not solvable. Equations: ${JSON.stringify(c)}`
            );
      }
      return [g, b];
    }
  }), h = zn(() => {
    const c = Object.values(u.y);
    if (!(c.length < 2)) {
      const [g, b] = hd(c[0], c[1]);
      if (c.length > 2) {
        for (const x of c.slice(2))
          if (!fd(x, [g, b]))
            throw new Error(
              `System is not solvable. Equations: ${JSON.stringify(c)}`
            );
      }
      return [g, b];
    }
  });
  return {
    bbox: {
      get left() {
        return Mn(() => {
          if ("left" in u.x)
            return u.x.left[1];
          const c = l();
          return c ? Ur(c, Yn.x.left) : void 0;
        });
      },
      set left(c) {
        c === void 0 ? e(
          "x",
          cn((g) => {
            delete g.left;
          })
        ) : e("x", "left", [Yn.x.left, c]);
      },
      get centerX() {
        return Mn(() => {
          if ("centerX" in u.x)
            return u.x.centerX[1];
          const c = l();
          return c ? Ur(c, Yn.x.centerX) : void 0;
        });
      },
      set centerX(c) {
        c === void 0 ? e(
          "x",
          cn((g) => {
            delete g.centerX;
          })
        ) : e("x", "centerX", [Yn.x.centerX, c]);
      },
      get right() {
        return Mn(() => {
          if ("right" in u.x)
            return u.x.right[1];
          const c = l();
          return c ? Ur(c, Yn.x.right) : void 0;
        });
      },
      set right(c) {
        c === void 0 ? e(
          "x",
          cn((g) => {
            delete g.right;
          })
        ) : e("x", "right", [Yn.x.right, c]);
      },
      get width() {
        return Mn(() => {
          if ("width" in u.x)
            return u.x.width[1];
          const c = l();
          return c ? Ur(c, Yn.x.width) : void 0;
        });
      },
      set width(c) {
        c === void 0 ? e(
          "x",
          cn((g) => {
            delete g.width;
          })
        ) : e("x", "width", [Yn.x.width, c]);
      },
      get top() {
        return Mn(() => {
          if ("top" in u.y)
            return u.y.top[1];
          const c = h();
          return c ? Ur(c, Yn.y.top) : void 0;
        });
      },
      set top(c) {
        c === void 0 ? e(
          "y",
          cn((g) => {
            delete g.top;
          })
        ) : e("y", "top", [Yn.y.top, c]);
      },
      get centerY() {
        return Mn(() => {
          if ("centerY" in u.y)
            return u.y.centerY[1];
          const c = h();
          return c ? Ur(c, Yn.y.centerY) : void 0;
        });
      },
      set centerY(c) {
        c === void 0 ? e(
          "y",
          cn((g) => {
            delete g.centerY;
          })
        ) : e("y", "centerY", [Yn.y.centerY, c]);
      },
      get bottom() {
        return Mn(() => {
          if ("bottom" in u.y)
            return u.y.bottom[1];
          const c = h();
          return c ? Ur(c, Yn.y.bottom) : void 0;
        });
      },
      set bottom(c) {
        c === void 0 ? e(
          "y",
          cn((g) => {
            delete g.bottom;
          })
        ) : e("y", "bottom", [Yn.y.bottom, c]);
      },
      get height() {
        return Mn(() => {
          if ("height" in u.y)
            return u.y.height[1];
          const c = h();
          return c ? Ur(c, Yn.y.height) : void 0;
        });
      },
      set height(c) {
        c === void 0 ? e(
          "y",
          cn((g) => {
            delete g.height;
          })
        ) : e("y", "height", [Yn.y.height, c]);
      }
    },
    owners: {
      get left() {
        return Mn(() => "left" in r.x ? r.x.left : Object.keys(u.x).length === 2 ? Wr : void 0);
      },
      set left(c) {
        c === void 0 ? o(
          "x",
          cn((g) => {
            delete g.left;
          })
        ) : o("x", "left", c);
      },
      get centerX() {
        return Mn(() => "centerX" in r.x ? r.x.centerX : Object.keys(u.x).length === 2 ? Wr : void 0);
      },
      set centerX(c) {
        c === void 0 ? o(
          "x",
          cn((g) => {
            delete g.centerX;
          })
        ) : o("x", "centerX", c);
      },
      get right() {
        return Mn(() => "right" in r.x ? r.x.right : Object.keys(u.x).length === 2 ? Wr : void 0);
      },
      set right(c) {
        c === void 0 ? o(
          "x",
          cn((g) => {
            delete g.right;
          })
        ) : o("x", "right", c);
      },
      get width() {
        return Mn(() => "width" in r.x ? r.x.width : Object.keys(u.x).length === 2 ? Wr : void 0);
      },
      set width(c) {
        c === void 0 ? o(
          "x",
          cn((g) => {
            delete g.width;
          })
        ) : o("x", "width", c);
      },
      get top() {
        return Mn(() => "top" in r.y ? r.y.top : Object.keys(u.y).length === 2 ? Wr : void 0);
      },
      set top(c) {
        c === void 0 ? o(
          "y",
          cn((g) => {
            delete g.top;
          })
        ) : o("y", "top", c);
      },
      get centerY() {
        return Mn(() => "centerY" in r.y ? r.y.centerY : Object.keys(u.y).length === 2 ? Wr : void 0);
      },
      set centerY(c) {
        c === void 0 ? o(
          "y",
          cn((g) => {
            delete g.centerY;
          })
        ) : o("y", "centerY", c);
      },
      get bottom() {
        return Mn(() => "bottom" in r.y ? r.y.bottom : Object.keys(u.y).length === 2 ? Wr : void 0);
      },
      set bottom(c) {
        c === void 0 ? o(
          "y",
          cn((g) => {
            delete g.bottom;
          })
        ) : o("y", "bottom", c);
      },
      get height() {
        return Mn(() => "height" in r.y ? r.y.height : Object.keys(u.y).length === 2 ? Wr : void 0);
      },
      set height(c) {
        c === void 0 ? o(
          "y",
          cn((g) => {
            delete g.height;
          })
        ) : o("y", "height", c);
      }
    }
  };
}, Cw = (u) => {
  const [e, r] = oa([]);
  return { errors: e, addError: (l) => {
    r((h) => [...h, l]), u(l);
  } };
}, s_ = Os(null), Or = () => (Ki(s_), (u) => {
  console.warn(u);
}), Zr = ({
  source: u,
  name: e,
  dim: r
}) => ({
  type: "DimUnownedError",
  source: u,
  name: e,
  dim: r,
  display: (o) => `${o(e)}'s ${r} is undefined`
}), Ll = ({
  source: u,
  name: e,
  owner: r,
  dim: o,
  value: l
}) => ({
  type: "DimAlreadyOwnedError",
  source: u,
  name: e,
  owner: r,
  dim: o,
  value: l,
  display: (h) => `tried to set ${h(
    e
  )}'s ${o} to ${l}, but it is already owned by ${typeof r == "object" ? "<inferred>" : h(r)}. A dimension cannot be set if it is already owned by another node.`
}), Tw = ({
  source: u,
  name: e,
  owner: r,
  axis: o,
  value: l
}) => ({
  type: "TranslateAlreadyOwnedError",
  source: u,
  name: e,
  owner: r,
  axis: o,
  value: l,
  display: (h) => `tried to set ${h(
    e
  )}'s transform.translate.${o} to ${l}, but it is already owned by ${typeof r == "object" ? "<inferred>" : h(r)}. A dimension cannot be set if it is already owned by another node.`
}), Aw = ({
  source: u,
  name: e,
  dim: r,
  axis: o,
  value: l
}) => ({
  type: "AccumulatedTransformUndefinedError",
  source: u,
  name: e,
  dim: r,
  axis: o,
  value: l,
  display: (h) => `tried to set ${h(
    e
  )}'s ${r} to ${l}, but the accumulated transform.translate.${o} is undefined. We are skipping this operation`
}), cd = ({
  source: u,
  name: e,
  dim: r
}) => ({
  type: "DimNaNError",
  source: u,
  name: e,
  dim: r,
  display: (o) => `tried to set ${o(e)}'s ${r} to NaN`
}), qr = ({
  source: u,
  name: e,
  dim: r
}) => ({
  type: "DimSetUndefinedError",
  source: u,
  name: e,
  dim: r,
  display: (o) => `tried to set ${o(
    e
  )}'s ${r} to undefined, but it already has a value. A dimension cannot be set to undefined if it already has a value.
We are skipping this operation`
}), Wr = { inferred: !0 }, Oi = (u) => u, Pw = (u) => u.type === "node", Xa = (u) => {
  if (u == null)
    return [];
  if (typeof u == "function" && !u.length)
    return Xa(u());
  if (Array.isArray(u))
    return u.flatMap((e) => Xa(e));
  if (typeof u == "object")
    return [u];
  throw new Error(
    `Could not resolve scenegraph elements. Unresolved value: ${JSON.stringify(
      u
    )}`
  );
}, Ow = () => {
  const u = {}, e = (x, S) => {
    Or();
    const { bbox: A, owners: k } = Sw();
    u[x] = {
      type: "node",
      bbox: A,
      bboxOwners: k,
      transform: { translate: {} },
      transformOwners: { translate: {} },
      children: [],
      parent: S,
      customData: { customData: {} },
      layout: () => {
      }
    }, S !== null && Oi(u[S]).children.push(x);
  }, r = (x, S, A) => {
    if (Or(), u[x] = {
      type: "ref",
      refId: S,
      parent: A
    }, A !== null) {
      const k = u[A];
      if (!Pw(k))
        throw new Error(`Parent id ${A} is not a node`);
      k.children.push(x);
    }
  }, o = (x, S, A = {
    translate: { x: 0, y: 0 }
  }) => {
    const k = u[x];
    if (k.type === "node")
      return {
        id: x,
        transform: A
      };
    const y = u[k.refId];
    if (y === void 0)
      throw new Error(`Ref node ${k.refId} not found`);
    if (y.type === "ref")
      throw new Error("Ref of ref not supported");
    if (S === "check")
      return {
        id: k.refId,
        transform: A
      };
    const [D, C] = xw(
      u,
      x,
      k.refId
    );
    if (
      // if mode is read and the ref node's left is undefined, then we don't want to materialize
      // transforms b/c we can't resolve the ref node's left anyway
      !(S === "read" && Oi(y).bbox.left === void 0)
    ) {
      for (const U of D) {
        const $ = Oi(u[U]);
        $.transform.translate.x === void 0 && ($.transform.translate.x = 0, $.transformOwners.translate.x = x), A.translate.x -= $.transform.translate.x;
      }
      for (const U of C) {
        const $ = Oi(u[U]);
        $.transform.translate.x === void 0 && ($.transform.translate.x = 0, $.transformOwners.translate.x = x), A.translate.x += $.transform.translate.x;
      }
    }
    if (
      // if mode is read and the ref node's top is undefined, then we don't want to materialize
      // transforms b/c we can't resolve the ref node's top anyway
      !(S === "read" && Oi(y).bbox.top === void 0)
    ) {
      for (const U of D) {
        const $ = Oi(u[U]);
        $.transform.translate.y === void 0 && ($.transform.translate.y = 0, $.transformOwners.translate.y = x), A.translate.y -= $.transform.translate.y;
      }
      for (const U of C) {
        const $ = Oi(u[U]);
        $.transform.translate.y === void 0 && ($.transform.translate.y = 0, $.transformOwners.translate.y = x), A.translate.y += $.transform.translate.y;
      }
    }
    return o(k.refId, S, A);
  }, l = (x) => {
    const { id: S, transform: A } = o(x, "read"), k = Oi(u[S]);
    return {
      get left() {
        return Ws(
          k.bbox.left,
          k.transform.translate.x,
          A.translate.x
        );
      },
      get centerX() {
        return Ws(
          k.bbox.centerX,
          k.transform.translate.x,
          A.translate.x
        );
      },
      get right() {
        return Ws(
          k.bbox.right,
          k.transform.translate.x,
          A.translate.x
        );
      },
      get top() {
        return Ws(
          k.bbox.top,
          k.transform.translate.y,
          A.translate.y
        );
      },
      get centerY() {
        return Ws(
          k.bbox.centerY,
          k.transform.translate.y,
          A.translate.y
        );
      },
      get bottom() {
        return Ws(
          k.bbox.bottom,
          k.transform.translate.y,
          A.translate.y
        );
      },
      get width() {
        return k.bbox.width;
      },
      get height() {
        return k.bbox.height;
      }
    };
  }, h = (x, S, A, k) => {
    const y = Or();
    for (const Z of Object.keys(A))
      if (A[Z] !== void 0 && isNaN(A[Z])) {
        y(cd({ source: x, name: S, dim: Z }));
        return;
      }
    const D = Oi(u[S]);
    for (const Z of Object.keys(A))
      if (A[Z] !== void 0 && D.bboxOwners[Z] !== void 0 && D.bboxOwners[Z] !== x) {
        y(
          Ll({
            source: x,
            name: S,
            owner: D.bboxOwners[Z],
            dim: Z,
            value: A[Z]
          })
        );
        return;
      }
    for (const Z of Object.keys(k?.translate ?? {}))
      if (k?.translate[Z] !== void 0 && D.transformOwners.translate[Z] !== void 0 && D.transformOwners.translate[Z] !== x)
        return y(
          Tw({
            source: x,
            name: S,
            owner: D.transformOwners.translate[Z],
            axis: Z,
            value: k.translate[Z]
          })
        ), D;
    const C = {
      ...A.left !== void 0 ? { left: x } : {},
      ...A.centerX !== void 0 ? { centerX: x } : {},
      ...A.right !== void 0 ? { right: x } : {},
      ...A.top !== void 0 ? { top: x } : {},
      ...A.centerY !== void 0 ? { centerY: x } : {},
      ...A.bottom !== void 0 ? { bottom: x } : {},
      ...A.width !== void 0 ? { width: x } : {},
      ...A.height !== void 0 ? { height: x } : {}
    }, U = {
      translate: {
        x: k?.translate.x !== void 0 ? x : void 0,
        y: k?.translate.y !== void 0 ? x : void 0
      }
    }, $ = {
      translate: k?.translate ?? {}
    };
    for (const Z of Object.keys(A))
      A[Z] !== void 0 && (D.bbox[Z] = A[Z]);
    for (const Z of Object.keys(C))
      C[Z] !== void 0 && (D.bboxOwners[Z] = C[Z]);
    $.translate.x !== void 0 && (D.transform.translate.x = $.translate.x), $.translate.y !== void 0 && (D.transform.translate.y = $.translate.y), U.translate.x !== void 0 && (D.transformOwners.translate.x = U.translate.x), U.translate.y !== void 0 && (D.transformOwners.translate.y = U.translate.y);
  }, c = (x, S, A) => {
    const k = Or(), { id: y, transform: D } = o(
      S,
      "write"
    );
    for (const Z of Object.keys(A))
      if (A[Z] !== void 0 && isNaN(A[Z])) {
        k(cd({ source: x, name: S, dim: Z }));
        return;
      }
    const C = Oi(u[y]), U = {}, $ = {
      translate: {}
    };
    for (const Z of [
      "left",
      "centerX",
      "right",
      "top",
      "centerY",
      "bottom"
    ]) {
      if (A[Z] === void 0)
        continue;
      const K = bw[Z];
      if (D.translate[K] === void 0) {
        k(
          Aw({
            source: x,
            name: y,
            dim: Z,
            axis: K,
            value: A[Z]
          })
        );
        continue;
      }
      if (C.bboxOwners[Z] === x || C.bboxOwners[Z] === void 0)
        C.transformOwners.translate[K] === void 0 ? ($.translate[K] = 0, U[Z] = A[Z]) : U[Z] = A[Z] - C.transform.translate[K];
      else if (C.transformOwners.translate[K] === x || C.transformOwners.translate[K] === void 0)
        $.translate[K] = A[Z] - C.bbox[Z];
      else {
        k(
          Ll({
            source: x,
            name: y,
            owner: C.bboxOwners[Z],
            dim: Z,
            value: A[Z]
          })
        );
        return;
      }
    }
    for (const Z of ["width", "height"])
      if (A[Z] !== void 0)
        if (C.bboxOwners[Z] === x || C.bboxOwners[Z] === void 0)
          U[Z] = A[Z];
        else {
          k(
            Ll({
              source: x,
              name: y,
              owner: C.bboxOwners[Z],
              dim: Z,
              value: A[Z]
            })
          );
          return;
        }
    $.translate.x = Xi(
      $.translate.x,
      D.translate.x
    ), $.translate.y = Xi(
      $.translate.y,
      D.translate.y
    ), h(x, y, U, $);
  }, g = (x, S, A) => {
    const { id: k } = o(S, "check"), y = Oi(u[k]);
    if (A === "left" || A === "centerX" || A === "right")
      return !(y.bboxOwners[A] === void 0 || y.bboxOwners[A] === x || y.transformOwners.translate.x === void 0 || y.transformOwners.translate.x === x);
    if (A === "top" || A === "centerY" || A === "bottom")
      return !(y.bboxOwners[A] === void 0 || y.bboxOwners[A] === x || y.transformOwners.translate.y === void 0 || y.transformOwners.translate.y === x);
    if (A === "width" || A === "height")
      return !(y.bboxOwners[A] === void 0 || y.bboxOwners[A] === x);
    throw new Error(`Invalid dim: ${A}`);
  };
  return {
    scenegraph: u,
    // constructors
    createNode: e,
    createRef: r,
    // mid-level API
    resolveRef: o,
    mergeBBoxAndTransform: h,
    // API
    getBBox: l,
    setBBox: c,
    ownedByOther: g,
    createChildRepr: (x, S) => {
      const A = Or();
      return {
        name: S,
        bbox: {
          get left() {
            return l(S).left;
          },
          set left(k) {
            if (k === void 0) {
              A(
                qr({
                  source: x,
                  name: S,
                  dim: "left"
                })
              );
              return;
            }
            c(x, S, { left: k });
          },
          get centerX() {
            return l(S).centerX;
          },
          set centerX(k) {
            if (k === void 0) {
              A(
                qr({
                  source: x,
                  name: S,
                  dim: "centerX"
                })
              );
              return;
            }
            c(x, S, { centerX: k });
          },
          get right() {
            return l(S).right;
          },
          set right(k) {
            if (k === void 0) {
              A(
                qr({
                  source: x,
                  name: S,
                  dim: "right"
                })
              );
              return;
            }
            c(x, S, { right: k });
          },
          get top() {
            return l(S).top;
          },
          set top(k) {
            if (k === void 0) {
              A(
                qr({
                  source: x,
                  name: S,
                  dim: "top"
                })
              );
              return;
            }
            c(x, S, { top: k });
          },
          get centerY() {
            return l(S).centerY;
          },
          set centerY(k) {
            if (k === void 0) {
              A(
                qr({
                  source: x,
                  name: S,
                  dim: "centerY"
                })
              );
              return;
            }
            c(x, S, { centerY: k });
          },
          get bottom() {
            return l(S).bottom;
          },
          set bottom(k) {
            if (k === void 0) {
              A(
                qr({
                  source: x,
                  name: S,
                  dim: "bottom"
                })
              );
              return;
            }
            c(x, S, { bottom: k });
          },
          get width() {
            return l(S).width;
          },
          set width(k) {
            if (k === void 0) {
              A(
                qr({
                  source: x,
                  name: S,
                  dim: "width"
                })
              );
              return;
            }
            c(x, S, { width: k });
          },
          get height() {
            return l(S).height;
          },
          set height(k) {
            if (k === void 0) {
              A(
                qr({
                  source: x,
                  name: S,
                  dim: "height"
                })
              );
              return;
            }
            c(x, S, { height: k });
          }
        },
        owned: {
          get left() {
            return g(x, S, "left");
          },
          get centerX() {
            return g(x, S, "centerX");
          },
          get right() {
            return g(x, S, "right");
          },
          get top() {
            return g(x, S, "top");
          },
          get centerY() {
            return g(x, S, "centerY");
          },
          get bottom() {
            return g(x, S, "bottom");
          },
          get width() {
            return g(x, S, "width");
          },
          get height() {
            return g(x, S, "height");
          }
        }
      };
    }
  };
}, kh = Os(
  null
), jT = () => {
  const u = Ki(kh);
  if (u === null)
    throw new Error("useScenegraph must be used within a ScenegraphProvider");
  const { getBBox: e, setBBox: r, ownedByOther: o } = u;
  return { getBBox: e, setBBox: r, ownedByOther: o };
}, a_ = () => {
  const u = Ki(kh);
  if (u === null)
    throw new Error("useScenegraph must be used within a ScenegraphProvider");
  return u;
}, eo = Os([{}, () => {
}]), lu = Os(() => ""), QT = (u) => {
  const e = `${u}(${Pr()})`, [r, o] = Ki(eo), l = Ki(lu);
  return o(e, {
    parent: l(),
    layoutNode: void 0,
    children: {}
  }), o(l(), "children", u, e), e;
}, sh = Os(() => {
});
function Nn(u, e) {
  return (r) => {
    const o = Ki(sh), l = Ki(lu), h = e?.displayName !== void 0 ? `${e?.displayName}(` : "", c = e?.displayName !== void 0 ? ")" : "", g = `${h}${Pr()}${c}`, b = `${h}${Pr()}${c}`, x = () => o() ?? g, S = () => r.name ?? b, [A, k] = Ki(eo), [y, D] = Ve(() => {
    });
    return A[S()] === void 0 && k(S(), {
      parent: l(),
      layoutNode: void 0,
      children: {}
    }), k(S(), "layoutNode", x()), {
      jsx: Kt(lu.Provider, {
        value: S,
        get children() {
          return Kt(sh.Provider, {
            value: x,
            get children() {
              return (() => {
                const U = Xa(Kt(n_, ii({
                  component: u
                }, r, {
                  get name() {
                    return x();
                  }
                })));
                return D(() => U[0].layout), U[0].jsx;
              })();
            }
          });
        }
      }),
      layout: (U) => y()(U)
    };
  };
}
const Mw = (u) => typeof u == "function", hu = (u, e) => Mw(u) ? u(e) : u;
var yn;
(function(u) {
  u[u.ADD_TOAST = 0] = "ADD_TOAST", u[u.UPDATE_TOAST = 1] = "UPDATE_TOAST", u[u.UPSERT_TOAST = 2] = "UPSERT_TOAST", u[u.DISMISS_TOAST = 3] = "DISMISS_TOAST", u[u.REMOVE_TOAST = 4] = "REMOVE_TOAST", u[u.START_PAUSE = 5] = "START_PAUSE", u[u.END_PAUSE = 6] = "END_PAUSE";
})(yn || (yn = {}));
const [bs, Yr] = oa({
  toasts: [],
  pausedAt: void 0
}), Iw = () => {
  const { pausedAt: u, toasts: e } = bs;
  if (u)
    return;
  const r = Date.now();
  return e.map((l) => {
    if (l.duration === 1 / 0)
      return;
    const h = (l.duration || 0) + l.pauseDuration - (r - l.createdAt);
    if (h <= 0) {
      l.visible && nr({
        type: yn.DISMISS_TOAST,
        toastId: l.id
      });
      return;
    }
    return setTimeout(() => {
      nr({
        type: yn.DISMISS_TOAST,
        toastId: l.id
      });
    }, h);
  });
}, Va = /* @__PURE__ */ new Map(), dd = (u, e) => {
  if (Va.has(u))
    return;
  const r = setTimeout(() => {
    Va.delete(u), nr({
      type: yn.REMOVE_TOAST,
      toastId: u
    });
  }, e);
  Va.set(u, r);
}, Ew = (u) => {
  const e = Va.get(u);
  Va.delete(u), e && clearTimeout(e);
}, nr = (u) => {
  switch (u.type) {
    case yn.ADD_TOAST:
      Yr("toasts", (l) => {
        const h = l;
        return [u.toast, ...h];
      });
      break;
    case yn.DISMISS_TOAST:
      const { toastId: e } = u, r = bs.toasts;
      if (e) {
        const l = r.find((h) => h.id === e);
        l && dd(e, l.unmountDelay), Yr("toasts", (h) => h.id === e, cn((h) => h.visible = !1));
      } else
        r.forEach((l) => {
          dd(l.id, l.unmountDelay);
        }), Yr("toasts", (l) => l.id !== void 0, cn((l) => l.visible = !1));
      break;
    case yn.REMOVE_TOAST:
      if (!u.toastId) {
        Yr("toasts", []);
        break;
      }
      Yr("toasts", (l) => l.filter((c) => c.id !== u.toastId));
      break;
    case yn.UPDATE_TOAST:
      u.toast.id && Ew(u.toast.id), Yr("toasts", (l) => l.id === u.toast.id, (l) => ({
        ...l,
        ...u.toast
      }));
      break;
    case yn.UPSERT_TOAST:
      bs.toasts.find((l) => l.id === u.toast.id) ? nr({ type: yn.UPDATE_TOAST, toast: u.toast }) : nr({ type: yn.ADD_TOAST, toast: u.toast });
      break;
    case yn.START_PAUSE:
      Yr(cn((l) => {
        l.pausedAt = Date.now(), l.toasts.forEach((h) => {
          h.paused = !0;
        });
      }));
      break;
    case yn.END_PAUSE:
      const o = u.time - (bs.pausedAt || 0);
      Yr(cn((l) => {
        l.pausedAt = void 0, l.toasts.forEach((h) => {
          h.pauseDuration += o, h.paused = !1;
        });
      }));
      break;
  }
}, kw = {
  blank: 4e3,
  error: 4e3,
  success: 2e3,
  loading: 1 / 0,
  custom: 4e3
}, ea = {
  id: "",
  icon: "",
  unmountDelay: 500,
  duration: 3e3,
  ariaProps: {
    role: "status",
    "aria-live": "polite"
  },
  className: "",
  style: {},
  position: "top-right",
  iconTheme: {}
}, o_ = {
  position: "top-right",
  toastOptions: ea,
  gutter: 8,
  containerStyle: {},
  containerClassName: ""
}, Xo = "16px", Lw = {
  position: "fixed",
  "z-index": 9999,
  top: Xo,
  bottom: Xo,
  left: Xo,
  right: Xo,
  "pointer-events": "none"
}, Rw = (() => {
  let u = 0;
  return () => String(++u);
})(), Dw = (u) => {
  Uw((e) => ({
    containerClassName: u.containerClassName ?? e.containerClassName,
    containerStyle: u.containerStyle ?? e.containerStyle,
    gutter: u.gutter ?? e.gutter,
    position: u.position ?? e.position,
    toastOptions: {
      ...u.toastOptions
    }
  }));
}, zw = (u, e) => {
  const o = u.includes("top") ? { top: 0, "margin-top": `${e}px` } : { bottom: 0, "margin-bottom": `${e}px` }, l = u.includes("center") ? { "justify-content": "center" } : u.includes("right") ? { "justify-content": "flex-end" } : {};
  return {
    left: 0,
    right: 0,
    display: "flex",
    position: "absolute",
    transition: "all 230ms cubic-bezier(.21,1.02,.73,1)",
    ...o,
    ...l
  };
}, Bw = (u, e) => {
  const r = u.getBoundingClientRect();
  r.height !== e.height && nr({
    type: yn.UPDATE_TOAST,
    toast: { id: e.id, height: r.height }
  });
}, Nw = (u, e) => {
  const { toasts: r } = bs, o = Ks().gutter || o_.gutter || 8, l = r.filter((b) => (b.position || e) === e && b.height), h = l.findIndex((b) => b.id === u.id), c = l.filter((b, x) => x < h && b.visible).length;
  return l.slice(0, c).reduce((b, x) => b + o + (x.height || 0), 0);
}, Fw = (u, e) => (u.position || e).includes("top") ? 1 : -1, $w = {
  display: "flex",
  "align-items": "center",
  color: "#363636",
  background: "white",
  "box-shadow": "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)",
  "max-width": "350px",
  "pointer-events": "auto",
  padding: "8px 10px",
  "border-radius": "4px",
  "line-height": "1.3",
  "will-change": "transform"
}, Vw = {
  display: "flex",
  "align-items": "center",
  flex: "1 1 auto",
  margin: "4px 10px",
  "white-space": "pre-line"
}, Go = {
  "flex-shrink": 0,
  "min-width": "20px",
  "min-height": "20px",
  display: "flex",
  "align-items": "center",
  "justify-content": "center",
  "text-align": "center"
}, fu = (u) => ({
  calcMode: "spline",
  keyTimes: "0; 1",
  keySplines: u
}), [Ks, Uw] = Ve(o_), qw = (u, e = "blank", r) => ({
  ...ea,
  ...Ks().toastOptions,
  ...r,
  type: e,
  message: u,
  pauseDuration: 0,
  createdAt: Date.now(),
  visible: !0,
  id: r.id || Rw(),
  paused: !1,
  style: {
    ...ea.style,
    ...Ks().toastOptions?.style,
    ...r.style
  },
  duration: r.duration || Ks().toastOptions?.duration || kw[e],
  position: r.position || Ks().toastOptions?.position || Ks().position || ea.position
}), no = (u) => (e, r = {}) => mw(() => {
  const o = bs.toasts.find((h) => h.id === r.id), l = qw(e, u, { ...o, duration: void 0, ...r });
  return nr({ type: yn.UPSERT_TOAST, toast: l }), l.id;
}), er = (u, e) => no("blank")(u, e);
Mn(() => er);
er.error = no("error");
er.success = no("success");
er.loading = no("loading");
er.custom = no("custom");
er.dismiss = (u) => {
  nr({
    type: yn.DISMISS_TOAST,
    toastId: u
  });
};
er.promise = (u, e, r) => {
  const o = er.loading(e.loading, { ...r });
  return u.then((l) => (er.success(hu(e.success, l), {
    id: o,
    ...r
  }), l)).catch((l) => {
    er.error(hu(e.error, l), {
      id: o,
      ...r
    });
  }), u;
};
er.remove = (u) => {
  nr({
    type: yn.REMOVE_TOAST,
    toastId: u
  });
};
var Ww = /* @__PURE__ */ pe("<div><style>.sldt-active{z-index:9999;}.sldt-active>*{pointer-events:auto;}");
const Yw = (u) => (or(() => {
  Dw(u);
}), or(() => {
  const e = Iw();
  Eh(() => {
    e && e.forEach((r) => r && clearTimeout(r));
  });
}), (() => {
  var e = Ww();
  return e.firstChild, Ne(e, Kt(ta, {
    get each() {
      return bs.toasts;
    },
    children: (r) => Kt(Zw, {
      toast: r
    })
  }), null), ze((r) => {
    var o = {
      ...Lw,
      ...u.containerStyle
    }, l = u.containerClassName;
    return r.e = lr(e, o, r.e), l !== r.t && Ih(e, r.t = l), r;
  }, {
    e: void 0,
    t: void 0
  }), e;
})());
var Zo = /* @__PURE__ */ pe("<div>"), Hw = /* @__PURE__ */ pe("<div><div>");
const Xw = (u) => {
  let e;
  return or(() => {
    if (!e)
      return;
    const r = Fw(u.toast, u.position);
    u.toast.visible ? e.animate([{
      transform: `translate3d(0,${r * -200}%,0) scale(.6)`,
      opacity: 0.5
    }, {
      transform: "translate3d(0,0,0) scale(1)",
      opacity: 1
    }], {
      duration: 350,
      fill: "forwards",
      easing: "cubic-bezier(.21,1.02,.73,1)"
    }) : e.animate([{
      transform: "translate3d(0,0,-1px) scale(1)",
      opacity: 1
    }, {
      transform: `translate3d(0,${r * -150}%,-1px) scale(.4)`,
      opacity: 0
    }], {
      duration: 400,
      fill: "forwards",
      easing: "cubic-bezier(.06,.71,.55,1)"
    });
  }), (() => {
    var r = Hw(), o = r.firstChild, l = e;
    return typeof l == "function" ? Ha(l, r) : e = r, Ne(r, Kt(yw, {
      get children() {
        return [Kt(Ho, {
          get when() {
            return u.toast.icon;
          },
          get children() {
            var h = Zo();
            return Ne(h, () => u.toast.icon), ze((c) => lr(h, Go, c)), h;
          }
        }), Kt(Ho, {
          get when() {
            return u.toast.type === "loading";
          },
          get children() {
            var h = Zo();
            return Ne(h, Kt(ix, ii(() => u.toast.iconTheme))), ze((c) => lr(h, Go, c)), h;
          }
        }), Kt(Ho, {
          get when() {
            return u.toast.type === "success";
          },
          get children() {
            var h = Zo();
            return Ne(h, Kt(Qw, ii(() => u.toast.iconTheme))), ze((c) => lr(h, Go, c)), h;
          }
        }), Kt(Ho, {
          get when() {
            return u.toast.type === "error";
          },
          get children() {
            var h = Zo();
            return Ne(h, Kt(ex, ii(() => u.toast.iconTheme))), ze((c) => lr(h, Go, c)), h;
          }
        })];
      }
    }), o), pi(o, ii(() => u.toast.ariaProps), !1, !0), Ne(o, () => hu(u.toast.message, u.toast)), ze((h) => {
      var c = u.toast.className, g = {
        ...$w,
        ...u.toast.style
      }, b = Vw;
      return c !== h.e && Ih(r, h.e = c), h.t = lr(r, g, h.t), h.a = lr(o, b, h.a), h;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), r;
  })();
};
var Gw = /* @__PURE__ */ pe("<div>");
const Zw = (u) => {
  const e = () => {
    const l = u.toast.position || ea.position, h = Nw(u.toast, l);
    return zw(l, h);
  }, r = zn(() => e());
  let o;
  return i_(() => {
    o && Bw(o, u.toast);
  }), (() => {
    var l = Gw();
    l.addEventListener("mouseleave", () => nr({
      type: yn.END_PAUSE,
      time: Date.now()
    })), l.addEventListener("mouseenter", () => nr({
      type: yn.START_PAUSE,
      time: Date.now()
    }));
    var h = o;
    return typeof h == "function" ? Ha(h, l) : o = l, Ne(l, (() => {
      var c = Dn(() => u.toast.type === "custom");
      return () => c() ? hu(u.toast.message, u.toast) : Kt(Xw, {
        get toast() {
          return u.toast;
        },
        get position() {
          return u.toast.position || ea.position;
        }
      });
    })()), ze((c) => {
      var g = r(), b = u.toast.visible ? "sldt-active" : "";
      return c.e = lr(l, g, c.e), b !== c.t && Ih(l, c.t = b), c;
    }, {
      e: void 0,
      t: void 0
    }), l;
  })();
};
var Kw = /* @__PURE__ */ pe('<svg><circle cx=16 cy=16 r=0><animate attributeName=opacity values="0; 1; 1"></animate><animate attributeName=r values="0; 17.5; 16"></svg>', !1, !0), Jw = /* @__PURE__ */ pe('<svg><circle cx=16 cy=16 r=12 opacity=0><animate attributeName=opacity values="1; 0"></animate><animate attributeName=r values="12; 26"></svg>', !1, !0);
const u_ = (u) => {
  const e = {
    dur: "0.35s",
    begin: "100ms",
    fill: "freeze",
    calcMode: "spline",
    keyTimes: "0; 0.6; 1",
    keySplines: "0.25 0.71 0.4 0.88; .59 .22 .87 .63"
  };
  return (() => {
    var r = Kw(), o = r.firstChild, l = o.nextSibling;
    return pi(o, e, !0, !1), pi(l, e, !0, !1), ze(() => Ft(r, "fill", u.fill)), r;
  })();
}, l_ = (u) => {
  const e = {
    dur: "1s",
    begin: u.begin || "320ms",
    fill: "freeze",
    ...fu("0.0 0.0 0.2 1")
  };
  return (() => {
    var r = Jw(), o = r.firstChild, l = o.nextSibling;
    return pi(o, e, !0, !1), pi(l, e, !0, !1), ze(() => Ft(r, "fill", u.fill)), r;
  })();
};
var jw = /* @__PURE__ */ pe('<svg viewBox="0 0 32 32"width=1.25rem height=1.25rem><path fill=none stroke-width=4 stroke-dasharray=22 stroke-dashoffset=22 stroke-linecap=round stroke-miterlimit=10 d=M9.8,17.2l3.8,3.6c0.1,0.1,0.3,0.1,0.4,0l9.6-9.7><animate attributeName=stroke-dashoffset values=22;0 dur=0.25s begin=250ms fill=freeze>');
const Qw = (u) => {
  const e = u.primary || "#34C759";
  return (() => {
    var r = jw(), o = r.firstChild, l = o.firstChild;
    return r.style.setProperty("overflow", "visible"), Ne(r, Kt(u_, {
      fill: e
    }), o), Ne(r, Kt(l_, {
      fill: e,
      begin: "350ms"
    }), o), pi(l, ii(() => fu("0.0, 0.0, 0.58, 1.0")), !0, !1), ze(() => Ft(o, "stroke", u.secondary || "#FCFCFC")), r;
  })();
};
var tx = /* @__PURE__ */ pe('<svg viewBox="0 0 32 32"width=1.25rem height=1.25rem><path fill=none stroke-width=4 stroke-dasharray=9 stroke-dashoffset=9 stroke-linecap=round d=M16,7l0,9><animate attributeName=stroke-dashoffset values=9;0 dur=0.2s begin=250ms fill=freeze></animate></path><circle cx=16 cy=23 r=2.5 opacity=0><animate attributeName=opacity values=0;1 dur=0.25s begin=350ms fill=freeze>');
const ex = (u) => {
  const e = u.primary || "#FF3B30";
  return (() => {
    var r = tx(), o = r.firstChild, l = o.firstChild, h = o.nextSibling, c = h.firstChild;
    return r.style.setProperty("overflow", "visible"), Ne(r, Kt(u_, {
      fill: e
    }), o), Ne(r, Kt(l_, {
      fill: e
    }), o), pi(l, ii(() => fu("0.0, 0.0, 0.58, 1.0")), !0, !1), pi(c, ii(() => fu("0.0, 0.0, 0.58, 1.0")), !0, !1), ze((g) => {
      var b = u.secondary || "#FFFFFF", x = u.secondary || "#FFFFFF";
      return b !== g.e && Ft(o, "stroke", g.e = b), x !== g.t && Ft(h, "fill", g.t = x), g;
    }, {
      e: void 0,
      t: void 0
    }), r;
  })();
};
var nx = /* @__PURE__ */ pe('<svg viewBox="0 0 32 32"width=1.25rem height=1.25rem><path fill=none stroke-width=4 stroke-miterlimit=10 d=M16,6c3,0,5.7,1.3,7.5,3.4c1.5,1.8,2.5,4,2.5,6.6c0,5.5-4.5,10-10,10S6,21.6,6,16S10.5,6,16,6z></path><path fill=none stroke-width=4 stroke-linecap=round stroke-miterlimit=10 d=M16,6c3,0,5.7,1.3,7.5,3.4c0.6,0.7,1.1,1.4,1.5,2.2><animateTransform attributeName=transform type=rotate from="0 16 16"to="360 16 16"dur=0.75s repeatCount=indefinite>');
const ix = (u) => (() => {
  var e = nx(), r = e.firstChild, o = r.nextSibling;
  return e.style.setProperty("overflow", "visible"), ze((l) => {
    var h = u.primary || "#E5E7EB", c = u.secondary || "#4b5563";
    return h !== l.e && Ft(r, "stroke", l.e = h), c !== l.t && Ft(o, "stroke", l.t = c), l;
  }, {
    e: void 0,
    t: void 0
  }), e;
})();
function Tr(u) {
  if (u === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return u;
}
function h_(u, e) {
  u.prototype = Object.create(e.prototype), u.prototype.constructor = u, u.__proto__ = e;
}
/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var ki = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, la = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Lh, Bn, en, Gi = 1e8, Xe = 1 / Gi, ah = Math.PI * 2, rx = ah / 4, sx = 0, f_ = Math.sqrt, ax = Math.cos, ox = Math.sin, In = function(e) {
  return typeof e == "string";
}, dn = function(e) {
  return typeof e == "function";
}, Ir = function(e) {
  return typeof e == "number";
}, Rh = function(e) {
  return typeof e > "u";
}, _r = function(e) {
  return typeof e == "object";
}, di = function(e) {
  return e !== !1;
}, Dh = function() {
  return typeof window < "u";
}, Ko = function(e) {
  return dn(e) || In(e);
}, c_ = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Zn = Array.isArray, oh = /(?:-?\.?\d|\.)+/gi, d_ = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Js = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Rl = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, __ = /[+-]=-?[.\d]+/, g_ = /[^,'"\[\]\s]+/gi, ux = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, un, ur, uh, zh, Ri = {}, cu = {}, v_, p_ = function(e) {
  return (cu = ha(e, Ri)) && mi;
}, Bh = function(e, r) {
  return console.warn("Invalid property", e, "set to", r, "Missing plugin? gsap.registerPlugin()");
}, Ga = function(e, r) {
  return !r && console.warn(e);
}, m_ = function(e, r) {
  return e && (Ri[e] = r) && cu && (cu[e] = r) || Ri;
}, Za = function() {
  return 0;
}, lx = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, ru = {
  suppressEvents: !0,
  kill: !1
}, hx = {
  suppressEvents: !0
}, Nh = {}, Qr = [], lh = {}, y_, Mi = {}, Dl = {}, _d = 30, su = [], Fh = "", $h = function(e) {
  var r = e[0], o, l;
  if (_r(r) || dn(r) || (e = [e]), !(o = (r._gsap || {}).harness)) {
    for (l = su.length; l-- && !su[l].targetTest(r); )
      ;
    o = su[l];
  }
  for (l = e.length; l--; )
    e[l] && (e[l]._gsap || (e[l]._gsap = new q_(e[l], o))) || e.splice(l, 1);
  return e;
}, Ss = function(e) {
  return e._gsap || $h(Zi(e))[0]._gsap;
}, w_ = function(e, r, o) {
  return (o = e[r]) && dn(o) ? e[r]() : Rh(o) && e.getAttribute && e.getAttribute(r) || o;
}, _i = function(e, r) {
  return (e = e.split(",")).forEach(r) || e;
}, pn = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, xn = function(e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, na = function(e, r) {
  var o = r.charAt(0), l = parseFloat(r.substr(2));
  return e = parseFloat(e), o === "+" ? e + l : o === "-" ? e - l : o === "*" ? e * l : e / l;
}, fx = function(e, r) {
  for (var o = r.length, l = 0; e.indexOf(r[l]) < 0 && ++l < o; )
    ;
  return l < o;
}, du = function() {
  var e = Qr.length, r = Qr.slice(0), o, l;
  for (lh = {}, Qr.length = 0, o = 0; o < e; o++)
    l = r[o], l && l._lazy && (l.render(l._lazy[0], l._lazy[1], !0)._lazy = 0);
}, x_ = function(e, r, o, l) {
  Qr.length && !Bn && du(), e.render(r, o, l || Bn && r < 0 && (e._initted || e._startAt)), Qr.length && !Bn && du();
}, b_ = function(e) {
  var r = parseFloat(e);
  return (r || r === 0) && (e + "").match(g_).length < 2 ? r : In(e) ? e.trim() : e;
}, S_ = function(e) {
  return e;
}, Di = function(e, r) {
  for (var o in r)
    o in e || (e[o] = r[o]);
  return e;
}, cx = function(e) {
  return function(r, o) {
    for (var l in o)
      l in r || l === "duration" && e || l === "ease" || (r[l] = o[l]);
  };
}, ha = function(e, r) {
  for (var o in r)
    e[o] = r[o];
  return e;
}, gd = function u(e, r) {
  for (var o in r)
    o !== "__proto__" && o !== "constructor" && o !== "prototype" && (e[o] = _r(r[o]) ? u(e[o] || (e[o] = {}), r[o]) : r[o]);
  return e;
}, _u = function(e, r) {
  var o = {}, l;
  for (l in e)
    l in r || (o[l] = e[l]);
  return o;
}, Ua = function(e) {
  var r = e.parent || un, o = e.keyframes ? cx(Zn(e.keyframes)) : Di;
  if (di(e.inherit))
    for (; r; )
      o(e, r.vars.defaults), r = r.parent || r._dp;
  return e;
}, dx = function(e, r) {
  for (var o = e.length, l = o === r.length; l && o-- && e[o] === r[o]; )
    ;
  return o < 0;
}, C_ = function(e, r, o, l, h) {
  o === void 0 && (o = "_first"), l === void 0 && (l = "_last");
  var c = e[l], g;
  if (h)
    for (g = r[h]; c && c[h] > g; )
      c = c._prev;
  return c ? (r._next = c._next, c._next = r) : (r._next = e[o], e[o] = r), r._next ? r._next._prev = r : e[l] = r, r._prev = c, r.parent = r._dp = e, r;
}, xu = function(e, r, o, l) {
  o === void 0 && (o = "_first"), l === void 0 && (l = "_last");
  var h = r._prev, c = r._next;
  h ? h._next = c : e[o] === r && (e[o] = c), c ? c._prev = h : e[l] === r && (e[l] = h), r._next = r._prev = r.parent = null;
}, es = function(e, r) {
  e.parent && (!r || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0;
}, Cs = function(e, r) {
  if (e && (!r || r._end > e._dur || r._start < 0))
    for (var o = e; o; )
      o._dirty = 1, o = o.parent;
  return e;
}, _x = function(e) {
  for (var r = e.parent; r && r.parent; )
    r._dirty = 1, r.totalDuration(), r = r.parent;
  return e;
}, hh = function(e, r, o, l) {
  return e._startAt && (Bn ? e._startAt.revert(ru) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(r, !0, l));
}, gx = function u(e) {
  return !e || e._ts && u(e.parent);
}, vd = function(e) {
  return e._repeat ? fa(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, fa = function(e, r) {
  var o = Math.floor(e = xn(e / r));
  return e && o === e ? o - 1 : o;
}, gu = function(e, r) {
  return (e - r._start) * r._ts + (r._ts >= 0 ? 0 : r._dirty ? r.totalDuration() : r._tDur);
}, bu = function(e) {
  return e._end = xn(e._start + (e._tDur / Math.abs(e._ts || e._rts || Xe) || 0));
}, Su = function(e, r) {
  var o = e._dp;
  return o && o.smoothChildTiming && e._ts && (e._start = xn(o._time - (e._ts > 0 ? r / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - r) / -e._ts)), bu(e), o._dirty || Cs(o, e)), e;
}, T_ = function(e, r) {
  var o;
  if ((r._time || !r._dur && r._initted || r._start < e._time && (r._dur || !r.add)) && (o = gu(e.rawTime(), r), (!r._dur || io(0, r.totalDuration(), o) - r._tTime > Xe) && r.render(o, !0)), Cs(e, r)._dp && e._initted && e._time >= e._dur && e._ts) {
    if (e._dur < e.duration())
      for (o = e; o._dp; )
        o.rawTime() >= 0 && o.totalTime(o._tTime), o = o._dp;
    e._zTime = -Xe;
  }
}, hr = function(e, r, o, l) {
  return r.parent && es(r), r._start = xn((Ir(o) ? o : o || e !== un ? Hi(e, o, r) : e._time) + r._delay), r._end = xn(r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0)), C_(e, r, "_first", "_last", e._sort ? "_start" : 0), fh(r) || (e._recent = r), l || T_(e, r), e._ts < 0 && Su(e, e._tTime), e;
}, A_ = function(e, r) {
  return (Ri.ScrollTrigger || Bh("scrollTrigger", r)) && Ri.ScrollTrigger.create(r, e);
}, P_ = function(e, r, o, l, h) {
  if (Uh(e, r, h), !e._initted)
    return 1;
  if (!o && e._pt && !Bn && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && y_ !== Ii.frame)
    return Qr.push(e), e._lazy = [h, l], 1;
}, vx = function u(e) {
  var r = e.parent;
  return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || u(r));
}, fh = function(e) {
  var r = e.data;
  return r === "isFromStart" || r === "isStart";
}, px = function(e, r, o, l) {
  var h = e.ratio, c = r < 0 || !r && (!e._start && vx(e) && !(!e._initted && fh(e)) || (e._ts < 0 || e._dp._ts < 0) && !fh(e)) ? 0 : 1, g = e._rDelay, b = 0, x, S, A;
  if (g && e._repeat && (b = io(0, e._tDur, r), S = fa(b, g), e._yoyo && S & 1 && (c = 1 - c), S !== fa(e._tTime, g) && (h = 1 - c, e.vars.repeatRefresh && e._initted && e.invalidate())), c !== h || Bn || l || e._zTime === Xe || !r && e._zTime) {
    if (!e._initted && P_(e, r, l, o, b))
      return;
    for (A = e._zTime, e._zTime = r || (o ? Xe : 0), o || (o = r && !A), e.ratio = c, e._from && (c = 1 - c), e._time = 0, e._tTime = b, x = e._pt; x; )
      x.r(c, x.d), x = x._next;
    r < 0 && hh(e, r, o, !0), e._onUpdate && !o && Ei(e, "onUpdate"), b && e._repeat && !o && e.parent && Ei(e, "onRepeat"), (r >= e._tDur || r < 0) && e.ratio === c && (c && es(e, 1), !o && !Bn && (Ei(e, c ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
  } else
    e._zTime || (e._zTime = r);
}, mx = function(e, r, o) {
  var l;
  if (o > r)
    for (l = e._first; l && l._start <= o; ) {
      if (l.data === "isPause" && l._start > r)
        return l;
      l = l._next;
    }
  else
    for (l = e._last; l && l._start >= o; ) {
      if (l.data === "isPause" && l._start < r)
        return l;
      l = l._prev;
    }
}, ca = function(e, r, o, l) {
  var h = e._repeat, c = xn(r) || 0, g = e._tTime / e._tDur;
  return g && !l && (e._time *= c / e._dur), e._dur = c, e._tDur = h ? h < 0 ? 1e10 : xn(c * (h + 1) + e._rDelay * h) : c, g > 0 && !l && Su(e, e._tTime = e._tDur * g), e.parent && bu(e), o || Cs(e.parent, e), e;
}, pd = function(e) {
  return e instanceof ni ? Cs(e) : ca(e, e._dur);
}, yx = {
  _start: 0,
  endTime: Za,
  totalDuration: Za
}, Hi = function u(e, r, o) {
  var l = e.labels, h = e._recent || yx, c = e.duration() >= Gi ? h.endTime(!1) : e._dur, g, b, x;
  return In(r) && (isNaN(r) || r in l) ? (b = r.charAt(0), x = r.substr(-1) === "%", g = r.indexOf("="), b === "<" || b === ">" ? (g >= 0 && (r = r.replace(/=/, "")), (b === "<" ? h._start : h.endTime(h._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) * (x ? (g < 0 ? h : o).totalDuration() / 100 : 1)) : g < 0 ? (r in l || (l[r] = c), l[r]) : (b = parseFloat(r.charAt(g - 1) + r.substr(g + 1)), x && o && (b = b / 100 * (Zn(o) ? o[0] : o).totalDuration()), g > 1 ? u(e, r.substr(0, g - 1), o) + b : c + b)) : r == null ? c : +r;
}, qa = function(e, r, o) {
  var l = Ir(r[1]), h = (l ? 2 : 1) + (e < 2 ? 0 : 1), c = r[h], g, b;
  if (l && (c.duration = r[1]), c.parent = o, e) {
    for (g = c, b = o; b && !("immediateRender" in g); )
      g = b.vars.defaults || {}, b = di(b.vars.inherit) && b.parent;
    c.immediateRender = di(g.immediateRender), e < 2 ? c.runBackwards = 1 : c.startAt = r[h - 1];
  }
  return new wn(r[0], c, r[h + 1]);
}, rs = function(e, r) {
  return e || e === 0 ? r(e) : r;
}, io = function(e, r, o) {
  return o < e ? e : o > r ? r : o;
}, Gn = function(e, r) {
  return !In(e) || !(r = ux.exec(e)) ? "" : r[1];
}, wx = function(e, r, o) {
  return rs(o, function(l) {
    return io(e, r, l);
  });
}, ch = [].slice, O_ = function(e, r) {
  return e && _r(e) && "length" in e && (!r && !e.length || e.length - 1 in e && _r(e[0])) && !e.nodeType && e !== ur;
}, xx = function(e, r, o) {
  return o === void 0 && (o = []), e.forEach(function(l) {
    var h;
    return In(l) && !r || O_(l, 1) ? (h = o).push.apply(h, Zi(l)) : o.push(l);
  }) || o;
}, Zi = function(e, r, o) {
  return en && !r && en.selector ? en.selector(e) : In(e) && !o && (uh || !da()) ? ch.call((r || zh).querySelectorAll(e), 0) : Zn(e) ? xx(e, o) : O_(e) ? ch.call(e, 0) : e ? [e] : [];
}, dh = function(e) {
  return e = Zi(e)[0] || Ga("Invalid scope") || {}, function(r) {
    var o = e.current || e.nativeElement || e;
    return Zi(r, o.querySelectorAll ? o : o === e ? Ga("Invalid scope") || zh.createElement("div") : e);
  };
}, M_ = function(e) {
  return e.sort(function() {
    return 0.5 - Math.random();
  });
}, I_ = function(e) {
  if (dn(e))
    return e;
  var r = _r(e) ? e : {
    each: e
  }, o = Ts(r.ease), l = r.from || 0, h = parseFloat(r.base) || 0, c = {}, g = l > 0 && l < 1, b = isNaN(l) || g, x = r.axis, S = l, A = l;
  return In(l) ? S = A = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[l] || 0 : !g && b && (S = l[0], A = l[1]), function(k, y, D) {
    var C = (D || r).length, U = c[C], $, Z, K, ot, lt, ct, ht, _t, at;
    if (!U) {
      if (at = r.grid === "auto" ? 0 : (r.grid || [1, Gi])[1], !at) {
        for (ht = -Gi; ht < (ht = D[at++].getBoundingClientRect().left) && at < C; )
          ;
        at < C && at--;
      }
      for (U = c[C] = [], $ = b ? Math.min(at, C) * S - 0.5 : l % at, Z = at === Gi ? 0 : b ? C * A / at - 0.5 : l / at | 0, ht = 0, _t = Gi, ct = 0; ct < C; ct++)
        K = ct % at - $, ot = Z - (ct / at | 0), U[ct] = lt = x ? Math.abs(x === "y" ? ot : K) : f_(K * K + ot * ot), lt > ht && (ht = lt), lt < _t && (_t = lt);
      l === "random" && M_(U), U.max = ht - _t, U.min = _t, U.v = C = (parseFloat(r.amount) || parseFloat(r.each) * (at > C ? C - 1 : x ? x === "y" ? C / at : at : Math.max(at, C / at)) || 0) * (l === "edges" ? -1 : 1), U.b = C < 0 ? h - C : h, U.u = Gn(r.amount || r.each) || 0, o = o && C < 0 ? $_(o) : o;
    }
    return C = (U[k] - U.min) / U.max || 0, xn(U.b + (o ? o(C) : C) * U.v) + U.u;
  };
}, _h = function(e) {
  var r = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function(o) {
    var l = xn(Math.round(parseFloat(o) / e) * e * r);
    return (l - l % 1) / r + (Ir(o) ? 0 : Gn(o));
  };
}, E_ = function(e, r) {
  var o = Zn(e), l, h;
  return !o && _r(e) && (l = o = e.radius || Gi, e.values ? (e = Zi(e.values), (h = !Ir(e[0])) && (l *= l)) : e = _h(e.increment)), rs(r, o ? dn(e) ? function(c) {
    return h = e(c), Math.abs(h - c) <= l ? h : c;
  } : function(c) {
    for (var g = parseFloat(h ? c.x : c), b = parseFloat(h ? c.y : 0), x = Gi, S = 0, A = e.length, k, y; A--; )
      h ? (k = e[A].x - g, y = e[A].y - b, k = k * k + y * y) : k = Math.abs(e[A] - g), k < x && (x = k, S = A);
    return S = !l || x <= l ? e[S] : c, h || S === c || Ir(c) ? S : S + Gn(c);
  } : _h(e));
}, k_ = function(e, r, o, l) {
  return rs(Zn(e) ? !r : o === !0 ? !!(o = 0) : !l, function() {
    return Zn(e) ? e[~~(Math.random() * e.length)] : (o = o || 1e-5) && (l = o < 1 ? Math.pow(10, (o + "").length - 2) : 1) && Math.floor(Math.round((e - o / 2 + Math.random() * (r - e + o * 0.99)) / o) * o * l) / l;
  });
}, bx = function() {
  for (var e = arguments.length, r = new Array(e), o = 0; o < e; o++)
    r[o] = arguments[o];
  return function(l) {
    return r.reduce(function(h, c) {
      return c(h);
    }, l);
  };
}, Sx = function(e, r) {
  return function(o) {
    return e(parseFloat(o)) + (r || Gn(o));
  };
}, Cx = function(e, r, o) {
  return R_(e, r, 0, 1, o);
}, L_ = function(e, r, o) {
  return rs(o, function(l) {
    return e[~~r(l)];
  });
}, Tx = function u(e, r, o) {
  var l = r - e;
  return Zn(e) ? L_(e, u(0, e.length), r) : rs(o, function(h) {
    return (l + (h - e) % l) % l + e;
  });
}, Ax = function u(e, r, o) {
  var l = r - e, h = l * 2;
  return Zn(e) ? L_(e, u(0, e.length - 1), r) : rs(o, function(c) {
    return c = (h + (c - e) % h) % h || 0, e + (c > l ? h - c : c);
  });
}, Ka = function(e) {
  for (var r = 0, o = "", l, h, c, g; ~(l = e.indexOf("random(", r)); )
    c = e.indexOf(")", l), g = e.charAt(l + 7) === "[", h = e.substr(l + 7, c - l - 7).match(g ? g_ : oh), o += e.substr(r, l - r) + k_(g ? h : +h[0], g ? 0 : +h[1], +h[2] || 1e-5), r = c + 1;
  return o + e.substr(r, e.length - r);
}, R_ = function(e, r, o, l, h) {
  var c = r - e, g = l - o;
  return rs(h, function(b) {
    return o + ((b - e) / c * g || 0);
  });
}, Px = function u(e, r, o, l) {
  var h = isNaN(e + r) ? 0 : function(y) {
    return (1 - y) * e + y * r;
  };
  if (!h) {
    var c = In(e), g = {}, b, x, S, A, k;
    if (o === !0 && (l = 1) && (o = null), c)
      e = {
        p: e
      }, r = {
        p: r
      };
    else if (Zn(e) && !Zn(r)) {
      for (S = [], A = e.length, k = A - 2, x = 1; x < A; x++)
        S.push(u(e[x - 1], e[x]));
      A--, h = function(D) {
        D *= A;
        var C = Math.min(k, ~~D);
        return S[C](D - C);
      }, o = r;
    } else
      l || (e = ha(Zn(e) ? [] : {}, e));
    if (!S) {
      for (b in r)
        Vh.call(g, e, b, "get", r[b]);
      h = function(D) {
        return Yh(D, g) || (c ? e.p : e);
      };
    }
  }
  return rs(o, h);
}, md = function(e, r, o) {
  var l = e.labels, h = Gi, c, g, b;
  for (c in l)
    g = l[c] - r, g < 0 == !!o && g && h > (g = Math.abs(g)) && (b = c, h = g);
  return b;
}, Ei = function(e, r, o) {
  var l = e.vars, h = l[r], c = en, g = e._ctx, b, x, S;
  if (h)
    return b = l[r + "Params"], x = l.callbackScope || e, o && Qr.length && du(), g && (en = g), S = b ? h.apply(x, b) : h.call(x), en = c, S;
}, Ba = function(e) {
  return es(e), e.scrollTrigger && e.scrollTrigger.kill(!!Bn), e.progress() < 1 && Ei(e, "onInterrupt"), e;
}, js, D_ = [], z_ = function(e) {
  if (e)
    if (e = !e.name && e.default || e, Dh() || e.headless) {
      var r = e.name, o = dn(e), l = r && !o && e.init ? function() {
        this._props = [];
      } : e, h = {
        init: Za,
        render: Yh,
        add: Vh,
        kill: qx,
        modifier: Ux,
        rawVars: 0
      }, c = {
        targetTest: 0,
        get: 0,
        getSetter: Wh,
        aliases: {},
        register: 0
      };
      if (da(), e !== l) {
        if (Mi[r])
          return;
        Di(l, Di(_u(e, h), c)), ha(l.prototype, ha(h, _u(e, c))), Mi[l.prop = r] = l, e.targetTest && (su.push(l), Nh[r] = 1), r = (r === "css" ? "CSS" : r.charAt(0).toUpperCase() + r.substr(1)) + "Plugin";
      }
      m_(r, l), e.register && e.register(mi, l, gi);
    } else
      D_.push(e);
}, He = 255, Na = {
  aqua: [0, He, He],
  lime: [0, He, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, He],
  navy: [0, 0, 128],
  white: [He, He, He],
  olive: [128, 128, 0],
  yellow: [He, He, 0],
  orange: [He, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [He, 0, 0],
  pink: [He, 192, 203],
  cyan: [0, He, He],
  transparent: [He, He, He, 0]
}, zl = function(e, r, o) {
  return e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? r + (o - r) * e * 6 : e < 0.5 ? o : e * 3 < 2 ? r + (o - r) * (2 / 3 - e) * 6 : r) * He + 0.5 | 0;
}, B_ = function(e, r, o) {
  var l = e ? Ir(e) ? [e >> 16, e >> 8 & He, e & He] : 0 : Na.black, h, c, g, b, x, S, A, k, y, D;
  if (!l) {
    if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), Na[e])
      l = Na[e];
    else if (e.charAt(0) === "#") {
      if (e.length < 6 && (h = e.charAt(1), c = e.charAt(2), g = e.charAt(3), e = "#" + h + h + c + c + g + g + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)
        return l = parseInt(e.substr(1, 6), 16), [l >> 16, l >> 8 & He, l & He, parseInt(e.substr(7), 16) / 255];
      e = parseInt(e.substr(1), 16), l = [e >> 16, e >> 8 & He, e & He];
    } else if (e.substr(0, 3) === "hsl") {
      if (l = D = e.match(oh), !r)
        b = +l[0] % 360 / 360, x = +l[1] / 100, S = +l[2] / 100, c = S <= 0.5 ? S * (x + 1) : S + x - S * x, h = S * 2 - c, l.length > 3 && (l[3] *= 1), l[0] = zl(b + 1 / 3, h, c), l[1] = zl(b, h, c), l[2] = zl(b - 1 / 3, h, c);
      else if (~e.indexOf("="))
        return l = e.match(d_), o && l.length < 4 && (l[3] = 1), l;
    } else
      l = e.match(oh) || Na.transparent;
    l = l.map(Number);
  }
  return r && !D && (h = l[0] / He, c = l[1] / He, g = l[2] / He, A = Math.max(h, c, g), k = Math.min(h, c, g), S = (A + k) / 2, A === k ? b = x = 0 : (y = A - k, x = S > 0.5 ? y / (2 - A - k) : y / (A + k), b = A === h ? (c - g) / y + (c < g ? 6 : 0) : A === c ? (g - h) / y + 2 : (h - c) / y + 4, b *= 60), l[0] = ~~(b + 0.5), l[1] = ~~(x * 100 + 0.5), l[2] = ~~(S * 100 + 0.5)), o && l.length < 4 && (l[3] = 1), l;
}, N_ = function(e) {
  var r = [], o = [], l = -1;
  return e.split(ts).forEach(function(h) {
    var c = h.match(Js) || [];
    r.push.apply(r, c), o.push(l += c.length + 1);
  }), r.c = o, r;
}, yd = function(e, r, o) {
  var l = "", h = (e + l).match(ts), c = r ? "hsla(" : "rgba(", g = 0, b, x, S, A;
  if (!h)
    return e;
  if (h = h.map(function(k) {
    return (k = B_(k, r, 1)) && c + (r ? k[0] + "," + k[1] + "%," + k[2] + "%," + k[3] : k.join(",")) + ")";
  }), o && (S = N_(e), b = o.c, b.join(l) !== S.c.join(l)))
    for (x = e.replace(ts, "1").split(Js), A = x.length - 1; g < A; g++)
      l += x[g] + (~b.indexOf(g) ? h.shift() || c + "0,0,0,0)" : (S.length ? S : h.length ? h : o).shift());
  if (!x)
    for (x = e.split(ts), A = x.length - 1; g < A; g++)
      l += x[g] + h[g];
  return l + x[A];
}, ts = function() {
  var u = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in Na)
    u += "|" + e + "\\b";
  return new RegExp(u + ")", "gi");
}(), Ox = /hsl[a]?\(/, F_ = function(e) {
  var r = e.join(" "), o;
  if (ts.lastIndex = 0, ts.test(r))
    return o = Ox.test(r), e[1] = yd(e[1], o), e[0] = yd(e[0], o, N_(e[1])), !0;
}, Ja, Ii = function() {
  var u = Date.now, e = 500, r = 33, o = u(), l = o, h = 1e3 / 240, c = h, g = [], b, x, S, A, k, y, D = function C(U) {
    var $ = u() - l, Z = U === !0, K, ot, lt, ct;
    if (($ > e || $ < 0) && (o += $ - r), l += $, lt = l - o, K = lt - c, (K > 0 || Z) && (ct = ++A.frame, k = lt - A.time * 1e3, A.time = lt = lt / 1e3, c += K + (K >= h ? 4 : h - K), ot = 1), Z || (b = x(C)), ot)
      for (y = 0; y < g.length; y++)
        g[y](lt, k, ct, U);
  };
  return A = {
    time: 0,
    frame: 0,
    tick: function() {
      D(!0);
    },
    deltaRatio: function(U) {
      return k / (1e3 / (U || 60));
    },
    wake: function() {
      v_ && (!uh && Dh() && (ur = uh = window, zh = ur.document || {}, Ri.gsap = mi, (ur.gsapVersions || (ur.gsapVersions = [])).push(mi.version), p_(cu || ur.GreenSockGlobals || !ur.gsap && ur || {}), D_.forEach(z_)), S = typeof requestAnimationFrame < "u" && requestAnimationFrame, b && A.sleep(), x = S || function(U) {
        return setTimeout(U, c - A.time * 1e3 + 1 | 0);
      }, Ja = 1, D(2));
    },
    sleep: function() {
      (S ? cancelAnimationFrame : clearTimeout)(b), Ja = 0, x = Za;
    },
    lagSmoothing: function(U, $) {
      e = U || 1 / 0, r = Math.min($ || 33, e);
    },
    fps: function(U) {
      h = 1e3 / (U || 240), c = A.time * 1e3 + h;
    },
    add: function(U, $, Z) {
      var K = $ ? function(ot, lt, ct, ht) {
        U(ot, lt, ct, ht), A.remove(K);
      } : U;
      return A.remove(U), g[Z ? "unshift" : "push"](K), da(), K;
    },
    remove: function(U, $) {
      ~($ = g.indexOf(U)) && g.splice($, 1) && y >= $ && y--;
    },
    _listeners: g
  }, A;
}(), da = function() {
  return !Ja && Ii.wake();
}, ke = {}, Mx = /^[\d.\-M][\d.\-,\s]/, Ix = /["']/g, Ex = function(e) {
  for (var r = {}, o = e.substr(1, e.length - 3).split(":"), l = o[0], h = 1, c = o.length, g, b, x; h < c; h++)
    b = o[h], g = h !== c - 1 ? b.lastIndexOf(",") : b.length, x = b.substr(0, g), r[l] = isNaN(x) ? x.replace(Ix, "").trim() : +x, l = b.substr(g + 1).trim();
  return r;
}, kx = function(e) {
  var r = e.indexOf("(") + 1, o = e.indexOf(")"), l = e.indexOf("(", r);
  return e.substring(r, ~l && l < o ? e.indexOf(")", o + 1) : o);
}, Lx = function(e) {
  var r = (e + "").split("("), o = ke[r[0]];
  return o && r.length > 1 && o.config ? o.config.apply(null, ~e.indexOf("{") ? [Ex(r[1])] : kx(e).split(",").map(b_)) : ke._CE && Mx.test(e) ? ke._CE("", e) : o;
}, $_ = function(e) {
  return function(r) {
    return 1 - e(1 - r);
  };
}, V_ = function u(e, r) {
  for (var o = e._first, l; o; )
    o instanceof ni ? u(o, r) : o.vars.yoyoEase && (!o._yoyo || !o._repeat) && o._yoyo !== r && (o.timeline ? u(o.timeline, r) : (l = o._ease, o._ease = o._yEase, o._yEase = l, o._yoyo = r)), o = o._next;
}, Ts = function(e, r) {
  return e && (dn(e) ? e : ke[e] || Lx(e)) || r;
}, Is = function(e, r, o, l) {
  o === void 0 && (o = function(b) {
    return 1 - r(1 - b);
  }), l === void 0 && (l = function(b) {
    return b < 0.5 ? r(b * 2) / 2 : 1 - r((1 - b) * 2) / 2;
  });
  var h = {
    easeIn: r,
    easeOut: o,
    easeInOut: l
  }, c;
  return _i(e, function(g) {
    ke[g] = Ri[g] = h, ke[c = g.toLowerCase()] = o;
    for (var b in h)
      ke[c + (b === "easeIn" ? ".in" : b === "easeOut" ? ".out" : ".inOut")] = ke[g + "." + b] = h[b];
  }), h;
}, U_ = function(e) {
  return function(r) {
    return r < 0.5 ? (1 - e(1 - r * 2)) / 2 : 0.5 + e((r - 0.5) * 2) / 2;
  };
}, Bl = function u(e, r, o) {
  var l = r >= 1 ? r : 1, h = (o || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1), c = h / ah * (Math.asin(1 / l) || 0), g = function(S) {
    return S === 1 ? 1 : l * Math.pow(2, -10 * S) * ox((S - c) * h) + 1;
  }, b = e === "out" ? g : e === "in" ? function(x) {
    return 1 - g(1 - x);
  } : U_(g);
  return h = ah / h, b.config = function(x, S) {
    return u(e, x, S);
  }, b;
}, Nl = function u(e, r) {
  r === void 0 && (r = 1.70158);
  var o = function(c) {
    return c ? --c * c * ((r + 1) * c + r) + 1 : 0;
  }, l = e === "out" ? o : e === "in" ? function(h) {
    return 1 - o(1 - h);
  } : U_(o);
  return l.config = function(h) {
    return u(e, h);
  }, l;
};
_i("Linear,Quad,Cubic,Quart,Quint,Strong", function(u, e) {
  var r = e < 5 ? e + 1 : e;
  Is(u + ",Power" + (r - 1), e ? function(o) {
    return Math.pow(o, r);
  } : function(o) {
    return o;
  }, function(o) {
    return 1 - Math.pow(1 - o, r);
  }, function(o) {
    return o < 0.5 ? Math.pow(o * 2, r) / 2 : 1 - Math.pow((1 - o) * 2, r) / 2;
  });
});
ke.Linear.easeNone = ke.none = ke.Linear.easeIn;
Is("Elastic", Bl("in"), Bl("out"), Bl());
(function(u, e) {
  var r = 1 / e, o = 2 * r, l = 2.5 * r, h = function(g) {
    return g < r ? u * g * g : g < o ? u * Math.pow(g - 1.5 / e, 2) + 0.75 : g < l ? u * (g -= 2.25 / e) * g + 0.9375 : u * Math.pow(g - 2.625 / e, 2) + 0.984375;
  };
  Is("Bounce", function(c) {
    return 1 - h(1 - c);
  }, h);
})(7.5625, 2.75);
Is("Expo", function(u) {
  return Math.pow(2, 10 * (u - 1)) * u + u * u * u * u * u * u * (1 - u);
});
Is("Circ", function(u) {
  return -(f_(1 - u * u) - 1);
});
Is("Sine", function(u) {
  return u === 1 ? 1 : -ax(u * rx) + 1;
});
Is("Back", Nl("in"), Nl("out"), Nl());
ke.SteppedEase = ke.steps = Ri.SteppedEase = {
  config: function(e, r) {
    e === void 0 && (e = 1);
    var o = 1 / e, l = e + (r ? 0 : 1), h = r ? 1 : 0, c = 1 - Xe;
    return function(g) {
      return ((l * io(0, c, g) | 0) + h) * o;
    };
  }
};
la.ease = ke["quad.out"];
_i("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(u) {
  return Fh += u + "," + u + "Params,";
});
var q_ = function(e, r) {
  this.id = sx++, e._gsap = this, this.target = e, this.harness = r, this.get = r ? r.get : w_, this.set = r ? r.getSetter : Wh;
}, ja = /* @__PURE__ */ function() {
  function u(r) {
    this.vars = r, this._delay = +r.delay || 0, (this._repeat = r.repeat === 1 / 0 ? -2 : r.repeat || 0) && (this._rDelay = r.repeatDelay || 0, this._yoyo = !!r.yoyo || !!r.yoyoEase), this._ts = 1, ca(this, +r.duration, 1, 1), this.data = r.data, en && (this._ctx = en, en.data.push(this)), Ja || Ii.wake();
  }
  var e = u.prototype;
  return e.delay = function(o) {
    return o || o === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + o - this._delay), this._delay = o, this) : this._delay;
  }, e.duration = function(o) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? o + (o + this._rDelay) * this._repeat : o) : this.totalDuration() && this._dur;
  }, e.totalDuration = function(o) {
    return arguments.length ? (this._dirty = 0, ca(this, this._repeat < 0 ? o : (o - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function(o, l) {
    if (da(), !arguments.length)
      return this._tTime;
    var h = this._dp;
    if (h && h.smoothChildTiming && this._ts) {
      for (Su(this, o), !h._dp || h.parent || T_(h, this); h && h.parent; )
        h.parent._time !== h._start + (h._ts >= 0 ? h._tTime / h._ts : (h.totalDuration() - h._tTime) / -h._ts) && h.totalTime(h._tTime, !0), h = h.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && o < this._tDur || this._ts < 0 && o > 0 || !this._tDur && !o) && hr(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== o || !this._dur && !l || this._initted && Math.abs(this._zTime) === Xe || !o && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = o), x_(this, o, l)), this;
  }, e.time = function(o, l) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), o + vd(this)) % (this._dur + this._rDelay) || (o ? this._dur : 0), l) : this._time;
  }, e.totalProgress = function(o, l) {
    return arguments.length ? this.totalTime(this.totalDuration() * o, l) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function(o, l) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - o : o) + vd(this), l) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function(o, l) {
    var h = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (o - 1) * h, l) : this._repeat ? fa(this._tTime, h) + 1 : 1;
  }, e.timeScale = function(o, l) {
    if (!arguments.length)
      return this._rts === -Xe ? 0 : this._rts;
    if (this._rts === o)
      return this;
    var h = this.parent && this._ts ? gu(this.parent._time, this) : this._tTime;
    return this._rts = +o || 0, this._ts = this._ps || o === -Xe ? 0 : this._rts, this.totalTime(io(-Math.abs(this._delay), this._tDur, h), l !== !1), bu(this), _x(this);
  }, e.paused = function(o) {
    return arguments.length ? (this._ps !== o && (this._ps = o, o ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (da(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== Xe && (this._tTime -= Xe)))), this) : this._ps;
  }, e.startTime = function(o) {
    if (arguments.length) {
      this._start = o;
      var l = this.parent || this._dp;
      return l && (l._sort || !this.parent) && hr(l, this, o - this._delay), this;
    }
    return this._start;
  }, e.endTime = function(o) {
    return this._start + (di(o) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function(o) {
    var l = this.parent || this._dp;
    return l ? o && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? gu(l.rawTime(o), this) : this._tTime : this._tTime;
  }, e.revert = function(o) {
    o === void 0 && (o = hx);
    var l = Bn;
    return Bn = o, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(o), this.totalTime(-0.01, o.suppressEvents)), this.data !== "nested" && o.kill !== !1 && this.kill(), Bn = l, this;
  }, e.globalTime = function(o) {
    for (var l = this, h = arguments.length ? o : l.rawTime(); l; )
      h = l._start + h / (Math.abs(l._ts) || 1), l = l._dp;
    return !this.parent && this._sat ? this._sat.globalTime(o) : h;
  }, e.repeat = function(o) {
    return arguments.length ? (this._repeat = o === 1 / 0 ? -2 : o, pd(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function(o) {
    if (arguments.length) {
      var l = this._time;
      return this._rDelay = o, pd(this), l ? this.time(l) : this;
    }
    return this._rDelay;
  }, e.yoyo = function(o) {
    return arguments.length ? (this._yoyo = o, this) : this._yoyo;
  }, e.seek = function(o, l) {
    return this.totalTime(Hi(this, o), di(l));
  }, e.restart = function(o, l) {
    return this.play().totalTime(o ? -this._delay : 0, di(l)), this._dur || (this._zTime = -Xe), this;
  }, e.play = function(o, l) {
    return o != null && this.seek(o, l), this.reversed(!1).paused(!1);
  }, e.reverse = function(o, l) {
    return o != null && this.seek(o || this.totalDuration(), l), this.reversed(!0).paused(!1);
  }, e.pause = function(o, l) {
    return o != null && this.seek(o, l), this.paused(!0);
  }, e.resume = function() {
    return this.paused(!1);
  }, e.reversed = function(o) {
    return arguments.length ? (!!o !== this.reversed() && this.timeScale(-this._rts || (o ? -Xe : 0)), this) : this._rts < 0;
  }, e.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -Xe, this;
  }, e.isActive = function() {
    var o = this.parent || this._dp, l = this._start, h;
    return !!(!o || this._ts && this._initted && o.isActive() && (h = o.rawTime(!0)) >= l && h < this.endTime(!0) - Xe);
  }, e.eventCallback = function(o, l, h) {
    var c = this.vars;
    return arguments.length > 1 ? (l ? (c[o] = l, h && (c[o + "Params"] = h), o === "onUpdate" && (this._onUpdate = l)) : delete c[o], this) : c[o];
  }, e.then = function(o) {
    var l = this;
    return new Promise(function(h) {
      var c = dn(o) ? o : S_, g = function() {
        var x = l.then;
        l.then = null, dn(c) && (c = c(l)) && (c.then || c === l) && (l.then = x), h(c), l.then = x;
      };
      l._initted && l.totalProgress() === 1 && l._ts >= 0 || !l._tTime && l._ts < 0 ? g() : l._prom = g;
    });
  }, e.kill = function() {
    Ba(this);
  }, u;
}();
Di(ja.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -Xe,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var ni = /* @__PURE__ */ function(u) {
  h_(e, u);
  function e(o, l) {
    var h;
    return o === void 0 && (o = {}), h = u.call(this, o) || this, h.labels = {}, h.smoothChildTiming = !!o.smoothChildTiming, h.autoRemoveChildren = !!o.autoRemoveChildren, h._sort = di(o.sortChildren), un && hr(o.parent || un, Tr(h), l), o.reversed && h.reverse(), o.paused && h.paused(!0), o.scrollTrigger && A_(Tr(h), o.scrollTrigger), h;
  }
  var r = e.prototype;
  return r.to = function(l, h, c) {
    return qa(0, arguments, this), this;
  }, r.from = function(l, h, c) {
    return qa(1, arguments, this), this;
  }, r.fromTo = function(l, h, c, g) {
    return qa(2, arguments, this), this;
  }, r.set = function(l, h, c) {
    return h.duration = 0, h.parent = this, Ua(h).repeatDelay || (h.repeat = 0), h.immediateRender = !!h.immediateRender, new wn(l, h, Hi(this, c), 1), this;
  }, r.call = function(l, h, c) {
    return hr(this, wn.delayedCall(0, l, h), c);
  }, r.staggerTo = function(l, h, c, g, b, x, S) {
    return c.duration = h, c.stagger = c.stagger || g, c.onComplete = x, c.onCompleteParams = S, c.parent = this, new wn(l, c, Hi(this, b)), this;
  }, r.staggerFrom = function(l, h, c, g, b, x, S) {
    return c.runBackwards = 1, Ua(c).immediateRender = di(c.immediateRender), this.staggerTo(l, h, c, g, b, x, S);
  }, r.staggerFromTo = function(l, h, c, g, b, x, S, A) {
    return g.startAt = c, Ua(g).immediateRender = di(g.immediateRender), this.staggerTo(l, h, g, b, x, S, A);
  }, r.render = function(l, h, c) {
    var g = this._time, b = this._dirty ? this.totalDuration() : this._tDur, x = this._dur, S = l <= 0 ? 0 : xn(l), A = this._zTime < 0 != l < 0 && (this._initted || !x), k, y, D, C, U, $, Z, K, ot, lt, ct, ht;
    if (this !== un && S > b && l >= 0 && (S = b), S !== this._tTime || c || A) {
      if (g !== this._time && x && (S += this._time - g, l += this._time - g), k = S, ot = this._start, K = this._ts, $ = !K, A && (x || (g = this._zTime), (l || !h) && (this._zTime = l)), this._repeat) {
        if (ct = this._yoyo, U = x + this._rDelay, this._repeat < -1 && l < 0)
          return this.totalTime(U * 100 + l, h, c);
        if (k = xn(S % U), S === b ? (C = this._repeat, k = x) : (lt = xn(S / U), C = ~~lt, C && C === lt && (k = x, C--), k > x && (k = x)), lt = fa(this._tTime, U), !g && this._tTime && lt !== C && this._tTime - lt * U - this._dur <= 0 && (lt = C), ct && C & 1 && (k = x - k, ht = 1), C !== lt && !this._lock) {
          var _t = ct && lt & 1, at = _t === (ct && C & 1);
          if (C < lt && (_t = !_t), g = _t ? 0 : S % x ? x : S, this._lock = 1, this.render(g || (ht ? 0 : xn(C * U)), h, !x)._lock = 0, this._tTime = S, !h && this.parent && Ei(this, "onRepeat"), this.vars.repeatRefresh && !ht && (this.invalidate()._lock = 1), g && g !== this._time || $ !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (x = this._dur, b = this._tDur, at && (this._lock = 2, g = _t ? x : -1e-4, this.render(g, !0), this.vars.repeatRefresh && !ht && this.invalidate()), this._lock = 0, !this._ts && !$)
            return this;
          V_(this, ht);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (Z = mx(this, xn(g), xn(k)), Z && (S -= k - (k = Z._start))), this._tTime = S, this._time = k, this._act = !K, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = l, g = 0), !g && k && !h && !C && (Ei(this, "onStart"), this._tTime !== S))
        return this;
      if (k >= g && l >= 0)
        for (y = this._first; y; ) {
          if (D = y._next, (y._act || k >= y._start) && y._ts && Z !== y) {
            if (y.parent !== this)
              return this.render(l, h, c);
            if (y.render(y._ts > 0 ? (k - y._start) * y._ts : (y._dirty ? y.totalDuration() : y._tDur) + (k - y._start) * y._ts, h, c), k !== this._time || !this._ts && !$) {
              Z = 0, D && (S += this._zTime = -Xe);
              break;
            }
          }
          y = D;
        }
      else {
        y = this._last;
        for (var Pt = l < 0 ? l : k; y; ) {
          if (D = y._prev, (y._act || Pt <= y._end) && y._ts && Z !== y) {
            if (y.parent !== this)
              return this.render(l, h, c);
            if (y.render(y._ts > 0 ? (Pt - y._start) * y._ts : (y._dirty ? y.totalDuration() : y._tDur) + (Pt - y._start) * y._ts, h, c || Bn && (y._initted || y._startAt)), k !== this._time || !this._ts && !$) {
              Z = 0, D && (S += this._zTime = Pt ? -Xe : Xe);
              break;
            }
          }
          y = D;
        }
      }
      if (Z && !h && (this.pause(), Z.render(k >= g ? 0 : -Xe)._zTime = k >= g ? 1 : -1, this._ts))
        return this._start = ot, bu(this), this.render(l, h, c);
      this._onUpdate && !h && Ei(this, "onUpdate", !0), (S === b && this._tTime >= this.totalDuration() || !S && g) && (ot === this._start || Math.abs(K) !== Math.abs(this._ts)) && (this._lock || ((l || !x) && (S === b && this._ts > 0 || !S && this._ts < 0) && es(this, 1), !h && !(l < 0 && !g) && (S || g || !b) && (Ei(this, S === b && l >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(S < b && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, r.add = function(l, h) {
    var c = this;
    if (Ir(h) || (h = Hi(this, h, l)), !(l instanceof ja)) {
      if (Zn(l))
        return l.forEach(function(g) {
          return c.add(g, h);
        }), this;
      if (In(l))
        return this.addLabel(l, h);
      if (dn(l))
        l = wn.delayedCall(0, l);
      else
        return this;
    }
    return this !== l ? hr(this, l, h) : this;
  }, r.getChildren = function(l, h, c, g) {
    l === void 0 && (l = !0), h === void 0 && (h = !0), c === void 0 && (c = !0), g === void 0 && (g = -Gi);
    for (var b = [], x = this._first; x; )
      x._start >= g && (x instanceof wn ? h && b.push(x) : (c && b.push(x), l && b.push.apply(b, x.getChildren(!0, h, c)))), x = x._next;
    return b;
  }, r.getById = function(l) {
    for (var h = this.getChildren(1, 1, 1), c = h.length; c--; )
      if (h[c].vars.id === l)
        return h[c];
  }, r.remove = function(l) {
    return In(l) ? this.removeLabel(l) : dn(l) ? this.killTweensOf(l) : (l.parent === this && xu(this, l), l === this._recent && (this._recent = this._last), Cs(this));
  }, r.totalTime = function(l, h) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = xn(Ii.time - (this._ts > 0 ? l / this._ts : (this.totalDuration() - l) / -this._ts))), u.prototype.totalTime.call(this, l, h), this._forcing = 0, this) : this._tTime;
  }, r.addLabel = function(l, h) {
    return this.labels[l] = Hi(this, h), this;
  }, r.removeLabel = function(l) {
    return delete this.labels[l], this;
  }, r.addPause = function(l, h, c) {
    var g = wn.delayedCall(0, h || Za, c);
    return g.data = "isPause", this._hasPause = 1, hr(this, g, Hi(this, l));
  }, r.removePause = function(l) {
    var h = this._first;
    for (l = Hi(this, l); h; )
      h._start === l && h.data === "isPause" && es(h), h = h._next;
  }, r.killTweensOf = function(l, h, c) {
    for (var g = this.getTweensOf(l, c), b = g.length; b--; )
      Kr !== g[b] && g[b].kill(l, h);
    return this;
  }, r.getTweensOf = function(l, h) {
    for (var c = [], g = Zi(l), b = this._first, x = Ir(h), S; b; )
      b instanceof wn ? fx(b._targets, g) && (x ? (!Kr || b._initted && b._ts) && b.globalTime(0) <= h && b.globalTime(b.totalDuration()) > h : !h || b.isActive()) && c.push(b) : (S = b.getTweensOf(g, h)).length && c.push.apply(c, S), b = b._next;
    return c;
  }, r.tweenTo = function(l, h) {
    h = h || {};
    var c = this, g = Hi(c, l), b = h, x = b.startAt, S = b.onStart, A = b.onStartParams, k = b.immediateRender, y, D = wn.to(c, Di({
      ease: h.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: g,
      overwrite: "auto",
      duration: h.duration || Math.abs((g - (x && "time" in x ? x.time : c._time)) / c.timeScale()) || Xe,
      onStart: function() {
        if (c.pause(), !y) {
          var U = h.duration || Math.abs((g - (x && "time" in x ? x.time : c._time)) / c.timeScale());
          D._dur !== U && ca(D, U, 0, 1).render(D._time, !0, !0), y = 1;
        }
        S && S.apply(D, A || []);
      }
    }, h));
    return k ? D.render(0) : D;
  }, r.tweenFromTo = function(l, h, c) {
    return this.tweenTo(h, Di({
      startAt: {
        time: Hi(this, l)
      }
    }, c));
  }, r.recent = function() {
    return this._recent;
  }, r.nextLabel = function(l) {
    return l === void 0 && (l = this._time), md(this, Hi(this, l));
  }, r.previousLabel = function(l) {
    return l === void 0 && (l = this._time), md(this, Hi(this, l), 1);
  }, r.currentLabel = function(l) {
    return arguments.length ? this.seek(l, !0) : this.previousLabel(this._time + Xe);
  }, r.shiftChildren = function(l, h, c) {
    c === void 0 && (c = 0);
    for (var g = this._first, b = this.labels, x; g; )
      g._start >= c && (g._start += l, g._end += l), g = g._next;
    if (h)
      for (x in b)
        b[x] >= c && (b[x] += l);
    return Cs(this);
  }, r.invalidate = function(l) {
    var h = this._first;
    for (this._lock = 0; h; )
      h.invalidate(l), h = h._next;
    return u.prototype.invalidate.call(this, l);
  }, r.clear = function(l) {
    l === void 0 && (l = !0);
    for (var h = this._first, c; h; )
      c = h._next, this.remove(h), h = c;
    return this._dp && (this._time = this._tTime = this._pTime = 0), l && (this.labels = {}), Cs(this);
  }, r.totalDuration = function(l) {
    var h = 0, c = this, g = c._last, b = Gi, x, S, A;
    if (arguments.length)
      return c.timeScale((c._repeat < 0 ? c.duration() : c.totalDuration()) / (c.reversed() ? -l : l));
    if (c._dirty) {
      for (A = c.parent; g; )
        x = g._prev, g._dirty && g.totalDuration(), S = g._start, S > b && c._sort && g._ts && !c._lock ? (c._lock = 1, hr(c, g, S - g._delay, 1)._lock = 0) : b = S, S < 0 && g._ts && (h -= S, (!A && !c._dp || A && A.smoothChildTiming) && (c._start += S / c._ts, c._time -= S, c._tTime -= S), c.shiftChildren(-S, !1, -1 / 0), b = 0), g._end > h && g._ts && (h = g._end), g = x;
      ca(c, c === un && c._time > h ? c._time : h, 1, 1), c._dirty = 0;
    }
    return c._tDur;
  }, e.updateRoot = function(l) {
    if (un._ts && (x_(un, gu(l, un)), y_ = Ii.frame), Ii.frame >= _d) {
      _d += ki.autoSleep || 120;
      var h = un._first;
      if ((!h || !h._ts) && ki.autoSleep && Ii._listeners.length < 2) {
        for (; h && !h._ts; )
          h = h._next;
        h || Ii.sleep();
      }
    }
  }, e;
}(ja);
Di(ni.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var Rx = function(e, r, o, l, h, c, g) {
  var b = new gi(this._pt, e, r, 0, 1, Z_, null, h), x = 0, S = 0, A, k, y, D, C, U, $, Z;
  for (b.b = o, b.e = l, o += "", l += "", ($ = ~l.indexOf("random(")) && (l = Ka(l)), c && (Z = [o, l], c(Z, e, r), o = Z[0], l = Z[1]), k = o.match(Rl) || []; A = Rl.exec(l); )
    D = A[0], C = l.substring(x, A.index), y ? y = (y + 1) % 5 : C.substr(-5) === "rgba(" && (y = 1), D !== k[S++] && (U = parseFloat(k[S - 1]) || 0, b._pt = {
      _next: b._pt,
      p: C || S === 1 ? C : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: U,
      c: D.charAt(1) === "=" ? na(U, D) - U : parseFloat(D) - U,
      m: y && y < 4 ? Math.round : 0
    }, x = Rl.lastIndex);
  return b.c = x < l.length ? l.substring(x, l.length) : "", b.fp = g, (__.test(l) || $) && (b.e = 0), this._pt = b, b;
}, Vh = function(e, r, o, l, h, c, g, b, x, S) {
  dn(l) && (l = l(h || 0, e, c));
  var A = e[r], k = o !== "get" ? o : dn(A) ? x ? e[r.indexOf("set") || !dn(e["get" + r.substr(3)]) ? r : "get" + r.substr(3)](x) : e[r]() : A, y = dn(A) ? x ? Fx : X_ : qh, D;
  if (In(l) && (~l.indexOf("random(") && (l = Ka(l)), l.charAt(1) === "=" && (D = na(k, l) + (Gn(k) || 0), (D || D === 0) && (l = D))), !S || k !== l || gh)
    return !isNaN(k * l) && l !== "" ? (D = new gi(this._pt, e, r, +k || 0, l - (k || 0), typeof A == "boolean" ? Vx : G_, 0, y), x && (D.fp = x), g && D.modifier(g, this, e), this._pt = D) : (!A && !(r in e) && Bh(r, l), Rx.call(this, e, r, k, l, y, b || ki.stringFilter, x));
}, Dx = function(e, r, o, l, h) {
  if (dn(e) && (e = Wa(e, h, r, o, l)), !_r(e) || e.style && e.nodeType || Zn(e) || c_(e))
    return In(e) ? Wa(e, h, r, o, l) : e;
  var c = {}, g;
  for (g in e)
    c[g] = Wa(e[g], h, r, o, l);
  return c;
}, W_ = function(e, r, o, l, h, c) {
  var g, b, x, S;
  if (Mi[e] && (g = new Mi[e]()).init(h, g.rawVars ? r[e] : Dx(r[e], l, h, c, o), o, l, c) !== !1 && (o._pt = b = new gi(o._pt, h, e, 0, 1, g.render, g, 0, g.priority), o !== js))
    for (x = o._ptLookup[o._targets.indexOf(h)], S = g._props.length; S--; )
      x[g._props[S]] = b;
  return g;
}, Kr, gh, Uh = function u(e, r, o) {
  var l = e.vars, h = l.ease, c = l.startAt, g = l.immediateRender, b = l.lazy, x = l.onUpdate, S = l.runBackwards, A = l.yoyoEase, k = l.keyframes, y = l.autoRevert, D = e._dur, C = e._startAt, U = e._targets, $ = e.parent, Z = $ && $.data === "nested" ? $.vars.targets : U, K = e._overwrite === "auto" && !Lh, ot = e.timeline, lt, ct, ht, _t, at, Pt, Mt, Et, kt, bt, Dt, vt, $t;
  if (ot && (!k || !h) && (h = "none"), e._ease = Ts(h, la.ease), e._yEase = A ? $_(Ts(A === !0 ? h : A, la.ease)) : 0, A && e._yoyo && !e._repeat && (A = e._yEase, e._yEase = e._ease, e._ease = A), e._from = !ot && !!l.runBackwards, !ot || k && !l.stagger) {
    if (Et = U[0] ? Ss(U[0]).harness : 0, vt = Et && l[Et.prop], lt = _u(l, Nh), C && (C._zTime < 0 && C.progress(1), r < 0 && S && g && !y ? C.render(-1, !0) : C.revert(S && D ? ru : lx), C._lazy = 0), c) {
      if (es(e._startAt = wn.set(U, Di({
        data: "isStart",
        overwrite: !1,
        parent: $,
        immediateRender: !0,
        lazy: !C && di(b),
        startAt: null,
        delay: 0,
        onUpdate: x && function() {
          return Ei(e, "onUpdate");
        },
        stagger: 0
      }, c))), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (Bn || !g && !y) && e._startAt.revert(ru), g && D && r <= 0 && o <= 0) {
        r && (e._zTime = r);
        return;
      }
    } else if (S && D && !C) {
      if (r && (g = !1), ht = Di({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: g && !C && di(b),
        immediateRender: g,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: $
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, lt), vt && (ht[Et.prop] = vt), es(e._startAt = wn.set(U, ht)), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (Bn ? e._startAt.revert(ru) : e._startAt.render(-1, !0)), e._zTime = r, !g)
        u(e._startAt, Xe, Xe);
      else if (!r)
        return;
    }
    for (e._pt = e._ptCache = 0, b = D && di(b) || b && !D, ct = 0; ct < U.length; ct++) {
      if (at = U[ct], Mt = at._gsap || $h(U)[ct]._gsap, e._ptLookup[ct] = bt = {}, lh[Mt.id] && Qr.length && du(), Dt = Z === U ? ct : Z.indexOf(at), Et && (kt = new Et()).init(at, vt || lt, e, Dt, Z) !== !1 && (e._pt = _t = new gi(e._pt, at, kt.name, 0, 1, kt.render, kt, 0, kt.priority), kt._props.forEach(function(Yt) {
        bt[Yt] = _t;
      }), kt.priority && (Pt = 1)), !Et || vt)
        for (ht in lt)
          Mi[ht] && (kt = W_(ht, lt, e, Dt, at, Z)) ? kt.priority && (Pt = 1) : bt[ht] = _t = Vh.call(e, at, ht, "get", lt[ht], Dt, Z, 0, l.stringFilter);
      e._op && e._op[ct] && e.kill(at, e._op[ct]), K && e._pt && (Kr = e, un.killTweensOf(at, bt, e.globalTime(r)), $t = !e.parent, Kr = 0), e._pt && b && (lh[Mt.id] = 1);
    }
    Pt && K_(e), e._onInit && e._onInit(e);
  }
  e._onUpdate = x, e._initted = (!e._op || e._pt) && !$t, k && r <= 0 && ot.render(Gi, !0, !0);
}, zx = function(e, r, o, l, h, c, g, b) {
  var x = (e._pt && e._ptCache || (e._ptCache = {}))[r], S, A, k, y;
  if (!x)
    for (x = e._ptCache[r] = [], k = e._ptLookup, y = e._targets.length; y--; ) {
      if (S = k[y][r], S && S.d && S.d._pt)
        for (S = S.d._pt; S && S.p !== r && S.fp !== r; )
          S = S._next;
      if (!S)
        return gh = 1, e.vars[r] = "+=0", Uh(e, g), gh = 0, b ? Ga(r + " not eligible for reset") : 1;
      x.push(S);
    }
  for (y = x.length; y--; )
    A = x[y], S = A._pt || A, S.s = (l || l === 0) && !h ? l : S.s + (l || 0) + c * S.c, S.c = o - S.s, A.e && (A.e = pn(o) + Gn(A.e)), A.b && (A.b = S.s + Gn(A.b));
}, Bx = function(e, r) {
  var o = e[0] ? Ss(e[0]).harness : 0, l = o && o.aliases, h, c, g, b;
  if (!l)
    return r;
  h = ha({}, r);
  for (c in l)
    if (c in h)
      for (b = l[c].split(","), g = b.length; g--; )
        h[b[g]] = h[c];
  return h;
}, Nx = function(e, r, o, l) {
  var h = r.ease || l || "power1.inOut", c, g;
  if (Zn(r))
    g = o[e] || (o[e] = []), r.forEach(function(b, x) {
      return g.push({
        t: x / (r.length - 1) * 100,
        v: b,
        e: h
      });
    });
  else
    for (c in r)
      g = o[c] || (o[c] = []), c === "ease" || g.push({
        t: parseFloat(e),
        v: r[c],
        e: h
      });
}, Wa = function(e, r, o, l, h) {
  return dn(e) ? e.call(r, o, l, h) : In(e) && ~e.indexOf("random(") ? Ka(e) : e;
}, Y_ = Fh + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", H_ = {};
_i(Y_ + ",id,stagger,delay,duration,paused,scrollTrigger", function(u) {
  return H_[u] = 1;
});
var wn = /* @__PURE__ */ function(u) {
  h_(e, u);
  function e(o, l, h, c) {
    var g;
    typeof l == "number" && (h.duration = l, l = h, h = null), g = u.call(this, c ? l : Ua(l)) || this;
    var b = g.vars, x = b.duration, S = b.delay, A = b.immediateRender, k = b.stagger, y = b.overwrite, D = b.keyframes, C = b.defaults, U = b.scrollTrigger, $ = b.yoyoEase, Z = l.parent || un, K = (Zn(o) || c_(o) ? Ir(o[0]) : "length" in l) ? [o] : Zi(o), ot, lt, ct, ht, _t, at, Pt, Mt;
    if (g._targets = K.length ? $h(K) : Ga("GSAP target " + o + " not found. https://gsap.com", !ki.nullTargetWarn) || [], g._ptLookup = [], g._overwrite = y, D || k || Ko(x) || Ko(S)) {
      if (l = g.vars, ot = g.timeline = new ni({
        data: "nested",
        defaults: C || {},
        targets: Z && Z.data === "nested" ? Z.vars.targets : K
      }), ot.kill(), ot.parent = ot._dp = Tr(g), ot._start = 0, k || Ko(x) || Ko(S)) {
        if (ht = K.length, Pt = k && I_(k), _r(k))
          for (_t in k)
            ~Y_.indexOf(_t) && (Mt || (Mt = {}), Mt[_t] = k[_t]);
        for (lt = 0; lt < ht; lt++)
          ct = _u(l, H_), ct.stagger = 0, $ && (ct.yoyoEase = $), Mt && ha(ct, Mt), at = K[lt], ct.duration = +Wa(x, Tr(g), lt, at, K), ct.delay = (+Wa(S, Tr(g), lt, at, K) || 0) - g._delay, !k && ht === 1 && ct.delay && (g._delay = S = ct.delay, g._start += S, ct.delay = 0), ot.to(at, ct, Pt ? Pt(lt, at, K) : 0), ot._ease = ke.none;
        ot.duration() ? x = S = 0 : g.timeline = 0;
      } else if (D) {
        Ua(Di(ot.vars.defaults, {
          ease: "none"
        })), ot._ease = Ts(D.ease || l.ease || "none");
        var Et = 0, kt, bt, Dt;
        if (Zn(D))
          D.forEach(function(vt) {
            return ot.to(K, vt, ">");
          }), ot.duration();
        else {
          ct = {};
          for (_t in D)
            _t === "ease" || _t === "easeEach" || Nx(_t, D[_t], ct, D.easeEach);
          for (_t in ct)
            for (kt = ct[_t].sort(function(vt, $t) {
              return vt.t - $t.t;
            }), Et = 0, lt = 0; lt < kt.length; lt++)
              bt = kt[lt], Dt = {
                ease: bt.e,
                duration: (bt.t - (lt ? kt[lt - 1].t : 0)) / 100 * x
              }, Dt[_t] = bt.v, ot.to(K, Dt, Et), Et += Dt.duration;
          ot.duration() < x && ot.to({}, {
            duration: x - ot.duration()
          });
        }
      }
      x || g.duration(x = ot.duration());
    } else
      g.timeline = 0;
    return y === !0 && !Lh && (Kr = Tr(g), un.killTweensOf(K), Kr = 0), hr(Z, Tr(g), h), l.reversed && g.reverse(), l.paused && g.paused(!0), (A || !x && !D && g._start === xn(Z._time) && di(A) && gx(Tr(g)) && Z.data !== "nested") && (g._tTime = -Xe, g.render(Math.max(0, -S) || 0)), U && A_(Tr(g), U), g;
  }
  var r = e.prototype;
  return r.render = function(l, h, c) {
    var g = this._time, b = this._tDur, x = this._dur, S = l < 0, A = l > b - Xe && !S ? b : l < Xe ? 0 : l, k, y, D, C, U, $, Z, K, ot;
    if (!x)
      px(this, l, h, c);
    else if (A !== this._tTime || !l || c || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== S || this._lazy) {
      if (k = A, K = this.timeline, this._repeat) {
        if (C = x + this._rDelay, this._repeat < -1 && S)
          return this.totalTime(C * 100 + l, h, c);
        if (k = xn(A % C), A === b ? (D = this._repeat, k = x) : (U = xn(A / C), D = ~~U, D && D === U ? (k = x, D--) : k > x && (k = x)), $ = this._yoyo && D & 1, $ && (ot = this._yEase, k = x - k), U = fa(this._tTime, C), k === g && !c && this._initted && D === U)
          return this._tTime = A, this;
        D !== U && (K && this._yEase && V_(K, $), this.vars.repeatRefresh && !$ && !this._lock && k !== C && this._initted && (this._lock = c = 1, this.render(xn(C * D), !0).invalidate()._lock = 0));
      }
      if (!this._initted) {
        if (P_(this, S ? l : k, c, h, A))
          return this._tTime = 0, this;
        if (g !== this._time && !(c && this.vars.repeatRefresh && D !== U))
          return this;
        if (x !== this._dur)
          return this.render(l, h, c);
      }
      if (this._tTime = A, this._time = k, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = Z = (ot || this._ease)(k / x), this._from && (this.ratio = Z = 1 - Z), k && !g && !h && !D && (Ei(this, "onStart"), this._tTime !== A))
        return this;
      for (y = this._pt; y; )
        y.r(Z, y.d), y = y._next;
      K && K.render(l < 0 ? l : K._dur * K._ease(k / this._dur), h, c) || this._startAt && (this._zTime = l), this._onUpdate && !h && (S && hh(this, l, h, c), Ei(this, "onUpdate")), this._repeat && D !== U && this.vars.onRepeat && !h && this.parent && Ei(this, "onRepeat"), (A === this._tDur || !A) && this._tTime === A && (S && !this._onUpdate && hh(this, l, !0, !0), (l || !x) && (A === this._tDur && this._ts > 0 || !A && this._ts < 0) && es(this, 1), !h && !(S && !g) && (A || g || $) && (Ei(this, A === b ? "onComplete" : "onReverseComplete", !0), this._prom && !(A < b && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, r.targets = function() {
    return this._targets;
  }, r.invalidate = function(l) {
    return (!l || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(l), u.prototype.invalidate.call(this, l);
  }, r.resetTo = function(l, h, c, g, b) {
    Ja || Ii.wake(), this._ts || this.play();
    var x = Math.min(this._dur, (this._dp._time - this._start) * this._ts), S;
    return this._initted || Uh(this, x), S = this._ease(x / this._dur), zx(this, l, h, c, g, S, x, b) ? this.resetTo(l, h, c, g, 1) : (Su(this, 0), this.parent || C_(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, r.kill = function(l, h) {
    if (h === void 0 && (h = "all"), !l && (!h || h === "all"))
      return this._lazy = this._pt = 0, this.parent ? Ba(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Bn), this;
    if (this.timeline) {
      var c = this.timeline.totalDuration();
      return this.timeline.killTweensOf(l, h, Kr && Kr.vars.overwrite !== !0)._first || Ba(this), this.parent && c !== this.timeline.totalDuration() && ca(this, this._dur * this.timeline._tDur / c, 0, 1), this;
    }
    var g = this._targets, b = l ? Zi(l) : g, x = this._ptLookup, S = this._pt, A, k, y, D, C, U, $;
    if ((!h || h === "all") && dx(g, b))
      return h === "all" && (this._pt = 0), Ba(this);
    for (A = this._op = this._op || [], h !== "all" && (In(h) && (C = {}, _i(h, function(Z) {
      return C[Z] = 1;
    }), h = C), h = Bx(g, h)), $ = g.length; $--; )
      if (~b.indexOf(g[$])) {
        k = x[$], h === "all" ? (A[$] = h, D = k, y = {}) : (y = A[$] = A[$] || {}, D = h);
        for (C in D)
          U = k && k[C], U && ((!("kill" in U.d) || U.d.kill(C) === !0) && xu(this, U, "_pt"), delete k[C]), y !== "all" && (y[C] = 1);
      }
    return this._initted && !this._pt && S && Ba(this), this;
  }, e.to = function(l, h) {
    return new e(l, h, arguments[2]);
  }, e.from = function(l, h) {
    return qa(1, arguments);
  }, e.delayedCall = function(l, h, c, g) {
    return new e(h, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: l,
      onComplete: h,
      onReverseComplete: h,
      onCompleteParams: c,
      onReverseCompleteParams: c,
      callbackScope: g
    });
  }, e.fromTo = function(l, h, c) {
    return qa(2, arguments);
  }, e.set = function(l, h) {
    return h.duration = 0, h.repeatDelay || (h.repeat = 0), new e(l, h);
  }, e.killTweensOf = function(l, h, c) {
    return un.killTweensOf(l, h, c);
  }, e;
}(ja);
Di(wn.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
_i("staggerTo,staggerFrom,staggerFromTo", function(u) {
  wn[u] = function() {
    var e = new ni(), r = ch.call(arguments, 0);
    return r.splice(u === "staggerFromTo" ? 5 : 4, 0, 0), e[u].apply(e, r);
  };
});
var qh = function(e, r, o) {
  return e[r] = o;
}, X_ = function(e, r, o) {
  return e[r](o);
}, Fx = function(e, r, o, l) {
  return e[r](l.fp, o);
}, $x = function(e, r, o) {
  return e.setAttribute(r, o);
}, Wh = function(e, r) {
  return dn(e[r]) ? X_ : Rh(e[r]) && e.setAttribute ? $x : qh;
}, G_ = function(e, r) {
  return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e6) / 1e6, r);
}, Vx = function(e, r) {
  return r.set(r.t, r.p, !!(r.s + r.c * e), r);
}, Z_ = function(e, r) {
  var o = r._pt, l = "";
  if (!e && r.b)
    l = r.b;
  else if (e === 1 && r.e)
    l = r.e;
  else {
    for (; o; )
      l = o.p + (o.m ? o.m(o.s + o.c * e) : Math.round((o.s + o.c * e) * 1e4) / 1e4) + l, o = o._next;
    l += r.c;
  }
  r.set(r.t, r.p, l, r);
}, Yh = function(e, r) {
  for (var o = r._pt; o; )
    o.r(e, o.d), o = o._next;
}, Ux = function(e, r, o, l) {
  for (var h = this._pt, c; h; )
    c = h._next, h.p === l && h.modifier(e, r, o), h = c;
}, qx = function(e) {
  for (var r = this._pt, o, l; r; )
    l = r._next, r.p === e && !r.op || r.op === e ? xu(this, r, "_pt") : r.dep || (o = 1), r = l;
  return !o;
}, Wx = function(e, r, o, l) {
  l.mSet(e, r, l.m.call(l.tween, o, l.mt), l);
}, K_ = function(e) {
  for (var r = e._pt, o, l, h, c; r; ) {
    for (o = r._next, l = h; l && l.pr > r.pr; )
      l = l._next;
    (r._prev = l ? l._prev : c) ? r._prev._next = r : h = r, (r._next = l) ? l._prev = r : c = r, r = o;
  }
  e._pt = h;
}, gi = /* @__PURE__ */ function() {
  function u(r, o, l, h, c, g, b, x, S) {
    this.t = o, this.s = h, this.c = c, this.p = l, this.r = g || G_, this.d = b || this, this.set = x || qh, this.pr = S || 0, this._next = r, r && (r._prev = this);
  }
  var e = u.prototype;
  return e.modifier = function(o, l, h) {
    this.mSet = this.mSet || this.set, this.set = Wx, this.m = o, this.mt = h, this.tween = l;
  }, u;
}();
_i(Fh + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(u) {
  return Nh[u] = 1;
});
Ri.TweenMax = Ri.TweenLite = wn;
Ri.TimelineLite = Ri.TimelineMax = ni;
un = new ni({
  sortChildren: !1,
  defaults: la,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
ki.stringFilter = F_;
var As = [], au = {}, Yx = [], wd = 0, Hx = 0, Fl = function(e) {
  return (au[e] || Yx).map(function(r) {
    return r();
  });
}, vh = function() {
  var e = Date.now(), r = [];
  e - wd > 2 && (Fl("matchMediaInit"), As.forEach(function(o) {
    var l = o.queries, h = o.conditions, c, g, b, x;
    for (g in l)
      c = ur.matchMedia(l[g]).matches, c && (b = 1), c !== h[g] && (h[g] = c, x = 1);
    x && (o.revert(), b && r.push(o));
  }), Fl("matchMediaRevert"), r.forEach(function(o) {
    return o.onMatch(o, function(l) {
      return o.add(null, l);
    });
  }), wd = e, Fl("matchMedia"));
}, J_ = /* @__PURE__ */ function() {
  function u(r, o) {
    this.selector = o && dh(o), this.data = [], this._r = [], this.isReverted = !1, this.id = Hx++, r && this.add(r);
  }
  var e = u.prototype;
  return e.add = function(o, l, h) {
    dn(o) && (h = l, l = o, o = dn);
    var c = this, g = function() {
      var x = en, S = c.selector, A;
      return x && x !== c && x.data.push(c), h && (c.selector = dh(h)), en = c, A = l.apply(c, arguments), dn(A) && c._r.push(A), en = x, c.selector = S, c.isReverted = !1, A;
    };
    return c.last = g, o === dn ? g(c, function(b) {
      return c.add(null, b);
    }) : o ? c[o] = g : g;
  }, e.ignore = function(o) {
    var l = en;
    en = null, o(this), en = l;
  }, e.getTweens = function() {
    var o = [];
    return this.data.forEach(function(l) {
      return l instanceof u ? o.push.apply(o, l.getTweens()) : l instanceof wn && !(l.parent && l.parent.data === "nested") && o.push(l);
    }), o;
  }, e.clear = function() {
    this._r.length = this.data.length = 0;
  }, e.kill = function(o, l) {
    var h = this;
    if (o ? function() {
      for (var g = h.getTweens(), b = h.data.length, x; b--; )
        x = h.data[b], x.data === "isFlip" && (x.revert(), x.getChildren(!0, !0, !1).forEach(function(S) {
          return g.splice(g.indexOf(S), 1);
        }));
      for (g.map(function(S) {
        return {
          g: S._dur || S._delay || S._sat && !S._sat.vars.immediateRender ? S.globalTime(0) : -1 / 0,
          t: S
        };
      }).sort(function(S, A) {
        return A.g - S.g || -1 / 0;
      }).forEach(function(S) {
        return S.t.revert(o);
      }), b = h.data.length; b--; )
        x = h.data[b], x instanceof ni ? x.data !== "nested" && (x.scrollTrigger && x.scrollTrigger.revert(), x.kill()) : !(x instanceof wn) && x.revert && x.revert(o);
      h._r.forEach(function(S) {
        return S(o, h);
      }), h.isReverted = !0;
    }() : this.data.forEach(function(g) {
      return g.kill && g.kill();
    }), this.clear(), l)
      for (var c = As.length; c--; )
        As[c].id === this.id && As.splice(c, 1);
  }, e.revert = function(o) {
    this.kill(o || {});
  }, u;
}(), Xx = /* @__PURE__ */ function() {
  function u(r) {
    this.contexts = [], this.scope = r, en && en.data.push(this);
  }
  var e = u.prototype;
  return e.add = function(o, l, h) {
    _r(o) || (o = {
      matches: o
    });
    var c = new J_(0, h || this.scope), g = c.conditions = {}, b, x, S;
    en && !c.selector && (c.selector = en.selector), this.contexts.push(c), l = c.add("onMatch", l), c.queries = o;
    for (x in o)
      x === "all" ? S = 1 : (b = ur.matchMedia(o[x]), b && (As.indexOf(c) < 0 && As.push(c), (g[x] = b.matches) && (S = 1), b.addListener ? b.addListener(vh) : b.addEventListener("change", vh)));
    return S && l(c, function(A) {
      return c.add(null, A);
    }), this;
  }, e.revert = function(o) {
    this.kill(o || {});
  }, e.kill = function(o) {
    this.contexts.forEach(function(l) {
      return l.kill(o, !0);
    });
  }, u;
}(), vu = {
  registerPlugin: function() {
    for (var e = arguments.length, r = new Array(e), o = 0; o < e; o++)
      r[o] = arguments[o];
    r.forEach(function(l) {
      return z_(l);
    });
  },
  timeline: function(e) {
    return new ni(e);
  },
  getTweensOf: function(e, r) {
    return un.getTweensOf(e, r);
  },
  getProperty: function(e, r, o, l) {
    In(e) && (e = Zi(e)[0]);
    var h = Ss(e || {}).get, c = o ? S_ : b_;
    return o === "native" && (o = ""), e && (r ? c((Mi[r] && Mi[r].get || h)(e, r, o, l)) : function(g, b, x) {
      return c((Mi[g] && Mi[g].get || h)(e, g, b, x));
    });
  },
  quickSetter: function(e, r, o) {
    if (e = Zi(e), e.length > 1) {
      var l = e.map(function(S) {
        return mi.quickSetter(S, r, o);
      }), h = l.length;
      return function(S) {
        for (var A = h; A--; )
          l[A](S);
      };
    }
    e = e[0] || {};
    var c = Mi[r], g = Ss(e), b = g.harness && (g.harness.aliases || {})[r] || r, x = c ? function(S) {
      var A = new c();
      js._pt = 0, A.init(e, o ? S + o : S, js, 0, [e]), A.render(1, A), js._pt && Yh(1, js);
    } : g.set(e, b);
    return c ? x : function(S) {
      return x(e, b, o ? S + o : S, g, 1);
    };
  },
  quickTo: function(e, r, o) {
    var l, h = mi.to(e, Di((l = {}, l[r] = "+=0.1", l.paused = !0, l.stagger = 0, l), o || {})), c = function(b, x, S) {
      return h.resetTo(r, b, x, S);
    };
    return c.tween = h, c;
  },
  isTweening: function(e) {
    return un.getTweensOf(e, !0).length > 0;
  },
  defaults: function(e) {
    return e && e.ease && (e.ease = Ts(e.ease, la.ease)), gd(la, e || {});
  },
  config: function(e) {
    return gd(ki, e || {});
  },
  registerEffect: function(e) {
    var r = e.name, o = e.effect, l = e.plugins, h = e.defaults, c = e.extendTimeline;
    (l || "").split(",").forEach(function(g) {
      return g && !Mi[g] && !Ri[g] && Ga(r + " effect requires " + g + " plugin.");
    }), Dl[r] = function(g, b, x) {
      return o(Zi(g), Di(b || {}, h), x);
    }, c && (ni.prototype[r] = function(g, b, x) {
      return this.add(Dl[r](g, _r(b) ? b : (x = b) && {}, this), x);
    });
  },
  registerEase: function(e, r) {
    ke[e] = Ts(r);
  },
  parseEase: function(e, r) {
    return arguments.length ? Ts(e, r) : ke;
  },
  getById: function(e) {
    return un.getById(e);
  },
  exportRoot: function(e, r) {
    e === void 0 && (e = {});
    var o = new ni(e), l, h;
    for (o.smoothChildTiming = di(e.smoothChildTiming), un.remove(o), o._dp = 0, o._time = o._tTime = un._time, l = un._first; l; )
      h = l._next, (r || !(!l._dur && l instanceof wn && l.vars.onComplete === l._targets[0])) && hr(o, l, l._start - l._delay), l = h;
    return hr(un, o, 0), o;
  },
  context: function(e, r) {
    return e ? new J_(e, r) : en;
  },
  matchMedia: function(e) {
    return new Xx(e);
  },
  matchMediaRefresh: function() {
    return As.forEach(function(e) {
      var r = e.conditions, o, l;
      for (l in r)
        r[l] && (r[l] = !1, o = 1);
      o && e.revert();
    }) || vh();
  },
  addEventListener: function(e, r) {
    var o = au[e] || (au[e] = []);
    ~o.indexOf(r) || o.push(r);
  },
  removeEventListener: function(e, r) {
    var o = au[e], l = o && o.indexOf(r);
    l >= 0 && o.splice(l, 1);
  },
  utils: {
    wrap: Tx,
    wrapYoyo: Ax,
    distribute: I_,
    random: k_,
    snap: E_,
    normalize: Cx,
    getUnit: Gn,
    clamp: wx,
    splitColor: B_,
    toArray: Zi,
    selector: dh,
    mapRange: R_,
    pipe: bx,
    unitize: Sx,
    interpolate: Px,
    shuffle: M_
  },
  install: p_,
  effects: Dl,
  ticker: Ii,
  updateRoot: ni.updateRoot,
  plugins: Mi,
  globalTimeline: un,
  core: {
    PropTween: gi,
    globals: m_,
    Tween: wn,
    Timeline: ni,
    Animation: ja,
    getCache: Ss,
    _removeLinkedListItem: xu,
    reverting: function() {
      return Bn;
    },
    context: function(e) {
      return e && en && (en.data.push(e), e._ctx = en), en;
    },
    suppressOverwrites: function(e) {
      return Lh = e;
    }
  }
};
_i("to,from,fromTo,delayedCall,set,killTweensOf", function(u) {
  return vu[u] = wn[u];
});
Ii.add(ni.updateRoot);
js = vu.to({}, {
  duration: 0
});
var Gx = function(e, r) {
  for (var o = e._pt; o && o.p !== r && o.op !== r && o.fp !== r; )
    o = o._next;
  return o;
}, Zx = function(e, r) {
  var o = e._targets, l, h, c;
  for (l in r)
    for (h = o.length; h--; )
      c = e._ptLookup[h][l], c && (c = c.d) && (c._pt && (c = Gx(c, l)), c && c.modifier && c.modifier(r[l], e, o[h], l));
}, $l = function(e, r) {
  return {
    name: e,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(l, h, c) {
      c._onInit = function(g) {
        var b, x;
        if (In(h) && (b = {}, _i(h, function(S) {
          return b[S] = 1;
        }), h = b), r) {
          b = {};
          for (x in h)
            b[x] = r(h[x]);
          h = b;
        }
        Zx(g, h);
      };
    }
  };
}, mi = vu.registerPlugin({
  name: "attr",
  init: function(e, r, o, l, h) {
    var c, g, b;
    this.tween = o;
    for (c in r)
      b = e.getAttribute(c) || "", g = this.add(e, "setAttribute", (b || 0) + "", r[c], l, h, 0, 0, c), g.op = c, g.b = b, this._props.push(c);
  },
  render: function(e, r) {
    for (var o = r._pt; o; )
      Bn ? o.set(o.t, o.p, o.b, o) : o.r(e, o.d), o = o._next;
  }
}, {
  name: "endArray",
  init: function(e, r) {
    for (var o = r.length; o--; )
      this.add(e, o, e[o] || 0, r[o], 0, 0, 0, 0, 0, 1);
  }
}, $l("roundProps", _h), $l("modifiers"), $l("snap", E_)) || vu;
wn.version = ni.version = mi.version = "3.12.7";
v_ = 1;
Dh() && da();
ke.Power0;
ke.Power1;
ke.Power2;
ke.Power3;
ke.Power4;
ke.Linear;
ke.Quad;
ke.Cubic;
ke.Quart;
ke.Quint;
ke.Strong;
ke.Elastic;
ke.Back;
ke.SteppedEase;
ke.Bounce;
ke.Sine;
ke.Expo;
ke.Circ;
/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var xd, Jr, ia, Hh, ws, bd, Xh, Kx = function() {
  return typeof window < "u";
}, Er = {}, ms = 180 / Math.PI, ra = Math.PI / 180, Ys = Math.atan2, Sd = 1e8, Gh = /([A-Z])/g, Jx = /(left|right|width|margin|padding|x)/i, jx = /[\s,\(]\S/, cr = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, ph = function(e, r) {
  return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r);
}, Qx = function(e, r) {
  return r.set(r.t, r.p, e === 1 ? r.e : Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r);
}, tb = function(e, r) {
  return r.set(r.t, r.p, e ? Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u : r.b, r);
}, eb = function(e, r) {
  var o = r.s + r.c * e;
  r.set(r.t, r.p, ~~(o + (o < 0 ? -0.5 : 0.5)) + r.u, r);
}, j_ = function(e, r) {
  return r.set(r.t, r.p, e ? r.e : r.b, r);
}, Q_ = function(e, r) {
  return r.set(r.t, r.p, e !== 1 ? r.b : r.e, r);
}, nb = function(e, r, o) {
  return e.style[r] = o;
}, ib = function(e, r, o) {
  return e.style.setProperty(r, o);
}, rb = function(e, r, o) {
  return e._gsap[r] = o;
}, sb = function(e, r, o) {
  return e._gsap.scaleX = e._gsap.scaleY = o;
}, ab = function(e, r, o, l, h) {
  var c = e._gsap;
  c.scaleX = c.scaleY = o, c.renderTransform(h, c);
}, ob = function(e, r, o, l, h) {
  var c = e._gsap;
  c[r] = o, c.renderTransform(h, c);
}, ln = "transform", vi = ln + "Origin", ub = function u(e, r) {
  var o = this, l = this.target, h = l.style, c = l._gsap;
  if (e in Er && h) {
    if (this.tfm = this.tfm || {}, e !== "transform")
      e = cr[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function(g) {
        return o.tfm[g] = Ar(l, g);
      }) : this.tfm[e] = c.x ? c[e] : Ar(l, e), e === vi && (this.tfm.zOrigin = c.zOrigin);
    else
      return cr.transform.split(",").forEach(function(g) {
        return u.call(o, g, r);
      });
    if (this.props.indexOf(ln) >= 0)
      return;
    c.svg && (this.svgo = l.getAttribute("data-svg-origin"), this.props.push(vi, r, "")), e = ln;
  }
  (h || r) && this.props.push(e, r, h[e]);
}, tg = function(e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, lb = function() {
  var e = this.props, r = this.target, o = r.style, l = r._gsap, h, c;
  for (h = 0; h < e.length; h += 3)
    e[h + 1] ? e[h + 1] === 2 ? r[e[h]](e[h + 2]) : r[e[h]] = e[h + 2] : e[h + 2] ? o[e[h]] = e[h + 2] : o.removeProperty(e[h].substr(0, 2) === "--" ? e[h] : e[h].replace(Gh, "-$1").toLowerCase());
  if (this.tfm) {
    for (c in this.tfm)
      l[c] = this.tfm[c];
    l.svg && (l.renderTransform(), r.setAttribute("data-svg-origin", this.svgo || "")), h = Xh(), (!h || !h.isStart) && !o[ln] && (tg(o), l.zOrigin && o[vi] && (o[vi] += " " + l.zOrigin + "px", l.zOrigin = 0, l.renderTransform()), l.uncache = 1);
  }
}, eg = function(e, r) {
  var o = {
    target: e,
    props: [],
    revert: lb,
    save: ub
  };
  return e._gsap || mi.core.getCache(e), r && e.style && e.nodeType && r.split(",").forEach(function(l) {
    return o.save(l);
  }), o;
}, ng, mh = function(e, r) {
  var o = Jr.createElementNS ? Jr.createElementNS((r || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Jr.createElement(e);
  return o && o.style ? o : Jr.createElement(e);
}, dr = function u(e, r, o) {
  var l = getComputedStyle(e);
  return l[r] || l.getPropertyValue(r.replace(Gh, "-$1").toLowerCase()) || l.getPropertyValue(r) || !o && u(e, _a(r) || r, 1) || "";
}, Cd = "O,Moz,ms,Ms,Webkit".split(","), _a = function(e, r, o) {
  var l = r || ws, h = l.style, c = 5;
  if (e in h && !o)
    return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); c-- && !(Cd[c] + e in h); )
    ;
  return c < 0 ? null : (c === 3 ? "ms" : c >= 0 ? Cd[c] : "") + e;
}, yh = function() {
  Kx() && window.document && (xd = window, Jr = xd.document, ia = Jr.documentElement, ws = mh("div") || {
    style: {}
  }, mh("div"), ln = _a(ln), vi = ln + "Origin", ws.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", ng = !!_a("perspective"), Xh = mi.core.reverting, Hh = 1);
}, Td = function(e) {
  var r = e.ownerSVGElement, o = mh("svg", r && r.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), l = e.cloneNode(!0), h;
  l.style.display = "block", o.appendChild(l), ia.appendChild(o);
  try {
    h = l.getBBox();
  } catch {
  }
  return o.removeChild(l), ia.removeChild(o), h;
}, Ad = function(e, r) {
  for (var o = r.length; o--; )
    if (e.hasAttribute(r[o]))
      return e.getAttribute(r[o]);
}, ig = function(e) {
  var r, o;
  try {
    r = e.getBBox();
  } catch {
    r = Td(e), o = 1;
  }
  return r && (r.width || r.height) || o || (r = Td(e)), r && !r.width && !r.x && !r.y ? {
    x: +Ad(e, ["x", "cx", "x1"]) || 0,
    y: +Ad(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : r;
}, rg = function(e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && ig(e));
}, Ps = function(e, r) {
  if (r) {
    var o = e.style, l;
    r in Er && r !== vi && (r = ln), o.removeProperty ? (l = r.substr(0, 2), (l === "ms" || r.substr(0, 6) === "webkit") && (r = "-" + r), o.removeProperty(l === "--" ? r : r.replace(Gh, "-$1").toLowerCase())) : o.removeAttribute(r);
  }
}, jr = function(e, r, o, l, h, c) {
  var g = new gi(e._pt, r, o, 0, 1, c ? Q_ : j_);
  return e._pt = g, g.b = l, g.e = h, e._props.push(o), g;
}, Pd = {
  deg: 1,
  rad: 1,
  turn: 1
}, hb = {
  grid: 1,
  flex: 1
}, ns = function u(e, r, o, l) {
  var h = parseFloat(o) || 0, c = (o + "").trim().substr((h + "").length) || "px", g = ws.style, b = Jx.test(r), x = e.tagName.toLowerCase() === "svg", S = (x ? "client" : "offset") + (b ? "Width" : "Height"), A = 100, k = l === "px", y = l === "%", D, C, U, $;
  if (l === c || !h || Pd[l] || Pd[c])
    return h;
  if (c !== "px" && !k && (h = u(e, r, o, "px")), $ = e.getCTM && rg(e), (y || c === "%") && (Er[r] || ~r.indexOf("adius")))
    return D = $ ? e.getBBox()[b ? "width" : "height"] : e[S], pn(y ? h / D * A : h / 100 * D);
  if (g[b ? "width" : "height"] = A + (k ? c : l), C = l !== "rem" && ~r.indexOf("adius") || l === "em" && e.appendChild && !x ? e : e.parentNode, $ && (C = (e.ownerSVGElement || {}).parentNode), (!C || C === Jr || !C.appendChild) && (C = Jr.body), U = C._gsap, U && y && U.width && b && U.time === Ii.time && !U.uncache)
    return pn(h / U.width * A);
  if (y && (r === "height" || r === "width")) {
    var Z = e.style[r];
    e.style[r] = A + l, D = e[S], Z ? e.style[r] = Z : Ps(e, r);
  } else
    (y || c === "%") && !hb[dr(C, "display")] && (g.position = dr(e, "position")), C === e && (g.position = "static"), C.appendChild(ws), D = ws[S], C.removeChild(ws), g.position = "absolute";
  return b && y && (U = Ss(C), U.time = Ii.time, U.width = C[S]), pn(k ? D * h / A : D && h ? A / D * h : 0);
}, Ar = function(e, r, o, l) {
  var h;
  return Hh || yh(), r in cr && r !== "transform" && (r = cr[r], ~r.indexOf(",") && (r = r.split(",")[0])), Er[r] && r !== "transform" ? (h = to(e, l), h = r !== "transformOrigin" ? h[r] : h.svg ? h.origin : mu(dr(e, vi)) + " " + h.zOrigin + "px") : (h = e.style[r], (!h || h === "auto" || l || ~(h + "").indexOf("calc(")) && (h = pu[r] && pu[r](e, r, o) || dr(e, r) || w_(e, r) || (r === "opacity" ? 1 : 0))), o && !~(h + "").trim().indexOf(" ") ? ns(e, r, h, o) + o : h;
}, fb = function(e, r, o, l) {
  if (!o || o === "none") {
    var h = _a(r, e, 1), c = h && dr(e, h, 1);
    c && c !== o ? (r = h, o = c) : r === "borderColor" && (o = dr(e, "borderTopColor"));
  }
  var g = new gi(this._pt, e.style, r, 0, 1, Z_), b = 0, x = 0, S, A, k, y, D, C, U, $, Z, K, ot, lt;
  if (g.b = o, g.e = l, o += "", l += "", l === "auto" && (C = e.style[r], e.style[r] = l, l = dr(e, r) || l, C ? e.style[r] = C : Ps(e, r)), S = [o, l], F_(S), o = S[0], l = S[1], k = o.match(Js) || [], lt = l.match(Js) || [], lt.length) {
    for (; A = Js.exec(l); )
      U = A[0], Z = l.substring(b, A.index), D ? D = (D + 1) % 5 : (Z.substr(-5) === "rgba(" || Z.substr(-5) === "hsla(") && (D = 1), U !== (C = k[x++] || "") && (y = parseFloat(C) || 0, ot = C.substr((y + "").length), U.charAt(1) === "=" && (U = na(y, U) + ot), $ = parseFloat(U), K = U.substr(($ + "").length), b = Js.lastIndex - K.length, K || (K = K || ki.units[r] || ot, b === l.length && (l += K, g.e += K)), ot !== K && (y = ns(e, r, C, K) || 0), g._pt = {
        _next: g._pt,
        p: Z || x === 1 ? Z : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: y,
        c: $ - y,
        m: D && D < 4 || r === "zIndex" ? Math.round : 0
      });
    g.c = b < l.length ? l.substring(b, l.length) : "";
  } else
    g.r = r === "display" && l === "none" ? Q_ : j_;
  return __.test(l) && (g.e = 0), this._pt = g, g;
}, Od = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, cb = function(e) {
  var r = e.split(" "), o = r[0], l = r[1] || "50%";
  return (o === "top" || o === "bottom" || l === "left" || l === "right") && (e = o, o = l, l = e), r[0] = Od[o] || o, r[1] = Od[l] || l, r.join(" ");
}, db = function(e, r) {
  if (r.tween && r.tween._time === r.tween._dur) {
    var o = r.t, l = o.style, h = r.u, c = o._gsap, g, b, x;
    if (h === "all" || h === !0)
      l.cssText = "", b = 1;
    else
      for (h = h.split(","), x = h.length; --x > -1; )
        g = h[x], Er[g] && (b = 1, g = g === "transformOrigin" ? vi : ln), Ps(o, g);
    b && (Ps(o, ln), c && (c.svg && o.removeAttribute("transform"), l.scale = l.rotate = l.translate = "none", to(o, 1), c.uncache = 1, tg(l)));
  }
}, pu = {
  clearProps: function(e, r, o, l, h) {
    if (h.data !== "isFromStart") {
      var c = e._pt = new gi(e._pt, r, o, 0, 0, db);
      return c.u = l, c.pr = -10, c.tween = h, e._props.push(o), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, Qa = [1, 0, 0, 1, 0, 0], sg = {}, ag = function(e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, Md = function(e) {
  var r = dr(e, ln);
  return ag(r) ? Qa : r.substr(7).match(d_).map(pn);
}, Zh = function(e, r) {
  var o = e._gsap || Ss(e), l = e.style, h = Md(e), c, g, b, x;
  return o.svg && e.getAttribute("transform") ? (b = e.transform.baseVal.consolidate().matrix, h = [b.a, b.b, b.c, b.d, b.e, b.f], h.join(",") === "1,0,0,1,0,0" ? Qa : h) : (h === Qa && !e.offsetParent && e !== ia && !o.svg && (b = l.display, l.display = "block", c = e.parentNode, (!c || !e.offsetParent && !e.getBoundingClientRect().width) && (x = 1, g = e.nextElementSibling, ia.appendChild(e)), h = Md(e), b ? l.display = b : Ps(e, "display"), x && (g ? c.insertBefore(e, g) : c ? c.appendChild(e) : ia.removeChild(e))), r && h.length > 6 ? [h[0], h[1], h[4], h[5], h[12], h[13]] : h);
}, wh = function(e, r, o, l, h, c) {
  var g = e._gsap, b = h || Zh(e, !0), x = g.xOrigin || 0, S = g.yOrigin || 0, A = g.xOffset || 0, k = g.yOffset || 0, y = b[0], D = b[1], C = b[2], U = b[3], $ = b[4], Z = b[5], K = r.split(" "), ot = parseFloat(K[0]) || 0, lt = parseFloat(K[1]) || 0, ct, ht, _t, at;
  o ? b !== Qa && (ht = y * U - D * C) && (_t = ot * (U / ht) + lt * (-C / ht) + (C * Z - U * $) / ht, at = ot * (-D / ht) + lt * (y / ht) - (y * Z - D * $) / ht, ot = _t, lt = at) : (ct = ig(e), ot = ct.x + (~K[0].indexOf("%") ? ot / 100 * ct.width : ot), lt = ct.y + (~(K[1] || K[0]).indexOf("%") ? lt / 100 * ct.height : lt)), l || l !== !1 && g.smooth ? ($ = ot - x, Z = lt - S, g.xOffset = A + ($ * y + Z * C) - $, g.yOffset = k + ($ * D + Z * U) - Z) : g.xOffset = g.yOffset = 0, g.xOrigin = ot, g.yOrigin = lt, g.smooth = !!l, g.origin = r, g.originIsAbsolute = !!o, e.style[vi] = "0px 0px", c && (jr(c, g, "xOrigin", x, ot), jr(c, g, "yOrigin", S, lt), jr(c, g, "xOffset", A, g.xOffset), jr(c, g, "yOffset", k, g.yOffset)), e.setAttribute("data-svg-origin", ot + " " + lt);
}, to = function(e, r) {
  var o = e._gsap || new q_(e);
  if ("x" in o && !r && !o.uncache)
    return o;
  var l = e.style, h = o.scaleX < 0, c = "px", g = "deg", b = getComputedStyle(e), x = dr(e, vi) || "0", S, A, k, y, D, C, U, $, Z, K, ot, lt, ct, ht, _t, at, Pt, Mt, Et, kt, bt, Dt, vt, $t, Yt, Bt, ae, he, Ie, rn, ye, oe;
  return S = A = k = C = U = $ = Z = K = ot = 0, y = D = 1, o.svg = !!(e.getCTM && rg(e)), b.translate && ((b.translate !== "none" || b.scale !== "none" || b.rotate !== "none") && (l[ln] = (b.translate !== "none" ? "translate3d(" + (b.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (b.rotate !== "none" ? "rotate(" + b.rotate + ") " : "") + (b.scale !== "none" ? "scale(" + b.scale.split(" ").join(",") + ") " : "") + (b[ln] !== "none" ? b[ln] : "")), l.scale = l.rotate = l.translate = "none"), ht = Zh(e, o.svg), o.svg && (o.uncache ? (Yt = e.getBBox(), x = o.xOrigin - Yt.x + "px " + (o.yOrigin - Yt.y) + "px", $t = "") : $t = !r && e.getAttribute("data-svg-origin"), wh(e, $t || x, !!$t || o.originIsAbsolute, o.smooth !== !1, ht)), lt = o.xOrigin || 0, ct = o.yOrigin || 0, ht !== Qa && (Mt = ht[0], Et = ht[1], kt = ht[2], bt = ht[3], S = Dt = ht[4], A = vt = ht[5], ht.length === 6 ? (y = Math.sqrt(Mt * Mt + Et * Et), D = Math.sqrt(bt * bt + kt * kt), C = Mt || Et ? Ys(Et, Mt) * ms : 0, Z = kt || bt ? Ys(kt, bt) * ms + C : 0, Z && (D *= Math.abs(Math.cos(Z * ra))), o.svg && (S -= lt - (lt * Mt + ct * kt), A -= ct - (lt * Et + ct * bt))) : (oe = ht[6], rn = ht[7], ae = ht[8], he = ht[9], Ie = ht[10], ye = ht[11], S = ht[12], A = ht[13], k = ht[14], _t = Ys(oe, Ie), U = _t * ms, _t && (at = Math.cos(-_t), Pt = Math.sin(-_t), $t = Dt * at + ae * Pt, Yt = vt * at + he * Pt, Bt = oe * at + Ie * Pt, ae = Dt * -Pt + ae * at, he = vt * -Pt + he * at, Ie = oe * -Pt + Ie * at, ye = rn * -Pt + ye * at, Dt = $t, vt = Yt, oe = Bt), _t = Ys(-kt, Ie), $ = _t * ms, _t && (at = Math.cos(-_t), Pt = Math.sin(-_t), $t = Mt * at - ae * Pt, Yt = Et * at - he * Pt, Bt = kt * at - Ie * Pt, ye = bt * Pt + ye * at, Mt = $t, Et = Yt, kt = Bt), _t = Ys(Et, Mt), C = _t * ms, _t && (at = Math.cos(_t), Pt = Math.sin(_t), $t = Mt * at + Et * Pt, Yt = Dt * at + vt * Pt, Et = Et * at - Mt * Pt, vt = vt * at - Dt * Pt, Mt = $t, Dt = Yt), U && Math.abs(U) + Math.abs(C) > 359.9 && (U = C = 0, $ = 180 - $), y = pn(Math.sqrt(Mt * Mt + Et * Et + kt * kt)), D = pn(Math.sqrt(vt * vt + oe * oe)), _t = Ys(Dt, vt), Z = Math.abs(_t) > 2e-4 ? _t * ms : 0, ot = ye ? 1 / (ye < 0 ? -ye : ye) : 0), o.svg && ($t = e.getAttribute("transform"), o.forceCSS = e.setAttribute("transform", "") || !ag(dr(e, ln)), $t && e.setAttribute("transform", $t))), Math.abs(Z) > 90 && Math.abs(Z) < 270 && (h ? (y *= -1, Z += C <= 0 ? 180 : -180, C += C <= 0 ? 180 : -180) : (D *= -1, Z += Z <= 0 ? 180 : -180)), r = r || o.uncache, o.x = S - ((o.xPercent = S && (!r && o.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-S) ? -50 : 0))) ? e.offsetWidth * o.xPercent / 100 : 0) + c, o.y = A - ((o.yPercent = A && (!r && o.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-A) ? -50 : 0))) ? e.offsetHeight * o.yPercent / 100 : 0) + c, o.z = k + c, o.scaleX = pn(y), o.scaleY = pn(D), o.rotation = pn(C) + g, o.rotationX = pn(U) + g, o.rotationY = pn($) + g, o.skewX = Z + g, o.skewY = K + g, o.transformPerspective = ot + c, (o.zOrigin = parseFloat(x.split(" ")[2]) || !r && o.zOrigin || 0) && (l[vi] = mu(x)), o.xOffset = o.yOffset = 0, o.force3D = ki.force3D, o.renderTransform = o.svg ? gb : ng ? og : _b, o.uncache = 0, o;
}, mu = function(e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, Vl = function(e, r, o) {
  var l = Gn(r);
  return pn(parseFloat(r) + parseFloat(ns(e, "x", o + "px", l))) + l;
}, _b = function(e, r) {
  r.z = "0px", r.rotationY = r.rotationX = "0deg", r.force3D = 0, og(e, r);
}, gs = "0deg", La = "0px", vs = ") ", og = function(e, r) {
  var o = r || this, l = o.xPercent, h = o.yPercent, c = o.x, g = o.y, b = o.z, x = o.rotation, S = o.rotationY, A = o.rotationX, k = o.skewX, y = o.skewY, D = o.scaleX, C = o.scaleY, U = o.transformPerspective, $ = o.force3D, Z = o.target, K = o.zOrigin, ot = "", lt = $ === "auto" && e && e !== 1 || $ === !0;
  if (K && (A !== gs || S !== gs)) {
    var ct = parseFloat(S) * ra, ht = Math.sin(ct), _t = Math.cos(ct), at;
    ct = parseFloat(A) * ra, at = Math.cos(ct), c = Vl(Z, c, ht * at * -K), g = Vl(Z, g, -Math.sin(ct) * -K), b = Vl(Z, b, _t * at * -K + K);
  }
  U !== La && (ot += "perspective(" + U + vs), (l || h) && (ot += "translate(" + l + "%, " + h + "%) "), (lt || c !== La || g !== La || b !== La) && (ot += b !== La || lt ? "translate3d(" + c + ", " + g + ", " + b + ") " : "translate(" + c + ", " + g + vs), x !== gs && (ot += "rotate(" + x + vs), S !== gs && (ot += "rotateY(" + S + vs), A !== gs && (ot += "rotateX(" + A + vs), (k !== gs || y !== gs) && (ot += "skew(" + k + ", " + y + vs), (D !== 1 || C !== 1) && (ot += "scale(" + D + ", " + C + vs), Z.style[ln] = ot || "translate(0, 0)";
}, gb = function(e, r) {
  var o = r || this, l = o.xPercent, h = o.yPercent, c = o.x, g = o.y, b = o.rotation, x = o.skewX, S = o.skewY, A = o.scaleX, k = o.scaleY, y = o.target, D = o.xOrigin, C = o.yOrigin, U = o.xOffset, $ = o.yOffset, Z = o.forceCSS, K = parseFloat(c), ot = parseFloat(g), lt, ct, ht, _t, at;
  b = parseFloat(b), x = parseFloat(x), S = parseFloat(S), S && (S = parseFloat(S), x += S, b += S), b || x ? (b *= ra, x *= ra, lt = Math.cos(b) * A, ct = Math.sin(b) * A, ht = Math.sin(b - x) * -k, _t = Math.cos(b - x) * k, x && (S *= ra, at = Math.tan(x - S), at = Math.sqrt(1 + at * at), ht *= at, _t *= at, S && (at = Math.tan(S), at = Math.sqrt(1 + at * at), lt *= at, ct *= at)), lt = pn(lt), ct = pn(ct), ht = pn(ht), _t = pn(_t)) : (lt = A, _t = k, ct = ht = 0), (K && !~(c + "").indexOf("px") || ot && !~(g + "").indexOf("px")) && (K = ns(y, "x", c, "px"), ot = ns(y, "y", g, "px")), (D || C || U || $) && (K = pn(K + D - (D * lt + C * ht) + U), ot = pn(ot + C - (D * ct + C * _t) + $)), (l || h) && (at = y.getBBox(), K = pn(K + l / 100 * at.width), ot = pn(ot + h / 100 * at.height)), at = "matrix(" + lt + "," + ct + "," + ht + "," + _t + "," + K + "," + ot + ")", y.setAttribute("transform", at), Z && (y.style[ln] = at);
}, vb = function(e, r, o, l, h) {
  var c = 360, g = In(h), b = parseFloat(h) * (g && ~h.indexOf("rad") ? ms : 1), x = b - l, S = l + x + "deg", A, k;
  return g && (A = h.split("_")[1], A === "short" && (x %= c, x !== x % (c / 2) && (x += x < 0 ? c : -c)), A === "cw" && x < 0 ? x = (x + c * Sd) % c - ~~(x / c) * c : A === "ccw" && x > 0 && (x = (x - c * Sd) % c - ~~(x / c) * c)), e._pt = k = new gi(e._pt, r, o, l, x, Qx), k.e = S, k.u = "deg", e._props.push(o), k;
}, Id = function(e, r) {
  for (var o in r)
    e[o] = r[o];
  return e;
}, pb = function(e, r, o) {
  var l = Id({}, o._gsap), h = "perspective,force3D,transformOrigin,svgOrigin", c = o.style, g, b, x, S, A, k, y, D;
  l.svg ? (x = o.getAttribute("transform"), o.setAttribute("transform", ""), c[ln] = r, g = to(o, 1), Ps(o, ln), o.setAttribute("transform", x)) : (x = getComputedStyle(o)[ln], c[ln] = r, g = to(o, 1), c[ln] = x);
  for (b in Er)
    x = l[b], S = g[b], x !== S && h.indexOf(b) < 0 && (y = Gn(x), D = Gn(S), A = y !== D ? ns(o, b, x, D) : parseFloat(x), k = parseFloat(S), e._pt = new gi(e._pt, g, b, A, k - A, ph), e._pt.u = D || 0, e._props.push(b));
  Id(g, l);
};
_i("padding,margin,Width,Radius", function(u, e) {
  var r = "Top", o = "Right", l = "Bottom", h = "Left", c = (e < 3 ? [r, o, l, h] : [r + h, r + o, l + o, l + h]).map(function(g) {
    return e < 2 ? u + g : "border" + g + u;
  });
  pu[e > 1 ? "border" + u : u] = function(g, b, x, S, A) {
    var k, y;
    if (arguments.length < 4)
      return k = c.map(function(D) {
        return Ar(g, D, x);
      }), y = k.join(" "), y.split(k[0]).length === 5 ? k[0] : y;
    k = (S + "").split(" "), y = {}, c.forEach(function(D, C) {
      return y[D] = k[C] = k[C] || k[(C - 1) / 2 | 0];
    }), g.init(b, y, A);
  };
});
var ug = {
  name: "css",
  register: yh,
  targetTest: function(e) {
    return e.style && e.nodeType;
  },
  init: function(e, r, o, l, h) {
    var c = this._props, g = e.style, b = o.vars.startAt, x, S, A, k, y, D, C, U, $, Z, K, ot, lt, ct, ht, _t;
    Hh || yh(), this.styles = this.styles || eg(e), _t = this.styles.props, this.tween = o;
    for (C in r)
      if (C !== "autoRound" && (S = r[C], !(Mi[C] && W_(C, r, o, l, e, h)))) {
        if (y = typeof S, D = pu[C], y === "function" && (S = S.call(o, l, e, h), y = typeof S), y === "string" && ~S.indexOf("random(") && (S = Ka(S)), D)
          D(this, e, C, S, o) && (ht = 1);
        else if (C.substr(0, 2) === "--")
          x = (getComputedStyle(e).getPropertyValue(C) + "").trim(), S += "", ts.lastIndex = 0, ts.test(x) || (U = Gn(x), $ = Gn(S)), $ ? U !== $ && (x = ns(e, C, x, $) + $) : U && (S += U), this.add(g, "setProperty", x, S, l, h, 0, 0, C), c.push(C), _t.push(C, 0, g[C]);
        else if (y !== "undefined") {
          if (b && C in b ? (x = typeof b[C] == "function" ? b[C].call(o, l, e, h) : b[C], In(x) && ~x.indexOf("random(") && (x = Ka(x)), Gn(x + "") || x === "auto" || (x += ki.units[C] || Gn(Ar(e, C)) || ""), (x + "").charAt(1) === "=" && (x = Ar(e, C))) : x = Ar(e, C), k = parseFloat(x), Z = y === "string" && S.charAt(1) === "=" && S.substr(0, 2), Z && (S = S.substr(2)), A = parseFloat(S), C in cr && (C === "autoAlpha" && (k === 1 && Ar(e, "visibility") === "hidden" && A && (k = 0), _t.push("visibility", 0, g.visibility), jr(this, g, "visibility", k ? "inherit" : "hidden", A ? "inherit" : "hidden", !A)), C !== "scale" && C !== "transform" && (C = cr[C], ~C.indexOf(",") && (C = C.split(",")[0]))), K = C in Er, K) {
            if (this.styles.save(C), ot || (lt = e._gsap, lt.renderTransform && !r.parseTransform || to(e, r.parseTransform), ct = r.smoothOrigin !== !1 && lt.smooth, ot = this._pt = new gi(this._pt, g, ln, 0, 1, lt.renderTransform, lt, 0, -1), ot.dep = 1), C === "scale")
              this._pt = new gi(this._pt, lt, "scaleY", lt.scaleY, (Z ? na(lt.scaleY, Z + A) : A) - lt.scaleY || 0, ph), this._pt.u = 0, c.push("scaleY", C), C += "X";
            else if (C === "transformOrigin") {
              _t.push(vi, 0, g[vi]), S = cb(S), lt.svg ? wh(e, S, 0, ct, 0, this) : ($ = parseFloat(S.split(" ")[2]) || 0, $ !== lt.zOrigin && jr(this, lt, "zOrigin", lt.zOrigin, $), jr(this, g, C, mu(x), mu(S)));
              continue;
            } else if (C === "svgOrigin") {
              wh(e, S, 1, ct, 0, this);
              continue;
            } else if (C in sg) {
              vb(this, lt, C, k, Z ? na(k, Z + S) : S);
              continue;
            } else if (C === "smoothOrigin") {
              jr(this, lt, "smooth", lt.smooth, S);
              continue;
            } else if (C === "force3D") {
              lt[C] = S;
              continue;
            } else if (C === "transform") {
              pb(this, S, e);
              continue;
            }
          } else
            C in g || (C = _a(C) || C);
          if (K || (A || A === 0) && (k || k === 0) && !jx.test(S) && C in g)
            U = (x + "").substr((k + "").length), A || (A = 0), $ = Gn(S) || (C in ki.units ? ki.units[C] : U), U !== $ && (k = ns(e, C, x, $)), this._pt = new gi(this._pt, K ? lt : g, C, k, (Z ? na(k, Z + A) : A) - k, !K && ($ === "px" || C === "zIndex") && r.autoRound !== !1 ? eb : ph), this._pt.u = $ || 0, U !== $ && $ !== "%" && (this._pt.b = x, this._pt.r = tb);
          else if (C in g)
            fb.call(this, e, C, x, Z ? Z + S : S);
          else if (C in e)
            this.add(e, C, x || e[C], Z ? Z + S : S, l, h);
          else if (C !== "parseTransform") {
            Bh(C, S);
            continue;
          }
          K || (C in g ? _t.push(C, 0, g[C]) : typeof e[C] == "function" ? _t.push(C, 2, e[C]()) : _t.push(C, 1, x || e[C])), c.push(C);
        }
      }
    ht && K_(this);
  },
  render: function(e, r) {
    if (r.tween._time || !Xh())
      for (var o = r._pt; o; )
        o.r(e, o.d), o = o._next;
    else
      r.styles.revert();
  },
  get: Ar,
  aliases: cr,
  getSetter: function(e, r, o) {
    var l = cr[r];
    return l && l.indexOf(",") < 0 && (r = l), r in Er && r !== vi && (e._gsap.x || Ar(e, "x")) ? o && bd === o ? r === "scale" ? sb : rb : (bd = o || {}) && (r === "scale" ? ab : ob) : e.style && !Rh(e.style[r]) ? nb : ~r.indexOf("-") ? ib : Wh(e, r);
  },
  core: {
    _removeProperty: Ps,
    _getMatrix: Zh
  }
};
mi.utils.checkPrefix = _a;
mi.core.getStyleSaver = eg;
(function(u, e, r, o) {
  var l = _i(u + "," + e + "," + r, function(h) {
    Er[h] = 1;
  });
  _i(e, function(h) {
    ki.units[h] = "deg", sg[h] = 1;
  }), cr[l[13]] = u + "," + e, _i(o, function(h) {
    var c = h.split(":");
    cr[c[1]] = l[c[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
_i("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(u) {
  ki.units[u] = "px";
});
mi.registerPlugin(ug);
var Fa = mi.registerPlugin(ug) || mi;
Fa.core.Tween;
const Mr = 11102230246251565e-32, Hn = 134217729, mb = (3 + 8 * Mr) * Mr;
function Ul(u, e, r, o, l) {
  let h, c, g, b, x = e[0], S = o[0], A = 0, k = 0;
  S > x == S > -x ? (h = x, x = e[++A]) : (h = S, S = o[++k]);
  let y = 0;
  if (A < u && k < r)
    for (S > x == S > -x ? (c = x + h, g = h - (c - x), x = e[++A]) : (c = S + h, g = h - (c - S), S = o[++k]), h = c, g !== 0 && (l[y++] = g); A < u && k < r; )
      S > x == S > -x ? (c = h + x, b = c - h, g = h - (c - b) + (x - b), x = e[++A]) : (c = h + S, b = c - h, g = h - (c - b) + (S - b), S = o[++k]), h = c, g !== 0 && (l[y++] = g);
  for (; A < u; )
    c = h + x, b = c - h, g = h - (c - b) + (x - b), x = e[++A], h = c, g !== 0 && (l[y++] = g);
  for (; k < r; )
    c = h + S, b = c - h, g = h - (c - b) + (S - b), S = o[++k], h = c, g !== 0 && (l[y++] = g);
  return (h !== 0 || y === 0) && (l[y++] = h), y;
}
function yb(u, e) {
  let r = e[0];
  for (let o = 1; o < u; o++)
    r += e[o];
  return r;
}
function ro(u) {
  return new Float64Array(u);
}
const wb = (3 + 16 * Mr) * Mr, xb = (2 + 12 * Mr) * Mr, bb = (9 + 64 * Mr) * Mr * Mr, Hs = ro(4), Ed = ro(8), kd = ro(12), Ld = ro(16), ti = ro(4);
function Sb(u, e, r, o, l, h, c) {
  let g, b, x, S, A, k, y, D, C, U, $, Z, K, ot, lt, ct, ht, _t;
  const at = u - l, Pt = r - l, Mt = e - h, Et = o - h;
  ot = at * Et, k = Hn * at, y = k - (k - at), D = at - y, k = Hn * Et, C = k - (k - Et), U = Et - C, lt = D * U - (ot - y * C - D * C - y * U), ct = Mt * Pt, k = Hn * Mt, y = k - (k - Mt), D = Mt - y, k = Hn * Pt, C = k - (k - Pt), U = Pt - C, ht = D * U - (ct - y * C - D * C - y * U), $ = lt - ht, A = lt - $, Hs[0] = lt - ($ + A) + (A - ht), Z = ot + $, A = Z - ot, K = ot - (Z - A) + ($ - A), $ = K - ct, A = K - $, Hs[1] = K - ($ + A) + (A - ct), _t = Z + $, A = _t - Z, Hs[2] = Z - (_t - A) + ($ - A), Hs[3] = _t;
  let kt = yb(4, Hs), bt = xb * c;
  if (kt >= bt || -kt >= bt || (A = u - at, g = u - (at + A) + (A - l), A = r - Pt, x = r - (Pt + A) + (A - l), A = e - Mt, b = e - (Mt + A) + (A - h), A = o - Et, S = o - (Et + A) + (A - h), g === 0 && b === 0 && x === 0 && S === 0) || (bt = bb * c + mb * Math.abs(kt), kt += at * S + Et * g - (Mt * x + Pt * b), kt >= bt || -kt >= bt))
    return kt;
  ot = g * Et, k = Hn * g, y = k - (k - g), D = g - y, k = Hn * Et, C = k - (k - Et), U = Et - C, lt = D * U - (ot - y * C - D * C - y * U), ct = b * Pt, k = Hn * b, y = k - (k - b), D = b - y, k = Hn * Pt, C = k - (k - Pt), U = Pt - C, ht = D * U - (ct - y * C - D * C - y * U), $ = lt - ht, A = lt - $, ti[0] = lt - ($ + A) + (A - ht), Z = ot + $, A = Z - ot, K = ot - (Z - A) + ($ - A), $ = K - ct, A = K - $, ti[1] = K - ($ + A) + (A - ct), _t = Z + $, A = _t - Z, ti[2] = Z - (_t - A) + ($ - A), ti[3] = _t;
  const Dt = Ul(4, Hs, 4, ti, Ed);
  ot = at * S, k = Hn * at, y = k - (k - at), D = at - y, k = Hn * S, C = k - (k - S), U = S - C, lt = D * U - (ot - y * C - D * C - y * U), ct = Mt * x, k = Hn * Mt, y = k - (k - Mt), D = Mt - y, k = Hn * x, C = k - (k - x), U = x - C, ht = D * U - (ct - y * C - D * C - y * U), $ = lt - ht, A = lt - $, ti[0] = lt - ($ + A) + (A - ht), Z = ot + $, A = Z - ot, K = ot - (Z - A) + ($ - A), $ = K - ct, A = K - $, ti[1] = K - ($ + A) + (A - ct), _t = Z + $, A = _t - Z, ti[2] = Z - (_t - A) + ($ - A), ti[3] = _t;
  const vt = Ul(Dt, Ed, 4, ti, kd);
  ot = g * S, k = Hn * g, y = k - (k - g), D = g - y, k = Hn * S, C = k - (k - S), U = S - C, lt = D * U - (ot - y * C - D * C - y * U), ct = b * x, k = Hn * b, y = k - (k - b), D = b - y, k = Hn * x, C = k - (k - x), U = x - C, ht = D * U - (ct - y * C - D * C - y * U), $ = lt - ht, A = lt - $, ti[0] = lt - ($ + A) + (A - ht), Z = ot + $, A = Z - ot, K = ot - (Z - A) + ($ - A), $ = K - ct, A = K - $, ti[1] = K - ($ + A) + (A - ct), _t = Z + $, A = _t - Z, ti[2] = Z - (_t - A) + ($ - A), ti[3] = _t;
  const $t = Ul(vt, kd, 4, ti, Ld);
  return Ld[$t - 1];
}
function Jo(u, e, r, o, l, h) {
  const c = (e - h) * (r - l), g = (u - l) * (o - h), b = c - g, x = Math.abs(c + g);
  return Math.abs(b) >= wb * x ? b : -Sb(u, e, r, o, l, h, x);
}
const Rd = Math.pow(2, -52), jo = new Uint32Array(512);
class yu {
  static from(e, r = Ob, o = Mb) {
    const l = e.length, h = new Float64Array(l * 2);
    for (let c = 0; c < l; c++) {
      const g = e[c];
      h[2 * c] = r(g), h[2 * c + 1] = o(g);
    }
    return new yu(h);
  }
  constructor(e) {
    const r = e.length >> 1;
    if (r > 0 && typeof e[0] != "number")
      throw new Error("Expected coords to contain numbers.");
    this.coords = e;
    const o = Math.max(2 * r - 5, 0);
    this._triangles = new Uint32Array(o * 3), this._halfedges = new Int32Array(o * 3), this._hashSize = Math.ceil(Math.sqrt(r)), this._hullPrev = new Uint32Array(r), this._hullNext = new Uint32Array(r), this._hullTri = new Uint32Array(r), this._hullHash = new Int32Array(this._hashSize), this._ids = new Uint32Array(r), this._dists = new Float64Array(r), this.update();
  }
  update() {
    const { coords: e, _hullPrev: r, _hullNext: o, _hullTri: l, _hullHash: h } = this, c = e.length >> 1;
    let g = 1 / 0, b = 1 / 0, x = -1 / 0, S = -1 / 0;
    for (let at = 0; at < c; at++) {
      const Pt = e[2 * at], Mt = e[2 * at + 1];
      Pt < g && (g = Pt), Mt < b && (b = Mt), Pt > x && (x = Pt), Mt > S && (S = Mt), this._ids[at] = at;
    }
    const A = (g + x) / 2, k = (b + S) / 2;
    let y, D, C;
    for (let at = 0, Pt = 1 / 0; at < c; at++) {
      const Mt = ql(A, k, e[2 * at], e[2 * at + 1]);
      Mt < Pt && (y = at, Pt = Mt);
    }
    const U = e[2 * y], $ = e[2 * y + 1];
    for (let at = 0, Pt = 1 / 0; at < c; at++) {
      if (at === y)
        continue;
      const Mt = ql(U, $, e[2 * at], e[2 * at + 1]);
      Mt < Pt && Mt > 0 && (D = at, Pt = Mt);
    }
    let Z = e[2 * D], K = e[2 * D + 1], ot = 1 / 0;
    for (let at = 0; at < c; at++) {
      if (at === y || at === D)
        continue;
      const Pt = Ab(U, $, Z, K, e[2 * at], e[2 * at + 1]);
      Pt < ot && (C = at, ot = Pt);
    }
    let lt = e[2 * C], ct = e[2 * C + 1];
    if (ot === 1 / 0) {
      for (let Mt = 0; Mt < c; Mt++)
        this._dists[Mt] = e[2 * Mt] - e[0] || e[2 * Mt + 1] - e[1];
      Qs(this._ids, this._dists, 0, c - 1);
      const at = new Uint32Array(c);
      let Pt = 0;
      for (let Mt = 0, Et = -1 / 0; Mt < c; Mt++) {
        const kt = this._ids[Mt], bt = this._dists[kt];
        bt > Et && (at[Pt++] = kt, Et = bt);
      }
      this.hull = at.subarray(0, Pt), this.triangles = new Uint32Array(0), this.halfedges = new Uint32Array(0);
      return;
    }
    if (Jo(U, $, Z, K, lt, ct) < 0) {
      const at = D, Pt = Z, Mt = K;
      D = C, Z = lt, K = ct, C = at, lt = Pt, ct = Mt;
    }
    const ht = Pb(U, $, Z, K, lt, ct);
    this._cx = ht.x, this._cy = ht.y;
    for (let at = 0; at < c; at++)
      this._dists[at] = ql(e[2 * at], e[2 * at + 1], ht.x, ht.y);
    Qs(this._ids, this._dists, 0, c - 1), this._hullStart = y;
    let _t = 3;
    o[y] = r[C] = D, o[D] = r[y] = C, o[C] = r[D] = y, l[y] = 0, l[D] = 1, l[C] = 2, h.fill(-1), h[this._hashKey(U, $)] = y, h[this._hashKey(Z, K)] = D, h[this._hashKey(lt, ct)] = C, this.trianglesLen = 0, this._addTriangle(y, D, C, -1, -1, -1);
    for (let at = 0, Pt, Mt; at < this._ids.length; at++) {
      const Et = this._ids[at], kt = e[2 * Et], bt = e[2 * Et + 1];
      if (at > 0 && Math.abs(kt - Pt) <= Rd && Math.abs(bt - Mt) <= Rd || (Pt = kt, Mt = bt, Et === y || Et === D || Et === C))
        continue;
      let Dt = 0;
      for (let ae = 0, he = this._hashKey(kt, bt); ae < this._hashSize && (Dt = h[(he + ae) % this._hashSize], !(Dt !== -1 && Dt !== o[Dt])); ae++)
        ;
      Dt = r[Dt];
      let vt = Dt, $t;
      for (; $t = o[vt], Jo(kt, bt, e[2 * vt], e[2 * vt + 1], e[2 * $t], e[2 * $t + 1]) >= 0; )
        if (vt = $t, vt === Dt) {
          vt = -1;
          break;
        }
      if (vt === -1)
        continue;
      let Yt = this._addTriangle(vt, Et, o[vt], -1, -1, l[vt]);
      l[Et] = this._legalize(Yt + 2), l[vt] = Yt, _t++;
      let Bt = o[vt];
      for (; $t = o[Bt], Jo(kt, bt, e[2 * Bt], e[2 * Bt + 1], e[2 * $t], e[2 * $t + 1]) < 0; )
        Yt = this._addTriangle(Bt, Et, $t, l[Et], -1, l[Bt]), l[Et] = this._legalize(Yt + 2), o[Bt] = Bt, _t--, Bt = $t;
      if (vt === Dt)
        for (; $t = r[vt], Jo(kt, bt, e[2 * $t], e[2 * $t + 1], e[2 * vt], e[2 * vt + 1]) < 0; )
          Yt = this._addTriangle($t, Et, vt, -1, l[vt], l[$t]), this._legalize(Yt + 2), l[$t] = Yt, o[vt] = vt, _t--, vt = $t;
      this._hullStart = r[Et] = vt, o[vt] = r[Bt] = Et, o[Et] = Bt, h[this._hashKey(kt, bt)] = Et, h[this._hashKey(e[2 * vt], e[2 * vt + 1])] = vt;
    }
    this.hull = new Uint32Array(_t);
    for (let at = 0, Pt = this._hullStart; at < _t; at++)
      this.hull[at] = Pt, Pt = o[Pt];
    this.triangles = this._triangles.subarray(0, this.trianglesLen), this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
  }
  _hashKey(e, r) {
    return Math.floor(Cb(e - this._cx, r - this._cy) * this._hashSize) % this._hashSize;
  }
  _legalize(e) {
    const { _triangles: r, _halfedges: o, coords: l } = this;
    let h = 0, c = 0;
    for (; ; ) {
      const g = o[e], b = e - e % 3;
      if (c = b + (e + 2) % 3, g === -1) {
        if (h === 0)
          break;
        e = jo[--h];
        continue;
      }
      const x = g - g % 3, S = b + (e + 1) % 3, A = x + (g + 2) % 3, k = r[c], y = r[e], D = r[S], C = r[A];
      if (Tb(
        l[2 * k],
        l[2 * k + 1],
        l[2 * y],
        l[2 * y + 1],
        l[2 * D],
        l[2 * D + 1],
        l[2 * C],
        l[2 * C + 1]
      )) {
        r[e] = C, r[g] = k;
        const $ = o[A];
        if ($ === -1) {
          let K = this._hullStart;
          do {
            if (this._hullTri[K] === A) {
              this._hullTri[K] = e;
              break;
            }
            K = this._hullPrev[K];
          } while (K !== this._hullStart);
        }
        this._link(e, $), this._link(g, o[c]), this._link(c, A);
        const Z = x + (g + 1) % 3;
        h < jo.length && (jo[h++] = Z);
      } else {
        if (h === 0)
          break;
        e = jo[--h];
      }
    }
    return c;
  }
  _link(e, r) {
    this._halfedges[e] = r, r !== -1 && (this._halfedges[r] = e);
  }
  // add a new triangle given vertex indices and adjacent half-edge ids
  _addTriangle(e, r, o, l, h, c) {
    const g = this.trianglesLen;
    return this._triangles[g] = e, this._triangles[g + 1] = r, this._triangles[g + 2] = o, this._link(g, l), this._link(g + 1, h), this._link(g + 2, c), this.trianglesLen += 3, g;
  }
}
function Cb(u, e) {
  const r = u / (Math.abs(u) + Math.abs(e));
  return (e > 0 ? 3 - r : 1 + r) / 4;
}
function ql(u, e, r, o) {
  const l = u - r, h = e - o;
  return l * l + h * h;
}
function Tb(u, e, r, o, l, h, c, g) {
  const b = u - c, x = e - g, S = r - c, A = o - g, k = l - c, y = h - g, D = b * b + x * x, C = S * S + A * A, U = k * k + y * y;
  return b * (A * U - C * y) - x * (S * U - C * k) + D * (S * y - A * k) < 0;
}
function Ab(u, e, r, o, l, h) {
  const c = r - u, g = o - e, b = l - u, x = h - e, S = c * c + g * g, A = b * b + x * x, k = 0.5 / (c * x - g * b), y = (x * S - g * A) * k, D = (c * A - b * S) * k;
  return y * y + D * D;
}
function Pb(u, e, r, o, l, h) {
  const c = r - u, g = o - e, b = l - u, x = h - e, S = c * c + g * g, A = b * b + x * x, k = 0.5 / (c * x - g * b), y = u + (x * S - g * A) * k, D = e + (c * A - b * S) * k;
  return { x: y, y: D };
}
function Qs(u, e, r, o) {
  if (o - r <= 20)
    for (let l = r + 1; l <= o; l++) {
      const h = u[l], c = e[h];
      let g = l - 1;
      for (; g >= r && e[u[g]] > c; )
        u[g + 1] = u[g--];
      u[g + 1] = h;
    }
  else {
    const l = r + o >> 1;
    let h = r + 1, c = o;
    Ra(u, l, h), e[u[r]] > e[u[o]] && Ra(u, r, o), e[u[h]] > e[u[o]] && Ra(u, h, o), e[u[r]] > e[u[h]] && Ra(u, r, h);
    const g = u[h], b = e[g];
    for (; ; ) {
      do
        h++;
      while (e[u[h]] < b);
      do
        c--;
      while (e[u[c]] > b);
      if (c < h)
        break;
      Ra(u, h, c);
    }
    u[r + 1] = u[c], u[c] = g, o - h + 1 >= c - r ? (Qs(u, e, h, o), Qs(u, e, r, c - 1)) : (Qs(u, e, r, c - 1), Qs(u, e, h, o));
  }
}
function Ra(u, e, r) {
  const o = u[e];
  u[e] = u[r], u[r] = o;
}
function Ob(u) {
  return u[0];
}
function Mb(u) {
  return u[1];
}
const Dd = 1e-6;
let xs = class {
  constructor() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "";
  }
  moveTo(e, r) {
    this._ += `M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  }
  lineTo(e, r) {
    this._ += `L${this._x1 = +e},${this._y1 = +r}`;
  }
  arc(e, r, o) {
    e = +e, r = +r, o = +o;
    const l = e + o, h = r;
    if (o < 0)
      throw new Error("negative radius");
    this._x1 === null ? this._ += `M${l},${h}` : (Math.abs(this._x1 - l) > Dd || Math.abs(this._y1 - h) > Dd) && (this._ += "L" + l + "," + h), o && (this._ += `A${o},${o},0,1,1,${e - o},${r}A${o},${o},0,1,1,${this._x1 = l},${this._y1 = h}`);
  }
  rect(e, r, o, l) {
    this._ += `M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +r}h${+o}v${+l}h${-o}Z`;
  }
  value() {
    return this._ || null;
  }
};
class xh {
  constructor() {
    this._ = [];
  }
  moveTo(e, r) {
    this._.push([e, r]);
  }
  closePath() {
    this._.push(this._[0].slice());
  }
  lineTo(e, r) {
    this._.push([e, r]);
  }
  value() {
    return this._.length ? this._ : null;
  }
}
class Ib {
  constructor(e, [r, o, l, h] = [0, 0, 960, 500]) {
    if (!((l = +l) >= (r = +r)) || !((h = +h) >= (o = +o)))
      throw new Error("invalid bounds");
    this.delaunay = e, this._circumcenters = new Float64Array(e.points.length * 2), this.vectors = new Float64Array(e.points.length * 2), this.xmax = l, this.xmin = r, this.ymax = h, this.ymin = o, this._init();
  }
  update() {
    return this.delaunay.update(), this._init(), this;
  }
  _init() {
    const { delaunay: { points: e, hull: r, triangles: o }, vectors: l } = this;
    let h, c;
    const g = this.circumcenters = this._circumcenters.subarray(0, o.length / 3 * 2);
    for (let C = 0, U = 0, $ = o.length, Z, K; C < $; C += 3, U += 2) {
      const ot = o[C] * 2, lt = o[C + 1] * 2, ct = o[C + 2] * 2, ht = e[ot], _t = e[ot + 1], at = e[lt], Pt = e[lt + 1], Mt = e[ct], Et = e[ct + 1], kt = at - ht, bt = Pt - _t, Dt = Mt - ht, vt = Et - _t, $t = (kt * vt - bt * Dt) * 2;
      if (Math.abs($t) < 1e-9) {
        if (h === void 0) {
          h = c = 0;
          for (const Bt of r)
            h += e[Bt * 2], c += e[Bt * 2 + 1];
          h /= r.length, c /= r.length;
        }
        const Yt = 1e9 * Math.sign((h - ht) * vt - (c - _t) * Dt);
        Z = (ht + Mt) / 2 - Yt * vt, K = (_t + Et) / 2 + Yt * Dt;
      } else {
        const Yt = 1 / $t, Bt = kt * kt + bt * bt, ae = Dt * Dt + vt * vt;
        Z = ht + (vt * Bt - bt * ae) * Yt, K = _t + (kt * ae - Dt * Bt) * Yt;
      }
      g[U] = Z, g[U + 1] = K;
    }
    let b = r[r.length - 1], x, S = b * 4, A, k = e[2 * b], y, D = e[2 * b + 1];
    l.fill(0);
    for (let C = 0; C < r.length; ++C)
      b = r[C], x = S, A = k, y = D, S = b * 4, k = e[2 * b], D = e[2 * b + 1], l[x + 2] = l[S] = y - D, l[x + 3] = l[S + 1] = k - A;
  }
  render(e) {
    const r = e == null ? e = new xs() : void 0, { delaunay: { halfedges: o, inedges: l, hull: h }, circumcenters: c, vectors: g } = this;
    if (h.length <= 1)
      return null;
    for (let S = 0, A = o.length; S < A; ++S) {
      const k = o[S];
      if (k < S)
        continue;
      const y = Math.floor(S / 3) * 2, D = Math.floor(k / 3) * 2, C = c[y], U = c[y + 1], $ = c[D], Z = c[D + 1];
      this._renderSegment(C, U, $, Z, e);
    }
    let b, x = h[h.length - 1];
    for (let S = 0; S < h.length; ++S) {
      b = x, x = h[S];
      const A = Math.floor(l[x] / 3) * 2, k = c[A], y = c[A + 1], D = b * 4, C = this._project(k, y, g[D + 2], g[D + 3]);
      C && this._renderSegment(k, y, C[0], C[1], e);
    }
    return r && r.value();
  }
  renderBounds(e) {
    const r = e == null ? e = new xs() : void 0;
    return e.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin), r && r.value();
  }
  renderCell(e, r) {
    const o = r == null ? r = new xs() : void 0, l = this._clip(e);
    if (l === null || !l.length)
      return;
    r.moveTo(l[0], l[1]);
    let h = l.length;
    for (; l[0] === l[h - 2] && l[1] === l[h - 1] && h > 1; )
      h -= 2;
    for (let c = 2; c < h; c += 2)
      (l[c] !== l[c - 2] || l[c + 1] !== l[c - 1]) && r.lineTo(l[c], l[c + 1]);
    return r.closePath(), o && o.value();
  }
  *cellPolygons() {
    const { delaunay: { points: e } } = this;
    for (let r = 0, o = e.length / 2; r < o; ++r) {
      const l = this.cellPolygon(r);
      l && (l.index = r, yield l);
    }
  }
  cellPolygon(e) {
    const r = new xh();
    return this.renderCell(e, r), r.value();
  }
  _renderSegment(e, r, o, l, h) {
    let c;
    const g = this._regioncode(e, r), b = this._regioncode(o, l);
    g === 0 && b === 0 ? (h.moveTo(e, r), h.lineTo(o, l)) : (c = this._clipSegment(e, r, o, l, g, b)) && (h.moveTo(c[0], c[1]), h.lineTo(c[2], c[3]));
  }
  contains(e, r, o) {
    return r = +r, r !== r || (o = +o, o !== o) ? !1 : this.delaunay._step(e, r, o) === e;
  }
  *neighbors(e) {
    const r = this._clip(e);
    if (r)
      for (const o of this.delaunay.neighbors(e)) {
        const l = this._clip(o);
        if (l) {
          t:
            for (let h = 0, c = r.length; h < c; h += 2)
              for (let g = 0, b = l.length; g < b; g += 2)
                if (r[h] === l[g] && r[h + 1] === l[g + 1] && r[(h + 2) % c] === l[(g + b - 2) % b] && r[(h + 3) % c] === l[(g + b - 1) % b]) {
                  yield o;
                  break t;
                }
        }
      }
  }
  _cell(e) {
    const { circumcenters: r, delaunay: { inedges: o, halfedges: l, triangles: h } } = this, c = o[e];
    if (c === -1)
      return null;
    const g = [];
    let b = c;
    do {
      const x = Math.floor(b / 3);
      if (g.push(r[x * 2], r[x * 2 + 1]), b = b % 3 === 2 ? b - 2 : b + 1, h[b] !== e)
        break;
      b = l[b];
    } while (b !== c && b !== -1);
    return g;
  }
  _clip(e) {
    if (e === 0 && this.delaunay.hull.length === 1)
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    const r = this._cell(e);
    if (r === null)
      return null;
    const { vectors: o } = this, l = e * 4;
    return this._simplify(o[l] || o[l + 1] ? this._clipInfinite(e, r, o[l], o[l + 1], o[l + 2], o[l + 3]) : this._clipFinite(e, r));
  }
  _clipFinite(e, r) {
    const o = r.length;
    let l = null, h, c, g = r[o - 2], b = r[o - 1], x, S = this._regioncode(g, b), A, k = 0;
    for (let y = 0; y < o; y += 2)
      if (h = g, c = b, g = r[y], b = r[y + 1], x = S, S = this._regioncode(g, b), x === 0 && S === 0)
        A = k, k = 0, l ? l.push(g, b) : l = [g, b];
      else {
        let D, C, U, $, Z;
        if (x === 0) {
          if ((D = this._clipSegment(h, c, g, b, x, S)) === null)
            continue;
          [C, U, $, Z] = D;
        } else {
          if ((D = this._clipSegment(g, b, h, c, S, x)) === null)
            continue;
          [$, Z, C, U] = D, A = k, k = this._edgecode(C, U), A && k && this._edge(e, A, k, l, l.length), l ? l.push(C, U) : l = [C, U];
        }
        A = k, k = this._edgecode($, Z), A && k && this._edge(e, A, k, l, l.length), l ? l.push($, Z) : l = [$, Z];
      }
    if (l)
      A = k, k = this._edgecode(l[0], l[1]), A && k && this._edge(e, A, k, l, l.length);
    else if (this.contains(e, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2))
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    return l;
  }
  _clipSegment(e, r, o, l, h, c) {
    const g = h < c;
    for (g && ([e, r, o, l, h, c] = [o, l, e, r, c, h]); ; ) {
      if (h === 0 && c === 0)
        return g ? [o, l, e, r] : [e, r, o, l];
      if (h & c)
        return null;
      let b, x, S = h || c;
      S & 8 ? (b = e + (o - e) * (this.ymax - r) / (l - r), x = this.ymax) : S & 4 ? (b = e + (o - e) * (this.ymin - r) / (l - r), x = this.ymin) : S & 2 ? (x = r + (l - r) * (this.xmax - e) / (o - e), b = this.xmax) : (x = r + (l - r) * (this.xmin - e) / (o - e), b = this.xmin), h ? (e = b, r = x, h = this._regioncode(e, r)) : (o = b, l = x, c = this._regioncode(o, l));
    }
  }
  _clipInfinite(e, r, o, l, h, c) {
    let g = Array.from(r), b;
    if ((b = this._project(g[0], g[1], o, l)) && g.unshift(b[0], b[1]), (b = this._project(g[g.length - 2], g[g.length - 1], h, c)) && g.push(b[0], b[1]), g = this._clipFinite(e, g))
      for (let x = 0, S = g.length, A, k = this._edgecode(g[S - 2], g[S - 1]); x < S; x += 2)
        A = k, k = this._edgecode(g[x], g[x + 1]), A && k && (x = this._edge(e, A, k, g, x), S = g.length);
    else
      this.contains(e, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2) && (g = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax]);
    return g;
  }
  _edge(e, r, o, l, h) {
    for (; r !== o; ) {
      let c, g;
      switch (r) {
        case 5:
          r = 4;
          continue;
        case 4:
          r = 6, c = this.xmax, g = this.ymin;
          break;
        case 6:
          r = 2;
          continue;
        case 2:
          r = 10, c = this.xmax, g = this.ymax;
          break;
        case 10:
          r = 8;
          continue;
        case 8:
          r = 9, c = this.xmin, g = this.ymax;
          break;
        case 9:
          r = 1;
          continue;
        case 1:
          r = 5, c = this.xmin, g = this.ymin;
          break;
      }
      (l[h] !== c || l[h + 1] !== g) && this.contains(e, c, g) && (l.splice(h, 0, c, g), h += 2);
    }
    return h;
  }
  _project(e, r, o, l) {
    let h = 1 / 0, c, g, b;
    if (l < 0) {
      if (r <= this.ymin)
        return null;
      (c = (this.ymin - r) / l) < h && (b = this.ymin, g = e + (h = c) * o);
    } else if (l > 0) {
      if (r >= this.ymax)
        return null;
      (c = (this.ymax - r) / l) < h && (b = this.ymax, g = e + (h = c) * o);
    }
    if (o > 0) {
      if (e >= this.xmax)
        return null;
      (c = (this.xmax - e) / o) < h && (g = this.xmax, b = r + (h = c) * l);
    } else if (o < 0) {
      if (e <= this.xmin)
        return null;
      (c = (this.xmin - e) / o) < h && (g = this.xmin, b = r + (h = c) * l);
    }
    return [g, b];
  }
  _edgecode(e, r) {
    return (e === this.xmin ? 1 : e === this.xmax ? 2 : 0) | (r === this.ymin ? 4 : r === this.ymax ? 8 : 0);
  }
  _regioncode(e, r) {
    return (e < this.xmin ? 1 : e > this.xmax ? 2 : 0) | (r < this.ymin ? 4 : r > this.ymax ? 8 : 0);
  }
  _simplify(e) {
    if (e && e.length > 4) {
      for (let r = 0; r < e.length; r += 2) {
        const o = (r + 2) % e.length, l = (r + 4) % e.length;
        (e[r] === e[o] && e[o] === e[l] || e[r + 1] === e[o + 1] && e[o + 1] === e[l + 1]) && (e.splice(o, 2), r -= 2);
      }
      e.length || (e = null);
    }
    return e;
  }
}
const Eb = 2 * Math.PI, Xs = Math.pow;
function kb(u) {
  return u[0];
}
function Lb(u) {
  return u[1];
}
function Rb(u) {
  const { triangles: e, coords: r } = u;
  for (let o = 0; o < e.length; o += 3) {
    const l = 2 * e[o], h = 2 * e[o + 1], c = 2 * e[o + 2];
    if ((r[c] - r[l]) * (r[h + 1] - r[l + 1]) - (r[h] - r[l]) * (r[c + 1] - r[l + 1]) > 1e-10)
      return !1;
  }
  return !0;
}
function Db(u, e, r) {
  return [u + Math.sin(u + e) * r, e + Math.cos(u - e) * r];
}
class Kh {
  static from(e, r = kb, o = Lb, l) {
    return new Kh("length" in e ? zb(e, r, o, l) : Float64Array.from(Bb(e, r, o, l)));
  }
  constructor(e) {
    this._delaunator = new yu(e), this.inedges = new Int32Array(e.length / 2), this._hullIndex = new Int32Array(e.length / 2), this.points = this._delaunator.coords, this._init();
  }
  update() {
    return this._delaunator.update(), this._init(), this;
  }
  _init() {
    const e = this._delaunator, r = this.points;
    if (e.hull && e.hull.length > 2 && Rb(e)) {
      this.collinear = Int32Array.from({ length: r.length / 2 }, (k, y) => y).sort((k, y) => r[2 * k] - r[2 * y] || r[2 * k + 1] - r[2 * y + 1]);
      const b = this.collinear[0], x = this.collinear[this.collinear.length - 1], S = [r[2 * b], r[2 * b + 1], r[2 * x], r[2 * x + 1]], A = 1e-8 * Math.hypot(S[3] - S[1], S[2] - S[0]);
      for (let k = 0, y = r.length / 2; k < y; ++k) {
        const D = Db(r[2 * k], r[2 * k + 1], A);
        r[2 * k] = D[0], r[2 * k + 1] = D[1];
      }
      this._delaunator = new yu(r);
    } else
      delete this.collinear;
    const o = this.halfedges = this._delaunator.halfedges, l = this.hull = this._delaunator.hull, h = this.triangles = this._delaunator.triangles, c = this.inedges.fill(-1), g = this._hullIndex.fill(-1);
    for (let b = 0, x = o.length; b < x; ++b) {
      const S = h[b % 3 === 2 ? b - 2 : b + 1];
      (o[b] === -1 || c[S] === -1) && (c[S] = b);
    }
    for (let b = 0, x = l.length; b < x; ++b)
      g[l[b]] = b;
    l.length <= 2 && l.length > 0 && (this.triangles = new Int32Array(3).fill(-1), this.halfedges = new Int32Array(3).fill(-1), this.triangles[0] = l[0], c[l[0]] = 1, l.length === 2 && (c[l[1]] = 0, this.triangles[1] = l[1], this.triangles[2] = l[1]));
  }
  voronoi(e) {
    return new Ib(this, e);
  }
  *neighbors(e) {
    const { inedges: r, hull: o, _hullIndex: l, halfedges: h, triangles: c, collinear: g } = this;
    if (g) {
      const A = g.indexOf(e);
      A > 0 && (yield g[A - 1]), A < g.length - 1 && (yield g[A + 1]);
      return;
    }
    const b = r[e];
    if (b === -1)
      return;
    let x = b, S = -1;
    do {
      if (yield S = c[x], x = x % 3 === 2 ? x - 2 : x + 1, c[x] !== e)
        return;
      if (x = h[x], x === -1) {
        const A = o[(l[e] + 1) % o.length];
        A !== S && (yield A);
        return;
      }
    } while (x !== b);
  }
  find(e, r, o = 0) {
    if (e = +e, e !== e || (r = +r, r !== r))
      return -1;
    const l = o;
    let h;
    for (; (h = this._step(o, e, r)) >= 0 && h !== o && h !== l; )
      o = h;
    return h;
  }
  _step(e, r, o) {
    const { inedges: l, hull: h, _hullIndex: c, halfedges: g, triangles: b, points: x } = this;
    if (l[e] === -1 || !x.length)
      return (e + 1) % (x.length >> 1);
    let S = e, A = Xs(r - x[e * 2], 2) + Xs(o - x[e * 2 + 1], 2);
    const k = l[e];
    let y = k;
    do {
      let D = b[y];
      const C = Xs(r - x[D * 2], 2) + Xs(o - x[D * 2 + 1], 2);
      if (C < A && (A = C, S = D), y = y % 3 === 2 ? y - 2 : y + 1, b[y] !== e)
        break;
      if (y = g[y], y === -1) {
        if (y = h[(c[e] + 1) % h.length], y !== D && Xs(r - x[y * 2], 2) + Xs(o - x[y * 2 + 1], 2) < A)
          return y;
        break;
      }
    } while (y !== k);
    return S;
  }
  render(e) {
    const r = e == null ? e = new xs() : void 0, { points: o, halfedges: l, triangles: h } = this;
    for (let c = 0, g = l.length; c < g; ++c) {
      const b = l[c];
      if (b < c)
        continue;
      const x = h[c] * 2, S = h[b] * 2;
      e.moveTo(o[x], o[x + 1]), e.lineTo(o[S], o[S + 1]);
    }
    return this.renderHull(e), r && r.value();
  }
  renderPoints(e, r) {
    r === void 0 && (!e || typeof e.moveTo != "function") && (r = e, e = null), r = r == null ? 2 : +r;
    const o = e == null ? e = new xs() : void 0, { points: l } = this;
    for (let h = 0, c = l.length; h < c; h += 2) {
      const g = l[h], b = l[h + 1];
      e.moveTo(g + r, b), e.arc(g, b, r, 0, Eb);
    }
    return o && o.value();
  }
  renderHull(e) {
    const r = e == null ? e = new xs() : void 0, { hull: o, points: l } = this, h = o[0] * 2, c = o.length;
    e.moveTo(l[h], l[h + 1]);
    for (let g = 1; g < c; ++g) {
      const b = 2 * o[g];
      e.lineTo(l[b], l[b + 1]);
    }
    return e.closePath(), r && r.value();
  }
  hullPolygon() {
    const e = new xh();
    return this.renderHull(e), e.value();
  }
  renderTriangle(e, r) {
    const o = r == null ? r = new xs() : void 0, { points: l, triangles: h } = this, c = h[e *= 3] * 2, g = h[e + 1] * 2, b = h[e + 2] * 2;
    return r.moveTo(l[c], l[c + 1]), r.lineTo(l[g], l[g + 1]), r.lineTo(l[b], l[b + 1]), r.closePath(), o && o.value();
  }
  *trianglePolygons() {
    const { triangles: e } = this;
    for (let r = 0, o = e.length / 3; r < o; ++r)
      yield this.trianglePolygon(r);
  }
  trianglePolygon(e) {
    const r = new xh();
    return this.renderTriangle(e, r), r.value();
  }
}
function zb(u, e, r, o) {
  const l = u.length, h = new Float64Array(l * 2);
  for (let c = 0; c < l; ++c) {
    const g = u[c];
    h[c * 2] = e.call(o, g, c, u), h[c * 2 + 1] = r.call(o, g, c, u);
  }
  return h;
}
function* Bb(u, e, r, o) {
  let l = 0;
  for (const h of u)
    yield e.call(o, h, l, u), yield r.call(o, h, l, u), ++l;
}
function $a(u, e, r) {
  this.k = u, this.x = e, this.y = r;
}
$a.prototype = {
  constructor: $a,
  scale: function(u) {
    return u === 1 ? this : new $a(this.k * u, this.x, this.y);
  },
  translate: function(u, e) {
    return u === 0 & e === 0 ? this : new $a(this.k, this.x + this.k * u, this.y + this.k * e);
  },
  apply: function(u) {
    return [u[0] * this.k + this.x, u[1] * this.k + this.y];
  },
  applyX: function(u) {
    return u * this.k + this.x;
  },
  applyY: function(u) {
    return u * this.k + this.y;
  },
  invert: function(u) {
    return [(u[0] - this.x) / this.k, (u[1] - this.y) / this.k];
  },
  invertX: function(u) {
    return (u - this.x) / this.k;
  },
  invertY: function(u) {
    return (u - this.y) / this.k;
  },
  rescaleX: function(u) {
    return u.copy().domain(u.range().map(this.invertX, this).map(u.invert, u));
  },
  rescaleY: function(u) {
    return u.copy().domain(u.range().map(this.invertY, this).map(u.invert, u));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
$a.prototype;
var On = /* @__PURE__ */ ((u) => (u[u.MMMain = 0] = "MMMain", u[u.MMMiniMap = 1] = "MMMiniMap", u[u.SSLeft = 2] = "SSLeft", u[u.SSRight = 3] = "SSRight", u[u.LMain = 4] = "LMain", u[u.LLens = 5] = "LLens", u[u.Preview = 6] = "Preview", u))(On || {}), bh = /* @__PURE__ */ ((u) => (u[u.Bubble = 0] = "Bubble", u[u.Cursor = 1] = "Cursor", u))(bh || {});
function Nb(u) {
  return u === 2 || u === 3;
}
function Gs(u) {
  return u === 0 || Nb(u) || u === 6;
}
function Fb(u) {
  return u === 1 || u === 5;
}
function Zs(u) {
  return u?.type === "MM";
}
function zd(u) {
  return u?.type === "SS";
}
function Da(u) {
  return u?.type === "L";
}
const $b = Os();
function Vb() {
  return Ki($b);
}
class Ub {
  keyToValue;
  valueToKey;
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(e, r) {
    if (this.keyToValue.has(e)) {
      const o = this.keyToValue.get(e);
      o !== void 0 && this.valueToKey.delete(o);
    }
    if (this.valueToKey.has(r)) {
      const o = this.valueToKey.get(r);
      o !== void 0 && this.keyToValue.delete(o);
    }
    this.keyToValue.set(e, r), this.valueToKey.set(r, e);
  }
  getValue(e) {
    return this.keyToValue.get(e);
  }
  getValues() {
    return Array.from(this.keyToValue.values());
  }
  getKey(e) {
    return this.valueToKey.get(e);
  }
  getKeys() {
    return Array.from(this.keyToValue.keys());
  }
  deleteByKey(e) {
    const r = this.keyToValue.get(e);
    r !== void 0 && (this.keyToValue.delete(e), this.valueToKey.delete(r));
  }
  deleteByValue(e) {
    const r = this.valueToKey.get(e);
    r !== void 0 && (this.valueToKey.delete(e), this.keyToValue.delete(r));
  }
}
var qb = /* @__PURE__ */ pe("<svg><polygon stroke=black stroke-width=0></svg>", !1, !0), Wb = /* @__PURE__ */ pe("<svg><rect fill=transparent></svg>", !1, !0), Yb = /* @__PURE__ */ pe("<svg><defs><clipPath><circle></svg>", !1, !0), Hb = /* @__PURE__ */ pe("<svg><g><circle fill=white></circle><circle stroke=black fill=transparent></svg>", !1, !0), Xb = /* @__PURE__ */ pe("<svg>"), Gb = /* @__PURE__ */ pe("<svg><circle r=3 fill=red></svg>", !1, !0), Zb = /* @__PURE__ */ pe("<svg><rect stroke=green fill=none stroke-width=2></svg>", !1, !0), Kb = /* @__PURE__ */ pe("<svg><polygon stroke-width=1 stroke=red fill-opacity=0></svg>", !1, !0), Jb = /* @__PURE__ */ pe("<svg><rect fill-opacity=0 stroke=blue stroke-width=2></svg>", !1, !0), jb = /* @__PURE__ */ pe("<svg><rect fill=transparent stroke=red stroke-width=8></svg>", !1, !0), Qb = /* @__PURE__ */ pe("<br>"), t2 = /* @__PURE__ */ pe("<div><h1>Current Node</h1><p></p><pre>"), e2 = /* @__PURE__ */ pe("<div><h1>Scenegraph</h1><pre>"), n2 = /* @__PURE__ */ pe("<div><h1>Scope</h1><pre>");
const i2 = (u) => (e) => {
  for (const [r, o] of Object.entries(u))
    if (o.layoutNode === e)
      return r;
  return e;
}, r2 = (u, e) => (r) => {
  const o = i2(e), l = `Error in ${o(r.source)}:
    ${r.display(o)} (${r.type})

Error path from root:
  ${ih(u, r.source).concat([r.source]).map((h) => o(h)).join(` >>
  `)}`;
  console.error(l);
}, lg = Os(() => Pr());
function e3(u) {
  u = Li({
    padding: 10,
    positioning: "relative"
  }, u);
  const e = Ow(), {
    scenegraph: r
  } = e, [o, l] = oa({}), h = Cw(r2(r, o)), c = `Bluefish(${Pr()})`, g = `Bluefish(${Pr()})`, b = c, x = u.id ?? g, [S, A] = Ve(() => {
  }), [k, y] = Ve(Pr()), [D, C] = Ve({
    scenegraph: r,
    uid: Pr()
  });
  let U;
  const $ = Vb(), [Z, K] = Ve([]), ot = /* @__PURE__ */ new Map(), lt = new Ub(), ct = /* @__PURE__ */ new Map([["stackSlot-0", ["address-0", "stack-heap-arrow-0"]], ["stack-heap-arrow-0", ["address-0", "stackSlot-0"]], ["address-0", ["stack-heap-arrow-0", "stackSlot-0", "heap-arrow-0-1", "heap-arrow-0-4", "heap-arrow-0-5", "address-1", "address-2", "address-3"]], ["stackSlot-1", ["address-1", "stack-heap-arrow-1"]], ["stack-heap-arrow-1", ["address-1", "stackSlot-1"]], ["address-1", ["stack-heap-arrow-1", "heap-arrow-0-1", "stackSlot-1", "address-0"]], ["heap-arrow-0-1", ["address-1", "address-0"]], ["address-2", ["heap-arrow-0-4", "address-4", "address-0", "heap-arrow-2-4"]], ["heap-arrow-0-4", ["address-2", "address-0"]], ["heap-arrow-0-5", ["address-3", "address-0"]], ["address-3", ["address-0", "heap-arrow-0-5", "address-4", "heap-arrow-3-1"]], ["address-4", ["address-3", "address-2", "heap-arrow-3-1", "heap-arrow-2-4"]], ["heap-arrow-2-4", ["address-2", "address-4"]], ["heap-arrow-3-1", ["address-3", "address-4"]]]);
  function ht(Ct) {
    const wt = Ct.match(/([A-Z])\w+/);
    return wt ? wt[0].trim() : "";
  }
  function _t(Ct) {
    const wt = D().scenegraph[Ct];
    return wt && wt.type === "ref" ? _t(wt.refId) : Ct;
  }
  function at(Ct) {
    const wt = D().scenegraph[Ct];
    if (!wt || !wt.parent)
      return {
        x: 0,
        y: 0
      };
    const Lt = at(wt.parent);
    return wt.type === "node" ? {
      x: Lt.x + (wt.transform.translate.x ?? 0),
      y: Lt.y + (wt.transform.translate.y ?? 0)
    } : Lt;
  }
  function Pt(Ct) {
    let wt = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return Ct.forEach((Lt) => {
      const zt = D().scenegraph[Lt];
      if (zt && zt.type === "node" && zt.bbox) {
        const jt = at(Lt);
        wt = {
          left: Math.min(wt.left, jt.x + (zt.bbox.left ?? 1 / 0)),
          top: Math.min(wt.top, jt.y + (zt.bbox.top ?? 1 / 0)),
          right: Math.max(wt.right, jt.x + (zt.bbox.left ?? 0) + (zt.bbox.width ?? 0)),
          bottom: Math.max(wt.bottom, jt.y + (zt.bbox.top ?? 0) + (zt.bbox.height ?? 0))
        };
      } else if (zt && zt.type === "ref") {
        const jt = D().scenegraph[zt.refId], Se = at(zt.refId);
        jt && jt.type === "node" && jt.bbox && (wt = {
          left: Math.min(wt.left, Se.x + (jt.bbox.left ?? 1 / 0)),
          top: Math.min(wt.top, Se.y + (jt.bbox.top ?? 1 / 0)),
          right: Math.max(wt.right, Se.x + (jt.bbox.left ?? 0) + (jt.bbox.width ?? 0)),
          bottom: Math.max(wt.bottom, Se.y + (jt.bbox.top ?? 0) + (jt.bbox.height ?? 0))
        });
      }
    }), {
      left: wt.left,
      top: wt.top,
      width: wt.right - wt.left,
      height: wt.bottom - wt.top
    };
  }
  function Mt(Ct) {
    const wt = D().scenegraph[Ct];
    if (wt && wt.type === "node") {
      const Lt = wt.customData;
      return {
        left: Math.min(Lt.sx, Lt.ex),
        top: Math.min(Lt.sy, Lt.ey),
        width: Math.max(Math.abs(Lt.sx - Lt.ex), 1),
        height: Math.max(Math.abs(Lt.sy - Lt.ey), 1)
      };
    } else
      return Mt(wt.refId);
  }
  function Et(Ct) {
    return console.log(Ct), `${Ct.x},${Ct.y}`;
  }
  function kt(Ct) {
    const wt = ht(Ct), Lt = D().scenegraph[Ct];
    return wt === "Align" || wt === "Distribute" ? Pt(Lt.children) : wt === "Arrow" ? Mt(Ct) : Lt && Lt.type === "node" ? Lt.bbox : Lt && Lt.type === "ref" ? kt(Lt.refId) : {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    };
  }
  function bt(Ct) {
    const wt = kt(Ct), Lt = at(_t(Ct));
    return {
      x: Lt.x + (wt.left ?? 0),
      y: Lt.y + (wt.top ?? 0)
    };
  }
  function Dt(Ct, wt) {
    const [Lt, zt, jt, Se] = Ct.split(" ").map(Number), [Le, Ge, Te, Ae] = wt.split(" ").map(Number);
    return !(Lt + jt < Le || Le + Te < Lt || zt + Se < Ge || Ge + Ae < zt);
  }
  function vt(Ct) {
    switch (Ct) {
      case On.MMMiniMap:
        return "30%";
      default:
        return "100%";
    }
  }
  function $t(Ct) {
    switch (Ct) {
      case On.MMMiniMap:
        return {
          position: "absolute",
          top: 0,
          left: 0,
          background: "rgba(255, 255, 255, 0.7)",
          "border-right": ".2rem solid black",
          "border-bottom": ".2rem solid black"
        };
      case On.LLens:
        return {
          position: "absolute",
          top: 0,
          left: 0,
          "pointer-events": "none"
        };
      default:
        return {};
    }
  }
  or(() => {
    if (u.mantisComponentType === On.Preview) {
      const Ct = [], wt = /* @__PURE__ */ new Set(["stack-heap-arrow-0", "stack-heap-arrow-1", "address-0", "address-1", "address-2", "address-3", "address-4", "heap-arrow-0-1", "heap-arrow-0-4", "heap-arrow-0-5", "heap-arrow-2-4", "heap-arrow-3-1", "stackSlot-0", "stackSlot-1", "stackSlot-2"]), Lt = (zt) => {
        for (const jt in o)
          if (jt.includes(zt))
            return jt;
      };
      for (const zt of wt) {
        const jt = Lt(zt);
        jt && lt.set(zt, o[jt].layoutNode ?? "");
      }
      for (const zt of lt.getValues()) {
        if (ht(zt) === "Ref")
          continue;
        const jt = kt(zt), Se = at(zt), Le = {
          x: Se.x + (jt.left ?? 0) + (jt.width ?? 0) / 2,
          y: Se.y + (jt.top ?? 0) + (jt.height ?? 0) / 2
        };
        Ct.push(Le), ot.set(Et(Le), zt);
      }
      K(Ct);
    } else if (Gs(u.mantisComponentType)) {
      const Ct = [];
      for (const wt in r) {
        if (ht(wt) === "Ref")
          continue;
        const Lt = kt(wt), zt = at(wt), jt = {
          x: zt.x + (Lt.left ?? 0) + (Lt.width ?? 0) / 2,
          y: zt.y + (Lt.top ?? 0) + (Lt.height ?? 0) / 2
        };
        Ct.push(jt), ot.set(Et(jt), wt);
      }
      K(Ct);
    }
  });
  const [Yt, Bt] = Ve(-1), [ae, he] = Ve(b), Ie = () => D().scenegraph[ae()], rn = () => at(ae()), ye = () => ae() ? kt(ae()) : {
    left: 0,
    top: 0,
    width: 0,
    height: 0
  }, oe = (Ct) => {
    Mn(() => {
      for (const Te of Ct)
        Te.owned.left || (Te.bbox.left = 0), Te.owned.top || (Te.bbox.top = 0);
    });
    const wt = {
      left: Ct.map((Te) => Te.bbox.left),
      top: Ct.map((Te) => Te.bbox.top),
      width: Ct.map((Te) => Te.bbox.width),
      height: Ct.map((Te) => Te.bbox.height)
    }, Lt = uu(wt.left) ?? 0, zt = ou(wt.left.map((Te, Ae) => Xi(Te, wt.width[Ae]))), jt = uu(wt.top) ?? 0, Se = ou(wt.top.map((Te, Ae) => Xi(Te, wt.height[Ae]))), Le = nn(zt, Lt), Ge = nn(Se, jt);
    return {
      transform: {
        translate: {
          x: 0,
          y: 0
        }
      },
      bbox: {
        left: Lt,
        top: jt,
        width: Le,
        height: Ge
      }
    };
  }, qe = (Ct) => {
    const wt = u.mantisTraversalPattern === bh.Bubble ? 0.75 : 1.25, Lt = 0.4, zt = 5, jt = 2, Se = () => u.width ?? (Ct.bbox.width ?? 0) + u.padding * 2, Le = () => u.height ?? (Ct.bbox.height ?? 0) + u.padding * 2, Ge = () => -u.padding + (u.positioning === "absolute" ? 0 : Ct.bbox.left ?? 0), Te = () => -u.padding + (u.positioning === "absolute" ? 0 : Ct.bbox.top ?? 0), Ae = () => `${Ge()} ${Te()} ${Se()} ${Le()}`, [Fn, ir] = Ve(0), [Be, _n] = Ve(0), [Re, yi] = Ve(0), [ce, t] = Ve(0), i = new ResizeObserver(() => {
      const Ot = L({
        x: 0,
        y: 0
      }) ?? {
        x: 0,
        y: 0
      }, Ut = E({
        x: 0,
        y: 0
      }), te = E({
        x: Ot.x + (U?.getBoundingClientRect().width ?? 0),
        y: Ot.y + (U?.getBoundingClientRect().height ?? 0)
      });
      ir(te?.x ?? 0), _n(te?.y ?? 0), yi(Ut?.x ?? 0), t(Ut?.y ?? 0);
    });
    or(() => (U && i.observe(U), () => {
      U && i.unobserve(U);
    }));
    const [a, f] = Ve(0), [d, v] = Ve(0), [m, p] = Ve(!1), [w, T] = Ve(!0);
    function E(Ot) {
      if (U) {
        let Ut = U.createSVGPoint();
        Ut.x = Ot.x, Ut.y = Ot.y;
        const te = U.getScreenCTM();
        if (te)
          return Ut = Ut.matrixTransform(te.inverse()), {
            x: Ut.x,
            y: Ut.y
          };
      }
    }
    function L(Ot) {
      if (U) {
        let Ut = U.createSVGPoint();
        Ut.x = Ot.x, Ut.y = Ot.y;
        const te = U.getScreenCTM();
        if (te)
          return Ut = Ut.matrixTransform(te), {
            x: Ut.x,
            y: Ut.y
          };
      }
    }
    function I(Ot, Ut) {
      nt(Ut);
      const te = Ot.x - (Ot.x - Ge()) / Ut + st() / 2, le = Ot.y - (Ot.y - Te()) / Ut + dt() / 2;
      pt(te), It(le);
    }
    function O(Ot) {
      const Ut = document.elementFromPoint(Ot.clientX, Ot.clientY);
      Ut && U && U.contains(Ut) ? p(!0) : p(!1);
    }
    const B = () => (ye()?.left ?? 0) + (rn()?.x ?? 0), q = () => (ye()?.top ?? 0) + (rn()?.y ?? 0), Y = () => ye()?.width ?? 0, z = () => ye()?.height ?? 0, N = () => B() + Y() / 2, M = () => q() + z() / 2, [R, V] = Ve(0), [W, G] = Ve(0), [J, j] = Ve(0), [tt, it] = Ve(0), [Q, nt] = Ve(1), st = () => Fn() / Q(), dt = () => Be() / Q(), [gt, pt] = Ve(N()), [At, It] = Ve(M()), Rt = () => gt() - st() / 2, Qt = () => At() - dt() / 2, qt = () => `${Rt()} ${Qt()} ${st()} ${dt()}`, [Xt, Gt] = Ve(N()), [ee, Jt] = Ve(M()), Pe = () => {
      if (U) {
        const Ot = U.getAttribute("viewBox")?.split(" ");
        Gt(parseFloat(Ot[0]) + parseFloat(Ot[2]) / 2), Jt(parseFloat(Ot[1]) + parseFloat(Ot[3]) / 2);
      }
    }, ue = () => Kh.from(Z(), (Ot) => Ot.x, (Ot) => Ot.y), fe = () => ue().voronoi([Re(), ce(), Re() + Fn(), ce() + Be()]), [ie, ve] = Ve(!1);
    function hn() {
      U && (ie() ? Fa.to(U, {
        attr: {
          viewBox: Ae()
        },
        duration: wt
      }) : Fa.to(U, {
        attr: {
          viewBox: qt()
        },
        duration: wt
      }), ve(!ie()));
    }
    function sn(Ot) {
      const Ut = document.elementFromPoint(Ot.clientX, Ot.clientY);
      Ut && (ie() || u.mantisComponentType === On.LLens) && U && U.contains(Ut) && (Ot.preventDefault(), Ot.deltaY > 0 ? nt(Q() + Lt) : nt(Math.max(1, Q() - Lt)));
    }
    const [an, Ze] = Ve(0), [De, Ke] = Ve(0), [Tn, je] = Ve(!1);
    function Kn(Ot) {
      const Ut = E({
        x: Ot.clientX,
        y: Ot.clientY
      });
      Ut && (f(Ut.x), v(Ut.y));
    }
    function wi(Ot) {
      const Ut = E({
        x: Ot.clientX,
        y: Ot.clientY
      });
      if (Ut) {
        if (Zs($))
          $.setIsDragging(!0), Ze(Ut.x - R()), Ke(Ut.y - W());
        else if (Da($) && u.mantisId !== void 0) {
          const te = $.lensInfo()[u.mantisId];
          Ze(Ut.x - te.x), Ke(Ut.y - te.y), je(!0);
        }
      }
    }
    function $n(Ot) {
      const Ut = E({
        x: Ot.clientX,
        y: Ot.clientY
      });
      Ut && (Zs($) && $.isDragging() ? (V(Ut.x - an()), G(Ut.y - De()), $.setViewBBox(`${R()} ${W()} ${J()} ${tt()}`)) : Da($) && u.mantisId !== void 0 && Tn() && (V(Ut.x - an()), G(Ut.y - De())));
    }
    function Vn() {
      je(!1), Zs($) ? $.setIsDragging(!1) : Da($) && ($.updateLensInfo((Ot) => Ot.map((Ut, te) => te === u.mantisId ? {
        ...Ut,
        x: R(),
        y: W()
      } : Ut)), je(!1));
    }
    function mn(Ot) {
      const Ut = E({
        x: Ot.clientX,
        y: Ot.clientY
      });
      Ut && Da($) && (Ot.preventDefault(), $.updateLensInfo((te) => [...te, {
        x: Ut.x,
        y: Ut.y,
        magnification: jt
      }]));
    }
    or(() => {
      U && (u.mantisComponentType == On.MMMain && Zs($) ? ie() ? (Fa.to(U, {
        attr: {
          viewBox: qt()
        },
        duration: $.isDragging() ? 0.5 : wt
      }), $.setViewBBox(qt())) : $.setViewBBox(Ae()) : Gs(u.mantisComponentType) && ie() && Fa.to(U, {
        attr: {
          viewBox: qt()
        },
        duration: wt,
        onUpdate: Pe
      }));
    }), or(() => {
      u.mantisComponentType === On.LLens && I({
        x: R(),
        y: W()
      }, Q());
    });
    function En(Ot) {
      Gs(u.mantisComponentType) && m() && Ot.key === "f" ? T(!w()) : m() && u.mantisComponentType === On.LLens && Ot.key === "r" && nt(jt);
    }
    or(() => {
      U && (document.addEventListener("keydown", En), document.addEventListener("mousemove", O), U.addEventListener("mousemove", (Ot) => {
        w() && Kn(Ot), $n(Ot);
      }, !1), Gs(u.mantisComponentType) ? (U.addEventListener("click", hn, !1), U.addEventListener("wheel", sn, !1)) : Fb(u.mantisComponentType) ? (U.addEventListener("mousedown", wi, !1), U.addEventListener("mouseup", Vn, !1), U.addEventListener("mouseleave", Vn, !1), u.mantisComponentType === On.LLens && U.addEventListener("wheel", sn, !1)) : u.mantisComponentType === On.LMain && U.addEventListener("click", (Ot) => {
        Ot.shiftKey && mn(Ot);
      }, !1));
    }), or(() => {
      if (U && Gs(u.mantisComponentType)) {
        const Ot = ue().find(a(), d());
        Bt(Ot);
        const Ut = ot.get(Et(Z()[Ot]));
        he(_t(Ut ?? b)), u.mantisTraversalPattern === bh.Bubble ? (pt(N()), It(M()), V(B()), G(q()), it(z()), j(Y())) : (pt((te) => Math.abs(te - a()) > zt ? a() : te), It((te) => Math.abs(te - d()) > zt ? d() : te)), zd($) && (u.mantisComponentType === On.SSLeft ? $.setLeftViewBBox(ie() ? qt() : Ae()) : $.setRightViewBBox(ie() ? qt() : Ae()));
      }
    }), or(() => {
      if (Zs($) && u.mantisComponentType === On.MMMiniMap) {
        const Ot = $.viewBBox().split(" ");
        V(parseFloat(Ot[0])), G(parseFloat(Ot[1])), j(parseFloat(Ot[2])), it(parseFloat(Ot[3]));
      } else if (u.mantisComponentType === On.MMMain && Zs($) && $.isDragging()) {
        const [Ot, Ut, te, le] = $.viewBBox().split(" ");
        pt(parseFloat(Ot) + parseFloat(te) / 2), It(parseFloat(Ut) + parseFloat(le) / 2);
      }
    });
    const xi = (Ot) => {
      const Ut = Li({
        arrowheadColor: "purple"
      }, Ot), te = zn(() => ({
        x: Ot.targetPoint.x - Xt(),
        y: Ot.targetPoint.y - ee()
      })), le = zn(() => Math.sqrt(te().x ** 2 + te().y ** 2)), Ht = zn(() => ({
        x: te().x / le(),
        y: te().y / le()
      })), _e = () => Math.min(Se(), Le()) / Q() / 4, Oe = () => Math.min(Se(), Le()) / Q() / 8, xe = () => Math.min(Se(), Le()) / Q() / 4, Vt = () => Math.min(Se(), Le()) / Q() / 8, We = zn(() => ({
        x: Xt() + Ht().x * (st() / 2 - xe()),
        y: ee() + Ht().y * (dt() / 2 - xe())
      })), bn = zn(() => ({
        x: We().x - Ht().y * Oe() - Ht().x * Vt(),
        y: We().y + Ht().x * Oe() - Ht().y * Vt()
      })), Un = zn(() => ({
        x: We().x + Ht().y * Oe() - Ht().x * Vt(),
        y: We().y - Ht().x * Oe() - Ht().y * Vt()
      })), kn = zn(() => ({
        x: We().x + Ht().x * _e(),
        y: We().y + Ht().y * _e()
      }));
      return zn(() => ({
        x: We().x - Ht().x * _e(),
        y: We().y - Ht().y * _e()
      })), (() => {
        var zi = qb();
        return ze((ai) => {
          var kr = `${kn().x},${kn().y} ${bn().x},${bn().y} ${We().x},${We().y} ${Un().x},${Un().y}`, ss = Ut.arrowheadColor;
          return kr !== ai.e && Ft(zi, "points", ai.e = kr), ss !== ai.t && Ft(zi, "fill", ai.t = ss), ai;
        }, {
          e: void 0,
          t: void 0
        }), zi;
      })();
    }, An = (Ot) => {
      const Ut = () => (Ot.viewBox ?? "0 0 0 0").split(" "), te = () => parseFloat(Ut()[0]), le = () => parseFloat(Ut()[1]), Ht = () => parseFloat(Ut()[2]), _e = () => parseFloat(Ut()[3]), Oe = () => ({
        x: te() + Ht() / 2,
        y: le() + _e() / 2
      });
      return [(() => {
        var xe = Wb();
        return ze((Vt) => {
          var We = te(), bn = le(), Un = Ht(), kn = _e(), zi = Ot.stroke, ai = Ot.strokeWidth;
          return We !== Vt.e && Ft(xe, "x", Vt.e = We), bn !== Vt.t && Ft(xe, "y", Vt.t = bn), Un !== Vt.a && Ft(xe, "width", Vt.a = Un), kn !== Vt.o && Ft(xe, "height", Vt.o = kn), zi !== Vt.i && Ft(xe, "stroke", Vt.i = zi), ai !== Vt.n && Ft(xe, "stroke-width", Vt.n = ai), Vt;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0
        }), xe;
      })(), Dn(() => Dn(() => !!(ie() && Ot.viewBox && !Dt(qt(), Ot.viewBox)))() && Kt(xi, {
        get targetPoint() {
          return Oe();
        }
      }))];
    }, gr = (Ot) => {
      const te = 6 * jt, le = () => `${te / Q()}vmin`, Ht = () => `lensClip-${Ot.id}`;
      return i_(() => {
        V(Ot.lensInfo.x), G(Ot.lensInfo.y), I({
          x: R(),
          y: W()
        }, Ot.lensInfo.magnification);
      }), [(() => {
        var _e = Yb(), Oe = _e.firstChild, xe = Oe.firstChild;
        return ze((Vt) => {
          var We = Ht(), bn = R(), Un = W(), kn = le();
          return We !== Vt.e && Ft(Oe, "id", Vt.e = We), bn !== Vt.t && Ft(xe, "cx", Vt.t = bn), Un !== Vt.a && Ft(xe, "cy", Vt.a = Un), kn !== Vt.o && Ft(xe, "r", Vt.o = kn), Vt;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0
        }), _e;
      })(), (() => {
        var _e = Hb(), Oe = _e.firstChild, xe = Oe.nextSibling;
        return _e.style.setProperty("pointer-events", "auto"), Ne(_e, () => Ot.children, xe), ze((Vt) => {
          var We = `url(#${Ht()})`, bn = R(), Un = W(), kn = le(), zi = R(), ai = W(), kr = le(), ss = 8 / Q();
          return We !== Vt.e && Ft(_e, "clip-path", Vt.e = We), bn !== Vt.t && Ft(Oe, "cx", Vt.t = bn), Un !== Vt.a && Ft(Oe, "cy", Vt.a = Un), kn !== Vt.o && Ft(Oe, "r", Vt.o = kn), zi !== Vt.i && Ft(xe, "cx", Vt.i = zi), ai !== Vt.n && Ft(xe, "cy", Vt.n = ai), kr !== Vt.s && Ft(xe, "r", Vt.s = kr), ss !== Vt.h && Ft(xe, "stroke-width", Vt.h = ss), Vt;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0
        }), _e;
      })()];
    };
    return (() => {
      var Ot = Xb(), Ut = U;
      return typeof Ut == "function" ? Ha(Ut, Ot) : U = Ot, Ne(Ot, (() => {
        var te = Dn(() => u.mantisComponentType === On.LLens);
        return () => te() ? Dn(() => Dn(() => !!(Da($) && u.mantisId !== void 0))() && Kt(gr, {
          get id() {
            return u.mantisId;
          },
          get lensInfo() {
            return $.lensInfo()[u.mantisId];
          },
          get children() {
            return Ct.children;
          }
        })) : [Dn(() => Ct.children), Dn(() => Dn(() => !!(Gs(u.mantisComponentType) && Ie()))() && [Kt(ta, {
          get each() {
            return Array.from(fe().cellPolygons());
          },
          children: (le) => (() => {
            var Ht = Kb();
            return ze(() => Ft(Ht, "points", le.map((_e) => _e.join(",")).join(" "))), Ht;
          })()
        }), (() => {
          var le = Zb();
          return ze((Ht) => {
            var _e = B(), Oe = q(), xe = Y(), Vt = z();
            return _e !== Ht.e && Ft(le, "x", Ht.e = _e), Oe !== Ht.t && Ft(le, "y", Ht.t = Oe), xe !== Ht.a && Ft(le, "width", Ht.a = xe), Vt !== Ht.o && Ft(le, "height", Ht.o = Vt), Ht;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0
          }), le;
        })(), Kt(ta, {
          get each() {
            return ct.get(lt.getKey(ae()) ?? "") ?? [];
          },
          children: (le) => {
            const Ht = lt.getValue(le);
            if (!Ht || ht(Ht) === "Bluefish")
              return;
            const _e = kt(Ht), Oe = bt(Ht);
            return (() => {
              var xe = Jb();
              return ze((Vt) => {
                var We = Oe.x, bn = Oe.y, Un = Math.max(_e.width ?? 0, 1), kn = Math.max(_e.height ?? 0, 1);
                return We !== Vt.e && Ft(xe, "x", Vt.e = We), bn !== Vt.t && Ft(xe, "y", Vt.t = bn), Un !== Vt.a && Ft(xe, "width", Vt.a = Un), kn !== Vt.o && Ft(xe, "height", Vt.o = kn), Vt;
              }, {
                e: void 0,
                t: void 0,
                a: void 0,
                o: void 0
              }), xe;
            })();
          }
        }), Kt(ta, {
          get each() {
            return Array.from(fe().neighbors(Yt()));
          },
          children: (le) => {
            if (le === void 0 || le < 0)
              return;
            const Ht = () => Z()[le], _e = ot.get(Et(Ht()));
            if (!_e)
              return;
            const Oe = kt(_e), xe = bt(_e), Vt = () => ie() && !Dt(qt(), `${xe.x} ${xe.y} ${Oe.width} ${Oe.height}`), We = () => ct.get(lt.getKey(ae()) ?? "") ?? [], bn = () => We().includes(lt.getKey(_e) ?? "") ? "orange" : "purple";
            return Kt(aa, {
              get when() {
                return Vt();
              },
              get children() {
                return Kt(xi, {
                  get targetPoint() {
                    return Ht();
                  },
                  get arrowheadColor() {
                    return bn();
                  }
                });
              }
            });
          }
        })]), Dn(() => Dn(() => u.mantisComponentType === On.MMMiniMap)() && (() => {
          var le = jb();
          return ze((Ht) => {
            var _e = R(), Oe = W(), xe = J(), Vt = tt();
            return _e !== Ht.e && Ft(le, "x", Ht.e = _e), Oe !== Ht.t && Ft(le, "y", Ht.t = Oe), xe !== Ht.a && Ft(le, "width", Ht.a = xe), Vt !== Ht.o && Ft(le, "height", Ht.o = Vt), Ht;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0
          }), le;
        })()), Dn(() => Dn(() => !!zd($))() && (u.mantisComponentType === On.SSLeft ? $.rightViewBBox() !== Ae() && Kt(An, {
          get viewBox() {
            return $.rightViewBBox();
          },
          stroke: "blue",
          strokeWidth: 2
        }) : $.leftViewBBox() !== Ae() && Kt(An, {
          get viewBox() {
            return $.leftViewBBox();
          },
          stroke: "blue",
          strokeWidth: 2
        }))), (() => {
          var le = Gb();
          return ze((Ht) => {
            var _e = a(), Oe = d();
            return _e !== Ht.e && Ft(le, "cx", Ht.e = _e), Oe !== Ht.t && Ft(le, "cy", Ht.t = Oe), Ht;
          }, {
            e: void 0,
            t: void 0
          }), le;
        })()];
      })()), ze((te) => {
        var le = $t(u.mantisComponentType), Ht = vt(u.mantisComponentType), _e = vt(u.mantisComponentType), Oe = u.mantisComponentType === On.LLens ? qt() : Ae();
        return te.e = lr(Ot, le, te.e), Ht !== te.t && Ft(Ot, "width", te.t = Ht), _e !== te.a && Ft(Ot, "height", te.a = _e), Oe !== te.o && Ft(Ot, "viewBox", te.o = Oe), te;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0
      }), Ot;
    })();
  }, si = Kt(lg.Provider, {
    value: k,
    get children() {
      return Kt(s_.Provider, {
        value: h,
        get children() {
          return Kt(kh.Provider, {
            value: e,
            get children() {
              return Kt(eo.Provider, {
                value: [o, l],
                get children() {
                  return (() => {
                    const Ct = Xa(Kt(ri, {
                      name: b,
                      layout: oe,
                      paint: qe,
                      get children() {
                        return Kt(lu.Provider, {
                          value: () => x,
                          get children() {
                            return u.children;
                          }
                        });
                      }
                    }));
                    return A(() => () => Ct[0].layout(null)), Ct[0].jsx;
                  })();
                }
              });
            }
          });
        }
      });
    }
  });
  return r_(() => {
    for (const wt in r)
      delete r[wt];
    S()();
    const Ct = Pr();
    y(Ct), C({
      scenegraph: r,
      uid: Ct
    });
  }), [si, Kt(Yw, {
    position: "top-left",
    containerStyle: {
      position: "relative",
      width: "500px"
    }
  }), Kt(aa, {
    get when() {
      return u.debug === !0;
    },
    get children() {
      return [Qb(), (() => {
        var Ct = t2(), wt = Ct.firstChild, Lt = wt.nextSibling, zt = Lt.nextSibling;
        return Ct.style.setProperty("float", "left"), Ct.style.setProperty("margin-right", "40px"), Ct.style.setProperty("margin-left", "5px"), Ne(Lt, ae), Ne(zt, () => JSON.stringify(Ie(), null, 2)), Ct;
      })(), (() => {
        var Ct = e2(), wt = Ct.firstChild, Lt = wt.nextSibling;
        return Ct.style.setProperty("float", "left"), Ct.style.setProperty("margin-right", "40px"), Ne(Lt, () => JSON.stringify(D().scenegraph, null, 2)), Ct;
      })(), (() => {
        var Ct = n2(), wt = Ct.firstChild, Lt = wt.nextSibling;
        return Ct.style.setProperty("float", "left"), Ne(Lt, () => JSON.stringify(o, null, 2)), Ct;
      })()];
    }
  })];
}
const ri = (u) => {
  const [e, r] = Ki(eo);
  Or();
  const o = Ki(lg), [l, h] = Ve([]), [c, g] = oa({
    bbox: {},
    transform: {
      translate: {}
    },
    customData: {}
  }), {
    scenegraph: b,
    createNode: x,
    mergeBBoxAndTransform: S,
    createChildRepr: A
  } = a_(), k = Kt(sh.Provider, {
    value: () => {
    },
    get children() {
      return (() => {
        const D = Xa(u.children);
        return h(() => D.map((C) => C.layout)), Kt(n_, ii({
          get component() {
            return u.paint;
          }
        }, c, {
          get children() {
            return Kt(ta, {
              each: D,
              children: (C) => C.jsx
            });
          }
        }));
      })();
    }
  });
  return Eh(() => {
    r(cn((D) => {
      for (const C of Object.keys(D))
        D[C].layoutNode === u.name && delete D[C];
    }));
  }), r_(ww(() => o(), () => {
    const D = Oi(b[u.name] ?? {
      type: "node",
      bbox: {},
      transform: {
        translate: {}
      },
      children: [],
      customData: {}
    });
    g({
      bbox: D.bbox ?? {},
      transform: {
        translate: {
          x: D.transform?.translate?.x ?? 0,
          y: D.transform?.translate?.y ?? 0
        }
      },
      customData: D.customData
    });
  })), {
    jsx: k,
    layout: (D) => {
      x(u.name, D);
      for (const K of l())
        K(u.name);
      const C = Oi(b[u.name]), {
        bbox: U,
        transform: $,
        customData: Z
      } = u.layout((C.children ?? []).map((K) => A(u.name, K)));
      S(u.name, u.name, U, $), C.customData = Z;
    }
  };
};
var fr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Jh(u) {
  return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u;
}
function s2(u) {
  if (u.__esModule)
    return u;
  var e = u.default;
  if (typeof e == "function") {
    var r = function o() {
      return this instanceof o ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(u).forEach(function(o) {
    var l = Object.getOwnPropertyDescriptor(u, o);
    Object.defineProperty(r, o, l.get ? l : {
      enumerable: !0,
      get: function() {
        return u[o];
      }
    });
  }), r;
}
var wu = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
wu.exports;
(function(u, e) {
  (function() {
    var r, o = "4.17.21", l = 200, h = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", c = "Expected a function", g = "Invalid `variable` option passed into `_.template`", b = "__lodash_hash_undefined__", x = 500, S = "__lodash_placeholder__", A = 1, k = 2, y = 4, D = 1, C = 2, U = 1, $ = 2, Z = 4, K = 8, ot = 16, lt = 32, ct = 64, ht = 128, _t = 256, at = 512, Pt = 30, Mt = "...", Et = 800, kt = 16, bt = 1, Dt = 2, vt = 3, $t = 1 / 0, Yt = 9007199254740991, Bt = 17976931348623157e292, ae = 0 / 0, he = 4294967295, Ie = he - 1, rn = he >>> 1, ye = [
      ["ary", ht],
      ["bind", U],
      ["bindKey", $],
      ["curry", K],
      ["curryRight", ot],
      ["flip", at],
      ["partial", lt],
      ["partialRight", ct],
      ["rearg", _t]
    ], oe = "[object Arguments]", qe = "[object Array]", si = "[object AsyncFunction]", Ct = "[object Boolean]", wt = "[object Date]", Lt = "[object DOMException]", zt = "[object Error]", jt = "[object Function]", Se = "[object GeneratorFunction]", Le = "[object Map]", Ge = "[object Number]", Te = "[object Null]", Ae = "[object Object]", Fn = "[object Promise]", ir = "[object Proxy]", Be = "[object RegExp]", _n = "[object Set]", Re = "[object String]", yi = "[object Symbol]", ce = "[object Undefined]", t = "[object WeakMap]", i = "[object WeakSet]", a = "[object ArrayBuffer]", f = "[object DataView]", d = "[object Float32Array]", v = "[object Float64Array]", m = "[object Int8Array]", p = "[object Int16Array]", w = "[object Int32Array]", T = "[object Uint8Array]", E = "[object Uint8ClampedArray]", L = "[object Uint16Array]", I = "[object Uint32Array]", O = /\b__p \+= '';/g, B = /\b(__p \+=) '' \+/g, q = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Y = /&(?:amp|lt|gt|quot|#39);/g, z = /[&<>"']/g, N = RegExp(Y.source), M = RegExp(z.source), R = /<%-([\s\S]+?)%>/g, V = /<%([\s\S]+?)%>/g, W = /<%=([\s\S]+?)%>/g, G = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, J = /^\w*$/, j = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, tt = /[\\^$.*+?()[\]{}|]/g, it = RegExp(tt.source), Q = /^\s+/, nt = /\s/, st = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, dt = /\{\n\/\* \[wrapped with (.+)\] \*/, gt = /,? & /, pt = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, At = /[()=,{}\[\]\/\s]/, It = /\\(\\)?/g, Rt = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Qt = /\w*$/, qt = /^[-+]0x[0-9a-f]+$/i, Xt = /^0b[01]+$/i, Gt = /^\[object .+?Constructor\]$/, ee = /^0o[0-7]+$/i, Jt = /^(?:0|[1-9]\d*)$/, Pe = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, ue = /($^)/, fe = /['\n\r\u2028\u2029\\]/g, ie = "\\ud800-\\udfff", ve = "\\u0300-\\u036f", hn = "\\ufe20-\\ufe2f", sn = "\\u20d0-\\u20ff", an = ve + hn + sn, Ze = "\\u2700-\\u27bf", De = "a-z\\xdf-\\xf6\\xf8-\\xff", Ke = "\\xac\\xb1\\xd7\\xf7", Tn = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", je = "\\u2000-\\u206f", Kn = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", wi = "A-Z\\xc0-\\xd6\\xd8-\\xde", $n = "\\ufe0e\\ufe0f", Vn = Ke + Tn + je + Kn, mn = "['’]", En = "[" + ie + "]", xi = "[" + Vn + "]", An = "[" + an + "]", gr = "\\d+", Ot = "[" + Ze + "]", Ut = "[" + De + "]", te = "[^" + ie + Vn + gr + Ze + De + wi + "]", le = "\\ud83c[\\udffb-\\udfff]", Ht = "(?:" + An + "|" + le + ")", _e = "[^" + ie + "]", Oe = "(?:\\ud83c[\\udde6-\\uddff]){2}", xe = "[\\ud800-\\udbff][\\udc00-\\udfff]", Vt = "[" + wi + "]", We = "\\u200d", bn = "(?:" + Ut + "|" + te + ")", Un = "(?:" + Vt + "|" + te + ")", kn = "(?:" + mn + "(?:d|ll|m|re|s|t|ve))?", zi = "(?:" + mn + "(?:D|LL|M|RE|S|T|VE))?", ai = Ht + "?", kr = "[" + $n + "]?", ss = "(?:" + We + "(?:" + [_e, Oe, xe].join("|") + ")" + kr + ai + ")*", Sg = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Cg = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", tf = kr + ai + ss, Tg = "(?:" + [Ot, Oe, xe].join("|") + ")" + tf, Ag = "(?:" + [_e + An + "?", An, Oe, xe, En].join("|") + ")", Pg = RegExp(mn, "g"), Og = RegExp(An, "g"), Pu = RegExp(le + "(?=" + le + ")|" + Ag + tf, "g"), Mg = RegExp([
      Vt + "?" + Ut + "+" + kn + "(?=" + [xi, Vt, "$"].join("|") + ")",
      Un + "+" + zi + "(?=" + [xi, Vt + bn, "$"].join("|") + ")",
      Vt + "?" + bn + "+" + kn,
      Vt + "+" + zi,
      Cg,
      Sg,
      gr,
      Tg
    ].join("|"), "g"), Ig = RegExp("[" + We + ie + an + $n + "]"), Eg = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, kg = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], Lg = -1, Qe = {};
    Qe[d] = Qe[v] = Qe[m] = Qe[p] = Qe[w] = Qe[T] = Qe[E] = Qe[L] = Qe[I] = !0, Qe[oe] = Qe[qe] = Qe[a] = Qe[Ct] = Qe[f] = Qe[wt] = Qe[zt] = Qe[jt] = Qe[Le] = Qe[Ge] = Qe[Ae] = Qe[Be] = Qe[_n] = Qe[Re] = Qe[t] = !1;
    var Je = {};
    Je[oe] = Je[qe] = Je[a] = Je[f] = Je[Ct] = Je[wt] = Je[d] = Je[v] = Je[m] = Je[p] = Je[w] = Je[Le] = Je[Ge] = Je[Ae] = Je[Be] = Je[_n] = Je[Re] = Je[yi] = Je[T] = Je[E] = Je[L] = Je[I] = !0, Je[zt] = Je[jt] = Je[t] = !1;
    var Rg = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, Dg = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, zg = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, Bg = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Ng = parseFloat, Fg = parseInt, ef = typeof fr == "object" && fr && fr.Object === Object && fr, $g = typeof self == "object" && self && self.Object === Object && self, Ln = ef || $g || Function("return this")(), Ou = e && !e.nodeType && e, as = Ou && !0 && u && !u.nodeType && u, nf = as && as.exports === Ou, Mu = nf && ef.process, Bi = function() {
      try {
        var ut = as && as.require && as.require("util").types;
        return ut || Mu && Mu.binding && Mu.binding("util");
      } catch {
      }
    }(), rf = Bi && Bi.isArrayBuffer, sf = Bi && Bi.isDate, af = Bi && Bi.isMap, of = Bi && Bi.isRegExp, uf = Bi && Bi.isSet, lf = Bi && Bi.isTypedArray;
    function bi(ut, yt, mt) {
      switch (mt.length) {
        case 0:
          return ut.call(yt);
        case 1:
          return ut.call(yt, mt[0]);
        case 2:
          return ut.call(yt, mt[0], mt[1]);
        case 3:
          return ut.call(yt, mt[0], mt[1], mt[2]);
      }
      return ut.apply(yt, mt);
    }
    function Vg(ut, yt, mt, Wt) {
      for (var de = -1, Fe = ut == null ? 0 : ut.length; ++de < Fe; ) {
        var Sn = ut[de];
        yt(Wt, Sn, mt(Sn), ut);
      }
      return Wt;
    }
    function Ni(ut, yt) {
      for (var mt = -1, Wt = ut == null ? 0 : ut.length; ++mt < Wt && yt(ut[mt], mt, ut) !== !1; )
        ;
      return ut;
    }
    function Ug(ut, yt) {
      for (var mt = ut == null ? 0 : ut.length; mt-- && yt(ut[mt], mt, ut) !== !1; )
        ;
      return ut;
    }
    function hf(ut, yt) {
      for (var mt = -1, Wt = ut == null ? 0 : ut.length; ++mt < Wt; )
        if (!yt(ut[mt], mt, ut))
          return !1;
      return !0;
    }
    function Lr(ut, yt) {
      for (var mt = -1, Wt = ut == null ? 0 : ut.length, de = 0, Fe = []; ++mt < Wt; ) {
        var Sn = ut[mt];
        yt(Sn, mt, ut) && (Fe[de++] = Sn);
      }
      return Fe;
    }
    function ao(ut, yt) {
      var mt = ut == null ? 0 : ut.length;
      return !!mt && Es(ut, yt, 0) > -1;
    }
    function Iu(ut, yt, mt) {
      for (var Wt = -1, de = ut == null ? 0 : ut.length; ++Wt < de; )
        if (mt(yt, ut[Wt]))
          return !0;
      return !1;
    }
    function tn(ut, yt) {
      for (var mt = -1, Wt = ut == null ? 0 : ut.length, de = Array(Wt); ++mt < Wt; )
        de[mt] = yt(ut[mt], mt, ut);
      return de;
    }
    function Rr(ut, yt) {
      for (var mt = -1, Wt = yt.length, de = ut.length; ++mt < Wt; )
        ut[de + mt] = yt[mt];
      return ut;
    }
    function Eu(ut, yt, mt, Wt) {
      var de = -1, Fe = ut == null ? 0 : ut.length;
      for (Wt && Fe && (mt = ut[++de]); ++de < Fe; )
        mt = yt(mt, ut[de], de, ut);
      return mt;
    }
    function qg(ut, yt, mt, Wt) {
      var de = ut == null ? 0 : ut.length;
      for (Wt && de && (mt = ut[--de]); de--; )
        mt = yt(mt, ut[de], de, ut);
      return mt;
    }
    function ku(ut, yt) {
      for (var mt = -1, Wt = ut == null ? 0 : ut.length; ++mt < Wt; )
        if (yt(ut[mt], mt, ut))
          return !0;
      return !1;
    }
    var Wg = Lu("length");
    function Yg(ut) {
      return ut.split("");
    }
    function Hg(ut) {
      return ut.match(pt) || [];
    }
    function ff(ut, yt, mt) {
      var Wt;
      return mt(ut, function(de, Fe, Sn) {
        if (yt(de, Fe, Sn))
          return Wt = Fe, !1;
      }), Wt;
    }
    function oo(ut, yt, mt, Wt) {
      for (var de = ut.length, Fe = mt + (Wt ? 1 : -1); Wt ? Fe-- : ++Fe < de; )
        if (yt(ut[Fe], Fe, ut))
          return Fe;
      return -1;
    }
    function Es(ut, yt, mt) {
      return yt === yt ? r0(ut, yt, mt) : oo(ut, cf, mt);
    }
    function Xg(ut, yt, mt, Wt) {
      for (var de = mt - 1, Fe = ut.length; ++de < Fe; )
        if (Wt(ut[de], yt))
          return de;
      return -1;
    }
    function cf(ut) {
      return ut !== ut;
    }
    function df(ut, yt) {
      var mt = ut == null ? 0 : ut.length;
      return mt ? Du(ut, yt) / mt : ae;
    }
    function Lu(ut) {
      return function(yt) {
        return yt == null ? r : yt[ut];
      };
    }
    function Ru(ut) {
      return function(yt) {
        return ut == null ? r : ut[yt];
      };
    }
    function _f(ut, yt, mt, Wt, de) {
      return de(ut, function(Fe, Sn, Ye) {
        mt = Wt ? (Wt = !1, Fe) : yt(mt, Fe, Sn, Ye);
      }), mt;
    }
    function Gg(ut, yt) {
      var mt = ut.length;
      for (ut.sort(yt); mt--; )
        ut[mt] = ut[mt].value;
      return ut;
    }
    function Du(ut, yt) {
      for (var mt, Wt = -1, de = ut.length; ++Wt < de; ) {
        var Fe = yt(ut[Wt]);
        Fe !== r && (mt = mt === r ? Fe : mt + Fe);
      }
      return mt;
    }
    function zu(ut, yt) {
      for (var mt = -1, Wt = Array(ut); ++mt < ut; )
        Wt[mt] = yt(mt);
      return Wt;
    }
    function Zg(ut, yt) {
      return tn(yt, function(mt) {
        return [mt, ut[mt]];
      });
    }
    function gf(ut) {
      return ut && ut.slice(0, yf(ut) + 1).replace(Q, "");
    }
    function Si(ut) {
      return function(yt) {
        return ut(yt);
      };
    }
    function Bu(ut, yt) {
      return tn(yt, function(mt) {
        return ut[mt];
      });
    }
    function ma(ut, yt) {
      return ut.has(yt);
    }
    function vf(ut, yt) {
      for (var mt = -1, Wt = ut.length; ++mt < Wt && Es(yt, ut[mt], 0) > -1; )
        ;
      return mt;
    }
    function pf(ut, yt) {
      for (var mt = ut.length; mt-- && Es(yt, ut[mt], 0) > -1; )
        ;
      return mt;
    }
    function Kg(ut, yt) {
      for (var mt = ut.length, Wt = 0; mt--; )
        ut[mt] === yt && ++Wt;
      return Wt;
    }
    var Jg = Ru(Rg), jg = Ru(Dg);
    function Qg(ut) {
      return "\\" + Bg[ut];
    }
    function t0(ut, yt) {
      return ut == null ? r : ut[yt];
    }
    function ks(ut) {
      return Ig.test(ut);
    }
    function e0(ut) {
      return Eg.test(ut);
    }
    function n0(ut) {
      for (var yt, mt = []; !(yt = ut.next()).done; )
        mt.push(yt.value);
      return mt;
    }
    function Nu(ut) {
      var yt = -1, mt = Array(ut.size);
      return ut.forEach(function(Wt, de) {
        mt[++yt] = [de, Wt];
      }), mt;
    }
    function mf(ut, yt) {
      return function(mt) {
        return ut(yt(mt));
      };
    }
    function Dr(ut, yt) {
      for (var mt = -1, Wt = ut.length, de = 0, Fe = []; ++mt < Wt; ) {
        var Sn = ut[mt];
        (Sn === yt || Sn === S) && (ut[mt] = S, Fe[de++] = mt);
      }
      return Fe;
    }
    function uo(ut) {
      var yt = -1, mt = Array(ut.size);
      return ut.forEach(function(Wt) {
        mt[++yt] = Wt;
      }), mt;
    }
    function i0(ut) {
      var yt = -1, mt = Array(ut.size);
      return ut.forEach(function(Wt) {
        mt[++yt] = [Wt, Wt];
      }), mt;
    }
    function r0(ut, yt, mt) {
      for (var Wt = mt - 1, de = ut.length; ++Wt < de; )
        if (ut[Wt] === yt)
          return Wt;
      return -1;
    }
    function s0(ut, yt, mt) {
      for (var Wt = mt + 1; Wt--; )
        if (ut[Wt] === yt)
          return Wt;
      return Wt;
    }
    function Ls(ut) {
      return ks(ut) ? o0(ut) : Wg(ut);
    }
    function Ji(ut) {
      return ks(ut) ? u0(ut) : Yg(ut);
    }
    function yf(ut) {
      for (var yt = ut.length; yt-- && nt.test(ut.charAt(yt)); )
        ;
      return yt;
    }
    var a0 = Ru(zg);
    function o0(ut) {
      for (var yt = Pu.lastIndex = 0; Pu.test(ut); )
        ++yt;
      return yt;
    }
    function u0(ut) {
      return ut.match(Pu) || [];
    }
    function l0(ut) {
      return ut.match(Mg) || [];
    }
    var h0 = function ut(yt) {
      yt = yt == null ? Ln : Rs.defaults(Ln.Object(), yt, Rs.pick(Ln, kg));
      var mt = yt.Array, Wt = yt.Date, de = yt.Error, Fe = yt.Function, Sn = yt.Math, Ye = yt.Object, Fu = yt.RegExp, f0 = yt.String, Fi = yt.TypeError, lo = mt.prototype, c0 = Fe.prototype, Ds = Ye.prototype, ho = yt["__core-js_shared__"], fo = c0.toString, Ue = Ds.hasOwnProperty, d0 = 0, wf = function() {
        var n = /[^.]+$/.exec(ho && ho.keys && ho.keys.IE_PROTO || "");
        return n ? "Symbol(src)_1." + n : "";
      }(), co = Ds.toString, _0 = fo.call(Ye), g0 = Ln._, v0 = Fu(
        "^" + fo.call(Ue).replace(tt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), _o = nf ? yt.Buffer : r, zr = yt.Symbol, go = yt.Uint8Array, xf = _o ? _o.allocUnsafe : r, vo = mf(Ye.getPrototypeOf, Ye), bf = Ye.create, Sf = Ds.propertyIsEnumerable, po = lo.splice, Cf = zr ? zr.isConcatSpreadable : r, ya = zr ? zr.iterator : r, os = zr ? zr.toStringTag : r, mo = function() {
        try {
          var n = cs(Ye, "defineProperty");
          return n({}, "", {}), n;
        } catch {
        }
      }(), p0 = yt.clearTimeout !== Ln.clearTimeout && yt.clearTimeout, m0 = Wt && Wt.now !== Ln.Date.now && Wt.now, y0 = yt.setTimeout !== Ln.setTimeout && yt.setTimeout, yo = Sn.ceil, wo = Sn.floor, $u = Ye.getOwnPropertySymbols, w0 = _o ? _o.isBuffer : r, Tf = yt.isFinite, x0 = lo.join, b0 = mf(Ye.keys, Ye), Cn = Sn.max, qn = Sn.min, S0 = Wt.now, C0 = yt.parseInt, Af = Sn.random, T0 = lo.reverse, Vu = cs(yt, "DataView"), wa = cs(yt, "Map"), Uu = cs(yt, "Promise"), zs = cs(yt, "Set"), xa = cs(yt, "WeakMap"), ba = cs(Ye, "create"), xo = xa && new xa(), Bs = {}, A0 = ds(Vu), P0 = ds(wa), O0 = ds(Uu), M0 = ds(zs), I0 = ds(xa), bo = zr ? zr.prototype : r, Sa = bo ? bo.valueOf : r, Pf = bo ? bo.toString : r;
      function H(n) {
        if (fn(n) && !ge(n) && !(n instanceof Me)) {
          if (n instanceof $i)
            return n;
          if (Ue.call(n, "__wrapped__"))
            return Oc(n);
        }
        return new $i(n);
      }
      var Ns = function() {
        function n() {
        }
        return function(s) {
          if (!on(s))
            return {};
          if (bf)
            return bf(s);
          n.prototype = s;
          var _ = new n();
          return n.prototype = r, _;
        };
      }();
      function So() {
      }
      function $i(n, s) {
        this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!s, this.__index__ = 0, this.__values__ = r;
      }
      H.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: R,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: V,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: W,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: H
        }
      }, H.prototype = So.prototype, H.prototype.constructor = H, $i.prototype = Ns(So.prototype), $i.prototype.constructor = $i;
      function Me(n) {
        this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = he, this.__views__ = [];
      }
      function E0() {
        var n = new Me(this.__wrapped__);
        return n.__actions__ = oi(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = oi(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = oi(this.__views__), n;
      }
      function k0() {
        if (this.__filtered__) {
          var n = new Me(this);
          n.__dir__ = -1, n.__filtered__ = !0;
        } else
          n = this.clone(), n.__dir__ *= -1;
        return n;
      }
      function L0() {
        var n = this.__wrapped__.value(), s = this.__dir__, _ = ge(n), P = s < 0, F = _ ? n.length : 0, X = Yv(0, F, this.__views__), et = X.start, rt = X.end, ft = rt - et, xt = P ? rt : et - 1, St = this.__iteratees__, Tt = St.length, Nt = 0, Zt = qn(ft, this.__takeCount__);
        if (!_ || !P && F == ft && Zt == ft)
          return Jf(n, this.__actions__);
        var re = [];
        t:
          for (; ft-- && Nt < Zt; ) {
            xt += s;
            for (var we = -1, se = n[xt]; ++we < Tt; ) {
              var Ce = St[we], Ee = Ce.iteratee, Ai = Ce.type, Qn = Ee(se);
              if (Ai == Dt)
                se = Qn;
              else if (!Qn) {
                if (Ai == bt)
                  continue t;
                break t;
              }
            }
            re[Nt++] = se;
          }
        return re;
      }
      Me.prototype = Ns(So.prototype), Me.prototype.constructor = Me;
      function us(n) {
        var s = -1, _ = n == null ? 0 : n.length;
        for (this.clear(); ++s < _; ) {
          var P = n[s];
          this.set(P[0], P[1]);
        }
      }
      function R0() {
        this.__data__ = ba ? ba(null) : {}, this.size = 0;
      }
      function D0(n) {
        var s = this.has(n) && delete this.__data__[n];
        return this.size -= s ? 1 : 0, s;
      }
      function z0(n) {
        var s = this.__data__;
        if (ba) {
          var _ = s[n];
          return _ === b ? r : _;
        }
        return Ue.call(s, n) ? s[n] : r;
      }
      function B0(n) {
        var s = this.__data__;
        return ba ? s[n] !== r : Ue.call(s, n);
      }
      function N0(n, s) {
        var _ = this.__data__;
        return this.size += this.has(n) ? 0 : 1, _[n] = ba && s === r ? b : s, this;
      }
      us.prototype.clear = R0, us.prototype.delete = D0, us.prototype.get = z0, us.prototype.has = B0, us.prototype.set = N0;
      function vr(n) {
        var s = -1, _ = n == null ? 0 : n.length;
        for (this.clear(); ++s < _; ) {
          var P = n[s];
          this.set(P[0], P[1]);
        }
      }
      function F0() {
        this.__data__ = [], this.size = 0;
      }
      function $0(n) {
        var s = this.__data__, _ = Co(s, n);
        if (_ < 0)
          return !1;
        var P = s.length - 1;
        return _ == P ? s.pop() : po.call(s, _, 1), --this.size, !0;
      }
      function V0(n) {
        var s = this.__data__, _ = Co(s, n);
        return _ < 0 ? r : s[_][1];
      }
      function U0(n) {
        return Co(this.__data__, n) > -1;
      }
      function q0(n, s) {
        var _ = this.__data__, P = Co(_, n);
        return P < 0 ? (++this.size, _.push([n, s])) : _[P][1] = s, this;
      }
      vr.prototype.clear = F0, vr.prototype.delete = $0, vr.prototype.get = V0, vr.prototype.has = U0, vr.prototype.set = q0;
      function pr(n) {
        var s = -1, _ = n == null ? 0 : n.length;
        for (this.clear(); ++s < _; ) {
          var P = n[s];
          this.set(P[0], P[1]);
        }
      }
      function W0() {
        this.size = 0, this.__data__ = {
          hash: new us(),
          map: new (wa || vr)(),
          string: new us()
        };
      }
      function Y0(n) {
        var s = zo(this, n).delete(n);
        return this.size -= s ? 1 : 0, s;
      }
      function H0(n) {
        return zo(this, n).get(n);
      }
      function X0(n) {
        return zo(this, n).has(n);
      }
      function G0(n, s) {
        var _ = zo(this, n), P = _.size;
        return _.set(n, s), this.size += _.size == P ? 0 : 1, this;
      }
      pr.prototype.clear = W0, pr.prototype.delete = Y0, pr.prototype.get = H0, pr.prototype.has = X0, pr.prototype.set = G0;
      function ls(n) {
        var s = -1, _ = n == null ? 0 : n.length;
        for (this.__data__ = new pr(); ++s < _; )
          this.add(n[s]);
      }
      function Z0(n) {
        return this.__data__.set(n, b), this;
      }
      function K0(n) {
        return this.__data__.has(n);
      }
      ls.prototype.add = ls.prototype.push = Z0, ls.prototype.has = K0;
      function ji(n) {
        var s = this.__data__ = new vr(n);
        this.size = s.size;
      }
      function J0() {
        this.__data__ = new vr(), this.size = 0;
      }
      function j0(n) {
        var s = this.__data__, _ = s.delete(n);
        return this.size = s.size, _;
      }
      function Q0(n) {
        return this.__data__.get(n);
      }
      function tv(n) {
        return this.__data__.has(n);
      }
      function ev(n, s) {
        var _ = this.__data__;
        if (_ instanceof vr) {
          var P = _.__data__;
          if (!wa || P.length < l - 1)
            return P.push([n, s]), this.size = ++_.size, this;
          _ = this.__data__ = new pr(P);
        }
        return _.set(n, s), this.size = _.size, this;
      }
      ji.prototype.clear = J0, ji.prototype.delete = j0, ji.prototype.get = Q0, ji.prototype.has = tv, ji.prototype.set = ev;
      function Of(n, s) {
        var _ = ge(n), P = !_ && _s(n), F = !_ && !P && Vr(n), X = !_ && !P && !F && Us(n), et = _ || P || F || X, rt = et ? zu(n.length, f0) : [], ft = rt.length;
        for (var xt in n)
          (s || Ue.call(n, xt)) && !(et && // Safari 9 has enumerable `arguments.length` in strict mode.
          (xt == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          F && (xt == "offset" || xt == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          X && (xt == "buffer" || xt == "byteLength" || xt == "byteOffset") || // Skip index properties.
          xr(xt, ft))) && rt.push(xt);
        return rt;
      }
      function Mf(n) {
        var s = n.length;
        return s ? n[Qu(0, s - 1)] : r;
      }
      function nv(n, s) {
        return Bo(oi(n), hs(s, 0, n.length));
      }
      function iv(n) {
        return Bo(oi(n));
      }
      function qu(n, s, _) {
        (_ !== r && !Qi(n[s], _) || _ === r && !(s in n)) && mr(n, s, _);
      }
      function Ca(n, s, _) {
        var P = n[s];
        (!(Ue.call(n, s) && Qi(P, _)) || _ === r && !(s in n)) && mr(n, s, _);
      }
      function Co(n, s) {
        for (var _ = n.length; _--; )
          if (Qi(n[_][0], s))
            return _;
        return -1;
      }
      function rv(n, s, _, P) {
        return Br(n, function(F, X, et) {
          s(P, F, _(F), et);
        }), P;
      }
      function If(n, s) {
        return n && sr(s, Pn(s), n);
      }
      function sv(n, s) {
        return n && sr(s, li(s), n);
      }
      function mr(n, s, _) {
        s == "__proto__" && mo ? mo(n, s, {
          configurable: !0,
          enumerable: !0,
          value: _,
          writable: !0
        }) : n[s] = _;
      }
      function Wu(n, s) {
        for (var _ = -1, P = s.length, F = mt(P), X = n == null; ++_ < P; )
          F[_] = X ? r : Cl(n, s[_]);
        return F;
      }
      function hs(n, s, _) {
        return n === n && (_ !== r && (n = n <= _ ? n : _), s !== r && (n = n >= s ? n : s)), n;
      }
      function Vi(n, s, _, P, F, X) {
        var et, rt = s & A, ft = s & k, xt = s & y;
        if (_ && (et = F ? _(n, P, F, X) : _(n)), et !== r)
          return et;
        if (!on(n))
          return n;
        var St = ge(n);
        if (St) {
          if (et = Xv(n), !rt)
            return oi(n, et);
        } else {
          var Tt = Wn(n), Nt = Tt == jt || Tt == Se;
          if (Vr(n))
            return tc(n, rt);
          if (Tt == Ae || Tt == oe || Nt && !F) {
            if (et = ft || Nt ? {} : yc(n), !rt)
              return ft ? zv(n, sv(et, n)) : Dv(n, If(et, n));
          } else {
            if (!Je[Tt])
              return F ? n : {};
            et = Gv(n, Tt, rt);
          }
        }
        X || (X = new ji());
        var Zt = X.get(n);
        if (Zt)
          return Zt;
        X.set(n, et), Gc(n) ? n.forEach(function(se) {
          et.add(Vi(se, s, _, se, n, X));
        }) : Hc(n) && n.forEach(function(se, Ce) {
          et.set(Ce, Vi(se, s, _, Ce, n, X));
        });
        var re = xt ? ft ? hl : ll : ft ? li : Pn, we = St ? r : re(n);
        return Ni(we || n, function(se, Ce) {
          we && (Ce = se, se = n[Ce]), Ca(et, Ce, Vi(se, s, _, Ce, n, X));
        }), et;
      }
      function av(n) {
        var s = Pn(n);
        return function(_) {
          return Ef(_, n, s);
        };
      }
      function Ef(n, s, _) {
        var P = _.length;
        if (n == null)
          return !P;
        for (n = Ye(n); P--; ) {
          var F = _[P], X = s[F], et = n[F];
          if (et === r && !(F in n) || !X(et))
            return !1;
        }
        return !0;
      }
      function kf(n, s, _) {
        if (typeof n != "function")
          throw new Fi(c);
        return Ea(function() {
          n.apply(r, _);
        }, s);
      }
      function Ta(n, s, _, P) {
        var F = -1, X = ao, et = !0, rt = n.length, ft = [], xt = s.length;
        if (!rt)
          return ft;
        _ && (s = tn(s, Si(_))), P ? (X = Iu, et = !1) : s.length >= l && (X = ma, et = !1, s = new ls(s));
        t:
          for (; ++F < rt; ) {
            var St = n[F], Tt = _ == null ? St : _(St);
            if (St = P || St !== 0 ? St : 0, et && Tt === Tt) {
              for (var Nt = xt; Nt--; )
                if (s[Nt] === Tt)
                  continue t;
              ft.push(St);
            } else
              X(s, Tt, P) || ft.push(St);
          }
        return ft;
      }
      var Br = sc(rr), Lf = sc(Hu, !0);
      function ov(n, s) {
        var _ = !0;
        return Br(n, function(P, F, X) {
          return _ = !!s(P, F, X), _;
        }), _;
      }
      function To(n, s, _) {
        for (var P = -1, F = n.length; ++P < F; ) {
          var X = n[P], et = s(X);
          if (et != null && (rt === r ? et === et && !Ti(et) : _(et, rt)))
            var rt = et, ft = X;
        }
        return ft;
      }
      function uv(n, s, _, P) {
        var F = n.length;
        for (_ = me(_), _ < 0 && (_ = -_ > F ? 0 : F + _), P = P === r || P > F ? F : me(P), P < 0 && (P += F), P = _ > P ? 0 : Kc(P); _ < P; )
          n[_++] = s;
        return n;
      }
      function Rf(n, s) {
        var _ = [];
        return Br(n, function(P, F, X) {
          s(P, F, X) && _.push(P);
        }), _;
      }
      function Rn(n, s, _, P, F) {
        var X = -1, et = n.length;
        for (_ || (_ = Kv), F || (F = []); ++X < et; ) {
          var rt = n[X];
          s > 0 && _(rt) ? s > 1 ? Rn(rt, s - 1, _, P, F) : Rr(F, rt) : P || (F[F.length] = rt);
        }
        return F;
      }
      var Yu = ac(), Df = ac(!0);
      function rr(n, s) {
        return n && Yu(n, s, Pn);
      }
      function Hu(n, s) {
        return n && Df(n, s, Pn);
      }
      function Ao(n, s) {
        return Lr(s, function(_) {
          return br(n[_]);
        });
      }
      function fs(n, s) {
        s = Fr(s, n);
        for (var _ = 0, P = s.length; n != null && _ < P; )
          n = n[ar(s[_++])];
        return _ && _ == P ? n : r;
      }
      function zf(n, s, _) {
        var P = s(n);
        return ge(n) ? P : Rr(P, _(n));
      }
      function Jn(n) {
        return n == null ? n === r ? ce : Te : os && os in Ye(n) ? Wv(n) : ip(n);
      }
      function Xu(n, s) {
        return n > s;
      }
      function lv(n, s) {
        return n != null && Ue.call(n, s);
      }
      function hv(n, s) {
        return n != null && s in Ye(n);
      }
      function fv(n, s, _) {
        return n >= qn(s, _) && n < Cn(s, _);
      }
      function Gu(n, s, _) {
        for (var P = _ ? Iu : ao, F = n[0].length, X = n.length, et = X, rt = mt(X), ft = 1 / 0, xt = []; et--; ) {
          var St = n[et];
          et && s && (St = tn(St, Si(s))), ft = qn(St.length, ft), rt[et] = !_ && (s || F >= 120 && St.length >= 120) ? new ls(et && St) : r;
        }
        St = n[0];
        var Tt = -1, Nt = rt[0];
        t:
          for (; ++Tt < F && xt.length < ft; ) {
            var Zt = St[Tt], re = s ? s(Zt) : Zt;
            if (Zt = _ || Zt !== 0 ? Zt : 0, !(Nt ? ma(Nt, re) : P(xt, re, _))) {
              for (et = X; --et; ) {
                var we = rt[et];
                if (!(we ? ma(we, re) : P(n[et], re, _)))
                  continue t;
              }
              Nt && Nt.push(re), xt.push(Zt);
            }
          }
        return xt;
      }
      function cv(n, s, _, P) {
        return rr(n, function(F, X, et) {
          s(P, _(F), X, et);
        }), P;
      }
      function Aa(n, s, _) {
        s = Fr(s, n), n = Sc(n, s);
        var P = n == null ? n : n[ar(qi(s))];
        return P == null ? r : bi(P, n, _);
      }
      function Bf(n) {
        return fn(n) && Jn(n) == oe;
      }
      function dv(n) {
        return fn(n) && Jn(n) == a;
      }
      function _v(n) {
        return fn(n) && Jn(n) == wt;
      }
      function Pa(n, s, _, P, F) {
        return n === s ? !0 : n == null || s == null || !fn(n) && !fn(s) ? n !== n && s !== s : gv(n, s, _, P, Pa, F);
      }
      function gv(n, s, _, P, F, X) {
        var et = ge(n), rt = ge(s), ft = et ? qe : Wn(n), xt = rt ? qe : Wn(s);
        ft = ft == oe ? Ae : ft, xt = xt == oe ? Ae : xt;
        var St = ft == Ae, Tt = xt == Ae, Nt = ft == xt;
        if (Nt && Vr(n)) {
          if (!Vr(s))
            return !1;
          et = !0, St = !1;
        }
        if (Nt && !St)
          return X || (X = new ji()), et || Us(n) ? vc(n, s, _, P, F, X) : Uv(n, s, ft, _, P, F, X);
        if (!(_ & D)) {
          var Zt = St && Ue.call(n, "__wrapped__"), re = Tt && Ue.call(s, "__wrapped__");
          if (Zt || re) {
            var we = Zt ? n.value() : n, se = re ? s.value() : s;
            return X || (X = new ji()), F(we, se, _, P, X);
          }
        }
        return Nt ? (X || (X = new ji()), qv(n, s, _, P, F, X)) : !1;
      }
      function vv(n) {
        return fn(n) && Wn(n) == Le;
      }
      function Zu(n, s, _, P) {
        var F = _.length, X = F, et = !P;
        if (n == null)
          return !X;
        for (n = Ye(n); F--; ) {
          var rt = _[F];
          if (et && rt[2] ? rt[1] !== n[rt[0]] : !(rt[0] in n))
            return !1;
        }
        for (; ++F < X; ) {
          rt = _[F];
          var ft = rt[0], xt = n[ft], St = rt[1];
          if (et && rt[2]) {
            if (xt === r && !(ft in n))
              return !1;
          } else {
            var Tt = new ji();
            if (P)
              var Nt = P(xt, St, ft, n, s, Tt);
            if (!(Nt === r ? Pa(St, xt, D | C, P, Tt) : Nt))
              return !1;
          }
        }
        return !0;
      }
      function Nf(n) {
        if (!on(n) || jv(n))
          return !1;
        var s = br(n) ? v0 : Gt;
        return s.test(ds(n));
      }
      function pv(n) {
        return fn(n) && Jn(n) == Be;
      }
      function mv(n) {
        return fn(n) && Wn(n) == _n;
      }
      function yv(n) {
        return fn(n) && qo(n.length) && !!Qe[Jn(n)];
      }
      function Ff(n) {
        return typeof n == "function" ? n : n == null ? hi : typeof n == "object" ? ge(n) ? Uf(n[0], n[1]) : Vf(n) : od(n);
      }
      function Ku(n) {
        if (!Ia(n))
          return b0(n);
        var s = [];
        for (var _ in Ye(n))
          Ue.call(n, _) && _ != "constructor" && s.push(_);
        return s;
      }
      function wv(n) {
        if (!on(n))
          return np(n);
        var s = Ia(n), _ = [];
        for (var P in n)
          P == "constructor" && (s || !Ue.call(n, P)) || _.push(P);
        return _;
      }
      function Ju(n, s) {
        return n < s;
      }
      function $f(n, s) {
        var _ = -1, P = ui(n) ? mt(n.length) : [];
        return Br(n, function(F, X, et) {
          P[++_] = s(F, X, et);
        }), P;
      }
      function Vf(n) {
        var s = cl(n);
        return s.length == 1 && s[0][2] ? xc(s[0][0], s[0][1]) : function(_) {
          return _ === n || Zu(_, n, s);
        };
      }
      function Uf(n, s) {
        return _l(n) && wc(s) ? xc(ar(n), s) : function(_) {
          var P = Cl(_, n);
          return P === r && P === s ? Tl(_, n) : Pa(s, P, D | C);
        };
      }
      function Po(n, s, _, P, F) {
        n !== s && Yu(s, function(X, et) {
          if (F || (F = new ji()), on(X))
            xv(n, s, et, _, Po, P, F);
          else {
            var rt = P ? P(vl(n, et), X, et + "", n, s, F) : r;
            rt === r && (rt = X), qu(n, et, rt);
          }
        }, li);
      }
      function xv(n, s, _, P, F, X, et) {
        var rt = vl(n, _), ft = vl(s, _), xt = et.get(ft);
        if (xt) {
          qu(n, _, xt);
          return;
        }
        var St = X ? X(rt, ft, _ + "", n, s, et) : r, Tt = St === r;
        if (Tt) {
          var Nt = ge(ft), Zt = !Nt && Vr(ft), re = !Nt && !Zt && Us(ft);
          St = ft, Nt || Zt || re ? ge(rt) ? St = rt : gn(rt) ? St = oi(rt) : Zt ? (Tt = !1, St = tc(ft, !0)) : re ? (Tt = !1, St = ec(ft, !0)) : St = [] : ka(ft) || _s(ft) ? (St = rt, _s(rt) ? St = Jc(rt) : (!on(rt) || br(rt)) && (St = yc(ft))) : Tt = !1;
        }
        Tt && (et.set(ft, St), F(St, ft, P, X, et), et.delete(ft)), qu(n, _, St);
      }
      function qf(n, s) {
        var _ = n.length;
        if (_)
          return s += s < 0 ? _ : 0, xr(s, _) ? n[s] : r;
      }
      function Wf(n, s, _) {
        s.length ? s = tn(s, function(X) {
          return ge(X) ? function(et) {
            return fs(et, X.length === 1 ? X[0] : X);
          } : X;
        }) : s = [hi];
        var P = -1;
        s = tn(s, Si(ne()));
        var F = $f(n, function(X, et, rt) {
          var ft = tn(s, function(xt) {
            return xt(X);
          });
          return { criteria: ft, index: ++P, value: X };
        });
        return Gg(F, function(X, et) {
          return Rv(X, et, _);
        });
      }
      function bv(n, s) {
        return Yf(n, s, function(_, P) {
          return Tl(n, P);
        });
      }
      function Yf(n, s, _) {
        for (var P = -1, F = s.length, X = {}; ++P < F; ) {
          var et = s[P], rt = fs(n, et);
          _(rt, et) && Oa(X, Fr(et, n), rt);
        }
        return X;
      }
      function Sv(n) {
        return function(s) {
          return fs(s, n);
        };
      }
      function ju(n, s, _, P) {
        var F = P ? Xg : Es, X = -1, et = s.length, rt = n;
        for (n === s && (s = oi(s)), _ && (rt = tn(n, Si(_))); ++X < et; )
          for (var ft = 0, xt = s[X], St = _ ? _(xt) : xt; (ft = F(rt, St, ft, P)) > -1; )
            rt !== n && po.call(rt, ft, 1), po.call(n, ft, 1);
        return n;
      }
      function Hf(n, s) {
        for (var _ = n ? s.length : 0, P = _ - 1; _--; ) {
          var F = s[_];
          if (_ == P || F !== X) {
            var X = F;
            xr(F) ? po.call(n, F, 1) : nl(n, F);
          }
        }
        return n;
      }
      function Qu(n, s) {
        return n + wo(Af() * (s - n + 1));
      }
      function Cv(n, s, _, P) {
        for (var F = -1, X = Cn(yo((s - n) / (_ || 1)), 0), et = mt(X); X--; )
          et[P ? X : ++F] = n, n += _;
        return et;
      }
      function tl(n, s) {
        var _ = "";
        if (!n || s < 1 || s > Yt)
          return _;
        do
          s % 2 && (_ += n), s = wo(s / 2), s && (n += n);
        while (s);
        return _;
      }
      function be(n, s) {
        return pl(bc(n, s, hi), n + "");
      }
      function Tv(n) {
        return Mf(qs(n));
      }
      function Av(n, s) {
        var _ = qs(n);
        return Bo(_, hs(s, 0, _.length));
      }
      function Oa(n, s, _, P) {
        if (!on(n))
          return n;
        s = Fr(s, n);
        for (var F = -1, X = s.length, et = X - 1, rt = n; rt != null && ++F < X; ) {
          var ft = ar(s[F]), xt = _;
          if (ft === "__proto__" || ft === "constructor" || ft === "prototype")
            return n;
          if (F != et) {
            var St = rt[ft];
            xt = P ? P(St, ft, rt) : r, xt === r && (xt = on(St) ? St : xr(s[F + 1]) ? [] : {});
          }
          Ca(rt, ft, xt), rt = rt[ft];
        }
        return n;
      }
      var Xf = xo ? function(n, s) {
        return xo.set(n, s), n;
      } : hi, Pv = mo ? function(n, s) {
        return mo(n, "toString", {
          configurable: !0,
          enumerable: !1,
          value: Pl(s),
          writable: !0
        });
      } : hi;
      function Ov(n) {
        return Bo(qs(n));
      }
      function Ui(n, s, _) {
        var P = -1, F = n.length;
        s < 0 && (s = -s > F ? 0 : F + s), _ = _ > F ? F : _, _ < 0 && (_ += F), F = s > _ ? 0 : _ - s >>> 0, s >>>= 0;
        for (var X = mt(F); ++P < F; )
          X[P] = n[P + s];
        return X;
      }
      function Mv(n, s) {
        var _;
        return Br(n, function(P, F, X) {
          return _ = s(P, F, X), !_;
        }), !!_;
      }
      function Oo(n, s, _) {
        var P = 0, F = n == null ? P : n.length;
        if (typeof s == "number" && s === s && F <= rn) {
          for (; P < F; ) {
            var X = P + F >>> 1, et = n[X];
            et !== null && !Ti(et) && (_ ? et <= s : et < s) ? P = X + 1 : F = X;
          }
          return F;
        }
        return el(n, s, hi, _);
      }
      function el(n, s, _, P) {
        var F = 0, X = n == null ? 0 : n.length;
        if (X === 0)
          return 0;
        s = _(s);
        for (var et = s !== s, rt = s === null, ft = Ti(s), xt = s === r; F < X; ) {
          var St = wo((F + X) / 2), Tt = _(n[St]), Nt = Tt !== r, Zt = Tt === null, re = Tt === Tt, we = Ti(Tt);
          if (et)
            var se = P || re;
          else
            xt ? se = re && (P || Nt) : rt ? se = re && Nt && (P || !Zt) : ft ? se = re && Nt && !Zt && (P || !we) : Zt || we ? se = !1 : se = P ? Tt <= s : Tt < s;
          se ? F = St + 1 : X = St;
        }
        return qn(X, Ie);
      }
      function Gf(n, s) {
        for (var _ = -1, P = n.length, F = 0, X = []; ++_ < P; ) {
          var et = n[_], rt = s ? s(et) : et;
          if (!_ || !Qi(rt, ft)) {
            var ft = rt;
            X[F++] = et === 0 ? 0 : et;
          }
        }
        return X;
      }
      function Zf(n) {
        return typeof n == "number" ? n : Ti(n) ? ae : +n;
      }
      function Ci(n) {
        if (typeof n == "string")
          return n;
        if (ge(n))
          return tn(n, Ci) + "";
        if (Ti(n))
          return Pf ? Pf.call(n) : "";
        var s = n + "";
        return s == "0" && 1 / n == -$t ? "-0" : s;
      }
      function Nr(n, s, _) {
        var P = -1, F = ao, X = n.length, et = !0, rt = [], ft = rt;
        if (_)
          et = !1, F = Iu;
        else if (X >= l) {
          var xt = s ? null : $v(n);
          if (xt)
            return uo(xt);
          et = !1, F = ma, ft = new ls();
        } else
          ft = s ? [] : rt;
        t:
          for (; ++P < X; ) {
            var St = n[P], Tt = s ? s(St) : St;
            if (St = _ || St !== 0 ? St : 0, et && Tt === Tt) {
              for (var Nt = ft.length; Nt--; )
                if (ft[Nt] === Tt)
                  continue t;
              s && ft.push(Tt), rt.push(St);
            } else
              F(ft, Tt, _) || (ft !== rt && ft.push(Tt), rt.push(St));
          }
        return rt;
      }
      function nl(n, s) {
        return s = Fr(s, n), n = Sc(n, s), n == null || delete n[ar(qi(s))];
      }
      function Kf(n, s, _, P) {
        return Oa(n, s, _(fs(n, s)), P);
      }
      function Mo(n, s, _, P) {
        for (var F = n.length, X = P ? F : -1; (P ? X-- : ++X < F) && s(n[X], X, n); )
          ;
        return _ ? Ui(n, P ? 0 : X, P ? X + 1 : F) : Ui(n, P ? X + 1 : 0, P ? F : X);
      }
      function Jf(n, s) {
        var _ = n;
        return _ instanceof Me && (_ = _.value()), Eu(s, function(P, F) {
          return F.func.apply(F.thisArg, Rr([P], F.args));
        }, _);
      }
      function il(n, s, _) {
        var P = n.length;
        if (P < 2)
          return P ? Nr(n[0]) : [];
        for (var F = -1, X = mt(P); ++F < P; )
          for (var et = n[F], rt = -1; ++rt < P; )
            rt != F && (X[F] = Ta(X[F] || et, n[rt], s, _));
        return Nr(Rn(X, 1), s, _);
      }
      function jf(n, s, _) {
        for (var P = -1, F = n.length, X = s.length, et = {}; ++P < F; ) {
          var rt = P < X ? s[P] : r;
          _(et, n[P], rt);
        }
        return et;
      }
      function rl(n) {
        return gn(n) ? n : [];
      }
      function sl(n) {
        return typeof n == "function" ? n : hi;
      }
      function Fr(n, s) {
        return ge(n) ? n : _l(n, s) ? [n] : Pc($e(n));
      }
      var Iv = be;
      function $r(n, s, _) {
        var P = n.length;
        return _ = _ === r ? P : _, !s && _ >= P ? n : Ui(n, s, _);
      }
      var Qf = p0 || function(n) {
        return Ln.clearTimeout(n);
      };
      function tc(n, s) {
        if (s)
          return n.slice();
        var _ = n.length, P = xf ? xf(_) : new n.constructor(_);
        return n.copy(P), P;
      }
      function al(n) {
        var s = new n.constructor(n.byteLength);
        return new go(s).set(new go(n)), s;
      }
      function Ev(n, s) {
        var _ = s ? al(n.buffer) : n.buffer;
        return new n.constructor(_, n.byteOffset, n.byteLength);
      }
      function kv(n) {
        var s = new n.constructor(n.source, Qt.exec(n));
        return s.lastIndex = n.lastIndex, s;
      }
      function Lv(n) {
        return Sa ? Ye(Sa.call(n)) : {};
      }
      function ec(n, s) {
        var _ = s ? al(n.buffer) : n.buffer;
        return new n.constructor(_, n.byteOffset, n.length);
      }
      function nc(n, s) {
        if (n !== s) {
          var _ = n !== r, P = n === null, F = n === n, X = Ti(n), et = s !== r, rt = s === null, ft = s === s, xt = Ti(s);
          if (!rt && !xt && !X && n > s || X && et && ft && !rt && !xt || P && et && ft || !_ && ft || !F)
            return 1;
          if (!P && !X && !xt && n < s || xt && _ && F && !P && !X || rt && _ && F || !et && F || !ft)
            return -1;
        }
        return 0;
      }
      function Rv(n, s, _) {
        for (var P = -1, F = n.criteria, X = s.criteria, et = F.length, rt = _.length; ++P < et; ) {
          var ft = nc(F[P], X[P]);
          if (ft) {
            if (P >= rt)
              return ft;
            var xt = _[P];
            return ft * (xt == "desc" ? -1 : 1);
          }
        }
        return n.index - s.index;
      }
      function ic(n, s, _, P) {
        for (var F = -1, X = n.length, et = _.length, rt = -1, ft = s.length, xt = Cn(X - et, 0), St = mt(ft + xt), Tt = !P; ++rt < ft; )
          St[rt] = s[rt];
        for (; ++F < et; )
          (Tt || F < X) && (St[_[F]] = n[F]);
        for (; xt--; )
          St[rt++] = n[F++];
        return St;
      }
      function rc(n, s, _, P) {
        for (var F = -1, X = n.length, et = -1, rt = _.length, ft = -1, xt = s.length, St = Cn(X - rt, 0), Tt = mt(St + xt), Nt = !P; ++F < St; )
          Tt[F] = n[F];
        for (var Zt = F; ++ft < xt; )
          Tt[Zt + ft] = s[ft];
        for (; ++et < rt; )
          (Nt || F < X) && (Tt[Zt + _[et]] = n[F++]);
        return Tt;
      }
      function oi(n, s) {
        var _ = -1, P = n.length;
        for (s || (s = mt(P)); ++_ < P; )
          s[_] = n[_];
        return s;
      }
      function sr(n, s, _, P) {
        var F = !_;
        _ || (_ = {});
        for (var X = -1, et = s.length; ++X < et; ) {
          var rt = s[X], ft = P ? P(_[rt], n[rt], rt, _, n) : r;
          ft === r && (ft = n[rt]), F ? mr(_, rt, ft) : Ca(_, rt, ft);
        }
        return _;
      }
      function Dv(n, s) {
        return sr(n, dl(n), s);
      }
      function zv(n, s) {
        return sr(n, pc(n), s);
      }
      function Io(n, s) {
        return function(_, P) {
          var F = ge(_) ? Vg : rv, X = s ? s() : {};
          return F(_, n, ne(P, 2), X);
        };
      }
      function Fs(n) {
        return be(function(s, _) {
          var P = -1, F = _.length, X = F > 1 ? _[F - 1] : r, et = F > 2 ? _[2] : r;
          for (X = n.length > 3 && typeof X == "function" ? (F--, X) : r, et && jn(_[0], _[1], et) && (X = F < 3 ? r : X, F = 1), s = Ye(s); ++P < F; ) {
            var rt = _[P];
            rt && n(s, rt, P, X);
          }
          return s;
        });
      }
      function sc(n, s) {
        return function(_, P) {
          if (_ == null)
            return _;
          if (!ui(_))
            return n(_, P);
          for (var F = _.length, X = s ? F : -1, et = Ye(_); (s ? X-- : ++X < F) && P(et[X], X, et) !== !1; )
            ;
          return _;
        };
      }
      function ac(n) {
        return function(s, _, P) {
          for (var F = -1, X = Ye(s), et = P(s), rt = et.length; rt--; ) {
            var ft = et[n ? rt : ++F];
            if (_(X[ft], ft, X) === !1)
              break;
          }
          return s;
        };
      }
      function Bv(n, s, _) {
        var P = s & U, F = Ma(n);
        function X() {
          var et = this && this !== Ln && this instanceof X ? F : n;
          return et.apply(P ? _ : this, arguments);
        }
        return X;
      }
      function oc(n) {
        return function(s) {
          s = $e(s);
          var _ = ks(s) ? Ji(s) : r, P = _ ? _[0] : s.charAt(0), F = _ ? $r(_, 1).join("") : s.slice(1);
          return P[n]() + F;
        };
      }
      function $s(n) {
        return function(s) {
          return Eu(sd(rd(s).replace(Pg, "")), n, "");
        };
      }
      function Ma(n) {
        return function() {
          var s = arguments;
          switch (s.length) {
            case 0:
              return new n();
            case 1:
              return new n(s[0]);
            case 2:
              return new n(s[0], s[1]);
            case 3:
              return new n(s[0], s[1], s[2]);
            case 4:
              return new n(s[0], s[1], s[2], s[3]);
            case 5:
              return new n(s[0], s[1], s[2], s[3], s[4]);
            case 6:
              return new n(s[0], s[1], s[2], s[3], s[4], s[5]);
            case 7:
              return new n(s[0], s[1], s[2], s[3], s[4], s[5], s[6]);
          }
          var _ = Ns(n.prototype), P = n.apply(_, s);
          return on(P) ? P : _;
        };
      }
      function Nv(n, s, _) {
        var P = Ma(n);
        function F() {
          for (var X = arguments.length, et = mt(X), rt = X, ft = Vs(F); rt--; )
            et[rt] = arguments[rt];
          var xt = X < 3 && et[0] !== ft && et[X - 1] !== ft ? [] : Dr(et, ft);
          if (X -= xt.length, X < _)
            return cc(
              n,
              s,
              Eo,
              F.placeholder,
              r,
              et,
              xt,
              r,
              r,
              _ - X
            );
          var St = this && this !== Ln && this instanceof F ? P : n;
          return bi(St, this, et);
        }
        return F;
      }
      function uc(n) {
        return function(s, _, P) {
          var F = Ye(s);
          if (!ui(s)) {
            var X = ne(_, 3);
            s = Pn(s), _ = function(rt) {
              return X(F[rt], rt, F);
            };
          }
          var et = n(s, _, P);
          return et > -1 ? F[X ? s[et] : et] : r;
        };
      }
      function lc(n) {
        return wr(function(s) {
          var _ = s.length, P = _, F = $i.prototype.thru;
          for (n && s.reverse(); P--; ) {
            var X = s[P];
            if (typeof X != "function")
              throw new Fi(c);
            if (F && !et && Do(X) == "wrapper")
              var et = new $i([], !0);
          }
          for (P = et ? P : _; ++P < _; ) {
            X = s[P];
            var rt = Do(X), ft = rt == "wrapper" ? fl(X) : r;
            ft && gl(ft[0]) && ft[1] == (ht | K | lt | _t) && !ft[4].length && ft[9] == 1 ? et = et[Do(ft[0])].apply(et, ft[3]) : et = X.length == 1 && gl(X) ? et[rt]() : et.thru(X);
          }
          return function() {
            var xt = arguments, St = xt[0];
            if (et && xt.length == 1 && ge(St))
              return et.plant(St).value();
            for (var Tt = 0, Nt = _ ? s[Tt].apply(this, xt) : St; ++Tt < _; )
              Nt = s[Tt].call(this, Nt);
            return Nt;
          };
        });
      }
      function Eo(n, s, _, P, F, X, et, rt, ft, xt) {
        var St = s & ht, Tt = s & U, Nt = s & $, Zt = s & (K | ot), re = s & at, we = Nt ? r : Ma(n);
        function se() {
          for (var Ce = arguments.length, Ee = mt(Ce), Ai = Ce; Ai--; )
            Ee[Ai] = arguments[Ai];
          if (Zt)
            var Qn = Vs(se), Pi = Kg(Ee, Qn);
          if (P && (Ee = ic(Ee, P, F, Zt)), X && (Ee = rc(Ee, X, et, Zt)), Ce -= Pi, Zt && Ce < xt) {
            var vn = Dr(Ee, Qn);
            return cc(
              n,
              s,
              Eo,
              se.placeholder,
              _,
              Ee,
              vn,
              rt,
              ft,
              xt - Ce
            );
          }
          var tr = Tt ? _ : this, Cr = Nt ? tr[n] : n;
          return Ce = Ee.length, rt ? Ee = rp(Ee, rt) : re && Ce > 1 && Ee.reverse(), St && ft < Ce && (Ee.length = ft), this && this !== Ln && this instanceof se && (Cr = we || Ma(Cr)), Cr.apply(tr, Ee);
        }
        return se;
      }
      function hc(n, s) {
        return function(_, P) {
          return cv(_, n, s(P), {});
        };
      }
      function ko(n, s) {
        return function(_, P) {
          var F;
          if (_ === r && P === r)
            return s;
          if (_ !== r && (F = _), P !== r) {
            if (F === r)
              return P;
            typeof _ == "string" || typeof P == "string" ? (_ = Ci(_), P = Ci(P)) : (_ = Zf(_), P = Zf(P)), F = n(_, P);
          }
          return F;
        };
      }
      function ol(n) {
        return wr(function(s) {
          return s = tn(s, Si(ne())), be(function(_) {
            var P = this;
            return n(s, function(F) {
              return bi(F, P, _);
            });
          });
        });
      }
      function Lo(n, s) {
        s = s === r ? " " : Ci(s);
        var _ = s.length;
        if (_ < 2)
          return _ ? tl(s, n) : s;
        var P = tl(s, yo(n / Ls(s)));
        return ks(s) ? $r(Ji(P), 0, n).join("") : P.slice(0, n);
      }
      function Fv(n, s, _, P) {
        var F = s & U, X = Ma(n);
        function et() {
          for (var rt = -1, ft = arguments.length, xt = -1, St = P.length, Tt = mt(St + ft), Nt = this && this !== Ln && this instanceof et ? X : n; ++xt < St; )
            Tt[xt] = P[xt];
          for (; ft--; )
            Tt[xt++] = arguments[++rt];
          return bi(Nt, F ? _ : this, Tt);
        }
        return et;
      }
      function fc(n) {
        return function(s, _, P) {
          return P && typeof P != "number" && jn(s, _, P) && (_ = P = r), s = Sr(s), _ === r ? (_ = s, s = 0) : _ = Sr(_), P = P === r ? s < _ ? 1 : -1 : Sr(P), Cv(s, _, P, n);
        };
      }
      function Ro(n) {
        return function(s, _) {
          return typeof s == "string" && typeof _ == "string" || (s = Wi(s), _ = Wi(_)), n(s, _);
        };
      }
      function cc(n, s, _, P, F, X, et, rt, ft, xt) {
        var St = s & K, Tt = St ? et : r, Nt = St ? r : et, Zt = St ? X : r, re = St ? r : X;
        s |= St ? lt : ct, s &= ~(St ? ct : lt), s & Z || (s &= ~(U | $));
        var we = [
          n,
          s,
          F,
          Zt,
          Tt,
          re,
          Nt,
          rt,
          ft,
          xt
        ], se = _.apply(r, we);
        return gl(n) && Cc(se, we), se.placeholder = P, Tc(se, n, s);
      }
      function ul(n) {
        var s = Sn[n];
        return function(_, P) {
          if (_ = Wi(_), P = P == null ? 0 : qn(me(P), 292), P && Tf(_)) {
            var F = ($e(_) + "e").split("e"), X = s(F[0] + "e" + (+F[1] + P));
            return F = ($e(X) + "e").split("e"), +(F[0] + "e" + (+F[1] - P));
          }
          return s(_);
        };
      }
      var $v = zs && 1 / uo(new zs([, -0]))[1] == $t ? function(n) {
        return new zs(n);
      } : Il;
      function dc(n) {
        return function(s) {
          var _ = Wn(s);
          return _ == Le ? Nu(s) : _ == _n ? i0(s) : Zg(s, n(s));
        };
      }
      function yr(n, s, _, P, F, X, et, rt) {
        var ft = s & $;
        if (!ft && typeof n != "function")
          throw new Fi(c);
        var xt = P ? P.length : 0;
        if (xt || (s &= ~(lt | ct), P = F = r), et = et === r ? et : Cn(me(et), 0), rt = rt === r ? rt : me(rt), xt -= F ? F.length : 0, s & ct) {
          var St = P, Tt = F;
          P = F = r;
        }
        var Nt = ft ? r : fl(n), Zt = [
          n,
          s,
          _,
          P,
          F,
          St,
          Tt,
          X,
          et,
          rt
        ];
        if (Nt && ep(Zt, Nt), n = Zt[0], s = Zt[1], _ = Zt[2], P = Zt[3], F = Zt[4], rt = Zt[9] = Zt[9] === r ? ft ? 0 : n.length : Cn(Zt[9] - xt, 0), !rt && s & (K | ot) && (s &= ~(K | ot)), !s || s == U)
          var re = Bv(n, s, _);
        else
          s == K || s == ot ? re = Nv(n, s, rt) : (s == lt || s == (U | lt)) && !F.length ? re = Fv(n, s, _, P) : re = Eo.apply(r, Zt);
        var we = Nt ? Xf : Cc;
        return Tc(we(re, Zt), n, s);
      }
      function _c(n, s, _, P) {
        return n === r || Qi(n, Ds[_]) && !Ue.call(P, _) ? s : n;
      }
      function gc(n, s, _, P, F, X) {
        return on(n) && on(s) && (X.set(s, n), Po(n, s, r, gc, X), X.delete(s)), n;
      }
      function Vv(n) {
        return ka(n) ? r : n;
      }
      function vc(n, s, _, P, F, X) {
        var et = _ & D, rt = n.length, ft = s.length;
        if (rt != ft && !(et && ft > rt))
          return !1;
        var xt = X.get(n), St = X.get(s);
        if (xt && St)
          return xt == s && St == n;
        var Tt = -1, Nt = !0, Zt = _ & C ? new ls() : r;
        for (X.set(n, s), X.set(s, n); ++Tt < rt; ) {
          var re = n[Tt], we = s[Tt];
          if (P)
            var se = et ? P(we, re, Tt, s, n, X) : P(re, we, Tt, n, s, X);
          if (se !== r) {
            if (se)
              continue;
            Nt = !1;
            break;
          }
          if (Zt) {
            if (!ku(s, function(Ce, Ee) {
              if (!ma(Zt, Ee) && (re === Ce || F(re, Ce, _, P, X)))
                return Zt.push(Ee);
            })) {
              Nt = !1;
              break;
            }
          } else if (!(re === we || F(re, we, _, P, X))) {
            Nt = !1;
            break;
          }
        }
        return X.delete(n), X.delete(s), Nt;
      }
      function Uv(n, s, _, P, F, X, et) {
        switch (_) {
          case f:
            if (n.byteLength != s.byteLength || n.byteOffset != s.byteOffset)
              return !1;
            n = n.buffer, s = s.buffer;
          case a:
            return !(n.byteLength != s.byteLength || !X(new go(n), new go(s)));
          case Ct:
          case wt:
          case Ge:
            return Qi(+n, +s);
          case zt:
            return n.name == s.name && n.message == s.message;
          case Be:
          case Re:
            return n == s + "";
          case Le:
            var rt = Nu;
          case _n:
            var ft = P & D;
            if (rt || (rt = uo), n.size != s.size && !ft)
              return !1;
            var xt = et.get(n);
            if (xt)
              return xt == s;
            P |= C, et.set(n, s);
            var St = vc(rt(n), rt(s), P, F, X, et);
            return et.delete(n), St;
          case yi:
            if (Sa)
              return Sa.call(n) == Sa.call(s);
        }
        return !1;
      }
      function qv(n, s, _, P, F, X) {
        var et = _ & D, rt = ll(n), ft = rt.length, xt = ll(s), St = xt.length;
        if (ft != St && !et)
          return !1;
        for (var Tt = ft; Tt--; ) {
          var Nt = rt[Tt];
          if (!(et ? Nt in s : Ue.call(s, Nt)))
            return !1;
        }
        var Zt = X.get(n), re = X.get(s);
        if (Zt && re)
          return Zt == s && re == n;
        var we = !0;
        X.set(n, s), X.set(s, n);
        for (var se = et; ++Tt < ft; ) {
          Nt = rt[Tt];
          var Ce = n[Nt], Ee = s[Nt];
          if (P)
            var Ai = et ? P(Ee, Ce, Nt, s, n, X) : P(Ce, Ee, Nt, n, s, X);
          if (!(Ai === r ? Ce === Ee || F(Ce, Ee, _, P, X) : Ai)) {
            we = !1;
            break;
          }
          se || (se = Nt == "constructor");
        }
        if (we && !se) {
          var Qn = n.constructor, Pi = s.constructor;
          Qn != Pi && "constructor" in n && "constructor" in s && !(typeof Qn == "function" && Qn instanceof Qn && typeof Pi == "function" && Pi instanceof Pi) && (we = !1);
        }
        return X.delete(n), X.delete(s), we;
      }
      function wr(n) {
        return pl(bc(n, r, Ec), n + "");
      }
      function ll(n) {
        return zf(n, Pn, dl);
      }
      function hl(n) {
        return zf(n, li, pc);
      }
      var fl = xo ? function(n) {
        return xo.get(n);
      } : Il;
      function Do(n) {
        for (var s = n.name + "", _ = Bs[s], P = Ue.call(Bs, s) ? _.length : 0; P--; ) {
          var F = _[P], X = F.func;
          if (X == null || X == n)
            return F.name;
        }
        return s;
      }
      function Vs(n) {
        var s = Ue.call(H, "placeholder") ? H : n;
        return s.placeholder;
      }
      function ne() {
        var n = H.iteratee || Ol;
        return n = n === Ol ? Ff : n, arguments.length ? n(arguments[0], arguments[1]) : n;
      }
      function zo(n, s) {
        var _ = n.__data__;
        return Jv(s) ? _[typeof s == "string" ? "string" : "hash"] : _.map;
      }
      function cl(n) {
        for (var s = Pn(n), _ = s.length; _--; ) {
          var P = s[_], F = n[P];
          s[_] = [P, F, wc(F)];
        }
        return s;
      }
      function cs(n, s) {
        var _ = t0(n, s);
        return Nf(_) ? _ : r;
      }
      function Wv(n) {
        var s = Ue.call(n, os), _ = n[os];
        try {
          n[os] = r;
          var P = !0;
        } catch {
        }
        var F = co.call(n);
        return P && (s ? n[os] = _ : delete n[os]), F;
      }
      var dl = $u ? function(n) {
        return n == null ? [] : (n = Ye(n), Lr($u(n), function(s) {
          return Sf.call(n, s);
        }));
      } : El, pc = $u ? function(n) {
        for (var s = []; n; )
          Rr(s, dl(n)), n = vo(n);
        return s;
      } : El, Wn = Jn;
      (Vu && Wn(new Vu(new ArrayBuffer(1))) != f || wa && Wn(new wa()) != Le || Uu && Wn(Uu.resolve()) != Fn || zs && Wn(new zs()) != _n || xa && Wn(new xa()) != t) && (Wn = function(n) {
        var s = Jn(n), _ = s == Ae ? n.constructor : r, P = _ ? ds(_) : "";
        if (P)
          switch (P) {
            case A0:
              return f;
            case P0:
              return Le;
            case O0:
              return Fn;
            case M0:
              return _n;
            case I0:
              return t;
          }
        return s;
      });
      function Yv(n, s, _) {
        for (var P = -1, F = _.length; ++P < F; ) {
          var X = _[P], et = X.size;
          switch (X.type) {
            case "drop":
              n += et;
              break;
            case "dropRight":
              s -= et;
              break;
            case "take":
              s = qn(s, n + et);
              break;
            case "takeRight":
              n = Cn(n, s - et);
              break;
          }
        }
        return { start: n, end: s };
      }
      function Hv(n) {
        var s = n.match(dt);
        return s ? s[1].split(gt) : [];
      }
      function mc(n, s, _) {
        s = Fr(s, n);
        for (var P = -1, F = s.length, X = !1; ++P < F; ) {
          var et = ar(s[P]);
          if (!(X = n != null && _(n, et)))
            break;
          n = n[et];
        }
        return X || ++P != F ? X : (F = n == null ? 0 : n.length, !!F && qo(F) && xr(et, F) && (ge(n) || _s(n)));
      }
      function Xv(n) {
        var s = n.length, _ = new n.constructor(s);
        return s && typeof n[0] == "string" && Ue.call(n, "index") && (_.index = n.index, _.input = n.input), _;
      }
      function yc(n) {
        return typeof n.constructor == "function" && !Ia(n) ? Ns(vo(n)) : {};
      }
      function Gv(n, s, _) {
        var P = n.constructor;
        switch (s) {
          case a:
            return al(n);
          case Ct:
          case wt:
            return new P(+n);
          case f:
            return Ev(n, _);
          case d:
          case v:
          case m:
          case p:
          case w:
          case T:
          case E:
          case L:
          case I:
            return ec(n, _);
          case Le:
            return new P();
          case Ge:
          case Re:
            return new P(n);
          case Be:
            return kv(n);
          case _n:
            return new P();
          case yi:
            return Lv(n);
        }
      }
      function Zv(n, s) {
        var _ = s.length;
        if (!_)
          return n;
        var P = _ - 1;
        return s[P] = (_ > 1 ? "& " : "") + s[P], s = s.join(_ > 2 ? ", " : " "), n.replace(st, `{
/* [wrapped with ` + s + `] */
`);
      }
      function Kv(n) {
        return ge(n) || _s(n) || !!(Cf && n && n[Cf]);
      }
      function xr(n, s) {
        var _ = typeof n;
        return s = s ?? Yt, !!s && (_ == "number" || _ != "symbol" && Jt.test(n)) && n > -1 && n % 1 == 0 && n < s;
      }
      function jn(n, s, _) {
        if (!on(_))
          return !1;
        var P = typeof s;
        return (P == "number" ? ui(_) && xr(s, _.length) : P == "string" && s in _) ? Qi(_[s], n) : !1;
      }
      function _l(n, s) {
        if (ge(n))
          return !1;
        var _ = typeof n;
        return _ == "number" || _ == "symbol" || _ == "boolean" || n == null || Ti(n) ? !0 : J.test(n) || !G.test(n) || s != null && n in Ye(s);
      }
      function Jv(n) {
        var s = typeof n;
        return s == "string" || s == "number" || s == "symbol" || s == "boolean" ? n !== "__proto__" : n === null;
      }
      function gl(n) {
        var s = Do(n), _ = H[s];
        if (typeof _ != "function" || !(s in Me.prototype))
          return !1;
        if (n === _)
          return !0;
        var P = fl(_);
        return !!P && n === P[0];
      }
      function jv(n) {
        return !!wf && wf in n;
      }
      var Qv = ho ? br : kl;
      function Ia(n) {
        var s = n && n.constructor, _ = typeof s == "function" && s.prototype || Ds;
        return n === _;
      }
      function wc(n) {
        return n === n && !on(n);
      }
      function xc(n, s) {
        return function(_) {
          return _ == null ? !1 : _[n] === s && (s !== r || n in Ye(_));
        };
      }
      function tp(n) {
        var s = Vo(n, function(P) {
          return _.size === x && _.clear(), P;
        }), _ = s.cache;
        return s;
      }
      function ep(n, s) {
        var _ = n[1], P = s[1], F = _ | P, X = F < (U | $ | ht), et = P == ht && _ == K || P == ht && _ == _t && n[7].length <= s[8] || P == (ht | _t) && s[7].length <= s[8] && _ == K;
        if (!(X || et))
          return n;
        P & U && (n[2] = s[2], F |= _ & U ? 0 : Z);
        var rt = s[3];
        if (rt) {
          var ft = n[3];
          n[3] = ft ? ic(ft, rt, s[4]) : rt, n[4] = ft ? Dr(n[3], S) : s[4];
        }
        return rt = s[5], rt && (ft = n[5], n[5] = ft ? rc(ft, rt, s[6]) : rt, n[6] = ft ? Dr(n[5], S) : s[6]), rt = s[7], rt && (n[7] = rt), P & ht && (n[8] = n[8] == null ? s[8] : qn(n[8], s[8])), n[9] == null && (n[9] = s[9]), n[0] = s[0], n[1] = F, n;
      }
      function np(n) {
        var s = [];
        if (n != null)
          for (var _ in Ye(n))
            s.push(_);
        return s;
      }
      function ip(n) {
        return co.call(n);
      }
      function bc(n, s, _) {
        return s = Cn(s === r ? n.length - 1 : s, 0), function() {
          for (var P = arguments, F = -1, X = Cn(P.length - s, 0), et = mt(X); ++F < X; )
            et[F] = P[s + F];
          F = -1;
          for (var rt = mt(s + 1); ++F < s; )
            rt[F] = P[F];
          return rt[s] = _(et), bi(n, this, rt);
        };
      }
      function Sc(n, s) {
        return s.length < 2 ? n : fs(n, Ui(s, 0, -1));
      }
      function rp(n, s) {
        for (var _ = n.length, P = qn(s.length, _), F = oi(n); P--; ) {
          var X = s[P];
          n[P] = xr(X, _) ? F[X] : r;
        }
        return n;
      }
      function vl(n, s) {
        if (!(s === "constructor" && typeof n[s] == "function") && s != "__proto__")
          return n[s];
      }
      var Cc = Ac(Xf), Ea = y0 || function(n, s) {
        return Ln.setTimeout(n, s);
      }, pl = Ac(Pv);
      function Tc(n, s, _) {
        var P = s + "";
        return pl(n, Zv(P, sp(Hv(P), _)));
      }
      function Ac(n) {
        var s = 0, _ = 0;
        return function() {
          var P = S0(), F = kt - (P - _);
          if (_ = P, F > 0) {
            if (++s >= Et)
              return arguments[0];
          } else
            s = 0;
          return n.apply(r, arguments);
        };
      }
      function Bo(n, s) {
        var _ = -1, P = n.length, F = P - 1;
        for (s = s === r ? P : s; ++_ < s; ) {
          var X = Qu(_, F), et = n[X];
          n[X] = n[_], n[_] = et;
        }
        return n.length = s, n;
      }
      var Pc = tp(function(n) {
        var s = [];
        return n.charCodeAt(0) === 46 && s.push(""), n.replace(j, function(_, P, F, X) {
          s.push(F ? X.replace(It, "$1") : P || _);
        }), s;
      });
      function ar(n) {
        if (typeof n == "string" || Ti(n))
          return n;
        var s = n + "";
        return s == "0" && 1 / n == -$t ? "-0" : s;
      }
      function ds(n) {
        if (n != null) {
          try {
            return fo.call(n);
          } catch {
          }
          try {
            return n + "";
          } catch {
          }
        }
        return "";
      }
      function sp(n, s) {
        return Ni(ye, function(_) {
          var P = "_." + _[0];
          s & _[1] && !ao(n, P) && n.push(P);
        }), n.sort();
      }
      function Oc(n) {
        if (n instanceof Me)
          return n.clone();
        var s = new $i(n.__wrapped__, n.__chain__);
        return s.__actions__ = oi(n.__actions__), s.__index__ = n.__index__, s.__values__ = n.__values__, s;
      }
      function ap(n, s, _) {
        (_ ? jn(n, s, _) : s === r) ? s = 1 : s = Cn(me(s), 0);
        var P = n == null ? 0 : n.length;
        if (!P || s < 1)
          return [];
        for (var F = 0, X = 0, et = mt(yo(P / s)); F < P; )
          et[X++] = Ui(n, F, F += s);
        return et;
      }
      function op(n) {
        for (var s = -1, _ = n == null ? 0 : n.length, P = 0, F = []; ++s < _; ) {
          var X = n[s];
          X && (F[P++] = X);
        }
        return F;
      }
      function up() {
        var n = arguments.length;
        if (!n)
          return [];
        for (var s = mt(n - 1), _ = arguments[0], P = n; P--; )
          s[P - 1] = arguments[P];
        return Rr(ge(_) ? oi(_) : [_], Rn(s, 1));
      }
      var lp = be(function(n, s) {
        return gn(n) ? Ta(n, Rn(s, 1, gn, !0)) : [];
      }), hp = be(function(n, s) {
        var _ = qi(s);
        return gn(_) && (_ = r), gn(n) ? Ta(n, Rn(s, 1, gn, !0), ne(_, 2)) : [];
      }), fp = be(function(n, s) {
        var _ = qi(s);
        return gn(_) && (_ = r), gn(n) ? Ta(n, Rn(s, 1, gn, !0), r, _) : [];
      });
      function cp(n, s, _) {
        var P = n == null ? 0 : n.length;
        return P ? (s = _ || s === r ? 1 : me(s), Ui(n, s < 0 ? 0 : s, P)) : [];
      }
      function dp(n, s, _) {
        var P = n == null ? 0 : n.length;
        return P ? (s = _ || s === r ? 1 : me(s), s = P - s, Ui(n, 0, s < 0 ? 0 : s)) : [];
      }
      function _p(n, s) {
        return n && n.length ? Mo(n, ne(s, 3), !0, !0) : [];
      }
      function gp(n, s) {
        return n && n.length ? Mo(n, ne(s, 3), !0) : [];
      }
      function vp(n, s, _, P) {
        var F = n == null ? 0 : n.length;
        return F ? (_ && typeof _ != "number" && jn(n, s, _) && (_ = 0, P = F), uv(n, s, _, P)) : [];
      }
      function Mc(n, s, _) {
        var P = n == null ? 0 : n.length;
        if (!P)
          return -1;
        var F = _ == null ? 0 : me(_);
        return F < 0 && (F = Cn(P + F, 0)), oo(n, ne(s, 3), F);
      }
      function Ic(n, s, _) {
        var P = n == null ? 0 : n.length;
        if (!P)
          return -1;
        var F = P - 1;
        return _ !== r && (F = me(_), F = _ < 0 ? Cn(P + F, 0) : qn(F, P - 1)), oo(n, ne(s, 3), F, !0);
      }
      function Ec(n) {
        var s = n == null ? 0 : n.length;
        return s ? Rn(n, 1) : [];
      }
      function pp(n) {
        var s = n == null ? 0 : n.length;
        return s ? Rn(n, $t) : [];
      }
      function mp(n, s) {
        var _ = n == null ? 0 : n.length;
        return _ ? (s = s === r ? 1 : me(s), Rn(n, s)) : [];
      }
      function yp(n) {
        for (var s = -1, _ = n == null ? 0 : n.length, P = {}; ++s < _; ) {
          var F = n[s];
          P[F[0]] = F[1];
        }
        return P;
      }
      function kc(n) {
        return n && n.length ? n[0] : r;
      }
      function wp(n, s, _) {
        var P = n == null ? 0 : n.length;
        if (!P)
          return -1;
        var F = _ == null ? 0 : me(_);
        return F < 0 && (F = Cn(P + F, 0)), Es(n, s, F);
      }
      function xp(n) {
        var s = n == null ? 0 : n.length;
        return s ? Ui(n, 0, -1) : [];
      }
      var bp = be(function(n) {
        var s = tn(n, rl);
        return s.length && s[0] === n[0] ? Gu(s) : [];
      }), Sp = be(function(n) {
        var s = qi(n), _ = tn(n, rl);
        return s === qi(_) ? s = r : _.pop(), _.length && _[0] === n[0] ? Gu(_, ne(s, 2)) : [];
      }), Cp = be(function(n) {
        var s = qi(n), _ = tn(n, rl);
        return s = typeof s == "function" ? s : r, s && _.pop(), _.length && _[0] === n[0] ? Gu(_, r, s) : [];
      });
      function Tp(n, s) {
        return n == null ? "" : x0.call(n, s);
      }
      function qi(n) {
        var s = n == null ? 0 : n.length;
        return s ? n[s - 1] : r;
      }
      function Ap(n, s, _) {
        var P = n == null ? 0 : n.length;
        if (!P)
          return -1;
        var F = P;
        return _ !== r && (F = me(_), F = F < 0 ? Cn(P + F, 0) : qn(F, P - 1)), s === s ? s0(n, s, F) : oo(n, cf, F, !0);
      }
      function Pp(n, s) {
        return n && n.length ? qf(n, me(s)) : r;
      }
      var Op = be(Lc);
      function Lc(n, s) {
        return n && n.length && s && s.length ? ju(n, s) : n;
      }
      function Mp(n, s, _) {
        return n && n.length && s && s.length ? ju(n, s, ne(_, 2)) : n;
      }
      function Ip(n, s, _) {
        return n && n.length && s && s.length ? ju(n, s, r, _) : n;
      }
      var Ep = wr(function(n, s) {
        var _ = n == null ? 0 : n.length, P = Wu(n, s);
        return Hf(n, tn(s, function(F) {
          return xr(F, _) ? +F : F;
        }).sort(nc)), P;
      });
      function kp(n, s) {
        var _ = [];
        if (!(n && n.length))
          return _;
        var P = -1, F = [], X = n.length;
        for (s = ne(s, 3); ++P < X; ) {
          var et = n[P];
          s(et, P, n) && (_.push(et), F.push(P));
        }
        return Hf(n, F), _;
      }
      function ml(n) {
        return n == null ? n : T0.call(n);
      }
      function Lp(n, s, _) {
        var P = n == null ? 0 : n.length;
        return P ? (_ && typeof _ != "number" && jn(n, s, _) ? (s = 0, _ = P) : (s = s == null ? 0 : me(s), _ = _ === r ? P : me(_)), Ui(n, s, _)) : [];
      }
      function Rp(n, s) {
        return Oo(n, s);
      }
      function Dp(n, s, _) {
        return el(n, s, ne(_, 2));
      }
      function zp(n, s) {
        var _ = n == null ? 0 : n.length;
        if (_) {
          var P = Oo(n, s);
          if (P < _ && Qi(n[P], s))
            return P;
        }
        return -1;
      }
      function Bp(n, s) {
        return Oo(n, s, !0);
      }
      function Np(n, s, _) {
        return el(n, s, ne(_, 2), !0);
      }
      function Fp(n, s) {
        var _ = n == null ? 0 : n.length;
        if (_) {
          var P = Oo(n, s, !0) - 1;
          if (Qi(n[P], s))
            return P;
        }
        return -1;
      }
      function $p(n) {
        return n && n.length ? Gf(n) : [];
      }
      function Vp(n, s) {
        return n && n.length ? Gf(n, ne(s, 2)) : [];
      }
      function Up(n) {
        var s = n == null ? 0 : n.length;
        return s ? Ui(n, 1, s) : [];
      }
      function qp(n, s, _) {
        return n && n.length ? (s = _ || s === r ? 1 : me(s), Ui(n, 0, s < 0 ? 0 : s)) : [];
      }
      function Wp(n, s, _) {
        var P = n == null ? 0 : n.length;
        return P ? (s = _ || s === r ? 1 : me(s), s = P - s, Ui(n, s < 0 ? 0 : s, P)) : [];
      }
      function Yp(n, s) {
        return n && n.length ? Mo(n, ne(s, 3), !1, !0) : [];
      }
      function Hp(n, s) {
        return n && n.length ? Mo(n, ne(s, 3)) : [];
      }
      var Xp = be(function(n) {
        return Nr(Rn(n, 1, gn, !0));
      }), Gp = be(function(n) {
        var s = qi(n);
        return gn(s) && (s = r), Nr(Rn(n, 1, gn, !0), ne(s, 2));
      }), Zp = be(function(n) {
        var s = qi(n);
        return s = typeof s == "function" ? s : r, Nr(Rn(n, 1, gn, !0), r, s);
      });
      function Kp(n) {
        return n && n.length ? Nr(n) : [];
      }
      function Jp(n, s) {
        return n && n.length ? Nr(n, ne(s, 2)) : [];
      }
      function jp(n, s) {
        return s = typeof s == "function" ? s : r, n && n.length ? Nr(n, r, s) : [];
      }
      function yl(n) {
        if (!(n && n.length))
          return [];
        var s = 0;
        return n = Lr(n, function(_) {
          if (gn(_))
            return s = Cn(_.length, s), !0;
        }), zu(s, function(_) {
          return tn(n, Lu(_));
        });
      }
      function Rc(n, s) {
        if (!(n && n.length))
          return [];
        var _ = yl(n);
        return s == null ? _ : tn(_, function(P) {
          return bi(s, r, P);
        });
      }
      var Qp = be(function(n, s) {
        return gn(n) ? Ta(n, s) : [];
      }), tm = be(function(n) {
        return il(Lr(n, gn));
      }), em = be(function(n) {
        var s = qi(n);
        return gn(s) && (s = r), il(Lr(n, gn), ne(s, 2));
      }), nm = be(function(n) {
        var s = qi(n);
        return s = typeof s == "function" ? s : r, il(Lr(n, gn), r, s);
      }), im = be(yl);
      function rm(n, s) {
        return jf(n || [], s || [], Ca);
      }
      function sm(n, s) {
        return jf(n || [], s || [], Oa);
      }
      var am = be(function(n) {
        var s = n.length, _ = s > 1 ? n[s - 1] : r;
        return _ = typeof _ == "function" ? (n.pop(), _) : r, Rc(n, _);
      });
      function Dc(n) {
        var s = H(n);
        return s.__chain__ = !0, s;
      }
      function om(n, s) {
        return s(n), n;
      }
      function No(n, s) {
        return s(n);
      }
      var um = wr(function(n) {
        var s = n.length, _ = s ? n[0] : 0, P = this.__wrapped__, F = function(X) {
          return Wu(X, n);
        };
        return s > 1 || this.__actions__.length || !(P instanceof Me) || !xr(_) ? this.thru(F) : (P = P.slice(_, +_ + (s ? 1 : 0)), P.__actions__.push({
          func: No,
          args: [F],
          thisArg: r
        }), new $i(P, this.__chain__).thru(function(X) {
          return s && !X.length && X.push(r), X;
        }));
      });
      function lm() {
        return Dc(this);
      }
      function hm() {
        return new $i(this.value(), this.__chain__);
      }
      function fm() {
        this.__values__ === r && (this.__values__ = Zc(this.value()));
        var n = this.__index__ >= this.__values__.length, s = n ? r : this.__values__[this.__index__++];
        return { done: n, value: s };
      }
      function cm() {
        return this;
      }
      function dm(n) {
        for (var s, _ = this; _ instanceof So; ) {
          var P = Oc(_);
          P.__index__ = 0, P.__values__ = r, s ? F.__wrapped__ = P : s = P;
          var F = P;
          _ = _.__wrapped__;
        }
        return F.__wrapped__ = n, s;
      }
      function _m() {
        var n = this.__wrapped__;
        if (n instanceof Me) {
          var s = n;
          return this.__actions__.length && (s = new Me(this)), s = s.reverse(), s.__actions__.push({
            func: No,
            args: [ml],
            thisArg: r
          }), new $i(s, this.__chain__);
        }
        return this.thru(ml);
      }
      function gm() {
        return Jf(this.__wrapped__, this.__actions__);
      }
      var vm = Io(function(n, s, _) {
        Ue.call(n, _) ? ++n[_] : mr(n, _, 1);
      });
      function pm(n, s, _) {
        var P = ge(n) ? hf : ov;
        return _ && jn(n, s, _) && (s = r), P(n, ne(s, 3));
      }
      function mm(n, s) {
        var _ = ge(n) ? Lr : Rf;
        return _(n, ne(s, 3));
      }
      var ym = uc(Mc), wm = uc(Ic);
      function xm(n, s) {
        return Rn(Fo(n, s), 1);
      }
      function bm(n, s) {
        return Rn(Fo(n, s), $t);
      }
      function Sm(n, s, _) {
        return _ = _ === r ? 1 : me(_), Rn(Fo(n, s), _);
      }
      function zc(n, s) {
        var _ = ge(n) ? Ni : Br;
        return _(n, ne(s, 3));
      }
      function Bc(n, s) {
        var _ = ge(n) ? Ug : Lf;
        return _(n, ne(s, 3));
      }
      var Cm = Io(function(n, s, _) {
        Ue.call(n, _) ? n[_].push(s) : mr(n, _, [s]);
      });
      function Tm(n, s, _, P) {
        n = ui(n) ? n : qs(n), _ = _ && !P ? me(_) : 0;
        var F = n.length;
        return _ < 0 && (_ = Cn(F + _, 0)), Wo(n) ? _ <= F && n.indexOf(s, _) > -1 : !!F && Es(n, s, _) > -1;
      }
      var Am = be(function(n, s, _) {
        var P = -1, F = typeof s == "function", X = ui(n) ? mt(n.length) : [];
        return Br(n, function(et) {
          X[++P] = F ? bi(s, et, _) : Aa(et, s, _);
        }), X;
      }), Pm = Io(function(n, s, _) {
        mr(n, _, s);
      });
      function Fo(n, s) {
        var _ = ge(n) ? tn : $f;
        return _(n, ne(s, 3));
      }
      function Om(n, s, _, P) {
        return n == null ? [] : (ge(s) || (s = s == null ? [] : [s]), _ = P ? r : _, ge(_) || (_ = _ == null ? [] : [_]), Wf(n, s, _));
      }
      var Mm = Io(function(n, s, _) {
        n[_ ? 0 : 1].push(s);
      }, function() {
        return [[], []];
      });
      function Im(n, s, _) {
        var P = ge(n) ? Eu : _f, F = arguments.length < 3;
        return P(n, ne(s, 4), _, F, Br);
      }
      function Em(n, s, _) {
        var P = ge(n) ? qg : _f, F = arguments.length < 3;
        return P(n, ne(s, 4), _, F, Lf);
      }
      function km(n, s) {
        var _ = ge(n) ? Lr : Rf;
        return _(n, Uo(ne(s, 3)));
      }
      function Lm(n) {
        var s = ge(n) ? Mf : Tv;
        return s(n);
      }
      function Rm(n, s, _) {
        (_ ? jn(n, s, _) : s === r) ? s = 1 : s = me(s);
        var P = ge(n) ? nv : Av;
        return P(n, s);
      }
      function Dm(n) {
        var s = ge(n) ? iv : Ov;
        return s(n);
      }
      function zm(n) {
        if (n == null)
          return 0;
        if (ui(n))
          return Wo(n) ? Ls(n) : n.length;
        var s = Wn(n);
        return s == Le || s == _n ? n.size : Ku(n).length;
      }
      function Bm(n, s, _) {
        var P = ge(n) ? ku : Mv;
        return _ && jn(n, s, _) && (s = r), P(n, ne(s, 3));
      }
      var Nm = be(function(n, s) {
        if (n == null)
          return [];
        var _ = s.length;
        return _ > 1 && jn(n, s[0], s[1]) ? s = [] : _ > 2 && jn(s[0], s[1], s[2]) && (s = [s[0]]), Wf(n, Rn(s, 1), []);
      }), $o = m0 || function() {
        return Ln.Date.now();
      };
      function Fm(n, s) {
        if (typeof s != "function")
          throw new Fi(c);
        return n = me(n), function() {
          if (--n < 1)
            return s.apply(this, arguments);
        };
      }
      function Nc(n, s, _) {
        return s = _ ? r : s, s = n && s == null ? n.length : s, yr(n, ht, r, r, r, r, s);
      }
      function Fc(n, s) {
        var _;
        if (typeof s != "function")
          throw new Fi(c);
        return n = me(n), function() {
          return --n > 0 && (_ = s.apply(this, arguments)), n <= 1 && (s = r), _;
        };
      }
      var wl = be(function(n, s, _) {
        var P = U;
        if (_.length) {
          var F = Dr(_, Vs(wl));
          P |= lt;
        }
        return yr(n, P, s, _, F);
      }), $c = be(function(n, s, _) {
        var P = U | $;
        if (_.length) {
          var F = Dr(_, Vs($c));
          P |= lt;
        }
        return yr(s, P, n, _, F);
      });
      function Vc(n, s, _) {
        s = _ ? r : s;
        var P = yr(n, K, r, r, r, r, r, s);
        return P.placeholder = Vc.placeholder, P;
      }
      function Uc(n, s, _) {
        s = _ ? r : s;
        var P = yr(n, ot, r, r, r, r, r, s);
        return P.placeholder = Uc.placeholder, P;
      }
      function qc(n, s, _) {
        var P, F, X, et, rt, ft, xt = 0, St = !1, Tt = !1, Nt = !0;
        if (typeof n != "function")
          throw new Fi(c);
        s = Wi(s) || 0, on(_) && (St = !!_.leading, Tt = "maxWait" in _, X = Tt ? Cn(Wi(_.maxWait) || 0, s) : X, Nt = "trailing" in _ ? !!_.trailing : Nt);
        function Zt(vn) {
          var tr = P, Cr = F;
          return P = F = r, xt = vn, et = n.apply(Cr, tr), et;
        }
        function re(vn) {
          return xt = vn, rt = Ea(Ce, s), St ? Zt(vn) : et;
        }
        function we(vn) {
          var tr = vn - ft, Cr = vn - xt, ud = s - tr;
          return Tt ? qn(ud, X - Cr) : ud;
        }
        function se(vn) {
          var tr = vn - ft, Cr = vn - xt;
          return ft === r || tr >= s || tr < 0 || Tt && Cr >= X;
        }
        function Ce() {
          var vn = $o();
          if (se(vn))
            return Ee(vn);
          rt = Ea(Ce, we(vn));
        }
        function Ee(vn) {
          return rt = r, Nt && P ? Zt(vn) : (P = F = r, et);
        }
        function Ai() {
          rt !== r && Qf(rt), xt = 0, P = ft = F = rt = r;
        }
        function Qn() {
          return rt === r ? et : Ee($o());
        }
        function Pi() {
          var vn = $o(), tr = se(vn);
          if (P = arguments, F = this, ft = vn, tr) {
            if (rt === r)
              return re(ft);
            if (Tt)
              return Qf(rt), rt = Ea(Ce, s), Zt(ft);
          }
          return rt === r && (rt = Ea(Ce, s)), et;
        }
        return Pi.cancel = Ai, Pi.flush = Qn, Pi;
      }
      var $m = be(function(n, s) {
        return kf(n, 1, s);
      }), Vm = be(function(n, s, _) {
        return kf(n, Wi(s) || 0, _);
      });
      function Um(n) {
        return yr(n, at);
      }
      function Vo(n, s) {
        if (typeof n != "function" || s != null && typeof s != "function")
          throw new Fi(c);
        var _ = function() {
          var P = arguments, F = s ? s.apply(this, P) : P[0], X = _.cache;
          if (X.has(F))
            return X.get(F);
          var et = n.apply(this, P);
          return _.cache = X.set(F, et) || X, et;
        };
        return _.cache = new (Vo.Cache || pr)(), _;
      }
      Vo.Cache = pr;
      function Uo(n) {
        if (typeof n != "function")
          throw new Fi(c);
        return function() {
          var s = arguments;
          switch (s.length) {
            case 0:
              return !n.call(this);
            case 1:
              return !n.call(this, s[0]);
            case 2:
              return !n.call(this, s[0], s[1]);
            case 3:
              return !n.call(this, s[0], s[1], s[2]);
          }
          return !n.apply(this, s);
        };
      }
      function qm(n) {
        return Fc(2, n);
      }
      var Wm = Iv(function(n, s) {
        s = s.length == 1 && ge(s[0]) ? tn(s[0], Si(ne())) : tn(Rn(s, 1), Si(ne()));
        var _ = s.length;
        return be(function(P) {
          for (var F = -1, X = qn(P.length, _); ++F < X; )
            P[F] = s[F].call(this, P[F]);
          return bi(n, this, P);
        });
      }), xl = be(function(n, s) {
        var _ = Dr(s, Vs(xl));
        return yr(n, lt, r, s, _);
      }), Wc = be(function(n, s) {
        var _ = Dr(s, Vs(Wc));
        return yr(n, ct, r, s, _);
      }), Ym = wr(function(n, s) {
        return yr(n, _t, r, r, r, s);
      });
      function Hm(n, s) {
        if (typeof n != "function")
          throw new Fi(c);
        return s = s === r ? s : me(s), be(n, s);
      }
      function Xm(n, s) {
        if (typeof n != "function")
          throw new Fi(c);
        return s = s == null ? 0 : Cn(me(s), 0), be(function(_) {
          var P = _[s], F = $r(_, 0, s);
          return P && Rr(F, P), bi(n, this, F);
        });
      }
      function Gm(n, s, _) {
        var P = !0, F = !0;
        if (typeof n != "function")
          throw new Fi(c);
        return on(_) && (P = "leading" in _ ? !!_.leading : P, F = "trailing" in _ ? !!_.trailing : F), qc(n, s, {
          leading: P,
          maxWait: s,
          trailing: F
        });
      }
      function Zm(n) {
        return Nc(n, 1);
      }
      function Km(n, s) {
        return xl(sl(s), n);
      }
      function Jm() {
        if (!arguments.length)
          return [];
        var n = arguments[0];
        return ge(n) ? n : [n];
      }
      function jm(n) {
        return Vi(n, y);
      }
      function Qm(n, s) {
        return s = typeof s == "function" ? s : r, Vi(n, y, s);
      }
      function t1(n) {
        return Vi(n, A | y);
      }
      function e1(n, s) {
        return s = typeof s == "function" ? s : r, Vi(n, A | y, s);
      }
      function n1(n, s) {
        return s == null || Ef(n, s, Pn(s));
      }
      function Qi(n, s) {
        return n === s || n !== n && s !== s;
      }
      var i1 = Ro(Xu), r1 = Ro(function(n, s) {
        return n >= s;
      }), _s = Bf(function() {
        return arguments;
      }()) ? Bf : function(n) {
        return fn(n) && Ue.call(n, "callee") && !Sf.call(n, "callee");
      }, ge = mt.isArray, s1 = rf ? Si(rf) : dv;
      function ui(n) {
        return n != null && qo(n.length) && !br(n);
      }
      function gn(n) {
        return fn(n) && ui(n);
      }
      function a1(n) {
        return n === !0 || n === !1 || fn(n) && Jn(n) == Ct;
      }
      var Vr = w0 || kl, o1 = sf ? Si(sf) : _v;
      function u1(n) {
        return fn(n) && n.nodeType === 1 && !ka(n);
      }
      function l1(n) {
        if (n == null)
          return !0;
        if (ui(n) && (ge(n) || typeof n == "string" || typeof n.splice == "function" || Vr(n) || Us(n) || _s(n)))
          return !n.length;
        var s = Wn(n);
        if (s == Le || s == _n)
          return !n.size;
        if (Ia(n))
          return !Ku(n).length;
        for (var _ in n)
          if (Ue.call(n, _))
            return !1;
        return !0;
      }
      function h1(n, s) {
        return Pa(n, s);
      }
      function f1(n, s, _) {
        _ = typeof _ == "function" ? _ : r;
        var P = _ ? _(n, s) : r;
        return P === r ? Pa(n, s, r, _) : !!P;
      }
      function bl(n) {
        if (!fn(n))
          return !1;
        var s = Jn(n);
        return s == zt || s == Lt || typeof n.message == "string" && typeof n.name == "string" && !ka(n);
      }
      function c1(n) {
        return typeof n == "number" && Tf(n);
      }
      function br(n) {
        if (!on(n))
          return !1;
        var s = Jn(n);
        return s == jt || s == Se || s == si || s == ir;
      }
      function Yc(n) {
        return typeof n == "number" && n == me(n);
      }
      function qo(n) {
        return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Yt;
      }
      function on(n) {
        var s = typeof n;
        return n != null && (s == "object" || s == "function");
      }
      function fn(n) {
        return n != null && typeof n == "object";
      }
      var Hc = af ? Si(af) : vv;
      function d1(n, s) {
        return n === s || Zu(n, s, cl(s));
      }
      function _1(n, s, _) {
        return _ = typeof _ == "function" ? _ : r, Zu(n, s, cl(s), _);
      }
      function g1(n) {
        return Xc(n) && n != +n;
      }
      function v1(n) {
        if (Qv(n))
          throw new de(h);
        return Nf(n);
      }
      function p1(n) {
        return n === null;
      }
      function m1(n) {
        return n == null;
      }
      function Xc(n) {
        return typeof n == "number" || fn(n) && Jn(n) == Ge;
      }
      function ka(n) {
        if (!fn(n) || Jn(n) != Ae)
          return !1;
        var s = vo(n);
        if (s === null)
          return !0;
        var _ = Ue.call(s, "constructor") && s.constructor;
        return typeof _ == "function" && _ instanceof _ && fo.call(_) == _0;
      }
      var Sl = of ? Si(of) : pv;
      function y1(n) {
        return Yc(n) && n >= -Yt && n <= Yt;
      }
      var Gc = uf ? Si(uf) : mv;
      function Wo(n) {
        return typeof n == "string" || !ge(n) && fn(n) && Jn(n) == Re;
      }
      function Ti(n) {
        return typeof n == "symbol" || fn(n) && Jn(n) == yi;
      }
      var Us = lf ? Si(lf) : yv;
      function w1(n) {
        return n === r;
      }
      function x1(n) {
        return fn(n) && Wn(n) == t;
      }
      function b1(n) {
        return fn(n) && Jn(n) == i;
      }
      var S1 = Ro(Ju), C1 = Ro(function(n, s) {
        return n <= s;
      });
      function Zc(n) {
        if (!n)
          return [];
        if (ui(n))
          return Wo(n) ? Ji(n) : oi(n);
        if (ya && n[ya])
          return n0(n[ya]());
        var s = Wn(n), _ = s == Le ? Nu : s == _n ? uo : qs;
        return _(n);
      }
      function Sr(n) {
        if (!n)
          return n === 0 ? n : 0;
        if (n = Wi(n), n === $t || n === -$t) {
          var s = n < 0 ? -1 : 1;
          return s * Bt;
        }
        return n === n ? n : 0;
      }
      function me(n) {
        var s = Sr(n), _ = s % 1;
        return s === s ? _ ? s - _ : s : 0;
      }
      function Kc(n) {
        return n ? hs(me(n), 0, he) : 0;
      }
      function Wi(n) {
        if (typeof n == "number")
          return n;
        if (Ti(n))
          return ae;
        if (on(n)) {
          var s = typeof n.valueOf == "function" ? n.valueOf() : n;
          n = on(s) ? s + "" : s;
        }
        if (typeof n != "string")
          return n === 0 ? n : +n;
        n = gf(n);
        var _ = Xt.test(n);
        return _ || ee.test(n) ? Fg(n.slice(2), _ ? 2 : 8) : qt.test(n) ? ae : +n;
      }
      function Jc(n) {
        return sr(n, li(n));
      }
      function T1(n) {
        return n ? hs(me(n), -Yt, Yt) : n === 0 ? n : 0;
      }
      function $e(n) {
        return n == null ? "" : Ci(n);
      }
      var A1 = Fs(function(n, s) {
        if (Ia(s) || ui(s)) {
          sr(s, Pn(s), n);
          return;
        }
        for (var _ in s)
          Ue.call(s, _) && Ca(n, _, s[_]);
      }), jc = Fs(function(n, s) {
        sr(s, li(s), n);
      }), Yo = Fs(function(n, s, _, P) {
        sr(s, li(s), n, P);
      }), P1 = Fs(function(n, s, _, P) {
        sr(s, Pn(s), n, P);
      }), O1 = wr(Wu);
      function M1(n, s) {
        var _ = Ns(n);
        return s == null ? _ : If(_, s);
      }
      var I1 = be(function(n, s) {
        n = Ye(n);
        var _ = -1, P = s.length, F = P > 2 ? s[2] : r;
        for (F && jn(s[0], s[1], F) && (P = 1); ++_ < P; )
          for (var X = s[_], et = li(X), rt = -1, ft = et.length; ++rt < ft; ) {
            var xt = et[rt], St = n[xt];
            (St === r || Qi(St, Ds[xt]) && !Ue.call(n, xt)) && (n[xt] = X[xt]);
          }
        return n;
      }), E1 = be(function(n) {
        return n.push(r, gc), bi(Qc, r, n);
      });
      function k1(n, s) {
        return ff(n, ne(s, 3), rr);
      }
      function L1(n, s) {
        return ff(n, ne(s, 3), Hu);
      }
      function R1(n, s) {
        return n == null ? n : Yu(n, ne(s, 3), li);
      }
      function D1(n, s) {
        return n == null ? n : Df(n, ne(s, 3), li);
      }
      function z1(n, s) {
        return n && rr(n, ne(s, 3));
      }
      function B1(n, s) {
        return n && Hu(n, ne(s, 3));
      }
      function N1(n) {
        return n == null ? [] : Ao(n, Pn(n));
      }
      function F1(n) {
        return n == null ? [] : Ao(n, li(n));
      }
      function Cl(n, s, _) {
        var P = n == null ? r : fs(n, s);
        return P === r ? _ : P;
      }
      function $1(n, s) {
        return n != null && mc(n, s, lv);
      }
      function Tl(n, s) {
        return n != null && mc(n, s, hv);
      }
      var V1 = hc(function(n, s, _) {
        s != null && typeof s.toString != "function" && (s = co.call(s)), n[s] = _;
      }, Pl(hi)), U1 = hc(function(n, s, _) {
        s != null && typeof s.toString != "function" && (s = co.call(s)), Ue.call(n, s) ? n[s].push(_) : n[s] = [_];
      }, ne), q1 = be(Aa);
      function Pn(n) {
        return ui(n) ? Of(n) : Ku(n);
      }
      function li(n) {
        return ui(n) ? Of(n, !0) : wv(n);
      }
      function W1(n, s) {
        var _ = {};
        return s = ne(s, 3), rr(n, function(P, F, X) {
          mr(_, s(P, F, X), P);
        }), _;
      }
      function Y1(n, s) {
        var _ = {};
        return s = ne(s, 3), rr(n, function(P, F, X) {
          mr(_, F, s(P, F, X));
        }), _;
      }
      var H1 = Fs(function(n, s, _) {
        Po(n, s, _);
      }), Qc = Fs(function(n, s, _, P) {
        Po(n, s, _, P);
      }), X1 = wr(function(n, s) {
        var _ = {};
        if (n == null)
          return _;
        var P = !1;
        s = tn(s, function(X) {
          return X = Fr(X, n), P || (P = X.length > 1), X;
        }), sr(n, hl(n), _), P && (_ = Vi(_, A | k | y, Vv));
        for (var F = s.length; F--; )
          nl(_, s[F]);
        return _;
      });
      function G1(n, s) {
        return td(n, Uo(ne(s)));
      }
      var Z1 = wr(function(n, s) {
        return n == null ? {} : bv(n, s);
      });
      function td(n, s) {
        if (n == null)
          return {};
        var _ = tn(hl(n), function(P) {
          return [P];
        });
        return s = ne(s), Yf(n, _, function(P, F) {
          return s(P, F[0]);
        });
      }
      function K1(n, s, _) {
        s = Fr(s, n);
        var P = -1, F = s.length;
        for (F || (F = 1, n = r); ++P < F; ) {
          var X = n == null ? r : n[ar(s[P])];
          X === r && (P = F, X = _), n = br(X) ? X.call(n) : X;
        }
        return n;
      }
      function J1(n, s, _) {
        return n == null ? n : Oa(n, s, _);
      }
      function j1(n, s, _, P) {
        return P = typeof P == "function" ? P : r, n == null ? n : Oa(n, s, _, P);
      }
      var ed = dc(Pn), nd = dc(li);
      function Q1(n, s, _) {
        var P = ge(n), F = P || Vr(n) || Us(n);
        if (s = ne(s, 4), _ == null) {
          var X = n && n.constructor;
          F ? _ = P ? new X() : [] : on(n) ? _ = br(X) ? Ns(vo(n)) : {} : _ = {};
        }
        return (F ? Ni : rr)(n, function(et, rt, ft) {
          return s(_, et, rt, ft);
        }), _;
      }
      function ty(n, s) {
        return n == null ? !0 : nl(n, s);
      }
      function ey(n, s, _) {
        return n == null ? n : Kf(n, s, sl(_));
      }
      function ny(n, s, _, P) {
        return P = typeof P == "function" ? P : r, n == null ? n : Kf(n, s, sl(_), P);
      }
      function qs(n) {
        return n == null ? [] : Bu(n, Pn(n));
      }
      function iy(n) {
        return n == null ? [] : Bu(n, li(n));
      }
      function ry(n, s, _) {
        return _ === r && (_ = s, s = r), _ !== r && (_ = Wi(_), _ = _ === _ ? _ : 0), s !== r && (s = Wi(s), s = s === s ? s : 0), hs(Wi(n), s, _);
      }
      function sy(n, s, _) {
        return s = Sr(s), _ === r ? (_ = s, s = 0) : _ = Sr(_), n = Wi(n), fv(n, s, _);
      }
      function ay(n, s, _) {
        if (_ && typeof _ != "boolean" && jn(n, s, _) && (s = _ = r), _ === r && (typeof s == "boolean" ? (_ = s, s = r) : typeof n == "boolean" && (_ = n, n = r)), n === r && s === r ? (n = 0, s = 1) : (n = Sr(n), s === r ? (s = n, n = 0) : s = Sr(s)), n > s) {
          var P = n;
          n = s, s = P;
        }
        if (_ || n % 1 || s % 1) {
          var F = Af();
          return qn(n + F * (s - n + Ng("1e-" + ((F + "").length - 1))), s);
        }
        return Qu(n, s);
      }
      var oy = $s(function(n, s, _) {
        return s = s.toLowerCase(), n + (_ ? id(s) : s);
      });
      function id(n) {
        return Al($e(n).toLowerCase());
      }
      function rd(n) {
        return n = $e(n), n && n.replace(Pe, Jg).replace(Og, "");
      }
      function uy(n, s, _) {
        n = $e(n), s = Ci(s);
        var P = n.length;
        _ = _ === r ? P : hs(me(_), 0, P);
        var F = _;
        return _ -= s.length, _ >= 0 && n.slice(_, F) == s;
      }
      function ly(n) {
        return n = $e(n), n && M.test(n) ? n.replace(z, jg) : n;
      }
      function hy(n) {
        return n = $e(n), n && it.test(n) ? n.replace(tt, "\\$&") : n;
      }
      var fy = $s(function(n, s, _) {
        return n + (_ ? "-" : "") + s.toLowerCase();
      }), cy = $s(function(n, s, _) {
        return n + (_ ? " " : "") + s.toLowerCase();
      }), dy = oc("toLowerCase");
      function _y(n, s, _) {
        n = $e(n), s = me(s);
        var P = s ? Ls(n) : 0;
        if (!s || P >= s)
          return n;
        var F = (s - P) / 2;
        return Lo(wo(F), _) + n + Lo(yo(F), _);
      }
      function gy(n, s, _) {
        n = $e(n), s = me(s);
        var P = s ? Ls(n) : 0;
        return s && P < s ? n + Lo(s - P, _) : n;
      }
      function vy(n, s, _) {
        n = $e(n), s = me(s);
        var P = s ? Ls(n) : 0;
        return s && P < s ? Lo(s - P, _) + n : n;
      }
      function py(n, s, _) {
        return _ || s == null ? s = 0 : s && (s = +s), C0($e(n).replace(Q, ""), s || 0);
      }
      function my(n, s, _) {
        return (_ ? jn(n, s, _) : s === r) ? s = 1 : s = me(s), tl($e(n), s);
      }
      function yy() {
        var n = arguments, s = $e(n[0]);
        return n.length < 3 ? s : s.replace(n[1], n[2]);
      }
      var wy = $s(function(n, s, _) {
        return n + (_ ? "_" : "") + s.toLowerCase();
      });
      function xy(n, s, _) {
        return _ && typeof _ != "number" && jn(n, s, _) && (s = _ = r), _ = _ === r ? he : _ >>> 0, _ ? (n = $e(n), n && (typeof s == "string" || s != null && !Sl(s)) && (s = Ci(s), !s && ks(n)) ? $r(Ji(n), 0, _) : n.split(s, _)) : [];
      }
      var by = $s(function(n, s, _) {
        return n + (_ ? " " : "") + Al(s);
      });
      function Sy(n, s, _) {
        return n = $e(n), _ = _ == null ? 0 : hs(me(_), 0, n.length), s = Ci(s), n.slice(_, _ + s.length) == s;
      }
      function Cy(n, s, _) {
        var P = H.templateSettings;
        _ && jn(n, s, _) && (s = r), n = $e(n), s = Yo({}, s, P, _c);
        var F = Yo({}, s.imports, P.imports, _c), X = Pn(F), et = Bu(F, X), rt, ft, xt = 0, St = s.interpolate || ue, Tt = "__p += '", Nt = Fu(
          (s.escape || ue).source + "|" + St.source + "|" + (St === W ? Rt : ue).source + "|" + (s.evaluate || ue).source + "|$",
          "g"
        ), Zt = "//# sourceURL=" + (Ue.call(s, "sourceURL") ? (s.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Lg + "]") + `
`;
        n.replace(Nt, function(se, Ce, Ee, Ai, Qn, Pi) {
          return Ee || (Ee = Ai), Tt += n.slice(xt, Pi).replace(fe, Qg), Ce && (rt = !0, Tt += `' +
__e(` + Ce + `) +
'`), Qn && (ft = !0, Tt += `';
` + Qn + `;
__p += '`), Ee && (Tt += `' +
((__t = (` + Ee + `)) == null ? '' : __t) +
'`), xt = Pi + se.length, se;
        }), Tt += `';
`;
        var re = Ue.call(s, "variable") && s.variable;
        if (!re)
          Tt = `with (obj) {
` + Tt + `
}
`;
        else if (At.test(re))
          throw new de(g);
        Tt = (ft ? Tt.replace(O, "") : Tt).replace(B, "$1").replace(q, "$1;"), Tt = "function(" + (re || "obj") + `) {
` + (re ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (rt ? ", __e = _.escape" : "") + (ft ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + Tt + `return __p
}`;
        var we = ad(function() {
          return Fe(X, Zt + "return " + Tt).apply(r, et);
        });
        if (we.source = Tt, bl(we))
          throw we;
        return we;
      }
      function Ty(n) {
        return $e(n).toLowerCase();
      }
      function Ay(n) {
        return $e(n).toUpperCase();
      }
      function Py(n, s, _) {
        if (n = $e(n), n && (_ || s === r))
          return gf(n);
        if (!n || !(s = Ci(s)))
          return n;
        var P = Ji(n), F = Ji(s), X = vf(P, F), et = pf(P, F) + 1;
        return $r(P, X, et).join("");
      }
      function Oy(n, s, _) {
        if (n = $e(n), n && (_ || s === r))
          return n.slice(0, yf(n) + 1);
        if (!n || !(s = Ci(s)))
          return n;
        var P = Ji(n), F = pf(P, Ji(s)) + 1;
        return $r(P, 0, F).join("");
      }
      function My(n, s, _) {
        if (n = $e(n), n && (_ || s === r))
          return n.replace(Q, "");
        if (!n || !(s = Ci(s)))
          return n;
        var P = Ji(n), F = vf(P, Ji(s));
        return $r(P, F).join("");
      }
      function Iy(n, s) {
        var _ = Pt, P = Mt;
        if (on(s)) {
          var F = "separator" in s ? s.separator : F;
          _ = "length" in s ? me(s.length) : _, P = "omission" in s ? Ci(s.omission) : P;
        }
        n = $e(n);
        var X = n.length;
        if (ks(n)) {
          var et = Ji(n);
          X = et.length;
        }
        if (_ >= X)
          return n;
        var rt = _ - Ls(P);
        if (rt < 1)
          return P;
        var ft = et ? $r(et, 0, rt).join("") : n.slice(0, rt);
        if (F === r)
          return ft + P;
        if (et && (rt += ft.length - rt), Sl(F)) {
          if (n.slice(rt).search(F)) {
            var xt, St = ft;
            for (F.global || (F = Fu(F.source, $e(Qt.exec(F)) + "g")), F.lastIndex = 0; xt = F.exec(St); )
              var Tt = xt.index;
            ft = ft.slice(0, Tt === r ? rt : Tt);
          }
        } else if (n.indexOf(Ci(F), rt) != rt) {
          var Nt = ft.lastIndexOf(F);
          Nt > -1 && (ft = ft.slice(0, Nt));
        }
        return ft + P;
      }
      function Ey(n) {
        return n = $e(n), n && N.test(n) ? n.replace(Y, a0) : n;
      }
      var ky = $s(function(n, s, _) {
        return n + (_ ? " " : "") + s.toUpperCase();
      }), Al = oc("toUpperCase");
      function sd(n, s, _) {
        return n = $e(n), s = _ ? r : s, s === r ? e0(n) ? l0(n) : Hg(n) : n.match(s) || [];
      }
      var ad = be(function(n, s) {
        try {
          return bi(n, r, s);
        } catch (_) {
          return bl(_) ? _ : new de(_);
        }
      }), Ly = wr(function(n, s) {
        return Ni(s, function(_) {
          _ = ar(_), mr(n, _, wl(n[_], n));
        }), n;
      });
      function Ry(n) {
        var s = n == null ? 0 : n.length, _ = ne();
        return n = s ? tn(n, function(P) {
          if (typeof P[1] != "function")
            throw new Fi(c);
          return [_(P[0]), P[1]];
        }) : [], be(function(P) {
          for (var F = -1; ++F < s; ) {
            var X = n[F];
            if (bi(X[0], this, P))
              return bi(X[1], this, P);
          }
        });
      }
      function Dy(n) {
        return av(Vi(n, A));
      }
      function Pl(n) {
        return function() {
          return n;
        };
      }
      function zy(n, s) {
        return n == null || n !== n ? s : n;
      }
      var By = lc(), Ny = lc(!0);
      function hi(n) {
        return n;
      }
      function Ol(n) {
        return Ff(typeof n == "function" ? n : Vi(n, A));
      }
      function Fy(n) {
        return Vf(Vi(n, A));
      }
      function $y(n, s) {
        return Uf(n, Vi(s, A));
      }
      var Vy = be(function(n, s) {
        return function(_) {
          return Aa(_, n, s);
        };
      }), Uy = be(function(n, s) {
        return function(_) {
          return Aa(n, _, s);
        };
      });
      function Ml(n, s, _) {
        var P = Pn(s), F = Ao(s, P);
        _ == null && !(on(s) && (F.length || !P.length)) && (_ = s, s = n, n = this, F = Ao(s, Pn(s)));
        var X = !(on(_) && "chain" in _) || !!_.chain, et = br(n);
        return Ni(F, function(rt) {
          var ft = s[rt];
          n[rt] = ft, et && (n.prototype[rt] = function() {
            var xt = this.__chain__;
            if (X || xt) {
              var St = n(this.__wrapped__), Tt = St.__actions__ = oi(this.__actions__);
              return Tt.push({ func: ft, args: arguments, thisArg: n }), St.__chain__ = xt, St;
            }
            return ft.apply(n, Rr([this.value()], arguments));
          });
        }), n;
      }
      function qy() {
        return Ln._ === this && (Ln._ = g0), this;
      }
      function Il() {
      }
      function Wy(n) {
        return n = me(n), be(function(s) {
          return qf(s, n);
        });
      }
      var Yy = ol(tn), Hy = ol(hf), Xy = ol(ku);
      function od(n) {
        return _l(n) ? Lu(ar(n)) : Sv(n);
      }
      function Gy(n) {
        return function(s) {
          return n == null ? r : fs(n, s);
        };
      }
      var Zy = fc(), Ky = fc(!0);
      function El() {
        return [];
      }
      function kl() {
        return !1;
      }
      function Jy() {
        return {};
      }
      function jy() {
        return "";
      }
      function Qy() {
        return !0;
      }
      function tw(n, s) {
        if (n = me(n), n < 1 || n > Yt)
          return [];
        var _ = he, P = qn(n, he);
        s = ne(s), n -= he;
        for (var F = zu(P, s); ++_ < n; )
          s(_);
        return F;
      }
      function ew(n) {
        return ge(n) ? tn(n, ar) : Ti(n) ? [n] : oi(Pc($e(n)));
      }
      function nw(n) {
        var s = ++d0;
        return $e(n) + s;
      }
      var iw = ko(function(n, s) {
        return n + s;
      }, 0), rw = ul("ceil"), sw = ko(function(n, s) {
        return n / s;
      }, 1), aw = ul("floor");
      function ow(n) {
        return n && n.length ? To(n, hi, Xu) : r;
      }
      function uw(n, s) {
        return n && n.length ? To(n, ne(s, 2), Xu) : r;
      }
      function lw(n) {
        return df(n, hi);
      }
      function hw(n, s) {
        return df(n, ne(s, 2));
      }
      function fw(n) {
        return n && n.length ? To(n, hi, Ju) : r;
      }
      function cw(n, s) {
        return n && n.length ? To(n, ne(s, 2), Ju) : r;
      }
      var dw = ko(function(n, s) {
        return n * s;
      }, 1), _w = ul("round"), gw = ko(function(n, s) {
        return n - s;
      }, 0);
      function vw(n) {
        return n && n.length ? Du(n, hi) : 0;
      }
      function pw(n, s) {
        return n && n.length ? Du(n, ne(s, 2)) : 0;
      }
      return H.after = Fm, H.ary = Nc, H.assign = A1, H.assignIn = jc, H.assignInWith = Yo, H.assignWith = P1, H.at = O1, H.before = Fc, H.bind = wl, H.bindAll = Ly, H.bindKey = $c, H.castArray = Jm, H.chain = Dc, H.chunk = ap, H.compact = op, H.concat = up, H.cond = Ry, H.conforms = Dy, H.constant = Pl, H.countBy = vm, H.create = M1, H.curry = Vc, H.curryRight = Uc, H.debounce = qc, H.defaults = I1, H.defaultsDeep = E1, H.defer = $m, H.delay = Vm, H.difference = lp, H.differenceBy = hp, H.differenceWith = fp, H.drop = cp, H.dropRight = dp, H.dropRightWhile = _p, H.dropWhile = gp, H.fill = vp, H.filter = mm, H.flatMap = xm, H.flatMapDeep = bm, H.flatMapDepth = Sm, H.flatten = Ec, H.flattenDeep = pp, H.flattenDepth = mp, H.flip = Um, H.flow = By, H.flowRight = Ny, H.fromPairs = yp, H.functions = N1, H.functionsIn = F1, H.groupBy = Cm, H.initial = xp, H.intersection = bp, H.intersectionBy = Sp, H.intersectionWith = Cp, H.invert = V1, H.invertBy = U1, H.invokeMap = Am, H.iteratee = Ol, H.keyBy = Pm, H.keys = Pn, H.keysIn = li, H.map = Fo, H.mapKeys = W1, H.mapValues = Y1, H.matches = Fy, H.matchesProperty = $y, H.memoize = Vo, H.merge = H1, H.mergeWith = Qc, H.method = Vy, H.methodOf = Uy, H.mixin = Ml, H.negate = Uo, H.nthArg = Wy, H.omit = X1, H.omitBy = G1, H.once = qm, H.orderBy = Om, H.over = Yy, H.overArgs = Wm, H.overEvery = Hy, H.overSome = Xy, H.partial = xl, H.partialRight = Wc, H.partition = Mm, H.pick = Z1, H.pickBy = td, H.property = od, H.propertyOf = Gy, H.pull = Op, H.pullAll = Lc, H.pullAllBy = Mp, H.pullAllWith = Ip, H.pullAt = Ep, H.range = Zy, H.rangeRight = Ky, H.rearg = Ym, H.reject = km, H.remove = kp, H.rest = Hm, H.reverse = ml, H.sampleSize = Rm, H.set = J1, H.setWith = j1, H.shuffle = Dm, H.slice = Lp, H.sortBy = Nm, H.sortedUniq = $p, H.sortedUniqBy = Vp, H.split = xy, H.spread = Xm, H.tail = Up, H.take = qp, H.takeRight = Wp, H.takeRightWhile = Yp, H.takeWhile = Hp, H.tap = om, H.throttle = Gm, H.thru = No, H.toArray = Zc, H.toPairs = ed, H.toPairsIn = nd, H.toPath = ew, H.toPlainObject = Jc, H.transform = Q1, H.unary = Zm, H.union = Xp, H.unionBy = Gp, H.unionWith = Zp, H.uniq = Kp, H.uniqBy = Jp, H.uniqWith = jp, H.unset = ty, H.unzip = yl, H.unzipWith = Rc, H.update = ey, H.updateWith = ny, H.values = qs, H.valuesIn = iy, H.without = Qp, H.words = sd, H.wrap = Km, H.xor = tm, H.xorBy = em, H.xorWith = nm, H.zip = im, H.zipObject = rm, H.zipObjectDeep = sm, H.zipWith = am, H.entries = ed, H.entriesIn = nd, H.extend = jc, H.extendWith = Yo, Ml(H, H), H.add = iw, H.attempt = ad, H.camelCase = oy, H.capitalize = id, H.ceil = rw, H.clamp = ry, H.clone = jm, H.cloneDeep = t1, H.cloneDeepWith = e1, H.cloneWith = Qm, H.conformsTo = n1, H.deburr = rd, H.defaultTo = zy, H.divide = sw, H.endsWith = uy, H.eq = Qi, H.escape = ly, H.escapeRegExp = hy, H.every = pm, H.find = ym, H.findIndex = Mc, H.findKey = k1, H.findLast = wm, H.findLastIndex = Ic, H.findLastKey = L1, H.floor = aw, H.forEach = zc, H.forEachRight = Bc, H.forIn = R1, H.forInRight = D1, H.forOwn = z1, H.forOwnRight = B1, H.get = Cl, H.gt = i1, H.gte = r1, H.has = $1, H.hasIn = Tl, H.head = kc, H.identity = hi, H.includes = Tm, H.indexOf = wp, H.inRange = sy, H.invoke = q1, H.isArguments = _s, H.isArray = ge, H.isArrayBuffer = s1, H.isArrayLike = ui, H.isArrayLikeObject = gn, H.isBoolean = a1, H.isBuffer = Vr, H.isDate = o1, H.isElement = u1, H.isEmpty = l1, H.isEqual = h1, H.isEqualWith = f1, H.isError = bl, H.isFinite = c1, H.isFunction = br, H.isInteger = Yc, H.isLength = qo, H.isMap = Hc, H.isMatch = d1, H.isMatchWith = _1, H.isNaN = g1, H.isNative = v1, H.isNil = m1, H.isNull = p1, H.isNumber = Xc, H.isObject = on, H.isObjectLike = fn, H.isPlainObject = ka, H.isRegExp = Sl, H.isSafeInteger = y1, H.isSet = Gc, H.isString = Wo, H.isSymbol = Ti, H.isTypedArray = Us, H.isUndefined = w1, H.isWeakMap = x1, H.isWeakSet = b1, H.join = Tp, H.kebabCase = fy, H.last = qi, H.lastIndexOf = Ap, H.lowerCase = cy, H.lowerFirst = dy, H.lt = S1, H.lte = C1, H.max = ow, H.maxBy = uw, H.mean = lw, H.meanBy = hw, H.min = fw, H.minBy = cw, H.stubArray = El, H.stubFalse = kl, H.stubObject = Jy, H.stubString = jy, H.stubTrue = Qy, H.multiply = dw, H.nth = Pp, H.noConflict = qy, H.noop = Il, H.now = $o, H.pad = _y, H.padEnd = gy, H.padStart = vy, H.parseInt = py, H.random = ay, H.reduce = Im, H.reduceRight = Em, H.repeat = my, H.replace = yy, H.result = K1, H.round = _w, H.runInContext = ut, H.sample = Lm, H.size = zm, H.snakeCase = wy, H.some = Bm, H.sortedIndex = Rp, H.sortedIndexBy = Dp, H.sortedIndexOf = zp, H.sortedLastIndex = Bp, H.sortedLastIndexBy = Np, H.sortedLastIndexOf = Fp, H.startCase = by, H.startsWith = Sy, H.subtract = gw, H.sum = vw, H.sumBy = pw, H.template = Cy, H.times = tw, H.toFinite = Sr, H.toInteger = me, H.toLength = Kc, H.toLower = Ty, H.toNumber = Wi, H.toSafeInteger = T1, H.toString = $e, H.toUpper = Ay, H.trim = Py, H.trimEnd = Oy, H.trimStart = My, H.truncate = Iy, H.unescape = Ey, H.uniqueId = nw, H.upperCase = ky, H.upperFirst = Al, H.each = zc, H.eachRight = Bc, H.first = kc, Ml(H, function() {
        var n = {};
        return rr(H, function(s, _) {
          Ue.call(H.prototype, _) || (n[_] = s);
        }), n;
      }(), { chain: !1 }), H.VERSION = o, Ni(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
        H[n].placeholder = H;
      }), Ni(["drop", "take"], function(n, s) {
        Me.prototype[n] = function(_) {
          _ = _ === r ? 1 : Cn(me(_), 0);
          var P = this.__filtered__ && !s ? new Me(this) : this.clone();
          return P.__filtered__ ? P.__takeCount__ = qn(_, P.__takeCount__) : P.__views__.push({
            size: qn(_, he),
            type: n + (P.__dir__ < 0 ? "Right" : "")
          }), P;
        }, Me.prototype[n + "Right"] = function(_) {
          return this.reverse()[n](_).reverse();
        };
      }), Ni(["filter", "map", "takeWhile"], function(n, s) {
        var _ = s + 1, P = _ == bt || _ == vt;
        Me.prototype[n] = function(F) {
          var X = this.clone();
          return X.__iteratees__.push({
            iteratee: ne(F, 3),
            type: _
          }), X.__filtered__ = X.__filtered__ || P, X;
        };
      }), Ni(["head", "last"], function(n, s) {
        var _ = "take" + (s ? "Right" : "");
        Me.prototype[n] = function() {
          return this[_](1).value()[0];
        };
      }), Ni(["initial", "tail"], function(n, s) {
        var _ = "drop" + (s ? "" : "Right");
        Me.prototype[n] = function() {
          return this.__filtered__ ? new Me(this) : this[_](1);
        };
      }), Me.prototype.compact = function() {
        return this.filter(hi);
      }, Me.prototype.find = function(n) {
        return this.filter(n).head();
      }, Me.prototype.findLast = function(n) {
        return this.reverse().find(n);
      }, Me.prototype.invokeMap = be(function(n, s) {
        return typeof n == "function" ? new Me(this) : this.map(function(_) {
          return Aa(_, n, s);
        });
      }), Me.prototype.reject = function(n) {
        return this.filter(Uo(ne(n)));
      }, Me.prototype.slice = function(n, s) {
        n = me(n);
        var _ = this;
        return _.__filtered__ && (n > 0 || s < 0) ? new Me(_) : (n < 0 ? _ = _.takeRight(-n) : n && (_ = _.drop(n)), s !== r && (s = me(s), _ = s < 0 ? _.dropRight(-s) : _.take(s - n)), _);
      }, Me.prototype.takeRightWhile = function(n) {
        return this.reverse().takeWhile(n).reverse();
      }, Me.prototype.toArray = function() {
        return this.take(he);
      }, rr(Me.prototype, function(n, s) {
        var _ = /^(?:filter|find|map|reject)|While$/.test(s), P = /^(?:head|last)$/.test(s), F = H[P ? "take" + (s == "last" ? "Right" : "") : s], X = P || /^find/.test(s);
        F && (H.prototype[s] = function() {
          var et = this.__wrapped__, rt = P ? [1] : arguments, ft = et instanceof Me, xt = rt[0], St = ft || ge(et), Tt = function(Ce) {
            var Ee = F.apply(H, Rr([Ce], rt));
            return P && Nt ? Ee[0] : Ee;
          };
          St && _ && typeof xt == "function" && xt.length != 1 && (ft = St = !1);
          var Nt = this.__chain__, Zt = !!this.__actions__.length, re = X && !Nt, we = ft && !Zt;
          if (!X && St) {
            et = we ? et : new Me(this);
            var se = n.apply(et, rt);
            return se.__actions__.push({ func: No, args: [Tt], thisArg: r }), new $i(se, Nt);
          }
          return re && we ? n.apply(this, rt) : (se = this.thru(Tt), re ? P ? se.value()[0] : se.value() : se);
        });
      }), Ni(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
        var s = lo[n], _ = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", P = /^(?:pop|shift)$/.test(n);
        H.prototype[n] = function() {
          var F = arguments;
          if (P && !this.__chain__) {
            var X = this.value();
            return s.apply(ge(X) ? X : [], F);
          }
          return this[_](function(et) {
            return s.apply(ge(et) ? et : [], F);
          });
        };
      }), rr(Me.prototype, function(n, s) {
        var _ = H[s];
        if (_) {
          var P = _.name + "";
          Ue.call(Bs, P) || (Bs[P] = []), Bs[P].push({ name: s, func: _ });
        }
      }), Bs[Eo(r, $).name] = [{
        name: "wrapper",
        func: r
      }], Me.prototype.clone = E0, Me.prototype.reverse = k0, Me.prototype.value = L0, H.prototype.at = um, H.prototype.chain = lm, H.prototype.commit = hm, H.prototype.next = fm, H.prototype.plant = dm, H.prototype.reverse = _m, H.prototype.toJSON = H.prototype.valueOf = H.prototype.value = gm, H.prototype.first = H.prototype.head, ya && (H.prototype[ya] = cm), H;
    }, Rs = h0();
    as ? ((as.exports = Rs)._ = Rs, Ou._ = Rs) : Ln._ = Rs;
  }).call(fr);
})(wu, wu.exports);
var a2 = wu.exports;
const ei = /* @__PURE__ */ Jh(a2);
var o2 = /* @__PURE__ */ pe("<svg><g></svg>", !1, !0);
const u2 = {
  topLeft: "top",
  topCenter: "top",
  topRight: "top",
  centerLeft: "centerY",
  center: "centerY",
  centerRight: "centerY",
  bottomLeft: "bottom",
  bottomCenter: "bottom",
  bottomRight: "bottom",
  top: "top",
  centerY: "centerY",
  bottom: "bottom",
  left: void 0,
  centerX: void 0,
  right: void 0
}, Sh = (u) => u2[u], l2 = {
  topLeft: "left",
  topCenter: "centerX",
  topRight: "right",
  centerLeft: "left",
  center: "centerX",
  centerRight: "right",
  bottomLeft: "left",
  bottomCenter: "centerX",
  bottomRight: "right",
  top: void 0,
  centerY: void 0,
  bottom: void 0,
  left: "left",
  centerX: "centerX",
  right: "right"
}, Ch = (u) => l2[u], h2 = (u) => [Sh(u), Ch(u)], n3 = Nn((u) => Kt(ri, {
  get name() {
    return u.name;
  },
  layout: (o) => {
    if (o = Array.from(o), u.name.endsWith("DEBUG"))
      debugger;
    const l = o.map((k) => (
      /* m.guidePrimary ?? */
      u.alignment
    )).map((k) => h2(k)), h = ei.zip(o, l).filter(([k, y]) => y[0] !== void 0).map(([k, y]) => [k, y[0]]), g = h.filter(([k, y]) => k.owned[y]).map(([k, y]) => [k, k.bbox[y]])[0]?.[1] ?? 0;
    for (const [k, y] of h)
      k.owned[y] || (k.bbox[y] = g);
    const b = ei.zip(o, l).filter(([k, y]) => y[1] !== void 0).map(([k, y]) => [k, y[1]]), S = b.filter(([k, y]) => k.owned[y]).map(([k, y]) => [k, k.bbox[y]])[0]?.[1] ?? 0;
    for (const [k, y] of b)
      k.owned[y] || (k.bbox[y] = S);
    const A = rh(o.map((k) => k.bbox));
    return {
      transform: {
        translate: {
          x: nn(u.x, A.left),
          y: nn(u.y, A.top)
        }
      },
      bbox: {
        centerX: Ch(u.alignment) !== void 0 ? A.centerX : void 0,
        width: Ch(u.alignment) !== void 0 ? A.width : void 0,
        centerY: Sh(u.alignment) !== void 0 ? A.centerY : void 0,
        height: Sh(u.alignment) !== void 0 ? A.height : void 0
      }
    };
  },
  paint: (o) => (() => {
    var l = o2();
    return Ne(l, () => o.children), ze(() => Ft(l, "transform", `translate(${o.transform.translate.x ?? 0}, ${o.transform.translate.y ?? 0})`)), l;
  })(),
  get children() {
    return u.children;
  }
}), {
  displayName: "Align"
});
var sa = Math.PI;
function ps(u, e, r, o) {
  o === void 0 && (o = !1);
  var l = e[0], h = e[1], c = r[0], g = r[1], b = c + (u - l) / (h - l) * (g - c);
  if (o === !0)
    if (c < g) {
      if (b < c)
        return c;
      if (b > g)
        return g;
    } else {
      if (b > c)
        return c;
      if (b < g)
        return g;
    }
  return b;
}
function Bd(u, e, r, o, l) {
  var h = Math.sin(l), c = Math.cos(l), g = u - r, b = e - o, x = g * c - b * h, S = g * h + b * c;
  return [x + r, S + o];
}
function Qo(u, e, r, o) {
  return Math.hypot(o - e, r - u);
}
function ys(u, e, r, o) {
  return Math.atan2(o - e, r - u);
}
function Hr(u, e, r, o, l) {
  return l === void 0 && (l = 0.5), [u + (r - u) * l, e + (o - e) * l];
}
function f2(u, e) {
  return e === void 0 && (e = 8), Math.floor(e * (0.5 + u / (sa * 2) % e));
}
function c2(u, e, r, o, l, h, c, g) {
  return !(u >= l + c || l >= u + r || e >= h + g || h >= e + o);
}
function d2(u, e, r, o, l, h, c) {
  var g, b, x, S, A, k, y, D, C = [h - o, c - l], U = [o - u, l - e];
  return g = C[0] * U[0] + C[1] * U[1], b = 2 * (C[0] * C[0] + C[1] * C[1]), g *= -2, x = Math.sqrt(g * g - 2 * b * (U[0] * U[0] + U[1] * U[1] - r * r)), isNaN(x) ? [] : (S = (g - x) / b, A = (g + x) / b, y = [], D = [], k = [], S <= 1 && S >= 0 && (y[0] = o + C[0] * S, y[1] = l + C[1] * S, k[0] = y), A <= 1 && A >= 0 && (D[0] = o + C[0] * A, D[1] = l + C[1] * A, k[k.length] = D), k);
}
function hg(u) {
  return u - sa * 2 * Math.floor(u / (sa * 2));
}
function fg(u, e, r, o, l, h, c, g) {
  var b, x, S;
  if (o * (c - l) !== r * (g - h) && (S = r * (g - h) - o * (c - l), S !== 0 && (b = ((e - h) * (c - l) - (u - l) * (g - h)) / S, x = ((e - h) * r - (u - l) * o) / S, b >= 0 && x >= 0 && x <= 1)))
    return [u + b * r, e + b * o];
}
function Wl(u) {
  return [Math.cos(u), Math.sin(u)];
}
function _2(u) {
  return Math.abs(Math.abs(u % (sa / 2)) - sa / 4) / (sa / 4);
}
function g2(u, e, r, o, l, h, c, g, b, x) {
  var S = u + r / 2, A = e + o / 2, k = h + g / 2, y = c + b / 2, D = Ya(S, A, k - S, y - A, u, e, r, o, l) || [[S, A]], C = D[0], U = C[0], $ = C[1], Z = Ya(k, y, S - k, A - y, h, c, g, b, x) || [[k, y]], K = Z[0], ot = K[0], lt = K[1];
  return [U, $, ot, lt];
}
function Ya(u, e, r, o, l, h, c, g, b) {
  var x = l + c, S = h + g, A = l + b - 1, k = h + b - 1, y = l + c - b + 1, D = h + g - b + 1, C = [[l, D, l, k], [A, h, y, h], [x, k, x, D], [y, S, A, S]], U = [[A, k, Math.PI, Math.PI * 1.5], [y, k, Math.PI * 1.5, Math.PI * 2], [y, D, 0, Math.PI * 0.5], [A, D, Math.PI * 0.5, Math.PI]], $ = [];
  return C.forEach(function(Z, K) {
    var ot = Z[0], lt = Z[1], ct = Z[2], ht = Z[3], _t = U[K], at = _t[0], Pt = _t[1], Mt = _t[2], Et = _t[3], kt = p2(at, Pt, b, u, e, r, o);
    kt && kt.filter(function(Dt) {
      var vt = hg(ys(at, Pt, Dt[0], Dt[1]));
      return vt > Mt && vt < Et;
    }).forEach(function(Dt) {
      return $.push(Dt);
    });
    var bt = fg(u, e, r, o, ot, lt, ct, ht);
    bt && $.push(bt);
  }), $;
}
function Nd(u, e, r, o, l, h, c, g) {
  return v2(u, e, r, o).find(function(b) {
    var x = b[0], S = b[1], A = b[2], k = b[3];
    return fg(l, h, c, g, x, S, A, k);
  });
}
function v2(u, e, r, o) {
  return [[u, e, u + r, e], [u + r, e, u + r, e + o], [u + r, e + o, u, e + o], [u, e + o, u, e]];
}
function p2(u, e, r, o, l, h, c) {
  return d2(u, e, r, o, l, h * 999999, c * 999999);
}
var fi = Math.PI, Fd = fi * 2, $d = fi / 24;
function m2(u, e, r, o, l, h, c, g, b) {
  b === void 0 && (b = {});
  var x, S, A, k, y = b, D = y.bow, C = D === void 0 ? 0 : D, U = y.stretch, $ = U === void 0 ? 0.25 : U, Z = y.stretchMin, K = Z === void 0 ? 50 : Z, ot = y.stretchMax, lt = ot === void 0 ? 420 : ot, ct = y.padStart, ht = ct === void 0 ? 0 : ct, _t = y.padEnd, at = _t === void 0 ? 20 : _t, Pt = y.flip, Mt = Pt === void 0 ? !1 : Pt, Et = y.straights, kt = Et === void 0 ? !0 : Et, bt = u - ht, Dt = e - ht, vt = r + ht * 2, $t = o + ht * 2, Yt = l - at, Bt = h - at, ae = c + at * 2, he = g + at * 2, Ie = u + r / 2, rn = e + o / 2, ye = l + c / 2, oe = h + g / 2, qe = hg(ys(Ie, rn, ye, oe)), si = Qo(Ie, rn, ye, oe);
  if (si === 0) {
    var Ct = Ie, wt = Dt, Lt = ye, zt = Bt, jt = Hr(Ct, wt, Lt, zt, 0.5), Se = jt[0], Le = jt[1], Ge = ys(Ct, wt, Lt, zt);
    return [Ct, wt, Se, Le, Lt, zt, Ge, Ge, Ge];
  }
  var Te = (f2(qe) % 2 === 0 ? -1 : 1) * (Mt ? -1 : 1), Ae = _2(qe);
  Ae < 1 && Ae > 0.85 && (Ae = 0.99);
  var Fn = c2(bt, Dt, vt, $t, Yt, Bt, ae, he), ir = g2(bt, Dt, vt, $t, ht, Yt, Bt, ae, he, at), Be = ir[0], _n = ir[1], Re = ir[2], yi = ir[3], ce = Qo(Be, _n, Re, yi);
  if (!Fn && kt && Ae % 0.5 === 0) {
    var t = Hr(Be, _n, Re, yi, 0.5), i = t[0], a = t[1];
    return [Be, _n, i, a, Re, yi, qe, qe - fi, qe];
  }
  var f = Fn ? ps(ce, [0, si], [0, 1], !0) : 0, d = 1 - ce / si, v = ps(ce, [K, lt], [1, 0], !0), m = C + v * $, p = ps(
    Ae * Ae,
    // a better curve here?
    [0, 1],
    [fi * 0.125, 0],
    !0
  ), w = Fn ? fi * 0.5 * Ae : ps(
    d,
    // a better curve here?
    [0.75, 1],
    [0, fi * 0.5],
    !0
  ) * Ae, T = w + p * (Fn ? 1 - f : 1), E = f >= 0.5 ? qe + fi * Te : qe + Math.max($d, T) * Te, L = Wl(+(E % Fd).toPrecision(3)), I = L[0], O = L[1], B = Ya(Ie, rn, I, O, bt, Dt, vt, $t, ht), q = B[0], Y = q[0], z = q[1], N = Nd(bt, Dt, vt, $t, Ie, rn, I, O);
  if (!N)
    throw Error;
  var M = N[0], R = N[1], V = N[2], W = N[3], G = Hr(M, R, V, W, 0.5), J = G[0], j = G[1], tt = Hr(Y, z, J, j, Fn ? Math.max(f, 0.15) : 0.15);
  if (x = tt[0], S = tt[1], m *= 1 + (Math.max(-2, Math.min(d, 2)) * Ae - f) / 2, Fn && (m = m < 0 ? Math.min(m, -0.5) : Math.max(m, 0.5)), f >= 0.5) {
    var it = ys(Ie, rn, J, j), Q = Wl(it), nt = Q[0], st = Q[1], dt = Ya(ye, oe, nt, st, Yt, Bt, ae, he, at), gt = dt[0];
    A = gt[0], k = gt[1];
  } else {
    var pt = ps(d, [0.75, 1], [0, 1], !0), At = Fn ? ps(f, [0, 1], [0, fi / 8], !0) : 0, It = ps(Ae * pt, [0, 1], [0, fi / 16], !0), Rt = d * (fi / 12) + (It + At) + (w + p) / 2, Qt = f >= 0.5 ? qe + fi * Te : qe + fi - Math.max(Rt, $d) * Te, qt = Wl(+(Qt % Fd).toPrecision(3)), Xt = qt[0], Gt = qt[1], ee = Ya(ye, oe, Xt, Gt, Yt, Bt, ae, he, at), Jt = ee[0], Pe = Jt[0], ue = Jt[1], fe = Nd(Yt, Bt, ae, he, ye, oe, Xt, Gt);
    if (!fe)
      throw Error;
    var ie = fe[0], ve = fe[1], hn = fe[2], sn = fe[3], an = Hr(ie, ve, hn, sn, 0.5), Ze = an[0], De = an[1], Ke = Hr(Pe, ue, Ze, De, 0.25 + f * 0.25);
    A = Ke[0], k = Ke[1];
  }
  var Tn = Hr(x, S, A, k, 0.5), je = Tn[0], Kn = Tn[1], wi = Hr(
    x,
    S,
    A,
    k,
    Math.max(-1, Math.min(1, 0.5 + m))
    // Clamped to 2
  ), $n = wi[0], Vn = wi[1], mn = Bd($n, Vn, je, Kn, fi / 2 * Te), En = mn[0], xi = mn[1], An = Bd($n, Vn, je, Kn, fi / 2 * -Te), gr = An[0], Ot = An[1], Ut = Fn && Qo(En, xi, ye, oe) < Qo(gr, Ot, ye, oe) ? [gr, Ot] : [En, xi], te = Ut[0], le = Ut[1], Ht = ys(te, le, x, S), _e = ys(te, le, A, k);
  return [x, S, te, le, A, k, _e, Ht, ys(x, S, A, k)];
}
var y2 = /* @__PURE__ */ pe("<svg><circle></svg>", !1, !0), w2 = /* @__PURE__ */ pe("<svg><g><path fill=none></path><polygon></svg>", !1, !0), x2 = /* @__PURE__ */ pe("<svg><g></svg>", !1, !0);
const i3 = Nn((u) => (u = Li({
  bow: 0.2,
  stretch: 0.5,
  stretchMin: 40,
  stretchMax: 420,
  padStart: 5,
  padEnd: 20,
  flip: !1,
  straights: !0,
  "stroke-width": 3,
  stroke: "black"
}, u), Kt(ri, {
  get name() {
    return u.name;
  },
  layout: (o) => {
    if (o = Array.from(o), u.name.endsWith("DEBUG"))
      debugger;
    const l = o[0].bbox, h = o[1].bbox, c = m2(l.left ?? 0, l.top ?? 0, l.width ?? 0, l.height ?? 0, h.left ?? 0, h.top ?? 0, h.width ?? 0, h.height ?? 0, u), g = ua([l.left, h.left]), b = ua([l.top, h.top]), x = Gr([l.right, h.right]), S = Gr([l.bottom, h.bottom]), A = nn(x, g), k = nn(S, b);
    return {
      transform: {
        translate: {
          x: nn(u.x, g),
          y: nn(u.y, b)
        }
      },
      bbox: {
        left: g,
        top: b,
        right: x,
        bottom: S,
        width: A,
        height: k
      },
      customData: {
        sx: c[0],
        sy: c[1],
        cx: c[2],
        cy: c[3],
        ex: c[4],
        ey: c[5],
        ae: c[6],
        as: c[7],
        ec: c[8]
      }
    };
  },
  paint: (o) => {
    const l = () => o.customData.ae * (180 / Math.PI), h = () => {
      const c = [[0, -2], [4, 0], [0, 2]];
      return c.forEach((g) => {
        g[0] *= u["stroke-width"], g[1] *= u["stroke-width"];
      }), c.map((g) => g.map((b) => b.toString()).join(",")).join(" ");
    };
    return Kt(aa, {
      get when() {
        return o.customData;
      },
      get fallback() {
        return (() => {
          var c = x2();
          return Ne(c, () => o.children), c;
        })();
      },
      get children() {
        var c = w2(), g = c.firstChild, b = g.nextSibling;
        return Ne(c, Kt(aa, {
          get when() {
            return u.start;
          },
          fallback: [],
          get children() {
            var x = y2();
            return ze((S) => {
              var A = o.customData.sx, k = o.customData.sy, y = 4 / 3 * u["stroke-width"], D = u.stroke;
              return A !== S.e && Ft(x, "cx", S.e = A), k !== S.t && Ft(x, "cy", S.t = k), y !== S.a && Ft(x, "r", S.a = y), D !== S.o && Ft(x, "fill", S.o = D), S;
            }, {
              e: void 0,
              t: void 0,
              a: void 0,
              o: void 0
            }), x;
          }
        }), g), Ne(c, () => o.children, null), ze((x) => {
          var S = `translate(${o.transform.translate.x ?? 0}, ${o.transform.translate.y ?? 0})`, A = `M${o.customData.sx},${o.customData.sy} Q${o.customData.cx},${o.customData.cy} ${o.customData.ex},${o.customData.ey}`, k = u.stroke, y = u["stroke-width"], D = h(), C = `translate(${o.customData.ex},${o.customData.ey}) rotate(${l()})`, U = u.stroke;
          return S !== x.e && Ft(c, "transform", x.e = S), A !== x.t && Ft(g, "d", x.t = A), k !== x.a && Ft(g, "stroke", x.a = k), y !== x.o && Ft(g, "stroke-width", x.o = y), D !== x.i && Ft(b, "points", x.i = D), C !== x.n && Ft(b, "transform", x.n = C), U !== x.s && Ft(b, "fill", x.s = U), x;
        }, {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0
        }), c;
      }
    });
  },
  get children() {
    return u.children;
  }
})), {
  displayName: "Arrow"
});
var b2 = /* @__PURE__ */ pe("<svg><rect></svg>", !1, !0);
const S2 = Nn((u) => Kt(ri, {
  get name() {
    return u.name;
  },
  layout: () => ({
    bbox: {
      left: 0,
      top: 0,
      width: u.width,
      height: u.height
    },
    transform: {
      translate: {
        x: u.x,
        y: u.y
      }
    }
  }),
  paint: (o) => {
    const [l, h] = Ms(u, ["name", "x", "y", "width", "height"]);
    return (() => {
      var c = b2();
      return pi(c, ii(h, {
        get x() {
          return (o.bbox.left ?? 0) + (o.transform.translate.x ?? 0);
        },
        get y() {
          return (o.bbox.top ?? 0) + (o.transform.translate.y ?? 0);
        },
        get width() {
          return o.bbox.width;
        },
        get height() {
          return o.bbox.height;
        }
      }), !0, !1), c;
    })();
  }
}), {
  displayName: "Rect"
});
var C2 = /* @__PURE__ */ pe("<svg><g></svg>", !1, !0);
const r3 = Nn((u) => {
  u = Li({
    padding: 10,
    stroke: "black",
    fill: "none",
    "stroke-width": 3
  }, u);
  const [e, r] = Ms(u, ["padding"]);
  return Kt(ri, {
    get name() {
      return u.name;
    },
    layout: (h) => {
      if (h = Array.from(h), u.name.endsWith("DEBUG"))
        debugger;
      const [c, ...g] = h;
      let b, x;
      if (c.owned.left)
        throw new Error("Background x must be inferred from children");
      {
        const S = g.filter((k) => k.owned.left).map((k) => k.bbox.left);
        b = (S.length === 0 ? 0 : ua(S) ?? 0) - u.padding, c.bbox.left = b;
      }
      if (c.owned.top)
        throw new Error("Background y must be inferred from children");
      {
        const S = g.filter((k) => k.owned.top).map((k) => k.bbox.top);
        x = (S.length === 0 ? 0 : ua(S) ?? 0) - u.padding, c.bbox.top = x;
      }
      if (!c.owned.width) {
        const S = g.filter((D) => D.owned.left && D.owned.width).map((D) => Xi(D.bbox.left, D.bbox.width)), A = S.length === 0 ? void 0 : Gr(S), k = g.map((D) => D.bbox.width), y = nn(A, b + u.padding) ?? (k.length === 0 ? 0 : Gr(k) ?? 0);
        c.bbox.width = y + 2 * u.padding;
      }
      for (const S of g)
        S.owned.left || (S.bbox.left = b + (c.bbox.width - S.bbox.width) / 2);
      if (!c.owned.height) {
        const S = g.filter((D) => D.owned.top && D.owned.height).map((D) => Xi(D.bbox.top, D.bbox.height)), A = S.length === 0 ? void 0 : Gr(S), k = g.map((D) => D.bbox.height), y = nn(A, x + u.padding) ?? (k.length === 0 ? 0 : Gr(k) ?? 0);
        c.bbox.height = y + 2 * u.padding;
      }
      for (const S of g)
        S.owned.top || (S.bbox.top = x + (c.bbox.height - S.bbox.height) / 2);
      return {
        bbox: {
          left: b,
          top: x,
          width: c.bbox.width,
          height: c.bbox.height
        },
        transform: {
          translate: {
            x: nn(u.x, b),
            y: nn(u.y, x)
          }
        }
      };
    },
    paint: (h) => (() => {
      var c = C2();
      return Ne(c, () => h.children), ze(() => Ft(c, "transform", `translate(${h.transform.translate.x ?? 0}, ${h.transform.translate.y ?? 0})`)), c;
    })(),
    get children() {
      return [Kt(aa, {
        get when() {
          return u.background !== void 0;
        },
        get fallback() {
          return Kt(S2, r);
        },
        get children() {
          return u.background();
        }
      }), Dn(() => u.children)];
    }
  });
}, {
  displayName: "Background"
});
var T2 = /* @__PURE__ */ pe("<svg><g><path></svg>", !1, !0);
const s3 = Nn((u) => {
  const [e, r] = Ms(u, ["name", "path"]), o = () => {
    const c = u.path.clone();
    return c.closed = !0, c.smooth({
      type: "continuous"
    }), c.flatten(4), c.smooth({
      type: "continuous"
    }), c;
  };
  return Kt(ri, {
    get name() {
      return u.name;
    },
    layout: () => {
      const c = o().strokeBounds;
      return {
        bbox: {
          left: c.left,
          top: c.top,
          width: c.width,
          height: c.height
        },
        transform: {
          translate: {}
        }
      };
    },
    paint: (c) => {
      const g = () => o().exportSVG().getAttribute("d") ?? "";
      return (() => {
        var b = T2(), x = b.firstChild;
        return pi(x, ii(r, {
          get d() {
            return g();
          }
        }), !0, !1), ze(() => Ft(b, "transform", `translate(${c.transform.translate.x}, ${c.transform.translate.y})`)), b;
      })();
    }
  });
}, {
  displayName: "Blob"
});
var A2 = /* @__PURE__ */ pe("<svg><circle></svg>", !1, !0);
const a3 = Nn((u) => Kt(ri, {
  get name() {
    return u.name;
  },
  layout: () => ({
    bbox: {
      left: -u.r,
      top: -u.r,
      width: u.r * 2,
      height: u.r * 2
    },
    transform: {
      translate: {
        x: u.cx,
        y: u.cy
      }
    }
  }),
  paint: (o) => {
    const [l, h] = Ms(u, ["name", "cx", "cy", "r"]), c = () => (o.bbox.width ?? 0) / 2;
    return (() => {
      var g = A2();
      return pi(g, ii(h, {
        get cx() {
          return (o.bbox.left ?? 0) + c() + (o.transform.translate.x ?? 0);
        },
        get cy() {
          return (o.bbox.top ?? 0) + c() + (o.transform.translate.y ?? 0);
        },
        get r() {
          return c();
        }
      }), !0, !1), g;
    })();
  }
}), {
  displayName: "Circle"
}), P2 = (u) => (e) => {
  const r = Or();
  if (u.name.endsWith("DEBUG"))
    debugger;
  const o = e.map(
    (g) => (
      /* m.guidePrimary ?? */
      u.alignment
    )
  ), l = ei.zip(e, o).filter(
    ([g, b]) => b !== void 0
  ), c = l.filter(
    ([g, b]) => g.owned[b]
  ).map(([g, b]) => [g, g.bbox[b]])[0]?.[1] ?? 0;
  for (const [g, b] of l)
    g.owned[b] || (g.bbox[b] = c);
  if (u.direction === "vertical") {
    let g, b;
    if (u.spacing !== void 0 && u.total !== void 0) {
      b = u.spacing, g = u.total;
      let y = g;
      for (const U of e)
        U.owned.height && (y -= U.bbox.height);
      const D = e.filter(
        (U) => !U.owned.height
      ), C = y / D.length;
      for (const U of D)
        U.bbox.height = C;
    } else if (u.spacing !== void 0) {
      b = u.spacing;
      for (const y of e)
        if (!y.owned.height)
          return r(
            Zr({
              source: u.name,
              name: y.name,
              dim: "height"
            })
          ), { bbox: {}, transform: { translate: {} } };
      g = ei.sumBy(e, (y) => y.bbox.height) + b * (e.length - 1);
    } else if (u.total !== void 0) {
      g = u.total;
      for (const D of e)
        if (!D.owned.height)
          return r(
            Zr({
              source: u.name,
              name: D.name,
              dim: "height"
            })
          ), { bbox: {}, transform: { translate: {} } };
      const y = ei.sumBy(
        e,
        (D) => D.bbox.height
      );
      b = (u.total - y) / (e.length - 1);
    } else
      throw new Error("invalid options");
    const x = e.findIndex((y) => y.owned.top);
    let A = x === -1 ? 0 : e[x].bbox.top - b * x - ei.sumBy(
      e.slice(0, x),
      (y) => y.bbox.height
    );
    for (const y of e)
      y.owned.top || (y.bbox.top = A), A += y.bbox.height + b;
    const k = rh(e.map((y) => y.bbox));
    return {
      // bbox: {
      //   top: startingY,
      //   width: maybeMax(childNodes.map((childId) => childId.bbox.width)),
      //   height,
      // },
      bbox: k,
      transform: {
        translate: {
          x: nn(u.x, k.left),
          y: nn(u.y, k.top)
        }
      }
    };
  } else if (u.direction === "horizontal") {
    let g, b;
    if (u.spacing !== void 0 && u.total !== void 0) {
      b = u.spacing, g = u.total;
      let y = g;
      for (const U of e)
        U.owned.width && (y -= U.bbox.width);
      const D = e.filter(
        (U) => !U.owned.width
      ), C = y / D.length;
      for (const U of D)
        U.bbox.width = C;
    } else if (u.spacing !== void 0) {
      b = u.spacing;
      for (const y of e)
        if (!y.owned.width)
          return r(
            Zr({
              source: u.name,
              name: y.name,
              dim: "width"
            })
          ), { bbox: {}, transform: { translate: {} } };
      g = ei.sumBy(e, (y) => y.bbox.width) + b * (e.length - 1);
    } else if (u.total !== void 0) {
      g = u.total;
      for (const D of e)
        if (!D.owned.width)
          return r(
            Zr({
              source: u.name,
              name: D.name,
              dim: "width"
            })
          ), { bbox: {}, transform: { translate: {} } };
      const y = ei.sumBy(
        e,
        (D) => D.bbox.width
      );
      b = (u.total - y) / (e.length - 1);
    } else
      throw new Error("Invalid options for space");
    const x = e.findIndex(
      (y) => y.owned.left
    );
    let A = x === -1 ? 0 : e[x].bbox.left - b * x - ei.sumBy(
      e.slice(0, x),
      (y) => y.bbox.width
    );
    for (const y of e)
      y.owned.left || (y.bbox.left = A), A += y.bbox.width + b;
    const k = rh(e.map((y) => y.bbox));
    return {
      // bbox: {
      //   left: startingX,
      //   height: maybeMax(childNodes.map((childId) => childId.bbox.height)),
      //   width,
      // },
      bbox: k,
      transform: {
        translate: {
          x: nn(u.x, k.left),
          y: nn(u.y, k.top)
        }
      }
    };
  } else
    throw new Error("Invalid direction");
};
var O2 = /* @__PURE__ */ pe("<svg><g></svg>", !1, !0);
const cg = Nn((u) => {
  const e = zn(() => u.total === void 0 && u.spacing === void 0 ? 10 : u.spacing), r = zn(() => {
    if (u.direction === "vertical")
      return "centerX";
    if (u.direction === "horizontal")
      return "centerY";
  });
  return u = Li({
    get spacing() {
      return e();
    },
    get alignment() {
      return r();
    }
  }, u), Kt(ri, {
    get name() {
      return u.name;
    },
    layout: (h) => P2(u)(h),
    paint: (h) => (() => {
      var c = O2();
      return Ne(c, () => h.children), ze(() => Ft(c, "transform", `translate(${h.transform.translate.x ?? 0}, ${h.transform.translate.y ?? 0})`)), c;
    })(),
    get children() {
      return u.children;
    }
  });
}, {
  displayName: "Stack"
}), o3 = Nn((u) => {
  const e = Li({
    direction: "vertical",
    alignment: "centerX"
  }, u);
  return Kt(cg, e);
}, {
  displayName: "StackV"
});
var M2 = /* @__PURE__ */ pe("<svg><g></svg>", !1, !0);
const u3 = Nn((u) => {
  const e = Or();
  return Kt(ri, {
    get name() {
      return u.name;
    },
    layout: (l) => {
      if (l = Array.from(l), u.name.endsWith("DEBUG"))
        debugger;
      if (u.direction === "vertical") {
        let h, c;
        if (u.spacing !== void 0 && u.total !== void 0) {
          c = u.spacing, h = u.total;
          let S = h;
          for (const y of l)
            y.owned.height && (S -= y.bbox.height);
          const A = l.filter((y) => !y.owned.height), k = S / A.length;
          for (const y of A)
            y.bbox.height = k;
        } else if (u.spacing !== void 0) {
          c = u.spacing;
          for (const S of l)
            if (!S.owned.height)
              return e(Zr({
                source: u.name,
                name: S.name,
                dim: "height"
              })), {
                bbox: {},
                transform: {
                  translate: {}
                }
              };
          h = ei.sumBy(l, (S) => S.bbox.height) + c * (l.length - 1);
        } else if (u.total !== void 0) {
          h = u.total;
          for (const A of l)
            if (!A.owned.height)
              return e(Zr({
                source: u.name,
                name: A.name,
                dim: "height"
              })), {
                bbox: {},
                transform: {
                  translate: {}
                }
              };
          const S = ei.sumBy(l, (A) => A.bbox.height);
          c = (u.total - S) / (l.length - 1);
        } else
          throw new Error("invalid options");
        const g = l.findIndex((S) => S.owned.top), b = g === -1 ? 0 : l[g].bbox.top - c * g - ei.sumBy(l.slice(0, g), (S) => S.bbox.height);
        let x = b;
        for (const S of l)
          S.owned.top || (S.bbox.top = x), x += S.bbox.height + c;
        return {
          bbox: {
            top: b,
            height: h
          },
          transform: {
            translate: {}
          }
        };
      } else if (u.direction === "horizontal") {
        let h, c;
        if (u.spacing !== void 0 && u.total !== void 0) {
          c = u.spacing, h = u.total;
          let S = h;
          for (const y of l)
            y.owned.width && (S -= y.bbox.width);
          const A = l.filter((y) => !y.owned.width), k = S / A.length;
          for (const y of A)
            y.bbox.width = k;
        } else if (u.spacing !== void 0) {
          c = u.spacing;
          for (const S of l)
            if (!S.owned.width)
              return e(Zr({
                source: u.name,
                name: S.name,
                dim: "width"
              })), {
                bbox: {},
                transform: {
                  translate: {}
                }
              };
          h = ei.sumBy(l, (S) => S.bbox.width) + c * (l.length - 1);
        } else if (u.total !== void 0) {
          h = u.total;
          for (const A of l)
            if (!A.owned.width)
              return e(Zr({
                source: u.name,
                name: A.name,
                dim: "width"
              })), {
                bbox: {},
                transform: {
                  translate: {}
                }
              };
          const S = ei.sumBy(l, (A) => A.bbox.width);
          c = (u.total - S) / (l.length - 1);
        } else
          throw new Error("Invalid options for space");
        const g = l.findIndex((S) => S.owned.left), b = g === -1 ? 0 : l[g].bbox.left - c * g - ei.sumBy(l.slice(0, g), (S) => S.bbox.width);
        let x = b;
        for (const S of l)
          S.owned.left || (S.bbox.left = x), x += S.bbox.width + c;
        return {
          bbox: {
            left: b,
            width: h
          },
          transform: {
            translate: {}
          }
        };
      } else
        throw new Error("Invalid direction");
    },
    paint: (l) => (() => {
      var h = M2();
      return Ne(h, () => l.children), ze(() => Ft(h, "transform", `translate(${l.transform.translate.x ?? 0}, ${l.transform.translate.y ?? 0})`)), h;
    })(),
    get children() {
      return u.children;
    }
  });
}, {
  displayName: "Distribute"
});
var I2 = /* @__PURE__ */ pe("<svg><g></svg>", !1, !0);
const l3 = Nn((u) => Kt(ri, {
  get name() {
    return u.name;
  },
  layout: (o) => {
    if (u.name.endsWith("DEBUG"))
      debugger;
    for (const A of o)
      A.owned.left || (A.bbox.left = 0), A.owned.top || (A.bbox.top = 0);
    const l = {
      left: o.map((A) => A.bbox.left),
      top: o.map((A) => A.bbox.top),
      width: o.map((A) => A.bbox.width),
      height: o.map((A) => A.bbox.height)
    }, h = uu(l.left) ?? 0, c = ou(l.left.map((A, k) => Xi(A, l.width[k]))), g = uu(l.top) ?? 0, b = ou(l.top.map((A, k) => Xi(A, l.height[k]))), x = nn(c, h), S = nn(b, g);
    return {
      transform: {
        translate: {
          x: nn(u.x, h),
          y: nn(u.y, g)
        }
      },
      bbox: {
        left: h,
        top: g,
        width: x,
        height: S
      }
    };
  },
  paint: (o) => (() => {
    var l = I2();
    return Ne(l, () => o.children), ze(() => Ft(l, "transform", `translate(${o.transform.translate.x ?? 0}, ${o.transform.translate.y ?? 0})`)), l;
  })(),
  get children() {
    return [Dn(() => u.children), Dn(() => u.rels?.() ?? null)];
  }
}), {
  displayName: "Group"
});
var E2 = /* @__PURE__ */ pe("<svg><image></svg>", !1, !0);
const h3 = Nn((u) => Kt(ri, {
  get name() {
    return u.name;
  },
  layout: () => ({
    bbox: {
      left: 0,
      top: 0,
      width: u.width,
      height: u.height
    },
    transform: {
      translate: {
        x: u.x,
        y: u.y
      }
    }
  }),
  paint: (o) => {
    const [l, h] = Ms(u, ["name", "x", "y", "width", "height"]);
    return (() => {
      var c = E2();
      return pi(c, ii(h, {
        get x() {
          return (o.bbox.left ?? 0) + (o.transform.translate.x ?? 0);
        },
        get y() {
          return (o.bbox.top ?? 0) + (o.transform.translate.y ?? 0);
        },
        get width() {
          return o.bbox.width;
        },
        get height() {
          return o.bbox.height;
        }
      }), !0, !1), c;
    })();
  }
}), {
  displayName: "Image"
});
var k2 = /* @__PURE__ */ pe("<svg><g></svg>", !1, !0);
const f3 = Nn((u) => (u = Li({}, u), Kt(ri, {
  get name() {
    return u.name;
  },
  layout: (o) => {
    const l = o[0].bbox, h = o[1].bbox;
    for (const [c, g] of Object.entries(u.f(l, h)))
      h[c] = g;
    return {
      transform: {
        translate: {
          x: u.x,
          y: u.y
        }
      },
      bbox: h
    };
  },
  paint: (o) => (() => {
    var l = k2();
    return Ne(l, () => o.children), l;
  })(),
  get children() {
    return u.children;
  }
})), {
  displayName: "LayoutFunction"
});
var L2 = /* @__PURE__ */ pe("<svg><g><line></svg>", !1, !0), R2 = /* @__PURE__ */ pe("<svg><g></svg>", !1, !0);
const D2 = (u, e, r) => Math.min(Math.max(u, e), r), z2 = (u, e, r) => e + (r - e) * u, Xr = (u, e, r) => e !== void 0 && r !== void 0 && u !== void 0 ? z2(u, e, r) : void 0, Yi = (u, e, r) => e !== void 0 && r !== void 0 && u !== void 0 ? D2(u, e, r) : void 0, tu = (u, e) => u !== void 0 && e !== void 0 ? u - e : void 0, Vd = (u, e) => u !== void 0 && e !== void 0 ? Math.min(u, e) : void 0, Ud = (u, e) => u !== void 0 && e !== void 0 ? Math.max(u, e) : void 0, c3 = Nn((u) => (u = Li({
  "stroke-width": 3,
  stroke: "black",
  source: void 0,
  target: void 0
}, u), Kt(ri, {
  get name() {
    return u.name;
  },
  layout: (o) => {
    o = Array.from(o);
    const l = o[0].bbox, h = o[1].bbox, c = {
      fromX: l.left + l.width / 2,
      fromY: l.top + l.height / 2,
      toX: h.left + h.width / 2,
      toY: h.top + h.height / 2
    };
    let g = {};
    if (u.source && u.target)
      g = {
        fromX: Xr(u.source[0], l.left, l.right),
        fromY: Xr(u.source[1], l.top, l.bottom),
        toX: Xr(u.target[0], h.left, h.right),
        toY: Xr(u.target[1], h.top, h.bottom)
      };
    else if (u.source) {
      const D = Xr(u.source[0], l.left, l.right), C = Xr(u.source[1], l.top, l.bottom);
      g = {
        fromX: D,
        fromY: C,
        toX: Yi(D, h.left, h.right),
        toY: Yi(C, h.top, h.bottom)
      };
    } else if (u.target) {
      const D = Xr(u.target[0], h.left, h.right), C = Xr(u.target[1], h.top, h.bottom);
      g = {
        fromX: Yi(D, l.left, l.right),
        fromY: Yi(C, l.top, l.bottom),
        toX: D,
        toY: C
      };
    } else
      g = {
        fromX: Yi(Yi(c.fromX, h.left, h.right), l.left, l.right),
        fromY: Yi(Yi(c.fromY, h.top, h.bottom), l.top, l.bottom),
        toX: Yi(Yi(c.toX, l.left, l.right), h.left, h.right),
        toY: Yi(Yi(c.toY, l.top, l.bottom), h.top, h.bottom)
      };
    const b = Vd(g.fromX, g.toX), x = Vd(g.fromY, g.toY), S = Ud(g.fromX, g.toX), A = Ud(g.fromY, g.toY), k = tu(S, b), y = tu(A, x);
    return {
      transform: {
        translate: {
          x: tu(u.x, b),
          y: tu(u.y, x)
        }
      },
      bbox: {
        left: b,
        top: x,
        width: k,
        height: y
      },
      customData: g
    };
  },
  paint: (o) => Kt(aa, {
    get when() {
      return o.customData;
    },
    get fallback() {
      return (() => {
        var l = R2();
        return Ne(l, () => o.children), l;
      })();
    },
    get children() {
      var l = L2(), h = l.firstChild;
      return Ne(l, () => o.children, null), ze((c) => {
        var g = `translate(${o.transform.translate.x ?? 0}, ${o.transform.translate.y ?? 0})`, b = o.customData.fromX, x = o.customData.toX, S = o.customData.fromY, A = o.customData.toY, k = u.stroke, y = u["stroke-width"], D = u["stroke-dasharray"];
        return g !== c.e && Ft(l, "transform", c.e = g), b !== c.t && Ft(h, "x1", c.t = b), x !== c.a && Ft(h, "x2", c.a = x), S !== c.o && Ft(h, "y1", c.o = S), A !== c.i && Ft(h, "y2", c.i = A), k !== c.n && Ft(h, "stroke", c.n = k), y !== c.s && Ft(h, "stroke-width", c.s = y), D !== c.h && Ft(h, "stroke-dasharray", c.h = D), c;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0,
        s: void 0,
        h: void 0
      }), l;
    }
  }),
  get children() {
    return u.children;
  }
})), {
  displayName: "Line"
}), B2 = (u) => Array.isArray(u) ? u : [u], N2 = (u, e) => {
  const [r, ...o] = e;
  let l = r;
  if (!(r in u))
    throw new Error(`Could not find ${r}. Available names: ${Object.keys(u).join(", ")}`);
  for (const c of o) {
    const g = u[l].children[c];
    if (g === void 0)
      throw console.log(JSON.parse(JSON.stringify(u))), new Error(`Could not find ${c} in ${l}. Available names: ${Object.keys(u[l].children).join(", ")}`);
    l = g;
  }
  const h = u[l].layoutNode;
  if (h === void 0)
    throw console.log(JSON.parse(JSON.stringify(u))), new Error(`Could not find layout node for ${l}. Available names: ${Object.keys(u[l].children).join(", ")}`);
  return h;
}, d3 = Nn((u) => {
  Or();
  const [e, r] = Ki(eo), {
    createRef: o
  } = a_(), l = () => B2(u.select);
  return Eh(() => {
    r(cn((h) => {
      for (const c of Object.keys(h))
        h[c].layoutNode === u.name && delete h[c];
    }));
  }), {
    jsx: [],
    layout: (h) => {
      if (h === null)
        throw new Error("Ref must be a child of a Layout");
      o(u.name, N2(e, l()), h);
    }
  };
}, {
  displayName: "Ref"
}), _3 = Nn((u) => {
  const e = Li({
    direction: "horizontal",
    alignment: "centerY"
  }, u);
  return Kt(cg, e);
}, {
  displayName: "StackH"
});
var Th = { exports: {} }, Yl = "(".charCodeAt(0), Hl = ")".charCodeAt(0), eu = "'".charCodeAt(0), Xl = '"'.charCodeAt(0), Gl = "\\".charCodeAt(0), nu = "/".charCodeAt(0), Zl = ",".charCodeAt(0), Kl = ":".charCodeAt(0), qd = "*".charCodeAt(0), F2 = function(u) {
  for (var e = [], r = u, o, l, h, c, g, b, x, S = 0, A = r.charCodeAt(S), k = r.length, y = [{ nodes: e }], D = 0, C, U = "", $ = "", Z = ""; S < k; )
    if (A <= 32) {
      o = S;
      do
        o += 1, A = r.charCodeAt(o);
      while (A <= 32);
      c = r.slice(S, o), h = e[e.length - 1], A === Hl && D ? Z = c : h && h.type === "div" ? h.after = c : A === Zl || A === Kl || A === nu && r.charCodeAt(o + 1) !== qd ? $ = c : e.push({
        type: "space",
        sourceIndex: S,
        value: c
      }), S = o;
    } else if (A === eu || A === Xl) {
      o = S, l = A === eu ? "'" : '"', c = {
        type: "string",
        sourceIndex: S,
        quote: l
      };
      do
        if (g = !1, o = r.indexOf(l, o + 1), ~o)
          for (b = o; r.charCodeAt(b - 1) === Gl; )
            b -= 1, g = !g;
        else
          r += l, o = r.length - 1, c.unclosed = !0;
      while (g);
      c.value = r.slice(S + 1, o), e.push(c), S = o + 1, A = r.charCodeAt(S);
    } else if (A === nu && r.charCodeAt(S + 1) === qd)
      c = {
        type: "comment",
        sourceIndex: S
      }, o = r.indexOf("*/", S), o === -1 && (c.unclosed = !0, o = r.length), c.value = r.slice(S + 2, o), e.push(c), S = o + 2, A = r.charCodeAt(S);
    else if (A === nu || A === Zl || A === Kl)
      c = r[S], e.push({
        type: "div",
        sourceIndex: S - $.length,
        value: c,
        before: $,
        after: ""
      }), $ = "", S += 1, A = r.charCodeAt(S);
    else if (Yl === A) {
      o = S;
      do
        o += 1, A = r.charCodeAt(o);
      while (A <= 32);
      if (c = {
        type: "function",
        sourceIndex: S - U.length,
        value: U,
        before: r.slice(S + 1, o)
      }, S = o, U === "url" && A !== eu && A !== Xl) {
        o -= 1;
        do
          if (g = !1, o = r.indexOf(")", o + 1), ~o)
            for (b = o; r.charCodeAt(b - 1) === Gl; )
              b -= 1, g = !g;
          else
            r += ")", o = r.length - 1, c.unclosed = !0;
        while (g);
        x = o;
        do
          x -= 1, A = r.charCodeAt(x);
        while (A <= 32);
        S !== x + 1 ? c.nodes = [
          {
            type: "word",
            sourceIndex: S,
            value: r.slice(S, x + 1)
          }
        ] : c.nodes = [], c.unclosed && x + 1 !== o ? (c.after = "", c.nodes.push({
          type: "space",
          sourceIndex: x + 1,
          value: r.slice(x + 1, o)
        })) : c.after = r.slice(x + 1, o), S = o + 1, A = r.charCodeAt(S), e.push(c);
      } else
        D += 1, c.after = "", e.push(c), y.push(c), e = c.nodes = [], C = c;
      U = "";
    } else if (Hl === A && D)
      S += 1, A = r.charCodeAt(S), C.after = Z, Z = "", D -= 1, y.pop(), C = y[D], e = C.nodes;
    else {
      o = S;
      do
        A === Gl && (o += 1), o += 1, A = r.charCodeAt(o);
      while (o < k && !(A <= 32 || A === eu || A === Xl || A === Zl || A === Kl || A === nu || A === Yl || A === Hl && D));
      c = r.slice(S, o), Yl === A ? U = c : e.push({
        type: "word",
        sourceIndex: S,
        value: c
      }), S = o;
    }
  for (S = y.length - 1; S; S -= 1)
    y[S].unclosed = !0;
  return y[0].nodes;
}, $2 = function u(e, r, o) {
  var l, h, c, g;
  for (l = 0, h = e.length; l < h; l += 1)
    c = e[l], o || (g = r(c, l, e)), g !== !1 && c.type === "function" && Array.isArray(c.nodes) && u(c.nodes, r, o), o && r(c, l, e);
};
function Wd(u, e) {
  var r = u.type, o = u.value, l, h;
  return e && (h = e(u)) !== void 0 ? h : r === "word" || r === "space" ? o : r === "string" ? (l = u.quote || "", l + o + (u.unclosed ? "" : l)) : r === "comment" ? "/*" + o + (u.unclosed ? "" : "*/") : r === "div" ? (u.before || "") + o + (u.after || "") : Array.isArray(u.nodes) ? (l = dg(u.nodes), r !== "function" ? l : o + "(" + (u.before || "") + l + (u.after || "") + (u.unclosed ? "" : ")")) : o;
}
function dg(u, e) {
  var r, o;
  if (Array.isArray(u)) {
    for (r = "", o = u.length - 1; ~o; o -= 1)
      r = Wd(u[o], e) + r;
    return r;
  }
  return Wd(u, e);
}
var V2 = dg, Jl, Yd;
function U2() {
  if (Yd)
    return Jl;
  Yd = 1;
  var u = "-".charCodeAt(0), e = "+".charCodeAt(0), r = ".".charCodeAt(0), o = "e".charCodeAt(0), l = "E".charCodeAt(0);
  return Jl = function(h) {
    for (var c = 0, g = h.length, b = !1, x = -1, S = !1, A; c < g; ) {
      if (A = h.charCodeAt(c), A >= 48 && A <= 57)
        S = !0;
      else if (A === o || A === l) {
        if (x > -1)
          break;
        x = c;
      } else if (A === r) {
        if (b)
          break;
        b = !0;
      } else if (A === e || A === u) {
        if (c !== 0)
          break;
      } else
        break;
      c += 1;
    }
    return x + 1 === c && c--, S ? {
      number: h.slice(0, c),
      unit: h.slice(c)
    } : !1;
  }, Jl;
}
var q2 = F2, _g = $2, gg = V2;
function is(u) {
  return this instanceof is ? (this.nodes = q2(u), this) : new is(u);
}
is.prototype.toString = function() {
  return Array.isArray(this.nodes) ? gg(this.nodes) : "";
};
is.prototype.walk = function(u, e) {
  return _g(this.nodes, u, e), this;
};
is.unit = U2();
is.walk = _g;
is.stringify = gg;
var W2 = is;
function Y2(u) {
  throw new Error('Could not dynamically require "' + u + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var vg = {};
(function(u) {
  var e = function() {
    function r(k, y) {
      Object.defineProperty(this, "name", {
        enumerable: !1,
        writable: !1,
        value: "JisonParserError"
      }), k == null && (k = "???"), Object.defineProperty(this, "message", {
        enumerable: !1,
        writable: !0,
        value: k
      }), this.hash = y;
      var D;
      if (y && y.exception instanceof Error) {
        var C = y.exception;
        this.message = C.message || k, D = C.stack;
      }
      D || (Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(this, this.constructor) : D = new Error(k).stack), D && Object.defineProperty(this, "stack", {
        enumerable: !1,
        writable: !1,
        value: D
      });
    }
    typeof Object.setPrototypeOf == "function" ? Object.setPrototypeOf(r.prototype, Error.prototype) : r.prototype = Object.create(Error.prototype), r.prototype.constructor = r, r.prototype.name = "JisonParserError";
    function o(k) {
      for (var y = [], D = k.pop, C = k.rule, U = 0, $ = D.length; U < $; U++)
        y.push([
          D[U],
          C[U]
        ]);
      return y;
    }
    function l(k) {
      for (var y = {}, D = k.idx, C = k.goto, U = 0, $ = D.length; U < $; U++) {
        var Z = D[U];
        y[Z] = C[U];
      }
      return y;
    }
    function h(k) {
      for (var y = [], D = k.len, C = k.symbol, U = k.type, $ = k.state, Z = k.mode, K = k.goto, ot = 0, lt = D.length; ot < lt; ot++) {
        for (var ct = D[ot], ht = {}, _t = 0; _t < ct; _t++) {
          var at = C.shift();
          switch (U.shift()) {
            case 2:
              ht[at] = [
                Z.shift(),
                K.shift()
              ];
              break;
            case 0:
              ht[at] = $.shift();
              break;
            default:
              ht[at] = [
                3
              ];
          }
        }
        y.push(ht);
      }
      return y;
    }
    function c(k, y, D) {
      D = D || 0;
      for (var C = 0; C < y; C++)
        this.push(k), k += D;
    }
    function g(k, y) {
      for (k = this.length - k, y += k; k < y; k++)
        this.push(this[k]);
    }
    function b(k) {
      for (var y = [], D = 0, C = k.length; D < C; D++) {
        var U = k[D];
        typeof U == "function" ? (D++, U.apply(y, k[D])) : y.push(U);
      }
      return y;
    }
    var x = {
      // Code Generator Information Report
      // ---------------------------------
      //
      // Options:
      //
      //   default action mode: ............. ["classic","merge"]
      //   test-compile action mode: ........ "parser:*,lexer:*"
      //   try..catch: ...................... true
      //   default resolve on conflict: ..... true
      //   on-demand look-ahead: ............ false
      //   error recovery token skip maximum: 3
      //   yyerror in parse actions is: ..... NOT recoverable,
      //   yyerror in lexer actions and other non-fatal lexer are:
      //   .................................. NOT recoverable,
      //   debug grammar/output: ............ false
      //   has partial LR conflict upgrade:   true
      //   rudimentary token-stack support:   false
      //   parser table compression mode: ... 2
      //   export debug tables: ............. false
      //   export *all* tables: ............. false
      //   module type: ..................... commonjs
      //   parser engine type: .............. lalr
      //   output main() in the module: ..... true
      //   has user-specified main(): ....... false
      //   has user-specified require()/import modules for main():
      //   .................................. false
      //   number of expected conflicts: .... 0
      //
      //
      // Parser Analysis flags:
      //
      //   no significant actions (parser is a language matcher only):
      //   .................................. false
      //   uses yyleng: ..................... false
      //   uses yylineno: ................... false
      //   uses yytext: ..................... false
      //   uses yylloc: ..................... false
      //   uses ParseError API: ............. false
      //   uses YYERROR: .................... false
      //   uses YYRECOVERING: ............... false
      //   uses YYERROK: .................... false
      //   uses YYCLEARIN: .................. false
      //   tracks rule values: .............. true
      //   assigns rule values: ............. true
      //   uses location tracking: .......... false
      //   assigns location: ................ false
      //   uses yystack: .................... false
      //   uses yysstack: ................... false
      //   uses yysp: ....................... true
      //   uses yyrulelength: ............... false
      //   uses yyMergeLocationInfo API: .... false
      //   has error recovery: .............. false
      //   has error reporting: ............. false
      //
      // --------- END OF REPORT -----------
      trace: function() {
      },
      JisonParserError: r,
      yy: {},
      options: {
        type: "lalr",
        hasPartialLrUpgradeOnConflict: !0,
        errorRecoveryTokenDiscardCount: 3
      },
      symbols_: {
        $accept: 0,
        $end: 1,
        ADD: 3,
        ANGLE: 16,
        CHS: 22,
        COMMA: 14,
        CSS_CPROP: 13,
        CSS_VAR: 12,
        DIV: 6,
        EMS: 20,
        EOF: 1,
        EXS: 21,
        FREQ: 18,
        LENGTH: 15,
        LPAREN: 7,
        MUL: 5,
        NESTED_CALC: 9,
        NUMBER: 11,
        PERCENTAGE: 28,
        PREFIX: 10,
        REMS: 23,
        RES: 19,
        RPAREN: 8,
        SUB: 4,
        TIME: 17,
        VHS: 24,
        VMAXS: 27,
        VMINS: 26,
        VWS: 25,
        css_value: 33,
        css_variable: 32,
        error: 2,
        expression: 29,
        math_expression: 30,
        value: 31
      },
      terminals_: {
        1: "EOF",
        2: "error",
        3: "ADD",
        4: "SUB",
        5: "MUL",
        6: "DIV",
        7: "LPAREN",
        8: "RPAREN",
        9: "NESTED_CALC",
        10: "PREFIX",
        11: "NUMBER",
        12: "CSS_VAR",
        13: "CSS_CPROP",
        14: "COMMA",
        15: "LENGTH",
        16: "ANGLE",
        17: "TIME",
        18: "FREQ",
        19: "RES",
        20: "EMS",
        21: "EXS",
        22: "CHS",
        23: "REMS",
        24: "VHS",
        25: "VWS",
        26: "VMINS",
        27: "VMAXS",
        28: "PERCENTAGE"
      },
      TERROR: 2,
      EOF: 1,
      // internals: defined here so the object *structure* doesn't get modified by parse() et al,
      // thus helping JIT compilers like Chrome V8.
      originalQuoteName: null,
      originalParseError: null,
      cleanupAfterParse: null,
      constructParseErrorInfo: null,
      yyMergeLocationInfo: null,
      __reentrant_call_depth: 0,
      // INTERNAL USE ONLY
      __error_infos: [],
      // INTERNAL USE ONLY: the set of parseErrorInfo objects created since the last cleanup
      __error_recovery_infos: [],
      // INTERNAL USE ONLY: the set of parseErrorInfo objects created since the last cleanup
      // APIs which will be set up depending on user action code analysis:
      //yyRecovering: 0,
      //yyErrOk: 0,
      //yyClearIn: 0,
      // Helper APIs
      // -----------
      // Helper function which can be overridden by user code later on: put suitable quotes around
      // literal IDs in a description string.
      quoteName: function(y) {
        return '"' + y + '"';
      },
      // Return the name of the given symbol (terminal or non-terminal) as a string, when available.
      //
      // Return NULL when the symbol is unknown to the parser.
      getSymbolName: function(y) {
        if (this.terminals_[y])
          return this.terminals_[y];
        var D = this.symbols_;
        for (var C in D)
          if (D[C] === y)
            return C;
        return null;
      },
      // Return a more-or-less human-readable description of the given symbol, when available,
      // or the symbol itself, serving as its own 'description' for lack of something better to serve up.
      //
      // Return NULL when the symbol is unknown to the parser.
      describeSymbol: function(y) {
        if (y !== this.EOF && this.terminal_descriptions_ && this.terminal_descriptions_[y])
          return this.terminal_descriptions_[y];
        if (y === this.EOF)
          return "end of input";
        var D = this.getSymbolName(y);
        return D ? this.quoteName(D) : null;
      },
      // Produce a (more or less) human-readable list of expected tokens at the point of failure.
      //
      // The produced list may contain token or token set descriptions instead of the tokens
      // themselves to help turning this output into something that easier to read by humans
      // unless `do_not_describe` parameter is set, in which case a list of the raw, *numeric*,
      // expected terminals and nonterminals is produced.
      //
      // The returned list (array) will not contain any duplicate entries.
      collect_expected_token_set: function(y, D) {
        var C = this.TERROR, U = [], $ = {};
        if (!D && this.state_descriptions_ && this.state_descriptions_[y])
          return [
            this.state_descriptions_[y]
          ];
        for (var Z in this.table[y])
          if (Z = +Z, Z !== C) {
            var K = D ? Z : this.describeSymbol(Z);
            K && !$[K] && (U.push(K), $[K] = !0);
          }
        return U;
      },
      productions_: o({
        pop: b([
          29,
          c,
          [30, 10],
          31,
          31,
          32,
          32,
          c,
          [33, 15]
        ]),
        rule: b([
          2,
          c,
          [3, 5],
          4,
          7,
          c,
          [1, 4],
          2,
          4,
          6,
          c,
          [1, 14],
          2
        ])
      }),
      performAction: function(y, D, C) {
        var U = this.yy;
        switch (U.parser, U.lexer, y) {
          case 0:
            this.$ = C[D - 1];
            break;
          case 1:
            return this.$ = C[D - 1], C[D - 1];
          case 2:
          case 3:
          case 4:
          case 5:
            this.$ = { type: "MathExpression", operator: C[D - 1], left: C[D - 2], right: C[D] };
            break;
          case 6:
            this.$ = C[D - 1];
            break;
          case 7:
            this.$ = { type: "Calc", value: C[D - 1] };
            break;
          case 8:
            this.$ = { type: "Calc", value: C[D - 1], prefix: C[D - 5] };
            break;
          case 9:
          case 10:
          case 11:
            this.$ = C[D];
            break;
          case 12:
            this.$ = { type: "Value", value: parseFloat(C[D]) };
            break;
          case 13:
            this.$ = { type: "Value", value: parseFloat(C[D]) * -1 };
            break;
          case 14:
            this.$ = { type: "CssVariable", value: C[D - 1] };
            break;
          case 15:
            this.$ = { type: "CssVariable", value: C[D - 3], fallback: C[D - 1] };
            break;
          case 16:
            this.$ = { type: "LengthValue", value: parseFloat(C[D]), unit: /[a-z]+/.exec(C[D])[0] };
            break;
          case 17:
            this.$ = { type: "AngleValue", value: parseFloat(C[D]), unit: /[a-z]+/.exec(C[D])[0] };
            break;
          case 18:
            this.$ = { type: "TimeValue", value: parseFloat(C[D]), unit: /[a-z]+/.exec(C[D])[0] };
            break;
          case 19:
            this.$ = { type: "FrequencyValue", value: parseFloat(C[D]), unit: /[a-z]+/.exec(C[D])[0] };
            break;
          case 20:
            this.$ = { type: "ResolutionValue", value: parseFloat(C[D]), unit: /[a-z]+/.exec(C[D])[0] };
            break;
          case 21:
            this.$ = { type: "EmValue", value: parseFloat(C[D]), unit: "em" };
            break;
          case 22:
            this.$ = { type: "ExValue", value: parseFloat(C[D]), unit: "ex" };
            break;
          case 23:
            this.$ = { type: "ChValue", value: parseFloat(C[D]), unit: "ch" };
            break;
          case 24:
            this.$ = { type: "RemValue", value: parseFloat(C[D]), unit: "rem" };
            break;
          case 25:
            this.$ = { type: "VhValue", value: parseFloat(C[D]), unit: "vh" };
            break;
          case 26:
            this.$ = { type: "VwValue", value: parseFloat(C[D]), unit: "vw" };
            break;
          case 27:
            this.$ = { type: "VminValue", value: parseFloat(C[D]), unit: "vmin" };
            break;
          case 28:
            this.$ = { type: "VmaxValue", value: parseFloat(C[D]), unit: "vmax" };
            break;
          case 29:
            this.$ = { type: "PercentageValue", value: parseFloat(C[D]), unit: "%" };
            break;
          case 30:
            var $ = C[D];
            $.value *= -1, this.$ = $;
            break;
        }
      },
      table: h({
        len: b([
          24,
          1,
          5,
          23,
          1,
          18,
          c,
          [0, 3],
          1,
          c,
          [0, 16],
          c,
          [23, 4],
          g,
          [28, 3],
          0,
          0,
          16,
          1,
          6,
          6,
          c,
          [0, 3],
          5,
          1,
          2,
          g,
          [37, 3],
          g,
          [20, 3],
          5,
          0,
          0
        ]),
        symbol: b([
          4,
          7,
          9,
          11,
          12,
          c,
          [15, 19, 1],
          1,
          1,
          c,
          [3, 4, 1],
          g,
          [30, 19],
          g,
          [29, 4],
          7,
          4,
          10,
          11,
          g,
          [22, 14],
          g,
          [19, 3],
          g,
          [43, 22],
          g,
          [23, 69],
          g,
          [139, 4],
          8,
          g,
          [51, 24],
          4,
          g,
          [138, 15],
          13,
          g,
          [186, 5],
          8,
          g,
          [6, 6],
          g,
          [5, 5],
          9,
          8,
          14,
          g,
          [159, 47],
          g,
          [60, 10]
        ]),
        type: b([
          c,
          [2, 19],
          c,
          [0, 5],
          1,
          c,
          [2, 24],
          c,
          [0, 4],
          g,
          [22, 19],
          g,
          [43, 42],
          g,
          [23, 70],
          g,
          [28, 25],
          g,
          [45, 25],
          g,
          [113, 54]
        ]),
        state: b([
          1,
          2,
          8,
          6,
          7,
          30,
          g,
          [4, 3],
          33,
          37,
          g,
          [5, 3],
          38,
          g,
          [4, 3],
          39,
          g,
          [4, 3],
          40,
          g,
          [4, 3],
          42,
          g,
          [21, 4],
          50,
          g,
          [5, 3],
          51,
          g,
          [4, 3]
        ]),
        mode: b([
          c,
          [1, 179],
          c,
          [2, 3],
          g,
          [5, 5],
          g,
          [6, 4],
          c,
          [1, 57]
        ]),
        goto: b([
          5,
          3,
          4,
          24,
          c,
          [9, 15, 1],
          c,
          [25, 5, 1],
          g,
          [24, 19],
          31,
          35,
          32,
          34,
          g,
          [18, 14],
          36,
          g,
          [38, 19],
          g,
          [19, 57],
          g,
          [118, 4],
          41,
          g,
          [24, 19],
          43,
          35,
          g,
          [16, 14],
          44,
          c,
          [2, 3],
          28,
          29,
          2,
          c,
          [3, 3],
          28,
          29,
          3,
          g,
          [53, 4],
          c,
          [45, 5, 1],
          g,
          [100, 42],
          52,
          g,
          [5, 4],
          53
        ])
      }),
      defaultActions: l({
        idx: b([
          6,
          7,
          8,
          c,
          [10, 16, 1],
          33,
          34,
          39,
          40,
          41,
          45,
          47,
          52,
          53
        ]),
        goto: b([
          9,
          10,
          11,
          c,
          [16, 14, 1],
          12,
          1,
          30,
          13,
          c,
          [4, 4, 1],
          14,
          15,
          8
        ])
      }),
      parseError: function(y, D, C) {
        if (D.recoverable)
          typeof this.trace == "function" && this.trace(y), D.destroy();
        else
          throw typeof this.trace == "function" && this.trace(y), C || (C = this.JisonParserError), new C(y, D);
      },
      parse: function(y) {
        var D = this, C = new Array(128), U = new Array(128), $ = new Array(128), Z = this.table, K = 0, ot = 0;
        this.TERROR;
        var lt = this.EOF;
        this.options.errorRecoveryTokenDiscardCount | 0;
        var ct = [
          0,
          54
          /* === table.length :: ensures that anyone using this new state will fail dramatically! */
        ], ht;
        this.__lexer__ ? ht = this.__lexer__ : ht = this.__lexer__ = Object.create(this.lexer);
        var _t = {
          parseError: void 0,
          quoteName: void 0,
          lexer: void 0,
          parser: void 0,
          pre_parse: void 0,
          post_parse: void 0,
          pre_lex: void 0,
          post_lex: void 0
          // WARNING: must be written this way for the code expanders to work correctly in both ES5 and ES6 modes!
        };
        typeof assert != "function" || assert, this.yyGetSharedState = function() {
          return _t;
        };
        function at(Ct, wt) {
          for (var Lt in wt)
            typeof Ct[Lt] > "u" && Object.prototype.hasOwnProperty.call(wt, Lt) && (Ct[Lt] = wt[Lt]);
        }
        at(_t, this.yy), _t.lexer = ht, _t.parser = this, typeof _t.parseError == "function" ? this.parseError = function(wt, Lt, zt) {
          return zt || (zt = this.JisonParserError), _t.parseError.call(this, wt, Lt, zt);
        } : this.parseError = this.originalParseError, typeof _t.quoteName == "function" ? this.quoteName = function(wt) {
          return _t.quoteName.call(this, wt);
        } : this.quoteName = this.originalQuoteName, this.cleanupAfterParse = function(wt, Lt, zt) {
          var jt;
          if (Lt) {
            var Se;
            (_t.post_parse || this.post_parse) && (Se = this.constructParseErrorInfo(null, null, null, !1)), _t.post_parse && (jt = _t.post_parse.call(this, _t, wt, Se), typeof jt < "u" && (wt = jt)), this.post_parse && (jt = this.post_parse.call(this, _t, wt, Se), typeof jt < "u" && (wt = jt)), Se && Se.destroy && Se.destroy();
          }
          if (this.__reentrant_call_depth > 1)
            return wt;
          if (ht.cleanupAfterLex && ht.cleanupAfterLex(zt), _t && (_t.lexer = void 0, _t.parser = void 0, ht.yy === _t && (ht.yy = void 0)), _t = void 0, this.parseError = this.originalParseError, this.quoteName = this.originalQuoteName, C.length = 0, U.length = 0, $.length = 0, K = 0, !zt) {
            for (var Le = this.__error_infos.length - 1; Le >= 0; Le--) {
              var Ge = this.__error_infos[Le];
              Ge && typeof Ge.destroy == "function" && Ge.destroy();
            }
            this.__error_infos.length = 0;
          }
          return wt;
        }, this.constructParseErrorInfo = function(wt, Lt, zt, jt) {
          var Se = {
            errStr: wt,
            exception: Lt,
            text: ht.match,
            value: ht.yytext,
            token: this.describeSymbol(ot) || ot,
            token_id: ot,
            line: ht.yylineno,
            expected: zt,
            recoverable: jt,
            state: kt,
            action: bt,
            new_state: he,
            symbol_stack: C,
            state_stack: U,
            value_stack: $,
            stack_pointer: K,
            yy: _t,
            lexer: ht,
            parser: this,
            // and make sure the error info doesn't stay due to potential
            // ref cycle via userland code manipulations.
            // These would otherwise all be memory leak opportunities!
            //
            // Note that only array and object references are nuked as those
            // constitute the set of elements which can produce a cyclic ref.
            // The rest of the members is kept intact as they are harmless.
            destroy: function() {
              var Ge = !!this.recoverable;
              for (var Te in this)
                this.hasOwnProperty(Te) && typeof Te == "object" && (this[Te] = void 0);
              this.recoverable = Ge;
            }
          };
          return this.__error_infos.push(Se), Se;
        };
        function Pt() {
          var Ct = ht.lex();
          return typeof Ct != "number" && (Ct = D.symbols_[Ct] || Ct), Ct || lt;
        }
        function Mt() {
          var Ct = ht.fastLex();
          return typeof Ct != "number" && (Ct = D.symbols_[Ct] || Ct), Ct || lt;
        }
        var Et = Pt, kt, bt, Dt, vt, $t = {
          $: !0,
          _$: void 0,
          yy: _t
        }, Yt, Bt, ae, he, Ie = !1;
        try {
          if (this.__reentrant_call_depth++, ht.setInput(y, _t), typeof ht.canIUse == "function") {
            var rn = ht.canIUse();
            rn.fastLex && typeof Mt == "function" && (Et = Mt);
          }
          for ($[K] = null, U[K] = 0, C[K] = 0, ++K, this.pre_parse && this.pre_parse.call(this, _t), _t.pre_parse && _t.pre_parse.call(this, _t), he = U[K - 1]; ; ) {
            if (kt = he, this.defaultActions[kt])
              bt = 2, he = this.defaultActions[kt];
            else if (ot || (ot = Et()), vt = Z[kt] && Z[kt][ot] || ct, he = vt[1], bt = vt[0], !bt) {
              var ye, oe = this.describeSymbol(ot) || ot, qe = this.collect_expected_token_set(kt);
              typeof ht.yylineno == "number" ? ye = "Parse error on line " + (ht.yylineno + 1) + ": " : ye = "Parse error: ", typeof ht.showPosition == "function" && (ye += `
` + ht.showPosition(79 - 10, 10) + `
`), qe.length ? ye += "Expecting " + qe.join(", ") + ", got unexpected " + oe : ye += "Unexpected " + oe, Yt = this.constructParseErrorInfo(ye, null, qe, !1), Dt = this.parseError(Yt.errStr, Yt, this.JisonParserError), typeof Dt < "u" && (Ie = Dt);
              break;
            }
            switch (bt) {
              default:
                if (bt instanceof Array) {
                  Yt = this.constructParseErrorInfo("Parse Error: multiple actions possible at state: " + kt + ", token: " + ot, null, null, !1), Dt = this.parseError(Yt.errStr, Yt, this.JisonParserError), typeof Dt < "u" && (Ie = Dt);
                  break;
                }
                Yt = this.constructParseErrorInfo("Parsing halted. No viable error recovery approach available due to internal system failure.", null, null, !1), Dt = this.parseError(Yt.errStr, Yt, this.JisonParserError), typeof Dt < "u" && (Ie = Dt);
                break;
              case 1:
                C[K] = ot, $[K] = ht.yytext, U[K] = he, ++K, ot = 0;
                continue;
              case 2:
                if (ae = this.productions_[he - 1], Bt = ae[1], Dt = this.performAction.call($t, he, K - 1, $), typeof Dt < "u") {
                  Ie = Dt;
                  break;
                }
                K -= Bt;
                var si = ae[0];
                C[K] = si, $[K] = $t.$, he = Z[U[K - 1]][si], U[K] = he, ++K;
                continue;
              case 3:
                K !== -2 && (Ie = !0, K--, typeof $[K] < "u" && (Ie = $[K]));
                break;
            }
            break;
          }
        } catch (Ct) {
          if (Ct instanceof this.JisonParserError)
            throw Ct;
          if (ht && typeof ht.JisonLexerError == "function" && Ct instanceof ht.JisonLexerError)
            throw Ct;
          Yt = this.constructParseErrorInfo("Parsing aborted due to exception.", Ct, null, !1), Ie = !1, Dt = this.parseError(Yt.errStr, Yt, this.JisonParserError), typeof Dt < "u" && (Ie = Dt);
        } finally {
          Ie = this.cleanupAfterParse(Ie, !0, !0), this.__reentrant_call_depth--;
        }
        return Ie;
      }
    };
    x.originalParseError = x.parseError, x.originalQuoteName = x.quoteName;
    var S = function() {
      function k(D, C) {
        Object.defineProperty(this, "name", {
          enumerable: !1,
          writable: !1,
          value: "JisonLexerError"
        }), D == null && (D = "???"), Object.defineProperty(this, "message", {
          enumerable: !1,
          writable: !0,
          value: D
        }), this.hash = C;
        var U;
        if (C && C.exception instanceof Error) {
          var $ = C.exception;
          this.message = $.message || D, U = $.stack;
        }
        U || (Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(this, this.constructor) : U = new Error(D).stack), U && Object.defineProperty(this, "stack", {
          enumerable: !1,
          writable: !1,
          value: U
        });
      }
      typeof Object.setPrototypeOf == "function" ? Object.setPrototypeOf(k.prototype, Error.prototype) : k.prototype = Object.create(Error.prototype), k.prototype.constructor = k, k.prototype.name = "JisonLexerError";
      var y = {
        // Code Generator Information Report
        // ---------------------------------
        //
        // Options:
        //
        //   backtracking: .................... false
        //   location.ranges: ................. false
        //   location line+column tracking: ... true
        //
        //
        // Forwarded Parser Analysis flags:
        //
        //   uses yyleng: ..................... false
        //   uses yylineno: ................... false
        //   uses yytext: ..................... false
        //   uses yylloc: ..................... false
        //   uses lexer values: ............... true / true
        //   location tracking: ............... false
        //   location assignment: ............. false
        //
        //
        // Lexer Analysis flags:
        //
        //   uses yyleng: ..................... ???
        //   uses yylineno: ................... ???
        //   uses yytext: ..................... ???
        //   uses yylloc: ..................... ???
        //   uses ParseError API: ............. ???
        //   uses yyerror: .................... ???
        //   uses location tracking & editing:  ???
        //   uses more() API: ................. ???
        //   uses unput() API: ................ ???
        //   uses reject() API: ............... ???
        //   uses less() API: ................. ???
        //   uses display APIs pastInput(), upcomingInput(), showPosition():
        //        ............................. ???
        //   uses describeYYLLOC() API: ....... ???
        //
        // --------- END OF REPORT -----------
        EOF: 1,
        ERROR: 2,
        // JisonLexerError: JisonLexerError,        /// <-- injected by the code generator
        // options: {},                             /// <-- injected by the code generator
        // yy: ...,                                 /// <-- injected by setInput()
        __currentRuleSet__: null,
        /// INTERNAL USE ONLY: internal rule set cache for the current lexer state  
        __error_infos: [],
        /// INTERNAL USE ONLY: the set of lexErrorInfo objects created since the last cleanup  
        __decompressed: !1,
        /// INTERNAL USE ONLY: mark whether the lexer instance has been 'unfolded' completely and is now ready for use  
        done: !1,
        /// INTERNAL USE ONLY  
        _backtrack: !1,
        /// INTERNAL USE ONLY  
        _input: "",
        /// INTERNAL USE ONLY  
        _more: !1,
        /// INTERNAL USE ONLY  
        _signaled_error_token: !1,
        /// INTERNAL USE ONLY  
        conditionStack: [],
        /// INTERNAL USE ONLY; managed via `pushState()`, `popState()`, `topState()` and `stateStackSize()`  
        match: "",
        /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks input which has been matched so far for the lexer token under construction. `match` is identical to `yytext` except that this one still contains the matched input string after `lexer.performAction()` has been invoked, where userland code MAY have changed/replaced the `yytext` value entirely!  
        matched: "",
        /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks entire input which has been matched so far  
        matches: !1,
        /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks RE match result for last (successful) match attempt  
        yytext: "",
        /// ADVANCED USE ONLY: tracks input which has been matched so far for the lexer token under construction; this value is transferred to the parser as the 'token value' when the parser consumes the lexer token produced through a call to the `lex()` API.  
        offset: 0,
        /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks the 'cursor position' in the input string, i.e. the number of characters matched so far  
        yyleng: 0,
        /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: length of matched input for the token under construction (`yytext`)  
        yylineno: 0,
        /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: 'line number' at which the token under construction is located  
        yylloc: null,
        /// READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks location info (lines + columns) for the token under construction  
        /**
         * INTERNAL USE: construct a suitable error info hash object instance for `parseError`.
         * 
         * @public
         * @this {RegExpLexer}
         */
        constructLexErrorInfo: function(C, U, $) {
          if (C = "" + C, $ == null && ($ = !(C.indexOf(`
`) > 0 && C.indexOf("^") > 0)), this.yylloc && $) {
            if (typeof this.prettyPrintRange == "function")
              this.prettyPrintRange(this.yylloc), /\n\s*$/.test(C) || (C += `
`), C += `
  Erroneous area:
` + this.prettyPrintRange(this.yylloc);
            else if (typeof this.showPosition == "function") {
              var Z = this.showPosition();
              Z && (C.length && C[C.length - 1] !== `
` && Z[0] !== `
` ? C += `
` + Z : C += Z);
            }
          }
          var K = {
            errStr: C,
            recoverable: !!U,
            text: this.match,
            // This one MAY be empty; userland code should use the `upcomingInput` API to obtain more text which follows the 'lexer cursor position'...  
            token: null,
            line: this.yylineno,
            loc: this.yylloc,
            yy: this.yy,
            lexer: this,
            /**
             * and make sure the error info doesn't stay due to potential
             * ref cycle via userland code manipulations.
             * These would otherwise all be memory leak opportunities!
             * 
             * Note that only array and object references are nuked as those
             * constitute the set of elements which can produce a cyclic ref.
             * The rest of the members is kept intact as they are harmless.
             * 
             * @public
             * @this {LexErrorInfo}
             */
            destroy: function() {
              var lt = !!this.recoverable;
              for (var ct in this)
                this.hasOwnProperty(ct) && typeof ct == "object" && (this[ct] = void 0);
              this.recoverable = lt;
            }
          };
          return this.__error_infos.push(K), K;
        },
        /**
         * handler which is invoked when a lexer error occurs.
         * 
         * @public
         * @this {RegExpLexer}
         */
        parseError: function(C, U, $) {
          if ($ || ($ = this.JisonLexerError), this.yy) {
            if (this.yy.parser && typeof this.yy.parser.parseError == "function")
              return this.yy.parser.parseError.call(this, C, U, $) || this.ERROR;
            if (typeof this.yy.parseError == "function")
              return this.yy.parseError.call(this, C, U, $) || this.ERROR;
          }
          throw new $(C, U);
        },
        /**
         * method which implements `yyerror(str, ...args)` functionality for use inside lexer actions.
         * 
         * @public
         * @this {RegExpLexer}
         */
        yyerror: function(C) {
          var U = "";
          this.yylloc && (U = " on line " + (this.yylineno + 1));
          var $ = this.constructLexErrorInfo(
            "Lexical error" + U + ": " + C,
            this.options.lexerErrorsAreRecoverable
          ), Z = Array.prototype.slice.call(arguments, 1);
          return Z.length && ($.extra_error_attributes = Z), this.parseError($.errStr, $, this.JisonLexerError) || this.ERROR;
        },
        /**
         * final cleanup function for when we have completed lexing the input;
         * make it an API so that external code can use this one once userland
         * code has decided it's time to destroy any lingering lexer error
         * hash object instances and the like: this function helps to clean
         * up these constructs, which *may* carry cyclic references which would
         * otherwise prevent the instances from being properly and timely
         * garbage-collected, i.e. this function helps prevent memory leaks!
         * 
         * @public
         * @this {RegExpLexer}
         */
        cleanupAfterLex: function(C) {
          if (this.setInput("", {}), !C) {
            for (var U = this.__error_infos.length - 1; U >= 0; U--) {
              var $ = this.__error_infos[U];
              $ && typeof $.destroy == "function" && $.destroy();
            }
            this.__error_infos.length = 0;
          }
          return this;
        },
        /**
         * clear the lexer token context; intended for internal use only
         * 
         * @public
         * @this {RegExpLexer}
         */
        clear: function() {
          this.yytext = "", this.yyleng = 0, this.match = "", this.matches = !1, this._more = !1, this._backtrack = !1;
          var C = this.yylloc ? this.yylloc.last_column : 0;
          this.yylloc = {
            first_line: this.yylineno + 1,
            first_column: C,
            last_line: this.yylineno + 1,
            last_column: C,
            range: [this.offset, this.offset]
          };
        },
        /**
         * resets the lexer, sets new input
         * 
         * @public
         * @this {RegExpLexer}
         */
        setInput: function(C, U) {
          if (this.yy = U || this.yy || {}, !this.__decompressed) {
            for (var $ = this.rules, Z = 0, K = $.length; Z < K; Z++) {
              var ot = $[Z];
              typeof ot == "number" && ($[Z] = $[ot]);
            }
            var lt = this.conditions;
            for (var ct in lt) {
              for (var ht = lt[ct], _t = ht.rules, K = _t.length, at = new Array(K + 1), Pt = new Array(K + 1), Z = 0; Z < K; Z++) {
                var Mt = _t[Z], ot = $[Mt];
                at[Z + 1] = ot, Pt[Z + 1] = Mt;
              }
              ht.rules = Pt, ht.__rule_regexes = at, ht.__rule_count = K;
            }
            this.__decompressed = !0;
          }
          return this._input = C || "", this.clear(), this._signaled_error_token = !1, this.done = !1, this.yylineno = 0, this.matched = "", this.conditionStack = ["INITIAL"], this.__currentRuleSet__ = null, this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0,
            range: [0, 0]
          }, this.offset = 0, this;
        },
        /**
         * edit the remaining input via user-specified callback.
         * This can be used to forward-adjust the input-to-parse, 
         * e.g. inserting macro expansions and alike in the
         * input which has yet to be lexed.
         * The behaviour of this API contrasts the `unput()` et al
         * APIs as those act on the *consumed* input, while this
         * one allows one to manipulate the future, without impacting
         * the current `yyloc` cursor location or any history. 
         * 
         * Use this API to help implement C-preprocessor-like
         * `#include` statements, etc.
         * 
         * The provided callback must be synchronous and is
         * expected to return the edited input (string).
         *
         * The `cpsArg` argument value is passed to the callback
         * as-is.
         *
         * `callback` interface: 
         * `function callback(input, cpsArg)`
         * 
         * - `input` will carry the remaining-input-to-lex string
         *   from the lexer.
         * - `cpsArg` is `cpsArg` passed into this API.
         * 
         * The `this` reference for the callback will be set to
         * reference this lexer instance so that userland code
         * in the callback can easily and quickly access any lexer
         * API. 
         *
         * When the callback returns a non-string-type falsey value,
         * we assume the callback did not edit the input and we
         * will using the input as-is.
         *
         * When the callback returns a non-string-type value, it
         * is converted to a string for lexing via the `"" + retval`
         * operation. (See also why: http://2ality.com/2012/03/converting-to-string.html 
         * -- that way any returned object's `toValue()` and `toString()`
         * methods will be invoked in a proper/desirable order.)
         * 
         * @public
         * @this {RegExpLexer}
         */
        editRemainingInput: function(C, U) {
          var $ = C.call(this, this._input, U);
          return typeof $ != "string" ? $ && (this._input = "" + $) : this._input = $, this;
        },
        /**
         * consumes and returns one char from the input
         * 
         * @public
         * @this {RegExpLexer}
         */
        input: function() {
          if (!this._input)
            return null;
          var C = this._input[0];
          this.yytext += C, this.yyleng++, this.offset++, this.match += C, this.matched += C;
          var U = 1, $ = !1;
          if (C === `
`)
            $ = !0;
          else if (C === "\r") {
            $ = !0;
            var Z = this._input[1];
            Z === `
` && (U++, C += Z, this.yytext += Z, this.yyleng++, this.offset++, this.match += Z, this.matched += Z, this.yylloc.range[1]++);
          }
          return $ ? (this.yylineno++, this.yylloc.last_line++, this.yylloc.last_column = 0) : this.yylloc.last_column++, this.yylloc.range[1]++, this._input = this._input.slice(U), C;
        },
        /**
         * unshifts one char (or an entire string) into the input
         * 
         * @public
         * @this {RegExpLexer}
         */
        unput: function(C) {
          var U = C.length, $ = C.split(/(?:\r\n?|\n)/g);
          if (this._input = C + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - U), this.yyleng = this.yytext.length, this.offset -= U, this.match = this.match.substr(0, this.match.length - U), this.matched = this.matched.substr(0, this.matched.length - U), $.length > 1) {
            this.yylineno -= $.length - 1, this.yylloc.last_line = this.yylineno + 1;
            var Z = this.match, K = Z.split(/(?:\r\n?|\n)/g);
            K.length === 1 && (Z = this.matched, K = Z.split(/(?:\r\n?|\n)/g)), this.yylloc.last_column = K[K.length - 1].length;
          } else
            this.yylloc.last_column -= U;
          return this.yylloc.range[1] = this.yylloc.range[0] + this.yyleng, this.done = !1, this;
        },
        /**
         * cache matched text and append it on next action
         * 
         * @public
         * @this {RegExpLexer}
         */
        more: function() {
          return this._more = !0, this;
        },
        /**
         * signal the lexer that this rule fails to match the input, so the
         * next matching rule (regex) should be tested instead.
         * 
         * @public
         * @this {RegExpLexer}
         */
        reject: function() {
          if (this.options.backtrack_lexer)
            this._backtrack = !0;
          else {
            var C = "";
            this.yylloc && (C = " on line " + (this.yylineno + 1));
            var U = this.constructLexErrorInfo(
              "Lexical error" + C + ": You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).",
              !1
            );
            this._signaled_error_token = this.parseError(U.errStr, U, this.JisonLexerError) || this.ERROR;
          }
          return this;
        },
        /**
         * retain first n characters of the match
         * 
         * @public
         * @this {RegExpLexer}
         */
        less: function(C) {
          return this.unput(this.match.slice(C));
        },
        /**
         * return (part of the) already matched input, i.e. for error
         * messages.
         * 
         * Limit the returned string length to `maxSize` (default: 20).
         * 
         * Limit the returned string to the `maxLines` number of lines of
         * input (default: 1).
         * 
         * Negative limit values equal *unlimited*.
         * 
         * @public
         * @this {RegExpLexer}
         */
        pastInput: function(C, U) {
          var $ = this.matched.substring(0, this.matched.length - this.match.length);
          C < 0 ? C = $.length : C || (C = 20), U < 0 ? U = $.length : U || (U = 1), $ = $.substr(-C * 2 - 2);
          var Z = $.replace(/\r\n|\r/g, `
`).split(`
`);
          return Z = Z.slice(-U), $ = Z.join(`
`), $.length > C && ($ = "..." + $.substr(-C)), $;
        },
        /**
         * return (part of the) upcoming input, i.e. for error messages.
         * 
         * Limit the returned string length to `maxSize` (default: 20).
         * 
         * Limit the returned string to the `maxLines` number of lines of input (default: 1).
         * 
         * Negative limit values equal *unlimited*.
         *
         * > ### NOTE ###
         * >
         * > *"upcoming input"* is defined as the whole of the both
         * > the *currently lexed* input, together with any remaining input
         * > following that. *"currently lexed"* input is the input 
         * > already recognized by the lexer but not yet returned with
         * > the lexer token. This happens when you are invoking this API
         * > from inside any lexer rule action code block. 
         * >
         * 
         * @public
         * @this {RegExpLexer}
         */
        upcomingInput: function(C, U) {
          var $ = this.match;
          C < 0 ? C = $.length + this._input.length : C || (C = 20), U < 0 ? U = C : U || (U = 1), $.length < C * 2 + 2 && ($ += this._input.substring(0, C * 2 + 2));
          var Z = $.replace(/\r\n|\r/g, `
`).split(`
`);
          return Z = Z.slice(0, U), $ = Z.join(`
`), $.length > C && ($ = $.substring(0, C) + "..."), $;
        },
        /**
         * return a string which displays the character position where the
         * lexing error occurred, i.e. for error messages
         * 
         * @public
         * @this {RegExpLexer}
         */
        showPosition: function(C, U) {
          var $ = this.pastInput(C).replace(/\s/g, " "), Z = new Array($.length + 1).join("-");
          return $ + this.upcomingInput(U).replace(/\s/g, " ") + `
` + Z + "^";
        },
        /**
         * return an YYLLOC info object derived off the given context (actual, preceding, following, current).
         * Use this method when the given `actual` location is not guaranteed to exist (i.e. when
         * it MAY be NULL) and you MUST have a valid location info object anyway:
         * then we take the given context of the `preceding` and `following` locations, IFF those are available,
         * and reconstruct the `actual` location info from those.
         * If this fails, the heuristic is to take the `current` location, IFF available.
         * If this fails as well, we assume the sought location is at/around the current lexer position
         * and then produce that one as a response. DO NOTE that these heuristic/derived location info
         * values MAY be inaccurate!
         *
         * NOTE: `deriveLocationInfo()` ALWAYS produces a location info object *copy* of `actual`, not just
         * a *reference* hence all input location objects can be assumed to be 'constant' (function has no side-effects).
         * 
         * @public
         * @this {RegExpLexer}
         */
        deriveLocationInfo: function(C, U, $, Z) {
          var K = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0,
            range: [0, 0]
          };
          return C && (K.first_line = C.first_line | 0, K.last_line = C.last_line | 0, K.first_column = C.first_column | 0, K.last_column = C.last_column | 0, C.range && (K.range[0] = C.range[0] | 0, K.range[1] = C.range[1] | 0)), (K.first_line <= 0 || K.last_line < K.first_line) && (K.first_line <= 0 && U && (K.first_line = U.last_line | 0, K.first_column = U.last_column | 0, U.range && (K.range[0] = C.range[1] | 0)), (K.last_line <= 0 || K.last_line < K.first_line) && $ && (K.last_line = $.first_line | 0, K.last_column = $.first_column | 0, $.range && (K.range[1] = C.range[0] | 0)), K.first_line <= 0 && Z && (K.last_line <= 0 || Z.last_line <= K.last_line) && (K.first_line = Z.first_line | 0, K.first_column = Z.first_column | 0, Z.range && (K.range[0] = Z.range[0] | 0)), K.last_line <= 0 && Z && (K.first_line <= 0 || Z.first_line >= K.first_line) && (K.last_line = Z.last_line | 0, K.last_column = Z.last_column | 0, Z.range && (K.range[1] = Z.range[1] | 0))), K.last_line <= 0 && (K.first_line <= 0 ? (K.first_line = this.yylloc.first_line, K.last_line = this.yylloc.last_line, K.first_column = this.yylloc.first_column, K.last_column = this.yylloc.last_column, K.range[0] = this.yylloc.range[0], K.range[1] = this.yylloc.range[1]) : (K.last_line = this.yylloc.last_line, K.last_column = this.yylloc.last_column, K.range[1] = this.yylloc.range[1])), K.first_line <= 0 && (K.first_line = K.last_line, K.first_column = 0, K.range[1] = K.range[0]), K.first_column < 0 && (K.first_column = 0), K.last_column < 0 && (K.last_column = K.first_column > 0 ? K.first_column : 80), K;
        },
        /**
         * return a string which displays the lines & columns of input which are referenced 
         * by the given location info range, plus a few lines of context.
         * 
         * This function pretty-prints the indicated section of the input, with line numbers 
         * and everything!
         * 
         * This function is very useful to provide highly readable error reports, while
         * the location range may be specified in various flexible ways:
         * 
         * - `loc` is the location info object which references the area which should be
         *   displayed and 'marked up': these lines & columns of text are marked up by `^`
         *   characters below each character in the entire input range.
         * 
         * - `context_loc` is the *optional* location info object which instructs this
         *   pretty-printer how much *leading* context should be displayed alongside
         *   the area referenced by `loc`. This can help provide context for the displayed
         *   error, etc.
         * 
         *   When this location info is not provided, a default context of 3 lines is
         *   used.
         * 
         * - `context_loc2` is another *optional* location info object, which serves
         *   a similar purpose to `context_loc`: it specifies the amount of *trailing*
         *   context lines to display in the pretty-print output.
         * 
         *   When this location info is not provided, a default context of 1 line only is
         *   used.
         * 
         * Special Notes:
         * 
         * - when the `loc`-indicated range is very large (about 5 lines or more), then
         *   only the first and last few lines of this block are printed while a
         *   `...continued...` message will be printed between them.
         * 
         *   This serves the purpose of not printing a huge amount of text when the `loc`
         *   range happens to be huge: this way a manageable & readable output results
         *   for arbitrary large ranges.
         * 
         * - this function can display lines of input which whave not yet been lexed.
         *   `prettyPrintRange()` can access the entire input!
         * 
         * @public
         * @this {RegExpLexer}
         */
        prettyPrintRange: function(C, U, $) {
          C = this.deriveLocationInfo(C, U, $);
          const Z = 3, K = 1, ot = 2;
          var lt = this.matched + this._input, ct = lt.split(`
`), ht = Math.max(1, U ? U.first_line : C.first_line - Z), _t = Math.max(1, $ ? $.last_line : C.last_line + K), at = 1 + Math.log10(_t | 1) | 0, Pt = new Array(at).join(" "), Mt = [], Et = ct.slice(ht - 1, _t + 1).map(function($t, Yt) {
            var Bt = Yt + ht, ae = (Pt + Bt).substr(-at), he = ae + ": " + $t, Ie = new Array(at + 1).join("^"), rn = 2 + 1, ye = 0;
            if (Bt === C.first_line ? (rn += C.first_column, ye = Math.max(
              2,
              (Bt === C.last_line ? C.last_column : $t.length) - C.first_column + 1
            )) : Bt === C.last_line ? ye = Math.max(2, C.last_column + 1) : Bt > C.first_line && Bt < C.last_line && (ye = Math.max(2, $t.length + 1)), ye) {
              var oe = new Array(rn).join("."), qe = new Array(ye).join("^");
              he += `
` + Ie + oe + qe, $t.trim().length > 0 && Mt.push(Yt);
            }
            return he = he.replace(/\t/g, " "), he;
          });
          if (Mt.length > 2 * ot) {
            var kt = Mt[ot - 1] + 1, bt = Mt[Mt.length - ot] - 1, Dt = new Array(at + 1).join(" ") + "  (...continued...)";
            Dt += `
` + new Array(at + 1).join("-") + "  (---------------)", Et.splice(kt, bt - kt + 1, Dt);
          }
          return Et.join(`
`);
        },
        /**
         * helper function, used to produce a human readable description as a string, given
         * the input `yylloc` location object.
         * 
         * Set `display_range_too` to TRUE to include the string character index position(s)
         * in the description if the `yylloc.range` is available.
         * 
         * @public
         * @this {RegExpLexer}
         */
        describeYYLLOC: function(C, U) {
          var $ = C.first_line, Z = C.last_line, K = C.first_column, ot = C.last_column, lt = Z - $, ct = ot - K, ht;
          if (lt === 0 ? (ht = "line " + $ + ", ", ct <= 1 ? ht += "column " + K : ht += "columns " + K + " .. " + ot) : ht = "lines " + $ + "(column " + K + ") .. " + Z + "(column " + ot + ")", C.range && U) {
            var _t = C.range[0], at = C.range[1] - 1;
            at <= _t ? ht += " {String Offset: " + _t + "}" : ht += " {String Offset range: " + _t + " .. " + at + "}";
          }
          return ht;
        },
        /**
         * test the lexed token: return FALSE when not a match, otherwise return token.
         * 
         * `match` is supposed to be an array coming out of a regex match, i.e. `match[0]`
         * contains the actually matched text string.
         * 
         * Also move the input cursor forward and update the match collectors:
         * 
         * - `yytext`
         * - `yyleng`
         * - `match`
         * - `matches`
         * - `yylloc`
         * - `offset`
         * 
         * @public
         * @this {RegExpLexer}
         */
        test_match: function(C, U) {
          var $, Z, K, ot, lt;
          if (this.options.backtrack_lexer && (K = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.yylloc.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column,
              range: this.yylloc.range.slice(0)
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            //_signaled_error_token: this._signaled_error_token,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          }), ot = C[0], lt = ot.length, Z = ot.split(/(?:\r\n?|\n)/g), Z.length > 1 ? (this.yylineno += Z.length - 1, this.yylloc.last_line = this.yylineno + 1, this.yylloc.last_column = Z[Z.length - 1].length) : this.yylloc.last_column += lt, this.yytext += ot, this.match += ot, this.matched += ot, this.matches = C, this.yyleng = this.yytext.length, this.yylloc.range[1] += lt, this.offset += lt, this._more = !1, this._backtrack = !1, this._input = this._input.slice(lt), $ = this.performAction.call(
            this,
            this.yy,
            U,
            this.conditionStack[this.conditionStack.length - 1]
            /* = YY_START */
          ), this.done && this._input && (this.done = !1), $)
            return $;
          if (this._backtrack) {
            for (var ct in K)
              this[ct] = K[ct];
            return this.__currentRuleSet__ = null, !1;
          } else if (this._signaled_error_token)
            return $ = this._signaled_error_token, this._signaled_error_token = !1, $;
          return !1;
        },
        /**
         * return next match in input
         * 
         * @public
         * @this {RegExpLexer}
         */
        next: function() {
          if (this.done)
            return this.clear(), this.EOF;
          this._input || (this.done = !0);
          var C, U, $, Z;
          this._more || this.clear();
          var K = this.__currentRuleSet__;
          if (!K && (K = this.__currentRuleSet__ = this._currentRules(), !K || !K.rules)) {
            var ot = "";
            this.options.trackPosition && (ot = " on line " + (this.yylineno + 1));
            var lt = this.constructLexErrorInfo(
              "Internal lexer engine error" + ot + ': The lex grammar programmer pushed a non-existing condition name "' + this.topState() + '"; this is a fatal error and should be reported to the application programmer team!',
              !1
            );
            return this.parseError(lt.errStr, lt, this.JisonLexerError) || this.ERROR;
          }
          for (var ct = K.rules, ht = K.__rule_regexes, _t = K.__rule_count, at = 1; at <= _t; at++)
            if ($ = this._input.match(ht[at]), $ && (!U || $[0].length > U[0].length)) {
              if (U = $, Z = at, this.options.backtrack_lexer) {
                if (C = this.test_match($, ct[at]), C !== !1)
                  return C;
                if (this._backtrack) {
                  U = void 0;
                  continue;
                } else
                  return !1;
              } else if (!this.options.flex)
                break;
            }
          if (U)
            return C = this.test_match(U, ct[Z]), C !== !1 ? C : !1;
          if (this._input) {
            var ot = "";
            this.options.trackPosition && (ot = " on line " + (this.yylineno + 1));
            var lt = this.constructLexErrorInfo(
              "Lexical error" + ot + ": Unrecognized text.",
              this.options.lexerErrorsAreRecoverable
            ), Pt = this._input, Mt = this.topState(), Et = this.conditionStack.length;
            return C = this.parseError(lt.errStr, lt, this.JisonLexerError) || this.ERROR, C === this.ERROR && !this.matches && // and make sure the input has been modified/consumed ...
            Pt === this._input && // ...or the lexer state has been modified significantly enough
            // to merit a non-consuming error handling action right now.
            Mt === this.topState() && Et === this.conditionStack.length && this.input(), C;
          } else
            return this.done = !0, this.clear(), this.EOF;
        },
        /**
         * return next match that has a token
         * 
         * @public
         * @this {RegExpLexer}
         */
        lex: function() {
          var C;
          for (typeof this.pre_lex == "function" && (C = this.pre_lex.call(this, 0)), typeof this.options.pre_lex == "function" && (C = this.options.pre_lex.call(this, C) || C), this.yy && typeof this.yy.pre_lex == "function" && (C = this.yy.pre_lex.call(this, C) || C); !C; )
            C = this.next();
          return this.yy && typeof this.yy.post_lex == "function" && (C = this.yy.post_lex.call(this, C) || C), typeof this.options.post_lex == "function" && (C = this.options.post_lex.call(this, C) || C), typeof this.post_lex == "function" && (C = this.post_lex.call(this, C) || C), C;
        },
        /**
         * return next match that has a token. Identical to the `lex()` API but does not invoke any of the 
         * `pre_lex()` nor any of the `post_lex()` callbacks.
         * 
         * @public
         * @this {RegExpLexer}
         */
        fastLex: function() {
          for (var C; !C; )
            C = this.next();
          return C;
        },
        /**
         * return info about the lexer state that can help a parser or other lexer API user to use the
         * most efficient means available. This API is provided to aid run-time performance for larger
         * systems which employ this lexer.
         * 
         * @public
         * @this {RegExpLexer}
         */
        canIUse: function() {
          var C = {
            fastLex: !(typeof this.pre_lex == "function" || typeof this.options.pre_lex == "function" || this.yy && typeof this.yy.pre_lex == "function" || this.yy && typeof this.yy.post_lex == "function" || typeof this.options.post_lex == "function" || typeof this.post_lex == "function") && typeof this.fastLex == "function"
          };
          return C;
        },
        /**
         * backwards compatible alias for `pushState()`;
         * the latter is symmetrical with `popState()` and we advise to use
         * those APIs in any modern lexer code, rather than `begin()`.
         * 
         * @public
         * @this {RegExpLexer}
         */
        begin: function(C) {
          return this.pushState(C);
        },
        /**
         * activates a new lexer condition state (pushes the new lexer
         * condition state onto the condition stack)
         * 
         * @public
         * @this {RegExpLexer}
         */
        pushState: function(C) {
          return this.conditionStack.push(C), this.__currentRuleSet__ = null, this;
        },
        /**
         * pop the previously active lexer condition state off the condition
         * stack
         * 
         * @public
         * @this {RegExpLexer}
         */
        popState: function() {
          var C = this.conditionStack.length - 1;
          return C > 0 ? (this.__currentRuleSet__ = null, this.conditionStack.pop()) : this.conditionStack[0];
        },
        /**
         * return the currently active lexer condition state; when an index
         * argument is provided it produces the N-th previous condition state,
         * if available
         * 
         * @public
         * @this {RegExpLexer}
         */
        topState: function(C) {
          return C = this.conditionStack.length - 1 - Math.abs(C || 0), C >= 0 ? this.conditionStack[C] : "INITIAL";
        },
        /**
         * (internal) determine the lexer rule set which is active for the
         * currently active lexer condition state
         * 
         * @public
         * @this {RegExpLexer}
         */
        _currentRules: function() {
          return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]] : this.conditions.INITIAL;
        },
        /**
         * return the number of states currently on the stack
         * 
         * @public
         * @this {RegExpLexer}
         */
        stateStackSize: function() {
          return this.conditionStack.length;
        },
        options: {
          trackPosition: !0
        },
        JisonLexerError: k,
        performAction: function(C, U, $) {
          switch (U) {
            case 1:
              break;
            default:
              return this.simpleCaseActionClusters[U];
          }
        },
        simpleCaseActionClusters: {
          /*! Conditions:: INITIAL */
          /*! Rule::       (--[0-9a-z-A-Z-]*) */
          0: 13,
          /*! Conditions:: INITIAL */
          /*! Rule::       \* */
          2: 5,
          /*! Conditions:: INITIAL */
          /*! Rule::       \/ */
          3: 6,
          /*! Conditions:: INITIAL */
          /*! Rule::       \+ */
          4: 3,
          /*! Conditions:: INITIAL */
          /*! Rule::       - */
          5: 4,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)px\b */
          6: 15,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)cm\b */
          7: 15,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)mm\b */
          8: 15,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)in\b */
          9: 15,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)pt\b */
          10: 15,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)pc\b */
          11: 15,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)deg\b */
          12: 16,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)grad\b */
          13: 16,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)rad\b */
          14: 16,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)turn\b */
          15: 16,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)s\b */
          16: 17,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)ms\b */
          17: 17,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)Hz\b */
          18: 18,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)kHz\b */
          19: 18,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)dpi\b */
          20: 19,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)dpcm\b */
          21: 19,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)dppx\b */
          22: 19,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)em\b */
          23: 20,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)ex\b */
          24: 21,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)ch\b */
          25: 22,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)rem\b */
          26: 23,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)vw\b */
          27: 25,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)vh\b */
          28: 24,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)vmin\b */
          29: 26,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)vmax\b */
          30: 27,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)% */
          31: 28,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([0-9]+(\.[0-9]*)?|\.[0-9]+)\b */
          32: 11,
          /*! Conditions:: INITIAL */
          /*! Rule::       (calc) */
          33: 9,
          /*! Conditions:: INITIAL */
          /*! Rule::       (var) */
          34: 12,
          /*! Conditions:: INITIAL */
          /*! Rule::       ([a-z]+) */
          35: 10,
          /*! Conditions:: INITIAL */
          /*! Rule::       \( */
          36: 7,
          /*! Conditions:: INITIAL */
          /*! Rule::       \) */
          37: 8,
          /*! Conditions:: INITIAL */
          /*! Rule::       , */
          38: 14,
          /*! Conditions:: INITIAL */
          /*! Rule::       $ */
          39: 1
        },
        rules: [
          /*  0: */
          /^(?:(--[\d\-A-Za-z]*))/,
          /*  1: */
          /^(?:\s+)/,
          /*  2: */
          /^(?:\*)/,
          /*  3: */
          /^(?:\/)/,
          /*  4: */
          /^(?:\+)/,
          /*  5: */
          /^(?:-)/,
          /*  6: */
          /^(?:(\d+(\.\d*)?|\.\d+)px\b)/,
          /*  7: */
          /^(?:(\d+(\.\d*)?|\.\d+)cm\b)/,
          /*  8: */
          /^(?:(\d+(\.\d*)?|\.\d+)mm\b)/,
          /*  9: */
          /^(?:(\d+(\.\d*)?|\.\d+)in\b)/,
          /* 10: */
          /^(?:(\d+(\.\d*)?|\.\d+)pt\b)/,
          /* 11: */
          /^(?:(\d+(\.\d*)?|\.\d+)pc\b)/,
          /* 12: */
          /^(?:(\d+(\.\d*)?|\.\d+)deg\b)/,
          /* 13: */
          /^(?:(\d+(\.\d*)?|\.\d+)grad\b)/,
          /* 14: */
          /^(?:(\d+(\.\d*)?|\.\d+)rad\b)/,
          /* 15: */
          /^(?:(\d+(\.\d*)?|\.\d+)turn\b)/,
          /* 16: */
          /^(?:(\d+(\.\d*)?|\.\d+)s\b)/,
          /* 17: */
          /^(?:(\d+(\.\d*)?|\.\d+)ms\b)/,
          /* 18: */
          /^(?:(\d+(\.\d*)?|\.\d+)Hz\b)/,
          /* 19: */
          /^(?:(\d+(\.\d*)?|\.\d+)kHz\b)/,
          /* 20: */
          /^(?:(\d+(\.\d*)?|\.\d+)dpi\b)/,
          /* 21: */
          /^(?:(\d+(\.\d*)?|\.\d+)dpcm\b)/,
          /* 22: */
          /^(?:(\d+(\.\d*)?|\.\d+)dppx\b)/,
          /* 23: */
          /^(?:(\d+(\.\d*)?|\.\d+)em\b)/,
          /* 24: */
          /^(?:(\d+(\.\d*)?|\.\d+)ex\b)/,
          /* 25: */
          /^(?:(\d+(\.\d*)?|\.\d+)ch\b)/,
          /* 26: */
          /^(?:(\d+(\.\d*)?|\.\d+)rem\b)/,
          /* 27: */
          /^(?:(\d+(\.\d*)?|\.\d+)vw\b)/,
          /* 28: */
          /^(?:(\d+(\.\d*)?|\.\d+)vh\b)/,
          /* 29: */
          /^(?:(\d+(\.\d*)?|\.\d+)vmin\b)/,
          /* 30: */
          /^(?:(\d+(\.\d*)?|\.\d+)vmax\b)/,
          /* 31: */
          /^(?:(\d+(\.\d*)?|\.\d+)%)/,
          /* 32: */
          /^(?:(\d+(\.\d*)?|\.\d+)\b)/,
          /* 33: */
          /^(?:(calc))/,
          /* 34: */
          /^(?:(var))/,
          /* 35: */
          /^(?:([a-z]+))/,
          /* 36: */
          /^(?:\()/,
          /* 37: */
          /^(?:\))/,
          /* 38: */
          /^(?:,)/,
          /* 39: */
          /^(?:$)/
        ],
        conditions: {
          INITIAL: {
            rules: [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23,
              24,
              25,
              26,
              27,
              28,
              29,
              30,
              31,
              32,
              33,
              34,
              35,
              36,
              37,
              38,
              39
            ],
            inclusive: !0
          }
        }
      };
      return y;
    }();
    x.lexer = S;
    function A() {
      this.yy = {};
    }
    return A.prototype = x, x.Parser = A, new A();
  }();
  typeof Y2 < "u" && (u.parser = e, u.Parser = e.Parser, u.parse = function() {
    return e.parse.apply(e, arguments);
  });
})(vg);
var so = {}, Ah = { exports: {} }, jl = {
  // length
  px: {
    px: 1,
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    in: 96,
    pt: 96 / 72,
    pc: 16
  },
  cm: {
    px: 2.54 / 96,
    cm: 1,
    mm: 0.1,
    in: 2.54,
    pt: 2.54 / 72,
    pc: 2.54 / 6
  },
  mm: {
    px: 25.4 / 96,
    cm: 10,
    mm: 1,
    in: 25.4,
    pt: 25.4 / 72,
    pc: 25.4 / 6
  },
  in: {
    px: 1 / 96,
    cm: 1 / 2.54,
    mm: 1 / 25.4,
    in: 1,
    pt: 1 / 72,
    pc: 1 / 6
  },
  pt: {
    px: 0.75,
    cm: 72 / 2.54,
    mm: 72 / 25.4,
    in: 72,
    pt: 1,
    pc: 12
  },
  pc: {
    px: 6 / 96,
    cm: 6 / 2.54,
    mm: 6 / 25.4,
    in: 6,
    pt: 6 / 72,
    pc: 1
  },
  // angle
  deg: {
    deg: 1,
    grad: 0.9,
    rad: 180 / Math.PI,
    turn: 360
  },
  grad: {
    deg: 400 / 360,
    grad: 1,
    rad: 200 / Math.PI,
    turn: 400
  },
  rad: {
    deg: Math.PI / 180,
    grad: Math.PI / 200,
    rad: 1,
    turn: Math.PI * 2
  },
  turn: {
    deg: 1 / 360,
    grad: 1 / 400,
    rad: 0.5 / Math.PI,
    turn: 1
  },
  // time
  s: {
    s: 1,
    ms: 1 / 1e3
  },
  ms: {
    s: 1e3,
    ms: 1
  },
  // frequency
  Hz: {
    Hz: 1,
    kHz: 1e3
  },
  kHz: {
    Hz: 1 / 1e3,
    kHz: 1
  },
  // resolution
  dpi: {
    dpi: 1,
    dpcm: 1 / 2.54,
    dppx: 1 / 96
  },
  dpcm: {
    dpi: 2.54,
    dpcm: 1,
    dppx: 2.54 / 96
  },
  dppx: {
    dpi: 96,
    dpcm: 96 / 2.54,
    dppx: 1
  }
}, H2 = function(u, e, r, o) {
  if (!jl.hasOwnProperty(r))
    throw new Error("Cannot convert to " + r);
  if (!jl[r].hasOwnProperty(e))
    throw new Error("Cannot convert from " + e + " to " + r);
  var l = jl[r][e] * u;
  return o !== !1 ? (o = Math.pow(10, parseInt(o) || 5), Math.round(l * o) / o) : l;
};
(function(u, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var r = H2, o = l(r);
  function l(g) {
    return g && g.__esModule ? g : { default: g };
  }
  function h(g, b, x) {
    switch (g.type) {
      case "LengthValue":
      case "AngleValue":
      case "TimeValue":
      case "FrequencyValue":
      case "ResolutionValue":
        return c(g, b, x);
      default:
        return { left: g, right: b };
    }
  }
  function c(g, b, x) {
    return b.type === g.type && (b = {
      type: g.type,
      value: (0, o.default)(b.value, b.unit, g.unit, x),
      unit: g.unit
    }), { left: g, right: b };
  }
  e.default = h, u.exports = e.default;
})(Ah, Ah.exports);
var X2 = Ah.exports;
Object.defineProperty(so, "__esModule", {
  value: !0
});
so.flip = Ph;
var G2 = X2, Ql = Z2(G2);
function Z2(u) {
  return u && u.__esModule ? u : { default: u };
}
function Xn(u, e) {
  return u.type === "MathExpression" ? tS(u, e) : u.type === "Calc" ? Xn(u.value, e) : u;
}
function Hd(u, e) {
  return u.type === e.type && u.value === e.value;
}
function ci(u) {
  switch (u) {
    case "LengthValue":
    case "AngleValue":
    case "TimeValue":
    case "FrequencyValue":
    case "ResolutionValue":
    case "EmValue":
    case "ExValue":
    case "ChValue":
    case "RemValue":
    case "VhValue":
    case "VwValue":
    case "VminValue":
    case "VmaxValue":
    case "PercentageValue":
    case "Value":
      return !0;
  }
  return !1;
}
function K2(u, e) {
  var r = (0, Ql.default)(u.left, u.right, e), o = Xn(r.left, e), l = Xn(r.right, e);
  return o.type === "MathExpression" && l.type === "MathExpression" && (o.operator === "/" && l.operator === "*" || o.operator === "-" && l.operator === "+" || o.operator === "*" && l.operator === "/" || o.operator === "+" && l.operator === "-") && (Hd(o.right, l.right) ? r = (0, Ql.default)(o.left, l.left, e) : Hd(o.right, l.left) && (r = (0, Ql.default)(o.left, l.right, e)), o = Xn(r.left, e), l = Xn(r.right, e)), u.left = o, u.right = l, u;
}
function Ph(u) {
  return u === "+" ? "-" : "+";
}
function Oh(u) {
  return ci(u.type) ? u.value = -u.value : u.type == "MathExpression" && (u.left = Oh(u.left), u.right = Oh(u.right)), u;
}
function J2(u, e) {
  var r = u, o = r.left, l = r.right, h = r.operator;
  if (o.type === "CssVariable" || l.type === "CssVariable")
    return u;
  if (l.value === 0)
    return o;
  if (o.value === 0 && h === "+")
    return l;
  if (o.value === 0 && h === "-")
    return Oh(l);
  if (o.type === l.type && ci(o.type) && (u = Object.assign({}, o), h === "+" ? u.value = o.value + l.value : u.value = o.value - l.value), ci(o.type) && (l.operator === "+" || l.operator === "-") && l.type === "MathExpression") {
    if (o.type === l.left.type)
      return u = Object.assign({}, u), u.left = Xn({
        type: "MathExpression",
        operator: h,
        left: o,
        right: l.left
      }, e), u.right = l.right, u.operator = h === "-" ? Ph(l.operator) : l.operator, Xn(u, e);
    if (o.type === l.right.type)
      return u = Object.assign({}, u), u.left = Xn({
        type: "MathExpression",
        operator: h === "-" ? Ph(l.operator) : l.operator,
        left: o,
        right: l.right
      }, e), u.right = l.left, Xn(u, e);
  }
  if (o.type === "MathExpression" && (o.operator === "+" || o.operator === "-") && ci(l.type)) {
    if (l.type === o.left.type)
      return u = Object.assign({}, o), u.left = Xn({
        type: "MathExpression",
        operator: h,
        left: o.left,
        right: l
      }, e), Xn(u, e);
    if (l.type === o.right.type)
      return u = Object.assign({}, o), o.operator === "-" ? (u.right = Xn({
        type: "MathExpression",
        operator: h === "-" ? "+" : "-",
        left: l,
        right: o.right
      }, e), u.operator = h === "-" ? "-" : "+") : u.right = Xn({
        type: "MathExpression",
        operator: h,
        left: o.right,
        right: l
      }, e), u.right.value < 0 && (u.right.value *= -1, u.operator = u.operator === "-" ? "+" : "-"), Xn(u, e);
  }
  return u;
}
function j2(u, e) {
  if (!ci(u.right.type))
    return u;
  if (u.right.type !== "Value")
    throw new Error('Cannot divide by "' + u.right.unit + '", number expected');
  if (u.right.value === 0)
    throw new Error("Cannot divide by zero");
  return u.left.type === "MathExpression" ? ci(u.left.left.type) && ci(u.left.right.type) ? (u.left.left.value /= u.right.value, u.left.right.value /= u.right.value, Xn(u.left, e)) : u : ci(u.left.type) ? (u.left.value /= u.right.value, u.left) : u;
}
function Q2(u) {
  if (u.left.type === "MathExpression" && u.right.type === "Value") {
    if (ci(u.left.left.type) && ci(u.left.right.type))
      return u.left.left.value *= u.right.value, u.left.right.value *= u.right.value, u.left;
  } else {
    if (ci(u.left.type) && u.right.type === "Value")
      return u.left.value *= u.right.value, u.left;
    if (u.left.type === "Value" && u.right.type === "MathExpression") {
      if (ci(u.right.left.type) && ci(u.right.right.type))
        return u.right.left.value *= u.left.value, u.right.right.value *= u.left.value, u.right;
    } else if (u.left.type === "Value" && ci(u.right.type))
      return u.right.value *= u.left.value, u.right;
  }
  return u;
}
function tS(u, e) {
  switch (u = K2(u, e), u.operator) {
    case "+":
    case "-":
      return J2(u, e);
    case "/":
      return j2(u, e);
    case "*":
      return Q2(u);
  }
  return u;
}
so.default = Xn;
var Mh = { exports: {} };
(function(u, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = function(c, g, b) {
    var x = h(g, b);
    return g.type === "MathExpression" && (x = c + "(" + x + ")"), x;
  };
  var r = so, o = {
    "*": 0,
    "/": 0,
    "+": 1,
    "-": 1
  };
  function l(c, g) {
    if (g !== !1) {
      var b = Math.pow(10, g);
      return Math.round(c * b) / b;
    }
    return c;
  }
  function h(c, g) {
    switch (c.type) {
      case "MathExpression": {
        var b = c.left, x = c.right, S = c.operator, A = "";
        return b.type === "MathExpression" && o[S] < o[b.operator] ? A += "(" + h(b, g) + ")" : A += h(b, g), A += " " + c.operator + " ", x.type === "MathExpression" && o[S] < o[x.operator] ? A += "(" + h(x, g) + ")" : (x.type === "MathExpression" && S === "-" && ["+", "-"].includes(x.operator) && (x.operator = (0, r.flip)(x.operator)), A += h(x, g)), A;
      }
      case "Value":
        return l(c.value, g);
      case "CssVariable":
        return c.fallback ? "var(" + c.value + ", " + h(c.fallback, g) + ")" : "var(" + c.value + ")";
      case "Calc":
        return c.prefix ? "-" + c.prefix + "-calc(" + h(c.value, g) + ")" : "calc(" + h(c.value, g) + ")";
      default:
        return l(c.value, g) + c.unit;
    }
  }
  u.exports = e.default;
})(Mh, Mh.exports);
var eS = Mh.exports;
(function(u, e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  var r = W2, o = x(r), l = vg, h = so, c = x(h), g = eS, b = x(g);
  function x(A) {
    return A && A.__esModule ? A : { default: A };
  }
  var S = /((?:\-[a-z]+\-)?calc)/;
  e.default = function(A) {
    var k = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
    return (0, o.default)(A).walk(function(y) {
      if (!(y.type !== "function" || !S.test(y.value))) {
        var D = o.default.stringify(y.nodes);
        if (!(D.indexOf("constant") >= 0 || D.indexOf("env") >= 0)) {
          var C = l.parser.parse(D), U = (0, c.default)(C, k);
          y.type = "word", y.value = (0, b.default)(y.value, U, k);
        }
      }
    }, !0).toString();
  }, u.exports = e.default;
})(Th, Th.exports);
var nS = Th.exports;
const th = /* @__PURE__ */ Jh(nS);
var iS = typeof fr == "object" && fr && fr.Object === Object && fr, rS = iS, sS = rS, aS = typeof self == "object" && self && self.Object === Object && self, oS = sS || aS || Function("return this")(), jh = oS, uS = jh, lS = uS.Symbol, pg = lS, Xd = pg, mg = Object.prototype, hS = mg.hasOwnProperty, fS = mg.toString, za = Xd ? Xd.toStringTag : void 0;
function cS(u) {
  var e = hS.call(u, za), r = u[za];
  try {
    u[za] = void 0;
    var o = !0;
  } catch {
  }
  var l = fS.call(u);
  return o && (e ? u[za] = r : delete u[za]), l;
}
var dS = cS, _S = Object.prototype, gS = _S.toString;
function vS(u) {
  return gS.call(u);
}
var pS = vS, Gd = pg, mS = dS, yS = pS, wS = "[object Null]", xS = "[object Undefined]", Zd = Gd ? Gd.toStringTag : void 0;
function bS(u) {
  return u == null ? u === void 0 ? xS : wS : Zd && Zd in Object(u) ? mS(u) : yS(u);
}
var SS = bS;
function CS(u) {
  var e = typeof u;
  return u != null && (e == "object" || e == "function");
}
var yg = CS, TS = SS, AS = yg, PS = "[object AsyncFunction]", OS = "[object Function]", MS = "[object GeneratorFunction]", IS = "[object Proxy]";
function ES(u) {
  if (!AS(u))
    return !1;
  var e = TS(u);
  return e == OS || e == MS || e == PS || e == IS;
}
var kS = ES, LS = jh, RS = LS["__core-js_shared__"], DS = RS, eh = DS, Kd = function() {
  var u = /[^.]+$/.exec(eh && eh.keys && eh.keys.IE_PROTO || "");
  return u ? "Symbol(src)_1." + u : "";
}();
function zS(u) {
  return !!Kd && Kd in u;
}
var BS = zS, NS = Function.prototype, FS = NS.toString;
function $S(u) {
  if (u != null) {
    try {
      return FS.call(u);
    } catch {
    }
    try {
      return u + "";
    } catch {
    }
  }
  return "";
}
var VS = $S, US = kS, qS = BS, WS = yg, YS = VS, HS = /[\\^$.*+?()[\]{}|]/g, XS = /^\[object .+?Constructor\]$/, GS = Function.prototype, ZS = Object.prototype, KS = GS.toString, JS = ZS.hasOwnProperty, jS = RegExp(
  "^" + KS.call(JS).replace(HS, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function QS(u) {
  if (!WS(u) || qS(u))
    return !1;
  var e = US(u) ? jS : XS;
  return e.test(YS(u));
}
var tC = QS;
function eC(u, e) {
  return u?.[e];
}
var nC = eC, iC = tC, rC = nC;
function sC(u, e) {
  var r = rC(u, e);
  return iC(r) ? r : void 0;
}
var wg = sC, aC = wg, oC = aC(Object, "create"), Cu = oC, Jd = Cu;
function uC() {
  this.__data__ = Jd ? Jd(null) : {}, this.size = 0;
}
var lC = uC;
function hC(u) {
  var e = this.has(u) && delete this.__data__[u];
  return this.size -= e ? 1 : 0, e;
}
var fC = hC, cC = Cu, dC = "__lodash_hash_undefined__", _C = Object.prototype, gC = _C.hasOwnProperty;
function vC(u) {
  var e = this.__data__;
  if (cC) {
    var r = e[u];
    return r === dC ? void 0 : r;
  }
  return gC.call(e, u) ? e[u] : void 0;
}
var pC = vC, mC = Cu, yC = Object.prototype, wC = yC.hasOwnProperty;
function xC(u) {
  var e = this.__data__;
  return mC ? e[u] !== void 0 : wC.call(e, u);
}
var bC = xC, SC = Cu, CC = "__lodash_hash_undefined__";
function TC(u, e) {
  var r = this.__data__;
  return this.size += this.has(u) ? 0 : 1, r[u] = SC && e === void 0 ? CC : e, this;
}
var AC = TC, PC = lC, OC = fC, MC = pC, IC = bC, EC = AC;
function ga(u) {
  var e = -1, r = u == null ? 0 : u.length;
  for (this.clear(); ++e < r; ) {
    var o = u[e];
    this.set(o[0], o[1]);
  }
}
ga.prototype.clear = PC;
ga.prototype.delete = OC;
ga.prototype.get = MC;
ga.prototype.has = IC;
ga.prototype.set = EC;
var kC = ga;
function LC() {
  this.__data__ = [], this.size = 0;
}
var RC = LC;
function DC(u, e) {
  return u === e || u !== u && e !== e;
}
var zC = DC, BC = zC;
function NC(u, e) {
  for (var r = u.length; r--; )
    if (BC(u[r][0], e))
      return r;
  return -1;
}
var Tu = NC, FC = Tu, $C = Array.prototype, VC = $C.splice;
function UC(u) {
  var e = this.__data__, r = FC(e, u);
  if (r < 0)
    return !1;
  var o = e.length - 1;
  return r == o ? e.pop() : VC.call(e, r, 1), --this.size, !0;
}
var qC = UC, WC = Tu;
function YC(u) {
  var e = this.__data__, r = WC(e, u);
  return r < 0 ? void 0 : e[r][1];
}
var HC = YC, XC = Tu;
function GC(u) {
  return XC(this.__data__, u) > -1;
}
var ZC = GC, KC = Tu;
function JC(u, e) {
  var r = this.__data__, o = KC(r, u);
  return o < 0 ? (++this.size, r.push([u, e])) : r[o][1] = e, this;
}
var jC = JC, QC = RC, tT = qC, eT = HC, nT = ZC, iT = jC;
function va(u) {
  var e = -1, r = u == null ? 0 : u.length;
  for (this.clear(); ++e < r; ) {
    var o = u[e];
    this.set(o[0], o[1]);
  }
}
va.prototype.clear = QC;
va.prototype.delete = tT;
va.prototype.get = eT;
va.prototype.has = nT;
va.prototype.set = iT;
var rT = va, sT = wg, aT = jh, oT = sT(aT, "Map"), uT = oT, jd = kC, lT = rT, hT = uT;
function fT() {
  this.size = 0, this.__data__ = {
    hash: new jd(),
    map: new (hT || lT)(),
    string: new jd()
  };
}
var cT = fT;
function dT(u) {
  var e = typeof u;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? u !== "__proto__" : u === null;
}
var _T = dT, gT = _T;
function vT(u, e) {
  var r = u.__data__;
  return gT(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
var Au = vT, pT = Au;
function mT(u) {
  var e = pT(this, u).delete(u);
  return this.size -= e ? 1 : 0, e;
}
var yT = mT, wT = Au;
function xT(u) {
  return wT(this, u).get(u);
}
var bT = xT, ST = Au;
function CT(u) {
  return ST(this, u).has(u);
}
var TT = CT, AT = Au;
function PT(u, e) {
  var r = AT(this, u), o = r.size;
  return r.set(u, e), this.size += r.size == o ? 0 : 1, this;
}
var OT = PT, MT = cT, IT = yT, ET = bT, kT = TT, LT = OT;
function pa(u) {
  var e = -1, r = u == null ? 0 : u.length;
  for (this.clear(); ++e < r; ) {
    var o = u[e];
    this.set(o[0], o[1]);
  }
}
pa.prototype.clear = MT;
pa.prototype.delete = IT;
pa.prototype.get = ET;
pa.prototype.has = kT;
pa.prototype.set = LT;
var RT = pa, xg = RT, DT = "Expected a function";
function Qh(u, e) {
  if (typeof u != "function" || e != null && typeof e != "function")
    throw new TypeError(DT);
  var r = function() {
    var o = arguments, l = e ? e.apply(this, o) : o[0], h = r.cache;
    if (h.has(l))
      return h.get(l);
    var c = u.apply(this, o);
    return r.cache = h.set(l, c) || h, c;
  };
  return r.cache = new (Qh.Cache || xg)(), r;
}
Qh.Cache = xg;
var zT = Qh;
const BT = /* @__PURE__ */ Jh(zT), Qd = "__react_svg_text_measurement_id";
function NT(u, e) {
  try {
    let r = document.getElementById(
      Qd
    );
    if (!r) {
      const l = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      l.setAttribute("aria-hidden", "true"), l.style.width = "0", l.style.height = "0", l.style.position = "absolute", l.style.top = "-100%", l.style.left = "-100%", l.style.padding = "0", l.style.margin = "0", r = document.createElementNS("http://www.w3.org/2000/svg", "text"), r.setAttribute("id", Qd), l.appendChild(r), document.body.appendChild(l);
    }
    return Object.assign(r.style, e), r.textContent = u, {
      width: r.getComputedTextLength(),
      height: e !== void 0 ? parseFloat(`${e["font-size"]}`) : 0
    };
  } catch (r) {
    return console.error(r), null;
  }
}
const iu = BT(NT, (u, e) => {
  if (!e)
    return `${u}_`;
  const { children: r, name: o, ...l } = e;
  return `${u}_${JSON.stringify(l)}`;
});
function nh(u) {
  return typeof u == "number";
}
function t_(u) {
  return (
    // number that is not NaN or Infinity
    typeof u == "number" && Number.isFinite(u) || // for percentage
    typeof u == "string"
  );
}
function FT(u) {
  u = Li({
    "vertical-anchor": "end",
    scaleToFit: !1,
    "line-height": "1em",
    "cap-height": "0.71em",
    // Magic number from d3
    x: 0,
    y: 0
  }, u);
  const e = () => !t_(u.x) || !t_(u.y), r = zn(() => u.children == null ? [] : u.children.toString().split(/(?:(?!\u00A0+)\s+)/)), o = zn(() => r().map((b) => ({
    word: b,
    wordWidth: iu(b, u)?.width ?? 0,
    wordHeight: iu(b, u)?.height ?? 0
  }))), l = zn(() => ({
    width: iu(" ", u)?.width ?? 0,
    height: iu(" ", u)?.height ?? 0
  })), h = zn(() => e() ? [] : o().reduce((x, {
    word: S,
    wordWidth: A,
    wordHeight: k
  }) => {
    const y = x[x.length - 1];
    if (y && (u.width === void 0 || u.scaleToFit || (y.width ?? 0) + A + l().width < u.width))
      y.words.push(S), y.width = y.width ?? 0, y.width += A + l().width, y.height = Math.max(y.height ?? 0, k);
    else {
      const D = {
        words: [S],
        width: A,
        height: k
      };
      x.push(D);
    }
    return x;
  }, []));
  return {
    wordsByLines: h,
    startDy: () => e() ? "" : u["vertical-anchor"] === "start" ? th(`calc(${u["cap-height"]})`) : u["vertical-anchor"] === "middle" ? th(`calc(${(h().length - 1) / 2} * -${u["line-height"]} + (${u["cap-height"]} / 2))`) : th(`calc(${h().length - 1} * -${u["line-height"]})`),
    transform: () => {
      const b = [];
      if (e())
        return "";
      if (nh(u.x) && nh(u.y) && nh(u.width) && u.scaleToFit && h().length > 0) {
        const x = h()[0].width || 1, S = u.scaleToFit === "shrink-only" ? Math.min(u.width / x, 1) : u.width / x, A = S, k = u.x - S * u.x, y = u.y - A * u.y;
        b.push(`matrix(${S}, 0, 0, ${A}, ${k}, ${y})`);
      }
      return u.angle && b.push(`rotate(${u.angle}, ${u.x}, ${u.y})`), b.length > 0 ? b.join(" ") : "";
    }
  };
}
function $T(u) {
  let e = () => {
    let h = u.width || 0;
    if (u.wordsByLines.length > 0) {
      const c = Math.max(...u.wordsByLines.map((g) => g.width || 0));
      u.scaleToFit ? h = Math.min(c, u.width || c) : h = c;
    }
    if (u.transform) {
      const c = () => /matrix\(([^,]+),[^,]+,[^,]+,[^,]+,[^,]+,[^,]+\)/.exec(u.transform);
      c() && (h *= (() => parseFloat(c()[1]))());
    }
    return h;
  };
  const r = () => u.wordsByLines.reduce((h, c, g) => h + (c.height || 0), 0);
  let o = () => u.dx !== void 0 ? parseFloat(`${u.dx}`) : 0, l = () => {
    let h = u.dy !== void 0 ? parseFloat(`${u.dy}`) : 0;
    switch (u["vertical-anchor"]) {
      case "start":
        h += parseFloat(u.startDy);
        break;
      case "middle":
        h += r() / 2;
        break;
      case "end":
        h -= r();
        break;
    }
    return h;
  };
  return {
    get x() {
      return o();
    },
    get y() {
      return l();
    },
    get width() {
      return e();
    },
    get height() {
      return r();
    }
  };
}
var VT = /* @__PURE__ */ pe("<svg><g></svg>", !1, !0), UT = /* @__PURE__ */ pe("<svg><text></svg>", !1, !0), qT = /* @__PURE__ */ pe("<svg><tspan></svg>", !1, !0);
const WT = {
  overflow: "visible"
}, g3 = Nn((u) => {
  u = Li({
    // dx: 0,
    // dy: 0,
    "text-anchor": "start",
    "vertical-anchor": "end",
    "line-height": "1em",
    "cap-height": "0.71em",
    // Magic number from d3
    "font-family": "Alegreya Sans, sans-serif",
    "font-weight": 700,
    "font-size": "14",
    x: 0,
    y: 0,
    delimiters: [{
      left: "$$",
      right: "$$",
      display: !0
    }, {
      left: "\\(",
      right: "\\)",
      display: !1
    }, {
      left: "$",
      right: "$",
      display: !1
    }, {
      left: "\\[",
      right: "\\]",
      display: !0
    }]
  }, u);
  const [e, r] = Ms(u, ["name", "dx", "dy", "innerRef", "innerTextRef", "vertical-anchor", "angle", "line-height", "scaleToFit", "cap-height", "width", "delimiters"]), {
    wordsByLines: o,
    startDy: l,
    transform: h
  } = FT(u), c = Li(u, {
    get wordsByLines() {
      return o();
    },
    get startDy() {
      return l();
    },
    get transform() {
      return h();
    }
  });
  return Kt(ri, {
    get name() {
      return u.name;
    },
    layout: () => {
      const x = $T(c);
      return {
        bbox: {
          left: x.x,
          top: x.y,
          width: x.width,
          height: x.height
        },
        transform: {
          translate: {
            x: u.dx !== void 0 ? parseFloat(`${u.dx}`) : void 0,
            y: u.dy !== void 0 ? parseFloat(`${u.dy}`) : void 0
          }
        }
      };
    },
    paint: (x) => (() => {
      var S = VT(), A = u.innerRef;
      return typeof A == "function" ? Ha(A, S) : u.innerRef = S, lr(S, WT), Ne(S, (() => {
        var k = Dn(() => o().length > 0);
        return () => k() ? (() => {
          var y = UT(), D = u.innerTextRef;
          return typeof D == "function" ? Ha(D, y) : u.innerTextRef = y, pi(y, ii({
            get transform() {
              return h();
            }
          }, r), !0, !0), Ne(y, Kt(ta, {
            get each() {
              return o();
            },
            children: (C, U) => (() => {
              var $ = qT();
              return Ne($, () => C.words.join(" ")), ze((Z) => {
                var K = u.x, ot = U() === 0 ? l() : u["line-height"], lt = u["cap-height"];
                return K !== Z.e && Ft($, "x", Z.e = K), ot !== Z.t && Ft($, "dy", Z.t = ot), lt !== Z.a && Ft($, "cap-height", Z.a = lt), Z;
              }, {
                e: void 0,
                t: void 0,
                a: void 0
              }), $;
            })()
          })), y;
        })() : null;
      })()), ze(() => Ft(S, "transform", `translate(${x.transform.translate.x}, ${x.transform.translate.y})`)), S;
    })()
  });
}, {
  displayName: "Text"
});
var bg = { exports: {} };
const YT = {}, HT = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: YT
}, Symbol.toStringTag, { value: "Module" })), e_ = /* @__PURE__ */ s2(HT);
/*!
 * Paper.js v0.12.18 - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2020, Jürg Lehni & Jonathan Puckey
 * http://juerglehni.com/ & https://puckey.studio/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 * Date: Wed Jul 17 14:57:24 2024 +0200
 *
 ***
 *
 * Straps.js - Class inheritance library with support for bean-style accessors
 *
 * Copyright (c) 2006 - 2020 Jürg Lehni
 * http://juerglehni.com/
 *
 * Distributed under the MIT license.
 *
 ***
 *
 * Acorn.js
 * https://marijnhaverbeke.nl/acorn/
 *
 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
 * created by Marijn Haverbeke and released under an MIT license.
 *
 */
(function(u) {
  (function(e, r) {
    e = e || e_;
    var o = e.window, l = e.document, h = new function() {
      var t = /^(statics|enumerable|beans|preserve)$/, i = [], a = i.slice, f = Object.create, d = Object.getOwnPropertyDescriptor, v = Object.defineProperty, m = i.forEach || function(I, O) {
        for (var B = 0, q = this.length; B < q; B++)
          I.call(O, this[B], B, this);
      }, p = function(I, O) {
        for (var B in this)
          this.hasOwnProperty(B) && I.call(O, this[B], B, this);
      }, w = Object.assign || function(I) {
        for (var O = 1, B = arguments.length; O < B; O++) {
          var q = arguments[O];
          for (var Y in q)
            q.hasOwnProperty(Y) && (I[Y] = q[Y]);
        }
        return I;
      }, T = function(I, O, B) {
        if (I) {
          var q = d(I, "length");
          (q && typeof q.value == "number" ? m : p).call(I, O, B = B || I);
        }
        return B;
      };
      function E(I, O, B, q, Y) {
        var z = {};
        function N(G, J) {
          J = J || (J = d(O, G)) && (J.get ? J : J.value), typeof J == "string" && J[0] === "#" && (J = I[J.substring(1)] || J);
          var j = typeof J == "function", tt = J, it = Y || j && !J.base ? J && J.get ? G in I : I[G] : null, Q;
          (!Y || !it) && (j && it && (J.base = it), j && q !== !1 && (Q = G.match(/^([gs]et|is)(([A-Z])(.*))$/)) && (z[Q[3].toLowerCase() + Q[4]] = Q[2]), (!tt || j || !tt.get || typeof tt.get != "function" || !L.isPlainObject(tt)) && (tt = { value: tt, writable: !0 }), (d(I, G) || { configurable: !0 }).configurable && (tt.configurable = !0, tt.enumerable = B ?? !Q), v(I, G, tt));
        }
        if (O) {
          for (var M in O)
            O.hasOwnProperty(M) && !t.test(M) && N(M);
          for (var M in z) {
            var R = z[M], V = I["set" + R], W = I["get" + R] || V && I["is" + R];
            W && (q === !0 || W.length === 0) && N(M, { get: W, set: V });
          }
        }
        return I;
      }
      function L() {
        for (var I = 0, O = arguments.length; I < O; I++) {
          var B = arguments[I];
          B && w(this, B);
        }
        return this;
      }
      return E(L, {
        inject: function(I) {
          if (I) {
            var O = I.statics === !0 ? I : I.statics, B = I.beans, q = I.preserve;
            O !== I && E(this.prototype, I, I.enumerable, B, q), E(this, O, null, B, q);
          }
          for (var Y = 1, z = arguments.length; Y < z; Y++)
            this.inject(arguments[Y]);
          return this;
        },
        extend: function() {
          for (var I = this, O, B, q = 0, Y, z = arguments.length; q < z && !(O && B); q++)
            Y = arguments[q], O = O || Y.initialize, B = B || Y.prototype;
          return O = O || function() {
            I.apply(this, arguments);
          }, B = O.prototype = B || f(this.prototype), v(
            B,
            "constructor",
            { value: O, writable: !0, configurable: !0 }
          ), E(O, this), arguments.length && this.inject.apply(O, arguments), O.base = I, O;
        }
      }).inject({
        enumerable: !1,
        initialize: L,
        set: L,
        inject: function() {
          for (var I = 0, O = arguments.length; I < O; I++) {
            var B = arguments[I];
            B && E(this, B, B.enumerable, B.beans, B.preserve);
          }
          return this;
        },
        extend: function() {
          var I = f(this);
          return I.inject.apply(I, arguments);
        },
        each: function(I, O) {
          return T(this, I, O);
        },
        clone: function() {
          return new this.constructor(this);
        },
        statics: {
          set: w,
          each: T,
          create: f,
          define: v,
          describe: d,
          clone: function(I) {
            return w(new I.constructor(), I);
          },
          isPlainObject: function(I) {
            var O = I != null && I.constructor;
            return O && (O === Object || O === L || O.name === "Object");
          },
          pick: function(I, O) {
            return I !== r ? I : O;
          },
          slice: function(I, O, B) {
            return a.call(I, O, B);
          }
        }
      });
    }();
    u.exports = h, h.inject({
      enumerable: !1,
      toString: function() {
        return this._id != null ? (this._class || "Object") + (this._name ? " '" + this._name + "'" : " @" + this._id) : "{ " + h.each(this, function(t, i) {
          if (!/^_/.test(i)) {
            var a = typeof t;
            this.push(i + ": " + (a === "number" ? S.instance.number(t) : a === "string" ? "'" + t + "'" : t));
          }
        }, []).join(", ") + " }";
      },
      getClassName: function() {
        return this._class || "";
      },
      importJSON: function(t) {
        return h.importJSON(t, this);
      },
      exportJSON: function(t) {
        return h.exportJSON(this, t);
      },
      toJSON: function() {
        return h.serialize(this);
      },
      set: function(t, i) {
        return t && h.filter(this, t, i, this._prioritize), this;
      }
    }, {
      beans: !1,
      statics: {
        exports: {},
        extend: function t() {
          var i = t.base.apply(this, arguments), a = i.prototype._class;
          return a && !h.exports[a] && (h.exports[a] = i), i;
        },
        equals: function(t, i) {
          if (t === i)
            return !0;
          if (t && t.equals)
            return t.equals(i);
          if (i && i.equals)
            return i.equals(t);
          if (t && i && typeof t == "object" && typeof i == "object") {
            if (Array.isArray(t) && Array.isArray(i)) {
              var a = t.length;
              if (a !== i.length)
                return !1;
              for (; a--; )
                if (!h.equals(t[a], i[a]))
                  return !1;
            } else {
              var f = Object.keys(t), a = f.length;
              if (a !== Object.keys(i).length)
                return !1;
              for (; a--; ) {
                var d = f[a];
                if (!(i.hasOwnProperty(d) && h.equals(t[d], i[d])))
                  return !1;
              }
            }
            return !0;
          }
          return !1;
        },
        read: function(t, i, a, f) {
          if (this === h) {
            var d = this.peek(t, i);
            return t.__index++, d;
          }
          var v = this.prototype, m = v._readIndex, p = i || m && t.__index || 0, w = t.length, T = t[p];
          if (f = f || w - p, T instanceof this || a && a.readNull && T == null && f <= 1)
            return m && (t.__index = p + 1), T && a && a.clone ? T.clone() : T;
          if (T = h.create(v), m && (T.__read = !0), T = T.initialize.apply(T, p > 0 || p + f < w ? h.slice(t, p, p + f) : t) || T, m) {
            t.__index = p + T.__read;
            var E = T.__filtered;
            E && (t.__filtered = E, T.__filtered = r), T.__read = r;
          }
          return T;
        },
        peek: function(t, i) {
          return t[t.__index = i || t.__index || 0];
        },
        remain: function(t) {
          return t.length - (t.__index || 0);
        },
        readList: function(t, i, a, f) {
          for (var d = [], v, m = i || 0, p = f ? m + f : t.length, w = m; w < p; w++)
            d.push(Array.isArray(v = t[w]) ? this.read(v, 0, a) : this.read(t, w, a, 1));
          return d;
        },
        readNamed: function(t, i, a, f, d) {
          var v = this.getNamed(t, i), m = v !== r;
          if (m) {
            var p = t.__filtered;
            if (!p) {
              var w = this.getSource(t);
              p = t.__filtered = h.create(w), p.__unfiltered = w;
            }
            p[i] = r;
          }
          return this.read(m ? [v] : t, a, f, d);
        },
        readSupported: function(t, i) {
          var a = this.getSource(t), f = this, d = !1;
          return a && Object.keys(a).forEach(function(v) {
            if (v in i) {
              var m = f.readNamed(t, v);
              m !== r && (i[v] = m), d = !0;
            }
          }), d;
        },
        getSource: function(t) {
          var i = t.__source;
          if (i === r) {
            var a = t.length === 1 && t[0];
            i = t.__source = a && h.isPlainObject(a) ? a : null;
          }
          return i;
        },
        getNamed: function(t, i) {
          var a = this.getSource(t);
          if (a)
            return i ? a[i] : t.__filtered || a;
        },
        hasNamed: function(t, i) {
          return !!this.getNamed(t, i);
        },
        filter: function(t, i, a, f) {
          var d;
          function v(E) {
            if (!(a && E in a) && !(d && E in d)) {
              var L = i[E];
              L !== r && (t[E] = L);
            }
          }
          if (f) {
            for (var m = {}, p = 0, w, T = f.length; p < T; p++)
              (w = f[p]) in i && (v(w), m[w] = !0);
            d = m;
          }
          return Object.keys(i.__unfiltered || i).forEach(v), t;
        },
        isPlainValue: function(t, i) {
          return h.isPlainObject(t) || Array.isArray(t) || i && typeof t == "string";
        },
        serialize: function(t, i, a, f) {
          i = i || {};
          var d = !f, v;
          if (d && (i.formatter = new S(i.precision), f = {
            length: 0,
            definitions: {},
            references: {},
            add: function(L, I) {
              var O = "#" + L._id, B = this.references[O];
              if (!B) {
                this.length++;
                var q = I.call(L), Y = L._class;
                Y && q[0] !== Y && q.unshift(Y), this.definitions[O] = q, B = this.references[O] = [O];
              }
              return B;
            }
          }), t && t._serialize) {
            v = t._serialize(i, f);
            var m = t._class;
            m && !t._compactSerialize && (d || !a) && v[0] !== m && v.unshift(m);
          } else if (Array.isArray(t)) {
            v = [];
            for (var p = 0, w = t.length; p < w; p++)
              v[p] = h.serialize(t[p], i, a, f);
          } else if (h.isPlainObject(t)) {
            v = {};
            for (var T = Object.keys(t), p = 0, w = T.length; p < w; p++) {
              var E = T[p];
              v[E] = h.serialize(
                t[E],
                i,
                a,
                f
              );
            }
          } else
            typeof t == "number" ? v = i.formatter.number(t, i.precision) : v = t;
          return d && f.length > 0 ? [["dictionary", f.definitions], v] : v;
        },
        deserialize: function(t, i, a, f, d) {
          var v = t, m = !a, p = m && t && t.length && t[0][0] === "dictionary";
          if (a = a || {}, Array.isArray(t)) {
            var w = t[0], T = w === "dictionary";
            if (t.length == 1 && /^#/.test(w))
              return a.dictionary[w];
            w = h.exports[w], v = [];
            for (var E = w ? 1 : 0, L = t.length; E < L; E++)
              v.push(h.deserialize(
                t[E],
                i,
                a,
                T,
                p
              ));
            if (w) {
              var I = v;
              i ? v = i(w, I, m || d) : v = new w(I);
            }
          } else if (h.isPlainObject(t)) {
            v = {}, f && (a.dictionary = v);
            for (var O in t)
              v[O] = h.deserialize(t[O], i, a);
          }
          return p ? v[1] : v;
        },
        exportJSON: function(t, i) {
          var a = h.serialize(t, i);
          return i && i.asString == !1 ? a : JSON.stringify(a);
        },
        importJSON: function(t, i) {
          return h.deserialize(
            typeof t == "string" ? JSON.parse(t) : t,
            function(a, f, d) {
              var v = d && i && i.constructor === a, m = v ? i : h.create(a.prototype);
              if (f.length === 1 && m instanceof ct && (v || !(m instanceof _t))) {
                var p = f[0];
                h.isPlainObject(p) && (p.insert = !1, v && (f = f.concat([ct.INSERT])));
              }
              return (v ? m.set : a).apply(m, f), v && (i = null), m;
            }
          );
        },
        push: function(t, i) {
          var a = i.length;
          if (a < 4096)
            t.push.apply(t, i);
          else {
            var f = t.length;
            t.length += a;
            for (var d = 0; d < a; d++)
              t[f + d] = i[d];
          }
          return t;
        },
        splice: function(t, i, a, f) {
          var d = i && i.length, v = a === r;
          a = v ? t.length : a, a > t.length && (a = t.length);
          for (var m = 0; m < d; m++)
            i[m]._index = a + m;
          if (v)
            return h.push(t, i), [];
          var p = [a, f];
          i && h.push(p, i);
          for (var w = t.splice.apply(t, p), m = 0, T = w.length; m < T; m++)
            w[m]._index = r;
          for (var m = a + d, T = t.length; m < T; m++)
            t[m]._index = m;
          return w;
        },
        capitalize: function(t) {
          return t.replace(/\b[a-z]/g, function(i) {
            return i.toUpperCase();
          });
        },
        camelize: function(t) {
          return t.replace(/-(.)/g, function(i, a) {
            return a.toUpperCase();
          });
        },
        hyphenate: function(t) {
          return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        }
      }
    });
    var c = {
      on: function(t, i) {
        if (typeof t != "string")
          h.each(t, function(v, m) {
            this.on(m, v);
          }, this);
        else {
          var a = this._eventTypes, f = a && a[t], d = this._callbacks = this._callbacks || {};
          d = d[t] = d[t] || [], d.indexOf(i) === -1 && (d.push(i), f && f.install && d.length === 1 && f.install.call(this, t));
        }
        return this;
      },
      off: function(t, i) {
        if (typeof t != "string") {
          h.each(t, function(m, p) {
            this.off(p, m);
          }, this);
          return;
        }
        var a = this._eventTypes, f = a && a[t], d = this._callbacks && this._callbacks[t], v;
        return d && (!i || (v = d.indexOf(i)) !== -1 && d.length === 1 ? (f && f.uninstall && f.uninstall.call(this, t), delete this._callbacks[t]) : v !== -1 && d.splice(v, 1)), this;
      },
      once: function(t, i) {
        return this.on(t, function a() {
          i.apply(this, arguments), this.off(t, a);
        });
      },
      emit: function(t, i) {
        var a = this._callbacks && this._callbacks[t];
        if (!a)
          return !1;
        var f = h.slice(arguments, 1), d = i && i.target && !i.currentTarget;
        a = a.slice(), d && (i.currentTarget = this);
        for (var v = 0, m = a.length; v < m; v++)
          if (a[v].apply(this, f) == !1) {
            i && i.stop && i.stop();
            break;
          }
        return d && delete i.currentTarget, !0;
      },
      responds: function(t) {
        return !!(this._callbacks && this._callbacks[t]);
      },
      attach: "#on",
      detach: "#off",
      fire: "#emit",
      _installEvents: function(t) {
        var i = this._eventTypes, a = this._callbacks, f = t ? "install" : "uninstall";
        if (i) {
          for (var d in a)
            if (a[d].length > 0) {
              var v = i[d], m = v && v[f];
              m && m.call(this, d);
            }
        }
      },
      statics: {
        inject: function t(i) {
          var a = i._events;
          if (a) {
            var f = {};
            h.each(a, function(d, v) {
              var m = typeof d == "string", p = m ? d : v, w = h.capitalize(p), T = p.substring(2).toLowerCase();
              f[T] = m ? {} : d, p = "_" + p, i["get" + w] = function() {
                return this[p];
              }, i["set" + w] = function(E) {
                var L = this[p];
                L && this.off(T, L), E && this.on(T, E), this[p] = E;
              };
            }), i._eventTypes = f;
          }
          return t.base.apply(this, arguments);
        }
      }
    }, g = h.extend({
      _class: "PaperScope",
      initialize: function t() {
        ce = this, this.settings = new h({
          applyMatrix: !0,
          insertItems: !0,
          handleSize: 4,
          hitTolerance: 0
        }), this.project = null, this.projects = [], this.tools = [], this._id = t._id++, t._scopes[this._id] = this;
        var i = t.prototype;
        if (!this.support) {
          var a = Be.getContext(1, 1) || {};
          i.support = {
            nativeDash: "setLineDash" in a || "mozDash" in a,
            nativeBlendModes: _n.nativeModes
          }, Be.release(a);
        }
        if (!this.agent) {
          var f = e.navigator.userAgent.toLowerCase(), d = (/(darwin|win|mac|linux|freebsd|sunos)/.exec(f) || [])[0], v = d === "darwin" ? "mac" : d, m = i.agent = i.browser = { platform: v };
          v && (m[v] = !0), f.replace(
            /(opera|chrome|safari|webkit|firefox|msie|trident|atom|node|jsdom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g,
            function(p, w, T, E, L) {
              if (!m.chrome) {
                var I = w === "opera" ? E : /^(node|trident)$/.test(w) ? L : T;
                m.version = I, m.versionNumber = parseFloat(I), w = { trident: "msie", jsdom: "node" }[w] || w, m.name = w, m[w] = !0;
              }
            }
          ), m.chrome && delete m.webkit, m.atom && delete m.chrome;
        }
      },
      version: "0.12.18",
      getView: function() {
        var t = this.project;
        return t && t._view;
      },
      getPaper: function() {
        return this;
      },
      execute: function(t, i) {
      },
      install: function(t) {
        var i = this;
        h.each(["project", "view", "tool"], function(f) {
          h.define(t, f, {
            configurable: !0,
            get: function() {
              return i[f];
            }
          });
        });
        for (var a in this)
          !/^_/.test(a) && this[a] && (t[a] = this[a]);
      },
      setup: function(t) {
        return ce = this, this.project = new lt(t), this;
      },
      createCanvas: function(t, i) {
        return Be.getCanvas(t, i);
      },
      activate: function() {
        ce = this;
      },
      clear: function() {
        for (var t = this.projects, i = this.tools, a = t.length - 1; a >= 0; a--)
          t[a].remove();
        for (var a = i.length - 1; a >= 0; a--)
          i[a].remove();
      },
      remove: function() {
        this.clear(), delete g._scopes[this._id];
      },
      statics: new function() {
        function t(i) {
          return i += "Attribute", function(a, f) {
            return a[i](f) || a[i]("data-paper-" + f);
          };
        }
        return {
          _scopes: {},
          _id: 0,
          get: function(i) {
            return this._scopes[i] || null;
          },
          getAttribute: t("get"),
          hasAttribute: t("has")
        };
      }()
    }), b = h.extend(c, {
      initialize: function(t) {
        this._scope = ce, this._index = this._scope[this._list].push(this) - 1, (t || !this._scope[this._reference]) && this.activate();
      },
      activate: function() {
        if (!this._scope)
          return !1;
        var t = this._scope[this._reference];
        return t && t !== this && t.emit("deactivate"), this._scope[this._reference] = this, this.emit("activate", t), !0;
      },
      isActive: function() {
        return this._scope[this._reference] === this;
      },
      remove: function() {
        return this._index == null ? !1 : (h.splice(this._scope[this._list], null, this._index, 1), this._scope[this._reference] == this && (this._scope[this._reference] = null), this._scope = null, !0);
      },
      getView: function() {
        return this._scope.getView();
      }
    }), x = {
      findItemBoundsCollisions: function(t, i, a) {
        function f(m) {
          for (var p = new Array(m.length), w = 0; w < m.length; w++) {
            var T = m[w].getBounds();
            p[w] = [T.left, T.top, T.right, T.bottom];
          }
          return p;
        }
        var d = f(t), v = !i || i === t ? d : f(i);
        return this.findBoundsCollisions(d, v, a || 0);
      },
      findCurveBoundsCollisions: function(t, i, a, f) {
        function d(I) {
          for (var O = Math.min, B = Math.max, q = new Array(I.length), Y = 0; Y < I.length; Y++) {
            var z = I[Y];
            q[Y] = [
              O(z[0], z[2], z[4], z[6]),
              O(z[1], z[3], z[5], z[7]),
              B(z[0], z[2], z[4], z[6]),
              B(z[1], z[3], z[5], z[7])
            ];
          }
          return q;
        }
        var v = d(t), m = !i || i === t ? v : d(i);
        if (f) {
          for (var p = this.findBoundsCollisions(
            v,
            m,
            a || 0,
            !1,
            !0
          ), w = this.findBoundsCollisions(
            v,
            m,
            a || 0,
            !0,
            !0
          ), T = [], E = 0, L = p.length; E < L; E++)
            T[E] = { hor: p[E], ver: w[E] };
          return T;
        }
        return this.findBoundsCollisions(v, m, a || 0);
      },
      findBoundsCollisions: function(t, i, a, f, d) {
        var v = !i || t === i, m = v ? t : t.concat(i), p = t.length, w = m.length;
        function T(It, Rt, Qt) {
          for (var qt = 0, Xt = It.length; qt < Xt; ) {
            var Gt = Xt + qt >>> 1;
            m[It[Gt]][Rt] < Qt ? qt = Gt + 1 : Xt = Gt;
          }
          return qt - 1;
        }
        for (var E = f ? 1 : 0, L = E + 2, I = f ? 0 : 1, O = I + 2, B = new Array(w), q = 0; q < w; q++)
          B[q] = q;
        B.sort(function(It, Rt) {
          return m[It][E] - m[Rt][E];
        });
        for (var Y = [], z = new Array(p), q = 0; q < w; q++) {
          var N = B[q], M = m[N], R = v ? N : N - p, V = N < p, W = v || !V, G = V ? [] : null;
          if (Y.length) {
            var J = T(
              Y,
              L,
              M[E] - a
            ) + 1;
            if (Y.splice(0, J), v && d) {
              G = G.concat(Y);
              for (var j = 0; j < Y.length; j++) {
                var tt = Y[j];
                z[tt].push(R);
              }
            } else
              for (var it = M[O], Q = M[I], j = 0; j < Y.length; j++) {
                var tt = Y[j], nt = m[tt], st = tt < p, dt = v || tt >= p;
                (d || (V && dt || W && st) && it >= nt[I] - a && Q <= nt[O] + a) && (V && dt && G.push(
                  v ? tt : tt - p
                ), W && st && z[tt].push(R));
              }
          }
          if (V && (t === i && G.push(N), z[N] = G), Y.length) {
            var gt = M[L], pt = T(Y, L, gt);
            Y.splice(pt + 1, 0, N);
          } else
            Y.push(N);
        }
        for (var q = 0; q < z.length; q++) {
          var At = z[q];
          At && At.sort(function(Rt, Qt) {
            return Rt - Qt;
          });
        }
        return z;
      }
    }, S = h.extend({
      initialize: function(t) {
        this.precision = h.pick(t, 5), this.multiplier = Math.pow(10, this.precision);
      },
      number: function(t) {
        return this.precision < 16 ? Math.round(t * this.multiplier) / this.multiplier : t;
      },
      pair: function(t, i, a) {
        return this.number(t) + (a || ",") + this.number(i);
      },
      point: function(t, i) {
        return this.number(t.x) + (i || ",") + this.number(t.y);
      },
      size: function(t, i) {
        return this.number(t.width) + (i || ",") + this.number(t.height);
      },
      rectangle: function(t, i) {
        return this.point(t, i) + (i || ",") + this.size(t, i);
      }
    });
    S.instance = new S();
    var A = new function() {
      var t = [
        [0.5773502691896257],
        [0, 0.7745966692414834],
        [0.33998104358485626, 0.8611363115940526],
        [0, 0.5384693101056831, 0.906179845938664],
        [0.2386191860831969, 0.6612093864662645, 0.932469514203152],
        [0, 0.4058451513773972, 0.7415311855993945, 0.9491079123427585],
        [0.1834346424956498, 0.525532409916329, 0.7966664774136267, 0.9602898564975363],
        [0, 0.3242534234038089, 0.6133714327005904, 0.8360311073266358, 0.9681602395076261],
        [0.14887433898163122, 0.4333953941292472, 0.6794095682990244, 0.8650633666889845, 0.9739065285171717],
        [0, 0.26954315595234496, 0.5190961292068118, 0.7301520055740494, 0.8870625997680953, 0.978228658146057],
        [0.1252334085114689, 0.3678314989981802, 0.5873179542866175, 0.7699026741943047, 0.9041172563704749, 0.9815606342467192],
        [0, 0.2304583159551348, 0.44849275103644687, 0.6423493394403402, 0.8015780907333099, 0.9175983992229779, 0.9841830547185881],
        [0.10805494870734367, 0.31911236892788974, 0.5152486363581541, 0.6872929048116855, 0.827201315069765, 0.9284348836635735, 0.9862838086968123],
        [0, 0.20119409399743451, 0.3941513470775634, 0.5709721726085388, 0.7244177313601701, 0.8482065834104272, 0.937273392400706, 0.9879925180204854],
        [0.09501250983763744, 0.2816035507792589, 0.45801677765722737, 0.6178762444026438, 0.755404408355003, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499]
      ], i = [
        [1],
        [0.8888888888888888, 0.5555555555555556],
        [0.6521451548625461, 0.34785484513745385],
        [0.5688888888888889, 0.47862867049936647, 0.23692688505618908],
        [0.46791393457269104, 0.3607615730481386, 0.17132449237917036],
        [0.4179591836734694, 0.3818300505051189, 0.27970539148927664, 0.1294849661688697],
        [0.362683783378362, 0.31370664587788727, 0.22238103445337448, 0.10122853629037626],
        [0.3302393550012598, 0.31234707704000286, 0.26061069640293544, 0.1806481606948574, 0.08127438836157441],
        [0.29552422471475287, 0.26926671930999635, 0.21908636251598204, 0.1494513491505806, 0.06667134430868814],
        [0.2729250867779006, 0.26280454451024665, 0.23319376459199048, 0.18629021092773426, 0.1255803694649046, 0.05566856711617366],
        [0.24914704581340277, 0.2334925365383548, 0.20316742672306592, 0.16007832854334622, 0.10693932599531843, 0.04717533638651183],
        [0.2325515532308739, 0.22628318026289723, 0.2078160475368885, 0.17814598076194574, 0.13887351021978725, 0.09212149983772845, 0.04048400476531588],
        [0.2152638534631578, 0.2051984637212956, 0.18553839747793782, 0.15720316715819355, 0.12151857068790319, 0.08015808715976021, 0.03511946033175186],
        [0.2025782419255613, 0.19843148532711158, 0.1861610000155622, 0.16626920581699392, 0.13957067792615432, 0.10715922046717194, 0.07036604748810812, 0.03075324199611727],
        [0.1894506104550685, 0.18260341504492358, 0.16915651939500254, 0.14959598881657674, 0.12462897125553388, 0.09515851168249279, 0.062253523938647894, 0.027152459411754096]
      ], a = Math.abs, f = Math.sqrt, d = Math.pow, v = Math.log2 || function(L) {
        return Math.log(L) * Math.LOG2E;
      }, m = 1e-12, p = 112e-18;
      function w(L, I, O) {
        return L < I ? I : L > O ? O : L;
      }
      function T(L, I, O) {
        function B(J) {
          var j = J * 134217729, tt = J - j, it = tt + j, Q = J - it;
          return [it, Q];
        }
        var q = I * I - L * O, Y = I * I + L * O;
        if (a(q) * 3 < Y) {
          var z = B(L), N = B(I), M = B(O), R = I * I, V = N[0] * N[0] - R + 2 * N[0] * N[1] + N[1] * N[1], W = L * O, G = z[0] * M[0] - W + z[0] * M[1] + z[1] * M[0] + z[1] * M[1];
          q = R - W + (V - G);
        }
        return q;
      }
      function E() {
        var L = Math.max.apply(Math, arguments);
        return L && (L < 1e-8 || L > 1e8) ? d(2, -Math.round(v(L))) : 0;
      }
      return {
        EPSILON: m,
        MACHINE_EPSILON: p,
        CURVETIME_EPSILON: 1e-8,
        GEOMETRIC_EPSILON: 1e-7,
        TRIGONOMETRIC_EPSILON: 1e-8,
        ANGULAR_EPSILON: 1e-5,
        KAPPA: 4 * (f(2) - 1) / 3,
        isZero: function(L) {
          return L >= -m && L <= m;
        },
        isMachineZero: function(L) {
          return L >= -p && L <= p;
        },
        clamp: w,
        integrate: function(L, I, O, B) {
          for (var q = t[B - 2], Y = i[B - 2], z = (O - I) * 0.5, N = z + I, M = 0, R = B + 1 >> 1, V = B & 1 ? Y[M++] * L(N) : 0; M < R; ) {
            var W = z * q[M];
            V += Y[M++] * (L(N + W) + L(N - W));
          }
          return z * V;
        },
        findRoot: function(L, I, O, B, q, Y, z) {
          for (var N = 0; N < Y; N++) {
            var M = L(O), R = M / I(O), V = O - R;
            if (a(R) < z) {
              O = V;
              break;
            }
            M > 0 ? (q = O, O = V <= B ? (B + q) * 0.5 : V) : (B = O, O = V >= q ? (B + q) * 0.5 : V);
          }
          return w(O, B, q);
        },
        solveQuadratic: function(L, I, O, B, q, Y) {
          var z, N = 1 / 0;
          if (a(L) < m) {
            if (a(I) < m)
              return a(O) < m ? -1 : 0;
            z = -O / I;
          } else {
            I *= -0.5;
            var M = T(L, I, O);
            if (M && a(M) < p) {
              var R = E(a(L), a(I), a(O));
              R && (L *= R, I *= R, O *= R, M = T(L, I, O));
            }
            if (M >= -p) {
              var V = M < 0 ? 0 : f(M), W = I + (I < 0 ? -V : V);
              W === 0 ? (z = O / L, N = -z) : (z = W / L, N = O / W);
            }
          }
          var G = 0, J = q == null, j = q - m, tt = Y + m;
          return isFinite(z) && (J || z > j && z < tt) && (B[G++] = J ? z : w(z, q, Y)), N !== z && isFinite(N) && (J || N > j && N < tt) && (B[G++] = J ? N : w(N, q, Y)), G;
        },
        solveCubic: function(L, I, O, B, q, Y, z) {
          var N = E(a(L), a(I), a(O), a(B)), M, R, V, W, G;
          N && (L *= N, I *= N, O *= N, B *= N);
          function J(pt) {
            M = pt;
            var At = L * M;
            R = At + I, V = R * M + O, W = (At + R) * M + V, G = V * M + B;
          }
          if (a(L) < m)
            L = I, R = O, V = B, M = 1 / 0;
          else if (a(B) < m)
            R = I, V = O, M = 0;
          else {
            J(-(I / L) / 3);
            var j = G / L, tt = d(a(j), 1 / 3), it = j < 0 ? -1 : 1, Q = -W / L, nt = Q > 0 ? 1.324717957244746 * Math.max(tt, f(Q)) : tt, st = M - it * nt;
            if (st !== M) {
              do
                J(st), st = W === 0 ? M : M - G / W / (1 + p);
              while (it * st > it * M);
              a(L) * M * M > a(B / M) && (V = -B / M, R = (V - O) / M);
            }
          }
          var dt = A.solveQuadratic(L, R, V, q, Y, z), gt = Y == null;
          return isFinite(M) && (dt === 0 || dt > 0 && M !== q[0] && M !== q[1]) && (gt || M > Y - m && M < z + m) && (q[dt++] = gt ? M : w(M, Y, z)), dt;
        }
      };
    }(), k = {
      _id: 1,
      _pools: {},
      get: function(t) {
        if (t) {
          var i = this._pools[t];
          return i || (i = this._pools[t] = { _id: 1 }), i._id++;
        } else
          return this._id++;
      }
    }, y = h.extend({
      _class: "Point",
      _readIndex: !0,
      initialize: function(i, a) {
        var f = typeof i, d = this.__read, v = 0;
        if (f === "number") {
          var m = typeof a == "number";
          this._set(i, m ? a : i), d && (v = m ? 2 : 1);
        } else if (f === "undefined" || i === null)
          this._set(0, 0), d && (v = i === null ? 1 : 0);
        else {
          var p = f === "string" ? i.split(/[\s,]+/) || [] : i;
          v = 1, Array.isArray(p) ? this._set(+p[0], +(p.length > 1 ? p[1] : p[0])) : "x" in p ? this._set(p.x || 0, p.y || 0) : "width" in p ? this._set(p.width || 0, p.height || 0) : "angle" in p ? (this._set(p.length || 0, 0), this.setAngle(p.angle || 0)) : (this._set(0, 0), v = 0);
        }
        return d && (this.__read = v), this;
      },
      set: "#initialize",
      _set: function(t, i) {
        return this.x = t, this.y = i, this;
      },
      equals: function(t) {
        return this === t || t && (this.x === t.x && this.y === t.y || Array.isArray(t) && this.x === t[0] && this.y === t[1]) || !1;
      },
      clone: function() {
        return new y(this.x, this.y);
      },
      toString: function() {
        var t = S.instance;
        return "{ x: " + t.number(this.x) + ", y: " + t.number(this.y) + " }";
      },
      _serialize: function(t) {
        var i = t.formatter;
        return [i.number(this.x), i.number(this.y)];
      },
      getLength: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      setLength: function(t) {
        if (this.isZero()) {
          var i = this._angle || 0;
          this._set(
            Math.cos(i) * t,
            Math.sin(i) * t
          );
        } else {
          var a = t / this.getLength();
          A.isZero(a) && this.getAngle(), this._set(
            this.x * a,
            this.y * a
          );
        }
      },
      getAngle: function() {
        return this.getAngleInRadians.apply(this, arguments) * 180 / Math.PI;
      },
      setAngle: function(t) {
        this.setAngleInRadians.call(this, t * Math.PI / 180);
      },
      getAngleInDegrees: "#getAngle",
      setAngleInDegrees: "#setAngle",
      getAngleInRadians: function() {
        if (arguments.length) {
          var t = y.read(arguments), i = this.getLength() * t.getLength();
          if (A.isZero(i))
            return NaN;
          var a = this.dot(t) / i;
          return Math.acos(a < -1 ? -1 : a > 1 ? 1 : a);
        } else
          return this.isZero() ? this._angle || 0 : this._angle = Math.atan2(this.y, this.x);
      },
      setAngleInRadians: function(t) {
        if (this._angle = t, !this.isZero()) {
          var i = this.getLength();
          this._set(
            Math.cos(t) * i,
            Math.sin(t) * i
          );
        }
      },
      getQuadrant: function() {
        return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
      }
    }, {
      beans: !1,
      getDirectedAngle: function() {
        var t = y.read(arguments);
        return Math.atan2(this.cross(t), this.dot(t)) * 180 / Math.PI;
      },
      getDistance: function() {
        var t = arguments, i = y.read(t), a = i.x - this.x, f = i.y - this.y, d = a * a + f * f, v = h.read(t);
        return v ? d : Math.sqrt(d);
      },
      normalize: function(t) {
        t === r && (t = 1);
        var i = this.getLength(), a = i !== 0 ? t / i : 0, f = new y(this.x * a, this.y * a);
        return a >= 0 && (f._angle = this._angle), f;
      },
      rotate: function(t, i) {
        if (t === 0)
          return this.clone();
        t = t * Math.PI / 180;
        var a = i ? this.subtract(i) : this, f = Math.sin(t), d = Math.cos(t);
        return a = new y(
          a.x * d - a.y * f,
          a.x * f + a.y * d
        ), i ? a.add(i) : a;
      },
      transform: function(t) {
        return t ? t._transformPoint(this) : this;
      },
      add: function() {
        var t = y.read(arguments);
        return new y(this.x + t.x, this.y + t.y);
      },
      subtract: function() {
        var t = y.read(arguments);
        return new y(this.x - t.x, this.y - t.y);
      },
      multiply: function() {
        var t = y.read(arguments);
        return new y(this.x * t.x, this.y * t.y);
      },
      divide: function() {
        var t = y.read(arguments);
        return new y(this.x / t.x, this.y / t.y);
      },
      modulo: function() {
        var t = y.read(arguments);
        return new y(this.x % t.x, this.y % t.y);
      },
      negate: function() {
        return new y(-this.x, -this.y);
      },
      isInside: function() {
        return $.read(arguments).contains(this);
      },
      isClose: function() {
        var t = arguments, i = y.read(t), a = h.read(t);
        return this.getDistance(i) <= a;
      },
      isCollinear: function() {
        var t = y.read(arguments);
        return y.isCollinear(this.x, this.y, t.x, t.y);
      },
      isColinear: "#isCollinear",
      isOrthogonal: function() {
        var t = y.read(arguments);
        return y.isOrthogonal(this.x, this.y, t.x, t.y);
      },
      isZero: function() {
        var t = A.isZero;
        return t(this.x) && t(this.y);
      },
      isNaN: function() {
        return isNaN(this.x) || isNaN(this.y);
      },
      isInQuadrant: function(t) {
        return this.x * (t > 1 && t < 4 ? -1 : 1) >= 0 && this.y * (t > 2 ? -1 : 1) >= 0;
      },
      dot: function() {
        var t = y.read(arguments);
        return this.x * t.x + this.y * t.y;
      },
      cross: function() {
        var t = y.read(arguments);
        return this.x * t.y - this.y * t.x;
      },
      project: function() {
        var t = y.read(arguments), i = t.isZero() ? 0 : this.dot(t) / t.dot(t);
        return new y(
          t.x * i,
          t.y * i
        );
      },
      statics: {
        min: function() {
          var t = arguments, i = y.read(t), a = y.read(t);
          return new y(
            Math.min(i.x, a.x),
            Math.min(i.y, a.y)
          );
        },
        max: function() {
          var t = arguments, i = y.read(t), a = y.read(t);
          return new y(
            Math.max(i.x, a.x),
            Math.max(i.y, a.y)
          );
        },
        random: function() {
          return new y(Math.random(), Math.random());
        },
        isCollinear: function(t, i, a, f) {
          return Math.abs(t * f - i * a) <= Math.sqrt((t * t + i * i) * (a * a + f * f)) * 1e-8;
        },
        isOrthogonal: function(t, i, a, f) {
          return Math.abs(t * a + i * f) <= Math.sqrt((t * t + i * i) * (a * a + f * f)) * 1e-8;
        }
      }
    }, h.each(["round", "ceil", "floor", "abs"], function(t) {
      var i = Math[t];
      this[t] = function() {
        return new y(i(this.x), i(this.y));
      };
    }, {})), D = y.extend({
      initialize: function(i, a, f, d) {
        this._x = i, this._y = a, this._owner = f, this._setter = d;
      },
      _set: function(t, i, a) {
        return this._x = t, this._y = i, a || this._owner[this._setter](this), this;
      },
      getX: function() {
        return this._x;
      },
      setX: function(t) {
        this._x = t, this._owner[this._setter](this);
      },
      getY: function() {
        return this._y;
      },
      setY: function(t) {
        this._y = t, this._owner[this._setter](this);
      },
      isSelected: function() {
        return !!(this._owner._selection & this._getSelection());
      },
      setSelected: function(t) {
        this._owner._changeSelection(this._getSelection(), t);
      },
      _getSelection: function() {
        return this._setter === "setPosition" ? 4 : 0;
      }
    }), C = h.extend({
      _class: "Size",
      _readIndex: !0,
      initialize: function(i, a) {
        var f = typeof i, d = this.__read, v = 0;
        if (f === "number") {
          var m = typeof a == "number";
          this._set(i, m ? a : i), d && (v = m ? 2 : 1);
        } else if (f === "undefined" || i === null)
          this._set(0, 0), d && (v = i === null ? 1 : 0);
        else {
          var p = f === "string" ? i.split(/[\s,]+/) || [] : i;
          v = 1, Array.isArray(p) ? this._set(+p[0], +(p.length > 1 ? p[1] : p[0])) : "width" in p ? this._set(p.width || 0, p.height || 0) : "x" in p ? this._set(p.x || 0, p.y || 0) : (this._set(0, 0), v = 0);
        }
        return d && (this.__read = v), this;
      },
      set: "#initialize",
      _set: function(t, i) {
        return this.width = t, this.height = i, this;
      },
      equals: function(t) {
        return t === this || t && (this.width === t.width && this.height === t.height || Array.isArray(t) && this.width === t[0] && this.height === t[1]) || !1;
      },
      clone: function() {
        return new C(this.width, this.height);
      },
      toString: function() {
        var t = S.instance;
        return "{ width: " + t.number(this.width) + ", height: " + t.number(this.height) + " }";
      },
      _serialize: function(t) {
        var i = t.formatter;
        return [
          i.number(this.width),
          i.number(this.height)
        ];
      },
      add: function() {
        var t = C.read(arguments);
        return new C(this.width + t.width, this.height + t.height);
      },
      subtract: function() {
        var t = C.read(arguments);
        return new C(this.width - t.width, this.height - t.height);
      },
      multiply: function() {
        var t = C.read(arguments);
        return new C(this.width * t.width, this.height * t.height);
      },
      divide: function() {
        var t = C.read(arguments);
        return new C(this.width / t.width, this.height / t.height);
      },
      modulo: function() {
        var t = C.read(arguments);
        return new C(this.width % t.width, this.height % t.height);
      },
      negate: function() {
        return new C(-this.width, -this.height);
      },
      isZero: function() {
        var t = A.isZero;
        return t(this.width) && t(this.height);
      },
      isNaN: function() {
        return isNaN(this.width) || isNaN(this.height);
      },
      statics: {
        min: function(t, i) {
          return new C(
            Math.min(t.width, i.width),
            Math.min(t.height, i.height)
          );
        },
        max: function(t, i) {
          return new C(
            Math.max(t.width, i.width),
            Math.max(t.height, i.height)
          );
        },
        random: function() {
          return new C(Math.random(), Math.random());
        }
      }
    }, h.each(["round", "ceil", "floor", "abs"], function(t) {
      var i = Math[t];
      this[t] = function() {
        return new C(i(this.width), i(this.height));
      };
    }, {})), U = C.extend({
      initialize: function(i, a, f, d) {
        this._width = i, this._height = a, this._owner = f, this._setter = d;
      },
      _set: function(t, i, a) {
        return this._width = t, this._height = i, a || this._owner[this._setter](this), this;
      },
      getWidth: function() {
        return this._width;
      },
      setWidth: function(t) {
        this._width = t, this._owner[this._setter](this);
      },
      getHeight: function() {
        return this._height;
      },
      setHeight: function(t) {
        this._height = t, this._owner[this._setter](this);
      }
    }), $ = h.extend({
      _class: "Rectangle",
      _readIndex: !0,
      beans: !0,
      initialize: function(i, a, f, d) {
        var v = arguments, m = typeof i, p;
        if (m === "number" ? (this._set(i, a, f, d), p = 4) : m === "undefined" || i === null ? (this._set(0, 0, 0, 0), p = i === null ? 1 : 0) : v.length === 1 && (Array.isArray(i) ? (this._set.apply(this, i), p = 1) : i.x !== r || i.width !== r ? (this._set(
          i.x || 0,
          i.y || 0,
          i.width || 0,
          i.height || 0
        ), p = 1) : i.from === r && i.to === r && (this._set(0, 0, 0, 0), h.readSupported(v, this) && (p = 1))), p === r) {
          var w = y.readNamed(v, "from"), T = h.peek(v), E = w.x, L = w.y, I, O;
          if (T && T.x !== r || h.hasNamed(v, "to")) {
            var B = y.readNamed(v, "to");
            I = B.x - E, O = B.y - L, I < 0 && (E = B.x, I = -I), O < 0 && (L = B.y, O = -O);
          } else {
            var q = C.read(v);
            I = q.width, O = q.height;
          }
          this._set(E, L, I, O), p = v.__index;
        }
        var Y = v.__filtered;
        return Y && (this.__filtered = Y), this.__read && (this.__read = p), this;
      },
      set: "#initialize",
      _set: function(t, i, a, f) {
        return this.x = t, this.y = i, this.width = a, this.height = f, this;
      },
      clone: function() {
        return new $(this.x, this.y, this.width, this.height);
      },
      equals: function(t) {
        var i = h.isPlainValue(t) ? $.read(arguments) : t;
        return i === this || i && this.x === i.x && this.y === i.y && this.width === i.width && this.height === i.height || !1;
      },
      toString: function() {
        var t = S.instance;
        return "{ x: " + t.number(this.x) + ", y: " + t.number(this.y) + ", width: " + t.number(this.width) + ", height: " + t.number(this.height) + " }";
      },
      _serialize: function(t) {
        var i = t.formatter;
        return [
          i.number(this.x),
          i.number(this.y),
          i.number(this.width),
          i.number(this.height)
        ];
      },
      getPoint: function(t) {
        var i = t ? y : D;
        return new i(this.x, this.y, this, "setPoint");
      },
      setPoint: function() {
        var t = y.read(arguments);
        this.x = t.x, this.y = t.y;
      },
      getSize: function(t) {
        var i = t ? C : U;
        return new i(this.width, this.height, this, "setSize");
      },
      _fw: 1,
      _fh: 1,
      setSize: function() {
        var t = C.read(arguments), i = this._sx, a = this._sy, f = t.width, d = t.height;
        i && (this.x += (this.width - f) * i), a && (this.y += (this.height - d) * a), this.width = f, this.height = d, this._fw = this._fh = 1;
      },
      getLeft: function() {
        return this.x;
      },
      setLeft: function(t) {
        if (!this._fw) {
          var i = t - this.x;
          this.width -= this._sx === 0.5 ? i * 2 : i;
        }
        this.x = t, this._sx = this._fw = 0;
      },
      getTop: function() {
        return this.y;
      },
      setTop: function(t) {
        if (!this._fh) {
          var i = t - this.y;
          this.height -= this._sy === 0.5 ? i * 2 : i;
        }
        this.y = t, this._sy = this._fh = 0;
      },
      getRight: function() {
        return this.x + this.width;
      },
      setRight: function(t) {
        if (!this._fw) {
          var i = t - this.x;
          this.width = this._sx === 0.5 ? i * 2 : i;
        }
        this.x = t - this.width, this._sx = 1, this._fw = 0;
      },
      getBottom: function() {
        return this.y + this.height;
      },
      setBottom: function(t) {
        if (!this._fh) {
          var i = t - this.y;
          this.height = this._sy === 0.5 ? i * 2 : i;
        }
        this.y = t - this.height, this._sy = 1, this._fh = 0;
      },
      getCenterX: function() {
        return this.x + this.width / 2;
      },
      setCenterX: function(t) {
        this._fw || this._sx === 0.5 ? this.x = t - this.width / 2 : (this._sx && (this.x += (t - this.x) * 2 * this._sx), this.width = (t - this.x) * 2), this._sx = 0.5, this._fw = 0;
      },
      getCenterY: function() {
        return this.y + this.height / 2;
      },
      setCenterY: function(t) {
        this._fh || this._sy === 0.5 ? this.y = t - this.height / 2 : (this._sy && (this.y += (t - this.y) * 2 * this._sy), this.height = (t - this.y) * 2), this._sy = 0.5, this._fh = 0;
      },
      getCenter: function(t) {
        var i = t ? y : D;
        return new i(this.getCenterX(), this.getCenterY(), this, "setCenter");
      },
      setCenter: function() {
        var t = y.read(arguments);
        return this.setCenterX(t.x), this.setCenterY(t.y), this;
      },
      getArea: function() {
        return this.width * this.height;
      },
      isEmpty: function() {
        return this.width === 0 || this.height === 0;
      },
      contains: function(t) {
        return t && t.width !== r || (Array.isArray(t) ? t : arguments).length === 4 ? this._containsRectangle($.read(arguments)) : this._containsPoint(y.read(arguments));
      },
      _containsPoint: function(t) {
        var i = t.x, a = t.y;
        return i >= this.x && a >= this.y && i <= this.x + this.width && a <= this.y + this.height;
      },
      _containsRectangle: function(t) {
        var i = t.x, a = t.y;
        return i >= this.x && a >= this.y && i + t.width <= this.x + this.width && a + t.height <= this.y + this.height;
      },
      intersects: function() {
        var t = $.read(arguments), i = h.read(arguments) || 0;
        return t.x + t.width > this.x - i && t.y + t.height > this.y - i && t.x < this.x + this.width + i && t.y < this.y + this.height + i;
      },
      intersect: function() {
        var t = $.read(arguments), i = Math.max(this.x, t.x), a = Math.max(this.y, t.y), f = Math.min(this.x + this.width, t.x + t.width), d = Math.min(this.y + this.height, t.y + t.height);
        return new $(i, a, f - i, d - a);
      },
      unite: function() {
        var t = $.read(arguments), i = Math.min(this.x, t.x), a = Math.min(this.y, t.y), f = Math.max(this.x + this.width, t.x + t.width), d = Math.max(this.y + this.height, t.y + t.height);
        return new $(i, a, f - i, d - a);
      },
      include: function() {
        var t = y.read(arguments), i = Math.min(this.x, t.x), a = Math.min(this.y, t.y), f = Math.max(this.x + this.width, t.x), d = Math.max(this.y + this.height, t.y);
        return new $(i, a, f - i, d - a);
      },
      expand: function() {
        var t = C.read(arguments), i = t.width, a = t.height;
        return new $(
          this.x - i / 2,
          this.y - a / 2,
          this.width + i,
          this.height + a
        );
      },
      scale: function(t, i) {
        return this.expand(
          this.width * t - this.width,
          this.height * (i === r ? t : i) - this.height
        );
      }
    }, h.each(
      [
        ["Top", "Left"],
        ["Top", "Right"],
        ["Bottom", "Left"],
        ["Bottom", "Right"],
        ["Left", "Center"],
        ["Top", "Center"],
        ["Right", "Center"],
        ["Bottom", "Center"]
      ],
      function(t, i) {
        var a = t.join(""), f = /^[RL]/.test(a);
        i >= 4 && (t[1] += f ? "Y" : "X");
        var d = t[f ? 0 : 1], v = t[f ? 1 : 0], m = "get" + d, p = "get" + v, w = "set" + d, T = "set" + v, E = "get" + a, L = "set" + a;
        this[E] = function(I) {
          var O = I ? y : D;
          return new O(this[m](), this[p](), this, L);
        }, this[L] = function() {
          var I = y.read(arguments);
          this[w](I.x), this[T](I.y);
        };
      },
      {
        beans: !0
      }
    )), Z = $.extend(
      {
        initialize: function(i, a, f, d, v, m) {
          this._set(i, a, f, d, !0), this._owner = v, this._setter = m;
        },
        _set: function(t, i, a, f, d) {
          return this._x = t, this._y = i, this._width = a, this._height = f, d || this._owner[this._setter](this), this;
        }
      },
      new function() {
        var t = $.prototype;
        return h.each(
          ["x", "y", "width", "height"],
          function(i) {
            var a = h.capitalize(i), f = "_" + i;
            this["get" + a] = function() {
              return this[f];
            }, this["set" + a] = function(d) {
              this[f] = d, this._dontNotify || this._owner[this._setter](this);
            };
          },
          h.each(
            [
              "Point",
              "Size",
              "Center",
              "Left",
              "Top",
              "Right",
              "Bottom",
              "CenterX",
              "CenterY",
              "TopLeft",
              "TopRight",
              "BottomLeft",
              "BottomRight",
              "LeftCenter",
              "TopCenter",
              "RightCenter",
              "BottomCenter"
            ],
            function(i) {
              var a = "set" + i;
              this[a] = function() {
                this._dontNotify = !0, t[a].apply(this, arguments), this._dontNotify = !1, this._owner[this._setter](this);
              };
            },
            {
              isSelected: function() {
                return !!(this._owner._selection & 2);
              },
              setSelected: function(i) {
                var a = this._owner;
                a._changeSelection && a._changeSelection(2, i);
              }
            }
          )
        );
      }()
    ), K = h.extend({
      _class: "Matrix",
      initialize: function t(i, a) {
        var f = arguments, d = f.length, v = !0;
        if (d >= 6 ? this._set.apply(this, f) : d === 1 || d === 2 ? i instanceof t ? this._set(
          i._a,
          i._b,
          i._c,
          i._d,
          i._tx,
          i._ty,
          a
        ) : Array.isArray(i) ? this._set.apply(
          this,
          a ? i.concat([a]) : i
        ) : v = !1 : d ? v = !1 : this.reset(), !v)
          throw new Error("Unsupported matrix parameters");
        return this;
      },
      set: "#initialize",
      _set: function(t, i, a, f, d, v, m) {
        return this._a = t, this._b = i, this._c = a, this._d = f, this._tx = d, this._ty = v, m || this._changed(), this;
      },
      _serialize: function(t, i) {
        return h.serialize(this.getValues(), t, !0, i);
      },
      _changed: function() {
        var t = this._owner;
        t && (t._applyMatrix ? t.transform(null, !0) : t._changed(25));
      },
      clone: function() {
        return new K(
          this._a,
          this._b,
          this._c,
          this._d,
          this._tx,
          this._ty
        );
      },
      equals: function(t) {
        return t === this || t && this._a === t._a && this._b === t._b && this._c === t._c && this._d === t._d && this._tx === t._tx && this._ty === t._ty;
      },
      toString: function() {
        var t = S.instance;
        return "[[" + [
          t.number(this._a),
          t.number(this._c),
          t.number(this._tx)
        ].join(", ") + "], [" + [
          t.number(this._b),
          t.number(this._d),
          t.number(this._ty)
        ].join(", ") + "]]";
      },
      reset: function(t) {
        return this._a = this._d = 1, this._b = this._c = this._tx = this._ty = 0, t || this._changed(), this;
      },
      apply: function(t, i) {
        var a = this._owner;
        return a ? (a.transform(null, h.pick(t, !0), i), this.isIdentity()) : !1;
      },
      translate: function() {
        var t = y.read(arguments), i = t.x, a = t.y;
        return this._tx += i * this._a + a * this._c, this._ty += i * this._b + a * this._d, this._changed(), this;
      },
      scale: function() {
        var t = arguments, i = y.read(t), a = y.read(t, 0, { readNull: !0 });
        return a && this.translate(a), this._a *= i.x, this._b *= i.x, this._c *= i.y, this._d *= i.y, a && this.translate(a.negate()), this._changed(), this;
      },
      rotate: function(t) {
        t *= Math.PI / 180;
        var i = y.read(arguments, 1), a = i.x, f = i.y, d = Math.cos(t), v = Math.sin(t), m = a - a * d + f * v, p = f - a * v - f * d, w = this._a, T = this._b, E = this._c, L = this._d;
        return this._a = d * w + v * E, this._b = d * T + v * L, this._c = -v * w + d * E, this._d = -v * T + d * L, this._tx += m * w + p * E, this._ty += m * T + p * L, this._changed(), this;
      },
      shear: function() {
        var t = arguments, i = y.read(t), a = y.read(t, 0, { readNull: !0 });
        a && this.translate(a);
        var f = this._a, d = this._b;
        return this._a += i.y * this._c, this._b += i.y * this._d, this._c += i.x * f, this._d += i.x * d, a && this.translate(a.negate()), this._changed(), this;
      },
      skew: function() {
        var t = arguments, i = y.read(t), a = y.read(t, 0, { readNull: !0 }), f = Math.PI / 180, d = new y(
          Math.tan(i.x * f),
          Math.tan(i.y * f)
        );
        return this.shear(d, a);
      },
      append: function(t, i) {
        if (t) {
          var a = this._a, f = this._b, d = this._c, v = this._d, m = t._a, p = t._c, w = t._b, T = t._d, E = t._tx, L = t._ty;
          this._a = m * a + w * d, this._c = p * a + T * d, this._b = m * f + w * v, this._d = p * f + T * v, this._tx += E * a + L * d, this._ty += E * f + L * v, i || this._changed();
        }
        return this;
      },
      prepend: function(t, i) {
        if (t) {
          var a = this._a, f = this._b, d = this._c, v = this._d, m = this._tx, p = this._ty, w = t._a, T = t._c, E = t._b, L = t._d, I = t._tx, O = t._ty;
          this._a = w * a + T * f, this._c = w * d + T * v, this._b = E * a + L * f, this._d = E * d + L * v, this._tx = w * m + T * p + I, this._ty = E * m + L * p + O, i || this._changed();
        }
        return this;
      },
      appended: function(t) {
        return this.clone().append(t);
      },
      prepended: function(t) {
        return this.clone().prepend(t);
      },
      invert: function() {
        var t = this._a, i = this._b, a = this._c, f = this._d, d = this._tx, v = this._ty, m = t * f - i * a, p = null;
        return m && !isNaN(m) && isFinite(d) && isFinite(v) && (this._a = f / m, this._b = -i / m, this._c = -a / m, this._d = t / m, this._tx = (a * v - f * d) / m, this._ty = (i * d - t * v) / m, p = this), p;
      },
      inverted: function() {
        return this.clone().invert();
      },
      concatenate: "#append",
      preConcatenate: "#prepend",
      chain: "#appended",
      _shiftless: function() {
        return new K(this._a, this._b, this._c, this._d, 0, 0);
      },
      _orNullIfIdentity: function() {
        return this.isIdentity() ? null : this;
      },
      isIdentity: function() {
        return this._a === 1 && this._b === 0 && this._c === 0 && this._d === 1 && this._tx === 0 && this._ty === 0;
      },
      isInvertible: function() {
        var t = this._a * this._d - this._c * this._b;
        return t && !isNaN(t) && isFinite(this._tx) && isFinite(this._ty);
      },
      isSingular: function() {
        return !this.isInvertible();
      },
      transform: function(t, i, a) {
        return arguments.length < 3 ? this._transformPoint(y.read(arguments)) : this._transformCoordinates(t, i, a);
      },
      _transformPoint: function(t, i, a) {
        var f = t.x, d = t.y;
        return i || (i = new y()), i._set(
          f * this._a + d * this._c + this._tx,
          f * this._b + d * this._d + this._ty,
          a
        );
      },
      _transformCoordinates: function(t, i, a) {
        for (var f = 0, d = 2 * a; f < d; f += 2) {
          var v = t[f], m = t[f + 1];
          i[f] = v * this._a + m * this._c + this._tx, i[f + 1] = v * this._b + m * this._d + this._ty;
        }
        return i;
      },
      _transformCorners: function(t) {
        var i = t.x, a = t.y, f = i + t.width, d = a + t.height, v = [i, a, f, a, f, d, i, d];
        return this._transformCoordinates(v, v, 4);
      },
      _transformBounds: function(t, i, a) {
        for (var f = this._transformCorners(t), d = f.slice(0, 2), v = d.slice(), m = 2; m < 8; m++) {
          var p = f[m], w = m & 1;
          p < d[w] ? d[w] = p : p > v[w] && (v[w] = p);
        }
        return i || (i = new $()), i._set(
          d[0],
          d[1],
          v[0] - d[0],
          v[1] - d[1],
          a
        );
      },
      inverseTransform: function() {
        return this._inverseTransform(y.read(arguments));
      },
      _inverseTransform: function(t, i, a) {
        var f = this._a, d = this._b, v = this._c, m = this._d, p = this._tx, w = this._ty, T = f * m - d * v, E = null;
        if (T && !isNaN(T) && isFinite(p) && isFinite(w)) {
          var L = t.x - this._tx, I = t.y - this._ty;
          i || (i = new y()), E = i._set(
            (L * m - I * v) / T,
            (I * f - L * d) / T,
            a
          );
        }
        return E;
      },
      decompose: function() {
        var t = this._a, i = this._b, a = this._c, f = this._d, d = t * f - i * a, v = Math.sqrt, m = Math.atan2, p = 180 / Math.PI, w, T, E;
        if (t !== 0 || i !== 0) {
          var L = v(t * t + i * i);
          w = Math.acos(t / L) * (i > 0 ? 1 : -1), T = [L, d / L], E = [m(t * a + i * f, L * L), 0];
        } else if (a !== 0 || f !== 0) {
          var I = v(a * a + f * f);
          w = Math.asin(a / I) * (f > 0 ? 1 : -1), T = [d / I, I], E = [0, m(t * a + i * f, I * I)];
        } else
          w = 0, E = T = [0, 0];
        return {
          translation: this.getTranslation(),
          rotation: w * p,
          scaling: new y(T),
          skewing: new y(E[0] * p, E[1] * p)
        };
      },
      getValues: function() {
        return [this._a, this._b, this._c, this._d, this._tx, this._ty];
      },
      getTranslation: function() {
        return new y(this._tx, this._ty);
      },
      getScaling: function() {
        return this.decompose().scaling;
      },
      getRotation: function() {
        return this.decompose().rotation;
      },
      applyToContext: function(t) {
        this.isIdentity() || t.transform(
          this._a,
          this._b,
          this._c,
          this._d,
          this._tx,
          this._ty
        );
      }
    }, h.each(["a", "b", "c", "d", "tx", "ty"], function(t) {
      var i = h.capitalize(t), a = "_" + t;
      this["get" + i] = function() {
        return this[a];
      }, this["set" + i] = function(f) {
        this[a] = f, this._changed();
      };
    }, {})), ot = h.extend({
      _class: "Line",
      initialize: function(i, a, f, d, v) {
        var m = !1;
        arguments.length >= 4 ? (this._px = i, this._py = a, this._vx = f, this._vy = d, m = v) : (this._px = i.x, this._py = i.y, this._vx = a.x, this._vy = a.y, m = f), m || (this._vx -= this._px, this._vy -= this._py);
      },
      getPoint: function() {
        return new y(this._px, this._py);
      },
      getVector: function() {
        return new y(this._vx, this._vy);
      },
      getLength: function() {
        return this.getVector().getLength();
      },
      intersect: function(t, i) {
        return ot.intersect(
          this._px,
          this._py,
          this._vx,
          this._vy,
          t._px,
          t._py,
          t._vx,
          t._vy,
          !0,
          i
        );
      },
      getSide: function(t, i) {
        return ot.getSide(
          this._px,
          this._py,
          this._vx,
          this._vy,
          t.x,
          t.y,
          !0,
          i
        );
      },
      getDistance: function(t) {
        return Math.abs(this.getSignedDistance(t));
      },
      getSignedDistance: function(t) {
        return ot.getSignedDistance(
          this._px,
          this._py,
          this._vx,
          this._vy,
          t.x,
          t.y,
          !0
        );
      },
      isCollinear: function(t) {
        return y.isCollinear(this._vx, this._vy, t._vx, t._vy);
      },
      isOrthogonal: function(t) {
        return y.isOrthogonal(this._vx, this._vy, t._vx, t._vy);
      },
      statics: {
        intersect: function(t, i, a, f, d, v, m, p, w, T) {
          w || (a -= t, f -= i, m -= d, p -= v);
          var E = a * p - f * m;
          if (!A.isMachineZero(E)) {
            var L = t - d, I = i - v, O = (m * I - p * L) / E, B = (a * I - f * L) / E, q = 1e-12, Y = -q, z = 1 + q;
            if (T || Y < O && O < z && Y < B && B < z)
              return T || (O = O <= 0 ? 0 : O >= 1 ? 1 : O), new y(
                t + O * a,
                i + O * f
              );
          }
        },
        getSide: function(t, i, a, f, d, v, m, p) {
          m || (a -= t, f -= i);
          var w = d - t, T = v - i, E = w * f - T * a;
          return !p && A.isMachineZero(E) && (E = (w * a + w * a) / (a * a + f * f), E >= 0 && E <= 1 && (E = 0)), E < 0 ? -1 : E > 0 ? 1 : 0;
        },
        getSignedDistance: function(t, i, a, f, d, v, m) {
          return m || (a -= t, f -= i), a === 0 ? f > 0 ? d - t : t - d : f === 0 ? a < 0 ? v - i : i - v : ((d - t) * f - (v - i) * a) / (f > a ? f * Math.sqrt(1 + a * a / (f * f)) : a * Math.sqrt(1 + f * f / (a * a)));
        },
        getDistance: function(t, i, a, f, d, v, m) {
          return Math.abs(
            ot.getSignedDistance(t, i, a, f, d, v, m)
          );
        }
      }
    }), lt = b.extend({
      _class: "Project",
      _list: "projects",
      _reference: "project",
      _compactSerialize: !0,
      initialize: function(i) {
        b.call(this, !0), this._children = [], this._namedChildren = {}, this._activeLayer = null, this._currentStyle = new Ct(null, null, this), this._view = zt.create(
          this,
          i || Be.getCanvas(1, 1)
        ), this._selectionItems = {}, this._selectionCount = 0, this._updateVersion = 0;
      },
      _serialize: function(t, i) {
        return h.serialize(this._children, t, !0, i);
      },
      _changed: function(t, i) {
        if (t & 1) {
          var a = this._view;
          a && (a._needsUpdate = !0, !a._requested && a._autoUpdate && a.requestUpdate());
        }
        var f = this._changes;
        if (f && i) {
          var d = this._changesById, v = i._id, m = d[v];
          m ? m.flags |= t : f.push(d[v] = { item: i, flags: t });
        }
      },
      clear: function() {
        for (var t = this._children, i = t.length - 1; i >= 0; i--)
          t[i].remove();
      },
      isEmpty: function() {
        return !this._children.length;
      },
      remove: function t() {
        return t.base.call(this) ? (this._view && this._view.remove(), !0) : !1;
      },
      getView: function() {
        return this._view;
      },
      getCurrentStyle: function() {
        return this._currentStyle;
      },
      setCurrentStyle: function(t) {
        this._currentStyle.set(t);
      },
      getIndex: function() {
        return this._index;
      },
      getOptions: function() {
        return this._scope.settings;
      },
      getLayers: function() {
        return this._children;
      },
      getActiveLayer: function() {
        return this._activeLayer || new _t({ project: this, insert: !0 });
      },
      getSymbolDefinitions: function() {
        var t = [], i = {};
        return this.getItems({
          class: Mt,
          match: function(a) {
            var f = a._definition, d = f._id;
            return i[d] || (i[d] = !0, t.push(f)), !1;
          }
        }), t;
      },
      getSymbols: "getSymbolDefinitions",
      getSelectedItems: function() {
        var t = this._selectionItems, i = [];
        for (var a in t) {
          var f = t[a], d = f._selection;
          d & 1 && f.isInserted() ? i.push(f) : d || this._updateSelection(f);
        }
        return i;
      },
      _updateSelection: function(t) {
        var i = t._id, a = this._selectionItems;
        t._selection ? a[i] !== t && (this._selectionCount++, a[i] = t) : a[i] === t && (this._selectionCount--, delete a[i]);
      },
      selectAll: function() {
        for (var t = this._children, i = 0, a = t.length; i < a; i++)
          t[i].setFullySelected(!0);
      },
      deselectAll: function() {
        var t = this._selectionItems;
        for (var i in t)
          t[i].setFullySelected(!1);
      },
      addLayer: function(t) {
        return this.insertLayer(r, t);
      },
      insertLayer: function(t, i) {
        if (i instanceof _t) {
          i._remove(!1, !0), h.splice(this._children, [i], t, 0), i._setProject(this, !0);
          var a = i._name;
          a && i.setName(a), this._changes && i._changed(5), this._activeLayer || (this._activeLayer = i);
        } else
          i = null;
        return i;
      },
      _insertItem: function(t, i, a) {
        return i = this.insertLayer(t, i) || (this._activeLayer || this._insertItem(
          r,
          new _t(ct.NO_INSERT),
          !0
        )).insertChild(t, i), a && i.activate && i.activate(), i;
      },
      getItems: function(t) {
        return ct._getItems(this, t);
      },
      getItem: function(t) {
        return ct._getItems(this, t, null, null, !0)[0] || null;
      },
      importJSON: function(t) {
        this.activate();
        var i = this._activeLayer;
        return h.importJSON(t, i && i.isEmpty() && i);
      },
      removeOn: function(t) {
        var i = this._removeSets;
        if (i) {
          t === "mouseup" && (i.mousedrag = null);
          var a = i[t];
          if (a) {
            for (var f in a) {
              var d = a[f];
              for (var v in i) {
                var m = i[v];
                m && m != a && delete m[d._id];
              }
              d.remove();
            }
            i[t] = null;
          }
        }
      },
      draw: function(t, i, a) {
        this._updateVersion++, t.save(), i.applyToContext(t);
        for (var f = this._children, d = new h({
          offset: new y(0, 0),
          pixelRatio: a,
          viewMatrix: i.isIdentity() ? null : i,
          matrices: [new K()],
          updateMatrix: !0
        }), v = 0, m = f.length; v < m; v++)
          f[v].draw(t, d);
        if (t.restore(), this._selectionCount > 0) {
          t.save(), t.strokeWidth = 1;
          var p = this._selectionItems, w = this._scope.settings.handleSize, T = this._updateVersion;
          for (var E in p)
            p[E]._drawSelection(t, i, w, p, T);
          t.restore();
        }
      }
    }), ct = h.extend(
      c,
      {
        statics: {
          extend: function t(i) {
            return i._serializeFields && (i._serializeFields = h.set(
              {},
              this.prototype._serializeFields,
              i._serializeFields
            )), t.base.apply(this, arguments);
          },
          INSERT: { insert: !0 },
          NO_INSERT: { insert: !1 }
        },
        _class: "Item",
        _name: null,
        _applyMatrix: !0,
        _canApplyMatrix: !0,
        _canScaleStroke: !1,
        _pivot: null,
        _visible: !0,
        _blendMode: "normal",
        _opacity: 1,
        _locked: !1,
        _guide: !1,
        _clipMask: !1,
        _selection: 0,
        _selectBounds: !0,
        _selectChildren: !1,
        _serializeFields: {
          name: null,
          applyMatrix: null,
          matrix: new K(),
          pivot: null,
          visible: !0,
          blendMode: "normal",
          opacity: 1,
          locked: !1,
          guide: !1,
          clipMask: !1,
          selected: !1,
          data: {}
        },
        _prioritize: ["applyMatrix"]
      },
      new function() {
        var t = [
          "onMouseDown",
          "onMouseUp",
          "onMouseDrag",
          "onClick",
          "onDoubleClick",
          "onMouseMove",
          "onMouseEnter",
          "onMouseLeave"
        ];
        return h.each(
          t,
          function(i) {
            this._events[i] = {
              install: function(a) {
                this.getView()._countItemEvent(a, 1);
              },
              uninstall: function(a) {
                this.getView()._countItemEvent(a, -1);
              }
            };
          },
          {
            _events: {
              onFrame: {
                install: function() {
                  this.getView()._animateItem(this, !0);
                },
                uninstall: function() {
                  this.getView()._animateItem(this, !1);
                }
              },
              onLoad: {},
              onError: {}
            },
            statics: {
              _itemHandlers: t
            }
          }
        );
      }(),
      {
        initialize: function() {
        },
        _initialize: function(t, i) {
          var a = t && h.isPlainObject(t), f = a && t.internal === !0, d = this._matrix = new K(), v = a && t.project || ce.project, m = ce.settings;
          return this._id = f ? null : k.get(), this._parent = this._index = null, this._applyMatrix = this._canApplyMatrix && m.applyMatrix, i && d.translate(i), d._owner = this, this._style = new Ct(v._currentStyle, this, v), f || a && t.insert == !1 || !m.insertItems && !(a && t.insert == !0) ? this._setProject(v) : (a && t.parent || v)._insertItem(r, this, !0), a && t !== ct.NO_INSERT && t !== ct.INSERT && this.set(t, {
            internal: !0,
            insert: !0,
            project: !0,
            parent: !0
          }), a;
        },
        _serialize: function(t, i) {
          var a = {}, f = this;
          function d(v) {
            for (var m in v) {
              var p = f[m];
              h.equals(p, m === "leading" ? v.fontSize * 1.2 : v[m]) || (a[m] = h.serialize(
                p,
                t,
                m !== "data",
                i
              ));
            }
          }
          return d(this._serializeFields), this instanceof ht || d(this._style._defaults), [this._class, a];
        },
        _changed: function(t) {
          var i = this._symbol, a = this._parent || i, f = this._project;
          t & 8 && (this._bounds = this._position = this._decomposed = r), t & 16 && (this._globalMatrix = r), a && t & 72 && ct._clearBoundsCache(a), t & 2 && ct._clearBoundsCache(this), f && f._changed(t, this), i && i._changed(t);
        },
        getId: function() {
          return this._id;
        },
        getName: function() {
          return this._name;
        },
        setName: function(t) {
          if (this._name && this._removeNamed(), t === +t + "")
            throw new Error(
              "Names consisting only of numbers are not supported."
            );
          var i = this._getOwner();
          if (t && i) {
            var a = i._children, f = i._namedChildren;
            (f[t] = f[t] || []).push(this), t in a || (a[t] = this);
          }
          this._name = t || r, this._changed(256);
        },
        getStyle: function() {
          return this._style;
        },
        setStyle: function(t) {
          this.getStyle().set(t);
        }
      },
      h.each(
        ["locked", "visible", "blendMode", "opacity", "guide"],
        function(t) {
          var i = h.capitalize(t), a = "_" + t, f = {
            locked: 256,
            visible: 265
          };
          this["get" + i] = function() {
            return this[a];
          }, this["set" + i] = function(d) {
            d != this[a] && (this[a] = d, this._changed(f[t] || 257));
          };
        },
        {}
      ),
      {
        beans: !0,
        getSelection: function() {
          return this._selection;
        },
        setSelection: function(t) {
          if (t !== this._selection) {
            this._selection = t;
            var i = this._project;
            i && (i._updateSelection(this), this._changed(257));
          }
        },
        _changeSelection: function(t, i) {
          var a = this._selection;
          this.setSelection(i ? a | t : a & ~t);
        },
        isSelected: function() {
          if (this._selectChildren) {
            for (var t = this._children, i = 0, a = t.length; i < a; i++)
              if (t[i].isSelected())
                return !0;
          }
          return !!(this._selection & 1);
        },
        setSelected: function(t) {
          if (this._selectChildren)
            for (var i = this._children, a = 0, f = i.length; a < f; a++)
              i[a].setSelected(t);
          this._changeSelection(1, t);
        },
        isFullySelected: function() {
          var t = this._children, i = !!(this._selection & 1);
          if (t && i) {
            for (var a = 0, f = t.length; a < f; a++)
              if (!t[a].isFullySelected())
                return !1;
            return !0;
          }
          return i;
        },
        setFullySelected: function(t) {
          var i = this._children;
          if (i)
            for (var a = 0, f = i.length; a < f; a++)
              i[a].setFullySelected(t);
          this._changeSelection(1, t);
        },
        isClipMask: function() {
          return this._clipMask;
        },
        setClipMask: function(t) {
          this._clipMask != (t = !!t) && (this._clipMask = t, t && (this.setFillColor(null), this.setStrokeColor(null)), this._changed(257), this._parent && this._parent._changed(2048));
        },
        getData: function() {
          return this._data || (this._data = {}), this._data;
        },
        setData: function(t) {
          this._data = t;
        },
        getPosition: function(t) {
          var i = t ? y : D, a = this._position || (this._position = this._getPositionFromBounds());
          return new i(a.x, a.y, this, "setPosition");
        },
        setPosition: function() {
          this.translate(y.read(arguments).subtract(this.getPosition(!0)));
        },
        _getPositionFromBounds: function(t) {
          return this._pivot ? this._matrix._transformPoint(this._pivot) : (t || this.getBounds()).getCenter(!0);
        },
        getPivot: function() {
          var t = this._pivot;
          return t ? new D(t.x, t.y, this, "setPivot") : null;
        },
        setPivot: function() {
          this._pivot = y.read(arguments, 0, { clone: !0, readNull: !0 }), this._position = r;
        }
      },
      h.each(
        {
          getStrokeBounds: { stroke: !0 },
          getHandleBounds: { handle: !0 },
          getInternalBounds: { internal: !0 }
        },
        function(t, i) {
          this[i] = function(a) {
            return this.getBounds(a, t);
          };
        },
        {
          beans: !0,
          getBounds: function(t, i) {
            var a = i || t instanceof K, f = h.set(
              {},
              a ? i : t,
              this._boundsOptions
            );
            (!f.stroke || this.getStrokeScaling()) && (f.cacheItem = this);
            var d = this._getCachedBounds(a && t, f).rect;
            return arguments.length ? d : new Z(
              d.x,
              d.y,
              d.width,
              d.height,
              this,
              "setBounds"
            );
          },
          setBounds: function() {
            var t = $.read(arguments), i = this.getBounds(), a = this._matrix, f = new K(), d = t.getCenter();
            f.translate(d), (t.width != i.width || t.height != i.height) && (a.isInvertible() || (a.set(a._backup || new K().translate(a.getTranslation())), i = this.getBounds()), f.scale(
              i.width !== 0 ? t.width / i.width : 0,
              i.height !== 0 ? t.height / i.height : 0
            )), d = i.getCenter(), f.translate(-d.x, -d.y), this.transform(f);
          },
          _getBounds: function(t, i) {
            var a = this._children;
            return !a || !a.length ? new $() : (ct._updateBoundsCache(this, i.cacheItem), ct._getBounds(a, t, i));
          },
          _getBoundsCacheKey: function(t, i) {
            return [
              t.stroke ? 1 : 0,
              t.handle ? 1 : 0,
              i ? 1 : 0
            ].join("");
          },
          _getCachedBounds: function(t, i, a) {
            t = t && t._orNullIfIdentity();
            var f = i.internal && !a, d = i.cacheItem, v = f ? null : this._matrix._orNullIfIdentity(), m = d && (!t || t.equals(v)) && this._getBoundsCacheKey(i, f), p = this._bounds;
            if (ct._updateBoundsCache(this._parent || this._symbol, d), m && p && m in p) {
              var w = p[m];
              return {
                rect: w.rect.clone(),
                nonscaling: w.nonscaling
              };
            }
            var T = this._getBounds(t || v, i), E = T.rect || T, L = this._style, I = T.nonscaling || L.hasStroke() && !L.getStrokeScaling();
            if (m) {
              p || (this._bounds = p = {});
              var w = p[m] = {
                rect: E.clone(),
                nonscaling: I,
                internal: f
              };
            }
            return {
              rect: E,
              nonscaling: I
            };
          },
          _getStrokeMatrix: function(t, i) {
            var a = this.getStrokeScaling() ? null : i && i.internal ? this : this._parent || this._symbol && this._symbol._item, f = a ? a.getViewMatrix().invert() : t;
            return f && f._shiftless();
          },
          statics: {
            _updateBoundsCache: function(t, i) {
              if (t && i) {
                var a = i._id, f = t._boundsCache = t._boundsCache || {
                  ids: {},
                  list: []
                };
                f.ids[a] || (f.list.push(i), f.ids[a] = i);
              }
            },
            _clearBoundsCache: function(t) {
              var i = t._boundsCache;
              if (i) {
                t._bounds = t._position = t._boundsCache = r;
                for (var a = 0, f = i.list, d = f.length; a < d; a++) {
                  var v = f[a];
                  v !== t && (v._bounds = v._position = r, v._boundsCache && ct._clearBoundsCache(v));
                }
              }
            },
            _getBounds: function(t, i, a) {
              var f = 1 / 0, d = -f, v = f, m = d, p = !1;
              a = a || {};
              for (var w = 0, T = t.length; w < T; w++) {
                var E = t[w];
                if (E._visible && !E.isEmpty(!0)) {
                  var L = E._getCachedBounds(
                    i && i.appended(E._matrix),
                    a,
                    !0
                  ), I = L.rect;
                  f = Math.min(I.x, f), v = Math.min(I.y, v), d = Math.max(I.x + I.width, d), m = Math.max(I.y + I.height, m), L.nonscaling && (p = !0);
                }
              }
              return {
                rect: isFinite(f) ? new $(f, v, d - f, m - v) : new $(),
                nonscaling: p
              };
            }
          }
        }
      ),
      {
        beans: !0,
        _decompose: function() {
          return this._applyMatrix ? null : this._decomposed || (this._decomposed = this._matrix.decompose());
        },
        getRotation: function() {
          var t = this._decompose();
          return t ? t.rotation : 0;
        },
        setRotation: function(t) {
          var i = this.getRotation();
          if (i != null && t != null) {
            var a = this._decomposed;
            this.rotate(t - i), a && (a.rotation = t, this._decomposed = a);
          }
        },
        getScaling: function() {
          var t = this._decompose(), i = t && t.scaling;
          return new D(i ? i.x : 1, i ? i.y : 1, this, "setScaling");
        },
        setScaling: function() {
          var t = this.getScaling(), i = y.read(arguments, 0, { clone: !0, readNull: !0 });
          if (t && i && !t.equals(i)) {
            var a = this.getRotation(), f = this._decomposed, d = new K(), v = A.isZero;
            if (v(t.x) || v(t.y))
              d.translate(f.translation), a && d.rotate(a), d.scale(i.x, i.y), this._matrix.set(d);
            else {
              var m = this.getPosition(!0);
              d.translate(m), a && d.rotate(a), d.scale(i.x / t.x, i.y / t.y), a && d.rotate(-a), d.translate(m.negate()), this.transform(d);
            }
            f && (f.scaling = i, this._decomposed = f);
          }
        },
        getMatrix: function() {
          return this._matrix;
        },
        setMatrix: function() {
          var t = this._matrix;
          t.set.apply(t, arguments);
        },
        getGlobalMatrix: function(t) {
          var i = this._globalMatrix;
          if (i)
            for (var a = this._parent, f = []; a; ) {
              if (!a._globalMatrix) {
                i = null;
                for (var d = 0, v = f.length; d < v; d++)
                  f[d]._globalMatrix = null;
                break;
              }
              f.push(a), a = a._parent;
            }
          if (!i) {
            i = this._globalMatrix = this._matrix.clone();
            var a = this._parent;
            a && i.prepend(a.getGlobalMatrix(!0));
          }
          return t ? i : i.clone();
        },
        getViewMatrix: function() {
          return this.getGlobalMatrix().prepend(this.getView()._matrix);
        },
        getApplyMatrix: function() {
          return this._applyMatrix;
        },
        setApplyMatrix: function(t) {
          (this._applyMatrix = this._canApplyMatrix && !!t) && this.transform(null, !0);
        },
        getTransformContent: "#getApplyMatrix",
        setTransformContent: "#setApplyMatrix"
      },
      {
        getProject: function() {
          return this._project;
        },
        _setProject: function(t, i) {
          if (this._project !== t) {
            this._project && this._installEvents(!1), this._project = t;
            for (var a = this._children, f = 0, d = a && a.length; f < d; f++)
              a[f]._setProject(t);
            i = !0;
          }
          i && this._installEvents(!0);
        },
        getView: function() {
          return this._project._view;
        },
        _installEvents: function t(i) {
          t.base.call(this, i);
          for (var a = this._children, f = 0, d = a && a.length; f < d; f++)
            a[f]._installEvents(i);
        },
        getLayer: function() {
          for (var t = this; t = t._parent; )
            if (t instanceof _t)
              return t;
          return null;
        },
        getParent: function() {
          return this._parent;
        },
        setParent: function(t) {
          return t.addChild(this);
        },
        _getOwner: "#getParent",
        getChildren: function() {
          return this._children;
        },
        setChildren: function(t) {
          this.removeChildren(), this.addChildren(t);
        },
        getFirstChild: function() {
          return this._children && this._children[0] || null;
        },
        getLastChild: function() {
          return this._children && this._children[this._children.length - 1] || null;
        },
        getNextSibling: function() {
          var t = this._getOwner();
          return t && t._children[this._index + 1] || null;
        },
        getPreviousSibling: function() {
          var t = this._getOwner();
          return t && t._children[this._index - 1] || null;
        },
        getIndex: function() {
          return this._index;
        },
        setIndex: function(t) {
          var i = this._parent, a = i && i._children;
          a && i.insertChildren(
            t in a ? t : r,
            [this]
          );
        },
        equals: function(t) {
          return t === this || t && this._class === t._class && this._style.equals(t._style) && this._matrix.equals(t._matrix) && this._locked === t._locked && this._visible === t._visible && this._blendMode === t._blendMode && this._opacity === t._opacity && this._clipMask === t._clipMask && this._guide === t._guide && this._equals(t) || !1;
        },
        _equals: function(t) {
          return h.equals(this._children, t._children);
        },
        clone: function(t) {
          var i = new this.constructor(ct.NO_INSERT), a = this._children, f = h.pick(
            t ? t.insert : r,
            t === r || t === !0
          ), d = h.pick(t ? t.deep : r, !0);
          a && i.copyAttributes(this), (!a || d) && i.copyContent(this), a || i.copyAttributes(this), f && i.insertAbove(this);
          var v = this._name, m = this._parent;
          if (v && m) {
            for (var a = m._children, p = v, w = 1; a[v]; )
              v = p + " " + w++;
            v !== p && i.setName(v);
          }
          return i;
        },
        copyContent: function(t) {
          for (var i = t._children, a = 0, f = i && i.length; a < f; a++)
            this.addChild(i[a].clone(!1), !0);
        },
        copyAttributes: function(t, i) {
          this.setStyle(t._style);
          for (var a = [
            "_locked",
            "_visible",
            "_blendMode",
            "_opacity",
            "_clipMask",
            "_guide"
          ], f = 0, d = a.length; f < d; f++) {
            var v = a[f];
            t.hasOwnProperty(v) && (this[v] = t[v]);
          }
          i || this._matrix.set(t._matrix, !0), this.setApplyMatrix(t._applyMatrix), this.setPivot(t._pivot), this.setSelection(t._selection);
          var m = t._data, p = t._name;
          this._data = m ? h.clone(m) : null, p && this.setName(p);
        },
        rasterize: function(t, i) {
          var a, f, d;
          h.isPlainObject(t) ? (a = t.resolution, f = t.insert, d = t.raster) : (a = t, f = i), d || (d = new Pt(ct.NO_INSERT));
          var v = this.getStrokeBounds(), m = (a || this.getView().getResolution()) / 72, p = v.getTopLeft().floor(), w = v.getBottomRight().ceil(), T = new C(w.subtract(p)), E = T.multiply(m);
          if (d.setSize(E, !0), !E.isZero()) {
            var L = d.getContext(!0), I = new K().scale(m).translate(p.negate());
            L.save(), I.applyToContext(L), this.draw(L, new h({ matrices: [I] })), L.restore();
          }
          return d._matrix.set(
            new K().translate(p.add(T.divide(2))).scale(1 / m)
          ), (f === r || f) && d.insertAbove(this), d;
        },
        contains: function() {
          var t = this._matrix;
          return t.isInvertible() && !!this._contains(t._inverseTransform(y.read(arguments)));
        },
        _contains: function(t) {
          var i = this._children;
          if (i) {
            for (var a = i.length - 1; a >= 0; a--)
              if (i[a].contains(t))
                return !0;
            return !1;
          }
          return t.isInside(this.getInternalBounds());
        },
        isInside: function() {
          return $.read(arguments).contains(this.getBounds());
        },
        _asPathItem: function() {
          return new Bt.Rectangle({
            rectangle: this.getInternalBounds(),
            matrix: this._matrix,
            insert: !1
          });
        },
        intersects: function(t, i) {
          return t instanceof ct ? this._asPathItem().getIntersections(
            t._asPathItem(),
            null,
            i,
            !0
          ).length > 0 : !1;
        }
      },
      new function() {
        function t() {
          var f = arguments;
          return this._hitTest(
            y.read(f),
            kt.getOptions(f)
          );
        }
        function i() {
          var f = arguments, d = y.read(f), v = kt.getOptions(f), m = [];
          return this._hitTest(d, new h({ all: m }, v)), m;
        }
        function a(f, d, v, m) {
          var p = this._children;
          if (p)
            for (var w = p.length - 1; w >= 0; w--) {
              var T = p[w], E = T !== m && T._hitTest(
                f,
                d,
                v
              );
              if (E && !d.all)
                return E;
            }
          return null;
        }
        return lt.inject({
          hitTest: t,
          hitTestAll: i,
          _hitTest: a
        }), {
          hitTest: t,
          hitTestAll: i,
          _hitTestChildren: a
        };
      }(),
      {
        _hitTest: function(t, i, a) {
          if (this._locked || !this._visible || this._guide && !i.guides || this.isEmpty())
            return null;
          var f = this._matrix, d = a ? a.appended(f) : this.getGlobalMatrix().prepend(this.getView()._matrix), v = Math.max(i.tolerance, 1e-12), m = i._tolerancePadding = new C(
            Bt._getStrokePadding(
              v,
              f._shiftless().invert()
            )
          );
          if (t = f._inverseTransform(t), !t || !this._children && !this.getBounds({ internal: !0, stroke: !0, handle: !0 }).expand(m.multiply(2))._containsPoint(t))
            return null;
          var p = !(i.guides && !this._guide || i.selected && !this.isSelected() || i.type && i.type !== h.hyphenate(this._class) || i.class && !(this instanceof i.class)), w = i.match, T = this, E, L;
          function I(M) {
            return M && w && !w(M) && (M = null), M && i.all && i.all.push(M), M;
          }
          function O(M, R) {
            var V = R ? E["get" + R]() : T.getPosition();
            if (t.subtract(V).divide(m).length <= 1)
              return new kt(M, T, {
                name: R ? h.hyphenate(R) : M,
                point: V
              });
          }
          var B = i.position, q = i.center, Y = i.bounds;
          if (p && this._parent && (B || q || Y)) {
            if ((q || Y) && (E = this.getInternalBounds()), L = B && O("position") || q && O("center", "Center"), !L && Y)
              for (var z = [
                "TopLeft",
                "TopRight",
                "BottomLeft",
                "BottomRight",
                "LeftCenter",
                "TopCenter",
                "RightCenter",
                "BottomCenter"
              ], N = 0; N < 8 && !L; N++)
                L = O("bounds", z[N]);
            L = I(L);
          }
          return L || (L = this._hitTestChildren(t, i, d) || p && I(this._hitTestSelf(
            t,
            i,
            d,
            this.getStrokeScaling() ? null : d._shiftless().invert()
          )) || null), L && L.point && (L.point = f.transform(L.point)), L;
        },
        _hitTestSelf: function(t, i) {
          if (i.fill && this.hasFill() && this._contains(t))
            return new kt("fill", this);
        },
        matches: function(t, i) {
          function a(m, p) {
            for (var w in m)
              if (m.hasOwnProperty(w)) {
                var T = m[w], E = p[w];
                if (h.isPlainObject(T) && h.isPlainObject(E)) {
                  if (!a(T, E))
                    return !1;
                } else if (!h.equals(T, E))
                  return !1;
              }
            return !0;
          }
          var f = typeof t;
          if (f === "object") {
            for (var d in t)
              if (t.hasOwnProperty(d) && !this.matches(d, t[d]))
                return !1;
            return !0;
          } else {
            if (f === "function")
              return t(this);
            if (t === "match")
              return i(this);
            var v = /^(empty|editable)$/.test(t) ? this["is" + h.capitalize(t)]() : t === "type" ? h.hyphenate(this._class) : this[t];
            if (t === "class") {
              if (typeof i == "function")
                return this instanceof i;
              v = this._class;
            }
            if (typeof i == "function")
              return !!i(v);
            if (i) {
              if (i.test)
                return i.test(v);
              if (h.isPlainObject(i))
                return a(i, v);
            }
            return h.equals(v, i);
          }
        },
        getItems: function(t) {
          return ct._getItems(this, t, this._matrix);
        },
        getItem: function(t) {
          return ct._getItems(this, t, this._matrix, null, !0)[0] || null;
        },
        statics: {
          _getItems: function t(i, a, f, d, v) {
            if (!d) {
              var m = typeof a == "object" && a, p = m && m.overlapping, w = m && m.inside, T = p || w, I = T && $.read([T]);
              d = {
                items: [],
                recursive: m && m.recursive !== !1,
                inside: !!w,
                overlapping: !!p,
                rect: I,
                path: p && new Bt.Rectangle({
                  rectangle: I,
                  insert: !1
                })
              }, m && (a = h.filter({}, a, {
                recursive: !0,
                inside: !0,
                overlapping: !0
              }));
            }
            var E = i._children, L = d.items, I = d.rect;
            f = I && (f || new K());
            for (var O = 0, B = E && E.length; O < B; O++) {
              var q = E[O], Y = f && f.appended(q._matrix), z = !0;
              if (I) {
                var T = q.getBounds(Y);
                if (!I.intersects(T))
                  continue;
                I.contains(T) || d.overlapping && (T.contains(I) || d.path.intersects(q, Y)) || (z = !1);
              }
              if (z && q.matches(a) && (L.push(q), v) || (d.recursive !== !1 && t(q, a, Y, d, v), v && L.length > 0))
                break;
            }
            return L;
          }
        }
      },
      {
        importJSON: function(t) {
          var i = h.importJSON(t, this);
          return i !== this ? this.addChild(i) : i;
        },
        addChild: function(t) {
          return this.insertChild(r, t);
        },
        insertChild: function(t, i) {
          var a = i ? this.insertChildren(t, [i]) : null;
          return a && a[0];
        },
        addChildren: function(t) {
          return this.insertChildren(this._children.length, t);
        },
        insertChildren: function(t, i) {
          var a = this._children;
          if (a && i && i.length > 0) {
            i = h.slice(i);
            for (var f = {}, d = i.length - 1; d >= 0; d--) {
              var v = i[d], m = v && v._id;
              !v || f[m] ? i.splice(d, 1) : (v._remove(!1, !0), f[m] = !0);
            }
            h.splice(a, i, t, 0);
            for (var p = this._project, w = p._changes, d = 0, T = i.length; d < T; d++) {
              var v = i[d], E = v._name;
              v._parent = this, v._setProject(p, !0), E && v.setName(E), w && v._changed(5);
            }
            this._changed(11);
          } else
            i = null;
          return i;
        },
        _insertItem: "#insertChild",
        _insertAt: function(t, i) {
          var a = t && t._getOwner(), f = t !== this && a ? this : null;
          return f && (f._remove(!1, !0), a._insertItem(t._index + i, f)), f;
        },
        insertAbove: function(t) {
          return this._insertAt(t, 1);
        },
        insertBelow: function(t) {
          return this._insertAt(t, 0);
        },
        sendToBack: function() {
          var t = this._getOwner();
          return t ? t._insertItem(0, this) : null;
        },
        bringToFront: function() {
          var t = this._getOwner();
          return t ? t._insertItem(r, this) : null;
        },
        appendTop: "#addChild",
        appendBottom: function(t) {
          return this.insertChild(0, t);
        },
        moveAbove: "#insertAbove",
        moveBelow: "#insertBelow",
        addTo: function(t) {
          return t._insertItem(r, this);
        },
        copyTo: function(t) {
          return this.clone(!1).addTo(t);
        },
        reduce: function(t) {
          var i = this._children;
          if (i && i.length === 1) {
            var a = i[0].reduce(t);
            return this._parent ? (a.insertAbove(this), this.remove()) : a.remove(), a;
          }
          return this;
        },
        _removeNamed: function() {
          var t = this._getOwner();
          if (t) {
            var i = t._children, a = t._namedChildren, f = this._name, d = a[f], v = d ? d.indexOf(this) : -1;
            v !== -1 && (i[f] == this && delete i[f], d.splice(v, 1), d.length ? i[f] = d[0] : delete a[f]);
          }
        },
        _remove: function(t, i) {
          var a = this._getOwner(), f = this._project, d = this._index;
          return this._style && this._style._dispose(), a ? (this._name && this._removeNamed(), d != null && (f._activeLayer === this && (f._activeLayer = this.getNextSibling() || this.getPreviousSibling()), h.splice(a._children, null, d, 1)), this._installEvents(!1), t && f._changes && this._changed(5), i && a._changed(11, this), this._parent = null, !0) : !1;
        },
        remove: function() {
          return this._remove(!0, !0);
        },
        replaceWith: function(t) {
          var i = t && t.insertBelow(this);
          return i && this.remove(), i;
        },
        removeChildren: function(t, i) {
          if (!this._children)
            return null;
          t = t || 0, i = h.pick(i, this._children.length);
          for (var a = h.splice(this._children, null, t, i - t), f = a.length - 1; f >= 0; f--)
            a[f]._remove(!0, !1);
          return a.length > 0 && this._changed(11), a;
        },
        clear: "#removeChildren",
        reverseChildren: function() {
          if (this._children) {
            this._children.reverse();
            for (var t = 0, i = this._children.length; t < i; t++)
              this._children[t]._index = t;
            this._changed(11);
          }
        },
        isEmpty: function(t) {
          var i = this._children, a = i ? i.length : 0;
          if (t) {
            for (var f = 0; f < a; f++)
              if (!i[f].isEmpty(t))
                return !1;
            return !0;
          }
          return !a;
        },
        isEditable: function() {
          for (var t = this; t; ) {
            if (!t._visible || t._locked)
              return !1;
            t = t._parent;
          }
          return !0;
        },
        hasFill: function() {
          return this.getStyle().hasFill();
        },
        hasStroke: function() {
          return this.getStyle().hasStroke();
        },
        hasShadow: function() {
          return this.getStyle().hasShadow();
        },
        _getOrder: function(t) {
          function i(m) {
            var p = [];
            do
              p.unshift(m);
            while (m = m._parent);
            return p;
          }
          for (var a = i(this), f = i(t), d = 0, v = Math.min(a.length, f.length); d < v; d++)
            if (a[d] != f[d])
              return a[d]._index < f[d]._index ? 1 : -1;
          return 0;
        },
        hasChildren: function() {
          return this._children && this._children.length > 0;
        },
        isInserted: function() {
          return this._parent ? this._parent.isInserted() : !1;
        },
        isAbove: function(t) {
          return this._getOrder(t) === -1;
        },
        isBelow: function(t) {
          return this._getOrder(t) === 1;
        },
        isParent: function(t) {
          return this._parent === t;
        },
        isChild: function(t) {
          return t && t._parent === this;
        },
        isDescendant: function(t) {
          for (var i = this; i = i._parent; )
            if (i === t)
              return !0;
          return !1;
        },
        isAncestor: function(t) {
          return t ? t.isDescendant(this) : !1;
        },
        isSibling: function(t) {
          return this._parent === t._parent;
        },
        isGroupedWith: function(t) {
          for (var i = this._parent; i; ) {
            if (i._parent && /^(Group|Layer|CompoundPath)$/.test(i._class) && t.isDescendant(i))
              return !0;
            i = i._parent;
          }
          return !1;
        }
      },
      h.each(["rotate", "scale", "shear", "skew"], function(t) {
        var i = t === "rotate";
        this[t] = function() {
          var a = arguments, f = (i ? h : y).read(a), d = y.read(a, 0, { readNull: !0 });
          return this.transform(new K()[t](
            f,
            d || this.getPosition(!0)
          ));
        };
      }, {
        translate: function() {
          var t = new K();
          return this.transform(t.translate.apply(t, arguments));
        },
        transform: function(t, i, a) {
          var f = this._matrix, d = t && !t.isIdentity(), v = a && this._canApplyMatrix || this._applyMatrix && (d || !f.isIdentity() || i && this._children);
          if (!d && !v)
            return this;
          if (d) {
            !t.isInvertible() && f.isInvertible() && (f._backup = f.getValues()), f.prepend(t, !0);
            var m = this._style, p = m.getFillColor(!0), w = m.getStrokeColor(!0);
            p && p.transform(t), w && w.transform(t);
          }
          if (v && (v = this._transformContent(
            f,
            i,
            a
          ))) {
            var T = this._pivot;
            T && f._transformPoint(T, T, !0), f.reset(!0), a && this._canApplyMatrix && (this._applyMatrix = !0);
          }
          var E = this._bounds, L = this._position;
          (d || v) && this._changed(25);
          var I = d && E && t.decompose();
          if (I && I.skewing.isZero() && I.rotation % 90 === 0) {
            for (var O in E) {
              var B = E[O];
              if (B.nonscaling)
                delete E[O];
              else if (v || !B.internal) {
                var q = B.rect;
                t._transformBounds(q, q);
              }
            }
            this._bounds = E;
            var Y = E[this._getBoundsCacheKey(
              this._boundsOptions || {}
            )];
            Y && (this._position = this._getPositionFromBounds(Y.rect));
          } else
            d && L && this._pivot && (this._position = t._transformPoint(L, L));
          return this;
        },
        _transformContent: function(t, i, a) {
          var f = this._children;
          if (f) {
            for (var d = 0, v = f.length; d < v; d++)
              f[d].transform(t, i, a);
            return !0;
          }
        },
        globalToLocal: function() {
          return this.getGlobalMatrix(!0)._inverseTransform(
            y.read(arguments)
          );
        },
        localToGlobal: function() {
          return this.getGlobalMatrix(!0)._transformPoint(
            y.read(arguments)
          );
        },
        parentToLocal: function() {
          return this._matrix._inverseTransform(y.read(arguments));
        },
        localToParent: function() {
          return this._matrix._transformPoint(y.read(arguments));
        },
        fitBounds: function(t, i) {
          t = $.read(arguments);
          var a = this.getBounds(), f = a.height / a.width, d = t.height / t.width, v = (i ? f > d : f < d) ? t.width / a.width : t.height / a.height, m = new $(
            new y(),
            new C(a.width * v, a.height * v)
          );
          m.setCenter(t.getCenter()), this.setBounds(m);
        }
      }),
      {
        _setStyles: function(t, i, a) {
          var f = this._style, d = this._matrix;
          if (f.hasFill() && (t.fillStyle = f.getFillColor().toCanvasStyle(t, d)), f.hasStroke()) {
            t.strokeStyle = f.getStrokeColor().toCanvasStyle(t, d), t.lineWidth = f.getStrokeWidth();
            var v = f.getStrokeJoin(), m = f.getStrokeCap(), p = f.getMiterLimit();
            if (v && (t.lineJoin = v), m && (t.lineCap = m), p && (t.miterLimit = p), ce.support.nativeDash) {
              var w = f.getDashArray(), T = f.getDashOffset();
              w && w.length && ("setLineDash" in t ? (t.setLineDash(w), t.lineDashOffset = T) : (t.mozDash = w, t.mozDashOffset = T));
            }
          }
          if (f.hasShadow()) {
            var E = i.pixelRatio || 1, L = a._shiftless().prepend(
              new K().scale(E, E)
            ), I = L.transform(new y(f.getShadowBlur(), 0)), O = L.transform(this.getShadowOffset());
            t.shadowColor = f.getShadowColor().toCanvasStyle(t), t.shadowBlur = I.getLength(), t.shadowOffsetX = O.x, t.shadowOffsetY = O.y;
          }
        },
        draw: function(t, i, a) {
          if (this._updateVersion = this._project._updateVersion, !(!this._visible || this._opacity === 0)) {
            var f = i.matrices, d = i.viewMatrix, v = this._matrix, m = f[f.length - 1].appended(v);
            if (m.isInvertible()) {
              d = d ? d.appended(m) : m, f.push(m), i.updateMatrix && (this._globalMatrix = m);
              var p = this._blendMode, w = A.clamp(this._opacity, 0, 1), T = p === "normal", E = _n.nativeModes[p], L = T && w === 1 || i.dontStart || i.clip || (E || T && w < 1) && this._canComposite(), I = i.pixelRatio || 1, O, B, q;
              if (!L) {
                var Y = this.getStrokeBounds(d);
                if (!Y.width || !Y.height) {
                  f.pop();
                  return;
                }
                q = i.offset, B = i.offset = Y.getTopLeft().floor(), O = t, t = Be.getContext(Y.getSize().ceil().add(1).multiply(I)), I !== 1 && t.scale(I, I);
              }
              t.save();
              var z = a ? a.appended(v) : this._canScaleStroke && !this.getStrokeScaling(!0) && d, N = !L && i.clipItem, M = !z || N;
              if (L ? (t.globalAlpha = w, E && (t.globalCompositeOperation = p)) : M && t.translate(-B.x, -B.y), M && (L ? v : d).applyToContext(t), N && i.clipItem.draw(t, i.extend({ clip: !0 })), z) {
                t.setTransform(I, 0, 0, I, 0, 0);
                var R = i.offset;
                R && t.translate(-R.x, -R.y);
              }
              this._draw(t, i, d, z), t.restore(), f.pop(), i.clip && !i.dontFinish && t.clip(this.getFillRule()), L || (_n.process(
                p,
                t,
                O,
                w,
                B.subtract(q).multiply(I)
              ), Be.release(t), i.offset = q);
            }
          }
        },
        _isUpdated: function(t) {
          var i = this._parent;
          if (i instanceof ae)
            return i._isUpdated(t);
          var a = this._updateVersion === t;
          return !a && i && i._visible && i._isUpdated(t) && (this._updateVersion = t, a = !0), a;
        },
        _drawSelection: function(t, i, a, f, d) {
          var v = this._selection, m = v & 1, p = v & 2 || m && this._selectBounds, w = v & 4;
          if (this._drawSelected || (m = !1), (m || p || w) && this._isUpdated(d)) {
            var T, E = this.getSelectedColor(!0) || (T = this.getLayer()) && T.getSelectedColor(!0), L = i.appended(this.getGlobalMatrix(!0)), I = a / 2;
            if (t.strokeStyle = t.fillStyle = E ? E.toCanvasStyle(t) : "#009dec", m && this._drawSelected(t, L, f), w) {
              var O = this.getPosition(!0), B = this._parent, q = B ? B.localToGlobal(O) : O, Y = q.x, z = q.y;
              t.beginPath(), t.arc(Y, z, I, 0, Math.PI * 2, !0), t.stroke();
              for (var N = [[0, -1], [1, 0], [0, 1], [-1, 0]], M = I, R = a + 1, V = 0; V < 4; V++) {
                var W = N[V], G = W[0], J = W[1];
                t.moveTo(Y + G * M, z + J * M), t.lineTo(Y + G * R, z + J * R), t.stroke();
              }
            }
            if (p) {
              var j = L._transformCorners(this.getInternalBounds());
              t.beginPath();
              for (var V = 0; V < 8; V++)
                t[V ? "lineTo" : "moveTo"](j[V], j[++V]);
              t.closePath(), t.stroke();
              for (var V = 0; V < 8; V++)
                t.fillRect(
                  j[V] - I,
                  j[++V] - I,
                  a,
                  a
                );
            }
          }
        },
        _canComposite: function() {
          return !1;
        }
      },
      h.each(["down", "drag", "up", "move"], function(t) {
        this["removeOn" + h.capitalize(t)] = function() {
          var i = {};
          return i[t] = !0, this.removeOn(i);
        };
      }, {
        removeOn: function(t) {
          for (var i in t)
            if (t[i]) {
              var a = "mouse" + i, f = this._project, d = f._removeSets = f._removeSets || {};
              d[a] = d[a] || {}, d[a][this._id] = this;
            }
          return this;
        }
      }),
      {
        tween: function(t, i, a) {
          a || (a = i, i = t, t = null, a || (a = i, i = null));
          var f = a && a.easing, d = a && a.start, v = a != null && (typeof a == "number" ? a : a.duration), m = new Fn(this, t, i, v, f, d);
          function p(w) {
            m._handleFrame(w.time * 1e3), m.running || this.off("frame", p);
          }
          return v && this.on("frame", p), m;
        },
        tweenTo: function(t, i) {
          return this.tween(null, t, i);
        },
        tweenFrom: function(t, i) {
          return this.tween(t, null, i);
        }
      }
    ), ht = ct.extend({
      _class: "Group",
      _selectBounds: !1,
      _selectChildren: !0,
      _serializeFields: {
        children: []
      },
      initialize: function(i) {
        this._children = [], this._namedChildren = {}, this._initialize(i) || this.addChildren(Array.isArray(i) ? i : arguments);
      },
      _changed: function t(i) {
        t.base.call(this, i), i & 2050 && (this._clipItem = r);
      },
      _getClipItem: function() {
        var t = this._clipItem;
        if (t === r) {
          t = null;
          for (var i = this._children, a = 0, f = i.length; a < f; a++)
            if (i[a]._clipMask) {
              t = i[a];
              break;
            }
          this._clipItem = t;
        }
        return t;
      },
      isClipped: function() {
        return !!this._getClipItem();
      },
      setClipped: function(t) {
        var i = this.getFirstChild();
        i && i.setClipMask(t);
      },
      _getBounds: function t(i, a) {
        var f = this._getClipItem();
        return f ? f._getCachedBounds(
          f._matrix.prepended(i),
          h.set({}, a, { stroke: !1 })
        ) : t.base.call(this, i, a);
      },
      _hitTestChildren: function t(i, a, f) {
        var d = this._getClipItem();
        return (!d || d.contains(i)) && t.base.call(
          this,
          i,
          a,
          f,
          d
        );
      },
      _draw: function(t, i) {
        var a = i.clip, f = !a && this._getClipItem();
        i = i.extend({ clipItem: f, clip: !1 }), a ? (t.beginPath(), i.dontStart = i.dontFinish = !0) : f && f.draw(t, i.extend({ clip: !0 }));
        for (var d = this._children, v = 0, m = d.length; v < m; v++) {
          var p = d[v];
          p !== f && p.draw(t, i);
        }
      }
    }), _t = ht.extend({
      _class: "Layer",
      initialize: function() {
        ht.apply(this, arguments);
      },
      _getOwner: function() {
        return this._parent || this._index != null && this._project;
      },
      isInserted: function t() {
        return this._parent ? t.base.call(this) : this._index != null;
      },
      activate: function() {
        this._project._activeLayer = this;
      },
      _hitTestSelf: function() {
      }
    }), at = ct.extend(
      {
        _class: "Shape",
        _applyMatrix: !1,
        _canApplyMatrix: !1,
        _canScaleStroke: !0,
        _serializeFields: {
          type: null,
          size: null,
          radius: null
        },
        initialize: function(i, a) {
          this._initialize(i, a);
        },
        _equals: function(t) {
          return this._type === t._type && this._size.equals(t._size) && h.equals(this._radius, t._radius);
        },
        copyContent: function(t) {
          this.setType(t._type), this.setSize(t._size), this.setRadius(t._radius);
        },
        getType: function() {
          return this._type;
        },
        setType: function(t) {
          this._type = t;
        },
        getShape: "#getType",
        setShape: "#setType",
        getSize: function() {
          var t = this._size;
          return new U(t.width, t.height, this, "setSize");
        },
        setSize: function() {
          var t = C.read(arguments);
          if (!this._size)
            this._size = t.clone();
          else if (!this._size.equals(t)) {
            var i = this._type, a = t.width, f = t.height;
            i === "rectangle" ? this._radius.set(C.min(this._radius, t.divide(2).abs())) : i === "circle" ? (a = f = (a + f) / 2, this._radius = a / 2) : i === "ellipse" && this._radius._set(a / 2, f / 2), this._size._set(a, f), this._changed(9);
          }
        },
        getRadius: function() {
          var t = this._radius;
          return this._type === "circle" ? t : new U(t.width, t.height, this, "setRadius");
        },
        setRadius: function(t) {
          var i = this._type;
          if (i === "circle") {
            if (t === this._radius)
              return;
            var a = t * 2;
            this._radius = t, this._size._set(a, a);
          } else if (t = C.read(arguments), !this._radius)
            this._radius = t.clone();
          else {
            if (this._radius.equals(t))
              return;
            if (this._radius.set(t), i === "rectangle") {
              var a = C.max(this._size, t.multiply(2));
              this._size.set(a);
            } else
              i === "ellipse" && this._size._set(t.width * 2, t.height * 2);
          }
          this._changed(9);
        },
        isEmpty: function() {
          return !1;
        },
        toPath: function(t) {
          var i = new Bt[h.capitalize(this._type)]({
            center: new y(),
            size: this._size,
            radius: this._radius,
            insert: !1
          });
          return i.copyAttributes(this), ce.settings.applyMatrix && i.setApplyMatrix(!0), (t === r || t) && i.insertAbove(this), i;
        },
        toShape: "#clone",
        _asPathItem: function() {
          return this.toPath(!1);
        },
        _draw: function(t, i, a, f) {
          var d = this._style, v = d.hasFill(), m = d.hasStroke(), p = i.dontFinish || i.clip, w = !f;
          if (v || m || p) {
            var T = this._type, E = this._radius, L = T === "circle";
            if (i.dontStart || t.beginPath(), w && L)
              t.arc(0, 0, E, 0, Math.PI * 2, !0);
            else {
              var I = L ? E : E.width, O = L ? E : E.height, B = this._size, q = B.width, Y = B.height;
              if (w && T === "rectangle" && I === 0 && O === 0)
                t.rect(-q / 2, -Y / 2, q, Y);
              else {
                var z = q / 2, N = Y / 2, M = 1 - 0.5522847498307936, R = I * M, V = O * M, W = [
                  -z,
                  -N + O,
                  -z,
                  -N + V,
                  -z + R,
                  -N,
                  -z + I,
                  -N,
                  z - I,
                  -N,
                  z - R,
                  -N,
                  z,
                  -N + V,
                  z,
                  -N + O,
                  z,
                  N - O,
                  z,
                  N - V,
                  z - R,
                  N,
                  z - I,
                  N,
                  -z + I,
                  N,
                  -z + R,
                  N,
                  -z,
                  N - V,
                  -z,
                  N - O
                ];
                f && f.transform(W, W, 32), t.moveTo(W[0], W[1]), t.bezierCurveTo(W[2], W[3], W[4], W[5], W[6], W[7]), z !== I && t.lineTo(W[8], W[9]), t.bezierCurveTo(W[10], W[11], W[12], W[13], W[14], W[15]), N !== O && t.lineTo(W[16], W[17]), t.bezierCurveTo(W[18], W[19], W[20], W[21], W[22], W[23]), z !== I && t.lineTo(W[24], W[25]), t.bezierCurveTo(W[26], W[27], W[28], W[29], W[30], W[31]);
              }
            }
            t.closePath();
          }
          !p && (v || m) && (this._setStyles(t, i, a), v && (t.fill(d.getFillRule()), t.shadowColor = "rgba(0,0,0,0)"), m && t.stroke());
        },
        _canComposite: function() {
          return !(this.hasFill() && this.hasStroke());
        },
        _getBounds: function(t, i) {
          var a = new $(this._size).setCenter(0, 0), f = this._style, d = i.stroke && f.hasStroke() && f.getStrokeWidth();
          return t && (a = t._transformBounds(a)), d ? a.expand(Bt._getStrokePadding(
            d,
            this._getStrokeMatrix(t, i)
          )) : a;
        }
      },
      new function() {
        function t(a, f, d) {
          var v = a._radius;
          if (!v.isZero())
            for (var m = a._size.divide(2), p = 1; p <= 4; p++) {
              var w = new y(p > 1 && p < 4 ? -1 : 1, p > 2 ? -1 : 1), T = w.multiply(m), E = T.subtract(w.multiply(v)), L = new $(
                d ? T.add(w.multiply(d)) : T,
                E
              );
              if (L.contains(f))
                return { point: E, quadrant: p };
            }
        }
        function i(a, f, d, v) {
          var m = a.divide(f);
          return (!v || m.isInQuadrant(v)) && m.subtract(m.normalize()).multiply(f).divide(d).length <= 1;
        }
        return {
          _contains: function a(f) {
            if (this._type === "rectangle") {
              var d = t(this, f);
              return d ? f.subtract(d.point).divide(this._radius).getLength() <= 1 : a.base.call(this, f);
            } else
              return f.divide(this.size).getLength() <= 0.5;
          },
          _hitTestSelf: function a(f, d, v, m) {
            var p = !1, w = this._style, T = d.stroke && w.hasStroke(), E = d.fill && w.hasFill();
            if (T || E) {
              var L = this._type, I = this._radius, O = T ? w.getStrokeWidth() / 2 : 0, B = d._tolerancePadding.add(
                Bt._getStrokePadding(
                  O,
                  !w.getStrokeScaling() && m
                )
              );
              if (L === "rectangle") {
                var q = B.multiply(2), Y = t(this, f, q);
                if (Y)
                  p = i(
                    f.subtract(Y.point),
                    I,
                    B,
                    Y.quadrant
                  );
                else {
                  var z = new $(this._size).setCenter(0, 0), N = z.expand(q), M = z.expand(q.negate());
                  p = N._containsPoint(f) && !M._containsPoint(f);
                }
              } else
                p = i(f, I, B);
            }
            return p ? new kt(T ? "stroke" : "fill", this) : a.base.apply(this, arguments);
          }
        };
      }(),
      {
        statics: new function() {
          function t(i, a, f, d, v) {
            var m = h.create(at.prototype);
            return m._type = i, m._size = f, m._radius = d, m._initialize(h.getNamed(v), a), m;
          }
          return {
            Circle: function() {
              var i = arguments, a = y.readNamed(i, "center"), f = h.readNamed(i, "radius");
              return t(
                "circle",
                a,
                new C(f * 2),
                f,
                i
              );
            },
            Rectangle: function() {
              var i = arguments, a = $.readNamed(i, "rectangle"), f = C.min(
                C.readNamed(i, "radius"),
                a.getSize(!0).divide(2)
              );
              return t(
                "rectangle",
                a.getCenter(!0),
                a.getSize(!0),
                f,
                i
              );
            },
            Ellipse: function() {
              var i = arguments, a = at._readEllipse(i), f = a.radius;
              return t(
                "ellipse",
                a.center,
                f.multiply(2),
                f,
                i
              );
            },
            _readEllipse: function(i) {
              var a, f;
              if (h.hasNamed(i, "radius"))
                a = y.readNamed(i, "center"), f = C.readNamed(i, "radius");
              else {
                var d = $.readNamed(i, "rectangle");
                a = d.getCenter(!0), f = d.getSize(!0).divide(2);
              }
              return { center: a, radius: f };
            }
          };
        }()
      }
    ), Pt = ct.extend({
      _class: "Raster",
      _applyMatrix: !1,
      _canApplyMatrix: !1,
      _boundsOptions: { stroke: !1, handle: !1 },
      _serializeFields: {
        crossOrigin: null,
        source: null
      },
      _prioritize: ["crossOrigin"],
      _smoothing: "low",
      beans: !0,
      initialize: function(i, a) {
        if (!this._initialize(
          i,
          a !== r && y.read(arguments)
        )) {
          var f, d = typeof i, v = d === "string" ? l.getElementById(i) : d === "object" ? i : null;
          if (v && v !== ct.NO_INSERT) {
            if (v.getContext || v.naturalHeight != null)
              f = v;
            else if (v) {
              var m = C.read(arguments);
              m.isZero() || (f = Be.getCanvas(m));
            }
          }
          f ? this.setImage(f) : this.setSource(i);
        }
        this._size || (this._size = new C(), this._loaded = !1);
      },
      _equals: function(t) {
        return this.getSource() === t.getSource();
      },
      copyContent: function(t) {
        var i = t._image, a = t._canvas;
        if (i)
          this._setImage(i);
        else if (a) {
          var f = Be.getCanvas(t._size);
          f.getContext("2d").drawImage(a, 0, 0), this._setImage(f);
        }
        this._crossOrigin = t._crossOrigin;
      },
      getSize: function() {
        var t = this._size;
        return new U(
          t ? t.width : 0,
          t ? t.height : 0,
          this,
          "setSize"
        );
      },
      setSize: function(t, i) {
        var a = C.read(arguments);
        if (a.equals(this._size))
          i && this.clear();
        else if (a.width > 0 && a.height > 0) {
          var f = !i && this.getElement();
          this._setImage(Be.getCanvas(a)), f && this.getContext(!0).drawImage(
            f,
            0,
            0,
            a.width,
            a.height
          );
        } else
          this._canvas && Be.release(this._canvas), this._size = a.clone();
      },
      getWidth: function() {
        return this._size ? this._size.width : 0;
      },
      setWidth: function(t) {
        this.setSize(t, this.getHeight());
      },
      getHeight: function() {
        return this._size ? this._size.height : 0;
      },
      setHeight: function(t) {
        this.setSize(this.getWidth(), t);
      },
      getLoaded: function() {
        return this._loaded;
      },
      isEmpty: function() {
        var t = this._size;
        return !t || t.width === 0 && t.height === 0;
      },
      getResolution: function() {
        var t = this._matrix, i = new y(0, 0).transform(t), a = new y(1, 0).transform(t).subtract(i), f = new y(0, 1).transform(t).subtract(i);
        return new C(
          72 / a.getLength(),
          72 / f.getLength()
        );
      },
      getPpi: "#getResolution",
      getImage: function() {
        return this._image;
      },
      setImage: function(t) {
        var i = this;
        function a(f) {
          var d = i.getView(), v = f && f.type || "load";
          d && i.responds(v) && (ce = d._scope, i.emit(v, new Se(f)));
        }
        this._setImage(t), this._loaded ? setTimeout(a, 0) : t && Lt.add(t, {
          load: function(f) {
            i._setImage(t), a(f);
          },
          error: a
        });
      },
      _setImage: function(t) {
        this._canvas && Be.release(this._canvas), t && t.getContext ? (this._image = null, this._canvas = t, this._loaded = !0) : (this._image = t, this._canvas = null, this._loaded = !!(t && t.src && t.complete)), this._size = new C(
          t ? t.naturalWidth || t.width : 0,
          t ? t.naturalHeight || t.height : 0
        ), this._context = null, this._changed(1033);
      },
      getCanvas: function() {
        if (!this._canvas) {
          var t = Be.getContext(this._size);
          try {
            this._image && t.drawImage(this._image, 0, 0), this._canvas = t.canvas;
          } catch {
            Be.release(t);
          }
        }
        return this._canvas;
      },
      setCanvas: "#setImage",
      getContext: function(t) {
        return this._context || (this._context = this.getCanvas().getContext("2d")), t && (this._image = null, this._changed(1025)), this._context;
      },
      setContext: function(t) {
        this._context = t;
      },
      getSource: function() {
        var t = this._image;
        return t && t.src || this.toDataURL();
      },
      setSource: function(t) {
        var i = new e.Image(), a = this._crossOrigin;
        a && (i.crossOrigin = a), t && (i.src = t), this.setImage(i);
      },
      getCrossOrigin: function() {
        var t = this._image;
        return t && t.crossOrigin || this._crossOrigin || "";
      },
      setCrossOrigin: function(t) {
        this._crossOrigin = t;
        var i = this._image;
        i && (i.crossOrigin = t);
      },
      getSmoothing: function() {
        return this._smoothing;
      },
      setSmoothing: function(t) {
        this._smoothing = typeof t == "string" ? t : t ? "low" : "off", this._changed(257);
      },
      getElement: function() {
        return this._canvas || this._loaded && this._image;
      }
    }, {
      beans: !1,
      getSubCanvas: function() {
        var t = $.read(arguments), i = Be.getContext(t.getSize());
        return i.drawImage(
          this.getCanvas(),
          t.x,
          t.y,
          t.width,
          t.height,
          0,
          0,
          t.width,
          t.height
        ), i.canvas;
      },
      getSubRaster: function() {
        var t = $.read(arguments), i = new Pt(ct.NO_INSERT);
        return i._setImage(this.getSubCanvas(t)), i.translate(t.getCenter().subtract(this.getSize().divide(2))), i._matrix.prepend(this._matrix), i.insertAbove(this), i;
      },
      toDataURL: function() {
        var t = this._image, i = t && t.src;
        if (/^data:/.test(i))
          return i;
        var a = this.getCanvas();
        return a ? a.toDataURL.apply(a, arguments) : null;
      },
      drawImage: function(t) {
        var i = y.read(arguments, 1);
        this.getContext(!0).drawImage(t, i.x, i.y);
      },
      getAverageColor: function(t) {
        var i, a;
        if (t ? t instanceof Yt ? (a = t, i = t.getBounds()) : typeof t == "object" && ("width" in t ? i = new $(t) : "x" in t && (i = new $(t.x - 0.5, t.y - 0.5, 1, 1))) : i = this.getBounds(), !i)
          return null;
        var f = 32, d = Math.min(i.width, f), v = Math.min(i.height, f), m = Pt._sampleContext;
        m ? m.clearRect(0, 0, f + 1, f + 1) : m = Pt._sampleContext = Be.getContext(
          new C(f)
        ), m.save();
        var p = new K().scale(d / i.width, v / i.height).translate(-i.x, -i.y);
        p.applyToContext(m), a && a.draw(m, new h({ clip: !0, matrices: [p] })), this._matrix.applyToContext(m);
        var w = this.getElement(), T = this._size;
        w && m.drawImage(w, -T.width / 2, -T.height / 2), m.restore();
        for (var E = m.getImageData(
          0.5,
          0.5,
          Math.ceil(d),
          Math.ceil(v)
        ).data, L = [0, 0, 0], I = 0, O = 0, B = E.length; O < B; O += 4) {
          var q = E[O + 3];
          I += q, q /= 255, L[0] += E[O] * q, L[1] += E[O + 1] * q, L[2] += E[O + 2] * q;
        }
        for (var O = 0; O < 3; O++)
          L[O] /= I;
        return I ? oe.read(L) : null;
      },
      getPixel: function() {
        var t = y.read(arguments), i = this.getContext().getImageData(t.x, t.y, 1, 1).data;
        return new oe(
          "rgb",
          [i[0] / 255, i[1] / 255, i[2] / 255],
          i[3] / 255
        );
      },
      setPixel: function() {
        var t = arguments, i = y.read(t), a = oe.read(t), f = a._convert("rgb"), d = a._alpha, v = this.getContext(!0), m = v.createImageData(1, 1), p = m.data;
        p[0] = f[0] * 255, p[1] = f[1] * 255, p[2] = f[2] * 255, p[3] = d != null ? d * 255 : 255, v.putImageData(m, i.x, i.y);
      },
      clear: function() {
        var t = this._size;
        this.getContext(!0).clearRect(0, 0, t.width + 1, t.height + 1);
      },
      createImageData: function() {
        var t = C.read(arguments);
        return this.getContext().createImageData(t.width, t.height);
      },
      getImageData: function() {
        var t = $.read(arguments);
        return t.isEmpty() && (t = new $(this._size)), this.getContext().getImageData(
          t.x,
          t.y,
          t.width,
          t.height
        );
      },
      putImageData: function(t) {
        var i = y.read(arguments, 1);
        this.getContext(!0).putImageData(t, i.x, i.y);
      },
      setImageData: function(t) {
        this.setSize(t), this.getContext(!0).putImageData(t, 0, 0);
      },
      _getBounds: function(t, i) {
        var a = new $(this._size).setCenter(0, 0);
        return t ? t._transformBounds(a) : a;
      },
      _hitTestSelf: function(t) {
        if (this._contains(t)) {
          var i = this;
          return new kt("pixel", i, {
            offset: t.add(i._size.divide(2)).round(),
            color: {
              get: function() {
                return i.getPixel(this.offset);
              }
            }
          });
        }
      },
      _draw: function(t, i, a) {
        var f = this.getElement();
        if (f && f.width > 0 && f.height > 0) {
          t.globalAlpha = A.clamp(this._opacity, 0, 1), this._setStyles(t, i, a);
          var d = this._smoothing, v = d === "off";
          wt.setPrefixed(
            t,
            v ? "imageSmoothingEnabled" : "imageSmoothingQuality",
            v ? !1 : d
          ), t.drawImage(
            f,
            -this._size.width / 2,
            -this._size.height / 2
          );
        }
      },
      _canComposite: function() {
        return !0;
      }
    }), Mt = ct.extend({
      _class: "SymbolItem",
      _applyMatrix: !1,
      _canApplyMatrix: !1,
      _boundsOptions: { stroke: !0 },
      _serializeFields: {
        symbol: null
      },
      initialize: function(i, a) {
        this._initialize(
          i,
          a !== r && y.read(arguments, 1)
        ) || this.setDefinition(i instanceof Et ? i : new Et(i));
      },
      _equals: function(t) {
        return this._definition === t._definition;
      },
      copyContent: function(t) {
        this.setDefinition(t._definition);
      },
      getDefinition: function() {
        return this._definition;
      },
      setDefinition: function(t) {
        this._definition = t, this._changed(9);
      },
      getSymbol: "#getDefinition",
      setSymbol: "#setDefinition",
      isEmpty: function() {
        return this._definition._item.isEmpty();
      },
      _getBounds: function(t, i) {
        var a = this._definition._item;
        return a._getCachedBounds(a._matrix.prepended(t), i);
      },
      _hitTestSelf: function(t, i, a) {
        var f = i.extend({ all: !1 }), d = this._definition._item._hitTest(t, f, a);
        return d && (d.item = this), d;
      },
      _draw: function(t, i) {
        this._definition._item.draw(t, i);
      }
    }), Et = h.extend({
      _class: "SymbolDefinition",
      initialize: function(i, a) {
        this._id = k.get(), this.project = ce.project, i && this.setItem(i, a);
      },
      _serialize: function(t, i) {
        return i.add(this, function() {
          return h.serialize(
            [this._class, this._item],
            t,
            !1,
            i
          );
        });
      },
      _changed: function(t) {
        t & 8 && ct._clearBoundsCache(this), t & 1 && this.project._changed(t);
      },
      getItem: function() {
        return this._item;
      },
      setItem: function(t, i) {
        t._symbol && (t = t.clone()), this._item && (this._item._symbol = null), this._item = t, t.remove(), t.setSelected(!1), i || t.setPosition(new y()), t._symbol = this, this._changed(9);
      },
      getDefinition: "#getItem",
      setDefinition: "#setItem",
      place: function(t) {
        return new Mt(this, t);
      },
      clone: function() {
        return new Et(this._item.clone(!1));
      },
      equals: function(t) {
        return t === this || t && this._item.equals(t._item) || !1;
      }
    }), kt = h.extend({
      _class: "HitResult",
      initialize: function(i, a, f) {
        this.type = i, this.item = a, f && this.inject(f);
      },
      statics: {
        getOptions: function(t) {
          var i = t && h.read(t);
          return new h({
            type: null,
            tolerance: ce.settings.hitTolerance,
            fill: !i,
            stroke: !i,
            segments: !i,
            handles: !1,
            ends: !1,
            position: !1,
            center: !1,
            bounds: !1,
            guides: !1,
            selected: !1
          }, i);
        }
      }
    }), bt = h.extend({
      _class: "Segment",
      beans: !0,
      _selection: 0,
      initialize: function(i, a, f, d, v, m) {
        var p = arguments.length, w, T, E, L;
        p > 0 && (i == null || typeof i == "object" ? p === 1 && i && "point" in i ? (w = i.point, T = i.handleIn, E = i.handleOut, L = i.selection) : (w = i, T = a, E = f, L = d) : (w = [i, a], T = f !== r ? [f, d] : null, E = v !== r ? [v, m] : null)), new Dt(w, this, "_point"), new Dt(T, this, "_handleIn"), new Dt(E, this, "_handleOut"), L && this.setSelection(L);
      },
      _serialize: function(t, i) {
        var a = this._point, f = this._selection, d = f || this.hasHandles() ? [a, this._handleIn, this._handleOut] : a;
        return f && d.push(f), h.serialize(d, t, !0, i);
      },
      _changed: function(t) {
        var i = this._path;
        if (i) {
          var a = i._curves, f = this._index, d;
          a && ((!t || t === this._point || t === this._handleIn) && (d = f > 0 ? a[f - 1] : i._closed ? a[a.length - 1] : null) && d._changed(), (!t || t === this._point || t === this._handleOut) && (d = a[f]) && d._changed()), i._changed(41);
        }
      },
      getPoint: function() {
        return this._point;
      },
      setPoint: function() {
        this._point.set(y.read(arguments));
      },
      getHandleIn: function() {
        return this._handleIn;
      },
      setHandleIn: function() {
        this._handleIn.set(y.read(arguments));
      },
      getHandleOut: function() {
        return this._handleOut;
      },
      setHandleOut: function() {
        this._handleOut.set(y.read(arguments));
      },
      hasHandles: function() {
        return !this._handleIn.isZero() || !this._handleOut.isZero();
      },
      isSmooth: function() {
        var t = this._handleIn, i = this._handleOut;
        return !t.isZero() && !i.isZero() && t.isCollinear(i);
      },
      clearHandles: function() {
        this._handleIn._set(0, 0), this._handleOut._set(0, 0);
      },
      getSelection: function() {
        return this._selection;
      },
      setSelection: function(t) {
        var i = this._selection, a = this._path;
        this._selection = t = t || 0, a && t !== i && (a._updateSelection(this, i, t), a._changed(257));
      },
      _changeSelection: function(t, i) {
        var a = this._selection;
        this.setSelection(i ? a | t : a & ~t);
      },
      isSelected: function() {
        return !!(this._selection & 7);
      },
      setSelected: function(t) {
        this._changeSelection(7, t);
      },
      getIndex: function() {
        return this._index !== r ? this._index : null;
      },
      getPath: function() {
        return this._path || null;
      },
      getCurve: function() {
        var t = this._path, i = this._index;
        return t ? (i > 0 && !t._closed && i === t._segments.length - 1 && i--, t.getCurves()[i] || null) : null;
      },
      getLocation: function() {
        var t = this.getCurve();
        return t ? new $t(t, this === t._segment1 ? 0 : 1) : null;
      },
      getNext: function() {
        var t = this._path && this._path._segments;
        return t && (t[this._index + 1] || this._path._closed && t[0]) || null;
      },
      smooth: function(t, i, a) {
        var f = t || {}, d = f.type, v = f.factor, m = this.getPrevious(), p = this.getNext(), w = (m || this)._point, T = this._point, E = (p || this)._point, L = w.getDistance(T), I = T.getDistance(E);
        if (!d || d === "catmull-rom") {
          var O = v === r ? 0.5 : v, B = Math.pow(L, O), q = B * B, Y = Math.pow(I, O), z = Y * Y;
          if (!i && m) {
            var N = 2 * z + 3 * Y * B + q, M = 3 * Y * (Y + B);
            this.setHandleIn(M !== 0 ? new y(
              (z * w._x + N * T._x - q * E._x) / M - T._x,
              (z * w._y + N * T._y - q * E._y) / M - T._y
            ) : new y());
          }
          if (!a && p) {
            var N = 2 * q + 3 * B * Y + z, M = 3 * B * (B + Y);
            this.setHandleOut(M !== 0 ? new y(
              (q * E._x + N * T._x - z * w._x) / M - T._x,
              (q * E._y + N * T._y - z * w._y) / M - T._y
            ) : new y());
          }
        } else if (d === "geometric") {
          if (m && p) {
            var R = w.subtract(E), V = v === r ? 0.4 : v, W = V * L / (L + I);
            i || this.setHandleIn(R.multiply(W)), a || this.setHandleOut(R.multiply(W - V));
          }
        } else
          throw new Error("Smoothing method '" + d + "' not supported.");
      },
      getPrevious: function() {
        var t = this._path && this._path._segments;
        return t && (t[this._index - 1] || this._path._closed && t[t.length - 1]) || null;
      },
      isFirst: function() {
        return !this._index;
      },
      isLast: function() {
        var t = this._path;
        return t && this._index === t._segments.length - 1 || !1;
      },
      reverse: function() {
        var t = this._handleIn, i = this._handleOut, a = t.clone();
        t.set(i), i.set(a);
      },
      reversed: function() {
        return new bt(this._point, this._handleOut, this._handleIn);
      },
      remove: function() {
        return this._path ? !!this._path.removeSegment(this._index) : !1;
      },
      clone: function() {
        return new bt(this._point, this._handleIn, this._handleOut);
      },
      equals: function(t) {
        return t === this || t && this._class === t._class && this._point.equals(t._point) && this._handleIn.equals(t._handleIn) && this._handleOut.equals(t._handleOut) || !1;
      },
      toString: function() {
        var t = ["point: " + this._point];
        return this._handleIn.isZero() || t.push("handleIn: " + this._handleIn), this._handleOut.isZero() || t.push("handleOut: " + this._handleOut), "{ " + t.join(", ") + " }";
      },
      transform: function(t) {
        this._transformCoordinates(t, new Array(6), !0), this._changed();
      },
      interpolate: function(t, i, a) {
        var f = 1 - a, d = a, v = t._point, m = i._point, p = t._handleIn, w = i._handleIn, T = i._handleOut, E = t._handleOut;
        this._point._set(
          f * v._x + d * m._x,
          f * v._y + d * m._y,
          !0
        ), this._handleIn._set(
          f * p._x + d * w._x,
          f * p._y + d * w._y,
          !0
        ), this._handleOut._set(
          f * E._x + d * T._x,
          f * E._y + d * T._y,
          !0
        ), this._changed();
      },
      _transformCoordinates: function(t, i, a) {
        var f = this._point, d = !a || !this._handleIn.isZero() ? this._handleIn : null, v = !a || !this._handleOut.isZero() ? this._handleOut : null, m = f._x, p = f._y, w = 2;
        return i[0] = m, i[1] = p, d && (i[w++] = d._x + m, i[w++] = d._y + p), v && (i[w++] = v._x + m, i[w++] = v._y + p), t && (t._transformCoordinates(i, i, w / 2), m = i[0], p = i[1], a ? (f._x = m, f._y = p, w = 2, d && (d._x = i[w++] - m, d._y = i[w++] - p), v && (v._x = i[w++] - m, v._y = i[w++] - p)) : (d || (i[w++] = m, i[w++] = p), v || (i[w++] = m, i[w++] = p))), i;
      }
    }), Dt = y.extend({
      initialize: function(i, a, f) {
        var d, v, m;
        if (!i)
          d = v = 0;
        else if ((d = i[0]) !== r)
          v = i[1];
        else {
          var p = i;
          (d = p.x) === r && (p = y.read(arguments), d = p.x), v = p.y, m = p.selected;
        }
        this._x = d, this._y = v, this._owner = a, a[f] = this, m && this.setSelected(!0);
      },
      _set: function(t, i) {
        return this._x = t, this._y = i, this._owner._changed(this), this;
      },
      getX: function() {
        return this._x;
      },
      setX: function(t) {
        this._x = t, this._owner._changed(this);
      },
      getY: function() {
        return this._y;
      },
      setY: function(t) {
        this._y = t, this._owner._changed(this);
      },
      isZero: function() {
        var t = A.isZero;
        return t(this._x) && t(this._y);
      },
      isSelected: function() {
        return !!(this._owner._selection & this._getSelection());
      },
      setSelected: function(t) {
        this._owner._changeSelection(this._getSelection(), t);
      },
      _getSelection: function() {
        var t = this._owner;
        return this === t._point ? 1 : this === t._handleIn ? 2 : this === t._handleOut ? 4 : 0;
      }
    }), vt = h.extend(
      {
        _class: "Curve",
        beans: !0,
        initialize: function(i, a, f, d, v, m, p, w) {
          var T = arguments.length, E, L, I, O, B, q;
          T === 3 ? (this._path = i, E = a, L = f) : T ? T === 1 ? "segment1" in i ? (E = new bt(i.segment1), L = new bt(i.segment2)) : "point1" in i ? (I = i.point1, B = i.handle1, q = i.handle2, O = i.point2) : Array.isArray(i) && (I = [i[0], i[1]], O = [i[6], i[7]], B = [i[2] - i[0], i[3] - i[1]], q = [i[4] - i[6], i[5] - i[7]]) : T === 2 ? (E = new bt(i), L = new bt(a)) : T === 4 ? (I = i, B = a, q = f, O = d) : T === 8 && (I = [i, a], O = [p, w], B = [f - i, d - a], q = [v - p, m - w]) : (E = new bt(), L = new bt()), this._segment1 = E || new bt(I, null, B), this._segment2 = L || new bt(O, q, null);
        },
        _serialize: function(t, i) {
          return h.serialize(
            this.hasHandles() ? [
              this.getPoint1(),
              this.getHandle1(),
              this.getHandle2(),
              this.getPoint2()
            ] : [this.getPoint1(), this.getPoint2()],
            t,
            !0,
            i
          );
        },
        _changed: function() {
          this._length = this._bounds = r;
        },
        clone: function() {
          return new vt(this._segment1, this._segment2);
        },
        toString: function() {
          var t = ["point1: " + this._segment1._point];
          return this._segment1._handleOut.isZero() || t.push("handle1: " + this._segment1._handleOut), this._segment2._handleIn.isZero() || t.push("handle2: " + this._segment2._handleIn), t.push("point2: " + this._segment2._point), "{ " + t.join(", ") + " }";
        },
        classify: function() {
          return vt.classify(this.getValues());
        },
        remove: function() {
          var t = !1;
          if (this._path) {
            var i = this._segment2, a = i._handleOut;
            t = i.remove(), t && this._segment1._handleOut.set(a);
          }
          return t;
        },
        getPoint1: function() {
          return this._segment1._point;
        },
        setPoint1: function() {
          this._segment1._point.set(y.read(arguments));
        },
        getPoint2: function() {
          return this._segment2._point;
        },
        setPoint2: function() {
          this._segment2._point.set(y.read(arguments));
        },
        getHandle1: function() {
          return this._segment1._handleOut;
        },
        setHandle1: function() {
          this._segment1._handleOut.set(y.read(arguments));
        },
        getHandle2: function() {
          return this._segment2._handleIn;
        },
        setHandle2: function() {
          this._segment2._handleIn.set(y.read(arguments));
        },
        getSegment1: function() {
          return this._segment1;
        },
        getSegment2: function() {
          return this._segment2;
        },
        getPath: function() {
          return this._path;
        },
        getIndex: function() {
          return this._segment1._index;
        },
        getNext: function() {
          var t = this._path && this._path._curves;
          return t && (t[this._segment1._index + 1] || this._path._closed && t[0]) || null;
        },
        getPrevious: function() {
          var t = this._path && this._path._curves;
          return t && (t[this._segment1._index - 1] || this._path._closed && t[t.length - 1]) || null;
        },
        isFirst: function() {
          return !this._segment1._index;
        },
        isLast: function() {
          var t = this._path;
          return t && this._segment1._index === t._curves.length - 1 || !1;
        },
        isSelected: function() {
          return this.getPoint1().isSelected() && this.getHandle1().isSelected() && this.getHandle2().isSelected() && this.getPoint2().isSelected();
        },
        setSelected: function(t) {
          this.getPoint1().setSelected(t), this.getHandle1().setSelected(t), this.getHandle2().setSelected(t), this.getPoint2().setSelected(t);
        },
        getValues: function(t) {
          return vt.getValues(this._segment1, this._segment2, t);
        },
        getPoints: function() {
          for (var t = this.getValues(), i = [], a = 0; a < 8; a += 2)
            i.push(new y(t[a], t[a + 1]));
          return i;
        }
      },
      {
        getLength: function() {
          return this._length == null && (this._length = vt.getLength(this.getValues(), 0, 1)), this._length;
        },
        getArea: function() {
          return vt.getArea(this.getValues());
        },
        getLine: function() {
          return new ot(this._segment1._point, this._segment2._point);
        },
        getPart: function(t, i) {
          return new vt(vt.getPart(this.getValues(), t, i));
        },
        getPartLength: function(t, i) {
          return vt.getLength(this.getValues(), t, i);
        },
        divideAt: function(t) {
          return this.divideAtTime(t && t.curve === this ? t.time : this.getTimeAt(t));
        },
        divideAtTime: function(t, i) {
          var a = 1e-8, f = 1 - a, d = null;
          if (t >= a && t <= f) {
            var v = vt.subdivide(this.getValues(), t), m = v[0], p = v[1], w = i || this.hasHandles(), T = this._segment1, E = this._segment2, L = this._path;
            w && (T._handleOut._set(m[2] - m[0], m[3] - m[1]), E._handleIn._set(p[4] - p[6], p[5] - p[7]));
            var I = m[6], O = m[7], B = new bt(
              new y(I, O),
              w && new y(m[4] - I, m[5] - O),
              w && new y(p[2] - I, p[3] - O)
            );
            L ? (L.insert(T._index + 1, B), d = this.getNext()) : (this._segment2 = B, this._changed(), d = new vt(B, E));
          }
          return d;
        },
        splitAt: function(t) {
          var i = this._path;
          return i ? i.splitAt(t) : null;
        },
        splitAtTime: function(t) {
          return this.splitAt(this.getLocationAtTime(t));
        },
        divide: function(t, i) {
          return this.divideAtTime(t === r ? 0.5 : i ? t : this.getTimeAt(t));
        },
        split: function(t, i) {
          return this.splitAtTime(t === r ? 0.5 : i ? t : this.getTimeAt(t));
        },
        reversed: function() {
          return new vt(this._segment2.reversed(), this._segment1.reversed());
        },
        clearHandles: function() {
          this._segment1._handleOut._set(0, 0), this._segment2._handleIn._set(0, 0);
        },
        statics: {
          getValues: function(t, i, a, f) {
            var d = t._point, v = t._handleOut, m = i._handleIn, p = i._point, w = d.x, T = d.y, E = p.x, L = p.y, I = f ? [w, T, w, T, E, L, E, L] : [
              w,
              T,
              w + v._x,
              T + v._y,
              E + m._x,
              L + m._y,
              E,
              L
            ];
            return a && a._transformCoordinates(I, I, 4), I;
          },
          subdivide: function(t, i) {
            var a = t[0], f = t[1], d = t[2], v = t[3], m = t[4], p = t[5], w = t[6], T = t[7];
            i === r && (i = 0.5);
            var E = 1 - i, L = E * a + i * d, I = E * f + i * v, O = E * d + i * m, B = E * v + i * p, q = E * m + i * w, Y = E * p + i * T, z = E * L + i * O, N = E * I + i * B, M = E * O + i * q, R = E * B + i * Y, V = E * z + i * M, W = E * N + i * R;
            return [
              [a, f, L, I, z, N, V, W],
              [V, W, M, R, q, Y, w, T]
            ];
          },
          getMonoCurves: function(t, i) {
            var a = [], f = i ? 0 : 1, d = t[f + 0], v = t[f + 2], m = t[f + 4], p = t[f + 6];
            if (d >= v == v >= m && v >= m == m >= p || vt.isStraight(t))
              a.push(t);
            else {
              var w = 3 * (v - m) - d + p, T = 2 * (d + m) - 4 * v, E = v - d, L = 1e-8, I = 1 - L, O = [], B = A.solveQuadratic(w, T, E, O, L, I);
              if (!B)
                a.push(t);
              else {
                O.sort();
                var q = O[0], Y = vt.subdivide(t, q);
                a.push(Y[0]), B > 1 && (q = (O[1] - q) / (1 - q), Y = vt.subdivide(Y[1], q), a.push(Y[0])), a.push(Y[1]);
              }
            }
            return a;
          },
          solveCubic: function(t, i, a, f, d, v) {
            var m = t[i], p = t[i + 2], w = t[i + 4], T = t[i + 6], E = 0;
            if (!(m < a && T < a && p < a && w < a || m > a && T > a && p > a && w > a)) {
              var L = 3 * (p - m), I = 3 * (w - p) - L, O = T - m - L - I;
              E = A.solveCubic(O, I, L, m - a, f, d, v);
            }
            return E;
          },
          getTimeOf: function(t, i) {
            var a = new y(t[0], t[1]), f = new y(t[6], t[7]), d = 1e-12, v = 1e-7, m = i.isClose(a, d) ? 0 : i.isClose(f, d) ? 1 : null;
            if (m === null)
              for (var p = [i.x, i.y], w = [], T = 0; T < 2; T++)
                for (var E = vt.solveCubic(t, T, p[T], w, 0, 1), L = 0; L < E; L++) {
                  var I = w[L];
                  if (i.isClose(vt.getPoint(t, I), v))
                    return I;
                }
            return i.isClose(a, v) ? 0 : i.isClose(f, v) ? 1 : null;
          },
          getNearestTime: function(t, i) {
            if (vt.isStraight(t)) {
              var a = t[0], f = t[1], d = t[6], v = t[7], m = d - a, p = v - f, w = m * m + p * p;
              if (w === 0)
                return 0;
              var T = ((i.x - a) * m + (i.y - f) * p) / w;
              return T < 1e-12 ? 0 : T > 0.999999999999 ? 1 : vt.getTimeOf(
                t,
                new y(a + T * m, f + T * p)
              );
            }
            var E = 100, L = 1 / 0, I = 0;
            function O(Y) {
              if (Y >= 0 && Y <= 1) {
                var z = i.getDistance(vt.getPoint(t, Y), !0);
                if (z < L)
                  return L = z, I = Y, !0;
              }
            }
            for (var B = 0; B <= E; B++)
              O(B / E);
            for (var q = 1 / (E * 2); q > 1e-8; )
              !O(I - q) && !O(I + q) && (q /= 2);
            return I;
          },
          getPart: function(t, i, a) {
            var f = i > a;
            if (f) {
              var d = i;
              i = a, a = d;
            }
            return i > 0 && (t = vt.subdivide(t, i)[1]), a < 1 && (t = vt.subdivide(t, (a - i) / (1 - i))[0]), f ? [t[6], t[7], t[4], t[5], t[2], t[3], t[0], t[1]] : t;
          },
          isFlatEnough: function(t, i) {
            var a = t[0], f = t[1], d = t[2], v = t[3], m = t[4], p = t[5], w = t[6], T = t[7], E = 3 * d - 2 * a - w, L = 3 * v - 2 * f - T, I = 3 * m - 2 * w - a, O = 3 * p - 2 * T - f;
            return Math.max(E * E, I * I) + Math.max(L * L, O * O) <= 16 * i * i;
          },
          getArea: function(t) {
            var i = t[0], a = t[1], f = t[2], d = t[3], v = t[4], m = t[5], p = t[6], w = t[7];
            return 3 * ((w - a) * (f + v) - (p - i) * (d + m) + d * (i - v) - f * (a - m) + w * (v + i / 3) - p * (m + a / 3)) / 20;
          },
          getBounds: function(t) {
            for (var i = t.slice(0, 2), a = i.slice(), f = [0, 0], d = 0; d < 2; d++)
              vt._addBounds(
                t[d],
                t[d + 2],
                t[d + 4],
                t[d + 6],
                d,
                0,
                i,
                a,
                f
              );
            return new $(i[0], i[1], a[0] - i[0], a[1] - i[1]);
          },
          _addBounds: function(t, i, a, f, d, v, m, p, w) {
            function T(V, W) {
              var G = V - W, J = V + W;
              G < m[d] && (m[d] = G), J > p[d] && (p[d] = J);
            }
            v /= 2;
            var E = m[d] + v, L = p[d] - v;
            if (t < E || i < E || a < E || f < E || t > L || i > L || a > L || f > L)
              if (i < t != i < f && a < t != a < f)
                T(t, 0), T(f, 0);
              else {
                var I = 3 * (i - a) - t + f, O = 2 * (t + a) - 4 * i, B = i - t, q = A.solveQuadratic(I, O, B, w), Y = 1e-8, z = 1 - Y;
                T(f, 0);
                for (var N = 0; N < q; N++) {
                  var M = w[N], R = 1 - M;
                  Y <= M && M <= z && T(
                    R * R * R * t + 3 * R * R * M * i + 3 * R * M * M * a + M * M * M * f,
                    v
                  );
                }
              }
          }
        }
      },
      h.each(
        ["getBounds", "getStrokeBounds", "getHandleBounds"],
        function(t) {
          this[t] = function() {
            this._bounds || (this._bounds = {});
            var i = this._bounds[t];
            return i || (i = this._bounds[t] = Bt[t](
              [this._segment1, this._segment2],
              !1,
              this._path
            )), i.clone();
          };
        },
        {}
      ),
      h.each({
        isStraight: function(t, i, a, f) {
          if (i.isZero() && a.isZero())
            return !0;
          var d = f.subtract(t);
          if (d.isZero())
            return !1;
          if (d.isCollinear(i) && d.isCollinear(a)) {
            var v = new ot(t, f), m = 1e-7;
            if (v.getDistance(t.add(i)) < m && v.getDistance(f.add(a)) < m) {
              var p = d.dot(d), w = d.dot(i) / p, T = d.dot(a) / p;
              return w >= 0 && w <= 1 && T <= 0 && T >= -1;
            }
          }
          return !1;
        },
        isLinear: function(t, i, a, f) {
          var d = f.subtract(t).divide(3);
          return i.equals(d) && a.negate().equals(d);
        }
      }, function(t, i) {
        this[i] = function(a) {
          var f = this._segment1, d = this._segment2;
          return t(
            f._point,
            f._handleOut,
            d._handleIn,
            d._point,
            a
          );
        }, this.statics[i] = function(a, f) {
          var d = a[0], v = a[1], m = a[6], p = a[7];
          return t(
            new y(d, v),
            new y(a[2] - d, a[3] - v),
            new y(a[4] - m, a[5] - p),
            new y(m, p),
            f
          );
        };
      }, {
        statics: {},
        hasHandles: function() {
          return !this._segment1._handleOut.isZero() || !this._segment2._handleIn.isZero();
        },
        hasLength: function(t) {
          return (!this.getPoint1().equals(this.getPoint2()) || this.hasHandles()) && this.getLength() > (t || 0);
        },
        isCollinear: function(t) {
          return t && this.isStraight() && t.isStraight() && this.getLine().isCollinear(t.getLine());
        },
        isHorizontal: function() {
          return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).y) < 1e-8;
        },
        isVertical: function() {
          return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).x) < 1e-8;
        }
      }),
      {
        beans: !1,
        getLocationAt: function(t, i) {
          return this.getLocationAtTime(
            i ? t : this.getTimeAt(t)
          );
        },
        getLocationAtTime: function(t) {
          return t != null && t >= 0 && t <= 1 ? new $t(this, t) : null;
        },
        getTimeAt: function(t, i) {
          return vt.getTimeAt(this.getValues(), t, i);
        },
        getParameterAt: "#getTimeAt",
        getTimesWithTangent: function() {
          var t = y.read(arguments);
          return t.isZero() ? [] : vt.getTimesWithTangent(this.getValues(), t);
        },
        getOffsetAtTime: function(t) {
          return this.getPartLength(0, t);
        },
        getLocationOf: function() {
          return this.getLocationAtTime(this.getTimeOf(y.read(arguments)));
        },
        getOffsetOf: function() {
          var t = this.getLocationOf.apply(this, arguments);
          return t ? t.getOffset() : null;
        },
        getTimeOf: function() {
          return vt.getTimeOf(this.getValues(), y.read(arguments));
        },
        getParameterOf: "#getTimeOf",
        getNearestLocation: function() {
          var t = y.read(arguments), i = this.getValues(), a = vt.getNearestTime(i, t), f = vt.getPoint(i, a);
          return new $t(this, a, f, null, t.getDistance(f));
        },
        getNearestPoint: function() {
          var t = this.getNearestLocation.apply(this, arguments);
          return t && t.getPoint();
        }
      },
      new function() {
        var t = [
          "getPoint",
          "getTangent",
          "getNormal",
          "getWeightedTangent",
          "getWeightedNormal",
          "getCurvature"
        ];
        return h.each(
          t,
          function(i) {
            this[i + "At"] = function(a, f) {
              var d = this.getValues();
              return vt[i](d, f ? a : vt.getTimeAt(d, a));
            }, this[i + "AtTime"] = function(a) {
              return vt[i](this.getValues(), a);
            };
          },
          {
            statics: {
              _evaluateMethods: t
            }
          }
        );
      }(),
      new function() {
        function t(f) {
          var d = f[0], v = f[1], m = f[2], p = f[3], w = f[4], T = f[5], E = f[6], L = f[7], I = 9 * (m - w) + 3 * (E - d), O = 6 * (d + w) - 12 * m, B = 3 * (m - d), q = 9 * (p - T) + 3 * (L - v), Y = 6 * (v + T) - 12 * p, z = 3 * (p - v);
          return function(N) {
            var M = (I * N + O) * N + B, R = (q * N + Y) * N + z;
            return Math.sqrt(M * M + R * R);
          };
        }
        function i(f, d) {
          return Math.max(2, Math.min(16, Math.ceil(Math.abs(d - f) * 32)));
        }
        function a(f, d, v, m) {
          if (d == null || d < 0 || d > 1)
            return null;
          var p = f[0], w = f[1], T = f[2], E = f[3], L = f[4], I = f[5], O = f[6], B = f[7], q = A.isZero;
          q(T - p) && q(E - w) && (T = p, E = w), q(L - O) && q(I - B) && (L = O, I = B);
          var Y = 3 * (T - p), z = 3 * (L - T) - Y, N = O - p - Y - z, M = 3 * (E - w), R = 3 * (I - E) - M, V = B - w - M - R, W, G;
          if (v === 0)
            W = d === 0 ? p : d === 1 ? O : ((N * d + z) * d + Y) * d + p, G = d === 0 ? w : d === 1 ? B : ((V * d + R) * d + M) * d + w;
          else {
            var J = 1e-8, j = 1 - J;
            if (d < J ? (W = Y, G = M) : d > j ? (W = 3 * (O - L), G = 3 * (B - I)) : (W = (3 * N * d + 2 * z) * d + Y, G = (3 * V * d + 2 * R) * d + M), m) {
              W === 0 && G === 0 && (d < J || d > j) && (W = L - T, G = I - E);
              var tt = Math.sqrt(W * W + G * G);
              tt && (W /= tt, G /= tt);
            }
            if (v === 3) {
              var L = 6 * N * d + 2 * z, I = 6 * V * d + 2 * R, it = Math.pow(W * W + G * G, 3 / 2);
              W = it !== 0 ? (W * I - G * L) / it : 0, G = 0;
            }
          }
          return v === 2 ? new y(G, -W) : new y(W, G);
        }
        return { statics: {
          classify: function(f) {
            var d = f[0], v = f[1], m = f[2], p = f[3], w = f[4], T = f[5], E = f[6], L = f[7], I = d * (L - T) + v * (w - E) + E * T - L * w, O = m * (v - L) + p * (E - d) + d * L - v * E, B = w * (p - v) + T * (d - m) + m * v - p * d, q = 3 * B, Y = q - O, z = Y - O + I, N = Math.sqrt(z * z + Y * Y + q * q), M = N !== 0 ? 1 / N : 0, R = A.isZero, V = "serpentine";
            z *= M, Y *= M, q *= M;
            function W(tt, it, Q) {
              var nt = it !== r, st = nt && it > 0 && it < 1, dt = nt && Q > 0 && Q < 1;
              return nt && (!(st || dt) || tt === "loop" && !(st && dt)) && (tt = "arch", st = dt = !1), {
                type: tt,
                roots: st || dt ? st && dt ? it < Q ? [it, Q] : [Q, it] : [st ? it : Q] : null
              };
            }
            if (R(z))
              return R(Y) ? W(R(q) ? "line" : "quadratic") : W(V, q / (3 * Y));
            var G = 3 * Y * Y - 4 * z * q;
            if (R(G))
              return W("cusp", Y / (2 * z));
            var J = G > 0 ? Math.sqrt(G / 3) : Math.sqrt(-G), j = 2 * z;
            return W(
              G > 0 ? V : "loop",
              (Y + J) / j,
              (Y - J) / j
            );
          },
          getLength: function(f, d, v, m) {
            if (d === r && (d = 0), v === r && (v = 1), vt.isStraight(f)) {
              var p = f;
              v < 1 && (p = vt.subdivide(p, v)[0], d /= v), d > 0 && (p = vt.subdivide(p, d)[1]);
              var w = p[6] - p[0], T = p[7] - p[1];
              return Math.sqrt(w * w + T * T);
            }
            return A.integrate(
              m || t(f),
              d,
              v,
              i(d, v)
            );
          },
          getTimeAt: function(f, d, v) {
            if (v === r && (v = d < 0 ? 1 : 0), d === 0)
              return v;
            var m = Math.abs, p = 1e-12, w = d > 0, T = w ? v : 0, E = w ? 1 : v, L = t(f), I = vt.getLength(f, T, E, L), O = m(d) - I;
            if (m(O) < p)
              return w ? E : T;
            if (O > p)
              return null;
            var B = d / I, q = 0;
            function Y(z) {
              return q += A.integrate(
                L,
                v,
                z,
                i(v, z)
              ), v = z, q - d;
            }
            return A.findRoot(
              Y,
              L,
              v + B,
              T,
              E,
              32,
              1e-12
            );
          },
          getPoint: function(f, d) {
            return a(f, d, 0, !1);
          },
          getTangent: function(f, d) {
            return a(f, d, 1, !0);
          },
          getWeightedTangent: function(f, d) {
            return a(f, d, 1, !1);
          },
          getNormal: function(f, d) {
            return a(f, d, 2, !0);
          },
          getWeightedNormal: function(f, d) {
            return a(f, d, 2, !1);
          },
          getCurvature: function(f, d) {
            return a(f, d, 3, !1).x;
          },
          getPeaks: function(f) {
            var d = f[0], v = f[1], m = f[2], p = f[3], w = f[4], T = f[5], E = f[6], L = f[7], I = -d + 3 * m - 3 * w + E, O = 3 * d - 6 * m + 3 * w, B = -3 * d + 3 * m, q = -v + 3 * p - 3 * T + L, Y = 3 * v - 6 * p + 3 * T, z = -3 * v + 3 * p, N = 1e-8, M = 1 - N, R = [];
            return A.solveCubic(
              9 * (I * I + q * q),
              9 * (I * O + Y * q),
              2 * (O * O + Y * Y) + 3 * (B * I + z * q),
              B * O + Y * z,
              R,
              N,
              M
            ), R.sort();
          }
        } };
      }(),
      new function() {
        function t(O, B, q, Y, z, N, M) {
          var R = !M && q.getPrevious() === z, V = !M && q !== z && q.getNext() === z, W = 1e-8, G = 1 - W;
          if (Y !== null && Y >= (R ? W : 0) && Y <= (V ? G : 1) && N !== null && N >= (V ? W : 0) && N <= (R ? G : 1)) {
            var J = new $t(q, Y, null, M), j = new $t(z, N, null, M);
            J._intersection = j, j._intersection = J, (!B || B(J)) && $t.insert(O, J, !0);
          }
        }
        function i(O, B, q, Y, z, N, M, R, V, W, G, J, j) {
          if (++V >= 4096 || ++R >= 40)
            return V;
          var tt = 1e-9, it = B[0], Q = B[1], nt = B[6], st = B[7], dt = ot.getSignedDistance, gt = dt(it, Q, nt, st, B[2], B[3]), pt = dt(it, Q, nt, st, B[4], B[5]), At = gt * pt > 0 ? 3 / 4 : 4 / 9, It = At * Math.min(0, gt, pt), Rt = At * Math.max(0, gt, pt), Qt = dt(it, Q, nt, st, O[0], O[1]), qt = dt(it, Q, nt, st, O[2], O[3]), Xt = dt(it, Q, nt, st, O[4], O[5]), Gt = dt(it, Q, nt, st, O[6], O[7]), ee = a(Qt, qt, Xt, Gt), Jt = ee[0], Pe = ee[1], ue, fe;
          if (gt === 0 && pt === 0 && Qt === 0 && qt === 0 && Xt === 0 && Gt === 0 || (ue = f(Jt, Pe, It, Rt)) == null || (fe = f(
            Jt.reverse(),
            Pe.reverse(),
            It,
            Rt
          )) == null)
            return V;
          var ie = W + (G - W) * ue, ve = W + (G - W) * fe;
          if (Math.max(j - J, ve - ie) < tt) {
            var hn = (ie + ve) / 2, sn = (J + j) / 2;
            t(
              z,
              N,
              M ? Y : q,
              M ? sn : hn,
              M ? q : Y,
              M ? hn : sn
            );
          } else {
            O = vt.getPart(O, ue, fe);
            var an = j - J;
            if (fe - ue > 0.8)
              if (ve - ie > an) {
                var Ze = vt.subdivide(O, 0.5), hn = (ie + ve) / 2;
                V = i(
                  B,
                  Ze[0],
                  Y,
                  q,
                  z,
                  N,
                  !M,
                  R,
                  V,
                  J,
                  j,
                  ie,
                  hn
                ), V = i(
                  B,
                  Ze[1],
                  Y,
                  q,
                  z,
                  N,
                  !M,
                  R,
                  V,
                  J,
                  j,
                  hn,
                  ve
                );
              } else {
                var Ze = vt.subdivide(B, 0.5), sn = (J + j) / 2;
                V = i(
                  Ze[0],
                  O,
                  Y,
                  q,
                  z,
                  N,
                  !M,
                  R,
                  V,
                  J,
                  sn,
                  ie,
                  ve
                ), V = i(
                  Ze[1],
                  O,
                  Y,
                  q,
                  z,
                  N,
                  !M,
                  R,
                  V,
                  sn,
                  j,
                  ie,
                  ve
                );
              }
            else
              an === 0 || an >= tt ? V = i(
                B,
                O,
                Y,
                q,
                z,
                N,
                !M,
                R,
                V,
                J,
                j,
                ie,
                ve
              ) : V = i(
                O,
                B,
                q,
                Y,
                z,
                N,
                M,
                R,
                V,
                ie,
                ve,
                J,
                j
              );
          }
          return V;
        }
        function a(O, B, q, Y) {
          var z = [0, O], N = [1 / 3, B], M = [2 / 3, q], R = [1, Y], V = B - (2 * O + Y) / 3, W = q - (O + 2 * Y) / 3, G;
          if (V * W < 0)
            G = [[z, N, R], [z, M, R]];
          else {
            var J = V / W;
            G = [
              J >= 2 ? [z, N, R] : J <= 0.5 ? [z, M, R] : [z, N, M, R],
              [z, R]
            ];
          }
          return (V || W) < 0 ? G.reverse() : G;
        }
        function f(O, B, q, Y) {
          return O[0][1] < q ? d(O, !0, q) : B[0][1] > Y ? d(B, !1, Y) : O[0][0];
        }
        function d(O, B, q) {
          for (var Y = O[0][0], z = O[0][1], N = 1, M = O.length; N < M; N++) {
            var R = O[N][0], V = O[N][1];
            if (B ? V >= q : V <= q)
              return V === q ? R : Y + (q - z) * (R - Y) / (V - z);
            Y = R, z = V;
          }
          return null;
        }
        function v(O, B, q, Y, z) {
          var N = A.isZero;
          if (N(Y) && N(z)) {
            var M = vt.getTimeOf(O, new y(B, q));
            return M === null ? [] : [M];
          }
          for (var R = Math.atan2(-z, Y), V = Math.sin(R), W = Math.cos(R), G = [], J = [], j = 0; j < 8; j += 2) {
            var tt = O[j] - B, it = O[j + 1] - q;
            G.push(
              tt * W - it * V,
              tt * V + it * W
            );
          }
          return vt.solveCubic(G, 1, 0, J, 0, 1), J;
        }
        function m(O, B, q, Y, z, N, M) {
          for (var R = B[0], V = B[1], W = B[6], G = B[7], J = v(O, R, V, W - R, G - V), j = 0, tt = J.length; j < tt; j++) {
            var it = J[j], Q = vt.getPoint(O, it), nt = vt.getTimeOf(B, Q);
            nt !== null && t(
              z,
              N,
              M ? Y : q,
              M ? nt : it,
              M ? q : Y,
              M ? it : nt
            );
          }
        }
        function p(O, B, q, Y, z, N) {
          var M = ot.intersect(
            O[0],
            O[1],
            O[6],
            O[7],
            B[0],
            B[1],
            B[6],
            B[7]
          );
          M && t(
            z,
            N,
            q,
            vt.getTimeOf(O, M),
            Y,
            vt.getTimeOf(B, M)
          );
        }
        function w(O, B, q, Y, z, N) {
          var M = 1e-12, R = Math.min, V = Math.max;
          if (V(O[0], O[2], O[4], O[6]) + M > R(B[0], B[2], B[4], B[6]) && R(O[0], O[2], O[4], O[6]) - M < V(B[0], B[2], B[4], B[6]) && V(O[1], O[3], O[5], O[7]) + M > R(B[1], B[3], B[5], B[7]) && R(O[1], O[3], O[5], O[7]) - M < V(B[1], B[3], B[5], B[7])) {
            var W = L(O, B);
            if (W)
              for (var G = 0; G < 2; G++) {
                var J = W[G];
                t(
                  z,
                  N,
                  q,
                  J[0],
                  Y,
                  J[1],
                  !0
                );
              }
            else {
              var j = vt.isStraight(O), tt = vt.isStraight(B), it = j && tt, Q = j && !tt, nt = z.length;
              if ((it ? p : j || tt ? m : i)(
                Q ? B : O,
                Q ? O : B,
                Q ? Y : q,
                Q ? q : Y,
                z,
                N,
                Q,
                0,
                0,
                0,
                1,
                0,
                1
              ), !it || z.length === nt)
                for (var G = 0; G < 4; G++) {
                  var st = G >> 1, dt = G & 1, gt = st * 6, pt = dt * 6, At = new y(O[gt], O[gt + 1]), It = new y(B[pt], B[pt + 1]);
                  At.isClose(It, M) && t(
                    z,
                    N,
                    q,
                    st,
                    Y,
                    dt
                  );
                }
            }
          }
          return z;
        }
        function T(O, B, q, Y) {
          var z = vt.classify(O);
          if (z.type === "loop") {
            var N = z.roots;
            t(
              q,
              Y,
              B,
              N[0],
              B,
              N[1]
            );
          }
          return q;
        }
        function E(O, B, q, Y, z, N) {
          var M = 1e-7, R = !B;
          R && (B = O);
          for (var V = O.length, W = B.length, G = new Array(V), J = R ? G : new Array(W), j = [], tt = 0; tt < V; tt++)
            G[tt] = O[tt].getValues(Y);
          if (!R)
            for (var tt = 0; tt < W; tt++)
              J[tt] = B[tt].getValues(z);
          for (var it = x.findCurveBoundsCollisions(
            G,
            J,
            M
          ), Q = 0; Q < V; Q++) {
            var nt = O[Q], st = G[Q];
            R && T(st, nt, j, q);
            var dt = it[Q];
            if (dt)
              for (var gt = 0; gt < dt.length; gt++) {
                if (N && j.length)
                  return j;
                var pt = dt[gt];
                if (!R || pt > Q) {
                  var At = B[pt], It = J[pt];
                  w(
                    st,
                    It,
                    nt,
                    At,
                    j,
                    q
                  );
                }
              }
          }
          return j;
        }
        function L(O, B) {
          function q(Gt) {
            var ee = Gt[6] - Gt[0], Jt = Gt[7] - Gt[1];
            return ee * ee + Jt * Jt;
          }
          var Y = Math.abs, z = ot.getDistance, N = 1e-8, M = 1e-7, R = vt.isStraight(O), V = vt.isStraight(B), W = R && V, G = q(O) < q(B), J = G ? B : O, j = G ? O : B, tt = J[0], it = J[1], Q = J[6] - tt, nt = J[7] - it;
          if (z(tt, it, Q, nt, j[0], j[1], !0) < M && z(tt, it, Q, nt, j[6], j[7], !0) < M)
            !W && z(tt, it, Q, nt, J[2], J[3], !0) < M && z(tt, it, Q, nt, J[4], J[5], !0) < M && z(tt, it, Q, nt, j[2], j[3], !0) < M && z(tt, it, Q, nt, j[4], j[5], !0) < M && (R = V = W = !0);
          else if (W)
            return null;
          if (R ^ V)
            return null;
          for (var st = [O, B], dt = [], gt = 0; gt < 4 && dt.length < 2; gt++) {
            var pt = gt & 1, At = pt ^ 1, It = gt >> 1, Rt = vt.getTimeOf(st[pt], new y(
              st[At][It ? 6 : 0],
              st[At][It ? 7 : 1]
            ));
            if (Rt != null) {
              var Qt = pt ? [It, Rt] : [Rt, It];
              (!dt.length || Y(Qt[0] - dt[0][0]) > N && Y(Qt[1] - dt[0][1]) > N) && dt.push(Qt);
            }
            if (gt > 2 && !dt.length)
              break;
          }
          if (dt.length !== 2)
            dt = null;
          else if (!W) {
            var qt = vt.getPart(O, dt[0][0], dt[1][0]), Xt = vt.getPart(B, dt[0][1], dt[1][1]);
            (Y(Xt[2] - qt[2]) > M || Y(Xt[3] - qt[3]) > M || Y(Xt[4] - qt[4]) > M || Y(Xt[5] - qt[5]) > M) && (dt = null);
          }
          return dt;
        }
        function I(O, B) {
          var q = O[0], Y = O[1], z = O[2], N = O[3], M = O[4], R = O[5], V = O[6], W = O[7], G = B.normalize(), J = G.x, j = G.y, tt = 3 * V - 9 * M + 9 * z - 3 * q, it = 3 * W - 9 * R + 9 * N - 3 * Y, Q = 6 * M - 12 * z + 6 * q, nt = 6 * R - 12 * N + 6 * Y, st = 3 * z - 3 * q, dt = 3 * N - 3 * Y, gt = 2 * tt * j - 2 * it * J, pt = [];
          if (Math.abs(gt) < A.CURVETIME_EPSILON) {
            var At = tt * dt - it * st, gt = tt * nt - it * Q;
            if (gt != 0) {
              var It = -At / gt;
              It >= 0 && It <= 1 && pt.push(It);
            }
          } else {
            var Rt = (Q * Q - 4 * tt * st) * j * j + (-2 * Q * nt + 4 * it * st + 4 * tt * dt) * J * j + (nt * nt - 4 * it * dt) * J * J, Qt = Q * j - nt * J;
            if (Rt >= 0 && gt != 0) {
              var qt = Math.sqrt(Rt), Xt = -(Qt + qt) / gt, Gt = (-Qt + qt) / gt;
              Xt >= 0 && Xt <= 1 && pt.push(Xt), Gt >= 0 && Gt <= 1 && pt.push(Gt);
            }
          }
          return pt;
        }
        return {
          getIntersections: function(O) {
            var B = this.getValues(), q = O && O !== this && O.getValues();
            return q ? w(B, q, this, O, []) : T(B, this, []);
          },
          statics: {
            getOverlaps: L,
            getIntersections: E,
            getCurveLineIntersections: v,
            getTimesWithTangent: I
          }
        };
      }()
    ), $t = h.extend(
      {
        _class: "CurveLocation",
        initialize: function(i, a, f, d, v) {
          if (a >= 0.99999999) {
            var m = i.getNext();
            m && (a = 0, i = m);
          }
          this._setCurve(i), this._time = a, this._point = f || i.getPointAtTime(a), this._overlap = d, this._distance = v, this._intersection = this._next = this._previous = null;
        },
        _setPath: function(t) {
          this._path = t, this._version = t ? t._version : 0;
        },
        _setCurve: function(t) {
          this._setPath(t._path), this._curve = t, this._segment = null, this._segment1 = t._segment1, this._segment2 = t._segment2;
        },
        _setSegment: function(t) {
          var i = t.getCurve();
          i ? this._setCurve(i) : (this._setPath(t._path), this._segment1 = t, this._segment2 = null), this._segment = t, this._time = t === this._segment1 ? 0 : 1, this._point = t._point.clone();
        },
        getSegment: function() {
          var t = this._segment;
          if (!t) {
            var i = this.getCurve(), a = this.getTime();
            a === 0 ? t = i._segment1 : a === 1 ? t = i._segment2 : a != null && (t = i.getPartLength(0, a) < i.getPartLength(a, 1) ? i._segment1 : i._segment2), this._segment = t;
          }
          return t;
        },
        getCurve: function() {
          var t = this._path, i = this;
          t && t._version !== this._version && (this._time = this._offset = this._curveOffset = this._curve = null);
          function a(f) {
            var d = f && f.getCurve();
            if (d && (i._time = d.getTimeOf(i._point)) != null)
              return i._setCurve(d), d;
          }
          return this._curve || a(this._segment) || a(this._segment1) || a(this._segment2.getPrevious());
        },
        getPath: function() {
          var t = this.getCurve();
          return t && t._path;
        },
        getIndex: function() {
          var t = this.getCurve();
          return t && t.getIndex();
        },
        getTime: function() {
          var t = this.getCurve(), i = this._time;
          return t && i == null ? this._time = t.getTimeOf(this._point) : i;
        },
        getParameter: "#getTime",
        getPoint: function() {
          return this._point;
        },
        getOffset: function() {
          var t = this._offset;
          if (t == null) {
            t = 0;
            var i = this.getPath(), a = this.getIndex();
            if (i && a != null)
              for (var f = i.getCurves(), d = 0; d < a; d++)
                t += f[d].getLength();
            this._offset = t += this.getCurveOffset();
          }
          return t;
        },
        getCurveOffset: function() {
          var t = this._curveOffset;
          if (t == null) {
            var i = this.getCurve(), a = this.getTime();
            this._curveOffset = t = a != null && i && i.getPartLength(0, a);
          }
          return t;
        },
        getIntersection: function() {
          return this._intersection;
        },
        getDistance: function() {
          return this._distance;
        },
        divide: function() {
          var t = this.getCurve(), i = t && t.divideAtTime(this.getTime());
          return i && this._setSegment(i._segment1), i;
        },
        split: function() {
          var t = this.getCurve(), i = t._path, a = t && t.splitAtTime(this.getTime());
          return a && this._setSegment(i.getLastSegment()), a;
        },
        equals: function(t, i) {
          var a = this === t;
          if (!a && t instanceof $t) {
            var f = this.getCurve(), d = t.getCurve(), v = f._path, m = d._path;
            if (v === m) {
              var p = Math.abs, w = 1e-7, T = p(this.getOffset() - t.getOffset()), E = !i && this._intersection, L = !i && t._intersection;
              a = (T < w || v && p(v.getLength() - T) < w) && (!E && !L || E && L && E.equals(L, !0));
            }
          }
          return a;
        },
        toString: function() {
          var t = [], i = this.getPoint(), a = S.instance;
          i && t.push("point: " + i);
          var f = this.getIndex();
          f != null && t.push("index: " + f);
          var d = this.getTime();
          return d != null && t.push("time: " + a.number(d)), this._distance != null && t.push("distance: " + a.number(this._distance)), "{ " + t.join(", ") + " }";
        },
        isTouching: function() {
          var t = this._intersection;
          if (t && this.getTangent().isCollinear(t.getTangent())) {
            var i = this.getCurve(), a = t.getCurve();
            return !(i.isStraight() && a.isStraight() && i.getLine().intersect(a.getLine()));
          }
          return !1;
        },
        isCrossing: function() {
          var t = this._intersection;
          if (!t)
            return !1;
          var i = this.getTime(), a = t.getTime(), f = 1e-8, d = 1 - f, v = i >= f && i <= d, m = a >= f && a <= d;
          if (v && m)
            return !this.isTouching();
          var p = this.getCurve(), w = p && i < f ? p.getPrevious() : p, T = t.getCurve(), E = T && a < f ? T.getPrevious() : T;
          if (i > d && (p = p.getNext()), a > d && (T = T.getNext()), !w || !p || !E || !T)
            return !1;
          var L = [];
          function I(J, j) {
            var tt = J.getValues(), it = vt.classify(tt).roots || vt.getPeaks(tt), Q = it.length, nt = vt.getLength(
              tt,
              j && Q ? it[Q - 1] : 0,
              !j && Q ? it[0] : 1
            );
            L.push(Q ? nt : nt / 32);
          }
          function O(J, j, tt) {
            return j < tt ? J > j && J < tt : J > j || J < tt;
          }
          v || (I(w, !0), I(p, !1)), m || (I(E, !0), I(T, !1));
          var B = this.getPoint(), q = Math.min.apply(Math, L), Y = v ? p.getTangentAtTime(i) : p.getPointAt(q).subtract(B), z = v ? Y.negate() : w.getPointAt(-q).subtract(B), N = m ? T.getTangentAtTime(a) : T.getPointAt(q).subtract(B), M = m ? N.negate() : E.getPointAt(-q).subtract(B), R = z.getAngle(), V = Y.getAngle(), W = M.getAngle(), G = N.getAngle();
          return !!(v ? O(R, W, G) ^ O(V, W, G) && O(R, G, W) ^ O(V, G, W) : O(W, R, V) ^ O(G, R, V) && O(W, V, R) ^ O(G, V, R));
        },
        hasOverlap: function() {
          return !!this._overlap;
        }
      },
      h.each(vt._evaluateMethods, function(t) {
        var i = t + "At";
        this[t] = function() {
          var a = this.getCurve(), f = this.getTime();
          return f != null && a && a[i](f, !0);
        };
      }, {
        preserve: !0
      }),
      new function() {
        function t(i, a, f) {
          var d = i.length, v = 0, m = d - 1;
          function p(B, q) {
            for (var Y = B + q; Y >= -1 && Y <= d; Y += q) {
              var z = i[(Y % d + d) % d];
              if (!a.getPoint().isClose(
                z.getPoint(),
                1e-7
              ))
                break;
              if (a.equals(z))
                return z;
            }
            return null;
          }
          for (; v <= m; ) {
            var w = v + m >>> 1, T = i[w], E;
            if (f && (E = a.equals(T) ? T : p(w, -1) || p(w, 1)))
              return a._overlap && (E._overlap = E._intersection._overlap = !0), E;
            var L = a.getPath(), I = T.getPath(), O = L !== I ? L._id - I._id : a.getIndex() + a.getTime() - (T.getIndex() + T.getTime());
            O < 0 ? m = w - 1 : v = w + 1;
          }
          return i.splice(v, 0, a), a;
        }
        return { statics: {
          insert: t,
          expand: function(i) {
            for (var a = i.slice(), f = i.length - 1; f >= 0; f--)
              t(a, i[f]._intersection, !1);
            return a;
          }
        } };
      }()
    ), Yt = ct.extend({
      _class: "PathItem",
      _selectBounds: !1,
      _canScaleStroke: !0,
      beans: !0,
      initialize: function() {
      },
      statics: {
        create: function(t) {
          var i, a, f;
          if (h.isPlainObject(t) ? (a = t.segments, i = t.pathData) : Array.isArray(t) ? a = t : typeof t == "string" && (i = t), a) {
            var d = a[0];
            f = d && Array.isArray(d[0]);
          } else
            i && (f = (i.match(/m/gi) || []).length > 1 || /z\s*\S+/i.test(i));
          var v = f ? ae : Bt;
          return new v(t);
        }
      },
      _asPathItem: function() {
        return this;
      },
      isClockwise: function() {
        return this.getArea() >= 0;
      },
      setClockwise: function(t) {
        this.isClockwise() != (t = !!t) && this.reverse();
      },
      setPathData: function(t) {
        var i = t && t.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig), a, f = !1, d, v, m = new y(), p = new y();
        function w(M, R) {
          var V = +a[M];
          return f && (V += m[R]), V;
        }
        function T(M) {
          return new y(
            w(M, "x"),
            w(M + 1, "y")
          );
        }
        this.clear();
        for (var E = 0, L = i && i.length; E < L; E++) {
          var I = i[E], O = I[0], B = O.toLowerCase();
          a = I.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
          var q = a && a.length;
          switch (f = O === B, d === "z" && !/[mz]/.test(B) && this.moveTo(m), B) {
            case "m":
            case "l":
              for (var Y = B === "m", z = 0; z < q; z += 2)
                this[Y ? "moveTo" : "lineTo"](m = T(z)), Y && (p = m, Y = !1);
              v = m;
              break;
            case "h":
            case "v":
              var N = B === "h" ? "x" : "y";
              m = m.clone();
              for (var z = 0; z < q; z++)
                m[N] = w(z, N), this.lineTo(m);
              v = m;
              break;
            case "c":
              for (var z = 0; z < q; z += 6)
                this.cubicCurveTo(
                  T(z),
                  v = T(z + 2),
                  m = T(z + 4)
                );
              break;
            case "s":
              for (var z = 0; z < q; z += 4)
                this.cubicCurveTo(
                  /[cs]/.test(d) ? m.multiply(2).subtract(v) : m,
                  v = T(z),
                  m = T(z + 2)
                ), d = B;
              break;
            case "q":
              for (var z = 0; z < q; z += 4)
                this.quadraticCurveTo(
                  v = T(z),
                  m = T(z + 2)
                );
              break;
            case "t":
              for (var z = 0; z < q; z += 2)
                this.quadraticCurveTo(
                  v = /[qt]/.test(d) ? m.multiply(2).subtract(v) : m,
                  m = T(z)
                ), d = B;
              break;
            case "a":
              for (var z = 0; z < q; z += 7)
                this.arcTo(
                  m = T(z + 5),
                  new C(+a[z], +a[z + 1]),
                  +a[z + 2],
                  +a[z + 4],
                  +a[z + 3]
                );
              break;
            case "z":
              this.closePath(1e-12), m = p;
              break;
          }
          d = B;
        }
      },
      _canComposite: function() {
        return !(this.hasFill() && this.hasStroke());
      },
      _contains: function(t) {
        var i = t.isInside(
          this.getBounds({ internal: !0, handle: !0 })
        ) ? this._getWinding(t) : {};
        return i.onPath || !!(this.getFillRule() === "evenodd" ? i.windingL & 1 || i.windingR & 1 : i.winding);
      },
      getIntersections: function(t, i, a, f) {
        var d = this === t || !t, v = this._matrix._orNullIfIdentity(), m = d ? v : (a || t._matrix)._orNullIfIdentity();
        return d || this.getBounds(v).intersects(
          t.getBounds(m),
          1e-12
        ) ? vt.getIntersections(
          this.getCurves(),
          !d && t.getCurves(),
          i,
          v,
          m,
          f
        ) : [];
      },
      getCrossings: function(t) {
        return this.getIntersections(t, function(i) {
          return i.isCrossing();
        });
      },
      getNearestLocation: function() {
        for (var t = y.read(arguments), i = this.getCurves(), a = 1 / 0, f = null, d = 0, v = i.length; d < v; d++) {
          var m = i[d].getNearestLocation(t);
          m._distance < a && (a = m._distance, f = m);
        }
        return f;
      },
      getNearestPoint: function() {
        var t = this.getNearestLocation.apply(this, arguments);
        return t && t.getPoint();
      },
      interpolate: function(t, i, a) {
        var f = !this._children, d = f ? "_segments" : "_children", v = t[d], m = i[d], p = this[d];
        if (!v || !m || v.length !== m.length)
          throw new Error("Invalid operands in interpolate() call: " + t + ", " + i);
        var w = p.length, T = m.length;
        if (w < T)
          for (var E = f ? bt : Bt, L = w; L < T; L++)
            this.add(new E());
        else
          w > T && this[f ? "removeSegments" : "removeChildren"](T, w);
        for (var L = 0; L < T; L++)
          p[L].interpolate(v[L], m[L], a);
        f && (this.setClosed(t._closed), this._changed(9));
      },
      compare: function(t) {
        var i = !1;
        if (t) {
          var a = this._children || [this], f = t._children ? t._children.slice() : [t], d = a.length, v = f.length, m = [], p = 0;
          i = !0;
          for (var w = x.findItemBoundsCollisions(a, f, A.GEOMETRIC_EPSILON), T = d - 1; T >= 0 && i; T--) {
            var E = a[T];
            i = !1;
            var L = w[T];
            if (L)
              for (var I = L.length - 1; I >= 0 && !i; I--)
                E.compare(f[L[I]]) && (m[L[I]] || (m[L[I]] = !0, p++), i = !0);
          }
          i = i && p === v;
        }
        return i;
      }
    }), Bt = Yt.extend(
      {
        _class: "Path",
        _serializeFields: {
          segments: [],
          closed: !1
        },
        initialize: function(i) {
          this._closed = !1, this._segments = [], this._version = 0;
          var a = arguments, f = Array.isArray(i) ? typeof i[0] == "object" ? i : a : i && i.size === r && (i.x !== r || i.point !== r) ? a : null;
          f && f.length > 0 ? this.setSegments(f) : (this._curves = r, this._segmentSelection = 0, !f && typeof i == "string" && (this.setPathData(i), i = null)), this._initialize(!f && i);
        },
        _equals: function(t) {
          return this._closed === t._closed && h.equals(this._segments, t._segments);
        },
        copyContent: function(t) {
          this.setSegments(t._segments), this._closed = t._closed;
        },
        _changed: function t(i) {
          if (t.base.call(this, i), i & 8) {
            if (this._length = this._area = r, i & 32)
              this._version++;
            else if (this._curves)
              for (var a = 0, f = this._curves.length; a < f; a++)
                this._curves[a]._changed();
          } else
            i & 64 && (this._bounds = r);
        },
        getStyle: function() {
          var t = this._parent;
          return (t instanceof ae ? t : this)._style;
        },
        getSegments: function() {
          return this._segments;
        },
        setSegments: function(t) {
          var i = this.isFullySelected(), a = t && t.length;
          if (this._segments.length = 0, this._segmentSelection = 0, this._curves = r, a) {
            var f = t[a - 1];
            typeof f == "boolean" && (this.setClosed(f), a--), this._add(bt.readList(t, 0, {}, a));
          }
          i && this.setFullySelected(!0);
        },
        getFirstSegment: function() {
          return this._segments[0];
        },
        getLastSegment: function() {
          return this._segments[this._segments.length - 1];
        },
        getCurves: function() {
          var t = this._curves, i = this._segments;
          if (!t) {
            var a = this._countCurves();
            t = this._curves = new Array(a);
            for (var f = 0; f < a; f++)
              t[f] = new vt(
                this,
                i[f],
                i[f + 1] || i[0]
              );
          }
          return t;
        },
        getFirstCurve: function() {
          return this.getCurves()[0];
        },
        getLastCurve: function() {
          var t = this.getCurves();
          return t[t.length - 1];
        },
        isClosed: function() {
          return this._closed;
        },
        setClosed: function(t) {
          if (this._closed != (t = !!t)) {
            if (this._closed = t, this._curves) {
              var i = this._curves.length = this._countCurves();
              t && (this._curves[i - 1] = new vt(
                this,
                this._segments[i - 1],
                this._segments[0]
              ));
            }
            this._changed(41);
          }
        }
      },
      {
        beans: !0,
        getPathData: function(t, i) {
          var a = this._segments, f = a.length, d = new S(i), v = new Array(6), m = !0, p, w, T, E, L, I, O, B, q = [];
          function Y(N, M) {
            if (N._transformCoordinates(t, v), p = v[0], w = v[1], m)
              q.push("M" + d.pair(p, w)), m = !1;
            else if (L = v[2], I = v[3], L === p && I === w && O === T && B === E) {
              if (!M) {
                var R = p - T, V = w - E;
                q.push(
                  R === 0 ? "v" + d.number(V) : V === 0 ? "h" + d.number(R) : "l" + d.pair(R, V)
                );
              }
            } else
              q.push("c" + d.pair(O - T, B - E) + " " + d.pair(L - T, I - E) + " " + d.pair(p - T, w - E));
            T = p, E = w, O = v[4], B = v[5];
          }
          if (!f)
            return "";
          for (var z = 0; z < f; z++)
            Y(a[z]);
          return this._closed && f > 0 && (Y(a[0], !0), q.push("z")), q.join("");
        },
        isEmpty: function() {
          return !this._segments.length;
        },
        _transformContent: function(t) {
          for (var i = this._segments, a = new Array(6), f = 0, d = i.length; f < d; f++)
            i[f]._transformCoordinates(t, a, !0);
          return !0;
        },
        _add: function(t, m) {
          for (var a = this._segments, f = this._curves, d = t.length, v = m == null, m = v ? a.length : m, p = 0; p < d; p++) {
            var w = t[p];
            w._path && (w = t[p] = w.clone()), w._path = this, w._index = m + p, w._selection && this._updateSelection(w, 0, w._selection);
          }
          if (v)
            h.push(a, t);
          else {
            a.splice.apply(a, [m, 0].concat(t));
            for (var p = m + d, T = a.length; p < T; p++)
              a[p]._index = p;
          }
          if (f) {
            var E = this._countCurves(), L = m > 0 && m + d - 1 === E ? m - 1 : m, I = L, O = Math.min(L + d, E);
            t._curves && (f.splice.apply(f, [L, 0].concat(t._curves)), I += t._curves.length);
            for (var p = I; p < O; p++)
              f.splice(p, 0, new vt(this, null, null));
            this._adjustCurves(L, O);
          }
          return this._changed(41), t;
        },
        _adjustCurves: function(t, i) {
          for (var a = this._segments, f = this._curves, d, v = t; v < i; v++)
            d = f[v], d._path = this, d._segment1 = a[v], d._segment2 = a[v + 1] || a[0], d._changed();
          (d = f[this._closed && !t ? a.length - 1 : t - 1]) && (d._segment2 = a[t] || a[0], d._changed()), (d = f[i]) && (d._segment1 = a[i], d._changed());
        },
        _countCurves: function() {
          var t = this._segments.length;
          return !this._closed && t > 0 ? t - 1 : t;
        },
        add: function(t) {
          var i = arguments;
          return i.length > 1 && typeof t != "number" ? this._add(bt.readList(i)) : this._add([bt.read(i)])[0];
        },
        insert: function(t, i) {
          var a = arguments;
          return a.length > 2 && typeof i != "number" ? this._add(bt.readList(a, 1), t) : this._add([bt.read(a, 1)], t)[0];
        },
        addSegment: function() {
          return this._add([bt.read(arguments)])[0];
        },
        insertSegment: function(t) {
          return this._add([bt.read(arguments, 1)], t)[0];
        },
        addSegments: function(t) {
          return this._add(bt.readList(t));
        },
        insertSegments: function(t, i) {
          return this._add(bt.readList(i), t);
        },
        removeSegment: function(t) {
          return this.removeSegments(t, t + 1)[0] || null;
        },
        removeSegments: function(t, i, a) {
          t = t || 0, i = h.pick(i, this._segments.length);
          var f = this._segments, d = this._curves, v = f.length, m = f.splice(t, i - t), p = m.length;
          if (!p)
            return m;
          for (var w = 0; w < p; w++) {
            var T = m[w];
            T._selection && this._updateSelection(T, T._selection, 0), T._index = T._path = null;
          }
          for (var w = t, E = f.length; w < E; w++)
            f[w]._index = w;
          if (d) {
            for (var L = t > 0 && i === v + (this._closed ? 1 : 0) ? t - 1 : t, d = d.splice(L, p), w = d.length - 1; w >= 0; w--)
              d[w]._path = null;
            a && (m._curves = d.slice(1)), this._adjustCurves(L, L);
          }
          return this._changed(41), m;
        },
        clear: "#removeSegments",
        hasHandles: function() {
          for (var t = this._segments, i = 0, a = t.length; i < a; i++)
            if (t[i].hasHandles())
              return !0;
          return !1;
        },
        clearHandles: function() {
          for (var t = this._segments, i = 0, a = t.length; i < a; i++)
            t[i].clearHandles();
        },
        getLength: function() {
          if (this._length == null) {
            for (var t = this.getCurves(), i = 0, a = 0, f = t.length; a < f; a++)
              i += t[a].getLength();
            this._length = i;
          }
          return this._length;
        },
        getArea: function() {
          var t = this._area;
          if (t == null) {
            var i = this._segments, a = this._closed;
            t = 0;
            for (var f = 0, d = i.length; f < d; f++) {
              var v = f + 1 === d;
              t += vt.getArea(vt.getValues(
                i[f],
                i[v ? 0 : f + 1],
                null,
                v && !a
              ));
            }
            this._area = t;
          }
          return t;
        },
        isFullySelected: function() {
          var t = this._segments.length;
          return this.isSelected() && t > 0 && this._segmentSelection === t * 7;
        },
        setFullySelected: function(t) {
          t && this._selectSegments(!0), this.setSelected(t);
        },
        setSelection: function t(i) {
          i & 1 || this._selectSegments(!1), t.base.call(this, i);
        },
        _selectSegments: function(t) {
          var i = this._segments, a = i.length, f = t ? 7 : 0;
          this._segmentSelection = f * a;
          for (var d = 0; d < a; d++)
            i[d]._selection = f;
        },
        _updateSelection: function(t, i, a) {
          t._selection = a;
          var f = this._segmentSelection += a - i;
          f > 0 && this.setSelected(!0);
        },
        divideAt: function(t) {
          var i = this.getLocationAt(t), a;
          return i && (a = i.getCurve().divideAt(i.getCurveOffset())) ? a._segment1 : null;
        },
        splitAt: function(t) {
          var i = this.getLocationAt(t), a = i && i.index, f = i && i.time, d = 1e-8, v = 1 - d;
          f > v && (a++, f = 0);
          var m = this.getCurves();
          if (a >= 0 && a < m.length) {
            f >= d && m[a++].divideAtTime(f);
            var p = this.removeSegments(a, this._segments.length, !0), w;
            return this._closed ? (this.setClosed(!1), w = this) : (w = new Bt(ct.NO_INSERT), w.insertAbove(this), w.copyAttributes(this)), w._add(p, 0), this.addSegment(p[0]), w;
          }
          return null;
        },
        split: function(t, i) {
          var a, f = i === r ? t : (a = this.getCurves()[t]) && a.getLocationAtTime(i);
          return f != null ? this.splitAt(f) : null;
        },
        join: function(t, i) {
          var a = i || 0;
          if (t && t !== this) {
            var f = t._segments, d = this.getLastSegment(), v = t.getLastSegment();
            if (!v)
              return this;
            d && d._point.isClose(v._point, a) && t.reverse();
            var m = t.getFirstSegment();
            if (d && d._point.isClose(m._point, a))
              d.setHandleOut(m._handleOut), this._add(f.slice(1));
            else {
              var p = this.getFirstSegment();
              p && p._point.isClose(m._point, a) && t.reverse(), v = t.getLastSegment(), p && p._point.isClose(v._point, a) ? (p.setHandleIn(v._handleIn), this._add(f.slice(0, f.length - 1), 0)) : this._add(f.slice());
            }
            t._closed && this._add([f[0]]), t.remove();
          }
          var w = this.getFirstSegment(), T = this.getLastSegment();
          return w !== T && w._point.isClose(T._point, a) && (w.setHandleIn(T._handleIn), T.remove(), this.setClosed(!0)), this;
        },
        reduce: function(t) {
          for (var i = this.getCurves(), a = t && t.simplify, f = a ? 1e-7 : 0, d = i.length - 1; d >= 0; d--) {
            var v = i[d];
            !v.hasHandles() && (!v.hasLength(f) || a && v.isCollinear(v.getNext())) && v.remove();
          }
          return this;
        },
        reverse: function() {
          this._segments.reverse();
          for (var t = 0, i = this._segments.length; t < i; t++) {
            var a = this._segments[t], f = a._handleIn;
            a._handleIn = a._handleOut, a._handleOut = f, a._index = t;
          }
          this._curves = null, this._changed(9);
        },
        flatten: function(t) {
          for (var i = new he(this, t || 0.25, 256, !0), a = i.parts, f = a.length, d = [], v = 0; v < f; v++)
            d.push(new bt(a[v].curve.slice(0, 2)));
          !this._closed && f > 0 && d.push(new bt(a[f - 1].curve.slice(6))), this.setSegments(d);
        },
        simplify: function(t) {
          var i = new Ie(this).fit(t || 2.5);
          return i && this.setSegments(i), !!i;
        },
        smooth: function(t) {
          var i = this, a = t || {}, f = a.type || "asymmetric", d = this._segments, v = d.length, m = this._closed;
          function p(Jt, Pe) {
            var ue = Jt && Jt.index;
            if (ue != null) {
              var fe = Jt.path;
              if (fe && fe !== i)
                throw new Error(Jt._class + " " + ue + " of " + fe + " is not part of " + i);
              Pe && Jt instanceof vt && ue++;
            } else
              ue = typeof Jt == "number" ? Jt : Pe;
            return Math.min(ue < 0 && m ? ue % v : ue < 0 ? ue + v : ue, v - 1);
          }
          var w = m && a.from === r && a.to === r, T = p(a.from, 0), E = p(a.to, v - 1);
          if (T > E)
            if (m)
              T -= v;
            else {
              var L = T;
              T = E, E = L;
            }
          if (/^(?:asymmetric|continuous)$/.test(f)) {
            var I = f === "asymmetric", O = Math.min, B = E - T + 1, q = B - 1, Y = w ? O(B, 4) : 1, z = Y, N = Y, M = [];
            if (m || (z = O(1, T), N = O(1, v - E - 1)), q += z + N, q <= 1)
              return;
            for (var R = 0, V = T - z; R <= q; R++, V++)
              M[R] = d[(V < 0 ? V + v : V) % v]._point;
            for (var W = M[0]._x + 2 * M[1]._x, G = M[0]._y + 2 * M[1]._y, J = 2, j = q - 1, tt = [W], it = [G], Q = [J], nt = [], st = [], R = 1; R < q; R++) {
              var dt = R < j, gt = dt || I ? 1 : 2, pt = dt ? 4 : I ? 2 : 7, At = dt ? 4 : I ? 3 : 8, It = dt ? 2 : I ? 0 : 1, Rt = gt / J;
              J = Q[R] = pt - Rt, W = tt[R] = At * M[R]._x + It * M[R + 1]._x - Rt * W, G = it[R] = At * M[R]._y + It * M[R + 1]._y - Rt * G;
            }
            nt[j] = tt[j] / Q[j], st[j] = it[j] / Q[j];
            for (var R = q - 2; R >= 0; R--)
              nt[R] = (tt[R] - nt[R + 1]) / Q[R], st[R] = (it[R] - st[R + 1]) / Q[R];
            nt[q] = (3 * M[q]._x - nt[j]) / 2, st[q] = (3 * M[q]._y - st[j]) / 2;
            for (var R = z, Qt = q - N, V = T; R <= Qt; R++, V++) {
              var qt = d[V < 0 ? V + v : V], Xt = qt._point, Gt = nt[R] - Xt._x, ee = st[R] - Xt._y;
              (w || R < Qt) && qt.setHandleOut(Gt, ee), (w || R > z) && qt.setHandleIn(-Gt, -ee);
            }
          } else
            for (var R = T; R <= E; R++)
              d[R < 0 ? R + v : R].smooth(
                a,
                !w && R === T,
                !w && R === E
              );
        },
        toShape: function(t) {
          if (!this._closed)
            return null;
          var i = this._segments, a, f, d, v;
          function m(I, O) {
            var B = i[I], q = B.getNext(), Y = i[O], z = Y.getNext();
            return B._handleOut.isZero() && q._handleIn.isZero() && Y._handleOut.isZero() && z._handleIn.isZero() && q._point.subtract(B._point).isCollinear(
              z._point.subtract(Y._point)
            );
          }
          function p(I) {
            var O = i[I], B = O.getPrevious(), q = O.getNext();
            return B._handleOut.isZero() && O._handleIn.isZero() && O._handleOut.isZero() && q._handleIn.isZero() && O._point.subtract(B._point).isOrthogonal(
              q._point.subtract(O._point)
            );
          }
          function w(I) {
            var O = i[I], B = O.getNext(), q = O._handleOut, Y = B._handleIn, z = 0.5522847498307936;
            if (q.isOrthogonal(Y)) {
              var N = O._point, M = B._point, R = new ot(N, q, !0).intersect(
                new ot(M, Y, !0),
                !0
              );
              return R && A.isZero(q.getLength() / R.subtract(N).getLength() - z) && A.isZero(Y.getLength() / R.subtract(M).getLength() - z);
            }
            return !1;
          }
          function T(I, O) {
            return i[I]._point.getDistance(i[O]._point);
          }
          if (!this.hasHandles() && i.length === 4 && m(0, 2) && m(1, 3) && p(1) ? (a = at.Rectangle, f = new C(T(0, 3), T(0, 1)), v = i[1]._point.add(i[2]._point).divide(2)) : i.length === 8 && w(0) && w(2) && w(4) && w(6) && m(1, 5) && m(3, 7) ? (a = at.Rectangle, f = new C(T(1, 6), T(0, 3)), d = f.subtract(new C(
            T(0, 7),
            T(1, 2)
          )).divide(2), v = i[3]._point.add(i[4]._point).divide(2)) : i.length === 4 && w(0) && w(1) && w(2) && w(3) && (A.isZero(T(0, 2) - T(1, 3)) ? (a = at.Circle, d = T(0, 2) / 2) : (a = at.Ellipse, d = new C(T(2, 0) / 2, T(3, 1) / 2)), v = i[1]._point), a) {
            var E = this.getPosition(!0), L = new a({
              center: E,
              size: f,
              radius: d,
              insert: !1
            });
            return L.copyAttributes(this, !0), L._matrix.prepend(this._matrix), L.rotate(v.subtract(E).getAngle() + 90), (t === r || t) && L.insertAbove(this), L;
          }
          return null;
        },
        toPath: "#clone",
        compare: function t(i) {
          if (!i || i instanceof ae)
            return t.base.call(this, i);
          var a = this.getCurves(), f = i.getCurves(), d = a.length, v = f.length;
          if (!d || !v)
            return d == v;
          for (var m = a[0].getValues(), p = [], w = 0, T, E = 0, L, I = 0; I < v; I++) {
            var Y = f[I].getValues();
            p.push(Y);
            var O = vt.getOverlaps(m, Y);
            if (O) {
              T = !I && O[0][0] > 0 ? v - 1 : I, L = O[0][1];
              break;
            }
          }
          for (var B = Math.abs, q = 1e-8, Y = p[T], z; m && Y; ) {
            var O = vt.getOverlaps(m, Y);
            if (O) {
              var N = O[0][0];
              if (B(N - E) < q) {
                E = O[1][0], E === 1 && (m = ++w < d ? a[w].getValues() : null, E = 0);
                var M = O[0][1];
                if (B(M - L) < q) {
                  if (z || (z = [T, M]), L = O[1][1], L === 1 && (++T >= v && (T = 0), Y = p[T] || f[T].getValues(), L = 0), !m)
                    return z[0] === T && z[1] === L;
                  continue;
                }
              }
            }
            break;
          }
          return !1;
        },
        _hitTestSelf: function(t, i, a, f) {
          var d = this, v = this.getStyle(), m = this._segments, p = m.length, w = this._closed, T = i._tolerancePadding, E = T, L, I, O, B, q, Y, z = i.stroke && v.hasStroke(), N = i.fill && v.hasFill(), M = i.curves, R = z ? v.getStrokeWidth() / 2 : N && i.tolerance > 0 || M ? 0 : null;
          R !== null && (R > 0 ? (L = v.getStrokeJoin(), I = v.getStrokeCap(), O = v.getMiterLimit(), E = E.add(
            Bt._getStrokePadding(R, f)
          )) : L = I = "round");
          function V(nt, st) {
            return t.subtract(nt).divide(st).length <= 1;
          }
          function W(nt, st, dt) {
            if (!i.selected || st.isSelected()) {
              var gt = nt._point;
              if (st !== gt && (st = st.add(gt)), V(st, E))
                return new kt(dt, d, {
                  segment: nt,
                  point: st
                });
            }
          }
          function G(nt, st) {
            return (st || i.segments) && W(nt, nt._point, "segment") || !st && i.handles && (W(nt, nt._handleIn, "handle-in") || W(nt, nt._handleOut, "handle-out"));
          }
          function J(nt) {
            B.add(nt);
          }
          function j(nt) {
            var st = w || nt._index > 0 && nt._index < p - 1;
            if ((st ? L : I) === "round")
              return V(nt._point, E);
            if (B = new Bt({ internal: !0, closed: !0 }), st ? nt.isSmooth() || Bt._addBevelJoin(
              nt,
              L,
              R,
              O,
              null,
              f,
              J,
              !0
            ) : I === "square" && Bt._addSquareCap(
              nt,
              I,
              R,
              null,
              f,
              J,
              !0
            ), !B.isEmpty()) {
              var dt;
              return B.contains(t) || (dt = B.getNearestLocation(t)) && V(dt.getPoint(), T);
            }
          }
          if (i.ends && !i.segments && !w) {
            if (Y = G(m[0], !0) || G(m[p - 1], !0))
              return Y;
          } else if (i.segments || i.handles) {
            for (var tt = 0; tt < p; tt++)
              if (Y = G(m[tt]))
                return Y;
          }
          if (R !== null) {
            if (q = this.getNearestLocation(t), q) {
              var it = q.getTime();
              it === 0 || it === 1 && p > 1 ? j(q.getSegment()) || (q = null) : V(q.getPoint(), E) || (q = null);
            }
            if (!q && L === "miter" && p > 1)
              for (var tt = 0; tt < p; tt++) {
                var Q = m[tt];
                if (t.getDistance(Q._point) <= O * R && j(Q)) {
                  q = Q.getLocation();
                  break;
                }
              }
          }
          return !q && N && this._contains(t) || q && !z && !M ? new kt("fill", this) : q ? new kt(z ? "stroke" : "curve", this, {
            location: q,
            point: q.getPoint()
          }) : null;
        }
      },
      h.each(
        vt._evaluateMethods,
        function(t) {
          this[t + "At"] = function(i) {
            var a = this.getLocationAt(i);
            return a && a[t]();
          };
        },
        {
          beans: !1,
          getLocationOf: function() {
            for (var t = y.read(arguments), i = this.getCurves(), a = 0, f = i.length; a < f; a++) {
              var d = i[a].getLocationOf(t);
              if (d)
                return d;
            }
            return null;
          },
          getOffsetOf: function() {
            var t = this.getLocationOf.apply(this, arguments);
            return t ? t.getOffset() : null;
          },
          getLocationAt: function(t) {
            if (typeof t == "number") {
              for (var i = this.getCurves(), a = 0, f = 0, d = i.length; f < d; f++) {
                var v = a, m = i[f];
                if (a += m.getLength(), a > t)
                  return m.getLocationAt(t - v);
              }
              if (i.length > 0 && t <= this.getLength())
                return new $t(i[i.length - 1], 1);
            } else if (t && t.getPath && t.getPath() === this)
              return t;
            return null;
          },
          getOffsetsWithTangent: function() {
            var t = y.read(arguments);
            if (t.isZero())
              return [];
            for (var i = [], a = 0, f = this.getCurves(), d = 0, v = f.length; d < v; d++) {
              for (var m = f[d], p = m.getTimesWithTangent(t), w = 0, T = p.length; w < T; w++) {
                var E = a + m.getOffsetAtTime(p[w]);
                i.indexOf(E) < 0 && i.push(E);
              }
              a += m.length;
            }
            return i;
          }
        }
      ),
      new function() {
        function t(a, f, d, v) {
          if (v <= 0)
            return;
          var m = v / 2, p = v - 2, w = m - 1, T = new Array(6), E, L;
          function I(N) {
            var M = T[N], R = T[N + 1];
            (E != M || L != R) && (a.beginPath(), a.moveTo(E, L), a.lineTo(M, R), a.stroke(), a.beginPath(), a.arc(M, R, m, 0, Math.PI * 2, !0), a.fill());
          }
          for (var O = 0, B = f.length; O < B; O++) {
            var q = f[O], Y = q._selection;
            if (q._transformCoordinates(d, T), E = T[0], L = T[1], Y & 2 && I(2), Y & 4 && I(4), a.fillRect(E - m, L - m, v, v), p > 0 && !(Y & 1)) {
              var z = a.fillStyle;
              a.fillStyle = "#ffffff", a.fillRect(E - w, L - w, p, p), a.fillStyle = z;
            }
          }
        }
        function i(a, f, d) {
          var v = f._segments, m = v.length, p = new Array(6), w = !0, T, E, L, I, O, B, q, Y;
          function z(M) {
            if (d)
              M._transformCoordinates(d, p), T = p[0], E = p[1];
            else {
              var R = M._point;
              T = R._x, E = R._y;
            }
            if (w)
              a.moveTo(T, E), w = !1;
            else {
              if (d)
                O = p[2], B = p[3];
              else {
                var V = M._handleIn;
                O = T + V._x, B = E + V._y;
              }
              O === T && B === E && q === L && Y === I ? a.lineTo(T, E) : a.bezierCurveTo(q, Y, O, B, T, E);
            }
            if (L = T, I = E, d)
              q = p[4], Y = p[5];
            else {
              var V = M._handleOut;
              q = L + V._x, Y = I + V._y;
            }
          }
          for (var N = 0; N < m; N++)
            z(v[N]);
          f._closed && m > 0 && z(v[0]);
        }
        return {
          _draw: function(a, f, d, v) {
            var m = f.dontStart, p = f.dontFinish || f.clip, w = this.getStyle(), T = w.hasFill(), E = w.hasStroke(), L = w.getDashArray(), I = !ce.support.nativeDash && E && L && L.length;
            m || a.beginPath(), (T || E && !I || p) && (i(a, this, v), this._closed && a.closePath());
            function O(M) {
              return L[(M % I + I) % I];
            }
            if (!p && (T || E) && (this._setStyles(a, f, d), T && (a.fill(w.getFillRule()), a.shadowColor = "rgba(0,0,0,0)"), E)) {
              if (I) {
                m || a.beginPath();
                for (var B = new he(
                  this,
                  0.25,
                  32,
                  !1,
                  v
                ), q = B.length, Y = -w.getDashOffset(), z, N = 0; Y > 0; )
                  Y -= O(N--) + O(N--);
                for (; Y < q; )
                  z = Y + O(N++), (Y > 0 || z > 0) && B.drawPart(
                    a,
                    Math.max(Y, 0),
                    Math.max(z, 0)
                  ), Y = z + O(N++);
              }
              a.stroke();
            }
          },
          _drawSelected: function(a, f) {
            a.beginPath(), i(a, this, f), a.stroke(), t(a, this._segments, f, ce.settings.handleSize);
          }
        };
      }(),
      new function() {
        function t(i) {
          var a = i._segments;
          if (!a.length)
            throw new Error("Use a moveTo() command first");
          return a[a.length - 1];
        }
        return {
          moveTo: function() {
            var i = this._segments;
            i.length === 1 && this.removeSegment(0), i.length || this._add([new bt(y.read(arguments))]);
          },
          moveBy: function() {
            throw new Error("moveBy() is unsupported on Path items.");
          },
          lineTo: function() {
            this._add([new bt(y.read(arguments))]);
          },
          cubicCurveTo: function() {
            var i = arguments, a = y.read(i), f = y.read(i), d = y.read(i), v = t(this);
            v.setHandleOut(a.subtract(v._point)), this._add([new bt(d, f.subtract(d))]);
          },
          quadraticCurveTo: function() {
            var i = arguments, a = y.read(i), f = y.read(i), d = t(this)._point;
            this.cubicCurveTo(
              a.add(d.subtract(a).multiply(1 / 3)),
              a.add(f.subtract(a).multiply(1 / 3)),
              f
            );
          },
          curveTo: function() {
            var i = arguments, a = y.read(i), f = y.read(i), d = h.pick(h.read(i), 0.5), v = 1 - d, m = t(this)._point, p = a.subtract(m.multiply(v * v)).subtract(f.multiply(d * d)).divide(2 * d * v);
            if (p.isNaN())
              throw new Error(
                "Cannot put a curve through points with parameter = " + d
              );
            this.quadraticCurveTo(p, f);
          },
          arcTo: function() {
            var i = arguments, a = Math.abs, f = Math.sqrt, d = t(this), v = d._point, m = y.read(i), p, w = h.peek(i), T = h.pick(w, !0), E, L, I, O;
            if (typeof T == "boolean")
              var B = v.add(m).divide(2), p = B.add(B.subtract(v).rotate(
                T ? -90 : 90
              ));
            else if (h.remain(i) <= 2)
              p = m, m = y.read(i);
            else if (!v.equals(m)) {
              var q = C.read(i), Y = A.isZero;
              if (Y(q.width) || Y(q.height))
                return this.lineTo(m);
              var z = h.read(i), T = !!h.read(i), N = !!h.read(i), B = v.add(m).divide(2), M = v.subtract(B).rotate(-z), R = M.x, V = M.y, W = a(q.width), G = a(q.height), J = W * W, j = G * G, tt = R * R, it = V * V, Q = f(tt / J + it / j);
              if (Q > 1 && (W *= Q, G *= Q, J = W * W, j = G * G), Q = (J * j - J * it - j * tt) / (J * it + j * tt), a(Q) < 1e-12 && (Q = 0), Q < 0)
                throw new Error(
                  "Cannot create an arc with the given arguments"
                );
              E = new y(W * V / G, -G * R / W).multiply((N === T ? -1 : 1) * f(Q)).rotate(z).add(B), O = new K().translate(E).rotate(z).scale(W, G), I = O._inverseTransform(v), L = I.getDirectedAngle(O._inverseTransform(m)), !T && L > 0 ? L -= 360 : T && L < 0 && (L += 360);
            }
            if (p) {
              var nt = new ot(
                v.add(p).divide(2),
                p.subtract(v).rotate(90),
                !0
              ), st = new ot(
                p.add(m).divide(2),
                m.subtract(p).rotate(90),
                !0
              ), dt = new ot(v, m), gt = dt.getSide(p);
              if (E = nt.intersect(st, !0), !E) {
                if (!gt)
                  return this.lineTo(m);
                throw new Error(
                  "Cannot create an arc with the given arguments"
                );
              }
              I = v.subtract(E), L = I.getDirectedAngle(m.subtract(E));
              var pt = dt.getSide(E, !0);
              pt === 0 ? L = gt * a(L) : gt === pt && (L += L < 0 ? 360 : -360);
            }
            if (L) {
              for (var At = 1e-5, It = a(L), Rt = It >= 360 ? 4 : Math.ceil((It - At) / 90), Qt = L / Rt, qt = Qt * Math.PI / 360, Xt = 4 / 3 * Math.sin(qt) / (1 + Math.cos(qt)), Gt = [], ee = 0; ee <= Rt; ee++) {
                var M = m, Jt = null;
                if (ee < Rt && (Jt = I.rotate(90).multiply(Xt), O ? (M = O._transformPoint(I), Jt = O._transformPoint(I.add(Jt)).subtract(M)) : M = E.add(I)), !ee)
                  d.setHandleOut(Jt);
                else {
                  var Pe = I.rotate(-90).multiply(Xt);
                  O && (Pe = O._transformPoint(I.add(Pe)).subtract(M)), Gt.push(new bt(M, Pe, Jt));
                }
                I = I.rotate(Qt);
              }
              this._add(Gt);
            }
          },
          lineBy: function() {
            var i = y.read(arguments), a = t(this)._point;
            this.lineTo(a.add(i));
          },
          curveBy: function() {
            var i = arguments, a = y.read(i), f = y.read(i), d = h.read(i), v = t(this)._point;
            this.curveTo(v.add(a), v.add(f), d);
          },
          cubicCurveBy: function() {
            var i = arguments, a = y.read(i), f = y.read(i), d = y.read(i), v = t(this)._point;
            this.cubicCurveTo(
              v.add(a),
              v.add(f),
              v.add(d)
            );
          },
          quadraticCurveBy: function() {
            var i = arguments, a = y.read(i), f = y.read(i), d = t(this)._point;
            this.quadraticCurveTo(d.add(a), d.add(f));
          },
          arcBy: function() {
            var i = arguments, a = t(this)._point, f = a.add(y.read(i)), d = h.pick(h.peek(i), !0);
            typeof d == "boolean" ? this.arcTo(f, d) : this.arcTo(f, a.add(y.read(i)));
          },
          closePath: function(i) {
            this.setClosed(!0), this.join(this, i);
          }
        };
      }(),
      {
        _getBounds: function(t, i) {
          var a = i.handle ? "getHandleBounds" : i.stroke ? "getStrokeBounds" : "getBounds";
          return Bt[a](this._segments, this._closed, this, t, i);
        },
        statics: {
          getBounds: function(t, i, a, f, d, v) {
            var m = t[0];
            if (!m)
              return new $();
            var p = new Array(6), w = m._transformCoordinates(f, new Array(6)), T = w.slice(0, 2), E = T.slice(), L = new Array(2);
            function I(q) {
              q._transformCoordinates(f, p);
              for (var Y = 0; Y < 2; Y++)
                vt._addBounds(
                  w[Y],
                  w[Y + 4],
                  p[Y + 2],
                  p[Y],
                  Y,
                  v ? v[Y] : 0,
                  T,
                  E,
                  L
                );
              var z = w;
              w = p, p = z;
            }
            for (var O = 1, B = t.length; O < B; O++)
              I(t[O]);
            return i && I(m), new $(T[0], T[1], E[0] - T[0], E[1] - T[1]);
          },
          getStrokeBounds: function(t, i, a, f, d) {
            var v = a.getStyle(), m = v.hasStroke(), p = v.getStrokeWidth(), w = m && a._getStrokeMatrix(f, d), T = m && Bt._getStrokePadding(
              p,
              w
            ), E = Bt.getBounds(
              t,
              i,
              a,
              f,
              d,
              T
            );
            if (!m)
              return E;
            var L = p / 2, I = v.getStrokeJoin(), O = v.getStrokeCap(), B = v.getMiterLimit(), q = new $(new C(T));
            function Y(W) {
              E = E.include(W);
            }
            function z(W) {
              E = E.unite(
                q.setCenter(W._point.transform(f))
              );
            }
            function N(W, G) {
              G === "round" || W.isSmooth() ? z(W) : Bt._addBevelJoin(
                W,
                G,
                L,
                B,
                f,
                w,
                Y
              );
            }
            function M(W, G) {
              G === "round" ? z(W) : Bt._addSquareCap(
                W,
                G,
                L,
                f,
                w,
                Y
              );
            }
            var R = t.length - (i ? 0 : 1);
            if (R > 0) {
              for (var V = 1; V < R; V++)
                N(t[V], I);
              i ? N(t[0], I) : (M(t[0], O), M(t[t.length - 1], O));
            }
            return E;
          },
          _getStrokePadding: function(t, i) {
            if (!i)
              return [t, t];
            var a = new y(t, 0).transform(i), f = new y(0, t).transform(i), d = a.getAngleInRadians(), v = a.getLength(), m = f.getLength(), p = Math.sin(d), w = Math.cos(d), T = Math.tan(d), E = Math.atan2(m * T, v), L = Math.atan2(m, T * v);
            return [
              Math.abs(v * Math.cos(E) * w + m * Math.sin(E) * p),
              Math.abs(m * Math.sin(L) * w + v * Math.cos(L) * p)
            ];
          },
          _addBevelJoin: function(t, i, a, f, d, v, m, p) {
            var w = t.getCurve(), T = w.getPrevious(), E = w.getPoint1().transform(d), L = T.getNormalAtTime(1).multiply(a).transform(v), I = w.getNormalAtTime(0).multiply(a).transform(v), O = L.getDirectedAngle(I);
            if ((O < 0 || O >= 180) && (L = L.negate(), I = I.negate()), p && m(E), m(E.add(L)), i === "miter") {
              var B = new ot(
                E.add(L),
                new y(-L.y, L.x),
                !0
              ).intersect(new ot(
                E.add(I),
                new y(-I.y, I.x),
                !0
              ), !0);
              B && E.getDistance(B) <= f * a && m(B);
            }
            m(E.add(I));
          },
          _addSquareCap: function(t, i, a, f, d, v, m) {
            var p = t._point.transform(f), w = t.getLocation(), T = w.getNormal().multiply(w.getTime() === 0 ? a : -a).transform(d);
            i === "square" && (m && (v(p.subtract(T)), v(p.add(T))), p = p.add(T.rotate(-90))), v(p.add(T)), v(p.subtract(T));
          },
          getHandleBounds: function(t, i, a, f, d) {
            var v = a.getStyle(), m = d.stroke && v.hasStroke(), p, w;
            if (m) {
              var T = a._getStrokeMatrix(f, d), E = v.getStrokeWidth() / 2, L = E;
              v.getStrokeJoin() === "miter" && (L = E * v.getMiterLimit()), v.getStrokeCap() === "square" && (L = Math.max(L, E * Math.SQRT2)), p = Bt._getStrokePadding(E, T), w = Bt._getStrokePadding(L, T);
            }
            for (var I = new Array(6), O = 1 / 0, B = -O, q = O, Y = B, z = 0, N = t.length; z < N; z++) {
              var M = t[z];
              M._transformCoordinates(f, I);
              for (var R = 0; R < 6; R += 2) {
                var V = R ? p : w, W = V ? V[0] : 0, G = V ? V[1] : 0, J = I[R], j = I[R + 1], tt = J - W, it = J + W, Q = j - G, nt = j + G;
                tt < O && (O = tt), it > B && (B = it), Q < q && (q = Q), nt > Y && (Y = nt);
              }
            }
            return new $(O, q, B - O, Y - q);
          }
        }
      }
    );
    Bt.inject({ statics: new function() {
      var t = 0.5522847498307936, i = [
        new bt([-1, 0], [0, t], [0, -t]),
        new bt([0, -1], [-t, 0], [t, 0]),
        new bt([1, 0], [0, -t], [0, t]),
        new bt([0, 1], [t, 0], [-t, 0])
      ];
      function a(d, v, m) {
        var p = h.getNamed(m), w = new Bt(p && (p.insert == !0 ? ct.INSERT : p.insert == !1 ? ct.NO_INSERT : null));
        return w._add(d), w._closed = v, w.set(p, ct.INSERT);
      }
      function f(d, v, m) {
        for (var p = new Array(4), w = 0; w < 4; w++) {
          var T = i[w];
          p[w] = new bt(
            T._point.multiply(v).add(d),
            T._handleIn.multiply(v),
            T._handleOut.multiply(v)
          );
        }
        return a(p, !0, m);
      }
      return {
        Line: function() {
          var d = arguments;
          return a([
            new bt(y.readNamed(d, "from")),
            new bt(y.readNamed(d, "to"))
          ], !1, d);
        },
        Circle: function() {
          var d = arguments, v = y.readNamed(d, "center"), m = h.readNamed(d, "radius");
          return f(v, new C(m), d);
        },
        Rectangle: function() {
          var d = arguments, v = $.readNamed(d, "rectangle"), m = C.readNamed(
            d,
            "radius",
            0,
            { readNull: !0 }
          ), p = v.getBottomLeft(!0), w = v.getTopLeft(!0), T = v.getTopRight(!0), E = v.getBottomRight(!0), L;
          if (!m || m.isZero())
            L = [
              new bt(p),
              new bt(w),
              new bt(T),
              new bt(E)
            ];
          else {
            m = C.min(m, v.getSize(!0).divide(2));
            var I = m.width, O = m.height, B = I * t, q = O * t;
            L = [
              new bt(p.add(I, 0), null, [-B, 0]),
              new bt(p.subtract(0, O), [0, q]),
              new bt(w.add(0, O), null, [0, -q]),
              new bt(w.add(I, 0), [-B, 0], null),
              new bt(T.subtract(I, 0), null, [B, 0]),
              new bt(T.add(0, O), [0, -q], null),
              new bt(E.subtract(0, O), null, [0, q]),
              new bt(E.subtract(I, 0), [B, 0])
            ];
          }
          return a(L, !0, d);
        },
        RoundRectangle: "#Rectangle",
        Ellipse: function() {
          var d = arguments, v = at._readEllipse(d);
          return f(v.center, v.radius, d);
        },
        Oval: "#Ellipse",
        Arc: function() {
          var d = arguments, v = y.readNamed(d, "from"), m = y.readNamed(d, "through"), p = y.readNamed(d, "to"), w = h.getNamed(d), T = new Bt(w && w.insert == !1 && ct.NO_INSERT);
          return T.moveTo(v), T.arcTo(m, p), T.set(w);
        },
        RegularPolygon: function() {
          for (var d = arguments, v = y.readNamed(d, "center"), m = h.readNamed(d, "sides"), p = h.readNamed(d, "radius"), w = 360 / m, T = m % 3 === 0, E = new y(0, T ? -p : p), L = T ? -1 : 0.5, I = new Array(m), O = 0; O < m; O++)
            I[O] = new bt(v.add(
              E.rotate((O + L) * w)
            ));
          return a(I, !0, d);
        },
        Star: function() {
          for (var d = arguments, v = y.readNamed(d, "center"), m = h.readNamed(d, "points") * 2, p = h.readNamed(d, "radius1"), w = h.readNamed(d, "radius2"), T = 360 / m, E = new y(0, -1), L = new Array(m), I = 0; I < m; I++)
            L[I] = new bt(v.add(E.rotate(T * I).multiply(I % 2 ? w : p)));
          return a(L, !0, d);
        }
      };
    }() });
    var ae = Yt.extend(
      {
        _class: "CompoundPath",
        _serializeFields: {
          children: []
        },
        beans: !0,
        initialize: function(i) {
          this._children = [], this._namedChildren = {}, this._initialize(i) || (typeof i == "string" ? this.setPathData(i) : this.addChildren(Array.isArray(i) ? i : arguments));
        },
        insertChildren: function t(i, a) {
          var f = a, d = f[0];
          d && typeof d[0] == "number" && (f = [f]);
          for (var v = a.length - 1; v >= 0; v--) {
            var m = f[v];
            f === a && !(m instanceof Bt) && (f = h.slice(f)), Array.isArray(m) ? f[v] = new Bt({ segments: m, insert: !1 }) : m instanceof ae && (f.splice.apply(f, [v, 1].concat(m.removeChildren())), m.remove());
          }
          return t.base.call(this, i, f);
        },
        reduce: function t(i) {
          for (var a = this._children, f = a.length - 1; f >= 0; f--) {
            var d = a[f].reduce(i);
            d.isEmpty() && d.remove();
          }
          if (!a.length) {
            var d = new Bt(ct.NO_INSERT);
            return d.copyAttributes(this), d.insertAbove(this), this.remove(), d;
          }
          return t.base.call(this);
        },
        isClosed: function() {
          for (var t = this._children, i = 0, a = t.length; i < a; i++)
            if (!t[i]._closed)
              return !1;
          return !0;
        },
        setClosed: function(t) {
          for (var i = this._children, a = 0, f = i.length; a < f; a++)
            i[a].setClosed(t);
        },
        getFirstSegment: function() {
          var t = this.getFirstChild();
          return t && t.getFirstSegment();
        },
        getLastSegment: function() {
          var t = this.getLastChild();
          return t && t.getLastSegment();
        },
        getCurves: function() {
          for (var t = this._children, i = [], a = 0, f = t.length; a < f; a++)
            h.push(i, t[a].getCurves());
          return i;
        },
        getFirstCurve: function() {
          var t = this.getFirstChild();
          return t && t.getFirstCurve();
        },
        getLastCurve: function() {
          var t = this.getLastChild();
          return t && t.getLastCurve();
        },
        getArea: function() {
          for (var t = this._children, i = 0, a = 0, f = t.length; a < f; a++)
            i += t[a].getArea();
          return i;
        },
        getLength: function() {
          for (var t = this._children, i = 0, a = 0, f = t.length; a < f; a++)
            i += t[a].getLength();
          return i;
        },
        getPathData: function(t, i) {
          for (var a = this._children, f = [], d = 0, v = a.length; d < v; d++) {
            var m = a[d], p = m._matrix;
            f.push(m.getPathData(t && !p.isIdentity() ? t.appended(p) : t, i));
          }
          return f.join("");
        },
        _hitTestChildren: function t(i, a, f) {
          return t.base.call(
            this,
            i,
            a.class === Bt || a.type === "path" ? a : h.set({}, a, { fill: !1 }),
            f
          );
        },
        _draw: function(t, i, a, f) {
          var d = this._children;
          if (d.length) {
            i = i.extend({ dontStart: !0, dontFinish: !0 }), t.beginPath();
            for (var v = 0, m = d.length; v < m; v++)
              d[v].draw(t, i, f);
            if (!i.clip) {
              this._setStyles(t, i, a);
              var p = this._style;
              p.hasFill() && (t.fill(p.getFillRule()), t.shadowColor = "rgba(0,0,0,0)"), p.hasStroke() && t.stroke();
            }
          }
        },
        _drawSelected: function(t, i, a) {
          for (var f = this._children, d = 0, v = f.length; d < v; d++) {
            var m = f[d], p = m._matrix;
            a[m._id] || m._drawSelected(t, p.isIdentity() ? i : i.appended(p));
          }
        }
      },
      new function() {
        function t(i, a) {
          var f = i._children;
          if (a && !f.length)
            throw new Error("Use a moveTo() command first");
          return f[f.length - 1];
        }
        return h.each(
          [
            "lineTo",
            "cubicCurveTo",
            "quadraticCurveTo",
            "curveTo",
            "arcTo",
            "lineBy",
            "cubicCurveBy",
            "quadraticCurveBy",
            "curveBy",
            "arcBy"
          ],
          function(i) {
            this[i] = function() {
              var a = t(this, !0);
              a[i].apply(a, arguments);
            };
          },
          {
            moveTo: function() {
              var i = t(this), a = i && i.isEmpty() ? i : new Bt(ct.NO_INSERT);
              a !== i && this.addChild(a), a.moveTo.apply(a, arguments);
            },
            moveBy: function() {
              var i = t(this, !0), a = i && i.getLastSegment(), f = y.read(arguments);
              this.moveTo(a ? f.add(a._point) : f);
            },
            closePath: function(i) {
              t(this, !0).closePath(i);
            }
          }
        );
      }(),
      h.each(["reverse", "flatten", "simplify", "smooth"], function(t) {
        this[t] = function(i) {
          for (var a = this._children, f, d = 0, v = a.length; d < v; d++)
            f = a[d][t](i) || f;
          return f;
        };
      }, {})
    );
    Yt.inject(new function() {
      var t = Math.min, i = Math.max, a = Math.abs, f = {
        unite: { 1: !0, 2: !0 },
        intersect: { 2: !0 },
        subtract: { 1: !0 },
        exclude: { 1: !0, "-1": !0 }
      };
      function d(z) {
        return z._children || [z];
      }
      function v(z, N) {
        var M = z.clone(!1).reduce({ simplify: !0 }).transform(null, !0, !0);
        if (N) {
          for (var R = d(M), V = 0, W = R.length; V < W; V++) {
            var z = R[V];
            !z._closed && !z.isEmpty() && (z.closePath(1e-12), z.getFirstSegment().setHandleIn(0, 0), z.getLastSegment().setHandleOut(0, 0));
          }
          M = M.resolveCrossings().reorient(M.getFillRule() === "nonzero", !0);
        }
        return M;
      }
      function m(z, N, M, R, V) {
        var W = new ae(ct.NO_INSERT);
        return W.addChildren(z, !0), W = W.reduce({ simplify: N }), V && V.insert == !1 || W.insertAbove(R && M.isSibling(R) && M.getIndex() < R.getIndex() ? R : M), W.copyAttributes(M, !0), W;
      }
      function p(z) {
        return z.hasOverlap() || z.isCrossing();
      }
      function w(z, N, M, R) {
        if (R && (R.trace == !1 || R.stroke) && /^(subtract|intersect)$/.test(M))
          return T(z, N, M);
        var V = v(z, !0), W = N && z !== N && v(N, !0), G = f[M];
        G[M] = !0, W && (G.subtract || G.exclude) ^ (W.isClockwise() ^ V.isClockwise()) && W.reverse();
        var J = O($t.expand(
          V.getIntersections(W, p)
        )), j = d(V), tt = W && d(W), it = [], Q = [], nt;
        function st(Jt) {
          for (var Pe = 0, ue = Jt.length; Pe < ue; Pe++) {
            var fe = Jt[Pe];
            h.push(it, fe._segments), h.push(Q, fe.getCurves()), fe._overlapsOnly = !0;
          }
        }
        function dt(Jt) {
          for (var Pe = [], ue = 0, fe = Jt && Jt.length; ue < fe; ue++)
            Pe.push(Q[Jt[ue]]);
          return Pe;
        }
        if (J.length) {
          st(j), tt && st(tt);
          for (var gt = new Array(Q.length), pt = 0, At = Q.length; pt < At; pt++)
            gt[pt] = Q[pt].getValues();
          for (var It = x.findCurveBoundsCollisions(
            gt,
            gt,
            0,
            !0
          ), Rt = {}, pt = 0; pt < Q.length; pt++) {
            var Qt = Q[pt], qt = Qt._path._id, Xt = Rt[qt] = Rt[qt] || {};
            Xt[Qt.getIndex()] = {
              hor: dt(It[pt].hor),
              ver: dt(It[pt].ver)
            };
          }
          for (var pt = 0, At = J.length; pt < At; pt++)
            q(
              J[pt]._segment,
              V,
              W,
              Rt,
              G
            );
          for (var pt = 0, At = it.length; pt < At; pt++) {
            var Gt = it[pt], ee = Gt._intersection;
            Gt._winding || q(
              Gt,
              V,
              W,
              Rt,
              G
            ), ee && ee._overlap || (Gt._path._overlapsOnly = !1);
          }
          nt = Y(it, G);
        } else
          nt = I(
            tt ? j.concat(tt) : j.slice(),
            function(Jt) {
              return !!G[Jt];
            }
          );
        return m(nt, !0, z, N, R);
      }
      function T(z, N, M) {
        var R = v(z), V = v(N), W = R.getIntersections(V, p), G = M === "subtract", J = M === "divide", j = {}, tt = [];
        function it(st) {
          if (!j[st._id] && (J || V.contains(st.getPointAt(st.getLength() / 2)) ^ G))
            return tt.unshift(st), j[st._id] = !0;
        }
        for (var Q = W.length - 1; Q >= 0; Q--) {
          var nt = W[Q].split();
          nt && (it(nt) && nt.getFirstSegment().setHandleIn(0, 0), R.getLastSegment().setHandleOut(0, 0));
        }
        return it(R), m(tt, !1, z, N);
      }
      function E(z, N) {
        for (var M = z; M; ) {
          if (M === N)
            return;
          M = M._previous;
        }
        for (; z._next && z._next !== N; )
          z = z._next;
        if (!z._next) {
          for (; N._previous; )
            N = N._previous;
          z._next = N, N._previous = z;
        }
      }
      function L(z) {
        for (var N = z.length - 1; N >= 0; N--)
          z[N].clearHandles();
      }
      function I(z, N, M) {
        var R = z && z.length;
        if (R) {
          var V = h.each(z, function(It, Rt) {
            this[It._id] = {
              container: null,
              winding: It.isClockwise() ? 1 : -1,
              index: Rt
            };
          }, {}), W = z.slice().sort(function(It, Rt) {
            return a(Rt.getArea()) - a(It.getArea());
          }), G = W[0], J = x.findItemBoundsCollisions(
            W,
            null,
            A.GEOMETRIC_EPSILON
          );
          M == null && (M = G.isClockwise());
          for (var j = 0; j < R; j++) {
            var tt = W[j], it = V[tt._id], Q = 0, nt = J[j];
            if (nt) {
              for (var st = null, dt = nt.length - 1; dt >= 0; dt--)
                if (nt[dt] < j) {
                  st = st || tt.getInteriorPoint();
                  var gt = W[nt[dt]];
                  if (gt.contains(st)) {
                    var pt = V[gt._id];
                    Q = pt.winding, it.winding += Q, it.container = pt.exclude ? pt.container : gt;
                    break;
                  }
                }
            }
            if (N(it.winding) === N(Q))
              it.exclude = !0, z[it.index] = null;
            else {
              var At = it.container;
              tt.setClockwise(
                At ? !At.isClockwise() : M
              );
            }
          }
        }
        return z;
      }
      function O(z, N, M) {
        var R = N && [], V = 1e-8, W = 1 - V, G = !1, J = M || [], j = M && {}, tt, it, Q;
        function nt(Pe) {
          return Pe._path._id + "." + Pe._segment1._index;
        }
        for (var st = (M && M.length) - 1; st >= 0; st--) {
          var dt = M[st];
          dt._path && (j[nt(dt)] = !0);
        }
        for (var st = z.length - 1; st >= 0; st--) {
          var gt = z[st], pt = gt._time, At = pt, It = N && !N(gt), dt = gt._curve, Rt;
          if (dt && (dt !== it ? (G = !dt.hasHandles() || j && j[nt(dt)], tt = [], Q = null, it = dt) : Q >= V && (pt /= Q)), It) {
            tt && tt.push(gt);
            continue;
          } else
            N && R.unshift(gt);
          if (Q = At, pt < V)
            Rt = dt._segment1;
          else if (pt > W)
            Rt = dt._segment2;
          else {
            var Qt = dt.divideAtTime(pt, !0);
            G && J.push(dt, Qt), Rt = Qt._segment1;
            for (var qt = tt.length - 1; qt >= 0; qt--) {
              var Xt = tt[qt];
              Xt._time = (Xt._time - pt) / (1 - pt);
            }
          }
          gt._setSegment(Rt);
          var Gt = Rt._intersection, ee = gt._intersection;
          if (Gt) {
            E(Gt, ee);
            for (var Jt = Gt; Jt; )
              E(Jt._intersection, Gt), Jt = Jt._next;
          } else
            Rt._intersection = ee;
        }
        return M || L(J), R || z;
      }
      function B(z, N, M, R, V) {
        var W = Array.isArray(N) ? N : N[M ? "hor" : "ver"], G = M ? 1 : 0, J = G ^ 1, j = [z.x, z.y], tt = j[G], it = j[J], Q = 1e-9, nt = 1e-6, st = tt - Q, dt = tt + Q, gt = 0, pt = 0, At = 0, It = 0, Rt = !1, Qt = !1, qt = 1, Xt = [], Gt, ee;
        function Jt(De) {
          var Ke = De[J + 0], Tn = De[J + 6];
          if (!(it < t(Ke, Tn) || it > i(Ke, Tn))) {
            var je = De[G + 0], Kn = De[G + 2], wi = De[G + 4], $n = De[G + 6];
            if (Ke === Tn) {
              (je < dt && $n > st || $n < dt && je > st) && (Rt = !0);
              return;
            }
            var Vn = it === Ke ? 0 : it === Tn || st > i(je, Kn, wi, $n) || dt < t(je, Kn, wi, $n) ? 1 : vt.solveCubic(De, J, it, Xt, 0, 1) > 0 ? Xt[0] : 1, mn = Vn === 0 ? je : Vn === 1 ? $n : vt.getPoint(De, Vn)[M ? "y" : "x"], En = Ke > Tn ? 1 : -1, xi = Gt[J] > Gt[J + 6] ? 1 : -1, An = Gt[G + 6];
            return it !== Ke ? (mn < st ? At += En : mn > dt ? It += En : Rt = !0, mn > tt - nt && mn < tt + nt && (qt /= 2)) : (En !== xi ? je < st ? At += En : je > dt && (It += En) : je != An && (An < dt && mn > dt ? (It += En, Rt = !0) : An > st && mn < st && (At += En, Rt = !0)), qt /= 4), Gt = De, !V && mn > st && mn < dt && vt.getTangent(De, Vn)[M ? "x" : "y"] === 0 && B(z, N, !M, R, !0);
          }
        }
        function Pe(De) {
          var Ke = De[J + 0], Tn = De[J + 2], je = De[J + 4], Kn = De[J + 6];
          if (it <= i(Ke, Tn, je, Kn) && it >= t(Ke, Tn, je, Kn)) {
            for (var wi = De[G + 0], $n = De[G + 2], Vn = De[G + 4], mn = De[G + 6], En = st > i(wi, $n, Vn, mn) || dt < t(wi, $n, Vn, mn) ? [De] : vt.getMonoCurves(De, M), xi, An = 0, gr = En.length; An < gr; An++)
              if (xi = Jt(En[An]))
                return xi;
          }
        }
        for (var ue = 0, fe = W.length; ue < fe; ue++) {
          var ie = W[ue], ve = ie._path, hn = ie.getValues(), sn;
          if ((!ue || W[ue - 1]._path !== ve) && (Gt = null, ve._closed || (ee = vt.getValues(
            ve.getLastCurve().getSegment2(),
            ie.getSegment1(),
            null,
            !R
          ), ee[J] !== ee[J + 6] && (Gt = ee)), !Gt)) {
            Gt = hn;
            for (var an = ve.getLastCurve(); an && an !== ie; ) {
              var Ze = an.getValues();
              if (Ze[J] !== Ze[J + 6]) {
                Gt = Ze;
                break;
              }
              an = an.getPrevious();
            }
          }
          if (sn = Pe(hn))
            return sn;
          if (ue + 1 === fe || W[ue + 1]._path !== ve) {
            if (ee && (sn = Pe(ee)))
              return sn;
            Rt && !At && !It && (At = It = ve.isClockwise(R) ^ M ? 1 : -1), gt += At, pt += It, At = It = 0, Rt && (Qt = !0, Rt = !1), ee = null;
          }
        }
        return gt = a(gt), pt = a(pt), {
          winding: i(gt, pt),
          windingL: gt,
          windingR: pt,
          quality: qt,
          onPath: Qt
        };
      }
      function q(z, N, M, R, V) {
        var W = [], G = z, J = 0, Q;
        do {
          var j = z.getCurve();
          if (j) {
            var tt = j.getLength();
            W.push({ segment: z, curve: j, length: tt }), J += tt;
          }
          z = z.getNext();
        } while (z && !z._intersection && z !== G);
        for (var it = [0.5, 0.25, 0.75], Q = { winding: 0, quality: -1 }, nt = 1e-3, st = 1 - nt, dt = 0; dt < it.length && Q.quality < 0.5; dt++)
          for (var tt = J * it[dt], gt = 0, pt = W.length; gt < pt; gt++) {
            var At = W[gt], It = At.length;
            if (tt <= It) {
              var j = At.curve, Rt = j._path, Qt = Rt._parent, qt = Qt instanceof ae ? Qt : Rt, Xt = A.clamp(j.getTimeAt(tt), nt, st), Gt = j.getPointAtTime(Xt), ee = a(j.getTangentAtTime(Xt).y) < Math.SQRT1_2, Jt = null;
              if (V.subtract && M) {
                var Pe = qt === N ? M : N, ue = Pe._getWinding(Gt, ee, !0);
                if (qt === N && ue.winding || qt === M && !ue.winding) {
                  if (ue.quality < 1)
                    continue;
                  Jt = { winding: 0, quality: 1 };
                }
              }
              Jt = Jt || B(
                Gt,
                R[Rt._id][j.getIndex()],
                ee,
                !0
              ), Jt.quality > Q.quality && (Q = Jt);
              break;
            }
            tt -= It;
          }
        for (var gt = W.length - 1; gt >= 0; gt--)
          W[gt].segment._winding = Q;
      }
      function Y(z, N) {
        var M = [], R;
        function V(fe) {
          var ie;
          return !!(fe && !fe._visited && (!N || N[(ie = fe._winding || {}).winding] && !(N.unite && ie.winding === 2 && ie.windingL && ie.windingR)));
        }
        function W(fe) {
          if (fe) {
            for (var ie = 0, ve = R.length; ie < ve; ie++)
              if (fe === R[ie])
                return !0;
          }
          return !1;
        }
        function G(fe) {
          for (var ie = fe._segments, ve = 0, hn = ie.length; ve < hn; ve++)
            ie[ve]._visited = !0;
        }
        function J(fe, ie) {
          var ve = fe._intersection, hn = ve, sn = [];
          ie && (R = [fe]);
          function an(Ze, De) {
            for (; Ze && Ze !== De; ) {
              var Ke = Ze._segment, Tn = Ke && Ke._path;
              if (Tn) {
                var je = Ke.getNext() || Tn.getFirstSegment(), Kn = je._intersection;
                Ke !== fe && (W(Ke) || W(je) || je && V(Ke) && (V(je) || Kn && V(Kn._segment))) && sn.push(Ke), ie && R.push(Ke);
              }
              Ze = Ze._next;
            }
          }
          if (ve) {
            for (an(ve); ve && ve._previous; )
              ve = ve._previous;
            an(ve, hn);
          }
          return sn;
        }
        z.sort(function(fe, ie) {
          var ve = fe._intersection, hn = ie._intersection, sn = !!(ve && ve._overlap), an = !!(hn && hn._overlap), Ze = fe._path, De = ie._path;
          return sn ^ an ? sn ? 1 : -1 : !ve ^ !hn ? ve ? 1 : -1 : Ze !== De ? Ze._id - De._id : fe._index - ie._index;
        });
        for (var j = 0, tt = z.length; j < tt; j++) {
          var it = z[j], Q = V(it), nt = null, st = !1, dt = !0, gt = [], pt, At, It;
          if (Q && it._path._overlapsOnly) {
            var Rt = it._path, Qt = it._intersection._segment._path;
            Rt.compare(Qt) && (Rt.getArea() && M.push(Rt.clone(!1)), G(Rt), G(Qt), Q = !1);
          }
          for (; Q; ) {
            var qt = !nt, Xt = J(it, qt), Gt = Xt.shift(), st = !qt && (W(it) || W(Gt)), ee = !st && Gt;
            if (qt && (nt = new Bt(ct.NO_INSERT), pt = null), st) {
              (it.isFirst() || it.isLast()) && (dt = it._path._closed), it._visited = !0;
              break;
            }
            if (ee && pt && (gt.push(pt), pt = null), pt || (ee && Xt.push(it), pt = {
              start: nt._segments.length,
              crossings: Xt,
              visited: At = [],
              handleIn: It
            }), ee && (it = Gt), !V(it)) {
              nt.removeSegments(pt.start);
              for (var Jt = 0, Pe = At.length; Jt < Pe; Jt++)
                At[Jt]._visited = !1;
              At.length = 0;
              do
                it = pt && pt.crossings.shift(), (!it || !it._path) && (it = null, pt = gt.pop(), pt && (At = pt.visited, It = pt.handleIn));
              while (pt && !V(it));
              if (!it)
                break;
            }
            var ue = it.getNext();
            nt.add(new bt(
              it._point,
              It,
              ue && it._handleOut
            )), it._visited = !0, At.push(it), it = ue || it._path.getFirstSegment(), It = ue && ue._handleIn;
          }
          st && (dt && (nt.getFirstSegment().setHandleIn(It), nt.setClosed(dt)), nt.getArea() !== 0 && M.push(nt));
        }
        return M;
      }
      return {
        _getWinding: function(z, N, M) {
          return B(z, this.getCurves(), N, M);
        },
        unite: function(z, N) {
          return w(this, z, "unite", N);
        },
        intersect: function(z, N) {
          return w(this, z, "intersect", N);
        },
        subtract: function(z, N) {
          return w(this, z, "subtract", N);
        },
        exclude: function(z, N) {
          return w(this, z, "exclude", N);
        },
        divide: function(z, N) {
          return N && (N.trace == !1 || N.stroke) ? T(this, z, "divide") : m([
            this.subtract(z, N),
            this.intersect(z, N)
          ], !0, this, z, N);
        },
        resolveCrossings: function() {
          var z = this._children, N = z || [this];
          function M(pt, At) {
            var It = pt && pt._intersection;
            return It && It._overlap && It._path === At;
          }
          var R = !1, V = !1, W = this.getIntersections(null, function(pt) {
            return pt.hasOverlap() && (R = !0) || pt.isCrossing() && (V = !0);
          }), G = R && V && [];
          if (W = $t.expand(W), R)
            for (var J = O(W, function(pt) {
              return pt.hasOverlap();
            }, G), j = J.length - 1; j >= 0; j--) {
              var tt = J[j], it = tt._path, Q = tt._segment, nt = Q.getPrevious(), st = Q.getNext();
              M(nt, it) && M(st, it) && (Q.remove(), nt._handleOut._set(0, 0), st._handleIn._set(0, 0), nt !== Q && !nt.getCurve().hasLength() && (st._handleIn.set(nt._handleIn), nt.remove()));
            }
          V && (O(W, R && function(pt) {
            var At = pt.getCurve(), It = pt.getSegment(), Rt = pt._intersection, Qt = Rt._curve, qt = Rt._segment;
            if (At && Qt && At._path && Qt._path)
              return !0;
            It && (It._intersection = null), qt && (qt._intersection = null);
          }, G), G && L(G), N = Y(h.each(N, function(pt) {
            h.push(this, pt._segments);
          }, [])));
          var dt = N.length, gt;
          return dt > 1 && z ? (N !== z && this.setChildren(N), gt = this) : dt === 1 && !z && (N[0] !== this && this.setSegments(N[0].removeSegments()), gt = this), gt || (gt = new ae(ct.NO_INSERT), gt.addChildren(N), gt = gt.reduce(), gt.copyAttributes(this), this.replaceWith(gt)), gt;
        },
        reorient: function(z, N) {
          var M = this._children;
          return M && M.length ? this.setChildren(I(
            this.removeChildren(),
            function(R) {
              return !!(z ? R : R & 1);
            },
            N
          )) : N !== r && this.setClockwise(N), this;
        },
        getInteriorPoint: function() {
          var z = this.getBounds(), N = z.getCenter(!0);
          if (!this.contains(N)) {
            for (var M = this.getCurves(), R = N.y, V = [], W = [], G = 0, J = M.length; G < J; G++) {
              var j = M[G].getValues(), tt = j[1], it = j[3], Q = j[5], nt = j[7];
              if (R >= t(tt, it, Q, nt) && R <= i(tt, it, Q, nt))
                for (var st = vt.getMonoCurves(j), dt = 0, gt = st.length; dt < gt; dt++) {
                  var pt = st[dt], At = pt[1], It = pt[7];
                  if (At !== It && (R >= At && R <= It || R >= It && R <= At)) {
                    var Rt = R === At ? pt[0] : R === It ? pt[6] : vt.solveCubic(pt, 1, R, W, 0, 1) === 1 ? vt.getPoint(pt, W[0]).x : (pt[0] + pt[6]) / 2;
                    V.push(Rt);
                  }
                }
            }
            V.length > 1 && (V.sort(function(Qt, qt) {
              return Qt - qt;
            }), N.x = (V[0] + V[1]) / 2);
          }
          return N;
        }
      };
    }());
    var he = h.extend(
      {
        _class: "PathFlattener",
        initialize: function(t, i, a, f, d) {
          var v = [], m = [], p = 0, w = 1 / (a || 32), T = t._segments, E = T[0], L;
          function I(Y, z) {
            var N = vt.getValues(Y, z, d);
            v.push(N), O(N, Y._index, 0, 1);
          }
          function O(Y, z, N, M) {
            if (M - N > w && !(f && vt.isStraight(Y)) && !vt.isFlatEnough(Y, i || 0.25)) {
              var R = vt.subdivide(Y, 0.5), V = (N + M) / 2;
              O(R[0], z, N, V), O(R[1], z, V, M);
            } else {
              var W = Y[6] - Y[0], G = Y[7] - Y[1], J = Math.sqrt(W * W + G * G);
              J > 0 && (p += J, m.push({
                offset: p,
                curve: Y,
                index: z,
                time: M
              }));
            }
          }
          for (var B = 1, q = T.length; B < q; B++)
            L = T[B], I(E, L), E = L;
          t._closed && I(L || E, T[0]), this.curves = v, this.parts = m, this.length = p, this.index = 0;
        },
        _get: function(t) {
          for (var i = this.parts, a = i.length, f, d = this.index; f = d, !(!d || i[--d].offset < t); )
            ;
          for (; f < a; f++) {
            var v = i[f];
            if (v.offset >= t) {
              this.index = f;
              var m = i[f - 1], p = m && m.index === v.index ? m.time : 0, w = m ? m.offset : 0;
              return {
                index: v.index,
                time: p + (v.time - p) * (t - w) / (v.offset - w)
              };
            }
          }
          return {
            index: i[a - 1].index,
            time: 1
          };
        },
        drawPart: function(t, i, a) {
          for (var f = this._get(i), d = this._get(a), v = f.index, m = d.index; v <= m; v++) {
            var p = vt.getPart(
              this.curves[v],
              v === f.index ? f.time : 0,
              v === d.index ? d.time : 1
            );
            v === f.index && t.moveTo(p[0], p[1]), t.bezierCurveTo.apply(t, p.slice(2));
          }
        }
      },
      h.each(
        vt._evaluateMethods,
        function(t) {
          this[t + "At"] = function(i) {
            var a = this._get(i);
            return vt[t](this.curves[a.index], a.time);
          };
        },
        {}
      )
    ), Ie = h.extend({
      initialize: function(t) {
        for (var i = this.points = [], a = t._segments, f = t._closed, d = 0, v, m = a.length; d < m; d++) {
          var p = a[d].point;
          (!v || !v.equals(p)) && i.push(v = p.clone());
        }
        f && (i.unshift(i[i.length - 1]), i.push(i[1])), this.closed = f;
      },
      fit: function(t) {
        var i = this.points, a = i.length, f = null;
        return a > 0 && (f = [new bt(i[0])], a > 1 && (this.fitCubic(
          f,
          t,
          0,
          a - 1,
          i[1].subtract(i[0]),
          i[a - 2].subtract(i[a - 1])
        ), this.closed && (f.shift(), f.pop()))), f;
      },
      fitCubic: function(t, i, a, f, d, v) {
        var m = this.points;
        if (f - a === 1) {
          var p = m[a], w = m[f], T = p.getDistance(w) / 3;
          this.addCurve(t, [
            p,
            p.add(d.normalize(T)),
            w.add(v.normalize(T)),
            w
          ]);
          return;
        }
        for (var E = this.chordLengthParameterize(a, f), L = Math.max(i, i * i), I, O = !0, B = 0; B <= 4; B++) {
          var q = this.generateBezier(a, f, E, d, v), Y = this.findMaxError(a, f, q, E);
          if (Y.error < i && O) {
            this.addCurve(t, q);
            return;
          }
          if (I = Y.index, Y.error >= L)
            break;
          O = this.reparameterize(a, f, E, q), L = Y.error;
        }
        var z = m[I - 1].subtract(m[I + 1]);
        this.fitCubic(t, i, a, I, d, z), this.fitCubic(t, i, I, f, z.negate(), v);
      },
      addCurve: function(t, i) {
        var a = t[t.length - 1];
        a.setHandleOut(i[1].subtract(i[0])), t.push(new bt(i[3], i[2].subtract(i[3])));
      },
      generateBezier: function(t, i, a, f, d) {
        for (var v = 1e-12, m = Math.abs, p = this.points, w = p[t], T = p[i], E = [[0, 0], [0, 0]], L = [0, 0], I = 0, O = i - t + 1; I < O; I++) {
          var B = a[I], q = 1 - B, Y = 3 * B * q, z = q * q * q, N = Y * q, M = Y * B, R = B * B * B, V = f.normalize(N), W = d.normalize(M), G = p[t + I].subtract(w.multiply(z + N)).subtract(T.multiply(M + R));
          E[0][0] += V.dot(V), E[0][1] += V.dot(W), E[1][0] = E[0][1], E[1][1] += W.dot(W), L[0] += V.dot(G), L[1] += W.dot(G);
        }
        var J = E[0][0] * E[1][1] - E[1][0] * E[0][1], j, tt;
        if (m(J) > v) {
          var it = E[0][0] * L[1] - E[1][0] * L[0], Q = L[0] * E[1][1] - L[1] * E[0][1];
          j = Q / J, tt = it / J;
        } else {
          var nt = E[0][0] + E[0][1], st = E[1][0] + E[1][1];
          j = tt = m(nt) > v ? L[0] / nt : m(st) > v ? L[1] / st : 0;
        }
        var dt = T.getDistance(w), gt = v * dt, pt, At;
        if (j < gt || tt < gt)
          j = tt = dt / 3;
        else {
          var It = T.subtract(w);
          pt = f.normalize(j), At = d.normalize(tt), pt.dot(It) - At.dot(It) > dt * dt && (j = tt = dt / 3, pt = At = null);
        }
        return [
          w,
          w.add(pt || f.normalize(j)),
          T.add(At || d.normalize(tt)),
          T
        ];
      },
      reparameterize: function(t, i, a, f) {
        for (var d = t; d <= i; d++)
          a[d - t] = this.findRoot(f, this.points[d], a[d - t]);
        for (var d = 1, v = a.length; d < v; d++)
          if (a[d] <= a[d - 1])
            return !1;
        return !0;
      },
      findRoot: function(t, i, a) {
        for (var f = [], d = [], v = 0; v <= 2; v++)
          f[v] = t[v + 1].subtract(t[v]).multiply(3);
        for (var v = 0; v <= 1; v++)
          d[v] = f[v + 1].subtract(f[v]).multiply(2);
        var m = this.evaluate(3, t, a), p = this.evaluate(2, f, a), w = this.evaluate(1, d, a), T = m.subtract(i), E = p.dot(p) + T.dot(w);
        return A.isMachineZero(E) ? a : a - T.dot(p) / E;
      },
      evaluate: function(t, i, a) {
        for (var f = i.slice(), d = 1; d <= t; d++)
          for (var v = 0; v <= t - d; v++)
            f[v] = f[v].multiply(1 - a).add(f[v + 1].multiply(a));
        return f[0];
      },
      chordLengthParameterize: function(t, i) {
        for (var a = [0], f = t + 1; f <= i; f++)
          a[f - t] = a[f - t - 1] + this.points[f].getDistance(this.points[f - 1]);
        for (var f = 1, d = i - t; f <= d; f++)
          a[f] /= a[d];
        return a;
      },
      findMaxError: function(t, i, a, f) {
        for (var d = Math.floor((i - t + 1) / 2), v = 0, m = t + 1; m < i; m++) {
          var p = this.evaluate(3, a, f[m - t]), w = p.subtract(this.points[m]), T = w.x * w.x + w.y * w.y;
          T >= v && (v = T, d = m);
        }
        return {
          error: v,
          index: d
        };
      }
    }), rn = ct.extend({
      _class: "TextItem",
      _applyMatrix: !1,
      _canApplyMatrix: !1,
      _serializeFields: {
        content: null
      },
      _boundsOptions: { stroke: !1, handle: !1 },
      initialize: function(i) {
        this._content = "", this._lines = [];
        var a = i && h.isPlainObject(i) && i.x === r && i.y === r;
        this._initialize(a && i, !a && y.read(arguments));
      },
      _equals: function(t) {
        return this._content === t._content;
      },
      copyContent: function(t) {
        this.setContent(t._content);
      },
      getContent: function() {
        return this._content;
      },
      setContent: function(t) {
        this._content = "" + t, this._lines = this._content.split(/\r\n|\n|\r/mg), this._changed(521);
      },
      isEmpty: function() {
        return !this._content;
      },
      getCharacterStyle: "#getStyle",
      setCharacterStyle: "#setStyle",
      getParagraphStyle: "#getStyle",
      setParagraphStyle: "#setStyle"
    }), ye = rn.extend({
      _class: "PointText",
      initialize: function() {
        rn.apply(this, arguments);
      },
      getPoint: function() {
        var t = this._matrix.getTranslation();
        return new D(t.x, t.y, this, "setPoint");
      },
      setPoint: function() {
        var t = y.read(arguments);
        this.translate(t.subtract(this._matrix.getTranslation()));
      },
      _draw: function(t, i, a) {
        if (this._content) {
          this._setStyles(t, i, a);
          var f = this._lines, d = this._style, v = d.hasFill(), m = d.hasStroke(), p = d.getLeading(), w = t.shadowColor;
          t.font = d.getFontStyle(), t.textAlign = d.getJustification();
          for (var T = 0, E = f.length; T < E; T++) {
            t.shadowColor = w;
            var L = f[T];
            v && (t.fillText(L, 0, 0), t.shadowColor = "rgba(0,0,0,0)"), m && t.strokeText(L, 0, 0), t.translate(0, p);
          }
        }
      },
      _getBounds: function(t, i) {
        var a = this._style, f = this._lines, d = f.length, v = a.getJustification(), m = a.getLeading(), p = this.getView().getTextWidth(a.getFontStyle(), f), w = 0;
        v !== "left" && (w -= p / (v === "center" ? 2 : 1));
        var T = new $(
          w,
          d ? -0.75 * m : 0,
          p,
          d * m
        );
        return t ? t._transformBounds(T, T) : T;
      }
    }), oe = h.extend(
      new function() {
        var t = {
          gray: ["gray"],
          rgb: ["red", "green", "blue"],
          hsb: ["hue", "saturation", "brightness"],
          hsl: ["hue", "saturation", "lightness"],
          gradient: ["gradient", "origin", "destination", "highlight"]
        }, i = {}, a = {
          transparent: [0, 0, 0, 0]
        }, f;
        function d(p) {
          var w = p.match(
            /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i
          ) || p.match(
            /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i
          ), T = "rgb", E;
          if (w) {
            var L = w[4] ? 4 : 3;
            E = new Array(L);
            for (var I = 0; I < L; I++) {
              var O = w[I + 1];
              E[I] = parseInt(O.length == 1 ? O + O : O, 16) / 255;
            }
          } else if (w = p.match(/^(rgb|hsl)a?\((.*)\)$/)) {
            T = w[1], E = w[2].trim().split(/[,\s]+/g);
            for (var B = T === "hsl", I = 0, q = Math.min(E.length, 4); I < q; I++) {
              var Y = E[I], O = parseFloat(Y);
              if (B)
                if (I === 0) {
                  var z = Y.match(/([a-z]*)$/)[1];
                  O *= {
                    turn: 360,
                    rad: 180 / Math.PI,
                    grad: 0.9
                  }[z] || 1;
                } else
                  I < 3 && (O /= 100);
              else
                I < 3 && (O /= /%$/.test(Y) ? 100 : 255);
              E[I] = O;
            }
          } else {
            var N = a[p];
            if (!N)
              if (o) {
                f || (f = Be.getContext(1, 1, {
                  willReadFrequently: !0
                }), f.globalCompositeOperation = "copy"), f.fillStyle = "rgba(0,0,0,0)", f.fillStyle = p, f.fillRect(0, 0, 1, 1);
                var M = f.getImageData(0, 0, 1, 1).data;
                N = a[p] = [
                  M[0] / 255,
                  M[1] / 255,
                  M[2] / 255
                ];
              } else
                N = [0, 0, 0];
            E = N.slice();
          }
          return [T, E];
        }
        var v = [
          [0, 3, 1],
          [2, 0, 1],
          [1, 0, 3],
          [1, 2, 0],
          [3, 1, 0],
          [0, 1, 2]
        ], m = {
          "rgb-hsb": function(p, w, T) {
            var E = Math.max(p, w, T), L = Math.min(p, w, T), I = E - L, O = I === 0 ? 0 : (E == p ? (w - T) / I + (w < T ? 6 : 0) : E == w ? (T - p) / I + 2 : (p - w) / I + 4) * 60;
            return [O, E === 0 ? 0 : I / E, E];
          },
          "hsb-rgb": function(p, w, T) {
            p = (p / 60 % 6 + 6) % 6;
            var L = Math.floor(p), E = p - L, L = v[L], I = [
              T,
              T * (1 - w),
              T * (1 - w * E),
              T * (1 - w * (1 - E))
            ];
            return [I[L[0]], I[L[1]], I[L[2]]];
          },
          "rgb-hsl": function(p, w, T) {
            var E = Math.max(p, w, T), L = Math.min(p, w, T), I = E - L, O = I === 0, B = O ? 0 : (E == p ? (w - T) / I + (w < T ? 6 : 0) : E == w ? (T - p) / I + 2 : (p - w) / I + 4) * 60, q = (E + L) / 2, Y = O ? 0 : q < 0.5 ? I / (E + L) : I / (2 - E - L);
            return [B, Y, q];
          },
          "hsl-rgb": function(p, w, T) {
            if (p = (p / 360 % 1 + 1) % 1, w === 0)
              return [T, T, T];
            for (var E = [p + 1 / 3, p, p - 1 / 3], L = T < 0.5 ? T * (1 + w) : T + w - T * w, I = 2 * T - L, O = [], B = 0; B < 3; B++) {
              var q = E[B];
              q < 0 && (q += 1), q > 1 && (q -= 1), O[B] = 6 * q < 1 ? I + (L - I) * 6 * q : 2 * q < 1 ? L : 3 * q < 2 ? I + (L - I) * (2 / 3 - q) * 6 : I;
            }
            return O;
          },
          "rgb-gray": function(p, w, T) {
            return [p * 0.2989 + w * 0.587 + T * 0.114];
          },
          "gray-rgb": function(p) {
            return [p, p, p];
          },
          "gray-hsb": function(p) {
            return [0, 0, p];
          },
          "gray-hsl": function(p) {
            return [0, 0, p];
          },
          "gradient-rgb": function() {
            return [];
          },
          "rgb-gradient": function() {
            return [];
          }
        };
        return h.each(t, function(p, w) {
          i[w] = [], h.each(p, function(T, E) {
            var L = h.capitalize(T), I = /^(hue|saturation)$/.test(T), O = i[w][E] = w === "gradient" ? T === "gradient" ? function(B) {
              var q = this._components[0];
              return B = qe.read(
                Array.isArray(B) ? B : arguments,
                0,
                { readNull: !0 }
              ), q !== B && (q && q._removeOwner(this), B && B._addOwner(this)), B;
            } : function() {
              return y.read(arguments, 0, {
                readNull: T === "highlight",
                clone: !0
              });
            } : function(B) {
              return B == null || isNaN(B) ? 0 : +B;
            };
            this["get" + L] = function() {
              return this._type === w || I && /^hs[bl]$/.test(this._type) ? this._components[E] : this._convert(w)[E];
            }, this["set" + L] = function(B) {
              this._type !== w && !(I && /^hs[bl]$/.test(this._type)) && (this._components = this._convert(w), this._properties = t[w], this._type = w), this._components[E] = O.call(this, B), this._changed();
            };
          }, this);
        }, {
          _class: "Color",
          _readIndex: !0,
          initialize: function p(w) {
            var T = arguments, E = this.__read, L = 0, I, O, B, q;
            Array.isArray(w) && (T = w, w = T[0]);
            var Y = w != null && typeof w;
            if (Y === "string" && w in t && (I = w, w = T[1], Array.isArray(w) ? (O = w, B = T[2]) : (E && (L = 1), T = h.slice(T, 1), Y = typeof w)), !O) {
              if (q = Y === "number" ? T : Y === "object" && w.length != null ? w : null, q) {
                I || (I = q.length >= 3 ? "rgb" : "gray");
                var z = t[I].length;
                B = q[z], E && (L += q === arguments ? z + (B != null ? 1 : 0) : 1), q.length > z && (q = h.slice(q, 0, z));
              } else if (Y === "string") {
                var N = d(w);
                I = N[0], O = N[1], O.length === 4 && (B = O[3], O.length--);
              } else if (Y === "object")
                if (w.constructor === p) {
                  if (I = w._type, O = w._components.slice(), B = w._alpha, I === "gradient")
                    for (var M = 1, R = O.length; M < R; M++) {
                      var V = O[M];
                      V && (O[M] = V.clone());
                    }
                } else if (w.constructor === qe)
                  I = "gradient", q = T;
                else {
                  I = "hue" in w ? "lightness" in w ? "hsl" : "hsb" : "gradient" in w || "stops" in w || "radial" in w ? "gradient" : "gray" in w ? "gray" : "rgb";
                  var W = t[I], G = i[I];
                  this._components = O = [];
                  for (var M = 0, R = W.length; M < R; M++) {
                    var J = w[W[M]];
                    J == null && !M && I === "gradient" && "stops" in w && (J = {
                      stops: w.stops,
                      radial: w.radial
                    }), J = G[M].call(this, J), J != null && (O[M] = J);
                  }
                  B = w.alpha;
                }
              E && I && (L = 1);
            }
            if (this._type = I || "rgb", !O) {
              this._components = O = [];
              for (var G = i[this._type], M = 0, R = G.length; M < R; M++) {
                var J = G[M].call(this, q && q[M]);
                J != null && (O[M] = J);
              }
            }
            return this._components = O, this._properties = t[this._type], this._alpha = B, E && (this.__read = L), this;
          },
          set: "#initialize",
          _serialize: function(p, w) {
            var T = this.getComponents();
            return h.serialize(
              /^(gray|rgb)$/.test(this._type) ? T : [this._type].concat(T),
              p,
              !0,
              w
            );
          },
          _changed: function() {
            this._canvasStyle = null, this._owner && (this._setter ? this._owner[this._setter](this) : this._owner._changed(129));
          },
          _convert: function(p) {
            var w;
            return this._type === p ? this._components.slice() : (w = m[this._type + "-" + p]) ? w.apply(this, this._components) : m["rgb-" + p].apply(
              this,
              m[this._type + "-rgb"].apply(
                this,
                this._components
              )
            );
          },
          convert: function(p) {
            return new oe(p, this._convert(p), this._alpha);
          },
          getType: function() {
            return this._type;
          },
          setType: function(p) {
            this._components = this._convert(p), this._properties = t[p], this._type = p;
          },
          getComponents: function() {
            var p = this._components.slice();
            return this._alpha != null && p.push(this._alpha), p;
          },
          getAlpha: function() {
            return this._alpha != null ? this._alpha : 1;
          },
          setAlpha: function(p) {
            this._alpha = p == null ? null : Math.min(Math.max(p, 0), 1), this._changed();
          },
          hasAlpha: function() {
            return this._alpha != null;
          },
          equals: function(p) {
            var w = h.isPlainValue(p, !0) ? oe.read(arguments) : p;
            return w === this || w && this._class === w._class && this._type === w._type && this.getAlpha() === w.getAlpha() && h.equals(this._components, w._components) || !1;
          },
          toString: function() {
            for (var p = this._properties, w = [], T = this._type === "gradient", E = S.instance, L = 0, I = p.length; L < I; L++) {
              var O = this._components[L];
              O != null && w.push(p[L] + ": " + (T ? O : E.number(O)));
            }
            return this._alpha != null && w.push("alpha: " + E.number(this._alpha)), "{ " + w.join(", ") + " }";
          },
          toCSS: function(p) {
            var w = this._convert("rgb"), T = p || this._alpha == null ? 1 : this._alpha;
            function E(L) {
              return Math.round((L < 0 ? 0 : L > 1 ? 1 : L) * 255);
            }
            return w = [
              E(w[0]),
              E(w[1]),
              E(w[2])
            ], T < 1 && w.push(T < 0 ? 0 : T), p ? "#" + ((1 << 24) + (w[0] << 16) + (w[1] << 8) + w[2]).toString(16).slice(1) : (w.length == 4 ? "rgba(" : "rgb(") + w.join(",") + ")";
          },
          toCanvasStyle: function(p, w) {
            if (this._canvasStyle)
              return this._canvasStyle;
            if (this._type !== "gradient")
              return this._canvasStyle = this.toCSS();
            var T = this._components, E = T[0], L = E._stops, I = T[1], O = T[2], B = T[3], q = w && w.inverted(), Y;
            if (q && (I = q._transformPoint(I), O = q._transformPoint(O), B && (B = q._transformPoint(B))), E._radial) {
              var z = O.getDistance(I);
              if (B) {
                var N = B.subtract(I);
                N.getLength() > z && (B = I.add(N.normalize(z - 0.1)));
              }
              var M = B || I;
              Y = p.createRadialGradient(
                M.x,
                M.y,
                0,
                I.x,
                I.y,
                z
              );
            } else
              Y = p.createLinearGradient(
                I.x,
                I.y,
                O.x,
                O.y
              );
            for (var R = 0, V = L.length; R < V; R++) {
              var W = L[R], G = W._offset;
              Y.addColorStop(
                G ?? R / (V - 1),
                W._color.toCanvasStyle()
              );
            }
            return this._canvasStyle = Y;
          },
          transform: function(p) {
            if (this._type === "gradient") {
              for (var w = this._components, T = 1, E = w.length; T < E; T++) {
                var L = w[T];
                p._transformPoint(L, L, !0);
              }
              this._changed();
            }
          },
          statics: {
            _types: t,
            random: function() {
              var p = Math.random;
              return new oe(p(), p(), p());
            },
            _setOwner: function(p, w, T) {
              return p && (p._owner && w && p._owner !== w && (p = p.clone()), !p._owner ^ !w && (p._owner = w || null, p._setter = T || null)), p;
            }
          }
        });
      }(),
      new function() {
        var t = {
          add: function(i, a) {
            return i + a;
          },
          subtract: function(i, a) {
            return i - a;
          },
          multiply: function(i, a) {
            return i * a;
          },
          divide: function(i, a) {
            return i / a;
          }
        };
        return h.each(t, function(i, a) {
          this[a] = function(f) {
            f = oe.read(arguments);
            for (var d = this._type, v = this._components, m = f._convert(d), p = 0, w = v.length; p < w; p++)
              m[p] = i(v[p], m[p]);
            return new oe(
              d,
              m,
              this._alpha != null ? i(this._alpha, f.getAlpha()) : null
            );
          };
        }, {});
      }()
    ), qe = h.extend({
      _class: "Gradient",
      initialize: function(i, a) {
        this._id = k.get(), i && h.isPlainObject(i) && (this.set(i), i = a = null), this._stops == null && this.setStops(i || ["white", "black"]), this._radial == null && this.setRadial(typeof a == "string" && a === "radial" || a || !1);
      },
      _serialize: function(t, i) {
        return i.add(this, function() {
          return h.serialize(
            [this._stops, this._radial],
            t,
            !0,
            i
          );
        });
      },
      _changed: function() {
        for (var t = 0, i = this._owners && this._owners.length; t < i; t++)
          this._owners[t]._changed();
      },
      _addOwner: function(t) {
        this._owners || (this._owners = []), this._owners.push(t);
      },
      _removeOwner: function(t) {
        var i = this._owners ? this._owners.indexOf(t) : -1;
        i != -1 && (this._owners.splice(i, 1), this._owners.length || (this._owners = r));
      },
      clone: function() {
        for (var t = [], i = 0, a = this._stops.length; i < a; i++)
          t[i] = this._stops[i].clone();
        return new qe(t, this._radial);
      },
      getStops: function() {
        return this._stops;
      },
      setStops: function(t) {
        if (t.length < 2)
          throw new Error(
            "Gradient stop list needs to contain at least two stops."
          );
        var i = this._stops;
        if (i)
          for (var a = 0, f = i.length; a < f; a++)
            i[a]._owner = r;
        i = this._stops = si.readList(t, 0, { clone: !0 });
        for (var a = 0, f = i.length; a < f; a++)
          i[a]._owner = this;
        this._changed();
      },
      getRadial: function() {
        return this._radial;
      },
      setRadial: function(t) {
        this._radial = t, this._changed();
      },
      equals: function(t) {
        if (t === this)
          return !0;
        if (t && this._class === t._class) {
          var i = this._stops, a = t._stops, f = i.length;
          if (f === a.length) {
            for (var d = 0; d < f; d++)
              if (!i[d].equals(a[d]))
                return !1;
            return !0;
          }
        }
        return !1;
      }
    }), si = h.extend({
      _class: "GradientStop",
      initialize: function(i, a) {
        var f = i, d = a;
        typeof i == "object" && a === r && (Array.isArray(i) && typeof i[0] != "number" ? (f = i[0], d = i[1]) : ("color" in i || "offset" in i || "rampPoint" in i) && (f = i.color, d = i.offset || i.rampPoint || 0)), this.setColor(f), this.setOffset(d);
      },
      clone: function() {
        return new si(this._color.clone(), this._offset);
      },
      _serialize: function(t, i) {
        var a = this._color, f = this._offset;
        return h.serialize(
          f == null ? [a] : [a, f],
          t,
          !0,
          i
        );
      },
      _changed: function() {
        this._owner && this._owner._changed(129);
      },
      getOffset: function() {
        return this._offset;
      },
      setOffset: function(t) {
        this._offset = t, this._changed();
      },
      getRampPoint: "#getOffset",
      setRampPoint: "#setOffset",
      getColor: function() {
        return this._color;
      },
      setColor: function() {
        oe._setOwner(this._color, null), this._color = oe._setOwner(
          oe.read(arguments, 0),
          this,
          "setColor"
        ), this._changed();
      },
      equals: function(t) {
        return t === this || t && this._class === t._class && this._color.equals(t._color) && this._offset == t._offset || !1;
      }
    }), Ct = h.extend(new function() {
      var t = {
        fillColor: null,
        fillRule: "nonzero",
        strokeColor: null,
        strokeWidth: 1,
        strokeCap: "butt",
        strokeJoin: "miter",
        strokeScaling: !0,
        miterLimit: 10,
        dashOffset: 0,
        dashArray: [],
        shadowColor: null,
        shadowBlur: 0,
        shadowOffset: new y(),
        selectedColor: null
      }, i = h.set({}, t, {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        fontSize: 12,
        leading: null,
        justification: "left"
      }), a = h.set({}, i, {
        fillColor: new oe()
      }), f = {
        strokeWidth: 193,
        strokeCap: 193,
        strokeJoin: 193,
        strokeScaling: 201,
        miterLimit: 193,
        fontFamily: 9,
        fontWeight: 9,
        fontSize: 9,
        font: 9,
        leading: 9,
        justification: 9
      }, d = {
        beans: !0
      }, v = {
        _class: "Style",
        beans: !0,
        initialize: function(p, w, T) {
          this._values = {}, this._owner = w, this._project = w && w._project || T || ce.project, this._defaults = !w || w instanceof ht ? i : w instanceof rn ? a : t, p && this.set(p);
        }
      };
      return h.each(i, function(m, p) {
        var w = /Color$/.test(p), T = p === "shadowOffset", E = h.capitalize(p), L = f[p], I = "set" + E, O = "get" + E;
        v[I] = function(B) {
          var q = this._owner, Y = q && q._children, z = Y && Y.length > 0 && !(q instanceof ae);
          if (z)
            for (var N = 0, M = Y.length; N < M; N++)
              Y[N]._style[I](B);
          if ((p === "selectedColor" || !z) && p in this._defaults) {
            var R = this._values[p];
            R !== B && (w && (R && (oe._setOwner(R, null), R._canvasStyle = null), B && B.constructor === oe && (B = oe._setOwner(
              B,
              q,
              z && I
            ))), this._values[p] = B, q && q._changed(L || 129));
          }
        }, v[O] = function(B) {
          var q = this._owner, Y = q && q._children, z = Y && Y.length > 0 && !(q instanceof ae), N;
          if (z && !B)
            for (var M = 0, R = Y.length; M < R; M++) {
              var V = Y[M]._style[O]();
              if (!M)
                N = V;
              else if (!h.equals(N, V))
                return r;
            }
          else if (p in this._defaults) {
            var N = this._values[p];
            if (N === r)
              N = this._defaults[p], N && N.clone && (N = N.clone());
            else {
              var W = w ? oe : T ? y : null;
              W && !(N && N.constructor === W) && (this._values[p] = N = W.read(
                [N],
                0,
                { readNull: !0, clone: !0 }
              ));
            }
          }
          return N && w && (N = oe._setOwner(N, q, z && I)), N;
        }, d[O] = function(B) {
          return this._style[O](B);
        }, d[I] = function(B) {
          this._style[I](B);
        };
      }), h.each({
        Font: "FontFamily",
        WindingRule: "FillRule"
      }, function(m, p) {
        var w = "get" + p, T = "set" + p;
        v[w] = d[w] = "#get" + m, v[T] = d[T] = "#set" + m;
      }), ct.inject(d), v;
    }(), {
      set: function(t) {
        var i = t instanceof Ct, a = i ? t._values : t;
        if (a) {
          for (var f in a)
            if (f in this._defaults) {
              var d = a[f];
              this[f] = d && i && d.clone ? d.clone() : d;
            }
        }
      },
      equals: function(t) {
        function i(a, f, d) {
          var v = a._values, m = f._values, p = f._defaults;
          for (var w in v) {
            var T = v[w], E = m[w];
            if (!(d && w in m) && !h.equals(
              T,
              E === r ? p[w] : E
            ))
              return !1;
          }
          return !0;
        }
        return t === this || t && this._class === t._class && i(this, t) && i(t, this, !0) || !1;
      },
      _dispose: function() {
        var t;
        t = this.getFillColor(), t && (t._canvasStyle = null), t = this.getStrokeColor(), t && (t._canvasStyle = null), t = this.getShadowColor(), t && (t._canvasStyle = null);
      },
      hasFill: function() {
        var t = this.getFillColor();
        return !!t && t.alpha > 0;
      },
      hasStroke: function() {
        var t = this.getStrokeColor();
        return !!t && t.alpha > 0 && this.getStrokeWidth() > 0;
      },
      hasShadow: function() {
        var t = this.getShadowColor();
        return !!t && t.alpha > 0 && (this.getShadowBlur() > 0 || !this.getShadowOffset().isZero());
      },
      getView: function() {
        return this._project._view;
      },
      getFontStyle: function() {
        var t = this.getFontSize();
        return this.getFontWeight() + " " + t + (/[a-z]/i.test(t + "") ? " " : "px ") + this.getFontFamily();
      },
      getFont: "#getFontFamily",
      setFont: "#setFontFamily",
      getLeading: function t() {
        var i = t.base.call(this), a = this.getFontSize();
        return /pt|em|%|px/.test(a) && (a = this.getView().getPixelSize(a)), i ?? a * 1.2;
      }
    }), wt = new function() {
      function t(i, a, f, d) {
        for (var v = ["", "webkit", "moz", "Moz", "ms", "o"], m = a[0].toUpperCase() + a.substring(1), p = 0; p < 6; p++) {
          var w = v[p], T = w ? w + m : a;
          if (T in i) {
            if (f)
              i[T] = d;
            else
              return i[T];
            break;
          }
        }
      }
      return {
        getStyles: function(i) {
          var a = i && i.nodeType !== 9 ? i.ownerDocument : i, f = a && a.defaultView;
          return f && f.getComputedStyle(i, "");
        },
        getBounds: function(i, a) {
          var f = i.ownerDocument, d = f.body, v = f.documentElement, m;
          try {
            m = i.getBoundingClientRect();
          } catch {
            m = { left: 0, top: 0, width: 0, height: 0 };
          }
          var p = m.left - (v.clientLeft || d.clientLeft || 0), w = m.top - (v.clientTop || d.clientTop || 0);
          if (!a) {
            var T = f.defaultView;
            p += T.pageXOffset || v.scrollLeft || d.scrollLeft, w += T.pageYOffset || v.scrollTop || d.scrollTop;
          }
          return new $(p, w, m.width, m.height);
        },
        getViewportBounds: function(i) {
          var a = i.ownerDocument, f = a.defaultView, d = a.documentElement;
          return new $(
            0,
            0,
            f.innerWidth || d.clientWidth,
            f.innerHeight || d.clientHeight
          );
        },
        getOffset: function(i, a) {
          return wt.getBounds(i, a).getPoint();
        },
        getSize: function(i) {
          return wt.getBounds(i, !0).getSize();
        },
        isInvisible: function(i) {
          return wt.getSize(i).equals(new C(0, 0));
        },
        isInView: function(i) {
          return !wt.isInvisible(i) && wt.getViewportBounds(i).intersects(
            wt.getBounds(i, !0)
          );
        },
        isInserted: function(i) {
          return l.body.contains(i);
        },
        getPrefixed: function(i, a) {
          return i && t(i, a);
        },
        setPrefixed: function(i, a, f) {
          if (typeof a == "object")
            for (var d in a)
              t(i, d, !0, a[d]);
          else
            t(i, a, !0, f);
        }
      };
    }(), Lt = {
      add: function(t, i) {
        if (t)
          for (var a in i)
            for (var f = i[a], d = a.split(/[\s,]+/g), v = 0, m = d.length; v < m; v++) {
              var p = d[v], w = t === l && (p === "touchstart" || p === "touchmove") ? { passive: !1 } : !1;
              t.addEventListener(p, f, w);
            }
      },
      remove: function(t, i) {
        if (t)
          for (var a in i)
            for (var f = i[a], d = a.split(/[\s,]+/g), v = 0, m = d.length; v < m; v++)
              t.removeEventListener(d[v], f, !1);
      },
      getPoint: function(t) {
        var i = t.targetTouches ? t.targetTouches.length ? t.targetTouches[0] : t.changedTouches[0] : t;
        return new y(
          i.pageX || i.clientX + l.documentElement.scrollLeft,
          i.pageY || i.clientY + l.documentElement.scrollTop
        );
      },
      getTarget: function(t) {
        return t.target || t.srcElement;
      },
      getRelatedTarget: function(t) {
        return t.relatedTarget || t.toElement;
      },
      getOffset: function(t, i) {
        return Lt.getPoint(t).subtract(wt.getOffset(
          i || Lt.getTarget(t)
        ));
      }
    };
    Lt.requestAnimationFrame = new function() {
      var t = wt.getPrefixed(o, "requestAnimationFrame"), i = !1, a = [], f;
      function d() {
        var v = a;
        a = [];
        for (var m = 0, p = v.length; m < p; m++)
          v[m]();
        i = t && a.length, i && t(d);
      }
      return function(v) {
        a.push(v), t ? i || (t(d), i = !0) : f || (f = setInterval(d, 1e3 / 60));
      };
    }();
    var zt = h.extend(
      c,
      {
        _class: "View",
        initialize: function t(i, a) {
          function f(L) {
            return a[L] || parseInt(a.getAttribute(L), 10);
          }
          function d() {
            var L = wt.getSize(a);
            return L.isNaN() || L.isZero() ? new C(f("width"), f("height")) : L;
          }
          var v;
          if (o && a) {
            this._id = a.getAttribute("id"), this._id == null && a.setAttribute("id", this._id = "paper-view-" + t._id++), Lt.add(a, this._viewEvents);
            var m = "none";
            if (wt.setPrefixed(a.style, {
              userDrag: m,
              userSelect: m,
              touchCallout: m,
              contentZooming: m,
              tapHighlightColor: "rgba(0,0,0,0)"
            }), g.hasAttribute(a, "resize")) {
              var p = this;
              Lt.add(o, this._windowEvents = {
                resize: function() {
                  p.setViewSize(d());
                }
              });
            }
            if (v = d(), g.hasAttribute(a, "stats") && typeof Stats < "u") {
              this._stats = new Stats();
              var w = this._stats.domElement, T = w.style, E = wt.getOffset(a);
              T.position = "absolute", T.left = E.x + "px", T.top = E.y + "px", l.body.appendChild(w);
            }
          } else
            v = new C(a), a = null;
          this._project = i, this._scope = i._scope, this._element = a, this._pixelRatio || (this._pixelRatio = o && o.devicePixelRatio || 1), this._setElementSize(v.width, v.height), this._viewSize = v, t._views.push(this), t._viewsById[this._id] = this, (this._matrix = new K())._owner = this, t._focused || (t._focused = this), this._frameItems = {}, this._frameItemCount = 0, this._itemEvents = { native: {}, virtual: {} }, this._autoUpdate = !ce.agent.node, this._needsUpdate = !1;
        },
        remove: function() {
          if (!this._project)
            return !1;
          zt._focused === this && (zt._focused = null), zt._views.splice(zt._views.indexOf(this), 1), delete zt._viewsById[this._id];
          var t = this._project;
          return t._view === this && (t._view = null), Lt.remove(this._element, this._viewEvents), Lt.remove(o, this._windowEvents), this._element = this._project = null, this.off("frame"), this._animate = !1, this._frameItems = {}, !0;
        },
        _events: h.each(
          ct._itemHandlers.concat(["onResize", "onKeyDown", "onKeyUp"]),
          function(t) {
            this[t] = {};
          },
          {
            onFrame: {
              install: function() {
                this.play();
              },
              uninstall: function() {
                this.pause();
              }
            }
          }
        ),
        _animate: !1,
        _time: 0,
        _count: 0,
        getAutoUpdate: function() {
          return this._autoUpdate;
        },
        setAutoUpdate: function(t) {
          this._autoUpdate = t, t && this.requestUpdate();
        },
        update: function() {
        },
        draw: function() {
          this.update();
        },
        requestUpdate: function() {
          if (!this._requested) {
            var t = this;
            Lt.requestAnimationFrame(function() {
              if (t._requested = !1, t._animate) {
                t.requestUpdate();
                var i = t._element;
                (!wt.getPrefixed(l, "hidden") || g.getAttribute(i, "keepalive") === "true") && wt.isInView(i) && t._handleFrame();
              }
              t._autoUpdate && t.update();
            }), this._requested = !0;
          }
        },
        play: function() {
          this._animate = !0, this.requestUpdate();
        },
        pause: function() {
          this._animate = !1;
        },
        _handleFrame: function() {
          ce = this._scope;
          var t = Date.now() / 1e3, i = this._last ? t - this._last : 0;
          this._last = t, this.emit("frame", new h({
            delta: i,
            time: this._time += i,
            count: this._count++
          })), this._stats && this._stats.update();
        },
        _animateItem: function(t, i) {
          var a = this._frameItems;
          i ? (a[t._id] = {
            item: t,
            time: 0,
            count: 0
          }, ++this._frameItemCount === 1 && this.on("frame", this._handleFrameItems)) : (delete a[t._id], --this._frameItemCount === 0 && this.off("frame", this._handleFrameItems));
        },
        _handleFrameItems: function(t) {
          for (var i in this._frameItems) {
            var a = this._frameItems[i];
            a.item.emit("frame", new h(t, {
              time: a.time += t.delta,
              count: a.count++
            }));
          }
        },
        _changed: function() {
          this._project._changed(4097), this._bounds = this._decomposed = r;
        },
        getElement: function() {
          return this._element;
        },
        getPixelRatio: function() {
          return this._pixelRatio;
        },
        getResolution: function() {
          return this._pixelRatio * 72;
        },
        getViewSize: function() {
          var t = this._viewSize;
          return new U(t.width, t.height, this, "setViewSize");
        },
        setViewSize: function() {
          var t = C.read(arguments), i = t.subtract(this._viewSize);
          i.isZero() || (this._setElementSize(t.width, t.height), this._viewSize.set(t), this._changed(), this.emit("resize", { size: t, delta: i }), this._autoUpdate && this.update());
        },
        _setElementSize: function(t, i) {
          var a = this._element;
          a && (a.width !== t && (a.width = t), a.height !== i && (a.height = i));
        },
        getBounds: function() {
          return this._bounds || (this._bounds = this._matrix.inverted()._transformBounds(
            new $(new y(), this._viewSize)
          )), this._bounds;
        },
        getSize: function() {
          return this.getBounds().getSize();
        },
        isVisible: function() {
          return wt.isInView(this._element);
        },
        isInserted: function() {
          return wt.isInserted(this._element);
        },
        getPixelSize: function(t) {
          var i = this._element, a;
          if (i) {
            var f = i.parentNode, d = l.createElement("div");
            d.style.fontSize = t, f.appendChild(d), a = parseFloat(wt.getStyles(d).fontSize), f.removeChild(d);
          } else
            a = parseFloat(a);
          return a;
        },
        getTextWidth: function(t, i) {
          return 0;
        }
      },
      h.each(["rotate", "scale", "shear", "skew"], function(t) {
        var i = t === "rotate";
        this[t] = function() {
          var a = arguments, f = (i ? h : y).read(a), d = y.read(a, 0, { readNull: !0 });
          return this.transform(new K()[t](
            f,
            d || this.getCenter(!0)
          ));
        };
      }, {
        _decompose: function() {
          return this._decomposed || (this._decomposed = this._matrix.decompose());
        },
        translate: function() {
          var t = new K();
          return this.transform(t.translate.apply(t, arguments));
        },
        getCenter: function() {
          return this.getBounds().getCenter();
        },
        setCenter: function() {
          var t = y.read(arguments);
          this.translate(this.getCenter().subtract(t));
        },
        getZoom: function() {
          var t = this._decompose().scaling;
          return (t.x + t.y) / 2;
        },
        setZoom: function(t) {
          this.transform(new K().scale(
            t / this.getZoom(),
            this.getCenter()
          ));
        },
        getRotation: function() {
          return this._decompose().rotation;
        },
        setRotation: function(t) {
          var i = this.getRotation();
          i != null && t != null && this.rotate(t - i);
        },
        getScaling: function() {
          var t = this._decompose().scaling;
          return new D(t.x, t.y, this, "setScaling");
        },
        setScaling: function() {
          var t = this.getScaling(), i = y.read(arguments, 0, { clone: !0, readNull: !0 });
          t && i && this.scale(i.x / t.x, i.y / t.y);
        },
        getMatrix: function() {
          return this._matrix;
        },
        setMatrix: function() {
          var t = this._matrix;
          t.set.apply(t, arguments);
        },
        transform: function(t) {
          this._matrix.append(t);
        },
        scrollBy: function() {
          this.translate(y.read(arguments).negate());
        }
      }),
      {
        projectToView: function() {
          return this._matrix._transformPoint(y.read(arguments));
        },
        viewToProject: function() {
          return this._matrix._inverseTransform(y.read(arguments));
        },
        getEventPoint: function(t) {
          return this.viewToProject(Lt.getOffset(t, this._element));
        }
      },
      {
        statics: {
          _views: [],
          _viewsById: {},
          _id: 0,
          create: function(t, i) {
            l && typeof i == "string" && (i = l.getElementById(i));
            var a = o ? jt : zt;
            return new a(t, i);
          }
        }
      },
      new function() {
        if (!o)
          return;
        var t, i, a = !1, f = !1;
        function d(Q) {
          var nt = Lt.getTarget(Q);
          return nt.getAttribute && zt._viewsById[nt.getAttribute("id")];
        }
        function v() {
          var Q = zt._focused;
          if (!Q || !Q.isVisible()) {
            for (var nt = 0, st = zt._views.length; nt < st; nt++)
              if ((Q = zt._views[nt]).isVisible()) {
                zt._focused = i = Q;
                break;
              }
          }
        }
        function m(Q, nt, st) {
          Q._handleMouseEvent("mousemove", nt, st);
        }
        var p = o.navigator, w, T, E;
        p.pointerEnabled || p.msPointerEnabled ? (w = "pointerdown MSPointerDown", T = "pointermove MSPointerMove", E = "pointerup pointercancel MSPointerUp MSPointerCancel") : (w = "touchstart", T = "touchmove", E = "touchend touchcancel", "ontouchstart" in o && p.userAgent.match(
          /mobile|tablet|ip(ad|hone|od)|android|silk/i
        ) || (w += " mousedown", T += " mousemove", E += " mouseup"));
        var L = {}, I = {
          mouseout: function(Q) {
            var nt = zt._focused, st = Lt.getRelatedTarget(Q);
            if (nt && (!st || st.nodeName === "HTML")) {
              var dt = Lt.getOffset(Q, nt._element), gt = dt.x, pt = Math.abs, At = pt(gt), It = 1 << 25, Rt = At - It;
              dt.x = pt(Rt) < At ? Rt * (gt < 0 ? -1 : 1) : gt, m(nt, Q, nt.viewToProject(dt));
            }
          },
          scroll: v
        };
        L[w] = function(Q) {
          var nt = zt._focused = d(Q);
          a || (a = !0, nt._handleMouseEvent("mousedown", Q));
        }, I[T] = function(Q) {
          var nt = zt._focused;
          if (!f) {
            var st = d(Q);
            st ? nt !== st && (nt && m(nt, Q), t || (t = nt), nt = zt._focused = i = st) : i && i === nt && (t && !t.isInserted() && (t = null), nt = zt._focused = t, t = null, v());
          }
          nt && m(nt, Q);
        }, I[w] = function() {
          f = !0;
        }, I[E] = function(Q) {
          var nt = zt._focused;
          nt && a && nt._handleMouseEvent("mouseup", Q), f = a = !1;
        }, Lt.add(l, I), Lt.add(o, {
          load: v
        });
        var O = !1, B = !1, q = {
          doubleclick: "click",
          mousedrag: "mousemove"
        }, Y = !1, z, N, M, R, V, W, G, J;
        function j(Q, nt, st, dt, gt, pt, At) {
          var It = !1, Rt;
          function Qt(qt, Xt) {
            if (qt.responds(Xt)) {
              if (Rt || (Rt = new Te(
                Xt,
                dt,
                gt,
                nt || qt,
                pt ? gt.subtract(pt) : null
              )), qt.emit(Xt, Rt) && (O = !0, Rt.prevented && (B = !0), Rt.stopped))
                return It = !0;
            } else {
              var Gt = q[Xt];
              if (Gt)
                return Qt(qt, Gt);
            }
          }
          for (; Q && Q !== At && !Qt(Q, st); )
            Q = Q._parent;
          return It;
        }
        function tt(Q, nt, st, dt, gt, pt) {
          return Q._project.removeOn(st), B = O = !1, V && j(
            V,
            null,
            st,
            dt,
            gt,
            pt
          ) || nt && nt !== V && !nt.isDescendant(V) && j(nt, null, st === "mousedrag" ? "mousemove" : st, dt, gt, pt, V) || j(
            Q,
            V || nt || Q,
            st,
            dt,
            gt,
            pt
          );
        }
        var it = {
          mousedown: {
            mousedown: 1,
            mousedrag: 1,
            click: 1,
            doubleclick: 1
          },
          mouseup: {
            mouseup: 1,
            mousedrag: 1,
            click: 1,
            doubleclick: 1
          },
          mousemove: {
            mousedrag: 1,
            mousemove: 1,
            mouseenter: 1,
            mouseleave: 1
          }
        };
        return {
          _viewEvents: L,
          _handleMouseEvent: function(Q, nt, st) {
            var dt = this._itemEvents, gt = dt.native[Q], pt = Q === "mousemove", At = this._scope.tool, It = this;
            function Rt(Pe) {
              return dt.virtual[Pe] || It.responds(Pe) || At && At.responds(Pe);
            }
            pt && a && Rt("mousedrag") && (Q = "mousedrag"), st || (st = this.getEventPoint(nt));
            var Qt = this.getBounds().contains(st), qt = gt && Qt && It._project.hitTest(st, {
              tolerance: 0,
              fill: !0,
              stroke: !0
            }), Xt = qt && qt.item || null, Gt = !1, ee = {};
            if (ee[Q.substr(5)] = !0, gt && Xt !== R && (R && j(R, null, "mouseleave", nt, st), Xt && j(Xt, null, "mouseenter", nt, st), R = Xt), Y ^ Qt && (j(
              this,
              null,
              Qt ? "mouseenter" : "mouseleave",
              nt,
              st
            ), Gt = !0), (Qt || ee.drag) && !st.equals(N) && (tt(
              this,
              Xt,
              pt ? Q : "mousemove",
              nt,
              st,
              N
            ), Gt = !0), Y = Qt, ee.down && Qt || ee.up && z) {
              if (tt(this, Xt, Q, nt, st, z), ee.down) {
                if (J = Xt === W && Date.now() - G < 300, M = W = Xt, !B && Xt) {
                  for (var Jt = Xt; Jt && !Jt.responds("mousedrag"); )
                    Jt = Jt._parent;
                  Jt && (V = Xt);
                }
                z = st;
              } else
                ee.up && (!B && Xt === M && (G = Date.now(), tt(this, Xt, J ? "doubleclick" : "click", nt, st, z), J = !1), M = V = null);
              Y = !1, Gt = !0;
            }
            N = st, Gt && At && (O = At._handleMouseEvent(Q, nt, st, ee) || O), nt.cancelable !== !1 && (O && !ee.move || ee.down && Rt("mouseup")) && nt.preventDefault();
          },
          _handleKeyEvent: function(Q, nt, st, dt) {
            var gt = this._scope, pt = gt.tool, At;
            function It(Rt) {
              Rt.responds(Q) && (ce = gt, Rt.emit(Q, At = At || new Le(Q, nt, st, dt)));
            }
            this.isVisible() && (It(this), pt && pt.responds(Q) && It(pt));
          },
          _countItemEvent: function(Q, nt) {
            var st = this._itemEvents, dt = st.native, gt = st.virtual;
            for (var pt in it)
              dt[pt] = (dt[pt] || 0) + (it[pt][Q] || 0) * nt;
            gt[Q] = (gt[Q] || 0) + nt;
          },
          statics: {
            updateFocus: v,
            _resetState: function() {
              a = f = O = Y = !1, t = i = z = N = M = R = V = W = G = J = null;
            }
          }
        };
      }()
    ), jt = zt.extend({
      _class: "CanvasView",
      initialize: function(i, a) {
        if (!(a instanceof o.HTMLCanvasElement)) {
          var f = C.read(arguments, 1);
          if (f.isZero())
            throw new Error(
              "Cannot create CanvasView with the provided argument: " + h.slice(arguments, 1)
            );
          a = Be.getCanvas(f);
        }
        var d = this._context = a.getContext("2d");
        if (d.save(), this._pixelRatio = 1, !/^off|false$/.test(g.getAttribute(a, "hidpi"))) {
          var v = o.devicePixelRatio || 1, m = wt.getPrefixed(
            d,
            "backingStorePixelRatio"
          ) || 1;
          this._pixelRatio = v / m;
        }
        zt.call(this, i, a), this._needsUpdate = !0;
      },
      remove: function t() {
        return this._context.restore(), t.base.call(this);
      },
      _setElementSize: function t(i, a) {
        var f = this._pixelRatio;
        if (t.base.call(this, i * f, a * f), f !== 1) {
          var d = this._element, v = this._context;
          if (!g.hasAttribute(d, "resize")) {
            var m = d.style;
            m.width = i + "px", m.height = a + "px";
          }
          v.restore(), v.save(), v.scale(f, f);
        }
      },
      getContext: function() {
        return this._context;
      },
      getPixelSize: function t(i) {
        var a = ce.agent, f;
        if (a && a.firefox)
          f = t.base.call(this, i);
        else {
          var d = this._context, v = d.font;
          d.font = i + " serif", f = parseFloat(d.font), d.font = v;
        }
        return f;
      },
      getTextWidth: function(t, i) {
        var a = this._context, f = a.font, d = 0;
        a.font = t;
        for (var v = 0, m = i.length; v < m; v++)
          d = Math.max(d, a.measureText(i[v]).width);
        return a.font = f, d;
      },
      update: function() {
        if (!this._needsUpdate)
          return !1;
        var t = this._project, i = this._context, a = this._viewSize;
        return i.clearRect(0, 0, a.width + 1, a.height + 1), t && t.draw(i, this._matrix, this._pixelRatio), this._needsUpdate = !1, !0;
      }
    }), Se = h.extend({
      _class: "Event",
      initialize: function(i) {
        this.event = i, this.type = i && i.type;
      },
      prevented: !1,
      stopped: !1,
      preventDefault: function() {
        this.prevented = !0, this.event.preventDefault();
      },
      stopPropagation: function() {
        this.stopped = !0, this.event.stopPropagation();
      },
      stop: function() {
        this.stopPropagation(), this.preventDefault();
      },
      getTimeStamp: function() {
        return this.event.timeStamp;
      },
      getModifiers: function() {
        return Ge.modifiers;
      }
    }), Le = Se.extend({
      _class: "KeyEvent",
      initialize: function(i, a, f, d) {
        this.type = i, this.event = a, this.key = f, this.character = d;
      },
      toString: function() {
        return "{ type: '" + this.type + "', key: '" + this.key + "', character: '" + this.character + "', modifiers: " + this.getModifiers() + " }";
      }
    }), Ge = new function() {
      var t = {
        "	": "tab",
        " ": "space",
        "\b": "backspace",
        "": "delete",
        Spacebar: "space",
        Del: "delete",
        Win: "meta",
        Esc: "escape"
      }, i = {
        tab: "	",
        space: " ",
        enter: "\r"
      }, a = {}, f = {}, d, v, m = new h({
        shift: !1,
        control: !1,
        alt: !1,
        meta: !1,
        capsLock: !1,
        space: !1
      }).inject({
        option: {
          get: function() {
            return this.alt;
          }
        },
        command: {
          get: function() {
            var T = ce && ce.agent;
            return T && T.mac ? this.meta : this.control;
          }
        }
      });
      function p(T) {
        var E = T.key || T.keyIdentifier;
        return E = /^U\+/.test(E) ? String.fromCharCode(parseInt(E.substr(2), 16)) : /^Arrow[A-Z]/.test(E) ? E.substr(5) : E === "Unidentified" || E === r ? String.fromCharCode(T.keyCode) : E, t[E] || (E.length > 1 ? h.hyphenate(E) : E.toLowerCase());
      }
      function w(T, E, L, I) {
        var O = zt._focused, B;
        if (a[E] = T, T ? f[E] = L : delete f[E], E.length > 1 && (B = h.camelize(E)) in m) {
          m[B] = T;
          var q = ce && ce.agent;
          if (B === "meta" && q && q.mac)
            if (T)
              d = {};
            else {
              for (var Y in d)
                Y in f && w(!1, Y, d[Y], I);
              d = null;
            }
        } else
          T && d && (d[E] = L);
        O && O._handleKeyEvent(
          T ? "keydown" : "keyup",
          I,
          E,
          L
        );
      }
      return Lt.add(l, {
        keydown: function(T) {
          var E = p(T), L = ce && ce.agent;
          E.length > 1 || L && L.chrome && (T.altKey || L.mac && T.metaKey || !L.mac && T.ctrlKey) ? w(
            !0,
            E,
            i[E] || (E.length > 1 ? "" : E),
            T
          ) : v = E;
        },
        keypress: function(T) {
          if (v) {
            var E = p(T), L = T.charCode, I = L >= 32 ? String.fromCharCode(L) : E.length > 1 ? "" : E;
            E !== v && (E = I.toLowerCase()), w(!0, E, I, T), v = null;
          }
        },
        keyup: function(T) {
          var E = p(T);
          E in f && w(!1, E, f[E], T);
        }
      }), Lt.add(o, {
        blur: function(T) {
          for (var E in f)
            w(!1, E, f[E], T);
        }
      }), {
        modifiers: m,
        isDown: function(T) {
          return !!a[T];
        }
      };
    }(), Te = Se.extend({
      _class: "MouseEvent",
      initialize: function(i, a, f, d, v) {
        this.type = i, this.event = a, this.point = f, this.target = d, this.delta = v;
      },
      toString: function() {
        return "{ type: '" + this.type + "', point: " + this.point + ", target: " + this.target + (this.delta ? ", delta: " + this.delta : "") + ", modifiers: " + this.getModifiers() + " }";
      }
    }), Ae = Se.extend({
      _class: "ToolEvent",
      _item: null,
      initialize: function(i, a, f) {
        this.tool = i, this.type = a, this.event = f;
      },
      _choosePoint: function(t, i) {
        return t || (i ? i.clone() : null);
      },
      getPoint: function() {
        return this._choosePoint(this._point, this.tool._point);
      },
      setPoint: function(t) {
        this._point = t;
      },
      getLastPoint: function() {
        return this._choosePoint(this._lastPoint, this.tool._lastPoint);
      },
      setLastPoint: function(t) {
        this._lastPoint = t;
      },
      getDownPoint: function() {
        return this._choosePoint(this._downPoint, this.tool._downPoint);
      },
      setDownPoint: function(t) {
        this._downPoint = t;
      },
      getMiddlePoint: function() {
        return !this._middlePoint && this.tool._lastPoint ? this.tool._point.add(this.tool._lastPoint).divide(2) : this._middlePoint;
      },
      setMiddlePoint: function(t) {
        this._middlePoint = t;
      },
      getDelta: function() {
        return !this._delta && this.tool._lastPoint ? this.tool._point.subtract(this.tool._lastPoint) : this._delta;
      },
      setDelta: function(t) {
        this._delta = t;
      },
      getCount: function() {
        return this.tool[/^mouse(down|up)$/.test(this.type) ? "_downCount" : "_moveCount"];
      },
      setCount: function(t) {
        this.tool[/^mouse(down|up)$/.test(this.type) ? "downCount" : "count"] = t;
      },
      getItem: function() {
        if (!this._item) {
          var t = this.tool._scope.project.hitTest(this.getPoint());
          if (t) {
            for (var i = t.item, a = i._parent; /^(Group|CompoundPath)$/.test(a._class); )
              i = a, a = a._parent;
            this._item = i;
          }
        }
        return this._item;
      },
      setItem: function(t) {
        this._item = t;
      },
      toString: function() {
        return "{ type: " + this.type + ", point: " + this.getPoint() + ", count: " + this.getCount() + ", modifiers: " + this.getModifiers() + " }";
      }
    });
    b.extend({
      _class: "Tool",
      _list: "tools",
      _reference: "tool",
      _events: [
        "onMouseDown",
        "onMouseUp",
        "onMouseDrag",
        "onMouseMove",
        "onActivate",
        "onDeactivate",
        "onEditOptions",
        "onKeyDown",
        "onKeyUp"
      ],
      initialize: function(i) {
        b.call(this), this._moveCount = -1, this._downCount = -1, this.set(i);
      },
      getMinDistance: function() {
        return this._minDistance;
      },
      setMinDistance: function(t) {
        this._minDistance = t, t != null && this._maxDistance != null && t > this._maxDistance && (this._maxDistance = t);
      },
      getMaxDistance: function() {
        return this._maxDistance;
      },
      setMaxDistance: function(t) {
        this._maxDistance = t, this._minDistance != null && t != null && t < this._minDistance && (this._minDistance = t);
      },
      getFixedDistance: function() {
        return this._minDistance == this._maxDistance ? this._minDistance : null;
      },
      setFixedDistance: function(t) {
        this._minDistance = this._maxDistance = t;
      },
      _handleMouseEvent: function(t, i, a, f) {
        ce = this._scope, f.drag && !this.responds(t) && (t = "mousemove");
        var d = f.move || f.drag, v = this.responds(t), m = !1, p = this;
        function w(E, L) {
          var I = a, O = d ? p._point : p._downPoint || I;
          if (d) {
            if (p._moveCount >= 0 && I.equals(O))
              return !1;
            if (O && (E != null || L != null)) {
              var B = I.subtract(O), q = B.getLength();
              if (q < (E || 0))
                return !1;
              L && (I = O.add(B.normalize(
                Math.min(q, L)
              )));
            }
            p._moveCount++;
          }
          return p._point = I, p._lastPoint = O || I, f.down && (p._moveCount = -1, p._downPoint = I, p._downCount++), !0;
        }
        function T() {
          v && (m = p.emit(t, new Ae(p, t, i)) || m);
        }
        if (f.down)
          w(), T();
        else if (f.up)
          w(null, this._maxDistance), T();
        else if (v)
          for (; w(this._minDistance, this._maxDistance); )
            T();
        return m;
      }
    });
    var Fn = h.extend(c, {
      _class: "Tween",
      statics: {
        easings: new h({
          linear: function(t) {
            return t;
          },
          easeInQuad: function(t) {
            return t * t;
          },
          easeOutQuad: function(t) {
            return t * (2 - t);
          },
          easeInOutQuad: function(t) {
            return t < 0.5 ? 2 * t * t : -1 + 2 * (2 - t) * t;
          },
          easeInCubic: function(t) {
            return t * t * t;
          },
          easeOutCubic: function(t) {
            return --t * t * t + 1;
          },
          easeInOutCubic: function(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          },
          easeInQuart: function(t) {
            return t * t * t * t;
          },
          easeOutQuart: function(t) {
            return 1 - --t * t * t * t;
          },
          easeInOutQuart: function(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
          },
          easeInQuint: function(t) {
            return t * t * t * t * t;
          },
          easeOutQuint: function(t) {
            return 1 + --t * t * t * t * t;
          },
          easeInOutQuint: function(t) {
            return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
          }
        })
      },
      initialize: function t(i, a, f, d, v, m) {
        this.object = i;
        var p = typeof v, w = p === "function";
        this.type = w ? p : p === "string" ? v : "linear", this.easing = w ? v : t.easings[this.type], this.duration = d, this.running = !1, this._then = null, this._startTime = null;
        var T = a || f;
        this._keys = T ? Object.keys(T) : [], this._parsedKeys = this._parseKeys(this._keys), this._from = T && this._getState(a), this._to = T && this._getState(f), m !== !1 && this.start();
      },
      then: function(t) {
        return this._then = t, this;
      },
      start: function() {
        return this._startTime = null, this.running = !0, this;
      },
      stop: function() {
        return this.running = !1, this;
      },
      update: function(t) {
        if (this.running) {
          t >= 1 && (t = 1, this.running = !1);
          for (var i = this.easing(t), a = this._keys, f = function(E) {
            return typeof E == "function" ? E(i, t) : E;
          }, d = 0, v = a && a.length; d < v; d++) {
            var m = a[d], p = f(this._from[m]), w = f(this._to[m]), T = p && w && p.__add && w.__add ? w.__subtract(p).__multiply(i).__add(p) : (w - p) * i + p;
            this._setProperty(this._parsedKeys[m], T);
          }
          this.responds("update") && this.emit("update", new h({
            progress: t,
            factor: i
          })), !this.running && this._then && this._then(this.object);
        }
        return this;
      },
      _events: {
        onUpdate: {}
      },
      _handleFrame: function(t) {
        var i = this._startTime, a = i ? (t - i) / this.duration : 0;
        i || (this._startTime = t), this.update(a);
      },
      _getState: function(t) {
        for (var i = this._keys, a = {}, f = 0, d = i.length; f < d; f++) {
          var v = i[f], m = this._parsedKeys[v], p = this._getProperty(m), w;
          if (t) {
            var T = this._resolveValue(p, t[v]);
            this._setProperty(m, T), w = this._getProperty(m), w = w && w.clone ? w.clone() : w, this._setProperty(m, p);
          } else
            w = p && p.clone ? p.clone() : p;
          a[v] = w;
        }
        return a;
      },
      _resolveValue: function(t, i) {
        if (i) {
          if (Array.isArray(i) && i.length === 2) {
            var a = i[0];
            return a && a.match && a.match(/^[+\-\*\/]=/) ? this._calculate(t, a[0], i[1]) : i;
          } else if (typeof i == "string") {
            var f = i.match(/^[+\-*/]=(.*)/);
            if (f) {
              var d = JSON.parse(f[1].replace(
                /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
                '"$2": '
              ));
              return this._calculate(t, i[0], d);
            }
          }
        }
        return i;
      },
      _calculate: function(t, i, a) {
        return ce.PaperScript.calculateBinary(t, i, a);
      },
      _parseKeys: function(t) {
        for (var i = {}, a = 0, f = t.length; a < f; a++) {
          var d = t[a], v = d.replace(/\.([^.]*)/g, "/$1").replace(/\[['"]?([^'"\]]*)['"]?\]/g, "/$1");
          i[d] = v.split("/");
        }
        return i;
      },
      _getProperty: function(t, i) {
        for (var a = this.object, f = 0, d = t.length - (i || 0); f < d && a; f++)
          a = a[t[f]];
        return a;
      },
      _setProperty: function(t, i) {
        var a = this._getProperty(t, 1);
        a && (a[t[t.length - 1]] = i);
      }
    }), ir = {
      request: function(t) {
        var i = new e.XMLHttpRequest();
        return i.open(
          (t.method || "get").toUpperCase(),
          t.url,
          h.pick(t.async, !0)
        ), t.mimeType && i.overrideMimeType(t.mimeType), i.onload = function() {
          var a = i.status;
          a === 0 || a === 200 ? t.onLoad && t.onLoad.call(i, i.responseText) : i.onerror();
        }, i.onerror = function() {
          var a = i.status, f = 'Could not load "' + t.url + '" (Status: ' + a + ")";
          if (t.onError)
            t.onError(f, a);
          else
            throw new Error(f);
        }, i.send(null);
      }
    }, Be = h.exports.CanvasProvider = {
      canvases: [],
      getCanvas: function(t, i, a) {
        if (!o)
          return null;
        var f, d = !0;
        typeof t == "object" && (i = t.height, t = t.width), this.canvases.length ? f = this.canvases.pop() : (f = l.createElement("canvas"), d = !1);
        var v = f.getContext("2d", a || {});
        if (!v)
          throw new Error("Canvas " + f + " is unable to provide a 2D context.");
        return f.width === t && f.height === i ? d && v.clearRect(0, 0, t + 1, i + 1) : (f.width = t, f.height = i), v.save(), f;
      },
      getContext: function(t, i, a) {
        var f = this.getCanvas(t, i, a);
        return f ? f.getContext("2d", a || {}) : null;
      },
      release: function(t) {
        var i = t && t.canvas ? t.canvas : t;
        i && i.getContext && (i.getContext("2d").restore(), this.canvases.push(i));
      }
    }, _n = new function() {
      var t = Math.min, i = Math.max, a = Math.abs, f, d, v, m, p, w, T, E, L, I, O;
      function B(V, W, G) {
        return 0.2989 * V + 0.587 * W + 0.114 * G;
      }
      function q(V, W, G, tt) {
        var j = tt - B(V, W, G);
        L = V + j, I = W + j, O = G + j;
        var tt = B(L, I, O), it = t(L, I, O), Q = i(L, I, O);
        if (it < 0) {
          var nt = tt - it;
          L = tt + (L - tt) * tt / nt, I = tt + (I - tt) * tt / nt, O = tt + (O - tt) * tt / nt;
        }
        if (Q > 255) {
          var st = 255 - tt, dt = Q - tt;
          L = tt + (L - tt) * st / dt, I = tt + (I - tt) * st / dt, O = tt + (O - tt) * st / dt;
        }
      }
      function Y(V, W, G) {
        return i(V, W, G) - t(V, W, G);
      }
      function z(V, W, G, J) {
        var j = [V, W, G], tt = i(V, W, G), it = t(V, W, G), Q;
        it = it === V ? 0 : it === W ? 1 : 2, tt = tt === V ? 0 : tt === W ? 1 : 2, Q = t(it, tt) === 0 ? i(it, tt) === 1 ? 2 : 1 : 0, j[tt] > j[it] ? (j[Q] = (j[Q] - j[it]) * J / (j[tt] - j[it]), j[tt] = J) : j[Q] = j[tt] = 0, j[it] = 0, L = j[0], I = j[1], O = j[2];
      }
      var N = {
        multiply: function() {
          L = p * f / 255, I = w * d / 255, O = T * v / 255;
        },
        screen: function() {
          L = p + f - p * f / 255, I = w + d - w * d / 255, O = T + v - T * v / 255;
        },
        overlay: function() {
          L = p < 128 ? 2 * p * f / 255 : 255 - 2 * (255 - p) * (255 - f) / 255, I = w < 128 ? 2 * w * d / 255 : 255 - 2 * (255 - w) * (255 - d) / 255, O = T < 128 ? 2 * T * v / 255 : 255 - 2 * (255 - T) * (255 - v) / 255;
        },
        "soft-light": function() {
          var V = f * p / 255;
          L = V + p * (255 - (255 - p) * (255 - f) / 255 - V) / 255, V = d * w / 255, I = V + w * (255 - (255 - w) * (255 - d) / 255 - V) / 255, V = v * T / 255, O = V + T * (255 - (255 - T) * (255 - v) / 255 - V) / 255;
        },
        "hard-light": function() {
          L = f < 128 ? 2 * f * p / 255 : 255 - 2 * (255 - f) * (255 - p) / 255, I = d < 128 ? 2 * d * w / 255 : 255 - 2 * (255 - d) * (255 - w) / 255, O = v < 128 ? 2 * v * T / 255 : 255 - 2 * (255 - v) * (255 - T) / 255;
        },
        "color-dodge": function() {
          L = p === 0 ? 0 : f === 255 ? 255 : t(255, 255 * p / (255 - f)), I = w === 0 ? 0 : d === 255 ? 255 : t(255, 255 * w / (255 - d)), O = T === 0 ? 0 : v === 255 ? 255 : t(255, 255 * T / (255 - v));
        },
        "color-burn": function() {
          L = p === 255 ? 255 : f === 0 ? 0 : i(0, 255 - (255 - p) * 255 / f), I = w === 255 ? 255 : d === 0 ? 0 : i(0, 255 - (255 - w) * 255 / d), O = T === 255 ? 255 : v === 0 ? 0 : i(0, 255 - (255 - T) * 255 / v);
        },
        darken: function() {
          L = p < f ? p : f, I = w < d ? w : d, O = T < v ? T : v;
        },
        lighten: function() {
          L = p > f ? p : f, I = w > d ? w : d, O = T > v ? T : v;
        },
        difference: function() {
          L = p - f, L < 0 && (L = -L), I = w - d, I < 0 && (I = -I), O = T - v, O < 0 && (O = -O);
        },
        exclusion: function() {
          L = p + f * (255 - p - p) / 255, I = w + d * (255 - w - w) / 255, O = T + v * (255 - T - T) / 255;
        },
        hue: function() {
          z(f, d, v, Y(p, w, T)), q(L, I, O, B(p, w, T));
        },
        saturation: function() {
          z(p, w, T, Y(f, d, v)), q(L, I, O, B(p, w, T));
        },
        luminosity: function() {
          q(p, w, T, B(f, d, v));
        },
        color: function() {
          q(f, d, v, B(p, w, T));
        },
        add: function() {
          L = t(p + f, 255), I = t(w + d, 255), O = t(T + v, 255);
        },
        subtract: function() {
          L = i(p - f, 0), I = i(w - d, 0), O = i(T - v, 0);
        },
        average: function() {
          L = (p + f) / 2, I = (w + d) / 2, O = (T + v) / 2;
        },
        negation: function() {
          L = 255 - a(255 - f - p), I = 255 - a(255 - d - w), O = 255 - a(255 - v - T);
        }
      }, M = this.nativeModes = h.each([
        "source-over",
        "source-in",
        "source-out",
        "source-atop",
        "destination-over",
        "destination-in",
        "destination-out",
        "destination-atop",
        "lighter",
        "darker",
        "copy",
        "xor"
      ], function(V) {
        this[V] = !0;
      }, {}), R = Be.getContext(1, 1, { willReadFrequently: !0 });
      R && (h.each(N, function(V, W) {
        var G = W === "darken", J = !1;
        R.save();
        try {
          R.fillStyle = G ? "#300" : "#a00", R.fillRect(0, 0, 1, 1), R.globalCompositeOperation = W, R.globalCompositeOperation === W && (R.fillStyle = G ? "#a00" : "#300", R.fillRect(0, 0, 1, 1), J = R.getImageData(0, 0, 1, 1).data[0] !== G ? 170 : 51);
        } catch {
        }
        R.restore(), M[W] = J;
      }), Be.release(R)), this.process = function(V, W, G, J, j) {
        var tt = W.canvas, it = V === "normal";
        if (it || M[V])
          G.save(), G.setTransform(1, 0, 0, 1, 0, 0), G.globalAlpha = J, it || (G.globalCompositeOperation = V), G.drawImage(tt, j.x, j.y), G.restore();
        else {
          var Q = N[V];
          if (!Q)
            return;
          for (var nt = G.getImageData(
            j.x,
            j.y,
            tt.width,
            tt.height
          ), st = nt.data, dt = W.getImageData(
            0,
            0,
            tt.width,
            tt.height
          ).data, gt = 0, pt = st.length; gt < pt; gt += 4) {
            f = dt[gt], p = st[gt], d = dt[gt + 1], w = st[gt + 1], v = dt[gt + 2], T = st[gt + 2], m = dt[gt + 3], E = st[gt + 3], Q();
            var At = m * J / 255, It = 1 - At;
            st[gt] = At * L + It * p, st[gt + 1] = At * I + It * w, st[gt + 2] = At * O + It * T, st[gt + 3] = m * J + It * E;
          }
          G.putImageData(nt, j.x, j.y);
        }
      };
    }(), Re = new function() {
      var t = "http://www.w3.org/2000/svg", i = "http://www.w3.org/2000/xmlns", a = "http://www.w3.org/1999/xlink", f = {
        href: a,
        xlink: i,
        xmlns: i + "/",
        "xmlns:xlink": i + "/"
      };
      function d(p, w, T) {
        return m(l.createElementNS(t, p), w, T);
      }
      function v(p, w) {
        var T = f[w], E = T ? p.getAttributeNS(T, w) : p.getAttribute(w);
        return E === "null" ? null : E;
      }
      function m(p, w, T) {
        for (var E in w) {
          var L = w[E], I = f[E];
          typeof L == "number" && T && (L = T.number(L)), I ? p.setAttributeNS(I, E, L) : p.setAttribute(E, L);
        }
        return p;
      }
      return {
        svg: t,
        xmlns: i,
        xlink: a,
        create: d,
        get: v,
        set: m
      };
    }(), yi = h.each({
      fillColor: ["fill", "color"],
      fillRule: ["fill-rule", "string"],
      strokeColor: ["stroke", "color"],
      strokeWidth: ["stroke-width", "number"],
      strokeCap: ["stroke-linecap", "string"],
      strokeJoin: ["stroke-linejoin", "string"],
      strokeScaling: ["vector-effect", "lookup", {
        true: "none",
        false: "non-scaling-stroke"
      }, function(t, i) {
        return !i && (t instanceof Yt || t instanceof at || t instanceof rn);
      }],
      miterLimit: ["stroke-miterlimit", "number"],
      dashArray: ["stroke-dasharray", "array"],
      dashOffset: ["stroke-dashoffset", "number"],
      fontFamily: ["font-family", "string"],
      fontWeight: ["font-weight", "string"],
      fontSize: ["font-size", "number"],
      justification: ["text-anchor", "lookup", {
        left: "start",
        center: "middle",
        right: "end"
      }],
      opacity: ["opacity", "number"],
      blendMode: ["mix-blend-mode", "style"]
    }, function(t, i) {
      var a = h.capitalize(i), f = t[2];
      this[i] = {
        type: t[1],
        property: i,
        attribute: t[0],
        toSVG: f,
        fromSVG: f && h.each(f, function(d, v) {
          this[d] = v;
        }, {}),
        exportFilter: t[3],
        get: "get" + a,
        set: "set" + a
      };
    }, {});
    new function() {
      var t;
      function i(N, M, R) {
        var V = new h(), W = N.getTranslation();
        if (M) {
          var G;
          N.isInvertible() ? (N = N._shiftless(), G = N._inverseTransform(W), W = null) : G = new y(), V[R ? "cx" : "x"] = G.x, V[R ? "cy" : "y"] = G.y;
        }
        if (!N.isIdentity()) {
          var J = N.decompose();
          if (J) {
            var j = [], tt = J.rotation, it = J.scaling, Q = J.skewing;
            W && !W.isZero() && j.push("translate(" + t.point(W) + ")"), tt && j.push("rotate(" + t.number(tt) + ")"), (!A.isZero(it.x - 1) || !A.isZero(it.y - 1)) && j.push("scale(" + t.point(it) + ")"), Q.x && j.push("skewX(" + t.number(Q.x) + ")"), Q.y && j.push("skewY(" + t.number(Q.y) + ")"), V.transform = j.join(" ");
          } else
            V.transform = "matrix(" + N.getValues().join(",") + ")";
        }
        return V;
      }
      function a(N, M) {
        for (var R = i(N._matrix), V = N._children, W = Re.create("g", R, t), G = 0, J = V.length; G < J; G++) {
          var j = V[G], tt = Y(j, M);
          if (tt)
            if (j.isClipMask()) {
              var it = Re.create("clipPath");
              it.appendChild(tt), B(j, it, "clip"), Re.set(W, {
                "clip-path": "url(#" + it.id + ")"
              });
            } else
              W.appendChild(tt);
        }
        return W;
      }
      function f(N, M) {
        var R = i(N._matrix, !0), V = N.getSize(), W = N.getImage();
        return R.x -= V.width / 2, R.y -= V.height / 2, R.width = V.width, R.height = V.height, R.href = M.embedImages == !1 && W && W.src || N.toDataURL(), Re.create("image", R, t);
      }
      function d(N, M) {
        var R = M.matchShapes;
        if (R) {
          var V = N.toShape(!1);
          if (V)
            return v(V);
        }
        var W = N._segments, G = W.length, J, j = i(N._matrix);
        if (R && G >= 2 && !N.hasHandles())
          if (G > 2) {
            J = N._closed ? "polygon" : "polyline";
            for (var tt = [], it = 0; it < G; it++)
              tt.push(t.point(W[it]._point));
            j.points = tt.join(" ");
          } else {
            J = "line";
            var Q = W[0]._point, nt = W[1]._point;
            j.set({
              x1: Q.x,
              y1: Q.y,
              x2: nt.x,
              y2: nt.y
            });
          }
        else
          J = "path", j.d = N.getPathData(null, M.precision);
        return Re.create(J, j, t);
      }
      function v(N) {
        var M = N._type, R = N._radius, V = i(N._matrix, !0, M !== "rectangle");
        if (M === "rectangle") {
          M = "rect";
          var W = N._size, G = W.width, J = W.height;
          V.x -= G / 2, V.y -= J / 2, V.width = G, V.height = J, R.isZero() && (R = null);
        }
        return R && (M === "circle" ? V.r = R : (V.rx = R.width, V.ry = R.height)), Re.create(M, V, t);
      }
      function m(N, M) {
        var R = i(N._matrix), V = N.getPathData(null, M.precision);
        return V && (R.d = V), Re.create("path", R, t);
      }
      function p(N, M) {
        var R = i(N._matrix, !0), V = N._definition, W = O(V, "symbol"), G = V._item, J = G.getStrokeBounds();
        return W || (W = Re.create("symbol", {
          viewBox: t.rectangle(J)
        }), W.appendChild(Y(G, M)), B(V, W, "symbol")), R.href = "#" + W.id, R.x += J.x, R.y += J.y, R.width = J.width, R.height = J.height, R.overflow = "visible", Re.create("use", R, t);
      }
      function w(N) {
        var M = O(N, "color");
        if (!M) {
          var R = N.getGradient(), V = R._radial, W = N.getOrigin(), G = N.getDestination(), J;
          if (V) {
            J = {
              cx: W.x,
              cy: W.y,
              r: W.getDistance(G)
            };
            var j = N.getHighlight();
            j && (J.fx = j.x, J.fy = j.y);
          } else
            J = {
              x1: W.x,
              y1: W.y,
              x2: G.x,
              y2: G.y
            };
          J.gradientUnits = "userSpaceOnUse", M = Re.create((V ? "radial" : "linear") + "Gradient", J, t);
          for (var tt = R._stops, it = 0, Q = tt.length; it < Q; it++) {
            var nt = tt[it], st = nt._color, dt = st.getAlpha(), gt = nt._offset;
            J = {
              offset: gt ?? it / (Q - 1)
            }, st && (J["stop-color"] = st.toCSS(!0)), dt < 1 && (J["stop-opacity"] = dt), M.appendChild(
              Re.create("stop", J, t)
            );
          }
          B(N, M, "color");
        }
        return "url(#" + M.id + ")";
      }
      function T(N) {
        var M = Re.create(
          "text",
          i(N._matrix, !0),
          t
        );
        return M.textContent = N._content, M;
      }
      var E = {
        Group: a,
        Layer: a,
        Raster: f,
        Path: d,
        Shape: v,
        CompoundPath: m,
        SymbolItem: p,
        PointText: T
      };
      function L(N, M, R, V) {
        var W = {}, G = !V && N.getParent(), J = [];
        return N._name != null && (W.id = N._name), h.each(yi, function(j) {
          var tt = j.get, it = j.type, Q = N[tt]();
          if (j.exportFilter ? j.exportFilter(N, Q) : R.reduceAttributes == !1 || !G || !h.equals(G[tt](), Q)) {
            if (it === "color" && Q != null) {
              var nt = Q.getAlpha();
              nt < 1 && (W[j.attribute + "-opacity"] = nt);
            }
            it === "style" ? J.push(j.attribute + ": " + Q) : W[j.attribute] = Q == null ? "none" : it === "color" ? Q.gradient ? w(Q) : Q.toCSS(!0) : it === "array" ? Q.join(",") : it === "lookup" ? j.toSVG[Q] : Q;
          }
        }), J.length && (W.style = J.join(";")), W.opacity === 1 && delete W.opacity, N._visible || (W.visibility = "hidden"), Re.set(M, W, t);
      }
      var I;
      function O(N, M) {
        return I || (I = { ids: {}, svgs: {} }), N && I.svgs[M + "-" + (N._id || N.__id || (N.__id = k.get("svg")))];
      }
      function B(N, M, R) {
        I || O();
        var V = I.ids[R] = (I.ids[R] || 0) + 1;
        M.id = R + "-" + V, I.svgs[R + "-" + (N._id || N.__id)] = M;
      }
      function q(N, M) {
        var R = N, V = null;
        if (I) {
          R = N.nodeName.toLowerCase() === "svg" && N;
          for (var W in I.svgs)
            V || (R || (R = Re.create("svg"), R.appendChild(N)), V = R.insertBefore(
              Re.create("defs"),
              R.firstChild
            )), V.appendChild(I.svgs[W]);
          I = null;
        }
        return M.asString ? new e.XMLSerializer().serializeToString(R) : R;
      }
      function Y(N, M, R) {
        var V = E[N._class], W = V && V(N, M);
        if (W) {
          var G = M.onExport;
          G && (W = G(N, W, M) || W);
          var J = JSON.stringify(N._data);
          J && J !== "{}" && J !== "null" && W.setAttribute("data-paper-data", J);
        }
        return W && L(N, W, M, R);
      }
      function z(N) {
        return N || (N = {}), t = new S(N.precision), N;
      }
      ct.inject({
        exportSVG: function(N) {
          return N = z(N), q(Y(this, N, !0), N);
        }
      }), lt.inject({
        exportSVG: function(N) {
          N = z(N);
          var M = this._children, R = this.getView(), V = h.pick(N.bounds, "view"), W = N.matrix || V === "view" && R._matrix, G = W && K.read([W]), J = V === "view" ? new $([0, 0], R.getViewSize()) : V === "content" ? ct._getBounds(M, G, { stroke: !0 }).rect : $.read([V], 0, { readNull: !0 }), j = {
            version: "1.1",
            xmlns: Re.svg,
            "xmlns:xlink": Re.xlink
          };
          J && (j.width = J.width, j.height = J.height, (J.x || J.x === 0 || J.y || J.y === 0) && (j.viewBox = t.rectangle(J)));
          var tt = Re.create("svg", j, t), it = tt;
          G && !G.isIdentity() && (it = tt.appendChild(Re.create(
            "g",
            i(G),
            t
          )));
          for (var Q = 0, nt = M.length; Q < nt; Q++)
            it.appendChild(Y(M[Q], N, !0));
          return q(tt, N);
        }
      });
    }(), new function() {
      var t = {}, i;
      function a(M, R, V, W, G, J) {
        var j = Re.get(M, R) || J, tt = j == null ? W ? null : V ? "" : 0 : V ? j : parseFloat(j);
        return /%\s*$/.test(j) ? tt / 100 * (G ? 1 : i[/x|^width/.test(R) ? "width" : "height"]) : tt;
      }
      function f(M, R, V, W, G, J, j) {
        return R = a(M, R || "x", !1, W, G, J), V = a(M, V || "y", !1, W, G, j), W && (R == null || V == null) ? null : new y(R, V);
      }
      function d(M, R, V, W, G) {
        return R = a(M, R || "width", !1, W, G), V = a(M, V || "height", !1, W, G), W && (R == null || V == null) ? null : new C(R, V);
      }
      function v(M, R, V) {
        return M === "none" ? null : R === "number" ? parseFloat(M) : R === "array" ? M ? M.split(/[\s,]+/g).map(parseFloat) : [] : R === "color" ? Y(M) || M : R === "lookup" ? V[M] : M;
      }
      function m(M, R, V, W) {
        var G = M.childNodes, J = R === "clippath", j = R === "defs", tt = new ht(), it = tt._project, Q = it._currentStyle, nt = [];
        if (!J && !j && (tt = q(tt, M, W), it._currentStyle = tt._style.clone()), W)
          for (var st = M.querySelectorAll("defs"), dt = 0, gt = st.length; dt < gt; dt++)
            z(st[dt], V, !1);
        for (var dt = 0, gt = G.length; dt < gt; dt++) {
          var pt = G[dt], At;
          pt.nodeType === 1 && !/^defs$/i.test(pt.nodeName) && (At = z(pt, V, !1)) && !(At instanceof Et) && nt.push(At);
        }
        return tt.addChildren(nt), J && (tt = q(tt.reduce(), M, W)), it._currentStyle = Q, (J || j) && (tt.remove(), tt = null), tt;
      }
      function p(M, R) {
        for (var V = M.getAttribute("points").match(
          /[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g
        ), W = [], G = 0, J = V.length; G < J; G += 2)
          W.push(new y(
            parseFloat(V[G]),
            parseFloat(V[G + 1])
          ));
        var j = new Bt(W);
        return R === "polygon" && j.closePath(), j;
      }
      function w(M) {
        return Yt.create(M.getAttribute("d"));
      }
      function T(M, R) {
        var V = (a(M, "href", !0) || "").substring(1), W = R === "radialgradient", G;
        if (V)
          G = t[V].getGradient(), G._radial ^ W && (G = G.clone(), G._radial = W);
        else {
          for (var J = M.childNodes, j = [], tt = 0, it = J.length; tt < it; tt++) {
            var Q = J[tt];
            Q.nodeType === 1 && j.push(q(new si(), Q));
          }
          G = new qe(j, W);
        }
        var nt, st, dt, gt = a(M, "gradientUnits", !0) !== "userSpaceOnUse";
        W ? (nt = f(
          M,
          "cx",
          "cy",
          !1,
          gt,
          "50%",
          "50%"
        ), st = nt.add(
          a(M, "r", !1, !1, gt, "50%"),
          0
        ), dt = f(M, "fx", "fy", !0, gt)) : (nt = f(
          M,
          "x1",
          "y1",
          !1,
          gt,
          "0%",
          "0%"
        ), st = f(
          M,
          "x2",
          "y2",
          !1,
          gt,
          "100%",
          "0%"
        ));
        var pt = q(
          new oe(G, nt, st, dt),
          M
        );
        return pt._scaleToBounds = gt, null;
      }
      var E = {
        "#document": function(M, R, V, W) {
          for (var G = M.childNodes, J = 0, j = G.length; J < j; J++) {
            var tt = G[J];
            if (tt.nodeType === 1)
              return z(tt, V, W);
          }
        },
        g: m,
        svg: m,
        clippath: m,
        polygon: p,
        polyline: p,
        path: w,
        lineargradient: T,
        radialgradient: T,
        image: function(M) {
          var R = new Pt(a(M, "href", !0));
          return R.on("load", function() {
            var V = d(M);
            this.setSize(V);
            var W = f(M).add(V.divide(2));
            this._matrix.append(new K().translate(W));
          }), R;
        },
        symbol: function(M, R, V, W) {
          return new Et(
            m(M, R, V, W),
            !0
          );
        },
        defs: m,
        use: function(M) {
          var R = (a(M, "href", !0) || "").substring(1), V = t[R], W = f(M);
          return V ? V instanceof Et ? V.place(W) : V.clone().translate(W) : null;
        },
        circle: function(M) {
          return new at.Circle(
            f(M, "cx", "cy"),
            a(M, "r")
          );
        },
        ellipse: function(M) {
          return new at.Ellipse({
            center: f(M, "cx", "cy"),
            radius: d(M, "rx", "ry")
          });
        },
        rect: function(M) {
          return new at.Rectangle(new $(
            f(M),
            d(M)
          ), d(M, "rx", "ry"));
        },
        line: function(M) {
          return new Bt.Line(
            f(M, "x1", "y1"),
            f(M, "x2", "y2")
          );
        },
        text: function(M) {
          var R = new ye(f(M).add(
            f(M, "dx", "dy")
          ));
          return R.setContent(M.textContent.trim() || ""), R;
        },
        switch: m
      };
      function L(M, R, V, W) {
        if (M.transform) {
          for (var G = (W.getAttribute(V) || "").split(/\)\s*/g), J = new K(), j = 0, tt = G.length; j < tt; j++) {
            var it = G[j];
            if (!it)
              break;
            for (var Q = it.split(/\(\s*/), nt = Q[0].trim(), st = Q[1].split(/[\s,]+/g), dt = 0, gt = st.length; dt < gt; dt++)
              st[dt] = parseFloat(st[dt]);
            switch (nt) {
              case "matrix":
                J.append(
                  new K(st[0], st[1], st[2], st[3], st[4], st[5])
                );
                break;
              case "rotate":
                J.rotate(st[0], st[1] || 0, st[2] || 0);
                break;
              case "translate":
                J.translate(st[0], st[1] || 0);
                break;
              case "scale":
                J.scale(st);
                break;
              case "skewX":
                J.skew(st[0], 0);
                break;
              case "skewY":
                J.skew(0, st[0]);
                break;
            }
          }
          M.transform(J);
        }
      }
      function I(M, R, V) {
        var W = V === "fill-opacity" ? "getFillColor" : "getStrokeColor", G = M[W] && M[W]();
        G && G.setAlpha(parseFloat(R));
      }
      var O = h.set(h.each(yi, function(M) {
        this[M.attribute] = function(R, V) {
          if (R[M.set] && (R[M.set](v(V, M.type, M.fromSVG)), M.type === "color")) {
            var W = R[M.get]();
            if (W && W._scaleToBounds) {
              var G = R.getBounds();
              W.transform(new K().translate(G.getPoint()).scale(G.getSize()));
            }
          }
        };
      }, {}), {
        id: function(M, R) {
          t[R] = M, M.setName && M.setName(R);
        },
        "clip-path": function(M, R) {
          var V = Y(R);
          if (V)
            if (V = V.clone(), V.setClipMask(!0), M instanceof ht)
              M.insertChild(0, V);
            else
              return new ht(V, M);
        },
        gradientTransform: L,
        transform: L,
        "fill-opacity": I,
        "stroke-opacity": I,
        visibility: function(M, R) {
          M.setVisible && M.setVisible(R === "visible");
        },
        display: function(M, R) {
          M.setVisible && M.setVisible(R !== null);
        },
        "stop-color": function(M, R) {
          M.setColor && M.setColor(R);
        },
        "stop-opacity": function(M, R) {
          M._color && M._color.setAlpha(parseFloat(R));
        },
        offset: function(M, R) {
          if (M.setOffset) {
            var V = R.match(/(.*)%$/);
            M.setOffset(V ? V[1] / 100 : parseFloat(R));
          }
        },
        viewBox: function(M, R, V, W, G) {
          var J = new $(v(R, "array")), j = d(W, null, null, !0), tt, it;
          if (M instanceof ht) {
            var Q = j ? j.divide(J.getSize()) : 1, it = new K().scale(Q).translate(J.getPoint().negate());
            tt = M;
          } else
            M instanceof Et && (j && J.setSize(j), tt = M._item);
          if (tt) {
            if (B(W, "overflow", G) !== "visible") {
              var nt = new at.Rectangle(J);
              nt.setClipMask(!0), tt.addChild(nt);
            }
            it && tt.transform(it);
          }
        }
      });
      function B(M, R, V) {
        var W = M.attributes[R], G = W && W.value;
        if (!G && M.style) {
          var J = h.camelize(R);
          G = M.style[J], !G && V.node[J] !== V.parent[J] && (G = V.node[J]);
        }
        return G ? G === "none" ? null : G : r;
      }
      function q(M, R, V) {
        var W = R.parentNode, G = {
          node: wt.getStyles(R) || {},
          parent: !V && !/^defs$/i.test(W.tagName) && wt.getStyles(W) || {}
        };
        return h.each(O, function(J, j) {
          var tt = B(R, j, G);
          M = tt !== r && J(M, tt, j, R, G) || M;
        }), M;
      }
      function Y(M) {
        var R = M && M.match(/\((?:["'#]*)([^"')]+)/), V = R && R[1], W = V && t[o ? V.replace(o.location.href.split("#")[0] + "#", "") : V];
        return W && W._scaleToBounds && (W = W.clone(), W._scaleToBounds = !0), W;
      }
      function z(M, R, V) {
        var W = M.nodeName.toLowerCase(), G = W !== "#document", J = l.body, j, tt, it;
        V && G && (i = ce.getView().getSize(), i = d(M, null, null, !0) || i, j = Re.create("svg", {
          style: "stroke-width: 1px; stroke-miterlimit: 10"
        }), tt = M.parentNode, it = M.nextSibling, j.appendChild(M), J.appendChild(j));
        var Q = ce.settings, nt = Q.applyMatrix, st = Q.insertItems;
        Q.applyMatrix = !1, Q.insertItems = !1;
        var dt = E[W], gt = dt && dt(M, W, R, V) || null;
        if (Q.insertItems = st, Q.applyMatrix = nt, gt) {
          G && !(gt instanceof ht) && (gt = q(gt, M, V));
          var pt = R.onImport, At = G && M.getAttribute("data-paper-data");
          pt && (gt = pt(M, gt, R) || gt), R.expandShapes && gt instanceof at && (gt.remove(), gt = gt.toPath()), At && (gt._data = JSON.parse(At));
        }
        return j && (J.removeChild(j), tt && (it ? tt.insertBefore(M, it) : tt.appendChild(M))), V && (t = {}, gt && h.pick(R.applyMatrix, nt) && gt.matrix.apply(!0, !0)), gt;
      }
      function N(M, R, V) {
        if (!M)
          return null;
        R = typeof R == "function" ? { onLoad: R } : R || {};
        var W = ce, G = null;
        function J(Q) {
          try {
            var nt = typeof Q == "object" ? Q : new e.DOMParser().parseFromString(
              Q.trim(),
              "image/svg+xml"
            );
            if (!nt.nodeName)
              throw nt = null, new Error("Unsupported SVG source: " + M);
            ce = W, G = z(nt, R, !0), (!R || R.insert !== !1) && V._insertItem(r, G);
            var st = R.onLoad;
            st && st(G, Q);
          } catch (dt) {
            j(dt);
          }
        }
        function j(Q, nt) {
          var st = R.onError;
          if (st)
            st(Q, nt);
          else
            throw new Error(Q);
        }
        if (typeof M == "string" && !/^[\s\S]*</.test(M)) {
          var tt = l.getElementById(M);
          tt ? J(tt) : ir.request({
            url: M,
            async: !0,
            onLoad: J,
            onError: j
          });
        } else if (typeof File < "u" && M instanceof File) {
          var it = new FileReader();
          return it.onload = function() {
            J(it.result);
          }, it.onerror = function() {
            j(it.error);
          }, it.readAsText(M);
        } else
          J(M);
        return G;
      }
      ct.inject({
        importSVG: function(M, R) {
          return N(M, R, this);
        }
      }), lt.inject({
        importSVG: function(M, R) {
          return this.activate(), N(M, R, this);
        }
      });
    }();
    var ce = new (g.inject(h.exports, {
      Base: h,
      Numerical: A,
      Key: Ge,
      DomEvent: Lt,
      DomElement: wt,
      document: l,
      window: o,
      Symbol: Et,
      PlacedSymbol: Mt
    }))();
    return ce.agent.node && e_(ce), typeof r == "function" && r.amd ? r("paper", ce) : u && (u.exports = ce), ce;
  }).call(fr, typeof self == "object" ? self : null);
})(bg);
var XT = bg.exports, GT = /* @__PURE__ */ pe("<svg><g><path></svg>", !1, !0);
const v3 = Nn((u) => {
  const e = Li({
    "stroke-width": 3,
    stroke: "black",
    position: "relative",
    fill: "none",
    d: ""
  }, u), r = document.createElement("canvas"), o = new XT.PaperScope();
  return o.setup(r), Kt(ri, {
    get name() {
      return e.name;
    },
    layout: () => {
      const c = new o.Path(e.d), g = c.bounds;
      return {
        transform: {
          translate: {
            x: e.position === "absolute" ? 0 : nn(e.x, g.left),
            y: e.position === "absolute" ? 0 : nn(e.y, g.top)
          }
        },
        bbox: {
          left: g.left,
          top: g.top,
          width: g.width,
          height: g.height
        },
        customData: {
          path: c
        }
      };
    },
    paint: (c) => {
      const [g, b] = Ms(e, ["name", "x", "y", "d", "position"]);
      return (() => {
        var x = GT(), S = x.firstChild;
        return pi(S, ii(b, {
          get d() {
            return c.customData?.path?.pathData ?? "";
          }
        }), !0, !1), ze(() => Ft(x, "transform", `translate(${c.transform.translate.x ?? 0}, ${c.transform.translate.y ?? 0})`)), x;
      })();
    }
  });
});
export {
  n3 as Align,
  i3 as Arrow,
  r3 as Background,
  s3 as Blob,
  e3 as Bluefish,
  a3 as Circle,
  u3 as Distribute,
  l3 as Group,
  h3 as Image,
  ri as Layout,
  f3 as LayoutFunction,
  c3 as Line,
  lu as ParentScopeIdContext,
  v3 as Path,
  S2 as Rect,
  d3 as Ref,
  kh as ScenegraphContext,
  eo as ScopeContext,
  _3 as StackH,
  o3 as StackV,
  g3 as Text,
  a_ as UNSAFE_useScenegraph,
  QT as createName,
  Ow as createScenegraph,
  jT as useScenegraph,
  Nn as withBluefish
};
