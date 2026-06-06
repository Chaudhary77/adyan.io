// ADYAN, Lightweight English↔Arabic translation engine.
// Walks all text nodes under <body>, looks each up in window.ADYAN_AR_DICT,
// replaces with the Arabic value when lang=ar. Re-runs on DOM mutations so
// React re-renders stay translated. Stores originals in a WeakMap so
// switching back to EN restores everything.

(function () {
  const STORAGE_KEY = "adyan-lang";
  const originals = new WeakMap(); // textNode -> original English string
  let observer = null;
  let currentLang = "en";
  const subscribers = new Set();

  function getDict() {
    return (window.ADYAN_AR_DICT || {});
  }

  function isTranslatableParent(parent) {
    if (!parent) return false;
    const tag = parent.tagName;
    if (!tag) return false;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return false;
    if (parent.closest && parent.closest("[data-no-i18n]")) return false;
    return true;
  }

  function translateTextNode(node, lang) {
    if (!node || node.nodeType !== 3) return;
    if (!isTranslatableParent(node.parentElement)) return;

    let original = originals.get(node);
    if (original === undefined) {
      original = node.nodeValue;
      originals.set(node, original);
    }

    const trimmed = original.trim();
    if (!trimmed) return;

    if (lang === "en") {
      if (node.nodeValue !== original) node.nodeValue = original;
      return;
    }

    const dict = getDict();
    const translated = dict[trimmed];
    if (translated !== undefined) {
      const lead = original.match(/^\s*/)[0];
      const trail = original.match(/\s*$/)[0];
      const next = lead + translated + trail;
      if (node.nodeValue !== next) node.nodeValue = next;
    }
  }

  function walk(root, lang) {
    if (!root) return;
    if (root.nodeType === 3) { translateTextNode(root, lang); return; }
    if (root.nodeType !== 1) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = walker.nextNode())) translateTextNode(n, lang);
  }

  function startObserver(lang) {
    if (observer) observer.disconnect();
    observer = new MutationObserver(function (mutations) {
      for (const m of mutations) {
        if (m.type === "characterData") {
          translateTextNode(m.target, lang);
        } else if (m.type === "childList") {
          for (const node of m.addedNodes) {
            if (node.nodeType === 1) walk(node, lang);
            else if (node.nodeType === 3) translateTextNode(node, lang);
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function setLang(lang) {
    currentLang = (lang === "ar") ? "ar" : "en";
    document.documentElement.lang = currentLang;
    document.documentElement.dir = (currentLang === "ar") ? "rtl" : "ltr";
    try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) {}
    walk(document.body, currentLang);
    startObserver(currentLang);
    subscribers.forEach(function (fn) { try { fn(currentLang); } catch (e) {} });
  }

  function getLang() { return currentLang; }

  function subscribe(fn) { subscribers.add(fn); return function () { subscribers.delete(fn); }; }

  // Init: read stored preference and apply once DOM is ready.
  function init() {
    let stored = "en";
    try { stored = localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) {}
    setLang(stored);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // Defer so React has time to mount once; then init catches up.
    setTimeout(init, 0);
  }

  window.adyanLang = { set: setLang, get: getLang, subscribe: subscribe };
})();
