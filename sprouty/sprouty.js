(function () {
  var P = Sprouty, $ = function (id) { return document.getElementById(id); };
  var tab = "outfits", note = "";
  var TABS = [["outfits", "Outfits"], ["garden", "Garden shop"], ["mission", "Weekly mission"], ["save", "Save code"]];
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; }
  function btn(txt, fn, cls, off) { var b = el("button", "btn btn-sm " + (cls || "btn-success"), txt); b.disabled = !!off; b.onclick = fn; return b; }
  function row(label, b) { var r = el("div", "row2"); r.appendChild(el("span", "fw-bold", label)); r.appendChild(b); return r; }
  function head() {
    $("mascot").innerHTML = P.avatar();
    $("decor").textContent = P.garden().map(function (i) { return P.DECOR[i][0]; }).join(" ");
    $("coins").textContent = P.coins(); $("streak").textContent = P.streak();
    var t = P.total();
    $("level").textContent = t < 50 ? "Little Sprout \u{1F331}: " + (50 - t) + " more seeds to grow!" : t < 150 ? "Sapling \u{1F33F}: " + (150 - t) + " more seeds to grow!" : "Big Tree \u{1F333}: fully grown!";
  }
  function render() {
    head();
    var tabs = $("tabs"); tabs.innerHTML = "";
    TABS.forEach(function (t) { tabs.appendChild(btn(t[1], function () { tab = t[0]; note = ""; render(); }, t[0] === tab ? "btn-success" : "btn-outline-success")); });
    var v = $("view"); v.innerHTML = "";
    if (note) v.appendChild(el("p", "fw-bold text-success", note));
    if (tab === "outfits") {
      P.SLOTS.forEach(function (s) {
        v.appendChild(el("h2", "fs-5 mt-2", s === "hat" ? "Hats" : s === "face" ? "Faces" : "Neck"));
        Object.keys(P.ITEMS).filter(function (i) { return P.ITEMS[i][0] === s; }).forEach(function (id) {
          var it = P.ITEMS[id], own = P.owned(id), on = P.worn()[s] === id;
          v.appendChild(row(it[1], own ? btn(on ? "Take off" : "Wear", function () { P.wear(id); render(); }, on ? "btn-outline-secondary" : "btn-success")
            : btn("Buy \u{1F330} " + it[2], function () { if (P.buy(id)) { P.wear(id); } render(); }, "btn-warning", P.coins() < it[2])));
        });
      });
    } else if (tab === "garden") {
      v.appendChild(el("p", "mb-1", "Decorations appear in your garden automatically."));
      Object.keys(P.DECOR).forEach(function (id) {
        var d = P.DECOR[id];
        v.appendChild(row(d[0] + " " + d[1], P.owned(id) ? el("span", "text-success fw-bold", "In your garden \u2713") : btn("Buy \u{1F330} " + d[2], function () { P.buy(id); render(); }, "btn-warning", P.coins() < d[2])));
      });
    } else if (tab === "mission") {
      v.appendChild(el("h2", "fs-5", "This week's mission"));
      v.appendChild(el("p", "fs-5", P.missionText()));
      v.appendChild(el("p", "small text-muted", "Do it for real, then ask a grown-up to check. A new mission arrives every Monday. Keep your streak going by finishing one every week!"));
      v.appendChild(P.missionIsDone() ? el("p", "fw-bold text-success", "\u2705 Done this week! See you on Monday.")
        : btn("I did it!", function () { var r = P.missionDone(); note = "Amazing! +" + r + " seeds and your streak is " + P.streak() + "!"; render(); }));
    } else {
      v.appendChild(el("h2", "fs-5", "Save your progress"));
      v.appendChild(el("p", "small", "Your seeds and outfits live on this device. Make a code to keep them safe or to move to another device."));
      var ta = el("textarea"); ta.rows = 3; ta.readOnly = true; ta.setAttribute("aria-label", "Your save code"); v.appendChild(ta);
      v.appendChild(btn("Make my code", function () { ta.value = P.exportCode(); ta.select(); }, "btn-success mt-2"));
      v.appendChild(el("h2", "fs-5 mt-3", "Load a code"));
      var inp = el("input"); inp.placeholder = "Paste your code here"; inp.setAttribute("aria-label", "Paste a save code"); v.appendChild(inp);
      v.appendChild(btn("Load it", function () {
        if (!inp.value.trim()) return;
        if (!confirm("This will replace what is saved on this device. Continue?")) return;
        note = P.importCode(inp.value) ? "Loaded! Welcome back." : "That code doesn't look right. Check it and try again."; render();
      }, "btn-warning mt-2"));
    }
  }
  render();
})();
