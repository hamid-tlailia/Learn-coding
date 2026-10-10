/* Code Master: a small React Native look-alike on top of React DOM, so mobile lessons
   run inside the app. Covers View, Text, Image, Pressable, Button, TextInput,
   ScrollView, FlatList, ActivityIndicator, Switch and StyleSheet, with React Native's
   flexbox defaults, plus an in-memory AsyncStorage. */
(function () {
  var R = window.React;
  var h = R.createElement;
  var unitless = { flex: 1, flexGrow: 1, flexShrink: 1, opacity: 1, zIndex: 1, fontWeight: 1, aspectRatio: 1 };
  function flat(s) {
    if (!s) return {};
    if (Array.isArray(s)) return s.reduce(function (a, x) { return Object.assign(a, flat(x)); }, {});
    return s;
  }
  function px(v) { return typeof v === "number" ? v + "px" : v; }
  function css(style) {
    var f = flat(style), o = {};
    for (var k in f) {
      var v = f[k];
      if (k === "marginHorizontal") { o.marginLeft = o.marginRight = px(v); continue; }
      if (k === "marginVertical") { o.marginTop = o.marginBottom = px(v); continue; }
      if (k === "paddingHorizontal") { o.paddingLeft = o.paddingRight = px(v); continue; }
      if (k === "paddingVertical") { o.paddingTop = o.paddingBottom = px(v); continue; }
      if (k === "flex" && typeof v === "number") { o.flex = v + " 1 0%"; continue; }
      if (k === "shadowColor" || k === "shadowOffset" || k === "shadowOpacity" || k === "shadowRadius" || k === "elevation") continue;
      o[k] = typeof v === "number" && !unitless[k] ? v + "px" : v;
    }
    if (f.borderWidth && !f.borderStyle) o.borderStyle = "solid";
    return o;
  }
  var box = { display: "flex", flexDirection: "column", position: "relative", boxSizing: "border-box", minWidth: 0, minHeight: 0 };
  function merge() { return Object.assign.apply(null, [{}].concat([].slice.call(arguments))); }

  function View(p) { return h("div", { style: merge(box, css(p.style)), "data-rn": "View", "data-testid": p.testID }, p.children); }
  function Text(p) { return h("span", { style: merge({ display: "block", whiteSpace: "pre-wrap", fontSize: "14px" }, css(p.style)), "data-rn": "Text", onClick: p.onPress }, p.children); }
  function Image(p) {
    var src = p.source && (p.source.uri || p.source);
    return h("img", { src: src, alt: p.accessibilityLabel || "", style: merge({ objectFit: p.resizeMode === "contain" ? "contain" : "cover" }, css(p.style)), "data-rn": "Image" });
  }
  function Pressable(p) {
    var st = typeof p.style === "function" ? p.style({ pressed: false }) : p.style;
    return h("button", { type: "button", onClick: p.onPress, "data-rn": "Pressable", style: merge(box, { border: 0, background: "transparent", padding: 0, font: "inherit", color: "inherit", cursor: "pointer", textAlign: "inherit" }, css(st)) }, p.children);
  }
  function Button(p) {
    return h("button", { type: "button", onClick: p.onPress, disabled: p.disabled, "data-rn": "Button", style: { background: p.color || "#2196F3", color: "#fff", border: 0, borderRadius: "6px", padding: "10px 14px", fontWeight: 600, textTransform: "uppercase", fontSize: "14px" } }, p.title);
  }
  function TextInput(p) {
    return h("input", {
      value: p.value, placeholder: p.placeholder, "data-rn": "TextInput", type: p.secureTextEntry ? "password" : "text",
      onChange: function (e) { if (p.onChangeText) p.onChangeText(e.target.value); },
      style: merge({ border: "1px solid #ccc", borderRadius: "8px", padding: "10px", fontSize: "16px" }, css(p.style)),
    });
  }
  function ScrollView(p) { return h("div", { style: merge(box, { overflow: "auto" }, css(p.style)), "data-rn": "ScrollView" }, h("div", { style: merge(box, css(p.contentContainerStyle)) }, p.children)); }
  function FlatList(p) {
    var items = (p.data || []).map(function (item, index) {
      var key = p.keyExtractor ? p.keyExtractor(item, index) : item.key || item.id || index;
      return h(R.Fragment, { key: key }, p.renderItem({ item: item, index: index }));
    });
    return h("div", { style: merge(box, css(p.style)), "data-rn": "FlatList" }, p.ListHeaderComponent ? h(p.ListHeaderComponent) : null, items);
  }

  function ActivityIndicator(p) {
    if (p.animating === false) return null;
    var size = p.size === "large" ? 36 : 20;
    return h("span", { "data-rn": "ActivityIndicator", role: "progressbar", style: merge({ display: "inline-block", alignSelf: "center", width: size + "px", height: size + "px", borderRadius: "50%", border: "3px solid " + (p.color || "#8b5cf6"), borderTopColor: "transparent", animation: "rn-spin .8s linear infinite" }, css(p.style)) });
  }
  function Switch(p) {
    return h("input", { type: "checkbox", role: "switch", checked: !!p.value, "data-rn": "Switch", onChange: function (e) { if (p.onValueChange) p.onValueChange(e.target.checked); } });
  }
  var spin = document.createElement("style");
  spin.textContent = "@keyframes rn-spin{to{transform:rotate(360deg)}}";
  document.head.appendChild(spin);

  // AsyncStorage keeps strings for this run only (the preview is sandboxed), with the real Promise API.
  var memory = {};
  window.AsyncStorage = {
    getItem: function (k) { return Promise.resolve(Object.prototype.hasOwnProperty.call(memory, k) ? memory[k] : null); },
    setItem: function (k, v) { memory[k] = String(v); return Promise.resolve(); },
    removeItem: function (k) { delete memory[k]; return Promise.resolve(); },
    clear: function () { memory = {}; return Promise.resolve(); },
    getAllKeys: function () { return Promise.resolve(Object.keys(memory)); },
  };

  window.ReactNative = {
    ActivityIndicator: ActivityIndicator, Switch: Switch,
    View: View, Text: Text, Image: Image, Pressable: Pressable, TouchableOpacity: Pressable, Button: Button,
    TextInput: TextInput, ScrollView: ScrollView, FlatList: FlatList, SafeAreaView: View,
    StyleSheet: { create: function (o) { return o; }, hairlineWidth: 1, flatten: flat },
    Alert: { alert: function (title, message) { console.log("Alert: " + title + (message ? " - " + message : "")); } },
    Platform: { OS: "android", select: function (o) { return o.android !== undefined ? o.android : o.default; } },
  };
})();
