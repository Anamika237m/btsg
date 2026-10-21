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

  function sendEnquiry(e) {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `Name: ${f.get("name")}\nPhone: ${f.get("phone")}\nEmail: ${f.get("email")}\nService: ${f.get("service")}\n\n${f.get("message")}`;
    location.href = `mailto:${Model.contact.email}?subject=${encodeURIComponent("Enquiry: " + f.get("service"))}&body=${encodeURIComponent(body)}`;
  }

  window.addEventListener("hashchange", render);
  render();
})();
