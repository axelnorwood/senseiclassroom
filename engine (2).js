/* ------------------------------------------------------------------
   Sensei Classroom — practice engine

   Leitner scheduling with a fluency gate:
     • every item sits in a box, 1 to 5, for each learner
     • right AND fast        -> up one box, seen again much later
     • right but slow        -> stays put, seen again soon
     • wrong                 -> back to box 1
     • a level only unlocks when 80% of the level below is at box 3

   The only part that talks to storage is Store, at the bottom.
   Swapping localStorage for Supabase means rewriting Store alone.
-------------------------------------------------------------------*/

const Engine = (function () {

  /* ---------- tuning ---------- */

  const BOX_MINUTES = [0, 10, 1440, 4320, 10080, 30240]; // box 1..5
  const SESSION_LEN = 20;    // items per session
  const MASTERY_BOX = 3;     // box that counts as mastered
  const UNLOCK      = 0.8;   // share of a level needed to unlock the next

  // How fast counts as fluent, in milliseconds. A number fact should be
  // recalled, not worked out. A phonics question has to be read first,
  // along with three options, so it gets more room. Override per item
  // with a fluentMs field when a question is unusually long.
  const FLUENT_MS = { math: 3000, phonics: 6500 };
  const FLUENT_DEFAULT = 5000;

  function fluentLimit(item) {
    if (!item) return FLUENT_DEFAULT;
    if (item.fluentMs) return item.fluentMs;
    return FLUENT_MS[item.strand] || FLUENT_DEFAULT;
  }

  /* ---------- state ---------- */

  let profile  = "default";
  let progress = {};

  function blank() {
    return { box: 0, due: 0, right: 0, wrong: 0, seen: 0, avgMs: 0 };
  }

  function rec(id) {
    return progress[id] || blank();
  }

  /* ---------- what is unlocked ---------- */

  function topLevel(strand) {
    let level = 1;
    for (;;) {
      const atLevel = ITEMS.filter(i => i.strand === strand && i.level === level);
      if (!atLevel.length) return level - 1;
      const done = atLevel.filter(i => rec(i.id).box >= MASTERY_BOX).length;
      if (done / atLevel.length >= UNLOCK) level++;
      else return level;
    }
  }

  /* ---------- building a session ---------- */

  function shuffle(list) {
    const out = list.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  // alternate strands so a session never runs 20 sums in a row
  function interleave(list) {
    const byStrand = {};
    list.forEach(i => (byStrand[i.strand] = byStrand[i.strand] || []).push(i));
    const strands = Object.keys(byStrand);
    const out = [];
    let n = 0;
    while (out.length < list.length) {
      const pool = byStrand[strands[n % strands.length]];
      if (pool && pool.length) out.push(pool.shift());
      n++;
      if (n > list.length * 4) break; // safety
    }
    return out;
  }

  function dueCount(now) {
    now = now || Date.now();
    return ITEMS.filter(i => progress[i.id] && progress[i.id].due <= now).length;
  }

  function buildSession(now) {
    now = now || Date.now();

    const due = ITEMS
      .filter(i => progress[i.id] && progress[i.id].due <= now)
      .sort((a, b) => rec(a.id).due - rec(b.id).due)
      .slice(0, SESSION_LEN);

    const picked = due.slice();

    if (picked.length < SESSION_LEN) {
      const caps = {};
      ["math", "phonics"].forEach(s => (caps[s] = topLevel(s)));

      const fresh = shuffle(
        ITEMS.filter(i =>
          !progress[i.id] &&
          i.level <= caps[i.strand]
        )
      ).sort((a, b) => a.level - b.level);

      picked.push(...fresh.slice(0, SESSION_LEN - picked.length));
    }

    // Nothing due and nothing new unlocked. Rather than show an empty
    // screen to someone who turned up to practise, bring forward whatever
    // is closest to due. Early review costs nothing; a dead session does.
    let extra = false;
    if (picked.length < SESSION_LEN) {
      const soonest = ITEMS
        .filter(i => progress[i.id] && picked.indexOf(i) === -1)
        .sort((a, b) => rec(a.id).due - rec(b.id).due)
        .slice(0, SESSION_LEN - picked.length);
      if (picked.length === 0 && soonest.length) extra = true;
      picked.push(...soonest);
    }

    const queue = interleave(shuffle(picked));
    queue.aheadOfSchedule = extra;
    return queue;
  }

  /* ---------- recording an answer ---------- */

  function answer(id, correct, ms, now) {
    now = now || Date.now();
    const r = rec(id);
    const limit = fluentLimit(ITEMS.find(i => i.id === id));

    r.seen += 1;
    r.avgMs = Math.round((r.avgMs * (r.seen - 1) + ms) / r.seen);

    const was = r.box;
    let moved = 0;

    if (correct) {
      r.right += 1;
      // fast and right means it is known; slow and right means it was worked out
      r.box = (ms <= limit)
        ? (was === 0 ? 1 : Math.min(5, was + 1))
        : Math.max(1, was);
      moved = r.box - was;
    } else {
      r.wrong += 1;
      r.box = 1;
    }

    r.due = now + BOX_MINUTES[r.box] * 60000;
    progress[id] = r;
    Store.save(profile, progress);

    return { box: r.box, moved: moved, fluent: correct && ms <= limit };
  }

  /* ---------- reporting ---------- */

  function stats() {
    const out = {};
    ["math", "phonics"].forEach(s => {
      const all = ITEMS.filter(i => i.strand === s);
      out[s] = {
        total:    all.length,
        started:  all.filter(i => progress[i.id]).length,
        mastered: all.filter(i => rec(i.id).box >= MASTERY_BOX).length,
        level:    topLevel(s)
      };
    });
    return out;
  }

  function shaky(limit) {
    return ITEMS
      .filter(i => progress[i.id] && rec(i.id).wrong > 0 && rec(i.id).box < MASTERY_BOX)
      .sort((a, b) => rec(b.id).wrong - rec(a.id).wrong)
      .slice(0, limit || 3);
  }

  /* ---------- lifecycle ---------- */

  function start(who) {
    profile  = who || "default";
    progress = Store.load(profile);
  }

  function reset() {
    progress = {};
    Store.save(profile, progress);
  }

  return {
    start, reset, buildSession, answer, stats, shaky, dueCount, fluentLimit,
    SESSION_LEN,
    get profile() { return profile; }
  };

})();


/* ------------------------------------------------------------------
   Storage.

   This is the whole swap point. To move progress into Supabase,
   rewrite these three functions to read and write the item_progress
   table, and make the callers await them. Nothing above changes.
-------------------------------------------------------------------*/

const Store = {

  key(who) { return "sensei:progress:" + who; },

  load(who) {
    try { return JSON.parse(localStorage.getItem(this.key(who))) || {}; }
    catch (e) { return {}; }
  },

  save(who, data) {
    try { localStorage.setItem(this.key(who), JSON.stringify(data)); }
    catch (e) { /* private browsing, storage full — practice still works */ }
  },

  logSession(who, summary) {
    try {
      const k = "sensei:sessions:" + who;
      const log = JSON.parse(localStorage.getItem(k)) || [];
      log.push(summary);
      localStorage.setItem(k, JSON.stringify(log.slice(-60)));
    } catch (e) {}
  },

  sessions(who) {
    try { return JSON.parse(localStorage.getItem("sensei:sessions:" + who)) || []; }
    catch (e) { return []; }
  }

};
