/* Code Master: an Express-style server that runs in the browser, so backend lessons can
   define real routes and send real requests to them with app.request(method, url, body). */
(function () {
  function express() {
    var routes = [];
    function add(method) {
      return function (path, handler) { routes.push({ method: method, path: path, handler: handler }); return app; };
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
      use: function () { return app; },
      listen: function (port, cb) { console.log("Server listening on http://localhost:" + port); if (cb) cb(); return app; },
      request: function (method, url, body) {
        return new Promise(function (resolve) {
          var res = {
            statusCode: 200,
            status: function (c) { res.statusCode = c; return res; },
            json: function (o) { resolve({ status: res.statusCode, body: o }); return res; },
            send: function (o) { resolve({ status: res.statusCode, body: o }); return res; },
            sendStatus: function (c) { resolve({ status: c, body: null }); return res; },
          };
          var query = {};
          var qs = url.split("?")[1];
          if (qs) qs.split("&").forEach(function (kv) { var p = kv.split("="); query[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ""); });
          for (var i = 0; i < routes.length; i++) {
            var r = routes[i];
            if (r.method !== method) continue;
            var params = match(r.path, url);
            if (!params) continue;
            var req = { method: method, url: url, params: params, query: query, body: body || {}, headers: {} };
            try {
              var out = r.handler(req, res);
              if (out && typeof out.catch === "function") out.catch(function (e) { res.status(500).json({ error: e.message }); });
            } catch (e) {
              res.status(500).json({ error: e.message });
            }
            return;
          }
          resolve({ status: 404, body: { error: "Not found" } });
        });
      },
    };
    return app;
  }
  express.json = function () { return function () {}; };
  window.express = express;
})();
