/* bignumber.js v9.0.1 https://github.com/MikeMcl/bignumber.js/LICENCE.md */ !function (
  e,
) {
  "use strict";
  var r,
    C = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
    M = Math.ceil,
    G = Math.floor,
    k = "[BigNumber Error] ",
    F = k + "Number primitive has more than 15 significant digits: ",
    q = 1e14,
    j = 14,
    $ = 9007199254740991,
    z = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
    H = 1e7,
    V = 1e9;
  function W(e) {
    var r = 0 | e;
    return 0 < e || e === r ? r : r - 1;
  }
  function X(e) {
    for (var r, n, t = 1, i = e.length, o = e[0] + ""; t < i;) {
      for (r = e[t++] + "", n = j - r.length; n--; r = "0" + r);
      o += r;
    }
    for (i = o.length; 48 === o.charCodeAt(--i););
    return o.slice(0, i + 1 || 1);
  }
  function Y(e, r) {
    var n, t, i = e.c, o = r.c, s = e.s, f = r.s, u = e.e, l = r.e;
    if (!s || !f) return null;
    if (n = i && !i[0], t = o && !o[0], n || t) return n ? t ? 0 : -f : s;
    if (s != f) return s;
    if (n = s < 0, t = u == l, !i || !o) return t ? 0 : !i ^ n ? 1 : -1;
    if (!t) return l < u ^ n ? 1 : -1;
    for (f = (u = i.length) < (l = o.length) ? u : l, s = 0; s < f; s++) {
      if (i[s] != o[s]) return i[s] > o[s] ^ n ? 1 : -1;
    }
    return u == l ? 0 : l < u ^ n ? 1 : -1;
  }
  function J(e, r, n, t) {
    if (e < r || n < e || e !== G(e)) {
      throw Error(
        k + (t || "Argument") + ("number" == typeof e
          ? e < r || n < e
            ? " out of range: "
            : " not an integer: "
          : " not a primitive number: ") +
          String(e),
      );
    }
  }
  function Z(e) {
    var r = e.c.length - 1;
    return W(e.e / j) == r && e.c[r] % 2 != 0;
  }
  function K(e, r) {
    return (1 < e.length ? e.charAt(0) + "." + e.slice(1) : e) + (r < 0
      ? "e"
      : "e+") +
      r;
  }
  function Q(e, r, n) {
    var t, i;
    if (r < 0) {
      for (i = n + "."; ++r; i += n);
      e = i + e;
    } else if (++r > (t = e.length)) {
      for (i = n, r -= t; --r; i += n);
      e += i;
    } else r < t && (e = e.slice(0, r) + "." + e.slice(r));
    return e;
  }
  (r = function e(r) {
    var d,
      a,
      h,
      n,
      l,
      m,
      s,
      f,
      u,
      c,
      g,
      t = _.prototype = { constructor: _, toString: null, valueOf: null },
      w = new _(1),
      v = 20,
      N = 4,
      p = -7,
      O = 21,
      y = -1e7,
      b = 1e7,
      E = !1,
      o = 1,
      A = 0,
      S = {
        prefix: "",
        groupSize: 3,
        secondaryGroupSize: 0,
        groupSeparator: ",",
        decimalSeparator: ".",
        fractionGroupSize: 0,
        fractionGroupSeparator: " ",
        suffix: "",
      },
      R = "0123456789abcdefghijklmnopqrstuvwxyz";
    function _(e, r) {
      var n, t, i, o, s, f, u, l, c = this;
      if (!(c instanceof _)) return new _(e, r);
      if (null == r) {
        if (e && !0 === e._isBigNumber) {
          return c.s = e.s,
            void (!e.c || e.e > b
              ? c.c = c.e = null
              : e.e < y
              ? c.c = [c.e = 0]
              : (c.e = e.e, c.c = e.c.slice()));
        }
        if ((f = "number" == typeof e) && 0 * e == 0) {
          if (c.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
            for (o = 0, s = e; 10 <= s; s /= 10, o++);
            return void (b < o ? c.c = c.e = null : (c.e = o, c.c = [e]));
          }
          l = String(e);
        } else {
          if (!C.test(l = String(e))) return h(c, l, f);
          c.s = 45 == l.charCodeAt(0) ? (l = l.slice(1), -1) : 1;
        }
        -1 < (o = l.indexOf(".")) && (l = l.replace(".", "")),
          0 < (s = l.search(/e/i))
            ? (o < 0 && (o = s), o += +l.slice(s + 1), l = l.substring(0, s))
            : o < 0 && (o = l.length);
      } else {
        if (J(r, 2, R.length, "Base"), 10 == r) {
          return I(c = new _(e), v + c.e + 1, N);
        }
        if (l = String(e), f = "number" == typeof e) {
          if (0 * e != 0) return h(c, l, f, r);
          if (
            c.s = 1 / e < 0 ? (l = l.slice(1), -1) : 1,
              _.DEBUG && 15 < l.replace(/^0\.0*|\./, "").length
          ) {
            throw Error(F + e);
          }
        } else c.s = 45 === l.charCodeAt(0) ? (l = l.slice(1), -1) : 1;
        for (n = R.slice(0, r), o = s = 0, u = l.length; s < u; s++) {
          if (n.indexOf(t = l.charAt(s)) < 0) {
            if ("." == t) {
              if (o < s) {
                o = u;
                continue;
              }
            } else if (
              !i &&
              (l == l.toUpperCase() && (l = l.toLowerCase()) ||
                l == l.toLowerCase() && (l = l.toUpperCase()))
            ) {
              i = !0, s = -1, o = 0;
              continue;
            }
            return h(c, String(e), f, r);
          }
        }
        f = !1,
          -1 < (o = (l = a(l, r, 10, c.s)).indexOf("."))
            ? l = l.replace(".", "")
            : o = l.length;
      }
      for (s = 0; 48 === l.charCodeAt(s); s++);
      for (u = l.length; 48 === l.charCodeAt(--u););
      if (l = l.slice(s, ++u)) {
        if (u -= s, f && _.DEBUG && 15 < u && ($ < e || e !== G(e))) {
          throw Error(F + c.s * e);
        }
        if ((o = o - s - 1) > b) c.c = c.e = null;
        else if (o < y) c.c = [c.e = 0];
        else {
          if (c.e = o, c.c = [], s = (o + 1) % j, o < 0 && (s += j), s < u) {
            for (s && c.c.push(+l.slice(0, s)), u -= j; s < u;) {
              c.c.push(+l.slice(s, s += j));
            }
            s = j - (l = l.slice(s)).length;
          } else s -= u;
          for (; s--; l += "0");
          c.c.push(+l);
        }
      } else c.c = [c.e = 0];
    }
    function B(e, r, n, t) {
      for (var i, o, s = [0], f = 0, u = e.length; f < u;) {
        for (o = s.length; o--; s[o] *= r);
        for (s[0] += t.indexOf(e.charAt(f++)), i = 0; i < s.length; i++) {
          s[i] > n - 1 &&
            (null == s[i + 1] && (s[i + 1] = 0),
              s[i + 1] += s[i] / n | 0,
              s[i] %= n);
        }
      }
      return s.reverse();
    }
    function D(e, r, n) {
      var t, i, o, s, f = 0, u = e.length, l = r % H, c = r / H | 0;
      for (e = e.slice(); u--;) {
        f = ((i = l * (o = e[u] % H) +
              (t = c * o + (s = e[u] / H | 0) * l) % H * H + f) / n | 0) +
          (t / H | 0) + c * s, e[u] = i % n;
      }
      return f && (e = [f].concat(e)), e;
    }
    function P(e, r, n, t) {
      var i, o;
      if (n != t) o = t < n ? 1 : -1;
      else {
        for (i = o = 0; i < n; i++) {
          if (e[i] != r[i]) {
            o = e[i] > r[i] ? 1 : -1;
            break;
          }
        }
      }
      return o;
    }
    function x(e, r, n, t) {
      for (var i = 0; n--;) {
        e[n] -= i, i = e[n] < r[n] ? 1 : 0, e[n] = i * t + e[n] - r[n];
      }
      for (; !e[0] && 1 < e.length; e.splice(0, 1));
    }
    function i(e, r, n, t) {
      var i, o, s, f, u;
      if (null == n ? n = N : J(n, 0, 8), !e.c) return e.toString();
      if (i = e.c[0], s = e.e, null == r) {
        u = X(e.c),
          u = 1 == t || 2 == t && (s <= p || O <= s) ? K(u, s) : Q(u, s, "0");
      } else if (
        o = (e = I(new _(e), r, n)).e,
          f = (u = X(e.c)).length,
          1 == t || 2 == t && (r <= o || o <= p)
      ) {
        for (; f < r; u += "0", f++);
        u = K(u, o);
      } else if (r -= s, u = Q(u, o, "0"), f < o + 1) {
        if (0 < --r) for (u += "."; r--; u += "0");
      } else if (0 < (r += o - f)) {
        for (o + 1 == f && (u += "."); r--; u += "0");
      }
      return e.s < 0 && i ? "-" + u : u;
    }
    function L(e, r) {
      for (var n, t = 1, i = new _(e[0]); t < e.length; t++) {
        if (!(n = new _(e[t])).s) {
          i = n;
          break;
        }
        r.call(i, n) && (i = n);
      }
      return i;
    }
    function U(e, r, n) {
      for (var t = 1, i = r.length; !r[--i]; r.pop());
      for (i = r[0]; 10 <= i; i /= 10, t++);
      return (n = t + n * j - 1) > b
        ? e.c = e.e = null
        : n < y
        ? e.c = [e.e = 0]
        : (e.e = n, e.c = r),
        e;
    }
    function I(e, r, n, t) {
      var i, o, s, f, u, l, c, a = e.c, h = z;
      if (a) {
        e: {
          for (i = 1, f = a[0]; 10 <= f; f /= 10, i++);
          if ((o = r - i) < 0) {
            o += j, s = r, c = (u = a[l = 0]) / h[i - s - 1] % 10 | 0;
          } else if ((l = M((o + 1) / j)) >= a.length) {
            if (!t) break e;
            for (; a.length <= l; a.push(0));
            u = c = 0, s = (o %= j) - j + (i = 1);
          } else {
            for (u = f = a[l], i = 1; 10 <= f; f /= 10, i++);
            c = (s = (o %= j) - j + i) < 0 ? 0 : u / h[i - s - 1] % 10 | 0;
          }
          if (
            t = t || r < 0 || null != a[l + 1] ||
              (s < 0 ? u : u % h[i - s - 1]),
              t = n < 4
                ? (c || t) && (0 == n || n == (e.s < 0 ? 3 : 2))
                : 5 < c || 5 == c && (4 == n || t || 6 == n && (0 < o
                                ? 0 < s
                                  ? u / h[i - s]
                                  : 0
                                : a[l - 1]) % 10 & 1 ||
                      n == (e.s < 0
                          ? 8
                          : 7)),
              r < 1 || !a[0]
          ) {
            return a.length = 0,
              t
                ? (r -= e.e + 1, a[0] = h[(j - r % j) % j], e.e = -r || 0)
                : a[0] = e.e = 0,
              e;
          }
          if (
            0 == o
              ? (a.length = l, f = 1, l--)
              : (a.length = l + 1,
                f = h[j - o],
                a[l] = 0 < s ? G(u / h[i - s] % h[s]) * f : 0), t
          ) {
            for (;;) {
              if (0 == l) {
                for (o = 1, s = a[0]; 10 <= s; s /= 10, o++);
                for (s = a[0] += f, f = 1; 10 <= s; s /= 10, f++);
                o != f && (e.e++, a[0] == q && (a[0] = 1));
                break;
              }
              if (a[l] += f, a[l] != q) break;
              a[l--] = 0, f = 1;
            }
          }
          for (o = a.length; 0 === a[--o]; a.pop());
        }
        e.e > b ? e.c = e.e = null : e.e < y && (e.c = [e.e = 0]);
      }
      return e;
    }
    function T(e) {
      var r, n = e.e;
      return null === n
        ? e.toString()
        : (r = X(e.c),
          r = n <= p || O <= n ? K(r, n) : Q(r, n, "0"),
          e.s < 0 ? "-" + r : r);
    }
    return _.clone = e,
      _.ROUND_UP = 0,
      _.ROUND_DOWN = 1,
      _.ROUND_CEIL = 2,
      _.ROUND_FLOOR = 3,
      _.ROUND_HALF_UP = 4,
      _.ROUND_HALF_DOWN = 5,
      _.ROUND_HALF_EVEN = 6,
      _.ROUND_HALF_CEIL = 7,
      _.ROUND_HALF_FLOOR = 8,
      _.EUCLID = 9,
      _.config = _.set = function (e) {
        var r, n;
        if (null != e) {
          if ("object" != typeof e) throw Error(k + "Object expected: " + e);
          if (
            e.hasOwnProperty(r = "DECIMAL_PLACES") &&
            (J(n = e[r], 0, V, r), v = n),
              e.hasOwnProperty(r = "ROUNDING_MODE") &&
              (J(n = e[r], 0, 8, r), N = n),
              e.hasOwnProperty(r = "EXPONENTIAL_AT") &&
              ((n = e[r]) && n.pop
                ? (J(n[0], -V, 0, r), J(n[1], 0, V, r), p = n[0], O = n[1])
                : (J(n, -V, V, r), p = -(O = n < 0 ? -n : n))),
              e.hasOwnProperty(r = "RANGE")
          ) {
            if ((n = e[r]) && n.pop) {
              J(n[0], -V, -1, r), J(n[1], 1, V, r), y = n[0], b = n[1];
            } else {
              if (J(n, -V, V, r), !n) {
                throw Error(k + r + " cannot be zero: " + n);
              }
              y = -(b = n < 0 ? -n : n);
            }
          }
          if (e.hasOwnProperty(r = "CRYPTO")) {
            if ((n = e[r]) !== !!n) {
              throw Error(k + r + " not true or false: " + n);
            }
            if (n) {
              if (
                "undefined" == typeof crypto || !crypto ||
                !crypto.getRandomValues && !crypto.randomBytes
              ) {
                throw E = !n, Error(k + "crypto unavailable");
              }
              E = n;
            } else E = n;
          }
          if (
            e.hasOwnProperty(r = "MODULO_MODE") &&
            (J(n = e[r], 0, 9, r), o = n),
              e.hasOwnProperty(r = "POW_PRECISION") &&
              (J(n = e[r], 0, V, r), A = n),
              e.hasOwnProperty(r = "FORMAT")
          ) {
            if ("object" != typeof (n = e[r])) {
              throw Error(k + r + " not an object: " + n);
            }
            S = n;
          }
          if (e.hasOwnProperty(r = "ALPHABET")) {
            if (
              "string" != typeof (n = e[r]) || /^.?$|[+\-.\s]|(.).*\1/.test(n)
            ) {
              throw Error(k + r + " invalid: " + n);
            }
            R = n;
          }
        }
        return {
          DECIMAL_PLACES: v,
          ROUNDING_MODE: N,
          EXPONENTIAL_AT: [p, O],
          RANGE: [y, b],
          CRYPTO: E,
          MODULO_MODE: o,
          POW_PRECISION: A,
          FORMAT: S,
          ALPHABET: R,
        };
      },
      _.isBigNumber = function (e) {
        if (!e || !0 !== e._isBigNumber) return !1;
        if (!_.DEBUG) return !0;
        var r, n, t = e.c, i = e.e, o = e.s;
        e:
        if ("[object Array]" == {}.toString.call(t)) {
          if ((1 === o || -1 === o) && -V <= i && i <= V && i === G(i)) {
            if (0 === t[0]) {
              if (0 === i && 1 === t.length) return !0;
              break e;
            }
            if ((r = (i + 1) % j) < 1 && (r += j), String(t[0]).length == r) {
              for (r = 0; r < t.length; r++) {
                if ((n = t[r]) < 0 || q <= n || n !== G(n)) break e;
              }
              if (0 !== n) return !0;
            }
          }
        } else if (
          null === t && null === i && (null === o || 1 === o || -1 === o)
        ) {
          return !0;
        }
        throw Error(k + "Invalid BigNumber: " + e);
      },
      _.maximum = _.max = function () {
        return L(arguments, t.lt);
      },
      _.minimum = _.min = function () {
        return L(arguments, t.gt);
      },
      _.random = (n = 9007199254740992,
        l = Math.random() * n & 2097151
          ? function () {
            return G(Math.random() * n);
          }
          : function () {
            return 8388608 * (1073741824 * Math.random() | 0) +
              (8388608 * Math.random() | 0);
          },
        function (e) {
          var r, n, t, i, o, s = 0, f = [], u = new _(w);
          if (
            null == e ? e = v : J(e, 0, V), i = M(e / j), E
          ) {
            if (crypto.getRandomValues) {
              for (
                r = crypto.getRandomValues(new Uint32Array(i *= 2));
                s < i;
              ) {
                9e15 <= (o = 131072 * r[s] + (r[s + 1] >>> 11))
                  ? (n = crypto.getRandomValues(new Uint32Array(2)),
                    r[s] = n[0],
                    r[s + 1] = n[1])
                  : (f.push(o % 1e14), s += 2);
              }
              s = i / 2;
            } else {
              if (!crypto.randomBytes) {
                throw E = !1, Error(k + "crypto unavailable");
              }
              for (r = crypto.randomBytes(i *= 7); s < i;) {
                9e15 <=
                    (o = 281474976710656 * (31 & r[s]) +
                      1099511627776 * r[s + 1] + 4294967296 * r[s + 2] +
                      16777216 * r[s + 3] + (r[s + 4] << 16) + (r[s + 5] << 8) +
                      r[s + 6])
                  ? crypto.randomBytes(7).copy(r, s)
                  : (f.push(o % 1e14), s += 7);
              }
              s = i / 7;
            }
          }
          if (!E) {
            for (; s < i;) {
              (o = l()) < 9e15 && (f[s++] = o % 1e14);
            }
          }
          for (
            i = f[--s], e %= j, i && e && (o = z[j - e], f[s] = G(i / o) * o);
            0 === f[s];
            f.pop(), s--
          );
          if (s < 0) f = [t = 0];
          else {
            for (t = -1; 0 === f[0]; f.splice(0, 1), t -= j);
            for (s = 1, o = f[0]; 10 <= o; o /= 10, s++);
            s < j && (t -= j - s);
          }
          return u.e = t, u.c = f, u;
        }),
      _.sum = function () {
        for (var e = 1, r = arguments, n = new _(r[0]); e < r.length;) {
          n = n.plus(r[e++]);
        }
        return n;
      },
      m = "0123456789",
      a = function (e, r, n, t, i) {
        var o, s, f, u, l, c, a, h, g = e.indexOf("."), p = v, w = N;
        for (
          0 <= g &&
          (u = A,
            A = 0,
            e = e.replace(".", ""),
            c = (h = new _(r)).pow(e.length - g),
            A = u,
            h.c = B(Q(X(c.c), c.e, "0"), 10, n, m),
            h.e = h.c.length),
            f = u = (a = B(
              e,
              r,
              n,
              i ? (o = R, m) : (o = m, R),
            )).length;
          0 == a[--u];
          a.pop()
        );
        if (!a[0]) return o.charAt(0);
        if (
          g < 0
            ? --f
            : (c.c = a,
              c.e = f,
              c.s = t,
              a = (c = d(c, h, p, w, n)).c,
              l = c.r,
              f = c.e),
            g = a[s = f + p + 1],
            u = n / 2,
            l = l || s < 0 || null != a[s + 1],
            l = w < 4 ? (null != g || l) && (0 == w || w == (c.s < 0 ? 3 : 2))
            : u < g ||
              g == u &&
                (4 == w || l || 6 == w && 1 & a[s - 1] ||
                  w == (c.s < 0 ? 8 : 7)),
            s < 1 || !a[0]
        ) {
          e = l ? Q(o.charAt(1), -p, o.charAt(0)) : o.charAt(0);
        } else {
          if (a.length = s, l) {
            for (--n; ++a[--s] > n;) a[s] = 0, s || (++f, a = [1].concat(a));
          }
          for (u = a.length; !a[--u];);
          for (g = 0, e = ""; g <= u; e += o.charAt(a[g++]));
          e = Q(e, f, o.charAt(0));
        }
        return e;
      },
      d = function (e, r, n, t, i) {
        var o,
          s,
          f,
          u,
          l,
          c,
          a,
          h,
          g,
          p,
          w,
          d,
          m,
          v,
          N,
          O,
          y,
          b = e.s == r.s ? 1 : -1,
          E = e.c,
          A = r.c;
        if (!(E && E[0] && A && A[0])) {
          return new _(
            e.s && r.s && (E ? !A || E[0] != A[0] : A)
              ? E && 0 == E[0] || !A ? 0 * b : b / 0 : NaN,
          );
        }
        for (
          g = (h = new _(b)).c = [],
            b = n + (s = e.e - r.e) + 1,
            i || (i = q, s = W(e.e / j) - W(r.e / j), b = b / j | 0),
            f = 0;
          A[f] == (E[f] || 0);
          f++
        );
        if (A[f] > (E[f] || 0) && s--, b < 0) g.push(1), u = !0;
        else {
          for (
            v = E.length,
              O = A.length,
              b += 2,
              1 < (l = G(i / (A[f = 0] + 1))) &&
              (A = D(A, l, i), E = D(E, l, i), O = A.length, v = E.length),
              m = O,
              w = (p = E.slice(0, O)).length;
            w < O;
            p[w++] = 0
          );
          y = A.slice(), y = [0].concat(y), N = A[0], A[1] >= i / 2 && N++;
          do {
            if (l = 0, (o = P(A, p, O, w)) < 0) {
              if (
                d = p[0],
                  O != w && (d = d * i + (p[1] || 0)),
                  1 < (l = G(d / N))
              ) {
                for (
                  i <= l && (l = i - 1),
                    a = (c = D(A, l, i)).length,
                    w = p.length;
                  1 == P(c, p, a, w);
                ) {
                  l--, x(c, O < a ? y : A, a, i), a = c.length, o = 1;
                }
              } else 0 == l && (o = l = 1), a = (c = A.slice()).length;
              if (
                a < w && (c = [0].concat(c)),
                  x(p, c, w, i),
                  w = p.length,
                  -1 == o
              ) {
                for (; P(A, p, O, w) < 1;) {
                  l++, x(p, O < w ? y : A, w, i), w = p.length;
                }
              }
            } else 0 === o && (l++, p = [0]);
            g[f++] = l, p[0] ? p[w++] = E[m] || 0 : (p = [E[m]], w = 1);
          } while ((m++ < v || null != p[0]) && b--);
          u = null != p[0], g[0] || g.splice(0, 1);
        }
        if (i == q) {
          for (f = 1, b = g[0]; 10 <= b; b /= 10, f++);
          I(h, n + (h.e = f + s * j - 1) + 1, t, u);
        } else h.e = s, h.r = +u;
        return h;
      },
      s = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
      f = /^([^.]+)\.$/,
      u = /^\.([^.]+)$/,
      c = /^-?(Infinity|NaN)$/,
      g = /^\s*\+(?=[\w.])|^\s+|\s+$/g,
      h = function (e, r, n, t) {
        var i, o = n ? r : r.replace(g, "");
        if (c.test(o)) e.s = isNaN(o) ? null : o < 0 ? -1 : 1;
        else {
          if (
            !n && (o = o.replace(s, function (e, r, n) {
              return i = "x" == (n = n.toLowerCase()) ? 16 : "b" == n ? 2 : 8,
                t && t != i ? e : r;
            }),
              t && (i = t, o = o.replace(f, "$1").replace(u, "0.$1")),
              r != o)
          ) {
            return new _(o, i);
          }
          if (_.DEBUG) {
            throw Error(
              k + "Not a" + (t ? " base " + t : "") + " number: " + r,
            );
          }
          e.s = null;
        }
        e.c = e.e = null;
      },
      t.absoluteValue = t.abs = function () {
        var e = new _(this);
        return e.s < 0 && (e.s = 1), e;
      },
      t.comparedTo = function (e, r) {
        return Y(this, new _(e, r));
      },
      t.decimalPlaces = t.dp = function (e, r) {
        var n, t, i;
        if (null != e) {
          return J(e, 0, V),
            null == r ? r = N : J(r, 0, 8),
            I(new _(this), e + this.e + 1, r);
        }
        if (!(n = this.c)) return null;
        if (t = ((i = n.length - 1) - W(this.e / j)) * j, i = n[i]) {
          for (
            ;
            i % 10 == 0;
            i /= 10, t--
          );
        }
        return t < 0 && (t = 0), t;
      },
      t.dividedBy = t.div = function (e, r) {
        return d(this, new _(e, r), v, N);
      },
      t.dividedToIntegerBy = t.idiv = function (e, r) {
        return d(this, new _(e, r), 0, 1);
      },
      t.exponentiatedBy = t.pow = function (e, r) {
        var n, t, i, o, s, f, u, l, c = this;
        if ((e = new _(e)).c && !e.isInteger()) {
          throw Error(
            k + "Exponent not an integer: " + T(e),
          );
        }
        if (
          null != r && (r = new _(r)),
            s = 14 < e.e,
            !c.c || !c.c[0] || 1 == c.c[0] && !c.e && 1 == c.c.length || !e.c ||
            !e.c[0]
        ) {
          return l = new _(Math.pow(+T(c), s ? 2 - Z(e) : +T(e))),
            r ? l.mod(r) : l;
        }
        if (f = e.s < 0, r) {
          if (r.c ? !r.c[0] : !r.s) return new _(NaN);
          (t = !f && c.isInteger() && r.isInteger()) && (c = c.mod(r));
        } else {
          if (
            9 < e.e && (0 < c.e || c.e < -1 || (0 == c.e
              ? 1 < c.c[0] || s && 24e7 <= c.c[1]
              : c.c[0] < 8e13 || s && c.c[0] <= 9999975e7))
          ) {
            return o = c.s < 0 && Z(e) ? -0 : 0,
              -1 < c.e && (o = 1 / o),
              new _(f ? 1 / o : o);
          }
          A && (o = M(A / j + 2));
        }
        for (
          u = s
            ? (n = new _(.5), f && (e.s = 1), Z(e))
            : (i = Math.abs(+T(e))) % 2, l = new _(w);;
        ) {
          if (u) {
            if (!(l = l.times(c)).c) break;
            o ? l.c.length > o && (l.c.length = o) : t && (l = l.mod(r));
          }
          if (i) {
            if (0 === (i = G(i / 2))) break;
            u = i % 2;
          } else if (I(e = e.times(n), e.e + 1, 1), 14 < e.e) u = Z(e);
          else {
            if (0 == (i = +T(e))) break;
            u = i % 2;
          }
          c = c.times(c),
            o ? c.c && c.c.length > o && (c.c.length = o) : t && (c = c.mod(r));
        }
        return t ? l
        : (f && (l = w.div(l)), r ? l.mod(r) : o ? I(l, A, N, void 0) : l);
      },
      t.integerValue = function (e) {
        var r = new _(this);
        return null == e ? e = N : J(e, 0, 8), I(r, r.e + 1, e);
      },
      t.isEqualTo = t.eq = function (e, r) {
        return 0 === Y(this, new _(e, r));
      },
      t.isFinite = function () {
        return !!this.c;
      },
      t.isGreaterThan = t.gt = function (e, r) {
        return 0 < Y(this, new _(e, r));
      },
      t.isGreaterThanOrEqualTo = t.gte = function (e, r) {
        return 1 === (r = Y(this, new _(e, r))) || 0 === r;
      },
      t.isInteger = function () {
        return !!this.c && W(this.e / j) > this.c.length - 2;
      },
      t.isLessThan = t.lt = function (e, r) {
        return Y(this, new _(e, r)) < 0;
      },
      t.isLessThanOrEqualTo = t.lte = function (e, r) {
        return -1 === (r = Y(this, new _(e, r))) || 0 === r;
      },
      t.isNaN = function () {
        return !this.s;
      },
      t.isNegative = function () {
        return this.s < 0;
      },
      t.isPositive = function () {
        return 0 < this.s;
      },
      t.isZero = function () {
        return !!this.c && 0 == this.c[0];
      },
      t.minus = function (e, r) {
        var n, t, i, o, s = this, f = s.s;
        if (r = (e = new _(e, r)).s, !f || !r) return new _(NaN);
        if (f != r) return e.s = -r, s.plus(e);
        var u = s.e / j, l = e.e / j, c = s.c, a = e.c;
        if (!u || !l) {
          if (!c || !a) return c ? (e.s = -r, e) : new _(a ? s : NaN);
          if (!c[0] || !a[0]) {
            return a[0] ? (e.s = -r, e) : new _(c[0] ? s : 3 == N ? -0 : 0);
          }
        }
        if (u = W(u), l = W(l), c = c.slice(), f = u - l) {
          for (
            (i = (o = f < 0) ? (f = -f, c) : (l = u, a)).reverse(), r = f;
            r--;
            i.push(0)
          );
          i.reverse();
        } else {
          for (
            t = (o = (f = c.length) < (r = a.length)) ? f : r, f = r = 0;
            r < t;
            r++
          ) {
            if (c[r] != a[r]) {
              o = c[r] < a[r];
              break;
            }
          }
        }
        if (
          o && (i = c, c = a, a = i, e.s = -e.s),
            0 < (r = (t = a.length) - (n = c.length))
        ) {
          for (; r--; c[n++] = 0);
        }
        for (r = q - 1; f < t;) {
          if (c[--t] < a[t]) {
            for (n = t; n && !c[--n]; c[n] = r);
            --c[n], c[t] += q;
          }
          c[t] -= a[t];
        }
        for (; 0 == c[0]; c.splice(0, 1), --l);
        return c[0] ? U(e, c, l) : (e.s = 3 == N ? -1 : 1, e.c = [e.e = 0], e);
      },
      t.modulo = t.mod = function (e, r) {
        var n, t, i = this;
        return e = new _(e, r),
          !i.c || !e.s || e.c && !e.c[0]
            ? new _(NaN)
            : !e.c || i.c && !i.c[0]
            ? new _(i)
            : (9 == o
              ? (t = e.s, e.s = 1, n = d(i, e, 0, 3), e.s = t, n.s *= t)
              : n = d(i, e, 0, o),
              (e = i.minus(n.times(e))).c[0] || 1 != o || (e.s = i.s),
              e);
      },
      t.multipliedBy = t.times = function (e, r) {
        var n,
          t,
          i,
          o,
          s,
          f,
          u,
          l,
          c,
          a,
          h,
          g,
          p,
          w,
          d,
          m = this,
          v = m.c,
          N = (e = new _(e, r)).c;
        if (!(v && N && v[0] && N[0])) {
          return !m.s || !e.s || v && !v[0] && !N || N && !N[0] && !v
            ? e.c = e.e = e.s = null
            : (e.s *= m.s, v && N ? (e.c = [0], e.e = 0) : e.c = e.e = null),
            e;
        }
        for (
          t = W(m.e / j) + W(e.e / j),
            e.s *= m.s,
            (u = v.length) < (a = N.length) &&
            (p = v, v = N, N = p, i = u, u = a, a = i),
            i = u + a,
            p = [];
          i--;
          p.push(0)
        );
        for (w = q, d = H, i = a; 0 <= --i;) {
          for (n = 0, h = N[i] % d, g = N[i] / d | 0, o = i + (s = u); i < o;) {
            n = ((l = h * (l = v[--s] % d) +
                  (f = g * l + (c = v[s] / d | 0) * h) % d * d + p[o] + n) /
                w | 0) + (f / d | 0) + g * c, p[o--] = l % w;
          }
          p[o] = n;
        }
        return n ? ++t : p.splice(0, 1), U(e, p, t);
      },
      t.negated = function () {
        var e = new _(this);
        return e.s = -e.s || null, e;
      },
      t.plus = function (e, r) {
        var n, t = this, i = t.s;
        if (r = (e = new _(e, r)).s, !i || !r) return new _(NaN);
        if (i != r) return e.s = -r, t.minus(e);
        var o = t.e / j, s = e.e / j, f = t.c, u = e.c;
        if (!o || !s) {
          if (!f || !u) return new _(i / 0);
          if (!f[0] || !u[0]) return u[0] ? e : new _(f[0] ? t : 0 * i);
        }
        if (o = W(o), s = W(s), f = f.slice(), i = o - s) {
          for (
            (n = 0 < i ? (s = o, u) : (i = -i, f)).reverse();
            i--;
            n.push(0)
          );
          n.reverse();
        }
        for (
          (i = f.length) - (r = u.length) < 0 && (n = u, u = f, f = n, r = i),
            i = 0;
          r;
        ) {
          i = (f[--r] = f[r] + u[r] + i) / q | 0,
            f[r] = q === f[r] ? 0 : f[r] % q;
        }
        return i && (f = [i].concat(f), ++s), U(e, f, s);
      },
      t.precision = t.sd = function (e, r) {
        var n, t, i;
        if (null != e && e !== !!e) {
          return J(e, 1, V),
            null == r ? r = N : J(r, 0, 8),
            I(new _(this), e, r);
        }
        if (!(n = this.c)) return null;
        if (t = (i = n.length - 1) * j + 1, i = n[i]) {
          for (; i % 10 == 0; i /= 10, t--);
          for (i = n[0]; 10 <= i; i /= 10, t++);
        }
        return e && this.e + 1 > t && (t = this.e + 1), t;
      },
      t.shiftedBy = function (e) {
        return J(e, -$, $), this.times("1e" + e);
      },
      t.squareRoot = t.sqrt = function () {
        var e,
          r,
          n,
          t,
          i,
          o = this,
          s = o.c,
          f = o.s,
          u = o.e,
          l = v + 4,
          c = new _("0.5");
        if (1 !== f || !s || !s[0]) {
          return new _(!f || f < 0 && (!s || s[0]) ? NaN : s ? o : 1 / 0);
        }
        if (
          (n = 0 == (f = Math.sqrt(+T(o))) || f == 1 / 0
            ? (((r = X(s)).length + u) % 2 == 0 && (r += "0"),
              f = Math.sqrt(+r),
              u = W((u + 1) / 2) - (u < 0 || u % 2),
              new _(
                r = f == 1 / 0 ? "5e" + u
                : (r = f.toExponential()).slice(0, r.indexOf("e") + 1) + u,
              ))
            : new _(f + "")).c[0]
        ) {
          for ((f = (u = n.e) + l) < 3 && (f = 0);;) {
            if (
              i = n,
                n = c.times(i.plus(d(o, i, l, 1))),
                X(i.c).slice(0, f) === (r = X(n.c)).slice(0, f)
            ) {
              if (
                n.e < u && --f,
                  "9999" != (r = r.slice(f - 3, f + 1)) && (t || "4999" != r)
              ) {
                +r && (+r.slice(1) || "5" != r.charAt(0)) ||
                  (I(n, n.e + v + 2, 1), e = !n.times(n).eq(o));
                break;
              }
              if (!t && (I(i, i.e + v + 2, 0), i.times(i).eq(o))) {
                n = i;
                break;
              }
              l += 4, f += 4, t = 1;
            }
          }
        }
        return I(n, n.e + v + 1, N, e);
      },
      t.toExponential = function (e, r) {
        return null != e && (J(e, 0, V), e++), i(this, e, r, 1);
      },
      t.toFixed = function (e, r) {
        return null != e && (J(e, 0, V), e = e + this.e + 1), i(this, e, r);
      },
      t.toFormat = function (e, r, n) {
        var t;
        if (null == n) {
          null != e && r && "object" == typeof r ? (n = r, r = null)
          : e && "object" == typeof e
            ? (n = e, e = r = null)
            : n = S;
        } else if ("object" != typeof n) {
          throw Error(
            k + "Argument not an object: " + n,
          );
        }
        if (t = this.toFixed(e, r), this.c) {
          var i,
            o = t.split("."),
            s = +n.groupSize,
            f = +n.secondaryGroupSize,
            u = n.groupSeparator || "",
            l = o[0],
            c = o[1],
            a = this.s < 0,
            h = a ? l.slice(1) : l,
            g = h.length;
          if (f && (i = s, s = f, g -= f = i), 0 < s && 0 < g) {
            for (i = g % s || s, l = h.substr(0, i); i < g; i += s) {
              l += u +
                h.substr(i, s);
            }
            0 < f && (l += u + h.slice(i)), a && (l = "-" + l);
          }
          t = c
            ? l + (n.decimalSeparator || "") +
              ((f = +n.fractionGroupSize)
                ? c.replace(
                  new RegExp("\\d{" + f + "}\\B", "g"),
                  "$&" + (n.fractionGroupSeparator || ""),
                )
                : c)
            : l;
        }
        return (n.prefix || "") + t + (n.suffix || "");
      },
      t.toFraction = function (e) {
        var r, n, t, i, o, s, f, u, l, c, a, h, g = this, p = g.c;
        if (
          null != e &&
          (!(f = new _(e)).isInteger() && (f.c || 1 !== f.s) || f.lt(w))
        ) {
          throw Error(
            k + "Argument " + (f.isInteger()
              ? "out of range: "
              : "not an integer: ") +
              T(f),
          );
        }
        if (!p) return new _(g);
        for (
          r = new _(w),
            l = n = new _(w),
            t = u = new _(w),
            h = X(p),
            o = r.e = h.length - g.e - 1,
            r.c[0] = z[(s = o % j) < 0 ? j + s : s],
            e = !e || 0 < f.comparedTo(r) ? 0 < o ? r : l : f,
            s = b,
            b = 1 / 0,
            f = new _(h),
            u.c[0] = 0;
          c = d(f, r, 0, 1), 1 != (i = n.plus(c.times(t))).comparedTo(e);
        ) {
          n = t,
            t = i,
            l = u.plus(c.times(i = l)),
            u = i,
            r = f.minus(c.times(i = r)),
            f = i;
        }
        return i = d(e.minus(n), t, 0, 1),
          u = u.plus(i.times(l)),
          n = n.plus(i.times(t)),
          u.s = l.s = g.s,
          a = d(l, t, o *= 2, N).minus(g).abs().comparedTo(
              d(u, n, o, N).minus(g).abs(),
            ) < 1
            ? [l, t]
            : [u, n],
          b = s,
          a;
      },
      t.toNumber = function () {
        return +T(this);
      },
      t.toPrecision = function (e, r) {
        return null != e && J(e, 1, V), i(this, e, r, 2);
      },
      t.toString = function (e) {
        var r, n = this, t = n.s, i = n.e;
        return null === i
          ? t ? (r = "Infinity", t < 0 && (r = "-" + r)) : r = "NaN"
          : (r = null == e
            ? i <= p || O <= i ? K(X(n.c), i) : Q(X(n.c), i, "0")
            : 10 === e
            ? Q(X((n = I(new _(n), v + i + 1, N)).c), n.e, "0")
            : (J(e, 2, R.length, "Base"), a(Q(X(n.c), i, "0"), 10, e, t, !0)),
            t < 0 && n.c[0] && (r = "-" + r)),
          r;
      },
      t.valueOf = t.toJSON = function () {
        return T(this);
      },
      t._isBigNumber = !0,
      null != r && _.set(r),
      _;
  }()).default = r.BigNumber = r,
    "function" == typeof define && define.amd
      ? define(function () {
        return r;
      })
      : "undefined" != typeof module && module.exports
      ? module.exports = r
      : (e = e || ("undefined" != typeof self && self ? self : window))
        .BigNumber = r;
}(this);
