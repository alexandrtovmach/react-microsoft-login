!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 12));
})([
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function() {
      function e() {}
      return (
        (e.compareObjects = function(e, t) {
          return (
            !(!e || !t) &&
            !(
              !e.userIdentifier ||
              !t.userIdentifier ||
              e.userIdentifier !== t.userIdentifier
            )
          );
        }),
        (e.expiresIn = function(e) {
          return e || (e = "3599"), this.now() + parseInt(e, 10);
        }),
        (e.now = function() {
          return Math.round(new Date().getTime() / 1e3);
        }),
        (e.isEmpty = function(e) {
          return void 0 === e || !e || 0 === e.length;
        }),
        (e.extractIdToken = function(e) {
          var t = this.decodeJwt(e);
          if (!t) return null;
          try {
            var n = t.JWSPayload,
              r = this.base64DecodeStringUrlSafe(n);
            return r ? JSON.parse(r) : null;
          } catch (e) {}
          return null;
        }),
        (e.base64EncodeStringUrlSafe = function(e) {
          return window.btoa ? window.btoa(e) : this.encode(e);
        }),
        (e.base64DecodeStringUrlSafe = function(e) {
          return (
            (e = e.replace(/-/g, "+").replace(/_/g, "/")),
            window.atob
              ? decodeURIComponent(encodeURIComponent(window.atob(e)))
              : decodeURIComponent(encodeURIComponent(this.decode(e)))
          );
        }),
        (e.encode = function(e) {
          var t,
            n,
            r,
            o,
            i,
            a,
            l,
            s =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            u = "",
            c = 0;
          for (e = this.utf8Encode(e); c < e.length; )
            (o = (t = e.charCodeAt(c++)) >> 2),
              (i = ((3 & t) << 4) | ((n = e.charCodeAt(c++)) >> 4)),
              (a = ((15 & n) << 2) | ((r = e.charCodeAt(c++)) >> 6)),
              (l = 63 & r),
              isNaN(n) ? (a = l = 64) : isNaN(r) && (l = 64),
              (u = u + s.charAt(o) + s.charAt(i) + s.charAt(a) + s.charAt(l));
          return u
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
        }),
        (e.utf8Encode = function(e) {
          e = e.replace(/\r\n/g, "\n");
          for (var t = "", n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            r < 128
              ? (t += String.fromCharCode(r))
              : r > 127 && r < 2048
                ? ((t += String.fromCharCode((r >> 6) | 192)),
                  (t += String.fromCharCode((63 & r) | 128)))
                : ((t += String.fromCharCode((r >> 12) | 224)),
                  (t += String.fromCharCode(((r >> 6) & 63) | 128)),
                  (t += String.fromCharCode((63 & r) | 128)));
          }
          return t;
        }),
        (e.decode = function(e) {
          var t =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            n = (e = String(e).replace(/=+$/, "")).length;
          if (n % 4 == 1)
            throw new Error(
              "The token to be decoded is not correctly encoded."
            );
          for (var r, o, i, a, l, s, u, c, d = "", f = 0; f < n; f += 4) {
            if (
              ((r = t.indexOf(e.charAt(f))),
              (o = t.indexOf(e.charAt(f + 1))),
              (i = t.indexOf(e.charAt(f + 2))),
              (a = t.indexOf(e.charAt(f + 3))),
              f + 2 === n - 1)
            ) {
              (s = ((l = (r << 18) | (o << 12) | (i << 6)) >> 16) & 255),
                (u = (l >> 8) & 255),
                (d += String.fromCharCode(s, u));
              break;
            }
            if (f + 1 === n - 1) {
              (s = ((l = (r << 18) | (o << 12)) >> 16) & 255),
                (d += String.fromCharCode(s));
              break;
            }
            (s = ((l = (r << 18) | (o << 12) | (i << 6) | a) >> 16) & 255),
              (u = (l >> 8) & 255),
              (c = 255 & l),
              (d += String.fromCharCode(s, u, c));
          }
          return d;
        }),
        (e.decodeJwt = function(e) {
          if (this.isEmpty(e)) return null;
          var t = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/.exec(e);
          return !t || t.length < 4
            ? null
            : { header: t[1], JWSPayload: t[2], JWSSig: t[3] };
        }),
        (e.deserialize = function(e) {
          var t,
            n = /\+/g,
            r = /([^&=]+)=([^&]*)/g,
            o = function(e) {
              return decodeURIComponent(e.replace(n, " "));
            },
            i = {};
          for (t = r.exec(e); t; ) (i[o(t[1])] = o(t[2])), (t = r.exec(e));
          return i;
        }),
        (e.isIntersectingScopes = function(e, t) {
          e = this.convertToLowerCase(e);
          for (var n = 0; n < t.length; n++)
            if (e.indexOf(t[n].toLowerCase()) > -1) return !0;
          return !1;
        }),
        (e.containsScope = function(e, t) {
          return (
            (e = this.convertToLowerCase(e)),
            t.every(function(t) {
              return e.indexOf(t.toString().toLowerCase()) >= 0;
            })
          );
        }),
        (e.convertToLowerCase = function(e) {
          return e.map(function(e) {
            return e.toLowerCase();
          });
        }),
        (e.removeElement = function(e, t) {
          return e.filter(function(e) {
            return e !== t;
          });
        }),
        (e.decimalToHex = function(e) {
          for (var t = e.toString(16); t.length < 2; ) t = "0" + t;
          return t;
        }),
        (e.getLibraryVersion = function() {
          return "0.2.3";
        }),
        (e.replaceFirstPath = function(t, n) {
          if (
            t.match(
              /^(https?\:)\/\/(([^:\/?#] *)(?:\:([0-9]+))?)([\/]{0,1}[^?#] *)(\?[^#] *|)(#. *|)$/
            )
          ) {
            var r = e.GetUrlComponents(t),
              o = r.PathSegments;
            o.shift(),
              ((o[0] && "common" === o[0]) || "organizations" === o[0]) &&
                ((o[0] = n),
                (t =
                  r.Protocol + "//" + r.HostNameAndPort + "/" + o.join("/")));
          }
          return t;
        }),
        (e.createNewGuid = function() {
          var t = window.crypto;
          if (t && t.getRandomValues) {
            var n = new Uint8Array(16);
            return (
              t.getRandomValues(n),
              (n[6] |= 64),
              (n[6] &= 79),
              (n[8] |= 128),
              (n[8] &= 191),
              e.decimalToHex(n[0]) +
                e.decimalToHex(n[1]) +
                e.decimalToHex(n[2]) +
                e.decimalToHex(n[3]) +
                "-" +
                e.decimalToHex(n[4]) +
                e.decimalToHex(n[5]) +
                "-" +
                e.decimalToHex(n[6]) +
                e.decimalToHex(n[7]) +
                "-" +
                e.decimalToHex(n[8]) +
                e.decimalToHex(n[9]) +
                "-" +
                e.decimalToHex(n[10]) +
                e.decimalToHex(n[11]) +
                e.decimalToHex(n[12]) +
                e.decimalToHex(n[13]) +
                e.decimalToHex(n[14]) +
                e.decimalToHex(n[15])
            );
          }
          for (
            var r = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
              o = "0123456789abcdef",
              i = 0,
              a = "",
              l = 0;
            l < 36;
            l++
          )
            "-" !== r[l] && "4" !== r[l] && (i = (16 * Math.random()) | 0),
              "x" === r[l]
                ? (a += o[i])
                : "y" === r[l]
                  ? ((i &= 3), (a += o[(i |= 8)]))
                  : (a += r[l]);
          return a;
        }),
        (e.GetUrlComponents = function(e) {
          if (!e) throw "Url required";
          var t = RegExp(
              "^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?"
            ),
            n = e.match(t);
          if (!n || n.length < 6) throw "Valid url required";
          var r = { Protocol: n[1], HostNameAndPort: n[4], AbsolutePath: n[5] },
            o = r.AbsolutePath.split("/");
          return (
            (o = o.filter(function(e) {
              return e && e.length > 0;
            })),
            (r.PathSegments = o),
            r
          );
        }),
        (e.CanonicalizeUri = function(t) {
          return (
            t && (t = t.toLowerCase()),
            t && !e.endsWith(t, "/") && (t += "/"),
            t
          );
        }),
        (e.endsWith = function(e, t) {
          return !(!e || !t) && -1 !== e.indexOf(t, e.length - t.length);
        }),
        e
      );
    })();
    t.Utils = r;
  },
  function(e, t, n) {
    "use strict";
    e.exports = n(13);
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(0),
      o = n(6),
      i = n(11);
    !(function(e) {
      (e[(e.Aad = 0)] = "Aad"),
        (e[(e.Adfs = 1)] = "Adfs"),
        (e[(e.B2C = 2)] = "B2C");
    })(t.AuthorityType || (t.AuthorityType = {}));
    var a = (function() {
      function e(e, t) {
        (this.IsValidationEnabled = t),
          (this.CanonicalAuthority = e),
          this.validateAsUri();
      }
      return (
        Object.defineProperty(e.prototype, "Tenant", {
          get: function() {
            return this.CanonicalAuthorityUrlComponents.PathSegments[0];
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, "AuthorizationEndpoint", {
          get: function() {
            return (
              this.validateResolved(),
              this.tenantDiscoveryResponse.AuthorizationEndpoint.replace(
                "{tenant}",
                this.Tenant
              )
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, "EndSessionEndpoint", {
          get: function() {
            return (
              this.validateResolved(),
              this.tenantDiscoveryResponse.EndSessionEndpoint.replace(
                "{tenant}",
                this.Tenant
              )
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, "SelfSignedJwtAudience", {
          get: function() {
            return (
              this.validateResolved(),
              this.tenantDiscoveryResponse.Issuer.replace(
                "{tenant}",
                this.Tenant
              )
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.validateResolved = function() {
          if (!this.tenantDiscoveryResponse)
            throw "Please call ResolveEndpointsAsync first";
        }),
        Object.defineProperty(e.prototype, "CanonicalAuthority", {
          get: function() {
            return this.canonicalAuthority;
          },
          set: function(e) {
            (this.canonicalAuthority = r.Utils.CanonicalizeUri(e)),
              (this.canonicalAuthorityUrlComponents = null);
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e.prototype, "CanonicalAuthorityUrlComponents", {
          get: function() {
            return (
              this.canonicalAuthorityUrlComponents ||
                (this.canonicalAuthorityUrlComponents = r.Utils.GetUrlComponents(
                  this.CanonicalAuthority
                )),
              this.canonicalAuthorityUrlComponents
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(
          e.prototype,
          "DefaultOpenIdConfigurationEndpoint",
          {
            get: function() {
              return (
                this.CanonicalAuthority +
                "v2.0/.well-known/openid-configuration"
              );
            },
            enumerable: !0,
            configurable: !0
          }
        ),
        (e.prototype.validateAsUri = function() {
          var e;
          try {
            e = this.CanonicalAuthorityUrlComponents;
          } catch (e) {
            throw o.ErrorMessage.invalidAuthorityType;
          }
          if (!e.Protocol || "https:" !== e.Protocol.toLowerCase())
            throw o.ErrorMessage.authorityUriInsecure;
          if (!e.PathSegments || e.PathSegments.length < 1)
            throw o.ErrorMessage.authorityUriInvalidPath;
        }),
        (e.prototype.DiscoverEndpoints = function(e) {
          return new i.XhrClient()
            .sendRequestAsync(e, "GET", !0)
            .then(function(e) {
              return {
                AuthorizationEndpoint: e.authorization_endpoint,
                EndSessionEndpoint: e.end_session_endpoint,
                Issuer: e.issuer
              };
            });
        }),
        (e.prototype.ResolveEndpointsAsync = function() {
          var e = this,
            t = "";
          return this.GetOpenIdConfigurationEndpointAsync()
            .then(function(n) {
              return (t = n), e.DiscoverEndpoints(t);
            })
            .then(function(t) {
              return (e.tenantDiscoveryResponse = t), e;
            });
        }),
        e
      );
    })();
    t.Authority = a;
  },
  function(e, t, n) {
    "use strict";
    n.r(t),
      n.d(t, "__extends", function() {
        return o;
      }),
      n.d(t, "__assign", function() {
        return i;
      }),
      n.d(t, "__rest", function() {
        return a;
      }),
      n.d(t, "__decorate", function() {
        return l;
      }),
      n.d(t, "__param", function() {
        return s;
      }),
      n.d(t, "__metadata", function() {
        return u;
      }),
      n.d(t, "__awaiter", function() {
        return c;
      }),
      n.d(t, "__generator", function() {
        return d;
      }),
      n.d(t, "__exportStar", function() {
        return f;
      }),
      n.d(t, "__values", function() {
        return p;
      }),
      n.d(t, "__read", function() {
        return h;
      }),
      n.d(t, "__spread", function() {
        return m;
      }),
      n.d(t, "__await", function() {
        return g;
      }),
      n.d(t, "__asyncGenerator", function() {
        return y;
      }),
      n.d(t, "__asyncDelegator", function() {
        return v;
      }),
      n.d(t, "__asyncValues", function() {
        return b;
      });
    /*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
    var r =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(e, t) {
          e.__proto__ = t;
        }) ||
      function(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      };
    function o(e, t) {
      function n() {
        this.constructor = e;
      }
      r(e, t),
        (e.prototype =
          null === t
            ? Object.create(t)
            : ((n.prototype = t.prototype), new n()));
    }
    var i =
      Object.assign ||
      function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var o in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      };
    function a(e, t) {
      var n = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          t.indexOf(r) < 0 &&
          (n[r] = e[r]);
      if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var o = 0;
        for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
          t.indexOf(r[o]) < 0 && (n[r[o]] = e[r[o]]);
      }
      return n;
    }
    function l(e, t, n, r) {
      var o,
        i = arguments.length,
        a =
          i < 3
            ? t
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, n))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(e, t, n, r);
      else
        for (var l = e.length - 1; l >= 0; l--)
          (o = e[l]) &&
            (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
      return i > 3 && a && Object.defineProperty(t, n, a), a;
    }
    function s(e, t) {
      return function(n, r) {
        t(n, r, e);
      };
    }
    function u(e, t) {
      if ("object" == typeof Reflect && "function" == typeof Reflect.metadata)
        return Reflect.metadata(e, t);
    }
    function c(e, t, n, r) {
      return new (n || (n = Promise))(function(o, i) {
        function a(e) {
          try {
            s(r.next(e));
          } catch (e) {
            i(e);
          }
        }
        function l(e) {
          try {
            s(r.throw(e));
          } catch (e) {
            i(e);
          }
        }
        function s(e) {
          e.done
            ? o(e.value)
            : new n(function(t) {
                t(e.value);
              }).then(a, l);
        }
        s((r = r.apply(e, t || [])).next());
      });
    }
    function d(e, t) {
      var n,
        r,
        o,
        i,
        a = {
          label: 0,
          sent: function() {
            if (1 & o[0]) throw o[1];
            return o[1];
          },
          trys: [],
          ops: []
        };
      return (
        (i = { next: l(0), throw: l(1), return: l(2) }),
        "function" == typeof Symbol &&
          (i[Symbol.iterator] = function() {
            return this;
          }),
        i
      );
      function l(i) {
        return function(l) {
          return (function(i) {
            if (n) throw new TypeError("Generator is already executing.");
            for (; a; )
              try {
                if (
                  ((n = 1),
                  r &&
                    (o = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) &&
                    !(o = o.call(r, i[1])).done)
                )
                  return o;
                switch (((r = 0), o && (i = [0, o.value]), i[0])) {
                  case 0:
                  case 1:
                    o = i;
                    break;
                  case 4:
                    return a.label++, { value: i[1], done: !1 };
                  case 5:
                    a.label++, (r = i[1]), (i = [0]);
                    continue;
                  case 7:
                    (i = a.ops.pop()), a.trys.pop();
                    continue;
                  default:
                    if (
                      !(o = (o = a.trys).length > 0 && o[o.length - 1]) &&
                      (6 === i[0] || 2 === i[0])
                    ) {
                      a = 0;
                      continue;
                    }
                    if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                      a.label = i[1];
                      break;
                    }
                    if (6 === i[0] && a.label < o[1]) {
                      (a.label = o[1]), (o = i);
                      break;
                    }
                    if (o && a.label < o[2]) {
                      (a.label = o[2]), a.ops.push(i);
                      break;
                    }
                    o[2] && a.ops.pop(), a.trys.pop();
                    continue;
                }
                i = t.call(e, a);
              } catch (e) {
                (i = [6, e]), (r = 0);
              } finally {
                n = o = 0;
              }
            if (5 & i[0]) throw i[1];
            return { value: i[0] ? i[1] : void 0, done: !0 };
          })([i, l]);
        };
      }
    }
    function f(e, t) {
      for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n]);
    }
    function p(e) {
      var t = "function" == typeof Symbol && e[Symbol.iterator],
        n = 0;
      return t
        ? t.call(e)
        : {
            next: function() {
              return (
                e && n >= e.length && (e = void 0),
                { value: e && e[n++], done: !e }
              );
            }
          };
    }
    function h(e, t) {
      var n = "function" == typeof Symbol && e[Symbol.iterator];
      if (!n) return e;
      var r,
        o,
        i = n.call(e),
        a = [];
      try {
        for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
          a.push(r.value);
      } catch (e) {
        o = { error: e };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }
      return a;
    }
    function m() {
      for (var e = [], t = 0; t < arguments.length; t++)
        e = e.concat(h(arguments[t]));
      return e;
    }
    function g(e) {
      return this instanceof g ? ((this.v = e), this) : new g(e);
    }
    function y(e, t, n) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var r,
        o = n.apply(e, t || []),
        i = [];
      return (
        (r = {}),
        a("next"),
        a("throw"),
        a("return"),
        (r[Symbol.asyncIterator] = function() {
          return this;
        }),
        r
      );
      function a(e) {
        o[e] &&
          (r[e] = function(t) {
            return new Promise(function(n, r) {
              i.push([e, t, n, r]) > 1 || l(e, t);
            });
          });
      }
      function l(e, t) {
        try {
          !(function(e) {
            e.value instanceof g
              ? Promise.resolve(e.value.v).then(s, u)
              : c(i[0][2], e);
          })(o[e](t));
        } catch (e) {
          c(i[0][3], e);
        }
      }
      function s(e) {
        l("next", e);
      }
      function u(e) {
        l("throw", e);
      }
      function c(e, t) {
        e(t), i.shift(), i.length && l(i[0][0], i[0][1]);
      }
    }
    function v(e) {
      var t, n;
      return (
        (t = {}),
        r("next"),
        r("throw", function(e) {
          throw e;
        }),
        r("return"),
        (t[Symbol.iterator] = function() {
          return this;
        }),
        t
      );
      function r(r, o) {
        e[r] &&
          (t[r] = function(t) {
            return (n = !n)
              ? { value: g(e[r](t)), done: "return" === r }
              : o
                ? o(t)
                : t;
          });
      }
    }
    function b(e) {
      if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
      var t = e[Symbol.asyncIterator];
      return t ? t.call(e) : p(e);
    }
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function() {
      function e() {}
      return (
        Object.defineProperty(e, "errorDescription", {
          get: function() {
            return "error_description";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "error", {
          get: function() {
            return "error";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "scope", {
          get: function() {
            return "scope";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "acquireTokenUser", {
          get: function() {
            return "msal.acquireTokenUser";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "clientInfo", {
          get: function() {
            return "client_info";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "clientId", {
          get: function() {
            return "clientId";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "authority", {
          get: function() {
            return "msal.authority";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "idToken", {
          get: function() {
            return "id_token";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "accessToken", {
          get: function() {
            return "access_token";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "expiresIn", {
          get: function() {
            return "expires_in";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "sessionState", {
          get: function() {
            return "session_state";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "msalClientInfo", {
          get: function() {
            return "msal.client.info";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "msalError", {
          get: function() {
            return "msal.error";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "msalErrorDescription", {
          get: function() {
            return "msal.error.description";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "msalSessionState", {
          get: function() {
            return "msal.session.state";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "tokenKeys", {
          get: function() {
            return "msal.token.keys";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "accessTokenKey", {
          get: function() {
            return "msal.access.token.key";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "expirationKey", {
          get: function() {
            return "msal.expiration.key";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "stateLogin", {
          get: function() {
            return "msal.state.login";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "stateAcquireToken", {
          get: function() {
            return "msal.state.acquireToken";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "stateRenew", {
          get: function() {
            return "msal.state.renew";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "nonceIdToken", {
          get: function() {
            return "msal.nonce.idtoken";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "userName", {
          get: function() {
            return "msal.username";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "idTokenKey", {
          get: function() {
            return "msal.idtoken";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "loginRequest", {
          get: function() {
            return "msal.login.request";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "loginError", {
          get: function() {
            return "msal.login.error";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "renewStatus", {
          get: function() {
            return "msal.token.renew.status";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "msal", {
          get: function() {
            return "msal";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "no_user", {
          get: function() {
            return "NO_USER";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "login_hint", {
          get: function() {
            return "login_hint";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "domain_hint", {
          get: function() {
            return "domain_hint";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "sid", {
          get: function() {
            return "sid";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "prompt_select_account", {
          get: function() {
            return "&prompt=select_account";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "prompt_none", {
          get: function() {
            return "&prompt=none";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "response_mode_fragment", {
          get: function() {
            return "&response_mode=fragment";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "resourceDelimeter", {
          get: function() {
            return "|";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "tokenRenewStatusCancelled", {
          get: function() {
            return "Canceled";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "tokenRenewStatusCompleted", {
          get: function() {
            return "Completed";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "tokenRenewStatusInProgress", {
          get: function() {
            return "In Progress";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "popUpWidth", {
          get: function() {
            return this._popUpWidth;
          },
          set: function(e) {
            this._popUpWidth = e;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "popUpHeight", {
          get: function() {
            return this._popUpHeight;
          },
          set: function(e) {
            this._popUpHeight = e;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "login", {
          get: function() {
            return "LOGIN";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "renewToken", {
          get: function() {
            return "RENEW_TOKEN";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "unknown", {
          get: function() {
            return "UNKNOWN";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "urlHash", {
          get: function() {
            return "msal.urlHash";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "angularLoginRequest", {
          get: function() {
            return "msal.angular.login.request";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "userIdentifier", {
          get: function() {
            return "userIdentifier";
          },
          enumerable: !0,
          configurable: !0
        }),
        (e._popUpWidth = 483),
        (e._popUpHeight = 600),
        e
      );
    })();
    t.Constants = r;
    var o = (function() {
      function e() {}
      return (
        Object.defineProperty(e, "loginProgressError", {
          get: function() {
            return "login_progress_error";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "acquireTokenProgressError", {
          get: function() {
            return "acquiretoken_progress_error";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "inputScopesError", {
          get: function() {
            return "input_scopes_error";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "endpointResolutionError", {
          get: function() {
            return "endpoints_resolution_error";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "popUpWindowError", {
          get: function() {
            return "popup_window_error";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "userLoginError", {
          get: function() {
            return "user_login_error";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "userCancelledError", {
          get: function() {
            return "user_cancelled";
          },
          enumerable: !0,
          configurable: !0
        }),
        e
      );
    })();
    t.ErrorCodes = o;
    var i = (function() {
      function e() {}
      return (
        Object.defineProperty(e, "loginProgressError", {
          get: function() {
            return "Login is in progress";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "acquireTokenProgressError", {
          get: function() {
            return "Acquire token is in progress";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "inputScopesError", {
          get: function() {
            return "Invalid value of input scopes provided";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "endpointResolutionError", {
          get: function() {
            return "Endpoints cannot be resolved";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "popUpWindowError", {
          get: function() {
            return "Error opening popup window. This can happen if you are using IE or if popups are blocked in the browser.";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "userLoginError", {
          get: function() {
            return "User login is required";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "userCancelledError", {
          get: function() {
            return "User closed the popup window and cancelled the flow";
          },
          enumerable: !0,
          configurable: !0
        }),
        e
      );
    })();
    t.ErrorDescription = i;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r,
      o = n(0);
    !(function(e) {
      (e[(e.Error = 0)] = "Error"),
        (e[(e.Warning = 1)] = "Warning"),
        (e[(e.Info = 2)] = "Info"),
        (e[(e.Verbose = 3)] = "Verbose");
    })((r = t.LogLevel || (t.LogLevel = {})));
    var i = (function() {
      function e(e, t) {
        void 0 === t && (t = {}), (this._level = r.Info);
        var n = t.correlationId,
          o = void 0 === n ? "" : n,
          i = t.level,
          a = void 0 === i ? r.Info : i,
          l = t.piiLoggingEnabled,
          s = void 0 !== l && l;
        (this._localCallback = e),
          (this._correlationId = o),
          (this._level = a),
          (this._piiLoggingEnabled = s);
      }
      return (
        (e.prototype.logMessage = function(e, t, n) {
          if (!(e > this._level || (!this._piiLoggingEnabled && n))) {
            var i,
              a = new Date().toUTCString();
            (i = o.Utils.isEmpty(this._correlationId)
              ? a + ":" + o.Utils.getLibraryVersion() + "-" + r[e] + " " + t
              : a +
                ":" +
                this._correlationId +
                "-" +
                o.Utils.getLibraryVersion() +
                "-" +
                r[e] +
                " " +
                t),
              this.executeCallback(e, i, n);
          }
        }),
        (e.prototype.executeCallback = function(e, t, n) {
          this._localCallback && this._localCallback(e, t, n);
        }),
        (e.prototype.error = function(e) {
          this.logMessage(r.Error, e, !1);
        }),
        (e.prototype.errorPii = function(e) {
          this.logMessage(r.Error, e, !0);
        }),
        (e.prototype.warning = function(e) {
          this.logMessage(r.Warning, e, !1);
        }),
        (e.prototype.warningPii = function(e) {
          this.logMessage(r.Warning, e, !0);
        }),
        (e.prototype.info = function(e) {
          this.logMessage(r.Info, e, !1);
        }),
        (e.prototype.infoPii = function(e) {
          this.logMessage(r.Info, e, !0);
        }),
        (e.prototype.verbose = function(e) {
          this.logMessage(r.Verbose, e, !1);
        }),
        (e.prototype.verbosePii = function(e) {
          this.logMessage(r.Verbose, e, !0);
        }),
        e
      );
    })();
    t.Logger = i;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function() {
      function e() {}
      return (
        Object.defineProperty(e, "authorityUriInvalidPath", {
          get: function() {
            return "AuthorityUriInvalidPath";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "authorityUriInsecure", {
          get: function() {
            return "AuthorityUriInsecure";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "invalidAuthorityType", {
          get: function() {
            return "InvalidAuthorityType";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "unsupportedAuthorityValidation", {
          get: function() {
            return "UnsupportedAuthorityValidation";
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(e, "b2cAuthorityUriInvalidPath", {
          get: function() {
            return "B2cAuthorityUriInvalidPath";
          },
          enumerable: !0,
          configurable: !0
        }),
        e
      );
    })();
    t.ErrorMessage = r;
  },
  function(e, t, n) {
    "use strict";
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var r =
        Object.getOwnPropertySymbols,
      o = Object.prototype.hasOwnProperty,
      i = Object.prototype.propertyIsEnumerable;
    e.exports = (function() {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
          return !1;
        for (var t = {}, n = 0; n < 10; n++)
          t["_" + String.fromCharCode(n)] = n;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(t)
            .map(function(e) {
              return t[e];
            })
            .join("")
        )
          return !1;
        var r = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function(e) {
            r[e] = e;
          }),
          "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
        );
      } catch (e) {
        return !1;
      }
    })()
      ? Object.assign
      : function(e, t) {
          for (
            var n,
              a,
              l = (function(e) {
                if (null === e || void 0 === e)
                  throw new TypeError(
                    "Object.assign cannot be called with null or undefined"
                  );
                return Object(e);
              })(e),
              s = 1;
            s < arguments.length;
            s++
          ) {
            for (var u in (n = Object(arguments[s])))
              o.call(n, u) && (l[u] = n[u]);
            if (r) {
              a = r(n);
              for (var c = 0; c < a.length; c++)
                i.call(n, a[c]) && (l[a[c]] = n[a[c]]);
            }
          }
          return l;
        };
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function() {
      return function() {
        (this.valid = !1),
          (this.parameters = {}),
          (this.stateMatch = !1),
          (this.stateResponse = ""),
          (this.requestType = "unknown");
      };
    })();
    t.TokenResponse = r;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(0),
      o = (function() {
        function e(e, t, n, r, o, i) {
          (this.displayableId = e),
            (this.name = t),
            (this.identityProvider = n),
            (this.userIdentifier = r),
            (this.idToken = o),
            (this.sid = i);
        }
        return (
          (e.createUser = function(t, n, o) {
            var i, a;
            n ? ((i = n.uid), (a = n.utid)) : ((i = ""), (a = ""));
            var l =
              r.Utils.base64EncodeStringUrlSafe(i) +
              "." +
              r.Utils.base64EncodeStringUrlSafe(a);
            return new e(
              t.preferredName,
              t.name,
              t.issuer,
              l,
              t.decodedIdToken,
              t.sid
            );
          }),
          e
        );
      })();
    t.User = o;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(3),
      o = n(2),
      i = n(11),
      a = (function(e) {
        function t(t, n) {
          return e.call(this, t, n) || this;
        }
        return (
          r.__extends(t, e),
          Object.defineProperty(
            t.prototype,
            "AadInstanceDiscoveryEndpointUrl",
            {
              get: function() {
                return (
                  t.AadInstanceDiscoveryEndpoint +
                  "?api-version=1.0&authorization_endpoint=" +
                  this.CanonicalAuthority +
                  "oauth2/v2.0/authorize"
                );
              },
              enumerable: !0,
              configurable: !0
            }
          ),
          Object.defineProperty(t.prototype, "AuthorityType", {
            get: function() {
              return o.AuthorityType.Aad;
            },
            enumerable: !0,
            configurable: !0
          }),
          (t.prototype.GetOpenIdConfigurationEndpointAsync = function() {
            var e = this,
              t = new Promise(function(t, n) {
                return t(e.DefaultOpenIdConfigurationEndpoint);
              });
            if (!this.IsValidationEnabled) return t;
            var n = this.CanonicalAuthorityUrlComponents.HostNameAndPort;
            return this.IsInTrustedHostList(n)
              ? t
              : new i.XhrClient()
                  .sendRequestAsync(
                    this.AadInstanceDiscoveryEndpointUrl,
                    "GET",
                    !0
                  )
                  .then(function(e) {
                    return e.tenant_discovery_endpoint;
                  });
          }),
          (t.prototype.IsInTrustedHostList = function(e) {
            return t.TrustedHostList[e.toLowerCase()];
          }),
          (t.AadInstanceDiscoveryEndpoint =
            "https://login.microsoftonline.com/common/discovery/instance"),
          (t.TrustedHostList = {
            "login.windows.net": "login.windows.net",
            "login.chinacloudapi.cn": "login.chinacloudapi.cn",
            "login.cloudgovapi.us": "login.cloudgovapi.us",
            "login.microsoftonline.com": "login.microsoftonline.com",
            "login.microsoftonline.de": "login.microsoftonline.de",
            "login.microsoftonline.us": "login.microsoftonline.us"
          }),
          t
        );
      })(o.Authority);
    t.AadAuthority = a;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function() {
      function e() {}
      return (
        (e.prototype.sendRequestAsync = function(e, t, n) {
          var r = this;
          return new Promise(function(n, o) {
            var i = new XMLHttpRequest();
            if (
              (i.open(t, e, !0),
              (i.onload = function(e) {
                (i.status < 200 || i.status >= 300) &&
                  o(r.handleError(i.responseText));
                try {
                  var t = JSON.parse(i.responseText);
                } catch (e) {
                  o(r.handleError(i.responseText));
                }
                n(t);
              }),
              (i.onerror = function(e) {
                o(i.status);
              }),
              "GET" !== t)
            )
              throw "not implemented";
            i.send();
          });
        }),
        (e.prototype.handleError = function(e) {
          var t;
          try {
            if ((t = JSON.parse(e)).error) return t.error;
            throw e;
          } catch (t) {
            return e;
          }
        }),
        e
      );
    })();
    t.XhrClient = r;
  },
  function(e, t, n) {
    "use strict";
    var r = a(n(1)),
      o = n(14),
      i = a(n(18));
    function a(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var l = "f8c7976f-3e93-482d-88a3-62a1133cbbc3",
      s = function(e, t) {
        console.log(t);
      };
    (0, o.render)(
      r.default.createElement(function() {
        return r.default.createElement(i.default, {
          withUserData: !0,
          debug: !0,
          clientId: l,
          authCallback: s,
          buttonTheme: "dark"
        });
      }, null),
      document.getElementById("root")
    );
  },
  function(e, t, n) {
    "use strict";
    /** @license React v16.6.0
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(7),
      o = "function" == typeof Symbol && Symbol.for,
      i = o ? Symbol.for("react.element") : 60103,
      a = o ? Symbol.for("react.portal") : 60106,
      l = o ? Symbol.for("react.fragment") : 60107,
      s = o ? Symbol.for("react.strict_mode") : 60108,
      u = o ? Symbol.for("react.profiler") : 60114,
      c = o ? Symbol.for("react.provider") : 60109,
      d = o ? Symbol.for("react.context") : 60110,
      f = o ? Symbol.for("react.concurrent_mode") : 60111,
      p = o ? Symbol.for("react.forward_ref") : 60112,
      h = o ? Symbol.for("react.suspense") : 60113,
      m = o ? Symbol.for("react.memo") : 60115,
      g = o ? Symbol.for("react.lazy") : 60116,
      y = "function" == typeof Symbol && Symbol.iterator;
    function v(e) {
      for (
        var t = arguments.length - 1,
          n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          r = 0;
        r < t;
        r++
      )
        n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
      !(function(e, t, n, r, o, i, a, l) {
        if (!e) {
          if (((e = void 0), void 0 === t))
            e = Error(
              "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
            );
          else {
            var s = [n, r, o, i, a, l],
              u = 0;
            (e = Error(
              t.replace(/%s/g, function() {
                return s[u++];
              })
            )).name = "Invariant Violation";
          }
          throw ((e.framesToPop = 1), e);
        }
      })(
        !1,
        "Minified React error #" +
          e +
          "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",
        n
      );
    }
    var b = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
      },
      w = {};
    function _(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = w),
        (this.updater = n || b);
    }
    function k() {}
    function C(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = w),
        (this.updater = n || b);
    }
    (_.prototype.isReactComponent = {}),
      (_.prototype.setState = function(e, t) {
        "object" != typeof e && "function" != typeof e && null != e && v("85"),
          this.updater.enqueueSetState(this, e, t, "setState");
      }),
      (_.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      }),
      (k.prototype = _.prototype);
    var T = (C.prototype = new k());
    (T.constructor = C), r(T, _.prototype), (T.isPureReactComponent = !0);
    var S = { current: null, currentDispatcher: null },
      E = Object.prototype.hasOwnProperty,
      I = { key: !0, ref: !0, __self: !0, __source: !0 };
    function x(e, t, n) {
      var r = void 0,
        o = {},
        a = null,
        l = null;
      if (null != t)
        for (r in (void 0 !== t.ref && (l = t.ref),
        void 0 !== t.key && (a = "" + t.key),
        t))
          E.call(t, r) && !I.hasOwnProperty(r) && (o[r] = t[r]);
      var s = arguments.length - 2;
      if (1 === s) o.children = n;
      else if (1 < s) {
        for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
        o.children = u;
      }
      if (e && e.defaultProps)
        for (r in (s = e.defaultProps)) void 0 === o[r] && (o[r] = s[r]);
      return {
        $$typeof: i,
        type: e,
        key: a,
        ref: l,
        props: o,
        _owner: S.current
      };
    }
    function P(e) {
      return "object" == typeof e && null !== e && e.$$typeof === i;
    }
    var O = /\/+/g,
      U = [];
    function A(e, t, n, r) {
      if (U.length) {
        var o = U.pop();
        return (
          (o.result = e),
          (o.keyPrefix = t),
          (o.func = n),
          (o.context = r),
          (o.count = 0),
          o
        );
      }
      return { result: e, keyPrefix: t, func: n, context: r, count: 0 };
    }
    function R(e) {
      (e.result = null),
        (e.keyPrefix = null),
        (e.func = null),
        (e.context = null),
        (e.count = 0),
        10 > U.length && U.push(e);
    }
    function N(e, t, n) {
      return null == e
        ? 0
        : (function e(t, n, r, o) {
            var l = typeof t;
            ("undefined" !== l && "boolean" !== l) || (t = null);
            var s = !1;
            if (null === t) s = !0;
            else
              switch (l) {
                case "string":
                case "number":
                  s = !0;
                  break;
                case "object":
                  switch (t.$$typeof) {
                    case i:
                    case a:
                      s = !0;
                  }
              }
            if (s) return r(o, t, "" === n ? "." + D(t, 0) : n), 1;
            if (((s = 0), (n = "" === n ? "." : n + ":"), Array.isArray(t)))
              for (var u = 0; u < t.length; u++) {
                var c = n + D((l = t[u]), u);
                s += e(l, c, r, o);
              }
            else if (
              ((c =
                null === t || "object" != typeof t
                  ? null
                  : "function" == typeof (c = (y && t[y]) || t["@@iterator"])
                    ? c
                    : null),
              "function" == typeof c)
            )
              for (t = c.call(t), u = 0; !(l = t.next()).done; )
                s += e((l = l.value), (c = n + D(l, u++)), r, o);
            else
              "object" === l &&
                v(
                  "31",
                  "[object Object]" == (r = "" + t)
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : r,
                  ""
                );
            return s;
          })(e, "", t, n);
    }
    function D(e, t) {
      return "object" == typeof e && null !== e && null != e.key
        ? (function(e) {
            var t = { "=": "=0", ":": "=2" };
            return (
              "$" +
              ("" + e).replace(/[=:]/g, function(e) {
                return t[e];
              })
            );
          })(e.key)
        : t.toString(36);
    }
    function M(e, t) {
      e.func.call(e.context, t, e.count++);
    }
    function j(e, t, n) {
      var r = e.result,
        o = e.keyPrefix;
      (e = e.func.call(e.context, t, e.count++)),
        Array.isArray(e)
          ? L(e, r, n, function(e) {
              return e;
            })
          : null != e &&
            (P(e) &&
              (e = (function(e, t) {
                return {
                  $$typeof: i,
                  type: e.type,
                  key: t,
                  ref: e.ref,
                  props: e.props,
                  _owner: e._owner
                };
              })(
                e,
                o +
                  (!e.key || (t && t.key === e.key)
                    ? ""
                    : ("" + e.key).replace(O, "$&/") + "/") +
                  n
              )),
            r.push(e));
    }
    function L(e, t, n, r, o) {
      var i = "";
      null != n && (i = ("" + n).replace(O, "$&/") + "/"),
        N(e, j, (t = A(t, i, r, o))),
        R(t);
    }
    var z = {
        Children: {
          map: function(e, t, n) {
            if (null == e) return e;
            var r = [];
            return L(e, r, null, t, n), r;
          },
          forEach: function(e, t, n) {
            if (null == e) return e;
            N(e, M, (t = A(null, null, t, n))), R(t);
          },
          count: function(e) {
            return N(
              e,
              function() {
                return null;
              },
              null
            );
          },
          toArray: function(e) {
            var t = [];
            return (
              L(e, t, null, function(e) {
                return e;
              }),
              t
            );
          },
          only: function(e) {
            return P(e) || v("143"), e;
          }
        },
        createRef: function() {
          return { current: null };
        },
        Component: _,
        PureComponent: C,
        createContext: function(e, t) {
          return (
            void 0 === t && (t = null),
            ((e = {
              $$typeof: d,
              _calculateChangedBits: t,
              _currentValue: e,
              _currentValue2: e,
              Provider: null,
              Consumer: null
            }).Provider = { $$typeof: c, _context: e }),
            (e.Consumer = e)
          );
        },
        forwardRef: function(e) {
          return { $$typeof: p, render: e };
        },
        lazy: function(e) {
          return { $$typeof: g, _ctor: e, _status: -1, _result: null };
        },
        memo: function(e, t) {
          return { $$typeof: m, type: e, compare: void 0 === t ? null : t };
        },
        Fragment: l,
        StrictMode: s,
        unstable_ConcurrentMode: f,
        Suspense: h,
        unstable_Profiler: u,
        createElement: x,
        cloneElement: function(e, t, n) {
          (null === e || void 0 === e) && v("267", e);
          var o = void 0,
            a = r({}, e.props),
            l = e.key,
            s = e.ref,
            u = e._owner;
          if (null != t) {
            void 0 !== t.ref && ((s = t.ref), (u = S.current)),
              void 0 !== t.key && (l = "" + t.key);
            var c = void 0;
            for (o in (e.type &&
              e.type.defaultProps &&
              (c = e.type.defaultProps),
            t))
              E.call(t, o) &&
                !I.hasOwnProperty(o) &&
                (a[o] = void 0 === t[o] && void 0 !== c ? c[o] : t[o]);
          }
          if (1 === (o = arguments.length - 2)) a.children = n;
          else if (1 < o) {
            c = Array(o);
            for (var d = 0; d < o; d++) c[d] = arguments[d + 2];
            a.children = c;
          }
          return {
            $$typeof: i,
            type: e.type,
            key: l,
            ref: s,
            props: a,
            _owner: u
          };
        },
        createFactory: function(e) {
          var t = x.bind(null, e);
          return (t.type = e), t;
        },
        isValidElement: P,
        version: "16.6.0",
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
          ReactCurrentOwner: S,
          assign: r
        }
      },
      F = { default: z },
      q = (F && z) || F;
    e.exports = q.default || q;
  },
  function(e, t, n) {
    "use strict";
    !(function e() {
      if (
        "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
        } catch (e) {
          console.error(e);
        }
    })(),
      (e.exports = n(15));
  },
  function(e, t, n) {
    "use strict";
    /** @license React v16.6.0
     * react-dom.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var r = n(1),
      o = n(7),
      i = n(16);
    function a(e) {
      for (
        var t = arguments.length - 1,
          n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          r = 0;
        r < t;
        r++
      )
        n += "&args[]=" + encodeURIComponent(arguments[r + 1]);
      !(function(e, t, n, r, o, i, a, l) {
        if (!e) {
          if (((e = void 0), void 0 === t))
            e = Error(
              "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
            );
          else {
            var s = [n, r, o, i, a, l],
              u = 0;
            (e = Error(
              t.replace(/%s/g, function() {
                return s[u++];
              })
            )).name = "Invariant Violation";
          }
          throw ((e.framesToPop = 1), e);
        }
      })(
        !1,
        "Minified React error #" +
          e +
          "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",
        n
      );
    }
    r || a("227");
    var l = !1,
      s = null,
      u = !1,
      c = null,
      d = {
        onError: function(e) {
          (l = !0), (s = e);
        }
      };
    function f(e, t, n, r, o, i, a, u, c) {
      (l = !1),
        (s = null),
        function(e, t, n, r, o, i, a, l, s) {
          var u = Array.prototype.slice.call(arguments, 3);
          try {
            t.apply(n, u);
          } catch (e) {
            this.onError(e);
          }
        }.apply(d, arguments);
    }
    var p = null,
      h = {};
    function m() {
      if (p)
        for (var e in h) {
          var t = h[e],
            n = p.indexOf(e);
          if ((-1 < n || a("96", e), !y[n]))
            for (var r in (t.extractEvents || a("97", e),
            (y[n] = t),
            (n = t.eventTypes))) {
              var o = void 0,
                i = n[r],
                l = t,
                s = r;
              v.hasOwnProperty(s) && a("99", s), (v[s] = i);
              var u = i.phasedRegistrationNames;
              if (u) {
                for (o in u) u.hasOwnProperty(o) && g(u[o], l, s);
                o = !0;
              } else
                i.registrationName
                  ? (g(i.registrationName, l, s), (o = !0))
                  : (o = !1);
              o || a("98", r, e);
            }
        }
    }
    function g(e, t, n) {
      b[e] && a("100", e), (b[e] = t), (w[e] = t.eventTypes[n].dependencies);
    }
    var y = [],
      v = {},
      b = {},
      w = {},
      _ = null,
      k = null,
      C = null;
    function T(e, t, n, r) {
      (t = e.type || "unknown-event"),
        (e.currentTarget = C(r)),
        (function(e, t, n, r, o, i, d, p, h) {
          if ((f.apply(this, arguments), l)) {
            if (l) {
              var m = s;
              (l = !1), (s = null);
            } else a("198"), (m = void 0);
            u || ((u = !0), (c = m));
          }
        })(t, n, void 0, e),
        (e.currentTarget = null);
    }
    function S(e, t) {
      return (
        null == t && a("30"),
        null == e
          ? t
          : Array.isArray(e)
            ? Array.isArray(t)
              ? (e.push.apply(e, t), e)
              : (e.push(t), e)
            : Array.isArray(t)
              ? [e].concat(t)
              : [e, t]
      );
    }
    function E(e, t, n) {
      Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
    }
    var I = null;
    function x(e, t) {
      if (e) {
        var n = e._dispatchListeners,
          r = e._dispatchInstances;
        if (Array.isArray(n))
          for (var o = 0; o < n.length && !e.isPropagationStopped(); o++)
            T(e, t, n[o], r[o]);
        else n && T(e, t, n, r);
        (e._dispatchListeners = null),
          (e._dispatchInstances = null),
          e.isPersistent() || e.constructor.release(e);
      }
    }
    function P(e) {
      return x(e, !0);
    }
    function O(e) {
      return x(e, !1);
    }
    var U = {
      injectEventPluginOrder: function(e) {
        p && a("101"), (p = Array.prototype.slice.call(e)), m();
      },
      injectEventPluginsByName: function(e) {
        var t,
          n = !1;
        for (t in e)
          if (e.hasOwnProperty(t)) {
            var r = e[t];
            (h.hasOwnProperty(t) && h[t] === r) ||
              (h[t] && a("102", t), (h[t] = r), (n = !0));
          }
        n && m();
      }
    };
    function A(e, t) {
      var n = e.stateNode;
      if (!n) return null;
      var r = _(n);
      if (!r) return null;
      n = r[t];
      e: switch (t) {
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
          (r = !r.disabled) ||
            (r = !(
              "button" === (e = e.type) ||
              "input" === e ||
              "select" === e ||
              "textarea" === e
            )),
            (e = !r);
          break e;
        default:
          e = !1;
      }
      return e
        ? null
        : (n && "function" != typeof n && a("231", t, typeof n), n);
    }
    function R(e, t) {
      if (
        (null !== e && (I = S(I, e)),
        (e = I),
        (I = null),
        e && (E(e, t ? P : O), I && a("95"), u))
      )
        throw ((t = c), (u = !1), (c = null), t);
    }
    var N = Math.random()
        .toString(36)
        .slice(2),
      D = "__reactInternalInstance$" + N,
      M = "__reactEventHandlers$" + N;
    function j(e) {
      if (e[D]) return e[D];
      for (; !e[D]; ) {
        if (!e.parentNode) return null;
        e = e.parentNode;
      }
      return 5 === (e = e[D]).tag || 6 === e.tag ? e : null;
    }
    function L(e) {
      return !(e = e[D]) || (5 !== e.tag && 6 !== e.tag) ? null : e;
    }
    function z(e) {
      if (5 === e.tag || 6 === e.tag) return e.stateNode;
      a("33");
    }
    function F(e) {
      return e[M] || null;
    }
    function q(e) {
      do {
        e = e.return;
      } while (e && 5 !== e.tag);
      return e || null;
    }
    function V(e, t, n) {
      (t = A(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
        ((n._dispatchListeners = S(n._dispatchListeners, t)),
        (n._dispatchInstances = S(n._dispatchInstances, e)));
    }
    function H(e) {
      if (e && e.dispatchConfig.phasedRegistrationNames) {
        for (var t = e._targetInst, n = []; t; ) n.push(t), (t = q(t));
        for (t = n.length; 0 < t--; ) V(n[t], "captured", e);
        for (t = 0; t < n.length; t++) V(n[t], "bubbled", e);
      }
    }
    function W(e, t, n) {
      e &&
        n &&
        n.dispatchConfig.registrationName &&
        (t = A(e, n.dispatchConfig.registrationName)) &&
        ((n._dispatchListeners = S(n._dispatchListeners, t)),
        (n._dispatchInstances = S(n._dispatchInstances, e)));
    }
    function B(e) {
      e && e.dispatchConfig.registrationName && W(e._targetInst, null, e);
    }
    function $(e) {
      E(e, H);
    }
    var Q = !(
      "undefined" == typeof window ||
      !window.document ||
      !window.document.createElement
    );
    function K(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
      );
    }
    var G = {
        animationend: K("Animation", "AnimationEnd"),
        animationiteration: K("Animation", "AnimationIteration"),
        animationstart: K("Animation", "AnimationStart"),
        transitionend: K("Transition", "TransitionEnd")
      },
      J = {},
      X = {};
    function Y(e) {
      if (J[e]) return J[e];
      if (!G[e]) return e;
      var t,
        n = G[e];
      for (t in n) if (n.hasOwnProperty(t) && t in X) return (J[e] = n[t]);
      return e;
    }
    Q &&
      ((X = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete G.animationend.animation,
        delete G.animationiteration.animation,
        delete G.animationstart.animation),
      "TransitionEvent" in window || delete G.transitionend.transition);
    var Z = Y("animationend"),
      ee = Y("animationiteration"),
      te = Y("animationstart"),
      ne = Y("transitionend"),
      re = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
      oe = null,
      ie = null,
      ae = null;
    function le() {
      if (ae) return ae;
      var e,
        t,
        n = ie,
        r = n.length,
        o = "value" in oe ? oe.value : oe.textContent,
        i = o.length;
      for (e = 0; e < r && n[e] === o[e]; e++);
      var a = r - e;
      for (t = 1; t <= a && n[r - t] === o[i - t]; t++);
      return (ae = o.slice(e, 1 < t ? 1 - t : void 0));
    }
    function se() {
      return !0;
    }
    function ue() {
      return !1;
    }
    function ce(e, t, n, r) {
      for (var o in ((this.dispatchConfig = e),
      (this._targetInst = t),
      (this.nativeEvent = n),
      (e = this.constructor.Interface)))
        e.hasOwnProperty(o) &&
          ((t = e[o])
            ? (this[o] = t(n))
            : "target" === o
              ? (this.target = r)
              : (this[o] = n[o]));
      return (
        (this.isDefaultPrevented = (null != n.defaultPrevented
        ? n.defaultPrevented
        : !1 === n.returnValue)
          ? se
          : ue),
        (this.isPropagationStopped = ue),
        this
      );
    }
    function de(e, t, n, r) {
      if (this.eventPool.length) {
        var o = this.eventPool.pop();
        return this.call(o, e, t, n, r), o;
      }
      return new this(e, t, n, r);
    }
    function fe(e) {
      e instanceof this || a("279"),
        e.destructor(),
        10 > this.eventPool.length && this.eventPool.push(e);
    }
    function pe(e) {
      (e.eventPool = []), (e.getPooled = de), (e.release = fe);
    }
    o(ce.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e &&
          (e.preventDefault
            ? e.preventDefault()
            : "unknown" != typeof e.returnValue && (e.returnValue = !1),
          (this.isDefaultPrevented = se));
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e &&
          (e.stopPropagation
            ? e.stopPropagation()
            : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
          (this.isPropagationStopped = se));
      },
      persist: function() {
        this.isPersistent = se;
      },
      isPersistent: ue,
      destructor: function() {
        var e,
          t = this.constructor.Interface;
        for (e in t) this[e] = null;
        (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
          (this.isPropagationStopped = this.isDefaultPrevented = ue),
          (this._dispatchInstances = this._dispatchListeners = null);
      }
    }),
      (ce.Interface = {
        type: null,
        target: null,
        currentTarget: function() {
          return null;
        },
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function(e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null
      }),
      (ce.extend = function(e) {
        function t() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        t.prototype = r.prototype;
        var i = new t();
        return (
          o(i, n.prototype),
          (n.prototype = i),
          (n.prototype.constructor = n),
          (n.Interface = o({}, r.Interface, e)),
          (n.extend = r.extend),
          pe(n),
          n
        );
      }),
      pe(ce);
    var he = ce.extend({ data: null }),
      me = ce.extend({ data: null }),
      ge = [9, 13, 27, 32],
      ye = Q && "CompositionEvent" in window,
      ve = null;
    Q && "documentMode" in document && (ve = document.documentMode);
    var be = Q && "TextEvent" in window && !ve,
      we = Q && (!ye || (ve && 8 < ve && 11 >= ve)),
      _e = String.fromCharCode(32),
      ke = {
        beforeInput: {
          phasedRegistrationNames: {
            bubbled: "onBeforeInput",
            captured: "onBeforeInputCapture"
          },
          dependencies: ["compositionend", "keypress", "textInput", "paste"]
        },
        compositionEnd: {
          phasedRegistrationNames: {
            bubbled: "onCompositionEnd",
            captured: "onCompositionEndCapture"
          },
          dependencies: "blur compositionend keydown keypress keyup mousedown".split(
            " "
          )
        },
        compositionStart: {
          phasedRegistrationNames: {
            bubbled: "onCompositionStart",
            captured: "onCompositionStartCapture"
          },
          dependencies: "blur compositionstart keydown keypress keyup mousedown".split(
            " "
          )
        },
        compositionUpdate: {
          phasedRegistrationNames: {
            bubbled: "onCompositionUpdate",
            captured: "onCompositionUpdateCapture"
          },
          dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(
            " "
          )
        }
      },
      Ce = !1;
    function Te(e, t) {
      switch (e) {
        case "keyup":
          return -1 !== ge.indexOf(t.keyCode);
        case "keydown":
          return 229 !== t.keyCode;
        case "keypress":
        case "mousedown":
        case "blur":
          return !0;
        default:
          return !1;
      }
    }
    function Se(e) {
      return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
    }
    var Ee = !1;
    var Ie = {
        eventTypes: ke,
        extractEvents: function(e, t, n, r) {
          var o = void 0,
            i = void 0;
          if (ye)
            e: {
              switch (e) {
                case "compositionstart":
                  o = ke.compositionStart;
                  break e;
                case "compositionend":
                  o = ke.compositionEnd;
                  break e;
                case "compositionupdate":
                  o = ke.compositionUpdate;
                  break e;
              }
              o = void 0;
            }
          else
            Ee
              ? Te(e, n) && (o = ke.compositionEnd)
              : "keydown" === e &&
                229 === n.keyCode &&
                (o = ke.compositionStart);
          return (
            o
              ? (we &&
                  "ko" !== n.locale &&
                  (Ee || o !== ke.compositionStart
                    ? o === ke.compositionEnd && Ee && (i = le())
                    : ((ie = "value" in (oe = r) ? oe.value : oe.textContent),
                      (Ee = !0))),
                (o = he.getPooled(o, t, n, r)),
                i ? (o.data = i) : null !== (i = Se(n)) && (o.data = i),
                $(o),
                (i = o))
              : (i = null),
            (e = be
              ? (function(e, t) {
                  switch (e) {
                    case "compositionend":
                      return Se(t);
                    case "keypress":
                      return 32 !== t.which ? null : ((Ce = !0), _e);
                    case "textInput":
                      return (e = t.data) === _e && Ce ? null : e;
                    default:
                      return null;
                  }
                })(e, n)
              : (function(e, t) {
                  if (Ee)
                    return "compositionend" === e || (!ye && Te(e, t))
                      ? ((e = le()), (ae = ie = oe = null), (Ee = !1), e)
                      : null;
                  switch (e) {
                    case "paste":
                      return null;
                    case "keypress":
                      if (
                        !(t.ctrlKey || t.altKey || t.metaKey) ||
                        (t.ctrlKey && t.altKey)
                      ) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which);
                      }
                      return null;
                    case "compositionend":
                      return we && "ko" !== t.locale ? null : t.data;
                    default:
                      return null;
                  }
                })(e, n))
              ? (((t = me.getPooled(ke.beforeInput, t, n, r)).data = e), $(t))
              : (t = null),
            null === i ? t : null === t ? i : [i, t]
          );
        }
      },
      xe = null,
      Pe = null,
      Oe = null;
    function Ue(e) {
      if ((e = k(e))) {
        "function" != typeof xe && a("280");
        var t = _(e.stateNode);
        xe(e.stateNode, e.type, t);
      }
    }
    function Ae(e) {
      Pe ? (Oe ? Oe.push(e) : (Oe = [e])) : (Pe = e);
    }
    function Re() {
      if (Pe) {
        var e = Pe,
          t = Oe;
        if (((Oe = Pe = null), Ue(e), t))
          for (e = 0; e < t.length; e++) Ue(t[e]);
      }
    }
    function Ne(e, t) {
      return e(t);
    }
    function De(e, t, n) {
      return e(t, n);
    }
    function Me() {}
    var je = !1;
    function Le(e, t) {
      if (je) return e(t);
      je = !0;
      try {
        return Ne(e, t);
      } finally {
        (je = !1), (null !== Pe || null !== Oe) && (Me(), Re());
      }
    }
    var ze = {
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
    function Fe(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return "input" === t ? !!ze[e.type] : "textarea" === t;
    }
    function qe(e) {
      return (
        (e = e.target || e.srcElement || window).correspondingUseElement &&
          (e = e.correspondingUseElement),
        3 === e.nodeType ? e.parentNode : e
      );
    }
    function Ve(e) {
      if (!Q) return !1;
      var t = (e = "on" + e) in document;
      return (
        t ||
          ((t = document.createElement("div")).setAttribute(e, "return;"),
          (t = "function" == typeof t[e])),
        t
      );
    }
    function He(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        "input" === e.toLowerCase() &&
        ("checkbox" === t || "radio" === t)
      );
    }
    function We(e) {
      e._valueTracker ||
        (e._valueTracker = (function(e) {
          var t = He(e) ? "checked" : "value",
            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
            r = "" + e[t];
          if (
            !e.hasOwnProperty(t) &&
            void 0 !== n &&
            "function" == typeof n.get &&
            "function" == typeof n.set
          ) {
            var o = n.get,
              i = n.set;
            return (
              Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                  return o.call(this);
                },
                set: function(e) {
                  (r = "" + e), i.call(this, e);
                }
              }),
              Object.defineProperty(e, t, { enumerable: n.enumerable }),
              {
                getValue: function() {
                  return r;
                },
                setValue: function(e) {
                  r = "" + e;
                },
                stopTracking: function() {
                  (e._valueTracker = null), delete e[t];
                }
              }
            );
          }
        })(e));
    }
    function Be(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = "";
      return (
        e && (r = He(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r) !== n && (t.setValue(e), !0)
      );
    }
    var $e = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      Qe = /^(.*)[\\\/]/,
      Ke = "function" == typeof Symbol && Symbol.for,
      Ge = Ke ? Symbol.for("react.element") : 60103,
      Je = Ke ? Symbol.for("react.portal") : 60106,
      Xe = Ke ? Symbol.for("react.fragment") : 60107,
      Ye = Ke ? Symbol.for("react.strict_mode") : 60108,
      Ze = Ke ? Symbol.for("react.profiler") : 60114,
      et = Ke ? Symbol.for("react.provider") : 60109,
      tt = Ke ? Symbol.for("react.context") : 60110,
      nt = Ke ? Symbol.for("react.concurrent_mode") : 60111,
      rt = Ke ? Symbol.for("react.forward_ref") : 60112,
      ot = Ke ? Symbol.for("react.suspense") : 60113,
      it = Ke ? Symbol.for("react.memo") : 60115,
      at = Ke ? Symbol.for("react.lazy") : 60116,
      lt = "function" == typeof Symbol && Symbol.iterator;
    function st(e) {
      return null === e || "object" != typeof e
        ? null
        : "function" == typeof (e = (lt && e[lt]) || e["@@iterator"])
          ? e
          : null;
    }
    function ut(e) {
      if (null == e) return null;
      if ("function" == typeof e) return e.displayName || e.name || null;
      if ("string" == typeof e) return e;
      switch (e) {
        case nt:
          return "ConcurrentMode";
        case Xe:
          return "Fragment";
        case Je:
          return "Portal";
        case Ze:
          return "Profiler";
        case Ye:
          return "StrictMode";
        case ot:
          return "Suspense";
      }
      if ("object" == typeof e)
        switch (e.$$typeof) {
          case tt:
            return "Context.Consumer";
          case et:
            return "Context.Provider";
          case rt:
            var t = e.render;
            return (
              (t = t.displayName || t.name || ""),
              e.displayName ||
                ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef")
            );
          case it:
            return ut(e.type);
          case at:
            if ((e = 1 === e._status ? e._result : null)) return ut(e);
        }
      return null;
    }
    function ct(e) {
      var t = "";
      do {
        e: switch (e.tag) {
          case 2:
          case 16:
          case 0:
          case 1:
          case 5:
          case 8:
            var n = e._debugOwner,
              r = e._debugSource,
              o = ut(e.type),
              i = null;
            n && (i = ut(n.type)),
              (n = o),
              (o = ""),
              r
                ? (o =
                    " (at " +
                    r.fileName.replace(Qe, "") +
                    ":" +
                    r.lineNumber +
                    ")")
                : i && (o = " (created by " + i + ")"),
              (i = "\n    in " + (n || "Unknown") + o);
            break e;
          default:
            i = "";
        }
        (t += i), (e = e.return);
      } while (e);
      return t;
    }
    var dt = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      ft = Object.prototype.hasOwnProperty,
      pt = {},
      ht = {};
    function mt(e, t, n, r, o) {
      (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
        (this.attributeName = r),
        (this.attributeNamespace = o),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t);
    }
    var gt = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function(e) {
        gt[e] = new mt(e, 0, !1, e, null);
      }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"]
      ].forEach(function(e) {
        var t = e[0];
        gt[t] = new mt(t, 1, !1, e[1], null);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(
        e
      ) {
        gt[e] = new mt(e, 2, !1, e.toLowerCase(), null);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha"
      ].forEach(function(e) {
        gt[e] = new mt(e, 2, !1, e, null);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function(e) {
          gt[e] = new mt(e, 3, !1, e.toLowerCase(), null);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function(e) {
        gt[e] = new mt(e, 3, !0, e, null);
      }),
      ["capture", "download"].forEach(function(e) {
        gt[e] = new mt(e, 4, !1, e, null);
      }),
      ["cols", "rows", "size", "span"].forEach(function(e) {
        gt[e] = new mt(e, 6, !1, e, null);
      }),
      ["rowSpan", "start"].forEach(function(e) {
        gt[e] = new mt(e, 5, !1, e.toLowerCase(), null);
      });
    var yt = /[\-:]([a-z])/g;
    function vt(e) {
      return e[1].toUpperCase();
    }
    function bt(e, t, n, r) {
      var o = gt.hasOwnProperty(t) ? gt[t] : null;
      (null !== o
        ? 0 === o.type
        : !r &&
          (2 < t.length &&
            ("o" === t[0] || "O" === t[0]) &&
            ("n" === t[1] || "N" === t[1]))) ||
        ((function(e, t, n, r) {
          if (
            null === t ||
            void 0 === t ||
            (function(e, t, n, r) {
              if (null !== n && 0 === n.type) return !1;
              switch (typeof t) {
                case "function":
                case "symbol":
                  return !0;
                case "boolean":
                  return (
                    !r &&
                    (null !== n
                      ? !n.acceptsBooleans
                      : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                        "aria-" !== e)
                  );
                default:
                  return !1;
              }
            })(e, t, n, r)
          )
            return !0;
          if (r) return !1;
          if (null !== n)
            switch (n.type) {
              case 3:
                return !t;
              case 4:
                return !1 === t;
              case 5:
                return isNaN(t);
              case 6:
                return isNaN(t) || 1 > t;
            }
          return !1;
        })(t, n, o, r) && (n = null),
        r || null === o
          ? (function(e) {
              return (
                !!ft.call(ht, e) ||
                (!ft.call(pt, e) &&
                  (dt.test(e) ? (ht[e] = !0) : ((pt[e] = !0), !1)))
              );
            })(t) &&
            (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
          : o.mustUseProperty
            ? (e[o.propertyName] = null === n ? 3 !== o.type && "" : n)
            : ((t = o.attributeName),
              (r = o.attributeNamespace),
              null === n
                ? e.removeAttribute(t)
                : ((n =
                    3 === (o = o.type) || (4 === o && !0 === n) ? "" : "" + n),
                  r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    function wt(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "object":
        case "string":
        case "undefined":
          return e;
        default:
          return "";
      }
    }
    function _t(e, t) {
      var n = t.checked;
      return o({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: null != n ? n : e._wrapperState.initialChecked
      });
    }
    function kt(e, t) {
      var n = null == t.defaultValue ? "" : t.defaultValue,
        r = null != t.checked ? t.checked : t.defaultChecked;
      (n = wt(null != t.value ? t.value : n)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            "checkbox" === t.type || "radio" === t.type
              ? null != t.checked
              : null != t.value
        });
    }
    function Ct(e, t) {
      null != (t = t.checked) && bt(e, "checked", t, !1);
    }
    function Tt(e, t) {
      Ct(e, t);
      var n = wt(t.value),
        r = t.type;
      if (null != n)
        "number" === r
          ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
          : e.value !== "" + n && (e.value = "" + n);
      else if ("submit" === r || "reset" === r)
        return void e.removeAttribute("value");
      t.hasOwnProperty("value")
        ? Et(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && Et(e, t.type, wt(t.defaultValue)),
        null == t.checked &&
          null != t.defaultChecked &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function St(e, t, n) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
          !(
            ("submit" !== r && "reset" !== r) ||
            (void 0 !== t.value && null !== t.value)
          )
        )
          return;
        (t = "" + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t);
      }
      "" !== (n = e.name) && (e.name = ""),
        (e.defaultChecked = !e.defaultChecked),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        "" !== n && (e.name = n);
    }
    function Et(e, t, n) {
      ("number" === t && e.ownerDocument.activeElement === e) ||
        (null == n
          ? (e.defaultValue = "" + e._wrapperState.initialValue)
          : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function(e) {
        var t = e.replace(yt, vt);
        gt[t] = new mt(t, 1, !1, e, null);
      }),
      "xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function(e) {
          var t = e.replace(yt, vt);
          gt[t] = new mt(t, 1, !1, e, "http://www.w3.org/1999/xlink");
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
        var t = e.replace(yt, vt);
        gt[t] = new mt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace");
      }),
      (gt.tabIndex = new mt("tabIndex", 1, !1, "tabindex", null));
    var It = {
      change: {
        phasedRegistrationNames: {
          bubbled: "onChange",
          captured: "onChangeCapture"
        },
        dependencies: "blur change click focus input keydown keyup selectionchange".split(
          " "
        )
      }
    };
    function xt(e, t, n) {
      return (
        ((e = ce.getPooled(It.change, e, t, n)).type = "change"), Ae(n), $(e), e
      );
    }
    var Pt = null,
      Ot = null;
    function Ut(e) {
      R(e, !1);
    }
    function At(e) {
      if (Be(z(e))) return e;
    }
    function Rt(e, t) {
      if ("change" === e) return t;
    }
    var Nt = !1;
    function Dt() {
      Pt && (Pt.detachEvent("onpropertychange", Mt), (Ot = Pt = null));
    }
    function Mt(e) {
      "value" === e.propertyName && At(Ot) && Le(Ut, (e = xt(Ot, e, qe(e))));
    }
    function jt(e, t, n) {
      "focus" === e
        ? (Dt(), (Ot = n), (Pt = t).attachEvent("onpropertychange", Mt))
        : "blur" === e && Dt();
    }
    function Lt(e) {
      if ("selectionchange" === e || "keyup" === e || "keydown" === e)
        return At(Ot);
    }
    function zt(e, t) {
      if ("click" === e) return At(t);
    }
    function Ft(e, t) {
      if ("input" === e || "change" === e) return At(t);
    }
    Q &&
      (Nt =
        Ve("input") && (!document.documentMode || 9 < document.documentMode));
    var qt = {
        eventTypes: It,
        _isInputEventSupported: Nt,
        extractEvents: function(e, t, n, r) {
          var o = t ? z(t) : window,
            i = void 0,
            a = void 0,
            l = o.nodeName && o.nodeName.toLowerCase();
          if (
            ("select" === l || ("input" === l && "file" === o.type)
              ? (i = Rt)
              : Fe(o)
                ? Nt
                  ? (i = Ft)
                  : ((i = Lt), (a = jt))
                : (l = o.nodeName) &&
                  "input" === l.toLowerCase() &&
                  ("checkbox" === o.type || "radio" === o.type) &&
                  (i = zt),
            i && (i = i(e, t)))
          )
            return xt(i, n, r);
          a && a(e, o, t),
            "blur" === e &&
              (e = o._wrapperState) &&
              e.controlled &&
              "number" === o.type &&
              Et(o, "number", o.value);
        }
      },
      Vt = ce.extend({ view: null, detail: null }),
      Ht = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
      };
    function Wt(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : !!(e = Ht[e]) && !!t[e];
    }
    function Bt() {
      return Wt;
    }
    var $t = 0,
      Qt = 0,
      Kt = !1,
      Gt = !1,
      Jt = Vt.extend({
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        pageX: null,
        pageY: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        getModifierState: Bt,
        button: null,
        buttons: null,
        relatedTarget: function(e) {
          return (
            e.relatedTarget ||
            (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
          );
        },
        movementX: function(e) {
          if ("movementX" in e) return e.movementX;
          var t = $t;
          return (
            ($t = e.screenX),
            Kt ? ("mousemove" === e.type ? e.screenX - t : 0) : ((Kt = !0), 0)
          );
        },
        movementY: function(e) {
          if ("movementY" in e) return e.movementY;
          var t = Qt;
          return (
            (Qt = e.screenY),
            Gt ? ("mousemove" === e.type ? e.screenY - t : 0) : ((Gt = !0), 0)
          );
        }
      }),
      Xt = Jt.extend({
        pointerId: null,
        width: null,
        height: null,
        pressure: null,
        tangentialPressure: null,
        tiltX: null,
        tiltY: null,
        twist: null,
        pointerType: null,
        isPrimary: null
      }),
      Yt = {
        mouseEnter: {
          registrationName: "onMouseEnter",
          dependencies: ["mouseout", "mouseover"]
        },
        mouseLeave: {
          registrationName: "onMouseLeave",
          dependencies: ["mouseout", "mouseover"]
        },
        pointerEnter: {
          registrationName: "onPointerEnter",
          dependencies: ["pointerout", "pointerover"]
        },
        pointerLeave: {
          registrationName: "onPointerLeave",
          dependencies: ["pointerout", "pointerover"]
        }
      },
      Zt = {
        eventTypes: Yt,
        extractEvents: function(e, t, n, r) {
          var o = "mouseover" === e || "pointerover" === e,
            i = "mouseout" === e || "pointerout" === e;
          if ((o && (n.relatedTarget || n.fromElement)) || (!i && !o))
            return null;
          if (
            ((o =
              r.window === r
                ? r
                : (o = r.ownerDocument)
                  ? o.defaultView || o.parentWindow
                  : window),
            i
              ? ((i = t),
                (t = (t = n.relatedTarget || n.toElement) ? j(t) : null))
              : (i = null),
            i === t)
          )
            return null;
          var a = void 0,
            l = void 0,
            s = void 0,
            u = void 0;
          "mouseout" === e || "mouseover" === e
            ? ((a = Jt),
              (l = Yt.mouseLeave),
              (s = Yt.mouseEnter),
              (u = "mouse"))
            : ("pointerout" !== e && "pointerover" !== e) ||
              ((a = Xt),
              (l = Yt.pointerLeave),
              (s = Yt.pointerEnter),
              (u = "pointer"));
          var c = null == i ? o : z(i);
          if (
            ((o = null == t ? o : z(t)),
            ((e = a.getPooled(l, i, n, r)).type = u + "leave"),
            (e.target = c),
            (e.relatedTarget = o),
            ((n = a.getPooled(s, t, n, r)).type = u + "enter"),
            (n.target = o),
            (n.relatedTarget = c),
            (r = t),
            i && r)
          )
            e: {
              for (o = r, u = 0, a = t = i; a; a = q(a)) u++;
              for (a = 0, s = o; s; s = q(s)) a++;
              for (; 0 < u - a; ) (t = q(t)), u--;
              for (; 0 < a - u; ) (o = q(o)), a--;
              for (; u--; ) {
                if (t === o || t === o.alternate) break e;
                (t = q(t)), (o = q(o));
              }
              t = null;
            }
          else t = null;
          for (
            o = t, t = [];
            i && i !== o && (null === (u = i.alternate) || u !== o);

          )
            t.push(i), (i = q(i));
          for (
            i = [];
            r && r !== o && (null === (u = r.alternate) || u !== o);

          )
            i.push(r), (r = q(r));
          for (r = 0; r < t.length; r++) W(t[r], "bubbled", e);
          for (r = i.length; 0 < r--; ) W(i[r], "captured", n);
          return [e, n];
        }
      },
      en = Object.prototype.hasOwnProperty;
    function tn(e, t) {
      return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t;
    }
    function nn(e, t) {
      if (tn(e, t)) return !0;
      if (
        "object" != typeof e ||
        null === e ||
        "object" != typeof t ||
        null === t
      )
        return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++)
        if (!en.call(t, n[r]) || !tn(e[n[r]], t[n[r]])) return !1;
      return !0;
    }
    function rn(e) {
      var t = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        if (0 != (2 & t.effectTag)) return 1;
        for (; t.return; ) if (0 != (2 & (t = t.return).effectTag)) return 1;
      }
      return 3 === t.tag ? 2 : 3;
    }
    function on(e) {
      2 !== rn(e) && a("188");
    }
    function an(e) {
      if (
        !(e = (function(e) {
          var t = e.alternate;
          if (!t) return 3 === (t = rn(e)) && a("188"), 1 === t ? null : e;
          for (var n = e, r = t; ; ) {
            var o = n.return,
              i = o ? o.alternate : null;
            if (!o || !i) break;
            if (o.child === i.child) {
              for (var l = o.child; l; ) {
                if (l === n) return on(o), e;
                if (l === r) return on(o), t;
                l = l.sibling;
              }
              a("188");
            }
            if (n.return !== r.return) (n = o), (r = i);
            else {
              l = !1;
              for (var s = o.child; s; ) {
                if (s === n) {
                  (l = !0), (n = o), (r = i);
                  break;
                }
                if (s === r) {
                  (l = !0), (r = o), (n = i);
                  break;
                }
                s = s.sibling;
              }
              if (!l) {
                for (s = i.child; s; ) {
                  if (s === n) {
                    (l = !0), (n = i), (r = o);
                    break;
                  }
                  if (s === r) {
                    (l = !0), (r = i), (n = o);
                    break;
                  }
                  s = s.sibling;
                }
                l || a("189");
              }
            }
            n.alternate !== r && a("190");
          }
          return 3 !== n.tag && a("188"), n.stateNode.current === n ? e : t;
        })(e))
      )
        return null;
      for (var t = e; ; ) {
        if (5 === t.tag || 6 === t.tag) return t;
        if (t.child) (t.child.return = t), (t = t.child);
        else {
          if (t === e) break;
          for (; !t.sibling; ) {
            if (!t.return || t.return === e) return null;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }
      return null;
    }
    var ln = ce.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null
      }),
      sn = ce.extend({
        clipboardData: function(e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        }
      }),
      un = Vt.extend({ relatedTarget: null });
    function cn(e) {
      var t = e.keyCode;
      return (
        "charCode" in e
          ? 0 === (e = e.charCode) && 13 === t && (e = 13)
          : (e = t),
        10 === e && (e = 13),
        32 <= e || 13 === e ? e : 0
      );
    }
    var dn = {
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
      },
      fn = {
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
      },
      pn = Vt.extend({
        key: function(e) {
          if (e.key) {
            var t = dn[e.key] || e.key;
            if ("Unidentified" !== t) return t;
          }
          return "keypress" === e.type
            ? 13 === (e = cn(e))
              ? "Enter"
              : String.fromCharCode(e)
            : "keydown" === e.type || "keyup" === e.type
              ? fn[e.keyCode] || "Unidentified"
              : "";
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: Bt,
        charCode: function(e) {
          return "keypress" === e.type ? cn(e) : 0;
        },
        keyCode: function(e) {
          return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
        },
        which: function(e) {
          return "keypress" === e.type
            ? cn(e)
            : "keydown" === e.type || "keyup" === e.type
              ? e.keyCode
              : 0;
        }
      }),
      hn = Jt.extend({ dataTransfer: null }),
      mn = Vt.extend({
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: Bt
      }),
      gn = ce.extend({
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null
      }),
      yn = Jt.extend({
        deltaX: function(e) {
          return "deltaX" in e
            ? e.deltaX
            : "wheelDeltaX" in e
              ? -e.wheelDeltaX
              : 0;
        },
        deltaY: function(e) {
          return "deltaY" in e
            ? e.deltaY
            : "wheelDeltaY" in e
              ? -e.wheelDeltaY
              : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
        },
        deltaZ: null,
        deltaMode: null
      }),
      vn = [
        ["abort", "abort"],
        [Z, "animationEnd"],
        [ee, "animationIteration"],
        [te, "animationStart"],
        ["canplay", "canPlay"],
        ["canplaythrough", "canPlayThrough"],
        ["drag", "drag"],
        ["dragenter", "dragEnter"],
        ["dragexit", "dragExit"],
        ["dragleave", "dragLeave"],
        ["dragover", "dragOver"],
        ["durationchange", "durationChange"],
        ["emptied", "emptied"],
        ["encrypted", "encrypted"],
        ["ended", "ended"],
        ["error", "error"],
        ["gotpointercapture", "gotPointerCapture"],
        ["load", "load"],
        ["loadeddata", "loadedData"],
        ["loadedmetadata", "loadedMetadata"],
        ["loadstart", "loadStart"],
        ["lostpointercapture", "lostPointerCapture"],
        ["mousemove", "mouseMove"],
        ["mouseout", "mouseOut"],
        ["mouseover", "mouseOver"],
        ["playing", "playing"],
        ["pointermove", "pointerMove"],
        ["pointerout", "pointerOut"],
        ["pointerover", "pointerOver"],
        ["progress", "progress"],
        ["scroll", "scroll"],
        ["seeking", "seeking"],
        ["stalled", "stalled"],
        ["suspend", "suspend"],
        ["timeupdate", "timeUpdate"],
        ["toggle", "toggle"],
        ["touchmove", "touchMove"],
        [ne, "transitionEnd"],
        ["waiting", "waiting"],
        ["wheel", "wheel"]
      ],
      bn = {},
      wn = {};
    function _n(e, t) {
      var n = e[0],
        r = "on" + ((e = e[1])[0].toUpperCase() + e.slice(1));
      (t = {
        phasedRegistrationNames: { bubbled: r, captured: r + "Capture" },
        dependencies: [n],
        isInteractive: t
      }),
        (bn[e] = t),
        (wn[n] = t);
    }
    [
      ["blur", "blur"],
      ["cancel", "cancel"],
      ["click", "click"],
      ["close", "close"],
      ["contextmenu", "contextMenu"],
      ["copy", "copy"],
      ["cut", "cut"],
      ["auxclick", "auxClick"],
      ["dblclick", "doubleClick"],
      ["dragend", "dragEnd"],
      ["dragstart", "dragStart"],
      ["drop", "drop"],
      ["focus", "focus"],
      ["input", "input"],
      ["invalid", "invalid"],
      ["keydown", "keyDown"],
      ["keypress", "keyPress"],
      ["keyup", "keyUp"],
      ["mousedown", "mouseDown"],
      ["mouseup", "mouseUp"],
      ["paste", "paste"],
      ["pause", "pause"],
      ["play", "play"],
      ["pointercancel", "pointerCancel"],
      ["pointerdown", "pointerDown"],
      ["pointerup", "pointerUp"],
      ["ratechange", "rateChange"],
      ["reset", "reset"],
      ["seeked", "seeked"],
      ["submit", "submit"],
      ["touchcancel", "touchCancel"],
      ["touchend", "touchEnd"],
      ["touchstart", "touchStart"],
      ["volumechange", "volumeChange"]
    ].forEach(function(e) {
      _n(e, !0);
    }),
      vn.forEach(function(e) {
        _n(e, !1);
      });
    var kn = {
        eventTypes: bn,
        isInteractiveTopLevelEventType: function(e) {
          return void 0 !== (e = wn[e]) && !0 === e.isInteractive;
        },
        extractEvents: function(e, t, n, r) {
          var o = wn[e];
          if (!o) return null;
          switch (e) {
            case "keypress":
              if (0 === cn(n)) return null;
            case "keydown":
            case "keyup":
              e = pn;
              break;
            case "blur":
            case "focus":
              e = un;
              break;
            case "click":
              if (2 === n.button) return null;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              e = Jt;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              e = hn;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              e = mn;
              break;
            case Z:
            case ee:
            case te:
              e = ln;
              break;
            case ne:
              e = gn;
              break;
            case "scroll":
              e = Vt;
              break;
            case "wheel":
              e = yn;
              break;
            case "copy":
            case "cut":
            case "paste":
              e = sn;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              e = Xt;
              break;
            default:
              e = ce;
          }
          return $((t = e.getPooled(o, t, n, r))), t;
        }
      },
      Cn = kn.isInteractiveTopLevelEventType,
      Tn = [];
    function Sn(e) {
      var t = e.targetInst,
        n = t;
      do {
        if (!n) {
          e.ancestors.push(n);
          break;
        }
        var r;
        for (r = n; r.return; ) r = r.return;
        if (!(r = 3 !== r.tag ? null : r.stateNode.containerInfo)) break;
        e.ancestors.push(n), (n = j(r));
      } while (n);
      for (n = 0; n < e.ancestors.length; n++) {
        t = e.ancestors[n];
        var o = qe(e.nativeEvent);
        r = e.topLevelType;
        for (var i = e.nativeEvent, a = null, l = 0; l < y.length; l++) {
          var s = y[l];
          s && (s = s.extractEvents(r, t, i, o)) && (a = S(a, s));
        }
        R(a, !1);
      }
    }
    var En = !0;
    function In(e, t) {
      if (!t) return null;
      var n = (Cn(e) ? Pn : On).bind(null, e);
      t.addEventListener(e, n, !1);
    }
    function xn(e, t) {
      if (!t) return null;
      var n = (Cn(e) ? Pn : On).bind(null, e);
      t.addEventListener(e, n, !0);
    }
    function Pn(e, t) {
      De(On, e, t);
    }
    function On(e, t) {
      if (En) {
        var n = qe(t);
        if (
          (null === (n = j(n)) ||
            "number" != typeof n.tag ||
            2 === rn(n) ||
            (n = null),
          Tn.length)
        ) {
          var r = Tn.pop();
          (r.topLevelType = e),
            (r.nativeEvent = t),
            (r.targetInst = n),
            (e = r);
        } else
          e = { topLevelType: e, nativeEvent: t, targetInst: n, ancestors: [] };
        try {
          Le(Sn, e);
        } finally {
          (e.topLevelType = null),
            (e.nativeEvent = null),
            (e.targetInst = null),
            (e.ancestors.length = 0),
            10 > Tn.length && Tn.push(e);
        }
      }
    }
    var Un = {},
      An = 0,
      Rn = "_reactListenersID" + ("" + Math.random()).slice(2);
    function Nn(e) {
      return (
        Object.prototype.hasOwnProperty.call(e, Rn) ||
          ((e[Rn] = An++), (Un[e[Rn]] = {})),
        Un[e[Rn]]
      );
    }
    function Dn(e) {
      if (
        void 0 ===
        (e = e || ("undefined" != typeof document ? document : void 0))
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch (t) {
        return e.body;
      }
    }
    function Mn(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function jn(e, t) {
      var n,
        r = Mn(e);
      for (e = 0; r; ) {
        if (3 === r.nodeType) {
          if (((n = e + r.textContent.length), e <= t && n >= t))
            return { node: r, offset: t - e };
          e = n;
        }
        e: {
          for (; r; ) {
            if (r.nextSibling) {
              r = r.nextSibling;
              break e;
            }
            r = r.parentNode;
          }
          r = void 0;
        }
        r = Mn(r);
      }
    }
    function Ln() {
      for (var e = window, t = Dn(); t instanceof e.HTMLIFrameElement; ) {
        try {
          e = t.contentDocument.defaultView;
        } catch (e) {
          break;
        }
        t = Dn(e.document);
      }
      return t;
    }
    function zn(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        (("input" === t &&
          ("text" === e.type ||
            "search" === e.type ||
            "tel" === e.type ||
            "url" === e.type ||
            "password" === e.type)) ||
          "textarea" === t ||
          "true" === e.contentEditable)
      );
    }
    var Fn = Q && "documentMode" in document && 11 >= document.documentMode,
      qn = {
        select: {
          phasedRegistrationNames: {
            bubbled: "onSelect",
            captured: "onSelectCapture"
          },
          dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
            " "
          )
        }
      },
      Vn = null,
      Hn = null,
      Wn = null,
      Bn = !1;
    function $n(e, t) {
      var n =
        t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
      return Bn || null == Vn || Vn !== Dn(n)
        ? null
        : ("selectionStart" in (n = Vn) && zn(n)
            ? (n = { start: n.selectionStart, end: n.selectionEnd })
            : (n = {
                anchorNode: (n = (
                  (n.ownerDocument && n.ownerDocument.defaultView) ||
                  window
                ).getSelection()).anchorNode,
                anchorOffset: n.anchorOffset,
                focusNode: n.focusNode,
                focusOffset: n.focusOffset
              }),
          Wn && nn(Wn, n)
            ? null
            : ((Wn = n),
              ((e = ce.getPooled(qn.select, Hn, e, t)).type = "select"),
              (e.target = Vn),
              $(e),
              e));
    }
    var Qn = {
      eventTypes: qn,
      extractEvents: function(e, t, n, r) {
        var o,
          i =
            r.window === r
              ? r.document
              : 9 === r.nodeType
                ? r
                : r.ownerDocument;
        if (!(o = !i)) {
          e: {
            (i = Nn(i)), (o = w.onSelect);
            for (var a = 0; a < o.length; a++) {
              var l = o[a];
              if (!i.hasOwnProperty(l) || !i[l]) {
                i = !1;
                break e;
              }
            }
            i = !0;
          }
          o = !i;
        }
        if (o) return null;
        switch (((i = t ? z(t) : window), e)) {
          case "focus":
            (Fe(i) || "true" === i.contentEditable) &&
              ((Vn = i), (Hn = t), (Wn = null));
            break;
          case "blur":
            Wn = Hn = Vn = null;
            break;
          case "mousedown":
            Bn = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            return (Bn = !1), $n(n, r);
          case "selectionchange":
            if (Fn) break;
          case "keydown":
          case "keyup":
            return $n(n, r);
        }
        return null;
      }
    };
    function Kn(e, t) {
      return (
        (e = o({ children: void 0 }, t)),
        (t = (function(e) {
          var t = "";
          return (
            r.Children.forEach(e, function(e) {
              null != e && (t += e);
            }),
            t
          );
        })(t.children)) && (e.children = t),
        e
      );
    }
    function Gn(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
        for (n = 0; n < e.length; n++)
          (o = t.hasOwnProperty("$" + e[n].value)),
            e[n].selected !== o && (e[n].selected = o),
            o && r && (e[n].defaultSelected = !0);
      } else {
        for (n = "" + wt(n), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === n)
            return (
              (e[o].selected = !0), void (r && (e[o].defaultSelected = !0))
            );
          null !== t || e[o].disabled || (t = e[o]);
        }
        null !== t && (t.selected = !0);
      }
    }
    function Jn(e, t) {
      return (
        null != t.dangerouslySetInnerHTML && a("91"),
        o({}, t, {
          value: void 0,
          defaultValue: void 0,
          children: "" + e._wrapperState.initialValue
        })
      );
    }
    function Xn(e, t) {
      var n = t.value;
      null == n &&
        ((n = t.defaultValue),
        null != (t = t.children) &&
          (null != n && a("92"),
          Array.isArray(t) && (1 >= t.length || a("93"), (t = t[0])),
          (n = t)),
        null == n && (n = "")),
        (e._wrapperState = { initialValue: wt(n) });
    }
    function Yn(e, t) {
      var n = wt(t.value),
        r = wt(t.defaultValue);
      null != n &&
        ((n = "" + n) !== e.value && (e.value = n),
        null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
        null != r && (e.defaultValue = "" + r);
    }
    function Zn(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue && (e.value = t);
    }
    U.injectEventPluginOrder(
      "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
        " "
      )
    ),
      (_ = F),
      (k = L),
      (C = z),
      U.injectEventPluginsByName({
        SimpleEventPlugin: kn,
        EnterLeaveEventPlugin: Zt,
        ChangeEventPlugin: qt,
        SelectEventPlugin: Qn,
        BeforeInputEventPlugin: Ie
      });
    var er = {
      html: "http://www.w3.org/1999/xhtml",
      mathml: "http://www.w3.org/1998/Math/MathML",
      svg: "http://www.w3.org/2000/svg"
    };
    function tr(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function nr(e, t) {
      return null == e || "http://www.w3.org/1999/xhtml" === e
        ? tr(t)
        : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
          ? "http://www.w3.org/1999/xhtml"
          : e;
    }
    var rr = void 0,
      or = (function(e) {
        return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function(t, n, r, o) {
              MSApp.execUnsafeLocalFunction(function() {
                return e(t, n);
              });
            }
          : e;
      })(function(e, t) {
        if (e.namespaceURI !== er.svg || "innerHTML" in e) e.innerHTML = t;
        else {
          for (
            (rr = rr || document.createElement("div")).innerHTML =
              "<svg>" + t + "</svg>",
              t = rr.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      });
    function ir(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && 3 === n.nodeType)
          return void (n.nodeValue = t);
      }
      e.textContent = t;
    }
    var ar = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
      },
      lr = ["Webkit", "ms", "Moz", "O"];
    function sr(e, t) {
      for (var n in ((e = e.style), t))
        if (t.hasOwnProperty(n)) {
          var r = 0 === n.indexOf("--"),
            o = n,
            i = t[n];
          (o =
            null == i || "boolean" == typeof i || "" === i
              ? ""
              : r ||
                "number" != typeof i ||
                0 === i ||
                (ar.hasOwnProperty(o) && ar[o])
                ? ("" + i).trim()
                : i + "px"),
            "float" === n && (n = "cssFloat"),
            r ? e.setProperty(n, o) : (e[n] = o);
        }
    }
    Object.keys(ar).forEach(function(e) {
      lr.forEach(function(t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ar[t] = ar[e]);
      });
    });
    var ur = o(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
      }
    );
    function cr(e, t) {
      t &&
        (ur[e] &&
          (null != t.children || null != t.dangerouslySetInnerHTML) &&
          a("137", e, ""),
        null != t.dangerouslySetInnerHTML &&
          (null != t.children && a("60"),
          ("object" == typeof t.dangerouslySetInnerHTML &&
            "__html" in t.dangerouslySetInnerHTML) ||
            a("61")),
        null != t.style && "object" != typeof t.style && a("62", ""));
    }
    function dr(e, t) {
      if (-1 === e.indexOf("-")) return "string" == typeof t.is;
      switch (e) {
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
    function fr(e, t) {
      var n = Nn(
        (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument)
      );
      t = w[t];
      for (var r = 0; r < t.length; r++) {
        var o = t[r];
        if (!n.hasOwnProperty(o) || !n[o]) {
          switch (o) {
            case "scroll":
              xn("scroll", e);
              break;
            case "focus":
            case "blur":
              xn("focus", e), xn("blur", e), (n.blur = !0), (n.focus = !0);
              break;
            case "cancel":
            case "close":
              Ve(o) && xn(o, e);
              break;
            case "invalid":
            case "submit":
            case "reset":
              break;
            default:
              -1 === re.indexOf(o) && In(o, e);
          }
          n[o] = !0;
        }
      }
    }
    function pr() {}
    var hr = null,
      mr = null;
    function gr(e, t) {
      switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!t.autoFocus;
      }
      return !1;
    }
    function yr(e, t) {
      return (
        "textarea" === e ||
        "option" === e ||
        "noscript" === e ||
        "string" == typeof t.children ||
        "number" == typeof t.children ||
        ("object" == typeof t.dangerouslySetInnerHTML &&
          null !== t.dangerouslySetInnerHTML &&
          null != t.dangerouslySetInnerHTML.__html)
      );
    }
    var vr = setTimeout,
      br = clearTimeout;
    function wr(e) {
      for (e = e.nextSibling; e && 1 !== e.nodeType && 3 !== e.nodeType; )
        e = e.nextSibling;
      return e;
    }
    function _r(e) {
      for (e = e.firstChild; e && 1 !== e.nodeType && 3 !== e.nodeType; )
        e = e.nextSibling;
      return e;
    }
    new Set();
    var kr = [],
      Cr = -1;
    function Tr(e) {
      0 > Cr || ((e.current = kr[Cr]), (kr[Cr] = null), Cr--);
    }
    function Sr(e, t) {
      (kr[++Cr] = e.current), (e.current = t);
    }
    var Er = {},
      Ir = { current: Er },
      xr = { current: !1 },
      Pr = Er;
    function Or(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Er;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var o,
        i = {};
      for (o in n) i[o] = t[o];
      return (
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
      );
    }
    function Ur(e) {
      return null !== (e = e.childContextTypes) && void 0 !== e;
    }
    function Ar(e) {
      Tr(xr), Tr(Ir);
    }
    function Rr(e) {
      Tr(xr), Tr(Ir);
    }
    function Nr(e, t, n) {
      Ir.current !== Er && a("168"), Sr(Ir, t), Sr(xr, n);
    }
    function Dr(e, t, n) {
      var r = e.stateNode;
      if (((e = t.childContextTypes), "function" != typeof r.getChildContext))
        return n;
      for (var i in (r = r.getChildContext()))
        i in e || a("108", ut(t) || "Unknown", i);
      return o({}, n, r);
    }
    function Mr(e) {
      var t = e.stateNode;
      return (
        (t = (t && t.__reactInternalMemoizedMergedChildContext) || Er),
        (Pr = Ir.current),
        Sr(Ir, t),
        Sr(xr, xr.current),
        !0
      );
    }
    function jr(e, t, n) {
      var r = e.stateNode;
      r || a("169"),
        n
          ? ((t = Dr(e, t, Pr)),
            (r.__reactInternalMemoizedMergedChildContext = t),
            Tr(xr),
            Tr(Ir),
            Sr(Ir, t))
          : Tr(xr),
        Sr(xr, n);
    }
    var Lr = null,
      zr = null;
    function Fr(e) {
      return function(t) {
        try {
          return e(t);
        } catch (e) {}
      };
    }
    function qr(e, t, n, r) {
      return new function(e, t, n, r) {
        (this.tag = e),
          (this.key = n),
          (this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
          (this.index = 0),
          (this.ref = null),
          (this.pendingProps = t),
          (this.firstContextDependency = this.memoizedState = this.updateQueue = this.memoizedProps = null),
          (this.mode = r),
          (this.effectTag = 0),
          (this.lastEffect = this.firstEffect = this.nextEffect = null),
          (this.childExpirationTime = this.expirationTime = 0),
          (this.alternate = null);
      }(e, t, n, r);
    }
    function Vr(e) {
      return !(!(e = e.prototype) || !e.isReactComponent);
    }
    function Hr(e, t) {
      var n = e.alternate;
      return (
        null === n
          ? (((n = qr(e.tag, t, e.key, e.mode)).elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.effectTag = 0),
            (n.nextEffect = null),
            (n.firstEffect = null),
            (n.lastEffect = null)),
        (n.childExpirationTime = e.childExpirationTime),
        (n.expirationTime = e.expirationTime),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (n.firstContextDependency = e.firstContextDependency),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function Wr(e, t, n, r, o, i) {
      var l = 2;
      if (((r = e), "function" == typeof e)) Vr(e) && (l = 1);
      else if ("string" == typeof e) l = 5;
      else
        e: switch (e) {
          case Xe:
            return Br(n.children, o, i, t);
          case nt:
            return $r(n, 3 | o, i, t);
          case Ye:
            return $r(n, 2 | o, i, t);
          case Ze:
            return (
              ((e = qr(12, n, t, 4 | o)).elementType = Ze),
              (e.type = Ze),
              (e.expirationTime = i),
              e
            );
          case ot:
            return (
              ((e = qr(13, n, t, o)).elementType = ot),
              (e.type = ot),
              (e.expirationTime = i),
              e
            );
          default:
            if ("object" == typeof e && null !== e)
              switch (e.$$typeof) {
                case et:
                  l = 10;
                  break e;
                case tt:
                  l = 9;
                  break e;
                case rt:
                  l = 11;
                  break e;
                case it:
                  l = 14;
                  break e;
                case at:
                  (l = 16), (r = null);
                  break e;
              }
            a("130", null == e ? e : typeof e, "");
        }
      return (
        ((t = qr(l, n, t, o)).elementType = e),
        (t.type = r),
        (t.expirationTime = i),
        t
      );
    }
    function Br(e, t, n, r) {
      return ((e = qr(7, e, r, t)).expirationTime = n), e;
    }
    function $r(e, t, n, r) {
      return (
        (e = qr(8, e, r, t)),
        (t = 0 == (1 & t) ? Ye : nt),
        (e.elementType = t),
        (e.type = t),
        (e.expirationTime = n),
        e
      );
    }
    function Qr(e, t, n) {
      return ((e = qr(6, e, null, t)).expirationTime = n), e;
    }
    function Kr(e, t, n) {
      return (
        ((t = qr(
          4,
          null !== e.children ? e.children : [],
          e.key,
          t
        )).expirationTime = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation
        }),
        t
      );
    }
    function Gr(e, t) {
      e.didError = !1;
      var n = e.earliestPendingTime;
      0 === n
        ? (e.earliestPendingTime = e.latestPendingTime = t)
        : n > t
          ? (e.earliestPendingTime = t)
          : e.latestPendingTime < t && (e.latestPendingTime = t),
        Yr(t, e);
    }
    function Jr(e, t) {
      e.didError = !1;
      var n = e.latestPingedTime;
      0 !== n && n <= t && (e.latestPingedTime = 0),
        (n = e.earliestPendingTime);
      var r = e.latestPendingTime;
      n === t
        ? (e.earliestPendingTime = r === t ? (e.latestPendingTime = 0) : r)
        : r === t && (e.latestPendingTime = n),
        (n = e.earliestSuspendedTime),
        (r = e.latestSuspendedTime),
        0 === n
          ? (e.earliestSuspendedTime = e.latestSuspendedTime = t)
          : n > t
            ? (e.earliestSuspendedTime = t)
            : r < t && (e.latestSuspendedTime = t),
        Yr(t, e);
    }
    function Xr(e, t) {
      var n = e.earliestPendingTime;
      return (
        (e = e.earliestSuspendedTime),
        (0 === t || (0 !== n && n < t)) && (t = n),
        (0 === t || (0 !== e && e < t)) && (t = e),
        t
      );
    }
    function Yr(e, t) {
      var n = t.earliestSuspendedTime,
        r = t.latestSuspendedTime,
        o = t.earliestPendingTime,
        i = t.latestPingedTime;
      0 === (o = 0 !== o ? o : i) && (0 === e || r > e) && (o = r),
        0 !== (e = o) && 0 !== n && n < e && (e = n),
        (t.nextExpirationTimeToWorkOn = o),
        (t.expirationTime = e);
    }
    var Zr = !1;
    function eo(e) {
      return {
        baseState: e,
        firstUpdate: null,
        lastUpdate: null,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null
      };
    }
    function to(e) {
      return {
        baseState: e.baseState,
        firstUpdate: e.firstUpdate,
        lastUpdate: e.lastUpdate,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null
      };
    }
    function no(e) {
      return {
        expirationTime: e,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
        nextEffect: null
      };
    }
    function ro(e, t) {
      null === e.lastUpdate
        ? (e.firstUpdate = e.lastUpdate = t)
        : ((e.lastUpdate.next = t), (e.lastUpdate = t));
    }
    function oo(e, t) {
      var n = e.alternate;
      if (null === n) {
        var r = e.updateQueue,
          o = null;
        null === r && (r = e.updateQueue = eo(e.memoizedState));
      } else
        (r = e.updateQueue),
          (o = n.updateQueue),
          null === r
            ? null === o
              ? ((r = e.updateQueue = eo(e.memoizedState)),
                (o = n.updateQueue = eo(n.memoizedState)))
              : (r = e.updateQueue = to(o))
            : null === o && (o = n.updateQueue = to(r));
      null === o || r === o
        ? ro(r, t)
        : null === r.lastUpdate || null === o.lastUpdate
          ? (ro(r, t), ro(o, t))
          : (ro(r, t), (o.lastUpdate = t));
    }
    function io(e, t) {
      var n = e.updateQueue;
      null ===
      (n = null === n ? (e.updateQueue = eo(e.memoizedState)) : ao(e, n))
        .lastCapturedUpdate
        ? (n.firstCapturedUpdate = n.lastCapturedUpdate = t)
        : ((n.lastCapturedUpdate.next = t), (n.lastCapturedUpdate = t));
    }
    function ao(e, t) {
      var n = e.alternate;
      return (
        null !== n && t === n.updateQueue && (t = e.updateQueue = to(t)), t
      );
    }
    function lo(e, t, n, r, i, a) {
      switch (n.tag) {
        case 1:
          return "function" == typeof (e = n.payload) ? e.call(a, r, i) : e;
        case 3:
          e.effectTag = (-1025 & e.effectTag) | 64;
        case 0:
          if (
            null ===
              (i =
                "function" == typeof (e = n.payload) ? e.call(a, r, i) : e) ||
            void 0 === i
          )
            break;
          return o({}, r, i);
        case 2:
          Zr = !0;
      }
      return r;
    }
    function so(e, t, n, r, o) {
      Zr = !1;
      for (
        var i = (t = ao(e, t)).baseState,
          a = null,
          l = 0,
          s = t.firstUpdate,
          u = i;
        null !== s;

      ) {
        var c = s.expirationTime;
        c > o
          ? (null === a && ((a = s), (i = u)), (0 === l || l > c) && (l = c))
          : ((u = lo(e, 0, s, u, n, r)),
            null !== s.callback &&
              ((e.effectTag |= 32),
              (s.nextEffect = null),
              null === t.lastEffect
                ? (t.firstEffect = t.lastEffect = s)
                : ((t.lastEffect.nextEffect = s), (t.lastEffect = s)))),
          (s = s.next);
      }
      for (c = null, s = t.firstCapturedUpdate; null !== s; ) {
        var d = s.expirationTime;
        d > o
          ? (null === c && ((c = s), null === a && (i = u)),
            (0 === l || l > d) && (l = d))
          : ((u = lo(e, 0, s, u, n, r)),
            null !== s.callback &&
              ((e.effectTag |= 32),
              (s.nextEffect = null),
              null === t.lastCapturedEffect
                ? (t.firstCapturedEffect = t.lastCapturedEffect = s)
                : ((t.lastCapturedEffect.nextEffect = s),
                  (t.lastCapturedEffect = s)))),
          (s = s.next);
      }
      null === a && (t.lastUpdate = null),
        null === c ? (t.lastCapturedUpdate = null) : (e.effectTag |= 32),
        null === a && null === c && (i = u),
        (t.baseState = i),
        (t.firstUpdate = a),
        (t.firstCapturedUpdate = c),
        (e.expirationTime = l),
        (e.memoizedState = u);
    }
    function uo(e, t, n) {
      null !== t.firstCapturedUpdate &&
        (null !== t.lastUpdate &&
          ((t.lastUpdate.next = t.firstCapturedUpdate),
          (t.lastUpdate = t.lastCapturedUpdate)),
        (t.firstCapturedUpdate = t.lastCapturedUpdate = null)),
        co(t.firstEffect, n),
        (t.firstEffect = t.lastEffect = null),
        co(t.firstCapturedEffect, n),
        (t.firstCapturedEffect = t.lastCapturedEffect = null);
    }
    function co(e, t) {
      for (; null !== e; ) {
        var n = e.callback;
        if (null !== n) {
          e.callback = null;
          var r = t;
          "function" != typeof n && a("191", n), n.call(r);
        }
        e = e.nextEffect;
      }
    }
    function fo(e, t) {
      return { value: e, source: t, stack: ct(t) };
    }
    var po = { current: null },
      ho = null,
      mo = null,
      go = null;
    function yo(e, t) {
      var n = e.type._context;
      Sr(po, n._currentValue), (n._currentValue = t);
    }
    function vo(e) {
      var t = po.current;
      Tr(po), (e.type._context._currentValue = t);
    }
    function bo(e) {
      (ho = e), (go = mo = null), (e.firstContextDependency = null);
    }
    function wo(e, t) {
      return (
        go !== e &&
          !1 !== t &&
          0 !== t &&
          (("number" == typeof t && 1073741823 !== t) ||
            ((go = e), (t = 1073741823)),
          (t = { context: e, observedBits: t, next: null }),
          null === mo
            ? (null === ho && a("293"), (ho.firstContextDependency = mo = t))
            : (mo = mo.next = t)),
        e._currentValue
      );
    }
    var _o = {},
      ko = { current: _o },
      Co = { current: _o },
      To = { current: _o };
    function So(e) {
      return e === _o && a("174"), e;
    }
    function Eo(e, t) {
      Sr(To, t), Sr(Co, e), Sr(ko, _o);
      var n = t.nodeType;
      switch (n) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : nr(null, "");
          break;
        default:
          t = nr(
            (t = (n = 8 === n ? t.parentNode : t).namespaceURI || null),
            (n = n.tagName)
          );
      }
      Tr(ko), Sr(ko, t);
    }
    function Io(e) {
      Tr(ko), Tr(Co), Tr(To);
    }
    function xo(e) {
      So(To.current);
      var t = So(ko.current),
        n = nr(t, e.type);
      t !== n && (Sr(Co, e), Sr(ko, n));
    }
    function Po(e) {
      Co.current === e && (Tr(ko), Tr(Co));
    }
    var Oo = $e.ReactCurrentOwner,
      Uo = new r.Component().refs;
    function Ao(e, t, n, r) {
      (n =
        null === (n = n(r, (t = e.memoizedState))) || void 0 === n
          ? t
          : o({}, t, n)),
        (e.memoizedState = n),
        null !== (r = e.updateQueue) &&
          0 === e.expirationTime &&
          (r.baseState = n);
    }
    var Ro = {
      isMounted: function(e) {
        return !!(e = e._reactInternalFiber) && 2 === rn(e);
      },
      enqueueSetState: function(e, t, n) {
        e = e._reactInternalFiber;
        var r = Ca(),
          o = no((r = $i(r, e)));
        (o.payload = t),
          void 0 !== n && null !== n && (o.callback = n),
          oo(e, o),
          Gi(e, r);
      },
      enqueueReplaceState: function(e, t, n) {
        e = e._reactInternalFiber;
        var r = Ca(),
          o = no((r = $i(r, e)));
        (o.tag = 1),
          (o.payload = t),
          void 0 !== n && null !== n && (o.callback = n),
          oo(e, o),
          Gi(e, r);
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternalFiber;
        var n = Ca(),
          r = no((n = $i(n, e)));
        (r.tag = 2),
          void 0 !== t && null !== t && (r.callback = t),
          oo(e, r),
          Gi(e, n);
      }
    };
    function No(e, t, n, r, o, i, a) {
      return "function" == typeof (e = e.stateNode).shouldComponentUpdate
        ? e.shouldComponentUpdate(r, i, a)
        : !t.prototype ||
            !t.prototype.isPureReactComponent ||
            (!nn(n, r) || !nn(o, i));
    }
    function Do(e, t, n) {
      var r = !1,
        o = Er,
        i = t.contextType;
      return (
        "object" == typeof i && null !== i
          ? (i = Oo.currentDispatcher.readContext(i))
          : ((o = Ur(t) ? Pr : Ir.current),
            (i = (r = null !== (r = t.contextTypes) && void 0 !== r)
              ? Or(e, o)
              : Er)),
        (t = new t(n, i)),
        (e.memoizedState =
          null !== t.state && void 0 !== t.state ? t.state : null),
        (t.updater = Ro),
        (e.stateNode = t),
        (t._reactInternalFiber = e),
        r &&
          (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = o),
          (e.__reactInternalMemoizedMaskedChildContext = i)),
        t
      );
    }
    function Mo(e, t, n, r) {
      (e = t.state),
        "function" == typeof t.componentWillReceiveProps &&
          t.componentWillReceiveProps(n, r),
        "function" == typeof t.UNSAFE_componentWillReceiveProps &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && Ro.enqueueReplaceState(t, t.state, null);
    }
    function jo(e, t, n, r) {
      var o = e.stateNode;
      (o.props = n), (o.state = e.memoizedState), (o.refs = Uo);
      var i = t.contextType;
      "object" == typeof i && null !== i
        ? (o.context = Oo.currentDispatcher.readContext(i))
        : ((i = Ur(t) ? Pr : Ir.current), (o.context = Or(e, i))),
        null !== (i = e.updateQueue) &&
          (so(e, i, n, o, r), (o.state = e.memoizedState)),
        "function" == typeof (i = t.getDerivedStateFromProps) &&
          (Ao(e, t, i, n), (o.state = e.memoizedState)),
        "function" == typeof t.getDerivedStateFromProps ||
          "function" == typeof o.getSnapshotBeforeUpdate ||
          ("function" != typeof o.UNSAFE_componentWillMount &&
            "function" != typeof o.componentWillMount) ||
          ((t = o.state),
          "function" == typeof o.componentWillMount && o.componentWillMount(),
          "function" == typeof o.UNSAFE_componentWillMount &&
            o.UNSAFE_componentWillMount(),
          t !== o.state && Ro.enqueueReplaceState(o, o.state, null),
          null !== (i = e.updateQueue) &&
            (so(e, i, n, o, r), (o.state = e.memoizedState))),
        "function" == typeof o.componentDidMount && (e.effectTag |= 4);
    }
    var Lo = Array.isArray;
    function zo(e, t, n) {
      if (
        null !== (e = n.ref) &&
        "function" != typeof e &&
        "object" != typeof e
      ) {
        if (n._owner) {
          var r = void 0;
          (n = n._owner) && (1 !== n.tag && a("289"), (r = n.stateNode)),
            r || a("147", e);
          var o = "" + e;
          return null !== t &&
            null !== t.ref &&
            "function" == typeof t.ref &&
            t.ref._stringRef === o
            ? t.ref
            : (((t = function(e) {
                var t = r.refs;
                t === Uo && (t = r.refs = {}),
                  null === e ? delete t[o] : (t[o] = e);
              })._stringRef = o),
              t);
        }
        "string" != typeof e && a("284"), n._owner || a("290", e);
      }
      return e;
    }
    function Fo(e, t) {
      "textarea" !== e.type &&
        a(
          "31",
          "[object Object]" === Object.prototype.toString.call(t)
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : t,
          ""
        );
    }
    function qo(e) {
      function t(t, n) {
        if (e) {
          var r = t.lastEffect;
          null !== r
            ? ((r.nextEffect = n), (t.lastEffect = n))
            : (t.firstEffect = t.lastEffect = n),
            (n.nextEffect = null),
            (n.effectTag = 8);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; null !== r; ) t(n, r), (r = r.sibling);
        return null;
      }
      function r(e, t) {
        for (e = new Map(); null !== t; )
          null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
        return e;
      }
      function o(e, t, n) {
        return ((e = Hr(e, t)).index = 0), (e.sibling = null), e;
      }
      function i(t, n, r) {
        return (
          (t.index = r),
          e
            ? null !== (r = t.alternate)
              ? (r = r.index) < n
                ? ((t.effectTag = 2), n)
                : r
              : ((t.effectTag = 2), n)
            : n
        );
      }
      function l(t) {
        return e && null === t.alternate && (t.effectTag = 2), t;
      }
      function s(e, t, n, r) {
        return null === t || 6 !== t.tag
          ? (((t = Qr(n, e.mode, r)).return = e), t)
          : (((t = o(t, n)).return = e), t);
      }
      function u(e, t, n, r) {
        return null !== t && t.elementType === n.type
          ? (((r = o(t, n.props)).ref = zo(e, t, n)), (r.return = e), r)
          : (((r = Wr(n.type, n.key, n.props, null, e.mode, r)).ref = zo(
              e,
              t,
              n
            )),
            (r.return = e),
            r);
      }
      function c(e, t, n, r) {
        return null === t ||
          4 !== t.tag ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? (((t = Kr(n, e.mode, r)).return = e), t)
          : (((t = o(t, n.children || [])).return = e), t);
      }
      function d(e, t, n, r, i) {
        return null === t || 7 !== t.tag
          ? (((t = Br(n, e.mode, r, i)).return = e), t)
          : (((t = o(t, n)).return = e), t);
      }
      function f(e, t, n) {
        if ("string" == typeof t || "number" == typeof t)
          return ((t = Qr("" + t, e.mode, n)).return = e), t;
        if ("object" == typeof t && null !== t) {
          switch (t.$$typeof) {
            case Ge:
              return (
                ((n = Wr(t.type, t.key, t.props, null, e.mode, n)).ref = zo(
                  e,
                  null,
                  t
                )),
                (n.return = e),
                n
              );
            case Je:
              return ((t = Kr(t, e.mode, n)).return = e), t;
          }
          if (Lo(t) || st(t))
            return ((t = Br(t, e.mode, n, null)).return = e), t;
          Fo(e, t);
        }
        return null;
      }
      function p(e, t, n, r) {
        var o = null !== t ? t.key : null;
        if ("string" == typeof n || "number" == typeof n)
          return null !== o ? null : s(e, t, "" + n, r);
        if ("object" == typeof n && null !== n) {
          switch (n.$$typeof) {
            case Ge:
              return n.key === o
                ? n.type === Xe
                  ? d(e, t, n.props.children, r, o)
                  : u(e, t, n, r)
                : null;
            case Je:
              return n.key === o ? c(e, t, n, r) : null;
          }
          if (Lo(n) || st(n)) return null !== o ? null : d(e, t, n, r, null);
          Fo(e, n);
        }
        return null;
      }
      function h(e, t, n, r, o) {
        if ("string" == typeof r || "number" == typeof r)
          return s(t, (e = e.get(n) || null), "" + r, o);
        if ("object" == typeof r && null !== r) {
          switch (r.$$typeof) {
            case Ge:
              return (
                (e = e.get(null === r.key ? n : r.key) || null),
                r.type === Xe
                  ? d(t, e, r.props.children, o, r.key)
                  : u(t, e, r, o)
              );
            case Je:
              return c(
                t,
                (e = e.get(null === r.key ? n : r.key) || null),
                r,
                o
              );
          }
          if (Lo(r) || st(r)) return d(t, (e = e.get(n) || null), r, o, null);
          Fo(t, r);
        }
        return null;
      }
      function m(o, a, l, s) {
        for (
          var u = null, c = null, d = a, m = (a = 0), g = null;
          null !== d && m < l.length;
          m++
        ) {
          d.index > m ? ((g = d), (d = null)) : (g = d.sibling);
          var y = p(o, d, l[m], s);
          if (null === y) {
            null === d && (d = g);
            break;
          }
          e && d && null === y.alternate && t(o, d),
            (a = i(y, a, m)),
            null === c ? (u = y) : (c.sibling = y),
            (c = y),
            (d = g);
        }
        if (m === l.length) return n(o, d), u;
        if (null === d) {
          for (; m < l.length; m++)
            (d = f(o, l[m], s)) &&
              ((a = i(d, a, m)),
              null === c ? (u = d) : (c.sibling = d),
              (c = d));
          return u;
        }
        for (d = r(o, d); m < l.length; m++)
          (g = h(d, o, m, l[m], s)) &&
            (e && null !== g.alternate && d.delete(null === g.key ? m : g.key),
            (a = i(g, a, m)),
            null === c ? (u = g) : (c.sibling = g),
            (c = g));
        return (
          e &&
            d.forEach(function(e) {
              return t(o, e);
            }),
          u
        );
      }
      function g(o, l, s, u) {
        var c = st(s);
        "function" != typeof c && a("150"), null == (s = c.call(s)) && a("151");
        for (
          var d = (c = null), m = l, g = (l = 0), y = null, v = s.next();
          null !== m && !v.done;
          g++, v = s.next()
        ) {
          m.index > g ? ((y = m), (m = null)) : (y = m.sibling);
          var b = p(o, m, v.value, u);
          if (null === b) {
            m || (m = y);
            break;
          }
          e && m && null === b.alternate && t(o, m),
            (l = i(b, l, g)),
            null === d ? (c = b) : (d.sibling = b),
            (d = b),
            (m = y);
        }
        if (v.done) return n(o, m), c;
        if (null === m) {
          for (; !v.done; g++, v = s.next())
            null !== (v = f(o, v.value, u)) &&
              ((l = i(v, l, g)),
              null === d ? (c = v) : (d.sibling = v),
              (d = v));
          return c;
        }
        for (m = r(o, m); !v.done; g++, v = s.next())
          null !== (v = h(m, o, g, v.value, u)) &&
            (e && null !== v.alternate && m.delete(null === v.key ? g : v.key),
            (l = i(v, l, g)),
            null === d ? (c = v) : (d.sibling = v),
            (d = v));
        return (
          e &&
            m.forEach(function(e) {
              return t(o, e);
            }),
          c
        );
      }
      return function(e, r, i, s) {
        var u =
          "object" == typeof i && null !== i && i.type === Xe && null === i.key;
        u && (i = i.props.children);
        var c = "object" == typeof i && null !== i;
        if (c)
          switch (i.$$typeof) {
            case Ge:
              e: {
                for (c = i.key, u = r; null !== u; ) {
                  if (u.key === c) {
                    if (
                      7 === u.tag ? i.type === Xe : u.elementType === i.type
                    ) {
                      n(e, u.sibling),
                        ((r = o(
                          u,
                          i.type === Xe ? i.props.children : i.props
                        )).ref = zo(e, u, i)),
                        (r.return = e),
                        (e = r);
                      break e;
                    }
                    n(e, u);
                    break;
                  }
                  t(e, u), (u = u.sibling);
                }
                i.type === Xe
                  ? (((r = Br(i.props.children, e.mode, s, i.key)).return = e),
                    (e = r))
                  : (((s = Wr(
                      i.type,
                      i.key,
                      i.props,
                      null,
                      e.mode,
                      s
                    )).ref = zo(e, r, i)),
                    (s.return = e),
                    (e = s));
              }
              return l(e);
            case Je:
              e: {
                for (u = i.key; null !== r; ) {
                  if (r.key === u) {
                    if (
                      4 === r.tag &&
                      r.stateNode.containerInfo === i.containerInfo &&
                      r.stateNode.implementation === i.implementation
                    ) {
                      n(e, r.sibling),
                        ((r = o(r, i.children || [])).return = e),
                        (e = r);
                      break e;
                    }
                    n(e, r);
                    break;
                  }
                  t(e, r), (r = r.sibling);
                }
                ((r = Kr(i, e.mode, s)).return = e), (e = r);
              }
              return l(e);
          }
        if ("string" == typeof i || "number" == typeof i)
          return (
            (i = "" + i),
            null !== r && 6 === r.tag
              ? (n(e, r.sibling), ((r = o(r, i)).return = e), (e = r))
              : (n(e, r), ((r = Qr(i, e.mode, s)).return = e), (e = r)),
            l(e)
          );
        if (Lo(i)) return m(e, r, i, s);
        if (st(i)) return g(e, r, i, s);
        if ((c && Fo(e, i), void 0 === i && !u))
          switch (e.tag) {
            case 1:
            case 0:
              a("152", (s = e.type).displayName || s.name || "Component");
          }
        return n(e, r);
      };
    }
    var Vo = qo(!0),
      Ho = qo(!1),
      Wo = null,
      Bo = null,
      $o = !1;
    function Qo(e, t) {
      var n = qr(5, null, null, 0);
      (n.elementType = "DELETED"),
        (n.type = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (n.effectTag = 8),
        null !== e.lastEffect
          ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
          : (e.firstEffect = e.lastEffect = n);
    }
    function Ko(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            null !==
              (t =
                1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase()
                  ? null
                  : t) && ((e.stateNode = t), !0)
          );
        case 6:
          return (
            null !==
              (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
            ((e.stateNode = t), !0)
          );
        default:
          return !1;
      }
    }
    function Go(e) {
      if ($o) {
        var t = Bo;
        if (t) {
          var n = t;
          if (!Ko(e, t)) {
            if (!(t = wr(n)) || !Ko(e, t))
              return (e.effectTag |= 2), ($o = !1), void (Wo = e);
            Qo(Wo, n);
          }
          (Wo = e), (Bo = _r(t));
        } else (e.effectTag |= 2), ($o = !1), (Wo = e);
      }
    }
    function Jo(e) {
      for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag; )
        e = e.return;
      Wo = e;
    }
    function Xo(e) {
      if (e !== Wo) return !1;
      if (!$o) return Jo(e), ($o = !0), !1;
      var t = e.type;
      if (
        5 !== e.tag ||
        ("head" !== t && "body" !== t && !yr(t, e.memoizedProps))
      )
        for (t = Bo; t; ) Qo(e, t), (t = wr(t));
      return Jo(e), (Bo = Wo ? wr(e.stateNode) : null), !0;
    }
    function Yo() {
      (Bo = Wo = null), ($o = !1);
    }
    var Zo = $e.ReactCurrentOwner;
    function ei(e, t, n, r) {
      t.child = null === e ? Ho(t, null, n, r) : Vo(t, e.child, n, r);
    }
    function ti(e, t, n, r, o) {
      n = n.render;
      var i = t.ref;
      return xr.current ||
        t.memoizedProps !== r ||
        i !== (null !== e ? e.ref : null)
        ? (ei(e, t, (r = n(r, i)), o), t.child)
        : di(e, t, o);
    }
    function ni(e, t, n, r, o, i) {
      if (null === e) {
        var a = n.type;
        return "function" != typeof a ||
          Vr(a) ||
          void 0 !== a.defaultProps ||
          null !== n.compare
          ? (((e = Wr(n.type, null, r, null, t.mode, i)).ref = t.ref),
            (e.return = t),
            (t.child = e))
          : ((t.tag = 15), (t.type = a), ri(e, t, a, r, o, i));
      }
      return (
        (a = e.child),
        (0 === o || o > i) &&
        ((o = a.memoizedProps),
        (n = null !== (n = n.compare) ? n : nn)(o, r) && e.ref === t.ref)
          ? di(e, t, i)
          : (((e = Hr(a, r)).ref = t.ref), (e.return = t), (t.child = e))
      );
    }
    function ri(e, t, n, r, o, i) {
      return null !== e &&
        (0 === o || o > i) &&
        nn(e.memoizedProps, r) &&
        e.ref === t.ref
        ? di(e, t, i)
        : ii(e, t, n, r, i);
    }
    function oi(e, t) {
      var n = t.ref;
      ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
        (t.effectTag |= 128);
    }
    function ii(e, t, n, r, o) {
      var i = Ur(n) ? Pr : Ir.current;
      return (
        (i = Or(t, i)),
        bo(t),
        (n = n(r, i)),
        (t.effectTag |= 1),
        ei(e, t, n, o),
        t.child
      );
    }
    function ai(e, t, n, r, o) {
      if (Ur(n)) {
        var i = !0;
        Mr(t);
      } else i = !1;
      if ((bo(t), null === t.stateNode))
        null !== e &&
          ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
          Do(t, n, r),
          jo(t, n, r, o),
          (r = !0);
      else if (null === e) {
        var a = t.stateNode,
          l = t.memoizedProps;
        a.props = l;
        var s = a.context,
          u = n.contextType;
        "object" == typeof u && null !== u
          ? (u = Oo.currentDispatcher.readContext(u))
          : (u = Or(t, (u = Ur(n) ? Pr : Ir.current)));
        var c = n.getDerivedStateFromProps,
          d =
            "function" == typeof c ||
            "function" == typeof a.getSnapshotBeforeUpdate;
        d ||
          ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
            "function" != typeof a.componentWillReceiveProps) ||
          ((l !== r || s !== u) && Mo(t, a, r, u)),
          (Zr = !1);
        var f = t.memoizedState;
        s = a.state = f;
        var p = t.updateQueue;
        null !== p && (so(t, p, r, a, o), (s = t.memoizedState)),
          l !== r || f !== s || xr.current || Zr
            ? ("function" == typeof c &&
                (Ao(t, n, c, r), (s = t.memoizedState)),
              (l = Zr || No(t, n, l, r, f, s, u))
                ? (d ||
                    ("function" != typeof a.UNSAFE_componentWillMount &&
                      "function" != typeof a.componentWillMount) ||
                    ("function" == typeof a.componentWillMount &&
                      a.componentWillMount(),
                    "function" == typeof a.UNSAFE_componentWillMount &&
                      a.UNSAFE_componentWillMount()),
                  "function" == typeof a.componentDidMount &&
                    (t.effectTag |= 4))
                : ("function" == typeof a.componentDidMount &&
                    (t.effectTag |= 4),
                  (t.memoizedProps = r),
                  (t.memoizedState = s)),
              (a.props = r),
              (a.state = s),
              (a.context = u),
              (r = l))
            : ("function" == typeof a.componentDidMount && (t.effectTag |= 4),
              (r = !1));
      } else
        (a = t.stateNode),
          (l = t.memoizedProps),
          (a.props = l),
          (s = a.context),
          "object" == typeof (u = n.contextType) && null !== u
            ? (u = Oo.currentDispatcher.readContext(u))
            : (u = Or(t, (u = Ur(n) ? Pr : Ir.current))),
          (d =
            "function" == typeof (c = n.getDerivedStateFromProps) ||
            "function" == typeof a.getSnapshotBeforeUpdate) ||
            ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
              "function" != typeof a.componentWillReceiveProps) ||
            ((l !== r || s !== u) && Mo(t, a, r, u)),
          (Zr = !1),
          (s = t.memoizedState),
          (f = a.state = s),
          null !== (p = t.updateQueue) &&
            (so(t, p, r, a, o), (f = t.memoizedState)),
          l !== r || s !== f || xr.current || Zr
            ? ("function" == typeof c &&
                (Ao(t, n, c, r), (f = t.memoizedState)),
              (c = Zr || No(t, n, l, r, s, f, u))
                ? (d ||
                    ("function" != typeof a.UNSAFE_componentWillUpdate &&
                      "function" != typeof a.componentWillUpdate) ||
                    ("function" == typeof a.componentWillUpdate &&
                      a.componentWillUpdate(r, f, u),
                    "function" == typeof a.UNSAFE_componentWillUpdate &&
                      a.UNSAFE_componentWillUpdate(r, f, u)),
                  "function" == typeof a.componentDidUpdate &&
                    (t.effectTag |= 4),
                  "function" == typeof a.getSnapshotBeforeUpdate &&
                    (t.effectTag |= 256))
                : ("function" != typeof a.componentDidUpdate ||
                    (l === e.memoizedProps && s === e.memoizedState) ||
                    (t.effectTag |= 4),
                  "function" != typeof a.getSnapshotBeforeUpdate ||
                    (l === e.memoizedProps && s === e.memoizedState) ||
                    (t.effectTag |= 256),
                  (t.memoizedProps = r),
                  (t.memoizedState = f)),
              (a.props = r),
              (a.state = f),
              (a.context = u),
              (r = c))
            : ("function" != typeof a.componentDidUpdate ||
                (l === e.memoizedProps && s === e.memoizedState) ||
                (t.effectTag |= 4),
              "function" != typeof a.getSnapshotBeforeUpdate ||
                (l === e.memoizedProps && s === e.memoizedState) ||
                (t.effectTag |= 256),
              (r = !1));
      return li(e, t, n, r, i, o);
    }
    function li(e, t, n, r, o, i) {
      oi(e, t);
      var a = 0 != (64 & t.effectTag);
      if (!r && !a) return o && jr(t, n, !1), di(e, t, i);
      (r = t.stateNode), (Zo.current = t);
      var l =
        a && "function" != typeof n.getDerivedStateFromError
          ? null
          : r.render();
      return (
        (t.effectTag |= 1),
        null !== e && a
          ? ((t.child = Vo(t, e.child, null, i)), (t.child = Vo(t, null, l, i)))
          : ei(e, t, l, i),
        (t.memoizedState = r.state),
        o && jr(t, n, !0),
        t.child
      );
    }
    function si(e) {
      var t = e.stateNode;
      t.pendingContext
        ? Nr(0, t.pendingContext, t.pendingContext !== t.context)
        : t.context && Nr(0, t.context, !1),
        Eo(e, t.containerInfo);
    }
    function ui(e, t) {
      if (e && e.defaultProps)
        for (var n in ((t = o({}, t)), (e = e.defaultProps)))
          void 0 === t[n] && (t[n] = e[n]);
      return t;
    }
    function ci(e, t, n) {
      var r = t.mode,
        o = t.pendingProps,
        i = t.memoizedState;
      null !== i &&
        (i.alreadyCaptured
          ? null !== e && i === e.memoizedState
            ? (i = {
                alreadyCaptured: !0,
                didTimeout: !0,
                timedOutAt: i.timedOutAt
              })
            : ((i.alreadyCaptured = !0), (i.didTimeout = !0))
          : (i = null));
      var a = null !== i && i.didTimeout;
      if (null === e)
        a
          ? ((a = o.fallback),
            (o = Br(null, r, 0, null)),
            (r = Br(a, r, n, null)),
            (o.sibling = r),
            ((n = o).return = r.return = t))
          : (n = r = Ho(t, null, o.children, n));
      else {
        var l = e.memoizedState;
        null !== l && l.didTimeout
          ? ((e = (r = e.child).sibling),
            a
              ? ((n = o.fallback),
                ((r = Hr(r, r.pendingProps)).effectTag |= 2),
                ((o = r.sibling = Hr(e, n, e.expirationTime)).effectTag |= 2),
                (n = r),
                (r.childExpirationTime = 0),
                (r = o),
                (n.return = r.return = t))
              : ((a = e.child),
                (r = Vo(t, r.child, o.children, n)),
                Vo(t, a, null, n),
                (n = r)))
          : ((e = e.child),
            a
              ? ((a = o.fallback),
                ((o = Br(null, r, 0, null)).effectTag |= 2),
                (o.child = e),
                (e.return = o),
                ((r = o.sibling = Br(a, r, n, null)).effectTag |= 2),
                (n = o),
                (o.childExpirationTime = 0),
                (n.return = r.return = t))
              : (r = n = Vo(t, e, o.children, n)));
      }
      return (t.memoizedState = i), (t.child = n), r;
    }
    function di(e, t, n) {
      null !== e && (t.firstContextDependency = e.firstContextDependency);
      var r = t.childExpirationTime;
      if (0 === r || r > n) return null;
      if ((null !== e && t.child !== e.child && a("153"), null !== t.child)) {
        for (
          n = Hr((e = t.child), e.pendingProps, e.expirationTime),
            t.child = n,
            n.return = t;
          null !== e.sibling;

        )
          (e = e.sibling),
            ((n = n.sibling = Hr(
              e,
              e.pendingProps,
              e.expirationTime
            )).return = t);
        n.sibling = null;
      }
      return t.child;
    }
    function fi(e, t, n) {
      var r = t.expirationTime;
      if (
        null !== e &&
        e.memoizedProps === t.pendingProps &&
        !xr.current &&
        (0 === r || r > n)
      ) {
        switch (t.tag) {
          case 3:
            si(t), Yo();
            break;
          case 5:
            xo(t);
            break;
          case 1:
            Ur(t.type) && Mr(t);
            break;
          case 4:
            Eo(t, t.stateNode.containerInfo);
            break;
          case 10:
            yo(t, t.memoizedProps.value);
            break;
          case 13:
            if (null !== (r = t.memoizedState) && r.didTimeout)
              return 0 !== (r = t.child.childExpirationTime) && r <= n
                ? ci(e, t, n)
                : null !== (t = di(e, t, n))
                  ? t.sibling
                  : null;
        }
        return di(e, t, n);
      }
      switch (((t.expirationTime = 0), t.tag)) {
        case 2:
          (r = t.elementType),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (e = t.pendingProps);
          var o = Or(t, Ir.current);
          if (
            (bo(t),
            (o = r(e, o)),
            (t.effectTag |= 1),
            "object" == typeof o &&
              null !== o &&
              "function" == typeof o.render &&
              void 0 === o.$$typeof)
          ) {
            if (((t.tag = 1), Ur(r))) {
              var i = !0;
              Mr(t);
            } else i = !1;
            t.memoizedState =
              null !== o.state && void 0 !== o.state ? o.state : null;
            var l = r.getDerivedStateFromProps;
            "function" == typeof l && Ao(t, r, l, e),
              (o.updater = Ro),
              (t.stateNode = o),
              (o._reactInternalFiber = t),
              jo(t, r, e, n),
              (t = li(null, t, r, !0, i, n));
          } else (t.tag = 0), ei(null, t, o, n), (t = t.child);
          return t;
        case 16:
          switch (
            ((o = t.elementType),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (i = t.pendingProps),
            (e = (function(e) {
              var t = e._result;
              switch (e._status) {
                case 1:
                  return t;
                case 2:
                case 0:
                  throw t;
                default:
                  throw ((e._status = 0),
                  (t = (t = e._ctor)()).then(
                    function(t) {
                      0 === e._status &&
                        ((t = t.default), (e._status = 1), (e._result = t));
                    },
                    function(t) {
                      0 === e._status && ((e._status = 2), (e._result = t));
                    }
                  ),
                  (e._result = t),
                  t);
              }
            })(o)),
            (t.type = e),
            (o = t.tag = (function(e) {
              if ("function" == typeof e) return Vr(e) ? 1 : 0;
              if (void 0 !== e && null !== e) {
                if ((e = e.$$typeof) === rt) return 11;
                if (e === it) return 14;
              }
              return 2;
            })(e)),
            (i = ui(e, i)),
            (l = void 0),
            o)
          ) {
            case 0:
              l = ii(null, t, e, i, n);
              break;
            case 1:
              l = ai(null, t, e, i, n);
              break;
            case 11:
              l = ti(null, t, e, i, n);
              break;
            case 14:
              l = ni(null, t, e, ui(e.type, i), r, n);
              break;
            default:
              a("283", e);
          }
          return l;
        case 0:
          return (
            (r = t.type),
            (o = t.pendingProps),
            ii(e, t, r, (o = t.elementType === r ? o : ui(r, o)), n)
          );
        case 1:
          return (
            (r = t.type),
            (o = t.pendingProps),
            ai(e, t, r, (o = t.elementType === r ? o : ui(r, o)), n)
          );
        case 3:
          return (
            si(t),
            null === (r = t.updateQueue) && a("282"),
            (o = null !== (o = t.memoizedState) ? o.element : null),
            so(t, r, t.pendingProps, null, n),
            (r = t.memoizedState.element) === o
              ? (Yo(), (t = di(e, t, n)))
              : ((o = t.stateNode),
                (o = (null === e || null === e.child) && o.hydrate) &&
                  ((Bo = _r(t.stateNode.containerInfo)),
                  (Wo = t),
                  (o = $o = !0)),
                o
                  ? ((t.effectTag |= 2), (t.child = Ho(t, null, r, n)))
                  : (ei(e, t, r, n), Yo()),
                (t = t.child)),
            t
          );
        case 5:
          return (
            xo(t),
            null === e && Go(t),
            (r = t.type),
            (o = t.pendingProps),
            (i = null !== e ? e.memoizedProps : null),
            (l = o.children),
            yr(r, o)
              ? (l = null)
              : null !== i && yr(r, i) && (t.effectTag |= 16),
            oi(e, t),
            1073741823 !== n && 1 & t.mode && o.hidden
              ? ((t.expirationTime = 1073741823), (t = null))
              : (ei(e, t, l, n), (t = t.child)),
            t
          );
        case 6:
          return null === e && Go(t), null;
        case 13:
          return ci(e, t, n);
        case 4:
          return (
            Eo(t, t.stateNode.containerInfo),
            (r = t.pendingProps),
            null === e ? (t.child = Vo(t, null, r, n)) : ei(e, t, r, n),
            t.child
          );
        case 11:
          return (
            (r = t.type),
            (o = t.pendingProps),
            ti(e, t, r, (o = t.elementType === r ? o : ui(r, o)), n)
          );
        case 7:
          return ei(e, t, t.pendingProps, n), t.child;
        case 8:
        case 12:
          return ei(e, t, t.pendingProps.children, n), t.child;
        case 10:
          e: {
            if (
              ((r = t.type._context),
              (o = t.pendingProps),
              (l = t.memoizedProps),
              yo(t, (i = o.value)),
              null !== l)
            ) {
              var s = l.value;
              if (
                0 ===
                (i =
                  (s === i && (0 !== s || 1 / s == 1 / i)) || (s != s && i != i)
                    ? 0
                    : 0 |
                      ("function" == typeof r._calculateChangedBits
                        ? r._calculateChangedBits(s, i)
                        : 1073741823))
              ) {
                if (l.children === o.children && !xr.current) {
                  t = di(e, t, n);
                  break e;
                }
              } else
                for (null !== (l = t.child) && (l.return = t); null !== l; ) {
                  if (null !== (s = l.firstContextDependency))
                    do {
                      if (s.context === r && 0 != (s.observedBits & i)) {
                        if (1 === l.tag) {
                          var u = no(n);
                          (u.tag = 2), oo(l, u);
                        }
                        (0 === l.expirationTime || l.expirationTime > n) &&
                          (l.expirationTime = n),
                          null !== (u = l.alternate) &&
                            (0 === u.expirationTime || u.expirationTime > n) &&
                            (u.expirationTime = n);
                        for (var c = l.return; null !== c; ) {
                          if (
                            ((u = c.alternate),
                            0 === c.childExpirationTime ||
                              c.childExpirationTime > n)
                          )
                            (c.childExpirationTime = n),
                              null !== u &&
                                (0 === u.childExpirationTime ||
                                  u.childExpirationTime > n) &&
                                (u.childExpirationTime = n);
                          else {
                            if (
                              null === u ||
                              !(
                                0 === u.childExpirationTime ||
                                u.childExpirationTime > n
                              )
                            )
                              break;
                            u.childExpirationTime = n;
                          }
                          c = c.return;
                        }
                      }
                      (u = l.child), (s = s.next);
                    } while (null !== s);
                  else u = 10 === l.tag && l.type === t.type ? null : l.child;
                  if (null !== u) u.return = l;
                  else
                    for (u = l; null !== u; ) {
                      if (u === t) {
                        u = null;
                        break;
                      }
                      if (null !== (l = u.sibling)) {
                        (l.return = u.return), (u = l);
                        break;
                      }
                      u = u.return;
                    }
                  l = u;
                }
            }
            ei(e, t, o.children, n), (t = t.child);
          }
          return t;
        case 9:
          return (
            (o = t.type),
            (r = (i = t.pendingProps).children),
            bo(t),
            (r = r((o = wo(o, i.unstable_observedBits)))),
            (t.effectTag |= 1),
            ei(e, t, r, n),
            t.child
          );
        case 14:
          return ni(e, t, (o = t.type), (i = ui(o.type, t.pendingProps)), r, n);
        case 15:
          return ri(e, t, t.type, t.pendingProps, r, n);
        case 17:
          return (
            (r = t.type),
            (o = t.pendingProps),
            (o = t.elementType === r ? o : ui(r, o)),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (t.tag = 1),
            Ur(r) ? ((e = !0), Mr(t)) : (e = !1),
            bo(t),
            Do(t, r, o),
            jo(t, r, o, n),
            li(null, t, r, !0, e, n)
          );
        default:
          a("156");
      }
    }
    function pi(e) {
      e.effectTag |= 4;
    }
    var hi = void 0,
      mi = void 0,
      gi = void 0,
      yi = void 0;
    function vi(e, t) {
      var n = t.source,
        r = t.stack;
      null === r && null !== n && (r = ct(n)),
        null !== n && ut(n.type),
        (t = t.value),
        null !== e && 1 === e.tag && ut(e.type);
      try {
        console.error(t);
      } catch (e) {
        setTimeout(function() {
          throw e;
        });
      }
    }
    function bi(e) {
      var t = e.ref;
      if (null !== t)
        if ("function" == typeof t)
          try {
            t(null);
          } catch (t) {
            Bi(e, t);
          }
        else t.current = null;
    }
    function wi(e) {
      switch (("function" == typeof zr && zr(e), e.tag)) {
        case 1:
          bi(e);
          var t = e.stateNode;
          if ("function" == typeof t.componentWillUnmount)
            try {
              (t.props = e.memoizedProps),
                (t.state = e.memoizedState),
                t.componentWillUnmount();
            } catch (t) {
              Bi(e, t);
            }
          break;
        case 5:
          bi(e);
          break;
        case 4:
          Ci(e);
      }
    }
    function _i(e) {
      return 5 === e.tag || 3 === e.tag || 4 === e.tag;
    }
    function ki(e) {
      e: {
        for (var t = e.return; null !== t; ) {
          if (_i(t)) {
            var n = t;
            break e;
          }
          t = t.return;
        }
        a("160"), (n = void 0);
      }
      var r = (t = void 0);
      switch (n.tag) {
        case 5:
          (t = n.stateNode), (r = !1);
          break;
        case 3:
        case 4:
          (t = n.stateNode.containerInfo), (r = !0);
          break;
        default:
          a("161");
      }
      16 & n.effectTag && (ir(t, ""), (n.effectTag &= -17));
      e: t: for (n = e; ; ) {
        for (; null === n.sibling; ) {
          if (null === n.return || _i(n.return)) {
            n = null;
            break e;
          }
          n = n.return;
        }
        for (
          n.sibling.return = n.return, n = n.sibling;
          5 !== n.tag && 6 !== n.tag;

        ) {
          if (2 & n.effectTag) continue t;
          if (null === n.child || 4 === n.tag) continue t;
          (n.child.return = n), (n = n.child);
        }
        if (!(2 & n.effectTag)) {
          n = n.stateNode;
          break e;
        }
      }
      for (var o = e; ; ) {
        if (5 === o.tag || 6 === o.tag)
          if (n)
            if (r) {
              var i = t,
                l = o.stateNode,
                s = n;
              8 === i.nodeType
                ? i.parentNode.insertBefore(l, s)
                : i.insertBefore(l, s);
            } else t.insertBefore(o.stateNode, n);
          else
            r
              ? ((l = t),
                (s = o.stateNode),
                8 === l.nodeType
                  ? (i = l.parentNode).insertBefore(s, l)
                  : (i = l).appendChild(s),
                (null !== (l = l._reactRootContainer) && void 0 !== l) ||
                  null !== i.onclick ||
                  (i.onclick = pr))
              : t.appendChild(o.stateNode);
        else if (4 !== o.tag && null !== o.child) {
          (o.child.return = o), (o = o.child);
          continue;
        }
        if (o === e) break;
        for (; null === o.sibling; ) {
          if (null === o.return || o.return === e) return;
          o = o.return;
        }
        (o.sibling.return = o.return), (o = o.sibling);
      }
    }
    function Ci(e) {
      for (var t = e, n = !1, r = void 0, o = void 0; ; ) {
        if (!n) {
          n = t.return;
          e: for (;;) {
            switch ((null === n && a("160"), n.tag)) {
              case 5:
                (r = n.stateNode), (o = !1);
                break e;
              case 3:
              case 4:
                (r = n.stateNode.containerInfo), (o = !0);
                break e;
            }
            n = n.return;
          }
          n = !0;
        }
        if (5 === t.tag || 6 === t.tag) {
          e: for (var i = t, l = i; ; )
            if ((wi(l), null !== l.child && 4 !== l.tag))
              (l.child.return = l), (l = l.child);
            else {
              if (l === i) break;
              for (; null === l.sibling; ) {
                if (null === l.return || l.return === i) break e;
                l = l.return;
              }
              (l.sibling.return = l.return), (l = l.sibling);
            }
          o
            ? ((i = r),
              (l = t.stateNode),
              8 === i.nodeType ? i.parentNode.removeChild(l) : i.removeChild(l))
            : r.removeChild(t.stateNode);
        } else if (
          (4 === t.tag ? ((r = t.stateNode.containerInfo), (o = !0)) : wi(t),
          null !== t.child)
        ) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break;
        for (; null === t.sibling; ) {
          if (null === t.return || t.return === e) return;
          4 === (t = t.return).tag && (n = !1);
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    function Ti(e, t) {
      switch (t.tag) {
        case 1:
          break;
        case 5:
          var n = t.stateNode;
          if (null != n) {
            var r = t.memoizedProps,
              o = null !== e ? e.memoizedProps : r;
            e = t.type;
            var i = t.updateQueue;
            if (((t.updateQueue = null), null !== i)) {
              for (
                n[M] = r,
                  "input" === e &&
                    "radio" === r.type &&
                    null != r.name &&
                    Ct(n, r),
                  dr(e, o),
                  t = dr(e, r),
                  o = 0;
                o < i.length;
                o += 2
              ) {
                var l = i[o],
                  s = i[o + 1];
                "style" === l
                  ? sr(n, s)
                  : "dangerouslySetInnerHTML" === l
                    ? or(n, s)
                    : "children" === l
                      ? ir(n, s)
                      : bt(n, l, s, t);
              }
              switch (e) {
                case "input":
                  Tt(n, r);
                  break;
                case "textarea":
                  Yn(n, r);
                  break;
                case "select":
                  (e = n._wrapperState.wasMultiple),
                    (n._wrapperState.wasMultiple = !!r.multiple),
                    null != (i = r.value)
                      ? Gn(n, !!r.multiple, i, !1)
                      : e !== !!r.multiple &&
                        (null != r.defaultValue
                          ? Gn(n, !!r.multiple, r.defaultValue, !0)
                          : Gn(n, !!r.multiple, r.multiple ? [] : "", !1));
              }
            }
          }
          break;
        case 6:
          null === t.stateNode && a("162"),
            (t.stateNode.nodeValue = t.memoizedProps);
          break;
        case 3:
        case 12:
        case 13:
        case 17:
          break;
        default:
          a("163");
      }
    }
    function Si(e, t, n) {
      ((n = no(n)).tag = 3), (n.payload = { element: null });
      var r = t.value;
      return (
        (n.callback = function() {
          Aa(r), vi(e, t);
        }),
        n
      );
    }
    function Ei(e, t, n) {
      (n = no(n)).tag = 3;
      var r = e.type.getDerivedStateFromError;
      if ("function" == typeof r) {
        var o = t.value;
        n.payload = function() {
          return r(o);
        };
      }
      var i = e.stateNode;
      return (
        null !== i &&
          "function" == typeof i.componentDidCatch &&
          (n.callback = function() {
            "function" != typeof r &&
              (null === Fi ? (Fi = new Set([this])) : Fi.add(this));
            var n = t.value,
              o = t.stack;
            vi(e, t),
              this.componentDidCatch(n, {
                componentStack: null !== o ? o : ""
              });
          }),
        n
      );
    }
    function Ii(e) {
      switch (e.tag) {
        case 1:
          Ur(e.type) && Ar();
          var t = e.effectTag;
          return 1024 & t ? ((e.effectTag = (-1025 & t) | 64), e) : null;
        case 3:
          return (
            Io(),
            Rr(),
            0 != (64 & (t = e.effectTag)) && a("285"),
            (e.effectTag = (-1025 & t) | 64),
            e
          );
        case 5:
          return Po(e), null;
        case 13:
          if (1024 & (t = e.effectTag)) {
            (e.effectTag = (-1025 & t) | 64),
              (t = null !== (t = e.alternate) ? t.memoizedState : null);
            var n = e.memoizedState;
            return (
              null === n
                ? (n = { alreadyCaptured: !0, didTimeout: !1, timedOutAt: 0 })
                : t === n
                  ? (n = {
                      alreadyCaptured: !0,
                      didTimeout: n.didTimeout,
                      timedOutAt: n.timedOutAt
                    })
                  : (n.alreadyCaptured = !0),
              (e.memoizedState = n),
              e
            );
          }
          return null;
        case 4:
          return Io(), null;
        case 10:
          return vo(e), null;
        default:
          return null;
      }
    }
    (hi = function(e, t) {
      for (var n = t.child; null !== n; ) {
        if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
        else if (4 !== n.tag && null !== n.child) {
          (n.child.return = n), (n = n.child);
          continue;
        }
        if (n === t) break;
        for (; null === n.sibling; ) {
          if (null === n.return || n.return === t) return;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
    }),
      (mi = function() {}),
      (gi = function(e, t, n, r, i) {
        var a = e.memoizedProps;
        if (a !== r) {
          var l = t.stateNode;
          switch ((So(ko.current), (e = null), n)) {
            case "input":
              (a = _t(l, a)), (r = _t(l, r)), (e = []);
              break;
            case "option":
              (a = Kn(l, a)), (r = Kn(l, r)), (e = []);
              break;
            case "select":
              (a = o({}, a, { value: void 0 })),
                (r = o({}, r, { value: void 0 })),
                (e = []);
              break;
            case "textarea":
              (a = Jn(l, a)), (r = Jn(l, r)), (e = []);
              break;
            default:
              "function" != typeof a.onClick &&
                "function" == typeof r.onClick &&
                (l.onclick = pr);
          }
          cr(n, r), (l = n = void 0);
          var s = null;
          for (n in a)
            if (!r.hasOwnProperty(n) && a.hasOwnProperty(n) && null != a[n])
              if ("style" === n) {
                var u = a[n];
                for (l in u)
                  u.hasOwnProperty(l) && (s || (s = {}), (s[l] = ""));
              } else
                "dangerouslySetInnerHTML" !== n &&
                  "children" !== n &&
                  "suppressContentEditableWarning" !== n &&
                  "suppressHydrationWarning" !== n &&
                  "autoFocus" !== n &&
                  (b.hasOwnProperty(n)
                    ? e || (e = [])
                    : (e = e || []).push(n, null));
          for (n in r) {
            var c = r[n];
            if (
              ((u = null != a ? a[n] : void 0),
              r.hasOwnProperty(n) && c !== u && (null != c || null != u))
            )
              if ("style" === n)
                if (u) {
                  for (l in u)
                    !u.hasOwnProperty(l) ||
                      (c && c.hasOwnProperty(l)) ||
                      (s || (s = {}), (s[l] = ""));
                  for (l in c)
                    c.hasOwnProperty(l) &&
                      u[l] !== c[l] &&
                      (s || (s = {}), (s[l] = c[l]));
                } else s || (e || (e = []), e.push(n, s)), (s = c);
              else
                "dangerouslySetInnerHTML" === n
                  ? ((c = c ? c.__html : void 0),
                    (u = u ? u.__html : void 0),
                    null != c && u !== c && (e = e || []).push(n, "" + c))
                  : "children" === n
                    ? u === c ||
                      ("string" != typeof c && "number" != typeof c) ||
                      (e = e || []).push(n, "" + c)
                    : "suppressContentEditableWarning" !== n &&
                      "suppressHydrationWarning" !== n &&
                      (b.hasOwnProperty(n)
                        ? (null != c && fr(i, n), e || u === c || (e = []))
                        : (e = e || []).push(n, c));
          }
          s && (e = e || []).push("style", s),
            (i = e),
            (t.updateQueue = i) && pi(t);
        }
      }),
      (yi = function(e, t, n, r) {
        n !== r && pi(t);
      });
    var xi = { readContext: wo },
      Pi = $e.ReactCurrentOwner,
      Oi = 0,
      Ui = 0,
      Ai = !1,
      Ri = null,
      Ni = null,
      Di = 0,
      Mi = -1,
      ji = !1,
      Li = null,
      zi = !1,
      Fi = null;
    function qi() {
      if (null !== Ri)
        for (var e = Ri.return; null !== e; ) {
          var t = e;
          switch (t.tag) {
            case 1:
              var n = t.type.childContextTypes;
              null !== n && void 0 !== n && Ar();
              break;
            case 3:
              Io(), Rr();
              break;
            case 5:
              Po(t);
              break;
            case 4:
              Io();
              break;
            case 10:
              vo(t);
          }
          e = e.return;
        }
      (Ni = null), (Di = 0), (Mi = -1), (ji = !1), (Ri = null);
    }
    function Vi(e) {
      for (;;) {
        var t = e.alternate,
          n = e.return,
          r = e.sibling;
        if (0 == (512 & e.effectTag)) {
          var i = t,
            l = (t = e).pendingProps;
          switch (t.tag) {
            case 2:
            case 16:
              break;
            case 15:
            case 0:
              break;
            case 1:
              Ur(t.type) && Ar();
              break;
            case 3:
              Io(),
                Rr(),
                (l = t.stateNode).pendingContext &&
                  ((l.context = l.pendingContext), (l.pendingContext = null)),
                (null !== i && null !== i.child) ||
                  (Xo(t), (t.effectTag &= -3)),
                mi(t);
              break;
            case 5:
              Po(t);
              var s = So(To.current),
                u = t.type;
              if (null !== i && null != t.stateNode)
                gi(i, t, u, l, s), i.ref !== t.ref && (t.effectTag |= 128);
              else if (l) {
                var c = So(ko.current);
                if (Xo(t)) {
                  i = (l = t).stateNode;
                  var d = l.type,
                    f = l.memoizedProps,
                    p = s;
                  switch (((i[D] = l), (i[M] = f), (u = void 0), (s = d))) {
                    case "iframe":
                    case "object":
                      In("load", i);
                      break;
                    case "video":
                    case "audio":
                      for (d = 0; d < re.length; d++) In(re[d], i);
                      break;
                    case "source":
                      In("error", i);
                      break;
                    case "img":
                    case "image":
                    case "link":
                      In("error", i), In("load", i);
                      break;
                    case "form":
                      In("reset", i), In("submit", i);
                      break;
                    case "details":
                      In("toggle", i);
                      break;
                    case "input":
                      kt(i, f), In("invalid", i), fr(p, "onChange");
                      break;
                    case "select":
                      (i._wrapperState = { wasMultiple: !!f.multiple }),
                        In("invalid", i),
                        fr(p, "onChange");
                      break;
                    case "textarea":
                      Xn(i, f), In("invalid", i), fr(p, "onChange");
                  }
                  for (u in (cr(s, f), (d = null), f))
                    f.hasOwnProperty(u) &&
                      ((c = f[u]),
                      "children" === u
                        ? "string" == typeof c
                          ? i.textContent !== c && (d = ["children", c])
                          : "number" == typeof c &&
                            i.textContent !== "" + c &&
                            (d = ["children", "" + c])
                        : b.hasOwnProperty(u) && null != c && fr(p, u));
                  switch (s) {
                    case "input":
                      We(i), St(i, f, !0);
                      break;
                    case "textarea":
                      We(i), Zn(i);
                      break;
                    case "select":
                    case "option":
                      break;
                    default:
                      "function" == typeof f.onClick && (i.onclick = pr);
                  }
                  (u = d), (l.updateQueue = u), (l = null !== u) && pi(t);
                } else {
                  (f = t),
                    (i = u),
                    (p = l),
                    (d = 9 === s.nodeType ? s : s.ownerDocument),
                    c === er.html && (c = tr(i)),
                    c === er.html
                      ? "script" === i
                        ? (((i = d.createElement("div")).innerHTML =
                            "<script></script>"),
                          (d = i.removeChild(i.firstChild)))
                        : "string" == typeof p.is
                          ? (d = d.createElement(i, { is: p.is }))
                          : ((d = d.createElement(i)),
                            "select" === i && p.multiple && (d.multiple = !0))
                      : (d = d.createElementNS(c, i)),
                    ((i = d)[D] = f),
                    (i[M] = l),
                    hi(i, t, !1, !1),
                    (p = i);
                  var h = s,
                    m = dr((d = u), (f = l));
                  switch (d) {
                    case "iframe":
                    case "object":
                      In("load", p), (s = f);
                      break;
                    case "video":
                    case "audio":
                      for (s = 0; s < re.length; s++) In(re[s], p);
                      s = f;
                      break;
                    case "source":
                      In("error", p), (s = f);
                      break;
                    case "img":
                    case "image":
                    case "link":
                      In("error", p), In("load", p), (s = f);
                      break;
                    case "form":
                      In("reset", p), In("submit", p), (s = f);
                      break;
                    case "details":
                      In("toggle", p), (s = f);
                      break;
                    case "input":
                      kt(p, f),
                        (s = _t(p, f)),
                        In("invalid", p),
                        fr(h, "onChange");
                      break;
                    case "option":
                      s = Kn(p, f);
                      break;
                    case "select":
                      (p._wrapperState = { wasMultiple: !!f.multiple }),
                        (s = o({}, f, { value: void 0 })),
                        In("invalid", p),
                        fr(h, "onChange");
                      break;
                    case "textarea":
                      Xn(p, f),
                        (s = Jn(p, f)),
                        In("invalid", p),
                        fr(h, "onChange");
                      break;
                    default:
                      s = f;
                  }
                  cr(d, s), (c = void 0);
                  var g = d,
                    y = p,
                    v = s;
                  for (c in v)
                    if (v.hasOwnProperty(c)) {
                      var w = v[c];
                      "style" === c
                        ? sr(y, w)
                        : "dangerouslySetInnerHTML" === c
                          ? null != (w = w ? w.__html : void 0) && or(y, w)
                          : "children" === c
                            ? "string" == typeof w
                              ? ("textarea" !== g || "" !== w) && ir(y, w)
                              : "number" == typeof w && ir(y, "" + w)
                            : "suppressContentEditableWarning" !== c &&
                              "suppressHydrationWarning" !== c &&
                              "autoFocus" !== c &&
                              (b.hasOwnProperty(c)
                                ? null != w && fr(h, c)
                                : null != w && bt(y, c, w, m));
                    }
                  switch (d) {
                    case "input":
                      We(p), St(p, f, !1);
                      break;
                    case "textarea":
                      We(p), Zn(p);
                      break;
                    case "option":
                      null != f.value &&
                        p.setAttribute("value", "" + wt(f.value));
                      break;
                    case "select":
                      ((s = p).multiple = !!f.multiple),
                        null != (p = f.value)
                          ? Gn(s, !!f.multiple, p, !1)
                          : null != f.defaultValue &&
                            Gn(s, !!f.multiple, f.defaultValue, !0);
                      break;
                    default:
                      "function" == typeof s.onClick && (p.onclick = pr);
                  }
                  (l = gr(u, l)) && pi(t), (t.stateNode = i);
                }
                null !== t.ref && (t.effectTag |= 128);
              } else null === t.stateNode && a("166");
              break;
            case 6:
              i && null != t.stateNode
                ? yi(i, t, i.memoizedProps, l)
                : ("string" != typeof l && (null === t.stateNode && a("166")),
                  (i = So(To.current)),
                  So(ko.current),
                  Xo(t)
                    ? ((u = (l = t).stateNode),
                      (i = l.memoizedProps),
                      (u[D] = l),
                      (l = u.nodeValue !== i) && pi(t))
                    : ((u = t),
                      ((l = (9 === i.nodeType
                        ? i
                        : i.ownerDocument
                      ).createTextNode(l))[D] = t),
                      (u.stateNode = l)));
              break;
            case 11:
              break;
            case 13:
              (l = t.memoizedState),
                (u = null !== i ? i.memoizedState : null),
                (null !== l && l.didTimeout) !== (null !== u && u.didTimeout) &&
                  (t.effectTag |= 4);
              break;
            case 7:
            case 8:
            case 12:
              break;
            case 4:
              Io(), mi(t);
              break;
            case 10:
              vo(t);
              break;
            case 9:
            case 14:
              break;
            case 17:
              Ur(t.type) && Ar();
              break;
            default:
              a("156");
          }
          if (
            ((Ri = null),
            (t = e),
            1073741823 === Di || 1073741823 !== t.childExpirationTime)
          ) {
            for (l = 0, u = t.child; null !== u; )
              (i = u.expirationTime),
                (s = u.childExpirationTime),
                (0 === l || (0 !== i && i < l)) && (l = i),
                (0 === l || (0 !== s && s < l)) && (l = s),
                (u = u.sibling);
            t.childExpirationTime = l;
          }
          null !== n &&
            0 == (512 & n.effectTag) &&
            (null === n.firstEffect && (n.firstEffect = e.firstEffect),
            null !== e.lastEffect &&
              (null !== n.lastEffect &&
                (n.lastEffect.nextEffect = e.firstEffect),
              (n.lastEffect = e.lastEffect)),
            1 < e.effectTag &&
              (null !== n.lastEffect
                ? (n.lastEffect.nextEffect = e)
                : (n.firstEffect = e),
              (n.lastEffect = e)));
        } else {
          if (null !== (e = Ii(e))) return (e.effectTag &= 511), e;
          null !== n &&
            ((n.firstEffect = n.lastEffect = null), (n.effectTag |= 512));
        }
        if (null !== r) return r;
        if (null === n) break;
        e = n;
      }
      return null;
    }
    function Hi(e) {
      var t = fi(e.alternate, e, Di);
      return (
        (e.memoizedProps = e.pendingProps),
        null === t && (t = Vi(e)),
        (Pi.current = null),
        t
      );
    }
    function Wi(e, t, n) {
      Ai && a("243"), (Ai = !0), (Pi.currentDispatcher = xi);
      var r = e.nextExpirationTimeToWorkOn;
      (r === Di && e === Ni && null !== Ri) ||
        (qi(),
        (Di = r),
        (Ri = Hr((Ni = e).current, null)),
        (e.pendingCommitExpirationTime = 0));
      for (var o = !1; ; ) {
        try {
          if (t) for (; null !== Ri && !Ua(); ) Ri = Hi(Ri);
          else for (; null !== Ri; ) Ri = Hi(Ri);
        } catch (t) {
          if (null === Ri) (o = !0), Aa(t);
          else {
            null === Ri && a("271");
            var i = Ri,
              l = i.return;
            if (null !== l) {
              e: {
                var s = e,
                  u = l,
                  c = i,
                  d = t;
                if (
                  ((l = Di),
                  (c.effectTag |= 512),
                  (c.firstEffect = c.lastEffect = null),
                  null !== d &&
                    "object" == typeof d &&
                    "function" == typeof d.then)
                ) {
                  var f = d;
                  d = u;
                  var p = -1,
                    h = -1;
                  do {
                    if (13 === d.tag) {
                      var m = d.alternate;
                      if (
                        null !== m &&
                        (null !== (m = m.memoizedState) && m.didTimeout)
                      ) {
                        h = 10 * (m.timedOutAt - 2);
                        break;
                      }
                      "number" == typeof (m = d.pendingProps.maxDuration) &&
                        (0 >= m ? (p = 0) : (-1 === p || m < p) && (p = m));
                    }
                    d = d.return;
                  } while (null !== d);
                  d = u;
                  do {
                    if (
                      ((m = 13 === d.tag) &&
                        (void 0 === d.memoizedProps.fallback
                          ? (m = !1)
                          : (m =
                              null === (m = d.memoizedState) || !m.didTimeout)),
                      m)
                    ) {
                      if (
                        ((u = Qi.bind(
                          null,
                          s,
                          d,
                          c,
                          0 == (1 & d.mode) ? 1 : l
                        )),
                        f.then(u, u),
                        0 == (1 & d.mode))
                      ) {
                        (d.effectTag |= 32),
                          ei(c.alternate, c, null, l),
                          (c.effectTag &= -513),
                          1 === c.tag &&
                            ((c.effectTag &= -421),
                            null === c.alternate && (c.tag = 17));
                        break e;
                      }
                      -1 === p
                        ? (s = 1073741823)
                        : (-1 === h && (h = 10 * (Xr(s, l) - 2) - 5e3),
                          (s = h + p)),
                        0 <= s && Mi < s && (Mi = s),
                        (d.effectTag |= 1024),
                        (d.expirationTime = l);
                      break e;
                    }
                    d = d.return;
                  } while (null !== d);
                  d = Error(
                    "An update was suspended, but no placeholder UI was provided."
                  );
                }
                (ji = !0), (d = fo(d, c)), (s = u);
                do {
                  switch (s.tag) {
                    case 3:
                      (c = d),
                        (s.effectTag |= 1024),
                        (s.expirationTime = l),
                        io(s, (l = Si(s, c, l)));
                      break e;
                    case 1:
                      if (
                        ((c = d),
                        (u = s.type),
                        (f = s.stateNode),
                        0 == (64 & s.effectTag) &&
                          ("function" == typeof u.getDerivedStateFromError ||
                            (null !== f &&
                              "function" == typeof f.componentDidCatch &&
                              (null === Fi || !Fi.has(f)))))
                      ) {
                        (s.effectTag |= 1024),
                          (s.expirationTime = l),
                          io(s, (l = Ei(s, c, l)));
                        break e;
                      }
                  }
                  s = s.return;
                } while (null !== s);
              }
              Ri = Vi(i);
              continue;
            }
            (o = !0), Aa(t);
          }
        }
        break;
      }
      if (((Ai = !1), (go = mo = ho = Pi.currentDispatcher = null), o))
        (Ni = null), (e.finishedWork = null);
      else if (null !== Ri) e.finishedWork = null;
      else {
        if ((null === (t = e.current.alternate) && a("281"), (Ni = null), ji)) {
          if (
            ((o = e.latestPendingTime),
            (i = e.latestSuspendedTime),
            (l = e.latestPingedTime),
            (0 !== o && o > r) || (0 !== i && i > r) || (0 !== l && l > r))
          )
            return Jr(e, r), void ka(e, t, r, e.expirationTime, -1);
          if (!e.didError && !n)
            return (
              (e.didError = !0),
              (r = e.nextExpirationTimeToWorkOn = r),
              (n = e.expirationTime = 1),
              void ka(e, t, r, n, -1)
            );
        }
        n || -1 === Mi
          ? ((e.pendingCommitExpirationTime = r), (e.finishedWork = t))
          : (Jr(e, r),
            (n = 10 * (Xr(e, r) - 2)) < Mi && (Mi = n),
            (n = 10 * (Ca() - 2)),
            (n = Mi - n),
            ka(e, t, r, e.expirationTime, 0 > n ? 0 : n));
      }
    }
    function Bi(e, t) {
      var n;
      e: {
        for (Ai && !zi && a("263"), n = e.return; null !== n; ) {
          switch (n.tag) {
            case 1:
              var r = n.stateNode;
              if (
                "function" == typeof n.type.getDerivedStateFromError ||
                ("function" == typeof r.componentDidCatch &&
                  (null === Fi || !Fi.has(r)))
              ) {
                oo(n, (e = Ei(n, (e = fo(t, e)), 1))), Gi(n, 1), (n = void 0);
                break e;
              }
              break;
            case 3:
              oo(n, (e = Si(n, (e = fo(t, e)), 1))), Gi(n, 1), (n = void 0);
              break e;
          }
          n = n.return;
        }
        3 === e.tag && (oo(e, (n = Si(e, (n = fo(t, e)), 1))), Gi(e, 1)),
          (n = void 0);
      }
      return n;
    }
    function $i(e, t) {
      return (
        0 !== Ui
          ? (e = Ui)
          : Ai
            ? (e = zi ? 1 : Di)
            : 1 & t.mode
              ? ((e = da
                  ? 2 + 10 * (1 + (((e - 2 + 15) / 10) | 0))
                  : 2 + 25 * (1 + (((e - 2 + 500) / 25) | 0))),
                null !== Ni && e === Di && (e += 1))
              : (e = 1),
        da && e > oa && (oa = e),
        e
      );
    }
    function Qi(e, t, n, r) {
      var o = e.earliestSuspendedTime,
        i = e.latestSuspendedTime;
      if (0 !== o && r >= o && r <= i) {
        (i = o = r), (e.didError = !1);
        var a = e.latestPingedTime;
        (0 === a || a < i) && (e.latestPingedTime = i), Yr(i, e);
      } else Gr(e, (o = $i((o = Ca()), t)));
      0 != (1 & t.mode) && e === Ni && Di === r && (Ni = null),
        Ki(t, o),
        0 == (1 & t.mode) &&
          (Ki(n, o),
          1 === n.tag &&
            null !== n.stateNode &&
            (((t = no(o)).tag = 2), oo(n, t))),
        0 !== (n = e.expirationTime) && Ta(e, n);
    }
    function Ki(e, t) {
      (0 === e.expirationTime || e.expirationTime > t) &&
        (e.expirationTime = t);
      var n = e.alternate;
      null !== n &&
        (0 === n.expirationTime || n.expirationTime > t) &&
        (n.expirationTime = t);
      var r = e.return,
        o = null;
      if (null === r && 3 === e.tag) o = e.stateNode;
      else
        for (; null !== r; ) {
          if (
            ((n = r.alternate),
            (0 === r.childExpirationTime || r.childExpirationTime > t) &&
              (r.childExpirationTime = t),
            null !== n &&
              (0 === n.childExpirationTime || n.childExpirationTime > t) &&
              (n.childExpirationTime = t),
            null === r.return && 3 === r.tag)
          ) {
            o = r.stateNode;
            break;
          }
          r = r.return;
        }
      return null === o ? null : o;
    }
    function Gi(e, t) {
      null !== (e = Ki(e, t)) &&
        (!Ai && 0 !== Di && t < Di && qi(),
        Gr(e, t),
        (Ai && !zi && Ni === e) || Ta(e, e.expirationTime),
        ya > ga && ((ya = 0), a("185")));
    }
    function Ji(e, t, n, r, o) {
      var i = Ui;
      Ui = 1;
      try {
        return e(t, n, r, o);
      } finally {
        Ui = i;
      }
    }
    var Xi = null,
      Yi = null,
      Zi = 0,
      ea = void 0,
      ta = !1,
      na = null,
      ra = 0,
      oa = 0,
      ia = !1,
      aa = !1,
      la = null,
      sa = null,
      ua = !1,
      ca = !1,
      da = !1,
      fa = null,
      pa = i.unstable_now(),
      ha = 2 + ((pa / 10) | 0),
      ma = ha,
      ga = 50,
      ya = 0,
      va = null,
      ba = 1;
    function wa() {
      ha = 2 + (((i.unstable_now() - pa) / 10) | 0);
    }
    function _a(e, t) {
      if (0 !== Zi) {
        if (t > Zi) return;
        null !== ea && i.unstable_cancelCallback(ea);
      }
      (Zi = t),
        (e = i.unstable_now() - pa),
        (ea = i.unstable_scheduleCallback(Ea, { timeout: 10 * (t - 2) - e }));
    }
    function ka(e, t, n, r, o) {
      (e.expirationTime = r),
        0 !== o || Ua()
          ? 0 < o &&
            (e.timeoutHandle = vr(
              function(e, t, n) {
                (e.pendingCommitExpirationTime = n),
                  (e.finishedWork = t),
                  wa(),
                  (ma = ha),
                  xa(e, n);
              }.bind(null, e, t, n),
              o
            ))
          : ((e.pendingCommitExpirationTime = n), (e.finishedWork = t));
    }
    function Ca() {
      return ta
        ? ma
        : (Sa(), (0 !== ra && 1073741823 !== ra) || (wa(), (ma = ha)), ma);
    }
    function Ta(e, t) {
      if (null === e.nextScheduledRoot)
        (e.expirationTime = t),
          null === Yi
            ? ((Xi = Yi = e), (e.nextScheduledRoot = e))
            : ((Yi = Yi.nextScheduledRoot = e).nextScheduledRoot = Xi);
      else {
        var n = e.expirationTime;
        (0 === n || t < n) && (e.expirationTime = t);
      }
      ta ||
        (ua
          ? ca && ((na = e), (ra = 1), Pa(e, 1, !0))
          : 1 === t
            ? Ia(1, null)
            : _a(e, t));
    }
    function Sa() {
      var e = 0,
        t = null;
      if (null !== Yi)
        for (var n = Yi, r = Xi; null !== r; ) {
          var o = r.expirationTime;
          if (0 === o) {
            if (
              ((null === n || null === Yi) && a("244"),
              r === r.nextScheduledRoot)
            ) {
              Xi = Yi = r.nextScheduledRoot = null;
              break;
            }
            if (r === Xi)
              (Xi = o = r.nextScheduledRoot),
                (Yi.nextScheduledRoot = o),
                (r.nextScheduledRoot = null);
            else {
              if (r === Yi) {
                ((Yi = n).nextScheduledRoot = Xi), (r.nextScheduledRoot = null);
                break;
              }
              (n.nextScheduledRoot = r.nextScheduledRoot),
                (r.nextScheduledRoot = null);
            }
            r = n.nextScheduledRoot;
          } else {
            if (((0 === e || o < e) && ((e = o), (t = r)), r === Yi)) break;
            if (1 === e) break;
            (n = r), (r = r.nextScheduledRoot);
          }
        }
      (na = t), (ra = e);
    }
    function Ea(e) {
      if (e.didTimeout && null !== Xi) {
        wa();
        var t = Xi;
        do {
          var n = t.expirationTime;
          0 !== n && ha >= n && (t.nextExpirationTimeToWorkOn = ha),
            (t = t.nextScheduledRoot);
        } while (t !== Xi);
      }
      Ia(0, e);
    }
    function Ia(e, t) {
      if (((sa = t), Sa(), null !== sa))
        for (
          wa(), ma = ha;
          null !== na && 0 !== ra && (0 === e || e >= ra) && (!ia || ha >= ra);

        )
          Pa(na, ra, ha >= ra), Sa(), wa(), (ma = ha);
      else
        for (; null !== na && 0 !== ra && (0 === e || e >= ra); )
          Pa(na, ra, !0), Sa();
      if (
        (null !== sa && ((Zi = 0), (ea = null)),
        0 !== ra && _a(na, ra),
        (sa = null),
        (ia = !1),
        (ya = 0),
        (va = null),
        null !== fa)
      )
        for (e = fa, fa = null, t = 0; t < e.length; t++) {
          var n = e[t];
          try {
            n._onComplete();
          } catch (e) {
            aa || ((aa = !0), (la = e));
          }
        }
      if (aa) throw ((e = la), (la = null), (aa = !1), e);
    }
    function xa(e, t) {
      ta && a("253"), (na = e), (ra = t), Pa(e, t, !0), Ia(1, null);
    }
    function Pa(e, t, n) {
      if ((ta && a("245"), (ta = !0), null === sa || n)) {
        var r = e.finishedWork;
        null !== r
          ? Oa(e, r, t)
          : ((e.finishedWork = null),
            -1 !== (r = e.timeoutHandle) && ((e.timeoutHandle = -1), br(r)),
            Wi(e, !1, n),
            null !== (r = e.finishedWork) && Oa(e, r, t));
      } else
        null !== (r = e.finishedWork)
          ? Oa(e, r, t)
          : ((e.finishedWork = null),
            -1 !== (r = e.timeoutHandle) && ((e.timeoutHandle = -1), br(r)),
            Wi(e, !0, n),
            null !== (r = e.finishedWork) &&
              (Ua() ? (e.finishedWork = r) : Oa(e, r, t)));
      ta = !1;
    }
    function Oa(e, t, n) {
      var r = e.firstBatch;
      if (
        null !== r &&
        r._expirationTime <= n &&
        (null === fa ? (fa = [r]) : fa.push(r), r._defer)
      )
        return (e.finishedWork = t), void (e.expirationTime = 0);
      (e.finishedWork = null),
        e === va ? ya++ : ((va = e), (ya = 0)),
        (zi = Ai = !0),
        e.current === t && a("177");
      var o = e.pendingCommitExpirationTime;
      0 === o && a("261"), (e.pendingCommitExpirationTime = 0);
      var i = t.expirationTime,
        l = t.childExpirationTime,
        s = 0 === i || (0 !== l && l < i) ? l : i;
      if (((e.didError = !1), 0 === s))
        (e.earliestPendingTime = 0),
          (e.latestPendingTime = 0),
          (e.earliestSuspendedTime = 0),
          (e.latestSuspendedTime = 0),
          (e.latestPingedTime = 0);
      else {
        var u = e.latestPendingTime;
        0 !== u &&
          (u < s
            ? (e.earliestPendingTime = e.latestPendingTime = 0)
            : e.earliestPendingTime < s &&
              (e.earliestPendingTime = e.latestPendingTime));
        var c = e.earliestSuspendedTime;
        0 === c
          ? Gr(e, s)
          : s > e.latestSuspendedTime
            ? ((e.earliestSuspendedTime = 0),
              (e.latestSuspendedTime = 0),
              (e.latestPingedTime = 0),
              Gr(e, s))
            : s < c && Gr(e, s);
      }
      if ((Yr(0, e), (Pi.current = null), 1 < t.effectTag))
        if (null !== t.lastEffect) {
          t.lastEffect.nextEffect = t;
          var d = t.firstEffect;
        } else d = t;
      else d = t.firstEffect;
      hr = En;
      var f = Ln();
      if (zn(f)) {
        if ("selectionStart" in f)
          var p = { start: f.selectionStart, end: f.selectionEnd };
        else
          e: {
            var h = f.ownerDocument,
              m = (h && h.defaultView) || window,
              g = m.getSelection && m.getSelection();
            if (g && 0 !== g.rangeCount) {
              var y = g.anchorNode,
                v = g.anchorOffset,
                b = g.focusNode,
                w = g.focusOffset;
              try {
                y.nodeType, b.nodeType;
              } catch (e) {
                p = null;
                break e;
              }
              var _ = 0,
                k = -1,
                C = -1,
                T = 0,
                S = 0,
                E = f,
                I = null;
              t: for (;;) {
                for (
                  var x;
                  E !== y || (0 !== v && 3 !== E.nodeType) || (k = _ + v),
                    E !== b || (0 !== w && 3 !== E.nodeType) || (C = _ + w),
                    3 === E.nodeType && (_ += E.nodeValue.length),
                    null !== (x = E.firstChild);

                )
                  (I = E), (E = x);
                for (;;) {
                  if (E === f) break t;
                  if (
                    (I === y && ++T === v && (k = _),
                    I === b && ++S === w && (C = _),
                    null !== (x = E.nextSibling))
                  )
                    break;
                  I = (E = I).parentNode;
                }
                E = x;
              }
              p = -1 === k || -1 === C ? null : { start: k, end: C };
            } else p = null;
          }
        var P = p || { start: 0, end: 0 };
      } else P = null;
      for (
        mr = { focusedElem: f, selectionRange: P }, En = !1, Li = d;
        null !== Li;

      ) {
        var O = !1,
          U = void 0;
        try {
          for (; null !== Li; ) {
            if (256 & Li.effectTag) {
              var A = Li.alternate;
              e: {
                var R = Li;
                switch (R.tag) {
                  case 1:
                    if (256 & R.effectTag && null !== A) {
                      var N = A.memoizedProps,
                        D = A.memoizedState,
                        M = R.stateNode;
                      (M.props = R.memoizedProps), (M.state = R.memoizedState);
                      var j = M.getSnapshotBeforeUpdate(N, D);
                      M.__reactInternalSnapshotBeforeUpdate = j;
                    }
                    break e;
                  case 3:
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break e;
                  default:
                    a("163");
                }
              }
            }
            Li = Li.nextEffect;
          }
        } catch (e) {
          (O = !0), (U = e);
        }
        O &&
          (null === Li && a("178"),
          Bi(Li, U),
          null !== Li && (Li = Li.nextEffect));
      }
      for (Li = d; null !== Li; ) {
        var L = !1,
          z = void 0;
        try {
          for (; null !== Li; ) {
            var F = Li.effectTag;
            if ((16 & F && ir(Li.stateNode, ""), 128 & F)) {
              var q = Li.alternate;
              if (null !== q) {
                var V = q.ref;
                null !== V &&
                  ("function" == typeof V ? V(null) : (V.current = null));
              }
            }
            switch (14 & F) {
              case 2:
                ki(Li), (Li.effectTag &= -3);
                break;
              case 6:
                ki(Li), (Li.effectTag &= -3), Ti(Li.alternate, Li);
                break;
              case 4:
                Ti(Li.alternate, Li);
                break;
              case 8:
                var H = Li;
                Ci(H);
                var W = H;
                (W.return = null),
                  (W.child = null),
                  W.alternate &&
                    ((W.alternate.child = null), (W.alternate.return = null));
            }
            Li = Li.nextEffect;
          }
        } catch (e) {
          (L = !0), (z = e);
        }
        L &&
          (null === Li && a("178"),
          Bi(Li, z),
          null !== Li && (Li = Li.nextEffect));
      }
      var B = mr,
        $ = Ln(),
        Q = B.focusedElem,
        K = B.selectionRange;
      if (
        $ !== Q &&
        Q &&
        Q.ownerDocument &&
        (function e(t, n) {
          return (
            !(!t || !n) &&
            (t === n ||
              ((!t || 3 !== t.nodeType) &&
                (n && 3 === n.nodeType
                  ? e(t, n.parentNode)
                  : "contains" in t
                    ? t.contains(n)
                    : !!t.compareDocumentPosition &&
                      !!(16 & t.compareDocumentPosition(n)))))
          );
        })(Q.ownerDocument.documentElement, Q)
      ) {
        if (null !== K && zn(Q)) {
          var G = K.start,
            J = K.end;
          if ((void 0 === J && (J = G), "selectionStart" in Q))
            (Q.selectionStart = G),
              (Q.selectionEnd = Math.min(J, Q.value.length));
          else {
            var X = Q.ownerDocument || document,
              Y = ((X && X.defaultView) || window).getSelection(),
              Z = Q.textContent.length,
              ee = Math.min(K.start, Z),
              te = void 0 === K.end ? ee : Math.min(K.end, Z);
            if (!Y.extend && ee > te) {
              var ne = te;
              (te = ee), (ee = ne);
            }
            var re = jn(Q, ee),
              oe = jn(Q, te);
            if (
              re &&
              oe &&
              (1 !== Y.rangeCount ||
                Y.anchorNode !== re.node ||
                Y.anchorOffset !== re.offset ||
                Y.focusNode !== oe.node ||
                Y.focusOffset !== oe.offset)
            ) {
              var ie = X.createRange();
              ie.setStart(re.node, re.offset),
                Y.removeAllRanges(),
                ee > te
                  ? (Y.addRange(ie), Y.extend(oe.node, oe.offset))
                  : (ie.setEnd(oe.node, oe.offset), Y.addRange(ie));
            }
          }
        }
        for (var ae = [], le = Q; (le = le.parentNode); )
          1 === le.nodeType &&
            ae.push({ element: le, left: le.scrollLeft, top: le.scrollTop });
        "function" == typeof Q.focus && Q.focus();
        for (var se = 0; se < ae.length; se++) {
          var ue = ae[se];
          (ue.element.scrollLeft = ue.left), (ue.element.scrollTop = ue.top);
        }
      }
      for (
        mr = null, En = !!hr, hr = null, e.current = t, Li = d;
        null !== Li;

      ) {
        var ce = !1,
          de = void 0;
        try {
          for (; null !== Li; ) {
            var fe = Li.effectTag;
            if (36 & fe) {
              var pe = void 0,
                he = Li.alternate,
                me = Li;
              switch (me.tag) {
                case 1:
                  var ge = me.stateNode;
                  if (4 & me.effectTag)
                    if (null === he)
                      (ge.props = me.memoizedProps),
                        (ge.state = me.memoizedState),
                        ge.componentDidMount();
                    else {
                      var ye = he.memoizedProps,
                        ve = he.memoizedState;
                      (ge.props = me.memoizedProps),
                        (ge.state = me.memoizedState),
                        ge.componentDidUpdate(
                          ye,
                          ve,
                          ge.__reactInternalSnapshotBeforeUpdate
                        );
                    }
                  var be = me.updateQueue;
                  null !== be &&
                    ((ge.props = me.memoizedProps),
                    (ge.state = me.memoizedState),
                    uo(0, be, ge));
                  break;
                case 3:
                  var we = me.updateQueue;
                  if (null !== we) {
                    var _e = null;
                    if (null !== me.child)
                      switch (me.child.tag) {
                        case 5:
                          _e = me.child.stateNode;
                          break;
                        case 1:
                          _e = me.child.stateNode;
                      }
                    uo(0, we, _e);
                  }
                  break;
                case 5:
                  var ke = me.stateNode;
                  null === he &&
                    4 & me.effectTag &&
                    gr(me.type, me.memoizedProps) &&
                    ke.focus();
                  break;
                case 6:
                case 4:
                case 12:
                  break;
                case 13:
                  if (32 & me.effectTag) {
                    (me.memoizedState = {
                      alreadyCaptured: !0,
                      didTimeout: !1,
                      timedOutAt: 0
                    }),
                      Gi(me, 1);
                    break;
                  }
                  var Ce = null !== he ? he.memoizedState : null,
                    Te = me.memoizedState,
                    Se = null !== Ce && Ce.didTimeout,
                    Ee = me;
                  if (
                    (null === Te
                      ? (pe = !1)
                      : (pe = Te.didTimeout) &&
                        ((Ee = me.child),
                        (Te.alreadyCaptured = !1),
                        0 === Te.timedOutAt && (Te.timedOutAt = Ca())),
                    pe !== Se && null !== Ee)
                  )
                    e: for (var Ie = Ee, xe = pe, Pe = Ie; ; ) {
                      if (5 === Pe.tag) {
                        var Oe = Pe.stateNode;
                        if (xe) Oe.style.display = "none";
                        else {
                          var Ue = Pe.stateNode,
                            Ae = Pe.memoizedProps.style,
                            Re =
                              void 0 !== Ae &&
                              null !== Ae &&
                              Ae.hasOwnProperty("display")
                                ? Ae.display
                                : null;
                          Ue.style.display = Re;
                        }
                      } else if (6 === Pe.tag)
                        Pe.stateNode.nodeValue = xe ? "" : Pe.memoizedProps;
                      else if (null !== Pe.child) {
                        (Pe.child.return = Pe), (Pe = Pe.child);
                        continue;
                      }
                      if (Pe === Ie) break e;
                      for (; null === Pe.sibling; ) {
                        if (null === Pe.return || Pe.return === Ie) break e;
                        Pe = Pe.return;
                      }
                      (Pe.sibling.return = Pe.return), (Pe = Pe.sibling);
                    }
                  break;
                case 17:
                  break;
                default:
                  a("163");
              }
            }
            if (128 & fe) {
              var Ne = Li.ref;
              if (null !== Ne) {
                var De = Li.stateNode;
                switch (Li.tag) {
                  case 5:
                    var Me = De;
                    break;
                  default:
                    Me = De;
                }
                "function" == typeof Ne ? Ne(Me) : (Ne.current = Me);
              }
            }
            var je = Li.nextEffect;
            (Li.nextEffect = null), (Li = je);
          }
        } catch (e) {
          (ce = !0), (de = e);
        }
        ce &&
          (null === Li && a("178"),
          Bi(Li, de),
          null !== Li && (Li = Li.nextEffect));
      }
      (Ai = zi = !1), "function" == typeof Lr && Lr(t.stateNode);
      var Le = t.expirationTime,
        ze = t.childExpirationTime,
        Fe = 0 === Le || (0 !== ze && ze < Le) ? ze : Le;
      0 === Fe && (Fi = null), (e.expirationTime = Fe), (e.finishedWork = null);
    }
    function Ua() {
      return !!ia || (!(null === sa || sa.timeRemaining() > ba) && (ia = !0));
    }
    function Aa(e) {
      null === na && a("246"),
        (na.expirationTime = 0),
        aa || ((aa = !0), (la = e));
    }
    function Ra(e, t) {
      var n = ua;
      ua = !0;
      try {
        return e(t);
      } finally {
        (ua = n) || ta || Ia(1, null);
      }
    }
    function Na(e, t) {
      if (ua && !ca) {
        ca = !0;
        try {
          return e(t);
        } finally {
          ca = !1;
        }
      }
      return e(t);
    }
    function Da(e, t, n) {
      if (da) return e(t, n);
      ua || ta || 0 === oa || (Ia(oa, null), (oa = 0));
      var r = da,
        o = ua;
      ua = da = !0;
      try {
        return e(t, n);
      } finally {
        (da = r), (ua = o) || ta || Ia(1, null);
      }
    }
    function Ma(e, t, n, r, o) {
      var i = t.current;
      e: if (n) {
        n = n._reactInternalFiber;
        t: {
          (2 === rn(n) && 1 === n.tag) || a("170");
          var l = n;
          do {
            switch (l.tag) {
              case 3:
                l = l.stateNode.context;
                break t;
              case 1:
                if (Ur(l.type)) {
                  l = l.stateNode.__reactInternalMemoizedMergedChildContext;
                  break t;
                }
            }
            l = l.return;
          } while (null !== l);
          a("171"), (l = void 0);
        }
        if (1 === n.tag) {
          var s = n.type;
          if (Ur(s)) {
            n = Dr(n, s, l);
            break e;
          }
        }
        n = l;
      } else n = Er;
      return (
        null === t.context ? (t.context = n) : (t.pendingContext = n),
        (t = o),
        ((o = no(r)).payload = { element: e }),
        null !== (t = void 0 === t ? null : t) && (o.callback = t),
        oo(i, o),
        Gi(i, r),
        r
      );
    }
    function ja(e, t, n, r) {
      var o = t.current;
      return Ma(e, t, n, (o = $i(Ca(), o)), r);
    }
    function La(e) {
      if (!(e = e.current).child) return null;
      switch (e.child.tag) {
        case 5:
        default:
          return e.child.stateNode;
      }
    }
    function za(e) {
      var t = 2 + 25 * (1 + (((Ca() - 2 + 500) / 25) | 0));
      t <= Oi && (t = Oi + 1),
        (this._expirationTime = Oi = t),
        (this._root = e),
        (this._callbacks = this._next = null),
        (this._hasChildren = this._didComplete = !1),
        (this._children = null),
        (this._defer = !0);
    }
    function Fa() {
      (this._callbacks = null),
        (this._didCommit = !1),
        (this._onCommit = this._onCommit.bind(this));
    }
    function qa(e, t, n) {
      (e = {
        current: (t = qr(3, null, null, t ? 3 : 0)),
        containerInfo: e,
        pendingChildren: null,
        earliestPendingTime: 0,
        latestPendingTime: 0,
        earliestSuspendedTime: 0,
        latestSuspendedTime: 0,
        latestPingedTime: 0,
        didError: !1,
        pendingCommitExpirationTime: 0,
        finishedWork: null,
        timeoutHandle: -1,
        context: null,
        pendingContext: null,
        hydrate: n,
        nextExpirationTimeToWorkOn: 0,
        expirationTime: 0,
        firstBatch: null,
        nextScheduledRoot: null
      }),
        (this._internalRoot = t.stateNode = e);
    }
    function Va(e) {
      return !(
        !e ||
        (1 !== e.nodeType &&
          9 !== e.nodeType &&
          11 !== e.nodeType &&
          (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
      );
    }
    function Ha(e, t, n, r, o) {
      Va(n) || a("200");
      var i = n._reactRootContainer;
      if (i) {
        if ("function" == typeof o) {
          var l = o;
          o = function() {
            var e = La(i._internalRoot);
            l.call(e);
          };
        }
        null != e
          ? i.legacy_renderSubtreeIntoContainer(e, t, o)
          : i.render(t, o);
      } else {
        if (
          ((i = n._reactRootContainer = (function(e, t) {
            if (
              (t ||
                (t = !(
                  !(t = e
                    ? 9 === e.nodeType
                      ? e.documentElement
                      : e.firstChild
                    : null) ||
                  1 !== t.nodeType ||
                  !t.hasAttribute("data-reactroot")
                )),
              !t)
            )
              for (var n; (n = e.lastChild); ) e.removeChild(n);
            return new qa(e, !1, t);
          })(n, r)),
          "function" == typeof o)
        ) {
          var s = o;
          o = function() {
            var e = La(i._internalRoot);
            s.call(e);
          };
        }
        Na(function() {
          null != e
            ? i.legacy_renderSubtreeIntoContainer(e, t, o)
            : i.render(t, o);
        });
      }
      return La(i._internalRoot);
    }
    function Wa(e, t) {
      var n =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      return (
        Va(t) || a("200"),
        (function(e, t, n) {
          var r =
            3 < arguments.length && void 0 !== arguments[3]
              ? arguments[3]
              : null;
          return {
            $$typeof: Je,
            key: null == r ? null : "" + r,
            children: e,
            containerInfo: t,
            implementation: n
          };
        })(e, t, null, n)
      );
    }
    (xe = function(e, t, n) {
      switch (t) {
        case "input":
          if ((Tt(e, n), (t = n.name), "radio" === n.type && null != t)) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var o = F(r);
                o || a("90"), Be(r), Tt(r, o);
              }
            }
          }
          break;
        case "textarea":
          Yn(e, n);
          break;
        case "select":
          null != (t = n.value) && Gn(e, !!n.multiple, t, !1);
      }
    }),
      (za.prototype.render = function(e) {
        this._defer || a("250"), (this._hasChildren = !0), (this._children = e);
        var t = this._root._internalRoot,
          n = this._expirationTime,
          r = new Fa();
        return Ma(e, t, null, n, r._onCommit), r;
      }),
      (za.prototype.then = function(e) {
        if (this._didComplete) e();
        else {
          var t = this._callbacks;
          null === t && (t = this._callbacks = []), t.push(e);
        }
      }),
      (za.prototype.commit = function() {
        var e = this._root._internalRoot,
          t = e.firstBatch;
        if (((this._defer && null !== t) || a("251"), this._hasChildren)) {
          var n = this._expirationTime;
          if (t !== this) {
            this._hasChildren &&
              ((n = this._expirationTime = t._expirationTime),
              this.render(this._children));
            for (var r = null, o = t; o !== this; ) (r = o), (o = o._next);
            null === r && a("251"),
              (r._next = o._next),
              (this._next = t),
              (e.firstBatch = this);
          }
          (this._defer = !1),
            xa(e, n),
            (t = this._next),
            (this._next = null),
            null !== (t = e.firstBatch = t) &&
              t._hasChildren &&
              t.render(t._children);
        } else (this._next = null), (this._defer = !1);
      }),
      (za.prototype._onComplete = function() {
        if (!this._didComplete) {
          this._didComplete = !0;
          var e = this._callbacks;
          if (null !== e) for (var t = 0; t < e.length; t++) (0, e[t])();
        }
      }),
      (Fa.prototype.then = function(e) {
        if (this._didCommit) e();
        else {
          var t = this._callbacks;
          null === t && (t = this._callbacks = []), t.push(e);
        }
      }),
      (Fa.prototype._onCommit = function() {
        if (!this._didCommit) {
          this._didCommit = !0;
          var e = this._callbacks;
          if (null !== e)
            for (var t = 0; t < e.length; t++) {
              var n = e[t];
              "function" != typeof n && a("191", n), n();
            }
        }
      }),
      (qa.prototype.render = function(e, t) {
        var n = this._internalRoot,
          r = new Fa();
        return (
          null !== (t = void 0 === t ? null : t) && r.then(t),
          ja(e, n, null, r._onCommit),
          r
        );
      }),
      (qa.prototype.unmount = function(e) {
        var t = this._internalRoot,
          n = new Fa();
        return (
          null !== (e = void 0 === e ? null : e) && n.then(e),
          ja(null, t, null, n._onCommit),
          n
        );
      }),
      (qa.prototype.legacy_renderSubtreeIntoContainer = function(e, t, n) {
        var r = this._internalRoot,
          o = new Fa();
        return (
          null !== (n = void 0 === n ? null : n) && o.then(n),
          ja(t, r, e, o._onCommit),
          o
        );
      }),
      (qa.prototype.createBatch = function() {
        var e = new za(this),
          t = e._expirationTime,
          n = this._internalRoot,
          r = n.firstBatch;
        if (null === r) (n.firstBatch = e), (e._next = null);
        else {
          for (n = null; null !== r && r._expirationTime <= t; )
            (n = r), (r = r._next);
          (e._next = r), null !== n && (n._next = e);
        }
        return e;
      }),
      (Ne = Ra),
      (De = Da),
      (Me = function() {
        ta || 0 === oa || (Ia(oa, null), (oa = 0));
      });
    var Ba = {
      createPortal: Wa,
      findDOMNode: function(e) {
        if (null == e) return null;
        if (1 === e.nodeType) return e;
        var t = e._reactInternalFiber;
        return (
          void 0 === t &&
            ("function" == typeof e.render
              ? a("188")
              : a("268", Object.keys(e))),
          (e = null === (e = an(t)) ? null : e.stateNode)
        );
      },
      hydrate: function(e, t, n) {
        return Ha(null, e, t, !0, n);
      },
      render: function(e, t, n) {
        return Ha(null, e, t, !1, n);
      },
      unstable_renderSubtreeIntoContainer: function(e, t, n, r) {
        return (
          (null == e || void 0 === e._reactInternalFiber) && a("38"),
          Ha(e, t, n, !1, r)
        );
      },
      unmountComponentAtNode: function(e) {
        return (
          Va(e) || a("40"),
          !!e._reactRootContainer &&
            (Na(function() {
              Ha(null, null, e, !1, function() {
                e._reactRootContainer = null;
              });
            }),
            !0)
        );
      },
      unstable_createPortal: function() {
        return Wa.apply(void 0, arguments);
      },
      unstable_batchedUpdates: Ra,
      unstable_interactiveUpdates: Da,
      flushSync: function(e, t) {
        ta && a("187");
        var n = ua;
        ua = !0;
        try {
          return Ji(e, t);
        } finally {
          (ua = n), Ia(1, null);
        }
      },
      unstable_flushControlled: function(e) {
        var t = ua;
        ua = !0;
        try {
          Ji(e);
        } finally {
          (ua = t) || ta || Ia(1, null);
        }
      },
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        Events: [
          L,
          z,
          F,
          U.injectEventPluginsByName,
          v,
          $,
          function(e) {
            E(e, B);
          },
          Ae,
          Re,
          On,
          R
        ]
      },
      unstable_createRoot: function(e, t) {
        return Va(e) || a("278"), new qa(e, !0, null != t && !0 === t.hydrate);
      }
    };
    !(function(e) {
      var t = e.findFiberByHostInstance;
      (function(e) {
        if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
        var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (t.isDisabled || !t.supportsFiber) return !0;
        try {
          var n = t.inject(e);
          (Lr = Fr(function(e) {
            return t.onCommitFiberRoot(n, e);
          })),
            (zr = Fr(function(e) {
              return t.onCommitFiberUnmount(n, e);
            }));
        } catch (e) {}
      })(
        o({}, e, {
          findHostInstanceByFiber: function(e) {
            return null === (e = an(e)) ? null : e.stateNode;
          },
          findFiberByHostInstance: function(e) {
            return t ? t(e) : null;
          }
        })
      );
    })({
      findFiberByHostInstance: j,
      bundleType: 0,
      version: "16.6.0",
      rendererPackageName: "react-dom"
    });
    var $a = { default: Ba },
      Qa = ($a && Ba) || $a;
    e.exports = Qa.default || Qa;
  },
  function(e, t, n) {
    "use strict";
    e.exports = n(17);
  },
  function(e, t, n) {
    "use strict";
    /** @license React v16.6.0
     * scheduler.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ Object.defineProperty(t, "__esModule", { value: !0 });
    var r = null,
      o = 3,
      i = -1,
      a = -1,
      l = !1,
      s = !1,
      u =
        "object" == typeof performance && "function" == typeof performance.now,
      c = {
        timeRemaining: u
          ? function() {
              if (null !== r && r.expirationTime < a) return 0;
              var e = b() - performance.now();
              return 0 < e ? e : 0;
            }
          : function() {
              if (null !== r && r.expirationTime < a) return 0;
              var e = b() - Date.now();
              return 0 < e ? e : 0;
            },
        didTimeout: !1
      };
    function d() {
      if (!l) {
        var e = r.expirationTime;
        s ? v() : (s = !0), y(h, e);
      }
    }
    function f() {
      var e = r,
        t = r.next;
      if (r === t) r = null;
      else {
        var n = r.previous;
        (r = n.next = t), (t.previous = n);
      }
      (e.next = e.previous = null),
        (n = e.callback),
        (t = e.expirationTime),
        (e = e.priorityLevel);
      var i = o,
        l = a;
      (o = e), (a = t);
      try {
        var s = n(c);
      } finally {
        (o = i), (a = l);
      }
      if ("function" == typeof s)
        if (
          ((s = {
            callback: s,
            priorityLevel: e,
            expirationTime: t,
            next: null,
            previous: null
          }),
          null === r)
        )
          r = s.next = s.previous = s;
        else {
          (n = null), (e = r);
          do {
            if (e.expirationTime >= t) {
              n = e;
              break;
            }
            e = e.next;
          } while (e !== r);
          null === n ? (n = r) : n === r && ((r = s), d()),
            ((t = n.previous).next = n.previous = s),
            (s.next = n),
            (s.previous = t);
        }
    }
    function p() {
      if (-1 === i && null !== r && 1 === r.priorityLevel) {
        (l = !0), (c.didTimeout = !0);
        try {
          do {
            f();
          } while (null !== r && 1 === r.priorityLevel);
        } finally {
          (l = !1), null !== r ? d() : (s = !1);
        }
      }
    }
    function h(e) {
      (l = !0), (c.didTimeout = e);
      try {
        if (e)
          for (; null !== r; ) {
            var n = t.unstable_now();
            if (!(r.expirationTime <= n)) break;
            do {
              f();
            } while (null !== r && r.expirationTime <= n);
          }
        else if (null !== r)
          do {
            f();
          } while (null !== r && 0 < b() - t.unstable_now());
      } finally {
        (l = !1), null !== r ? d() : (s = !1), p();
      }
    }
    var m,
      g,
      y,
      v,
      b,
      w = Date,
      _ = "function" == typeof setTimeout ? setTimeout : void 0,
      k = "function" == typeof clearTimeout ? clearTimeout : void 0,
      C =
        "function" == typeof requestAnimationFrame
          ? requestAnimationFrame
          : void 0,
      T =
        "function" == typeof cancelAnimationFrame
          ? cancelAnimationFrame
          : void 0;
    function S(e) {
      (m = C(function(t) {
        k(g), e(t);
      })),
        (g = _(function() {
          T(m), e(t.unstable_now());
        }, 100));
    }
    if (u) {
      var E = performance;
      t.unstable_now = function() {
        return E.now();
      };
    } else
      t.unstable_now = function() {
        return w.now();
      };
    if ("undefined" != typeof window && window._schedMock) {
      var I = window._schedMock;
      (y = I[0]), (v = I[1]), (b = I[2]);
    } else if (
      "undefined" == typeof window ||
      "function" != typeof window.addEventListener
    ) {
      var x = null,
        P = -1,
        O = function(e, t) {
          if (null !== x) {
            var n = x;
            x = null;
            try {
              (P = t), n(e);
            } finally {
              P = -1;
            }
          }
        };
      (y = function(e, t) {
        -1 !== P
          ? setTimeout(y, 0, e, t)
          : ((x = e),
            setTimeout(O, t, !0, t),
            setTimeout(O, 1073741823, !1, 1073741823));
      }),
        (v = function() {
          x = null;
        }),
        (b = function() {
          return 1 / 0;
        }),
        (t.unstable_now = function() {
          return -1 === P ? 0 : P;
        });
    } else {
      "undefined" != typeof console &&
        ("function" != typeof C &&
          console.error(
            "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
          ),
        "function" != typeof T &&
          console.error(
            "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
          ));
      var U = null,
        A = !1,
        R = -1,
        N = !1,
        D = !1,
        M = 0,
        j = 33,
        L = 33;
      b = function() {
        return M;
      };
      var z =
        "__reactIdleCallback$" +
        Math.random()
          .toString(36)
          .slice(2);
      window.addEventListener(
        "message",
        function(e) {
          if (e.source === window && e.data === z) {
            (A = !1), (e = U);
            var n = R;
            (U = null), (R = -1);
            var r = t.unstable_now(),
              o = !1;
            if (0 >= M - r) {
              if (!(-1 !== n && n <= r))
                return N || ((N = !0), S(F)), (U = e), void (R = n);
              o = !0;
            }
            if (null !== e) {
              D = !0;
              try {
                e(o);
              } finally {
                D = !1;
              }
            }
          }
        },
        !1
      );
      var F = function(e) {
        if (null !== U) {
          S(F);
          var t = e - M + L;
          t < L && j < L ? (8 > t && (t = 8), (L = t < j ? j : t)) : (j = t),
            (M = e + L),
            A || ((A = !0), window.postMessage(z, "*"));
        } else N = !1;
      };
      (y = function(e, t) {
        (U = e),
          (R = t),
          D || 0 > t ? window.postMessage(z, "*") : N || ((N = !0), S(F));
      }),
        (v = function() {
          (U = null), (A = !1), (R = -1);
        });
    }
    (t.unstable_ImmediatePriority = 1),
      (t.unstable_UserBlockingPriority = 2),
      (t.unstable_NormalPriority = 3),
      (t.unstable_IdlePriority = 4),
      (t.unstable_runWithPriority = function(e, n) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
            break;
          default:
            e = 3;
        }
        var r = o,
          a = i;
        (o = e), (i = t.unstable_now());
        try {
          return n();
        } finally {
          (o = r), (i = a), p();
        }
      }),
      (t.unstable_scheduleCallback = function(e, n) {
        var a = -1 !== i ? i : t.unstable_now();
        if ("object" == typeof n && null !== n && "number" == typeof n.timeout)
          n = a + n.timeout;
        else
          switch (o) {
            case 1:
              n = a + -1;
              break;
            case 2:
              n = a + 250;
              break;
            case 4:
              n = a + 1073741823;
              break;
            default:
              n = a + 5e3;
          }
        if (
          ((e = {
            callback: e,
            priorityLevel: o,
            expirationTime: n,
            next: null,
            previous: null
          }),
          null === r)
        )
          (r = e.next = e.previous = e), d();
        else {
          a = null;
          var l = r;
          do {
            if (l.expirationTime > n) {
              a = l;
              break;
            }
            l = l.next;
          } while (l !== r);
          null === a ? (a = r) : a === r && ((r = e), d()),
            ((n = a.previous).next = a.previous = e),
            (e.next = a),
            (e.previous = n);
        }
        return e;
      }),
      (t.unstable_cancelCallback = function(e) {
        var t = e.next;
        if (null !== t) {
          if (t === e) r = null;
          else {
            e === r && (r = t);
            var n = e.previous;
            (n.next = t), (t.previous = n);
          }
          e.next = e.previous = null;
        }
      }),
      (t.unstable_wrapCallback = function(e) {
        var n = o;
        return function() {
          var r = o,
            a = i;
          (o = n), (i = t.unstable_now());
          try {
            return e.apply(this, arguments);
          } finally {
            (o = r), (i = a), p();
          }
        };
      }),
      (t.unstable_getCurrentPriorityLevel = function() {
        return o;
      });
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(19);
    (t.MicrosoftLogin = r.default), (t.default = r.default);
  },
  function(e, t, n) {
    "use strict";
    var r = (function() {
        var e = function(t, n) {
          return (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(e, t) {
                e.__proto__ = t;
              }) ||
            function(e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(t, n);
        };
        return function(t, n) {
          function r() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        };
      })(),
      o = function() {
        return (o =
          Object.assign ||
          function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }).apply(this, arguments);
      };
    Object.defineProperty(t, "__esModule", { value: !0 });
    var i = n(1),
      a = n(20),
      l = n(31),
      s = (function(e) {
        function t(t) {
          var n = e.call(this, t) || this;
          return (
            (n.state = {
              msalInstance: new a.UserAgentApplication(
                t.clientId,
                null,
                n.oAuthCallback
              )
            }),
            n
          );
        }
        return (
          r(t, e),
          (t.prototype.oAuthCallback = function(e, t, n, r) {
            var o = this.props.debug;
            t ? o && console.log(t) : console.error(e, t, n, r);
          }),
          (t.prototype.login = function() {
            var e = this,
              t = this.state.msalInstance,
              n = this.props,
              r = n.debug,
              o = n.graphScopes,
              i = n.withUserData,
              a = n.authCallback,
              l = (o && o.length) || [];
            l.some(function(e) {
              return "user.read" === e.toLowerCase();
            }) || l.push("user.read"),
              t
                .loginPopup(l)
                .then(function(e) {
                  return (
                    console.group("Microsoft Login debug"),
                    r &&
                      console.log(
                        "'id_token' getting with 'loginPopup' SUCCEDEED: ",
                        e
                      ),
                    t.acquireTokenSilent(l)
                  );
                })
                .catch(function(e) {
                  return (
                    r &&
                      console.log(
                        "'access_token' getting with 'acquireTokenSilent' is FAILED: ",
                        e
                      ),
                    t.acquireTokenPopup(l)
                  );
                })
                .then(function(t) {
                  r && console.log("'access_token' getting SUCCEDEED: ", t),
                    i ? e.getUserData(t) : a(null, { accessToken: t }),
                    console.groupEnd();
                })
                .catch(function(e) {
                  console.error(e), console.groupEnd(), a(e);
                });
          }),
          (t.prototype.getUserData = function(e) {
            var t = this.props,
              n = t.authCallback,
              r = t.debug;
            return fetch("https://graph.microsoft.com/v1.0/me", {
              method: "GET",
              headers: { Authorization: "Bearer " + e }
            })
              .then(function(e) {
                return e.json();
              })
              .then(function(t) {
                r && console.log("User data getting SUCCEDEED: ", t),
                  n(null, o({}, t, { accessToken: e }));
              });
          }),
          (t.prototype.render = function() {
            var e = this.props,
              t = e.buttonTheme,
              n = e.className;
            return i.createElement(
              "div",
              null,
              i.createElement(l.default, {
                buttonTheme: t || "light",
                buttonClassName: n,
                onClick: this.login.bind(this)
              })
            );
          }),
          t
        );
      })(i.Component);
    t.default = s;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(21);
    t.UserAgentApplication = r.UserAgentApplication;
    var o = n(5);
    t.Logger = o.Logger;
    var i = n(5);
    t.LogLevel = i.LogLevel;
    var a = n(9);
    t.User = a.User;
    var l = n(4);
    t.Constants = l.Constants;
    var s = n(8);
    t.TokenResponse = s.TokenResponse;
    var u = n(2);
    t.Authority = u.Authority;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(3),
      o = n(22),
      i = n(23),
      a = n(24),
      l = n(25),
      s = n(4),
      u = n(26),
      c = n(5),
      d = n(27),
      f = n(8),
      p = n(9),
      h = n(0),
      m = n(29),
      g = "id_token",
      y = "token",
      v = "id_token token",
      b = function(e, t, n) {
        var r = n.value;
        return (
          (n.value = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            return this.isInIframe()
              ? new Promise(function() {})
              : r.apply(this, e);
          }),
          n
        );
      },
      w = (function() {
        function e(e, t, n, r) {
          void 0 === r && (r = {}),
            (this._cacheLocations = {
              localStorage: "localStorage",
              sessionStorage: "sessionStorage"
            }),
            (this._clockSkew = 300),
            (this._tokenReceivedCallback = null),
            (this._isAngular = !1);
          var o = r.validateAuthority,
            i = void 0 === o || o,
            a = r.cacheLocation,
            l = void 0 === a ? "sessionStorage" : a,
            u = r.redirectUri,
            f =
              void 0 === u
                ? window.location.href.split("?")[0].split("#")[0]
                : u,
            p = r.postLogoutRedirectUri,
            h =
              void 0 === p
                ? window.location.href.split("?")[0].split("#")[0]
                : p,
            m = r.logger,
            g = void 0 === m ? new c.Logger(null) : m,
            y = r.loadFrameTimeout,
            v = void 0 === y ? 6e3 : y,
            b = r.navigateToLoginRequestUrl,
            w = void 0 === b || b,
            _ = r.state,
            k = void 0 === _ ? "" : _,
            C = r.isAngular,
            T = void 0 !== C && C,
            S = r.unprotectedResources,
            E = void 0 === S ? new Array() : S,
            I = r.protectedResourceMap,
            x = void 0 === I ? new Map() : I,
            P = r.storeAuthStateInCookie,
            O = void 0 !== P && P;
          if (
            ((this.loadFrameTimeout = v),
            (this.clientId = e),
            (this.validateAuthority = i),
            (this.authority = t || "https://login.microsoftonline.com/common"),
            (this._tokenReceivedCallback = n),
            (this._redirectUri = f),
            (this._postLogoutredirectUri = h),
            (this._loginInProgress = !1),
            (this._acquireTokenInProgress = !1),
            (this._cacheLocation = l),
            (this._navigateToLoginRequestUrl = w),
            (this._state = k),
            (this._isAngular = T),
            (this._unprotectedResources = E),
            (this._protectedResourceMap = x),
            !this._cacheLocations[l])
          )
            throw new Error(
              "Cache Location is not valid. Provided value:" +
                this._cacheLocation +
                ".Possible values are: " +
                this._cacheLocations.localStorage +
                ", " +
                this._cacheLocations.sessionStorage
            );
          (this._cacheStorage = new d.Storage(this._cacheLocation)),
            (this._logger = g),
            (this.storeAuthStateInCookie = O),
            (window.openedWindows = []),
            (window.activeRenewals = {}),
            (window.renewStates = []),
            (window.callBackMappedToRenewStates = {}),
            (window.callBacksMappedToRenewStates = {}),
            (window.msal = this);
          var U = window.location.hash,
            A = this.isCallback(U);
          if (!this._isAngular)
            if (A) this.handleAuthenticationResponse.call(this, U);
            else {
              var R = this._cacheStorage.getItem(s.Constants.urlHash);
              R && this.processCallBack(R);
            }
        }
        return (
          Object.defineProperty(e.prototype, "cacheLocation", {
            get: function() {
              return this._cacheLocation;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, "authority", {
            get: function() {
              return this.authorityInstance.CanonicalAuthority;
            },
            set: function(e) {
              this.authorityInstance = m.AuthorityFactory.CreateInstance(
                e,
                this.validateAuthority
              );
            },
            enumerable: !0,
            configurable: !0
          }),
          (e.prototype.processCallBack = function(e) {
            this._logger.info("Processing the callback from redirect response");
            var t = this.getRequestInfo(e);
            this.saveTokenFromHash(t);
            var n,
              r =
                t.parameters[s.Constants.accessToken] ||
                t.parameters[s.Constants.idToken],
              o = t.parameters[s.Constants.errorDescription],
              i = t.parameters[s.Constants.error];
            (n = t.parameters[s.Constants.accessToken]
              ? s.Constants.accessToken
              : s.Constants.idToken),
              this._cacheStorage.removeItem(s.Constants.urlHash);
            try {
              this._tokenReceivedCallback &&
                (this._cacheStorage.clearCookie(),
                this._tokenReceivedCallback.call(
                  this,
                  o,
                  r,
                  i,
                  n,
                  this.getUserState(
                    this._cacheStorage.getItem(
                      s.Constants.stateLogin,
                      this.storeAuthStateInCookie
                    )
                  )
                ));
            } catch (e) {
              this._logger.error(
                "Error occurred in token received callback function: " + e
              );
            }
          }),
          (e.prototype.loginRedirect = function(e, t) {
            var n = this;
            if (this._loginInProgress && this._tokenReceivedCallback)
              this._tokenReceivedCallback(
                s.ErrorDescription.loginProgressError,
                null,
                s.ErrorCodes.loginProgressError,
                s.Constants.idToken,
                this.getUserState(
                  this._cacheStorage.getItem(
                    s.Constants.stateLogin,
                    this.storeAuthStateInCookie
                  )
                )
              );
            else {
              if (e) {
                var r = this.validateInputScope(e);
                if (r && !h.Utils.isEmpty(r) && this._tokenReceivedCallback)
                  return void this._tokenReceivedCallback(
                    s.ErrorDescription.inputScopesError,
                    null,
                    s.ErrorCodes.inputScopesError,
                    s.Constants.idToken,
                    this.getUserState(
                      this._cacheStorage.getItem(
                        s.Constants.stateLogin,
                        this.storeAuthStateInCookie
                      )
                    )
                  );
                e = this.filterScopes(e);
              }
              (this._loginInProgress = !0),
                this.authorityInstance.ResolveEndpointsAsync().then(function() {
                  var r = new a.AuthenticationRequestParameters(
                    n.authorityInstance,
                    n.clientId,
                    e,
                    g,
                    n._redirectUri,
                    n._state
                  );
                  t && (r.extraQueryParameters = t);
                  var o = n._cacheStorage.getItem(
                    s.Constants.angularLoginRequest
                  );
                  o && "" !== o
                    ? n._cacheStorage.setItem(
                        s.Constants.angularLoginRequest,
                        ""
                      )
                    : (o = window.location.href),
                    n._cacheStorage.setItem(
                      s.Constants.loginRequest,
                      o,
                      n.storeAuthStateInCookie
                    ),
                    n._cacheStorage.setItem(s.Constants.loginError, ""),
                    n._cacheStorage.setItem(
                      s.Constants.stateLogin,
                      r.state,
                      n.storeAuthStateInCookie
                    ),
                    n._cacheStorage.setItem(
                      s.Constants.nonceIdToken,
                      r.nonce,
                      n.storeAuthStateInCookie
                    ),
                    n._cacheStorage.setItem(s.Constants.msalError, ""),
                    n._cacheStorage.setItem(
                      s.Constants.msalErrorDescription,
                      ""
                    );
                  var i =
                    s.Constants.authority +
                    s.Constants.resourceDelimeter +
                    r.state;
                  h.Utils.isEmpty(n._cacheStorage.getItem(i)) &&
                    n._cacheStorage.setItem(i, n.authority);
                  var l =
                    r.createNavigateUrl(e) +
                    s.Constants.prompt_select_account +
                    s.Constants.response_mode_fragment;
                  n.promptUser(l);
                });
            }
          }),
          (e.prototype.loginPopup = function(e, t) {
            var n = this;
            return new Promise(function(r, o) {
              if (n._loginInProgress)
                o(
                  s.ErrorCodes.loginProgressError +
                    s.Constants.resourceDelimeter +
                    s.ErrorDescription.loginProgressError
                );
              else {
                if (e) {
                  var i = n.validateInputScope(e);
                  if (i && !h.Utils.isEmpty(i))
                    return void o(
                      s.ErrorCodes.inputScopesError +
                        s.Constants.resourceDelimeter +
                        s.ErrorDescription.inputScopesError
                    );
                  e = n.filterScopes(e);
                } else e = [n.clientId];
                var l = e.join(" ").toLowerCase(),
                  u = n.openWindow("about:blank", "_blank", 1, n, r, o);
                u &&
                  ((n._loginInProgress = !0),
                  n.authorityInstance
                    .ResolveEndpointsAsync()
                    .then(
                      function() {
                        var i = new a.AuthenticationRequestParameters(
                          n.authorityInstance,
                          n.clientId,
                          e,
                          g,
                          n._redirectUri,
                          n._state
                        );
                        t && (i.extraQueryParameters = t),
                          n._cacheStorage.setItem(
                            s.Constants.loginRequest,
                            window.location.href,
                            n.storeAuthStateInCookie
                          ),
                          n._cacheStorage.setItem(s.Constants.loginError, ""),
                          n._cacheStorage.setItem(
                            s.Constants.nonceIdToken,
                            i.nonce,
                            n.storeAuthStateInCookie
                          ),
                          n._cacheStorage.setItem(s.Constants.msalError, ""),
                          n._cacheStorage.setItem(
                            s.Constants.msalErrorDescription,
                            ""
                          );
                        var c =
                          s.Constants.authority +
                          s.Constants.resourceDelimeter +
                          i.state;
                        h.Utils.isEmpty(n._cacheStorage.getItem(c)) &&
                          n._cacheStorage.setItem(c, n.authority);
                        var d =
                          i.createNavigateUrl(e) +
                          s.Constants.prompt_select_account +
                          s.Constants.response_mode_fragment;
                        window.renewStates.push(i.state),
                          (window.requestType = s.Constants.login),
                          n.registerCallback(i.state, l, r, o),
                          u &&
                            (n._logger.infoPii(
                              "Navigated Popup window to:" + d
                            ),
                            (u.location.href = d));
                      },
                      function() {
                        n._logger.info(
                          s.ErrorCodes.endpointResolutionError +
                            ":" +
                            s.ErrorDescription.endpointResolutionError
                        ),
                          n._cacheStorage.setItem(
                            s.Constants.msalError,
                            s.ErrorCodes.endpointResolutionError
                          ),
                          n._cacheStorage.setItem(
                            s.Constants.msalErrorDescription,
                            s.ErrorDescription.endpointResolutionError
                          ),
                          o &&
                            o(
                              s.ErrorCodes.endpointResolutionError +
                                ":" +
                                s.ErrorDescription.endpointResolutionError
                            ),
                          u && u.close();
                      }
                    )
                    .catch(function(e) {
                      n._logger.warning("could not resolve endpoints"), o(e);
                    }));
              }
            });
          }),
          (e.prototype.promptUser = function(e) {
            e && !h.Utils.isEmpty(e)
              ? (this._logger.infoPii("Navigate to:" + e),
                window.location.replace(e))
              : this._logger.info("Navigate url is empty");
          }),
          (e.prototype.openWindow = function(e, t, n, r, o, i) {
            var a = this,
              l = this.openPopup(
                e,
                t,
                s.Constants.popUpWidth,
                s.Constants.popUpHeight
              );
            if (null == l)
              return (
                (r._loginInProgress = !1),
                (r._acquireTokenInProgress = !1),
                this._logger.info(
                  s.ErrorCodes.popUpWindowError +
                    ":" +
                    s.ErrorDescription.popUpWindowError
                ),
                this._cacheStorage.setItem(
                  s.Constants.msalError,
                  s.ErrorCodes.popUpWindowError
                ),
                this._cacheStorage.setItem(
                  s.Constants.msalErrorDescription,
                  s.ErrorDescription.popUpWindowError
                ),
                i &&
                  i(
                    s.ErrorCodes.popUpWindowError +
                      s.Constants.resourceDelimeter +
                      s.ErrorDescription.popUpWindowError
                  ),
                null
              );
            window.openedWindows.push(l);
            var u = window.setInterval(function() {
              if (l && l.closed && r._loginInProgress) {
                if (
                  (i &&
                    i(
                      s.ErrorCodes.userCancelledError +
                        s.Constants.resourceDelimeter +
                        s.ErrorDescription.userCancelledError
                    ),
                  window.clearInterval(u),
                  a._isAngular)
                )
                  return void a.broadcast(
                    "msal:popUpClosed",
                    s.ErrorCodes.userCancelledError +
                      s.Constants.resourceDelimeter +
                      s.ErrorDescription.userCancelledError
                  );
                (r._loginInProgress = !1), (r._acquireTokenInProgress = !1);
              }
              try {
                var e = l.location;
                if (
                  -1 !== e.href.indexOf(a._redirectUri) &&
                  (window.clearInterval(u),
                  (r._loginInProgress = !1),
                  (r._acquireTokenInProgress = !1),
                  a._logger.info("Closing popup window"),
                  a._isAngular)
                ) {
                  a.broadcast("msal:popUpHashChanged", e.hash);
                  for (var t = 0; t < window.openedWindows.length; t++)
                    window.openedWindows[t].close();
                }
              } catch (e) {}
            }, n);
            return l;
          }),
          (e.prototype.broadcast = function(e, t) {
            var n = new CustomEvent(e, { detail: t });
            window.dispatchEvent(n);
          }),
          (e.prototype.logout = function() {
            this.clearCache(), (this._user = null);
            var e = "";
            this._postLogoutredirectUri &&
              (e =
                "post_logout_redirect_uri=" +
                encodeURIComponent(this._postLogoutredirectUri));
            var t = this.authority + "/oauth2/v2.0/logout?" + e;
            this.promptUser(t);
          }),
          (e.prototype.clearCache = function() {
            window.renewStates = [];
            for (
              var e = this._cacheStorage.getAllAccessTokens(
                  s.Constants.clientId,
                  s.Constants.userIdentifier
                ),
                t = 0;
              t < e.length;
              t++
            )
              this._cacheStorage.removeItem(JSON.stringify(e[t].key));
            this._cacheStorage.resetCacheItems(),
              this._cacheStorage.clearCookie();
          }),
          (e.prototype.clearCacheForScope = function(e) {
            for (
              var t = this._cacheStorage.getAllAccessTokens(
                  s.Constants.clientId,
                  s.Constants.userIdentifier
                ),
                n = 0;
              n < t.length;
              n++
            ) {
              var r = t[n];
              r.value.accessToken == e &&
                this._cacheStorage.removeItem(JSON.stringify(r.key));
            }
          }),
          (e.prototype.openPopup = function(e, t, n, r) {
            try {
              var o = window.screenLeft ? window.screenLeft : window.screenX,
                i = window.screenTop ? window.screenTop : window.screenY,
                a =
                  window.innerWidth ||
                  document.documentElement.clientWidth ||
                  document.body.clientWidth,
                l =
                  window.innerHeight ||
                  document.documentElement.clientHeight ||
                  document.body.clientHeight,
                s = a / 2 - n / 2 + o,
                u = l / 2 - r / 2 + i,
                c = window.open(
                  e,
                  t,
                  "width=" + n + ", height=" + r + ", top=" + u + ", left=" + s
                );
              return c.focus && c.focus(), c;
            } catch (e) {
              return (
                this._logger.error("error opening popup " + e.message),
                (this._loginInProgress = !1),
                (this._acquireTokenInProgress = !1),
                null
              );
            }
          }),
          (e.prototype.validateInputScope = function(e) {
            if (!e || e.length < 1)
              return "Scopes cannot be passed as an empty array";
            if (!Array.isArray(e))
              throw new Error("API does not accept non-array scopes");
            return e.indexOf(this.clientId) > -1 && e.length > 1
              ? "ClientId can only be provided as a single scope"
              : "";
          }),
          (e.prototype.filterScopes = function(e) {
            return (e = (e = e.filter(function(e) {
              return "openid" !== e;
            })).filter(function(e) {
              return "profile" !== e;
            }));
          }),
          (e.prototype.registerCallback = function(e, t, n, r) {
            var o = this;
            (window.activeRenewals[t] = e),
              window.callBacksMappedToRenewStates[e] ||
                (window.callBacksMappedToRenewStates[e] = []),
              window.callBacksMappedToRenewStates[e].push({
                resolve: n,
                reject: r
              }),
              window.callBackMappedToRenewStates[e] ||
                (window.callBackMappedToRenewStates[e] = function(n, r, i, a) {
                  window.activeRenewals[t] = null;
                  for (
                    var l = 0;
                    l < window.callBacksMappedToRenewStates[e].length;
                    ++l
                  )
                    try {
                      n || i
                        ? window.callBacksMappedToRenewStates[e][l].reject(
                            n + s.Constants.resourceDelimeter + i
                          )
                        : r &&
                          window.callBacksMappedToRenewStates[e][l].resolve(r);
                    } catch (e) {
                      o._logger.warning(e);
                    }
                  (window.callBacksMappedToRenewStates[e] = null),
                    (window.callBackMappedToRenewStates[e] = null);
                });
          }),
          (e.prototype.getCachedTokenInternal = function(e, t) {
            var n = t || this.getUser();
            if (n) {
              var r,
                o = this.authorityInstance
                  ? this.authorityInstance
                  : m.AuthorityFactory.CreateInstance(
                      this.authority,
                      this.validateAuthority
                    );
              return (
                (r = h.Utils.compareObjects(n, this.getUser())
                  ? e.indexOf(this.clientId) > -1
                    ? new a.AuthenticationRequestParameters(
                        o,
                        this.clientId,
                        e,
                        g,
                        this._redirectUri,
                        this._state
                      )
                    : new a.AuthenticationRequestParameters(
                        o,
                        this.clientId,
                        e,
                        y,
                        this._redirectUri,
                        this._state
                      )
                  : new a.AuthenticationRequestParameters(
                      o,
                      this.clientId,
                      e,
                      v,
                      this._redirectUri,
                      this._state
                    )),
                this.getCachedToken(r, t)
              );
            }
          }),
          (e.prototype.getCachedToken = function(e, t) {
            var n = null,
              r = e.scopes,
              o = this._cacheStorage.getAllAccessTokens(
                this.clientId,
                t ? t.userIdentifier : null
              );
            if (0 === o.length) return null;
            var i = [];
            if (e.authority) {
              for (a = 0; a < o.length; a++) {
                s = (l = o[a]).key.scopes.split(" ");
                h.Utils.containsScope(s, r) &&
                  l.key.authority === e.authority &&
                  i.push(l);
              }
              if (0 === i.length) return null;
              if (1 !== i.length)
                return {
                  errorDesc:
                    "The cache contains multiple tokens satisfying the requirements.Call AcquireToken again providing more requirements like authority",
                  token: null,
                  error: "multiple_matching_tokens_detected"
                };
              n = i[0];
            } else {
              for (var a = 0; a < o.length; a++) {
                var l,
                  s = (l = o[a]).key.scopes.split(" ");
                h.Utils.containsScope(s, r) && i.push(l);
              }
              if (1 === i.length)
                (n = i[0]),
                  (e.authorityInstance = m.AuthorityFactory.CreateInstance(
                    n.key.authority,
                    this.validateAuthority
                  ));
              else {
                if (i.length > 1)
                  return {
                    errorDesc:
                      "The cache contains multiple tokens satisfying the requirements. Call AcquireToken again providing more requirements like authority",
                    token: null,
                    error: "multiple_matching_tokens_detected"
                  };
                var u = this.getUniqueAuthority(o, "authority");
                if (u.length > 1)
                  return {
                    errorDesc:
                      "Multiple authorities found in the cache. Pass authority in the API overload.",
                    token: null,
                    error: "multiple_matching_tokens_detected"
                  };
                e.authorityInstance = m.AuthorityFactory.CreateInstance(
                  u[0],
                  this.validateAuthority
                );
              }
            }
            if (null != n) {
              var c = Number(n.value.expiresIn),
                d = this._clockSkew || 300;
              return c && c > h.Utils.now() + d
                ? { errorDesc: null, token: n.value.accessToken, error: null }
                : (this._cacheStorage.removeItem(JSON.stringify(i[0].key)),
                  null);
            }
            return null;
          }),
          (e.prototype.getAllUsers = function() {
            for (
              var e = [],
                t = this._cacheStorage.getAllAccessTokens(
                  s.Constants.clientId,
                  s.Constants.userIdentifier
                ),
                n = 0;
              n < t.length;
              n++
            ) {
              var r = new u.IdToken(t[n].value.idToken),
                o = new l.ClientInfo(t[n].value.clientInfo),
                i = p.User.createUser(r, o, this.authority);
              e.push(i);
            }
            return this.getUniqueUsers(e);
          }),
          (e.prototype.getUniqueUsers = function(e) {
            if (!e || e.length <= 1) return e;
            for (var t = [], n = [], r = 0; r < e.length; ++r)
              e[r].userIdentifier &&
                -1 === t.indexOf(e[r].userIdentifier) &&
                (t.push(e[r].userIdentifier), n.push(e[r]));
            return n;
          }),
          (e.prototype.getUniqueAuthority = function(e, t) {
            var n = [],
              r = [];
            return (
              e.forEach(function(e) {
                e.key.hasOwnProperty(t) &&
                  -1 === r.indexOf(e.key[t]) &&
                  (r.push(e.key[t]), n.push(e.key[t]));
              }),
              n
            );
          }),
          (e.prototype.addHintParameters = function(e, t) {
            var n = t || this.getUser();
            if (n) {
              var r = n.userIdentifier.split("."),
                o = h.Utils.base64DecodeStringUrlSafe(r[0]),
                i = h.Utils.base64DecodeStringUrlSafe(r[1]);
              n.sid && -1 !== e.indexOf(s.Constants.prompt_none)
                ? this.urlContainsQueryStringParameter(s.Constants.sid, e) ||
                  this.urlContainsQueryStringParameter(
                    s.Constants.login_hint,
                    e
                  ) ||
                  (e +=
                    "&" +
                    s.Constants.sid +
                    "=" +
                    encodeURIComponent(this._user.sid))
                : this.urlContainsQueryStringParameter(
                    s.Constants.login_hint,
                    e
                  ) ||
                  !n.displayableId ||
                  h.Utils.isEmpty(n.displayableId) ||
                  (e +=
                    "&" +
                    s.Constants.login_hint +
                    "=" +
                    encodeURIComponent(t.displayableId)),
                h.Utils.isEmpty(o) ||
                  h.Utils.isEmpty(i) ||
                  (this.urlContainsQueryStringParameter("domain_req", e) ||
                    h.Utils.isEmpty(i) ||
                    (e += "&domain_req=" + encodeURIComponent(i)),
                  this.urlContainsQueryStringParameter("login_req", e) ||
                    h.Utils.isEmpty(o) ||
                    (e += "&login_req=" + encodeURIComponent(o))),
                this.urlContainsQueryStringParameter(
                  s.Constants.domain_hint,
                  e
                ) ||
                  h.Utils.isEmpty(i) ||
                  (e +=
                    "9188040d-6c67-4c5b-b112-36a304b66dad" === i
                      ? "&" +
                        s.Constants.domain_hint +
                        "=" +
                        encodeURIComponent("consumers")
                      : "&" +
                        s.Constants.domain_hint +
                        "=" +
                        encodeURIComponent("organizations"));
            }
            return e;
          }),
          (e.prototype.urlContainsQueryStringParameter = function(e, t) {
            return new RegExp("[\\?&]" + e + "=").test(t);
          }),
          (e.prototype.acquireTokenRedirect = function(e, t, n, r) {
            var o = this,
              i = this.validateInputScope(e);
            if (i && !h.Utils.isEmpty(i) && this._tokenReceivedCallback)
              this._tokenReceivedCallback(
                s.ErrorDescription.inputScopesError,
                null,
                s.ErrorCodes.inputScopesError,
                s.Constants.accessToken,
                this.getUserState(
                  this._cacheStorage.getItem(
                    s.Constants.stateLogin,
                    this.storeAuthStateInCookie
                  )
                )
              );
            else {
              e && (e = this.filterScopes(e));
              var l = n || this.getUser();
              if (!this._acquireTokenInProgress) {
                var u;
                e.join(" ").toLowerCase();
                if (
                  !(l || (r && -1 !== r.indexOf(s.Constants.login_hint))) &&
                  this._tokenReceivedCallback
                )
                  return (
                    this._logger.info("User login is required"),
                    void this._tokenReceivedCallback(
                      s.ErrorDescription.userLoginError,
                      null,
                      s.ErrorCodes.userLoginError,
                      s.Constants.accessToken,
                      this.getUserState(
                        this._cacheStorage.getItem(
                          s.Constants.stateLogin,
                          this.storeAuthStateInCookie
                        )
                      )
                    )
                  );
                this._acquireTokenInProgress = !0;
                var c = t
                  ? m.AuthorityFactory.CreateInstance(t, this.validateAuthority)
                  : this.authorityInstance;
                c.ResolveEndpointsAsync().then(function() {
                  var t;
                  (u = h.Utils.compareObjects(l, o.getUser())
                    ? e.indexOf(o.clientId) > -1
                      ? new a.AuthenticationRequestParameters(
                          c,
                          o.clientId,
                          e,
                          g,
                          o._redirectUri,
                          o._state
                        )
                      : new a.AuthenticationRequestParameters(
                          c,
                          o.clientId,
                          e,
                          y,
                          o._redirectUri,
                          o._state
                        )
                    : new a.AuthenticationRequestParameters(
                        c,
                        o.clientId,
                        e,
                        v,
                        o._redirectUri,
                        o._state
                      )),
                    o._cacheStorage.setItem(
                      s.Constants.nonceIdToken,
                      u.nonce,
                      o.storeAuthStateInCookie
                    ),
                    (t = l
                      ? s.Constants.acquireTokenUser +
                        s.Constants.resourceDelimeter +
                        l.userIdentifier +
                        s.Constants.resourceDelimeter +
                        u.state
                      : s.Constants.acquireTokenUser +
                        s.Constants.resourceDelimeter +
                        s.Constants.no_user +
                        s.Constants.resourceDelimeter +
                        u.state),
                    h.Utils.isEmpty(o._cacheStorage.getItem(t)) &&
                      o._cacheStorage.setItem(t, JSON.stringify(l));
                  var n =
                    s.Constants.authority +
                    s.Constants.resourceDelimeter +
                    u.state;
                  h.Utils.isEmpty(o._cacheStorage.getItem(n)) &&
                    o._cacheStorage.setItem(n, c.CanonicalAuthority),
                    r && (u.extraQueryParameters = r);
                  var i =
                    u.createNavigateUrl(e) +
                    s.Constants.prompt_select_account +
                    s.Constants.response_mode_fragment;
                  (i = o.addHintParameters(i, l)) &&
                    (o._cacheStorage.setItem(
                      s.Constants.stateAcquireToken,
                      u.state,
                      o.storeAuthStateInCookie
                    ),
                    window.location.replace(i));
                });
              }
            }
          }),
          (e.prototype.acquireTokenPopup = function(e, t, n, r) {
            var o = this;
            return new Promise(function(i, l) {
              var u = o.validateInputScope(e);
              u &&
                !h.Utils.isEmpty(u) &&
                l(
                  s.ErrorCodes.inputScopesError +
                    s.Constants.resourceDelimeter +
                    u
                ),
                e && (e = o.filterScopes(e));
              var c = n || o.getUser();
              if (o._acquireTokenInProgress)
                l(
                  s.ErrorCodes.acquireTokenProgressError +
                    s.Constants.resourceDelimeter +
                    s.ErrorDescription.acquireTokenProgressError
                );
              else {
                var d,
                  f = e.join(" ").toLowerCase();
                if (!(c || (r && -1 !== r.indexOf(s.Constants.login_hint))))
                  return (
                    o._logger.info("User login is required"),
                    void l(
                      s.ErrorCodes.userLoginError +
                        s.Constants.resourceDelimeter +
                        s.ErrorDescription.userLoginError
                    )
                  );
                o._acquireTokenInProgress = !0;
                var p = t
                    ? m.AuthorityFactory.CreateInstance(t, o.validateAuthority)
                    : o.authorityInstance,
                  b = o.openWindow("about:blank", "_blank", 1, o, i, l);
                b &&
                  p
                    .ResolveEndpointsAsync()
                    .then(
                      function() {
                        var t;
                        (d = h.Utils.compareObjects(c, o.getUser())
                          ? e.indexOf(o.clientId) > -1
                            ? new a.AuthenticationRequestParameters(
                                p,
                                o.clientId,
                                e,
                                g,
                                o._redirectUri,
                                o._state
                              )
                            : new a.AuthenticationRequestParameters(
                                p,
                                o.clientId,
                                e,
                                y,
                                o._redirectUri,
                                o._state
                              )
                          : new a.AuthenticationRequestParameters(
                              p,
                              o.clientId,
                              e,
                              v,
                              o._redirectUri,
                              o._state
                            )),
                          o._cacheStorage.setItem(
                            s.Constants.nonceIdToken,
                            d.nonce
                          ),
                          (d.state = d.state),
                          (t = c
                            ? s.Constants.acquireTokenUser +
                              s.Constants.resourceDelimeter +
                              c.userIdentifier +
                              s.Constants.resourceDelimeter +
                              d.state
                            : s.Constants.acquireTokenUser +
                              s.Constants.resourceDelimeter +
                              s.Constants.no_user +
                              s.Constants.resourceDelimeter +
                              d.state),
                          h.Utils.isEmpty(o._cacheStorage.getItem(t)) &&
                            o._cacheStorage.setItem(t, JSON.stringify(c));
                        var n =
                          s.Constants.authority +
                          s.Constants.resourceDelimeter +
                          d.state;
                        h.Utils.isEmpty(o._cacheStorage.getItem(n)) &&
                          o._cacheStorage.setItem(n, p.CanonicalAuthority),
                          r && (d.extraQueryParameters = r);
                        var u =
                          d.createNavigateUrl(e) +
                          s.Constants.prompt_select_account +
                          s.Constants.response_mode_fragment;
                        (u = o.addHintParameters(u, c)),
                          window.renewStates.push(d.state),
                          (window.requestType = s.Constants.renewToken),
                          o.registerCallback(d.state, f, i, l),
                          b && (b.location.href = u);
                      },
                      function() {
                        o._logger.info(
                          s.ErrorCodes.endpointResolutionError +
                            ":" +
                            s.ErrorDescription.endpointResolutionError
                        ),
                          o._cacheStorage.setItem(
                            s.Constants.msalError,
                            s.ErrorCodes.endpointResolutionError
                          ),
                          o._cacheStorage.setItem(
                            s.Constants.msalErrorDescription,
                            s.ErrorDescription.endpointResolutionError
                          ),
                          l &&
                            l(
                              s.ErrorCodes.endpointResolutionError +
                                s.Constants.resourceDelimeter +
                                s.ErrorDescription.endpointResolutionError
                            ),
                          b && b.close();
                      }
                    )
                    .catch(function(e) {
                      o._logger.warning("could not resolve endpoints"), l(e);
                    });
              }
            });
          }),
          (e.prototype.acquireTokenSilent = function(e, t, n, r) {
            var o = this;
            return new Promise(function(i, l) {
              var u = o.validateInputScope(e);
              if (!u || h.Utils.isEmpty(u)) {
                e && (e = o.filterScopes(e));
                var c,
                  d = e.join(" ").toLowerCase(),
                  f = n || o.getUser();
                if (
                  !f &&
                  (!r ||
                    (-1 === r.indexOf(s.Constants.login_hint) &&
                      -1 === r.indexOf(s.Constants.sid)))
                )
                  return (
                    o._logger.info("User login is required"),
                    void l(
                      s.ErrorCodes.userLoginError +
                        s.Constants.resourceDelimeter +
                        s.ErrorDescription.userLoginError
                    )
                  );
                var p = t
                  ? m.AuthorityFactory.CreateInstance(t, o.validateAuthority)
                  : o.authorityInstance;
                c = h.Utils.compareObjects(f, o.getUser())
                  ? e.indexOf(o.clientId) > -1
                    ? new a.AuthenticationRequestParameters(
                        p,
                        o.clientId,
                        e,
                        g,
                        o._redirectUri,
                        o._state
                      )
                    : new a.AuthenticationRequestParameters(
                        p,
                        o.clientId,
                        e,
                        y,
                        o._redirectUri,
                        o._state
                      )
                  : new a.AuthenticationRequestParameters(
                      p,
                      o.clientId,
                      e,
                      v,
                      o._redirectUri,
                      o._state
                    );
                var b = o.getCachedToken(c, f);
                if (b) {
                  if (b.token)
                    return (
                      o._logger.info(
                        "Token is already in cache for scope:" + d
                      ),
                      void i(b.token)
                    );
                  if (b.errorDesc || b.error)
                    return (
                      o._logger.infoPii(b.errorDesc + ":" + b.error),
                      void l(
                        b.errorDesc + s.Constants.resourceDelimeter + b.error
                      )
                    );
                } else
                  o._logger.verbose("Token is not in cache for scope:" + d);
                return p
                  .ResolveEndpointsAsync()
                  .then(function() {
                    window.activeRenewals[d]
                      ? (o._logger.verbose(
                          "Renew token for scope: " +
                            d +
                            " is in progress. Registering callback"
                        ),
                        o.registerCallback(window.activeRenewals[d], d, i, l))
                      : e && e.indexOf(o.clientId) > -1 && 1 === e.length
                        ? (o._logger.verbose("renewing idToken"),
                          o.renewIdToken(e, i, l, f, c, r))
                        : (o._logger.verbose("renewing accesstoken"),
                          o.renewToken(e, i, l, f, c, r));
                  })
                  .catch(function(e) {
                    o._logger.warning("could not resolve endpoints"), l(e);
                  });
              }
              l(s.ErrorCodes.inputScopesError + "|" + u);
            });
          }),
          (e.prototype.loadIframeTimeout = function(e, t, n) {
            var r = this,
              o = window.activeRenewals[n];
            this._logger.verbose(
              "Set loading state to pending for: " + n + ":" + o
            ),
              this._cacheStorage.setItem(
                s.Constants.renewStatus + o,
                s.Constants.tokenRenewStatusInProgress
              ),
              this.loadFrame(e, t),
              setTimeout(function() {
                r._cacheStorage.getItem(s.Constants.renewStatus + o) ===
                  s.Constants.tokenRenewStatusInProgress &&
                  (r._logger.verbose(
                    "Loading frame has timed out after: " +
                      r.loadFrameTimeout / 1e3 +
                      " seconds for scope " +
                      n +
                      ":" +
                      o
                  ),
                  o &&
                    window.callBackMappedToRenewStates[o] &&
                    window.callBackMappedToRenewStates[o](
                      "Token renewal operation failed due to timeout",
                      null,
                      "Token Renewal Failed",
                      s.Constants.accessToken
                    ),
                  r._cacheStorage.setItem(
                    s.Constants.renewStatus + o,
                    s.Constants.tokenRenewStatusCancelled
                  ));
              }, this.loadFrameTimeout);
          }),
          (e.prototype.loadFrame = function(e, t) {
            var n = this;
            this._logger.info("LoadFrame: " + t);
            var r = t;
            setTimeout(function() {
              var o = n.addAdalFrame(r);
              ("" !== o.src && "about:blank" !== o.src) ||
                ((o.src = e),
                n._logger.infoPii("Frame Name : " + t + " Navigated to: " + e));
            }, 500);
          }),
          (e.prototype.addAdalFrame = function(e) {
            if (void 0 === e) return null;
            this._logger.info("Add msal frame to document:" + e);
            var t = document.getElementById(e);
            if (!t) {
              if (
                document.createElement &&
                document.documentElement &&
                -1 === window.navigator.userAgent.indexOf("MSIE 5.0")
              ) {
                var n = document.createElement("iframe");
                n.setAttribute("id", e),
                  (n.style.visibility = "hidden"),
                  (n.style.position = "absolute"),
                  (n.style.width = n.style.height = "0"),
                  (n.style.border = "0"),
                  (t = document.getElementsByTagName("body")[0].appendChild(n));
              } else
                document.body &&
                  document.body.insertAdjacentHTML &&
                  document.body.insertAdjacentHTML(
                    "beforeend",
                    '<iframe name="' +
                      e +
                      '" id="' +
                      e +
                      '" style="display:none"></iframe>'
                  );
              window.frames && window.frames[e] && (t = window.frames[e]);
            }
            return t;
          }),
          (e.prototype.renewToken = function(e, t, n, r, o, i) {
            var a = e.join(" ").toLowerCase();
            this._logger.verbose("renewToken is called for scope:" + a);
            var l,
              u = this.addAdalFrame("msalRenewFrame" + a);
            i && (o.extraQueryParameters = i),
              (l = r
                ? s.Constants.acquireTokenUser +
                  s.Constants.resourceDelimeter +
                  r.userIdentifier +
                  s.Constants.resourceDelimeter +
                  o.state
                : s.Constants.acquireTokenUser +
                  s.Constants.resourceDelimeter +
                  s.Constants.no_user +
                  s.Constants.resourceDelimeter +
                  o.state),
              h.Utils.isEmpty(this._cacheStorage.getItem(l)) &&
                this._cacheStorage.setItem(l, JSON.stringify(r));
            var c =
              s.Constants.authority + s.Constants.resourceDelimeter + o.state;
            h.Utils.isEmpty(this._cacheStorage.getItem(c)) &&
              this._cacheStorage.setItem(c, o.authority),
              this._cacheStorage.setItem(s.Constants.nonceIdToken, o.nonce),
              this._logger.verbose("Renew token Expected state: " + o.state);
            var d = o.createNavigateUrl(e) + s.Constants.prompt_none;
            (d = this.addHintParameters(d, r)),
              window.renewStates.push(o.state),
              (window.requestType = s.Constants.renewToken),
              this.registerCallback(o.state, a, t, n),
              this._logger.infoPii("Navigate to:" + d),
              (u.src = "about:blank"),
              this.loadIframeTimeout(d, "msalRenewFrame" + a, a);
          }),
          (e.prototype.renewIdToken = function(e, t, n, r, o, i) {
            e.join(" ").toLowerCase();
            this._logger.info("renewidToken is called");
            var a,
              l = this.addAdalFrame("msalIdTokenFrame");
            i && (o.extraQueryParameters = i),
              (a = r
                ? s.Constants.acquireTokenUser +
                  s.Constants.resourceDelimeter +
                  r.userIdentifier +
                  s.Constants.resourceDelimeter +
                  o.state
                : s.Constants.acquireTokenUser +
                  s.Constants.resourceDelimeter +
                  s.Constants.no_user +
                  s.Constants.resourceDelimeter +
                  o.state),
              h.Utils.isEmpty(this._cacheStorage.getItem(a)) &&
                this._cacheStorage.setItem(a, JSON.stringify(r));
            var u =
              s.Constants.authority + s.Constants.resourceDelimeter + o.state;
            h.Utils.isEmpty(this._cacheStorage.getItem(u)) &&
              this._cacheStorage.setItem(u, o.authority),
              this._cacheStorage.setItem(s.Constants.nonceIdToken, o.nonce),
              this._logger.verbose("Renew Idtoken Expected state: " + o.state);
            var c = o.createNavigateUrl(e) + s.Constants.prompt_none;
            (c = this.addHintParameters(c, r)),
              window.renewStates.push(o.state),
              (window.requestType = s.Constants.renewToken),
              this.registerCallback(o.state, this.clientId, t, n),
              this._logger.infoPii("Navigate to:" + c),
              (l.src = "about:blank"),
              this.loadIframeTimeout(c, "msalIdTokenFrame", this.clientId);
          }),
          (e.prototype.getUser = function() {
            if (this._user) return this._user;
            var e = this._cacheStorage.getItem(s.Constants.idTokenKey),
              t = this._cacheStorage.getItem(s.Constants.msalClientInfo);
            if (!h.Utils.isEmpty(e) && !h.Utils.isEmpty(t)) {
              var n = new u.IdToken(e),
                r = new l.ClientInfo(t);
              return (
                (this._user = p.User.createUser(n, r, this.authority)),
                this._user
              );
            }
            return null;
          }),
          (e.prototype.handleAuthenticationResponse = function(e) {
            null == e && (e = window.location.hash);
            var t = null,
              n = !1,
              r = !1;
            try {
              r =
                window.opener &&
                window.opener.msal &&
                window.opener.msal !== window.msal;
            } catch (e) {
              r = !1;
            }
            r
              ? ((t = window.opener.msal), (n = !0))
              : window.parent && window.parent.msal && (t = window.parent.msal);
            var o,
              i = t.getRequestInfo(e),
              a = null,
              l = null;
            if (
              (t._logger.info("Returned from redirect url"),
              window.parent !== window && window.parent.msal)
            )
              l = window.parent.callBackMappedToRenewStates[i.stateResponse];
            else if (r)
              l = window.opener.callBackMappedToRenewStates[i.stateResponse];
            else {
              if (t._navigateToLoginRequestUrl)
                return (
                  (l = null),
                  t._cacheStorage.setItem(s.Constants.urlHash, e),
                  !1,
                  void (
                    window.parent !== window ||
                    n ||
                    (window.location.href = t._cacheStorage.getItem(
                      s.Constants.loginRequest,
                      this.storeAuthStateInCookie
                    ))
                  )
                );
              (l = t._tokenReceivedCallback), (window.location.hash = "");
            }
            t.saveTokenFromHash(i),
              i.requestType === s.Constants.renewToken && window.parent
                ? (window.parent !== window
                    ? t._logger.verbose(
                        "Window is in iframe, acquiring token silently"
                      )
                    : t._logger.verbose(
                        "acquiring token interactive in progress"
                      ),
                  (a =
                    i.parameters[s.Constants.accessToken] ||
                    i.parameters[s.Constants.idToken]),
                  (o = s.Constants.accessToken))
                : i.requestType === s.Constants.login &&
                  ((a = i.parameters[s.Constants.idToken]),
                  (o = s.Constants.idToken));
            var u = i.parameters[s.Constants.errorDescription],
              c = i.parameters[s.Constants.error];
            try {
              l &&
                l.call(
                  t,
                  u,
                  a,
                  c,
                  o,
                  this.getUserState(
                    this._cacheStorage.getItem(
                      s.Constants.stateLogin,
                      this.storeAuthStateInCookie
                    )
                  )
                );
            } catch (e) {
              t._logger.error(
                "Error occurred in token received callback function: " + e
              );
            }
            if (r)
              for (var d = 0; d < window.opener.openedWindows.length; d++)
                window.opener.openedWindows[d].close();
          }),
          (e.prototype.saveAccessToken = function(e, t, n, r, a) {
            var u,
              c = new l.ClientInfo(r);
            if (t.parameters.hasOwnProperty("scope")) {
              for (
                var d = (u = t.parameters.scope).split(" "),
                  f = this._cacheStorage.getAllAccessTokens(this.clientId, e),
                  p = 0;
                p < f.length;
                p++
              ) {
                var m = f[p];
                if (m.key.userIdentifier === n.userIdentifier) {
                  var g = m.key.scopes.split(" ");
                  h.Utils.isIntersectingScopes(g, d) &&
                    this._cacheStorage.removeItem(JSON.stringify(m.key));
                }
              }
              var y = new o.AccessTokenKey(e, this.clientId, u, c.uid, c.utid),
                v = new i.AccessTokenValue(
                  t.parameters[s.Constants.accessToken],
                  a.rawIdToken,
                  h.Utils.expiresIn(
                    t.parameters[s.Constants.expiresIn]
                  ).toString(),
                  r
                );
              this._cacheStorage.setItem(JSON.stringify(y), JSON.stringify(v));
            } else {
              u = this.clientId;
              (y = new o.AccessTokenKey(e, this.clientId, u, c.uid, c.utid)),
                (v = new i.AccessTokenValue(
                  t.parameters[s.Constants.idToken],
                  t.parameters[s.Constants.idToken],
                  a.expiration,
                  r
                ));
              this._cacheStorage.setItem(JSON.stringify(y), JSON.stringify(v));
            }
          }),
          (e.prototype.saveTokenFromHash = function(e) {
            this._logger.info(
              "State status:" + e.stateMatch + "; Request type:" + e.requestType
            ),
              this._cacheStorage.setItem(s.Constants.msalError, ""),
              this._cacheStorage.setItem(s.Constants.msalErrorDescription, "");
            var t = "",
              n = "";
            if (
              (e.parameters.hasOwnProperty("scope")
                ? e.parameters.scope.toLowerCase()
                : this.clientId,
              e.parameters.hasOwnProperty(s.Constants.errorDescription) ||
                e.parameters.hasOwnProperty(s.Constants.error))
            ) {
              if (
                (this._logger.infoPii(
                  "Error :" +
                    e.parameters[s.Constants.error] +
                    "; Error description:" +
                    e.parameters[s.Constants.errorDescription]
                ),
                this._cacheStorage.setItem(
                  s.Constants.msalError,
                  e.parameters.error
                ),
                this._cacheStorage.setItem(
                  s.Constants.msalErrorDescription,
                  e.parameters[s.Constants.errorDescription]
                ),
                e.requestType === s.Constants.login &&
                  ((this._loginInProgress = !1),
                  this._cacheStorage.setItem(
                    s.Constants.loginError,
                    e.parameters[s.Constants.errorDescription] +
                      ":" +
                      e.parameters[s.Constants.error]
                  ),
                  (t =
                    s.Constants.authority +
                    s.Constants.resourceDelimeter +
                    e.stateResponse)),
                e.requestType === s.Constants.renewToken)
              ) {
                (this._acquireTokenInProgress = !1),
                  (t =
                    s.Constants.authority +
                    s.Constants.resourceDelimeter +
                    e.stateResponse);
                var r =
                  null !== this.getUser() ? this.getUser().userIdentifier : "";
                n =
                  s.Constants.acquireTokenUser +
                  s.Constants.resourceDelimeter +
                  r +
                  s.Constants.resourceDelimeter +
                  e.stateResponse;
              }
            } else if (e.stateMatch) {
              var o;
              this._logger.info("State is right"),
                e.parameters.hasOwnProperty(s.Constants.sessionState) &&
                  this._cacheStorage.setItem(
                    s.Constants.msalSessionState,
                    e.parameters[s.Constants.sessionState]
                  );
              var i = "";
              if (e.parameters.hasOwnProperty(s.Constants.accessToken)) {
                this._logger.info("Fragment has access token"),
                  (this._acquireTokenInProgress = !1);
                var a = void 0;
                (o = e.parameters.hasOwnProperty(s.Constants.idToken)
                  ? new u.IdToken(e.parameters[s.Constants.idToken])
                  : new u.IdToken(
                      this._cacheStorage.getItem(s.Constants.idTokenKey)
                    )),
                  (t =
                    s.Constants.authority +
                    s.Constants.resourceDelimeter +
                    e.stateResponse);
                var c = void 0;
                h.Utils.isEmpty(this._cacheStorage.getItem(t)) ||
                  ((c = this._cacheStorage.getItem(t)),
                  (c = h.Utils.replaceFirstPath(c, o.tenantId))),
                  e.parameters.hasOwnProperty(s.Constants.clientInfo)
                    ? ((i = e.parameters[s.Constants.clientInfo]),
                      (a = p.User.createUser(o, new l.ClientInfo(i), c)))
                    : (this._logger.warning(
                        "ClientInfo not received in the response from AAD"
                      ),
                      (a = p.User.createUser(o, new l.ClientInfo(i), c))),
                  (n =
                    s.Constants.acquireTokenUser +
                    s.Constants.resourceDelimeter +
                    a.userIdentifier +
                    s.Constants.resourceDelimeter +
                    e.stateResponse);
                var d =
                    s.Constants.acquireTokenUser +
                    s.Constants.resourceDelimeter +
                    s.Constants.no_user +
                    s.Constants.resourceDelimeter +
                    e.stateResponse,
                  f = void 0;
                h.Utils.isEmpty(this._cacheStorage.getItem(n))
                  ? h.Utils.isEmpty(this._cacheStorage.getItem(d)) ||
                    this.saveAccessToken(c, e, a, i, o)
                  : ((f = JSON.parse(this._cacheStorage.getItem(n))),
                    a && f && h.Utils.compareObjects(a, f)
                      ? (this.saveAccessToken(c, e, a, i, o),
                        this._logger.info(
                          "The user object received in the response is the same as the one passed in the acquireToken request"
                        ))
                      : this._logger.warning(
                          "The user object created from the response is not the same as the one passed in the acquireToken request"
                        ));
              }
              if (e.parameters.hasOwnProperty(s.Constants.idToken)) {
                this._logger.info("Fragment has id token"),
                  (this._loginInProgress = !1),
                  (o = new u.IdToken(e.parameters[s.Constants.idToken])),
                  e.parameters.hasOwnProperty(s.Constants.clientInfo)
                    ? (i = e.parameters[s.Constants.clientInfo])
                    : this._logger.warning(
                        "ClientInfo not received in the response from AAD"
                      ),
                  (t =
                    s.Constants.authority +
                    s.Constants.resourceDelimeter +
                    e.stateResponse);
                c = void 0;
                h.Utils.isEmpty(this._cacheStorage.getItem(t)) ||
                  ((c = this._cacheStorage.getItem(t)),
                  (c = h.Utils.replaceFirstPath(c, o.tenantId))),
                  (this._user = p.User.createUser(o, new l.ClientInfo(i), c)),
                  o && o.nonce
                    ? o.nonce !==
                      this._cacheStorage.getItem(
                        s.Constants.nonceIdToken,
                        this.storeAuthStateInCookie
                      )
                      ? ((this._user = null),
                        this._cacheStorage.setItem(
                          s.Constants.loginError,
                          "Nonce Mismatch. Expected Nonce: " +
                            this._cacheStorage.getItem(
                              s.Constants.nonceIdToken
                            ) +
                            ",Actual Nonce: " +
                            o.nonce
                        ),
                        this._logger.error(
                          "Nonce Mismatch.Expected Nonce: " +
                            this._cacheStorage.getItem(
                              s.Constants.nonceIdToken
                            ) +
                            ",Actual Nonce: " +
                            o.nonce
                        ))
                      : (this._cacheStorage.setItem(
                          s.Constants.idTokenKey,
                          e.parameters[s.Constants.idToken]
                        ),
                        this._cacheStorage.setItem(
                          s.Constants.msalClientInfo,
                          i
                        ),
                        this.saveAccessToken(c, e, this._user, i, o))
                    : ((t = e.stateResponse),
                      (n = e.stateResponse),
                      this._logger.error(
                        "Invalid id_token received in the response"
                      ),
                      (e.parameters.error = "invalid idToken"),
                      (e.parameters.error_description =
                        "Invalid idToken. idToken: " +
                        e.parameters[s.Constants.idToken]),
                      this._cacheStorage.setItem(
                        s.Constants.msalError,
                        "invalid idToken"
                      ),
                      this._cacheStorage.setItem(
                        s.Constants.msalErrorDescription,
                        "Invalid idToken. idToken: " +
                          e.parameters[s.Constants.idToken]
                      ));
              }
            } else
              (t = e.stateResponse),
                (n = e.stateResponse),
                this._logger.error(
                  "State Mismatch.Expected State: " +
                    this._cacheStorage.getItem(
                      s.Constants.stateLogin,
                      this.storeAuthStateInCookie
                    ) +
                    ",Actual State: " +
                    e.stateResponse
                ),
                (e.parameters.error = "Invalid_state"),
                (e.parameters.error_description =
                  "Invalid_state. state: " + e.stateResponse),
                this._cacheStorage.setItem(
                  s.Constants.msalError,
                  "Invalid_state"
                ),
                this._cacheStorage.setItem(
                  s.Constants.msalErrorDescription,
                  "Invalid_state. state: " + e.stateResponse
                );
            this._cacheStorage.setItem(
              s.Constants.renewStatus + e.stateResponse,
              s.Constants.tokenRenewStatusCompleted
            ),
              this._cacheStorage.removeAcquireTokenEntries(t, n),
              this._cacheStorage.clearCookie();
          }),
          (e.prototype.isCallback = function(e) {
            e = this.getHash(e);
            var t = h.Utils.deserialize(e);
            return (
              t.hasOwnProperty(s.Constants.errorDescription) ||
              t.hasOwnProperty(s.Constants.error) ||
              t.hasOwnProperty(s.Constants.accessToken) ||
              t.hasOwnProperty(s.Constants.idToken)
            );
          }),
          (e.prototype.getHash = function(e) {
            return (
              e.indexOf("#/") > -1
                ? (e = e.substring(e.indexOf("#/") + 2))
                : e.indexOf("#") > -1 && (e = e.substring(1)),
              e
            );
          }),
          (e.prototype.getRequestInfo = function(e) {
            e = this.getHash(e);
            var t = h.Utils.deserialize(e),
              n = new f.TokenResponse();
            if (
              t &&
              ((n.parameters = t),
              t.hasOwnProperty(s.Constants.errorDescription) ||
                t.hasOwnProperty(s.Constants.error) ||
                t.hasOwnProperty(s.Constants.accessToken) ||
                t.hasOwnProperty(s.Constants.idToken))
            ) {
              n.valid = !0;
              var r = void 0;
              if (!t.hasOwnProperty("state")) return n;
              if (
                ((r = t.state),
                (n.stateResponse = r),
                r ===
                  this._cacheStorage.getItem(
                    s.Constants.stateLogin,
                    this.storeAuthStateInCookie
                  ))
              )
                return (
                  (n.requestType = s.Constants.login), (n.stateMatch = !0), n
                );
              if (
                r ===
                this._cacheStorage.getItem(
                  s.Constants.stateAcquireToken,
                  this.storeAuthStateInCookie
                )
              )
                return (
                  (n.requestType = s.Constants.renewToken),
                  (n.stateMatch = !0),
                  n
                );
              if (!n.stateMatch) {
                n.requestType = window.requestType;
                for (var o = window.renewStates, i = 0; i < o.length; i++)
                  if (o[i] === n.stateResponse) {
                    n.stateMatch = !0;
                    break;
                  }
              }
            }
            return n;
          }),
          (e.prototype.getScopeFromState = function(e) {
            if (e) {
              var t = e.indexOf("|");
              if (t > -1 && t + 1 < e.length) return e.substring(t + 1);
            }
            return "";
          }),
          (e.prototype.getUserState = function(e) {
            if (e) {
              var t = e.indexOf("|");
              if (t > -1 && t + 1 < e.length) return e.substring(t + 1);
            }
            return "";
          }),
          (e.prototype.isInIframe = function() {
            return window.parent !== window;
          }),
          (e.prototype.loginInProgress = function() {
            return (
              !!this._cacheStorage.getItem(s.Constants.urlHash) ||
              this._loginInProgress
            );
          }),
          (e.prototype.getHostFromUri = function(e) {
            var t = String(e).replace(/^(https?:)\/\//, "");
            return (t = t.split("/")[0]);
          }),
          (e.prototype.getScopesForEndpoint = function(e) {
            if (this._unprotectedResources.length > 0)
              for (var t = 0; t < this._unprotectedResources.length; t++)
                if (e.indexOf(this._unprotectedResources[t]) > -1) return null;
            if (this._protectedResourceMap.size > 0)
              for (
                var n = 0, r = Array.from(this._protectedResourceMap.keys());
                n < r.length;
                n++
              ) {
                var o = r[n];
                if (e.indexOf(o) > -1) return this._protectedResourceMap.get(o);
              }
            return e.indexOf("http://") > -1 || e.indexOf("https://") > -1
              ? this.getHostFromUri(e) ===
                this.getHostFromUri(this._redirectUri)
                ? new Array(this.clientId)
                : null
              : new Array(this.clientId);
          }),
          (e.prototype.setloginInProgress = function(e) {
            this._loginInProgress = e;
          }),
          (e.prototype.getAcquireTokenInProgress = function() {
            return this._acquireTokenInProgress;
          }),
          (e.prototype.setAcquireTokenInProgress = function(e) {
            this._acquireTokenInProgress = e;
          }),
          (e.prototype.getLogger = function() {
            return this._logger;
          }),
          r.__decorate([b], e.prototype, "acquireTokenSilent", null),
          e
        );
      })();
    t.UserAgentApplication = w;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(0),
      o = (function() {
        return function(e, t, n, o, i) {
          (this.authority = e),
            (this.clientId = t),
            (this.scopes = n),
            (this.userIdentifier =
              r.Utils.base64EncodeStringUrlSafe(o) +
              "." +
              r.Utils.base64EncodeStringUrlSafe(i));
        };
      })();
    t.AccessTokenKey = o;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function() {
      return function(e, t, n, r) {
        (this.accessToken = e),
          (this.idToken = t),
          (this.expiresIn = n),
          (this.clientInfo = r);
      };
    })();
    t.AccessTokenValue = r;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(0),
      o = (function() {
        function e(e, t, n, o, i, a) {
          (this.authorityInstance = e),
            (this.clientId = t),
            (this.scopes = n),
            (this.responseType = o),
            (this.redirectUri = i),
            (this.correlationId = r.Utils.createNewGuid()),
            (this.state =
              a && !r.Utils.isEmpty(a)
                ? r.Utils.createNewGuid() + "|" + a
                : r.Utils.createNewGuid()),
            (this.nonce = r.Utils.createNewGuid()),
            (this.xClientSku = "MSAL.JS"),
            (this.xClientVer = r.Utils.getLibraryVersion());
        }
        return (
          Object.defineProperty(e.prototype, "authority", {
            get: function() {
              return this.authorityInstance.CanonicalAuthority;
            },
            enumerable: !0,
            configurable: !0
          }),
          (e.prototype.createNavigateUrl = function(e) {
            var t = this.createNavigationUrlString(e),
              n = this.authorityInstance.AuthorizationEndpoint;
            return (
              n.indexOf("?") < 0 ? (n += "?") : (n += "&"), "" + n + t.join("&")
            );
          }),
          (e.prototype.createNavigationUrlString = function(e) {
            e || (e = [this.clientId]),
              -1 === e.indexOf(this.clientId) && e.push(this.clientId);
            var t = [];
            return (
              t.push("response_type=" + this.responseType),
              this.translateclientIdUsedInScope(e),
              t.push("scope=" + encodeURIComponent(this.parseScope(e))),
              t.push("client_id=" + encodeURIComponent(this.clientId)),
              t.push("redirect_uri=" + encodeURIComponent(this.redirectUri)),
              t.push("state=" + encodeURIComponent(this.state)),
              t.push("nonce=" + encodeURIComponent(this.nonce)),
              t.push("client_info=1"),
              t.push("x-client-SKU=" + this.xClientSku),
              t.push("x-client-Ver=" + this.xClientVer),
              this.extraQueryParameters && t.push(this.extraQueryParameters),
              t.push(
                "client-request-id=" + encodeURIComponent(this.correlationId)
              ),
              t
            );
          }),
          (e.prototype.translateclientIdUsedInScope = function(e) {
            var t = e.indexOf(this.clientId);
            t >= 0 &&
              (e.splice(t, 1),
              -1 === e.indexOf("openid") && e.push("openid"),
              -1 === e.indexOf("profile") && e.push("profile"));
          }),
          (e.prototype.parseScope = function(e) {
            var t = "";
            if (e)
              for (var n = 0; n < e.length; ++n)
                t += n !== e.length - 1 ? e[n] + " " : e[n];
            return t;
          }),
          e
        );
      })();
    t.AuthenticationRequestParameters = o;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(0),
      o = (function() {
        function e(e) {
          if (!e || r.Utils.isEmpty(e))
            return (this.uid = ""), void (this.utid = "");
          try {
            var t = r.Utils.base64DecodeStringUrlSafe(e),
              n = JSON.parse(t);
            n &&
              (n.hasOwnProperty("uid") && (this.uid = n.uid),
              n.hasOwnProperty("utid") && (this.utid = n.utid));
          } catch (e) {
            throw new Error(e);
          }
        }
        return (
          Object.defineProperty(e.prototype, "uid", {
            get: function() {
              return this._uid ? this._uid : "";
            },
            set: function(e) {
              this._uid = e;
            },
            enumerable: !0,
            configurable: !0
          }),
          Object.defineProperty(e.prototype, "utid", {
            get: function() {
              return this._utid ? this._utid : "";
            },
            set: function(e) {
              this._utid = e;
            },
            enumerable: !0,
            configurable: !0
          }),
          e
        );
      })();
    t.ClientInfo = o;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(0),
      o = (function() {
        return function(e) {
          if (r.Utils.isEmpty(e)) throw new Error("null or empty raw idtoken");
          try {
            (this.rawIdToken = e),
              (this.decodedIdToken = r.Utils.extractIdToken(e)),
              this.decodedIdToken &&
                (this.decodedIdToken.hasOwnProperty("iss") &&
                  (this.issuer = this.decodedIdToken.iss),
                this.decodedIdToken.hasOwnProperty("oid") &&
                  (this.objectId = this.decodedIdToken.oid),
                this.decodedIdToken.hasOwnProperty("sub") &&
                  (this.subject = this.decodedIdToken.sub),
                this.decodedIdToken.hasOwnProperty("tid") &&
                  (this.tenantId = this.decodedIdToken.tid),
                this.decodedIdToken.hasOwnProperty("ver") &&
                  (this.version = this.decodedIdToken.ver),
                this.decodedIdToken.hasOwnProperty("preferred_username") &&
                  (this.preferredName = this.decodedIdToken.preferred_username),
                this.decodedIdToken.hasOwnProperty("name") &&
                  (this.name = this.decodedIdToken.name),
                this.decodedIdToken.hasOwnProperty("nonce") &&
                  (this.nonce = this.decodedIdToken.nonce),
                this.decodedIdToken.hasOwnProperty("exp") &&
                  (this.expiration = this.decodedIdToken.exp),
                this.decodedIdToken.hasOwnProperty("home_oid") &&
                  (this.homeObjectId = this.decodedIdToken.home_oid),
                this.decodedIdToken.hasOwnProperty("sid") &&
                  (this.sid = this.decodedIdToken.sid));
          } catch (e) {
            throw new Error("Failed to parse the returned id token");
          }
        };
      })();
    t.IdToken = o;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(4),
      o = n(28),
      i = (function() {
        function e(t) {
          if (e._instance) return e._instance;
          if (
            ((this._cacheLocation = t),
            (this._localStorageSupported =
              void 0 !== window[this._cacheLocation] &&
              null != window[this._cacheLocation]),
            (this._sessionStorageSupported =
              void 0 !== window[t] && null != window[t]),
            (e._instance = this),
            !this._localStorageSupported && !this._sessionStorageSupported)
          )
            throw new Error("localStorage and sessionStorage not supported");
          return e._instance;
        }
        return (
          (e.prototype.setItem = function(e, t, n) {
            window[this._cacheLocation] &&
              window[this._cacheLocation].setItem(e, t),
              n && this.setItemCookie(e, t);
          }),
          (e.prototype.getItem = function(e, t) {
            return t && this.getItemCookie(e)
              ? this.getItemCookie(e)
              : window[this._cacheLocation]
                ? window[this._cacheLocation].getItem(e)
                : void 0;
          }),
          (e.prototype.removeItem = function(e) {
            if (window[this._cacheLocation])
              return window[this._cacheLocation].removeItem(e);
          }),
          (e.prototype.clear = function() {
            if (window[this._cacheLocation])
              return window[this._cacheLocation].clear();
          }),
          (e.prototype.getAllAccessTokens = function(e, t) {
            var n,
              r = [],
              i = window[this._cacheLocation];
            if (i) {
              var a = void 0;
              for (a in i)
                if (i.hasOwnProperty(a) && a.match(e) && a.match(t)) {
                  var l = this.getItem(a);
                  l &&
                    ((n = new o.AccessTokenCacheItem(
                      JSON.parse(a),
                      JSON.parse(l)
                    )),
                    r.push(n));
                }
            }
            return r;
          }),
          (e.prototype.removeAcquireTokenEntries = function(e, t) {
            var n = window[this._cacheLocation];
            if (n) {
              var r = void 0;
              for (r in n)
                n.hasOwnProperty(r) &&
                  (("" != e && r.indexOf(e) > -1) ||
                    ("" != t && r.indexOf(t) > -1)) &&
                  this.removeItem(r);
            }
          }),
          (e.prototype.resetCacheItems = function() {
            var e = window[this._cacheLocation];
            if (e) {
              var t = void 0;
              for (t in e)
                e.hasOwnProperty(t) &&
                  -1 !== t.indexOf(r.Constants.msal) &&
                  this.setItem(t, ""),
                  e.hasOwnProperty(t) &&
                    -1 !== t.indexOf(r.Constants.renewStatus) &&
                    this.removeItem(t);
            }
          }),
          (e.prototype.setItemCookie = function(e, t, n) {
            var r = e + "=" + t + ";";
            n && (r += "expires=" + this.setExpirationCookie(n) + ";");
            document.cookie = r;
          }),
          (e.prototype.getItemCookie = function(e) {
            for (
              var t = e + "=", n = document.cookie.split(";"), r = 0;
              r < n.length;
              r++
            ) {
              for (var o = n[r]; " " == o.charAt(0); ) o = o.substring(1);
              if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
            }
            return "";
          }),
          (e.prototype.setExpirationCookie = function(e) {
            var t = new Date();
            return new Date(t.getTime() + 24 * e * 60 * 60 * 1e3).toUTCString();
          }),
          (e.prototype.clearCookie = function() {
            this.setItemCookie(r.Constants.nonceIdToken, "", -1),
              this.setItemCookie(r.Constants.stateLogin, "", -1),
              this.setItemCookie(r.Constants.loginRequest, "", -1),
              this.setItemCookie(r.Constants.stateAcquireToken, "", -1);
          }),
          e
        );
      })();
    t.Storage = i;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = (function() {
      return function(e, t) {
        (this.key = e), (this.value = t);
      };
    })();
    t.AccessTokenCacheItem = r;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(0),
      o = n(10),
      i = n(30),
      a = n(2),
      l = n(6),
      s = (function() {
        function e() {}
        return (
          (e.DetectAuthorityFromUrl = function(e) {
            switch (
              ((e = r.Utils.CanonicalizeUri(e)),
              r.Utils.GetUrlComponents(e).PathSegments[0])
            ) {
              case "tfp":
                return a.AuthorityType.B2C;
              case "adfs":
                return a.AuthorityType.Adfs;
              default:
                return a.AuthorityType.Aad;
            }
          }),
          (e.CreateInstance = function(t, n) {
            switch (e.DetectAuthorityFromUrl(t)) {
              case a.AuthorityType.B2C:
                return new i.B2cAuthority(t, n);
              case a.AuthorityType.Aad:
                return new o.AadAuthority(t, n);
              default:
                throw l.ErrorMessage.invalidAuthorityType;
            }
          }),
          e
        );
      })();
    t.AuthorityFactory = s;
  },
  function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var r = n(3),
      o = n(10),
      i = n(2),
      a = n(6),
      l = n(0),
      s = (function(e) {
        function t(t, n) {
          var r = e.call(this, t, n) || this,
            o = l.Utils.GetUrlComponents(t),
            i = o.PathSegments;
          if (i.length < 3) throw a.ErrorMessage.b2cAuthorityUriInvalidPath;
          return (
            (r.CanonicalAuthority =
              "https://" +
              o.HostNameAndPort +
              "/" +
              i[0] +
              "/" +
              i[1] +
              "/" +
              i[2] +
              "/"),
            r
          );
        }
        return (
          r.__extends(t, e),
          Object.defineProperty(t.prototype, "AuthorityType", {
            get: function() {
              return i.AuthorityType.B2C;
            },
            enumerable: !0,
            configurable: !0
          }),
          (t.prototype.GetOpenIdConfigurationEndpointAsync = function() {
            var e = this,
              t = new Promise(function(t, n) {
                return t(e.DefaultOpenIdConfigurationEndpoint);
              });
            return this.IsValidationEnabled
              ? this.IsInTrustedHostList(
                  this.CanonicalAuthorityUrlComponents.HostNameAndPort
                )
                ? t
                : new Promise(function(e, t) {
                    return t(a.ErrorMessage.unsupportedAuthorityValidation);
                  })
              : t;
          }),
          t
        );
      })(o.AadAuthority);
    t.B2cAuthority = s;
  },
  function(e, t, n) {
    "use strict";
    var r = (function() {
      var e = function(t, n) {
        return (e =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(e, t) {
              e.__proto__ = t;
            }) ||
          function(e, t) {
            for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
          })(t, n);
      };
      return function(t, n) {
        function r() {
          this.constructor = t;
        }
        e(t, n),
          (t.prototype =
            null === n
              ? Object.create(n)
              : ((r.prototype = n.prototype), new r()));
      };
    })();
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o = n(1),
      i = (function(e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          r(t, e),
          (t.prototype.render = function() {
            var e = this.props,
              t = e.buttonTheme,
              n = e.buttonClassName,
              r = e.onClick,
              i = t.split("_"),
              a = "dark" === i[0],
              l = { cursor: "pointer" };
            return i[1]
              ? o.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "104",
                    height: "41",
                    style: l,
                    className: n,
                    onClick: r
                  },
                  o.createElement("path", {
                    fill: a ? "#2f2f2f" : "#ffffff",
                    d: "M0 0h104v41H0z"
                  }),
                  !a &&
                    o.createElement("path", {
                      fill: "#8c8c8c",
                      d: "M103 1v39H1V1h102m1-1H0v41h104V0z"
                    }),
                  o.createElement("path", {
                    fill: "#f25022",
                    d: "M13 11h9v9h-9z"
                  }),
                  o.createElement("path", {
                    fill: "#00a4ef",
                    d: "M13 21h9v9h-9z"
                  }),
                  o.createElement("path", {
                    fill: "#7fba00",
                    d: "M23 11h9v9h-9z"
                  }),
                  o.createElement("path", {
                    fill: "#ffb900",
                    d: "M23 21h9v9h-9z"
                  }),
                  o.createElement("path", {
                    fill: a ? "#ffffff" : "#5e5e5e",
                    d:
                      "M45.812 25.082v-1.794a2.77 2.77 0 0 0 .573.4 4.484 4.484 0 0 0 .706.3 5.486 5.486 0 0 0 .745.187 3.954 3.954 0 0 0 .687.065 2.928 2.928 0 0 0 1.634-.365 1.2 1.2 0 0 0 .537-1.062 1.167 1.167 0 0 0-.178-.649 1.939 1.939 0 0 0-.5-.5 5.412 5.412 0 0 0-.757-.435q-.435-.209-.932-.436-.533-.285-.994-.578a4.285 4.285 0 0 1-.8-.648 2.724 2.724 0 0 1-.533-.8 2.6 2.6 0 0 1-.194-1.047 2.416 2.416 0 0 1 .333-1.285 2.794 2.794 0 0 1 .877-.9 4.019 4.019 0 0 1 1.239-.528 5.906 5.906 0 0 1 1.418-.172 5.692 5.692 0 0 1 2.4.374v1.721a3.817 3.817 0 0 0-2.295-.645 4.093 4.093 0 0 0-.771.074 2.335 2.335 0 0 0-.687.241 1.5 1.5 0 0 0-.494.433 1.06 1.06 0 0 0-.189.637 1.221 1.221 0 0 0 .145.608 1.573 1.573 0 0 0 .428.468 4.321 4.321 0 0 0 .688.414c.27.134.584.28.939.436q.548.285 1.034.6a4.881 4.881 0 0 1 .856.7 3.075 3.075 0 0 1 .585.846 2.493 2.493 0 0 1 .215 1.058 2.625 2.625 0 0 1-.322 1.348 2.584 2.584 0 0 1-.866.892 3.786 3.786 0 0 1-1.254.5 6.959 6.959 0 0 1-1.5.155c-.176 0-.392-.014-.647-.04s-.518-.067-.786-.117a7.75 7.75 0 0 1-.76-.187 2.373 2.373 0 0 1-.58-.269zM55.109 16.426a1.021 1.021 0 0 1-.713-.272.891.891 0 0 1-.3-.688.917.917 0 0 1 .3-.7 1.009 1.009 0 0 1 .713-.278 1.041 1.041 0 0 1 .732.278.915.915 0 0 1 .3.7.9.9 0 0 1-.3.678 1.035 1.035 0 0 1-.732.282zm.841 9.074h-1.7V18h1.7zM64.979 24.9q0 4.131-4.146 4.131a6.166 6.166 0 0 1-2.551-.491v-1.554a4.712 4.712 0 0 0 2.332.7 2.341 2.341 0 0 0 2.668-2.628v-.818h-.029a2.938 2.938 0 0 1-4.733.436 4.046 4.046 0 0 1-.837-2.684 4.738 4.738 0 0 1 .9-3.04 2.988 2.988 0 0 1 2.471-1.128 2.38 2.38 0 0 1 2.2 1.216h.029V18h1.7zM63.3 22.064v-.973a1.91 1.91 0 0 0-.523-1.352 1.71 1.71 0 0 0-1.3-.559 1.789 1.789 0 0 0-1.51.714 3.223 3.223 0 0 0-.545 2 2.78 2.78 0 0 0 .523 1.769 1.675 1.675 0 0 0 1.385.662 1.8 1.8 0 0 0 1.426-.632 2.4 2.4 0 0 0 .544-1.629zM73.853 25.5h-1.7v-4.227q0-2.1-1.483-2.1a1.616 1.616 0 0 0-1.279.582 2.167 2.167 0 0 0-.505 1.469V25.5h-1.7V18h1.7v1.245h.029a2.669 2.669 0 0 1 2.428-1.421 2.257 2.257 0 0 1 1.863.795 3.57 3.57 0 0 1 .644 2.3zM80.892 16.426a1.017 1.017 0 0 1-.713-.272.889.889 0 0 1-.3-.688.915.915 0 0 1 .3-.7 1 1 0 0 1 .713-.278 1.038 1.038 0 0 1 .731.278.915.915 0 0 1 .3.7.9.9 0 0 1-.3.678 1.033 1.033 0 0 1-.731.282zm.84 9.074h-1.7V18h1.7zM90.614 25.5h-1.7v-4.227q0-2.1-1.483-2.1a1.62 1.62 0 0 0-1.28.582 2.167 2.167 0 0 0-.5 1.469V25.5h-1.7V18h1.7v1.245h.03a2.668 2.668 0 0 1 2.427-1.421 2.258 2.258 0 0 1 1.864.795 3.576 3.576 0 0 1 .643 2.3z"
                  })
                )
              : o.createElement(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "215",
                    height: "41",
                    style: l,
                    className: n,
                    onClick: r
                  },
                  o.createElement("path", {
                    fill: a ? "#2f2f2f" : "#ffffff",
                    d: "M0 0h215v41H0z"
                  }),
                  !a &&
                    o.createElement("path", {
                      fill: "#8c8c8c",
                      d: "M214 1v39H1V1h213m1-1H0v41h215V0z"
                    }),
                  o.createElement("path", {
                    fill: a ? "#ffffff" : "#5e5e5e",
                    d:
                      "M45.812 25.082v-1.794a2.77 2.77 0 0 0 .573.4 4.484 4.484 0 0 0 .706.3 5.486 5.486 0 0 0 .745.187 3.954 3.954 0 0 0 .687.065 2.928 2.928 0 0 0 1.634-.365 1.2 1.2 0 0 0 .537-1.062 1.167 1.167 0 0 0-.178-.649 1.939 1.939 0 0 0-.5-.5 5.412 5.412 0 0 0-.757-.435q-.435-.209-.932-.436-.533-.285-.994-.578a4.285 4.285 0 0 1-.8-.648 2.724 2.724 0 0 1-.533-.8 2.6 2.6 0 0 1-.194-1.047 2.416 2.416 0 0 1 .333-1.285 2.794 2.794 0 0 1 .877-.9 4.019 4.019 0 0 1 1.239-.528 5.906 5.906 0 0 1 1.418-.172 5.692 5.692 0 0 1 2.4.374v1.721a3.817 3.817 0 0 0-2.295-.645 4.093 4.093 0 0 0-.771.074 2.335 2.335 0 0 0-.687.241 1.5 1.5 0 0 0-.494.433 1.06 1.06 0 0 0-.189.637 1.221 1.221 0 0 0 .145.608 1.573 1.573 0 0 0 .428.468 4.321 4.321 0 0 0 .688.414c.27.134.584.28.939.436q.548.285 1.034.6a4.881 4.881 0 0 1 .856.7 3.075 3.075 0 0 1 .585.846 2.493 2.493 0 0 1 .215 1.058 2.625 2.625 0 0 1-.322 1.348 2.584 2.584 0 0 1-.866.892 3.786 3.786 0 0 1-1.254.5 6.959 6.959 0 0 1-1.5.155c-.176 0-.392-.014-.647-.04s-.518-.067-.786-.117a7.75 7.75 0 0 1-.76-.187 2.373 2.373 0 0 1-.58-.269zM55.109 16.426a1.021 1.021 0 0 1-.713-.272.891.891 0 0 1-.3-.688.917.917 0 0 1 .3-.7 1.009 1.009 0 0 1 .713-.278 1.041 1.041 0 0 1 .732.278.915.915 0 0 1 .3.7.9.9 0 0 1-.3.678 1.035 1.035 0 0 1-.732.282zm.841 9.074h-1.7V18h1.7zM64.979 24.9q0 4.131-4.146 4.131a6.166 6.166 0 0 1-2.551-.491v-1.554a4.712 4.712 0 0 0 2.332.7 2.341 2.341 0 0 0 2.668-2.628v-.818h-.029a2.938 2.938 0 0 1-4.733.436 4.046 4.046 0 0 1-.837-2.684 4.738 4.738 0 0 1 .9-3.04 2.988 2.988 0 0 1 2.471-1.128 2.38 2.38 0 0 1 2.2 1.216h.029V18h1.7zM63.3 22.064v-.973a1.91 1.91 0 0 0-.523-1.352 1.71 1.71 0 0 0-1.3-.559 1.789 1.789 0 0 0-1.51.714 3.223 3.223 0 0 0-.545 2 2.78 2.78 0 0 0 .523 1.769 1.675 1.675 0 0 0 1.385.662 1.8 1.8 0 0 0 1.426-.632 2.4 2.4 0 0 0 .544-1.629zM73.853 25.5h-1.7v-4.227q0-2.1-1.483-2.1a1.616 1.616 0 0 0-1.279.582 2.167 2.167 0 0 0-.505 1.469V25.5h-1.7V18h1.7v1.245h.029a2.669 2.669 0 0 1 2.428-1.421 2.257 2.257 0 0 1 1.863.795 3.57 3.57 0 0 1 .644 2.3zM80.892 16.426a1.017 1.017 0 0 1-.713-.272.889.889 0 0 1-.3-.688.915.915 0 0 1 .3-.7 1 1 0 0 1 .713-.278 1.038 1.038 0 0 1 .731.278.915.915 0 0 1 .3.7.9.9 0 0 1-.3.678 1.033 1.033 0 0 1-.731.282zm.84 9.074h-1.7V18h1.7zM90.614 25.5h-1.7v-4.227q0-2.1-1.483-2.1a1.62 1.62 0 0 0-1.28.582 2.167 2.167 0 0 0-.5 1.469V25.5h-1.7V18h1.7v1.245h.03a2.668 2.668 0 0 1 2.427-1.421 2.258 2.258 0 0 1 1.864.795 3.576 3.576 0 0 1 .643 2.3zM106.865 18l-2.208 7.5h-1.776l-1.36-5.083a3.291 3.291 0 0 1-.1-.659h-.029a3.018 3.018 0 0 1-.132.644l-1.477 5.1h-1.741l-2.2-7.5H97.6l1.36 5.405a3.308 3.308 0 0 1 .087.645h.053a3.384 3.384 0 0 1 .117-.659L100.725 18h1.593l1.345 5.428a3.832 3.832 0 0 1 .095.644h.052a3.3 3.3 0 0 1 .109-.644l1.33-5.428zM108.977 16.426a1.017 1.017 0 0 1-.713-.272.889.889 0 0 1-.3-.688.915.915 0 0 1 .3-.7 1 1 0 0 1 .713-.278 1.038 1.038 0 0 1 .731.278.915.915 0 0 1 .3.7.9.9 0 0 1-.3.678 1.033 1.033 0 0 1-.731.282zm.84 9.074h-1.7V18h1.7zM115.979 25.42a2.944 2.944 0 0 1-1.307.248q-2.18 0-2.179-2.094v-4.241h-1.25V18h1.25v-1.736l1.7-.483V18h1.79v1.333h-1.79v3.75a1.478 1.478 0 0 0 .242.952 1 1 0 0 0 .8.285 1.16 1.16 0 0 0 .745-.248zM124.094 25.5h-1.7v-4.1q0-2.226-1.483-2.226a1.555 1.555 0 0 0-1.258.644 2.573 2.573 0 0 0-.511 1.649V25.5h-1.7V14.4h1.7v4.849h.029a2.679 2.679 0 0 1 2.428-1.421q2.492 0 2.492 3.055zM141.719 25.5h-1.726v-6.8q0-.835.1-2.043h-.03a6.992 6.992 0 0 1-.285.988l-3.126 7.855h-1.2l-3.136-7.793a7.371 7.371 0 0 1-.277-1.047h-.029q.059.63.058 2.058V25.5h-1.608V15h2.449l2.756 7a10.415 10.415 0 0 1 .409 1.2h.036c.181-.551.327-.962.439-1.23l2.808-6.97h2.362zM144.964 16.426a1.019 1.019 0 0 1-.713-.272.892.892 0 0 1-.3-.688.918.918 0 0 1 .3-.7 1.007 1.007 0 0 1 .713-.278 1.038 1.038 0 0 1 .731.278.911.911 0 0 1 .3.7.9.9 0 0 1-.3.678 1.033 1.033 0 0 1-.731.282zm.841 9.074h-1.7V18h1.7zM153.378 25.156a4.185 4.185 0 0 1-2.127.52 3.6 3.6 0 0 1-2.69-1.044 3.7 3.7 0 0 1-1.024-2.706 4.074 4.074 0 0 1 1.1-2.978 3.93 3.93 0 0 1 2.942-1.124 4.281 4.281 0 0 1 1.806.36v1.582a2.73 2.73 0 0 0-1.667-.586 2.312 2.312 0 0 0-1.762.728 2.669 2.669 0 0 0-.687 1.908 2.54 2.54 0 0 0 .647 1.838 2.291 2.291 0 0 0 1.736.674 2.708 2.708 0 0 0 1.725-.652zM159.4 19.619a1.4 1.4 0 0 0-.884-.242 1.514 1.514 0 0 0-1.258.682 3.047 3.047 0 0 0-.5 1.852V25.5h-1.7V18h1.7v1.545h.029a2.6 2.6 0 0 1 .764-1.233 1.72 1.72 0 0 1 1.151-.444 1.425 1.425 0 0 1 .7.14zM163.788 25.676a3.71 3.71 0 0 1-2.767-1.051 3.8 3.8 0 0 1-1.035-2.787 3.7 3.7 0 0 1 3.985-4.014 3.581 3.581 0 0 1 2.733 1.033 3.994 3.994 0 0 1 .98 2.864 3.938 3.938 0 0 1-1.056 2.875 3.8 3.8 0 0 1-2.84 1.08zm.08-6.5a1.932 1.932 0 0 0-1.571.7 2.913 2.913 0 0 0-.578 1.919 2.744 2.744 0 0 0 .585 1.856 1.957 1.957 0 0 0 1.564.678 1.862 1.862 0 0 0 1.539-.666 2.95 2.95 0 0 0 .537-1.9 2.99 2.99 0 0 0-.537-1.911 1.851 1.851 0 0 0-1.539-.672zM168.94 25.266v-1.575a3.383 3.383 0 0 0 2.1.725q1.535 0 1.535-.908a.714.714 0 0 0-.132-.436 1.263 1.263 0 0 0-.354-.318 2.864 2.864 0 0 0-.526-.25c-.2-.072-.428-.155-.677-.248a7.074 7.074 0 0 1-.829-.389 2.526 2.526 0 0 1-.615-.465 1.758 1.758 0 0 1-.369-.59 2.168 2.168 0 0 1-.124-.769 1.775 1.775 0 0 1 .256-.955 2.224 2.224 0 0 1 .687-.7 3.294 3.294 0 0 1 .979-.425 4.49 4.49 0 0 1 1.129-.139 5.163 5.163 0 0 1 1.856.315v1.487a3.127 3.127 0 0 0-1.812-.542 2.323 2.323 0 0 0-.582.066 1.477 1.477 0 0 0-.442.183.893.893 0 0 0-.285.282.677.677 0 0 0-.1.363.779.779 0 0 0 .1.41.936.936 0 0 0 .3.3 2.675 2.675 0 0 0 .482.234q.282.105.648.23a9.5 9.5 0 0 1 .866.4 2.872 2.872 0 0 1 .654.465 1.789 1.789 0 0 1 .416.6 2.034 2.034 0 0 1 .147.81 1.855 1.855 0 0 1-.263 1 2.212 2.212 0 0 1-.7.7 3.28 3.28 0 0 1-1.013.413 5.2 5.2 0 0 1-1.209.136 5.1 5.1 0 0 1-2.123-.41zM179.183 25.676a3.711 3.711 0 0 1-2.768-1.051 3.8 3.8 0 0 1-1.034-2.787 3.7 3.7 0 0 1 3.984-4.014 3.585 3.585 0 0 1 2.734 1.033 3.993 3.993 0 0 1 .979 2.864 3.934 3.934 0 0 1-1.056 2.875 3.794 3.794 0 0 1-2.839 1.08zm.08-6.5a1.934 1.934 0 0 0-1.572.7 2.919 2.919 0 0 0-.578 1.919 2.749 2.749 0 0 0 .585 1.856 1.959 1.959 0 0 0 1.565.678 1.864 1.864 0 0 0 1.539-.666 2.956 2.956 0 0 0 .537-1.9 3 3 0 0 0-.537-1.911 1.852 1.852 0 0 0-1.539-.672zM188.787 15.781a1.523 1.523 0 0 0-.782-.2q-1.235 0-1.235 1.4V18h1.74v1.333h-1.733V25.5h-1.7v-6.167H183.8V18h1.279v-1.216a2.37 2.37 0 0 1 .775-1.871 2.817 2.817 0 0 1 1.937-.684 2.866 2.866 0 0 1 .994.138zM193.94 25.42a2.944 2.944 0 0 1-1.307.248q-2.179 0-2.179-2.094v-4.241H189.2V18h1.25v-1.736l1.7-.483V18h1.79v1.333h-1.79v3.75a1.472 1.472 0 0 0 .242.952 1 1 0 0 0 .8.285 1.162 1.162 0 0 0 .745-.248z"
                  }),
                  o.createElement("path", {
                    fill: "#f25022",
                    d: "M13 11h9v9h-9z"
                  }),
                  o.createElement("path", {
                    fill: "#00a4ef",
                    d: "M13 21h9v9h-9z"
                  }),
                  o.createElement("path", {
                    fill: "#7fba00",
                    d: "M23 11h9v9h-9z"
                  }),
                  o.createElement("path", {
                    fill: "#ffb900",
                    d: "M23 21h9v9h-9z"
                  })
                );
          }),
          t
        );
      })(o.Component);
    t.default = i;
  }
]);
