/* Code Master: an Express-style server that runs in the browser, so backend lessons can
   define real routes and send real requests to them with app.request(method, url, body, headers).
   Supports app.use() middleware, per-route middleware chains with next(), params, query and headers.
   Also provides look-alikes of bcryptjs and jsonwebtoken for the authentication lesson. */
(function () {
  function express() {
    var routes = [];
    var middleware = [];
    function add(method) {
      return function (path) {
        var handlers = [].slice.call(arguments, 1);
        routes.push({ method: method, path: path, handlers: handlers });
        return app;
      };
    }
    function match(pattern, url) {
      var a = pattern.split("/"), b = url.split("?")[0].split("/");
      if (a.length !== b.length) return null;
      var params = {};
      for (var i = 0; i < a.length; i++) {
        if (a[i].charAt(0) === ":") params[a[i].slice(1)] = decodeURIComponent(b[i]);
        else if (a[i] !== b[i]) return null;
      }
      return params;
    }
    var app = {
      get: add("GET"), post: add("POST"), put: add("PUT"), patch: add("PATCH"), delete: add("DELETE"),
      use: function (fn) {
        // app.use(fn) or app.use("/path", fn): path-scoped middleware runs for every path here.
        var f = typeof fn === "function" ? fn : arguments[1];
        if (typeof f === "function") middleware.push(f);
        return app;
      },
      listen: function (port, cb) { console.log("Server listening on http://localhost:" + port); if (cb) cb(); return app; },
      request: function (method, url, body, headers) {
        return new Promise(function (resolve) {
          var done = false;
          var finish = function (status, payload) { if (!done) { done = true; resolve({ status: status, body: payload }); } };
          var res = {
            statusCode: 200,
            locals: {},
            status: function (c) { res.statusCode = c; return res; },
            json: function (o) { finish(res.statusCode, o); return res; },
            send: function (o) { finish(res.statusCode, o); return res; },
            sendStatus: function (c) { finish(c, null); return res; },
            end: function () { finish(res.statusCode, null); return res; },
          };
          var query = {};
          var qs = url.split("?")[1];
          if (qs) qs.split("&").forEach(function (kv) { var p = kv.split("="); query[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ""); });
          var hdrs = {};
          Object.keys(headers || {}).forEach(function (k) { hdrs[k.toLowerCase()] = headers[k]; });
          for (var i = 0; i < routes.length; i++) {
            var r = routes[i];
            if (r.method !== method) continue;
            var params = match(r.path, url);
            if (!params) continue;
            var req = {
              method: method, url: url, path: url.split("?")[0], params: params, query: query, body: body || {}, headers: hdrs,
              get: function (name) { return hdrs[String(name).toLowerCase()]; },
            };
            var chain = middleware.concat(r.handlers);
            var fail = function (e) { res.status(500).json({ error: e && e.message ? e.message : String(e) }); };
            var run = function (k, err) {
              if (err) return fail(err);
              if (k >= chain.length) return;
              try {
                var out = chain[k](req, res, function (e) { run(k + 1, e); });
                if (out && typeof out.catch === "function") out.catch(fail);
              } catch (e) {
                fail(e);
              }
            };
            run(0);
            setTimeout(function () { finish(504, { error: "No response sent" }); }, 1500);
            return;
          }
          finish(404, { error: "Not found" });
        });
      },
    };
    return app;
  }
  express.json = function () { return function (req, res, next) { next(); }; };
  window.express = express;

  /* ---- Authentication look-alikes (same API as the real packages; not real cryptography). ---- */
  function digest(text) {
    // A small, deterministic string hash (FNV-1a, stretched) standing in for a real key-derivation function.
    var h = 2166136261 >>> 0, out = "";
    for (var round = 0; round < 4; round++) {
      for (var i = 0; i < text.length; i++) { h ^= text.charCodeAt(i) + round; h = Math.imul(h, 16777619) >>> 0; }
      out += ("00000000" + h.toString(16)).slice(-8);
    }
    return out;
  }
  function salt() { var s = ""; while (s.length < 10) s += "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]; return s; }
  window.bcryptjs = {
    hash: function (password, rounds) { var s = salt(); return Promise.resolve("$2b$" + (rounds || 10) + "$" + s + digest(s + password)); },
    compare: function (password, hashed) {
      var m = /^\$2b\$\d+\$(\w{10})(\w+)$/.exec(String(hashed));
      return Promise.resolve(!!m && digest(m[1] + password) === m[2]);
    },
    hashSync: function (password, rounds) { var s = salt(); return "$2b$" + (rounds || 10) + "$" + s + digest(s + password); },
  };
  function b64(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_"); }
  function unb64(s) { return JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))))); }
  window.jsonwebtoken = {
    sign: function (payload, secret, options) {
      var body = Object.assign({}, payload, { iat: Math.floor(Date.now() / 1000) });
      if (options && options.expiresIn) body.exp = body.iat + (typeof options.expiresIn === "number" ? options.expiresIn : 3600);
      var head = b64({ alg: "HS256", typ: "JWT" }), data = b64(body);
      return head + "." + data + "." + digest(head + "." + data + secret);
    },
    verify: function (token, secret) {
      var parts = String(token).split(".");
      if (parts.length !== 3 || digest(parts[0] + "." + parts[1] + secret) !== parts[2]) throw new Error("invalid signature");
      var body = unb64(parts[1]);
      if (body.exp && body.exp < Date.now() / 1000) throw new Error("jwt expired");
      return body;
    },
  };
})();
