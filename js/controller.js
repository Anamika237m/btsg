/* CONTROLLER: routing, rendering, counters and form handling */
const Controller = (() => {
  const $ = (id) => document.getElementById(id);
  const routes = ["home", "about", "services", "industries", "contact"];

  function render() {
    const key = location.hash.replace("#/", "") || "home";
    const page = routes.includes(key) ? key : "home";
    $("topbar").innerHTML = View.topbar();
    $("header").innerHTML = View.header(page);
    $("app").innerHTML = View[page]();
    $("footer").innerHTML = View.footer();
    document.title = page === "home" ? `BTSG | ${Model.brand.full}` : `BTSG | ${Model.pages[page].title}`;
    window.scrollTo(0, 0);
    if (page === "home") runCounters();
    if (page === "contact") $("enquiry").addEventListener("submit", sendEnquiry);
  }

  function runCounters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      const end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now();
      const tick = (t) => { const p = Math.min((t - t0) / 1200, 1); el.textContent = Math.round(end * p) + (p === 1 ? suf : ""); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
  }

  async function sendEnquiry(e) {
    e.preventDefault();
    const form = e.target, f = new FormData(form), C = Model.contact;
    const d = new Date(), pad = (n) => String(n).padStart(2, "0");
    const ref = `BTSG-${String(d.getFullYear()).slice(2)}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;
    const subject = `[${ref}] Enquiry: ${f.get("service")}`;
    if (!C.formKey) {
      const body = `Reference: ${ref}\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nEmail: ${f.get("email")}\nService: ${f.get("service")}\n\n${f.get("message")}`;
      location.href = `mailto:${C.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    const msg = $("formMsg"), btn = form.querySelector("button");
    btn.disabled = true; msg.textContent = "Sending...";
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: C.formKey, subject, reference: ref, from_name: Model.brand.short + " Website", name: f.get("name"), email: f.get("email"), phone: f.get("phone"), service: f.get("service"), message: f.get("message") }) });
      const j = await r.json();
      if (!j.success) throw new Error(j.message);
      form.innerHTML = `<h3>Thank you — your enquiry has been sent.</h3><p>Your reference number is <b>${ref}</b>.</p><p>Our team will respond with next steps — typically within one business day.</p>`;
    } catch (err) {
      btn.disabled = false;
      msg.textContent = `Your enquiry could not be sent. Please call ${C.phones[0]} or email ${C.email}.`;
    }
  }

  /* Request a Quote buttons: if already on the Contact page, scroll to the form */
  document.addEventListener("click", (ev) => {
    const a = ev.target.closest('a[href="#/contact"]');
    if (a && location.hash === "#/contact") { ev.preventDefault(); const el = $("enquiry"); if (el) { el.scrollIntoView({ behavior: "smooth" }); el.querySelector("input").focus(); } }
  });

  window.addEventListener("hashchange", render);
  render();
})();
