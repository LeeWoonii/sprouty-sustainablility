/* Sprouty core: seeds, outfits, garden, weekly mission, save code, friend challenge. Everything lives on the device. */
(function () {
  var K = "sproutyState", DAY = 864e5, sess = 0;
  var BODY = '<ellipse cx="100" cy="208" rx="55" ry="9" fill="#0002"/><path d="M100 62C40 62 34 190 100 196C166 190 160 62 100 62Z" fill="#7ccf6f" stroke="#2e7d4a" stroke-width="5"/><path d="M100 64C92 22 52 16 46 32C56 56 86 64 100 64Z" fill="#4cb35a" stroke="#2e7d4a" stroke-width="4"/><path d="M100 64C108 22 148 16 154 32C144 56 114 64 100 64Z" fill="#4cb35a" stroke="#2e7d4a" stroke-width="4"/><circle cx="78" cy="115" r="10" fill="#fff"/><circle cx="122" cy="115" r="10" fill="#fff"/><circle cx="80" cy="117" r="5.5" fill="#1d2b24"/><circle cx="124" cy="117" r="5.5" fill="#1d2b24"/><circle cx="64" cy="138" r="8" fill="#ff9fb0" opacity=".7"/><circle cx="136" cy="138" r="8" fill="#ff9fb0" opacity=".7"/><path d="M86 142Q100 156 114 142" fill="none" stroke="#1d2b24" stroke-width="4" stroke-linecap="round"/>';
  // id: [slot, name, cost, svg, drawnBehindBody]
  var ITEMS = {
    cap: ["hat", "Red cap", 10, '<path d="M55 72Q100 18 145 72Z" fill="#e04b4b"/><rect x="50" y="68" width="105" height="9" rx="4" fill="#b83232"/>'],
    flowers: ["hat", "Flower crown", 20, '<circle cx="68" cy="62" r="10" fill="#ff8fb3"/><circle cx="100" cy="50" r="11" fill="#ff8fb3"/><circle cx="132" cy="62" r="10" fill="#ff8fb3"/><circle cx="100" cy="50" r="4" fill="#ffd54a"/><circle cx="68" cy="62" r="4" fill="#ffd54a"/><circle cx="132" cy="62" r="4" fill="#ffd54a"/>'],
    tophat: ["hat", "Top hat", 25, '<rect x="72" y="16" width="56" height="50" fill="#222"/><rect x="55" y="62" width="90" height="10" rx="5" fill="#222"/><rect x="72" y="48" width="56" height="8" fill="#e04b4b"/>'],
    crown: ["hat", "Golden crown", 40, '<path d="M64 70L64 38L83 56L100 28L117 56L136 38L136 70Z" fill="#ffc83d" stroke="#d99d00" stroke-width="3"/>'],
    shades: ["face", "Cool shades", 10, '<rect x="58" y="104" width="34" height="23" rx="9" fill="#222"/><rect x="108" y="104" width="34" height="23" rx="9" fill="#222"/><rect x="92" y="111" width="16" height="4" fill="#222"/>'],
    round: ["face", "Round glasses", 12, '<circle cx="78" cy="115" r="17" fill="none" stroke="#e0587a" stroke-width="5"/><circle cx="122" cy="115" r="17" fill="none" stroke="#e0587a" stroke-width="5"/><path d="M95 115H105" stroke="#e0587a" stroke-width="5"/>'],
    moustache: ["face", "Fancy moustache", 15, '<path d="M70 131Q85 120 100 131Q115 120 130 131Q115 141 100 134Q85 141 70 131Z" fill="#5b3a29"/>'],
    scarf: ["neck", "Blue scarf", 12, '<path d="M52 158Q100 178 148 158L148 172Q100 192 52 172Z" fill="#2b8fd1"/><rect x="128" y="165" width="16" height="36" rx="5" fill="#2b8fd1"/>'],
    bow: ["neck", "Red bow tie", 10, '<path d="M100 168L78 155L78 181ZM100 168L122 155L122 181Z" fill="#e04b4b"/><circle cx="100" cy="168" r="6" fill="#b83232"/>'],
    cape: ["neck", "Hero cape", 30, '<path d="M60 90L28 206L172 206L140 90Z" fill="#7b4bd6"/>', true]
  };
  // id: [emoji, name, cost]
  var DECOR = {
    sunflower: ["🌻", "Sunflower", 5], tulip: ["🌷", "Tulip", 5], mushroom: ["🍄", "Mushroom", 6],
    butterfly: ["🦋", "Butterfly", 8], ladybird: ["🐞", "Ladybird", 8], bird: ["🐦", "Little bird", 12],
    rabbit: ["🐇", "Bunny", 12], tree: ["🌳", "Tree", 15], fountain: ["⛲", "Fountain", 25], rainbow: ["🌈", "Rainbow", 30]
  };
  var MISSIONS = [
    "Turn off the tap while you brush your teeth, all week.", "Use a refillable water bottle for a whole day.",
    "Sort the rubbish at home into the right bins.", "Switch off the lights when you leave a room, for 3 days.",
    "Walk, cycle or scoot for one trip instead of going by car.", "Plant a seed or water a plant.",
    "Reuse something instead of throwing it away.", "Take a quick 5-minute shower instead of a bath.",
    "Pick up 10 pieces of litter. Wear gloves and ask a grown-up to come with you!", "Eat one meal with no packaging waste.",
    "Give away a toy or book you don't use anymore.", "Teach someone at home one thing you learned in Sprouty."
  ];
  var SLOTS = ["hat", "face", "neck"];
  var num = function (x) { return Math.max(0, Math.min(1e6, Math.floor(+x) || 0)); };
  function clean(o) {
    o = o && typeof o === "object" ? o : {};
    var d = { coins: num(o.coins), total: 0, owned: [], worn: {}, garden: [], mission: { w: -1 }, streak: { n: 0, w: -9 }, nick: "" };
    d.total = Math.max(d.coins, num(o.total));
    d.owned = (Array.isArray(o.owned) ? o.owned : []).filter(function (i) { return ITEMS[i]; });
    d.garden = (Array.isArray(o.garden) ? o.garden : []).filter(function (i) { return DECOR[i]; });
    SLOTS.forEach(function (s) { var i = o.worn && o.worn[s]; if (i && ITEMS[i] && ITEMS[i][0] === s && d.owned.indexOf(i) > -1) d.worn[s] = i; });
    if (o.mission && typeof o.mission === "object") d.mission = { w: Math.floor(+o.mission.w) || -1 };
    if (o.streak && typeof o.streak === "object") d.streak = { n: num(o.streak.n), w: Math.floor(+o.streak.w) || -9 };
    d.nick = String(o.nick || "").replace(/[^\w ]/g, "").trim().slice(0, 12);
    return d;
  }
  var st;
  try { st = clean(JSON.parse(localStorage.getItem(K))); } catch (e) { st = clean({}); }
  var save = function () { try { localStorage.setItem(K, JSON.stringify(st)); } catch (e) {} };
  var week = function () { return Math.floor((Date.now() / DAY + 3) / 7); }; // weeks start on Monday
  var P = window.Sprouty = {
    ITEMS: ITEMS, DECOR: DECOR, SLOTS: SLOTS,
    coins: function () { return st.coins; }, total: function () { return st.total; },
    owned: function (id) { return st.owned.indexOf(id) > -1 || st.garden.indexOf(id) > -1; },
    worn: function () { return st.worn; },
    garden: function () { return st.garden; },
    session: function () { return sess; }, resetSession: function () { sess = 0; },
    add: function (n) { st.coins += n; st.total += n; sess += n; save(); },
    buy: function (id) {
      var it = ITEMS[id] || DECOR[id]; if (!it || P.owned(id) || st.coins < it[2]) return false;
      st.coins -= it[2]; (ITEMS[id] ? st.owned : st.garden).push(id); save(); return true;
    },
    wear: function (id) { var s = ITEMS[id][0]; if (st.worn[s] === id) delete st.worn[s]; else if (st.owned.indexOf(id) > -1) st.worn[s] = id; save(); },
    avatar: function () {
      var back = [], front = [];
      SLOTS.forEach(function (s) { var i = st.worn[s]; if (i) (ITEMS[i][4] ? back : front).push(ITEMS[i][3]); });
      return '<svg viewBox="0 0 200 220" role="img" aria-label="Sprouty">' + back.join("") + BODY + front.join("") + "</svg>";
    },
    // weekly mission
    missionText: function () { return MISSIONS[week() % MISSIONS.length]; },
    missionIsDone: function () { return st.mission.w === week(); },
    streak: function () { return st.streak.w >= week() - 1 ? st.streak.n : 0; },
    missionDone: function () {
      var w = week(); if (st.mission.w === w) return 0;
      st.streak.n = st.streak.w === w - 1 ? st.streak.n + 1 : 1; st.streak.w = w; st.mission.w = w;
      var r = 20 + Math.min(st.streak.n - 1, 4) * 5; P.add(r); return r;
    },
    // save code
    exportCode: function () { return "SPR1-" + btoa(JSON.stringify(st)); },
    importCode: function (c) {
      try { var o = JSON.parse(atob(String(c).trim().replace(/^SPR1-/, ""))); st = clean(o); save(); return true; } catch (e) { return false; }
    },
    // challenge a friend (the score travels inside the link, no server needed)
    share: function (score, max) {
      if (!st.nick) { var v = prompt("Type a nickname for your friend to see (not your real name):"); st.nick = String(v || "").replace(/[^\w ]/g, "").trim().slice(0, 12); save(); }
      var url = location.origin + location.pathname + "?c=" + encodeURIComponent(btoa(JSON.stringify({ s: score, m: max, n: st.nick })));
      var text = (st.nick || "A friend") + " got " + score + " of " + max + " stars in Time Detectives. Could you beat it?";
      if (navigator.share) navigator.share({ title: "Time Detectives", text: text, url: url }).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(text + " " + url).then(function () { alert("Link copied! Paste it to a friend."); }, function () { prompt("Copy this link:", url); });
      else prompt("Copy this link:", url);
    },
    challenge: function () {
      try {
        var c = new URLSearchParams(location.search).get("c"); if (!c) return null;
        var o = JSON.parse(atob(c));
        return { s: Math.min(999, num(o.s)), m: Math.min(999, num(o.m)) || 30, n: String(o.n || "").replace(/[^\w ]/g, "").slice(0, 12) || "A friend" };
      } catch (e) { return null; }
    },
    challengeText: function () { var c = P.challenge(); return c ? c.n + " got " + c.s + " of " + c.m + " stars. Could you beat it?" : ""; },
    beat: function (score) {
      var c = P.challenge(); if (!c) return "";
      return score > c.s ? '<p class="fact">You beat ' + c.n + "!</p>" : score === c.s ? "<p>You tied with " + c.n + "!</p>" : "<p>" + c.n + " got " + c.s + ". Play again to beat it!</p>";
    }
  };
})();
