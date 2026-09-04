var Br = { exports: {} }, sl = {};
var ey;
function U1() {
  if (ey) return sl;
  ey = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.fragment");
  function u(o, c, d) {
    var h = null;
    if (d !== void 0 && (h = "" + d), c.key !== void 0 && (h = "" + c.key), "key" in c) {
      d = {};
      for (var p in c)
        p !== "key" && (d[p] = c[p]);
    } else d = c;
    return c = d.ref, {
      $$typeof: a,
      type: o,
      key: h,
      ref: c !== void 0 ? c : null,
      props: d
    };
  }
  return sl.Fragment = l, sl.jsx = u, sl.jsxs = u, sl;
}
var ny;
function N1() {
  return ny || (ny = 1, Br.exports = U1()), Br.exports;
}
var Sn = N1(), Ur = { exports: {} }, nt = {};
var iy;
function L1() {
  if (iy) return nt;
  iy = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), u = /* @__PURE__ */ Symbol.for("react.fragment"), o = /* @__PURE__ */ Symbol.for("react.strict_mode"), c = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), m = /* @__PURE__ */ Symbol.for("react.memo"), v = /* @__PURE__ */ Symbol.for("react.lazy"), S = /* @__PURE__ */ Symbol.for("react.activity"), E = Symbol.iterator;
  function B(A) {
    return A === null || typeof A != "object" ? null : (A = E && A[E] || A["@@iterator"], typeof A == "function" ? A : null);
  }
  var z = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, H = Object.assign, w = {};
  function L(A, N, G) {
    this.props = A, this.context = N, this.refs = w, this.updater = G || z;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(A, N) {
    if (typeof A != "object" && typeof A != "function" && A != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, A, N, "setState");
  }, L.prototype.forceUpdate = function(A) {
    this.updater.enqueueForceUpdate(this, A, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = L.prototype;
  function j(A, N, G) {
    this.props = A, this.context = N, this.refs = w, this.updater = G || z;
  }
  var X = j.prototype = new Y();
  X.constructor = j, H(X, L.prototype), X.isPureReactComponent = !0;
  var et = Array.isArray;
  function ut() {
  }
  var K = { H: null, A: null, T: null, S: null }, W = Object.prototype.hasOwnProperty;
  function Et(A, N, G) {
    var k = G.ref;
    return {
      $$typeof: a,
      type: A,
      key: N,
      ref: k !== void 0 ? k : null,
      props: G
    };
  }
  function tt(A, N) {
    return Et(A.type, N, A.props);
  }
  function gt(A) {
    return typeof A == "object" && A !== null && A.$$typeof === a;
  }
  function Tt(A) {
    var N = { "=": "=0", ":": "=2" };
    return "$" + A.replace(/[=:]/g, function(G) {
      return N[G];
    });
  }
  var ae = /\/+/g;
  function Yt(A, N) {
    return typeof A == "object" && A !== null && A.key != null ? Tt("" + A.key) : N.toString(36);
  }
  function Lt(A) {
    switch (A.status) {
      case "fulfilled":
        return A.value;
      case "rejected":
        throw A.reason;
      default:
        switch (typeof A.status == "string" ? A.then(ut, ut) : (A.status = "pending", A.then(
          function(N) {
            A.status === "pending" && (A.status = "fulfilled", A.value = N);
          },
          function(N) {
            A.status === "pending" && (A.status = "rejected", A.reason = N);
          }
        )), A.status) {
          case "fulfilled":
            return A.value;
          case "rejected":
            throw A.reason;
        }
    }
    throw A;
  }
  function O(A, N, G, k, it) {
    var ot = typeof A;
    (ot === "undefined" || ot === "boolean") && (A = null);
    var St = !1;
    if (A === null) St = !0;
    else
      switch (ot) {
        case "bigint":
        case "string":
        case "number":
          St = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case a:
            case l:
              St = !0;
              break;
            case v:
              return St = A._init, O(
                St(A._payload),
                N,
                G,
                k,
                it
              );
          }
      }
    if (St)
      return it = it(A), St = k === "" ? "." + Yt(A, 0) : k, et(it) ? (G = "", St != null && (G = St.replace(ae, "$&/") + "/"), O(it, N, G, "", function(da) {
        return da;
      })) : it != null && (gt(it) && (it = tt(
        it,
        G + (it.key == null || A && A.key === it.key ? "" : ("" + it.key).replace(
          ae,
          "$&/"
        ) + "/") + St
      )), N.push(it)), 1;
    St = 0;
    var le = k === "" ? "." : k + ":";
    if (et(A))
      for (var Ht = 0; Ht < A.length; Ht++)
        k = A[Ht], ot = le + Yt(k, Ht), St += O(
          k,
          N,
          G,
          ot,
          it
        );
    else if (Ht = B(A), typeof Ht == "function")
      for (A = Ht.call(A), Ht = 0; !(k = A.next()).done; )
        k = k.value, ot = le + Yt(k, Ht++), St += O(
          k,
          N,
          G,
          ot,
          it
        );
    else if (ot === "object") {
      if (typeof A.then == "function")
        return O(
          Lt(A),
          N,
          G,
          k,
          it
        );
      throw N = String(A), Error(
        "Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return St;
  }
  function q(A, N, G) {
    if (A == null) return A;
    var k = [], it = 0;
    return O(A, k, "", "", function(ot) {
      return N.call(G, ot, it++);
    }), k;
  }
  function Q(A) {
    if (A._status === -1) {
      var N = A._result;
      N = N(), N.then(
        function(G) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = G);
        },
        function(G) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = G);
        }
      ), A._status === -1 && (A._status = 0, A._result = N);
    }
    if (A._status === 1) return A._result.default;
    throw A._result;
  }
  var lt = typeof reportError == "function" ? reportError : function(A) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var N = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
        error: A
      });
      if (!window.dispatchEvent(N)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", A);
      return;
    }
    console.error(A);
  }, dt = {
    map: q,
    forEach: function(A, N, G) {
      q(
        A,
        function() {
          N.apply(this, arguments);
        },
        G
      );
    },
    count: function(A) {
      var N = 0;
      return q(A, function() {
        N++;
      }), N;
    },
    toArray: function(A) {
      return q(A, function(N) {
        return N;
      }) || [];
    },
    only: function(A) {
      if (!gt(A))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return A;
    }
  };
  return nt.Activity = S, nt.Children = dt, nt.Component = L, nt.Fragment = u, nt.Profiler = c, nt.PureComponent = j, nt.StrictMode = o, nt.Suspense = g, nt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K, nt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(A) {
      return K.H.useMemoCache(A);
    }
  }, nt.cache = function(A) {
    return function() {
      return A.apply(null, arguments);
    };
  }, nt.cacheSignal = function() {
    return null;
  }, nt.cloneElement = function(A, N, G) {
    if (A == null)
      throw Error(
        "The argument must be a React element, but you passed " + A + "."
      );
    var k = H({}, A.props), it = A.key;
    if (N != null)
      for (ot in N.key !== void 0 && (it = "" + N.key), N)
        !W.call(N, ot) || ot === "key" || ot === "__self" || ot === "__source" || ot === "ref" && N.ref === void 0 || (k[ot] = N[ot]);
    var ot = arguments.length - 2;
    if (ot === 1) k.children = G;
    else if (1 < ot) {
      for (var St = Array(ot), le = 0; le < ot; le++)
        St[le] = arguments[le + 2];
      k.children = St;
    }
    return Et(A.type, it, k);
  }, nt.createContext = function(A) {
    return A = {
      $$typeof: h,
      _currentValue: A,
      _currentValue2: A,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, A.Provider = A, A.Consumer = {
      $$typeof: d,
      _context: A
    }, A;
  }, nt.createElement = function(A, N, G) {
    var k, it = {}, ot = null;
    if (N != null)
      for (k in N.key !== void 0 && (ot = "" + N.key), N)
        W.call(N, k) && k !== "key" && k !== "__self" && k !== "__source" && (it[k] = N[k]);
    var St = arguments.length - 2;
    if (St === 1) it.children = G;
    else if (1 < St) {
      for (var le = Array(St), Ht = 0; Ht < St; Ht++)
        le[Ht] = arguments[Ht + 2];
      it.children = le;
    }
    if (A && A.defaultProps)
      for (k in St = A.defaultProps, St)
        it[k] === void 0 && (it[k] = St[k]);
    return Et(A, ot, it);
  }, nt.createRef = function() {
    return { current: null };
  }, nt.forwardRef = function(A) {
    return { $$typeof: p, render: A };
  }, nt.isValidElement = gt, nt.lazy = function(A) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: A },
      _init: Q
    };
  }, nt.memo = function(A, N) {
    return {
      $$typeof: m,
      type: A,
      compare: N === void 0 ? null : N
    };
  }, nt.startTransition = function(A) {
    var N = K.T, G = {};
    K.T = G;
    try {
      var k = A(), it = K.S;
      it !== null && it(G, k), typeof k == "object" && k !== null && typeof k.then == "function" && k.then(ut, lt);
    } catch (ot) {
      lt(ot);
    } finally {
      N !== null && G.types !== null && (N.types = G.types), K.T = N;
    }
  }, nt.unstable_useCacheRefresh = function() {
    return K.H.useCacheRefresh();
  }, nt.use = function(A) {
    return K.H.use(A);
  }, nt.useActionState = function(A, N, G) {
    return K.H.useActionState(A, N, G);
  }, nt.useCallback = function(A, N) {
    return K.H.useCallback(A, N);
  }, nt.useContext = function(A) {
    return K.H.useContext(A);
  }, nt.useDebugValue = function() {
  }, nt.useDeferredValue = function(A, N) {
    return K.H.useDeferredValue(A, N);
  }, nt.useEffect = function(A, N) {
    return K.H.useEffect(A, N);
  }, nt.useEffectEvent = function(A) {
    return K.H.useEffectEvent(A);
  }, nt.useId = function() {
    return K.H.useId();
  }, nt.useImperativeHandle = function(A, N, G) {
    return K.H.useImperativeHandle(A, N, G);
  }, nt.useInsertionEffect = function(A, N) {
    return K.H.useInsertionEffect(A, N);
  }, nt.useLayoutEffect = function(A, N) {
    return K.H.useLayoutEffect(A, N);
  }, nt.useMemo = function(A, N) {
    return K.H.useMemo(A, N);
  }, nt.useOptimistic = function(A, N) {
    return K.H.useOptimistic(A, N);
  }, nt.useReducer = function(A, N, G) {
    return K.H.useReducer(A, N, G);
  }, nt.useRef = function(A) {
    return K.H.useRef(A);
  }, nt.useState = function(A) {
    return K.H.useState(A);
  }, nt.useSyncExternalStore = function(A, N, G) {
    return K.H.useSyncExternalStore(
      A,
      N,
      G
    );
  }, nt.useTransition = function() {
    return K.H.useTransition();
  }, nt.version = "19.2.8", nt;
}
var ay;
function Dc() {
  return ay || (ay = 1, Ur.exports = L1()), Ur.exports;
}
var P = Dc(), Nr = { exports: {} }, ul = {}, Lr = { exports: {} }, Hr = {};
var ly;
function H1() {
  return ly || (ly = 1, (function(a) {
    function l(O, q) {
      var Q = O.length;
      O.push(q);
      t: for (; 0 < Q; ) {
        var lt = Q - 1 >>> 1, dt = O[lt];
        if (0 < c(dt, q))
          O[lt] = q, O[Q] = dt, Q = lt;
        else break t;
      }
    }
    function u(O) {
      return O.length === 0 ? null : O[0];
    }
    function o(O) {
      if (O.length === 0) return null;
      var q = O[0], Q = O.pop();
      if (Q !== q) {
        O[0] = Q;
        t: for (var lt = 0, dt = O.length, A = dt >>> 1; lt < A; ) {
          var N = 2 * (lt + 1) - 1, G = O[N], k = N + 1, it = O[k];
          if (0 > c(G, Q))
            k < dt && 0 > c(it, G) ? (O[lt] = it, O[k] = Q, lt = k) : (O[lt] = G, O[N] = Q, lt = N);
          else if (k < dt && 0 > c(it, Q))
            O[lt] = it, O[k] = Q, lt = k;
          else break t;
        }
      }
      return q;
    }
    function c(O, q) {
      var Q = O.sortIndex - q.sortIndex;
      return Q !== 0 ? Q : O.id - q.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, p = h.now();
      a.unstable_now = function() {
        return h.now() - p;
      };
    }
    var g = [], m = [], v = 1, S = null, E = 3, B = !1, z = !1, H = !1, w = !1, L = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, j = typeof setImmediate < "u" ? setImmediate : null;
    function X(O) {
      for (var q = u(m); q !== null; ) {
        if (q.callback === null) o(m);
        else if (q.startTime <= O)
          o(m), q.sortIndex = q.expirationTime, l(g, q);
        else break;
        q = u(m);
      }
    }
    function et(O) {
      if (H = !1, X(O), !z)
        if (u(g) !== null)
          z = !0, ut || (ut = !0, Tt());
        else {
          var q = u(m);
          q !== null && Lt(et, q.startTime - O);
        }
    }
    var ut = !1, K = -1, W = 5, Et = -1;
    function tt() {
      return w ? !0 : !(a.unstable_now() - Et < W);
    }
    function gt() {
      if (w = !1, ut) {
        var O = a.unstable_now();
        Et = O;
        var q = !0;
        try {
          t: {
            z = !1, H && (H = !1, Y(K), K = -1), B = !0;
            var Q = E;
            try {
              e: {
                for (X(O), S = u(g); S !== null && !(S.expirationTime > O && tt()); ) {
                  var lt = S.callback;
                  if (typeof lt == "function") {
                    S.callback = null, E = S.priorityLevel;
                    var dt = lt(
                      S.expirationTime <= O
                    );
                    if (O = a.unstable_now(), typeof dt == "function") {
                      S.callback = dt, X(O), q = !0;
                      break e;
                    }
                    S === u(g) && o(g), X(O);
                  } else o(g);
                  S = u(g);
                }
                if (S !== null) q = !0;
                else {
                  var A = u(m);
                  A !== null && Lt(
                    et,
                    A.startTime - O
                  ), q = !1;
                }
              }
              break t;
            } finally {
              S = null, E = Q, B = !1;
            }
            q = void 0;
          }
        } finally {
          q ? Tt() : ut = !1;
        }
      }
    }
    var Tt;
    if (typeof j == "function")
      Tt = function() {
        j(gt);
      };
    else if (typeof MessageChannel < "u") {
      var ae = new MessageChannel(), Yt = ae.port2;
      ae.port1.onmessage = gt, Tt = function() {
        Yt.postMessage(null);
      };
    } else
      Tt = function() {
        L(gt, 0);
      };
    function Lt(O, q) {
      K = L(function() {
        O(a.unstable_now());
      }, q);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, a.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : W = 0 < O ? Math.floor(1e3 / O) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return E;
    }, a.unstable_next = function(O) {
      switch (E) {
        case 1:
        case 2:
        case 3:
          var q = 3;
          break;
        default:
          q = E;
      }
      var Q = E;
      E = q;
      try {
        return O();
      } finally {
        E = Q;
      }
    }, a.unstable_requestPaint = function() {
      w = !0;
    }, a.unstable_runWithPriority = function(O, q) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var Q = E;
      E = O;
      try {
        return q();
      } finally {
        E = Q;
      }
    }, a.unstable_scheduleCallback = function(O, q, Q) {
      var lt = a.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? lt + Q : lt) : Q = lt, O) {
        case 1:
          var dt = -1;
          break;
        case 2:
          dt = 250;
          break;
        case 5:
          dt = 1073741823;
          break;
        case 4:
          dt = 1e4;
          break;
        default:
          dt = 5e3;
      }
      return dt = Q + dt, O = {
        id: v++,
        callback: q,
        priorityLevel: O,
        startTime: Q,
        expirationTime: dt,
        sortIndex: -1
      }, Q > lt ? (O.sortIndex = Q, l(m, O), u(g) === null && O === u(m) && (H ? (Y(K), K = -1) : H = !0, Lt(et, Q - lt))) : (O.sortIndex = dt, l(g, O), z || B || (z = !0, ut || (ut = !0, Tt()))), O;
    }, a.unstable_shouldYield = tt, a.unstable_wrapCallback = function(O) {
      var q = E;
      return function() {
        var Q = E;
        E = q;
        try {
          return O.apply(this, arguments);
        } finally {
          E = Q;
        }
      };
    };
  })(Hr)), Hr;
}
var sy;
function w1() {
  return sy || (sy = 1, Lr.exports = H1()), Lr.exports;
}
var wr = { exports: {} }, ie = {};
var uy;
function j1() {
  if (uy) return ie;
  uy = 1;
  var a = Dc();
  function l(g) {
    var m = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        m += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return "Minified React error #" + g + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u() {
  }
  var o = {
    d: {
      f: u,
      r: function() {
        throw Error(l(522));
      },
      D: u,
      C: u,
      L: u,
      m: u,
      X: u,
      S: u,
      M: u
    },
    p: 0,
    findDOMNode: null
  }, c = /* @__PURE__ */ Symbol.for("react.portal");
  function d(g, m, v) {
    var S = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: S == null ? null : "" + S,
      children: g,
      containerInfo: m,
      implementation: v
    };
  }
  var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, m) {
    if (g === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return ie.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, ie.createPortal = function(g, m) {
    var v = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(l(299));
    return d(g, m, null, v);
  }, ie.flushSync = function(g) {
    var m = h.T, v = o.p;
    try {
      if (h.T = null, o.p = 2, g) return g();
    } finally {
      h.T = m, o.p = v, o.d.f();
    }
  }, ie.preconnect = function(g, m) {
    typeof g == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, o.d.C(g, m));
  }, ie.prefetchDNS = function(g) {
    typeof g == "string" && o.d.D(g);
  }, ie.preinit = function(g, m) {
    if (typeof g == "string" && m && typeof m.as == "string") {
      var v = m.as, S = p(v, m.crossOrigin), E = typeof m.integrity == "string" ? m.integrity : void 0, B = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      v === "style" ? o.d.S(
        g,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: S,
          integrity: E,
          fetchPriority: B
        }
      ) : v === "script" && o.d.X(g, {
        crossOrigin: S,
        integrity: E,
        fetchPriority: B,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, ie.preinitModule = function(g, m) {
    if (typeof g == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var v = p(
            m.as,
            m.crossOrigin
          );
          o.d.M(g, {
            crossOrigin: v,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && o.d.M(g);
  }, ie.preload = function(g, m) {
    if (typeof g == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var v = m.as, S = p(v, m.crossOrigin);
      o.d.L(g, v, {
        crossOrigin: S,
        integrity: typeof m.integrity == "string" ? m.integrity : void 0,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0,
        type: typeof m.type == "string" ? m.type : void 0,
        fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
        referrerPolicy: typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
        imageSrcSet: typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
        imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
        media: typeof m.media == "string" ? m.media : void 0
      });
    }
  }, ie.preloadModule = function(g, m) {
    if (typeof g == "string")
      if (m) {
        var v = p(m.as, m.crossOrigin);
        o.d.m(g, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: v,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else o.d.m(g);
  }, ie.requestFormReset = function(g) {
    o.d.r(g);
  }, ie.unstable_batchedUpdates = function(g, m) {
    return g(m);
  }, ie.useFormState = function(g, m, v) {
    return h.H.useFormState(g, m, v);
  }, ie.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, ie.version = "19.2.8", ie;
}
var oy;
function Y1() {
  if (oy) return wr.exports;
  oy = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), wr.exports = j1(), wr.exports;
}
var ry;
function q1() {
  if (ry) return ul;
  ry = 1;
  var a = w1(), l = Dc(), u = Y1();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
    var e = t, n = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (n = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? n : null;
  }
  function h(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (d(t) !== t)
      throw Error(o(188));
  }
  function m(t) {
    var e = t.alternate;
    if (!e) {
      if (e = d(t), e === null) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var n = t, i = e; ; ) {
      var s = n.return;
      if (s === null) break;
      var r = s.alternate;
      if (r === null) {
        if (i = s.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (s.child === r.child) {
        for (r = s.child; r; ) {
          if (r === n) return g(s), t;
          if (r === i) return g(s), e;
          r = r.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== i.return) n = s, i = r;
      else {
        for (var f = !1, y = s.child; y; ) {
          if (y === n) {
            f = !0, n = s, i = r;
            break;
          }
          if (y === i) {
            f = !0, i = s, n = r;
            break;
          }
          y = y.sibling;
        }
        if (!f) {
          for (y = r.child; y; ) {
            if (y === n) {
              f = !0, n = r, i = s;
              break;
            }
            if (y === i) {
              f = !0, i = r, n = s;
              break;
            }
            y = y.sibling;
          }
          if (!f) throw Error(o(189));
        }
      }
      if (n.alternate !== i) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? t : e;
  }
  function v(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = v(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var S = Object.assign, E = /* @__PURE__ */ Symbol.for("react.element"), B = /* @__PURE__ */ Symbol.for("react.transitional.element"), z = /* @__PURE__ */ Symbol.for("react.portal"), H = /* @__PURE__ */ Symbol.for("react.fragment"), w = /* @__PURE__ */ Symbol.for("react.strict_mode"), L = /* @__PURE__ */ Symbol.for("react.profiler"), Y = /* @__PURE__ */ Symbol.for("react.consumer"), j = /* @__PURE__ */ Symbol.for("react.context"), X = /* @__PURE__ */ Symbol.for("react.forward_ref"), et = /* @__PURE__ */ Symbol.for("react.suspense"), ut = /* @__PURE__ */ Symbol.for("react.suspense_list"), K = /* @__PURE__ */ Symbol.for("react.memo"), W = /* @__PURE__ */ Symbol.for("react.lazy"), Et = /* @__PURE__ */ Symbol.for("react.activity"), tt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), gt = Symbol.iterator;
  function Tt(t) {
    return t === null || typeof t != "object" ? null : (t = gt && t[gt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ae = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Yt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ae ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case H:
        return "Fragment";
      case L:
        return "Profiler";
      case w:
        return "StrictMode";
      case et:
        return "Suspense";
      case ut:
        return "SuspenseList";
      case Et:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case z:
          return "Portal";
        case j:
          return t.displayName || "Context";
        case Y:
          return (t._context.displayName || "Context") + ".Consumer";
        case X:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case K:
          return e = t.displayName || null, e !== null ? e : Yt(t.type) || "Memo";
        case W:
          e = t._payload, t = t._init;
          try {
            return Yt(t(e));
          } catch {
          }
      }
    return null;
  }
  var Lt = Array.isArray, O = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, lt = [], dt = -1;
  function A(t) {
    return { current: t };
  }
  function N(t) {
    0 > dt || (t.current = lt[dt], lt[dt] = null, dt--);
  }
  function G(t, e) {
    dt++, lt[dt] = t.current, t.current = e;
  }
  var k = A(null), it = A(null), ot = A(null), St = A(null);
  function le(t, e) {
    switch (G(ot, e), G(it, t), G(k, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Mm(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Mm(e), t = Dm(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    N(k), G(k, t);
  }
  function Ht() {
    N(k), N(it), N(ot);
  }
  function da(t) {
    t.memoizedState !== null && G(St, t);
    var e = k.current, n = Dm(e, t.type);
    e !== n && (G(it, t), G(k, n));
  }
  function Al(t) {
    it.current === t && (N(k), N(it)), St.current === t && (N(St), nl._currentValue = Q);
  }
  var mu, Ic;
  function Fn(t) {
    if (mu === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        mu = e && e[1] || "", Ic = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + mu + t + Ic;
  }
  var yu = !1;
  function pu(t, e) {
    if (!t || yu) return "";
    yu = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var U = function() {
                throw Error();
              };
              if (Object.defineProperty(U.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(U, []);
                } catch (R) {
                  var C = R;
                }
                Reflect.construct(t, [], U);
              } else {
                try {
                  U.call();
                } catch (R) {
                  C = R;
                }
                t.call(U.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                C = R;
              }
              (U = t()) && typeof U.catch == "function" && U.catch(function() {
              });
            }
          } catch (R) {
            if (R && C && typeof R.stack == "string")
              return [R.stack, C.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var r = i.DetermineComponentFrameRoot(), f = r[0], y = r[1];
      if (f && y) {
        var T = f.split(`
`), x = y.split(`
`);
        for (s = i = 0; i < T.length && !T[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; s < x.length && !x[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (i === T.length || s === x.length)
          for (i = T.length - 1, s = x.length - 1; 1 <= i && 0 <= s && T[i] !== x[s]; )
            s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (T[i] !== x[s]) {
            if (i !== 1 || s !== 1)
              do
                if (i--, s--, 0 > s || T[i] !== x[s]) {
                  var V = `
` + T[i].replace(" at new ", " at ");
                  return t.displayName && V.includes("<anonymous>") && (V = V.replace("<anonymous>", t.displayName)), V;
                }
              while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      yu = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? Fn(n) : "";
  }
  function f0(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Fn(t.type);
      case 16:
        return Fn("Lazy");
      case 13:
        return t.child !== e && e !== null ? Fn("Suspense Fallback") : Fn("Suspense");
      case 19:
        return Fn("SuspenseList");
      case 0:
      case 15:
        return pu(t.type, !1);
      case 11:
        return pu(t.type.render, !1);
      case 1:
        return pu(t.type, !0);
      case 31:
        return Fn("Activity");
      default:
        return "";
    }
  }
  function tf(t) {
    try {
      var e = "", n = null;
      do
        e += f0(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var gu = Object.prototype.hasOwnProperty, vu = a.unstable_scheduleCallback, Su = a.unstable_cancelCallback, h0 = a.unstable_shouldYield, d0 = a.unstable_requestPaint, pe = a.unstable_now, m0 = a.unstable_getCurrentPriorityLevel, ef = a.unstable_ImmediatePriority, nf = a.unstable_UserBlockingPriority, El = a.unstable_NormalPriority, y0 = a.unstable_LowPriority, af = a.unstable_IdlePriority, p0 = a.log, g0 = a.unstable_setDisableYieldValue, ma = null, ge = null;
  function Tn(t) {
    if (typeof p0 == "function" && g0(t), ge && typeof ge.setStrictMode == "function")
      try {
        ge.setStrictMode(ma, t);
      } catch {
      }
  }
  var ve = Math.clz32 ? Math.clz32 : T0, v0 = Math.log, S0 = Math.LN2;
  function T0(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (v0(t) / S0 | 0) | 0;
  }
  var Ml = 256, Dl = 262144, xl = 4194304;
  function Wn(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Cl(t, e, n) {
    var i = t.pendingLanes;
    if (i === 0) return 0;
    var s = 0, r = t.suspendedLanes, f = t.pingedLanes;
    t = t.warmLanes;
    var y = i & 134217727;
    return y !== 0 ? (i = y & ~r, i !== 0 ? s = Wn(i) : (f &= y, f !== 0 ? s = Wn(f) : n || (n = y & ~t, n !== 0 && (s = Wn(n))))) : (y = i & ~r, y !== 0 ? s = Wn(y) : f !== 0 ? s = Wn(f) : n || (n = i & ~t, n !== 0 && (s = Wn(n)))), s === 0 ? 0 : e !== 0 && e !== s && (e & r) === 0 && (r = s & -s, n = e & -e, r >= n || r === 32 && (n & 4194048) !== 0) ? e : s;
  }
  function ya(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function b0(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function lf() {
    var t = xl;
    return xl <<= 1, (xl & 62914560) === 0 && (xl = 4194304), t;
  }
  function Tu(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function pa(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function A0(t, e, n, i, s, r) {
    var f = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var y = t.entanglements, T = t.expirationTimes, x = t.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var V = 31 - ve(n), U = 1 << V;
      y[V] = 0, T[V] = -1;
      var C = x[V];
      if (C !== null)
        for (x[V] = null, V = 0; V < C.length; V++) {
          var R = C[V];
          R !== null && (R.lane &= -536870913);
        }
      n &= ~U;
    }
    i !== 0 && sf(t, i, 0), r !== 0 && s === 0 && t.tag !== 0 && (t.suspendedLanes |= r & ~(f & ~e));
  }
  function sf(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var i = 31 - ve(e);
    t.entangledLanes |= e, t.entanglements[i] = t.entanglements[i] | 1073741824 | n & 261930;
  }
  function uf(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var i = 31 - ve(n), s = 1 << i;
      s & e | t[i] & e && (t[i] |= e), n &= ~s;
    }
  }
  function of(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : bu(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function bu(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Au(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function rf() {
    var t = q.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : km(t.type));
  }
  function cf(t, e) {
    var n = q.p;
    try {
      return q.p = t, e();
    } finally {
      q.p = n;
    }
  }
  var bn = Math.random().toString(36).slice(2), Wt = "__reactFiber$" + bn, re = "__reactProps$" + bn, Ti = "__reactContainer$" + bn, Eu = "__reactEvents$" + bn, E0 = "__reactListeners$" + bn, M0 = "__reactHandles$" + bn, ff = "__reactResources$" + bn, ga = "__reactMarker$" + bn;
  function Mu(t) {
    delete t[Wt], delete t[re], delete t[Eu], delete t[E0], delete t[M0];
  }
  function bi(t) {
    var e = t[Wt];
    if (e) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[Ti] || n[Wt]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = _m(t); t !== null; ) {
            if (n = t[Wt]) return n;
            t = _m(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function Ai(t) {
    if (t = t[Wt] || t[Ti]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function va(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function Ei(t) {
    var e = t[ff];
    return e || (e = t[ff] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function kt(t) {
    t[ga] = !0;
  }
  var hf = /* @__PURE__ */ new Set(), df = {};
  function Pn(t, e) {
    Mi(t, e), Mi(t + "Capture", e);
  }
  function Mi(t, e) {
    for (df[t] = e, t = 0; t < e.length; t++)
      hf.add(e[t]);
  }
  var D0 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), mf = {}, yf = {};
  function x0(t) {
    return gu.call(yf, t) ? !0 : gu.call(mf, t) ? !1 : D0.test(t) ? yf[t] = !0 : (mf[t] = !0, !1);
  }
  function zl(t, e, n) {
    if (x0(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var i = e.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + n);
      }
  }
  function Rl(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + n);
    }
  }
  function Ie(t, e, n, i) {
    if (i === null) t.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, "" + i);
    }
  }
  function Ce(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function pf(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function C0(t, e, n) {
    var i = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var s = i.get, r = i.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(f) {
          n = "" + f, r.call(this, f);
        }
      }), Object.defineProperty(t, e, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(f) {
          n = "" + f;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function Du(t) {
    if (!t._valueTracker) {
      var e = pf(t) ? "checked" : "value";
      t._valueTracker = C0(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function gf(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), i = "";
    return t && (i = pf(t) ? t.checked ? "true" : "false" : t.value), t = i, t !== n ? (e.setValue(t), !0) : !1;
  }
  function Ol(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var z0 = /[\n"\\]/g;
  function ze(t) {
    return t.replace(
      z0,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function xu(t, e, n, i, s, r, f, y) {
    t.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? t.type = f : t.removeAttribute("type"), e != null ? f === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Ce(e)) : t.value !== "" + Ce(e) && (t.value = "" + Ce(e)) : f !== "submit" && f !== "reset" || t.removeAttribute("value"), e != null ? Cu(t, f, Ce(e)) : n != null ? Cu(t, f, Ce(n)) : i != null && t.removeAttribute("value"), s == null && r != null && (t.defaultChecked = !!r), s != null && (t.checked = s && typeof s != "function" && typeof s != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? t.name = "" + Ce(y) : t.removeAttribute("name");
  }
  function vf(t, e, n, i, s, r, f, y) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (t.type = r), e != null || n != null) {
      if (!(r !== "submit" && r !== "reset" || e != null)) {
        Du(t);
        return;
      }
      n = n != null ? "" + Ce(n) : "", e = e != null ? "" + Ce(e) : n, y || e === t.value || (t.value = e), t.defaultValue = e;
    }
    i = i ?? s, i = typeof i != "function" && typeof i != "symbol" && !!i, t.checked = y ? t.checked : !!i, t.defaultChecked = !!i, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (t.name = f), Du(t);
  }
  function Cu(t, e, n) {
    e === "number" && Ol(t.ownerDocument) === t || t.defaultValue === "" + n || (t.defaultValue = "" + n);
  }
  function Di(t, e, n, i) {
    if (t = t.options, e) {
      e = {};
      for (var s = 0; s < n.length; s++)
        e["$" + n[s]] = !0;
      for (n = 0; n < t.length; n++)
        s = e.hasOwnProperty("$" + t[n].value), t[n].selected !== s && (t[n].selected = s), s && i && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + Ce(n), e = null, s = 0; s < t.length; s++) {
        if (t[s].value === n) {
          t[s].selected = !0, i && (t[s].defaultSelected = !0);
          return;
        }
        e !== null || t[s].disabled || (e = t[s]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Sf(t, e, n) {
    if (e != null && (e = "" + Ce(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + Ce(n) : "";
  }
  function Tf(t, e, n, i) {
    if (e == null) {
      if (i != null) {
        if (n != null) throw Error(o(92));
        if (Lt(i)) {
          if (1 < i.length) throw Error(o(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), e = n;
    }
    n = Ce(e), t.defaultValue = n, i = t.textContent, i === n && i !== "" && i !== null && (t.value = i), Du(t);
  }
  function xi(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var R0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function bf(t, e, n) {
    var i = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : i ? t.setProperty(e, n) : typeof n != "number" || n === 0 || R0.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Af(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(o(62));
    if (t = t.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || e != null && e.hasOwnProperty(i) || (i.indexOf("--") === 0 ? t.setProperty(i, "") : i === "float" ? t.cssFloat = "" : t[i] = "");
      for (var s in e)
        i = e[s], e.hasOwnProperty(s) && n[s] !== i && bf(t, s, i);
    } else
      for (var r in e)
        e.hasOwnProperty(r) && bf(t, r, e[r]);
  }
  function zu(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var O0 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), V0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Vl(t) {
    return V0.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function tn() {
  }
  var Ru = null;
  function Ou(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Ci = null, zi = null;
  function Ef(t) {
    var e = Ai(t);
    if (e && (t = e.stateNode)) {
      var n = t[re] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (xu(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), e = n.name, n.type === "radio" && e != null) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + ze(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var i = n[e];
              if (i !== t && i.form === t.form) {
                var s = i[re] || null;
                if (!s) throw Error(o(90));
                xu(
                  i,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              i = n[e], i.form === t.form && gf(i);
          }
          break t;
        case "textarea":
          Sf(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && Di(t, !!n.multiple, e, !1);
      }
    }
  }
  var Vu = !1;
  function Mf(t, e, n) {
    if (Vu) return t(e, n);
    Vu = !0;
    try {
      var i = t(e);
      return i;
    } finally {
      if (Vu = !1, (Ci !== null || zi !== null) && (vs(), Ci && (e = Ci, t = zi, zi = Ci = null, Ef(e), t)))
        for (e = 0; e < t.length; e++) Ef(t[e]);
    }
  }
  function Sa(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var i = n[re] || null;
    if (i === null) return null;
    n = i[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (i = !i.disabled) || (t = t.type, i = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !i;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function")
      throw Error(
        o(231, e, typeof n)
      );
    return n;
  }
  var en = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), _u = !1;
  if (en)
    try {
      var Ta = {};
      Object.defineProperty(Ta, "passive", {
        get: function() {
          _u = !0;
        }
      }), window.addEventListener("test", Ta, Ta), window.removeEventListener("test", Ta, Ta);
    } catch {
      _u = !1;
    }
  var An = null, Bu = null, _l = null;
  function Df() {
    if (_l) return _l;
    var t, e = Bu, n = e.length, i, s = "value" in An ? An.value : An.textContent, r = s.length;
    for (t = 0; t < n && e[t] === s[t]; t++) ;
    var f = n - t;
    for (i = 1; i <= f && e[n - i] === s[r - i]; i++) ;
    return _l = s.slice(t, 1 < i ? 1 - i : void 0);
  }
  function Bl(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Ul() {
    return !0;
  }
  function xf() {
    return !1;
  }
  function ce(t) {
    function e(n, i, s, r, f) {
      this._reactName = n, this._targetInst = s, this.type = i, this.nativeEvent = r, this.target = f, this.currentTarget = null;
      for (var y in t)
        t.hasOwnProperty(y) && (n = t[y], this[y] = n ? n(r) : r[y]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Ul : xf, this.isPropagationStopped = xf, this;
    }
    return S(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ul);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ul);
      },
      persist: function() {
      },
      isPersistent: Ul
    }), e;
  }
  var $n = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Nl = ce($n), ba = S({}, $n, { view: 0, detail: 0 }), _0 = ce(ba), Uu, Nu, Aa, Ll = S({}, ba, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Hu,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Aa && (Aa && t.type === "mousemove" ? (Uu = t.screenX - Aa.screenX, Nu = t.screenY - Aa.screenY) : Nu = Uu = 0, Aa = t), Uu);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Nu;
    }
  }), Cf = ce(Ll), B0 = S({}, Ll, { dataTransfer: 0 }), U0 = ce(B0), N0 = S({}, ba, { relatedTarget: 0 }), Lu = ce(N0), L0 = S({}, $n, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), H0 = ce(L0), w0 = S({}, $n, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), j0 = ce(w0), Y0 = S({}, $n, { data: 0 }), zf = ce(Y0), q0 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, G0 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, X0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Q0(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = X0[t]) ? !!e[t] : !1;
  }
  function Hu() {
    return Q0;
  }
  var Z0 = S({}, ba, {
    key: function(t) {
      if (t.key) {
        var e = q0[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Bl(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? G0[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Hu,
    charCode: function(t) {
      return t.type === "keypress" ? Bl(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Bl(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), K0 = ce(Z0), J0 = S({}, Ll, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Rf = ce(J0), k0 = S({}, ba, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Hu
  }), F0 = ce(k0), W0 = S({}, $n, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), P0 = ce(W0), $0 = S({}, Ll, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), I0 = ce($0), tv = S({}, $n, {
    newState: 0,
    oldState: 0
  }), ev = ce(tv), nv = [9, 13, 27, 32], wu = en && "CompositionEvent" in window, Ea = null;
  en && "documentMode" in document && (Ea = document.documentMode);
  var iv = en && "TextEvent" in window && !Ea, Of = en && (!wu || Ea && 8 < Ea && 11 >= Ea), Vf = " ", _f = !1;
  function Bf(t, e) {
    switch (t) {
      case "keyup":
        return nv.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Uf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ri = !1;
  function av(t, e) {
    switch (t) {
      case "compositionend":
        return Uf(e);
      case "keypress":
        return e.which !== 32 ? null : (_f = !0, Vf);
      case "textInput":
        return t = e.data, t === Vf && _f ? null : t;
      default:
        return null;
    }
  }
  function lv(t, e) {
    if (Ri)
      return t === "compositionend" || !wu && Bf(t, e) ? (t = Df(), _l = Bu = An = null, Ri = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Of && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var sv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Nf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!sv[t.type] : e === "textarea";
  }
  function Lf(t, e, n, i) {
    Ci ? zi ? zi.push(i) : zi = [i] : Ci = i, e = Ds(e, "onChange"), 0 < e.length && (n = new Nl(
      "onChange",
      "change",
      null,
      n,
      i
    ), t.push({ event: n, listeners: e }));
  }
  var Ma = null, Da = null;
  function uv(t) {
    vm(t, 0);
  }
  function Hl(t) {
    var e = va(t);
    if (gf(e)) return t;
  }
  function Hf(t, e) {
    if (t === "change") return e;
  }
  var wf = !1;
  if (en) {
    var ju;
    if (en) {
      var Yu = "oninput" in document;
      if (!Yu) {
        var jf = document.createElement("div");
        jf.setAttribute("oninput", "return;"), Yu = typeof jf.oninput == "function";
      }
      ju = Yu;
    } else ju = !1;
    wf = ju && (!document.documentMode || 9 < document.documentMode);
  }
  function Yf() {
    Ma && (Ma.detachEvent("onpropertychange", qf), Da = Ma = null);
  }
  function qf(t) {
    if (t.propertyName === "value" && Hl(Da)) {
      var e = [];
      Lf(
        e,
        Da,
        t,
        Ou(t)
      ), Mf(uv, e);
    }
  }
  function ov(t, e, n) {
    t === "focusin" ? (Yf(), Ma = e, Da = n, Ma.attachEvent("onpropertychange", qf)) : t === "focusout" && Yf();
  }
  function rv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Hl(Da);
  }
  function cv(t, e) {
    if (t === "click") return Hl(e);
  }
  function fv(t, e) {
    if (t === "input" || t === "change")
      return Hl(e);
  }
  function hv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Se = typeof Object.is == "function" ? Object.is : hv;
  function xa(t, e) {
    if (Se(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), i = Object.keys(e);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var s = n[i];
      if (!gu.call(e, s) || !Se(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  function Gf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Xf(t, e) {
    var n = Gf(t);
    t = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (i = t + n.textContent.length, t <= e && i >= e)
          return { node: n, offset: e - t };
        t = i;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Gf(n);
    }
  }
  function Qf(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Qf(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Zf(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Ol(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Ol(t.document);
    }
    return e;
  }
  function qu(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var dv = en && "documentMode" in document && 11 >= document.documentMode, Oi = null, Gu = null, Ca = null, Xu = !1;
  function Kf(t, e, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Xu || Oi == null || Oi !== Ol(i) || (i = Oi, "selectionStart" in i && qu(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Ca && xa(Ca, i) || (Ca = i, i = Ds(Gu, "onSelect"), 0 < i.length && (e = new Nl(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: i }), e.target = Oi)));
  }
  function In(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var Vi = {
    animationend: In("Animation", "AnimationEnd"),
    animationiteration: In("Animation", "AnimationIteration"),
    animationstart: In("Animation", "AnimationStart"),
    transitionrun: In("Transition", "TransitionRun"),
    transitionstart: In("Transition", "TransitionStart"),
    transitioncancel: In("Transition", "TransitionCancel"),
    transitionend: In("Transition", "TransitionEnd")
  }, Qu = {}, Jf = {};
  en && (Jf = document.createElement("div").style, "AnimationEvent" in window || (delete Vi.animationend.animation, delete Vi.animationiteration.animation, delete Vi.animationstart.animation), "TransitionEvent" in window || delete Vi.transitionend.transition);
  function ti(t) {
    if (Qu[t]) return Qu[t];
    if (!Vi[t]) return t;
    var e = Vi[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in Jf)
        return Qu[t] = e[n];
    return t;
  }
  var kf = ti("animationend"), Ff = ti("animationiteration"), Wf = ti("animationstart"), mv = ti("transitionrun"), yv = ti("transitionstart"), pv = ti("transitioncancel"), Pf = ti("transitionend"), $f = /* @__PURE__ */ new Map(), Zu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Zu.push("scrollEnd");
  function je(t, e) {
    $f.set(t, e), Pn(e, [t]);
  }
  var wl = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Re = [], _i = 0, Ku = 0;
  function jl() {
    for (var t = _i, e = Ku = _i = 0; e < t; ) {
      var n = Re[e];
      Re[e++] = null;
      var i = Re[e];
      Re[e++] = null;
      var s = Re[e];
      Re[e++] = null;
      var r = Re[e];
      if (Re[e++] = null, i !== null && s !== null) {
        var f = i.pending;
        f === null ? s.next = s : (s.next = f.next, f.next = s), i.pending = s;
      }
      r !== 0 && If(n, s, r);
    }
  }
  function Yl(t, e, n, i) {
    Re[_i++] = t, Re[_i++] = e, Re[_i++] = n, Re[_i++] = i, Ku |= i, t.lanes |= i, t = t.alternate, t !== null && (t.lanes |= i);
  }
  function Ju(t, e, n, i) {
    return Yl(t, e, n, i), ql(t);
  }
  function ei(t, e) {
    return Yl(t, null, null, e), ql(t);
  }
  function If(t, e, n) {
    t.lanes |= n;
    var i = t.alternate;
    i !== null && (i.lanes |= n);
    for (var s = !1, r = t.return; r !== null; )
      r.childLanes |= n, i = r.alternate, i !== null && (i.childLanes |= n), r.tag === 22 && (t = r.stateNode, t === null || t._visibility & 1 || (s = !0)), t = r, r = r.return;
    return t.tag === 3 ? (r = t.stateNode, s && e !== null && (s = 31 - ve(n), t = r.hiddenUpdates, i = t[s], i === null ? t[s] = [e] : i.push(e), e.lane = n | 536870912), r) : null;
  }
  function ql(t) {
    if (50 < Fa)
      throw Fa = 0, ir = null, Error(o(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Bi = {};
  function gv(t, e, n, i) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Te(t, e, n, i) {
    return new gv(t, e, n, i);
  }
  function ku(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function nn(t, e) {
    var n = t.alternate;
    return n === null ? (n = Te(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 65011712, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function th(t, e) {
    t.flags &= 65011714;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Gl(t, e, n, i, s, r) {
    var f = 0;
    if (i = t, typeof t == "function") ku(t) && (f = 1);
    else if (typeof t == "string")
      f = A1(
        t,
        n,
        k.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Et:
          return t = Te(31, n, e, s), t.elementType = Et, t.lanes = r, t;
        case H:
          return ni(n.children, s, r, e);
        case w:
          f = 8, s |= 24;
          break;
        case L:
          return t = Te(12, n, e, s | 2), t.elementType = L, t.lanes = r, t;
        case et:
          return t = Te(13, n, e, s), t.elementType = et, t.lanes = r, t;
        case ut:
          return t = Te(19, n, e, s), t.elementType = ut, t.lanes = r, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case j:
                f = 10;
                break t;
              case Y:
                f = 9;
                break t;
              case X:
                f = 11;
                break t;
              case K:
                f = 14;
                break t;
              case W:
                f = 16, i = null;
                break t;
            }
          f = 29, n = Error(
            o(130, t === null ? "null" : typeof t, "")
          ), i = null;
      }
    return e = Te(f, n, e, s), e.elementType = t, e.type = i, e.lanes = r, e;
  }
  function ni(t, e, n, i) {
    return t = Te(7, t, i, e), t.lanes = n, t;
  }
  function Fu(t, e, n) {
    return t = Te(6, t, null, e), t.lanes = n, t;
  }
  function eh(t) {
    var e = Te(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Wu(t, e, n) {
    return e = Te(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = n, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var nh = /* @__PURE__ */ new WeakMap();
  function Oe(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = nh.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: tf(e)
      }, nh.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: tf(e)
    };
  }
  var Ui = [], Ni = 0, Xl = null, za = 0, Ve = [], _e = 0, En = null, Ze = 1, Ke = "";
  function an(t, e) {
    Ui[Ni++] = za, Ui[Ni++] = Xl, Xl = t, za = e;
  }
  function ih(t, e, n) {
    Ve[_e++] = Ze, Ve[_e++] = Ke, Ve[_e++] = En, En = t;
    var i = Ze;
    t = Ke;
    var s = 32 - ve(i) - 1;
    i &= ~(1 << s), n += 1;
    var r = 32 - ve(e) + s;
    if (30 < r) {
      var f = s - s % 5;
      r = (i & (1 << f) - 1).toString(32), i >>= f, s -= f, Ze = 1 << 32 - ve(e) + s | n << s | i, Ke = r + t;
    } else
      Ze = 1 << r | n << s | i, Ke = t;
  }
  function Pu(t) {
    t.return !== null && (an(t, 1), ih(t, 1, 0));
  }
  function $u(t) {
    for (; t === Xl; )
      Xl = Ui[--Ni], Ui[Ni] = null, za = Ui[--Ni], Ui[Ni] = null;
    for (; t === En; )
      En = Ve[--_e], Ve[_e] = null, Ke = Ve[--_e], Ve[_e] = null, Ze = Ve[--_e], Ve[_e] = null;
  }
  function ah(t, e) {
    Ve[_e++] = Ze, Ve[_e++] = Ke, Ve[_e++] = En, Ze = e.id, Ke = e.overflow, En = t;
  }
  var Pt = null, Ot = null, mt = !1, Mn = null, Be = !1, Iu = Error(o(519));
  function Dn(t) {
    var e = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ra(Oe(e, t)), Iu;
  }
  function lh(t) {
    var e = t.stateNode, n = t.type, i = t.memoizedProps;
    switch (e[Wt] = t, e[re] = i, n) {
      case "dialog":
        ct("cancel", e), ct("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ct("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Pa.length; n++)
          ct(Pa[n], e);
        break;
      case "source":
        ct("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ct("error", e), ct("load", e);
        break;
      case "details":
        ct("toggle", e);
        break;
      case "input":
        ct("invalid", e), vf(
          e,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        ct("invalid", e);
        break;
      case "textarea":
        ct("invalid", e), Tf(e, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || i.suppressHydrationWarning === !0 || Am(e.textContent, n) ? (i.popover != null && (ct("beforetoggle", e), ct("toggle", e)), i.onScroll != null && ct("scroll", e), i.onScrollEnd != null && ct("scrollend", e), i.onClick != null && (e.onclick = tn), e = !0) : e = !1, e || Dn(t, !0);
  }
  function sh(t) {
    for (Pt = t.return; Pt; )
      switch (Pt.tag) {
        case 5:
        case 31:
        case 13:
          Be = !1;
          return;
        case 27:
        case 3:
          Be = !0;
          return;
        default:
          Pt = Pt.return;
      }
  }
  function Li(t) {
    if (t !== Pt) return !1;
    if (!mt) return sh(t), mt = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || vr(t.type, t.memoizedProps)), n = !n), n && Ot && Dn(t), sh(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Ot = Vm(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(317));
      Ot = Vm(t);
    } else
      e === 27 ? (e = Ot, jn(t.type) ? (t = Er, Er = null, Ot = t) : Ot = e) : Ot = Pt ? Ne(t.stateNode.nextSibling) : null;
    return !0;
  }
  function ii() {
    Ot = Pt = null, mt = !1;
  }
  function to() {
    var t = Mn;
    return t !== null && (me === null ? me = t : me.push.apply(
      me,
      t
    ), Mn = null), t;
  }
  function Ra(t) {
    Mn === null ? Mn = [t] : Mn.push(t);
  }
  var eo = A(null), ai = null, ln = null;
  function xn(t, e, n) {
    G(eo, e._currentValue), e._currentValue = n;
  }
  function sn(t) {
    t._currentValue = eo.current, N(eo);
  }
  function no(t, e, n) {
    for (; t !== null; ) {
      var i = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, i !== null && (i.childLanes |= e)) : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function io(t, e, n, i) {
    var s = t.child;
    for (s !== null && (s.return = t); s !== null; ) {
      var r = s.dependencies;
      if (r !== null) {
        var f = s.child;
        r = r.firstContext;
        t: for (; r !== null; ) {
          var y = r;
          r = s;
          for (var T = 0; T < e.length; T++)
            if (y.context === e[T]) {
              r.lanes |= n, y = r.alternate, y !== null && (y.lanes |= n), no(
                r.return,
                n,
                t
              ), i || (f = null);
              break t;
            }
          r = y.next;
        }
      } else if (s.tag === 18) {
        if (f = s.return, f === null) throw Error(o(341));
        f.lanes |= n, r = f.alternate, r !== null && (r.lanes |= n), no(f, n, t), f = null;
      } else f = s.child;
      if (f !== null) f.return = s;
      else
        for (f = s; f !== null; ) {
          if (f === t) {
            f = null;
            break;
          }
          if (s = f.sibling, s !== null) {
            s.return = f.return, f = s;
            break;
          }
          f = f.return;
        }
      s = f;
    }
  }
  function Hi(t, e, n, i) {
    t = null;
    for (var s = e, r = !1; s !== null; ) {
      if (!r) {
        if ((s.flags & 524288) !== 0) r = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var f = s.alternate;
        if (f === null) throw Error(o(387));
        if (f = f.memoizedProps, f !== null) {
          var y = s.type;
          Se(s.pendingProps.value, f.value) || (t !== null ? t.push(y) : t = [y]);
        }
      } else if (s === St.current) {
        if (f = s.alternate, f === null) throw Error(o(387));
        f.memoizedState.memoizedState !== s.memoizedState.memoizedState && (t !== null ? t.push(nl) : t = [nl]);
      }
      s = s.return;
    }
    t !== null && io(
      e,
      t,
      n,
      i
    ), e.flags |= 262144;
  }
  function Ql(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Se(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function li(t) {
    ai = t, ln = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function $t(t) {
    return uh(ai, t);
  }
  function Zl(t, e) {
    return ai === null && li(t), uh(t, e);
  }
  function uh(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, ln === null) {
      if (t === null) throw Error(o(308));
      ln = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else ln = ln.next = e;
    return n;
  }
  var vv = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, i) {
        t.push(i);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, Sv = a.unstable_scheduleCallback, Tv = a.unstable_NormalPriority, qt = {
    $$typeof: j,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ao() {
    return {
      controller: new vv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Oa(t) {
    t.refCount--, t.refCount === 0 && Sv(Tv, function() {
      t.controller.abort();
    });
  }
  var Va = null, lo = 0, wi = 0, ji = null;
  function bv(t, e) {
    if (Va === null) {
      var n = Va = [];
      lo = 0, wi = rr(), ji = {
        status: "pending",
        value: void 0,
        then: function(i) {
          n.push(i);
        }
      };
    }
    return lo++, e.then(oh, oh), e;
  }
  function oh() {
    if (--lo === 0 && Va !== null) {
      ji !== null && (ji.status = "fulfilled");
      var t = Va;
      Va = null, wi = 0, ji = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Av(t, e) {
    var n = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        n.push(s);
      }
    };
    return t.then(
      function() {
        i.status = "fulfilled", i.value = e;
        for (var s = 0; s < n.length; s++) (0, n[s])(e);
      },
      function(s) {
        for (i.status = "rejected", i.reason = s, s = 0; s < n.length; s++)
          (0, n[s])(void 0);
      }
    ), i;
  }
  var rh = O.S;
  O.S = function(t, e) {
    Kd = pe(), typeof e == "object" && e !== null && typeof e.then == "function" && bv(t, e), rh !== null && rh(t, e);
  };
  var si = A(null);
  function so() {
    var t = si.current;
    return t !== null ? t : Ct.pooledCache;
  }
  function Kl(t, e) {
    e === null ? G(si, si.current) : G(si, e.pool);
  }
  function ch() {
    var t = so();
    return t === null ? null : { parent: qt._currentValue, pool: t };
  }
  var Yi = Error(o(460)), uo = Error(o(474)), Jl = Error(o(542)), kl = { then: function() {
  } };
  function fh(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function hh(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(tn, tn), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, mh(t), t;
      default:
        if (typeof e.status == "string") e.then(tn, tn);
        else {
          if (t = Ct, t !== null && 100 < t.shellSuspendCounter)
            throw Error(o(482));
          t = e, t.status = "pending", t.then(
            function(i) {
              if (e.status === "pending") {
                var s = e;
                s.status = "fulfilled", s.value = i;
              }
            },
            function(i) {
              if (e.status === "pending") {
                var s = e;
                s.status = "rejected", s.reason = i;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, mh(t), t;
        }
        throw oi = e, Yi;
    }
  }
  function ui(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (oi = n, Yi) : n;
    }
  }
  var oi = null;
  function dh() {
    if (oi === null) throw Error(o(459));
    var t = oi;
    return oi = null, t;
  }
  function mh(t) {
    if (t === Yi || t === Jl)
      throw Error(o(483));
  }
  var qi = null, _a = 0;
  function Fl(t) {
    var e = _a;
    return _a += 1, qi === null && (qi = []), hh(qi, t, e);
  }
  function Ba(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Wl(t, e) {
    throw e.$$typeof === E ? Error(o(525)) : (t = Object.prototype.toString.call(e), Error(
      o(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function yh(t) {
    function e(M, b) {
      if (t) {
        var D = M.deletions;
        D === null ? (M.deletions = [b], M.flags |= 16) : D.push(b);
      }
    }
    function n(M, b) {
      if (!t) return null;
      for (; b !== null; )
        e(M, b), b = b.sibling;
      return null;
    }
    function i(M) {
      for (var b = /* @__PURE__ */ new Map(); M !== null; )
        M.key !== null ? b.set(M.key, M) : b.set(M.index, M), M = M.sibling;
      return b;
    }
    function s(M, b) {
      return M = nn(M, b), M.index = 0, M.sibling = null, M;
    }
    function r(M, b, D) {
      return M.index = D, t ? (D = M.alternate, D !== null ? (D = D.index, D < b ? (M.flags |= 67108866, b) : D) : (M.flags |= 67108866, b)) : (M.flags |= 1048576, b);
    }
    function f(M) {
      return t && M.alternate === null && (M.flags |= 67108866), M;
    }
    function y(M, b, D, _) {
      return b === null || b.tag !== 6 ? (b = Fu(D, M.mode, _), b.return = M, b) : (b = s(b, D), b.return = M, b);
    }
    function T(M, b, D, _) {
      var $ = D.type;
      return $ === H ? V(
        M,
        b,
        D.props.children,
        _,
        D.key
      ) : b !== null && (b.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === W && ui($) === b.type) ? (b = s(b, D.props), Ba(b, D), b.return = M, b) : (b = Gl(
        D.type,
        D.key,
        D.props,
        null,
        M.mode,
        _
      ), Ba(b, D), b.return = M, b);
    }
    function x(M, b, D, _) {
      return b === null || b.tag !== 4 || b.stateNode.containerInfo !== D.containerInfo || b.stateNode.implementation !== D.implementation ? (b = Wu(D, M.mode, _), b.return = M, b) : (b = s(b, D.children || []), b.return = M, b);
    }
    function V(M, b, D, _, $) {
      return b === null || b.tag !== 7 ? (b = ni(
        D,
        M.mode,
        _,
        $
      ), b.return = M, b) : (b = s(b, D), b.return = M, b);
    }
    function U(M, b, D) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return b = Fu(
          "" + b,
          M.mode,
          D
        ), b.return = M, b;
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case B:
            return D = Gl(
              b.type,
              b.key,
              b.props,
              null,
              M.mode,
              D
            ), Ba(D, b), D.return = M, D;
          case z:
            return b = Wu(
              b,
              M.mode,
              D
            ), b.return = M, b;
          case W:
            return b = ui(b), U(M, b, D);
        }
        if (Lt(b) || Tt(b))
          return b = ni(
            b,
            M.mode,
            D,
            null
          ), b.return = M, b;
        if (typeof b.then == "function")
          return U(M, Fl(b), D);
        if (b.$$typeof === j)
          return U(
            M,
            Zl(M, b),
            D
          );
        Wl(M, b);
      }
      return null;
    }
    function C(M, b, D, _) {
      var $ = b !== null ? b.key : null;
      if (typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint")
        return $ !== null ? null : y(M, b, "" + D, _);
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case B:
            return D.key === $ ? T(M, b, D, _) : null;
          case z:
            return D.key === $ ? x(M, b, D, _) : null;
          case W:
            return D = ui(D), C(M, b, D, _);
        }
        if (Lt(D) || Tt(D))
          return $ !== null ? null : V(M, b, D, _, null);
        if (typeof D.then == "function")
          return C(
            M,
            b,
            Fl(D),
            _
          );
        if (D.$$typeof === j)
          return C(
            M,
            b,
            Zl(M, D),
            _
          );
        Wl(M, D);
      }
      return null;
    }
    function R(M, b, D, _, $) {
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return M = M.get(D) || null, y(b, M, "" + _, $);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case B:
            return M = M.get(
              _.key === null ? D : _.key
            ) || null, T(b, M, _, $);
          case z:
            return M = M.get(
              _.key === null ? D : _.key
            ) || null, x(b, M, _, $);
          case W:
            return _ = ui(_), R(
              M,
              b,
              D,
              _,
              $
            );
        }
        if (Lt(_) || Tt(_))
          return M = M.get(D) || null, V(b, M, _, $, null);
        if (typeof _.then == "function")
          return R(
            M,
            b,
            D,
            Fl(_),
            $
          );
        if (_.$$typeof === j)
          return R(
            M,
            b,
            D,
            Zl(b, _),
            $
          );
        Wl(b, _);
      }
      return null;
    }
    function Z(M, b, D, _) {
      for (var $ = null, yt = null, F = b, st = b = 0, ht = null; F !== null && st < D.length; st++) {
        F.index > st ? (ht = F, F = null) : ht = F.sibling;
        var pt = C(
          M,
          F,
          D[st],
          _
        );
        if (pt === null) {
          F === null && (F = ht);
          break;
        }
        t && F && pt.alternate === null && e(M, F), b = r(pt, b, st), yt === null ? $ = pt : yt.sibling = pt, yt = pt, F = ht;
      }
      if (st === D.length)
        return n(M, F), mt && an(M, st), $;
      if (F === null) {
        for (; st < D.length; st++)
          F = U(M, D[st], _), F !== null && (b = r(
            F,
            b,
            st
          ), yt === null ? $ = F : yt.sibling = F, yt = F);
        return mt && an(M, st), $;
      }
      for (F = i(F); st < D.length; st++)
        ht = R(
          F,
          M,
          st,
          D[st],
          _
        ), ht !== null && (t && ht.alternate !== null && F.delete(
          ht.key === null ? st : ht.key
        ), b = r(
          ht,
          b,
          st
        ), yt === null ? $ = ht : yt.sibling = ht, yt = ht);
      return t && F.forEach(function(Qn) {
        return e(M, Qn);
      }), mt && an(M, st), $;
    }
    function I(M, b, D, _) {
      if (D == null) throw Error(o(151));
      for (var $ = null, yt = null, F = b, st = b = 0, ht = null, pt = D.next(); F !== null && !pt.done; st++, pt = D.next()) {
        F.index > st ? (ht = F, F = null) : ht = F.sibling;
        var Qn = C(M, F, pt.value, _);
        if (Qn === null) {
          F === null && (F = ht);
          break;
        }
        t && F && Qn.alternate === null && e(M, F), b = r(Qn, b, st), yt === null ? $ = Qn : yt.sibling = Qn, yt = Qn, F = ht;
      }
      if (pt.done)
        return n(M, F), mt && an(M, st), $;
      if (F === null) {
        for (; !pt.done; st++, pt = D.next())
          pt = U(M, pt.value, _), pt !== null && (b = r(pt, b, st), yt === null ? $ = pt : yt.sibling = pt, yt = pt);
        return mt && an(M, st), $;
      }
      for (F = i(F); !pt.done; st++, pt = D.next())
        pt = R(F, M, st, pt.value, _), pt !== null && (t && pt.alternate !== null && F.delete(pt.key === null ? st : pt.key), b = r(pt, b, st), yt === null ? $ = pt : yt.sibling = pt, yt = pt);
      return t && F.forEach(function(B1) {
        return e(M, B1);
      }), mt && an(M, st), $;
    }
    function xt(M, b, D, _) {
      if (typeof D == "object" && D !== null && D.type === H && D.key === null && (D = D.props.children), typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case B:
            t: {
              for (var $ = D.key; b !== null; ) {
                if (b.key === $) {
                  if ($ = D.type, $ === H) {
                    if (b.tag === 7) {
                      n(
                        M,
                        b.sibling
                      ), _ = s(
                        b,
                        D.props.children
                      ), _.return = M, M = _;
                      break t;
                    }
                  } else if (b.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === W && ui($) === b.type) {
                    n(
                      M,
                      b.sibling
                    ), _ = s(b, D.props), Ba(_, D), _.return = M, M = _;
                    break t;
                  }
                  n(M, b);
                  break;
                } else e(M, b);
                b = b.sibling;
              }
              D.type === H ? (_ = ni(
                D.props.children,
                M.mode,
                _,
                D.key
              ), _.return = M, M = _) : (_ = Gl(
                D.type,
                D.key,
                D.props,
                null,
                M.mode,
                _
              ), Ba(_, D), _.return = M, M = _);
            }
            return f(M);
          case z:
            t: {
              for ($ = D.key; b !== null; ) {
                if (b.key === $)
                  if (b.tag === 4 && b.stateNode.containerInfo === D.containerInfo && b.stateNode.implementation === D.implementation) {
                    n(
                      M,
                      b.sibling
                    ), _ = s(b, D.children || []), _.return = M, M = _;
                    break t;
                  } else {
                    n(M, b);
                    break;
                  }
                else e(M, b);
                b = b.sibling;
              }
              _ = Wu(D, M.mode, _), _.return = M, M = _;
            }
            return f(M);
          case W:
            return D = ui(D), xt(
              M,
              b,
              D,
              _
            );
        }
        if (Lt(D))
          return Z(
            M,
            b,
            D,
            _
          );
        if (Tt(D)) {
          if ($ = Tt(D), typeof $ != "function") throw Error(o(150));
          return D = $.call(D), I(
            M,
            b,
            D,
            _
          );
        }
        if (typeof D.then == "function")
          return xt(
            M,
            b,
            Fl(D),
            _
          );
        if (D.$$typeof === j)
          return xt(
            M,
            b,
            Zl(M, D),
            _
          );
        Wl(M, D);
      }
      return typeof D == "string" && D !== "" || typeof D == "number" || typeof D == "bigint" ? (D = "" + D, b !== null && b.tag === 6 ? (n(M, b.sibling), _ = s(b, D), _.return = M, M = _) : (n(M, b), _ = Fu(D, M.mode, _), _.return = M, M = _), f(M)) : n(M, b);
    }
    return function(M, b, D, _) {
      try {
        _a = 0;
        var $ = xt(
          M,
          b,
          D,
          _
        );
        return qi = null, $;
      } catch (F) {
        if (F === Yi || F === Jl) throw F;
        var yt = Te(29, F, null, M.mode);
        return yt.lanes = _, yt.return = M, yt;
      }
    };
  }
  var ri = yh(!0), ph = yh(!1), Cn = !1;
  function oo(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ro(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function zn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Rn(t, e, n) {
    var i = t.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (vt & 2) !== 0) {
      var s = i.pending;
      return s === null ? e.next = e : (e.next = s.next, s.next = e), i.pending = e, e = ql(t), If(t, null, n), e;
    }
    return Yl(t, i, e, n), ql(t);
  }
  function Ua(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, uf(t, n);
    }
  }
  function co(t, e) {
    var n = t.updateQueue, i = t.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var s = null, r = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          r === null ? s = r = f : r = r.next = f, n = n.next;
        } while (n !== null);
        r === null ? s = r = e : r = r.next = e;
      } else s = r = e;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: r,
        shared: i.shared,
        callbacks: i.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var fo = !1;
  function Na() {
    if (fo) {
      var t = ji;
      if (t !== null) throw t;
    }
  }
  function La(t, e, n, i) {
    fo = !1;
    var s = t.updateQueue;
    Cn = !1;
    var r = s.firstBaseUpdate, f = s.lastBaseUpdate, y = s.shared.pending;
    if (y !== null) {
      s.shared.pending = null;
      var T = y, x = T.next;
      T.next = null, f === null ? r = x : f.next = x, f = T;
      var V = t.alternate;
      V !== null && (V = V.updateQueue, y = V.lastBaseUpdate, y !== f && (y === null ? V.firstBaseUpdate = x : y.next = x, V.lastBaseUpdate = T));
    }
    if (r !== null) {
      var U = s.baseState;
      f = 0, V = x = T = null, y = r;
      do {
        var C = y.lane & -536870913, R = C !== y.lane;
        if (R ? (ft & C) === C : (i & C) === C) {
          C !== 0 && C === wi && (fo = !0), V !== null && (V = V.next = {
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: null,
            next: null
          });
          t: {
            var Z = t, I = y;
            C = e;
            var xt = n;
            switch (I.tag) {
              case 1:
                if (Z = I.payload, typeof Z == "function") {
                  U = Z.call(xt, U, C);
                  break t;
                }
                U = Z;
                break t;
              case 3:
                Z.flags = Z.flags & -65537 | 128;
              case 0:
                if (Z = I.payload, C = typeof Z == "function" ? Z.call(xt, U, C) : Z, C == null) break t;
                U = S({}, U, C);
                break t;
              case 2:
                Cn = !0;
            }
          }
          C = y.callback, C !== null && (t.flags |= 64, R && (t.flags |= 8192), R = s.callbacks, R === null ? s.callbacks = [C] : R.push(C));
        } else
          R = {
            lane: C,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          }, V === null ? (x = V = R, T = U) : V = V.next = R, f |= C;
        if (y = y.next, y === null) {
          if (y = s.shared.pending, y === null)
            break;
          R = y, y = R.next, R.next = null, s.lastBaseUpdate = R, s.shared.pending = null;
        }
      } while (!0);
      V === null && (T = U), s.baseState = T, s.firstBaseUpdate = x, s.lastBaseUpdate = V, r === null && (s.shared.lanes = 0), Un |= f, t.lanes = f, t.memoizedState = U;
    }
  }
  function gh(t, e) {
    if (typeof t != "function")
      throw Error(o(191, t));
    t.call(e);
  }
  function vh(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        gh(n[t], e);
  }
  var Gi = A(null), Pl = A(0);
  function Sh(t, e) {
    t = yn, G(Pl, t), G(Gi, e), yn = t | e.baseLanes;
  }
  function ho() {
    G(Pl, yn), G(Gi, Gi.current);
  }
  function mo() {
    yn = Pl.current, N(Gi), N(Pl);
  }
  var be = A(null), Ue = null;
  function On(t) {
    var e = t.alternate;
    G(wt, wt.current & 1), G(be, t), Ue === null && (e === null || Gi.current !== null || e.memoizedState !== null) && (Ue = t);
  }
  function yo(t) {
    G(wt, wt.current), G(be, t), Ue === null && (Ue = t);
  }
  function Th(t) {
    t.tag === 22 ? (G(wt, wt.current), G(be, t), Ue === null && (Ue = t)) : Vn();
  }
  function Vn() {
    G(wt, wt.current), G(be, be.current);
  }
  function Ae(t) {
    N(be), Ue === t && (Ue = null), N(wt);
  }
  var wt = A(0);
  function $l(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || br(n) || Ar(n)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var un = 0, at = null, Mt = null, Gt = null, Il = !1, Xi = !1, ci = !1, ts = 0, Ha = 0, Qi = null, Ev = 0;
  function Bt() {
    throw Error(o(321));
  }
  function po(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!Se(t[n], e[n])) return !1;
    return !0;
  }
  function go(t, e, n, i, s, r) {
    return un = r, at = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, O.H = t === null || t.memoizedState === null ? id : _o, ci = !1, r = n(i, s), ci = !1, Xi && (r = Ah(
      e,
      n,
      i,
      s
    )), bh(t), r;
  }
  function bh(t) {
    O.H = Ya;
    var e = Mt !== null && Mt.next !== null;
    if (un = 0, Gt = Mt = at = null, Il = !1, Ha = 0, Qi = null, e) throw Error(o(300));
    t === null || Xt || (t = t.dependencies, t !== null && Ql(t) && (Xt = !0));
  }
  function Ah(t, e, n, i) {
    at = t;
    var s = 0;
    do {
      if (Xi && (Qi = null), Ha = 0, Xi = !1, 25 <= s) throw Error(o(301));
      if (s += 1, Gt = Mt = null, t.updateQueue != null) {
        var r = t.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      O.H = ad, r = e(n, i);
    } while (Xi);
    return r;
  }
  function Mv() {
    var t = O.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? wa(e) : e, t = t.useState()[0], (Mt !== null ? Mt.memoizedState : null) !== t && (at.flags |= 1024), e;
  }
  function vo() {
    var t = ts !== 0;
    return ts = 0, t;
  }
  function So(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function To(t) {
    if (Il) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Il = !1;
    }
    un = 0, Gt = Mt = at = null, Xi = !1, Ha = ts = 0, Qi = null;
  }
  function se() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Gt === null ? at.memoizedState = Gt = t : Gt = Gt.next = t, Gt;
  }
  function jt() {
    if (Mt === null) {
      var t = at.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Mt.next;
    var e = Gt === null ? at.memoizedState : Gt.next;
    if (e !== null)
      Gt = e, Mt = t;
    else {
      if (t === null)
        throw at.alternate === null ? Error(o(467)) : Error(o(310));
      Mt = t, t = {
        memoizedState: Mt.memoizedState,
        baseState: Mt.baseState,
        baseQueue: Mt.baseQueue,
        queue: Mt.queue,
        next: null
      }, Gt === null ? at.memoizedState = Gt = t : Gt = Gt.next = t;
    }
    return Gt;
  }
  function es() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function wa(t) {
    var e = Ha;
    return Ha += 1, Qi === null && (Qi = []), t = hh(Qi, t, e), e = at, (Gt === null ? e.memoizedState : Gt.next) === null && (e = e.alternate, O.H = e === null || e.memoizedState === null ? id : _o), t;
  }
  function ns(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return wa(t);
      if (t.$$typeof === j) return $t(t);
    }
    throw Error(o(438, String(t)));
  }
  function bo(t) {
    var e = null, n = at.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var i = at.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (e = {
        data: i.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = es(), at.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), i = 0; i < t; i++)
        n[i] = tt;
    return e.index++, n;
  }
  function on(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function is(t) {
    var e = jt();
    return Ao(e, Mt, t);
  }
  function Ao(t, e, n) {
    var i = t.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = n;
    var s = t.baseQueue, r = i.pending;
    if (r !== null) {
      if (s !== null) {
        var f = s.next;
        s.next = r.next, r.next = f;
      }
      e.baseQueue = s = r, i.pending = null;
    }
    if (r = t.baseState, s === null) t.memoizedState = r;
    else {
      e = s.next;
      var y = f = null, T = null, x = e, V = !1;
      do {
        var U = x.lane & -536870913;
        if (U !== x.lane ? (ft & U) === U : (un & U) === U) {
          var C = x.revertLane;
          if (C === 0)
            T !== null && (T = T.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }), U === wi && (V = !0);
          else if ((un & C) === C) {
            x = x.next, C === wi && (V = !0);
            continue;
          } else
            U = {
              lane: 0,
              revertLane: x.revertLane,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }, T === null ? (y = T = U, f = r) : T = T.next = U, at.lanes |= C, Un |= C;
          U = x.action, ci && n(r, U), r = x.hasEagerState ? x.eagerState : n(r, U);
        } else
          C = {
            lane: U,
            revertLane: x.revertLane,
            gesture: x.gesture,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }, T === null ? (y = T = C, f = r) : T = T.next = C, at.lanes |= U, Un |= U;
        x = x.next;
      } while (x !== null && x !== e);
      if (T === null ? f = r : T.next = y, !Se(r, t.memoizedState) && (Xt = !0, V && (n = ji, n !== null)))
        throw n;
      t.memoizedState = r, t.baseState = f, t.baseQueue = T, i.lastRenderedState = r;
    }
    return s === null && (i.lanes = 0), [t.memoizedState, i.dispatch];
  }
  function Eo(t) {
    var e = jt(), n = e.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = t;
    var i = n.dispatch, s = n.pending, r = e.memoizedState;
    if (s !== null) {
      n.pending = null;
      var f = s = s.next;
      do
        r = t(r, f.action), f = f.next;
      while (f !== s);
      Se(r, e.memoizedState) || (Xt = !0), e.memoizedState = r, e.baseQueue === null && (e.baseState = r), n.lastRenderedState = r;
    }
    return [r, i];
  }
  function Eh(t, e, n) {
    var i = at, s = jt(), r = mt;
    if (r) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = e();
    var f = !Se(
      (Mt || s).memoizedState,
      n
    );
    if (f && (s.memoizedState = n, Xt = !0), s = s.queue, xo(xh.bind(null, i, s, t), [
      t
    ]), s.getSnapshot !== e || f || Gt !== null && Gt.memoizedState.tag & 1) {
      if (i.flags |= 2048, Zi(
        9,
        { destroy: void 0 },
        Dh.bind(
          null,
          i,
          s,
          n,
          e
        ),
        null
      ), Ct === null) throw Error(o(349));
      r || (un & 127) !== 0 || Mh(i, e, n);
    }
    return n;
  }
  function Mh(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = at.updateQueue, e === null ? (e = es(), at.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function Dh(t, e, n, i) {
    e.value = n, e.getSnapshot = i, Ch(e) && zh(t);
  }
  function xh(t, e, n) {
    return n(function() {
      Ch(e) && zh(t);
    });
  }
  function Ch(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !Se(t, n);
    } catch {
      return !0;
    }
  }
  function zh(t) {
    var e = ei(t, 2);
    e !== null && ye(e, t, 2);
  }
  function Mo(t) {
    var e = se();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), ci) {
        Tn(!0);
        try {
          n();
        } finally {
          Tn(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: on,
      lastRenderedState: t
    }, e;
  }
  function Rh(t, e, n, i) {
    return t.baseState = n, Ao(
      t,
      Mt,
      typeof i == "function" ? i : on
    );
  }
  function Dv(t, e, n, i, s) {
    if (ss(t)) throw Error(o(485));
    if (t = e.action, t !== null) {
      var r = {
        payload: s,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(f) {
          r.listeners.push(f);
        }
      };
      O.T !== null ? n(!0) : r.isTransition = !1, i(r), n = e.pending, n === null ? (r.next = e.pending = r, Oh(e, r)) : (r.next = n.next, e.pending = n.next = r);
    }
  }
  function Oh(t, e) {
    var n = e.action, i = e.payload, s = t.state;
    if (e.isTransition) {
      var r = O.T, f = {};
      O.T = f;
      try {
        var y = n(s, i), T = O.S;
        T !== null && T(f, y), Vh(t, e, y);
      } catch (x) {
        Do(t, e, x);
      } finally {
        r !== null && f.types !== null && (r.types = f.types), O.T = r;
      }
    } else
      try {
        r = n(s, i), Vh(t, e, r);
      } catch (x) {
        Do(t, e, x);
      }
  }
  function Vh(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        _h(t, e, i);
      },
      function(i) {
        return Do(t, e, i);
      }
    ) : _h(t, e, n);
  }
  function _h(t, e, n) {
    e.status = "fulfilled", e.value = n, Bh(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Oh(t, n)));
  }
  function Do(t, e, n) {
    var i = t.pending;
    if (t.pending = null, i !== null) {
      i = i.next;
      do
        e.status = "rejected", e.reason = n, Bh(e), e = e.next;
      while (e !== i);
    }
    t.action = null;
  }
  function Bh(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Uh(t, e) {
    return e;
  }
  function Nh(t, e) {
    if (mt) {
      var n = Ct.formState;
      if (n !== null) {
        t: {
          var i = at;
          if (mt) {
            if (Ot) {
              e: {
                for (var s = Ot, r = Be; s.nodeType !== 8; ) {
                  if (!r) {
                    s = null;
                    break e;
                  }
                  if (s = Ne(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break e;
                  }
                }
                r = s.data, s = r === "F!" || r === "F" ? s : null;
              }
              if (s) {
                Ot = Ne(
                  s.nextSibling
                ), i = s.data === "F!";
                break t;
              }
            }
            Dn(i);
          }
          i = !1;
        }
        i && (e = n[0]);
      }
    }
    return n = se(), n.memoizedState = n.baseState = e, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Uh,
      lastRenderedState: e
    }, n.queue = i, n = td.bind(
      null,
      at,
      i
    ), i.dispatch = n, i = Mo(!1), r = Vo.bind(
      null,
      at,
      !1,
      i.queue
    ), i = se(), s = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, i.queue = s, n = Dv.bind(
      null,
      at,
      s,
      r,
      n
    ), s.dispatch = n, i.memoizedState = t, [e, n, !1];
  }
  function Lh(t) {
    var e = jt();
    return Hh(e, Mt, t);
  }
  function Hh(t, e, n) {
    if (e = Ao(
      t,
      e,
      Uh
    )[0], t = is(on)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var i = wa(e);
      } catch (f) {
        throw f === Yi ? Jl : f;
      }
    else i = e;
    e = jt();
    var s = e.queue, r = s.dispatch;
    return n !== e.memoizedState && (at.flags |= 2048, Zi(
      9,
      { destroy: void 0 },
      xv.bind(null, s, n),
      null
    )), [i, r, t];
  }
  function xv(t, e) {
    t.action = e;
  }
  function wh(t) {
    var e = jt(), n = Mt;
    if (n !== null)
      return Hh(e, n, t);
    jt(), e = e.memoizedState, n = jt();
    var i = n.queue.dispatch;
    return n.memoizedState = t, [e, i, !1];
  }
  function Zi(t, e, n, i) {
    return t = { tag: t, create: n, deps: i, inst: e, next: null }, e = at.updateQueue, e === null && (e = es(), at.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (i = n.next, n.next = t, t.next = i, e.lastEffect = t), t;
  }
  function jh() {
    return jt().memoizedState;
  }
  function as(t, e, n, i) {
    var s = se();
    at.flags |= t, s.memoizedState = Zi(
      1 | e,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function ls(t, e, n, i) {
    var s = jt();
    i = i === void 0 ? null : i;
    var r = s.memoizedState.inst;
    Mt !== null && i !== null && po(i, Mt.memoizedState.deps) ? s.memoizedState = Zi(e, r, n, i) : (at.flags |= t, s.memoizedState = Zi(
      1 | e,
      r,
      n,
      i
    ));
  }
  function Yh(t, e) {
    as(8390656, 8, t, e);
  }
  function xo(t, e) {
    ls(2048, 8, t, e);
  }
  function Cv(t) {
    at.flags |= 4;
    var e = at.updateQueue;
    if (e === null)
      e = es(), at.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function qh(t) {
    var e = jt().memoizedState;
    return Cv({ ref: e, nextImpl: t }), function() {
      if ((vt & 2) !== 0) throw Error(o(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Gh(t, e) {
    return ls(4, 2, t, e);
  }
  function Xh(t, e) {
    return ls(4, 4, t, e);
  }
  function Qh(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function() {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Zh(t, e, n) {
    n = n != null ? n.concat([t]) : null, ls(4, 4, Qh.bind(null, e, t), n);
  }
  function Co() {
  }
  function Kh(t, e) {
    var n = jt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    return e !== null && po(e, i[1]) ? i[0] : (n.memoizedState = [t, e], t);
  }
  function Jh(t, e) {
    var n = jt();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    if (e !== null && po(e, i[1]))
      return i[0];
    if (i = t(), ci) {
      Tn(!0);
      try {
        t();
      } finally {
        Tn(!1);
      }
    }
    return n.memoizedState = [i, e], i;
  }
  function zo(t, e, n) {
    return n === void 0 || (un & 1073741824) !== 0 && (ft & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = kd(), at.lanes |= t, Un |= t, n);
  }
  function kh(t, e, n, i) {
    return Se(n, e) ? n : Gi.current !== null ? (t = zo(t, n, i), Se(t, e) || (Xt = !0), t) : (un & 42) === 0 || (un & 1073741824) !== 0 && (ft & 261930) === 0 ? (Xt = !0, t.memoizedState = n) : (t = kd(), at.lanes |= t, Un |= t, e);
  }
  function Fh(t, e, n, i, s) {
    var r = q.p;
    q.p = r !== 0 && 8 > r ? r : 8;
    var f = O.T, y = {};
    O.T = y, Vo(t, !1, e, n);
    try {
      var T = s(), x = O.S;
      if (x !== null && x(y, T), T !== null && typeof T == "object" && typeof T.then == "function") {
        var V = Av(
          T,
          i
        );
        ja(
          t,
          e,
          V,
          De(t)
        );
      } else
        ja(
          t,
          e,
          i,
          De(t)
        );
    } catch (U) {
      ja(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: U },
        De()
      );
    } finally {
      q.p = r, f !== null && y.types !== null && (f.types = y.types), O.T = f;
    }
  }
  function zv() {
  }
  function Ro(t, e, n, i) {
    if (t.tag !== 5) throw Error(o(476));
    var s = Wh(t).queue;
    Fh(
      t,
      s,
      e,
      Q,
      n === null ? zv : function() {
        return Ph(t), n(i);
      }
    );
  }
  function Wh(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: on,
        lastRenderedState: Q
      },
      next: null
    };
    var n = {};
    return e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: on,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Ph(t) {
    var e = Wh(t);
    e.next === null && (e = t.alternate.memoizedState), ja(
      t,
      e.next.queue,
      {},
      De()
    );
  }
  function Oo() {
    return $t(nl);
  }
  function $h() {
    return jt().memoizedState;
  }
  function Ih() {
    return jt().memoizedState;
  }
  function Rv(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = De();
          t = zn(n);
          var i = Rn(e, t, n);
          i !== null && (ye(i, e, n), Ua(i, e, n)), e = { cache: ao() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function Ov(t, e, n) {
    var i = De();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ss(t) ? ed(e, n) : (n = Ju(t, e, n, i), n !== null && (ye(n, t, i), nd(n, e, i)));
  }
  function td(t, e, n) {
    var i = De();
    ja(t, e, n, i);
  }
  function ja(t, e, n, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ss(t)) ed(e, s);
    else {
      var r = t.alternate;
      if (t.lanes === 0 && (r === null || r.lanes === 0) && (r = e.lastRenderedReducer, r !== null))
        try {
          var f = e.lastRenderedState, y = r(f, n);
          if (s.hasEagerState = !0, s.eagerState = y, Se(y, f))
            return Yl(t, e, s, 0), Ct === null && jl(), !1;
        } catch {
        }
      if (n = Ju(t, e, s, i), n !== null)
        return ye(n, t, i), nd(n, e, i), !0;
    }
    return !1;
  }
  function Vo(t, e, n, i) {
    if (i = {
      lane: 2,
      revertLane: rr(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ss(t)) {
      if (e) throw Error(o(479));
    } else
      e = Ju(
        t,
        n,
        i,
        2
      ), e !== null && ye(e, t, 2);
  }
  function ss(t) {
    var e = t.alternate;
    return t === at || e !== null && e === at;
  }
  function ed(t, e) {
    Xi = Il = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function nd(t, e, n) {
    if ((n & 4194048) !== 0) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, uf(t, n);
    }
  }
  var Ya = {
    readContext: $t,
    use: ns,
    useCallback: Bt,
    useContext: Bt,
    useEffect: Bt,
    useImperativeHandle: Bt,
    useLayoutEffect: Bt,
    useInsertionEffect: Bt,
    useMemo: Bt,
    useReducer: Bt,
    useRef: Bt,
    useState: Bt,
    useDebugValue: Bt,
    useDeferredValue: Bt,
    useTransition: Bt,
    useSyncExternalStore: Bt,
    useId: Bt,
    useHostTransitionStatus: Bt,
    useFormState: Bt,
    useActionState: Bt,
    useOptimistic: Bt,
    useMemoCache: Bt,
    useCacheRefresh: Bt
  };
  Ya.useEffectEvent = Bt;
  var id = {
    readContext: $t,
    use: ns,
    useCallback: function(t, e) {
      return se().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: $t,
    useEffect: Yh,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, as(
        4194308,
        4,
        Qh.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return as(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      as(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = se();
      e = e === void 0 ? null : e;
      var i = t();
      if (ci) {
        Tn(!0);
        try {
          t();
        } finally {
          Tn(!1);
        }
      }
      return n.memoizedState = [i, e], i;
    },
    useReducer: function(t, e, n) {
      var i = se();
      if (n !== void 0) {
        var s = n(e);
        if (ci) {
          Tn(!0);
          try {
            n(e);
          } finally {
            Tn(!1);
          }
        }
      } else s = e;
      return i.memoizedState = i.baseState = s, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: s
      }, i.queue = t, t = t.dispatch = Ov.bind(
        null,
        at,
        t
      ), [i.memoizedState, t];
    },
    useRef: function(t) {
      var e = se();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Mo(t);
      var e = t.queue, n = td.bind(null, at, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: Co,
    useDeferredValue: function(t, e) {
      var n = se();
      return zo(n, t, e);
    },
    useTransition: function() {
      var t = Mo(!1);
      return t = Fh.bind(
        null,
        at,
        t.queue,
        !0,
        !1
      ), se().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var i = at, s = se();
      if (mt) {
        if (n === void 0)
          throw Error(o(407));
        n = n();
      } else {
        if (n = e(), Ct === null)
          throw Error(o(349));
        (ft & 127) !== 0 || Mh(i, e, n);
      }
      s.memoizedState = n;
      var r = { value: n, getSnapshot: e };
      return s.queue = r, Yh(xh.bind(null, i, r, t), [
        t
      ]), i.flags |= 2048, Zi(
        9,
        { destroy: void 0 },
        Dh.bind(
          null,
          i,
          r,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = se(), e = Ct.identifierPrefix;
      if (mt) {
        var n = Ke, i = Ze;
        n = (i & ~(1 << 32 - ve(i) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = ts++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = Ev++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: Oo,
    useFormState: Nh,
    useActionState: Nh,
    useOptimistic: function(t) {
      var e = se();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = Vo.bind(
        null,
        at,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: bo,
    useCacheRefresh: function() {
      return se().memoizedState = Rv.bind(
        null,
        at
      );
    },
    useEffectEvent: function(t) {
      var e = se(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((vt & 2) !== 0)
          throw Error(o(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, _o = {
    readContext: $t,
    use: ns,
    useCallback: Kh,
    useContext: $t,
    useEffect: xo,
    useImperativeHandle: Zh,
    useInsertionEffect: Gh,
    useLayoutEffect: Xh,
    useMemo: Jh,
    useReducer: is,
    useRef: jh,
    useState: function() {
      return is(on);
    },
    useDebugValue: Co,
    useDeferredValue: function(t, e) {
      var n = jt();
      return kh(
        n,
        Mt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = is(on)[0], e = jt().memoizedState;
      return [
        typeof t == "boolean" ? t : wa(t),
        e
      ];
    },
    useSyncExternalStore: Eh,
    useId: $h,
    useHostTransitionStatus: Oo,
    useFormState: Lh,
    useActionState: Lh,
    useOptimistic: function(t, e) {
      var n = jt();
      return Rh(n, Mt, t, e);
    },
    useMemoCache: bo,
    useCacheRefresh: Ih
  };
  _o.useEffectEvent = qh;
  var ad = {
    readContext: $t,
    use: ns,
    useCallback: Kh,
    useContext: $t,
    useEffect: xo,
    useImperativeHandle: Zh,
    useInsertionEffect: Gh,
    useLayoutEffect: Xh,
    useMemo: Jh,
    useReducer: Eo,
    useRef: jh,
    useState: function() {
      return Eo(on);
    },
    useDebugValue: Co,
    useDeferredValue: function(t, e) {
      var n = jt();
      return Mt === null ? zo(n, t, e) : kh(
        n,
        Mt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Eo(on)[0], e = jt().memoizedState;
      return [
        typeof t == "boolean" ? t : wa(t),
        e
      ];
    },
    useSyncExternalStore: Eh,
    useId: $h,
    useHostTransitionStatus: Oo,
    useFormState: wh,
    useActionState: wh,
    useOptimistic: function(t, e) {
      var n = jt();
      return Mt !== null ? Rh(n, Mt, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: bo,
    useCacheRefresh: Ih
  };
  ad.useEffectEvent = qh;
  function Bo(t, e, n, i) {
    e = t.memoizedState, n = n(i, e), n = n == null ? e : S({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var Uo = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var i = De(), s = zn(i);
      s.payload = e, n != null && (s.callback = n), e = Rn(t, s, i), e !== null && (ye(e, t, i), Ua(e, t, i));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var i = De(), s = zn(i);
      s.tag = 1, s.payload = e, n != null && (s.callback = n), e = Rn(t, s, i), e !== null && (ye(e, t, i), Ua(e, t, i));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = De(), i = zn(n);
      i.tag = 2, e != null && (i.callback = e), e = Rn(t, i, n), e !== null && (ye(e, t, n), Ua(e, t, n));
    }
  };
  function ld(t, e, n, i, s, r, f) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(i, r, f) : e.prototype && e.prototype.isPureReactComponent ? !xa(n, i) || !xa(s, r) : !0;
  }
  function sd(t, e, n, i) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, i), e.state !== t && Uo.enqueueReplaceState(e, e.state, null);
  }
  function fi(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var i in e)
        i !== "ref" && (n[i] = e[i]);
    }
    if (t = t.defaultProps) {
      n === e && (n = S({}, n));
      for (var s in t)
        n[s] === void 0 && (n[s] = t[s]);
    }
    return n;
  }
  function ud(t) {
    wl(t);
  }
  function od(t) {
    console.error(t);
  }
  function rd(t) {
    wl(t);
  }
  function us(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function cd(t, e, n) {
    try {
      var i = t.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function No(t, e, n) {
    return n = zn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      us(t, e);
    }, n;
  }
  function fd(t) {
    return t = zn(t), t.tag = 3, t;
  }
  function hd(t, e, n, i) {
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var r = i.value;
      t.payload = function() {
        return s(r);
      }, t.callback = function() {
        cd(e, n, i);
      };
    }
    var f = n.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (t.callback = function() {
      cd(e, n, i), typeof s != "function" && (Nn === null ? Nn = /* @__PURE__ */ new Set([this]) : Nn.add(this));
      var y = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: y !== null ? y : ""
      });
    });
  }
  function Vv(t, e, n, i, s) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (e = n.alternate, e !== null && Hi(
        e,
        n,
        s,
        !0
      ), n = be.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Ue === null ? Ss() : n.alternate === null && Ut === 0 && (Ut = 3), n.flags &= -257, n.flags |= 65536, n.lanes = s, i === kl ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : e.add(i), sr(t, i, s)), !1;
          case 22:
            return n.flags |= 65536, i === kl ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), sr(t, i, s)), !1;
        }
        throw Error(o(435, n.tag));
      }
      return sr(t, i, s), Ss(), !1;
    }
    if (mt)
      return e = be.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = s, i !== Iu && (t = Error(o(422), { cause: i }), Ra(Oe(t, n)))) : (i !== Iu && (e = Error(o(423), {
        cause: i
      }), Ra(
        Oe(e, n)
      )), t = t.current.alternate, t.flags |= 65536, s &= -s, t.lanes |= s, i = Oe(i, n), s = No(
        t.stateNode,
        i,
        s
      ), co(t, s), Ut !== 4 && (Ut = 2)), !1;
    var r = Error(o(520), { cause: i });
    if (r = Oe(r, n), ka === null ? ka = [r] : ka.push(r), Ut !== 4 && (Ut = 2), e === null) return !0;
    i = Oe(i, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = s & -s, n.lanes |= t, t = No(n.stateNode, i, t), co(n, t), !1;
        case 1:
          if (e = n.type, r = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (Nn === null || !Nn.has(r))))
            return n.flags |= 65536, s &= -s, n.lanes |= s, s = fd(s), hd(
              s,
              t,
              n,
              i
            ), co(n, s), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Lo = Error(o(461)), Xt = !1;
  function It(t, e, n, i) {
    e.child = t === null ? ph(e, null, n, i) : ri(
      e,
      t.child,
      n,
      i
    );
  }
  function dd(t, e, n, i, s) {
    n = n.render;
    var r = e.ref;
    if ("ref" in i) {
      var f = {};
      for (var y in i)
        y !== "ref" && (f[y] = i[y]);
    } else f = i;
    return li(e), i = go(
      t,
      e,
      n,
      f,
      r,
      s
    ), y = vo(), t !== null && !Xt ? (So(t, e, s), rn(t, e, s)) : (mt && y && Pu(e), e.flags |= 1, It(t, e, i, s), e.child);
  }
  function md(t, e, n, i, s) {
    if (t === null) {
      var r = n.type;
      return typeof r == "function" && !ku(r) && r.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = r, yd(
        t,
        e,
        r,
        i,
        s
      )) : (t = Gl(
        n.type,
        null,
        i,
        e,
        e.mode,
        s
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (r = t.child, !Qo(t, s)) {
      var f = r.memoizedProps;
      if (n = n.compare, n = n !== null ? n : xa, n(f, i) && t.ref === e.ref)
        return rn(t, e, s);
    }
    return e.flags |= 1, t = nn(r, i), t.ref = e.ref, t.return = e, e.child = t;
  }
  function yd(t, e, n, i, s) {
    if (t !== null) {
      var r = t.memoizedProps;
      if (xa(r, i) && t.ref === e.ref)
        if (Xt = !1, e.pendingProps = i = r, Qo(t, s))
          (t.flags & 131072) !== 0 && (Xt = !0);
        else
          return e.lanes = t.lanes, rn(t, e, s);
    }
    return Ho(
      t,
      e,
      n,
      i,
      s
    );
  }
  function pd(t, e, n, i) {
    var s = i.children, r = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (r = r !== null ? r.baseLanes | n : n, t !== null) {
          for (i = e.child = t.child, s = 0; i !== null; )
            s = s | i.lanes | i.childLanes, i = i.sibling;
          i = s & ~r;
        } else i = 0, e.child = null;
        return gd(
          t,
          e,
          r,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Kl(
          e,
          r !== null ? r.cachePool : null
        ), r !== null ? Sh(e, r) : ho(), Th(e);
      else
        return i = e.lanes = 536870912, gd(
          t,
          e,
          r !== null ? r.baseLanes | n : n,
          n,
          i
        );
    } else
      r !== null ? (Kl(e, r.cachePool), Sh(e, r), Vn(), e.memoizedState = null) : (t !== null && Kl(e, null), ho(), Vn());
    return It(t, e, s, n), e.child;
  }
  function qa(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function gd(t, e, n, i, s) {
    var r = so();
    return r = r === null ? null : { parent: qt._currentValue, pool: r }, e.memoizedState = {
      baseLanes: n,
      cachePool: r
    }, t !== null && Kl(e, null), ho(), Th(e), t !== null && Hi(t, e, i, !0), e.childLanes = s, null;
  }
  function os(t, e) {
    return e = cs(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function vd(t, e, n) {
    return ri(e, t.child, null, n), t = os(e, e.pendingProps), t.flags |= 2, Ae(e), e.memoizedState = null, t;
  }
  function _v(t, e, n) {
    var i = e.pendingProps, s = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (mt) {
        if (i.mode === "hidden")
          return t = os(e, i), e.lanes = 536870912, qa(null, t);
        if (yo(e), (t = Ot) ? (t = Om(
          t,
          Be
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: En !== null ? { id: Ze, overflow: Ke } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = eh(t), n.return = e, e.child = n, Pt = e, Ot = null)) : t = null, t === null) throw Dn(e);
        return e.lanes = 536870912, null;
      }
      return os(e, i);
    }
    var r = t.memoizedState;
    if (r !== null) {
      var f = r.dehydrated;
      if (yo(e), s)
        if (e.flags & 256)
          e.flags &= -257, e = vd(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(o(558));
      else if (Xt || Hi(t, e, n, !1), s = (n & t.childLanes) !== 0, Xt || s) {
        if (i = Ct, i !== null && (f = of(i, n), f !== 0 && f !== r.retryLane))
          throw r.retryLane = f, ei(t, f), ye(i, t, f), Lo;
        Ss(), e = vd(
          t,
          e,
          n
        );
      } else
        t = r.treeContext, Ot = Ne(f.nextSibling), Pt = e, mt = !0, Mn = null, Be = !1, t !== null && ah(e, t), e = os(e, i), e.flags |= 4096;
      return e;
    }
    return t = nn(t.child, {
      mode: i.mode,
      children: i.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function rs(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(o(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function Ho(t, e, n, i, s) {
    return li(e), n = go(
      t,
      e,
      n,
      i,
      void 0,
      s
    ), i = vo(), t !== null && !Xt ? (So(t, e, s), rn(t, e, s)) : (mt && i && Pu(e), e.flags |= 1, It(t, e, n, s), e.child);
  }
  function Sd(t, e, n, i, s, r) {
    return li(e), e.updateQueue = null, n = Ah(
      e,
      i,
      n,
      s
    ), bh(t), i = vo(), t !== null && !Xt ? (So(t, e, r), rn(t, e, r)) : (mt && i && Pu(e), e.flags |= 1, It(t, e, n, r), e.child);
  }
  function Td(t, e, n, i, s) {
    if (li(e), e.stateNode === null) {
      var r = Bi, f = n.contextType;
      typeof f == "object" && f !== null && (r = $t(f)), r = new n(i, r), e.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Uo, e.stateNode = r, r._reactInternals = e, r = e.stateNode, r.props = i, r.state = e.memoizedState, r.refs = {}, oo(e), f = n.contextType, r.context = typeof f == "object" && f !== null ? $t(f) : Bi, r.state = e.memoizedState, f = n.getDerivedStateFromProps, typeof f == "function" && (Bo(
        e,
        n,
        f,
        i
      ), r.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (f = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), f !== r.state && Uo.enqueueReplaceState(r, r.state, null), La(e, i, r, s), Na(), r.state = e.memoizedState), typeof r.componentDidMount == "function" && (e.flags |= 4194308), i = !0;
    } else if (t === null) {
      r = e.stateNode;
      var y = e.memoizedProps, T = fi(n, y);
      r.props = T;
      var x = r.context, V = n.contextType;
      f = Bi, typeof V == "object" && V !== null && (f = $t(V));
      var U = n.getDerivedStateFromProps;
      V = typeof U == "function" || typeof r.getSnapshotBeforeUpdate == "function", y = e.pendingProps !== y, V || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (y || x !== f) && sd(
        e,
        r,
        i,
        f
      ), Cn = !1;
      var C = e.memoizedState;
      r.state = C, La(e, i, r, s), Na(), x = e.memoizedState, y || C !== x || Cn ? (typeof U == "function" && (Bo(
        e,
        n,
        U,
        i
      ), x = e.memoizedState), (T = Cn || ld(
        e,
        n,
        T,
        i,
        C,
        x,
        f
      )) ? (V || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = i, e.memoizedState = x), r.props = i, r.state = x, r.context = f, i = T) : (typeof r.componentDidMount == "function" && (e.flags |= 4194308), i = !1);
    } else {
      r = e.stateNode, ro(t, e), f = e.memoizedProps, V = fi(n, f), r.props = V, U = e.pendingProps, C = r.context, x = n.contextType, T = Bi, typeof x == "object" && x !== null && (T = $t(x)), y = n.getDerivedStateFromProps, (x = typeof y == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (f !== U || C !== T) && sd(
        e,
        r,
        i,
        T
      ), Cn = !1, C = e.memoizedState, r.state = C, La(e, i, r, s), Na();
      var R = e.memoizedState;
      f !== U || C !== R || Cn || t !== null && t.dependencies !== null && Ql(t.dependencies) ? (typeof y == "function" && (Bo(
        e,
        n,
        y,
        i
      ), R = e.memoizedState), (V = Cn || ld(
        e,
        n,
        V,
        i,
        C,
        R,
        T
      ) || t !== null && t.dependencies !== null && Ql(t.dependencies)) ? (x || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(i, R, T), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        i,
        R,
        T
      )), typeof r.componentDidUpdate == "function" && (e.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || f === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), e.memoizedProps = i, e.memoizedState = R), r.props = i, r.state = R, r.context = T, i = V) : (typeof r.componentDidUpdate != "function" || f === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || f === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), i = !1);
    }
    return r = i, rs(t, e), i = (e.flags & 128) !== 0, r || i ? (r = e.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : r.render(), e.flags |= 1, t !== null && i ? (e.child = ri(
      e,
      t.child,
      null,
      s
    ), e.child = ri(
      e,
      null,
      n,
      s
    )) : It(t, e, n, s), e.memoizedState = r.state, t = e.child) : t = rn(
      t,
      e,
      s
    ), t;
  }
  function bd(t, e, n, i) {
    return ii(), e.flags |= 256, It(t, e, n, i), e.child;
  }
  var wo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function jo(t) {
    return { baseLanes: t, cachePool: ch() };
  }
  function Yo(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= Me), t;
  }
  function Ad(t, e, n) {
    var i = e.pendingProps, s = !1, r = (e.flags & 128) !== 0, f;
    if ((f = r) || (f = t !== null && t.memoizedState === null ? !1 : (wt.current & 2) !== 0), f && (s = !0, e.flags &= -129), f = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (mt) {
        if (s ? On(e) : Vn(), (t = Ot) ? (t = Om(
          t,
          Be
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: En !== null ? { id: Ze, overflow: Ke } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = eh(t), n.return = e, e.child = n, Pt = e, Ot = null)) : t = null, t === null) throw Dn(e);
        return Ar(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var y = i.children;
      return i = i.fallback, s ? (Vn(), s = e.mode, y = cs(
        { mode: "hidden", children: y },
        s
      ), i = ni(
        i,
        s,
        n,
        null
      ), y.return = e, i.return = e, y.sibling = i, e.child = y, i = e.child, i.memoizedState = jo(n), i.childLanes = Yo(
        t,
        f,
        n
      ), e.memoizedState = wo, qa(null, i)) : (On(e), qo(e, y));
    }
    var T = t.memoizedState;
    if (T !== null && (y = T.dehydrated, y !== null)) {
      if (r)
        e.flags & 256 ? (On(e), e.flags &= -257, e = Go(
          t,
          e,
          n
        )) : e.memoizedState !== null ? (Vn(), e.child = t.child, e.flags |= 128, e = null) : (Vn(), y = i.fallback, s = e.mode, i = cs(
          { mode: "visible", children: i.children },
          s
        ), y = ni(
          y,
          s,
          n,
          null
        ), y.flags |= 2, i.return = e, y.return = e, i.sibling = y, e.child = i, ri(
          e,
          t.child,
          null,
          n
        ), i = e.child, i.memoizedState = jo(n), i.childLanes = Yo(
          t,
          f,
          n
        ), e.memoizedState = wo, e = qa(null, i));
      else if (On(e), Ar(y)) {
        if (f = y.nextSibling && y.nextSibling.dataset, f) var x = f.dgst;
        f = x, i = Error(o(419)), i.stack = "", i.digest = f, Ra({ value: i, source: null, stack: null }), e = Go(
          t,
          e,
          n
        );
      } else if (Xt || Hi(t, e, n, !1), f = (n & t.childLanes) !== 0, Xt || f) {
        if (f = Ct, f !== null && (i = of(f, n), i !== 0 && i !== T.retryLane))
          throw T.retryLane = i, ei(t, i), ye(f, t, i), Lo;
        br(y) || Ss(), e = Go(
          t,
          e,
          n
        );
      } else
        br(y) ? (e.flags |= 192, e.child = t.child, e = null) : (t = T.treeContext, Ot = Ne(
          y.nextSibling
        ), Pt = e, mt = !0, Mn = null, Be = !1, t !== null && ah(e, t), e = qo(
          e,
          i.children
        ), e.flags |= 4096);
      return e;
    }
    return s ? (Vn(), y = i.fallback, s = e.mode, T = t.child, x = T.sibling, i = nn(T, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = T.subtreeFlags & 65011712, x !== null ? y = nn(
      x,
      y
    ) : (y = ni(
      y,
      s,
      n,
      null
    ), y.flags |= 2), y.return = e, i.return = e, i.sibling = y, e.child = i, qa(null, i), i = e.child, y = t.child.memoizedState, y === null ? y = jo(n) : (s = y.cachePool, s !== null ? (T = qt._currentValue, s = s.parent !== T ? { parent: T, pool: T } : s) : s = ch(), y = {
      baseLanes: y.baseLanes | n,
      cachePool: s
    }), i.memoizedState = y, i.childLanes = Yo(
      t,
      f,
      n
    ), e.memoizedState = wo, qa(t.child, i)) : (On(e), n = t.child, t = n.sibling, n = nn(n, {
      mode: "visible",
      children: i.children
    }), n.return = e, n.sibling = null, t !== null && (f = e.deletions, f === null ? (e.deletions = [t], e.flags |= 16) : f.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function qo(t, e) {
    return e = cs(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function cs(t, e) {
    return t = Te(22, t, null, e), t.lanes = 0, t;
  }
  function Go(t, e, n) {
    return ri(e, t.child, null, n), t = qo(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Ed(t, e, n) {
    t.lanes |= e;
    var i = t.alternate;
    i !== null && (i.lanes |= e), no(t.return, e, n);
  }
  function Xo(t, e, n, i, s, r) {
    var f = t.memoizedState;
    f === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: s,
      treeForkCount: r
    } : (f.isBackwards = e, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = n, f.tailMode = s, f.treeForkCount = r);
  }
  function Md(t, e, n) {
    var i = e.pendingProps, s = i.revealOrder, r = i.tail;
    i = i.children;
    var f = wt.current, y = (f & 2) !== 0;
    if (y ? (f = f & 1 | 2, e.flags |= 128) : f &= 1, G(wt, f), It(t, e, i, n), i = mt ? za : 0, !y && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Ed(t, n, e);
        else if (t.tag === 19)
          Ed(t, n, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (s) {
      case "forwards":
        for (n = e.child, s = null; n !== null; )
          t = n.alternate, t !== null && $l(t) === null && (s = n), n = n.sibling;
        n = s, n === null ? (s = e.child, e.child = null) : (s = n.sibling, n.sibling = null), Xo(
          e,
          !1,
          s,
          n,
          r,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, s = e.child, e.child = null; s !== null; ) {
          if (t = s.alternate, t !== null && $l(t) === null) {
            e.child = s;
            break;
          }
          t = s.sibling, s.sibling = n, n = s, s = t;
        }
        Xo(
          e,
          !0,
          n,
          null,
          r,
          i
        );
        break;
      case "together":
        Xo(
          e,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function rn(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), Un |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (Hi(
          t,
          e,
          n,
          !1
        ), (n & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(o(153));
    if (e.child !== null) {
      for (t = e.child, n = nn(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = nn(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function Qo(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ql(t)));
  }
  function Bv(t, e, n) {
    switch (e.tag) {
      case 3:
        le(e, e.stateNode.containerInfo), xn(e, qt, t.memoizedState.cache), ii();
        break;
      case 27:
      case 5:
        da(e);
        break;
      case 4:
        le(e, e.stateNode.containerInfo);
        break;
      case 10:
        xn(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, yo(e), null;
        break;
      case 13:
        var i = e.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (On(e), e.flags |= 128, null) : (n & e.child.childLanes) !== 0 ? Ad(t, e, n) : (On(e), t = rn(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        On(e);
        break;
      case 19:
        var s = (t.flags & 128) !== 0;
        if (i = (n & e.childLanes) !== 0, i || (Hi(
          t,
          e,
          n,
          !1
        ), i = (n & e.childLanes) !== 0), s) {
          if (i)
            return Md(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (s = e.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), G(wt, wt.current), i) break;
        return null;
      case 22:
        return e.lanes = 0, pd(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        xn(e, qt, t.memoizedState.cache);
    }
    return rn(t, e, n);
  }
  function Dd(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Xt = !0;
      else {
        if (!Qo(t, n) && (e.flags & 128) === 0)
          return Xt = !1, Bv(
            t,
            e,
            n
          );
        Xt = (t.flags & 131072) !== 0;
      }
    else
      Xt = !1, mt && (e.flags & 1048576) !== 0 && ih(e, za, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var i = e.pendingProps;
          if (t = ui(e.elementType), e.type = t, typeof t == "function")
            ku(t) ? (i = fi(t, i), e.tag = 1, e = Td(
              null,
              e,
              t,
              i,
              n
            )) : (e.tag = 0, e = Ho(
              null,
              e,
              t,
              i,
              n
            ));
          else {
            if (t != null) {
              var s = t.$$typeof;
              if (s === X) {
                e.tag = 11, e = dd(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (s === K) {
                e.tag = 14, e = md(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              }
            }
            throw e = Yt(t) || t, Error(o(306, e, ""));
          }
        }
        return e;
      case 0:
        return Ho(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return i = e.type, s = fi(
          i,
          e.pendingProps
        ), Td(
          t,
          e,
          i,
          s,
          n
        );
      case 3:
        t: {
          if (le(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(o(387));
          i = e.pendingProps;
          var r = e.memoizedState;
          s = r.element, ro(t, e), La(e, i, null, n);
          var f = e.memoizedState;
          if (i = f.cache, xn(e, qt, i), i !== r.cache && io(
            e,
            [qt],
            n,
            !0
          ), Na(), i = f.element, r.isDehydrated)
            if (r = {
              element: i,
              isDehydrated: !1,
              cache: f.cache
            }, e.updateQueue.baseState = r, e.memoizedState = r, e.flags & 256) {
              e = bd(
                t,
                e,
                i,
                n
              );
              break t;
            } else if (i !== s) {
              s = Oe(
                Error(o(424)),
                e
              ), Ra(s), e = bd(
                t,
                e,
                i,
                n
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Ot = Ne(t.firstChild), Pt = e, mt = !0, Mn = null, Be = !0, n = ph(
                e,
                null,
                i,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (ii(), i === s) {
              e = rn(
                t,
                e,
                n
              );
              break t;
            }
            It(t, e, i, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return rs(t, e), t === null ? (n = Lm(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : mt || (n = e.type, t = e.pendingProps, i = xs(
          ot.current
        ).createElement(n), i[Wt] = e, i[re] = t, te(i, n, t), kt(i), e.stateNode = i) : e.memoizedState = Lm(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return da(e), t === null && mt && (i = e.stateNode = Bm(
          e.type,
          e.pendingProps,
          ot.current
        ), Pt = e, Be = !0, s = Ot, jn(e.type) ? (Er = s, Ot = Ne(i.firstChild)) : Ot = s), It(
          t,
          e,
          e.pendingProps.children,
          n
        ), rs(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && mt && ((s = i = Ot) && (i = r1(
          i,
          e.type,
          e.pendingProps,
          Be
        ), i !== null ? (e.stateNode = i, Pt = e, Ot = Ne(i.firstChild), Be = !1, s = !0) : s = !1), s || Dn(e)), da(e), s = e.type, r = e.pendingProps, f = t !== null ? t.memoizedProps : null, i = r.children, vr(s, r) ? i = null : f !== null && vr(s, f) && (e.flags |= 32), e.memoizedState !== null && (s = go(
          t,
          e,
          Mv,
          null,
          null,
          n
        ), nl._currentValue = s), rs(t, e), It(t, e, i, n), e.child;
      case 6:
        return t === null && mt && ((t = n = Ot) && (n = c1(
          n,
          e.pendingProps,
          Be
        ), n !== null ? (e.stateNode = n, Pt = e, Ot = null, t = !0) : t = !1), t || Dn(e)), null;
      case 13:
        return Ad(t, e, n);
      case 4:
        return le(
          e,
          e.stateNode.containerInfo
        ), i = e.pendingProps, t === null ? e.child = ri(
          e,
          null,
          i,
          n
        ) : It(t, e, i, n), e.child;
      case 11:
        return dd(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return It(
          t,
          e,
          e.pendingProps,
          n
        ), e.child;
      case 8:
        return It(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return It(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return i = e.pendingProps, xn(e, e.type, i.value), It(t, e, i.children, n), e.child;
      case 9:
        return s = e.type._context, i = e.pendingProps.children, li(e), s = $t(s), i = i(s), e.flags |= 1, It(t, e, i, n), e.child;
      case 14:
        return md(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return yd(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Md(t, e, n);
      case 31:
        return _v(t, e, n);
      case 22:
        return pd(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return li(e), i = $t(qt), t === null ? (s = so(), s === null && (s = Ct, r = ao(), s.pooledCache = r, r.refCount++, r !== null && (s.pooledCacheLanes |= n), s = r), e.memoizedState = { parent: i, cache: s }, oo(e), xn(e, qt, s)) : ((t.lanes & n) !== 0 && (ro(t, e), La(e, null, null, n), Na()), s = t.memoizedState, r = e.memoizedState, s.parent !== i ? (s = { parent: i, cache: i }, e.memoizedState = s, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = s), xn(e, qt, i)) : (i = r.cache, xn(e, qt, i), i !== s.cache && io(
          e,
          [qt],
          n,
          !0
        ))), It(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function cn(t) {
    t.flags |= 4;
  }
  function Zo(t, e, n, i, s) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (s & 335544128) === s)
        if (t.stateNode.complete) t.flags |= 8192;
        else if ($d()) t.flags |= 8192;
        else
          throw oi = kl, uo;
    } else t.flags &= -16777217;
  }
  function xd(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !qm(e))
      if ($d()) t.flags |= 8192;
      else
        throw oi = kl, uo;
  }
  function fs(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? lf() : 536870912, t.lanes |= e, Fi |= e);
  }
  function Ga(t, e) {
    if (!mt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = t.tail;
          for (var i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : i.sibling = null;
      }
  }
  function Vt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, i = 0;
    if (e)
      for (var s = t.child; s !== null; )
        n |= s.lanes | s.childLanes, i |= s.subtreeFlags & 65011712, i |= s.flags & 65011712, s.return = t, s = s.sibling;
    else
      for (s = t.child; s !== null; )
        n |= s.lanes | s.childLanes, i |= s.subtreeFlags, i |= s.flags, s.return = t, s = s.sibling;
    return t.subtreeFlags |= i, t.childLanes = n, e;
  }
  function Uv(t, e, n) {
    var i = e.pendingProps;
    switch ($u(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Vt(e), null;
      case 1:
        return Vt(e), null;
      case 3:
        return n = e.stateNode, i = null, t !== null && (i = t.memoizedState.cache), e.memoizedState.cache !== i && (e.flags |= 2048), sn(qt), Ht(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Li(e) ? cn(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, to())), Vt(e), null;
      case 26:
        var s = e.type, r = e.memoizedState;
        return t === null ? (cn(e), r !== null ? (Vt(e), xd(e, r)) : (Vt(e), Zo(
          e,
          s,
          null,
          i,
          n
        ))) : r ? r !== t.memoizedState ? (cn(e), Vt(e), xd(e, r)) : (Vt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== i && cn(e), Vt(e), Zo(
          e,
          s,
          t,
          i,
          n
        )), null;
      case 27:
        if (Al(e), n = ot.current, s = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && cn(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(o(166));
            return Vt(e), null;
          }
          t = k.current, Li(e) ? lh(e) : (t = Bm(s, i, n), e.stateNode = t, cn(e));
        }
        return Vt(e), null;
      case 5:
        if (Al(e), s = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && cn(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(o(166));
            return Vt(e), null;
          }
          if (r = k.current, Li(e))
            lh(e);
          else {
            var f = xs(
              ot.current
            );
            switch (r) {
              case 1:
                r = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                r = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    r = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    r = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    r = f.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(
                      r.firstChild
                    );
                    break;
                  case "select":
                    r = typeof i.is == "string" ? f.createElement("select", {
                      is: i.is
                    }) : f.createElement("select"), i.multiple ? r.multiple = !0 : i.size && (r.size = i.size);
                    break;
                  default:
                    r = typeof i.is == "string" ? f.createElement(s, { is: i.is }) : f.createElement(s);
                }
            }
            r[Wt] = e, r[re] = i;
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                r.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === e) break t;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e)
                  break t;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            e.stateNode = r;
            t: switch (te(r, s, i), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break t;
              case "img":
                i = !0;
                break t;
              default:
                i = !1;
            }
            i && cn(e);
          }
        }
        return Vt(e), Zo(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== i && cn(e);
        else {
          if (typeof i != "string" && e.stateNode === null)
            throw Error(o(166));
          if (t = ot.current, Li(e)) {
            if (t = e.stateNode, n = e.memoizedProps, i = null, s = Pt, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            t[Wt] = e, t = !!(t.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || Am(t.nodeValue, n)), t || Dn(e, !0);
          } else
            t = xs(t).createTextNode(
              i
            ), t[Wt] = e, e.stateNode = t;
        }
        return Vt(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (i = Li(e), n !== null) {
            if (t === null) {
              if (!i) throw Error(o(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(o(557));
              t[Wt] = e;
            } else
              ii(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Vt(e), t = !1;
          } else
            n = to(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (Ae(e), e) : (Ae(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Vt(e), null;
      case 13:
        if (i = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (s = Li(e), i !== null && i.dehydrated !== null) {
            if (t === null) {
              if (!s) throw Error(o(318));
              if (s = e.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(o(317));
              s[Wt] = e;
            } else
              ii(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Vt(e), s = !1;
          } else
            s = to(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return e.flags & 256 ? (Ae(e), e) : (Ae(e), null);
        }
        return Ae(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = i !== null, t = t !== null && t.memoizedState !== null, n && (i = e.child, s = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (s = i.alternate.memoizedState.cachePool.pool), r = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (r = i.memoizedState.cachePool.pool), r !== s && (i.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), fs(e, e.updateQueue), Vt(e), null);
      case 4:
        return Ht(), t === null && dr(e.stateNode.containerInfo), Vt(e), null;
      case 10:
        return sn(e.type), Vt(e), null;
      case 19:
        if (N(wt), i = e.memoizedState, i === null) return Vt(e), null;
        if (s = (e.flags & 128) !== 0, r = i.rendering, r === null)
          if (s) Ga(i, !1);
          else {
            if (Ut !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (r = $l(t), r !== null) {
                  for (e.flags |= 128, Ga(i, !1), t = r.updateQueue, e.updateQueue = t, fs(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    th(n, t), n = n.sibling;
                  return G(
                    wt,
                    wt.current & 1 | 2
                  ), mt && an(e, i.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            i.tail !== null && pe() > ps && (e.flags |= 128, s = !0, Ga(i, !1), e.lanes = 4194304);
          }
        else {
          if (!s)
            if (t = $l(r), t !== null) {
              if (e.flags |= 128, s = !0, t = t.updateQueue, e.updateQueue = t, fs(e, t), Ga(i, !0), i.tail === null && i.tailMode === "hidden" && !r.alternate && !mt)
                return Vt(e), null;
            } else
              2 * pe() - i.renderingStartTime > ps && n !== 536870912 && (e.flags |= 128, s = !0, Ga(i, !1), e.lanes = 4194304);
          i.isBackwards ? (r.sibling = e.child, e.child = r) : (t = i.last, t !== null ? t.sibling = r : e.child = r, i.last = r);
        }
        return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = pe(), t.sibling = null, n = wt.current, G(
          wt,
          s ? n & 1 | 2 : n & 1
        ), mt && an(e, i.treeForkCount), t) : (Vt(e), null);
      case 22:
      case 23:
        return Ae(e), mo(), i = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== i && (e.flags |= 8192) : i && (e.flags |= 8192), i ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Vt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Vt(e), n = e.updateQueue, n !== null && fs(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), i = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), i !== n && (e.flags |= 2048), t !== null && N(si), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), sn(qt), Vt(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function Nv(t, e) {
    switch ($u(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return sn(qt), Ht(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Al(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Ae(e), e.alternate === null)
            throw Error(o(340));
          ii();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Ae(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(o(340));
          ii();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return N(wt), null;
      case 4:
        return Ht(), null;
      case 10:
        return sn(e.type), null;
      case 22:
      case 23:
        return Ae(e), mo(), t !== null && N(si), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return sn(qt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Cd(t, e) {
    switch ($u(e), e.tag) {
      case 3:
        sn(qt), Ht();
        break;
      case 26:
      case 27:
      case 5:
        Al(e);
        break;
      case 4:
        Ht();
        break;
      case 31:
        e.memoizedState !== null && Ae(e);
        break;
      case 13:
        Ae(e);
        break;
      case 19:
        N(wt);
        break;
      case 10:
        sn(e.type);
        break;
      case 22:
      case 23:
        Ae(e), mo(), t !== null && N(si);
        break;
      case 24:
        sn(qt);
    }
  }
  function Xa(t, e) {
    try {
      var n = e.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        n = s;
        do {
          if ((n.tag & t) === t) {
            i = void 0;
            var r = n.create, f = n.inst;
            i = r(), f.destroy = i;
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (y) {
      At(e, e.return, y);
    }
  }
  function _n(t, e, n) {
    try {
      var i = e.updateQueue, s = i !== null ? i.lastEffect : null;
      if (s !== null) {
        var r = s.next;
        i = r;
        do {
          if ((i.tag & t) === t) {
            var f = i.inst, y = f.destroy;
            if (y !== void 0) {
              f.destroy = void 0, s = e;
              var T = n, x = y;
              try {
                x();
              } catch (V) {
                At(
                  s,
                  T,
                  V
                );
              }
            }
          }
          i = i.next;
        } while (i !== r);
      }
    } catch (V) {
      At(e, e.return, V);
    }
  }
  function zd(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        vh(e, n);
      } catch (i) {
        At(t, t.return, i);
      }
    }
  }
  function Rd(t, e, n) {
    n.props = fi(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      At(t, e, i);
    }
  }
  function Qa(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var i = t.stateNode;
            break;
          case 30:
            i = t.stateNode;
            break;
          default:
            i = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(i) : n.current = i;
      }
    } catch (s) {
      At(t, e, s);
    }
  }
  function Je(t, e) {
    var n = t.ref, i = t.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (s) {
          At(t, e, s);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (s) {
          At(t, e, s);
        }
      else n.current = null;
  }
  function Od(t) {
    var e = t.type, n = t.memoizedProps, i = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break t;
        case "img":
          n.src ? i.src = n.src : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (s) {
      At(t, t.return, s);
    }
  }
  function Ko(t, e, n) {
    try {
      var i = t.stateNode;
      i1(i, t.type, n, e), i[re] = e;
    } catch (s) {
      At(t, t.return, s);
    }
  }
  function Vd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && jn(t.type) || t.tag === 4;
  }
  function Jo(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Vd(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && jn(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ko(t, e, n) {
    var i = t.tag;
    if (i === 5 || i === 6)
      t = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(t, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(t), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = tn));
    else if (i !== 4 && (i === 27 && jn(t.type) && (n = t.stateNode, e = null), t = t.child, t !== null))
      for (ko(t, e, n), t = t.sibling; t !== null; )
        ko(t, e, n), t = t.sibling;
  }
  function hs(t, e, n) {
    var i = t.tag;
    if (i === 5 || i === 6)
      t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
    else if (i !== 4 && (i === 27 && jn(t.type) && (n = t.stateNode), t = t.child, t !== null))
      for (hs(t, e, n), t = t.sibling; t !== null; )
        hs(t, e, n), t = t.sibling;
  }
  function _d(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var i = t.type, s = e.attributes; s.length; )
        e.removeAttributeNode(s[0]);
      te(e, i, n), e[Wt] = t, e[re] = n;
    } catch (r) {
      At(t, t.return, r);
    }
  }
  var fn = !1, Qt = !1, Fo = !1, Bd = typeof WeakSet == "function" ? WeakSet : Set, Ft = null;
  function Lv(t, e) {
    if (t = t.containerInfo, pr = Bs, t = Zf(t), qu(t)) {
      if ("selectionStart" in t)
        var n = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          n = (n = t.ownerDocument) && n.defaultView || window;
          var i = n.getSelection && n.getSelection();
          if (i && i.rangeCount !== 0) {
            n = i.anchorNode;
            var s = i.anchorOffset, r = i.focusNode;
            i = i.focusOffset;
            try {
              n.nodeType, r.nodeType;
            } catch {
              n = null;
              break t;
            }
            var f = 0, y = -1, T = -1, x = 0, V = 0, U = t, C = null;
            e: for (; ; ) {
              for (var R; U !== n || s !== 0 && U.nodeType !== 3 || (y = f + s), U !== r || i !== 0 && U.nodeType !== 3 || (T = f + i), U.nodeType === 3 && (f += U.nodeValue.length), (R = U.firstChild) !== null; )
                C = U, U = R;
              for (; ; ) {
                if (U === t) break e;
                if (C === n && ++x === s && (y = f), C === r && ++V === i && (T = f), (R = U.nextSibling) !== null) break;
                U = C, C = U.parentNode;
              }
              U = R;
            }
            n = y === -1 || T === -1 ? null : { start: y, end: T };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (gr = { focusedElem: t, selectionRange: n }, Bs = !1, Ft = e; Ft !== null; )
      if (e = Ft, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, Ft = t;
      else
        for (; Ft !== null; ) {
          switch (e = Ft, r = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (n = 0; n < t.length; n++)
                  s = t[n], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && r !== null) {
                t = void 0, n = e, s = r.memoizedProps, r = r.memoizedState, i = n.stateNode;
                try {
                  var Z = fi(
                    n.type,
                    s
                  );
                  t = i.getSnapshotBeforeUpdate(
                    Z,
                    r
                  ), i.__reactInternalSnapshotBeforeUpdate = t;
                } catch (I) {
                  At(
                    n,
                    n.return,
                    I
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, n = t.nodeType, n === 9)
                  Tr(t);
                else if (n === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Tr(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, Ft = t;
            break;
          }
          Ft = e.return;
        }
  }
  function Ud(t, e, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        dn(t, n), i & 4 && Xa(5, n);
        break;
      case 1:
        if (dn(t, n), i & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (f) {
              At(n, n.return, f);
            }
          else {
            var s = fi(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                s,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              At(
                n,
                n.return,
                f
              );
            }
          }
        i & 64 && zd(n), i & 512 && Qa(n, n.return);
        break;
      case 3:
        if (dn(t, n), i & 64 && (t = n.updateQueue, t !== null)) {
          if (e = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            vh(t, e);
          } catch (f) {
            At(n, n.return, f);
          }
        }
        break;
      case 27:
        e === null && i & 4 && _d(n);
      case 26:
      case 5:
        dn(t, n), e === null && i & 4 && Od(n), i & 512 && Qa(n, n.return);
        break;
      case 12:
        dn(t, n);
        break;
      case 31:
        dn(t, n), i & 4 && Hd(t, n);
        break;
      case 13:
        dn(t, n), i & 4 && wd(t, n), i & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = Zv.bind(
          null,
          n
        ), f1(t, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || fn, !i) {
          e = e !== null && e.memoizedState !== null || Qt, s = fn;
          var r = Qt;
          fn = i, (Qt = e) && !r ? mn(
            t,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : dn(t, n), fn = s, Qt = r;
        }
        break;
      case 30:
        break;
      default:
        dn(t, n);
    }
  }
  function Nd(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Nd(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Mu(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var _t = null, fe = !1;
  function hn(t, e, n) {
    for (n = n.child; n !== null; )
      Ld(t, e, n), n = n.sibling;
  }
  function Ld(t, e, n) {
    if (ge && typeof ge.onCommitFiberUnmount == "function")
      try {
        ge.onCommitFiberUnmount(ma, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Qt || Je(n, e), hn(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Qt || Je(n, e);
        var i = _t, s = fe;
        jn(n.type) && (_t = n.stateNode, fe = !1), hn(
          t,
          e,
          n
        ), Ia(n.stateNode), _t = i, fe = s;
        break;
      case 5:
        Qt || Je(n, e);
      case 6:
        if (i = _t, s = fe, _t = null, hn(
          t,
          e,
          n
        ), _t = i, fe = s, _t !== null)
          if (fe)
            try {
              (_t.nodeType === 9 ? _t.body : _t.nodeName === "HTML" ? _t.ownerDocument.body : _t).removeChild(n.stateNode);
            } catch (r) {
              At(
                n,
                e,
                r
              );
            }
          else
            try {
              _t.removeChild(n.stateNode);
            } catch (r) {
              At(
                n,
                e,
                r
              );
            }
        break;
      case 18:
        _t !== null && (fe ? (t = _t, zm(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), ia(t)) : zm(_t, n.stateNode));
        break;
      case 4:
        i = _t, s = fe, _t = n.stateNode.containerInfo, fe = !0, hn(
          t,
          e,
          n
        ), _t = i, fe = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        _n(2, n, e), Qt || _n(4, n, e), hn(
          t,
          e,
          n
        );
        break;
      case 1:
        Qt || (Je(n, e), i = n.stateNode, typeof i.componentWillUnmount == "function" && Rd(
          n,
          e,
          i
        )), hn(
          t,
          e,
          n
        );
        break;
      case 21:
        hn(
          t,
          e,
          n
        );
        break;
      case 22:
        Qt = (i = Qt) || n.memoizedState !== null, hn(
          t,
          e,
          n
        ), Qt = i;
        break;
      default:
        hn(
          t,
          e,
          n
        );
    }
  }
  function Hd(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ia(t);
      } catch (n) {
        At(e, e.return, n);
      }
    }
  }
  function wd(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ia(t);
      } catch (n) {
        At(e, e.return, n);
      }
  }
  function Hv(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Bd()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Bd()), e;
      default:
        throw Error(o(435, t.tag));
    }
  }
  function ds(t, e) {
    var n = Hv(t);
    e.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var s = Kv.bind(null, t, i);
        i.then(s, s);
      }
    });
  }
  function he(t, e) {
    var n = e.deletions;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var s = n[i], r = t, f = e, y = f;
        t: for (; y !== null; ) {
          switch (y.tag) {
            case 27:
              if (jn(y.type)) {
                _t = y.stateNode, fe = !1;
                break t;
              }
              break;
            case 5:
              _t = y.stateNode, fe = !1;
              break t;
            case 3:
            case 4:
              _t = y.stateNode.containerInfo, fe = !0;
              break t;
          }
          y = y.return;
        }
        if (_t === null) throw Error(o(160));
        Ld(r, f, s), _t = null, fe = !1, r = s.alternate, r !== null && (r.return = null), s.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        jd(e, t), e = e.sibling;
  }
  var Ye = null;
  function jd(t, e) {
    var n = t.alternate, i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        he(e, t), de(t), i & 4 && (_n(3, t, t.return), Xa(3, t), _n(5, t, t.return));
        break;
      case 1:
        he(e, t), de(t), i & 512 && (Qt || n === null || Je(n, n.return)), i & 64 && fn && (t = t.updateQueue, t !== null && (i = t.callbacks, i !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? i : n.concat(i))));
        break;
      case 26:
        var s = Ye;
        if (he(e, t), de(t), i & 512 && (Qt || n === null || Je(n, n.return)), i & 4) {
          var r = n !== null ? n.memoizedState : null;
          if (i = t.memoizedState, n === null)
            if (i === null)
              if (t.stateNode === null) {
                t: {
                  i = t.type, n = t.memoizedProps, s = s.ownerDocument || s;
                  e: switch (i) {
                    case "title":
                      r = s.getElementsByTagName("title")[0], (!r || r[ga] || r[Wt] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = s.createElement(i), s.head.insertBefore(
                        r,
                        s.querySelector("head > title")
                      )), te(r, i, n), r[Wt] = t, kt(r), i = r;
                      break t;
                    case "link":
                      var f = jm(
                        "link",
                        "href",
                        s
                      ).get(i + (n.href || ""));
                      if (f) {
                        for (var y = 0; y < f.length; y++)
                          if (r = f[y], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            f.splice(y, 1);
                            break e;
                          }
                      }
                      r = s.createElement(i), te(r, i, n), s.head.appendChild(r);
                      break;
                    case "meta":
                      if (f = jm(
                        "meta",
                        "content",
                        s
                      ).get(i + (n.content || ""))) {
                        for (y = 0; y < f.length; y++)
                          if (r = f[y], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            f.splice(y, 1);
                            break e;
                          }
                      }
                      r = s.createElement(i), te(r, i, n), s.head.appendChild(r);
                      break;
                    default:
                      throw Error(o(468, i));
                  }
                  r[Wt] = t, kt(r), i = r;
                }
                t.stateNode = i;
              } else
                Ym(
                  s,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = wm(
                s,
                i,
                t.memoizedProps
              );
          else
            r !== i ? (r === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : r.count--, i === null ? Ym(
              s,
              t.type,
              t.stateNode
            ) : wm(
              s,
              i,
              t.memoizedProps
            )) : i === null && t.stateNode !== null && Ko(
              t,
              t.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        he(e, t), de(t), i & 512 && (Qt || n === null || Je(n, n.return)), n !== null && i & 4 && Ko(
          t,
          t.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (he(e, t), de(t), i & 512 && (Qt || n === null || Je(n, n.return)), t.flags & 32) {
          s = t.stateNode;
          try {
            xi(s, "");
          } catch (Z) {
            At(t, t.return, Z);
          }
        }
        i & 4 && t.stateNode != null && (s = t.memoizedProps, Ko(
          t,
          s,
          n !== null ? n.memoizedProps : s
        )), i & 1024 && (Fo = !0);
        break;
      case 6:
        if (he(e, t), de(t), i & 4) {
          if (t.stateNode === null)
            throw Error(o(162));
          i = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = i;
          } catch (Z) {
            At(t, t.return, Z);
          }
        }
        break;
      case 3:
        if (Rs = null, s = Ye, Ye = Cs(e.containerInfo), he(e, t), Ye = s, de(t), i & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            ia(e.containerInfo);
          } catch (Z) {
            At(t, t.return, Z);
          }
        Fo && (Fo = !1, Yd(t));
        break;
      case 4:
        i = Ye, Ye = Cs(
          t.stateNode.containerInfo
        ), he(e, t), de(t), Ye = i;
        break;
      case 12:
        he(e, t), de(t);
        break;
      case 31:
        he(e, t), de(t), i & 4 && (i = t.updateQueue, i !== null && (t.updateQueue = null, ds(t, i)));
        break;
      case 13:
        he(e, t), de(t), t.child.flags & 8192 && t.memoizedState !== null != (n !== null && n.memoizedState !== null) && (ys = pe()), i & 4 && (i = t.updateQueue, i !== null && (t.updateQueue = null, ds(t, i)));
        break;
      case 22:
        s = t.memoizedState !== null;
        var T = n !== null && n.memoizedState !== null, x = fn, V = Qt;
        if (fn = x || s, Qt = V || T, he(e, t), Qt = V, fn = x, de(t), i & 8192)
          t: for (e = t.stateNode, e._visibility = s ? e._visibility & -2 : e._visibility | 1, s && (n === null || T || fn || Qt || hi(t)), n = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                T = n = e;
                try {
                  if (r = T.stateNode, s)
                    f = r.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                  else {
                    y = T.stateNode;
                    var U = T.memoizedProps.style, C = U != null && U.hasOwnProperty("display") ? U.display : null;
                    y.style.display = C == null || typeof C == "boolean" ? "" : ("" + C).trim();
                  }
                } catch (Z) {
                  At(T, T.return, Z);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                T = e;
                try {
                  T.stateNode.nodeValue = s ? "" : T.memoizedProps;
                } catch (Z) {
                  At(T, T.return, Z);
                }
              }
            } else if (e.tag === 18) {
              if (n === null) {
                T = e;
                try {
                  var R = T.stateNode;
                  s ? Rm(R, !0) : Rm(T.stateNode, !1);
                } catch (Z) {
                  At(T, T.return, Z);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              n === e && (n = null), e = e.return;
            }
            n === e && (n = null), e.sibling.return = e.return, e = e.sibling;
          }
        i & 4 && (i = t.updateQueue, i !== null && (n = i.retryQueue, n !== null && (i.retryQueue = null, ds(t, n))));
        break;
      case 19:
        he(e, t), de(t), i & 4 && (i = t.updateQueue, i !== null && (t.updateQueue = null, ds(t, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        he(e, t), de(t);
    }
  }
  function de(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, i = t.return; i !== null; ) {
          if (Vd(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var s = n.stateNode, r = Jo(t);
            hs(t, r, s);
            break;
          case 5:
            var f = n.stateNode;
            n.flags & 32 && (xi(f, ""), n.flags &= -33);
            var y = Jo(t);
            hs(t, y, f);
            break;
          case 3:
          case 4:
            var T = n.stateNode.containerInfo, x = Jo(t);
            ko(
              t,
              x,
              T
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (V) {
        At(t, t.return, V);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Yd(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Yd(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function dn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Ud(t, e.alternate, e), e = e.sibling;
  }
  function hi(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          _n(4, e, e.return), hi(e);
          break;
        case 1:
          Je(e, e.return);
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && Rd(
            e,
            e.return,
            n
          ), hi(e);
          break;
        case 27:
          Ia(e.stateNode);
        case 26:
        case 5:
          Je(e, e.return), hi(e);
          break;
        case 22:
          e.memoizedState === null && hi(e);
          break;
        case 30:
          hi(e);
          break;
        default:
          hi(e);
      }
      t = t.sibling;
    }
  }
  function mn(t, e, n) {
    for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var i = e.alternate, s = t, r = e, f = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          mn(
            s,
            r,
            n
          ), Xa(4, r);
          break;
        case 1:
          if (mn(
            s,
            r,
            n
          ), i = r, s = i.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (x) {
              At(i, i.return, x);
            }
          if (i = r, s = i.updateQueue, s !== null) {
            var y = i.stateNode;
            try {
              var T = s.shared.hiddenCallbacks;
              if (T !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < T.length; s++)
                  gh(T[s], y);
            } catch (x) {
              At(i, i.return, x);
            }
          }
          n && f & 64 && zd(r), Qa(r, r.return);
          break;
        case 27:
          _d(r);
        case 26:
        case 5:
          mn(
            s,
            r,
            n
          ), n && i === null && f & 4 && Od(r), Qa(r, r.return);
          break;
        case 12:
          mn(
            s,
            r,
            n
          );
          break;
        case 31:
          mn(
            s,
            r,
            n
          ), n && f & 4 && Hd(s, r);
          break;
        case 13:
          mn(
            s,
            r,
            n
          ), n && f & 4 && wd(s, r);
          break;
        case 22:
          r.memoizedState === null && mn(
            s,
            r,
            n
          ), Qa(r, r.return);
          break;
        case 30:
          break;
        default:
          mn(
            s,
            r,
            n
          );
      }
      e = e.sibling;
    }
  }
  function Wo(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Oa(n));
  }
  function Po(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Oa(t));
  }
  function qe(t, e, n, i) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        qd(
          t,
          e,
          n,
          i
        ), e = e.sibling;
  }
  function qd(t, e, n, i) {
    var s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        qe(
          t,
          e,
          n,
          i
        ), s & 2048 && Xa(9, e);
        break;
      case 1:
        qe(
          t,
          e,
          n,
          i
        );
        break;
      case 3:
        qe(
          t,
          e,
          n,
          i
        ), s & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Oa(t)));
        break;
      case 12:
        if (s & 2048) {
          qe(
            t,
            e,
            n,
            i
          ), t = e.stateNode;
          try {
            var r = e.memoizedProps, f = r.id, y = r.onPostCommit;
            typeof y == "function" && y(
              f,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (T) {
            At(e, e.return, T);
          }
        } else
          qe(
            t,
            e,
            n,
            i
          );
        break;
      case 31:
        qe(
          t,
          e,
          n,
          i
        );
        break;
      case 13:
        qe(
          t,
          e,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        r = e.stateNode, f = e.alternate, e.memoizedState !== null ? r._visibility & 2 ? qe(
          t,
          e,
          n,
          i
        ) : Za(t, e) : r._visibility & 2 ? qe(
          t,
          e,
          n,
          i
        ) : (r._visibility |= 2, Ki(
          t,
          e,
          n,
          i,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Wo(f, e);
        break;
      case 24:
        qe(
          t,
          e,
          n,
          i
        ), s & 2048 && Po(e.alternate, e);
        break;
      default:
        qe(
          t,
          e,
          n,
          i
        );
    }
  }
  function Ki(t, e, n, i, s) {
    for (s = s && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var r = t, f = e, y = n, T = i, x = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Ki(
            r,
            f,
            y,
            T,
            s
          ), Xa(8, f);
          break;
        case 23:
          break;
        case 22:
          var V = f.stateNode;
          f.memoizedState !== null ? V._visibility & 2 ? Ki(
            r,
            f,
            y,
            T,
            s
          ) : Za(
            r,
            f
          ) : (V._visibility |= 2, Ki(
            r,
            f,
            y,
            T,
            s
          )), s && x & 2048 && Wo(
            f.alternate,
            f
          );
          break;
        case 24:
          Ki(
            r,
            f,
            y,
            T,
            s
          ), s && x & 2048 && Po(f.alternate, f);
          break;
        default:
          Ki(
            r,
            f,
            y,
            T,
            s
          );
      }
      e = e.sibling;
    }
  }
  function Za(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, i = e, s = i.flags;
        switch (i.tag) {
          case 22:
            Za(n, i), s & 2048 && Wo(
              i.alternate,
              i
            );
            break;
          case 24:
            Za(n, i), s & 2048 && Po(i.alternate, i);
            break;
          default:
            Za(n, i);
        }
        e = e.sibling;
      }
  }
  var Ka = 8192;
  function Ji(t, e, n) {
    if (t.subtreeFlags & Ka)
      for (t = t.child; t !== null; )
        Gd(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function Gd(t, e, n) {
    switch (t.tag) {
      case 26:
        Ji(
          t,
          e,
          n
        ), t.flags & Ka && t.memoizedState !== null && E1(
          n,
          Ye,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ji(
          t,
          e,
          n
        );
        break;
      case 3:
      case 4:
        var i = Ye;
        Ye = Cs(t.stateNode.containerInfo), Ji(
          t,
          e,
          n
        ), Ye = i;
        break;
      case 22:
        t.memoizedState === null && (i = t.alternate, i !== null && i.memoizedState !== null ? (i = Ka, Ka = 16777216, Ji(
          t,
          e,
          n
        ), Ka = i) : Ji(
          t,
          e,
          n
        ));
        break;
      default:
        Ji(
          t,
          e,
          n
        );
    }
  }
  function Xd(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Ja(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          Ft = i, Zd(
            i,
            t
          );
        }
      Xd(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Qd(t), t = t.sibling;
  }
  function Qd(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ja(t), t.flags & 2048 && _n(9, t, t.return);
        break;
      case 3:
        Ja(t);
        break;
      case 12:
        Ja(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, ms(t)) : Ja(t);
        break;
      default:
        Ja(t);
    }
  }
  function ms(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          Ft = i, Zd(
            i,
            t
          );
        }
      Xd(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          _n(8, e, e.return), ms(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, ms(e));
          break;
        default:
          ms(e);
      }
      t = t.sibling;
    }
  }
  function Zd(t, e) {
    for (; Ft !== null; ) {
      var n = Ft;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          _n(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Oa(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, Ft = i;
      else
        t: for (n = t; Ft !== null; ) {
          i = Ft;
          var s = i.sibling, r = i.return;
          if (Nd(i), i === n) {
            Ft = null;
            break t;
          }
          if (s !== null) {
            s.return = r, Ft = s;
            break t;
          }
          Ft = r;
        }
    }
  }
  var wv = {
    getCacheForType: function(t) {
      var e = $t(qt), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return $t(qt).controller.signal;
    }
  }, jv = typeof WeakMap == "function" ? WeakMap : Map, vt = 0, Ct = null, rt = null, ft = 0, bt = 0, Ee = null, Bn = !1, ki = !1, $o = !1, yn = 0, Ut = 0, Un = 0, di = 0, Io = 0, Me = 0, Fi = 0, ka = null, me = null, tr = !1, ys = 0, Kd = 0, ps = 1 / 0, gs = null, Nn = null, Kt = 0, Ln = null, Wi = null, pn = 0, er = 0, nr = null, Jd = null, Fa = 0, ir = null;
  function De() {
    return (vt & 2) !== 0 && ft !== 0 ? ft & -ft : O.T !== null ? rr() : rf();
  }
  function kd() {
    if (Me === 0)
      if ((ft & 536870912) === 0 || mt) {
        var t = Dl;
        Dl <<= 1, (Dl & 3932160) === 0 && (Dl = 262144), Me = t;
      } else Me = 536870912;
    return t = be.current, t !== null && (t.flags |= 32), Me;
  }
  function ye(t, e, n) {
    (t === Ct && (bt === 2 || bt === 9) || t.cancelPendingCommit !== null) && (Pi(t, 0), Hn(
      t,
      ft,
      Me,
      !1
    )), pa(t, n), ((vt & 2) === 0 || t !== Ct) && (t === Ct && ((vt & 2) === 0 && (di |= n), Ut === 4 && Hn(
      t,
      ft,
      Me,
      !1
    )), ke(t));
  }
  function Fd(t, e, n) {
    if ((vt & 6) !== 0) throw Error(o(327));
    var i = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || ya(t, e), s = i ? Gv(t, e) : lr(t, e, !0), r = i;
    do {
      if (s === 0) {
        ki && !i && Hn(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, r && !Yv(n)) {
          s = lr(t, e, !1), r = !1;
          continue;
        }
        if (s === 2) {
          if (r = e, t.errorRecoveryDisabledLanes & r)
            var f = 0;
          else
            f = t.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            e = f;
            t: {
              var y = t;
              s = ka;
              var T = y.current.memoizedState.isDehydrated;
              if (T && (Pi(y, f).flags |= 256), f = lr(
                y,
                f,
                !1
              ), f !== 2) {
                if ($o && !T) {
                  y.errorRecoveryDisabledLanes |= r, di |= r, s = 4;
                  break t;
                }
                r = me, me = s, r !== null && (me === null ? me = r : me.push.apply(
                  me,
                  r
                ));
              }
              s = f;
            }
            if (r = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          Pi(t, 0), Hn(t, e, 0, !0);
          break;
        }
        t: {
          switch (i = t, r = s, r) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Hn(
                i,
                e,
                Me,
                !Bn
              );
              break t;
            case 2:
              me = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && (s = ys + 300 - pe(), 10 < s)) {
            if (Hn(
              i,
              e,
              Me,
              !Bn
            ), Cl(i, 0, !0) !== 0) break t;
            pn = e, i.timeoutHandle = xm(
              Wd.bind(
                null,
                i,
                n,
                me,
                gs,
                tr,
                e,
                Me,
                di,
                Fi,
                Bn,
                r,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break t;
          }
          Wd(
            i,
            n,
            me,
            gs,
            tr,
            e,
            Me,
            di,
            Fi,
            Bn,
            r,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ke(t);
  }
  function Wd(t, e, n, i, s, r, f, y, T, x, V, U, C, R) {
    if (t.timeoutHandle = -1, U = e.subtreeFlags, U & 8192 || (U & 16785408) === 16785408) {
      U = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: tn
      }, Gd(
        e,
        r,
        U
      );
      var Z = (r & 62914560) === r ? ys - pe() : (r & 4194048) === r ? Kd - pe() : 0;
      if (Z = M1(
        U,
        Z
      ), Z !== null) {
        pn = r, t.cancelPendingCommit = Z(
          am.bind(
            null,
            t,
            e,
            r,
            n,
            i,
            s,
            f,
            y,
            T,
            V,
            U,
            null,
            C,
            R
          )
        ), Hn(t, r, f, !x);
        return;
      }
    }
    am(
      t,
      e,
      r,
      n,
      i,
      s,
      f,
      y,
      T
    );
  }
  function Yv(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var s = n[i], r = s.getSnapshot;
          s = s.value;
          try {
            if (!Se(r(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = e.child, e.subtreeFlags & 16384 && n !== null)
        n.return = e, e = n;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Hn(t, e, n, i) {
    e &= ~Io, e &= ~di, t.suspendedLanes |= e, t.pingedLanes &= ~e, i && (t.warmLanes |= e), i = t.expirationTimes;
    for (var s = e; 0 < s; ) {
      var r = 31 - ve(s), f = 1 << r;
      i[r] = -1, s &= ~f;
    }
    n !== 0 && sf(t, n, e);
  }
  function vs() {
    return (vt & 6) === 0 ? (Wa(0), !1) : !0;
  }
  function ar() {
    if (rt !== null) {
      if (bt === 0)
        var t = rt.return;
      else
        t = rt, ln = ai = null, To(t), qi = null, _a = 0, t = rt;
      for (; t !== null; )
        Cd(t.alternate, t), t = t.return;
      rt = null;
    }
  }
  function Pi(t, e) {
    var n = t.timeoutHandle;
    n !== -1 && (t.timeoutHandle = -1, s1(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), pn = 0, ar(), Ct = t, rt = n = nn(t.current, null), ft = e, bt = 0, Ee = null, Bn = !1, ki = ya(t, e), $o = !1, Fi = Me = Io = di = Un = Ut = 0, me = ka = null, tr = !1, (e & 8) !== 0 && (e |= e & 32);
    var i = t.entangledLanes;
    if (i !== 0)
      for (t = t.entanglements, i &= e; 0 < i; ) {
        var s = 31 - ve(i), r = 1 << s;
        e |= t[s], i &= ~r;
      }
    return yn = e, jl(), n;
  }
  function Pd(t, e) {
    at = null, O.H = Ya, e === Yi || e === Jl ? (e = dh(), bt = 3) : e === uo ? (e = dh(), bt = 4) : bt = e === Lo ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ee = e, rt === null && (Ut = 1, us(
      t,
      Oe(e, t.current)
    ));
  }
  function $d() {
    var t = be.current;
    return t === null ? !0 : (ft & 4194048) === ft ? Ue === null : (ft & 62914560) === ft || (ft & 536870912) !== 0 ? t === Ue : !1;
  }
  function Id() {
    var t = O.H;
    return O.H = Ya, t === null ? Ya : t;
  }
  function tm() {
    var t = O.A;
    return O.A = wv, t;
  }
  function Ss() {
    Ut = 4, Bn || (ft & 4194048) !== ft && be.current !== null || (ki = !0), (Un & 134217727) === 0 && (di & 134217727) === 0 || Ct === null || Hn(
      Ct,
      ft,
      Me,
      !1
    );
  }
  function lr(t, e, n) {
    var i = vt;
    vt |= 2;
    var s = Id(), r = tm();
    (Ct !== t || ft !== e) && (gs = null, Pi(t, e)), e = !1;
    var f = Ut;
    t: do
      try {
        if (bt !== 0 && rt !== null) {
          var y = rt, T = Ee;
          switch (bt) {
            case 8:
              ar(), f = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              be.current === null && (e = !0);
              var x = bt;
              if (bt = 0, Ee = null, $i(t, y, T, x), n && ki) {
                f = 0;
                break t;
              }
              break;
            default:
              x = bt, bt = 0, Ee = null, $i(t, y, T, x);
          }
        }
        qv(), f = Ut;
        break;
      } catch (V) {
        Pd(t, V);
      }
    while (!0);
    return e && t.shellSuspendCounter++, ln = ai = null, vt = i, O.H = s, O.A = r, rt === null && (Ct = null, ft = 0, jl()), f;
  }
  function qv() {
    for (; rt !== null; ) em(rt);
  }
  function Gv(t, e) {
    var n = vt;
    vt |= 2;
    var i = Id(), s = tm();
    Ct !== t || ft !== e ? (gs = null, ps = pe() + 500, Pi(t, e)) : ki = ya(
      t,
      e
    );
    t: do
      try {
        if (bt !== 0 && rt !== null) {
          e = rt;
          var r = Ee;
          e: switch (bt) {
            case 1:
              bt = 0, Ee = null, $i(t, e, r, 1);
              break;
            case 2:
            case 9:
              if (fh(r)) {
                bt = 0, Ee = null, nm(e);
                break;
              }
              e = function() {
                bt !== 2 && bt !== 9 || Ct !== t || (bt = 7), ke(t);
              }, r.then(e, e);
              break t;
            case 3:
              bt = 7;
              break t;
            case 4:
              bt = 5;
              break t;
            case 7:
              fh(r) ? (bt = 0, Ee = null, nm(e)) : (bt = 0, Ee = null, $i(t, e, r, 7));
              break;
            case 5:
              var f = null;
              switch (rt.tag) {
                case 26:
                  f = rt.memoizedState;
                case 5:
                case 27:
                  var y = rt;
                  if (f ? qm(f) : y.stateNode.complete) {
                    bt = 0, Ee = null;
                    var T = y.sibling;
                    if (T !== null) rt = T;
                    else {
                      var x = y.return;
                      x !== null ? (rt = x, Ts(x)) : rt = null;
                    }
                    break e;
                  }
              }
              bt = 0, Ee = null, $i(t, e, r, 5);
              break;
            case 6:
              bt = 0, Ee = null, $i(t, e, r, 6);
              break;
            case 8:
              ar(), Ut = 6;
              break t;
            default:
              throw Error(o(462));
          }
        }
        Xv();
        break;
      } catch (V) {
        Pd(t, V);
      }
    while (!0);
    return ln = ai = null, O.H = i, O.A = s, vt = n, rt !== null ? 0 : (Ct = null, ft = 0, jl(), Ut);
  }
  function Xv() {
    for (; rt !== null && !h0(); )
      em(rt);
  }
  function em(t) {
    var e = Dd(t.alternate, t, yn);
    t.memoizedProps = t.pendingProps, e === null ? Ts(t) : rt = e;
  }
  function nm(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Sd(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          ft
        );
        break;
      case 11:
        e = Sd(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          ft
        );
        break;
      case 5:
        To(e);
      default:
        Cd(n, e), e = rt = th(e, yn), e = Dd(n, e, yn);
    }
    t.memoizedProps = t.pendingProps, e === null ? Ts(t) : rt = e;
  }
  function $i(t, e, n, i) {
    ln = ai = null, To(e), qi = null, _a = 0;
    var s = e.return;
    try {
      if (Vv(
        t,
        s,
        e,
        n,
        ft
      )) {
        Ut = 1, us(
          t,
          Oe(n, t.current)
        ), rt = null;
        return;
      }
    } catch (r) {
      if (s !== null) throw rt = s, r;
      Ut = 1, us(
        t,
        Oe(n, t.current)
      ), rt = null;
      return;
    }
    e.flags & 32768 ? (mt || i === 1 ? t = !0 : ki || (ft & 536870912) !== 0 ? t = !1 : (Bn = t = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = be.current, i !== null && i.tag === 13 && (i.flags |= 16384))), im(e, t)) : Ts(e);
  }
  function Ts(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        im(
          e,
          Bn
        );
        return;
      }
      t = e.return;
      var n = Uv(
        e.alternate,
        e,
        yn
      );
      if (n !== null) {
        rt = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        rt = e;
        return;
      }
      rt = e = t;
    } while (e !== null);
    Ut === 0 && (Ut = 5);
  }
  function im(t, e) {
    do {
      var n = Nv(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, rt = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        rt = t;
        return;
      }
      rt = t = n;
    } while (t !== null);
    Ut = 6, rt = null;
  }
  function am(t, e, n, i, s, r, f, y, T) {
    t.cancelPendingCommit = null;
    do
      bs();
    while (Kt !== 0);
    if ((vt & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (r = e.lanes | e.childLanes, r |= Ku, A0(
        t,
        n,
        r,
        f,
        y,
        T
      ), t === Ct && (rt = Ct = null, ft = 0), Wi = e, Ln = t, pn = n, er = r, nr = s, Jd = i, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Jv(El, function() {
        return rm(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), i = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || i) {
        i = O.T, O.T = null, s = q.p, q.p = 2, f = vt, vt |= 4;
        try {
          Lv(t, e, n);
        } finally {
          vt = f, q.p = s, O.T = i;
        }
      }
      Kt = 1, lm(), sm(), um();
    }
  }
  function lm() {
    if (Kt === 1) {
      Kt = 0;
      var t = Ln, e = Wi, n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        n = O.T, O.T = null;
        var i = q.p;
        q.p = 2;
        var s = vt;
        vt |= 4;
        try {
          jd(e, t);
          var r = gr, f = Zf(t.containerInfo), y = r.focusedElem, T = r.selectionRange;
          if (f !== y && y && y.ownerDocument && Qf(
            y.ownerDocument.documentElement,
            y
          )) {
            if (T !== null && qu(y)) {
              var x = T.start, V = T.end;
              if (V === void 0 && (V = x), "selectionStart" in y)
                y.selectionStart = x, y.selectionEnd = Math.min(
                  V,
                  y.value.length
                );
              else {
                var U = y.ownerDocument || document, C = U && U.defaultView || window;
                if (C.getSelection) {
                  var R = C.getSelection(), Z = y.textContent.length, I = Math.min(T.start, Z), xt = T.end === void 0 ? I : Math.min(T.end, Z);
                  !R.extend && I > xt && (f = xt, xt = I, I = f);
                  var M = Xf(
                    y,
                    I
                  ), b = Xf(
                    y,
                    xt
                  );
                  if (M && b && (R.rangeCount !== 1 || R.anchorNode !== M.node || R.anchorOffset !== M.offset || R.focusNode !== b.node || R.focusOffset !== b.offset)) {
                    var D = U.createRange();
                    D.setStart(M.node, M.offset), R.removeAllRanges(), I > xt ? (R.addRange(D), R.extend(b.node, b.offset)) : (D.setEnd(b.node, b.offset), R.addRange(D));
                  }
                }
              }
            }
            for (U = [], R = y; R = R.parentNode; )
              R.nodeType === 1 && U.push({
                element: R,
                left: R.scrollLeft,
                top: R.scrollTop
              });
            for (typeof y.focus == "function" && y.focus(), y = 0; y < U.length; y++) {
              var _ = U[y];
              _.element.scrollLeft = _.left, _.element.scrollTop = _.top;
            }
          }
          Bs = !!pr, gr = pr = null;
        } finally {
          vt = s, q.p = i, O.T = n;
        }
      }
      t.current = e, Kt = 2;
    }
  }
  function sm() {
    if (Kt === 2) {
      Kt = 0;
      var t = Ln, e = Wi, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = O.T, O.T = null;
        var i = q.p;
        q.p = 2;
        var s = vt;
        vt |= 4;
        try {
          Ud(t, e.alternate, e);
        } finally {
          vt = s, q.p = i, O.T = n;
        }
      }
      Kt = 3;
    }
  }
  function um() {
    if (Kt === 4 || Kt === 3) {
      Kt = 0, d0();
      var t = Ln, e = Wi, n = pn, i = Jd;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Kt = 5 : (Kt = 0, Wi = Ln = null, om(t, t.pendingLanes));
      var s = t.pendingLanes;
      if (s === 0 && (Nn = null), Au(n), e = e.stateNode, ge && typeof ge.onCommitFiberRoot == "function")
        try {
          ge.onCommitFiberRoot(
            ma,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        e = O.T, s = q.p, q.p = 2, O.T = null;
        try {
          for (var r = t.onRecoverableError, f = 0; f < i.length; f++) {
            var y = i[f];
            r(y.value, {
              componentStack: y.stack
            });
          }
        } finally {
          O.T = e, q.p = s;
        }
      }
      (pn & 3) !== 0 && bs(), ke(t), s = t.pendingLanes, (n & 261930) !== 0 && (s & 42) !== 0 ? t === ir ? Fa++ : (Fa = 0, ir = t) : Fa = 0, Wa(0);
    }
  }
  function om(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Oa(e)));
  }
  function bs() {
    return lm(), sm(), um(), rm();
  }
  function rm() {
    if (Kt !== 5) return !1;
    var t = Ln, e = er;
    er = 0;
    var n = Au(pn), i = O.T, s = q.p;
    try {
      q.p = 32 > n ? 32 : n, O.T = null, n = nr, nr = null;
      var r = Ln, f = pn;
      if (Kt = 0, Wi = Ln = null, pn = 0, (vt & 6) !== 0) throw Error(o(331));
      var y = vt;
      if (vt |= 4, Qd(r.current), qd(
        r,
        r.current,
        f,
        n
      ), vt = y, Wa(0, !1), ge && typeof ge.onPostCommitFiberRoot == "function")
        try {
          ge.onPostCommitFiberRoot(ma, r);
        } catch {
        }
      return !0;
    } finally {
      q.p = s, O.T = i, om(t, e);
    }
  }
  function cm(t, e, n) {
    e = Oe(n, e), e = No(t.stateNode, e, 2), t = Rn(t, e, 2), t !== null && (pa(t, 2), ke(t));
  }
  function At(t, e, n) {
    if (t.tag === 3)
      cm(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          cm(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var i = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Nn === null || !Nn.has(i))) {
            t = Oe(n, t), n = fd(2), i = Rn(e, n, 2), i !== null && (hd(
              n,
              i,
              e,
              t
            ), pa(i, 2), ke(i));
            break;
          }
        }
        e = e.return;
      }
  }
  function sr(t, e, n) {
    var i = t.pingCache;
    if (i === null) {
      i = t.pingCache = new jv();
      var s = /* @__PURE__ */ new Set();
      i.set(e, s);
    } else
      s = i.get(e), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(e, s));
    s.has(n) || ($o = !0, s.add(n), t = Qv.bind(null, t, e, n), e.then(t, t));
  }
  function Qv(t, e, n) {
    var i = t.pingCache;
    i !== null && i.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, Ct === t && (ft & n) === n && (Ut === 4 || Ut === 3 && (ft & 62914560) === ft && 300 > pe() - ys ? (vt & 2) === 0 && Pi(t, 0) : Io |= n, Fi === ft && (Fi = 0)), ke(t);
  }
  function fm(t, e) {
    e === 0 && (e = lf()), t = ei(t, e), t !== null && (pa(t, e), ke(t));
  }
  function Zv(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), fm(t, n);
  }
  function Kv(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var i = t.stateNode, s = t.memoizedState;
        s !== null && (n = s.retryLane);
        break;
      case 19:
        i = t.stateNode;
        break;
      case 22:
        i = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    i !== null && i.delete(e), fm(t, n);
  }
  function Jv(t, e) {
    return vu(t, e);
  }
  var As = null, Ii = null, ur = !1, Es = !1, or = !1, wn = 0;
  function ke(t) {
    t !== Ii && t.next === null && (Ii === null ? As = Ii = t : Ii = Ii.next = t), Es = !0, ur || (ur = !0, Fv());
  }
  function Wa(t, e) {
    if (!or && Es) {
      or = !0;
      do
        for (var n = !1, i = As; i !== null; ) {
          if (t !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var r = 0;
            else {
              var f = i.suspendedLanes, y = i.pingedLanes;
              r = (1 << 31 - ve(42 | t) + 1) - 1, r &= s & ~(f & ~y), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (n = !0, ym(i, r));
          } else
            r = ft, r = Cl(
              i,
              i === Ct ? r : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (r & 3) === 0 || ya(i, r) || (n = !0, ym(i, r));
          i = i.next;
        }
      while (n);
      or = !1;
    }
  }
  function kv() {
    hm();
  }
  function hm() {
    Es = ur = !1;
    var t = 0;
    wn !== 0 && l1() && (t = wn);
    for (var e = pe(), n = null, i = As; i !== null; ) {
      var s = i.next, r = dm(i, e);
      r === 0 ? (i.next = null, n === null ? As = s : n.next = s, s === null && (Ii = n)) : (n = i, (t !== 0 || (r & 3) !== 0) && (Es = !0)), i = s;
    }
    Kt !== 0 && Kt !== 5 || Wa(t), wn !== 0 && (wn = 0);
  }
  function dm(t, e) {
    for (var n = t.suspendedLanes, i = t.pingedLanes, s = t.expirationTimes, r = t.pendingLanes & -62914561; 0 < r; ) {
      var f = 31 - ve(r), y = 1 << f, T = s[f];
      T === -1 ? ((y & n) === 0 || (y & i) !== 0) && (s[f] = b0(y, e)) : T <= e && (t.expiredLanes |= y), r &= ~y;
    }
    if (e = Ct, n = ft, n = Cl(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i = t.callbackNode, n === 0 || t === e && (bt === 2 || bt === 9) || t.cancelPendingCommit !== null)
      return i !== null && i !== null && Su(i), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || ya(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (i !== null && Su(i), Au(n)) {
        case 2:
        case 8:
          n = nf;
          break;
        case 32:
          n = El;
          break;
        case 268435456:
          n = af;
          break;
        default:
          n = El;
      }
      return i = mm.bind(null, t), n = vu(n, i), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return i !== null && i !== null && Su(i), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function mm(t, e) {
    if (Kt !== 0 && Kt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (bs() && t.callbackNode !== n)
      return null;
    var i = ft;
    return i = Cl(
      t,
      t === Ct ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i === 0 ? null : (Fd(t, i, e), dm(t, pe()), t.callbackNode != null && t.callbackNode === n ? mm.bind(null, t) : null);
  }
  function ym(t, e) {
    if (bs()) return null;
    Fd(t, e, !0);
  }
  function Fv() {
    u1(function() {
      (vt & 6) !== 0 ? vu(
        ef,
        kv
      ) : hm();
    });
  }
  function rr() {
    if (wn === 0) {
      var t = wi;
      t === 0 && (t = Ml, Ml <<= 1, (Ml & 261888) === 0 && (Ml = 256)), wn = t;
    }
    return wn;
  }
  function pm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Vl("" + t);
  }
  function gm(t, e) {
    var n = e.ownerDocument.createElement("input");
    return n.name = e.name, n.value = e.value, t.id && n.setAttribute("form", t.id), e.parentNode.insertBefore(n, e), t = new FormData(t), n.parentNode.removeChild(n), t;
  }
  function Wv(t, e, n, i, s) {
    if (e === "submit" && n && n.stateNode === s) {
      var r = pm(
        (s[re] || null).action
      ), f = i.submitter;
      f && (e = (e = f[re] || null) ? pm(e.formAction) : f.getAttribute("formAction"), e !== null && (r = e, f = null));
      var y = new Nl(
        "action",
        "action",
        null,
        i,
        s
      );
      t.push({
        event: y,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (wn !== 0) {
                  var T = f ? gm(s, f) : new FormData(s);
                  Ro(
                    n,
                    {
                      pending: !0,
                      data: T,
                      method: s.method,
                      action: r
                    },
                    null,
                    T
                  );
                }
              } else
                typeof r == "function" && (y.preventDefault(), T = f ? gm(s, f) : new FormData(s), Ro(
                  n,
                  {
                    pending: !0,
                    data: T,
                    method: s.method,
                    action: r
                  },
                  r,
                  T
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var cr = 0; cr < Zu.length; cr++) {
    var fr = Zu[cr], Pv = fr.toLowerCase(), $v = fr[0].toUpperCase() + fr.slice(1);
    je(
      Pv,
      "on" + $v
    );
  }
  je(kf, "onAnimationEnd"), je(Ff, "onAnimationIteration"), je(Wf, "onAnimationStart"), je("dblclick", "onDoubleClick"), je("focusin", "onFocus"), je("focusout", "onBlur"), je(mv, "onTransitionRun"), je(yv, "onTransitionStart"), je(pv, "onTransitionCancel"), je(Pf, "onTransitionEnd"), Mi("onMouseEnter", ["mouseout", "mouseover"]), Mi("onMouseLeave", ["mouseout", "mouseover"]), Mi("onPointerEnter", ["pointerout", "pointerover"]), Mi("onPointerLeave", ["pointerout", "pointerover"]), Pn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Pn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Pn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Pn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Pn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Pn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Pa = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Iv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Pa)
  );
  function vm(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var i = t[n], s = i.event;
      i = i.listeners;
      t: {
        var r = void 0;
        if (e)
          for (var f = i.length - 1; 0 <= f; f--) {
            var y = i[f], T = y.instance, x = y.currentTarget;
            if (y = y.listener, T !== r && s.isPropagationStopped())
              break t;
            r = y, s.currentTarget = x;
            try {
              r(s);
            } catch (V) {
              wl(V);
            }
            s.currentTarget = null, r = T;
          }
        else
          for (f = 0; f < i.length; f++) {
            if (y = i[f], T = y.instance, x = y.currentTarget, y = y.listener, T !== r && s.isPropagationStopped())
              break t;
            r = y, s.currentTarget = x;
            try {
              r(s);
            } catch (V) {
              wl(V);
            }
            s.currentTarget = null, r = T;
          }
      }
    }
  }
  function ct(t, e) {
    var n = e[Eu];
    n === void 0 && (n = e[Eu] = /* @__PURE__ */ new Set());
    var i = t + "__bubble";
    n.has(i) || (Sm(e, t, 2, !1), n.add(i));
  }
  function hr(t, e, n) {
    var i = 0;
    e && (i |= 4), Sm(
      n,
      t,
      i,
      e
    );
  }
  var Ms = "_reactListening" + Math.random().toString(36).slice(2);
  function dr(t) {
    if (!t[Ms]) {
      t[Ms] = !0, hf.forEach(function(n) {
        n !== "selectionchange" && (Iv.has(n) || hr(n, !1, t), hr(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ms] || (e[Ms] = !0, hr("selectionchange", !1, e));
    }
  }
  function Sm(t, e, n, i) {
    switch (km(e)) {
      case 2:
        var s = C1;
        break;
      case 8:
        s = z1;
        break;
      default:
        s = zr;
    }
    n = s.bind(
      null,
      e,
      n,
      t
    ), s = void 0, !_u || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (s = !0), i ? s !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: s
    }) : t.addEventListener(e, n, !0) : s !== void 0 ? t.addEventListener(e, n, {
      passive: s
    }) : t.addEventListener(e, n, !1);
  }
  function mr(t, e, n, i, s) {
    var r = i;
    if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
      t: for (; ; ) {
        if (i === null) return;
        var f = i.tag;
        if (f === 3 || f === 4) {
          var y = i.stateNode.containerInfo;
          if (y === s) break;
          if (f === 4)
            for (f = i.return; f !== null; ) {
              var T = f.tag;
              if ((T === 3 || T === 4) && f.stateNode.containerInfo === s)
                return;
              f = f.return;
            }
          for (; y !== null; ) {
            if (f = bi(y), f === null) return;
            if (T = f.tag, T === 5 || T === 6 || T === 26 || T === 27) {
              i = r = f;
              continue t;
            }
            y = y.parentNode;
          }
        }
        i = i.return;
      }
    Mf(function() {
      var x = r, V = Ou(n), U = [];
      t: {
        var C = $f.get(t);
        if (C !== void 0) {
          var R = Nl, Z = t;
          switch (t) {
            case "keypress":
              if (Bl(n) === 0) break t;
            case "keydown":
            case "keyup":
              R = K0;
              break;
            case "focusin":
              Z = "focus", R = Lu;
              break;
            case "focusout":
              Z = "blur", R = Lu;
              break;
            case "beforeblur":
            case "afterblur":
              R = Lu;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              R = Cf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              R = U0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              R = F0;
              break;
            case kf:
            case Ff:
            case Wf:
              R = H0;
              break;
            case Pf:
              R = P0;
              break;
            case "scroll":
            case "scrollend":
              R = _0;
              break;
            case "wheel":
              R = I0;
              break;
            case "copy":
            case "cut":
            case "paste":
              R = j0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              R = Rf;
              break;
            case "toggle":
            case "beforetoggle":
              R = ev;
          }
          var I = (e & 4) !== 0, xt = !I && (t === "scroll" || t === "scrollend"), M = I ? C !== null ? C + "Capture" : null : C;
          I = [];
          for (var b = x, D; b !== null; ) {
            var _ = b;
            if (D = _.stateNode, _ = _.tag, _ !== 5 && _ !== 26 && _ !== 27 || D === null || M === null || (_ = Sa(b, M), _ != null && I.push(
              $a(b, _, D)
            )), xt) break;
            b = b.return;
          }
          0 < I.length && (C = new R(
            C,
            Z,
            null,
            n,
            V
          ), U.push({ event: C, listeners: I }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (C = t === "mouseover" || t === "pointerover", R = t === "mouseout" || t === "pointerout", C && n !== Ru && (Z = n.relatedTarget || n.fromElement) && (bi(Z) || Z[Ti]))
            break t;
          if ((R || C) && (C = V.window === V ? V : (C = V.ownerDocument) ? C.defaultView || C.parentWindow : window, R ? (Z = n.relatedTarget || n.toElement, R = x, Z = Z ? bi(Z) : null, Z !== null && (xt = d(Z), I = Z.tag, Z !== xt || I !== 5 && I !== 27 && I !== 6) && (Z = null)) : (R = null, Z = x), R !== Z)) {
            if (I = Cf, _ = "onMouseLeave", M = "onMouseEnter", b = "mouse", (t === "pointerout" || t === "pointerover") && (I = Rf, _ = "onPointerLeave", M = "onPointerEnter", b = "pointer"), xt = R == null ? C : va(R), D = Z == null ? C : va(Z), C = new I(
              _,
              b + "leave",
              R,
              n,
              V
            ), C.target = xt, C.relatedTarget = D, _ = null, bi(V) === x && (I = new I(
              M,
              b + "enter",
              Z,
              n,
              V
            ), I.target = D, I.relatedTarget = xt, _ = I), xt = _, R && Z)
              e: {
                for (I = t1, M = R, b = Z, D = 0, _ = M; _; _ = I(_))
                  D++;
                _ = 0;
                for (var $ = b; $; $ = I($))
                  _++;
                for (; 0 < D - _; )
                  M = I(M), D--;
                for (; 0 < _ - D; )
                  b = I(b), _--;
                for (; D--; ) {
                  if (M === b || b !== null && M === b.alternate) {
                    I = M;
                    break e;
                  }
                  M = I(M), b = I(b);
                }
                I = null;
              }
            else I = null;
            R !== null && Tm(
              U,
              C,
              R,
              I,
              !1
            ), Z !== null && xt !== null && Tm(
              U,
              xt,
              Z,
              I,
              !0
            );
          }
        }
        t: {
          if (C = x ? va(x) : window, R = C.nodeName && C.nodeName.toLowerCase(), R === "select" || R === "input" && C.type === "file")
            var yt = Hf;
          else if (Nf(C))
            if (wf)
              yt = fv;
            else {
              yt = rv;
              var F = ov;
            }
          else
            R = C.nodeName, !R || R.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? x && zu(x.elementType) && (yt = Hf) : yt = cv;
          if (yt && (yt = yt(t, x))) {
            Lf(
              U,
              yt,
              n,
              V
            );
            break t;
          }
          F && F(t, C, x), t === "focusout" && x && C.type === "number" && x.memoizedProps.value != null && Cu(C, "number", C.value);
        }
        switch (F = x ? va(x) : window, t) {
          case "focusin":
            (Nf(F) || F.contentEditable === "true") && (Oi = F, Gu = x, Ca = null);
            break;
          case "focusout":
            Ca = Gu = Oi = null;
            break;
          case "mousedown":
            Xu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Xu = !1, Kf(U, n, V);
            break;
          case "selectionchange":
            if (dv) break;
          case "keydown":
          case "keyup":
            Kf(U, n, V);
        }
        var st;
        if (wu)
          t: {
            switch (t) {
              case "compositionstart":
                var ht = "onCompositionStart";
                break t;
              case "compositionend":
                ht = "onCompositionEnd";
                break t;
              case "compositionupdate":
                ht = "onCompositionUpdate";
                break t;
            }
            ht = void 0;
          }
        else
          Ri ? Bf(t, n) && (ht = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (ht = "onCompositionStart");
        ht && (Of && n.locale !== "ko" && (Ri || ht !== "onCompositionStart" ? ht === "onCompositionEnd" && Ri && (st = Df()) : (An = V, Bu = "value" in An ? An.value : An.textContent, Ri = !0)), F = Ds(x, ht), 0 < F.length && (ht = new zf(
          ht,
          t,
          null,
          n,
          V
        ), U.push({ event: ht, listeners: F }), st ? ht.data = st : (st = Uf(n), st !== null && (ht.data = st)))), (st = iv ? av(t, n) : lv(t, n)) && (ht = Ds(x, "onBeforeInput"), 0 < ht.length && (F = new zf(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          V
        ), U.push({
          event: F,
          listeners: ht
        }), F.data = st)), Wv(
          U,
          t,
          x,
          n,
          V
        );
      }
      vm(U, e);
    });
  }
  function $a(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function Ds(t, e) {
    for (var n = e + "Capture", i = []; t !== null; ) {
      var s = t, r = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || r === null || (s = Sa(t, n), s != null && i.unshift(
        $a(t, s, r)
      ), s = Sa(t, e), s != null && i.push(
        $a(t, s, r)
      )), t.tag === 3) return i;
      t = t.return;
    }
    return [];
  }
  function t1(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Tm(t, e, n, i, s) {
    for (var r = e._reactName, f = []; n !== null && n !== i; ) {
      var y = n, T = y.alternate, x = y.stateNode;
      if (y = y.tag, T !== null && T === i) break;
      y !== 5 && y !== 26 && y !== 27 || x === null || (T = x, s ? (x = Sa(n, r), x != null && f.unshift(
        $a(n, x, T)
      )) : s || (x = Sa(n, r), x != null && f.push(
        $a(n, x, T)
      ))), n = n.return;
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var e1 = /\r\n?/g, n1 = /\u0000|\uFFFD/g;
  function bm(t) {
    return (typeof t == "string" ? t : "" + t).replace(e1, `
`).replace(n1, "");
  }
  function Am(t, e) {
    return e = bm(e), bm(t) === e;
  }
  function Dt(t, e, n, i, s, r) {
    switch (n) {
      case "children":
        typeof i == "string" ? e === "body" || e === "textarea" && i === "" || xi(t, i) : (typeof i == "number" || typeof i == "bigint") && e !== "body" && xi(t, "" + i);
        break;
      case "className":
        Rl(t, "class", i);
        break;
      case "tabIndex":
        Rl(t, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Rl(t, n, i);
        break;
      case "style":
        Af(t, i, r);
        break;
      case "data":
        if (e !== "object") {
          Rl(t, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = Vl("" + i), t.setAttribute(n, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" && (n === "formAction" ? (e !== "input" && Dt(t, e, "name", s.name, s, null), Dt(
            t,
            e,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Dt(
            t,
            e,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Dt(
            t,
            e,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Dt(t, e, "encType", s.encType, s, null), Dt(t, e, "method", s.method, s, null), Dt(t, e, "target", s.target, s, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = Vl("" + i), t.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (t.onclick = tn);
        break;
      case "onScroll":
        i != null && ct("scroll", t);
        break;
      case "onScrollEnd":
        i != null && ct("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(o(61));
          if (n = i.__html, n != null) {
            if (s.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "multiple":
        t.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        t.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = Vl("" + i), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, "" + i) : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0 ? t.setAttribute(n, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? t.removeAttribute(n) : t.setAttribute(n, i);
        break;
      case "popover":
        ct("beforetoggle", t), ct("toggle", t), zl(t, "popover", i);
        break;
      case "xlinkActuate":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        Ie(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        Ie(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        Ie(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        Ie(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        zl(t, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = O0.get(n) || n, zl(t, n, i));
    }
  }
  function yr(t, e, n, i, s, r) {
    switch (n) {
      case "style":
        Af(t, i, r);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(o(61));
          if (n = i.__html, n != null) {
            if (s.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof i == "string" ? xi(t, i) : (typeof i == "number" || typeof i == "bigint") && xi(t, "" + i);
        break;
      case "onScroll":
        i != null && ct("scroll", t);
        break;
      case "onScrollEnd":
        i != null && ct("scrollend", t);
        break;
      case "onClick":
        i != null && (t.onclick = tn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!df.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (s = n.endsWith("Capture"), e = n.slice(2, s ? n.length - 7 : void 0), r = t[re] || null, r = r != null ? r[n] : null, typeof r == "function" && t.removeEventListener(e, r, s), typeof i == "function")) {
              typeof r != "function" && r !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(e, i, s);
              break t;
            }
            n in t ? t[n] = i : i === !0 ? t.setAttribute(n, "") : zl(t, n, i);
          }
    }
  }
  function te(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ct("error", t), ct("load", t);
        var i = !1, s = !1, r;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var f = n[r];
            if (f != null)
              switch (r) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  Dt(t, e, r, f, n, null);
              }
          }
        s && Dt(t, e, "srcSet", n.srcSet, n, null), i && Dt(t, e, "src", n.src, n, null);
        return;
      case "input":
        ct("invalid", t);
        var y = r = f = s = null, T = null, x = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var V = n[i];
            if (V != null)
              switch (i) {
                case "name":
                  s = V;
                  break;
                case "type":
                  f = V;
                  break;
                case "checked":
                  T = V;
                  break;
                case "defaultChecked":
                  x = V;
                  break;
                case "value":
                  r = V;
                  break;
                case "defaultValue":
                  y = V;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (V != null)
                    throw Error(o(137, e));
                  break;
                default:
                  Dt(t, e, i, V, n, null);
              }
          }
        vf(
          t,
          r,
          y,
          T,
          x,
          f,
          s,
          !1
        );
        return;
      case "select":
        ct("invalid", t), i = f = r = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (y = n[s], y != null))
            switch (s) {
              case "value":
                r = y;
                break;
              case "defaultValue":
                f = y;
                break;
              case "multiple":
                i = y;
              default:
                Dt(t, e, s, y, n, null);
            }
        e = r, n = f, t.multiple = !!i, e != null ? Di(t, !!i, e, !1) : n != null && Di(t, !!i, n, !0);
        return;
      case "textarea":
        ct("invalid", t), r = s = i = null;
        for (f in n)
          if (n.hasOwnProperty(f) && (y = n[f], y != null))
            switch (f) {
              case "value":
                i = y;
                break;
              case "defaultValue":
                s = y;
                break;
              case "children":
                r = y;
                break;
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(o(91));
                break;
              default:
                Dt(t, e, f, y, n, null);
            }
        Tf(t, i, s, r);
        return;
      case "option":
        for (T in n)
          n.hasOwnProperty(T) && (i = n[T], i != null) && (T === "selected" ? t.selected = i && typeof i != "function" && typeof i != "symbol" : Dt(t, e, T, i, n, null));
        return;
      case "dialog":
        ct("beforetoggle", t), ct("toggle", t), ct("cancel", t), ct("close", t);
        break;
      case "iframe":
      case "object":
        ct("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Pa.length; i++)
          ct(Pa[i], t);
        break;
      case "image":
        ct("error", t), ct("load", t);
        break;
      case "details":
        ct("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ct("error", t), ct("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (x in n)
          if (n.hasOwnProperty(x) && (i = n[x], i != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                Dt(t, e, x, i, n, null);
            }
        return;
      default:
        if (zu(e)) {
          for (V in n)
            n.hasOwnProperty(V) && (i = n[V], i !== void 0 && yr(
              t,
              e,
              V,
              i,
              n,
              void 0
            ));
          return;
        }
    }
    for (y in n)
      n.hasOwnProperty(y) && (i = n[y], i != null && Dt(t, e, y, i, n, null));
  }
  function i1(t, e, n, i) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, r = null, f = null, y = null, T = null, x = null, V = null;
        for (R in n) {
          var U = n[R];
          if (n.hasOwnProperty(R) && U != null)
            switch (R) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                T = U;
              default:
                i.hasOwnProperty(R) || Dt(t, e, R, null, i, U);
            }
        }
        for (var C in i) {
          var R = i[C];
          if (U = n[C], i.hasOwnProperty(C) && (R != null || U != null))
            switch (C) {
              case "type":
                r = R;
                break;
              case "name":
                s = R;
                break;
              case "checked":
                x = R;
                break;
              case "defaultChecked":
                V = R;
                break;
              case "value":
                f = R;
                break;
              case "defaultValue":
                y = R;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null)
                  throw Error(o(137, e));
                break;
              default:
                R !== U && Dt(
                  t,
                  e,
                  C,
                  R,
                  i,
                  U
                );
            }
        }
        xu(
          t,
          f,
          y,
          T,
          x,
          V,
          r,
          s
        );
        return;
      case "select":
        R = f = y = C = null;
        for (r in n)
          if (T = n[r], n.hasOwnProperty(r) && T != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                R = T;
              default:
                i.hasOwnProperty(r) || Dt(
                  t,
                  e,
                  r,
                  null,
                  i,
                  T
                );
            }
        for (s in i)
          if (r = i[s], T = n[s], i.hasOwnProperty(s) && (r != null || T != null))
            switch (s) {
              case "value":
                C = r;
                break;
              case "defaultValue":
                y = r;
                break;
              case "multiple":
                f = r;
              default:
                r !== T && Dt(
                  t,
                  e,
                  s,
                  r,
                  i,
                  T
                );
            }
        e = y, n = f, i = R, C != null ? Di(t, !!n, C, !1) : !!i != !!n && (e != null ? Di(t, !!n, e, !0) : Di(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        R = C = null;
        for (y in n)
          if (s = n[y], n.hasOwnProperty(y) && s != null && !i.hasOwnProperty(y))
            switch (y) {
              case "value":
                break;
              case "children":
                break;
              default:
                Dt(t, e, y, null, i, s);
            }
        for (f in i)
          if (s = i[f], r = n[f], i.hasOwnProperty(f) && (s != null || r != null))
            switch (f) {
              case "value":
                C = s;
                break;
              case "defaultValue":
                R = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(o(91));
                break;
              default:
                s !== r && Dt(t, e, f, s, i, r);
            }
        Sf(t, C, R);
        return;
      case "option":
        for (var Z in n)
          C = n[Z], n.hasOwnProperty(Z) && C != null && !i.hasOwnProperty(Z) && (Z === "selected" ? t.selected = !1 : Dt(
            t,
            e,
            Z,
            null,
            i,
            C
          ));
        for (T in i)
          C = i[T], R = n[T], i.hasOwnProperty(T) && C !== R && (C != null || R != null) && (T === "selected" ? t.selected = C && typeof C != "function" && typeof C != "symbol" : Dt(
            t,
            e,
            T,
            C,
            i,
            R
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var I in n)
          C = n[I], n.hasOwnProperty(I) && C != null && !i.hasOwnProperty(I) && Dt(t, e, I, null, i, C);
        for (x in i)
          if (C = i[x], R = n[x], i.hasOwnProperty(x) && C !== R && (C != null || R != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(o(137, e));
                break;
              default:
                Dt(
                  t,
                  e,
                  x,
                  C,
                  i,
                  R
                );
            }
        return;
      default:
        if (zu(e)) {
          for (var xt in n)
            C = n[xt], n.hasOwnProperty(xt) && C !== void 0 && !i.hasOwnProperty(xt) && yr(
              t,
              e,
              xt,
              void 0,
              i,
              C
            );
          for (V in i)
            C = i[V], R = n[V], !i.hasOwnProperty(V) || C === R || C === void 0 && R === void 0 || yr(
              t,
              e,
              V,
              C,
              i,
              R
            );
          return;
        }
    }
    for (var M in n)
      C = n[M], n.hasOwnProperty(M) && C != null && !i.hasOwnProperty(M) && Dt(t, e, M, null, i, C);
    for (U in i)
      C = i[U], R = n[U], !i.hasOwnProperty(U) || C === R || C == null && R == null || Dt(t, e, U, C, i, R);
  }
  function Em(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function a1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var s = n[i], r = s.transferSize, f = s.initiatorType, y = s.duration;
        if (r && y && Em(f)) {
          for (f = 0, y = s.responseEnd, i += 1; i < n.length; i++) {
            var T = n[i], x = T.startTime;
            if (x > y) break;
            var V = T.transferSize, U = T.initiatorType;
            V && Em(U) && (T = T.responseEnd, f += V * (T < y ? 1 : (y - x) / (T - x)));
          }
          if (--i, e += 8 * (r + f) / (s.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var pr = null, gr = null;
  function xs(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Mm(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Dm(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function vr(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Sr = null;
  function l1() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Sr ? !1 : (Sr = t, !0) : (Sr = null, !1);
  }
  var xm = typeof setTimeout == "function" ? setTimeout : void 0, s1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Cm = typeof Promise == "function" ? Promise : void 0, u1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Cm < "u" ? function(t) {
    return Cm.resolve(null).then(t).catch(o1);
  } : xm;
  function o1(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function jn(t) {
    return t === "head";
  }
  function zm(t, e) {
    var n = e, i = 0;
    do {
      var s = n.nextSibling;
      if (t.removeChild(n), s && s.nodeType === 8)
        if (n = s.data, n === "/$" || n === "/&") {
          if (i === 0) {
            t.removeChild(s), ia(e);
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          i++;
        else if (n === "html")
          Ia(t.ownerDocument.documentElement);
        else if (n === "head") {
          n = t.ownerDocument.head, Ia(n);
          for (var r = n.firstChild; r; ) {
            var f = r.nextSibling, y = r.nodeName;
            r[ga] || y === "SCRIPT" || y === "STYLE" || y === "LINK" && r.rel.toLowerCase() === "stylesheet" || n.removeChild(r), r = f;
          }
        } else
          n === "body" && Ia(t.ownerDocument.body);
      n = s;
    } while (n);
    ia(e);
  }
  function Rm(t, e) {
    var n = t;
    t = 0;
    do {
      var i = n.nextSibling;
      if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
      n = i;
    } while (n);
  }
  function Tr(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Tr(n), Mu(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function r1(t, e, n, i) {
    for (; t.nodeType === 1; ) {
      var s = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (i) {
        if (!t[ga])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (r = t.getAttribute("rel"), r === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (r !== s.rel || t.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || t.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || t.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (r = t.getAttribute("src"), (r !== (s.src == null ? null : s.src) || t.getAttribute("type") !== (s.type == null ? null : s.type) || t.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && r && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var r = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && t.getAttribute("name") === r)
          return t;
      } else return t;
      if (t = Ne(t.nextSibling), t === null) break;
    }
    return null;
  }
  function c1(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Ne(t.nextSibling), t === null)) return null;
    return t;
  }
  function Om(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ne(t.nextSibling), t === null)) return null;
    return t;
  }
  function br(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Ar(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function f1(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading")
      e();
    else {
      var i = function() {
        e(), n.removeEventListener("DOMContentLoaded", i);
      };
      n.addEventListener("DOMContentLoaded", i), t._reactRetry = i;
    }
  }
  function Ne(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Er = null;
  function Vm(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return Ne(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function _m(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else n !== "/$" && n !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Bm(t, e, n) {
    switch (e = xs(n), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(o(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(o(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function Ia(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Mu(t);
  }
  var Le = /* @__PURE__ */ new Map(), Um = /* @__PURE__ */ new Set();
  function Cs(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var gn = q.d;
  q.d = {
    f: h1,
    r: d1,
    D: m1,
    C: y1,
    L: p1,
    m: g1,
    X: S1,
    S: v1,
    M: T1
  };
  function h1() {
    var t = gn.f(), e = vs();
    return t || e;
  }
  function d1(t) {
    var e = Ai(t);
    e !== null && e.tag === 5 && e.type === "form" ? Ph(e) : gn.r(t);
  }
  var ta = typeof document > "u" ? null : document;
  function Nm(t, e, n) {
    var i = ta;
    if (i && typeof e == "string" && e) {
      var s = ze(e);
      s = 'link[rel="' + t + '"][href="' + s + '"]', typeof n == "string" && (s += '[crossorigin="' + n + '"]'), Um.has(s) || (Um.add(s), t = { rel: t, crossOrigin: n, href: e }, i.querySelector(s) === null && (e = i.createElement("link"), te(e, "link", t), kt(e), i.head.appendChild(e)));
    }
  }
  function m1(t) {
    gn.D(t), Nm("dns-prefetch", t, null);
  }
  function y1(t, e) {
    gn.C(t, e), Nm("preconnect", t, e);
  }
  function p1(t, e, n) {
    gn.L(t, e, n);
    var i = ta;
    if (i && t && e) {
      var s = 'link[rel="preload"][as="' + ze(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (s += '[imagesrcset="' + ze(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (s += '[imagesizes="' + ze(
        n.imageSizes
      ) + '"]')) : s += '[href="' + ze(t) + '"]';
      var r = s;
      switch (e) {
        case "style":
          r = ea(t);
          break;
        case "script":
          r = na(t);
      }
      Le.has(r) || (t = S(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), Le.set(r, t), i.querySelector(s) !== null || e === "style" && i.querySelector(tl(r)) || e === "script" && i.querySelector(el(r)) || (e = i.createElement("link"), te(e, "link", t), kt(e), i.head.appendChild(e)));
    }
  }
  function g1(t, e) {
    gn.m(t, e);
    var n = ta;
    if (n && t) {
      var i = e && typeof e.as == "string" ? e.as : "script", s = 'link[rel="modulepreload"][as="' + ze(i) + '"][href="' + ze(t) + '"]', r = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = na(t);
      }
      if (!Le.has(r) && (t = S({ rel: "modulepreload", href: t }, e), Le.set(r, t), n.querySelector(s) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(el(r)))
              return;
        }
        i = n.createElement("link"), te(i, "link", t), kt(i), n.head.appendChild(i);
      }
    }
  }
  function v1(t, e, n) {
    gn.S(t, e, n);
    var i = ta;
    if (i && t) {
      var s = Ei(i).hoistableStyles, r = ea(t);
      e = e || "default";
      var f = s.get(r);
      if (!f) {
        var y = { loading: 0, preload: null };
        if (f = i.querySelector(
          tl(r)
        ))
          y.loading = 5;
        else {
          t = S(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = Le.get(r)) && Mr(t, n);
          var T = f = i.createElement("link");
          kt(T), te(T, "link", t), T._p = new Promise(function(x, V) {
            T.onload = x, T.onerror = V;
          }), T.addEventListener("load", function() {
            y.loading |= 1;
          }), T.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, zs(f, e, i);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: y
        }, s.set(r, f);
      }
    }
  }
  function S1(t, e) {
    gn.X(t, e);
    var n = ta;
    if (n && t) {
      var i = Ei(n).hoistableScripts, s = na(t), r = i.get(s);
      r || (r = n.querySelector(el(s)), r || (t = S({ src: t, async: !0 }, e), (e = Le.get(s)) && Dr(t, e), r = n.createElement("script"), kt(r), te(r, "link", t), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, i.set(s, r));
    }
  }
  function T1(t, e) {
    gn.M(t, e);
    var n = ta;
    if (n && t) {
      var i = Ei(n).hoistableScripts, s = na(t), r = i.get(s);
      r || (r = n.querySelector(el(s)), r || (t = S({ src: t, async: !0, type: "module" }, e), (e = Le.get(s)) && Dr(t, e), r = n.createElement("script"), kt(r), te(r, "link", t), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, i.set(s, r));
    }
  }
  function Lm(t, e, n, i) {
    var s = (s = ot.current) ? Cs(s) : null;
    if (!s) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (e = ea(n.href), n = Ei(
          s
        ).hoistableStyles, i = n.get(e), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = ea(n.href);
          var r = Ei(
            s
          ).hoistableStyles, f = r.get(t);
          if (f || (s = s.ownerDocument || s, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(t, f), (r = s.querySelector(
            tl(t)
          )) && !r._p && (f.instance = r, f.state.loading = 5), Le.has(t) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Le.set(t, n), r || b1(
            s,
            t,
            n,
            f.state
          ))), e && i === null)
            throw Error(o(528, ""));
          return f;
        }
        if (e && i !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = na(n), n = Ei(
          s
        ).hoistableScripts, i = n.get(e), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, t));
    }
  }
  function ea(t) {
    return 'href="' + ze(t) + '"';
  }
  function tl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Hm(t) {
    return S({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function b1(t, e, n, i) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? i.loading = 1 : (e = t.createElement("link"), i.preload = e, e.addEventListener("load", function() {
      return i.loading |= 1;
    }), e.addEventListener("error", function() {
      return i.loading |= 2;
    }), te(e, "link", n), kt(e), t.head.appendChild(e));
  }
  function na(t) {
    return '[src="' + ze(t) + '"]';
  }
  function el(t) {
    return "script[async]" + t;
  }
  function wm(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var i = t.querySelector(
            'style[data-href~="' + ze(n.href) + '"]'
          );
          if (i)
            return e.instance = i, kt(i), i;
          var s = S({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (t.ownerDocument || t).createElement(
            "style"
          ), kt(i), te(i, "style", s), zs(i, n.precedence, t), e.instance = i;
        case "stylesheet":
          s = ea(n.href);
          var r = t.querySelector(
            tl(s)
          );
          if (r)
            return e.state.loading |= 4, e.instance = r, kt(r), r;
          i = Hm(n), (s = Le.get(s)) && Mr(i, s), r = (t.ownerDocument || t).createElement("link"), kt(r);
          var f = r;
          return f._p = new Promise(function(y, T) {
            f.onload = y, f.onerror = T;
          }), te(r, "link", i), e.state.loading |= 4, zs(r, n.precedence, t), e.instance = r;
        case "script":
          return r = na(n.src), (s = t.querySelector(
            el(r)
          )) ? (e.instance = s, kt(s), s) : (i = n, (s = Le.get(r)) && (i = S({}, n), Dr(i, s)), t = t.ownerDocument || t, s = t.createElement("script"), kt(s), te(s, "link", i), t.head.appendChild(s), e.instance = s);
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (i = e.instance, e.state.loading |= 4, zs(i, n.precedence, t));
    return e.instance;
  }
  function zs(t, e, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = i.length ? i[i.length - 1] : null, r = s, f = 0; f < i.length; f++) {
      var y = i[f];
      if (y.dataset.precedence === e) r = y;
      else if (r !== s) break;
    }
    r ? r.parentNode.insertBefore(t, r.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function Mr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Dr(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Rs = null;
  function jm(t, e, n) {
    if (Rs === null) {
      var i = /* @__PURE__ */ new Map(), s = Rs = /* @__PURE__ */ new Map();
      s.set(n, i);
    } else
      s = Rs, i = s.get(n), i || (i = /* @__PURE__ */ new Map(), s.set(n, i));
    if (i.has(t)) return i;
    for (i.set(t, null), n = n.getElementsByTagName(t), s = 0; s < n.length; s++) {
      var r = n[s];
      if (!(r[ga] || r[Wt] || t === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = r.getAttribute(e) || "";
        f = t + f;
        var y = i.get(f);
        y ? y.push(r) : i.set(f, [r]);
      }
    }
    return i;
  }
  function Ym(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function A1(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        return e.rel === "stylesheet" ? (t = e.disabled, typeof e.precedence == "string" && t == null) : !0;
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function qm(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function E1(t, e, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = ea(i.href), r = e.querySelector(
          tl(s)
        );
        if (r) {
          e = r._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Os.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = r, kt(r);
          return;
        }
        r = e.ownerDocument || e, i = Hm(i), (s = Le.get(s)) && Mr(i, s), r = r.createElement("link"), kt(r);
        var f = r;
        f._p = new Promise(function(y, T) {
          f.onload = y, f.onerror = T;
        }), te(r, "link", i), n.instance = r;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = Os.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var xr = 0;
  function M1(t, e) {
    return t.stylesheets && t.count === 0 && _s(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (t.stylesheets && _s(t, t.stylesheets), t.unsuspend) {
          var r = t.unsuspend;
          t.unsuspend = null, r();
        }
      }, 6e4 + e);
      0 < t.imgBytes && xr === 0 && (xr = 62500 * a1());
      var s = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && _s(t, t.stylesheets), t.unsuspend)) {
            var r = t.unsuspend;
            t.unsuspend = null, r();
          }
        },
        (t.imgBytes > xr ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(i), clearTimeout(s);
      };
    } : null;
  }
  function Os() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) _s(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Vs = null;
  function _s(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Vs = /* @__PURE__ */ new Map(), e.forEach(D1, t), Vs = null, Os.call(t));
  }
  function D1(t, e) {
    if (!(e.state.loading & 4)) {
      var n = Vs.get(t);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Vs.set(t, n);
        for (var s = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < s.length; r++) {
          var f = s[r];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (n.set(f.dataset.precedence, f), i = f);
        }
        i && n.set(null, i);
      }
      s = e.instance, f = s.getAttribute("data-precedence"), r = n.get(f) || i, r === i && n.set(null, s), n.set(f, s), this.count++, i = Os.bind(this), s.addEventListener("load", i), s.addEventListener("error", i), r ? r.parentNode.insertBefore(s, r.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(s, t.firstChild)), e.state.loading |= 4;
    }
  }
  var nl = {
    $$typeof: j,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function x1(t, e, n, i, s, r, f, y, T) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Tu(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Tu(0), this.hiddenUpdates = Tu(null), this.identifierPrefix = i, this.onUncaughtError = s, this.onCaughtError = r, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = T, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Gm(t, e, n, i, s, r, f, y, T, x, V, U) {
    return t = new x1(
      t,
      e,
      n,
      f,
      T,
      x,
      V,
      U,
      y
    ), e = 1, r === !0 && (e |= 24), r = Te(3, null, null, e), t.current = r, r.stateNode = t, e = ao(), e.refCount++, t.pooledCache = e, e.refCount++, r.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: e
    }, oo(r), t;
  }
  function Xm(t) {
    return t ? (t = Bi, t) : Bi;
  }
  function Qm(t, e, n, i, s, r) {
    s = Xm(s), i.context === null ? i.context = s : i.pendingContext = s, i = zn(e), i.payload = { element: n }, r = r === void 0 ? null : r, r !== null && (i.callback = r), n = Rn(t, i, e), n !== null && (ye(n, t, e), Ua(n, t, e));
  }
  function Zm(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Cr(t, e) {
    Zm(t, e), (t = t.alternate) && Zm(t, e);
  }
  function Km(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = ei(t, 67108864);
      e !== null && ye(e, t, 67108864), Cr(t, 67108864);
    }
  }
  function Jm(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = De();
      e = bu(e);
      var n = ei(t, e);
      n !== null && ye(n, t, e), Cr(t, e);
    }
  }
  var Bs = !0;
  function C1(t, e, n, i) {
    var s = O.T;
    O.T = null;
    var r = q.p;
    try {
      q.p = 2, zr(t, e, n, i);
    } finally {
      q.p = r, O.T = s;
    }
  }
  function z1(t, e, n, i) {
    var s = O.T;
    O.T = null;
    var r = q.p;
    try {
      q.p = 8, zr(t, e, n, i);
    } finally {
      q.p = r, O.T = s;
    }
  }
  function zr(t, e, n, i) {
    if (Bs) {
      var s = Rr(i);
      if (s === null)
        mr(
          t,
          e,
          i,
          Us,
          n
        ), Fm(t, i);
      else if (O1(
        s,
        t,
        e,
        n,
        i
      ))
        i.stopPropagation();
      else if (Fm(t, i), e & 4 && -1 < R1.indexOf(t)) {
        for (; s !== null; ) {
          var r = Ai(s);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var f = Wn(r.pendingLanes);
                  if (f !== 0) {
                    var y = r;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; f; ) {
                      var T = 1 << 31 - ve(f);
                      y.entanglements[1] |= T, f &= ~T;
                    }
                    ke(r), (vt & 6) === 0 && (ps = pe() + 500, Wa(0));
                  }
                }
                break;
              case 31:
              case 13:
                y = ei(r, 2), y !== null && ye(y, r, 2), vs(), Cr(r, 2);
            }
          if (r = Rr(i), r === null && mr(
            t,
            e,
            i,
            Us,
            n
          ), r === s) break;
          s = r;
        }
        s !== null && i.stopPropagation();
      } else
        mr(
          t,
          e,
          i,
          null,
          n
        );
    }
  }
  function Rr(t) {
    return t = Ou(t), Or(t);
  }
  var Us = null;
  function Or(t) {
    if (Us = null, t = bi(t), t !== null) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (t = h(e), t !== null) return t;
          t = null;
        } else if (n === 31) {
          if (t = p(e), t !== null) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return Us = t, null;
  }
  function km(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (m0()) {
          case ef:
            return 2;
          case nf:
            return 8;
          case El:
          case y0:
            return 32;
          case af:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Vr = !1, Yn = null, qn = null, Gn = null, il = /* @__PURE__ */ new Map(), al = /* @__PURE__ */ new Map(), Xn = [], R1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Fm(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Yn = null;
        break;
      case "dragenter":
      case "dragleave":
        qn = null;
        break;
      case "mouseover":
      case "mouseout":
        Gn = null;
        break;
      case "pointerover":
      case "pointerout":
        il.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        al.delete(e.pointerId);
    }
  }
  function ll(t, e, n, i, s, r) {
    return t === null || t.nativeEvent !== r ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: r,
      targetContainers: [s]
    }, e !== null && (e = Ai(e), e !== null && Km(e)), t) : (t.eventSystemFlags |= i, e = t.targetContainers, s !== null && e.indexOf(s) === -1 && e.push(s), t);
  }
  function O1(t, e, n, i, s) {
    switch (e) {
      case "focusin":
        return Yn = ll(
          Yn,
          t,
          e,
          n,
          i,
          s
        ), !0;
      case "dragenter":
        return qn = ll(
          qn,
          t,
          e,
          n,
          i,
          s
        ), !0;
      case "mouseover":
        return Gn = ll(
          Gn,
          t,
          e,
          n,
          i,
          s
        ), !0;
      case "pointerover":
        var r = s.pointerId;
        return il.set(
          r,
          ll(
            il.get(r) || null,
            t,
            e,
            n,
            i,
            s
          )
        ), !0;
      case "gotpointercapture":
        return r = s.pointerId, al.set(
          r,
          ll(
            al.get(r) || null,
            t,
            e,
            n,
            i,
            s
          )
        ), !0;
    }
    return !1;
  }
  function Wm(t) {
    var e = bi(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, cf(t.priority, function() {
              Jm(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = p(n), e !== null) {
            t.blockedOn = e, cf(t.priority, function() {
              Jm(n);
            });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ns(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = Rr(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        Ru = i, n.target.dispatchEvent(i), Ru = null;
      } else
        return e = Ai(n), e !== null && Km(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function Pm(t, e, n) {
    Ns(t) && n.delete(e);
  }
  function V1() {
    Vr = !1, Yn !== null && Ns(Yn) && (Yn = null), qn !== null && Ns(qn) && (qn = null), Gn !== null && Ns(Gn) && (Gn = null), il.forEach(Pm), al.forEach(Pm);
  }
  function Ls(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Vr || (Vr = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      V1
    )));
  }
  var Hs = null;
  function $m(t) {
    Hs !== t && (Hs = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Hs === t && (Hs = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], i = t[e + 1], s = t[e + 2];
          if (typeof i != "function") {
            if (Or(i || n) === null)
              continue;
            break;
          }
          var r = Ai(n);
          r !== null && (t.splice(e, 3), e -= 3, Ro(
            r,
            {
              pending: !0,
              data: s,
              method: n.method,
              action: i
            },
            i,
            s
          ));
        }
      }
    ));
  }
  function ia(t) {
    function e(T) {
      return Ls(T, t);
    }
    Yn !== null && Ls(Yn, t), qn !== null && Ls(qn, t), Gn !== null && Ls(Gn, t), il.forEach(e), al.forEach(e);
    for (var n = 0; n < Xn.length; n++) {
      var i = Xn[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
    for (; 0 < Xn.length && (n = Xn[0], n.blockedOn === null); )
      Wm(n), n.blockedOn === null && Xn.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var s = n[i], r = n[i + 1], f = s[re] || null;
        if (typeof r == "function")
          f || $m(n);
        else if (f) {
          var y = null;
          if (r && r.hasAttribute("formAction")) {
            if (s = r, f = r[re] || null)
              y = f.formAction;
            else if (Or(s) !== null) continue;
          } else y = f.action;
          typeof y == "function" ? n[i + 1] = y : (n.splice(i, 3), i -= 3), $m(n);
        }
      }
  }
  function Im() {
    function t(r) {
      r.canIntercept && r.info === "react-transition" && r.intercept({
        handler: function() {
          return new Promise(function(f) {
            return s = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      s !== null && (s(), s = null), i || setTimeout(n, 20);
    }
    function n() {
      if (!i && !navigation.transition) {
        var r = navigation.currentEntry;
        r && r.url != null && navigation.navigate(r.url, {
          state: r.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, s = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        i = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), s !== null && (s(), s = null);
      };
    }
  }
  function _r(t) {
    this._internalRoot = t;
  }
  ws.prototype.render = _r.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(o(409));
    var n = e.current, i = De();
    Qm(n, i, t, e, null, null);
  }, ws.prototype.unmount = _r.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Qm(t.current, 2, null, t, null, null), vs(), e[Ti] = null;
    }
  };
  function ws(t) {
    this._internalRoot = t;
  }
  ws.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = rf();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Xn.length && e !== 0 && e < Xn[n].priority; n++) ;
      Xn.splice(n, 0, t), n === 0 && Wm(t);
    }
  };
  var ty = l.version;
  if (ty !== "19.2.8")
    throw Error(
      o(
        527,
        ty,
        "19.2.8"
      )
    );
  q.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(o(188)) : (t = Object.keys(t).join(","), Error(o(268, t)));
    return t = m(e), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var _1 = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var js = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!js.isDisabled && js.supportsFiber)
      try {
        ma = js.inject(
          _1
        ), ge = js;
      } catch {
      }
  }
  return ul.createRoot = function(t, e) {
    if (!c(t)) throw Error(o(299));
    var n = !1, i = "", s = ud, r = od, f = rd;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onUncaughtError !== void 0 && (s = e.onUncaughtError), e.onCaughtError !== void 0 && (r = e.onCaughtError), e.onRecoverableError !== void 0 && (f = e.onRecoverableError)), e = Gm(
      t,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      s,
      r,
      f,
      Im
    ), t[Ti] = e.current, dr(t), new _r(e);
  }, ul.hydrateRoot = function(t, e, n) {
    if (!c(t)) throw Error(o(299));
    var i = !1, s = "", r = ud, f = od, y = rd, T = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (r = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.formState !== void 0 && (T = n.formState)), e = Gm(
      t,
      1,
      !0,
      e,
      n ?? null,
      i,
      s,
      T,
      r,
      f,
      y,
      Im
    ), e.context = Xm(null), n = e.current, i = De(), i = bu(i), s = zn(i), s.callback = null, Rn(n, s, i), n = i, e.current.lanes = n, pa(e, n), ke(e), t[Ti] = e.current, dr(t), new ws(e);
  }, ul.version = "19.2.8", ul;
}
var cy;
function G1() {
  if (cy) return Nr.exports;
  cy = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), Nr.exports = q1(), Nr.exports;
}
var X1 = G1();
const xp = P.createContext({});
function Q1(a) {
  const l = P.useRef(null);
  return l.current === null && (l.current = a()), l.current;
}
const Z1 = typeof window < "u", K1 = Z1 ? P.useLayoutEffect : P.useEffect, xc = /* @__PURE__ */ P.createContext(null);
function Cc(a, l) {
  a.indexOf(l) === -1 && a.push(l);
}
function $s(a, l) {
  const u = a.indexOf(l);
  u > -1 && a.splice(u, 1);
}
const $e = (a, l, u) => u > l ? l : u < a ? a : u;
let ru = () => {
};
const Kn = {}, Cp = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), zp = (a) => typeof a == "object" && a !== null, Rp = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function Op(a) {
  let l;
  return () => (l === void 0 && (l = a()), l);
}
const we = /* @__NO_SIDE_EFFECTS__ */ (a) => a, vl = (...a) => a.reduce((l, u) => (o) => u(l(o))), ml = /* @__NO_SIDE_EFFECTS__ */ (a, l, u) => {
  const o = l - a;
  return o ? (u - a) / o : 1;
};
class zc {
  constructor() {
    this.subscriptions = [];
  }
  add(l) {
    return Cc(this.subscriptions, l), () => $s(this.subscriptions, l);
  }
  notify(l, u, o) {
    const c = this.subscriptions.length;
    if (c)
      if (c === 1)
        this.subscriptions[0](l, u, o);
      else
        for (let d = 0; d < c; d++) {
          const h = this.subscriptions[d];
          h && h(l, u, o);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const xe = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, He = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, Vp = /* @__NO_SIDE_EFFECTS__ */ (a, l) => l ? a * (1e3 / l) : 0, _p = (a, l, u) => (((1 - 3 * u + 3 * l) * a + (3 * u - 6 * l)) * a + 3 * l) * a, J1 = 1e-7, k1 = 12;
function F1(a, l, u, o, c) {
  let d, h, p = 0;
  do
    h = l + (u - l) / 2, d = _p(h, o, c) - a, d > 0 ? u = h : l = h;
  while (Math.abs(d) > J1 && ++p < k1);
  return h;
}
// @__NO_SIDE_EFFECTS__
function Sl(a, l, u, o) {
  if (a === l && u === o)
    return we;
  const c = (d) => F1(d, 0, 1, a, u);
  return (d) => d === 0 || d === 1 ? d : _p(c(d), l, o);
}
const Bp = /* @__NO_SIDE_EFFECTS__ */ (a) => (l) => l <= 0.5 ? a(2 * l) / 2 : (2 - a(2 * (1 - l))) / 2, Up = /* @__NO_SIDE_EFFECTS__ */ (a) => (l) => 1 - a(1 - l), Np = /* @__PURE__ */ Sl(0.33, 1.53, 0.69, 0.99), Rc = /* @__PURE__ */ Up(Np), Lp = /* @__PURE__ */ Bp(Rc), Hp = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * Rc(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), Oc = (a) => 1 - Math.sin(Math.acos(a)), wp = /* @__PURE__ */ Up(Oc), jp = /* @__PURE__ */ Bp(Oc), W1 = /* @__PURE__ */ Sl(0.42, 0, 1, 1), P1 = /* @__PURE__ */ Sl(0, 0, 0.58, 1), Yp = /* @__PURE__ */ Sl(0.42, 0, 0.58, 1), $1 = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", qp = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", I1 = {
  linear: we,
  easeIn: W1,
  easeInOut: Yp,
  easeOut: P1,
  circIn: Oc,
  circInOut: jp,
  circOut: wp,
  backIn: Rc,
  backInOut: Lp,
  backOut: Np,
  anticipate: Hp
}, tS = (a) => typeof a == "string", fy = (a) => {
  if (/* @__PURE__ */ qp(a)) {
    ru(a.length === 4);
    const [l, u, o, c] = a;
    return /* @__PURE__ */ Sl(l, u, o, c);
  } else if (tS(a))
    return I1[a];
  return a;
}, Ys = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function eS(a) {
  let l = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), o = !1, c = !1;
  const d = /* @__PURE__ */ new WeakSet();
  let h = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function p(m) {
    d.has(m) && (g.schedule(m), a()), m(h);
  }
  const g = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (m, v = !1, S = !1) => {
      const B = S && o ? l : u;
      return v && d.add(m), B.add(m), m;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (m) => {
      u.delete(m), d.delete(m);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (m) => {
      if (h = m, o) {
        c = !0;
        return;
      }
      o = !0;
      const v = l;
      l = u, u = v, l.forEach(p), l.clear(), o = !1, c && (c = !1, g.process(m));
    }
  };
  return g;
}
const nS = 40;
function Gp(a, l) {
  let u = !1, o = !0;
  const c = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, d = () => u = !0, h = Ys.reduce((j, X) => (j[X] = eS(d), j), {}), { setup: p, read: g, resolveKeyframes: m, preUpdate: v, update: S, preRender: E, render: B, postRender: z } = h, H = () => {
    const j = Kn.useManualTiming, X = j ? c.timestamp : performance.now();
    u = !1, j || (c.delta = o ? 1e3 / 60 : Math.max(Math.min(X - c.timestamp, nS), 1)), c.timestamp = X, c.isProcessing = !0, p.process(c), g.process(c), m.process(c), v.process(c), S.process(c), E.process(c), B.process(c), z.process(c), c.isProcessing = !1, u && l && (o = !1, a(H));
  }, w = () => {
    u = !0, o = !0, c.isProcessing || a(H);
  };
  return { schedule: Ys.reduce((j, X) => {
    const et = h[X];
    return j[X] = (ut, K = !1, W = !1) => (u || w(), et.schedule(ut, K, W)), j;
  }, {}), cancel: (j) => {
    for (let X = 0; X < Ys.length; X++)
      h[Ys[X]].cancel(j);
  }, state: c, steps: h };
}
const { schedule: Rt, cancel: Jn, state: ee, steps: jr } = /* @__PURE__ */ Gp(typeof requestAnimationFrame < "u" ? requestAnimationFrame : we, !0);
let Qs;
function iS() {
  Qs = void 0;
}
const ue = {
  now: () => (Qs === void 0 && ue.set(ee.isProcessing || Kn.useManualTiming ? ee.timestamp : performance.now()), Qs),
  set: (a) => {
    Qs = a, queueMicrotask(iS);
  }
}, Xp = (a) => (l) => typeof l == "string" && l.startsWith(a), Qp = /* @__PURE__ */ Xp("--"), aS = /* @__PURE__ */ Xp("var(--"), Vc = (a) => aS(a) ? lS.test(a.split("/*")[0].trim()) : !1, lS = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function hy(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const ca = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, yl = {
  ...ca,
  transform: (a) => $e(0, 1, a)
}, qs = {
  ...ca,
  default: 1
}, cl = (a) => Math.round(a * 1e5) / 1e5, _c = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function sS(a) {
  return a == null;
}
const uS = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Bc = (a, l) => (u) => !!(typeof u == "string" && uS.test(u) && u.startsWith(a) || l && !sS(u) && Object.prototype.hasOwnProperty.call(u, l)), Zp = (a, l, u) => (o) => {
  if (typeof o != "string")
    return o;
  const [c, d, h, p] = o.match(_c);
  return {
    [a]: parseFloat(c),
    [l]: parseFloat(d),
    [u]: parseFloat(h),
    alpha: p !== void 0 ? parseFloat(p) : 1
  };
}, oS = (a) => $e(0, 255, a), Yr = {
  ...ca,
  transform: (a) => Math.round(oS(a))
}, pi = {
  test: /* @__PURE__ */ Bc("rgb", "red"),
  parse: /* @__PURE__ */ Zp("red", "green", "blue"),
  transform: ({ red: a, green: l, blue: u, alpha: o = 1 }) => "rgba(" + Yr.transform(a) + ", " + Yr.transform(l) + ", " + Yr.transform(u) + ", " + cl(yl.transform(o)) + ")"
};
function rS(a) {
  let l = "", u = "", o = "", c = "";
  return a.length > 5 ? (l = a.substring(1, 3), u = a.substring(3, 5), o = a.substring(5, 7), c = a.substring(7, 9)) : (l = a.substring(1, 2), u = a.substring(2, 3), o = a.substring(3, 4), c = a.substring(4, 5), l += l, u += u, o += o, c += c), {
    red: parseInt(l, 16),
    green: parseInt(u, 16),
    blue: parseInt(o, 16),
    alpha: c ? parseInt(c, 16) / 255 : 1
  };
}
const ec = {
  test: /* @__PURE__ */ Bc("#"),
  parse: rS,
  transform: pi.transform
}, Tl = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (l) => typeof l == "string" && l.endsWith(a) && l.split(" ").length === 1,
  parse: parseFloat,
  transform: (l) => `${l}${a}`
}), vn = /* @__PURE__ */ Tl("deg"), Pe = /* @__PURE__ */ Tl("%"), J = /* @__PURE__ */ Tl("px"), cS = /* @__PURE__ */ Tl("vh"), fS = /* @__PURE__ */ Tl("vw"), dy = {
  ...Pe,
  parse: (a) => Pe.parse(a) / 100,
  transform: (a) => Pe.transform(a * 100)
}, la = {
  test: /* @__PURE__ */ Bc("hsl", "hue"),
  parse: /* @__PURE__ */ Zp("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: l, lightness: u, alpha: o = 1 }) => "hsla(" + Math.round(a) + ", " + Pe.transform(cl(l)) + ", " + Pe.transform(cl(u)) + ", " + cl(yl.transform(o)) + ")"
}, Zt = {
  test: (a) => pi.test(a) || ec.test(a) || la.test(a),
  parse: (a) => pi.test(a) ? pi.parse(a) : la.test(a) ? la.parse(a) : ec.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? pi.transform(a) : la.transform(a),
  getAnimatableNone: (a) => {
    const l = Zt.parse(a);
    return l.alpha = 0, Zt.transform(l);
  }
}, hS = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function dS(a) {
  return isNaN(a) && typeof a == "string" && (a.match(_c)?.length || 0) + (a.match(hS)?.length || 0) > 0;
}
const Kp = "number", Jp = "color", mS = "var", yS = "var(", my = "${}", pS = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function oa(a) {
  const l = a.toString(), u = [], o = {
    color: [],
    number: [],
    var: []
  }, c = [];
  let d = 0;
  const p = l.replace(pS, (g) => (Zt.test(g) ? (o.color.push(d), c.push(Jp), u.push(Zt.parse(g))) : g.startsWith(yS) ? (o.var.push(d), c.push(mS), u.push(g)) : (o.number.push(d), c.push(Kp), u.push(parseFloat(g))), ++d, my)).split(my);
  return { values: u, split: p, indexes: o, types: c };
}
function gS(a) {
  return oa(a).values;
}
function kp({ split: a, types: l }) {
  const u = a.length;
  return (o) => {
    let c = "";
    for (let d = 0; d < u; d++)
      if (c += a[d], o[d] !== void 0) {
        const h = l[d];
        h === Kp ? c += cl(o[d]) : h === Jp ? c += Zt.transform(o[d]) : c += o[d];
      }
    return c;
  };
}
function vS(a) {
  return kp(oa(a));
}
const SS = (a) => typeof a == "number" ? 0 : Zt.test(a) ? Zt.getAnimatableNone(a) : a, TS = (a, l) => typeof a == "number" ? l?.trim().endsWith("/") ? a : 0 : SS(a);
function bS(a) {
  const l = oa(a);
  return kp(l)(l.values.map((o, c) => TS(o, l.split[c])));
}
const Qe = {
  test: dS,
  parse: gS,
  createTransformer: vS,
  getAnimatableNone: bS
};
function qr(a, l, u) {
  return u < 0 && (u += 1), u > 1 && (u -= 1), u < 1 / 6 ? a + (l - a) * 6 * u : u < 1 / 2 ? l : u < 2 / 3 ? a + (l - a) * (2 / 3 - u) * 6 : a;
}
function AS({ hue: a, saturation: l, lightness: u, alpha: o }) {
  a /= 360, l /= 100, u /= 100;
  let c = 0, d = 0, h = 0;
  if (!l)
    c = d = h = u;
  else {
    const p = u < 0.5 ? u * (1 + l) : u + l - u * l, g = 2 * u - p;
    c = qr(g, p, a + 1 / 3), d = qr(g, p, a), h = qr(g, p, a - 1 / 3);
  }
  return {
    red: Math.round(c * 255),
    green: Math.round(d * 255),
    blue: Math.round(h * 255),
    alpha: o
  };
}
function Is(a, l) {
  return (u) => u > 0 ? l : a;
}
const zt = (a, l, u) => a + (l - a) * u, Gr = (a, l, u) => {
  const o = a * a, c = u * (l * l - o) + o;
  return c < 0 ? 0 : Math.sqrt(c);
}, ES = [ec, pi, la], MS = (a) => ES.find((l) => l.test(a));
function yy(a) {
  const l = MS(a);
  if (!l)
    return !1;
  let u = l.parse(a);
  return l === la && (u = AS(u)), u;
}
const py = (a, l) => {
  const u = yy(a), o = yy(l);
  if (!u || !o)
    return Is(a, l);
  const c = { ...u };
  return (d) => (c.red = Gr(u.red, o.red, d), c.green = Gr(u.green, o.green, d), c.blue = Gr(u.blue, o.blue, d), c.alpha = zt(u.alpha, o.alpha, d), pi.transform(c));
}, nc = /* @__PURE__ */ new Set(["none", "hidden"]);
function DS(a, l) {
  return nc.has(a) ? (u) => u <= 0 ? a : l : (u) => u >= 1 ? l : a;
}
function xS(a, l) {
  return (u) => zt(a, l, u);
}
function Uc(a) {
  return typeof a == "number" ? xS : typeof a == "string" ? Vc(a) ? Is : Zt.test(a) ? py : RS : Array.isArray(a) ? Fp : typeof a == "object" ? Zt.test(a) ? py : CS : Is;
}
function Fp(a, l) {
  const u = [...a], o = u.length, c = a.map((d, h) => Uc(d)(d, l[h]));
  return (d) => {
    for (let h = 0; h < o; h++)
      u[h] = c[h](d);
    return u;
  };
}
function CS(a, l) {
  const u = { ...a, ...l }, o = {};
  for (const c in u)
    a[c] !== void 0 && l[c] !== void 0 && (o[c] = Uc(a[c])(a[c], l[c]));
  return (c) => {
    for (const d in o)
      u[d] = o[d](c);
    return u;
  };
}
function zS(a, l) {
  const u = [], o = { color: 0, var: 0, number: 0 };
  for (let c = 0; c < l.values.length; c++) {
    const d = l.types[c], h = a.indexes[d][o[d]], p = a.values[h] ?? 0;
    u[c] = p, o[d]++;
  }
  return u;
}
const RS = (a, l) => {
  const u = Qe.createTransformer(l), o = oa(a), c = oa(l);
  return o.indexes.var.length === c.indexes.var.length && o.indexes.color.length === c.indexes.color.length && o.indexes.number.length >= c.indexes.number.length ? nc.has(a) && !c.values.length || nc.has(l) && !o.values.length ? DS(a, l) : vl(Fp(zS(o, c), c.values), u) : Is(a, l);
};
function Wp(a, l, u) {
  return typeof a == "number" && typeof l == "number" && typeof u == "number" ? zt(a, l, u) : Uc(a)(a, l);
}
const OS = (a) => {
  const l = ({ timestamp: u }) => a(u);
  return {
    start: (u = !0) => Rt.update(l, u),
    stop: () => Jn(l),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => ee.isProcessing ? ee.timestamp : ue.now()
  };
}, Pp = (a, l, u = 10) => {
  let o = "";
  const c = Math.max(Math.round(l / u), 2);
  for (let d = 0; d < c; d++)
    o += Math.round(a(d / (c - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${o.substring(0, o.length - 2)})`;
}, tu = 2e4;
function Nc(a) {
  let l = 0;
  const u = 50;
  let o = a.next(l);
  for (; !o.done && l < tu; )
    l += u, o = a.next(l);
  return l >= tu ? 1 / 0 : l;
}
function VS(a, l = 100, u) {
  const o = u({ ...a, keyframes: [0, l] }), c = Math.min(Nc(o), tu);
  return {
    type: "keyframes",
    ease: (d) => o.next(c * d).value / l,
    duration: /* @__PURE__ */ He(c)
  };
}
const Nt = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function ic(a, l) {
  return a * Math.sqrt(1 - l * l);
}
const _S = 12;
function BS(a, l, u) {
  let o = u;
  for (let c = 1; c < _S; c++)
    o = o - a(o) / l(o);
  return o;
}
const Xr = 1e-3;
function US({ duration: a = Nt.duration, bounce: l = Nt.bounce, velocity: u = Nt.velocity, mass: o = Nt.mass }) {
  let c, d, h = 1 - l;
  h = $e(Nt.minDamping, Nt.maxDamping, h), a = $e(Nt.minDuration, Nt.maxDuration, /* @__PURE__ */ He(a)), h < 1 ? (c = (m) => {
    const v = m * h, S = v * a, E = v - u, B = ic(m, h), z = Math.exp(-S);
    return Xr - E / B * z;
  }, d = (m) => {
    const S = m * h * a, E = S * u + u, B = Math.pow(h, 2) * Math.pow(m, 2) * a, z = Math.exp(-S), H = ic(Math.pow(m, 2), h);
    return (-c(m) + Xr > 0 ? -1 : 1) * ((E - B) * z) / H;
  }) : (c = (m) => {
    const v = Math.exp(-m * a), S = (m - u) * a + 1;
    return -Xr + v * S;
  }, d = (m) => {
    const v = Math.exp(-m * a), S = (u - m) * (a * a);
    return v * S;
  });
  const p = 5 / a, g = BS(c, d, p);
  if (a = /* @__PURE__ */ xe(a), isNaN(g))
    return {
      stiffness: Nt.stiffness,
      damping: Nt.damping,
      duration: a
    };
  {
    const m = Math.pow(g, 2) * o;
    return {
      stiffness: m,
      damping: h * 2 * Math.sqrt(o * m),
      duration: a
    };
  }
}
const NS = ["duration", "bounce"], LS = ["stiffness", "damping", "mass"];
function gy(a, l) {
  return l.some((u) => a[u] !== void 0);
}
function HS(a) {
  let l = {
    velocity: Nt.velocity,
    stiffness: Nt.stiffness,
    damping: Nt.damping,
    mass: Nt.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!gy(a, LS) && gy(a, NS))
    if (l.velocity = 0, a.visualDuration) {
      const u = a.visualDuration, o = 2 * Math.PI / (u * 1.2), c = o * o, d = 2 * $e(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(c);
      l = {
        ...l,
        mass: Nt.mass,
        stiffness: c,
        damping: d
      };
    } else {
      const u = US({ ...a, velocity: 0 });
      l = {
        ...l,
        ...u,
        mass: Nt.mass
      }, l.isResolvedFromDuration = !0;
    }
  return l;
}
function eu(a = Nt.visualDuration, l = Nt.bounce) {
  const u = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: l
  } : a;
  let { restSpeed: o, restDelta: c } = u;
  const d = u.keyframes[0], h = u.keyframes[u.keyframes.length - 1], p = { done: !1, value: d }, { stiffness: g, damping: m, mass: v, duration: S, velocity: E, isResolvedFromDuration: B } = HS({
    ...u,
    velocity: -/* @__PURE__ */ He(u.velocity || 0)
  }), z = E || 0, H = m / (2 * Math.sqrt(g * v)), w = h - d, L = /* @__PURE__ */ He(Math.sqrt(g / v)), Y = Math.abs(w) < 5;
  o || (o = Y ? Nt.restSpeed.granular : Nt.restSpeed.default), c || (c = Y ? Nt.restDelta.granular : Nt.restDelta.default);
  let j, X, et, ut, K, W;
  if (H < 1)
    et = ic(L, H), ut = (z + H * L * w) / et, j = (tt) => {
      const gt = Math.exp(-H * L * tt);
      return h - gt * (ut * Math.sin(et * tt) + w * Math.cos(et * tt));
    }, K = H * L * ut + w * et, W = H * L * w - ut * et, X = (tt) => Math.exp(-H * L * tt) * (K * Math.sin(et * tt) + W * Math.cos(et * tt));
  else if (H === 1) {
    j = (gt) => h - Math.exp(-L * gt) * (w + (z + L * w) * gt);
    const tt = z + L * w;
    X = (gt) => Math.exp(-L * gt) * (L * tt * gt - z);
  } else {
    const tt = L * Math.sqrt(H * H - 1);
    j = (Yt) => {
      const Lt = Math.exp(-H * L * Yt), O = Math.min(tt * Yt, 300);
      return h - Lt * ((z + H * L * w) * Math.sinh(O) + tt * w * Math.cosh(O)) / tt;
    };
    const gt = (z + H * L * w) / tt, Tt = H * L * gt - w * tt, ae = H * L * w - gt * tt;
    X = (Yt) => {
      const Lt = Math.exp(-H * L * Yt), O = Math.min(tt * Yt, 300);
      return Lt * (Tt * Math.sinh(O) + ae * Math.cosh(O));
    };
  }
  const Et = {
    calculatedDuration: B && S || null,
    velocity: (tt) => /* @__PURE__ */ xe(X(tt)),
    next: (tt) => {
      if (!B && H < 1) {
        const Tt = Math.exp(-H * L * tt), ae = Math.sin(et * tt), Yt = Math.cos(et * tt), Lt = h - Tt * (ut * ae + w * Yt), O = /* @__PURE__ */ xe(Tt * (K * ae + W * Yt));
        return p.done = Math.abs(O) <= o && Math.abs(h - Lt) <= c, p.value = p.done ? h : Lt, p;
      }
      const gt = j(tt);
      if (B)
        p.done = tt >= S;
      else {
        const Tt = /* @__PURE__ */ xe(X(tt));
        p.done = Math.abs(Tt) <= o && Math.abs(h - gt) <= c;
      }
      return p.value = p.done ? h : gt, p;
    },
    toString: () => {
      const tt = Math.min(Nc(Et), tu), gt = Pp((Tt) => Et.next(tt * Tt).value, tt, 30);
      return tt + "ms " + gt;
    },
    toTransition: () => {
    }
  };
  return Et;
}
eu.applyToOptions = (a) => {
  const l = VS(a, 100, eu);
  return a.ease = l.ease, a.duration = /* @__PURE__ */ xe(l.duration), a.type = "keyframes", a;
};
const wS = 5;
function $p(a, l, u) {
  const o = Math.max(l - wS, 0);
  return /* @__PURE__ */ Vp(u - a(o), l - o);
}
function ac({ keyframes: a, velocity: l = 0, power: u = 0.8, timeConstant: o = 325, bounceDamping: c = 10, bounceStiffness: d = 500, modifyTarget: h, min: p, max: g, restDelta: m = 0.5, restSpeed: v }) {
  const S = a[0], E = {
    done: !1,
    value: S
  }, B = (W) => p !== void 0 && W < p || g !== void 0 && W > g, z = (W) => p === void 0 ? g : g === void 0 || Math.abs(p - W) < Math.abs(g - W) ? p : g;
  let H = u * l;
  const w = S + H, L = h === void 0 ? w : h(w);
  L !== w && (H = L - S);
  const Y = (W) => -H * Math.exp(-W / o), j = (W) => L + Y(W), X = (W) => {
    const Et = Y(W), tt = j(W);
    E.done = Math.abs(Et) <= m, E.value = E.done ? L : tt;
  };
  let et, ut;
  const K = (W) => {
    B(E.value) && (et = W, ut = eu({
      keyframes: [E.value, z(E.value)],
      velocity: $p(j, W, E.value),
      // TODO: This should be passing * 1000
      damping: c,
      stiffness: d,
      restDelta: m,
      restSpeed: v
    }));
  };
  return K(0), {
    calculatedDuration: null,
    next: (W) => {
      let Et = !1;
      return !ut && et === void 0 && (Et = !0, X(W), K(W)), et !== void 0 && W >= et ? ut.next(W - et) : (!Et && X(W), E);
    }
  };
}
function jS(a, l, u) {
  const o = [], c = u || Kn.mix || Wp, d = a.length - 1;
  for (let h = 0; h < d; h++) {
    let p = c(a[h], a[h + 1]);
    if (l) {
      const g = Array.isArray(l) ? l[h] || we : l;
      p = vl(g, p);
    }
    o.push(p);
  }
  return o;
}
function YS(a, l, { clamp: u = !0, ease: o, mixer: c } = {}) {
  const d = a.length;
  if (ru(d === l.length), d === 1)
    return () => l[0];
  if (d === 2 && l[0] === l[1])
    return () => l[1];
  const h = a[0] === a[1];
  a[0] > a[d - 1] && (a = [...a].reverse(), l = [...l].reverse());
  const p = jS(l, o, c), g = p.length, m = (v) => {
    if (h && v < a[0])
      return l[0];
    let S = 0;
    if (g > 1)
      for (; S < a.length - 2 && !(v < a[S + 1]); S++)
        ;
    const E = /* @__PURE__ */ ml(a[S], a[S + 1], v);
    return p[S](E);
  };
  return u ? (v) => m($e(a[0], a[d - 1], v)) : m;
}
function qS(a, l) {
  const u = a[a.length - 1];
  for (let o = 1; o <= l; o++) {
    const c = /* @__PURE__ */ ml(0, l, o);
    a.push(zt(u, 1, c));
  }
}
function GS(a) {
  const l = [0];
  return qS(l, a.length - 1), l;
}
function XS(a, l) {
  return a.map((u) => u * l);
}
function QS(a, l) {
  return a.map(() => l || Yp).splice(0, a.length - 1);
}
function fl({ duration: a = 300, keyframes: l, times: u, ease: o = "easeInOut" }) {
  const c = /* @__PURE__ */ $1(o) ? o.map(fy) : fy(o), d = {
    done: !1,
    value: l[0]
  }, h = XS(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    u && u.length === l.length ? u : GS(l),
    a
  ), p = YS(h, l, {
    ease: Array.isArray(c) ? c : QS(l, c)
  });
  return {
    calculatedDuration: a,
    next: (g) => (d.value = p(g), d.done = g >= a, d)
  };
}
const ZS = (a) => a !== null;
function cu(a, { repeat: l, repeatType: u = "loop" }, o, c = 1) {
  const d = a.filter(ZS), p = c < 0 || l && u !== "loop" && l % 2 === 1 ? 0 : d.length - 1;
  return !p || o === void 0 ? d[p] : o;
}
const KS = {
  decay: ac,
  inertia: ac,
  tween: fl,
  keyframes: fl,
  spring: eu
};
function Ip(a) {
  typeof a.type == "string" && (a.type = KS[a.type]);
}
class Lc {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((l) => {
      this.resolve = l;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(l, u) {
    return this.finished.then(l, u);
  }
}
const JS = (a) => a / 100;
class nu extends Lc {
  constructor(l) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: u } = this.options;
      u && u.updatedAt !== ue.now() && this.tick(ue.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = l, this.initAnimation(), this.play(), l.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: l } = this;
    Ip(l);
    const { type: u = fl, repeat: o = 0, repeatDelay: c = 0, repeatType: d, velocity: h = 0 } = l;
    let { keyframes: p } = l;
    const g = u || fl;
    g !== fl && typeof p[0] != "number" && (this.mixKeyframes = vl(JS, Wp(p[0], p[1])), p = [0, 100]);
    const m = g({ ...l, keyframes: p });
    d === "mirror" && (this.mirroredGenerator = g({
      ...l,
      keyframes: [...p].reverse(),
      velocity: -h
    })), m.calculatedDuration === null && (m.calculatedDuration = Nc(m));
    const { calculatedDuration: v } = m;
    this.calculatedDuration = v, this.resolvedDuration = v + c, this.totalDuration = this.resolvedDuration * (o + 1) - c, this.generator = m;
  }
  updateTime(l) {
    const u = Math.round(l - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = u;
  }
  tick(l, u = !1) {
    const { generator: o, totalDuration: c, mixKeyframes: d, mirroredGenerator: h, resolvedDuration: p, calculatedDuration: g } = this;
    if (this.startTime === null)
      return o.next(0);
    const { delay: m = 0, keyframes: v, repeat: S, repeatType: E, repeatDelay: B, type: z, onUpdate: H, finalKeyframe: w } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, l) : this.speed < 0 && (this.startTime = Math.min(l - c / this.speed, this.startTime)), u ? this.currentTime = l : this.updateTime(l);
    const L = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), Y = this.playbackSpeed >= 0 ? L < 0 : L > c;
    this.currentTime = Math.max(L, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
    let j = this.currentTime, X = o;
    if (S) {
      const W = Math.min(this.currentTime, c) / p;
      let Et = Math.floor(W), tt = W % 1;
      !tt && W >= 1 && (tt = 1), tt === 1 && Et--, Et = Math.min(Et, S + 1), Et % 2 && (E === "reverse" ? (tt = 1 - tt, B && (tt -= B / p)) : E === "mirror" && (X = h)), j = $e(0, 1, tt) * p;
    }
    let et;
    Y ? (this.delayState.value = v[0], et = this.delayState) : et = X.next(j), d && !Y && (et.value = d(et.value));
    let { done: ut } = et;
    !Y && g !== null && (ut = this.playbackSpeed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
    const K = this.holdTime === null && (this.state === "finished" || this.state === "running" && ut);
    return K && z !== ac && (et.value = cu(v, this.options, w, this.speed)), H && H(et.value), K && this.finish(), et;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(l, u) {
    return this.finished.then(l, u);
  }
  get duration() {
    return /* @__PURE__ */ He(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: l = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ He(l);
  }
  get time() {
    return /* @__PURE__ */ He(this.currentTime);
  }
  set time(l) {
    l = /* @__PURE__ */ xe(l), this.currentTime = l, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = l : this.driver && (this.startTime = this.driver.now() - l / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = l, this.tick(l));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const l = this.currentTime;
    if (l <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(l);
    const u = this.generator.next(l).value;
    return $p((o) => this.generator.next(o).value, l, u);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(l) {
    const u = this.playbackSpeed !== l;
    u && this.driver && this.updateTime(ue.now()), this.playbackSpeed = l, u && this.driver && (this.time = /* @__PURE__ */ He(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: l = OS, startTime: u } = this.options;
    this.driver || (this.driver = l((c) => this.tick(c))), this.options.onPlay?.();
    const o = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = o) : this.holdTime !== null ? this.startTime = o - this.holdTime : this.startTime || (this.startTime = u ?? o), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(ue.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(l) {
    return this.startTime = 0, this.tick(l, !0);
  }
  attachTimeline(l) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), l.observe(this);
  }
}
function kS(a) {
  for (let l = 1; l < a.length; l++)
    a[l] ?? (a[l] = a[l - 1]);
}
const gi = (a) => a * 180 / Math.PI, lc = (a) => {
  const l = gi(Math.atan2(a[1], a[0]));
  return sc(l);
}, FS = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: lc,
  rotateZ: lc,
  skewX: (a) => gi(Math.atan(a[1])),
  skewY: (a) => gi(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, sc = (a) => (a = a % 360, a < 0 && (a += 360), a), vy = lc, Sy = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), Ty = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), WS = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Sy,
  scaleY: Ty,
  scale: (a) => (Sy(a) + Ty(a)) / 2,
  rotateX: (a) => sc(gi(Math.atan2(a[6], a[5]))),
  rotateY: (a) => sc(gi(Math.atan2(-a[2], a[0]))),
  rotateZ: vy,
  rotate: vy,
  skewX: (a) => gi(Math.atan(a[4])),
  skewY: (a) => gi(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function uc(a) {
  return a.includes("scale") ? 1 : 0;
}
function oc(a, l) {
  if (!a || a === "none")
    return uc(l);
  const u = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let o, c;
  if (u)
    o = WS, c = u;
  else {
    const p = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    o = FS, c = p;
  }
  if (!c)
    return uc(l);
  const d = o[l], h = c[1].split(",").map($S);
  return typeof d == "function" ? d(h) : h[d];
}
const PS = (a, l) => {
  const { transform: u = "none" } = getComputedStyle(a);
  return oc(u, l);
};
function $S(a) {
  return parseFloat(a.trim());
}
const fa = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], ha = /* @__PURE__ */ new Set([...fa, "pathRotation"]), by = (a) => a === ca || a === J, IS = /* @__PURE__ */ new Set(["x", "y", "z"]), tT = fa.filter((a) => !IS.has(a));
function eT(a) {
  const l = [];
  return tT.forEach((u) => {
    const o = a.getValue(u);
    o !== void 0 && (l.push([u, o.get()]), o.set(u.startsWith("scale") ? 1 : 0));
  }), l;
}
const Zn = {
  // Dimensions
  width: ({ x: a }, { paddingLeft: l = "0", paddingRight: u = "0", boxSizing: o }) => {
    const c = a.max - a.min;
    return o === "border-box" ? c : c - parseFloat(l) - parseFloat(u);
  },
  height: ({ y: a }, { paddingTop: l = "0", paddingBottom: u = "0", boxSizing: o }) => {
    const c = a.max - a.min;
    return o === "border-box" ? c : c - parseFloat(l) - parseFloat(u);
  },
  top: (a, { top: l }) => parseFloat(l),
  left: (a, { left: l }) => parseFloat(l),
  bottom: ({ y: a }, { top: l }) => parseFloat(l) + (a.max - a.min),
  right: ({ x: a }, { left: l }) => parseFloat(l) + (a.max - a.min),
  // Transform
  x: (a, { transform: l }) => oc(l, "x"),
  y: (a, { transform: l }) => oc(l, "y")
};
Zn.translateX = Zn.x;
Zn.translateY = Zn.y;
const vi = /* @__PURE__ */ new Set();
let rc = !1, cc = !1, fc = !1;
function tg() {
  if (cc) {
    const a = Array.from(vi).filter((o) => o.needsMeasurement), l = new Set(a.map((o) => o.element)), u = /* @__PURE__ */ new Map();
    l.forEach((o) => {
      const c = eT(o);
      c.length && (u.set(o, c), o.render());
    }), a.forEach((o) => o.measureInitialState()), l.forEach((o) => {
      o.render();
      const c = u.get(o);
      c && c.forEach(([d, h]) => {
        o.getValue(d)?.set(h);
      });
    }), a.forEach((o) => o.measureEndState()), a.forEach((o) => {
      o.suspendedScrollY !== void 0 && window.scrollTo(0, o.suspendedScrollY);
    });
  }
  cc = !1, rc = !1, vi.forEach((a) => a.complete(fc)), vi.clear();
}
function eg() {
  vi.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (cc = !0);
  });
}
function nT() {
  fc = !0, eg(), tg(), fc = !1;
}
class Hc {
  constructor(l, u, o, c, d, h = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...l], this.onComplete = u, this.name = o, this.motionValue = c, this.element = d, this.isAsync = h;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (vi.add(this), rc || (rc = !0, Rt.read(eg), Rt.resolveKeyframes(tg))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: l, name: u, element: o, motionValue: c } = this;
    if (l[0] === null) {
      const d = c?.get(), h = l[l.length - 1];
      if (d !== void 0)
        l[0] = d;
      else if (o && u) {
        const p = o.readValue(u, h);
        p != null && (l[0] = p);
      }
      l[0] === void 0 && (l[0] = h), c && d === void 0 && c.set(l[0]);
    }
    kS(l);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(l = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, l), vi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (vi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const iT = (a) => a.startsWith("--");
function ng(a, l, u) {
  iT(l) ? a.style.setProperty(l, u) : a.style[l] = u;
}
const aT = {};
function ig(a, l) {
  const u = /* @__PURE__ */ Op(a);
  return () => aT[l] ?? u();
}
const lT = /* @__PURE__ */ ig(() => window.ScrollTimeline !== void 0, "scrollTimeline"), ag = /* @__PURE__ */ ig(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), rl = ([a, l, u, o]) => `cubic-bezier(${a}, ${l}, ${u}, ${o})`, Ay = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ rl([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ rl([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ rl([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ rl([0.33, 1.53, 0.69, 0.99])
};
function lg(a, l) {
  if (a)
    return typeof a == "function" ? ag() ? Pp(a, l) : "ease-out" : /* @__PURE__ */ qp(a) ? rl(a) : Array.isArray(a) ? a.map((u) => lg(u, l) || Ay.easeOut) : Ay[a];
}
function sT(a, l, u, { delay: o = 0, duration: c = 300, repeat: d = 0, repeatType: h = "loop", ease: p = "easeOut", times: g } = {}, m = void 0) {
  const v = {
    [l]: u
  };
  g && (v.offset = g);
  const S = lg(p, c);
  Array.isArray(S) && (v.easing = S);
  const E = {
    delay: o,
    duration: c,
    easing: Array.isArray(S) ? "linear" : S,
    fill: "both",
    iterations: d + 1,
    direction: h === "reverse" ? "alternate" : "normal"
  };
  return m && (E.pseudoElement = m), a.animate(v, E);
}
function sg(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function uT({ type: a, ...l }) {
  return sg(a) && ag() ? a.applyToOptions(l) : (l.duration ?? (l.duration = 300), l.ease ?? (l.ease = "easeOut"), l);
}
class ug extends Lc {
  constructor(l) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !l)
      return;
    const { element: u, name: o, keyframes: c, pseudoElement: d, allowFlatten: h = !1, finalKeyframe: p, onComplete: g } = l;
    this.isPseudoElement = !!d, this.allowFlatten = h, this.options = l, ru(typeof l.type != "string");
    const m = uT(l);
    this.animation = sT(u, o, c, m, d), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !d) {
        const v = cu(c, this.options, p, this.speed);
        this.updateMotionValue && this.updateMotionValue(v), ng(u, o, v), this.animation.cancel();
      }
      g?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: l } = this;
    l === "idle" || l === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const l = this.options?.element;
    !this.isPseudoElement && l?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const l = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ He(Number(l));
  }
  get iterationDuration() {
    const { delay: l = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ He(l);
  }
  get time() {
    return /* @__PURE__ */ He(Number(this.animation.currentTime) || 0);
  }
  set time(l) {
    const u = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ xe(l), u && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(l) {
    l < 0 && (this.finishedTime = null), this.animation.playbackRate = l;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(l) {
    this.manualStartTime = this.animation.startTime = l;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: l, rangeStart: u, rangeEnd: o, observe: c }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, l && lT() ? (this.animation.timeline = l, u && (this.animation.rangeStart = u), o && (this.animation.rangeEnd = o), we) : c(this);
  }
}
const og = {
  anticipate: Hp,
  backInOut: Lp,
  circInOut: jp
};
function oT(a) {
  return a in og;
}
function rT(a) {
  typeof a.ease == "string" && oT(a.ease) && (a.ease = og[a.ease]);
}
const Qr = 10;
class cT extends ug {
  constructor(l) {
    rT(l), Ip(l), super(l), l.startTime !== void 0 && l.autoplay !== !1 && (this.startTime = l.startTime), this.options = l;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(l) {
    const { motionValue: u, onUpdate: o, onComplete: c, element: d, ...h } = this.options;
    if (!u)
      return;
    if (l !== void 0) {
      u.set(l);
      return;
    }
    const p = new nu({
      ...h,
      autoplay: !1
    }), g = Math.max(Qr, ue.now() - this.startTime), m = $e(0, Qr, g - Qr), v = p.sample(g).value, { name: S } = this.options;
    d && S && ng(d, S, v), u.setWithVelocity(p.sample(Math.max(0, g - m)).value, v, m), p.stop();
  }
}
const Ey = (a, l) => l === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(Qe.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function fT(a) {
  const l = a[0];
  if (a.length === 1)
    return !0;
  for (let u = 0; u < a.length; u++)
    if (a[u] !== l)
      return !0;
}
function hT(a, l, u, o) {
  const c = a[0];
  if (c === null)
    return !1;
  if (l === "display" || l === "visibility")
    return !0;
  const d = a[a.length - 1], h = Ey(c, l), p = Ey(d, l);
  return !h || !p ? !1 : fT(a) || (u === "spring" || sg(u)) && o;
}
function hc(a) {
  a.duration = 0, a.type = "keyframes";
}
const rg = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), dT = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function mT(a) {
  for (let l = 0; l < a.length; l++)
    if (typeof a[l] == "string" && dT.test(a[l]))
      return !0;
  return !1;
}
const yT = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), pT = /* @__PURE__ */ Op(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function gT(a) {
  const { motionValue: l, name: u, repeatDelay: o, repeatType: c, damping: d, type: h, keyframes: p } = a, g = l?.owner?.current;
  if (!(g instanceof HTMLElement) && !(g instanceof SVGElement))
    return !1;
  const { onUpdate: m, transformTemplate: v } = l.owner.getProps();
  return pT() && u && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (rg.has(u) || yT.has(u) && mT(p)) && (u !== "transform" || !v) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !o && c !== "mirror" && d !== 0 && h !== "inertia";
}
const vT = 40;
class ST extends Lc {
  constructor({ autoplay: l = !0, delay: u = 0, type: o = "keyframes", repeat: c = 0, repeatDelay: d = 0, repeatType: h = "loop", keyframes: p, name: g, motionValue: m, element: v, ...S }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = ue.now();
    const E = {
      autoplay: l,
      delay: u,
      type: o,
      repeat: c,
      repeatDelay: d,
      repeatType: h,
      name: g,
      motionValue: m,
      element: v,
      ...S
    }, B = v?.KeyframeResolver || Hc;
    this.keyframeResolver = new B(p, (z, H, w) => this.onKeyframesResolved(z, H, E, !w), g, m, v), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(l, u, o, c) {
    this.keyframeResolver = void 0;
    const { name: d, type: h, velocity: p, delay: g, isHandoff: m, onUpdate: v } = o;
    this.resolvedAt = ue.now();
    let S = !0;
    hT(l, d, h, p) || (S = !1, (Kn.instantAnimations || !g) && v?.(cu(l, o, u)), l[0] = l[l.length - 1], hc(o), o.repeat = 0);
    const B = {
      startTime: c ? this.resolvedAt ? this.resolvedAt - this.createdAt > vT ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: u,
      ...o,
      keyframes: l
    }, z = S && !m && gT(B), H = B.motionValue?.owner?.current;
    let w;
    if (z)
      try {
        w = new cT({
          ...B,
          element: H
        });
      } catch {
        w = new nu(B);
      }
    else
      w = new nu(B);
    w.finished.then(() => {
      this.notifyFinished();
    }).catch(we), this.pendingTimeline && (this.stopTimeline = w.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = w;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(l, u) {
    return this.finished.finally(l).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), nT()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(l) {
    this.animation.time = l;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(l) {
    this.animation.speed = l;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(l) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(l) : this.pendingTimeline = l, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
function cg(a, l, u, o = 0, c = 1) {
  const d = Array.from(a).sort((m, v) => m.sortNodePosition(v)).indexOf(l), h = a.size, p = (h - 1) * o;
  return typeof u == "function" ? u(d, h) : c === 1 ? d * o : p - d * o;
}
const My = 30, TT = (a) => !isNaN(parseFloat(a));
class bT {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(l, u = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (o) => {
      const c = ue.now();
      if (this.updatedAt !== c && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(o), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const d of this.dependents)
          d.dirty();
    }, this.hasAnimated = !1, this.setCurrent(l), this.owner = u.owner;
  }
  setCurrent(l) {
    this.current = l, this.updatedAt = ue.now(), this.canTrackVelocity === null && l !== void 0 && (this.canTrackVelocity = TT(this.current));
  }
  setPrevFrameValue(l = this.current) {
    this.prevFrameValue = l, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(l) {
    return this.on("change", l);
  }
  on(l, u) {
    this.events[l] || (this.events[l] = new zc());
    const o = this.events[l].add(u);
    return l === "change" ? () => {
      o(), Rt.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : o;
  }
  clearListeners() {
    for (const l in this.events)
      this.events[l].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(l, u) {
    this.passiveEffect = l, this.stopPassiveEffect = u;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(l) {
    this.passiveEffect ? this.passiveEffect(l, this.updateAndNotify) : this.updateAndNotify(l);
  }
  setWithVelocity(l, u, o) {
    this.set(u), this.prev = void 0, this.prevFrameValue = l, this.prevUpdatedAt = this.updatedAt - o;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(l, u = !0) {
    this.updateAndNotify(l), this.prev = l, this.prevUpdatedAt = this.prevFrameValue = void 0, u && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(l) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(l);
  }
  removeDependent(l) {
    this.dependents && this.dependents.delete(l);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const l = ue.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || l - this.updatedAt > My)
      return 0;
    const u = Math.min(this.updatedAt - this.prevUpdatedAt, My);
    return /* @__PURE__ */ Vp(parseFloat(this.current) - parseFloat(this.prevFrameValue), u);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(l) {
    return this.stop(), new Promise((u) => {
      this.hasAnimated = !0, this.animation = l(u), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function ra(a, l) {
  return new bT(a, l);
}
function fg(a, l) {
  if (a?.inherit && l) {
    const { inherit: u, ...o } = a;
    return { ...l, ...o };
  }
  return a;
}
function wc(a, l) {
  const u = a?.[l] ?? a?.default ?? a;
  return u !== a ? fg(u, a) : u;
}
const AT = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, ET = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), MT = {
  type: "keyframes",
  duration: 0.8
}, DT = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, xT = (a, { keyframes: l }) => l.length > 2 ? MT : ha.has(a) ? a.startsWith("scale") ? ET(l[1]) : AT : DT, CT = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function zT(a) {
  for (const l in a)
    if (!CT.has(l))
      return !0;
  return !1;
}
const jc = (a, l, u, o = {}, c, d) => (h) => {
  const p = wc(o, a) || {}, g = p.delay || o.delay || 0;
  let { elapsed: m = 0 } = o;
  m = m - /* @__PURE__ */ xe(g);
  const v = {
    keyframes: Array.isArray(u) ? u : [null, u],
    ease: "easeOut",
    velocity: l.getVelocity(),
    ...p,
    delay: -m,
    onUpdate: (E) => {
      l.set(E), p.onUpdate && p.onUpdate(E);
    },
    onComplete: () => {
      h(), p.onComplete && p.onComplete();
    },
    name: a,
    motionValue: l,
    element: d ? void 0 : c
  };
  zT(p) || Object.assign(v, xT(a, v)), v.duration && (v.duration = /* @__PURE__ */ xe(v.duration)), v.repeatDelay && (v.repeatDelay = /* @__PURE__ */ xe(v.repeatDelay)), v.from !== void 0 && (v.keyframes[0] = v.from);
  let S = !1;
  if ((v.type === !1 || v.duration === 0 && !v.repeatDelay) && (hc(v), v.delay === 0 && (S = !0)), (Kn.instantAnimations || Kn.skipAnimations || c?.shouldSkipAnimations || p.skipAnimations) && (S = !0, hc(v), v.delay = 0), v.allowFlatten = !p.type && !p.ease, S && !d && l.get() !== void 0) {
    const E = cu(v.keyframes, p);
    if (E !== void 0) {
      Rt.update(() => {
        v.onUpdate(E), v.onComplete();
      });
      return;
    }
  }
  return p.isSync ? new nu(v) : new ST(v);
}, RT = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function OT(a) {
  const l = RT.exec(a);
  if (!l)
    return [,];
  const [, u, o, c] = l;
  return [`--${u ?? o}`, c];
}
function hg(a, l, u = 1) {
  const [o, c] = OT(a);
  if (!o)
    return;
  const d = window.getComputedStyle(l).getPropertyValue(o);
  if (d) {
    const h = d.trim();
    return Cp(h) ? parseFloat(h) : h;
  }
  return Vc(c) ? hg(c, l, u + 1) : c;
}
function Dy(a) {
  const l = [{}, {}];
  return a?.values.forEach((u, o) => {
    l[0][o] = u.get(), l[1][o] = u.getVelocity();
  }), l;
}
function Yc(a, l, u, o) {
  if (typeof l == "function") {
    const [c, d] = Dy(o);
    l = l(u !== void 0 ? u : a.custom, c, d);
  }
  if (typeof l == "string" && (l = a.variants && a.variants[l]), typeof l == "function") {
    const [c, d] = Dy(o);
    l = l(u !== void 0 ? u : a.custom, c, d);
  }
  return l;
}
function Si(a, l, u) {
  const o = a.getProps();
  return Yc(o, l, u !== void 0 ? u : o.custom, a);
}
const dg = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...fa
]), dc = (a) => Array.isArray(a);
function VT(a, l, u) {
  a.hasValue(l) ? a.getValue(l).set(u) : a.addValue(l, ra(u));
}
function _T(a) {
  return dc(a) ? a[a.length - 1] || 0 : a;
}
function BT(a, l) {
  const u = Si(a, l);
  let { transitionEnd: o = {}, transition: c = {}, ...d } = u || {};
  d = { ...d, ...o };
  for (const h in d) {
    const p = _T(d[h]);
    VT(a, h, p);
  }
}
const ne = (a) => !!(a && a.getVelocity);
function UT(a) {
  return !!(ne(a) && a.add);
}
function mc(a, l) {
  const u = a.getValue("willChange");
  if (UT(u))
    return u.add(l);
  if (!u && Kn.WillChange) {
    const o = new Kn.WillChange("auto");
    a.addValue("willChange", o), o.add(l);
  }
}
function qc(a) {
  return a.replace(/([A-Z])/g, (l) => `-${l.toLowerCase()}`);
}
const NT = "framerAppearId", mg = "data-" + qc(NT);
function yg(a) {
  return a.props[mg];
}
function LT({ protectedKeys: a, needsAnimating: l }, u) {
  const o = a.hasOwnProperty(u) && l[u] !== !0;
  return l[u] = !1, o;
}
function pg(a, l, { delay: u = 0, transitionOverride: o, type: c } = {}) {
  let { transition: d, transitionEnd: h, ...p } = l;
  const g = a.getDefaultTransition();
  d = d ? fg(d, g) : g;
  const m = d?.reduceMotion, v = d?.skipAnimations;
  o && (d = o);
  const S = [], E = c && a.animationState && a.animationState.getState()[c], B = d?.path;
  B && B.animateVisualElement(a, p, d, u, S);
  for (const z in p) {
    const H = a.getValue(z, a.latestValues[z] ?? null), w = p[z];
    if (w === void 0 || E && LT(E, z))
      continue;
    const L = {
      delay: u,
      ...wc(d || {}, z)
    };
    v && (L.skipAnimations = !0);
    const Y = H.get();
    if (Y !== void 0 && !H.isAnimating() && !Array.isArray(w) && w === Y && !L.velocity) {
      Rt.update(() => H.set(w));
      continue;
    }
    let j = !1;
    if (window.MotionHandoffAnimation) {
      const ut = yg(a);
      if (ut) {
        const K = window.MotionHandoffAnimation(ut, z, Rt);
        K !== null && (L.startTime = K, j = !0);
      }
    }
    mc(a, z);
    const X = m ?? a.shouldReduceMotion;
    H.start(jc(z, H, w, X && dg.has(z) ? { type: !1 } : L, a, j));
    const et = H.animation;
    et && S.push(et);
  }
  if (h) {
    const z = () => Rt.update(() => {
      h && BT(a, h);
    });
    S.length ? Promise.all(S).then(z) : z();
  }
  return S;
}
function yc(a, l, u = {}) {
  const o = Si(a, l, u.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: c = a.getDefaultTransition() || {} } = o || {};
  u.transitionOverride && (c = u.transitionOverride);
  const d = o ? () => Promise.all(pg(a, o, u)) : () => Promise.resolve(), h = a.variantChildren && a.variantChildren.size ? (g = 0) => {
    const { delayChildren: m = 0, staggerChildren: v, staggerDirection: S } = c;
    return HT(a, l, g, m, v, S, u);
  } : () => Promise.resolve(), { when: p } = c;
  if (p) {
    const [g, m] = p === "beforeChildren" ? [d, h] : [h, d];
    return g().then(() => m());
  } else
    return Promise.all([d(), h(u.delay)]);
}
function HT(a, l, u = 0, o = 0, c = 0, d = 1, h) {
  const p = [];
  for (const g of a.variantChildren)
    g.notify("AnimationStart", l), p.push(yc(g, l, {
      ...h,
      delay: u + (typeof o == "function" ? 0 : o) + cg(a.variantChildren, g, o, c, d)
    }).then(() => g.notify("AnimationComplete", l)));
  return Promise.all(p);
}
function wT(a, l, u = {}) {
  a.notify("AnimationStart", l);
  let o;
  if (Array.isArray(l)) {
    const c = l.map((d) => yc(a, d, u));
    o = Promise.all(c);
  } else if (typeof l == "string")
    o = yc(a, l, u);
  else {
    const c = typeof l == "function" ? Si(a, l, u.custom) : l;
    o = Promise.all(pg(a, c, u));
  }
  return o.then(() => {
    a.notify("AnimationComplete", l);
  });
}
const jT = {
  test: (a) => a === "auto",
  parse: (a) => a
}, gg = (a) => (l) => l.test(a), vg = [ca, J, Pe, vn, fS, cS, jT], xy = (a) => vg.find(gg(a));
function YT(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || Rp(a) : !0;
}
const qT = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function GT(a) {
  const [l, u] = a.slice(0, -1).split("(");
  if (l === "drop-shadow")
    return a;
  const [o] = u.match(_c) || [];
  if (!o)
    return a;
  const c = u.replace(o, "");
  let d = qT.has(l) ? 1 : 0;
  return o !== u && (d *= 100), l + "(" + d + c + ")";
}
const XT = /\b([a-z-]*)\(.*?\)/gu, pc = {
  ...Qe,
  getAnimatableNone: (a) => {
    const l = a.match(XT);
    return l ? l.map(GT).join(" ") : a;
  }
}, gc = {
  ...Qe,
  getAnimatableNone: (a) => {
    const l = Qe.parse(a);
    return Qe.createTransformer(a)(l.map((o) => typeof o == "number" ? 0 : typeof o == "object" ? { ...o, alpha: 1 } : o));
  }
}, Cy = {
  ...ca,
  transform: Math.round
}, QT = {
  rotate: vn,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: vn,
  rotateX: vn,
  rotateY: vn,
  rotateZ: vn,
  scale: qs,
  scaleX: qs,
  scaleY: qs,
  scaleZ: qs,
  skew: vn,
  skewX: vn,
  skewY: vn,
  distance: J,
  translateX: J,
  translateY: J,
  translateZ: J,
  x: J,
  y: J,
  z: J,
  perspective: J,
  transformPerspective: J,
  opacity: yl,
  originX: dy,
  originY: dy,
  originZ: J
}, iu = {
  // Border props
  borderWidth: J,
  borderTopWidth: J,
  borderRightWidth: J,
  borderBottomWidth: J,
  borderLeftWidth: J,
  borderRadius: J,
  borderTopLeftRadius: J,
  borderTopRightRadius: J,
  borderBottomRightRadius: J,
  borderBottomLeftRadius: J,
  // Positioning props
  width: J,
  maxWidth: J,
  height: J,
  maxHeight: J,
  top: J,
  right: J,
  bottom: J,
  left: J,
  inset: J,
  insetBlock: J,
  insetBlockStart: J,
  insetBlockEnd: J,
  insetInline: J,
  insetInlineStart: J,
  insetInlineEnd: J,
  // Spacing props
  padding: J,
  paddingTop: J,
  paddingRight: J,
  paddingBottom: J,
  paddingLeft: J,
  paddingBlock: J,
  paddingBlockStart: J,
  paddingBlockEnd: J,
  paddingInline: J,
  paddingInlineStart: J,
  paddingInlineEnd: J,
  margin: J,
  marginTop: J,
  marginRight: J,
  marginBottom: J,
  marginLeft: J,
  marginBlock: J,
  marginBlockStart: J,
  marginBlockEnd: J,
  marginInline: J,
  marginInlineStart: J,
  marginInlineEnd: J,
  // Typography
  fontSize: J,
  // Misc
  backgroundPositionX: J,
  backgroundPositionY: J,
  ...QT,
  zIndex: Cy,
  // SVG
  fillOpacity: yl,
  strokeOpacity: yl,
  numOctaves: Cy
}, ZT = {
  ...iu,
  // Color props
  color: Zt,
  backgroundColor: Zt,
  outlineColor: Zt,
  fill: Zt,
  stroke: Zt,
  // Border props
  borderColor: Zt,
  borderTopColor: Zt,
  borderRightColor: Zt,
  borderBottomColor: Zt,
  borderLeftColor: Zt,
  filter: pc,
  WebkitFilter: pc,
  mask: gc,
  WebkitMask: gc
}, Sg = (a) => ZT[a], KT = /* @__PURE__ */ new Set([pc, gc]);
function Tg(a, l) {
  let u = Sg(a);
  return KT.has(u) || (u = Qe), u.getAnimatableNone ? u.getAnimatableNone(l) : void 0;
}
const JT = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function kT(a, l, u) {
  let o = 0, c;
  for (; o < a.length && !c; ) {
    const d = a[o];
    typeof d == "string" && !JT.has(d) && oa(d).values.length && (c = a[o]), o++;
  }
  if (c && u)
    for (const d of l)
      a[d] = Tg(u, c);
}
class FT extends Hc {
  constructor(l, u, o, c, d) {
    super(l, u, o, c, d, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: l, element: u, name: o } = this;
    if (!u || !u.current)
      return;
    super.readKeyframes();
    for (let v = 0; v < l.length; v++) {
      let S = l[v];
      if (typeof S == "string" && (S = S.trim(), Vc(S))) {
        const E = hg(S, u.current);
        E !== void 0 && (l[v] = E), v === l.length - 1 && (this.finalKeyframe = S);
      }
    }
    if (this.resolveNoneKeyframes(), !dg.has(o) || l.length !== 2)
      return;
    const [c, d] = l, h = xy(c), p = xy(d), g = hy(c), m = hy(d);
    if (g !== m && Zn[o]) {
      this.needsMeasurement = !0;
      return;
    }
    if (h !== p)
      if (by(h) && by(p))
        for (let v = 0; v < l.length; v++) {
          const S = l[v];
          typeof S == "string" && (l[v] = parseFloat(S));
        }
      else Zn[o] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: l, name: u } = this, o = [];
    for (let c = 0; c < l.length; c++)
      (l[c] === null || YT(l[c])) && o.push(c);
    o.length && kT(l, o, u);
  }
  measureInitialState() {
    const { element: l, unresolvedKeyframes: u, name: o } = this;
    if (!l || !l.current)
      return;
    o === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Zn[o](l.measureViewportBox(), window.getComputedStyle(l.current)), u[0] = this.measuredOrigin;
    const c = u[u.length - 1];
    c !== void 0 && l.getValue(o, c).jump(c, !1);
  }
  measureEndState() {
    const { element: l, name: u, unresolvedKeyframes: o } = this;
    if (!l || !l.current)
      return;
    const c = l.getValue(u);
    c && c.jump(this.measuredOrigin, !1);
    const d = o.length - 1, h = o[d];
    o[d] = Zn[u](l.measureViewportBox(), window.getComputedStyle(l.current)), h !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = h), this.removedTransforms?.length && this.removedTransforms.forEach(([p, g]) => {
      l.getValue(p).set(g);
    }), this.resolveNoneKeyframes();
  }
}
const Gc = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function bg(a, l, u) {
  if (a == null)
    return [];
  if (a instanceof EventTarget)
    return [a];
  if (typeof a == "string") {
    let o = document;
    const c = u?.[a] ?? o.querySelectorAll(a);
    return c ? Array.from(c) : [];
  }
  return Array.from(a).filter((o) => o != null);
}
const vc = (a, l) => l && typeof a == "number" ? l.transform(a) : a;
function WT(a) {
  return zp(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: Xc } = /* @__PURE__ */ Gp(queueMicrotask, !1), Xe = {
  x: !1,
  y: !1
};
function Ag() {
  return Xe.x || Xe.y;
}
function PT(a) {
  return a === "x" || a === "y" ? Xe[a] ? null : (Xe[a] = !0, () => {
    Xe[a] = !1;
  }) : Xe.x || Xe.y ? null : (Xe.x = Xe.y = !0, () => {
    Xe.x = Xe.y = !1;
  });
}
function Eg(a, l) {
  const u = bg(a), o = new AbortController(), c = {
    passive: !0,
    ...l,
    signal: o.signal
  };
  return [u, c, () => o.abort()];
}
function $T(a) {
  return !(a.pointerType === "touch" || Ag());
}
function IT(a, l, u = {}) {
  const [o, c, d] = Eg(a, u);
  return o.forEach((h) => {
    let p = !1, g = !1, m;
    const v = () => {
      h.removeEventListener("pointerleave", z);
    }, S = (w) => {
      m && (m(w), m = void 0), v();
    }, E = (w) => {
      p = !1, window.removeEventListener("pointerup", E), window.removeEventListener("pointercancel", E), g && (g = !1, S(w));
    }, B = () => {
      p = !0, window.addEventListener("pointerup", E, c), window.addEventListener("pointercancel", E, c);
    }, z = (w) => {
      if (w.pointerType !== "touch") {
        if (p) {
          g = !0;
          return;
        }
        S(w);
      }
    }, H = (w) => {
      if (!$T(w))
        return;
      g = !1;
      const L = l(h, w);
      typeof L == "function" && (m = L, h.addEventListener("pointerleave", z, c));
    };
    h.addEventListener("pointerenter", H, c), h.addEventListener("pointerdown", B, c);
  }), d;
}
const Mg = (a, l) => l ? a === l ? !0 : Mg(a, l.parentElement) : !1, Qc = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, tb = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function eb(a) {
  return tb.has(a.tagName) || a.isContentEditable === !0;
}
const nb = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function ib(a) {
  return nb.has(a.tagName) || a.isContentEditable === !0;
}
const Zs = /* @__PURE__ */ new WeakSet();
function zy(a) {
  return (l) => {
    l.key === "Enter" && a(l);
  };
}
function Zr(a, l) {
  a.dispatchEvent(new PointerEvent("pointer" + l, { isPrimary: !0, bubbles: !0 }));
}
const ab = (a, l) => {
  const u = a.currentTarget;
  if (!u)
    return;
  const o = zy(() => {
    if (Zs.has(u))
      return;
    Zr(u, "down");
    const c = zy(() => {
      Zr(u, "up");
    }), d = () => Zr(u, "cancel");
    u.addEventListener("keyup", c, l), u.addEventListener("blur", d, l);
  });
  u.addEventListener("keydown", o, l), u.addEventListener("blur", () => u.removeEventListener("keydown", o), l);
};
function Ry(a) {
  return Qc(a) && !Ag();
}
const Oy = /* @__PURE__ */ new WeakSet();
function lb(a, l, u = {}) {
  const [o, c, d] = Eg(a, u), h = (p) => {
    const g = p.currentTarget;
    if (!Ry(p) || Oy.has(p))
      return;
    Zs.add(g), u.stopPropagation && Oy.add(p);
    const m = l(g, p), v = { ...c, capture: !0 }, S = (z, H) => {
      window.removeEventListener("pointerup", E, v), window.removeEventListener("pointercancel", B, v), Zs.has(g) && Zs.delete(g), Ry(z) && typeof m == "function" && m(z, { success: H });
    }, E = (z) => {
      S(z, g === window || g === document || u.useGlobalTarget || Mg(g, z.target));
    }, B = (z) => {
      S(z, !1);
    };
    window.addEventListener("pointerup", E, v), window.addEventListener("pointercancel", B, v);
  };
  return o.forEach((p) => {
    (u.useGlobalTarget ? window : p).addEventListener("pointerdown", h, c), WT(p) && (p.addEventListener("focus", (m) => ab(m, c)), !eb(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
  }), d;
}
function Zc(a) {
  return zp(a) && "ownerSVGElement" in a;
}
const Ks = /* @__PURE__ */ new WeakMap();
let Js;
const Dg = (a, l, u) => (o, c) => c && c[0] ? c[0][a + "Size"] : Zc(o) && "getBBox" in o ? o.getBBox()[l] : o[u], sb = /* @__PURE__ */ Dg("inline", "width", "offsetWidth"), ub = /* @__PURE__ */ Dg("block", "height", "offsetHeight");
function ob({ target: a, borderBoxSize: l }) {
  Ks.get(a)?.forEach((u) => {
    u(a, {
      get width() {
        return sb(a, l);
      },
      get height() {
        return ub(a, l);
      }
    });
  });
}
function rb(a) {
  a.forEach(ob);
}
function cb() {
  typeof ResizeObserver > "u" || (Js = new ResizeObserver(rb));
}
function fb(a, l) {
  Js || cb();
  const u = bg(a);
  return u.forEach((o) => {
    let c = Ks.get(o);
    c || (c = /* @__PURE__ */ new Set(), Ks.set(o, c)), c.add(l), Js?.observe(o);
  }), () => {
    u.forEach((o) => {
      const c = Ks.get(o);
      c?.delete(l), c?.size || Js?.unobserve(o);
    });
  };
}
const ks = /* @__PURE__ */ new Set();
let sa;
function hb() {
  sa = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    ks.forEach((l) => l(a));
  }, window.addEventListener("resize", sa);
}
function db(a) {
  return ks.add(a), sa || hb(), () => {
    ks.delete(a), !ks.size && typeof sa == "function" && (window.removeEventListener("resize", sa), sa = void 0);
  };
}
function Vy(a, l) {
  return typeof a == "function" ? db(a) : fb(a, l);
}
function mb(a) {
  return Zc(a) && a.tagName === "svg";
}
const yb = [...vg, Zt, Qe], pb = (a) => yb.find(gg(a)), _y = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), ua = () => ({
  x: _y(),
  y: _y()
}), By = () => ({ min: 0, max: 0 }), Jt = () => ({
  x: By(),
  y: By()
}), gb = /* @__PURE__ */ new WeakMap();
function fu(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function pl(a) {
  return typeof a == "string" || Array.isArray(a);
}
const Kc = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Jc = ["initial", ...Kc];
function hu(a) {
  return fu(a.animate) || Jc.some((l) => pl(a[l]));
}
function xg(a) {
  return !!(hu(a) || a.variants);
}
function vb(a, l, u) {
  for (const o in l) {
    const c = l[o], d = u[o];
    if (ne(c))
      a.addValue(o, c);
    else if (ne(d))
      a.addValue(o, ra(c, { owner: a }));
    else if (d !== c)
      if (a.hasValue(o)) {
        const h = a.getValue(o);
        h.liveStyle === !0 ? h.jump(c) : h.hasAnimated || h.set(c);
      } else {
        const h = a.getStaticValue(o);
        a.addValue(o, ra(h !== void 0 ? h : c, { owner: a }));
      }
  }
  for (const o in u)
    l[o] === void 0 && a.removeValue(o);
  return l;
}
const au = { current: null }, kc = { current: !1 }, Sb = typeof window < "u";
function Cg() {
  if (kc.current = !0, !!Sb)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), l = () => au.current = a.matches;
      a.addEventListener("change", l), l();
    } else
      au.current = !1;
}
const Uy = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let lu = {};
function zg(a) {
  lu = a;
}
function Tb() {
  return lu;
}
class bb {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(l, u, o) {
    return {};
  }
  constructor({ parent: l, props: u, presenceContext: o, reducedMotionConfig: c, skipAnimations: d, blockInitialAnimation: h, visualState: p }, g = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Hc, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const B = ue.now();
      this.renderScheduledAt < B && (this.renderScheduledAt = B, Rt.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: v } = p;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = u.initial ? { ...m } : {}, this.renderState = v, this.parent = l, this.props = u, this.presenceContext = o, this.depth = l ? l.depth + 1 : 0, this.reducedMotionConfig = c, this.skipAnimationsConfig = d, this.options = g, this.blockInitialAnimation = !!h, this.isControllingVariants = hu(u), this.isVariantNode = xg(u), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(l && l.current);
    const { willChange: S, ...E } = this.scrapeMotionValuesFromProps(u, {}, this);
    for (const B in E) {
      const z = E[B];
      m[B] !== void 0 && ne(z) && z.set(m[B]);
    }
  }
  mount(l) {
    if (this.hasBeenMounted)
      for (const u in this.initialValues)
        this.values.get(u)?.jump(this.initialValues[u]), this.latestValues[u] = this.initialValues[u];
    this.current = l, gb.set(l, this), this.projection && !this.projection.instance && this.projection.mount(l), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((u, o) => this.bindToMotionValue(o, u)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (kc.current || Cg(), this.shouldReduceMotion = au.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Jn(this.notifyUpdate), Jn(this.render), this.valueSubscriptions.forEach((l) => l()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const l in this.events)
      this.events[l].clear();
    for (const l in this.features) {
      const u = this.features[l];
      u && (u.unmount(), u.isMounted = !1);
    }
    this.current = null;
  }
  addChild(l) {
    this.children.add(l), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(l);
  }
  removeChild(l) {
    this.children.delete(l), this.enteringChildren && this.enteringChildren.delete(l);
  }
  bindToMotionValue(l, u) {
    if (this.valueSubscriptions.has(l) && this.valueSubscriptions.get(l)(), u.accelerate && rg.has(l) && this.current instanceof HTMLElement) {
      const { factory: h, keyframes: p, times: g, ease: m, duration: v } = u.accelerate, S = new ug({
        element: this.current,
        name: l,
        keyframes: p,
        times: g,
        ease: m,
        duration: /* @__PURE__ */ xe(v)
      }), E = h(S);
      this.valueSubscriptions.set(l, () => {
        E(), S.cancel();
      });
      return;
    }
    const o = ha.has(l);
    o && this.onBindTransform && this.onBindTransform();
    const c = u.on("change", (h) => {
      this.latestValues[l] = h, this.props.onUpdate && Rt.preRender(this.notifyUpdate), o && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let d;
    typeof window < "u" && window.MotionCheckAppearSync && (d = window.MotionCheckAppearSync(this, l, u)), this.valueSubscriptions.set(l, () => {
      c(), d && d();
    });
  }
  sortNodePosition(l) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== l.type ? 0 : this.sortInstanceNodePosition(this.current, l.current);
  }
  updateFeatures() {
    let l = "animation";
    for (l in lu) {
      const u = lu[l];
      if (!u)
        continue;
      const { isEnabled: o, Feature: c } = u;
      if (!this.features[l] && c && o(this.props) && (this.features[l] = new c(this)), this.features[l]) {
        const d = this.features[l];
        d.isMounted ? d.update() : (d.mount(), d.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Jt();
  }
  getStaticValue(l) {
    return this.latestValues[l];
  }
  setStaticValue(l, u) {
    this.latestValues[l] = u;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(l, u) {
    (l.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = l, this.prevPresenceContext = this.presenceContext, this.presenceContext = u;
    for (let o = 0; o < Uy.length; o++) {
      const c = Uy[o];
      this.propEventSubscriptions[c] && (this.propEventSubscriptions[c](), delete this.propEventSubscriptions[c]);
      const d = "on" + c, h = l[d];
      h && (this.propEventSubscriptions[c] = this.on(c, h));
    }
    this.prevMotionValues = vb(this, this.scrapeMotionValuesFromProps(l, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(l) {
    return this.props.variants ? this.props.variants[l] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(l) {
    const u = this.getClosestVariantNode();
    if (u)
      return u.variantChildren && u.variantChildren.add(l), () => u.variantChildren.delete(l);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(l, u) {
    const o = this.values.get(l);
    u !== o && (o && this.removeValue(l), this.bindToMotionValue(l, u), this.values.set(l, u), this.latestValues[l] = u.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(l) {
    this.values.delete(l);
    const u = this.valueSubscriptions.get(l);
    u && (u(), this.valueSubscriptions.delete(l)), delete this.latestValues[l], this.removeValueFromRenderState(l, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(l) {
    return this.values.has(l);
  }
  getValue(l, u) {
    if (this.props.values && this.props.values[l])
      return this.props.values[l];
    let o = this.values.get(l);
    return o === void 0 && u !== void 0 && (o = ra(u === null ? void 0 : u, { owner: this }), this.addValue(l, o)), o;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(l, u) {
    let o = this.latestValues[l] !== void 0 || !this.current ? this.latestValues[l] : this.getBaseTargetFromProps(this.props, l) ?? this.readValueFromInstance(this.current, l, this.options);
    return o != null && (typeof o == "string" && (Cp(o) || Rp(o)) ? o = parseFloat(o) : !pb(o) && Qe.test(u) && (o = Tg(l, u)), this.setBaseTarget(l, ne(o) ? o.get() : o)), ne(o) ? o.get() : o;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(l, u) {
    this.baseTarget[l] = u;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(l) {
    const { initial: u } = this.props;
    let o;
    if (typeof u == "string" || typeof u == "object") {
      const d = Yc(this.props, u, this.presenceContext?.custom);
      d && (o = d[l]);
    }
    if (u && o !== void 0)
      return o;
    const c = this.getBaseTargetFromProps(this.props, l);
    return c !== void 0 && !ne(c) ? c : this.initialValues[l] !== void 0 && o === void 0 ? void 0 : this.baseTarget[l];
  }
  on(l, u) {
    return this.events[l] || (this.events[l] = new zc()), this.events[l].add(u);
  }
  notify(l, ...u) {
    this.events[l] && this.events[l].notify(...u);
  }
  scheduleRenderMicrotask() {
    Xc.render(this.render);
  }
}
class Rg extends bb {
  constructor() {
    super(...arguments), this.KeyframeResolver = FT;
  }
  sortInstanceNodePosition(l, u) {
    return l.compareDocumentPosition(u) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(l, u) {
    const o = l.style;
    return o ? o[u] : void 0;
  }
  removeValueFromRenderState(l, { vars: u, style: o }) {
    delete u[l], delete o[l];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: l } = this.props;
    ne(l) && (this.childSubscription = l.on("change", (u) => {
      this.current && (this.current.textContent = `${u}`);
    }));
  }
}
class kn {
  constructor(l) {
    this.isMounted = !1, this.node = l;
  }
  update() {
  }
}
function Og({ top: a, left: l, right: u, bottom: o }) {
  return {
    x: { min: l, max: u },
    y: { min: a, max: o }
  };
}
function Ab({ x: a, y: l }) {
  return { top: l.min, right: a.max, bottom: l.max, left: a.min };
}
function Eb(a, l) {
  if (!l)
    return a;
  const u = l({ x: a.left, y: a.top }), o = l({ x: a.right, y: a.bottom });
  return {
    top: u.y,
    left: u.x,
    bottom: o.y,
    right: o.x
  };
}
function Kr(a) {
  return a === void 0 || a === 1;
}
function Sc({ scale: a, scaleX: l, scaleY: u }) {
  return !Kr(a) || !Kr(l) || !Kr(u);
}
function yi(a) {
  return Sc(a) || Vg(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function Vg(a) {
  return Ny(a.x) || Ny(a.y);
}
function Ny(a) {
  return a && a !== "0%";
}
function su(a, l, u) {
  const o = a - u, c = l * o;
  return u + c;
}
function Ly(a, l, u, o, c) {
  return c !== void 0 && (a = su(a, c, o)), su(a, u, o) + l;
}
function Tc(a, l = 0, u = 1, o, c) {
  a.min = Ly(a.min, l, u, o, c), a.max = Ly(a.max, l, u, o, c);
}
function _g(a, { x: l, y: u }) {
  Tc(a.x, l.translate, l.scale, l.originPoint), Tc(a.y, u.translate, u.scale, u.originPoint);
}
const Hy = 0.999999999999, wy = 1.0000000000001;
function Mb(a, l, u, o = !1) {
  const c = u.length;
  if (!c)
    return;
  l.x = l.y = 1;
  let d, h;
  for (let p = 0; p < c; p++) {
    d = u[p], h = d.projectionDelta;
    const { visualElement: g } = d.options;
    g && g.props.style && g.props.style.display === "contents" || (o && d.options.layoutScroll && d.scroll && d !== d.root && (We(a.x, -d.scroll.offset.x), We(a.y, -d.scroll.offset.y)), h && (l.x *= h.x.scale, l.y *= h.y.scale, _g(a, h)), o && yi(d.latestValues) && Fs(a, d.latestValues, d.layout?.layoutBox));
  }
  l.x < wy && l.x > Hy && (l.x = 1), l.y < wy && l.y > Hy && (l.y = 1);
}
function We(a, l) {
  a.min += l, a.max += l;
}
function jy(a, l, u, o, c = 0.5) {
  const d = zt(a.min, a.max, c);
  Tc(a, l, u, d, o);
}
function Yy(a, l) {
  return typeof a == "string" ? parseFloat(a) / 100 * (l.max - l.min) : a;
}
function Fs(a, l, u) {
  const o = u ?? a;
  jy(a.x, Yy(l.x, o.x), l.scaleX, l.scale, l.originX), jy(a.y, Yy(l.y, o.y), l.scaleY, l.scale, l.originY);
}
function Bg(a, l) {
  return Og(Eb(a.getBoundingClientRect(), l));
}
function Db(a, l, u) {
  const o = Bg(a, u), { scroll: c } = l;
  return c && (We(o.x, c.offset.x), We(o.y, c.offset.y)), o;
}
const xb = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Cb = fa.length;
function zb(a, l, u) {
  let o = "", c = !0;
  for (let h = 0; h < Cb; h++) {
    const p = fa[h], g = a[p];
    if (g === void 0)
      continue;
    let m = !0;
    if (typeof g == "number")
      m = g === (p.startsWith("scale") ? 1 : 0);
    else {
      const v = parseFloat(g);
      m = p.startsWith("scale") ? v === 1 : v === 0;
    }
    if (!m || u) {
      const v = vc(g, iu[p]);
      if (!m) {
        c = !1;
        const S = xb[p] || p;
        o += `${S}(${v}) `;
      }
      u && (l[p] = v);
    }
  }
  const d = a.pathRotation;
  return d && (c = !1, o += `rotate(${vc(d, iu.pathRotation)}) `), o = o.trim(), u ? o = u(l, c ? "" : o) : c && (o = "none"), o;
}
function Fc(a, l, u) {
  const { style: o, vars: c, transformOrigin: d } = a;
  let h = !1, p = !1;
  for (const g in l) {
    const m = l[g];
    if (ha.has(g)) {
      h = !0;
      continue;
    } else if (Qp(g)) {
      c[g] = m;
      continue;
    } else {
      const v = vc(m, iu[g]);
      g.startsWith("origin") ? (p = !0, d[g] = v) : o[g] = v;
    }
  }
  if (l.transform || (h || u ? o.transform = zb(l, a.transform, u) : o.transform && (o.transform = "none")), p) {
    const { originX: g = "50%", originY: m = "50%", originZ: v = 0 } = d;
    o.transformOrigin = `${g} ${m} ${v}`;
  }
}
function Ug(a, { style: l, vars: u }, o, c) {
  const d = a.style;
  let h;
  for (h in l)
    d[h] = l[h];
  c?.applyProjectionStyles(d, o);
  for (h in u)
    d.setProperty(h, u[h]);
}
function qy(a, l) {
  return l.max === l.min ? 0 : a / (l.max - l.min) * 100;
}
const ol = {
  correct: (a, l) => {
    if (!l.target)
      return a;
    if (typeof a == "string")
      if (J.test(a))
        a = parseFloat(a);
      else
        return a;
    const u = qy(a, l.target.x), o = qy(a, l.target.y);
    return `${u}% ${o}%`;
  }
}, Rb = {
  correct: (a, { treeScale: l, projectionDelta: u }) => {
    const o = a, c = Qe.parse(a);
    if (c.length > 5)
      return o;
    const d = Qe.createTransformer(a), h = typeof c[0] != "number" ? 1 : 0, p = u.x.scale * l.x, g = u.y.scale * l.y;
    c[0 + h] /= p, c[1 + h] /= g;
    const m = zt(p, g, 0.5);
    return typeof c[2 + h] == "number" && (c[2 + h] /= m), typeof c[3 + h] == "number" && (c[3 + h] /= m), d(c);
  }
}, bc = {
  borderRadius: {
    ...ol,
    applyTo: [...Gc]
  },
  borderTopLeftRadius: ol,
  borderTopRightRadius: ol,
  borderBottomLeftRadius: ol,
  borderBottomRightRadius: ol,
  boxShadow: Rb
};
function Ng(a, { layout: l, layoutId: u }) {
  return ha.has(a) || a.startsWith("origin") || (l || u !== void 0) && (!!bc[a] || a === "opacity");
}
function Wc(a, l, u) {
  const o = a.style, c = l?.style, d = {};
  if (!o)
    return d;
  for (const h in o)
    (ne(o[h]) || c && ne(c[h]) || Ng(h, a) || u?.getValue(h)?.liveStyle !== void 0) && (d[h] = o[h]);
  return d;
}
function Ob(a) {
  return window.getComputedStyle(a);
}
class Vb extends Rg {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Ug;
  }
  mount(l) {
    ru(!!l.style), super.mount(l);
  }
  readValueFromInstance(l, u) {
    if (ha.has(u))
      return this.projection?.isProjecting ? uc(u) : PS(l, u);
    {
      const o = Ob(l), c = (Qp(u) ? o.getPropertyValue(u) : o[u]) || 0;
      return typeof c == "string" ? c.trim() : c;
    }
  }
  measureInstanceViewportBox(l, { transformPagePoint: u }) {
    return Bg(l, u);
  }
  build(l, u, o) {
    Fc(l, u, o.transformTemplate);
  }
  scrapeMotionValuesFromProps(l, u, o) {
    return Wc(l, u, o);
  }
}
const _b = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Bb = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Ub(a, l, u = 1, o = 0, c = !0) {
  a.pathLength = 1;
  const d = c ? _b : Bb;
  a[d.offset] = `${-o}`, a[d.array] = `${l} ${u}`;
}
const Nb = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Lg(a, {
  attrX: l,
  attrY: u,
  attrScale: o,
  pathLength: c,
  pathSpacing: d = 1,
  pathOffset: h = 0,
  // This is object creation, which we try to avoid per-frame.
  ...p
}, g, m, v) {
  if (Fc(a, p, m), g) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: S, style: E } = a;
  S.transform && (E.transform = S.transform, delete S.transform), (E.transform || S.transformOrigin) && (E.transformOrigin = S.transformOrigin ?? "50% 50%", delete S.transformOrigin), E.transform && (E.transformBox = v?.transformBox ?? "fill-box", delete S.transformBox);
  for (const B of Nb)
    S[B] !== void 0 && (E[B] = S[B], delete S[B]);
  l !== void 0 && (S.x = l), u !== void 0 && (S.y = u), o !== void 0 && (S.scale = o), c !== void 0 && Ub(S, c, d, h, !1);
}
const Hg = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), wg = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function Lb(a, l, u, o) {
  Ug(a, l, void 0, o);
  for (const c in l.attrs)
    a.setAttribute(Hg.has(c) ? c : qc(c), l.attrs[c]);
}
function jg(a, l, u) {
  const o = Wc(a, l, u);
  for (const c in a)
    if (ne(a[c]) || ne(l[c])) {
      const d = fa.indexOf(c) !== -1 ? "attr" + c.charAt(0).toUpperCase() + c.substring(1) : c;
      o[d] = a[c];
    }
  return o;
}
class Hb extends Rg {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Jt;
  }
  getBaseTargetFromProps(l, u) {
    return l[u];
  }
  readValueFromInstance(l, u) {
    if (ha.has(u)) {
      const o = Sg(u);
      return o && o.default || 0;
    }
    return u = Hg.has(u) ? u : qc(u), l.getAttribute(u);
  }
  scrapeMotionValuesFromProps(l, u, o) {
    return jg(l, u, o);
  }
  build(l, u, o) {
    Lg(l, u, this.isSVGTag, o.transformTemplate, o.style);
  }
  renderInstance(l, u, o, c) {
    Lb(l, u, o, c);
  }
  mount(l) {
    this.isSVGTag = wg(l.tagName), super.mount(l);
  }
}
const wb = Jc.length;
function Yg(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const u = a.parent ? Yg(a.parent) || {} : {};
    return a.props.initial !== void 0 && (u.initial = a.props.initial), u;
  }
  const l = {};
  for (let u = 0; u < wb; u++) {
    const o = Jc[u], c = a.props[o];
    (pl(c) || c === !1) && (l[o] = c);
  }
  return l;
}
function qg(a, l) {
  if (!Array.isArray(l))
    return !1;
  const u = l.length;
  if (u !== a.length)
    return !1;
  for (let o = 0; o < u; o++)
    if (l[o] !== a[o])
      return !1;
  return !0;
}
const jb = [...Kc].reverse(), Yb = Kc.length;
function qb(a) {
  return (l) => Promise.all(l.map(({ animation: u, options: o }) => wT(a, u, o)));
}
function Gb(a) {
  let l = qb(a), u = Gy(), o = !0, c = !1;
  const d = (m) => (v, S) => {
    const E = Si(a, S, m === "exit" ? a.presenceContext?.custom : void 0);
    if (E) {
      const { transition: B, transitionEnd: z, ...H } = E;
      v = { ...v, ...H, ...z };
    }
    return v;
  };
  function h(m) {
    l = m(a);
  }
  function p(m) {
    const { props: v } = a, S = Yg(a.parent) || {}, E = [], B = /* @__PURE__ */ new Set();
    let z = {}, H = 1 / 0;
    for (let L = 0; L < Yb; L++) {
      const Y = jb[L], j = u[Y], X = v[Y] !== void 0 ? v[Y] : S[Y], et = pl(X), ut = Y === m ? j.isActive : null;
      ut === !1 && (H = L);
      let K = X === S[Y] && X !== v[Y] && et;
      if (K && (o || c) && a.manuallyAnimateOnMount && (K = !1), j.protectedKeys = { ...z }, // If it isn't active and hasn't *just* been set as inactive
      !j.isActive && ut === null || // If we didn't and don't have any defined prop for this animation type
      !X && !j.prevProp || // Or if the prop doesn't define an animation
      fu(X) || typeof X == "boolean")
        continue;
      if (Y === "exit" && j.isActive && ut !== !0) {
        j.prevResolvedValues && (z = {
          ...z,
          ...j.prevResolvedValues
        });
        continue;
      }
      const W = Xb(j.prevProp, X);
      let Et = W || // If we're making this variant active, we want to always make it active
      Y === m && j.isActive && !K && et || // If we removed a higher-priority variant (i is in reverse order)
      L > H && et, tt = !1;
      const gt = Array.isArray(X) ? X : [X];
      let Tt = gt.reduce(d(Y), {});
      ut === !1 && (Tt = {});
      const { prevResolvedValues: ae = {} } = j, Yt = {
        ...ae,
        ...Tt
      }, Lt = (Q) => {
        Et = !0, B.has(Q) && (tt = !0, B.delete(Q)), j.needsAnimating[Q] = !0;
        const lt = a.getValue(Q);
        lt && (lt.liveStyle = !1);
      };
      for (const Q in Yt) {
        const lt = Tt[Q], dt = ae[Q];
        if (z.hasOwnProperty(Q))
          continue;
        let A = !1;
        dc(lt) && dc(dt) ? A = !qg(lt, dt) || W : A = lt !== dt, A ? lt != null ? Lt(Q) : B.add(Q) : lt !== void 0 && B.has(Q) ? Lt(Q) : j.protectedKeys[Q] = !0;
      }
      j.prevProp = X, j.prevResolvedValues = Tt, j.isActive && (z = { ...z, ...Tt }), (o || c) && a.blockInitialAnimation && (Et = !1);
      const O = K && W;
      Et && (!O || tt) && E.push(...gt.map((Q) => {
        const lt = { type: Y };
        if (typeof Q == "string" && (o || c) && !O && a.manuallyAnimateOnMount && a.parent) {
          const { parent: dt } = a, A = Si(dt, Q);
          if (dt.enteringChildren && A) {
            const { delayChildren: N } = A.transition || {};
            lt.delay = cg(dt.enteringChildren, a, N);
          }
        }
        return {
          animation: Q,
          options: lt
        };
      }));
    }
    if (B.size) {
      const L = {};
      if (typeof v.initial != "boolean") {
        const Y = Si(a, Array.isArray(v.initial) ? v.initial[0] : v.initial);
        Y && Y.transition && (L.transition = Y.transition);
      }
      B.forEach((Y) => {
        const j = a.getBaseTarget(Y), X = a.getValue(Y);
        X && (X.liveStyle = !0), L[Y] = j ?? null;
      }), E.push({ animation: L });
    }
    let w = !!E.length;
    return o && (v.initial === !1 || v.initial === v.animate) && !a.manuallyAnimateOnMount && (w = !1), o = !1, c = !1, w ? l(E) : Promise.resolve();
  }
  function g(m, v) {
    if (u[m].isActive === v)
      return Promise.resolve();
    a.variantChildren?.forEach((E) => E.animationState?.setActive(m, v)), u[m].isActive = v;
    const S = p(m);
    for (const E in u)
      u[E].protectedKeys = {};
    return S;
  }
  return {
    animateChanges: p,
    setActive: g,
    setAnimateFunction: h,
    getState: () => u,
    reset: () => {
      u = Gy(), c = !0;
    }
  };
}
function Xb(a, l) {
  return typeof l == "string" ? l !== a : Array.isArray(l) ? !qg(l, a) : !1;
}
function mi(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Gy() {
  return {
    animate: mi(!0),
    whileInView: mi(),
    whileHover: mi(),
    whileTap: mi(),
    whileDrag: mi(),
    whileFocus: mi(),
    exit: mi()
  };
}
function Ac(a, l) {
  a.min = l.min, a.max = l.max;
}
function Ge(a, l) {
  Ac(a.x, l.x), Ac(a.y, l.y);
}
function Xy(a, l) {
  a.translate = l.translate, a.scale = l.scale, a.originPoint = l.originPoint, a.origin = l.origin;
}
const Gg = 1e-4, Qb = 1 - Gg, Zb = 1 + Gg, Xg = 0.01, Kb = 0 - Xg, Jb = 0 + Xg;
function oe(a) {
  return a.max - a.min;
}
function kb(a, l, u) {
  return Math.abs(a - l) <= u;
}
function Qy(a, l, u, o = 0.5) {
  a.origin = o, a.originPoint = zt(l.min, l.max, a.origin), a.scale = oe(u) / oe(l), a.translate = zt(u.min, u.max, a.origin) - a.originPoint, (a.scale >= Qb && a.scale <= Zb || isNaN(a.scale)) && (a.scale = 1), (a.translate >= Kb && a.translate <= Jb || isNaN(a.translate)) && (a.translate = 0);
}
function hl(a, l, u, o) {
  Qy(a.x, l.x, u.x, o ? o.originX : void 0), Qy(a.y, l.y, u.y, o ? o.originY : void 0);
}
function Zy(a, l, u, o = 0) {
  const c = o ? zt(u.min, u.max, o) : u.min;
  a.min = c + l.min, a.max = a.min + oe(l);
}
function Fb(a, l, u, o) {
  Zy(a.x, l.x, u.x, o?.x), Zy(a.y, l.y, u.y, o?.y);
}
function Ky(a, l, u, o = 0) {
  const c = o ? zt(u.min, u.max, o) : u.min;
  a.min = l.min - c, a.max = a.min + oe(l);
}
function uu(a, l, u, o) {
  Ky(a.x, l.x, u.x, o?.x), Ky(a.y, l.y, u.y, o?.y);
}
function Jy(a, l, u, o, c) {
  return a -= l, a = su(a, 1 / u, o), c !== void 0 && (a = su(a, 1 / c, o)), a;
}
function Wb(a, l = 0, u = 1, o = 0.5, c, d = a, h = a) {
  if (Pe.test(l) && (l = parseFloat(l), l = zt(h.min, h.max, l / 100) - h.min), typeof l != "number")
    return;
  let p = zt(d.min, d.max, o);
  a === d && (p -= l), a.min = Jy(a.min, l, u, p, c), a.max = Jy(a.max, l, u, p, c);
}
function ky(a, l, [u, o, c], d, h) {
  Wb(a, l[u], l[o], l[c], l.scale, d, h);
}
const Pb = ["x", "scaleX", "originX"], $b = ["y", "scaleY", "originY"];
function Fy(a, l, u, o) {
  ky(a.x, l, Pb, u ? u.x : void 0, o ? o.x : void 0), ky(a.y, l, $b, u ? u.y : void 0, o ? o.y : void 0);
}
function Wy(a) {
  return a.translate === 0 && a.scale === 1;
}
function Qg(a) {
  return Wy(a.x) && Wy(a.y);
}
function Py(a, l) {
  return a.min === l.min && a.max === l.max;
}
function Ib(a, l) {
  return Py(a.x, l.x) && Py(a.y, l.y);
}
function $y(a, l) {
  return Math.round(a.min) === Math.round(l.min) && Math.round(a.max) === Math.round(l.max);
}
function Zg(a, l) {
  return $y(a.x, l.x) && $y(a.y, l.y);
}
function Iy(a) {
  return oe(a.x) / oe(a.y);
}
function tp(a, l) {
  return a.translate === l.translate && a.scale === l.scale && a.originPoint === l.originPoint;
}
function Fe(a) {
  return [a("x"), a("y")];
}
function tA(a, l, u) {
  let o = "";
  const c = a.x.translate / l.x, d = a.y.translate / l.y, h = u?.z || 0;
  if ((c || d || h) && (o = `translate3d(${c}px, ${d}px, ${h}px) `), (l.x !== 1 || l.y !== 1) && (o += `scale(${1 / l.x}, ${1 / l.y}) `), u) {
    const { transformPerspective: m, rotate: v, pathRotation: S, rotateX: E, rotateY: B, skewX: z, skewY: H } = u;
    m && (o = `perspective(${m}px) ${o}`), v && (o += `rotate(${v}deg) `), S && (o += `rotate(${S}deg) `), E && (o += `rotateX(${E}deg) `), B && (o += `rotateY(${B}deg) `), z && (o += `skewX(${z}deg) `), H && (o += `skewY(${H}deg) `);
  }
  const p = a.x.scale * l.x, g = a.y.scale * l.y;
  return (p !== 1 || g !== 1) && (o += `scale(${p}, ${g})`), o || "none";
}
const eA = Gc.length, ep = (a) => typeof a == "string" ? parseFloat(a) : a, np = (a) => typeof a == "number" || J.test(a);
function nA(a, l, u, o, c, d) {
  c ? (a.opacity = zt(0, u.opacity ?? 1, iA(o)), a.opacityExit = zt(l.opacity ?? 1, 0, aA(o))) : d && (a.opacity = zt(l.opacity ?? 1, u.opacity ?? 1, o));
  for (let h = 0; h < eA; h++) {
    const p = Gc[h];
    let g = ip(l, p), m = ip(u, p);
    if (g === void 0 && m === void 0)
      continue;
    g || (g = 0), m || (m = 0), g === 0 || m === 0 || np(g) === np(m) ? (a[p] = Math.max(zt(ep(g), ep(m), o), 0), (Pe.test(m) || Pe.test(g)) && (a[p] += "%")) : a[p] = m;
  }
  (l.rotate || u.rotate) && (a.rotate = zt(l.rotate || 0, u.rotate || 0, o));
}
function ip(a, l) {
  return a[l] !== void 0 ? a[l] : a.borderRadius;
}
const iA = /* @__PURE__ */ Kg(0, 0.5, wp), aA = /* @__PURE__ */ Kg(0.5, 0.95, we);
function Kg(a, l, u) {
  return (o) => o < a ? 0 : o > l ? 1 : u(/* @__PURE__ */ ml(a, l, o));
}
function lA(a, l, u) {
  const o = ne(a) ? a : ra(a);
  return o.start(jc("", o, l, u)), o.animation;
}
function gl(a, l, u, o = { passive: !0 }) {
  return a.addEventListener(l, u, o), () => a.removeEventListener(l, u, o);
}
const sA = (a, l) => a.depth - l.depth;
class uA {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(l) {
    Cc(this.children, l), this.isDirty = !0;
  }
  remove(l) {
    $s(this.children, l), this.isDirty = !0;
  }
  forEach(l) {
    this.isDirty && this.children.sort(sA), this.isDirty = !1, this.children.forEach(l);
  }
}
function oA(a, l) {
  const u = ue.now(), o = ({ timestamp: c }) => {
    const d = c - u;
    d >= l && (Jn(o), a(d - l));
  };
  return Rt.setup(o, !0), () => Jn(o);
}
function Ws(a) {
  return ne(a) ? a.get() : a;
}
class rA {
  constructor() {
    this.members = [];
  }
  add(l) {
    Cc(this.members, l);
    for (let u = this.members.length - 1; u >= 0; u--) {
      const o = this.members[u];
      if (o === l || o === this.lead || o === this.prevLead)
        continue;
      const c = o.instance;
      (!c || c.isConnected === !1) && !o.snapshot && ($s(this.members, o), o.unmount());
    }
    l.scheduleRender();
  }
  remove(l) {
    if ($s(this.members, l), l === this.prevLead && (this.prevLead = void 0), l === this.lead) {
      const u = this.members[this.members.length - 1];
      u && this.promote(u);
    }
  }
  relegate(l) {
    for (let u = this.members.indexOf(l) - 1; u >= 0; u--) {
      const o = this.members[u];
      if (o.isPresent !== !1 && o.instance?.isConnected !== !1)
        return this.promote(o), !0;
    }
    return !1;
  }
  promote(l, u) {
    const o = this.lead;
    if (l !== o && (this.prevLead = o, this.lead = l, l.show(), o)) {
      o.updateSnapshot(), l.scheduleRender();
      const { layoutDependency: c } = o.options, { layoutDependency: d } = l.options;
      (c === void 0 || c !== d) && (l.resumeFrom = o, u && (o.preserveOpacity = !0), o.snapshot && (l.snapshot = o.snapshot, l.snapshot.latestValues = o.animationValues || o.latestValues), l.root?.isUpdating && (l.isLayoutDirty = !0)), l.options.crossfade === !1 && o.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((l) => {
      l.options.onExitComplete?.(), l.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((l) => l.instance && l.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const Ps = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, Jr = ["", "X", "Y", "Z"], cA = 1e3;
let fA = 0;
function kr(a, l, u, o) {
  const { latestValues: c } = l;
  c[a] && (u[a] = c[a], l.setStaticValue(a, 0), o && (o[a] = 0));
}
function Jg(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: l } = a.options;
  if (!l)
    return;
  const u = yg(l);
  if (window.MotionHasOptimisedAnimation(u, "transform")) {
    const { layout: c, layoutId: d } = a.options;
    window.MotionCancelOptimisedAnimation(u, "transform", Rt, !(c || d));
  }
  const { parent: o } = a;
  o && !o.hasCheckedOptimisedAppear && Jg(o);
}
function kg({ attachResizeListener: a, defaultParent: l, measureScroll: u, checkIsScrollRoot: o, resetTransform: c }) {
  return class {
    constructor(h = {}, p = l?.()) {
      this.id = fA++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(mA), this.nodes.forEach(TA), this.nodes.forEach(bA), this.nodes.forEach(yA);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = h, this.root = p ? p.root || p : this, this.path = p ? [...p.path, p] : [], this.parent = p, this.depth = p ? p.depth + 1 : 0;
      for (let g = 0; g < this.path.length; g++)
        this.path[g].shouldResetTransform = !0;
      this.root === this && (this.nodes = new uA());
    }
    addEventListener(h, p) {
      return this.eventHandlers.has(h) || this.eventHandlers.set(h, new zc()), this.eventHandlers.get(h).add(p);
    }
    notifyListeners(h, ...p) {
      const g = this.eventHandlers.get(h);
      g && g.notify(...p);
    }
    hasListeners(h) {
      return this.eventHandlers.has(h);
    }
    /**
     * Lifecycles
     */
    mount(h) {
      if (this.instance)
        return;
      this.isSVG = Zc(h) && !mb(h), this.instance = h;
      const { layoutId: p, layout: g, visualElement: m } = this.options;
      if (m && !m.current && m.mount(h), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (g || p) && (this.isLayoutDirty = !0), a) {
        let v, S = 0;
        const E = () => this.root.updateBlockedByResize = !1;
        Rt.read(() => {
          S = window.innerWidth;
        }), a(h, () => {
          const B = window.innerWidth;
          B !== S && (S = B, this.root.updateBlockedByResize = !0, v && v(), v = oA(E, 250), Ps.hasAnimatedSinceResize && (Ps.hasAnimatedSinceResize = !1, this.nodes.forEach(sp)));
        });
      }
      p && this.root.registerSharedNode(p, this), this.options.animate !== !1 && m && (p || g) && this.addEventListener("didUpdate", ({ delta: v, hasLayoutChanged: S, hasRelativeLayoutChanged: E, layout: B }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const z = this.options.transition || m.getDefaultTransition() || xA, { onLayoutAnimationStart: H, onLayoutAnimationComplete: w } = m.getProps(), L = !this.targetLayout || !Zg(this.targetLayout, B), Y = !S && E;
        if (this.options.layoutRoot || this.resumeFrom || Y || S && (L || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const j = {
            ...wc(z, "layout"),
            onPlay: H,
            onComplete: w
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (j.delay = 0, j.type = !1), this.startAnimation(j), this.setAnimationOrigin(v, Y, j.path);
        } else
          S || sp(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = B;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const h = this.getStack();
      h && h.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Jn(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(AA), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: h } = this.options;
      return h && h.getProps().transformTemplate;
    }
    willUpdate(h = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Jg(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let v = 0; v < this.path.length; v++) {
        const S = this.path[v];
        S.shouldResetTransform = !0, (typeof S.latestValues.x == "string" || typeof S.latestValues.y == "string") && (S.isLayoutDirty = !0), S.updateScroll("snapshot"), S.options.layoutRoot && S.willUpdate(!1);
      }
      const { layoutId: p, layout: g } = this.options;
      if (p === void 0 && !g)
        return;
      const m = this.getTransformTemplate();
      this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0, this.updateSnapshot(), h && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const g = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), g && this.nodes.forEach(gA), this.nodes.forEach(ap);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(lp);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(vA), this.nodes.forEach(SA), this.nodes.forEach(hA), this.nodes.forEach(dA)) : this.nodes.forEach(lp), this.clearAllSnapshots();
      const p = ue.now();
      ee.delta = $e(0, 1e3 / 60, p - ee.timestamp), ee.timestamp = p, ee.isProcessing = !0, jr.update.process(ee), jr.preRender.process(ee), jr.render.process(ee), ee.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Xc.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(pA), this.sharedNodes.forEach(EA);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Rt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Rt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !oe(this.snapshot.measuredBox.x) && !oe(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let g = 0; g < this.path.length; g++)
          this.path[g].updateScroll();
      const h = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = Jt()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: p } = this.options;
      p && p.notify("LayoutMeasure", this.layout.layoutBox, h ? h.layoutBox : void 0);
    }
    updateScroll(h = "measure") {
      let p = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === h && (p = !1), p && this.instance) {
        const g = o(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: h,
          isRoot: g,
          offset: u(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : g
        };
      }
    }
    resetTransform() {
      if (!c)
        return;
      const h = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, p = this.projectionDelta && !Qg(this.projectionDelta), g = this.getTransformTemplate(), m = g ? g(this.latestValues, "") : void 0, v = m !== this.prevTransformTemplateValue;
      h && this.instance && (p || yi(this.latestValues) || v) && (c(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(h = !0) {
      const p = this.measurePageBox();
      let g = this.removeElementScroll(p);
      return h && (g = this.removeTransform(g)), CA(g), {
        animationId: this.root.animationId,
        measuredBox: p,
        layoutBox: g,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: h } = this.options;
      if (!h)
        return Jt();
      const p = h.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(zA))) {
        const { scroll: m } = this.root;
        m && (We(p.x, m.offset.x), We(p.y, m.offset.y));
      }
      return p;
    }
    removeElementScroll(h) {
      const p = Jt();
      if (Ge(p, h), this.scroll?.wasRoot)
        return p;
      for (let g = 0; g < this.path.length; g++) {
        const m = this.path[g], { scroll: v, options: S } = m;
        m !== this.root && v && S.layoutScroll && (v.wasRoot && Ge(p, h), We(p.x, v.offset.x), We(p.y, v.offset.y));
      }
      return p;
    }
    applyTransform(h, p = !1, g) {
      const m = g || Jt();
      Ge(m, h);
      for (let v = 0; v < this.path.length; v++) {
        const S = this.path[v];
        !p && S.options.layoutScroll && S.scroll && S !== S.root && (We(m.x, -S.scroll.offset.x), We(m.y, -S.scroll.offset.y)), yi(S.latestValues) && Fs(m, S.latestValues, S.layout?.layoutBox);
      }
      return yi(this.latestValues) && Fs(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(h) {
      const p = Jt();
      Ge(p, h);
      for (let g = 0; g < this.path.length; g++) {
        const m = this.path[g];
        if (!yi(m.latestValues))
          continue;
        let v;
        m.instance && (Sc(m.latestValues) && m.updateSnapshot(), v = Jt(), Ge(v, m.measurePageBox())), Fy(p, m.latestValues, m.snapshot?.layoutBox, v);
      }
      return yi(this.latestValues) && Fy(p, this.latestValues), p;
    }
    setTargetDelta(h) {
      this.targetDelta = h, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(h) {
      this.options = {
        ...this.options,
        ...h,
        crossfade: h.crossfade !== void 0 ? h.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== ee.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(h = !1) {
      const p = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = p.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = p.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = p.isSharedProjectionDirty);
      const g = !!this.resumingFrom || this !== p;
      if (!(h || g && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: v, layoutId: S } = this.options;
      if (!this.layout || !(v || S))
        return;
      this.resolvedRelativeTargetAt = ee.timestamp;
      const E = this.getClosestProjectingParent();
      E && this.linkedParentVersion !== E.layoutVersion && !E.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && E && E.layout ? this.createRelativeTarget(E, this.layout.layoutBox, E.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Jt(), this.targetWithTransforms = Jt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Fb(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Ge(this.target, this.layout.layoutBox), _g(this.target, this.targetDelta)) : Ge(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && E && !!E.resumingFrom == !!this.resumingFrom && !E.options.layoutScroll && E.target && this.animationProgress !== 1 ? this.createRelativeTarget(E, this.target, E.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Sc(this.parent.latestValues) || Vg(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(h, p, g) {
      this.relativeParent = h, this.linkedParentVersion = h.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Jt(), this.relativeTargetOrigin = Jt(), uu(this.relativeTargetOrigin, p, g, this.options.layoutAnchor || void 0), Ge(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const h = this.getLead(), p = !!this.resumingFrom || this !== h;
      let g = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (g = !1), p && (this.isSharedProjectionDirty || this.isTransformDirty) && (g = !1), this.resolvedRelativeTargetAt === ee.timestamp && (g = !1), g)
        return;
      const { layout: m, layoutId: v } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || v))
        return;
      Ge(this.layoutCorrected, this.layout.layoutBox);
      const S = this.treeScale.x, E = this.treeScale.y;
      Mb(this.layoutCorrected, this.treeScale, this.path, p), h.layout && !h.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (h.target = h.layout.layoutBox, h.targetWithTransforms = Jt());
      const { target: B } = h;
      if (!B) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Xy(this.prevProjectionDelta.x, this.projectionDelta.x), Xy(this.prevProjectionDelta.y, this.projectionDelta.y)), hl(this.projectionDelta, this.layoutCorrected, B, this.latestValues), (this.treeScale.x !== S || this.treeScale.y !== E || !tp(this.projectionDelta.x, this.prevProjectionDelta.x) || !tp(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", B));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(h = !0) {
      if (this.options.visualElement?.scheduleRender(), h) {
        const p = this.getStack();
        p && p.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = ua(), this.projectionDelta = ua(), this.projectionDeltaWithTransform = ua();
    }
    setAnimationOrigin(h, p = !1, g) {
      const m = this.snapshot, v = m ? m.latestValues : {}, S = { ...this.latestValues }, E = ua();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !p;
      const B = Jt(), z = m ? m.source : void 0, H = this.layout ? this.layout.source : void 0, w = z !== H, L = this.getStack(), Y = !L || L.members.length <= 1, j = !!(w && !Y && this.options.crossfade === !0 && !this.path.some(DA));
      this.animationProgress = 0;
      let X;
      const et = g?.interpolateProjection(h);
      this.mixTargetDelta = (ut) => {
        const K = ut / 1e3, W = et?.(K);
        W ? (E.x.translate = W.x, E.x.scale = zt(h.x.scale, 1, K), E.x.origin = h.x.origin, E.x.originPoint = h.x.originPoint, E.y.translate = W.y, E.y.scale = zt(h.y.scale, 1, K), E.y.origin = h.y.origin, E.y.originPoint = h.y.originPoint) : (up(E.x, h.x, K), up(E.y, h.y, K)), this.setTargetDelta(E), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (uu(B, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), MA(this.relativeTarget, this.relativeTargetOrigin, B, K), X && Ib(this.relativeTarget, X) && (this.isProjectionDirty = !1), X || (X = Jt()), Ge(X, this.relativeTarget)), w && (this.animationValues = S, nA(S, v, this.latestValues, K, j, Y)), W && W.rotate !== void 0 && (this.animationValues || (this.animationValues = S), this.animationValues.pathRotation = W.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = K;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(h) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Jn(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Rt.update(() => {
        Ps.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = ra(0)), this.motionValue.jump(0, !1), this.currentAnimation = lA(this.motionValue, [0, 1e3], {
          ...h,
          velocity: 0,
          isSync: !0,
          onUpdate: (p) => {
            this.mixTargetDelta(p), h.onUpdate && h.onUpdate(p);
          },
          onComplete: () => {
            h.onComplete && h.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const h = this.getStack();
      h && h.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(cA), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const h = this.getLead();
      let { targetWithTransforms: p, target: g, layout: m, latestValues: v } = h;
      if (!(!p || !g || !m)) {
        if (this !== h && this.layout && m && Fg(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          g = this.target || Jt();
          const S = oe(this.layout.layoutBox.x);
          g.x.min = h.target.x.min, g.x.max = g.x.min + S;
          const E = oe(this.layout.layoutBox.y);
          g.y.min = h.target.y.min, g.y.max = g.y.min + E;
        }
        Ge(p, g), Fs(p, v), hl(this.projectionDeltaWithTransform, this.layoutCorrected, p, v);
      }
    }
    registerSharedNode(h, p) {
      this.sharedNodes.has(h) || this.sharedNodes.set(h, new rA()), this.sharedNodes.get(h).add(p);
      const m = p.options.initialPromotionConfig;
      p.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity: m && m.shouldPreserveFollowOpacity ? m.shouldPreserveFollowOpacity(p) : void 0
      });
    }
    isLead() {
      const h = this.getStack();
      return h ? h.lead === this : !0;
    }
    getLead() {
      const { layoutId: h } = this.options;
      return h ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: h } = this.options;
      return h ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: h } = this.options;
      if (h)
        return this.root.sharedNodes.get(h);
    }
    promote({ needsReset: h, transition: p, preserveFollowOpacity: g } = {}) {
      const m = this.getStack();
      m && m.promote(this, g), h && (this.projectionDelta = void 0, this.needsReset = !0), p && this.setOptions({ transition: p });
    }
    relegate() {
      const h = this.getStack();
      return h ? h.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: h } = this.options;
      if (!h)
        return;
      let p = !1;
      const { latestValues: g } = h;
      if ((g.z || g.rotate || g.rotateX || g.rotateY || g.rotateZ || g.skewX || g.skewY) && (p = !0), !p)
        return;
      const m = {};
      g.z && kr("z", h, m, this.animationValues);
      for (let v = 0; v < Jr.length; v++)
        kr(`rotate${Jr[v]}`, h, m, this.animationValues), kr(`skew${Jr[v]}`, h, m, this.animationValues);
      h.render();
      for (const v in m)
        h.setStaticValue(v, m[v]), this.animationValues && (this.animationValues[v] = m[v]);
      h.scheduleRender();
    }
    applyProjectionStyles(h, p) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        h.visibility = "hidden";
        return;
      }
      const g = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, h.visibility = "", h.opacity = "", h.pointerEvents = Ws(p?.pointerEvents) || "", h.transform = g ? g(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (h.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, h.pointerEvents = Ws(p?.pointerEvents) || ""), this.hasProjected && !yi(this.latestValues) && (h.transform = g ? g({}, "") : "none", this.hasProjected = !1);
        return;
      }
      h.visibility = "";
      const v = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let S = tA(this.projectionDeltaWithTransform, this.treeScale, v);
      g && (S = g(v, S)), h.transform = S;
      const { x: E, y: B } = this.projectionDelta;
      h.transformOrigin = `${E.origin * 100}% ${B.origin * 100}% 0`, m.animationValues ? h.opacity = m === this ? v.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : v.opacityExit : h.opacity = m === this ? v.opacity !== void 0 ? v.opacity : "" : v.opacityExit !== void 0 ? v.opacityExit : 0;
      for (const z in bc) {
        if (v[z] === void 0)
          continue;
        const { correct: H, applyTo: w, isCSSVariable: L } = bc[z], Y = S === "none" ? v[z] : H(v[z], m);
        if (w) {
          const j = w.length;
          for (let X = 0; X < j; X++)
            h[w[X]] = Y;
        } else
          L ? this.options.visualElement.renderState.vars[z] = Y : h[z] = Y;
      }
      this.options.layoutId && (h.pointerEvents = m === this ? Ws(p?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((h) => h.currentAnimation?.stop()), this.root.nodes.forEach(ap), this.root.sharedNodes.clear();
    }
  };
}
function hA(a) {
  a.updateLayout();
}
function dA(a) {
  const l = a.resumeFrom?.snapshot || a.snapshot;
  if (a.isLead() && a.layout && l && a.hasListeners("didUpdate")) {
    const { layoutBox: u, measuredBox: o } = a.layout, { animationType: c } = a.options, d = l.source !== a.layout.source;
    if (c === "size")
      Fe((v) => {
        const S = d ? l.measuredBox[v] : l.layoutBox[v], E = oe(S);
        S.min = u[v].min, S.max = S.min + E;
      });
    else if (c === "x" || c === "y") {
      const v = c === "x" ? "y" : "x";
      Ac(d ? l.measuredBox[v] : l.layoutBox[v], u[v]);
    } else Fg(c, l.layoutBox, u) && Fe((v) => {
      const S = d ? l.measuredBox[v] : l.layoutBox[v], E = oe(u[v]);
      S.max = S.min + E, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[v].max = a.relativeTarget[v].min + E);
    });
    const h = ua();
    hl(h, u, l.layoutBox);
    const p = ua();
    d ? hl(p, a.applyTransform(o, !0), l.measuredBox) : hl(p, u, l.layoutBox);
    const g = !Qg(h);
    let m = !1;
    if (!a.resumeFrom) {
      const v = a.getClosestProjectingParent();
      if (v && !v.resumeFrom) {
        const { snapshot: S, layout: E } = v;
        if (S && E) {
          const B = a.options.layoutAnchor || void 0, z = Jt();
          uu(z, l.layoutBox, S.layoutBox, B);
          const H = Jt();
          uu(H, u, E.layoutBox, B), Zg(z, H) || (m = !0), v.options.layoutRoot && (a.relativeTarget = H, a.relativeTargetOrigin = z, a.relativeParent = v);
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: u,
      snapshot: l,
      delta: p,
      layoutDelta: h,
      hasLayoutChanged: g,
      hasRelativeLayoutChanged: m
    });
  } else if (a.isLead()) {
    const { onExitComplete: u } = a.options;
    u && u();
  }
  a.options.transition = void 0;
}
function mA(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function yA(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function pA(a) {
  a.clearSnapshot();
}
function ap(a) {
  a.clearMeasurements();
}
function gA(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function lp(a) {
  a.isLayoutDirty = !1;
}
function vA(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function SA(a) {
  const { visualElement: l } = a.options;
  l && l.getProps().onBeforeLayoutMeasure && l.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function sp(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function TA(a) {
  a.resolveTargetDelta();
}
function bA(a) {
  a.calcProjection();
}
function AA(a) {
  a.resetSkewAndRotation();
}
function EA(a) {
  a.removeLeadSnapshot();
}
function up(a, l, u) {
  a.translate = zt(l.translate, 0, u), a.scale = zt(l.scale, 1, u), a.origin = l.origin, a.originPoint = l.originPoint;
}
function op(a, l, u, o) {
  a.min = zt(l.min, u.min, o), a.max = zt(l.max, u.max, o);
}
function MA(a, l, u, o) {
  op(a.x, l.x, u.x, o), op(a.y, l.y, u.y, o);
}
function DA(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const xA = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, rp = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), cp = rp("applewebkit/") && !rp("chrome/") ? Math.round : we;
function fp(a) {
  a.min = cp(a.min), a.max = cp(a.max);
}
function CA(a) {
  fp(a.x), fp(a.y);
}
function Fg(a, l, u) {
  return a === "position" || a === "preserve-aspect" && !kb(Iy(l), Iy(u), 0.2);
}
function zA(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const RA = kg({
  attachResizeListener: (a, l) => gl(a, "resize", l),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), Fr = {
  current: void 0
}, Wg = kg({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!Fr.current) {
      const a = new RA({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), Fr.current = a;
    }
    return Fr.current;
  },
  resetTransform: (a, l) => {
    a.style.transform = l !== void 0 ? l : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
}), Pg = P.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
});
function OA(a = !0) {
  const l = P.useContext(xc);
  if (l === null)
    return [!0, null];
  const { isPresent: u, onExitComplete: o, register: c } = l, d = P.useId();
  P.useEffect(() => {
    if (a)
      return c(d);
  }, [a]);
  const h = P.useCallback(() => a && o && o(d), [d, o, a]);
  return !u && o ? [!1, h] : [!0];
}
const $g = P.createContext({ strict: !1 }), hp = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let dp = !1;
function VA() {
  if (dp)
    return;
  const a = {};
  for (const l in hp)
    a[l] = {
      isEnabled: (u) => hp[l].some((o) => !!u[o])
    };
  zg(a), dp = !0;
}
function Ig() {
  return VA(), Tb();
}
function _A(a) {
  const l = Ig();
  for (const u in a)
    l[u] = {
      ...l[u],
      ...a[u]
    };
  zg(l);
}
const BA = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function ou(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || BA.has(a);
}
let t0 = (a) => !ou(a);
function UA(a) {
  typeof a == "function" && (t0 = (l) => l.startsWith("on") ? !ou(l) : a(l));
}
try {
  UA(require("@emotion/is-prop-valid").default);
} catch {
}
function NA(a, l, u) {
  const o = {};
  for (const c in a)
    c === "values" && typeof a.values == "object" || ne(a[c]) || (t0(c) || u === !0 && ou(c) || !l && !ou(c) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && c.startsWith("onDrag")) && (o[c] = a[c]);
  return o;
}
const du = /* @__PURE__ */ P.createContext({});
function LA(a, l) {
  if (hu(a)) {
    const { initial: u, animate: o } = a;
    return {
      initial: u === !1 || pl(u) ? u : void 0,
      animate: pl(o) ? o : void 0
    };
  }
  return a.inherit !== !1 ? l : {};
}
function HA(a) {
  const { initial: l, animate: u } = LA(a, P.useContext(du));
  return P.useMemo(() => ({ initial: l, animate: u }), [mp(l), mp(u)]);
}
function mp(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const Pc = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function e0(a, l, u) {
  for (const o in l)
    !ne(l[o]) && !Ng(o, u) && (a[o] = l[o]);
}
function wA({ transformTemplate: a }, l) {
  return P.useMemo(() => {
    const u = Pc();
    return Fc(u, l, a), Object.assign({}, u.vars, u.style);
  }, [l]);
}
function jA(a, l) {
  const u = a.style || {}, o = {};
  return e0(o, u, a), Object.assign(o, wA(a, l)), o;
}
function YA(a, l) {
  const u = {}, o = jA(a, l);
  return a.drag && a.dragListener !== !1 && (u.draggable = !1, o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none", o.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (u.tabIndex = 0), u.style = o, u;
}
const n0 = () => ({
  ...Pc(),
  attrs: {}
});
function qA(a, l, u, o) {
  const c = P.useMemo(() => {
    const d = n0();
    return Lg(d, l, wg(o), a.transformTemplate, a.style), {
      ...d.attrs,
      style: { ...d.style }
    };
  }, [l]);
  if (a.style) {
    const d = {};
    e0(d, a.style, a), c.style = { ...d, ...c.style };
  }
  return c;
}
const GA = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function $c(a) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof a != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    a.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(GA.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function XA(a, l, u, { latestValues: o }, c, d = !1, h) {
  const g = (h ?? $c(a) ? qA : YA)(l, o, c, a), m = NA(l, typeof a == "string", d), v = a !== P.Fragment ? { ...m, ...g, ref: u } : {}, { children: S } = l, E = P.useMemo(() => ne(S) ? S.get() : S, [S]);
  return P.createElement(a, {
    ...v,
    children: E
  });
}
function QA({ scrapeMotionValuesFromProps: a, createRenderState: l }, u, o, c) {
  return {
    latestValues: ZA(u, o, c, a),
    renderState: l()
  };
}
function ZA(a, l, u, o) {
  const c = {}, d = o(a, {});
  for (const E in d)
    c[E] = Ws(d[E]);
  let { initial: h, animate: p } = a;
  const g = hu(a), m = xg(a);
  l && m && !g && a.inherit !== !1 && (h === void 0 && (h = l.initial), p === void 0 && (p = l.animate));
  let v = u ? u.initial === !1 : !1;
  v = v || h === !1;
  const S = v ? p : h;
  if (S && typeof S != "boolean" && !fu(S)) {
    const E = Array.isArray(S) ? S : [S];
    for (let B = 0; B < E.length; B++) {
      const z = Yc(a, E[B]);
      if (z) {
        const { transitionEnd: H, transition: w, ...L } = z;
        for (const Y in L) {
          let j = L[Y];
          if (Array.isArray(j)) {
            const X = v ? j.length - 1 : 0;
            j = j[X];
          }
          j !== null && (c[Y] = j);
        }
        for (const Y in H)
          c[Y] = H[Y];
      }
    }
  }
  return c;
}
const i0 = (a) => (l, u) => {
  const o = P.useContext(du), c = P.useContext(xc), d = () => QA(a, l, o, c);
  return u ? d() : Q1(d);
}, KA = /* @__PURE__ */ i0({
  scrapeMotionValuesFromProps: Wc,
  createRenderState: Pc
}), JA = /* @__PURE__ */ i0({
  scrapeMotionValuesFromProps: jg,
  createRenderState: n0
}), kA = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function FA(a, l, u) {
  const o = P.useRef(u);
  P.useInsertionEffect(() => {
    o.current = u;
  });
  const c = P.useRef(null);
  return P.useCallback((d) => {
    d && a.onMount?.(d), l && (d ? l.mount(d) : l.unmount());
    const h = o.current;
    if (typeof h == "function")
      if (d) {
        const p = h(d);
        typeof p == "function" && (c.current = p);
      } else c.current ? (c.current(), c.current = null) : h(d);
    else h && (h.current = d);
  }, [l]);
}
const a0 = P.createContext({});
function aa(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
function WA(a, l, u, o, c, d) {
  const { visualElement: h } = P.useContext(du), p = P.useContext($g), g = P.useContext(xc), m = P.useContext(Pg), v = m.reducedMotion, S = m.skipAnimations, E = P.useRef(null), B = P.useRef(!1);
  o = o || p.renderer, !E.current && o && (E.current = o(a, {
    visualState: l,
    parent: h,
    props: u,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: v,
    skipAnimations: S,
    isSVG: d
  }), B.current && E.current && (E.current.manuallyAnimateOnMount = !0));
  const z = E.current, H = P.useContext(a0);
  z && !z.projection && c && (z.type === "html" || z.type === "svg") && PA(E.current, u, c, H);
  const w = P.useRef(!1);
  P.useInsertionEffect(() => {
    z && w.current && z.update(u, g);
  });
  const L = u[mg], Y = P.useRef(!!L && typeof window < "u" && !window.MotionHandoffIsComplete?.(L) && window.MotionHasOptimisedAnimation?.(L));
  return K1(() => {
    B.current = !0, z && (w.current = !0, window.MotionIsMounted = !0, z.updateFeatures(), z.scheduleRenderMicrotask(), Y.current && z.animationState && z.animationState.animateChanges());
  }), P.useEffect(() => {
    z && (!Y.current && z.animationState && z.animationState.animateChanges(), Y.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(L);
    }), Y.current = !1), z.enteringChildren = void 0);
  }), z;
}
function PA(a, l, u, o) {
  const { layoutId: c, layout: d, drag: h, dragConstraints: p, layoutScroll: g, layoutRoot: m, layoutAnchor: v, layoutCrossfade: S } = l;
  a.projection = new u(a.latestValues, l["data-framer-portal-id"] ? void 0 : l0(a.parent)), a.projection.setOptions({
    layoutId: c,
    layout: d,
    alwaysMeasureLayout: !!h || p && aa(p),
    visualElement: a,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof d == "string" ? d : "both",
    initialPromotionConfig: o,
    crossfade: S,
    layoutScroll: g,
    layoutRoot: m,
    layoutAnchor: v
  });
}
function l0(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : l0(a.parent);
}
function Wr(a, { forwardMotionProps: l = !1, type: u } = {}, o, c) {
  o && _A(o);
  const d = u ? u === "svg" : $c(a), h = d ? JA : KA;
  function p(m, v) {
    let S;
    const E = {
      ...P.useContext(Pg),
      ...m,
      layoutId: $A(m)
    }, { isStatic: B } = E, z = HA(m), H = h(m, B);
    if (!B && typeof window < "u") {
      IA();
      const w = tE(E);
      S = w.MeasureLayout, z.visualElement = WA(a, H, E, c, w.ProjectionNode, d);
    }
    return Sn.jsxs(du.Provider, { value: z, children: [S && z.visualElement ? Sn.jsx(S, { visualElement: z.visualElement, ...E }) : null, XA(a, m, FA(H, z.visualElement, v), H, B, l, d)] });
  }
  p.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const g = P.forwardRef(p);
  return g[kA] = a, g;
}
function $A({ layoutId: a }) {
  const l = P.useContext(xp).id;
  return l && a !== void 0 ? l + "-" + a : a;
}
function IA(a, l) {
  P.useContext($g).strict;
}
function tE(a) {
  const l = Ig(), { drag: u, layout: o } = l;
  if (!u && !o)
    return {};
  const c = { ...u, ...o };
  return {
    MeasureLayout: u?.isEnabled(a) || o?.isEnabled(a) ? c.MeasureLayout : void 0,
    ProjectionNode: c.ProjectionNode
  };
}
function eE(a, l) {
  if (typeof Proxy > "u")
    return Wr;
  const u = /* @__PURE__ */ new Map(), o = (d, h) => Wr(d, h, a, l), c = (d, h) => o(d, h);
  return new Proxy(c, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (d, h) => h === "create" ? o : (u.has(h) || u.set(h, Wr(h, void 0, a, l)), u.get(h))
  });
}
const nE = (a, l) => l.isSVG ?? $c(a) ? new Hb(l) : new Vb(l, {
  allowProjection: a !== P.Fragment
});
class iE extends kn {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(l) {
    super(l), l.animationState || (l.animationState = Gb(l));
  }
  updateAnimationControlsSubscription() {
    const { animate: l } = this.node.getProps();
    fu(l) && (this.unmountControls = l.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: l } = this.node.getProps(), { animate: u } = this.node.prevProps || {};
    l !== u && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let aE = 0;
class lE extends kn {
  constructor() {
    super(...arguments), this.id = aE++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: l, onExitComplete: u } = this.node.presenceContext, { isPresent: o } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || l === o)
      return;
    if (l && o === !1) {
      if (this.isExitComplete) {
        const { initial: d, custom: h } = this.node.getProps();
        if (typeof d == "string" || typeof d == "object" && d !== null && !Array.isArray(d)) {
          const p = Si(this.node, d, h);
          if (p) {
            const { transition: g, transitionEnd: m, ...v } = p;
            for (const S in v)
              this.node.getValue(S)?.jump(v[S]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const c = this.node.animationState.setActive("exit", !l);
    u && !l && c.then(() => {
      this.isExitComplete = !0, u(this.id);
    });
  }
  mount() {
    const { register: l, onExitComplete: u } = this.node.presenceContext || {};
    u && u(this.id), l && (this.unmount = l(this.id));
  }
  unmount() {
  }
}
const sE = {
  animation: {
    Feature: iE
  },
  exit: {
    Feature: lE
  }
};
function bl(a) {
  return {
    point: {
      x: a.pageX,
      y: a.pageY
    }
  };
}
const uE = (a) => (l) => Qc(l) && a(l, bl(l));
function dl(a, l, u, o) {
  return gl(a, l, uE(u), o);
}
const s0 = ({ current: a }) => a ? a.ownerDocument.defaultView : null, yp = (a, l) => Math.abs(a - l);
function oE(a, l) {
  const u = yp(a.x, l.x), o = yp(a.y, l.y);
  return Math.sqrt(u ** 2 + o ** 2);
}
const pp = /* @__PURE__ */ new Set(["auto", "scroll"]);
class u0 {
  constructor(l, u, { transformPagePoint: o, contextWindow: c = window, dragSnapToOrigin: d = !1, distanceThreshold: h = 3, element: p } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (z) => {
      this.handleScroll(z.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Gs(this.lastRawMoveEventInfo, this.transformPagePoint));
      const z = Pr(this.lastMoveEventInfo, this.history), H = this.startEvent !== null, w = oE(z.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!H && !w)
        return;
      const { point: L } = z, { timestamp: Y } = ee;
      this.history.push({ ...L, timestamp: Y });
      const { onStart: j, onMove: X } = this.handlers;
      H || (j && j(this.lastMoveEvent, z), this.startEvent = this.lastMoveEvent), X && X(this.lastMoveEvent, z);
    }, this.handlePointerMove = (z, H) => {
      this.lastMoveEvent = z, this.lastRawMoveEventInfo = H, this.lastMoveEventInfo = Gs(H, this.transformPagePoint), Rt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (z, H) => {
      this.end();
      const { onEnd: w, onSessionEnd: L, resumeAnimation: Y } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && Y && Y(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const j = Pr(z.type === "pointercancel" ? this.lastMoveEventInfo : Gs(H, this.transformPagePoint), this.history);
      this.startEvent && w && w(z, j), L && L(z, j);
    }, !Qc(l))
      return;
    this.dragSnapToOrigin = d, this.handlers = u, this.transformPagePoint = o, this.distanceThreshold = h, this.contextWindow = c || window;
    const g = bl(l), m = Gs(g, this.transformPagePoint), { point: v } = m, { timestamp: S } = ee;
    this.history = [{ ...v, timestamp: S }];
    const { onSessionStart: E } = u;
    E && E(l, Pr(m, this.history));
    const B = { passive: !0, capture: !0 };
    this.removeListeners = vl(dl(this.contextWindow, "pointermove", this.handlePointerMove, B), dl(this.contextWindow, "pointerup", this.handlePointerUp, B), dl(this.contextWindow, "pointercancel", this.handlePointerUp, B)), p && this.startScrollTracking(p);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(l) {
    let u = l.parentElement;
    for (; u; ) {
      const o = getComputedStyle(u);
      (pp.has(o.overflowX) || pp.has(o.overflowY)) && this.scrollPositions.set(u, {
        x: u.scrollLeft,
        y: u.scrollTop
      }), u = u.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(l) {
    const u = this.scrollPositions.get(l);
    if (!u)
      return;
    const o = l === window, c = o ? { x: window.scrollX, y: window.scrollY } : {
      x: l.scrollLeft,
      y: l.scrollTop
    }, d = { x: c.x - u.x, y: c.y - u.y };
    d.x === 0 && d.y === 0 || (o ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += d.x, this.lastMoveEventInfo.point.y += d.y) : this.history.length > 0 && (this.history[0].x -= d.x, this.history[0].y -= d.y), this.scrollPositions.set(l, c), Rt.update(this.updatePoint, !0));
  }
  updateHandlers(l) {
    this.handlers = l;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Jn(this.updatePoint);
  }
}
function Gs(a, l) {
  return l ? { point: l(a.point) } : a;
}
function gp(a, l) {
  return { x: a.x - l.x, y: a.y - l.y };
}
function Pr({ point: a }, l) {
  return {
    point: a,
    delta: gp(a, o0(l)),
    offset: gp(a, rE(l)),
    velocity: cE(l, 0.1)
  };
}
function rE(a) {
  return a[0];
}
function o0(a) {
  return a[a.length - 1];
}
function cE(a, l) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let u = a.length - 1, o = null;
  const c = o0(a);
  for (; u >= 0 && (o = a[u], !(c.timestamp - o.timestamp > /* @__PURE__ */ xe(l))); )
    u--;
  if (!o)
    return { x: 0, y: 0 };
  o === a[0] && a.length > 2 && c.timestamp - o.timestamp > /* @__PURE__ */ xe(l) * 2 && (o = a[1]);
  const d = /* @__PURE__ */ He(c.timestamp - o.timestamp);
  if (d === 0)
    return { x: 0, y: 0 };
  const h = {
    x: (c.x - o.x) / d,
    y: (c.y - o.y) / d
  };
  return h.x === 1 / 0 && (h.x = 0), h.y === 1 / 0 && (h.y = 0), h;
}
function fE(a, { min: l, max: u }, o) {
  return l !== void 0 && a < l ? a = o ? zt(l, a, o.min) : Math.max(a, l) : u !== void 0 && a > u && (a = o ? zt(u, a, o.max) : Math.min(a, u)), a;
}
function vp(a, l, u) {
  return {
    min: l !== void 0 ? a.min + l : void 0,
    max: u !== void 0 ? a.max + u - (a.max - a.min) : void 0
  };
}
function hE(a, { top: l, left: u, bottom: o, right: c }) {
  return {
    x: vp(a.x, u, c),
    y: vp(a.y, l, o)
  };
}
function Sp(a, l) {
  let u = l.min - a.min, o = l.max - a.max;
  return l.max - l.min < a.max - a.min && ([u, o] = [o, u]), { min: u, max: o };
}
function dE(a, l) {
  return {
    x: Sp(a.x, l.x),
    y: Sp(a.y, l.y)
  };
}
function mE(a, l) {
  let u = 0.5;
  const o = oe(a), c = oe(l);
  return c > o ? u = /* @__PURE__ */ ml(l.min, l.max - o, a.min) : o > c && (u = /* @__PURE__ */ ml(a.min, a.max - c, l.min)), $e(0, 1, u);
}
function yE(a, l) {
  const u = {};
  return l.min !== void 0 && (u.min = l.min - a.min), l.max !== void 0 && (u.max = l.max - a.min), u;
}
const Ec = 0.35;
function pE(a = Ec) {
  return a === !1 ? a = 0 : a === !0 && (a = Ec), {
    x: Tp(a, "left", "right"),
    y: Tp(a, "top", "bottom")
  };
}
function Tp(a, l, u) {
  return {
    min: bp(a, l),
    max: bp(a, u)
  };
}
function bp(a, l) {
  return typeof a == "number" ? a : a[l] || 0;
}
const gE = /* @__PURE__ */ new WeakMap();
class vE {
  constructor(l) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Jt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = l;
  }
  start(l, { snapToCursor: u = !1, distanceThreshold: o } = {}) {
    const { presenceContext: c } = this.visualElement;
    if (c && c.isPresent === !1)
      return;
    const d = (S) => {
      u && this.snapToCursor(bl(S).point), this.stopAnimation();
    }, h = (S, E) => {
      const { drag: B, dragPropagation: z, onDragStart: H } = this.getProps();
      if (B && !z && (this.openDragLock && this.openDragLock(), this.openDragLock = PT(B), !this.openDragLock))
        return;
      this.latestPointerEvent = S, this.latestPanInfo = E, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Fe((L) => {
        let Y = this.getAxisMotionValue(L).get() || 0;
        if (Pe.test(Y)) {
          const { projection: j } = this.visualElement;
          if (j && j.layout) {
            const X = j.layout.layoutBox[L];
            X && (Y = oe(X) * (parseFloat(Y) / 100));
          }
        }
        this.originPoint[L] = Y;
      }), H && Rt.update(() => H(S, E), !1, !0), mc(this.visualElement, "transform");
      const { animationState: w } = this.visualElement;
      w && w.setActive("whileDrag", !0);
    }, p = (S, E) => {
      this.latestPointerEvent = S, this.latestPanInfo = E;
      const { dragPropagation: B, dragDirectionLock: z, onDirectionLock: H, onDrag: w } = this.getProps();
      if (!B && !this.openDragLock)
        return;
      const { offset: L } = E;
      if (z && this.currentDirection === null) {
        this.currentDirection = TE(L), this.currentDirection !== null && H && H(this.currentDirection);
        return;
      }
      this.updateAxis("x", E.point, L), this.updateAxis("y", E.point, L), this.visualElement.render(), w && Rt.update(() => w(S, E), !1, !0);
    }, g = (S, E) => {
      this.latestPointerEvent = S, this.latestPanInfo = E, this.stop(S, E), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: S } = this.getProps();
      (S || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: v } = this.getProps();
    this.panSession = new u0(l, {
      onSessionStart: d,
      onStart: h,
      onMove: p,
      onSessionEnd: g,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: v,
      distanceThreshold: o,
      contextWindow: s0(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(l, u) {
    const o = l || this.latestPointerEvent, c = u || this.latestPanInfo, d = this.isDragging;
    if (this.cancel(), !d || !c || !o)
      return;
    const { velocity: h } = c;
    this.startAnimation(h);
    const { onDragEnd: p } = this.getProps();
    p && Rt.postRender(() => p(o, c));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: l, animationState: u } = this.visualElement;
    l && (l.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: o } = this.getProps();
    !o && this.openDragLock && (this.openDragLock(), this.openDragLock = null), u && u.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(l, u, o) {
    const { drag: c } = this.getProps();
    if (!o || !Xs(l, c, this.currentDirection))
      return;
    const d = this.getAxisMotionValue(l);
    let h = this.originPoint[l] + o[l];
    this.constraints && this.constraints[l] && (h = fE(h, this.constraints[l], this.elastic[l])), d.set(h);
  }
  resolveConstraints() {
    const { dragConstraints: l, dragElastic: u } = this.getProps(), o = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, c = this.constraints;
    l && aa(l) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : l && o ? this.constraints = hE(o.layoutBox, l) : this.constraints = !1, this.elastic = pE(u), c !== this.constraints && !aa(l) && o && this.constraints && !this.hasMutatedConstraints && Fe((d) => {
      this.constraints !== !1 && this.getAxisMotionValue(d) && (this.constraints[d] = yE(o.layoutBox[d], this.constraints[d]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: l, onMeasureDragConstraints: u } = this.getProps();
    if (!l || !aa(l))
      return !1;
    const o = l.current, { projection: c } = this.visualElement;
    if (!c || !c.layout)
      return !1;
    c.root && (c.root.scroll = void 0, c.root.updateScroll());
    const d = Db(o, c.root, this.visualElement.getTransformPagePoint());
    let h = dE(c.layout.layoutBox, d);
    if (u) {
      const p = u(Ab(h));
      this.hasMutatedConstraints = !!p, p && (h = Og(p));
    }
    return h;
  }
  startAnimation(l) {
    const { drag: u, dragMomentum: o, dragElastic: c, dragTransition: d, dragSnapToOrigin: h, onDragTransitionEnd: p } = this.getProps(), g = this.constraints || {}, m = Fe((v) => {
      if (!Xs(v, u, this.currentDirection))
        return;
      let S = g && g[v] || {};
      (h === !0 || h === v) && (S = { min: 0, max: 0 });
      const E = c ? 200 : 1e6, B = c ? 40 : 1e7, z = {
        type: "inertia",
        velocity: o ? l[v] : 0,
        bounceStiffness: E,
        bounceDamping: B,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...d,
        ...S
      };
      return this.startAxisValueAnimation(v, z);
    });
    return Promise.all(m).then(p);
  }
  startAxisValueAnimation(l, u) {
    const o = this.getAxisMotionValue(l);
    return mc(this.visualElement, l), o.start(jc(l, o, 0, u, this.visualElement, !1));
  }
  stopAnimation() {
    Fe((l) => this.getAxisMotionValue(l).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(l) {
    const u = `_drag${l.toUpperCase()}`, c = this.visualElement.getProps()[u];
    return c || this.visualElement.getValue(l, this.visualElement.latestValues[l] ?? 0);
  }
  snapToCursor(l) {
    Fe((u) => {
      const { drag: o } = this.getProps();
      if (!Xs(u, o, this.currentDirection))
        return;
      const { projection: c } = this.visualElement, d = this.getAxisMotionValue(u);
      if (c && c.layout) {
        const { min: h, max: p } = c.layout.layoutBox[u], g = d.get() || 0;
        d.set(l[u] - zt(h, p, 0.5) + g);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: l, dragConstraints: u } = this.getProps(), { projection: o } = this.visualElement;
    if (!aa(u) || !o || !this.constraints)
      return;
    this.stopAnimation();
    const c = { x: 0, y: 0 };
    Fe((h) => {
      const p = this.getAxisMotionValue(h);
      if (p && this.constraints !== !1) {
        const g = p.get();
        c[h] = mE({ min: g, max: g }, this.constraints[h]);
      }
    });
    const { transformTemplate: d } = this.visualElement.getProps();
    this.visualElement.current.style.transform = d ? d({}, "") : "none", o.root && o.root.updateScroll(), o.updateLayout(), this.constraints = !1, this.resolveConstraints(), Fe((h) => {
      if (!Xs(h, l, null))
        return;
      const p = this.getAxisMotionValue(h), { min: g, max: m } = this.constraints[h];
      p.set(zt(g, m, c[h]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    gE.set(this.visualElement, this);
    const l = this.visualElement.current, u = dl(l, "pointerdown", (m) => {
      const { drag: v, dragListener: S = !0 } = this.getProps(), E = m.target, B = E !== l && ib(E);
      v && S && !B && this.start(m);
    });
    let o;
    const c = () => {
      const { dragConstraints: m } = this.getProps();
      aa(m) && m.current && (this.constraints = this.resolveRefConstraints(), o || (o = SE(l, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: d } = this.visualElement, h = d.addEventListener("measure", c);
    d && !d.layout && (d.root && d.root.updateScroll(), d.updateLayout()), Rt.read(c);
    const p = gl(window, "resize", () => this.scalePositionWithinConstraints()), g = d.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: v }) => {
      this.isDragging && v && (Fe((S) => {
        const E = this.getAxisMotionValue(S);
        E && (this.originPoint[S] += m[S].translate, E.set(E.get() + m[S].translate));
      }), this.visualElement.render());
    }));
    return () => {
      p(), u(), h(), g && g(), o && o();
    };
  }
  getProps() {
    const l = this.visualElement.getProps(), { drag: u = !1, dragDirectionLock: o = !1, dragPropagation: c = !1, dragConstraints: d = !1, dragElastic: h = Ec, dragMomentum: p = !0 } = l;
    return {
      ...l,
      drag: u,
      dragDirectionLock: o,
      dragPropagation: c,
      dragConstraints: d,
      dragElastic: h,
      dragMomentum: p
    };
  }
}
function Ap(a) {
  let l = !0;
  return () => {
    if (l) {
      l = !1;
      return;
    }
    a();
  };
}
function SE(a, l, u) {
  const o = Vy(a, Ap(u)), c = Vy(l, Ap(u));
  return () => {
    o(), c();
  };
}
function Xs(a, l, u) {
  return (l === !0 || l === a) && (u === null || u === a);
}
function TE(a, l = 10) {
  let u = null;
  return Math.abs(a.y) > l ? u = "y" : Math.abs(a.x) > l && (u = "x"), u;
}
class bE extends kn {
  constructor(l) {
    super(l), this.removeGroupControls = we, this.removeListeners = we, this.controls = new vE(l);
  }
  mount() {
    const { dragControls: l } = this.node.getProps();
    l && (this.removeGroupControls = l.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || we;
  }
  update() {
    const { dragControls: l } = this.node.getProps(), { dragControls: u } = this.node.prevProps || {};
    l !== u && (this.removeGroupControls(), l && (this.removeGroupControls = l.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const $r = (a) => (l, u) => {
  a && Rt.update(() => a(l, u), !1, !0);
};
class AE extends kn {
  constructor() {
    super(...arguments), this.removePointerDownListener = we;
  }
  onPointerDown(l) {
    this.session = new u0(l, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: s0(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: l, onPanStart: u, onPan: o, onPanEnd: c } = this.node.getProps();
    return {
      onSessionStart: $r(l),
      onStart: $r(u),
      onMove: $r(o),
      onEnd: (d, h) => {
        delete this.session, c && Rt.postRender(() => c(d, h));
      }
    };
  }
  mount() {
    this.removePointerDownListener = dl(this.node.current, "pointerdown", (l) => this.onPointerDown(l));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Ir = !1;
class EE extends P.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: l, layoutGroup: u, switchLayoutGroup: o, layoutId: c } = this.props, { projection: d } = l;
    d && (u.group && u.group.add(d), o && o.register && c && o.register(d), Ir && d.root.didUpdate(), d.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), d.setOptions({
      ...d.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Ps.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(l) {
    const { layoutDependency: u, visualElement: o, drag: c, isPresent: d } = this.props, { projection: h } = o;
    return h && (h.isPresent = d, l.layoutDependency !== u && h.setOptions({
      ...h.options,
      layoutDependency: u
    }), Ir = !0, c || l.layoutDependency !== u || u === void 0 || l.isPresent !== d ? h.willUpdate() : this.safeToRemove(), l.isPresent !== d && (d ? h.promote() : h.relegate() || Rt.postRender(() => {
      const p = h.getStack();
      (!p || !p.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: l, layoutAnchor: u } = this.props, { projection: o } = l;
    o && (o.options.layoutAnchor = u, o.root.didUpdate(), Xc.postRender(() => {
      !o.currentAnimation && o.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: l, layoutGroup: u, switchLayoutGroup: o } = this.props, { projection: c } = l;
    Ir = !0, c && (c.scheduleCheckAfterUnmount(), u && u.group && u.group.remove(c), o && o.deregister && o.deregister(c));
  }
  safeToRemove() {
    const { safeToRemove: l } = this.props;
    l && l();
  }
  render() {
    return null;
  }
}
function r0(a) {
  const [l, u] = OA(), o = P.useContext(xp);
  return Sn.jsx(EE, { ...a, layoutGroup: o, switchLayoutGroup: P.useContext(a0), isPresent: l, safeToRemove: u });
}
const ME = {
  pan: {
    Feature: AE
  },
  drag: {
    Feature: bE,
    ProjectionNode: Wg,
    MeasureLayout: r0
  }
};
function Ep(a, l, u) {
  const { props: o } = a;
  a.animationState && o.whileHover && a.animationState.setActive("whileHover", u === "Start");
  const c = "onHover" + u, d = o[c];
  d && Rt.postRender(() => d(l, bl(l)));
}
class DE extends kn {
  mount() {
    const { current: l } = this.node;
    l && (this.unmount = IT(l, (u, o) => (Ep(this.node, o, "Start"), (c) => Ep(this.node, c, "End"))));
  }
  unmount() {
  }
}
class xE extends kn {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let l = !1;
    try {
      l = this.node.current.matches(":focus-visible");
    } catch {
      l = !0;
    }
    !l || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = vl(gl(this.node.current, "focus", () => this.onFocus()), gl(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Mp(a, l, u) {
  const { props: o } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && o.whileTap && a.animationState.setActive("whileTap", u === "Start");
  const c = "onTap" + (u === "End" ? "" : u), d = o[c];
  d && Rt.postRender(() => d(l, bl(l)));
}
class CE extends kn {
  mount() {
    const { current: l } = this.node;
    if (!l)
      return;
    const { globalTapTarget: u, propagate: o } = this.node.props;
    this.unmount = lb(l, (c, d) => (Mp(this.node, d, "Start"), (h, { success: p }) => Mp(this.node, h, p ? "End" : "Cancel")), {
      useGlobalTarget: u,
      stopPropagation: o?.tap === !1
    });
  }
  unmount() {
  }
}
const Mc = /* @__PURE__ */ new WeakMap(), tc = /* @__PURE__ */ new WeakMap(), zE = (a) => {
  const l = Mc.get(a.target);
  l && l(a);
}, RE = (a) => {
  a.forEach(zE);
};
function OE({ root: a, ...l }) {
  const u = a || document;
  tc.has(u) || tc.set(u, {});
  const o = tc.get(u), c = JSON.stringify(l);
  return o[c] || (o[c] = new IntersectionObserver(RE, { root: a, ...l })), o[c];
}
function VE(a, l, u) {
  const o = OE(l);
  return Mc.set(a, u), o.observe(a), () => {
    Mc.delete(a), o.unobserve(a);
  };
}
const _E = {
  some: 0,
  all: 1
};
class BE extends kn {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: l = {} } = this.node.getProps(), { root: u, margin: o, amount: c = "some", once: d } = l, h = {
      root: u ? u.current : void 0,
      rootMargin: o,
      threshold: typeof c == "number" ? c : _E[c]
    }, p = (g) => {
      const { isIntersecting: m } = g;
      if (this.isInView === m || (this.isInView = m, d && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: v, onViewportLeave: S } = this.node.getProps(), E = m ? v : S;
      E && E(g);
    };
    this.stopObserver = VE(this.node.current, h, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: l, prevProps: u } = this.node;
    ["amount", "margin", "root"].some(UE(l, u)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function UE({ viewport: a = {} }, { viewport: l = {} } = {}) {
  return (u) => a[u] !== l[u];
}
const NE = {
  inView: {
    Feature: BE
  },
  tap: {
    Feature: CE
  },
  focus: {
    Feature: xE
  },
  hover: {
    Feature: DE
  }
}, LE = {
  layout: {
    ProjectionNode: Wg,
    MeasureLayout: r0
  }
}, HE = {
  ...sE,
  ...NE,
  ...ME,
  ...LE
}, wE = /* @__PURE__ */ eE(HE, nE);
function jE() {
  !kc.current && Cg();
  const [a] = P.useState(au.current);
  return a;
}
const c0 = [
  { id: "green", label: "Green Beans" },
  { id: "roasted", label: "Roasted Beans" },
  { id: "instant_coffee", label: "Instant Coffee" },
  { id: "decoction", label: "Decoction" },
  { id: "herbal_teas", label: "Herbal Teas" }
];
function YE({ tabs: a = c0, value: l, onValueChange: u, panelId: o }) {
  const [c, d] = P.useState(a[0]?.id ?? ""), h = l ?? c, [p, g] = P.useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 }), m = P.useRef([]), v = P.useRef(null), S = jE(), E = P.useId(), B = P.useCallback((w) => {
    const L = m.current[w];
    L && g({ left: L.offsetLeft, top: L.offsetTop, width: L.offsetWidth, height: L.offsetHeight, opacity: 1 });
  }, []), z = P.useCallback(() => B(a.findIndex((w) => w.id === h)), [B, h, a]);
  P.useEffect(() => {
    z();
    const w = new ResizeObserver(z);
    return v.current && w.observe(v.current), m.current.forEach((L) => {
      L && w.observe(L);
    }), () => w.disconnect();
  }, [z]);
  function H(w) {
    const L = a[w];
    L && (d(L.id), u?.(L.id));
  }
  return /* @__PURE__ */ Sn.jsx("div", { className: "stock-tabs-scroll max-w-full overflow-x-auto", children: /* @__PURE__ */ Sn.jsxs(
    "div",
    {
      ref: v,
      role: "tablist",
      "aria-label": "Stock category",
      onMouseLeave: z,
      className: "slide-tabs relative isolate mx-auto flex w-fit rounded-full p-1",
      children: [
        a.map((w, L) => /* @__PURE__ */ Sn.jsx(
          "button",
          {
            ref: (Y) => {
              m.current[L] = Y;
            },
            type: "button",
            id: `${E}-${w.id}`,
            role: "tab",
            "aria-selected": h === w.id,
            "aria-controls": o,
            tabIndex: h === w.id ? 0 : -1,
            onClick: () => H(L),
            onMouseEnter: () => B(L),
            onFocus: () => B(L),
            onBlur: z,
            onKeyDown: (Y) => {
              let j = L;
              if (Y.key === "ArrowRight") j = (L + 1) % a.length;
              else if (Y.key === "ArrowLeft") j = (L - 1 + a.length) % a.length;
              else if (Y.key === "Home") j = 0;
              else if (Y.key === "End") j = a.length - 1;
              else return;
              Y.preventDefault(), H(j), m.current[j]?.focus();
            },
            className: "slide-tab relative z-10 whitespace-nowrap rounded-full px-3 py-3 text-xs font-semibold sm:px-5 sm:text-sm",
            children: w.label
          },
          w.id
        )),
        /* @__PURE__ */ Sn.jsx(
          wE.span,
          {
            "aria-hidden": "true",
            animate: p,
            transition: S ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 35 },
            className: "slide-tab-cursor pointer-events-none absolute z-0 rounded-full"
          }
        )
      ]
    }
  ) });
}
function qE() {
  const [a, l] = P.useState("green");
  return P.useEffect(() => {
    const u = document.getElementById("stock-catalog");
    if (!u) return;
    const o = c0.find((g) => g.id === a).label;
    let c = 0;
    u.querySelectorAll("[data-stock-category]").forEach((g) => {
      g.hidden = g.dataset.stockCategory !== a, g.hidden || (c += 1);
    }), u.dataset.category = a, u.setAttribute("aria-label", `${o} stock`);
    const d = u.querySelector("[data-catalog-title]"), h = u.querySelector("[data-catalog-count]"), p = u.querySelector("[data-catalog-empty]");
    d && (d.textContent = `${o} stock`), h && (h.textContent = `${c} ${c === 1 ? "item" : "items"}`), p && (p.hidden = c !== 0, p.textContent = `No ${o.toLowerCase()} in the catalog yet.`);
  }, [a]), /* @__PURE__ */ Sn.jsx(YE, { value: a, onValueChange: l, panelId: "stock-catalog" });
}
const Dp = document.getElementById("inventory-category-tabs");
Dp && X1.createRoot(Dp).render(/* @__PURE__ */ Sn.jsx(qE, {}));
