/* Digital Kolkata: small vanilla JS (no build step, no dependencies). */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* --- toast --- */
  var toastEl = $("#toast"), toastT;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* --- header: hairline on scroll --- */
  var header = $("#site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 16); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* --- mobile menu --- */
  var btn = $("#menu-btn"), menu = $("#mobile-menu");
  function setMenu(open) {
    if (!btn || !menu) return;
    menu.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (btn) {
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.matchMedia("(min-width:768px)").addEventListener("change", function (e) { if (e.matches) setMenu(false); });
  }

  /* --- scroll reveal --- */
  var items = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) {
      var sib = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [];
      el.style.setProperty("--d", Math.max(0, sib.indexOf(el)) * 0.08 + "s");
      io.observe(el);
    });
  } else { items.forEach(function (el) { el.classList.add("in"); }); }

  /* --- share buttons use the current page URL (works on any domain) --- */
  var url = encodeURIComponent(location.origin + location.pathname), title = encodeURIComponent(document.title);
  $$('[aria-label="Share on LinkedIn"]').forEach(function (a) { a.href = "https://www.linkedin.com/sharing/share-offsite/?url=" + url; });
  $$('[aria-label="Share on Facebook"]').forEach(function (a) { a.href = "https://www.facebook.com/sharer/sharer.php?u=" + url; });
  $$('[aria-label="Share on X (Twitter)"]').forEach(function (a) { a.href = "https://twitter.com/intent/tweet?url=" + url + "&text=" + title; });
  $$('[aria-label="Copy page link"]').forEach(function (b) {
    b.addEventListener("click", function () {
      var link = location.href.split("#")[0];
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(link).then(function () { toast("Link copied"); }, function () { toast("Could not copy"); });
      } else {
        var t = document.createElement("textarea"); t.value = link; document.body.appendChild(t); t.select();
        try { document.execCommand("copy"); toast("Link copied"); } catch (e) { toast("Could not copy"); }
        document.body.removeChild(t);
      }
    });
  });

  /* --- contact form (Formspree; falls back to the visitor's email app until you add your form id) --- */
  var form = $("#contact-form"), note = $("#form-note");
  if (form) {
    var say = function (m, c) { note.textContent = m; note.className = "form-note " + (c || ""); };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form);
      if (f.get("_gotcha")) return;                                  // spam trap
      var bad = false;
      ["name", "email", "message"].forEach(function (n) {
        var el = form.elements[n], ok = el.value.trim() && (n !== "email" || /^\S+@\S+\.\S+$/.test(el.value.trim()));
        el.classList.toggle("invalid", !ok); if (!ok) bad = true;
      });
      if (bad) return say("Please fill in your name, a valid email and a message.", "err");

      var action = form.getAttribute("action") || "";
      if (action.indexOf("YOUR_FORM_ID") !== -1) {                   // not configured yet: open email app
        var body = "Name: " + f.get("name") + "\nEmail: " + f.get("email") + "\nPhone: " + (f.get("phone") || "-") +
                   "\nInterested in: " + f.get("service") + "\n\n" + f.get("message");
        location.href = "mailto:support@digitalkolkata.in?subject=" + encodeURIComponent("Website enquiry from " + f.get("name")) +
                        "&body=" + encodeURIComponent(body);
        return say("Opening your email app. (Site owner: add a Formspree form id in contact.html to receive messages directly.)");
      }
      var submit = form.querySelector("button[type=submit]"); submit.disabled = true; say("Sending…");
      fetch(action, { method: "POST", body: f, headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(); form.reset(); say("Thank you! We'll get back to you soon.", "ok"); })
        .catch(function () { say("Something went wrong. Please email us or WhatsApp instead.", "err"); })
        .then(function () { submit.disabled = false; });
    });
  }
})();
